"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const NFTEX_json_1 = __importDefault(require("../contracts/NFTEX.sol/NFTEX.json"));
const AnconNFT_json_1 = __importDefault(require("../contracts/AnconNFT.sol/AnconNFT.json"));
require('dotenv').config();
class helper {
    static getContracts(_wallet, _web3) {
        const conf = new config_1.ConfigService();
        const wallet = _wallet;
        const web3 = _web3;
        web3.eth.defaultAccount = wallet.address;
        console.log('[default account]', web3.eth.defaultAccount);
        const anconNFTContractAddress = conf.get(`AnconTestNFTAddress`);
        console.log('[anconNFTContractAddress]', anconNFTContractAddress);
        const _anconNFTContract = new web3.eth.Contract(AnconNFT_json_1.default.abi, anconNFTContractAddress);
        const marketPlaceContractAddress = conf.get(`MarketplaceAddress`);
        console.log('[marketPlaceContractAddress]', marketPlaceContractAddress);
        const _marketPlaceContract = new web3.eth.Contract(NFTEX_json_1.default.abi, marketPlaceContractAddress);
        return {
            AnconNFTContract: _anconNFTContract,
            MarketPlaceContract: _marketPlaceContract,
        };
    }
    static async getOrderBlockNumber(contracts, tokenId) {
        const lastBlock = await contracts.web3.eth.getBlockNumber();
        let response = 0;
        for (let i = 0; i < lastBlock / 5000; i++) {
            const sub = i * 4999;
            const events = await contracts.MarketPlaceContract.getPastEvents('MakeOrder', {
                toBlock: lastBlock - sub,
                fromBlock: lastBlock - sub - 4999,
                filter: {
                    token: process.env.REACT_APP_AnconTestNFTAddress,
                },
            });
            if (events.length > 0) {
                for (const e of events) {
                    if (e.returnValues.id.toString() == tokenId) {
                        const owner = await contracts.AnconNFTContract.methods
                            .ownerOf(e.returnValues.id)
                            .call();
                        console.log('owner', owner, 'hash', e.returnValues.hash);
                        if (owner == process.env.REACT_APP_MarketplaceAddress) {
                            response = e.blockNumber;
                            i = lastBlock / 5000 + 1;
                            break;
                        }
                    }
                }
            }
        }
        return response;
    }
    static toHumanDate(_timestamp) {
        const d = new Date(0);
        d.setUTCSeconds(_timestamp);
        return d.toDateString();
    }
}
exports.default = helper;
//# sourceMappingURL=helper.js.map