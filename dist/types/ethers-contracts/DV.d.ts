import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface DVInterface extends utils.Interface {
    functions: {
        "withdraw(address)": FunctionFragment;
        "setFee(uint256)": FunctionFragment;
        "getFee()": FunctionFragment;
        "getCharsAt(uint256,uint256[])": FunctionFragment;
        "seed()": FunctionFragment;
        "calc(uint256[])": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "withdraw", values: [string]): string;
    encodeFunctionData(functionFragment: "setFee", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getFee", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCharsAt", values: [BigNumberish, BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "seed", values?: undefined): string;
    encodeFunctionData(functionFragment: "calc", values: [BigNumberish[]]): string;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCharsAt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "seed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "calc", data: BytesLike): Result;
    events: {
        "LogDV(uint256[])": EventFragment;
        "Withdrawn(address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "LogDV"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}
export declare type LogDVEvent = TypedEvent<[BigNumber[]], {
    dv: BigNumber[];
}>;
export declare type LogDVEventFilter = TypedEventFilter<LogDVEvent>;
export declare type WithdrawnEvent = TypedEvent<[
    string,
    BigNumber
], {
    payee: string;
    weiAmount: BigNumber;
}>;
export declare type WithdrawnEventFilter = TypedEventFilter<WithdrawnEvent>;
export interface DV extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: DVInterface;
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
        withdraw(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setFee(_fee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getFee(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getCharsAt(pos: BigNumberish, ruc21: BigNumberish[], overrides?: CallOverrides): Promise<[BigNumber]>;
        seed(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        calc(ruc21: BigNumberish[], overrides?: CallOverrides): Promise<[BigNumber[]]>;
    };
    withdraw(payee: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setFee(_fee: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getFee(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getCharsAt(pos: BigNumberish, ruc21: BigNumberish[], overrides?: CallOverrides): Promise<BigNumber>;
    seed(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    calc(ruc21: BigNumberish[], overrides?: CallOverrides): Promise<BigNumber[]>;
    callStatic: {
        withdraw(payee: string, overrides?: CallOverrides): Promise<void>;
        setFee(_fee: BigNumberish, overrides?: CallOverrides): Promise<void>;
        getFee(overrides?: CallOverrides): Promise<BigNumber>;
        getCharsAt(pos: BigNumberish, ruc21: BigNumberish[], overrides?: CallOverrides): Promise<BigNumber>;
        seed(overrides?: CallOverrides): Promise<boolean>;
        calc(ruc21: BigNumberish[], overrides?: CallOverrides): Promise<BigNumber[]>;
    };
    filters: {
        "LogDV(uint256[])"(dv?: null): LogDVEventFilter;
        LogDV(dv?: null): LogDVEventFilter;
        "Withdrawn(address,uint256)"(payee?: string | null, weiAmount?: null): WithdrawnEventFilter;
        Withdrawn(payee?: string | null, weiAmount?: null): WithdrawnEventFilter;
    };
    estimateGas: {
        withdraw(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setFee(_fee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getFee(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getCharsAt(pos: BigNumberish, ruc21: BigNumberish[], overrides?: CallOverrides): Promise<BigNumber>;
        seed(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        calc(ruc21: BigNumberish[], overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        withdraw(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setFee(_fee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getFee(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getCharsAt(pos: BigNumberish, ruc21: BigNumberish[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        seed(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        calc(ruc21: BigNumberish[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
