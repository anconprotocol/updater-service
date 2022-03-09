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
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var web3_1 = require("web3");
var config_1 = require("@nestjs/config");
var helper_1 = require("../src/utils/helper");
var redux_1 = require("../src/redux");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
var rules = {
    AddMintInfo: [
        {
            name: 'concatTransactionHash',
            condition: "returnValues.creator != null",
            expression: "assign(dag, append('txHash', tx.transactionHash))",
            blockFetchCondition: 'returnValues.uri != null',
            blockFetchAddress: 'returnValues.creator',
            topicName: '@mintIndex'
        },
    ]
};
var anconPostMetadata = function (_address, _uuid, _ethrProv, _anconUrl, Ancon) { return __awaiter(void 0, void 0, void 0, function () {
    var signer, network, domainNameResponse, payload, signature, requestOptions, PostRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _ethrProv.getSigner()];
            case 1:
                signer = _a.sent();
                return [4 /*yield*/, _ethrProv.getNetwork()];
            case 2:
                network = _a.sent();
                domainNameResponse = "did:ethr:".concat(network.name, ":").concat(_address);
                payload = {
                    data1: 'data1',
                    data2: 'data2'
                };
                console.log('Requesting Ancon metadata creation, awaiting payload signing...');
                return [4 /*yield*/, signer.signMessage(ethers_1.ethers.utils.arrayify(ethers_1.ethers.utils.toUtf8Bytes(JSON.stringify(payload))))];
            case 3:
                signature = _a.sent();
                requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: '/',
                        from: domainNameResponse,
                        signature: signature,
                        data: payload,
                        topic: "mintIndex"
                    })
                };
                PostRequest = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var metadataPost, id;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('Requesting Ancon metadata creation, posting Ancon metadata...');
                                return [4 /*yield*/, Ancon.postProof('dagjson', requestOptions)];
                            case 1:
                                metadataPost = _a.sent();
                                // // returns the metadata cid
                                console.log('metadata', metadataPost);
                                return [4 /*yield*/, metadataPost.proofCid];
                            case 2:
                                id = _a.sent();
                                return [2 /*return*/, metadataPost];
                        }
                    });
                }); };
                return [4 /*yield*/, PostRequest()];
            case 4: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conf, anconEndpoint, moniker, url, jRPCprovider, network, pk, signer, web3, _a, AnconNFTContract, MarketPlaceContract, dagChainReduxHandler;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                conf = new config_1.ConfigService();
                anconEndpoint = conf.get('ANCON_URL_TENSTA');
                moniker = (0, utils_1.keccak256)((0, utils_1.toUtf8Bytes)(conf.get("DAG_STORE_MONIKER")));
                url = conf.get('BSC_TESTNET');
                jRPCprovider = new ethers_1.ethers.providers.JsonRpcProvider(url);
                return [4 /*yield*/, jRPCprovider.getNetwork()];
            case 1:
                network = _b.sent();
                pk = conf.get("DAG_STORE_KEY");
                signer = new ethers_1.ethers.Wallet(web3_1["default"].utils.hexToBytes(pk));
                web3 = new web3_1["default"](url);
                _a = helper_1["default"].getContracts(signer, web3), AnconNFTContract = _a.AnconNFTContract, MarketPlaceContract = _a.MarketPlaceContract;
                dagChainReduxHandler = new redux_1.DAGChainReduxHandler(rules, signer.address, anconEndpoint);
                console.log('[Instance ANCON]');
                // const Ancon = new AnconProtocol(
                //   null,
                //   signer.address,
                //   '',
                //   'https://tensta.did.pa/v0/',
                //   '',
                //   '',
                // );
                setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var currentBlock, allEvents;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, web3.eth.getBlockNumber()];
                            case 1:
                                currentBlock = _a.sent();
                                return [4 /*yield*/, AnconNFTContract.getPastEvents('AddMintInfo', {
                                        toBlock: currentBlock,
                                        fromBlock: currentBlock - 3
                                    })];
                            case 2:
                                allEvents = _a.sent();
                                console.log('[BLOCKS]', currentBlock);
                                console.log('[All events]', allEvents);
                                allEvents.map(function (evt) {
                                    dagChainReduxHandler.handleEvent(evt);
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }, 5000);
                if (false) {
                    // anconPostMetadata(signer.address, '', provider, anconUrl, Ancon);
                }
                return [2 /*return*/];
        }
    });
}); };
main().then();
