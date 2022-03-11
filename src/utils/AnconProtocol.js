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
var node_fetch_1 = require("node-fetch");
var AnconProtocol = /** @class */ (function () {
    /**
     * needs to be initiliaze with a provider and an address
     */
    function AnconProtocol(provider, address, 
    // moniker: string,
    anconEndpoint) {
        this.provider = provider;
        this.address = address;
        this.signer = this.provider.getSigner();
        this.network = '';
        this.postProofCid = '';
        // this.anconAddress = anconAddress;
        // this.xdvnftAdress = xdvnftAdress;
        // this.moniker = moniker;
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
                    case 0: return [4 /*yield*/, this.provider.getNetwork()];
                    case 1:
                        network = _a.sent();
                        this.network = network;
                        return [2 /*return*/, this.network];
                }
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
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(this.anconEndpoint, "v0/did/raw:did:ethr:").concat(this.network.name, ":").concat(this.address))];
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
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(this.anconEndpoint, "v0/did/raw:did:ethr:").concat(this.network.name, ":").concat(this.address))];
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
                        url = "".concat(this.anconEndpoint, "v0/").concat(proofEndpoint);
                        return [4 /*yield*/, (0, node_fetch_1["default"])(url, requestOptions)];
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
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(this.anconEndpoint, "v0/proof/").concat(key, "?height=").concat(height))];
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
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(this.anconEndpoint, "v0/dagjson/").concat(id, "/"))];
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
    // async enrollL2Account(cid: string, proof: any) {
    //   // try {
    //   const anconContractReader = AnconProtocol__factory.connect(
    //     this.anconAddress,
    //     this.prov,
    //   );
    //   const contract2 = AnconProtocol__factory.connect(
    //     this.anconAddress,
    //     this.signer,
    //   );
    //   // encoded to utf8
    //   const UTF8_cid = ethers.utils.toUtf8Bytes(cid);
    //   // get proof
    //   const getProof = await anconContractReader.getProof(UTF8_cid);
    //   if (getProof !== '0x') {
    //     return 'proof already exist';
    //   }
    //   await this.getPastEvents();
    //   // estimate gas
    //   const gasLimit = await contract2.estimateGas.enrollL2Account(
    //     this.moniker,
    //     proof.key,
    //     UTF8_cid,
    //     proof,
    //   );
    //   const decimalRate = gasLimit.toNumber() * 1.2;
    //   const rate = Math.floor(decimalRate);
    //   // enroll account
    //   const enroll = await contract2.enrollL2Account(
    //     this.moniker,
    //     proof.key,
    //     UTF8_cid,
    //     proof,
    //     {
    //       gasLimit: rate.toString(),
    //     },
    //   );
    //   await enroll?.wait(1);
    //   return enroll;
    // }
    /**
     *
     * @returns returns true when the protocol is updated
     */
    // async getPastEvents() {
    //   // instiate the contract
    //   const AnconReader = await AnconProtocol__factory.connect(
    //     this.anconAddress,
    //     this.prov,
    //   );
    //   // filter the contract
    //   const filter = await AnconReader.filters.HeaderUpdated(this.moniker);
    //   // get the from
    //   const from = await this.prov.getBlockNumber();
    //   // query the filter
    //   let result = await AnconReader.queryFilter(filter, from);
    //   // checking hashes
    //   const rawLastHash = await fetch(`${this.anconEndpoint}v0/proofs/lasthash`);
    //   const lasthash = await rawLastHash.json();
    //   const decodedlastHash = ethers.utils.hexlify(
    //     ethers.utils.base64.decode(lasthash.lastHash.hash),
    //   );
    //   let sequence = lasthash.lastHash.version;
    //   let time = Date.now();
    //   const maxTime = Date.now() + 120000;
    //   const relayHash = '0x';
    //   while (time < maxTime) {
    //     try {
    //       sequence += 1;
    //       result = await AnconReader.queryFilter(filter, from);
    //       if (result.length > 0) {
    //         break;
    //       }
    //       time = Date.now();
    //       await sleep(1000);
    //     } catch (error) {
    //       console.log('error', error);
    //     }
    //   }
    //   return true;
    // }
    // async mintNft(hexData: string, userProofKey: string) {
    //   const xdvSigner = XDVNFT__factory.connect(this.xdvnftAdress, this.signer);
    //   await sleep(7000);
    //   const did = await this.getDidTransaction();
    //   // get the last hash
    //   const rawLastHash = await fetch(`${this.anconEndpoint}v0/proofs/lasthash`);
    //   const lasthash = await rawLastHash.json();
    //   const version = lasthash.lastHash.version;
    //   /* prepare the packet and user proof
    //    */
    //   // prepare packet proof
    //   const packetProof = await this.getProof(userProofKey, version);
    //   // prepare user proof
    //   const userProof = await this.getProof(did.key, version);
    //   // estimate gas
    //   const gasLimit = await xdvSigner.estimateGas.mintWithProof(
    //     hexData,
    //     userProof,
    //     packetProof,
    //   );
    //   const decimalRate = gasLimit.toNumber() * 1.2;
    //   const rate = Math.floor(decimalRate);
    //   // start minting
    //   let mint;
    //   try {
    //     mint = await xdvSigner.mintWithProof(hexData, userProof, packetProof, {
    //       gasLimit: rate.toString(),
    //     });
    //   } catch (error) {
    //     sleep(5000);
    //     console.log('failed, trying again...', error);
    //     mint = await xdvSigner.mintWithProof(hexData, userProof, packetProof);
    //   }
    //   return mint;
    // }
    AnconProtocol.prototype.getDomainName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rawResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(this.anconEndpoint, "v0/did/did:ethr:").concat(this.network.name, ":").concat(this.address))];
                    case 1:
                        rawResponse = _a.sent();
                        if (rawResponse.status === 400) {
                            return [2 /*return*/, { has: false, name: null }];
                        }
                        return [2 /*return*/, { has: true, name: "ethr:".concat(this.network.name, ":").concat(this.address) }];
                }
            });
        });
    };
    AnconProtocol.prototype.getMetadata = function (cid, address) {
        return __awaiter(this, void 0, void 0, function () {
            var rawData, data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(this.anconEndpoint, "v0/dag/").concat(cid, "/contentHash"))];
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
    return AnconProtocol;
}());
exports["default"] = AnconProtocol;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
