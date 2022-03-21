"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAnconProtocol__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
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
        name: "verifyProof",
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
class IAnconProtocol__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IAnconProtocol__factory = IAnconProtocol__factory;
IAnconProtocol__factory.abi = _abi;
//# sourceMappingURL=IAnconProtocol__factory.js.map