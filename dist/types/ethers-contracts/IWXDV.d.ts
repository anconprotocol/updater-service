import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type LeafOpStruct = {
    valid: boolean;
    hash: BigNumberish;
    prehash_key: BigNumberish;
    prehash_value: BigNumberish;
    len: BigNumberish;
    prefix: BytesLike;
};
export declare type LeafOpStructOutput = [
    boolean,
    number,
    number,
    number,
    number,
    string
] & {
    valid: boolean;
    hash: number;
    prehash_key: number;
    prehash_value: number;
    len: number;
    prefix: string;
};
export declare type InnerOpStruct = {
    valid: boolean;
    hash: BigNumberish;
    prefix: BytesLike;
    suffix: BytesLike;
};
export declare type InnerOpStructOutput = [boolean, number, string, string] & {
    valid: boolean;
    hash: number;
    prefix: string;
    suffix: string;
};
export declare type ExistenceProofStruct = {
    valid: boolean;
    key: BytesLike;
    value: BytesLike;
    leaf: LeafOpStruct;
    path: InnerOpStruct[];
};
export declare type ExistenceProofStructOutput = [
    boolean,
    string,
    string,
    LeafOpStructOutput,
    InnerOpStructOutput[]
] & {
    valid: boolean;
    key: string;
    value: string;
    leaf: LeafOpStructOutput;
    path: InnerOpStructOutput[];
};
export interface IWXDVInterface extends utils.Interface {
    functions: {
        "submitMintWithProof(address,uint256,bytes32,bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),bytes32)": FunctionFragment;
        "lockWithProof(address,bytes32,bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),bytes32)": FunctionFragment;
        "releaseWithProof(address,bytes32,bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),bytes32)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "submitMintWithProof", values: [
        string,
        BigNumberish,
        BytesLike,
        BytesLike,
        BytesLike,
        ExistenceProofStruct,
        ExistenceProofStruct,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "lockWithProof", values: [
        string,
        BytesLike,
        BytesLike,
        BytesLike,
        ExistenceProofStruct,
        ExistenceProofStruct,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "releaseWithProof", values: [
        string,
        BytesLike,
        BytesLike,
        BytesLike,
        ExistenceProofStruct,
        ExistenceProofStruct,
        BytesLike
    ]): string;
    decodeFunctionResult(functionFragment: "submitMintWithProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockWithProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "releaseWithProof", data: BytesLike): Result;
    events: {};
}
export interface IWXDV extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IWXDVInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        submitMintWithProof(sender: string, newItemId: BigNumberish, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        lockWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        releaseWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    submitMintWithProof(sender: string, newItemId: BigNumberish, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    lockWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    releaseWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        submitMintWithProof(sender: string, newItemId: BigNumberish, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        lockWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        releaseWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        submitMintWithProof(sender: string, newItemId: BigNumberish, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        lockWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        releaseWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        submitMintWithProof(sender: string, newItemId: BigNumberish, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        lockWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        releaseWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
