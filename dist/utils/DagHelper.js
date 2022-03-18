"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anconUpdateMetadataClaim = exports.anconUpdateMetadataCancelOrder = exports.anconUpdateMetadataMakeOrder = exports.anconUpdateMintMetadata = exports.anconPostMetadata = void 0;
const ethers_1 = require("ethers");
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
exports.anconPostMetadata = anconPostMetadata;
const anconUpdateMintMetadata = async (_address, _uuid, _web3Prov, Ancon, _wallet, oldPayload, _blockchainTxHash, _blockchainTokenId, _mintBlockNumber) => {
    const network = await _web3Prov.getNetwork();
    const domainNameResponse = `did:ethr:${network.name}:${_address}`;
    console.log('Requesting Ancon metadata creation, awaiting payload signing...');
    const putPayload = Object.assign(Object.assign({}, oldPayload), { blockchainTxHash: _blockchainTxHash, blockchainTokenId: _blockchainTokenId, mintBlockNumber: _mintBlockNumber });
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
exports.anconUpdateMintMetadata = anconUpdateMintMetadata;
const anconUpdateMetadataMakeOrder = async (_address, _uuid, _web3Prov, Ancon, _wallet, oldPayload, _blockchainMakeOrderTxHash, _currentOrderHash, _makeOrderBlockNumber, _price, _timestamp) => {
    const network = await _web3Prov.getNetwork();
    const domainNameResponse = `did:ethr:${network.name}:${_address}`;
    console.log('Requesting Ancon metadata creation, awaiting payload signing...');
    const putPayload = Object.assign(Object.assign({}, oldPayload), { blockchainMakeOrderTxHash: _blockchainMakeOrderTxHash, currentOrderHash: _currentOrderHash, makeOrderBlockNumber: _makeOrderBlockNumber, price: _price, currentOrderTimestamp: _timestamp });
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
exports.anconUpdateMetadataMakeOrder = anconUpdateMetadataMakeOrder;
const anconUpdateMetadataCancelOrder = async (_address, _uuid, _web3Prov, Ancon, _wallet, oldPayload) => {
    const network = await _web3Prov.getNetwork();
    const domainNameResponse = `did:ethr:${network.name}:${_address}`;
    console.log('Requesting Ancon metadata creation, awaiting payload signing...');
    const putPayload = Object.assign(Object.assign({}, oldPayload), { blockchainMakeOrderTxHash: '', currentOrderHash: '', makeOrderBlockNumber: '', price: '', currentOrderTimestamp: '' });
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
exports.anconUpdateMetadataCancelOrder = anconUpdateMetadataCancelOrder;
const anconUpdateMetadataClaim = async (_address, _uuid, _web3Prov, Ancon, _wallet, oldPayload, _buyerAddress) => {
    const network = await _web3Prov.getNetwork();
    const domainNameResponse = `did:ethr:${network.name}:${_address}`;
    console.log('Requesting Ancon metadata creation, awaiting payload signing...');
    const putPayload = Object.assign(Object.assign({}, oldPayload), { blockchainMakeOrderTxHash: '', currentOrderHash: '', makeOrderBlockNumber: '', price: '', currentOrderTimestamp: '', owner: _buyerAddress });
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
exports.anconUpdateMetadataClaim = anconUpdateMetadataClaim;
//# sourceMappingURL=DagHelper.js.map