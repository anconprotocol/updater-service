import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export interface IAnconProtocolInterface extends utils.Interface {
    functions: {
        "getContractIdentifier()": FunctionFragment;
        "submitPacketWithProof(bytes32,address,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]))": FunctionFragment;
        "verifyProof(bytes32,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]))": FunctionFragment;
        "verifyProofWithKV(bytes32,bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]))": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getContractIdentifier", values?: undefined): string;
    encodeFunctionData(functionFragment: "submitPacketWithProof", values: [
        BytesLike,
        string,
        ExistenceProofStruct,
        BytesLike,
        BytesLike,
        ExistenceProofStruct
    ]): string;
    encodeFunctionData(functionFragment: "verifyProof", values: [BytesLike, ExistenceProofStruct]): string;
    encodeFunctionData(functionFragment: "verifyProofWithKV", values: [BytesLike, BytesLike, BytesLike, ExistenceProofStruct]): string;
    decodeFunctionResult(functionFragment: "getContractIdentifier", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitPacketWithProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verifyProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verifyProofWithKV", data: BytesLike): Result;
    events: {};
}
export interface IAnconProtocol extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IAnconProtocolInterface;
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
        getContractIdentifier(overrides?: CallOverrides): Promise<[string]>;
        submitPacketWithProof(moniker: BytesLike, sender: string, userProof: ExistenceProofStruct, key: BytesLike, packet: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        verifyProof(moniker: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<[boolean]>;
        verifyProofWithKV(moniker: BytesLike, key: BytesLike, value: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<[boolean]>;
    };
    getContractIdentifier(overrides?: CallOverrides): Promise<string>;
    submitPacketWithProof(moniker: BytesLike, sender: string, userProof: ExistenceProofStruct, key: BytesLike, packet: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    verifyProof(moniker: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<boolean>;
    verifyProofWithKV(moniker: BytesLike, key: BytesLike, value: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        getContractIdentifier(overrides?: CallOverrides): Promise<string>;
        submitPacketWithProof(moniker: BytesLike, sender: string, userProof: ExistenceProofStruct, key: BytesLike, packet: BytesLike, proof: ExistenceProofStruct, overrides?: CallOverrides): Promise<boolean>;
        verifyProof(moniker: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<boolean>;
        verifyProofWithKV(moniker: BytesLike, key: BytesLike, value: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {};
    estimateGas: {
        getContractIdentifier(overrides?: CallOverrides): Promise<BigNumber>;
        submitPacketWithProof(moniker: BytesLike, sender: string, userProof: ExistenceProofStruct, key: BytesLike, packet: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        verifyProof(moniker: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<BigNumber>;
        verifyProofWithKV(moniker: BytesLike, key: BytesLike, value: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getContractIdentifier(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        submitPacketWithProof(moniker: BytesLike, sender: string, userProof: ExistenceProofStruct, key: BytesLike, packet: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        verifyProof(moniker: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verifyProofWithKV(moniker: BytesLike, key: BytesLike, value: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
