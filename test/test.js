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
// eslint-disable-next-line @typescript-eslint/no-var-requires
var jexl = require('jexl');
var example = {
    Transfer: [
        {
            name: 'concatTransactionHash',
            condition: "(returnValues.from == '0x0000000000000000000000000000000000000000') && (returnValues.to != null)",
            expression: "assign(dag, append('txHash', tx.transactionHash))",
            blockFetchCondition: 'returnValues.to != null',
            blockFetchAddress: 'returnValues.to',
            topicName: '@topic'
        },
        // {
        //   name: 'latestNftView',
        //   condition: `(returnValues.from == '0x0000000000000000000000000000000000000000') && (returnValues.to != null)`,
        //   expression: '{...dag, txHash: tx.transactionHash}',
        //   blockFetchCondition: 'returnValues.to != null',
        //   blockFetchAddress: 'returnValues.to',
        //   topicName: '@topic',
        //   //result view
        // },
    ],
    Approve: 'frontValues.description',
    AddMintInfo: [
        {
            name: 'concatTransactionHash',
            condition: "returnValues.creator != null",
            expression: "assign(dag, append('txHash', tx.transactionHash))",
            blockFetchCondition: 'returnValues.uri != null'
        },
    ],
    MakeOrder: [
        {
            name: 'concatOrderHash',
            condition: 'returnValues.orderHash != null',
            expression: '{...dag, orderHash: returnValues.orderHash}'
        },
    ]
};
var blockchainExample = {
    address: '0xA7D6e6F21D6D5906eEFC2c30601CEC178e2e6743',
    blockNumber: 17190973,
    transactionHash: '0xbd7a5fc437f8e58d59a2d56b19d7c174ea1189abe5d09a68afda8b91c2aa1fd7',
    transactionIndex: 0,
    blockHash: '0x4a01147f5e3dba3867d3c58dd115060806e6f35a9e39dc1a70fdd30ad58a0fa8',
    logIndex: 4,
    removed: false,
    id: 'log_1192ac7e',
    returnValues: {
        '0': '0x2F4167f834892fb7F2691883867aEC12fC486371',
        '1': 'af644fa5-c1af-461b-bd05-9864caeaeef8',
        '2': '12',
        '3': '1500',
        creator: '0x2F4167f834892fb7F2691883867aEC12fC486371',
        uri: 'af644fa5-c1af-461b-bd05-9864caeaeef8',
        tokenId: '12',
        royaltyFee: '1500'
    },
    event: 'AddMintInfo',
    signature: '0x0a59a585b9550719952b099b96c48342a827bee7469998fdbdfb68477e412931',
    raw: {
        data: '0x0000000000000000000000002f4167f834892fb7f2691883867aec12fc4863710000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000005dc000000000000000000000000000000000000000000000000000000000000002461663634346661352d633161662d343631622d626430352d39383634636165616565663800000000000000000000000000000000000000000000000000000000',
        topics: [
            '0x0a59a585b9550719952b099b96c48342a827bee7469998fdbdfb68477e412931',
        ]
    }
};
var transferBlockchainExample = {
    address: '0xA7D6e6F21D6D5906eEFC2c30601CEC178e2e6743',
    blockNumber: 17190973,
    transactionHash: '0xbd7a5fc437f8e58d59a2d56b19d7c174ea1189abe5d09a68afda8b91c2aa1fd7',
    transactionIndex: 0,
    blockHash: '0x4a01147f5e3dba3867d3c58dd115060806e6f35a9e39dc1a70fdd30ad58a0fa8',
    logIndex: 4,
    removed: false,
    id: 'log_1192ac7e',
    returnValues: {
        '0': '0x0000000000000000000000000000000000000000',
        '1': '0x32A21c1bB6E7C20F547e930b53dAC57f42cd25F6',
        from: '0x0000000000000000000000000000000000000000',
        to: '0x32A21c1bB6E7C20F547e930b53dAC57f42cd25F6'
    },
    event: 'Transfer',
    signature: '0x0a59a585b9550719952b099b96c48342a827bee7469998fdbdfb68477e412931',
    raw: {
        data: '0x0000000000000000000000002f4167f834892fb7f2691883867aec12fc4863710000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000005dc000000000000000000000000000000000000000000000000000000000000002461663634346661352d633161662d343631622d626430352d39383634636165616565663800000000000000000000000000000000000000000000000000000000',
        topics: [
            '0x0a59a585b9550719952b099b96c48342a827bee7469998fdbdfb68477e412931',
        ]
    }
};
var blockchainGetAllEvents = {
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: [
            '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
            '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        ]
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
};
var dagExample = {
    commitHash: 'dvI2mjNUQdaiutM/mDtaJjjGYyzsCQyKMkncEV20RVY=',
    contentHash: {
        '/': 'baguqeeracxd7idu7jjxvboym6lm22tlcjssj5xvfreydmntkheipqcbxm24q'
    },
    digest: '0xa33469f7f4eb0213d1f3c897e6d2fe3911ea91511f84ed040a4b0dc68907599b',
    height: 269,
    issuer: '0x32A21c1bB6E7C20F547e930b53dAC57f42cd25F6',
    key: 'YW5jb25wcm90b2NvbC91c2Vycy9kaWQ6ZXRocjpibmJ0OjB4MzJBMjFjMWJCNkU3QzIwRjU0N2U5MzBiNTNkQUM1N2Y0MmNkMjVGNi9iYWd1cWVlcmFjeGQ3aWR1N2pqeHZib3ltNmxtMjJ0bGNqc3NqNXh2ZnJleWRtbnRraGVpcHFjYnhtMjRx',
    lastBlockHash: {
        '/': 'baguqeeranvsy7kickuqzmugxwe3vmxsmz5mdqlst3vvdmv76hq3wumvlruqa'
    },
    network: 'anconprotocol',
    rootKey: 'YW5jb25wcm90b2NvbC91c2Vycy9kaWQ6ZXRocjpibmJ0OjB4MzJBMjFjMWJCNkU3QzIwRjU0N2U5MzBiNTNkQUM1N2Y0MmNkMjVGNg==',
    signature: '0xe181951f189b9f553b946108a96a65be606ec5d730d2fc042f157d0369dd508377d19fa92e0ee5431a8c94d422450535d03057243bb6cb13e469f0c49e27a08b1b',
    timestamp: 1646065832,
    content: {
        blockchainMakeOrderTxHash: '',
        blockchainTokenId: '8',
        blockchainTxHash: '0x5965b148a04f3cf27964a0303b086582850a400542298c521a17735e248b1354',
        creator: '0x32A21c1bB6E7C20F547e930b53dAC57f42cd25F6',
        currentOrderHash: '',
        currentOrderTimestamp: '',
        description: 'commetn feb 25',
        fileExtension: 'gif',
        image: 'baguqeerad36yce4lghf7amd7i3e3k5biig54np6hyd6l3o4xztpbqnufclxa',
        name: 'demo 3 feb 25',
        owner: '0x32A21c1bB6E7C20F547e930b53dAC57f42cd25F6',
        price: '',
        sources: [
            'https://tensta.did.pa/v0/file/baguqeerad36yce4lghf7amd7i3e3k5biig54np6hyd6l3o4xztpbqnufclxa/',
        ],
        tags: 'Video juegos',
        uuid: 'ebdaf05a-635d-49df-aee7-c690e9adbc9d'
    }
};
var assign = function (val1, val2) {
    return __assign(__assign({}, val1), val2);
};
var append = function (key, val) {
    var _a;
    return _a = {}, _a[key] = val, _a;
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var expectedRules, rule, ruleset;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jexl.addFunction('assign', assign);
                jexl.addFunction('append', append);
                rule = example;
                ruleset = rule[transferBlockchainExample.event];
                console.log('\n [Transfer example event]', transferBlockchainExample.event);
                return [4 /*yield*/, ruleset.filter(function (r) { return __awaiter(void 0, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, jexl.eval(r.condition, transferBlockchainExample)];
                                case 1:
                                    res = _a.sent();
                                    console.log('[Eval Res inside filter]', res);
                                    return [2 /*return*/, res];
                            }
                        });
                    }); })];
            case 1:
                expectedRules = _a.sent();
                //if from 0 & to != 0 is a mint viceversa is a burn, if both exists, is a transfer
                //if to exists, fetch the topic
                console.log('\n [Expected rules]', expectedRules.length);
                if (!(expectedRules.length > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, expectedRules.filter(function (r) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, jexl.eval(r.blockFetchCondition, transferBlockchainExample)];
                                case 1: return [2 /*return*/, ((_a.sent()) ===
                                        true)];
                            }
                        });
                    }); })];
            case 2:
                expectedRules = _a.sent();
                console.log('\n [Expected rules inside if]', expectedRules);
                expectedRules.map(function (r) { return __awaiter(void 0, void 0, void 0, function () {
                    var queryAddress, dagContent, context, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, jexl.eval(r.blockFetchAddress, transferBlockchainExample)];
                            case 1:
                                queryAddress = _a.sent();
                                dagContent = dagExample.content;
                                context = { dag: dagContent, tx: transferBlockchainExample };
                                return [4 /*yield*/, jexl.eval(r.expression, context)];
                            case 2:
                                result = _a.sent();
                                //fetch to postdag (result, rule, cidHash)
                                // Signed by relayer
                                console.log('\n[Result]', result, '\n[Rule]', r);
                                return [2 /*return*/, { result: result, rule: r }];
                        }
                    });
                }); });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
main().then();
// async function loadMintedNFTs() {
//   const _state = await onboard.getState();
//   const web3 = new Web3(_state.wallet.provider);
//   const currentBlock = await web3.eth.getBlockNumber();
//   const firstBlockNumber = 16910953;
//   let responseMintedNFT;
//   normalAddress = ethers.utils.getAddress(wallet.address);
//   for (let index = currentBlock; index > firstBlockNumber; index -= 4999) {
//     responseMintedNFT = await nftContract.getPastEvents("AddMintInfo", {
//       toBlock: index,
//       fromBlock: index - 4999,
//     });
//     if (responseMintedNFT.length !== 0) {
//       responseMintedNFT.reverse();
//       for (let jindex = 0; jindex < responseMintedNFT.length; jindex++) {
//         // eventsPages.push(responseMintedNFT[jindex]);
//         const tokenOwner = await nftContract.methods
//           .ownerOf(responseMintedNFT[jindex].returnValues.tokenId)
//           .call();
//         await loadMintedNFTData(
//           responseMintedNFT[jindex].returnValues.uri,
//           tokenOwner,
//           responseMintedNFT[jindex].returnValues.tokenId
//         );
//       }
//     } else {
//       console.log(" [GetEventQuerys] No minted found here");
//     }
//   }
//   console.log("Minted Nft Data", mintedNFTsData);
//   setIsMintedDataLoading(false);
//   async function loadMintedNFTData(uuid, currentOwner, tokenId) {
//     let realOwner = currentOwner;
//     //If the current token owner is the smartcontract addres then
//     //we must find the last "wallet" token owner (via order events) to fetch the metadata
//     if (currentOwner === MarketplaceContractAddress) {
//       //make order events search
//       realOwner = await getRealOwner(tokenId);
//     }
//     // const data = await getData(uuid, creator);
//     const topicFetchRes = await fetch(
//       `${anconAPIurl}/v0/topics?topic=uuid:${uuid}&from=${realOwner}`
//     );
//     if (topicFetchRes.status !== 200) {
//       console.error(`Error getting UUID Nft. ${topicFetchRes.status} .`);
//     } else {
//       const topicFetchResJSON = await topicFetchRes.json();
//       mintedNFTsData.push(topicFetchResJSON.content);
//       setMintedNftDataState(...mintedNftDataState, mintedNFTsData);
//     }
//   }
//   async function getRealOwner(_tokenId) {
//     const _state = await onboard.getState();
//     const web3 = new Web3(_state.wallet.provider);
//     const currentBlock = await web3.eth.getBlockNumber();
//     const firstBlockNumber = 16842487;
//     let responseMakeOrderEvent;
//     for (let index = currentBlock; index > firstBlockNumber; index -= 4999) {
//       responseMakeOrderEvent = await nftexContract.getPastEvents(
//         "MakeOrder",
//         {
//           toBlock: index,
//           fromBlock: index - 4999,
//           filter: {
//             token: anconNFTContractAddress,
//             id: _tokenId,
//           },
//         }
//       );
//       if (responseMakeOrderEvent.length !== 0) {
//         responseMakeOrderEvent.reverse();
//         return responseMakeOrderEvent[0].returnValues.seller;
//       } else {
//         console.log(" [Get Geal Owner EventQuerys] No minted found here");
//       }
//     }
//   }
// }
