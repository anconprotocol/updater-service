"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const ethers_1 = require("ethers");
const node_fetch_1 = __importDefault(require("node-fetch"));
class AnconProtocol {
    constructor(provider, address, anconEndpoint) {
        this.provider = provider;
        this.address = address;
        this.signer = this.provider.getSigner();
        this.network = '';
        this.postProofCid = '';
        this.anconEndpoint = anconEndpoint;
    }
    async initialize() {
        await this.getNetwork();
    }
    async getNetwork() {
        const network = await this.provider.getNetwork();
        this.network = network;
        return this.network;
    }
    async getDidTransaction() {
        const rawDid = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/did/raw:did:ethr:${this.network.name}:${this.address}`);
        const encodedDid = await rawDid.json();
        const content = await (Object === null || Object === void 0 ? void 0 : Object.values(encodedDid.contentHash)[0]);
        encodedDid.contentHash = content;
        return encodedDid;
    }
    async signMessage() {
        const rawDid = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/did/raw:did:ethr:${this.network.name}:${this.address}`);
        const encodedDid = await rawDid.json();
        return encodedDid;
    }
    toAbiProof(proof) {
        proof.key = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(proof.key));
        proof.value = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(proof.value));
        proof.leaf.prefix = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(proof.leaf.prefix));
        proof.leaf.hash = 1;
        proof.path = proof.path.map((x) => {
            let suffix;
            if (!!x.suffix) {
                suffix = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(x.suffix));
                return {
                    valid: true,
                    prefix: ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(x.prefix)),
                    suffix: suffix,
                    hash: 1,
                };
            }
            else {
                return {
                    valid: true,
                    prefix: ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(x.prefix)),
                    hash: 1,
                    suffix: '0x',
                };
            }
        });
        proof.leaf.prehash_key = 0;
        proof.leaf.len = proof.leaf.length;
        proof.valid = true;
        proof.leaf.valid = true;
        return proof;
    }
    async getPubKey(transactionHash) {
        const transaction = await this.prov.getTransaction(transactionHash);
        const sig = ethers_1.ethers.utils.joinSignature({
            r: transaction.r,
            s: transaction.s,
            v: transaction.v,
        });
        const txData = {
            gasPrice: transaction.gasPrice,
            gasLimit: transaction.gasLimit,
            value: transaction.value,
            nonce: transaction.nonce,
            data: transaction.data,
            chainId: transaction.chainId,
            to: transaction.to,
        };
        const rsTx = await ethers_1.ethers.utils.resolveProperties(txData);
        const raw = ethers_1.ethers.utils.serializeTransaction(rsTx);
        const msgHash = ethers_1.ethers.utils.keccak256(raw);
        const msgBytes = ethers_1.ethers.utils.arrayify(msgHash);
        const pubkey = ethers_1.ethers.utils.recoverPublicKey(msgBytes, sig);
        const recoveredAddress = ethers_1.ethers.utils.recoverAddress(msgBytes, sig);
        return [recoveredAddress, transaction.from, pubkey];
    }
    async postProof(proofEndpoint, requestOptions, enrolling) {
        const url = `${this.anconEndpoint}v0/${proofEndpoint}`;
        const rawResponse = await (0, node_fetch_1.default)(url, requestOptions);
        const response = await rawResponse.json();
        this.postProofCid = response.cid;
        const cid = response.cid;
        const ipfs = response.ipfs;
        let result;
        switch (enrolling) {
            case true:
                const did = await this.getDidTransaction();
                result = {
                    contentCid: did.contentHash,
                    proofKey: did.key,
                    proofHeight: did.height,
                    proofCid: cid,
                    ipfs,
                };
                break;
            default:
                const dag = await this.fetchDag(cid);
                if (dag.cid == 'error') {
                    result = {
                        proofCid: cid,
                        ipfs,
                        contentCid: 'error',
                        proofKey: 'error',
                        proofHeight: 'error',
                    };
                    break;
                }
                result = {
                    proofCid: cid,
                    ipfs,
                    contentCid: dag.cid,
                    proofKey: dag.proofKey,
                    proofHeight: dag.proofHeight,
                };
                break;
        }
        return result;
    }
    async getProof(key, height) {
        const rawResult = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/proof/${key}?height=${height}`);
        const result = await rawResult.json();
        const abiedProof = await this.toAbiProof(Object.assign({}, result[0].Proof.exist));
        return abiedProof;
    }
    async fetchDag(id) {
        const rawResponse = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/dagjson/${id}/`);
        const response = await rawResponse.json();
        if (response.error != 'cid too short') {
            const cid = await (Object === null || Object === void 0 ? void 0 : Object.values(response.contentHash)[0]);
            return {
                cid: cid,
                proofKey: response.key,
                proofHeight: response.height,
            };
        }
        return {
            cid: 'error',
            proofKey: 'error',
            proofHeight: 'error',
        };
    }
    async getDomainName() {
        const rawResponse = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/did/did:ethr:${this.network.name}:${this.address}`);
        if (rawResponse.status === 400) {
            return { has: false, name: null };
        }
        return { has: true, name: `ethr:${this.network.name}:${this.address}` };
    }
    async getMetadata(cid, address) {
        const rawData = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/dag/${cid}/contentHash`);
        const data = await rawData.json();
        data['root'] = await await (Object === null || Object === void 0 ? void 0 : Object.values(data.root)[0]);
        return data;
    }
}
exports.default = AnconProtocol;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
//# sourceMappingURL=AnconProtocol.js.map