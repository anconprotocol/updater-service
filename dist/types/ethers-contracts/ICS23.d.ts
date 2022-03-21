import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export declare type InnerSpecStruct = {
    childOrder: BigNumberish[];
    childSize: BigNumberish;
    minPrefixLength: BigNumberish;
    maxPrefixLength: BigNumberish;
    emptyChild: BytesLike;
    hash: BigNumberish;
};
export declare type InnerSpecStructOutput = [
    BigNumber[],
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    number
] & {
    childOrder: BigNumber[];
    childSize: BigNumber;
    minPrefixLength: BigNumber;
    maxPrefixLength: BigNumber;
    emptyChild: string;
    hash: number;
};
export declare type ProofSpecStruct = {
    leafSpec: LeafOpStruct;
    innerSpec: InnerSpecStruct;
    maxDepth: BigNumberish;
    minDepth: BigNumberish;
};
export declare type ProofSpecStructOutput = [
    LeafOpStructOutput,
    InnerSpecStructOutput,
    BigNumber,
    BigNumber
] & {
    leafSpec: LeafOpStructOutput;
    innerSpec: InnerSpecStructOutput;
    maxDepth: BigNumber;
    minDepth: BigNumber;
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
export interface ICS23Interface extends utils.Interface {
    functions: {
        "getIavlSpec()": FunctionFragment;
        "verify((bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),((bool,uint8,uint8,uint8,uint8,bytes),(uint256[],uint256,uint256,uint256,bytes,uint8),uint256,uint256),bytes,bytes,bytes)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getIavlSpec", values?: undefined): string;
    encodeFunctionData(functionFragment: "verify", values: [
        ExistenceProofStruct,
        ProofSpecStruct,
        BytesLike,
        BytesLike,
        BytesLike
    ]): string;
    decodeFunctionResult(functionFragment: "getIavlSpec", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    events: {};
}
export interface ICS23 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ICS23Interface;
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
        getIavlSpec(overrides?: CallOverrides): Promise<[ProofSpecStructOutput]>;
        verify(proof: ExistenceProofStruct, spec: ProofSpecStruct, root: BytesLike, key: BytesLike, value: BytesLike, overrides?: CallOverrides): Promise<[void]>;
    };
    getIavlSpec(overrides?: CallOverrides): Promise<ProofSpecStructOutput>;
    verify(proof: ExistenceProofStruct, spec: ProofSpecStruct, root: BytesLike, key: BytesLike, value: BytesLike, overrides?: CallOverrides): Promise<void>;
    callStatic: {
        getIavlSpec(overrides?: CallOverrides): Promise<ProofSpecStructOutput>;
        verify(proof: ExistenceProofStruct, spec: ProofSpecStruct, root: BytesLike, key: BytesLike, value: BytesLike, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        getIavlSpec(overrides?: CallOverrides): Promise<BigNumber>;
        verify(proof: ExistenceProofStruct, spec: ProofSpecStruct, root: BytesLike, key: BytesLike, value: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getIavlSpec(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verify(proof: ExistenceProofStruct, spec: ProofSpecStruct, root: BytesLike, key: BytesLike, value: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
