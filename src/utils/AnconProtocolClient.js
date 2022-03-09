"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.sleep = void 0;
var ethers_1 = require("ethers");
var web3_1 = require("web3");
var ethers_contracts_1 = require("../types/ethers-contracts");
var AnconProtocol__factory_1 = require("../types/ethers-contracts/factories/AnconProtocol__factory");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv');
var AnconProtocol = /** @class */ (function () {
    /**
     * needs to be initiliaze with a provider and an address
     */
    function AnconProtocol(provider, address, moniker, anconEndpoint) {
        this.provider = provider;
        this.prov = new ethers_1.ethers.providers.Web3Provider(provider);
        this.provWeb3 = new web3_1["default"](provider);
        this.address = address;
        this.signer = this.prov.getSigner();
        this.network = '';
        this.postProofCid = '';
        this.anconAddress = '';
        this.daiAddress = '';
        this.xdvnftAdress = '';
        this.moniker = moniker;
        this.anconEndpoint = anconEndpoint;
    }
    AnconProtocol.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getNetwork()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @returns returns the network the user is in
     */
    AnconProtocol.prototype.getNetwork = function () {
        return __awaiter(this, void 0, void 0, function () {
            var network;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prov.getNetwork()];
                    case 1:
                        network = _a.sent();
                        this.network = network;
                        return [4 /*yield*/, this.getContractAddresses(network)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AnconProtocol.prototype.getContractAddresses = function (network) {
        return __awaiter(this, void 0, void 0, function () {
            var anconAddress, daiAddress, xdvnftAdress;
            return __generator(this, function (_a) {
                switch (this.network.chainId) {
                    // bnbt
                    case 97:
                        anconAddress = process.env.REACT_APP_ANCON_bnbt;
                        daiAddress = process.env.REACT_APP_DAI_bnbt;
                        xdvnftAdress = process.env.REACT_APP_XDVNFT_bnbt;
                        break;
                    // kovan
                    case 42:
                        anconAddress = process.env.REACT_APP_ANCON_kovan;
                        daiAddress = process.env.REACT_APP_DAI_kovan;
                        xdvnftAdress = process.env.REACT_APP_XDVNFT_kovan;
                        break;
                    // mumbai
                    case 80001:
                        anconAddress = process.env.REACT_APP_ANCON_mumbai;
                        daiAddress = process.env.REACT_APP_DAI_mumbai;
                        xdvnftAdress = process.env.REACT_APP_XDVNFT_mumbai;
                        break;
                }
                this.anconAddress = anconAddress;
                this.daiAddress = daiAddress;
                this.xdvnftAdress = xdvnftAdress;
                return [2 /*return*/, {
                        ancon: this.anconAddress,
                        dai: this.daiAddress,
                        xdv: this.xdvnftAdress
                    }];
            });
        });
    };
    /**
     *
     * @param address address to get the did from
     * @returns encoded did
     */
    AnconProtocol.prototype.getDidTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rawDid, encodedDid, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://".concat(this.anconEndpoint, "did/raw:did:ethr:").concat(this.network.name, ":").concat(this.address))];
                    case 1:
                        rawDid = _a.sent();
                        return [4 /*yield*/, rawDid.json()];
                    case 2:
                        encodedDid = _a.sent();
                        return [4 /*yield*/, (Object === null || Object === void 0 ? void 0 : Object.values(encodedDid.contentHash)[0])];
                    case 3:
                        content = _a.sent();
                        encodedDid.contentHash = content;
                        return [2 /*return*/, encodedDid];
                }
            });
        });
    };
    AnconProtocol.prototype.signMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rawDid, encodedDid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://".concat(this.anconEndpoint, "did/raw:did:ethr:").concat(this.network.name, ":").concat(this.address))];
                    case 1:
                        rawDid = _a.sent();
                        return [4 /*yield*/, rawDid.json()];
                    case 2:
                        encodedDid = _a.sent();
                        return [2 /*return*/, encodedDid];
                }
            });
        });
    };
    /**
     *
     * @param proof the fetch object proof
     * @returns retunrn the to abi Proof
     */
    AnconProtocol.prototype.toAbiProof = function (proof) {
        proof.key = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(proof.key));
        proof.value = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(proof.value));
        proof.leaf.prefix = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(proof.leaf.prefix));
        proof.leaf.hash = 1;
        proof.path = proof.path.map(function (x) {
            var suffix;
            if (!!x.suffix) {
                suffix = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(x.suffix));
                return {
                    valid: true,
                    prefix: ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(x.prefix)),
                    suffix: suffix,
                    hash: 1
                };
            }
            else {
                return {
                    valid: true,
                    prefix: ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(x.prefix)),
                    hash: 1,
                    suffix: '0x'
                };
            }
        });
        proof.leaf.prehash_key = 0;
        proof.leaf.len = proof.leaf.length;
        proof.valid = true;
        proof.leaf.valid = true;
        return proof;
    };
    /**
     *
     * @param transactionHash transaction hash of a normal transfer made by the user
     * @returns an array containing [recoveredAddress, sentAddress, pubkey]
     */
    AnconProtocol.prototype.getPubKey = function (transactionHash) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction, sig, txData, rsTx, raw, msgHash, msgBytes, pubkey, recoveredAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prov.getTransaction(transactionHash)];
                    case 1:
                        transaction = _a.sent();
                        console.log('transaction', transaction);
                        sig = ethers_1.ethers.utils.joinSignature({
                            r: transaction.r,
                            s: transaction.s,
                            v: transaction.v
                        });
                        txData = {
                            gasPrice: transaction.gasPrice,
                            gasLimit: transaction.gasLimit,
                            value: transaction.value,
                            nonce: transaction.nonce,
                            data: transaction.data,
                            chainId: transaction.chainId,
                            to: transaction.to
                        };
                        return [4 /*yield*/, ethers_1.ethers.utils.resolveProperties(txData)];
                    case 2:
                        rsTx = _a.sent();
                        raw = ethers_1.ethers.utils.serializeTransaction(rsTx);
                        msgHash = ethers_1.ethers.utils.keccak256(raw);
                        msgBytes = ethers_1.ethers.utils.arrayify(msgHash);
                        pubkey = ethers_1.ethers.utils.recoverPublicKey(msgBytes, sig);
                        recoveredAddress = ethers_1.ethers.utils.recoverAddress(msgBytes, sig);
                        return [2 /*return*/, [recoveredAddress, transaction.from, pubkey]];
                }
            });
        });
    };
    /**
     *
     * @param proofEndpoint the endpoint to be called, ex:did/web
     * @param requestOptions the request options to be called
     * @param enrolling optional argument to receive also the user key and height
     * @returns an object {cid, ipfs} if enrolling returns {did, key, height}
     */
    AnconProtocol.prototype.postProof = function (proofEndpoint, requestOptions, enrolling) {
        return __awaiter(this, void 0, void 0, function () {
            var url, rawResponse, response, cid, ipfs, result, _a, did, dag;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = "https://".concat(this.anconEndpoint).concat(proofEndpoint);
                        return [4 /*yield*/, fetch(url, requestOptions)];
                    case 1:
                        rawResponse = _b.sent();
                        return [4 /*yield*/, rawResponse.json()];
                    case 2:
                        response = _b.sent();
                        this.postProofCid = response.cid;
                        cid = response.cid;
                        ipfs = response.ipfs;
                        _a = enrolling;
                        switch (_a) {
                            case true: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.getDidTransaction()];
                    case 4:
                        did = _b.sent();
                        result = {
                            contentCid: did.contentHash,
                            proofKey: did.key,
                            proofHeight: did.height,
                            proofCid: cid,
                            ipfs: ipfs
                        };
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.fetchDag(cid)];
                    case 6:
                        dag = _b.sent();
                        console.log('dag', dag);
                        if (dag.cid == 'error') {
                            result = {
                                proofCid: cid,
                                ipfs: ipfs,
                                contentCid: 'error',
                                proofKey: 'error',
                                proofHeight: 'error'
                            };
                            return [3 /*break*/, 7];
                        }
                        result = {
                            proofCid: cid,
                            ipfs: ipfs,
                            contentCid: dag.cid,
                            proofKey: dag.proofKey,
                            proofHeight: dag.proofHeight
                        };
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     *
     * @param key proof key
     * @param height proof height
     * @returns the to abi proof
     */
    AnconProtocol.prototype.getProof = function (key, height) {
        return __awaiter(this, void 0, void 0, function () {
            var rawResult, result, abiedProof;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://".concat(this.anconEndpoint, "proof/").concat(key, "?height=").concat(height))];
                    case 1:
                        rawResult = _a.sent();
                        return [4 /*yield*/, rawResult.json()];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.toAbiProof(__assign({}, result[0].Proof.exist))];
                    case 3:
                        abiedProof = _a.sent();
                        return [2 /*return*/, abiedProof];
                }
            });
        });
    };
    AnconProtocol.prototype.fetchDag = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rawResponse, response, cid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://".concat(this.anconEndpoint, "dagjson/").concat(id, "/"))];
                    case 1:
                        rawResponse = _a.sent();
                        return [4 /*yield*/, rawResponse.json()];
                    case 2:
                        response = _a.sent();
                        if (!(response.error != 'cid too short')) return [3 /*break*/, 4];
                        return [4 /*yield*/, (Object === null || Object === void 0 ? void 0 : Object.values(response.contentHash)[0])];
                    case 3:
                        cid = _a.sent();
                        return [2 /*return*/, {
                                cid: cid,
                                proofKey: response.key,
                                proofHeight: response.height
                            }];
                    case 4: return [2 /*return*/, {
                            cid: 'error',
                            proofKey: 'error',
                            proofHeight: 'error'
                        }];
                }
            });
        });
    };
    /**
     *
     * @param cid did return from get proof
     * @param proof the to abi proof
     * @returns the result of the enrollment
     */
    AnconProtocol.prototype.enrollL2Account = function (cid, proof) {
        return __awaiter(this, void 0, void 0, function () {
            var anconContractReader, contract2, UTF8_cid, getProof, did, gasLimit, decimalRate, rate, enroll, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('enrolling to L2');
                        anconContractReader = AnconProtocol__factory_1.AnconProtocol__factory.connect(this.anconAddress, this.prov);
                        contract2 = AnconProtocol__factory_1.AnconProtocol__factory.connect(this.anconAddress, this.signer);
                        UTF8_cid = ethers_1.ethers.utils.toUtf8Bytes(cid);
                        return [4 /*yield*/, anconContractReader.getProof(UTF8_cid)];
                    case 1:
                        getProof = _b.sent();
                        if (getProof !== '0x') {
                            return [2 /*return*/, 'proof already exist'];
                        }
                        return [4 /*yield*/, this.getDidTransaction()];
                    case 2:
                        did = _b.sent();
                        return [4 /*yield*/, this.getPastEvents()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, contract2.estimateGas.enrollL2Account(this.moniker, proof.key, UTF8_cid, proof)];
                    case 4:
                        gasLimit = _b.sent();
                        decimalRate = gasLimit.toNumber() * 1.2;
                        rate = Math.floor(decimalRate);
                        _a = this.network.chainId;
                        switch (_a) {
                            case 97: return [3 /*break*/, 5];
                            case 42: return [3 /*break*/, 7];
                            case 80001: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 5: return [4 /*yield*/, contract2.enrollL2Account(this.moniker, proof.key, UTF8_cid, proof, {
                            gasLimit: rate.toString()
                        })];
                    case 6:
                        enroll = _b.sent();
                        return [3 /*break*/, 11];
                    case 7: return [4 /*yield*/, contract2.enrollL2Account(this.moniker, proof.key, UTF8_cid, proof, {
                            gasPrice: '400000000000',
                            gasLimit: 900000,
                            from: this.address
                        })];
                    case 8:
                        enroll = _b.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, contract2.enrollL2Account(this.moniker, proof.key, UTF8_cid, proof, {
                            gasLimit: rate.toString()
                        })];
                    case 10:
                        enroll = _b.sent();
                        return [3 /*break*/, 11];
                    case 11: return [4 /*yield*/, (enroll === null || enroll === void 0 ? void 0 : enroll.wait(1))];
                    case 12:
                        _b.sent();
                        console.log('enrolled');
                        console.log(enroll);
                        return [2 /*return*/, enroll];
                }
            });
        });
    };
    /**
     *
     * @returns returns true when the protocol is updated
     */
    AnconProtocol.prototype.getPastEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var AnconReader, filter, from, result, rawLastHash, lasthash, decodedlastHash, sequence, time, maxTime, relayHash, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AnconProtocol__factory_1.AnconProtocol__factory.connect(this.anconAddress, this.prov)];
                    case 1:
                        AnconReader = _a.sent();
                        return [4 /*yield*/, AnconReader.filters.HeaderUpdated(this.moniker)];
                    case 2:
                        filter = _a.sent();
                        return [4 /*yield*/, this.prov.getBlockNumber()];
                    case 3:
                        from = _a.sent();
                        return [4 /*yield*/, AnconReader.queryFilter(filter, from)];
                    case 4:
                        result = _a.sent();
                        return [4 /*yield*/, fetch("https://".concat(this.anconEndpoint, "proofs/lasthash"))];
                    case 5:
                        rawLastHash = _a.sent();
                        return [4 /*yield*/, rawLastHash.json()];
                    case 6:
                        lasthash = _a.sent();
                        decodedlastHash = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.base64.decode(lasthash.lastHash.hash));
                        sequence = lasthash.lastHash.version;
                        time = Date.now();
                        maxTime = Date.now() + 120000;
                        relayHash = '0x';
                        _a.label = 7;
                    case 7:
                        if (!(time < maxTime)) return [3 /*break*/, 13];
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 11, , 12]);
                        sequence += 1;
                        return [4 /*yield*/, AnconReader.queryFilter(filter, from)];
                    case 9:
                        result = _a.sent();
                        console.log(result);
                        if (result.length > 0) {
                            return [3 /*break*/, 13];
                        }
                        time = Date.now();
                        return [4 /*yield*/, sleep(1000)];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_1 = _a.sent();
                        console.log('error', error_1);
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 7];
                    case 13: return [2 /*return*/, true];
                }
            });
        });
    };
    AnconProtocol.prototype.mintNft = function (hexData, userProofKey) {
        return __awaiter(this, void 0, void 0, function () {
            var xdvSigner, did, rawLastHash, lasthash, version, packetProof, userProof, gasLimit, decimalRate, rate, mint, _a, error_2, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        xdvSigner = ethers_contracts_1.XDVNFT__factory.connect(this.xdvnftAdress, this.signer);
                        return [4 /*yield*/, sleep(7000)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.getDidTransaction()];
                    case 2:
                        did = _b.sent();
                        return [4 /*yield*/, fetch("https://".concat(this.anconEndpoint, "proofs/lasthash"))];
                    case 3:
                        rawLastHash = _b.sent();
                        return [4 /*yield*/, rawLastHash.json()];
                    case 4:
                        lasthash = _b.sent();
                        version = lasthash.lastHash.version;
                        return [4 /*yield*/, this.getProof(userProofKey, version)];
                    case 5:
                        packetProof = _b.sent();
                        return [4 /*yield*/, this.getProof(did.key, version)];
                    case 6:
                        userProof = _b.sent();
                        return [4 /*yield*/, xdvSigner.estimateGas.mintWithProof(hexData, userProof, packetProof)];
                    case 7:
                        gasLimit = _b.sent();
                        decimalRate = gasLimit.toNumber() * 1.2;
                        rate = Math.floor(decimalRate);
                        // start minting
                        console.log('estimated ready', decimalRate, rate);
                        _a = this.network.chainId;
                        switch (_a) {
                            case 97: return [3 /*break*/, 8];
                            case 80001: return [3 /*break*/, 8];
                            case 42: return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 18];
                    case 8:
                        _b.trys.push([8, 10, , 12]);
                        return [4 /*yield*/, xdvSigner.mintWithProof(hexData, userProof, packetProof, {
                                gasLimit: rate.toString()
                            })];
                    case 9:
                        mint = _b.sent();
                        return [3 /*break*/, 12];
                    case 10:
                        error_2 = _b.sent();
                        sleep(5000);
                        console.log('failed, trying again...', error_2);
                        return [4 /*yield*/, xdvSigner.mintWithProof(hexData, userProof, packetProof)];
                    case 11:
                        mint = _b.sent();
                        return [3 /*break*/, 12];
                    case 12: return [3 /*break*/, 18];
                    case 13:
                        _b.trys.push([13, 15, , 17]);
                        return [4 /*yield*/, xdvSigner.mintWithProof(hexData, userProof, packetProof, {
                                gasPrice: '200000000000',
                                gasLimit: rate.toString(),
                                from: this.address
                            })];
                    case 14:
                        mint = _b.sent();
                        console.log(mint);
                        return [3 /*break*/, 17];
                    case 15:
                        error_3 = _b.sent();
                        console.log('failed, trying again...', error_3);
                        sleep(5000);
                        return [4 /*yield*/, xdvSigner.mintWithProof(hexData, userProof, packetProof, {
                                gasPrice: '200000000000',
                                gasLimit: 900000,
                                from: this.address
                            })];
                    case 16:
                        mint = _b.sent();
                        return [3 /*break*/, 17];
                    case 17: return [3 /*break*/, 18];
                    case 18: return [2 /*return*/, mint];
                }
            });
        });
    };
    AnconProtocol.prototype.getDomainName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rawResponse, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://".concat(this.anconEndpoint, "did/did:ethr:").concat(this.network.name, ":").concat(this.address))];
                    case 1:
                        rawResponse = _a.sent();
                        return [4 /*yield*/, rawResponse.json()];
                    case 2:
                        response = _a.sent();
                        if (rawResponse.status === 400) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AnconProtocol.prototype.getMetadata = function (cid, address) {
        return __awaiter(this, void 0, void 0, function () {
            var rawData, data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fetch("https://".concat(this.anconEndpoint, "dag/").concat(cid, "/contentHash"))];
                    case 1:
                        rawData = _c.sent();
                        return [4 /*yield*/, rawData.json()];
                    case 2:
                        data = _c.sent();
                        _a = data;
                        _b = 'root';
                        return [4 /*yield*/, (Object === null || Object === void 0 ? void 0 : Object.values(data.root)[0])];
                    case 3: return [4 /*yield*/, _c.sent()];
                    case 4:
                        _a[_b] = _c.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    AnconProtocol.prototype.uploadFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var body, ipfsRes, ipfsResBody, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = new FormData();
                        console.log(file);
                        body.append('file', file[0]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch('https://' + this.anconEndpoint + 'file', {
                                method: 'post',
                                body: body
                            })];
                    case 2:
                        ipfsRes = _a.sent();
                        console.log(ipfsRes);
                        return [4 /*yield*/, ipfsRes.json()];
                    case 3:
                        ipfsResBody = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.log('confirmation error', error_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, ipfsResBody.cid];
                }
            });
        });
    };
    AnconProtocol.prototype.verifyBlockchainExistence = function (proof) {
        return __awaiter(this, void 0, void 0, function () {
            var anconReader, verify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        anconReader = AnconProtocol__factory_1.AnconProtocol__factory.connect(this.xdvnftAdress, this.prov);
                        console.log(typeof this.moniker, this.moniker);
                        console.log(proof.key, proof.value);
                        return [4 /*yield*/, anconReader.verifyProofWithKV(this.moniker, proof.key, proof.value, proof)];
                    case 1:
                        verify = _a.sent();
                        console.log('[verify]', verify);
                        return [2 /*return*/];
                }
            });
        });
    };
    return AnconProtocol;
}());
exports["default"] = AnconProtocol;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
