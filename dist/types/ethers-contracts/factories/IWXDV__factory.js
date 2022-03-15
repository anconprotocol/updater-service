"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IWXDV__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
];
class IWXDV__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IWXDV__factory = IWXDV__factory;
IWXDV__factory.abi = _abi;
//# sourceMappingURL=IWXDV__factory.js.map