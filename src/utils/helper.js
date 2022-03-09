"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var config_1 = require("@nestjs/config");
var AnconNFT = require('../contracts/AnconNFT.sol/AnconNFT.json');
var NFTEX = require('../contracts/NFTEX.sol/NFTEX.json');
require('dotenv').config();
var helper = /** @class */ (function () {
    function helper() {
    }
    helper.getContracts = function (_wallet, _web3) {
        var conf = new config_1.ConfigService();
        var wallet = _wallet;
        var web3 = _web3;
        web3.eth.defaultAccount = wallet.address;
        console.log('[default account]', web3.eth.defaultAccount);
        var anconNFTContractAddress = conf.get("AnconTestNFTAddress");
        console.log('[anconNFTContractAddress]', anconNFTContractAddress);
        var _anconNFTContract = new web3.eth.Contract(AnconNFT.abi, anconNFTContractAddress);
        var marketPlaceContractAddress = conf.get("MarketplaceAddress");
        console.log('[marketPlaceContractAddress]', marketPlaceContractAddress);
        var _marketPlaceContract = new web3.eth.Contract(NFTEX.abi, marketPlaceContractAddress);
        return {
            AnconNFTContract: _anconNFTContract,
            MarketPlaceContract: _marketPlaceContract
        };
    };
    helper.getOrderBlockNumber = function (contracts, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var lastBlock, response, i, sub, events, _i, events_1, e, owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, contracts.web3.eth.getBlockNumber()];
                    case 1:
                        lastBlock = _a.sent();
                        response = 0;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < lastBlock / 5000)) return [3 /*break*/, 8];
                        sub = i * 4999;
                        return [4 /*yield*/, contracts.MarketPlaceContract.getPastEvents('MakeOrder', {
                                toBlock: lastBlock - sub,
                                fromBlock: lastBlock - sub - 4999,
                                filter: {
                                    token: process.env.REACT_APP_AnconTestNFTAddress
                                }
                            })];
                    case 3:
                        events = _a.sent();
                        if (!(events.length > 0)) return [3 /*break*/, 7];
                        _i = 0, events_1 = events;
                        _a.label = 4;
                    case 4:
                        if (!(_i < events_1.length)) return [3 /*break*/, 7];
                        e = events_1[_i];
                        if (!(e.returnValues.id.toString() == tokenId)) return [3 /*break*/, 6];
                        return [4 /*yield*/, contracts.AnconNFTContract.methods
                                .ownerOf(e.returnValues.id)
                                .call()];
                    case 5:
                        owner = _a.sent();
                        console.log('owner', owner, 'hash', e.returnValues.hash);
                        if (owner == process.env.REACT_APP_MarketplaceAddress) {
                            response = e.blockNumber;
                            i = lastBlock / 5000 + 1;
                            return [3 /*break*/, 7];
                        }
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/, response];
                }
            });
        });
    };
    helper.toHumanDate = function (_timestamp) {
        var d = new Date(0);
        d.setUTCSeconds(_timestamp);
        return d.toDateString();
    };
    return helper;
}());
exports["default"] = helper;
