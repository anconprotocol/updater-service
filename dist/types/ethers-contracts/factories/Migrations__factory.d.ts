import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Migrations, MigrationsInterface } from "../Migrations";
declare type MigrationsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Migrations__factory extends ContractFactory {
    constructor(...args: MigrationsConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<Migrations>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): Migrations;
    connect(signer: Signer): Migrations__factory;
    static readonly bytecode = "0x6080604052600080546001600160a01b0319163317905534801561002257600080fd5b506101bb806100326000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063445df0ac146100465780638da5cb5b14610062578063fdacd576146100a7575b600080fd5b61004f60015481565b6040519081526020015b60405180910390f35b6000546100829073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610059565b6100ba6100b536600461016c565b6100bc565b005b60005473ffffffffffffffffffffffffffffffffffffffff163314610167576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603360248201527f546869732066756e6374696f6e206973207265737472696374656420746f207460448201527f686520636f6e74726163742773206f776e657200000000000000000000000000606482015260840160405180910390fd5b600155565b60006020828403121561017e57600080fd5b503591905056fea26469706673582212202a3d756d88e3987bc9d4d573cb1afd826ea02f2bb926c952a8c877ee8619c46564736f6c634300080b0033";
    static readonly abi: ({
        inputs: any[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        constant: boolean;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: any[];
        stateMutability: string;
        type: string;
        constant?: undefined;
    })[];
    static createInterface(): MigrationsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Migrations;
}
export {};
