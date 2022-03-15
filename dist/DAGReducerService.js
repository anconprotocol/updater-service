"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var DAGReducerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAGReducerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const ethers_1 = require("ethers");
const AnconProtocol_1 = __importDefault(require("./utils/AnconProtocol"));
const web3_1 = __importDefault(require("web3"));
const redux_1 = require("./redux");
const config_1 = require("@nestjs/config");
const helper_1 = __importDefault(require("./utils/helper"));
const node_fetch_1 = __importDefault(require("node-fetch"));
require('dotenv').config();
const rules = {
    AddMintInfo: [
        {
            name: 'concatTransactionHash',
            condition: `returnValues.creator != null`,
            expression: `assign(dag, append(newData.uuid, newData))`,
            blockFetchCondition: 'returnValues.uri != null',
            blockFetchAddress: 'returnValues.creator',
            topicName: '@mintIndex',
        },
    ],
};
const anconPostMetadata = async (_address, _uuid, _web3Prov, Ancon, _wallet, payload) => {
    const network = await _web3Prov.getNetwork();
    const domainNameResponse = `did:ethr:${network.name}:${_address}`;
    console.log('Requesting Ancon metadata creation, awaiting payload signing...');
    const signature = await _wallet.signMessage(ethers_1.ethers.utils.arrayify(ethers_1.ethers.utils.toUtf8Bytes(JSON.stringify(payload))));
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            path: '/',
            from: domainNameResponse,
            signature,
            data: payload,
            topic: `@mintIndex`,
        }),
    };
    const PostRequest = async () => {
        console.log('Requesting Ancon metadata creation, posting Ancon metadata...');
        const metadataPost = await Ancon.postProof('dagjson', requestOptions);
        console.log('metadata', metadataPost);
        const id = await metadataPost.proofCid;
        return metadataPost;
    };
    return await PostRequest();
};
const anconUpdateMetadata = async (_address, _uuid, _web3Prov, Ancon, _wallet, oldPayload, _blockchainTxHash, _blockchainTokenId) => {
    const network = await _web3Prov.getNetwork();
    const domainNameResponse = `did:ethr:${network.name}:${_address}`;
    console.log('Requesting Ancon metadata creation, awaiting payload signing...');
    const putPayload = Object.assign(Object.assign({}, oldPayload), { blockchainTxHash: _blockchainTxHash, blockchainTokenId: _blockchainTokenId });
    const signature = await _wallet.signMessage(ethers_1.ethers.utils.arrayify(ethers_1.ethers.utils.toUtf8Bytes(JSON.stringify(putPayload))));
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            path: '/',
            from: domainNameResponse,
            signature,
            data: putPayload,
            topic: `uuid:${_uuid}`,
        }),
    };
    const PostRequest = async () => {
        console.log('Requesting Ancon metadata creation, posting Ancon metadata...');
        const metadataPost = await Ancon.postProof('dagjson', requestOptions);
        console.log('metadata', metadataPost);
        const id = await metadataPost.proofCid;
        return metadataPost;
    };
    return await PostRequest();
};
const instanceWeb3WithAccount = (_url, pk) => {
    const web3 = new web3_1.default(_url);
    const web3Account = web3.eth.accounts.privateKeyToAccount(pk);
    web3.eth.accounts.wallet.add(web3Account);
    return web3;
};
let DAGReducerService = DAGReducerService_1 = class DAGReducerService {
    constructor() {
        this.logger = new common_1.Logger(DAGReducerService_1.name);
        const conf = new config_1.ConfigService();
        this.anconEndpoint = conf.get('ANCON_URL_TENSTA');
        this.pk = conf.get(`DAG_STORE_KEY`);
        this.url = conf.get('BSC_TESTNET');
        this.web3 = instanceWeb3WithAccount(this.url, this.pk.split('0x')[1]);
        this.ethWeb3Prov = new ethers_1.ethers.providers.Web3Provider(this.web3.currentProvider);
        this.wallet = new ethers_1.ethers.Wallet(web3_1.default.utils.hexToBytes(this.pk), this.ethWeb3Prov);
        const { AnconNFTContract, MarketPlaceContract } = helper_1.default.getContracts(this.wallet, this.web3);
        this.AnconNFTContract = AnconNFTContract;
        this.MarketPlaceContract = MarketPlaceContract;
        console.log('[Instance ANCON]');
        this.Ancon = new AnconProtocol_1.default(this.ethWeb3Prov, this.wallet.address, this.anconEndpoint);
        this.dagChainReduxHandler = new redux_1.DAGChainReduxHandler(rules, this.wallet.address, this.anconEndpoint);
    }
    async handleAllEvents() {
        await this.Ancon.initialize();
        const indexTopicRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=${rules.AddMintInfo[0].topicName}&from=${this.wallet.address}`);
        this.firstTimeTopic = true;
        if (indexTopicRes.status == 200) {
            this.firstTimeTopic = false;
        }
        console.log('[First Time Topic is]', this.firstTimeTopic, '\n');
        const currentBlock = await this.web3.eth.getBlockNumber();
        const allEvents = await this.AnconNFTContract.getPastEvents('AddMintInfo', {
            toBlock: currentBlock,
            fromBlock: currentBlock - 3,
        });
        console.log('\n[FROM]', currentBlock - 3, '[TO]', currentBlock);
        console.log('[Events batch lenght]', allEvents.length);
        allEvents.length != 0
            ? console.log('[Event batch]', allEvents, '\n')
            : null;
        allEvents.map(async (evt) => {
            let result, rule;
            const uuid = evt.returnValues.uri;
            const checkMintTopic = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${evt.returnValues.creator}`);
            if (checkMintTopic.status === 200) {
                console.log('[Got one event with uuid: ', uuid, ' Succesfully registered... proceeding to update]\n');
                const checkMintTopicJson = await checkMintTopic.json();
                const eventContent = checkMintTopicJson.content;
                await anconUpdateMetadata(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, eventContent, evt.transactionHash, evt.returnValues.tokenId);
                const updatedRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`);
                const updatedResJson = await updatedRes.json();
                if (updatedRes.status == 200) {
                    console.log('[Event Mint Metadata Succesfully Updated]', updatedResJson.content.uuid);
                }
                else {
                    console.log('[Event Transform Post Failed]', updatedRes.status);
                }
                if (this.firstTimeTopic) {
                    const uriIndexObject = { [uuid]: updatedResJson.content };
                    const rawPostRes = await anconPostMetadata(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, uriIndexObject);
                    const updatedIndexTopicRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=${rules.AddMintInfo[0].topicName}&from=${this.wallet.address}`);
                    const updatedIndexTopicJson = await updatedIndexTopicRes.json();
                }
                else {
                    const indexTopicJson = await indexTopicRes.json();
                    const [result] = await this.dagChainReduxHandler.handleEvent(evt, updatedResJson.content, indexTopicJson.content);
                    const rawPostRes = await anconPostMetadata(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, result);
                    rawPostRes.contentCid != 'error'
                        ? console.log('[Event Transform Succesfully Posted]', rawPostRes.contentCid)
                        : console.log('[Event Transform Post Failed]', rawPostRes.contentCid);
                }
            }
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DAGReducerService.prototype, "handleAllEvents", null);
DAGReducerService = DAGReducerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DAGReducerService);
exports.DAGReducerService = DAGReducerService;
//# sourceMappingURL=DAGReducerService.js.map