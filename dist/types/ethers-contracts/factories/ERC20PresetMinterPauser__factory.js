"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC20PresetMinterPauser__factory = void 0;
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
        ],
        stateMutability: "nonpayable",
        type: "constructor",
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
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
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
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
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
                indexed: false,
                internalType: "uint256",
                name: "value",
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
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
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
        name: "MINTER_ROLE",
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
        name: "PAUSER_ROLE",
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
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
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
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
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
                name: "account",
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
                name: "amount",
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
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "burnFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
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
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
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
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "getRoleMember",
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
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleMemberCount",
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
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
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
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
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
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
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
        inputs: [],
        name: "totalSupply",
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
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
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
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
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
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b5060405162002029380380620020298339810160408190526200003491620003b5565b8151829082906200004d90600590602085019062000242565b5080516200006390600690602084019062000242565b50506007805460ff19169055506200007d600033620000dd565b620000a97f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633620000dd565b620000d57f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33620000dd565b50506200045c565b620000f482826200012060201b62000a4a1760201c565b60008281526001602090815260409091206200011b91839062000a5462000130821b17901c565b505050565b6200012c828262000150565b5050565b600062000147836001600160a01b038416620001f0565b90505b92915050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166200012c576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001ac3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600081815260018301602052604081205462000239575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556200014a565b5060006200014a565b82805462000250906200041f565b90600052602060002090601f016020900481019282620002745760008555620002bf565b82601f106200028f57805160ff1916838001178555620002bf565b82800160010185558215620002bf579182015b82811115620002bf578251825591602001919060010190620002a2565b50620002cd929150620002d1565b5090565b5b80821115620002cd5760008155600101620002d2565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200031057600080fd5b81516001600160401b03808211156200032d576200032d620002e8565b604051601f8301601f19908116603f01168101908282118183101715620003585762000358620002e8565b816040528381526020925086838588010111156200037557600080fd5b600091505b838210156200039957858201830151818301840152908201906200037a565b83821115620003ab5760008385830101525b9695505050505050565b60008060408385031215620003c957600080fd5b82516001600160401b0380821115620003e157600080fd5b620003ef86838701620002fe565b935060208501519150808211156200040657600080fd5b506200041585828601620002fe565b9150509250929050565b600181811c908216806200043457607f821691505b602082108114156200045657634e487b7160e01b600052602260045260246000fd5b50919050565b611bbd806200046c6000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806370a08231116100f9578063a457c2d711610097578063d539139311610071578063d5391393146103d3578063d547741f146103fa578063dd62ed3e1461040d578063e63ab1e91461044657600080fd5b8063a457c2d71461039a578063a9059cbb146103ad578063ca15c873146103c057600080fd5b80639010d07c116100d35780639010d07c1461032857806391d148541461035357806395d89b411461038a578063a217fddf1461039257600080fd5b806370a08231146102e457806379cc67901461030d5780638456cb591461032057600080fd5b8063313ce567116101665780633f4ba83a116101405780633f4ba83a146102ab57806340c10f19146102b357806342966c68146102c65780635c975abb146102d957600080fd5b8063313ce5671461027657806336568abe14610285578063395093511461029857600080fd5b806318160ddd116101a257806318160ddd1461021957806323b872dd1461022b578063248a9ca31461023e5780632f2ff15d1461026157600080fd5b806301ffc9a7146101c957806306fdde03146101f1578063095ea7b314610206575b600080fd5b6101dc6101d7366004611857565b61046d565b60405190151581526020015b60405180910390f35b6101f96104b1565b6040516101e891906118ad565b6101dc6102143660046118fc565b610543565b6004545b6040519081526020016101e8565b6101dc610239366004611926565b610559565b61021d61024c366004611962565b60009081526020819052604090206001015490565b61027461026f36600461197b565b61061d565b005b604051601281526020016101e8565b61027461029336600461197b565b610644565b6101dc6102a63660046118fc565b610666565b6102746106a2565b6102746102c13660046118fc565b610748565b6102746102d4366004611962565b6107f2565b60075460ff166101dc565b61021d6102f23660046119a7565b6001600160a01b031660009081526002602052604090205490565b61027461031b3660046118fc565b6107ff565b610274610899565b61033b6103363660046119c2565b61093d565b6040516001600160a01b0390911681526020016101e8565b6101dc61036136600461197b565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6101f961095c565b61021d600081565b6101dc6103a83660046118fc565b61096b565b6101dc6103bb3660046118fc565b610a1c565b61021d6103ce366004611962565b610a29565b61021d7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b61027461040836600461197b565b610a40565b61021d61041b3660046119e4565b6001600160a01b03918216600090815260036020908152604080832093909416825291909152205490565b61021d7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b60006001600160e01b031982167f5a05180f0000000000000000000000000000000000000000000000000000000014806104ab57506104ab82610a69565b92915050565b6060600580546104c090611a0e565b80601f01602080910402602001604051908101604052809291908181526020018280546104ec90611a0e565b80156105395780601f1061050e57610100808354040283529160200191610539565b820191906000526020600020905b81548152906001019060200180831161051c57829003601f168201915b5050505050905090565b6000610550338484610ad0565b50600192915050565b6000610566848484610c28565b6001600160a01b0384166000908152600360209081526040808320338452909152902054828110156106055760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6106128533858403610ad0565b506001949350505050565b6106278282610e4c565b600082815260016020526040902061063f9082610a54565b505050565b61064e8282610e72565b600082815260016020526040902061063f9082610efa565b3360008181526003602090815260408083206001600160a01b0387168452909152812054909161055091859061069d908690611a5f565b610ad0565b6106cc7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33610361565b61073e5760405162461bcd60e51b815260206004820152603960248201527f45524332305072657365744d696e7465725061757365723a206d75737420686160448201527f76652070617573657220726f6c6520746f20756e70617573650000000000000060648201526084016105fc565b610746610f0f565b565b6107727f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a633610361565b6107e45760405162461bcd60e51b815260206004820152603660248201527f45524332305072657365744d696e7465725061757365723a206d75737420686160448201527f7665206d696e74657220726f6c6520746f206d696e740000000000000000000060648201526084016105fc565b6107ee8282610fab565b5050565b6107fc3382611096565b50565b600061080b833361041b565b9050818110156108825760405162461bcd60e51b8152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f7760448201527f616e63650000000000000000000000000000000000000000000000000000000060648201526084016105fc565b61088f8333848403610ad0565b61063f8383611096565b6108c37f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a33610361565b6109355760405162461bcd60e51b815260206004820152603760248201527f45524332305072657365744d696e7465725061757365723a206d75737420686160448201527f76652070617573657220726f6c6520746f20706175736500000000000000000060648201526084016105fc565b610746611227565b600082815260016020526040812061095590836112af565b9392505050565b6060600680546104c090611a0e565b3360009081526003602090815260408083206001600160a01b038616845290915281205482811015610a055760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084016105fc565b610a123385858403610ad0565b5060019392505050565b6000610550338484610c28565b60008181526001602052604081206104ab906112bb565b61064e82826112c5565b6107ee82826112eb565b6000610955836001600160a01b038416611389565b60006001600160e01b031982167f7965db0b0000000000000000000000000000000000000000000000000000000014806104ab57507f01ffc9a7000000000000000000000000000000000000000000000000000000006001600160e01b03198316146104ab565b6001600160a01b038316610b4b5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016105fc565b6001600160a01b038216610bc75760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f737300000000000000000000000000000000000000000000000000000000000060648201526084016105fc565b6001600160a01b0383811660008181526003602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038316610ca45760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016105fc565b6001600160a01b038216610d205760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f657373000000000000000000000000000000000000000000000000000000000060648201526084016105fc565b610d2b8383836113d8565b6001600160a01b03831660009081526002602052604090205481811015610dba5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016105fc565b6001600160a01b03808516600090815260026020526040808220858503905591851681529081208054849290610df1908490611a5f565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e3d91815260200190565b60405180910390a35b50505050565b600082815260208190526040902060010154610e6881336113e3565b61063f83836112eb565b6001600160a01b0381163314610ef05760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084016105fc565b6107ee8282611461565b6000610955836001600160a01b0384166114e0565b60075460ff16610f615760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016105fc565b6007805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b0382166110015760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016105fc565b61100d600083836113d8565b806004600082825461101f9190611a5f565b90915550506001600160a01b0382166000908152600260205260408120805483929061104c908490611a5f565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b0382166111125760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f730000000000000000000000000000000000000000000000000000000000000060648201526084016105fc565b61111e826000836113d8565b6001600160a01b038216600090815260026020526040902054818110156111ad5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f636500000000000000000000000000000000000000000000000000000000000060648201526084016105fc565b6001600160a01b03831660009081526002602052604081208383039055600480548492906111dc908490611a77565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b60075460ff161561127a5760405162461bcd60e51b815260206004820152601060248201527f5061757361626c653a207061757365640000000000000000000000000000000060448201526064016105fc565b6007805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610f8e3390565b600061095583836115d3565b60006104ab825490565b6000828152602081905260409020600101546112e181336113e3565b61063f8383611461565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166107ee576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556113453390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008181526001830160205260408120546113d0575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556104ab565b5060006104ab565b61063f8383836115fd565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166107ee5761141f816001600160a01b03166014611676565b61142a836020611676565b60405160200161143b929190611a8e565b60408051601f198184030181529082905262461bcd60e51b82526105fc916004016118ad565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16156107ee576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b600081815260018301602052604081205480156115c9576000611504600183611a77565b855490915060009061151890600190611a77565b905081811461157d57600086600001828154811061153857611538611b0f565b906000526020600020015490508087600001848154811061155b5761155b611b0f565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061158e5761158e611b25565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506104ab565b60009150506104ab565b60008260000182815481106115ea576115ea611b0f565b9060005260206000200154905092915050565b60075460ff161561063f5760405162461bcd60e51b815260206004820152602a60248201527f45524332305061757361626c653a20746f6b656e207472616e7366657220776860448201527f696c65207061757365640000000000000000000000000000000000000000000060648201526084016105fc565b60606000611685836002611b3b565b611690906002611a5f565b67ffffffffffffffff8111156116a8576116a8611b5a565b6040519080825280601f01601f1916602001820160405280156116d2576020820181803683370190505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061170957611709611b0f565b60200101906001600160f81b031916908160001a9053507f78000000000000000000000000000000000000000000000000000000000000008160018151811061175457611754611b0f565b60200101906001600160f81b031916908160001a9053506000611778846002611b3b565b611783906001611a5f565b90505b6001811115611808577f303132333435363738396162636465660000000000000000000000000000000085600f16601081106117c4576117c4611b0f565b1a60f81b8282815181106117da576117da611b0f565b60200101906001600160f81b031916908160001a90535060049490941c9361180181611b70565b9050611786565b5083156109555760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105fc565b60006020828403121561186957600080fd5b81356001600160e01b03198116811461095557600080fd5b60005b8381101561189c578181015183820152602001611884565b83811115610e465750506000910152565b60208152600082518060208401526118cc816040850160208701611881565b601f01601f19169190910160400192915050565b80356001600160a01b03811681146118f757600080fd5b919050565b6000806040838503121561190f57600080fd5b611918836118e0565b946020939093013593505050565b60008060006060848603121561193b57600080fd5b611944846118e0565b9250611952602085016118e0565b9150604084013590509250925092565b60006020828403121561197457600080fd5b5035919050565b6000806040838503121561198e57600080fd5b8235915061199e602084016118e0565b90509250929050565b6000602082840312156119b957600080fd5b610955826118e0565b600080604083850312156119d557600080fd5b50508035926020909101359150565b600080604083850312156119f757600080fd5b611a00836118e0565b915061199e602084016118e0565b600181811c90821680611a2257607f821691505b60208210811415611a4357634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115611a7257611a72611a49565b500190565b600082821015611a8957611a89611a49565b500390565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611ac6816017850160208801611881565b7f206973206d697373696e6720726f6c65200000000000000000000000000000006017918401918201528351611b03816028840160208801611881565b01602801949350505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b6000816000190483118215151615611b5557611b55611a49565b500290565b634e487b7160e01b600052604160045260246000fd5b600081611b7f57611b7f611a49565b50600019019056fea2646970667358221220b61c4950eea3fd54c4422be2bbc2eb7eee651bb6bd255e56717cdb1007f3c55064736f6c634300080b0033";
const isSuperArgs = (xs) => xs.length > 1;
class ERC20PresetMinterPauser__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(name, symbol, overrides) {
        return super.deploy(name, symbol, overrides || {});
    }
    getDeployTransaction(name, symbol, overrides) {
        return super.getDeployTransaction(name, symbol, overrides || {});
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
exports.ERC20PresetMinterPauser__factory = ERC20PresetMinterPauser__factory;
ERC20PresetMinterPauser__factory.bytecode = _bytecode;
ERC20PresetMinterPauser__factory.abi = _abi;
//# sourceMappingURL=ERC20PresetMinterPauser__factory.js.map