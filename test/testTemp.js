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
var web3_1 = require("web3");
var config_1 = require("@nestjs/config");
var helper_1 = require("../src/utils/helper");
var AnconProtocol_1 = require("../src/utils/AnconProtocol");
var redux_1 = require("../src/redux");
var node_fetch_1 = require("node-fetch");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
var rules = {
    AddMintInfo: [
        {
            name: 'concatTransactionHash',
            condition: "returnValues.creator != null",
            expression: "assign(dag, append(newData.uuid, newData))",
            blockFetchCondition: 'returnValues.uri != null',
            blockFetchAddress: 'returnValues.creator',
            topicName: '@mintIndex'
        },
    ]
};
var anconPostMetadata = function (_address, _uuid, _web3Prov, Ancon, _wallet, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var network, domainNameResponse, signature, requestOptions, PostRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _web3Prov.getNetwork()];
            case 1:
                network = _a.sent();
                domainNameResponse = "did:ethr:".concat(network.name, ":").concat(_address);
                console.log('Requesting Ancon metadata creation, awaiting payload signing...');
                return [4 /*yield*/, _wallet.signMessage(ethers_1.ethers.utils.arrayify(ethers_1.ethers.utils.toUtf8Bytes(JSON.stringify(payload))))];
            case 2:
                signature = _a.sent();
                requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        path: '/',
                        from: domainNameResponse,
                        signature: signature,
                        data: payload,
                        topic: "@mintIndex"
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
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var instanceWeb3WithAccount = function (_url, pk) {
    var web3 = new web3_1["default"](_url);
    var web3Account = web3.eth.accounts.privateKeyToAccount(pk);
    web3.eth.accounts.wallet.add(web3Account);
    return web3;
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conf, anconEndpoint, pk, url, web3, ethWeb3Prov, wallet, _a, AnconNFTContract, MarketPlaceContract, Ancon, dagChainReduxHandler, indexTopicRes, firstTimeTopic;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                conf = new config_1.ConfigService();
                anconEndpoint = conf.get('ANCON_URL');
                pk = conf.get("DAG_STORE_KEY");
                url = conf.get('BSC_TESTNET');
                web3 = instanceWeb3WithAccount(url, pk.split('0x')[1]);
                ethWeb3Prov = new ethers_1.ethers.providers.Web3Provider(web3.currentProvider);
                wallet = new ethers_1.ethers.Wallet(web3_1["default"].utils.hexToBytes(pk), ethWeb3Prov);
                _a = helper_1["default"].getContracts(wallet, web3), AnconNFTContract = _a.AnconNFTContract, MarketPlaceContract = _a.MarketPlaceContract;
                console.log('[Instance ANCON]');
                Ancon = new AnconProtocol_1["default"](ethWeb3Prov, wallet.address, anconEndpoint);
                return [4 /*yield*/, Ancon.initialize()];
            case 1:
                _b.sent();
                dagChainReduxHandler = new redux_1.DAGChainReduxHandler(rules, wallet.address, anconEndpoint);
                return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(anconEndpoint, "v0/topics?topic=").concat(rules.AddMintInfo[0].topicName, "&from=").concat(wallet.address))];
            case 2:
                indexTopicRes = _b.sent();
                firstTimeTopic = true;
                if (indexTopicRes.status == 200) {
                    firstTimeTopic = false;
                }
                console.log('[First Time Topic is]', firstTimeTopic, '\n');
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
                                console.log('\n[FROM]', currentBlock - 3, '[TO]', currentBlock);
                                console.log('[Events batch lenght]', allEvents.length);
                                allEvents.length != 0
                                    ? console.log('[Event batch]', allEvents, '\n')
                                    : null;
                                allEvents.map(function (evt) { return __awaiter(void 0, void 0, void 0, function () {
                                    var result, rule, uuid, checkMintTopic, checkMintTopicJson, eventContent, uriIndexObject, rawPostRes, updatedIndexTopicRes, updatedIndexTopicJson, indexTopicJson, result_1, rawPostRes;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                uuid = evt.returnValues.uri;
                                                //Wait for the metadata to update
                                                return [4 /*yield*/, (0, AnconProtocol_1.sleep)(10000)];
                                            case 1:
                                                //Wait for the metadata to update
                                                _b.sent();
                                                return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(anconEndpoint, "v0/topics?topic=uuid:").concat(uuid, "&from=").concat(evt.returnValues.creator))];
                                            case 2:
                                                checkMintTopic = _b.sent();
                                                if (!(checkMintTopic.status === 200)) return [3 /*break*/, 11];
                                                console.log('[Got one event with uuid: ', uuid, ' Succesfully registered... proceeding to index]\n');
                                                return [4 /*yield*/, checkMintTopic.json()];
                                            case 3:
                                                checkMintTopicJson = _b.sent();
                                                eventContent = checkMintTopicJson.content;
                                                if (!firstTimeTopic) return [3 /*break*/, 7];
                                                uriIndexObject = (_a = {}, _a[uuid] = eventContent, _a);
                                                return [4 /*yield*/, anconPostMetadata(wallet.address, uuid, Ancon.provider, Ancon, wallet, uriIndexObject)];
                                            case 4:
                                                rawPostRes = _b.sent();
                                                return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(anconEndpoint, "v0/topics?topic=").concat(rules.AddMintInfo[0].topicName, "&from=").concat(wallet.address))];
                                            case 5:
                                                updatedIndexTopicRes = _b.sent();
                                                return [4 /*yield*/, updatedIndexTopicRes.json()];
                                            case 6:
                                                updatedIndexTopicJson = _b.sent();
                                                return [3 /*break*/, 11];
                                            case 7: return [4 /*yield*/, indexTopicRes.json()];
                                            case 8:
                                                indexTopicJson = _b.sent();
                                                return [4 /*yield*/, dagChainReduxHandler.handleEvent(evt, checkMintTopicJson.content, indexTopicJson.content)];
                                            case 9:
                                                result_1 = (_b.sent())[0];
                                                return [4 /*yield*/, anconPostMetadata(wallet.address, uuid, Ancon.provider, Ancon, wallet, result_1)];
                                            case 10:
                                                rawPostRes = _b.sent();
                                                rawPostRes.contentCid != 'error'
                                                    ? console.log('[Event Transform Succesfully Posted]', rawPostRes.contentCid)
                                                    : console.log('[Event Transform Post Failed]', rawPostRes.contentCid);
                                                _b.label = 11;
                                            case 11: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                        }
                    });
                }); }, 10000);
                if (false) {
                    // anconPostMetadata(signer.address, '', provider, anconUrl, Ancon);
                }
                return [2 /*return*/];
        }
    });
}); };
main().then();
