"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnconProtocol__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "network",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "starterFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "startupFee",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bool",
                name: "enrolledStatus",
                type: "bool",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "key",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "value",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "moniker",
                type: "bytes32",
            },
        ],
        name: "AccountRegistered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "moniker",
                type: "bytes32",
            },
        ],
        name: "HeaderUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes",
                name: "key",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "packet",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "moniker",
                type: "bytes32",
            },
        ],
        name: "ProofPacketSubmitted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "tier",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "moniker",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "fee",
                type: "uint256",
            },
        ],
        name: "ServiceFeePaid",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
        ],
        name: "TierAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "fee",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "staked",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "includedBlocks",
                type: "uint256",
            },
        ],
        name: "TierUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "paymentAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "Withdrawn",
        type: "event",
    },
    {
        inputs: [],
        name: "INCLUDED_BLOCKS_EPOCH",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "accountByAddrProofs",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "accountProofs",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "dagGraphSubscriptions",
        outputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountStaked",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "includedBlocks",
                type: "uint256",
            },
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "incentiveBlocksMonthly",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "incentivePercentageMonthly",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "includedBlocksStarted",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "setupFee",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getIavlSpec",
        outputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_key",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_value",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.LengthOp",
                                name: "len",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.LeafOp",
                        name: "leafSpec",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256[]",
                                name: "childOrder",
                                type: "uint256[]",
                            },
                            {
                                internalType: "uint256",
                                name: "childSize",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "minPrefixLength",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "maxPrefixLength",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes",
                                name: "emptyChild",
                                type: "bytes",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                        ],
                        internalType: "struct Ics23Helper.InnerSpec",
                        name: "innerSpec",
                        type: "tuple",
                    },
                    {
                        internalType: "uint256",
                        name: "maxDepth",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "minDepth",
                        type: "uint256",
                    },
                ],
                internalType: "struct Ics23Helper.ProofSpec",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "latestRootHashTable",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "nonce",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "proofs",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "relayer",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "relayerHashTable",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "seq",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "stablecoin",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "tiers",
        outputs: [
            {
                internalType: "address",
                name: "token",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountStaked",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "includedBlocks",
                type: "uint256",
            },
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "incentiveBlocksMonthly",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "incentivePercentageMonthly",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "includedBlocksStarted",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "setupFee",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "totalHeaderUpdatesByDagGraph",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "totalSubmittedByDagGraphUser",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bool",
                        name: "valid",
                        type: "bool",
                    },
                    {
                        internalType: "bytes",
                        name: "key",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "value",
                        type: "bytes",
                    },
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_key",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_value",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.LengthOp",
                                name: "len",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.LeafOp",
                        name: "leaf",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                            {
                                internalType: "bytes",
                                name: "suffix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.InnerOp[]",
                        name: "path",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Ics23Helper.ExistenceProof",
                name: "proof",
                type: "tuple",
            },
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_key",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_value",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.LengthOp",
                                name: "len",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.LeafOp",
                        name: "leafSpec",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256[]",
                                name: "childOrder",
                                type: "uint256[]",
                            },
                            {
                                internalType: "uint256",
                                name: "childSize",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "minPrefixLength",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "maxPrefixLength",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes",
                                name: "emptyChild",
                                type: "bytes",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                        ],
                        internalType: "struct Ics23Helper.InnerSpec",
                        name: "innerSpec",
                        type: "tuple",
                    },
                    {
                        internalType: "uint256",
                        name: "maxDepth",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "minDepth",
                        type: "uint256",
                    },
                ],
                internalType: "struct Ics23Helper.ProofSpec",
                name: "spec",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "root",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "key",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "value",
                type: "bytes",
            },
        ],
        name: "verify",
        outputs: [],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "whitelistedDagGraph",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getContractIdentifier",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "usernonce",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "verifyContractIdentifier",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getNonce",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "moniker",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "dagAddress",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "tier",
                type: "bytes32",
            },
        ],
        name: "registerDagGraphTier",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "moniker",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "rootHash",
                type: "bytes",
            },
            {
                internalType: "uint256",
                name: "height",
                type: "uint256",
            },
        ],
        name: "updateRelayerHeader",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
        ],
        name: "setPaymentToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountStaked",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "includedBlocks",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "setupFee",
                type: "uint256",
            },
        ],
        name: "addTier",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "id",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "tokenAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountStaked",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "includedBlocks",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "setupFee",
                type: "uint256",
            },
        ],
        name: "setTierSettings",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "payee",
                type: "address",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "payee",
                type: "address",
            },
            {
                internalType: "address",
                name: "erc20token",
                type: "address",
            },
        ],
        name: "withdrawToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "moniker",
                type: "bytes32",
            },
        ],
        name: "getProtocolHeader",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "did",
                type: "bytes",
            },
        ],
        name: "getProof",
        outputs: [
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "key",
                type: "bytes",
            },
        ],
        name: "hasProof",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "moniker",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "key",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "did",
                type: "bytes",
            },
            {
                components: [
                    {
                        internalType: "bool",
                        name: "valid",
                        type: "bool",
                    },
                    {
                        internalType: "bytes",
                        name: "key",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "value",
                        type: "bytes",
                    },
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_key",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_value",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.LengthOp",
                                name: "len",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.LeafOp",
                        name: "leaf",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                            {
                                internalType: "bytes",
                                name: "suffix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.InnerOp[]",
                        name: "path",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Ics23Helper.ExistenceProof",
                name: "proof",
                type: "tuple",
            },
        ],
        name: "enrollL2Account",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "moniker",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "bool",
                        name: "valid",
                        type: "bool",
                    },
                    {
                        internalType: "bytes",
                        name: "key",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "value",
                        type: "bytes",
                    },
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_key",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_value",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.LengthOp",
                                name: "len",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.LeafOp",
                        name: "leaf",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                            {
                                internalType: "bytes",
                                name: "suffix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.InnerOp[]",
                        name: "path",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Ics23Helper.ExistenceProof",
                name: "userProof",
                type: "tuple",
            },
            {
                internalType: "bytes",
                name: "key",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "packet",
                type: "bytes",
            },
            {
                components: [
                    {
                        internalType: "bool",
                        name: "valid",
                        type: "bool",
                    },
                    {
                        internalType: "bytes",
                        name: "key",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "value",
                        type: "bytes",
                    },
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_key",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_value",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.LengthOp",
                                name: "len",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.LeafOp",
                        name: "leaf",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                            {
                                internalType: "bytes",
                                name: "suffix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.InnerOp[]",
                        name: "path",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Ics23Helper.ExistenceProof",
                name: "proof",
                type: "tuple",
            },
        ],
        name: "submitPacketWithProof",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "moniker",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "key",
                type: "bytes",
            },
            {
                internalType: "bytes",
                name: "value",
                type: "bytes",
            },
            {
                components: [
                    {
                        internalType: "bool",
                        name: "valid",
                        type: "bool",
                    },
                    {
                        internalType: "bytes",
                        name: "key",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "value",
                        type: "bytes",
                    },
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_key",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "prehash_value",
                                type: "uint8",
                            },
                            {
                                internalType: "enum Ics23Helper.LengthOp",
                                name: "len",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.LeafOp",
                        name: "leaf",
                        type: "tuple",
                    },
                    {
                        components: [
                            {
                                internalType: "bool",
                                name: "valid",
                                type: "bool",
                            },
                            {
                                internalType: "enum Ics23Helper.HashOp",
                                name: "hash",
                                type: "uint8",
                            },
                            {
                                internalType: "bytes",
                                name: "prefix",
                                type: "bytes",
                            },
                            {
                                internalType: "bytes",
                                name: "suffix",
                                type: "bytes",
                            },
                        ],
                        internalType: "struct Ics23Helper.InnerOp[]",
                        name: "path",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Ics23Helper.ExistenceProof",
                name: "exProof",
                type: "tuple",
            },
        ],
        name: "verifyProofWithKV",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x6080604052600060035562030d406010553480156200001d57600080fd5b506040516200420e3803806200420e833981016040819052620000409162000344565b60008054336001600160a01b0319918216178255600280549091166001600160a01b0387161790556003849055620000a1907f41a42e79fd442e1d669deabe8f3fe32f1b542665aa85059cc1f8926cb82f7e9c90869085906064816200017d565b620000d47fff36d9cf2b3ece1d72ede3685367f881f3c658f8552484d890f2402c99c41d31858360006101f4816200017d565b620001087f3b61c0fe064f998f32a3661de12f8ef66f69d3eed20df1d23c30fc57463ab9b2856000806103e860966200017d565b6200013d7f87ef372fa0bc18c38f3c64ff4da209c8dac3db34cdaf2b35aa10008cbe46579f856000806127106105dc6200017d565b620001737fbefd8c2da6d9b4da15fb731a7170809acade1d69be3360c680036bd7e08a9c7f85600080620186a06123286200017d565b5050505062000391565b6000546001600160a01b03163314620001cd5760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b21037bbb732b960991b60448201526064015b60405180910390fd5b600086815260086020526040902060040154861415620002305760405162461bcd60e51b815260206004820152601360248201527f7469657220616c726561647920696e20757365000000000000000000000000006044820152606401620001c4565b604051806101200160405280866001600160a01b031681526020018581526020018481526020018381526020018781526020016000815260200160008152602001438152602001828152506008600088815260200190815260200160002060008201518160000160006101000a8154816001600160a01b0302191690836001600160a01b031602179055506020820151816001015560408201518160020155606082015181600301556080820151816004015560a0820151816005015560c0820151816006015560e082015181600701556101008201518160080155905050857f16ef379f8f00f11ccad2cb44b63097f0f35273e2077b0c305a2c886a62c389ba60405160405180910390a2505050505050565b600080600080608085870312156200035b57600080fd5b84516001600160a01b03811681146200037357600080fd5b60208601516040870151606090970151919890975090945092505050565b613e6d80620003a16000396000f3fe6080604052600436106102195760003560e01c806373d157171161011d578063a848e0ec116100b0578063d087d2881161007f578063d615657111610064578063d615657114610767578063e9cbd82214610787578063e9f49b53146107a757600080fd5b8063d087d2881461070a578063d56a07e31461072c57600080fd5b8063a848e0ec14610695578063b0d264e7146106b5578063c284bdf3146106d5578063ce108676146106ea57600080fd5b80638da5cb5b116100ec5780638da5cb5b1461061557806397554e8f14610635578063998b32e814610655578063a195c3e31461067557600080fd5b806373d15717146105465780637910f10f146105665780638406c0791461058657806389f902f6146105a657600080fd5b80634bf26de6116101b05780635eccc3711161017f578063693ac4fb11610164578063693ac4fb146104d95780636a326ab1146104f957806370ae92d21461051957600080fd5b80635eccc371146104a35780636857ab40146104c357600080fd5b80634bf26de61461042d57806351ceefe71461044057806351cff8d914610470578063590f862e1461049057600080fd5b806316afc783116101ec57806316afc783146102f35780631e8e454c146103b157806327dcd78c146103e95780633aeac4e11461040b57600080fd5b8063016440281461021e57806305c24853146102545780630d358d75146102a257806314263b19146102dd575b600080fd5b34801561022a57600080fd5b5061023e610239366004613164565b6107c7565b60405161024b91906131f5565b60405180910390f35b34801561026057600080fd5b5061028a61026f366004613208565b6007602052600090815260409020546001600160a01b031681565b6040516001600160a01b03909116815260200161024b565b3480156102ae57600080fd5b506102cf6102bd366004613249565b600a6020526000908152604090205481565b60405190815260200161024b565b3480156102e957600080fd5b506102cf60105481565b3480156102ff57600080fd5b5061036361030e366004613249565b6009602052600090815260409020805460018201546002830154600384015460048501546005860154600687015460078801546008909801546001600160a01b03909716979596949593949293919290919089565b604080516001600160a01b03909a168a5260208a0198909852968801959095526060870193909352608086019190915260a085015260c084015260e08301526101008201526101200161024b565b3480156103bd57600080fd5b506102cf6103cc366004613266565b600b60209081526000928352604080842090915290825290205481565b3480156103f557600080fd5b506103fe61086c565b60405161024b919061335a565b34801561041757600080fd5b5061042b610426366004613266565b610980565b005b61042b61043b36600461341f565b610b2b565b34801561044c57600080fd5b5061046061045b366004613740565b610f29565b604051901515815260200161024b565b34801561047c57600080fd5b5061042b61048b366004613249565b610fe0565b61042b61049e3660046137d2565b6110e6565b3480156104af57600080fd5b5061023e6104be366004613208565b611409565b3480156104cf57600080fd5b506102cf600c5481565b3480156104e557600080fd5b5061023e6104f4366004613164565b6114ab565b34801561050557600080fd5b5061042b610514366004613249565b6114d6565b34801561052557600080fd5b506102cf610534366004613249565b600d6020526000908152604090205481565b34801561055257600080fd5b5061023e610561366004613249565b61151c565b34801561057257600080fd5b5061042b61058136600461380a565b611535565b34801561059257600080fd5b5060015461028a906001600160a01b031681565b3480156105b257600080fd5b506103636105c1366004613208565b60086020819052600091825260409091208054600182015460028301546003840154600485015460058601546006870154600788015497909801546001600160a01b03909616979496939592949193909289565b34801561062157600080fd5b5060005461028a906001600160a01b031681565b34801561064157600080fd5b5061046061065036600461385a565b6116f4565b34801561066157600080fd5b50610460610670366004613740565b6119fc565b34801561068157600080fd5b5061023e610690366004613920565b611c30565b3480156106a157600080fd5b5061023e6106b0366004613208565b611c54565b3480156106c157600080fd5b5061042b6106d0366004613aa3565b611c6d565b3480156106e157600080fd5b506102cf611ddc565b3480156106f657600080fd5b5061042b61070536600461380a565b611e29565b34801561071657600080fd5b50336000908152600d60205260409020546102cf565b34801561073857600080fd5b50610460610747366004613164565b805160208183018101805160068252928201919093012091525460ff1681565b34801561077357600080fd5b506104606107823660046137d2565b611f64565b34801561079357600080fd5b5060025461028a906001600160a01b031681565b3480156107b357600080fd5b506104606107c2366004613164565b611fd9565b8051602081830181018051600482529282019190930120915280546107eb90613b75565b80601f016020809104026020016040519081016040528092919081815260200182805461081790613b75565b80156108645780601f1061083957610100808354040283529160200191610864565b820191906000526020600020905b81548152906001019060200180831161084757829003601f168201915b505050505081565b610874612f02565b61087c612f02565b6040805160028082526060820183526000926020830190803683370190505090506000816000815181106108b2576108b2613bb0565b6020026020010181815250506001816001815181106108d3576108d3613bb0565b6020026020010181815250506040518060c00160405280600115158152602001600160058111156109065761090661329f565b815260200160008152602001600181526020016001815260408051808201825260018082526000602083810182905294850192909252938652815160c081018352858152602181850152600481840152600c60608201528251938401909252825260808101919091529060a0820152602083015250919050565b6000546001600160a01b0316331461099757600080fd5b6040516370a0823160e01b81523060048201526000906001600160a01b038316906370a0823190602401602060405180830381865afa1580156109de573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a029190613bc6565b6040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b038581166004830152602482018390529192509083169063a9059cbb906044016020604051808303816000875af1158015610a6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a929190613bdf565b610ae35760405162461bcd60e51b815260206004820152600f60248201527f7472616e73666572206661696c6564000000000000000000000000000000000060448201526064015b60405180910390fd5b826001600160a01b03167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d582604051610b1e91815260200190565b60405180910390a2505050565b6000838152600760205260409020546001600160a01b03163314610b915760405162461bcd60e51b815260206004820152600c60248201527f696e76616c6964207573657200000000000000000000000000000000000000006044820152606401610ada565b33600081815260096020908152604080832081516101208101835281546001600160a01b0390811682526001830154828601526002830154828501526003830154606083015260048084015460808401819052600585015460a0850152600685015460c0850152600785015460e08501526008948501546101008501528752929094528285205492516370a0823160e01b8152918201959095529116919082906370a0823190602401602060405180830381865afa158015610c57573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c7b9190613bc6565b11610cc85760405162461bcd60e51b815260206004820152601160248201527f6e6f20656e6f7567682062616c616e63650000000000000000000000000000006044820152606401610ada565b606082015115610ced5760018260600151610ce39190613c12565b6060830152610dc9565b6080820151600090815260086020526040908190206001015490516323b872dd60e01b815233600482015230602482015260448101919091526001600160a01b038216906323b872dd906064016020604051808303816000875af1158015610d59573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d7d9190613bdf565b610dc95760405162461bcd60e51b815260206004820152601d60248201527f7472616e73666572206661696c656420666f7220726563697069656e740000006044820152606401610ada565b60008260e0015143610ddb9190613c12565b9050601054811115610e0a57608083015160009081526008602052604090206003015460608401524360e08401525b6000868152600f6020908152604080832087845282529091208651610e3192880190612f5f565b506000868152600e602090815260409091208651610e5192880190612f5f565b5060808301805160008181526008602090815260408083205494518352918290206001015482516001600160a01b039095168552908401529091889133917ffa3b66570e1859a499f11774a3c47f5bdcd4fc6b9fef49f47066729785ee180c910160405180910390a4600c54610ec8906001613c29565b600c55336000908152600a6020526040902054610ee6906001613c29565b336000908152600a602052604080822092909255905187917fc4c76143cbd497adc2b5bc159d932dcfa8483928a0d22661d1404ef1c68984a191a2505050505050565b6000610fd582610f3761086c565b6000888152600e602052604090208054610f5090613b75565b80601f0160208091040260200160405190810160405280929190818152602001828054610f7c90613b75565b8015610fc95780601f10610f9e57610100808354040283529160200191610fc9565b820191906000526020600020905b815481529060010190602001808311610fac57829003601f168201915b50505050508787611c6d565b506001949350505050565b6000546001600160a01b03163314610ff757600080fd5b604051479060009081906001600160a01b0385169084908381818185875af1925050503d8060008114611046576040519150601f19603f3d011682016040523d82523d6000602084013e61104b565b606091505b50915091508161109d5760405162461bcd60e51b815260206004820152601460248201527f4661696c656420746f2073656e642045746865720000000000000000000000006044820152606401610ada565b836001600160a01b03167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5846040516110d891815260200190565b60405180910390a250505050565b6000838152600760205260409020546001600160a01b03161561114b5760405162461bcd60e51b815260206004820152600e60248201527f6d6f6e696b6572206578697374730000000000000000000000000000000000006044820152606401610ada565b600081815260086020526040902060040154811461119a5760405162461bcd60e51b815260206004820152600c60248201526b36b4b9b9b4b733903a34b2b960a11b6044820152606401610ada565b600081815260086020819052604090912001541561135a57600081815260086020819052604091829020805491015491516370a0823160e01b81523360048201526001600160a01b03909116919082906370a0823190602401602060405180830381865afa158015611210573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112349190613bc6565b116112815760405162461bcd60e51b815260206004820152601160248201527f6e6f20656e6f7567682062616c616e63650000000000000000000000000000006044820152606401610ada565b600082815260086020819052604091829020015490516323b872dd60e01b815233600482015230602482015260448101919091526001600160a01b038216906323b872dd906064016020604051808303816000875af11580156112e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061130c9190613bdf565b6113585760405162461bcd60e51b815260206004820152601d60248201527f7472616e73666572206661696c656420666f7220726563697069656e740000006044820152606401610ada565b505b600092835260076020818152604080862080546001600160a01b0396871673ffffffffffffffffffffffffffffffffffffffff1991821681179092559487526008808452828820918852600990935295208554815490941693909416929092178355600184810154908401556002808501549084015560038085015490840155600480850154908401556005808501549084015560068085015490840155838101549083015591820154910155565b6000818152600e6020526040902080546060919061142690613b75565b80601f016020809104026020016040519081016040528092919081815260200182805461145290613b75565b801561149f5780601f106114745761010080835404028352916020019161149f565b820191906000526020600020905b81548152906001019060200180831161148257829003601f168201915b50505050509050919050565b60606004826040516114bd9190613c41565b9081526020016040518091039020805461142690613b75565b6000546001600160a01b031633146114ed57600080fd5b6002805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0392909216919091179055565b600560205260009081526040902080546107eb90613b75565b6000546001600160a01b0316331461157f5760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b21037bbb732b960991b6044820152606401610ada565b6000868152600860205260409020600401548614156115e05760405162461bcd60e51b815260206004820152601360248201527f7469657220616c726561647920696e20757365000000000000000000000000006044820152606401610ada565b604051806101200160405280866001600160a01b031681526020018581526020018481526020018381526020018781526020016000815260200160008152602001438152602001828152506008600088815260200190815260200160002060008201518160000160006101000a8154816001600160a01b0302191690836001600160a01b031602179055506020820151816001015560408201518160020155606082015181600301556080820151816004015560a0820151816005015560c0820151816006015560e082015181600701556101008201518160080155905050857f16ef379f8f00f11ccad2cb44b63097f0f35273e2077b0c305a2c886a62c389ba60405160405180910390a2505050505050565b60006006846040516117069190613c41565b9081526040519081900360200190205460ff161561178b5760405162461bcd60e51b8152602060048201526024808201527f70726f6f6620686173206265656e207375626d69747465642028666f756e642060448201527f6b657929000000000000000000000000000000000000000000000000000000006064820152608401610ada565b8380519060200120826020015180519060200120146117da5760405162461bcd60e51b815260206004820152600b60248201526a696e76616c6964206b657960a81b6044820152606401610ada565b84602001518051906020012060056000886001600160a01b03166001600160a01b031681526020019081526020016000206040516118189190613c5d565b60405180910390201461186d5760405162461bcd60e51b815260206004820152601060248201527f696e76616c69642075736572206b6579000000000000000000000000000000006044820152606401610ada565b6118778786612004565b6118c35760405162461bcd60e51b815260206004820152601260248201527f696e76616c696420757365722070726f6f6600000000000000000000000000006044820152606401610ada565b6118cd8783612004565b6118d657600080fd5b60016006856040516118e89190613c41565b9081526040805160209281900383019020805460ff191693151593909317909255600089815260078252828120546001600160a01b039081168252600b8352838220908a168252909152205461193f906001613c29565b6000888152600760209081526040808320546001600160a01b039081168452600b8352818420908b168452825280832093909355600d90522054611984906001613c29565b6001600160a01b0387166000908152600d60205260409081902091909155516119ae908590613c41565b60405180910390207f6fc7f6a61226dca85dedfb3642afdfbd9aeca6b161137d0c9a09e01a5e4baeee84896040516119e7929190613cf9565b60405180910390a25060019695505050505050565b6000838051906020012082602001518051906020012014611a4d5760405162461bcd60e51b815260206004820152600b60248201526a696e76616c6964206b657960a81b6044820152606401610ada565b611a578583612004565b611aa35760405162461bcd60e51b815260206004820152600d60248201527f696e76616c69642070726f6f66000000000000000000000000000000000000006044820152606401610ada565b600483604051611ab39190613c41565b908152604051908190036020018120611acb91613c5d565b604051809103902084805190602001201415611b295760405162461bcd60e51b815260206004820152601760248201527f7573657220616c726561647920726567697374657265640000000000000000006044820152606401610ada565b6000858152600760209081526040808320546001600160a01b03168352600b8252808320338452909152902054611b61906001613c29565b6000868152600760209081526040808320546001600160a01b03168352600b82528083203384529091529081902091909155518490600490611ba4908690613c41565b90815260200160405180910390209080519060200190611bc5929190612f5f565b503360009081526005602090815260409091208551611be692870190612f5f565b507f7b72d06bd8ccc7a748cfdb8b1df6913a277497c808af0288d0d6c0eb06b3b7b66001858588604051611c1d9493929190613d1b565b60405180910390a1506001949350505050565b600f602090815260009283526040808420909152908252902080546107eb90613b75565b600e60205260009081526040902080546107eb90613b75565b611c7785856120c2565b611c858560200151836121ea565b611cd15760405162461bcd60e51b815260206004820181905260248201527f50726f7669646564206b657920646f65736e2774206d617463682070726f6f666044820152606401610ada565b611cdf8560400151826121ea565b611d515760405162461bcd60e51b815260206004820152602260248201527f50726f76696465642076616c756520646f65736e2774206d617463682070726f60448201527f6f660000000000000000000000000000000000000000000000000000000000006064820152608401610ada565b611d63611d5d8661221a565b846121ea565b611dd55760405162461bcd60e51b815260206004820152602c60248201527f43616c63756c636174656420726f6f7420646f65736e2774206d61746368207060448201527f726f766964656420726f6f7400000000000000000000000000000000000000006064820152608401610ada565b5050505050565b600060035430604051602001611e0e92919091825260601b6bffffffffffffffffffffffff1916602082015260340190565b60405160208183030381529060405280519060200120905090565b6000546001600160a01b03163314611e735760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b21037bbb732b960991b6044820152606401610ada565b6000868152600860205260409020600401548614611ec25760405162461bcd60e51b815260206004820152600c60248201526b36b4b9b9b4b733903a34b2b960a11b6044820152606401610ada565b600086815260086020818152604092839020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038a1690811782556001820189905560028201889055600382018790559201849055825191825281018690529081018490526060810183905286907f78464b89639a347f1d6ed1cb7af1b1dc50ad7fdaecae1fff5d93f3dcc65fd8379060800160405180910390a2505050505050565b60008160035430604051602001611f9792919091825260601b6bffffffffffffffffffffffff1916602082015260340190565b60405160208183030381529060405280519060200120148015611fd157506001600160a01b0383166000908152600d602052604090205484145b949350505050565b6000600682604051611feb9190613c41565b9081526040519081900360200190205460ff1692915050565b60006120b88261201261086c565b6000868152600e60205260409020805461202b90613b75565b80601f016020809104026020016040519081016040528092919081815260200182805461205790613b75565b80156120a45780601f10612079576101008083540402835291602001916120a4565b820191906000526020600020905b81548152906001019060200180831161208757829003601f168201915b505050505085602001518660400151611c6d565b5060015b92915050565b6120d0826060015182612289565b606081015115806120ea5750806060015182608001515110155b6121365760405162461bcd60e51b815260206004820152601860248201527f496e6e65724f707320646570746820746f6f2073686f727400000000000000006044820152606401610ada565b604081015115806121505750806040015182608001515110155b61219c5760405162461bcd60e51b815260206004820152601860248201527f496e6e65724f707320646570746820746f6f2073686f727400000000000000006044820152606401610ada565b60005b8260800151518110156121e5576121d3836080015182815181106121c5576121c5613bb0565b6020026020010151836124d7565b806121dd81613d5a565b91505061219f565b505050565b600081518351146121fd575060006120bc565b825160208381018281209186019283209091145b95945050505050565b606060006122358360600151846020015185604001516126a2565b905060005b8360800151518110156122825761226e8460800151828151811061226057612260613bb0565b6020026020010151836127c3565b91508061227a81613d5a565b91505061223a565b5092915050565b80516020015160058111156122a0576122a061329f565b826020015160058111156122b6576122b661329f565b146123035760405162461bcd60e51b815260206004820152601160248201527f556e657870656374656420486173684f700000000000000000000000000000006044820152606401610ada565b805160400151600581111561231a5761231a61329f565b826040015160058111156123305761233061329f565b1461237d5760405162461bcd60e51b815260206004820152601560248201527f556e657870656374656420507265686173684b657900000000000000000000006044820152606401610ada565b80516060015160058111156123945761239461329f565b826060015160058111156123aa576123aa61329f565b146123f75760405162461bcd60e51b815260206004820152601560248201527f556e657870656374656420507265686173684b657900000000000000000000006044820152606401610ada565b805160800151600881111561240e5761240e61329f565b826080015160088111156124245761242461329f565b146124715760405162461bcd60e51b815260206004820152601a60248201527f556e657870656374656c65616653706563204c656e6774684f700000000000006044820152606401610ada565b6124878260a00151826000015160a00151612872565b6124d35760405162461bcd60e51b815260206004820152601760248201527f4c6561664f704c69623a2077726f6e67207072656669780000000000000000006044820152606401610ada565b5050565b80516020015160058111156124ee576124ee61329f565b826020015160058111156125045761250461329f565b146125515760405162461bcd60e51b815260206004820152601160248201527f556e657870656374656420486173684f700000000000000000000000000000006044820152606401610ada565b6125678260400151826000015160a00151612872565b156125b45760405162461bcd60e51b815260206004820152601860248201527f496e6e65724f704c69623a2077726f6e672070726566697800000000000000006044820152606401610ada565b80602001516040015182604001515110156126115760405162461bcd60e51b815260206004820152601860248201527f496e6e65724f702070726566697820746f6f2073686f727400000000000000006044820152606401610ada565b602080820151908101519051516000919061262e90600190613c12565b6126389190613d75565b90508082602001516060015161264e9190613c29565b83604001515111156121e55760405162461bcd60e51b815260206004820152601860248201527f496e6e65724f702070726566697820746f6f2073686f727400000000000000006044820152606401610ada565b606060008351116126f55760405162461bcd60e51b815260206004820152601160248201527f4c656166206f70206e65656473206b65790000000000000000000000000000006044820152606401610ada565b60008251116127465760405162461bcd60e51b815260206004820152601360248201527f4c656166206f70206e656564732076616c7565000000000000000000000000006044820152606401610ada565b60008460a001516127608660400151876080015187612935565b604051602001612771929190613d94565b6040516020818303038152906040526127938660600151876080015186612935565b6040516020016127a4929190613d94565b604051602081830303815290604052905061221185602001518261294a565b606060008251116128165760405162461bcd60e51b815260206004820152601a60248201527f496e6e6572206f70206e65656473206368696c642076616c75650000000000006044820152606401610ada565b61286b8360200151846040015184604051602001612835929190613d94565b60408051601f1981840301815290829052606087015161285792602001613d94565b60405160208183030381529060405261294a565b9392505050565b6000815183511015612886575060006120bc565b60005b825181101561292b578281815181106128a4576128a4613bb0565b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168482815181106128e3576128e3613bb0565b01602001517fff0000000000000000000000000000000000000000000000000000000000000016146129195760009150506120bc565b8061292381613d5a565b915050612889565b5060019392505050565b6060611fd1836129458685612b68565b612b95565b606060018360058111156129605761296061329f565b14156129c5576129be6002836040516129799190613c41565b602060405180830381855afa158015612996573d6000803e3d6000fd5b5050506040513d601f19601f820116820180604052508101906129b99190613bc6565b612d29565b90506120bc565b60028360058111156129d9576129d961329f565b1415612a275760405162461bcd60e51b815260206004820152601660248201527f534841353132206e6f7420696d706c656d656e746564000000000000000000006044820152606401610ada565b6004836005811115612a3b57612a3b61329f565b1415612a8f576129be600383604051612a549190613c41565b602060405180830381855afa158015612a71573d6000803e3d6000fd5b5050506040515160601b6bffffffffffffffffffffffff1916612d29565b6005836005811115612aa357612aa361329f565b1415612b20576000600283604051612abb9190613c41565b602060405180830381855afa158015612ad8573d6000803e3d6000fd5b5050506040513d601f19601f82011682018060405250810190612afb9190613bc6565b9050612b186003612b0b83612d29565b604051612a549190613c41565b9150506120bc565b60405162461bcd60e51b815260206004820152601260248201527f556e737570706f7274656420686173686f7000000000000000000000000000006044820152606401610ada565b60606000836005811115612b7e57612b7e61329f565b1415612b8b5750806120bc565b61286b838361294a565b60606000836008811115612bab57612bab61329f565b1415612bb85750806120bc565b6001836008811115612bcc57612bcc61329f565b1415612c0457612bdc8251612d53565b82604051602001612bee929190613d94565b60405160208183030381529060405290506120bc565b6007836008811115612c1857612c1861329f565b1415612c76578151602014612c6f5760405162461bcd60e51b815260206004820152601160248201527f45787065637465642033322062797465730000000000000000000000000000006044820152606401610ada565b50806120bc565b6008836008811115612c8a57612c8a61329f565b1415612ce1578151604014612c6f5760405162461bcd60e51b815260206004820152601160248201527f45787065637465642036342062797465730000000000000000000000000000006044820152606401610ada565b60405162461bcd60e51b815260206004820152601460248201527f556e737570706f72746564206c656e6774686f700000000000000000000000006044820152606401610ada565b60408051602080825281830190925260609160208201818036833750505060208101929092525090565b60608160015b607f8267ffffffffffffffff161115612d915760078267ffffffffffffffff16901c9150600181612d8a9190613dc3565b9050612d59565b60008167ffffffffffffffff1667ffffffffffffffff811115612db657612db661303e565b6040519080825280601f01601f191660200182016040528015612de0576020820181803683370190505b50905084925060005b8267ffffffffffffffff168167ffffffffffffffff161015612e7e5783607f1660801760f81b828267ffffffffffffffff1681518110612e2b57612e2b613bb0565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060078467ffffffffffffffff16901c93508080612e7690613de6565b915050612de9565b507f7f0000000000000000000000000000000000000000000000000000000000000081612eac600185613e0e565b67ffffffffffffffff1681518110612ec657612ec6613bb0565b0160200180519091167fff000000000000000000000000000000000000000000000000000000000000001690600082901a905350949350505050565b60408051610140810190915260006080820181815260a0830182905260c0830182905260e083018290526101008301919091526060610120830152815260208101612f4b612fe3565b815260200160008152602001600081525090565b828054612f6b90613b75565b90600052602060002090601f016020900481019282612f8d5760008555612fd3565b82601f10612fa657805160ff1916838001178555612fd3565b82800160010185558215612fd3579182015b82811115612fd3578251825591602001919060010190612fb8565b50612fdf929150613029565b5090565b6040518060c001604052806060815260200160008152602001600081526020016000815260200160608152602001600060058111156130245761302461329f565b905290565b5b80821115612fdf576000815560010161302a565b634e487b7160e01b600052604160045260246000fd5b60405160c0810167ffffffffffffffff811182821017156130775761307761303e565b60405290565b6040516080810167ffffffffffffffff811182821017156130775761307761303e565b60405160a0810167ffffffffffffffff811182821017156130775761307761303e565b604051601f8201601f1916810167ffffffffffffffff811182821017156130ec576130ec61303e565b604052919050565b600082601f83011261310557600080fd5b813567ffffffffffffffff81111561311f5761311f61303e565b613132601f8201601f19166020016130c3565b81815284602083860101111561314757600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561317657600080fd5b813567ffffffffffffffff81111561318d57600080fd5b611fd1848285016130f4565b60005b838110156131b457818101518382015260200161319c565b838111156131c3576000848401525b50505050565b600081518084526131e1816020860160208601613199565b601f01601f19169290920160200192915050565b60208152600061286b60208301846131c9565b60006020828403121561321a57600080fd5b5035919050565b6001600160a01b038116811461323657600080fd5b50565b803561324481613221565b919050565b60006020828403121561325b57600080fd5b813561286b81613221565b6000806040838503121561327957600080fd5b823561328481613221565b9150602083013561329481613221565b809150509250929050565b634e487b7160e01b600052602160045260246000fd5b600681106132c5576132c561329f565b9052565b805160c080845281519084018190526000916020919082019060e0860190845b81811015613305578351835292840192918401916001016132e9565b50508285015183870152604085015160408701526060850151606087015260808501519250858103608087015261333c81846131c9565b9250505060a083015161335260a08601826132b5565b509392505050565b6020815260008251608060208401528051151560a0840152602081015161338460c08501826132b5565b50604081015161339760e08501826132b5565b5060608101516133ab6101008501826132b5565b506080810151600981106133c1576133c161329f565b61012084015260a0015160c06101408401526133e16101608401826131c9565b90506020840151601f198483030160408501526133fe82826132c9565b91505060408401516060840152606084015160808401528091505092915050565b60008060006060848603121561343457600080fd5b83359250602084013567ffffffffffffffff81111561345257600080fd5b61345e868287016130f4565b925050604084013590509250925092565b801515811461323657600080fd5b80356132448161346f565b80356006811061324457600080fd5b600060c082840312156134a957600080fd5b6134b1613054565b905081356134be8161346f565b81526134cc60208301613488565b60208201526134dd60408301613488565b60408201526134ee60608301613488565b606082015260808201356009811061350557600080fd5b608082015260a082013567ffffffffffffffff81111561352457600080fd5b613530848285016130f4565b60a08301525092915050565b600067ffffffffffffffff8211156135565761355661303e565b5060051b60200190565b600082601f83011261357157600080fd5b813560206135866135818361353c565b6130c3565b82815260059290921b840181019181810190868411156135a557600080fd5b8286015b8481101561366b57803567ffffffffffffffff808211156135ca5760008081fd5b908801906080828b03601f19018113156135e45760008081fd5b6135ec61307d565b878401356135f98161346f565b81526040613608858201613488565b89830152606080860135858111156136205760008081fd5b61362e8f8c838a01016130f4565b848401525092850135928484111561364857600091508182fd5b6136568e8b868901016130f4565b908301525086525050509183019183016135a9565b509695505050505050565b600060a0828403121561368857600080fd5b6136906130a0565b905061369b8261347d565b8152602082013567ffffffffffffffff808211156136b857600080fd5b6136c4858386016130f4565b602084015260408401359150808211156136dd57600080fd5b6136e9858386016130f4565b6040840152606084013591508082111561370257600080fd5b61370e85838601613497565b6060840152608084013591508082111561372757600080fd5b5061373484828501613560565b60808301525092915050565b6000806000806080858703121561375657600080fd5b84359350602085013567ffffffffffffffff8082111561377557600080fd5b613781888389016130f4565b9450604087013591508082111561379757600080fd5b6137a3888389016130f4565b935060608701359150808211156137b957600080fd5b506137c687828801613676565b91505092959194509250565b6000806000606084860312156137e757600080fd5b8335925060208401356137f981613221565b929592945050506040919091013590565b60008060008060008060c0878903121561382357600080fd5b86359550602087013561383581613221565b95989597505050506040840135936060810135936080820135935060a0909101359150565b60008060008060008060c0878903121561387357600080fd5b8635955061388360208801613239565b9450604087013567ffffffffffffffff808211156138a057600080fd5b6138ac8a838b01613676565b955060608901359150808211156138c257600080fd5b6138ce8a838b016130f4565b945060808901359150808211156138e457600080fd5b6138f08a838b016130f4565b935060a089013591508082111561390657600080fd5b5061391389828a01613676565b9150509295509295509295565b6000806040838503121561393357600080fd5b50508035926020909101359150565b600082601f83011261395357600080fd5b813560206139636135818361353c565b82815260059290921b8401810191818101908684111561398257600080fd5b8286015b8481101561366b5780358352918301918301613986565b6000608082840312156139af57600080fd5b6139b761307d565b9050813567ffffffffffffffff808211156139d157600080fd5b6139dd85838601613497565b835260208401359150808211156139f357600080fd5b9083019060c08286031215613a0757600080fd5b613a0f613054565b823582811115613a1e57600080fd5b613a2a87828601613942565b825250602083013560208201526040830135604082015260608301356060820152608083013582811115613a5d57600080fd5b613a69878286016130f4565b608083015250613a7b60a08401613488565b60a0820152806020850152505050604082013560408201526060820135606082015292915050565b600080600080600060a08688031215613abb57600080fd5b853567ffffffffffffffff80821115613ad357600080fd5b613adf89838a01613676565b96506020880135915080821115613af557600080fd5b613b0189838a0161399d565b95506040880135915080821115613b1757600080fd5b613b2389838a016130f4565b94506060880135915080821115613b3957600080fd5b613b4589838a016130f4565b93506080880135915080821115613b5b57600080fd5b50613b68888289016130f4565b9150509295509295909350565b600181811c90821680613b8957607f821691505b60208210811415613baa57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b600060208284031215613bd857600080fd5b5051919050565b600060208284031215613bf157600080fd5b815161286b8161346f565b634e487b7160e01b600052601160045260246000fd5b600082821015613c2457613c24613bfc565b500390565b60008219821115613c3c57613c3c613bfc565b500190565b60008251613c53818460208701613199565b9190910192915050565b600080835481600182811c915080831680613c7957607f831692505b6020808410821415613c9957634e487b7160e01b86526022600452602486fd5b818015613cad5760018114613cbe57613ceb565b60ff19861689528489019650613ceb565b60008a81526020902060005b86811015613ce35781548b820152908501908301613cca565b505084890196505b509498975050505050505050565b604081526000613d0c60408301856131c9565b90508260208301529392505050565b8415158152608060208201526000613d3660808301866131c9565b8281036040840152613d4881866131c9565b91505082606083015295945050505050565b6000600019821415613d6e57613d6e613bfc565b5060010190565b6000816000190483118215151615613d8f57613d8f613bfc565b500290565b60008351613da6818460208801613199565b835190830190613dba818360208801613199565b01949350505050565b600067ffffffffffffffff808316818516808303821115613dba57613dba613bfc565b600067ffffffffffffffff80831681811415613e0457613e04613bfc565b6001019392505050565b600067ffffffffffffffff83811690831681811015613e2f57613e2f613bfc565b03939250505056fea2646970667358221220a86325c76c61e0f39524c1b331bbea7ccca0135db834d737db30475f325ce48b64736f6c634300080b0033";
const isSuperArgs = (xs) => xs.length > 1;
class AnconProtocol__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(tokenAddress, network, starterFee, startupFee, overrides) {
        return super.deploy(tokenAddress, network, starterFee, startupFee, overrides || {});
    }
    getDeployTransaction(tokenAddress, network, starterFee, startupFee, overrides) {
        return super.getDeployTransaction(tokenAddress, network, starterFee, startupFee, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.AnconProtocol__factory = AnconProtocol__factory;
AnconProtocol__factory.bytecode = _bytecode;
AnconProtocol__factory.abi = _abi;
//# sourceMappingURL=AnconProtocol__factory.js.map