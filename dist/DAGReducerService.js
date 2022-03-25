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
const DagHelper_1 = require("./utils/DagHelper");
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
            topicName: '@uuidIndex',
        },
    ],
    MakeOrder: [
        {
            name: 'concatTransactionHash',
            condition: `returnValues.uri != null`,
            expression: `assign(dag, append(newData.uuid, newData))`,
            blockFetchCondition: 'returnValues.uri != null',
            blockFetchAddress: 'returnValues.seller',
            topicName: '@uuidIndex',
        },
    ],
    CancelOrder: [
        {
            name: 'concatTransactionHash',
            condition: `returnValues.uri != null`,
            expression: `assign(dag, append(newData.uuid, newData))`,
            blockFetchCondition: 'returnValues.uri != null',
            blockFetchAddress: 'returnValues.seller',
            topicName: '@uuidIndex',
        },
    ],
    Claim: [
        {
            name: 'concatTransactionHash',
            condition: `returnValues.uri != null`,
            expression: `assign(dag, append(newData.uuid, newData))`,
            blockFetchCondition: 'returnValues.uri != null',
            blockFetchAddress: 'returnValues.seller',
            topicName: '@uuidIndex',
        },
    ],
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
        this.anconEndpoint = conf.get('ANCON_URL');
        this.pk = conf.get(`DAG_STORE_KEY`);
        this.url = conf.get('BSC_TESTNET');
        this.uuidIndexTopicName = conf.get('REACT_APP_ANCON_UUID_Index_Topic_Name');
        this.web3 = instanceWeb3WithAccount(this.url, this.pk.split('0x')[1]);
        this.ethWeb3Prov = new ethers_1.ethers.providers.Web3Provider(this.web3.currentProvider);
        this.wallet = new ethers_1.ethers.Wallet(web3_1.default.utils.hexToBytes(this.pk), this.ethWeb3Prov);
        const { AnconNFTContract, MarketPlaceContract } = helper_1.default.getContracts(this.wallet, this.web3);
        this.AnconNFTContract = AnconNFTContract;
        this.MarketPlaceContract = MarketPlaceContract;
        console.log('[Instance ANCON]');
        this.Ancon = new AnconProtocol_1.default(this.ethWeb3Prov, this.wallet.address, this.anconEndpoint);
        this.dagChainReduxHandler = new redux_1.DAGChainReduxHandler(rules, this.wallet.address, this.anconEndpoint);
        this.Ancon.initialize();
    }
    async handleMintEvents() {
        const indexTopicRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=${this.uuidIndexTopicName}&from=${this.wallet.address}`);
        this.firstTimeTopic = true;
        if (indexTopicRes.status == 200) {
            this.firstTimeTopic = false;
        }
        const currentBlock = await this.web3.eth.getBlockNumber();
        const mintEvents = await this.AnconNFTContract.getPastEvents('AddMintInfo', {
            toBlock: currentBlock,
            fromBlock: currentBlock - 3,
        });
        console.log('\n(AddMintInfoScan)[FROM]', currentBlock - 3, '[TO]', currentBlock);
        console.log('(AddMintInfoScan)[Events batch lenght]', mintEvents.length);
        mintEvents.length != 0
            ? console.log('(AddMintInfoScan)[Event batch]', mintEvents, '\n')
            : null;
        mintEvents.map(async (evt) => {
            const uuid = evt.returnValues.uri;
            const checkMintTopic = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${evt.returnValues.creator}`);
            if (checkMintTopic.status === 200) {
                console.log('(AddMintInfoScan)[Got one event with uuid: ', uuid, ' Succesfully registered... proceeding to update]\n');
                const checkMintTopicJson = await checkMintTopic.json();
                const eventContent = checkMintTopicJson.content;
                await (0, DagHelper_1.anconUpdateMintMetadata)(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, eventContent, evt.transactionHash, evt.returnValues.tokenId, evt.blockNumber);
                const updatedRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`);
                const updatedResJson = await updatedRes.json();
                if (updatedRes.status == 200) {
                    console.log('(AddMintInfoScan)[Event Mint Metadata Succesfully Updated]', updatedResJson.content.uuid);
                }
                else {
                    console.log('(AddMintInfoScan)[Event Mint Metadata Updated Failed]', updatedRes.status);
                }
                if (this.firstTimeTopic) {
                    const uriIndexObject = { [uuid]: updatedResJson.content };
                    const rawPostRes = await (0, DagHelper_1.anconPostMetadata)(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, uriIndexObject);
                    const updatedIndexTopicRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=${rules.AddMintInfo[0].topicName}&from=${this.wallet.address}`);
                    const updatedIndexTopicJson = await updatedIndexTopicRes.json();
                }
                else {
                    const indexTopicJson = await indexTopicRes.json();
                    const [result] = await this.dagChainReduxHandler.handleEvent(evt, updatedResJson.content, indexTopicJson.content);
                    const rawPostRes = await (0, DagHelper_1.anconPostMetadata)(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, result);
                    rawPostRes.contentCid != 'error'
                        ? console.log('(AddMintInfoScan)[Event Transform Succesfully Posted]', rawPostRes.contentCid)
                        : console.log('(AddMintInfoScan)[Event Transform Post Failed]', rawPostRes.contentCid);
                }
            }
        });
    }
    async handleMakeOrder() {
        const indexTopicRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=${this.uuidIndexTopicName}&from=${this.wallet.address}`);
        const currentBlock = await this.web3.eth.getBlockNumber();
        const makeOrderEvents = await this.MarketPlaceContract.getPastEvents('MakeOrder', {
            toBlock: currentBlock,
            fromBlock: currentBlock - 3,
        });
        console.log('\n(MakeOrderScan)[FROM]', currentBlock - 3, '[TO]', currentBlock);
        console.log('(MakeOrderScan)[Events batch lenght]', makeOrderEvents.length);
        makeOrderEvents.length != 0
            ? console.log('(MakeOrderScan)[Event batch]', makeOrderEvents, '\n')
            : null;
        makeOrderEvents.map(async (evt) => {
            const uuid = evt.returnValues.uri;
            const checkMintTopic = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`);
            if (checkMintTopic.status === 200) {
                console.log('(MakeOrderScan)[Got one event with uuid: ', uuid, ' Succesfully registered... proceeding to update]\n');
                const checkMintTopicJson = await checkMintTopic.json();
                const eventContent = checkMintTopicJson.content;
                const price = ethers_1.ethers.utils.formatUnits(ethers_1.ethers.BigNumber.from(`${evt.returnValues.price}`));
                await (0, DagHelper_1.anconUpdateMetadataMakeOrder)(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, eventContent, evt.transactionHash, evt.returnValues.hash, evt.blockNumber, parseInt(price), evt.returnValues.timestamp);
                const updatedRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`);
                const updatedResJson = await updatedRes.json();
                if (updatedRes.status == 200) {
                    console.log('(MakeOrderScan)[Event MakeOrder Metadata Succesfully Updated]', updatedResJson.content.uuid);
                }
                else {
                    console.log('(MakeOrderScan)[Event MakeOrder Metadata Updated Failed]', updatedRes.status);
                }
                const indexTopicJson = await indexTopicRes.json();
                const [result] = await this.dagChainReduxHandler.handleEvent(evt, updatedResJson.content, indexTopicJson.content);
                const rawPostRes = await (0, DagHelper_1.anconPostMetadata)(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, result);
                rawPostRes.contentCid != 'error'
                    ? console.log('(MakeOrderScan)[Event Transform Succesfully Posted]', rawPostRes.contentCid)
                    : console.log('(MakeOrderScan)[Event Transform Post Failed]', rawPostRes.contentCid);
            }
        });
    }
    async handleCancelOrder() {
        const indexTopicRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=${this.uuidIndexTopicName}&from=${this.wallet.address}`);
        const currentBlock = await this.web3.eth.getBlockNumber();
        const cancelOrderEvents = await this.MarketPlaceContract.getPastEvents('CancelOrder', {
            toBlock: currentBlock,
            fromBlock: currentBlock - 3,
        });
        console.log('\n(CancelScan)[FROM]', currentBlock - 3, '[TO]', currentBlock);
        console.log('(CancelScan)[Events batch lenght]', cancelOrderEvents.length);
        cancelOrderEvents.length != 0
            ? console.log('(CancelScan)[Event batch]', cancelOrderEvents, '\n')
            : null;
        cancelOrderEvents.map(async (evt) => {
            const uuid = evt.returnValues.uri;
            const checkMintTopic = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`);
            if (checkMintTopic.status === 200) {
                console.log('(CancelScan)[Got one event with uuid: ', uuid, ' Succesfully registered... proceeding to update]\n');
                const checkMintTopicJson = await checkMintTopic.json();
                const eventContent = checkMintTopicJson.content;
                await (0, DagHelper_1.anconUpdateMetadataCancelOrder)(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, eventContent);
                const updatedRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`);
                const updatedResJson = await updatedRes.json();
                if (updatedRes.status == 200) {
                    console.log('(CancelScan)[Event Cancel Order Metadata Succesfully Updated]', updatedResJson.content.uuid);
                }
                else {
                    console.log('(CancelScan)[Event Cancel Order Metadata Updated Failed]', updatedRes.status);
                }
                const indexTopicJson = await indexTopicRes.json();
                const [result] = await this.dagChainReduxHandler.handleEvent(evt, updatedResJson.content, indexTopicJson.content);
                const rawPostRes = await (0, DagHelper_1.anconPostMetadata)(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, result);
                rawPostRes.contentCid != 'error'
                    ? console.log('(CancelScan)[Event Transform Succesfully Posted]', rawPostRes.contentCid)
                    : console.log('(CancelScan)[Event Transform Post Failed]', rawPostRes.contentCid);
            }
        });
    }
    async handleClaim() {
        const indexTopicRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=${this.uuidIndexTopicName}&from=${this.wallet.address}`);
        const currentBlock = await this.web3.eth.getBlockNumber();
        const cancelOrderEvents = await this.MarketPlaceContract.getPastEvents('Claim', {
            toBlock: currentBlock,
            fromBlock: currentBlock - 3,
        });
        console.log('\n(ClaimScan)[FROM]', currentBlock - 3, '[TO]', currentBlock);
        console.log('(ClaimScan)[Events batch lenght]', cancelOrderEvents.length);
        cancelOrderEvents.length != 0
            ? console.log('(ClaimScan)[Event batch]', cancelOrderEvents, '\n')
            : null;
        cancelOrderEvents.map(async (evt) => {
            const uuid = evt.returnValues.uri;
            const checkMintTopic = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`);
            if (checkMintTopic.status === 200) {
                console.log('(ClaimScan)[Got one event with uuid: ', uuid, ' Succesfully registered... proceeding to update]\n');
                const checkMintTopicJson = await checkMintTopic.json();
                const eventContent = checkMintTopicJson.content;
                await (0, DagHelper_1.anconUpdateMetadataClaim)(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, eventContent, evt.returnValues.taker);
                const updatedRes = await (0, node_fetch_1.default)(`${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`);
                const updatedResJson = await updatedRes.json();
                if (updatedRes.status == 200) {
                    console.log('(ClaimScan)[Event Claim Metadata Succesfully Updated]', updatedResJson.content.uuid);
                }
                else {
                    console.log('(ClaimScan)[Event Claim Metadata Updated Failed]', updatedRes.status);
                }
                const indexTopicJson = await indexTopicRes.json();
                const [result] = await this.dagChainReduxHandler.handleEvent(evt, updatedResJson.content, indexTopicJson.content);
                const rawPostRes = await (0, DagHelper_1.anconPostMetadata)(this.wallet.address, uuid, this.Ancon.provider, this.Ancon, this.wallet, result);
                rawPostRes.contentCid != 'error'
                    ? console.log('(ClaimScan)[Event Transform Succesfully Posted]', rawPostRes.contentCid)
                    : console.log('(ClaimScan)[Event Transform Post Failed]', rawPostRes.contentCid);
            }
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DAGReducerService.prototype, "handleMintEvents", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DAGReducerService.prototype, "handleMakeOrder", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DAGReducerService.prototype, "handleCancelOrder", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DAGReducerService.prototype, "handleClaim", null);
DAGReducerService = DAGReducerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DAGReducerService);
exports.DAGReducerService = DAGReducerService;
//# sourceMappingURL=DAGReducerService.js.map