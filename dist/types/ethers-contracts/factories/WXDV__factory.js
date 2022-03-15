"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WXDV__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "symbol",
                type: "string",
            },
            {
                internalType: "address",
                name: "tokenERC20",
                type: "address",
            },
            {
                internalType: "address",
                name: "anconprotocolAddr",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "chain",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "url",
                type: "string",
            },
            {
                internalType: "bytes",
                name: "prefix",
                type: "bytes",
            },
        ],
        name: "OffchainLookup",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "message",
                type: "string",
            },
        ],
        name: "UsageInformation",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "nftContractAddress",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "Locked",
        type: "event",
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
                internalType: "address",
                name: "NFTaddress",
                type: "address",
            },
        ],
        name: "NFTEnrolled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Paused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "signatureHash",
                type: "bytes32",
            },
        ],
        name: "ProofAccepted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "Released",
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
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Unpaused",
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
        name: "ENROLL_NFT",
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
        inputs: [],
        name: "NFTRegistrationFee",
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
        name: "TOKEN_AVAILABLE",
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
        inputs: [],
        name: "TOKEN_BURNED",
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
        inputs: [],
        name: "TOKEN_LOCKED",
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
        inputs: [],
        name: "anconprotocol",
        outputs: [
            {
                internalType: "contract IAnconProtocol",
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
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "dagContractOperator",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
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
        name: "getSigner",
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
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
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
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
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
        name: "paused",
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
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "serviceFeeForContract",
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
        name: "serviceFeeForPaymentAddress",
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
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "signer_",
                type: "address",
            },
        ],
        name: "setSigner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "url_",
                type: "string",
            },
        ],
        name: "setUrl",
        outputs: [],
        stateMutability: "nonpayable",
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
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
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
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "tokenLockStorage",
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
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "url",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "onERC721Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "toAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "newItemId",
                type: "uint256",
            },
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
                name: "userProof",
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
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "submitMintWithProof",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "NFTaddress",
                type: "address",
            },
        ],
        name: "enrollNFT",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "NFTaddress",
                type: "address",
            },
        ],
        name: "deactivateNFT",
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
                internalType: "address",
                name: "sender",
                type: "address",
            },
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
                name: "userProof",
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
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "lockWithProof",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
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
                name: "userProof",
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
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "releaseWithProof",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
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
        name: "withdrawBalance",
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
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "islocked",
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
];
const _bytecode = "0x60806040527faba593141db1021cb8de7f38506a824487c2f2e5758168a6568eb7d6a8dd3173600c557f35e808e423fc257ba1bb61b1c2c57e48855b39cbee1f101ebe4fcb026f39e2e0600d557f1a7568e05cd9c1f5b58509adc78e175b2c29ad54d925ee42a8b45d9d39b1081b600e557f7a8231155142074ef50e8525dbfd6360a054cf41867e36de3c2aa1546d1cf8e9600f556000601455600060155560006016556000601855348015620000b557600080fd5b506040516200456d3803806200456d833981016040819052620000d8916200033d565b845185908590620000f1906000906020850190620001ad565b50805162000107906001906020840190620001ad565b50506006805460ff19169055506200011f336200015b565b601180546001600160a01b039485166001600160a01b031991821617909155601280549390941692169190911790915560185550620004139050565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620001bb90620003d6565b90600052602060002090601f016020900481019282620001df57600085556200022a565b82601f10620001fa57805160ff19168380011785556200022a565b828001600101855582156200022a579182015b828111156200022a5782518255916020019190600101906200020d565b50620002389291506200023c565b5090565b5b808211156200023857600081556001016200023d565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200027b57600080fd5b81516001600160401b038082111562000298576200029862000253565b604051601f8301601f19908116603f01168101908282118183101715620002c357620002c362000253565b81604052838152602092508683858801011115620002e057600080fd5b600091505b83821015620003045785820183015181830184015290820190620002e5565b83821115620003165760008385830101525b9695505050505050565b80516001600160a01b03811681146200033857600080fd5b919050565b600080600080600060a086880312156200035657600080fd5b85516001600160401b03808211156200036e57600080fd5b6200037c89838a0162000269565b965060208801519150808211156200039357600080fd5b50620003a28882890162000269565b945050620003b36040870162000320565b9250620003c36060870162000320565b9150608086015190509295509295909350565b600181811c90821680620003eb57607f821691505b602082108114156200040d57634e487b7160e01b600052602260045260246000fd5b50919050565b61414a80620004236000396000f3fe6080604052600436106102dc5760003560e01c80636c19e78311610184578063a22cb465116100d6578063e53ae1021161008a578063e9cbd82211610064578063e9cbd82214610812578063f2fde38b14610832578063fd632d511461085257600080fd5b8063e53ae1021461079d578063e7b04b86146107b3578063e985e9c5146107c957600080fd5b8063b88d4fde116100bb578063b88d4fde14610747578063c014b9da14610767578063c87b56dd1461077d57600080fd5b8063a22cb46514610707578063b20f84831461072757600080fd5b80637927b898116101385780637e8b80c3116101125780637e8b80c3146106c15780638da5cb5b146106d457806395d89b41146106f257600080fd5b80637927b8981461063a5780637ac3c02f1461065a5780637c9c94b01461067857600080fd5b8063715018a611610169578063715018a6146105ef578063756af45f14610604578063776439dd1461062457600080fd5b80636c19e783146105af57806370a08231146105cf57600080fd5b80633e65f4921161023d5780634fa97e61116101f1578063588f7ae2116101cb578063588f7ae2146105615780635c975abb146105775780636352211e1461058f57600080fd5b80634fa97e611461051957806351cff8d91461052c5780635600f04f1461054c57600080fd5b806340c10f191161022257806340c10f19146104b957806342842e0e146104d957806342966c68146104f957600080fd5b80633e65f4921461046e5780633fda3d5a146104a657600080fd5b80632380bcd211610294578063252498a211610279578063252498a21461041b5780632e8d65661461043b5780633cd559a41461044e57600080fd5b80632380bcd2146103d757806323b872dd146103fb57600080fd5b8063081812fc116102c5578063081812fc14610338578063095ea7b314610370578063150b7a021461039257600080fd5b806301ffc9a7146102e157806306fdde0314610316575b600080fd5b3480156102ed57600080fd5b506103016102fc3660046132c9565b610868565b60405190151581526020015b60405180910390f35b34801561032257600080fd5b5061032b610905565b60405161030d919061333e565b34801561034457600080fd5b50610358610353366004613351565b610997565b6040516001600160a01b03909116815260200161030d565b34801561037c57600080fd5b5061039061038b36600461338a565b610a31565b005b34801561039e57600080fd5b506103be6103ad3660046133b6565b630a85bd0160e11b95945050505050565b6040516001600160e01b0319909116815260200161030d565b3480156103e357600080fd5b506103ed600e5481565b60405190815260200161030d565b34801561040757600080fd5b50610390610416366004613455565b610b63565b34801561042757600080fd5b506103906104363660046135b2565b610beb565b6103ed6104493660046138d3565b610c5c565b34801561045a57600080fd5b50601254610358906001600160a01b031681565b34801561047a57600080fd5b506103ed61048936600461338a565b601760209081526000928352604080842090915290825290205481565b6103016104b43660046139a4565b610fa0565b3480156104c557600080fd5b506103ed6104d436600461338a565b611134565b3480156104e557600080fd5b506103906104f4366004613455565b61120b565b34801561050557600080fd5b50610390610514366004613351565b611226565b610301610527366004613a7f565b6112ad565b34801561053857600080fd5b50610390610547366004613a7f565b61138c565b34801561055857600080fd5b5061032b6114d5565b34801561056d57600080fd5b506103ed600d5481565b34801561058357600080fd5b5060065460ff16610301565b34801561059b57600080fd5b506103586105aa366004613351565b611563565b3480156105bb57600080fd5b506103906105ca366004613a7f565b6115ee565b3480156105db57600080fd5b506103ed6105ea366004613a7f565b61166a565b3480156105fb57600080fd5b50610390611704565b34801561061057600080fd5b5061039061061f366004613a7f565b61176a565b34801561063057600080fd5b506103ed60145481565b34801561064657600080fd5b50601354610358906001600160a01b031681565b34801561066657600080fd5b50600a546001600160a01b0316610358565b34801561068457600080fd5b50610301610693366004613a9c565b600c546001600160a01b03821660009081526017602090815260408083208684529091529020541492915050565b6103ed6106cf3660046138d3565b611956565b3480156106e057600080fd5b506008546001600160a01b0316610358565b3480156106fe57600080fd5b5061032b611cbb565b34801561071357600080fd5b50610390610722366004613acc565b611cca565b34801561073357600080fd5b50610301610742366004613a7f565b611d8f565b34801561075357600080fd5b50610390610762366004613afa565b611eb5565b34801561077357600080fd5b506103ed60155481565b34801561078957600080fd5b5061032b610798366004613351565b611f43565b3480156107a957600080fd5b506103ed60165481565b3480156107bf57600080fd5b506103ed600f5481565b3480156107d557600080fd5b506103016107e4366004613b66565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b34801561081e57600080fd5b50601154610358906001600160a01b031681565b34801561083e57600080fd5b5061039061084d366004613a7f565b611f4e565b34801561085e57600080fd5b506103ed600c5481565b60006001600160e01b031982167f80ac58cd0000000000000000000000000000000000000000000000000000000014806108cb57506001600160e01b031982167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806108ff57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b60606000805461091490613b94565b80601f016020809104026020016040519081016040528092919081815260200182805461094090613b94565b801561098d5780601f106109625761010080835404028352916020019161098d565b820191906000526020600020905b81548152906001019060200180831161097057829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b0316610a155760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b6000610a3c82611563565b9050806001600160a01b0316836001600160a01b03161415610ac65760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610a0c565b336001600160a01b0382161480610ae25750610ae281336107e4565b610b545760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610a0c565b610b5e838361202d565b505050565b610b6e335b8261209b565b610be05760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610a0c565b610b5e838383612192565b6008546001600160a01b03163314610c455760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a0c565b8051610c589060099060208401906131e4565b5050565b3360009081526019602052604081205460ff161515600114610cc05760405162461bcd60e51b815260206004820152601660248201527f6e6674206d7573742062652072656769737465726564000000000000000000006044820152606401610a0c565b6012546040516397554e8f60e01b81526001600160a01b03909116906397554e8f90610cfa908a908c9089908c908c908b90600401613d78565b6020604051808303816000875af1158015610d19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d3d9190613de7565b610d895760405162461bcd60e51b815260206004820152601460248201527f696e76616c6964207061636b65742070726f6f660000000000000000000000006044820152606401610a0c565b60008060008088806020019051810190610da39190613e49565b935093509350935083838383604051602001610dc29493929190613eaa565b604051602081830303815290604052805190602001208614610e265760405162461bcd60e51b815260206004820152600e60248201527f696e76616c6964207061636b65740000000000000000000000000000000000006044820152606401610a0c565b6040516331a9108f60e11b81526004810185905233908190636352211e90602401602060405180830381865afa158015610e64573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e889190613ef5565b6001600160a01b03168d6001600160a01b031614610ed85760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b21037bbb732b960991b6044820152606401610a0c565b600c546001600160a01b038e1660009081526017602090815260408083208984529091529020541415610f5b57610f0f8d8661236a565b6040516001600160a01b038e16815285907fb21fb52d5749b80f3182f8c6992236b5e5576681880914484d7f4c9b062e619e9060200160405180910390a2600295505050505050610f95565b610f69601080546001019055565b6000610f7460105490565b9050610f808482612407565b610f8a8686612421565b600196505050505050505b979650505050505050565b6012546040516397554e8f60e01b81526000916001600160a01b0316906397554e8f90610fdb908a908d9089908c908c908b90600401613d78565b6020604051808303816000875af1158015610ffa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061101e9190613de7565b61106a5760405162461bcd60e51b815260206004820152601460248201527f696e76616c6964207061636b65742070726f6f660000000000000000000000006044820152606401610a0c565b600080868060200190518101906110819190613f12565b915091508181604051602001611098929190613f63565b6040516020818303038152906040528051906020012084146110fc5760405162461bcd60e51b815260206004820152600e60248201527f496e76616c6964207061636b65740000000000000000000000000000000000006044820152606401610a0c565b5050600e546001600160a01b038a1660009081526017602090815260408083208c845290915290205550600198975050505050505050565b6040517f242b792200000000000000000000000000000000000000000000000000000000815260206004820152606360248201527f526571756972657320616e636f6e70726f746f636f6c2070726f6f6620746f2060448201527f65786563757465206d696e74696e672e205365652068747470733a2f2f67697460648201527f6875622e636f6d2f616e636f6e70726f746f636f6c20666f72206d6f7265206960848201527f6e666f000000000000000000000000000000000000000000000000000000000060a482015260009060c401610a0c565b610b5e83838360405180602001604052806000815250611eb5565b61122f33610b68565b6112a15760405162461bcd60e51b815260206004820152603060248201527f4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f766564000000000000000000000000000000006064820152608401610a0c565b6112aa816124ca565b50565b6001600160a01b03811660009081526019602052604081205460ff16156113165760405162461bcd60e51b815260206004820152601a60248201527f4e465420697320616c726561647920696e2072656769737472790000000000006044820152606401610a0c565b611322600f54336124d3565b6001600160a01b038216600081815260196020908152604091829020805460ff191660019081179091558251908152908101929092527fdb0987ab5727b17d3467eab6f86958c6b3204e475e5fbe5bac8bc796ac44939a91015b60405180910390a1506001919050565b6008546001600160a01b031633146113e65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a0c565b604051479060009081906001600160a01b0385169084908381818185875af1925050503d8060008114611435576040519150601f19603f3d011682016040523d82523d6000602084013e61143a565b606091505b50915091508161148c5760405162461bcd60e51b815260206004820152601460248201527f4661696c656420746f2073656e642045746865720000000000000000000000006044820152606401610a0c565b836001600160a01b03167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5846040516114c791815260200190565b60405180910390a250505050565b600980546114e290613b94565b80601f016020809104026020016040519081016040528092919081815260200182805461150e90613b94565b801561155b5780601f106115305761010080835404028352916020019161155b565b820191906000526020600020905b81548152906001019060200180831161153e57829003601f168201915b505050505081565b6000818152600260205260408120546001600160a01b0316806108ff5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e00000000000000000000000000000000000000000000006064820152608401610a0c565b6008546001600160a01b031633146116485760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a0c565b600a80546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160a01b0382166116e85760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f2061646472657373000000000000000000000000000000000000000000006064820152608401610a0c565b506001600160a01b031660009081526003602052604090205490565b6008546001600160a01b0316331461175e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a0c565b61176860006126a0565b565b6008546001600160a01b031633146117c45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a0c565b6011546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa15801561180d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118319190613f9b565b6011546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b0385811660048301526024820184905292935091169063a9059cbb906044016020604051808303816000875af115801561189f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118c39190613de7565b61190f5760405162461bcd60e51b815260206004820152601460248201527f5844563a205472616e73666572206661696c65640000000000000000000000006044820152606401610a0c565b816001600160a01b03167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d58260405161194a91815260200190565b60405180910390a25050565b3360009081526019602052604081205460ff1615156001146119ba5760405162461bcd60e51b815260206004820152601660248201527f6e6674206d7573742062652072656769737465726564000000000000000000006044820152606401610a0c565b6012546040516397554e8f60e01b81526001600160a01b03909116906397554e8f906119f4908a908c9089908c908c908b90600401613d78565b6020604051808303816000875af1158015611a13573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a379190613de7565b611a835760405162461bcd60e51b815260206004820152601460248201527f696e76616c6964207061636b65742070726f6f660000000000000000000000006044820152606401610a0c565b60008086806020019051810190611a9a9190613fb4565b60408051602081018490529081018290529193509150606001604051602081830303815290604052805190602001208414611b175760405162461bcd60e51b815260206004820152600e60248201527f696e76616c6964207061636b65740000000000000000000000000000000000006044820152606401610a0c565b6040516331a9108f60e11b81526004810183905233908190636352211e90602401602060405180830381865afa158015611b55573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b799190613ef5565b6001600160a01b03168b6001600160a01b031614611bc95760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b21037bbb732b960991b6044820152606401610a0c565b600e546001600160a01b038c1660009081526017602090815260408083208784529091529020541415611c4357611c008b846126f2565b6040516001600160a01b038c16815283907f9f1ec8c880f76798e7b793325d625e9b60e4082a553c98f42b6cda368dd600089060200160405180910390a2611cac565b30611c4d84611563565b6001600160a01b031614611ca35760405162461bcd60e51b815260206004820152601660248201527f4973206e6f742061207772617070656420746f6b656e000000000000000000006044820152606401610a0c565b611cac836124ca565b50909998505050505050505050565b60606001805461091490613b94565b6001600160a01b038216331415611d235760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610a0c565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6008546000906001600160a01b03163314611dec5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a0c565b6001600160a01b03821660009081526019602052604090205460ff161515600114611e595760405162461bcd60e51b815260206004820152601360248201527f6d697373696e67206e66742061646472657373000000000000000000000000006044820152606401610a0c565b6001600160a01b0382166000818152601960209081526040808320805460ff191690558051928352908201929092527fdb0987ab5727b17d3467eab6f86958c6b3204e475e5fbe5bac8bc796ac44939a910161137c565b919050565b611ebf338361209b565b611f315760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610a0c565b611f3d8484848461278f565b50505050565b60606108ff8261280d565b6008546001600160a01b03163314611fa85760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610a0c565b6001600160a01b0381166120245760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610a0c565b6112aa816126a0565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061206282611563565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166121145760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610a0c565b600061211f83611563565b9050806001600160a01b0316846001600160a01b0316148061215a5750836001600160a01b031661214f84610997565b6001600160a01b0316145b8061218a57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166121a582611563565b6001600160a01b0316146122215760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e00000000000000000000000000000000000000000000006064820152608401610a0c565b6001600160a01b03821661229c5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610a0c565b6122a7838383612998565b6122b260008261202d565b6001600160a01b03831660009081526003602052604081208054600192906122db908490613fee565b90915550506001600160a01b0382166000908152600360205260408120805460019290612309908490614005565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600c546001600160a01b0383166000908152601760209081526040808320858452909152902054146123de5760405162461bcd60e51b815260206004820152601960248201527f546f6b656e20697320616c726561647920756e6c6f636b6564000000000000006044820152606401610a0c565b600e546001600160a01b0390921660009081526017602090815260408083209383529290522055565b610c58828260405180602001604052806000815250612a0d565b6000828152600260205260409020546001600160a01b03166124ab5760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201527f6578697374656e7420746f6b656e0000000000000000000000000000000000006064820152608401610a0c565b60008281526007602090815260409091208251610b5e928401906131e4565b6112aa81612a8b565b6011546040516370a0823160e01b81523360048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa15801561251c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125409190613f9b565b1161258d5760405162461bcd60e51b815260206004820152601160248201527f6e6f20656e6f7567682062616c616e63650000000000000000000000000000006044820152606401610a0c565b600f54821415610c58576011546014546040516323b872dd60e01b81526001600160a01b03848116600483015230602483015260448201929092529116906323b872dd906064016020604051808303816000875af11580156125f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126179190613de7565b6126635760405162461bcd60e51b815260206004820152601d60248201527f7472616e73666572206661696c656420666f7220726563697069656e740000006044820152606401610a0c565b806001600160a01b03167fa70c9ef1994019c7c70e8134256a652460b545755ed8aad140daeaccc30446b360145460405161194a91815260200190565b600880546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600e546001600160a01b0383166000908152601760209081526040808320858452909152902054146127665760405162461bcd60e51b815260206004820152601760248201527f546f6b656e20697320616c7265616479206c6f636b65640000000000000000006044820152606401610a0c565b600c546001600160a01b0390921660009081526017602090815260408083209383529290522055565b61279a848484612192565b6127a684848484612acb565b611f3d5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610a0c565b6000818152600260205260409020546060906001600160a01b031661289a5760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f722060448201527f6e6f6e6578697374656e7420746f6b656e0000000000000000000000000000006064820152608401610a0c565b600082815260076020526040812080546128b390613b94565b80601f01602080910402602001604051908101604052809291908181526020018280546128df90613b94565b801561292c5780601f106129015761010080835404028352916020019161292c565b820191906000526020600020905b81548152906001019060200180831161290f57829003601f168201915b50505050509050600061294a60408051602081019091526000815290565b905080516000141561295d575092915050565b81511561298f57808260405160200161297792919061401d565b60405160208183030381529060405292505050919050565b61218a84612c14565b60065460ff16156129eb5760405162461bcd60e51b815260206004820152601e60248201527f5844563a20546f6b656e20657865637574696f6e2069732070617573656400006044820152606401610a0c565b6001600160a01b038316612a0257612a0233612d0a565b610b5e838383612e44565b612a178383612ebd565b612a246000848484612acb565b610b5e5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610a0c565b612a948161300b565b60008181526007602052604090208054612aad90613b94565b1590506112aa5760008181526007602052604081206112aa91613268565b60006001600160a01b0384163b15612c0957604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290612b0f90339089908890889060040161404c565b6020604051808303816000875af1925050508015612b4a575060408051601f3d908101601f19168201909252612b4791810190614088565b60015b612bef573d808015612b78576040519150601f19603f3d011682016040523d82523d6000602084013e612b7d565b606091505b508051612be75760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610a0c565b805181602001fd5b6001600160e01b031916630a85bd0160e11b14905061218a565b506001949350505050565b6000818152600260205260409020546060906001600160a01b0316612ca15760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610a0c565b6000612cb860408051602081019091526000815290565b90506000815111612cd85760405180602001604052806000815250612d03565b80612ce2846130b2565b604051602001612cf392919061401d565b6040516020818303038152906040525b9392505050565b6011546016546040516323b872dd60e01b81526001600160a01b03848116600483015230602483015260448201929092529116906323b872dd906064016020604051808303816000875af1158015612d66573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612d8a9190613de7565b612dfc5760405162461bcd60e51b815260206004820152602260248201527f5844563a205472616e73666572206661696c656420666f72207265636970696560448201527f6e740000000000000000000000000000000000000000000000000000000000006064820152608401610a0c565b806001600160a01b03167fa70c9ef1994019c7c70e8134256a652460b545755ed8aad140daeaccc30446b3601654604051612e3991815260200190565b60405180910390a250565b60065460ff1615610b5e5760405162461bcd60e51b815260206004820152602b60248201527f4552433732315061757361626c653a20746f6b656e207472616e73666572207760448201527f68696c65207061757365640000000000000000000000000000000000000000006064820152608401610a0c565b6001600160a01b038216612f135760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610a0c565b6000818152600260205260409020546001600160a01b031615612f785760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610a0c565b612f8460008383612998565b6001600160a01b0382166000908152600360205260408120805460019290612fad908490614005565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600061301682611563565b905061302481600084612998565b61302f60008361202d565b6001600160a01b0381166000908152600360205260408120805460019290613058908490613fee565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6060816130f257505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b811561311c5780613106816140a5565b91506131159050600a836140d6565b91506130f6565b60008167ffffffffffffffff81111561313757613137613496565b6040519080825280601f01601f191660200182016040528015613161576020820181803683370190505b5090505b841561218a57613176600183613fee565b9150613183600a866140ea565b61318e906030614005565b60f81b8183815181106131a3576131a36140fe565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053506131dd600a866140d6565b9450613165565b8280546131f090613b94565b90600052602060002090601f0160209004810192826132125760008555613258565b82601f1061322b57805160ff1916838001178555613258565b82800160010185558215613258579182015b8281111561325857825182559160200191906001019061323d565b5061326492915061329e565b5090565b50805461327490613b94565b6000825580601f10613284575050565b601f0160209004906000526020600020908101906112aa91905b5b80821115613264576000815560010161329f565b6001600160e01b0319811681146112aa57600080fd5b6000602082840312156132db57600080fd5b8135612d03816132b3565b60005b838110156133015781810151838201526020016132e9565b83811115611f3d5750506000910152565b6000815180845261332a8160208601602086016132e6565b601f01601f19169290920160200192915050565b602081526000612d036020830184613312565b60006020828403121561336357600080fd5b5035919050565b6001600160a01b03811681146112aa57600080fd5b8035611eb08161336a565b6000806040838503121561339d57600080fd5b82356133a88161336a565b946020939093013593505050565b6000806000806000608086880312156133ce57600080fd5b85356133d98161336a565b945060208601356133e98161336a565b935060408601359250606086013567ffffffffffffffff8082111561340d57600080fd5b818801915088601f83011261342157600080fd5b81358181111561343057600080fd5b89602082850101111561344257600080fd5b9699959850939650602001949392505050565b60008060006060848603121561346a57600080fd5b83356134758161336a565b925060208401356134858161336a565b929592945050506040919091013590565b634e487b7160e01b600052604160045260246000fd5b60405160c0810167ffffffffffffffff811182821017156134cf576134cf613496565b60405290565b6040516080810167ffffffffffffffff811182821017156134cf576134cf613496565b60405160a0810167ffffffffffffffff811182821017156134cf576134cf613496565b604051601f8201601f1916810167ffffffffffffffff8111828210171561354457613544613496565b604052919050565b600067ffffffffffffffff82111561356657613566613496565b50601f01601f191660200190565b60006135876135828461354c565b61351b565b905082815283838301111561359b57600080fd5b828260208301376000602084830101529392505050565b6000602082840312156135c457600080fd5b813567ffffffffffffffff8111156135db57600080fd5b8201601f810184136135ec57600080fd5b61218a84823560208401613574565b600082601f83011261360c57600080fd5b612d0383833560208501613574565b80151581146112aa57600080fd5b8035611eb08161361b565b803560068110611eb057600080fd5b600060c0828403121561365557600080fd5b61365d6134ac565b9050813561366a8161361b565b815261367860208301613634565b602082015261368960408301613634565b604082015261369a60608301613634565b60608201526080820135600981106136b157600080fd5b608082015260a082013567ffffffffffffffff8111156136d057600080fd5b6136dc848285016135fb565b60a08301525092915050565b600082601f8301126136f957600080fd5b8135602067ffffffffffffffff8083111561371657613716613496565b8260051b61372583820161351b565b938452858101830193838101908886111561373f57600080fd5b84880192505b858310156137fd5782358481111561375d5760008081fd5b88016080818b03601f19018113156137755760008081fd5b61377d6134d5565b8783013561378a8161361b565b81526040613799848201613634565b89830152606080850135898111156137b15760008081fd5b6137bf8f8c838901016135fb565b84840152509284013592888411156137d957600091508182fd5b6137e78e8b868801016135fb565b9083015250845250509184019190840190613745565b98975050505050505050565b600060a0828403121561381b57600080fd5b6138236134f8565b905061382e82613629565b8152602082013567ffffffffffffffff8082111561384b57600080fd5b613857858386016135fb565b6020840152604084013591508082111561387057600080fd5b61387c858386016135fb565b6040840152606084013591508082111561389557600080fd5b6138a185838601613643565b606084015260808401359150808211156138ba57600080fd5b506138c7848285016136e8565b60808301525092915050565b600080600080600080600060e0888a0312156138ee57600080fd5b6138f78861337f565b965060208801359550604088013567ffffffffffffffff8082111561391b57600080fd5b6139278b838c016135fb565b965060608a013591508082111561393d57600080fd5b6139498b838c016135fb565b955060808a013591508082111561395f57600080fd5b61396b8b838c01613809565b945060a08a013591508082111561398157600080fd5b5061398e8a828b01613809565b92505060c0880135905092959891949750929550565b600080600080600080600080610100898b0312156139c157600080fd5b6139ca8961337f565b97506020890135965060408901359550606089013567ffffffffffffffff808211156139f557600080fd5b613a018c838d016135fb565b965060808b0135915080821115613a1757600080fd5b613a238c838d016135fb565b955060a08b0135915080821115613a3957600080fd5b613a458c838d01613809565b945060c08b0135915080821115613a5b57600080fd5b50613a688b828c01613809565b92505060e089013590509295985092959890939650565b600060208284031215613a9157600080fd5b8135612d038161336a565b60008060408385031215613aaf57600080fd5b823591506020830135613ac18161336a565b809150509250929050565b60008060408385031215613adf57600080fd5b8235613aea8161336a565b91506020830135613ac18161361b565b60008060008060808587031215613b1057600080fd5b8435613b1b8161336a565b93506020850135613b2b8161336a565b925060408501359150606085013567ffffffffffffffff811115613b4e57600080fd5b613b5a878288016135fb565b91505092959194509250565b60008060408385031215613b7957600080fd5b8235613b848161336a565b91506020830135613ac18161336a565b600181811c90821680613ba857607f821691505b60208210811415613bc957634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052602160045260246000fd5b60068110613bf557613bf5613bcf565b9052565b600081518084526020808501808196508360051b8101915082860160005b85811015613c885782840389528151608081511515865286820151613c3e88880182613be5565b506040808301518282890152613c5683890182613312565b9250505060608083015192508682038188015250613c748183613312565b9a87019a9550505090840190600101613c17565b5091979650505050505050565b8051151582526000602082015160a06020850152613cb660a0850182613312565b905060408301518482036040860152613ccf8282613312565b915050606083015184820360608601528051151582526020810151613cf76020840182613be5565b506040810151613d0a6040840182613be5565b506060810151613d1d6060840182613be5565b50608081015160098110613d3357613d33613bcf565b8060808401525060a0810151905060c060a0830152613d5560c0830182613312565b91505060808301518482036080860152613d6f8282613bf9565b95945050505050565b8681526001600160a01b038616602082015260c060408201526000613da060c0830187613c95565b8281036060840152613db28187613312565b90508281036080840152613dc68186613312565b905082810360a0840152613dda8185613c95565b9998505050505050505050565b600060208284031215613df957600080fd5b8151612d038161361b565b600082601f830112613e1557600080fd5b8151613e236135828261354c565b818152846020838601011115613e3857600080fd5b61218a8260208301602087016132e6565b60008060008060808587031215613e5f57600080fd5b84519350602085015167ffffffffffffffff811115613e7d57600080fd5b613e8987828801613e04565b9350506040850151613e9a8161336a565b6060959095015193969295505050565b84815260008451613ec28160208501602089016132e6565b80830190506bffffffffffffffffffffffff198560601b1660208201528360348201526054810191505095945050505050565b600060208284031215613f0757600080fd5b8151612d038161336a565b60008060408385031215613f2557600080fd5b8251613f308161336a565b602084015190925067ffffffffffffffff811115613f4d57600080fd5b613f5985828601613e04565b9150509250929050565b6bffffffffffffffffffffffff198360601b16815260008251613f8d8160148501602087016132e6565b919091016014019392505050565b600060208284031215613fad57600080fd5b5051919050565b60008060408385031215613fc757600080fd5b505080516020909101519092909150565b634e487b7160e01b600052601160045260246000fd5b60008282101561400057614000613fd8565b500390565b6000821982111561401857614018613fd8565b500190565b6000835161402f8184602088016132e6565b8351908301906140438183602088016132e6565b01949350505050565b60006001600160a01b0380871683528086166020840152508360408301526080606083015261407e6080830184613312565b9695505050505050565b60006020828403121561409a57600080fd5b8151612d03816132b3565b60006000198214156140b9576140b9613fd8565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826140e5576140e56140c0565b500490565b6000826140f9576140f96140c0565b500690565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220fb98d512866cb56cedc0318cbf6791c5c7d9044e76c0695870a176ce6bc0cca264736f6c634300080b0033";
const isSuperArgs = (xs) => xs.length > 1;
class WXDV__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(name, symbol, tokenERC20, anconprotocolAddr, chain, overrides) {
        return super.deploy(name, symbol, tokenERC20, anconprotocolAddr, chain, overrides || {});
    }
    getDeployTransaction(name, symbol, tokenERC20, anconprotocolAddr, chain, overrides) {
        return super.getDeployTransaction(name, symbol, tokenERC20, anconprotocolAddr, chain, overrides || {});
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
exports.WXDV__factory = WXDV__factory;
WXDV__factory.bytecode = _bytecode;
WXDV__factory.abi = _abi;
//# sourceMappingURL=WXDV__factory.js.map