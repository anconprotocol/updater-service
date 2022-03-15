"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XDVNFT__factory = void 0;
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
                name: "ancon",
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
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "paidToContract",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "paidToPaymentAddress",
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
                name: "packetProof",
                type: "tuple",
            },
        ],
        name: "mintWithProof",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
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
                name: "packetProof",
                type: "tuple",
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
                name: "packetProof",
                type: "tuple",
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
];
const _bytecode = "0x60806040527fa0b28d7f9d639d313fdc6d1470d226d0631d4301f548fa410483bc9b487c1d08600e556000600f553480156200003a57600080fd5b5060405162003869380380620038698339810160408190526200005d91620002cb565b845185908590620000769060009060208501906200013b565b5080516200008c9060019060208401906200013b565b505050620000a9620000a3620000e560201b60201c565b620000e9565b600c80546001600160a01b039485166001600160a01b031991821617909155600d805493909416921691909117909155600f5550620003a19050565b3390565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620001499062000364565b90600052602060002090601f0160209004810192826200016d5760008555620001b8565b82601f106200018857805160ff1916838001178555620001b8565b82800160010185558215620001b8579182015b82811115620001b85782518255916020019190600101906200019b565b50620001c6929150620001ca565b5090565b5b80821115620001c65760008155600101620001cb565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200020957600080fd5b81516001600160401b0380821115620002265762000226620001e1565b604051601f8301601f19908116603f01168101908282118183101715620002515762000251620001e1565b816040528381526020925086838588010111156200026e57600080fd5b600091505b8382101562000292578582018301518183018401529082019062000273565b83821115620002a45760008385830101525b9695505050505050565b80516001600160a01b0381168114620002c657600080fd5b919050565b600080600080600060a08688031215620002e457600080fd5b85516001600160401b0380821115620002fc57600080fd5b6200030a89838a01620001f7565b965060208801519150808211156200032157600080fd5b506200033088828901620001f7565b9450506200034160408701620002ae565b92506200035160608701620002ae565b9150608086015190509295509295909350565b600181811c908216806200037957607f821691505b602082108114156200039b57634e487b7160e01b600052602260045260246000fd5b50919050565b6134b880620003b16000396000f3fe6080604052600436106101cd5760003560e01c80636352211e116100f757806395d89b4111610095578063ce2bdf2d11610064578063ce2bdf2d14610537578063e985e9c514610557578063e9cbd822146105a0578063f2fde38b146105c057600080fd5b806395d89b41146104c2578063a22cb465146104d7578063b88d4fde146104f7578063c87b56dd1461051757600080fd5b8063715018a6116100d1578063715018a614610451578063756af45f146104665780637ac3c02f146104865780638da5cb5b146104a457600080fd5b80636352211e146103f15780636c19e7831461041157806370a082311461043157600080fd5b8063252498a21161016f57806342966c681161013e57806342966c681461038957806351cff8d9146103a95780635600f04f146103c957806357e98152146103de57600080fd5b8063252498a2146103095780633cd559a41461032957806340c10f191461034957806342842e0e1461036957600080fd5b8063095ea7b3116101ab578063095ea7b3146102615780630a835ed814610283578063150b7a02146102a457806323b872dd146102e957600080fd5b806301ffc9a7146101d257806306fdde0314610207578063081812fc14610229575b600080fd5b3480156101de57600080fd5b506101f26101ed366004612766565b6105e0565b60405190151581526020015b60405180910390f35b34801561021357600080fd5b5061021c61067d565b6040516101fe91906127db565b34801561023557600080fd5b506102496102443660046127ee565b61070f565b6040516001600160a01b0390911681526020016101fe565b34801561026d57600080fd5b5061028161027c36600461281c565b6107a9565b005b610296610291366004612c41565b6108db565b6040519081526020016101fe565b3480156102b057600080fd5b506102d06102bf366004612cc9565b630a85bd0160e11b95945050505050565b6040516001600160e01b031990911681526020016101fe565b3480156102f557600080fd5b50610281610304366004612d68565b610bbd565b34801561031557600080fd5b50610281610324366004612da9565b610c45565b34801561033557600080fd5b50600d54610249906001600160a01b031681565b34801561035557600080fd5b5061029661036436600461281c565b610cb6565b34801561037557600080fd5b50610281610384366004612d68565b610d8d565b34801561039557600080fd5b506102816103a43660046127ee565b610da8565b3480156103b557600080fd5b506102816103c4366004612df2565b610e2f565b3480156103d557600080fd5b5061021c610f78565b6102966103ec366004612c41565b611006565b3480156103fd57600080fd5b5061024961040c3660046127ee565b6112a9565b34801561041d57600080fd5b5061028161042c366004612df2565b611334565b34801561043d57600080fd5b5061029661044c366004612df2565b6113b0565b34801561045d57600080fd5b5061028161144a565b34801561047257600080fd5b50610281610481366004612df2565b6114b0565b34801561049257600080fd5b506009546001600160a01b0316610249565b3480156104b057600080fd5b506007546001600160a01b0316610249565b3480156104ce57600080fd5b5061021c6116b5565b3480156104e357600080fd5b506102816104f2366004612e0f565b6116c4565b34801561050357600080fd5b50610281610512366004612e48565b611789565b34801561052357600080fd5b5061021c6105323660046127ee565b611817565b34801561054357600080fd5b50610296610552366004612c41565b611822565b34801561056357600080fd5b506101f2610572366004612eb4565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b3480156105ac57600080fd5b50600c54610249906001600160a01b031681565b3480156105cc57600080fd5b506102816105db366004612df2565b61193d565b60006001600160e01b031982167f80ac58cd00000000000000000000000000000000000000000000000000000000148061064357506001600160e01b031982167f5b5e139f00000000000000000000000000000000000000000000000000000000145b8061067757507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316145b92915050565b60606000805461068c90612ee2565b80601f01602080910402602001604051908101604052809291908181526020018280546106b890612ee2565b80156107055780601f106106da57610100808354040283529160200191610705565b820191906000526020600020905b8154815290600101906020018083116106e857829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b031661078d5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b60006107b4826112a9565b9050806001600160a01b0316836001600160a01b0316141561083e5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f72000000000000000000000000000000000000000000000000000000000000006064820152608401610784565b336001600160a01b038216148061085a575061085a8133610572565b6108cc5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610784565b6108d68383611a1c565b505050565b600d54600e5460208301516040516397554e8f60e01b81526000936001600160a01b0316926397554e8f9261091a92339189918b908a906004016130c6565b6020604051808303816000875af1158015610939573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061095d9190613135565b6109a95760405162461bcd60e51b815260206004820152601460248201527f696e76616c6964207061636b65742070726f6f660000000000000000000000006044820152606401610784565b6000806000806000888060200190518101906109c59190613197565b94509450945094509450600d60009054906101000a90046001600160a01b03166001600160a01b031663c284bdf36040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a469190613233565b8114610aa75760405162461bcd60e51b815260206004820152602a60248201527f6d7573742062652066726f6d20616e636f6e70726f746f636f6c2066726f6d2060448201526939b0b6b29031b430b4b760b11b6064820152608401610784565b610ab08361324c565b60601c610abc866112a9565b6001600160a01b031614610b025760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b21037bbb732b960991b6044820152606401610784565b610b0b8361324c565b60601c3314610b4c5760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b21037bbb732b960991b6044820152606401610784565b610b558261324c565b60601c3014610ba65760405162461bcd60e51b815260206004820152601360248201527f696e76616c69642064657374696e6174696f6e000000000000000000000000006044820152606401610784565b610bb08585611a8a565b5092979650505050505050565b610bc8335b82611b33565b610c3a5760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610784565b6108d6838383611c2a565b6007546001600160a01b03163314610c9f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610784565b8051610cb2906008906020840190612681565b5050565b6040517f242b792200000000000000000000000000000000000000000000000000000000815260206004820152606360248201527f526571756972657320616e636f6e70726f746f636f6c2070726f6f6620746f2060448201527f65786563757465206d696e74696e672e205365652068747470733a2f2f67697460648201527f6875622e636f6d2f616e636f6e70726f746f636f6c20666f72206d6f7265206960848201527f6e666f000000000000000000000000000000000000000000000000000000000060a482015260009060c401610784565b6108d683838360405180602001604052806000815250611789565b610db133610bc2565b610e235760405162461bcd60e51b815260206004820152603060248201527f4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f766564000000000000000000000000000000006064820152608401610784565b610e2c81611df7565b50565b6007546001600160a01b03163314610e895760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610784565b604051479060009081906001600160a01b0385169084908381818185875af1925050503d8060008114610ed8576040519150601f19603f3d011682016040523d82523d6000602084013e610edd565b606091505b509150915081610f2f5760405162461bcd60e51b815260206004820152601460248201527f4661696c656420746f2073656e642045746865720000000000000000000000006044820152606401610784565b836001600160a01b03167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d584604051610f6a91815260200190565b60405180910390a250505050565b60088054610f8590612ee2565b80601f0160208091040260200160405190810160405280929190818152602001828054610fb190612ee2565b8015610ffe5780601f10610fd357610100808354040283529160200191610ffe565b820191906000526020600020905b815481529060010190602001808311610fe157829003601f168201915b505050505081565b600d54600e5460208301516040516397554e8f60e01b81526000936001600160a01b0316926397554e8f9261104592339189918b908a906004016130c6565b6020604051808303816000875af1158015611064573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110889190613135565b6110d45760405162461bcd60e51b815260206004820152601460248201527f696e76616c6964207061636b65742070726f6f660000000000000000000000006044820152606401610784565b6000806000868060200190518101906110ed9190613288565b925092509250600d60009054906101000a90046001600160a01b03166001600160a01b031663c284bdf36040518163ffffffff1660e01b8152600401602060405180830381865afa158015611146573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061116a9190613233565b81146111cb5760405162461bcd60e51b815260206004820152602a60248201527f6d7573742062652066726f6d20616e636f6e70726f746f636f6c2066726f6d2060448201526939b0b6b29031b430b4b760b11b6064820152608401610784565b6040517f6352211e000000000000000000000000000000000000000000000000000000008152600481018490523090636352211e90602401602060405180830381865afa158015611220573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061124491906132d8565b6001600160a01b0316336001600160a01b0316146112945760405162461bcd60e51b815260206004820152600d60248201526c34b73b30b634b21037bbb732b960991b6044820152606401610784565b61129e8383611a8a565b509095945050505050565b6000818152600260205260408120546001600160a01b0316806106775760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e00000000000000000000000000000000000000000000006064820152608401610784565b6007546001600160a01b0316331461138e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610784565b600980546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160a01b03821661142e5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f2061646472657373000000000000000000000000000000000000000000006064820152608401610784565b506001600160a01b031660009081526003602052604090205490565b6007546001600160a01b031633146114a45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610784565b6114ae6000611e00565b565b6007546001600160a01b0316331461150a5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610784565b600c546040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa15801561156c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115909190613233565b600c546040517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b0385811660048301526024820184905292935091169063a9059cbb906044016020604051808303816000875af11580156115fe573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116229190613135565b61166e5760405162461bcd60e51b815260206004820152601460248201527f5844563a205472616e73666572206661696c65640000000000000000000000006044820152606401610784565b816001600160a01b03167f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5826040516116a991815260200190565b60405180910390a25050565b60606001805461068c90612ee2565b6001600160a01b03821633141561171d5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610784565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6117933383611b33565b6118055760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f7665640000000000000000000000000000006064820152608401610784565b61181184848484611e52565b50505050565b606061067782611ed0565b6000611832600b80546001019055565b600061183d600b5490565b600d54600e5460208601516040516397554e8f60e01b81529394506001600160a01b03909216926397554e8f9261187f929133918a918c908b906004016130c6565b6020604051808303816000875af115801561189e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118c29190613135565b61190e5760405162461bcd60e51b815260206004820152601460248201527f696e76616c6964207061636b65742070726f6f660000000000000000000000006044820152606401610784565b6000808680602001905181019061192591906132f5565b91509150611933828461205b565b61129e8382611a8a565b6007546001600160a01b031633146119975760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610784565b6001600160a01b038116611a135760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610784565b610e2c81611e00565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190611a51826112a9565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000828152600260205260409020546001600160a01b0316611b145760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201527f6578697374656e7420746f6b656e0000000000000000000000000000000000006064820152608401610784565b600082815260066020908152604090912082516108d692840190612681565b6000818152600260205260408120546001600160a01b0316611bac5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610784565b6000611bb7836112a9565b9050806001600160a01b0316846001600160a01b03161480611bf25750836001600160a01b0316611be78461070f565b6001600160a01b0316145b80611c2257506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316611c3d826112a9565b6001600160a01b031614611cb95760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e00000000000000000000000000000000000000000000006064820152608401610784565b6001600160a01b038216611d345760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610784565b611d3f600082611a1c565b6001600160a01b0383166000908152600360205260408120805460019290611d6890849061335c565b90915550506001600160a01b0382166000908152600360205260408120805460019290611d96908490613373565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b610e2c81612075565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b611e5d848484611c2a565b611e69848484846120b5565b6118115760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610784565b6000818152600260205260409020546060906001600160a01b0316611f5d5760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f722060448201527f6e6f6e6578697374656e7420746f6b656e0000000000000000000000000000006064820152608401610784565b60008281526006602052604081208054611f7690612ee2565b80601f0160208091040260200160405190810160405280929190818152602001828054611fa290612ee2565b8015611fef5780601f10611fc457610100808354040283529160200191611fef565b820191906000526020600020905b815481529060010190602001808311611fd257829003601f168201915b50505050509050600061200d60408051602081019091526000815290565b9050805160001415612020575092915050565b81511561205257808260405160200161203a92919061338b565b60405160208183030381529060405292505050919050565b611c22846121fe565b610cb28282604051806020016040528060008152506122f4565b61207e81612372565b6000818152600660205260409020805461209790612ee2565b159050610e2c576000818152600660205260408120610e2c91612705565b60006001600160a01b0384163b156121f357604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906120f99033908990889088906004016133ba565b6020604051808303816000875af1925050508015612134575060408051601f3d908101601f19168201909252612131918101906133f6565b60015b6121d9573d808015612162576040519150601f19603f3d011682016040523d82523d6000602084013e612167565b606091505b5080516121d15760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610784565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611c22565b506001949350505050565b6000818152600260205260409020546060906001600160a01b031661228b5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e00000000000000000000000000000000006064820152608401610784565b60006122a260408051602081019091526000815290565b905060008151116122c257604051806020016040528060008152506122ed565b806122cc8461240d565b6040516020016122dd92919061338b565b6040516020818303038152906040525b9392505050565b6122fe838361253f565b61230b60008484846120b5565b6108d65760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b6064820152608401610784565b600061237d826112a9565b905061238a600083611a1c565b6001600160a01b03811660009081526003602052604081208054600192906123b390849061335c565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60608161244d57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115612477578061246181613413565b91506124709050600a83613444565b9150612451565b60008167ffffffffffffffff81111561249257612492612848565b6040519080825280601f01601f1916602001820160405280156124bc576020820181803683370190505b5090505b8415611c22576124d160018361335c565b91506124de600a86613458565b6124e9906030613373565b60f81b8183815181106124fe576124fe61346c565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350612538600a86613444565b94506124c0565b6001600160a01b0382166125955760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610784565b6000818152600260205260409020546001600160a01b0316156125fa5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610784565b6001600160a01b0382166000908152600360205260408120805460019290612623908490613373565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b82805461268d90612ee2565b90600052602060002090601f0160209004810192826126af57600085556126f5565b82601f106126c857805160ff19168380011785556126f5565b828001600101855582156126f5579182015b828111156126f55782518255916020019190600101906126da565b5061270192915061273b565b5090565b50805461271190612ee2565b6000825580601f10612721575050565b601f016020900490600052602060002090810190610e2c91905b5b80821115612701576000815560010161273c565b6001600160e01b031981168114610e2c57600080fd5b60006020828403121561277857600080fd5b81356122ed81612750565b60005b8381101561279e578181015183820152602001612786565b838111156118115750506000910152565b600081518084526127c7816020860160208601612783565b601f01601f19169290920160200192915050565b6020815260006122ed60208301846127af565b60006020828403121561280057600080fd5b5035919050565b6001600160a01b0381168114610e2c57600080fd5b6000806040838503121561282f57600080fd5b823561283a81612807565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b60405160c0810167ffffffffffffffff8111828210171561288157612881612848565b60405290565b6040516080810167ffffffffffffffff8111828210171561288157612881612848565b60405160a0810167ffffffffffffffff8111828210171561288157612881612848565b604051601f8201601f1916810167ffffffffffffffff811182821017156128f6576128f6612848565b604052919050565b600067ffffffffffffffff82111561291857612918612848565b50601f01601f191660200190565b6000612939612934846128fe565b6128cd565b905082815283838301111561294d57600080fd5b828260208301376000602084830101529392505050565b600082601f83011261297557600080fd5b6122ed83833560208501612926565b8015158114610e2c57600080fd5b803561299d81612984565b919050565b80356006811061299d57600080fd5b600060c082840312156129c357600080fd5b6129cb61285e565b905081356129d881612984565b81526129e6602083016129a2565b60208201526129f7604083016129a2565b6040820152612a08606083016129a2565b6060820152608082013560098110612a1f57600080fd5b608082015260a082013567ffffffffffffffff811115612a3e57600080fd5b612a4a84828501612964565b60a08301525092915050565b600082601f830112612a6757600080fd5b8135602067ffffffffffffffff80831115612a8457612a84612848565b8260051b612a938382016128cd565b9384528581018301938381019088861115612aad57600080fd5b84880192505b85831015612b6b57823584811115612acb5760008081fd5b88016080818b03601f1901811315612ae35760008081fd5b612aeb612887565b87830135612af881612984565b81526040612b078482016129a2565b8983015260608085013589811115612b1f5760008081fd5b612b2d8f8c83890101612964565b8484015250928401359288841115612b4757600091508182fd5b612b558e8b86880101612964565b9083015250845250509184019190840190612ab3565b98975050505050505050565b600060a08284031215612b8957600080fd5b612b916128aa565b9050612b9c82612992565b8152602082013567ffffffffffffffff80821115612bb957600080fd5b612bc585838601612964565b60208401526040840135915080821115612bde57600080fd5b612bea85838601612964565b60408401526060840135915080821115612c0357600080fd5b612c0f858386016129b1565b60608401526080840135915080821115612c2857600080fd5b50612c3584828501612a56565b60808301525092915050565b600080600060608486031215612c5657600080fd5b833567ffffffffffffffff80821115612c6e57600080fd5b612c7a87838801612964565b94506020860135915080821115612c9057600080fd5b612c9c87838801612b77565b93506040860135915080821115612cb257600080fd5b50612cbf86828701612b77565b9150509250925092565b600080600080600060808688031215612ce157600080fd5b8535612cec81612807565b94506020860135612cfc81612807565b935060408601359250606086013567ffffffffffffffff80821115612d2057600080fd5b818801915088601f830112612d3457600080fd5b813581811115612d4357600080fd5b896020828501011115612d5557600080fd5b9699959850939650602001949392505050565b600080600060608486031215612d7d57600080fd5b8335612d8881612807565b92506020840135612d9881612807565b929592945050506040919091013590565b600060208284031215612dbb57600080fd5b813567ffffffffffffffff811115612dd257600080fd5b8201601f81018413612de357600080fd5b611c2284823560208401612926565b600060208284031215612e0457600080fd5b81356122ed81612807565b60008060408385031215612e2257600080fd5b8235612e2d81612807565b91506020830135612e3d81612984565b809150509250929050565b60008060008060808587031215612e5e57600080fd5b8435612e6981612807565b93506020850135612e7981612807565b925060408501359150606085013567ffffffffffffffff811115612e9c57600080fd5b612ea887828801612964565b91505092959194509250565b60008060408385031215612ec757600080fd5b8235612ed281612807565b91506020830135612e3d81612807565b600181811c90821680612ef657607f821691505b60208210811415612f1757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052602160045260246000fd5b60068110612f4357612f43612f1d565b9052565b600081518084526020808501808196508360051b8101915082860160005b85811015612fd65782840389528151608081511515865286820151612f8c88880182612f33565b506040808301518282890152612fa4838901826127af565b9250505060608083015192508682038188015250612fc281836127af565b9a87019a9550505090840190600101612f65565b5091979650505050505050565b8051151582526000602082015160a0602085015261300460a08501826127af565b90506040830151848203604086015261301d82826127af565b9150506060830151848203606086015280511515825260208101516130456020840182612f33565b5060408101516130586040840182612f33565b50606081015161306b6060840182612f33565b5060808101516009811061308157613081612f1d565b8060808401525060a0810151905060c060a08301526130a360c08301826127af565b915050608083015184820360808601526130bd8282612f47565b95945050505050565b8681526001600160a01b038616602082015260c0604082015260006130ee60c0830187612fe3565b828103606084015261310081876127af565b9050828103608084015261311481866127af565b905082810360a08401526131288185612fe3565b9998505050505050505050565b60006020828403121561314757600080fd5b81516122ed81612984565b600082601f83011261316357600080fd5b8151613171612934826128fe565b81815284602083860101111561318657600080fd5b611c22826020830160208701612783565b600080600080600060a086880312156131af57600080fd5b85519450602086015167ffffffffffffffff808211156131ce57600080fd5b6131da89838a01613152565b955060408801519150808211156131f057600080fd5b6131fc89838a01613152565b9450606088015191508082111561321257600080fd5b5061321f88828901613152565b925050608086015190509295509295909350565b60006020828403121561324557600080fd5b5051919050565b805160208201516bffffffffffffffffffffffff1980821692919060148310156132805780818460140360031b1b83161693505b505050919050565b60008060006060848603121561329d57600080fd5b83519250602084015167ffffffffffffffff8111156132bb57600080fd5b6132c786828701613152565b925050604084015190509250925092565b6000602082840312156132ea57600080fd5b81516122ed81612807565b6000806040838503121561330857600080fd5b825161331381612807565b602084015190925067ffffffffffffffff81111561333057600080fd5b61333c85828601613152565b9150509250929050565b634e487b7160e01b600052601160045260246000fd5b60008282101561336e5761336e613346565b500390565b6000821982111561338657613386613346565b500190565b6000835161339d818460208801612783565b8351908301906133b1818360208801612783565b01949350505050565b60006001600160a01b038087168352808616602084015250836040830152608060608301526133ec60808301846127af565b9695505050505050565b60006020828403121561340857600080fd5b81516122ed81612750565b600060001982141561342757613427613346565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826134535761345361342e565b500490565b6000826134675761346761342e565b500690565b634e487b7160e01b600052603260045260246000fdfea26469706673582212200eb6dfb3bf46c60bd831f3b286782f3231af3465cd74f445274e2ad1931a862d64736f6c634300080b0033";
const isSuperArgs = (xs) => xs.length > 1;
class XDVNFT__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(name, symbol, tokenERC20, ancon, chain, overrides) {
        return super.deploy(name, symbol, tokenERC20, ancon, chain, overrides || {});
    }
    getDeployTransaction(name, symbol, tokenERC20, ancon, chain, overrides) {
        return super.getDeployTransaction(name, symbol, tokenERC20, ancon, chain, overrides || {});
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
exports.XDVNFT__factory = XDVNFT__factory;
XDVNFT__factory.bytecode = _bytecode;
XDVNFT__factory.abi = _abi;
//# sourceMappingURL=XDVNFT__factory.js.map