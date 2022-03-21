"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [],
        name: "last_completed_migration",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
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
        constant: true,
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "completed",
                type: "uint256",
            },
        ],
        name: "setCompleted",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x6080604052600080546001600160a01b0319163317905534801561002257600080fd5b506101bb806100326000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063445df0ac146100465780638da5cb5b14610062578063fdacd576146100a7575b600080fd5b61004f60015481565b6040519081526020015b60405180910390f35b6000546100829073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610059565b6100ba6100b536600461016c565b6100bc565b005b60005473ffffffffffffffffffffffffffffffffffffffff163314610167576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603360248201527f546869732066756e6374696f6e206973207265737472696374656420746f207460448201527f686520636f6e74726163742773206f776e657200000000000000000000000000606482015260840160405180910390fd5b600155565b60006020828403121561017e57600080fd5b503591905056fea26469706673582212202a3d756d88e3987bc9d4d573cb1afd826ea02f2bb926c952a8c877ee8619c46564736f6c634300080b0033";
const isSuperArgs = (xs) => xs.length > 1;
class Migrations__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
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
exports.Migrations__factory = Migrations__factory;
Migrations__factory.bytecode = _bytecode;
Migrations__factory.abi = _abi;
//# sourceMappingURL=Migrations__factory.js.map