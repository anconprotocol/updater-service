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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = __importDefault(require("axios"));
const AnconProtocol__factory_1 = require("./types/ethers-contracts/factories/AnconProtocol__factory");
const ethers_1 = require("ethers");
const web3_1 = __importDefault(require("web3"));
const utils_1 = require("ethers/lib/utils");
const config_1 = require("@nestjs/config");
require('dotenv').config();
let TasksService = TasksService_1 = class TasksService {
    constructor() {
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    async handleCron() {
        const conf = new config_1.ConfigService();
        this.logger.debug('Called every 30 minutes');
        const ipfsUrl = conf.get('ANCON_URL');
        let ipfsRes;
        axios_1.default.get(ipfsUrl + 'v0/proofs/lasthash').then(function (response) {
            ipfsRes = response;
            console.log(response.data);
        });
        const activeRelayers = conf.get('RELAYERS_ACTIVE').split(',');
        const pk = conf.get(`DAG_STORE_KEY`);
        const moniker = (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)(conf.get(`DAG_STORE_MONIKER`)));
        for (const relayerName of activeRelayers) {
            try {
                const url = conf.get(relayerName);
                const provider = new ethers_1.ethers.providers.JsonRpcProvider(url);
                const signer = new ethers_1.ethers.Wallet(web3_1.default.utils.hexToBytes(pk));
                const f = new AnconProtocol__factory_1.AnconProtocol__factory(signer.connect(provider));
                const contract = AnconProtocol__factory_1.AnconProtocol__factory.connect(conf.get(`${relayerName}_CONTRACT_ADDRESS`), provider);
                const contract2 = f.attach(conf.get(`${relayerName}_CONTRACT_ADDRESS`));
                const relayHeader = await contract.getProtocolHeader(moniker);
                const h = (0, utils_1.hexlify)(utils_1.base64.decode(ipfsRes.data.lastHash.hash));
                console.log(await signer.getAddress(), relayHeader, h, parseInt(ipfsRes.data.lastHash.version).toString());
                if (relayHeader !== h) {
                    const gasLimit = await contract2.estimateGas.updateRelayerHeader(moniker, h, parseInt(ipfsRes.data.lastHash.version).toString());
                    let rate = gasLimit.toNumber() * 1.2;
                    rate = Math.floor(rate);
                    const tx = await contract2.updateRelayerHeader(moniker, h, parseInt(ipfsRes.data.lastHash.version).toString(), { gasLimit: rate.toString() });
                    console.log(`${relayerName} header updated successfully ${tx.hash}`);
                }
            }
            catch (error) {
                console.log('error', error);
            }
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(process.env.RELAYER_TIME),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "handleCron", null);
TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)()
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=TaskService.js.map