import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
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
export interface AnconProtocolInterface extends utils.Interface {
    functions: {
        "INCLUDED_BLOCKS_EPOCH()": FunctionFragment;
        "accountByAddrProofs(address)": FunctionFragment;
        "accountProofs(bytes)": FunctionFragment;
        "dagGraphSubscriptions(address)": FunctionFragment;
        "getIavlSpec()": FunctionFragment;
        "latestRootHashTable(bytes32)": FunctionFragment;
        "nonce(address)": FunctionFragment;
        "owner()": FunctionFragment;
        "proofs(bytes)": FunctionFragment;
        "relayer()": FunctionFragment;
        "relayerHashTable(bytes32,uint256)": FunctionFragment;
        "seq()": FunctionFragment;
        "stablecoin()": FunctionFragment;
        "tiers(bytes32)": FunctionFragment;
        "totalHeaderUpdatesByDagGraph(address)": FunctionFragment;
        "totalSubmittedByDagGraphUser(address,address)": FunctionFragment;
        "verify((bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),((bool,uint8,uint8,uint8,uint8,bytes),(uint256[],uint256,uint256,uint256,bytes,uint8),uint256,uint256),bytes,bytes,bytes)": FunctionFragment;
        "whitelistedDagGraph(bytes32)": FunctionFragment;
        "getContractIdentifier()": FunctionFragment;
        "verifyContractIdentifier(uint256,address,bytes32)": FunctionFragment;
        "getNonce()": FunctionFragment;
        "registerDagGraphTier(bytes32,address,bytes32)": FunctionFragment;
        "updateRelayerHeader(bytes32,bytes,uint256)": FunctionFragment;
        "setPaymentToken(address)": FunctionFragment;
        "addTier(bytes32,address,uint256,uint256,uint256,uint256)": FunctionFragment;
        "setTierSettings(bytes32,address,uint256,uint256,uint256,uint256)": FunctionFragment;
        "withdraw(address)": FunctionFragment;
        "withdrawToken(address,address)": FunctionFragment;
        "getProtocolHeader(bytes32)": FunctionFragment;
        "getProof(bytes)": FunctionFragment;
        "hasProof(bytes)": FunctionFragment;
        "enrollL2Account(bytes32,bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]))": FunctionFragment;
        "submitPacketWithProof(bytes32,address,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]))": FunctionFragment;
        "verifyProofWithKV(bytes32,bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]))": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "INCLUDED_BLOCKS_EPOCH", values?: undefined): string;
    encodeFunctionData(functionFragment: "accountByAddrProofs", values: [string]): string;
    encodeFunctionData(functionFragment: "accountProofs", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "dagGraphSubscriptions", values: [string]): string;
    encodeFunctionData(functionFragment: "getIavlSpec", values?: undefined): string;
    encodeFunctionData(functionFragment: "latestRootHashTable", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "nonce", values: [string]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "proofs", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "relayer", values?: undefined): string;
    encodeFunctionData(functionFragment: "relayerHashTable", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "seq", values?: undefined): string;
    encodeFunctionData(functionFragment: "stablecoin", values?: undefined): string;
    encodeFunctionData(functionFragment: "tiers", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "totalHeaderUpdatesByDagGraph", values: [string]): string;
    encodeFunctionData(functionFragment: "totalSubmittedByDagGraphUser", values: [string, string]): string;
    encodeFunctionData(functionFragment: "verify", values: [
        ExistenceProofStruct,
        ProofSpecStruct,
        BytesLike,
        BytesLike,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "whitelistedDagGraph", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getContractIdentifier", values?: undefined): string;
    encodeFunctionData(functionFragment: "verifyContractIdentifier", values: [BigNumberish, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "getNonce", values?: undefined): string;
    encodeFunctionData(functionFragment: "registerDagGraphTier", values: [BytesLike, string, BytesLike]): string;
    encodeFunctionData(functionFragment: "updateRelayerHeader", values: [BytesLike, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "setPaymentToken", values: [string]): string;
    encodeFunctionData(functionFragment: "addTier", values: [
        BytesLike,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "setTierSettings", values: [
        BytesLike,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "withdraw", values: [string]): string;
    encodeFunctionData(functionFragment: "withdrawToken", values: [string, string]): string;
    encodeFunctionData(functionFragment: "getProtocolHeader", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getProof", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "hasProof", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "enrollL2Account", values: [BytesLike, BytesLike, BytesLike, ExistenceProofStruct]): string;
    encodeFunctionData(functionFragment: "submitPacketWithProof", values: [
        BytesLike,
        string,
        ExistenceProofStruct,
        BytesLike,
        BytesLike,
        ExistenceProofStruct
    ]): string;
    encodeFunctionData(functionFragment: "verifyProofWithKV", values: [BytesLike, BytesLike, BytesLike, ExistenceProofStruct]): string;
    decodeFunctionResult(functionFragment: "INCLUDED_BLOCKS_EPOCH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accountByAddrProofs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "accountProofs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "dagGraphSubscriptions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getIavlSpec", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "latestRootHashTable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proofs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "relayer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "relayerHashTable", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "seq", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stablecoin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tiers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalHeaderUpdatesByDagGraph", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSubmittedByDagGraphUser", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "whitelistedDagGraph", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getContractIdentifier", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verifyContractIdentifier", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerDagGraphTier", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateRelayerHeader", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPaymentToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addTier", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setTierSettings", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getProtocolHeader", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "enrollL2Account", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitPacketWithProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "verifyProofWithKV", data: BytesLike): Result;
    events: {
        "AccountRegistered(bool,bytes,bytes,bytes32)": EventFragment;
        "HeaderUpdated(bytes32)": EventFragment;
        "ProofPacketSubmitted(bytes,bytes,bytes32)": EventFragment;
        "ServiceFeePaid(address,bytes32,bytes32,address,uint256)": EventFragment;
        "TierAdded(bytes32)": EventFragment;
        "TierUpdated(bytes32,address,uint256,uint256,uint256)": EventFragment;
        "Withdrawn(address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AccountRegistered"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "HeaderUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProofPacketSubmitted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ServiceFeePaid"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TierAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TierUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}
export declare type AccountRegisteredEvent = TypedEvent<[
    boolean,
    string,
    string,
    string
], {
    enrolledStatus: boolean;
    key: string;
    value: string;
    moniker: string;
}>;
export declare type AccountRegisteredEventFilter = TypedEventFilter<AccountRegisteredEvent>;
export declare type HeaderUpdatedEvent = TypedEvent<[string], {
    moniker: string;
}>;
export declare type HeaderUpdatedEventFilter = TypedEventFilter<HeaderUpdatedEvent>;
export declare type ProofPacketSubmittedEvent = TypedEvent<[
    string,
    string,
    string
], {
    key: string;
    packet: string;
    moniker: string;
}>;
export declare type ProofPacketSubmittedEventFilter = TypedEventFilter<ProofPacketSubmittedEvent>;
export declare type ServiceFeePaidEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    BigNumber
], {
    from: string;
    tier: string;
    moniker: string;
    token: string;
    fee: BigNumber;
}>;
export declare type ServiceFeePaidEventFilter = TypedEventFilter<ServiceFeePaidEvent>;
export declare type TierAddedEvent = TypedEvent<[string], {
    id: string;
}>;
export declare type TierAddedEventFilter = TypedEventFilter<TierAddedEvent>;
export declare type TierUpdatedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber
], {
    id: string;
    token: string;
    fee: BigNumber;
    staked: BigNumber;
    includedBlocks: BigNumber;
}>;
export declare type TierUpdatedEventFilter = TypedEventFilter<TierUpdatedEvent>;
export declare type WithdrawnEvent = TypedEvent<[
    string,
    BigNumber
], {
    paymentAddress: string;
    amount: BigNumber;
}>;
export declare type WithdrawnEventFilter = TypedEventFilter<WithdrawnEvent>;
export interface AnconProtocol extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AnconProtocolInterface;
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
        INCLUDED_BLOCKS_EPOCH(overrides?: CallOverrides): Promise<[BigNumber]>;
        accountByAddrProofs(arg0: string, overrides?: CallOverrides): Promise<[string]>;
        accountProofs(arg0: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        dagGraphSubscriptions(arg0: string, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            token: string;
            amount: BigNumber;
            amountStaked: BigNumber;
            includedBlocks: BigNumber;
            id: string;
            incentiveBlocksMonthly: BigNumber;
            incentivePercentageMonthly: BigNumber;
            includedBlocksStarted: BigNumber;
            setupFee: BigNumber;
        }>;
        getIavlSpec(overrides?: CallOverrides): Promise<[ProofSpecStructOutput]>;
        latestRootHashTable(arg0: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        nonce(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        proofs(arg0: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        relayer(overrides?: CallOverrides): Promise<[string]>;
        relayerHashTable(arg0: BytesLike, arg1: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        seq(overrides?: CallOverrides): Promise<[BigNumber]>;
        stablecoin(overrides?: CallOverrides): Promise<[string]>;
        tiers(arg0: BytesLike, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            token: string;
            amount: BigNumber;
            amountStaked: BigNumber;
            includedBlocks: BigNumber;
            id: string;
            incentiveBlocksMonthly: BigNumber;
            incentivePercentageMonthly: BigNumber;
            includedBlocksStarted: BigNumber;
            setupFee: BigNumber;
        }>;
        totalHeaderUpdatesByDagGraph(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        totalSubmittedByDagGraphUser(arg0: string, arg1: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        verify(proof: ExistenceProofStruct, spec: ProofSpecStruct, root: BytesLike, key: BytesLike, value: BytesLike, overrides?: CallOverrides): Promise<[void]>;
        whitelistedDagGraph(arg0: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        getContractIdentifier(overrides?: CallOverrides): Promise<[string]>;
        verifyContractIdentifier(usernonce: BigNumberish, sender: string, hash: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        getNonce(overrides?: CallOverrides): Promise<[BigNumber]>;
        registerDagGraphTier(moniker: BytesLike, dagAddress: string, tier: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        updateRelayerHeader(moniker: BytesLike, rootHash: BytesLike, height: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setPaymentToken(tokenAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        addTier(id: BytesLike, tokenAddress: string, amount: BigNumberish, amountStaked: BigNumberish, includedBlocks: BigNumberish, setupFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setTierSettings(id: BytesLike, tokenAddress: string, amount: BigNumberish, amountStaked: BigNumberish, includedBlocks: BigNumberish, setupFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        withdraw(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        withdrawToken(payee: string, erc20token: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getProtocolHeader(moniker: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        getProof(did: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        hasProof(key: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        enrollL2Account(moniker: BytesLike, key: BytesLike, did: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        submitPacketWithProof(moniker: BytesLike, sender: string, userProof: ExistenceProofStruct, key: BytesLike, packet: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        verifyProofWithKV(moniker: BytesLike, key: BytesLike, value: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<[boolean]>;
    };
    INCLUDED_BLOCKS_EPOCH(overrides?: CallOverrides): Promise<BigNumber>;
    accountByAddrProofs(arg0: string, overrides?: CallOverrides): Promise<string>;
    accountProofs(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;
    dagGraphSubscriptions(arg0: string, overrides?: CallOverrides): Promise<[
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        token: string;
        amount: BigNumber;
        amountStaked: BigNumber;
        includedBlocks: BigNumber;
        id: string;
        incentiveBlocksMonthly: BigNumber;
        incentivePercentageMonthly: BigNumber;
        includedBlocksStarted: BigNumber;
        setupFee: BigNumber;
    }>;
    getIavlSpec(overrides?: CallOverrides): Promise<ProofSpecStructOutput>;
    latestRootHashTable(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;
    nonce(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    owner(overrides?: CallOverrides): Promise<string>;
    proofs(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    relayer(overrides?: CallOverrides): Promise<string>;
    relayerHashTable(arg0: BytesLike, arg1: BigNumberish, overrides?: CallOverrides): Promise<string>;
    seq(overrides?: CallOverrides): Promise<BigNumber>;
    stablecoin(overrides?: CallOverrides): Promise<string>;
    tiers(arg0: BytesLike, overrides?: CallOverrides): Promise<[
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        token: string;
        amount: BigNumber;
        amountStaked: BigNumber;
        includedBlocks: BigNumber;
        id: string;
        incentiveBlocksMonthly: BigNumber;
        incentivePercentageMonthly: BigNumber;
        includedBlocksStarted: BigNumber;
        setupFee: BigNumber;
    }>;
    totalHeaderUpdatesByDagGraph(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    totalSubmittedByDagGraphUser(arg0: string, arg1: string, overrides?: CallOverrides): Promise<BigNumber>;
    verify(proof: ExistenceProofStruct, spec: ProofSpecStruct, root: BytesLike, key: BytesLike, value: BytesLike, overrides?: CallOverrides): Promise<void>;
    whitelistedDagGraph(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;
    getContractIdentifier(overrides?: CallOverrides): Promise<string>;
    verifyContractIdentifier(usernonce: BigNumberish, sender: string, hash: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    getNonce(overrides?: CallOverrides): Promise<BigNumber>;
    registerDagGraphTier(moniker: BytesLike, dagAddress: string, tier: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    updateRelayerHeader(moniker: BytesLike, rootHash: BytesLike, height: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setPaymentToken(tokenAddress: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    addTier(id: BytesLike, tokenAddress: string, amount: BigNumberish, amountStaked: BigNumberish, includedBlocks: BigNumberish, setupFee: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setTierSettings(id: BytesLike, tokenAddress: string, amount: BigNumberish, amountStaked: BigNumberish, includedBlocks: BigNumberish, setupFee: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    withdraw(payee: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    withdrawToken(payee: string, erc20token: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getProtocolHeader(moniker: BytesLike, overrides?: CallOverrides): Promise<string>;
    getProof(did: BytesLike, overrides?: CallOverrides): Promise<string>;
    hasProof(key: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    enrollL2Account(moniker: BytesLike, key: BytesLike, did: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    submitPacketWithProof(moniker: BytesLike, sender: string, userProof: ExistenceProofStruct, key: BytesLike, packet: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    verifyProofWithKV(moniker: BytesLike, key: BytesLike, value: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        INCLUDED_BLOCKS_EPOCH(overrides?: CallOverrides): Promise<BigNumber>;
        accountByAddrProofs(arg0: string, overrides?: CallOverrides): Promise<string>;
        accountProofs(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;
        dagGraphSubscriptions(arg0: string, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            token: string;
            amount: BigNumber;
            amountStaked: BigNumber;
            includedBlocks: BigNumber;
            id: string;
            incentiveBlocksMonthly: BigNumber;
            incentivePercentageMonthly: BigNumber;
            includedBlocksStarted: BigNumber;
            setupFee: BigNumber;
        }>;
        getIavlSpec(overrides?: CallOverrides): Promise<ProofSpecStructOutput>;
        latestRootHashTable(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;
        nonce(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<string>;
        proofs(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        relayer(overrides?: CallOverrides): Promise<string>;
        relayerHashTable(arg0: BytesLike, arg1: BigNumberish, overrides?: CallOverrides): Promise<string>;
        seq(overrides?: CallOverrides): Promise<BigNumber>;
        stablecoin(overrides?: CallOverrides): Promise<string>;
        tiers(arg0: BytesLike, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            string,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            token: string;
            amount: BigNumber;
            amountStaked: BigNumber;
            includedBlocks: BigNumber;
            id: string;
            incentiveBlocksMonthly: BigNumber;
            incentivePercentageMonthly: BigNumber;
            includedBlocksStarted: BigNumber;
            setupFee: BigNumber;
        }>;
        totalHeaderUpdatesByDagGraph(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        totalSubmittedByDagGraphUser(arg0: string, arg1: string, overrides?: CallOverrides): Promise<BigNumber>;
        verify(proof: ExistenceProofStruct, spec: ProofSpecStruct, root: BytesLike, key: BytesLike, value: BytesLike, overrides?: CallOverrides): Promise<void>;
        whitelistedDagGraph(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;
        getContractIdentifier(overrides?: CallOverrides): Promise<string>;
        verifyContractIdentifier(usernonce: BigNumberish, sender: string, hash: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        getNonce(overrides?: CallOverrides): Promise<BigNumber>;
        registerDagGraphTier(moniker: BytesLike, dagAddress: string, tier: BytesLike, overrides?: CallOverrides): Promise<void>;
        updateRelayerHeader(moniker: BytesLike, rootHash: BytesLike, height: BigNumberish, overrides?: CallOverrides): Promise<void>;
        setPaymentToken(tokenAddress: string, overrides?: CallOverrides): Promise<void>;
        addTier(id: BytesLike, tokenAddress: string, amount: BigNumberish, amountStaked: BigNumberish, includedBlocks: BigNumberish, setupFee: BigNumberish, overrides?: CallOverrides): Promise<void>;
        setTierSettings(id: BytesLike, tokenAddress: string, amount: BigNumberish, amountStaked: BigNumberish, includedBlocks: BigNumberish, setupFee: BigNumberish, overrides?: CallOverrides): Promise<void>;
        withdraw(payee: string, overrides?: CallOverrides): Promise<void>;
        withdrawToken(payee: string, erc20token: string, overrides?: CallOverrides): Promise<void>;
        getProtocolHeader(moniker: BytesLike, overrides?: CallOverrides): Promise<string>;
        getProof(did: BytesLike, overrides?: CallOverrides): Promise<string>;
        hasProof(key: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        enrollL2Account(moniker: BytesLike, key: BytesLike, did: BytesLike, proof: ExistenceProofStruct, overrides?: CallOverrides): Promise<boolean>;
        submitPacketWithProof(moniker: BytesLike, sender: string, userProof: ExistenceProofStruct, key: BytesLike, packet: BytesLike, proof: ExistenceProofStruct, overrides?: CallOverrides): Promise<boolean>;
        verifyProofWithKV(moniker: BytesLike, key: BytesLike, value: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AccountRegistered(bool,bytes,bytes,bytes32)"(enrolledStatus?: null, key?: null, value?: null, moniker?: null): AccountRegisteredEventFilter;
        AccountRegistered(enrolledStatus?: null, key?: null, value?: null, moniker?: null): AccountRegisteredEventFilter;
        "HeaderUpdated(bytes32)"(moniker?: BytesLike | null): HeaderUpdatedEventFilter;
        HeaderUpdated(moniker?: BytesLike | null): HeaderUpdatedEventFilter;
        "ProofPacketSubmitted(bytes,bytes,bytes32)"(key?: BytesLike | null, packet?: null, moniker?: null): ProofPacketSubmittedEventFilter;
        ProofPacketSubmitted(key?: BytesLike | null, packet?: null, moniker?: null): ProofPacketSubmittedEventFilter;
        "ServiceFeePaid(address,bytes32,bytes32,address,uint256)"(from?: string | null, tier?: BytesLike | null, moniker?: BytesLike | null, token?: null, fee?: null): ServiceFeePaidEventFilter;
        ServiceFeePaid(from?: string | null, tier?: BytesLike | null, moniker?: BytesLike | null, token?: null, fee?: null): ServiceFeePaidEventFilter;
        "TierAdded(bytes32)"(id?: BytesLike | null): TierAddedEventFilter;
        TierAdded(id?: BytesLike | null): TierAddedEventFilter;
        "TierUpdated(bytes32,address,uint256,uint256,uint256)"(id?: BytesLike | null, token?: null, fee?: null, staked?: null, includedBlocks?: null): TierUpdatedEventFilter;
        TierUpdated(id?: BytesLike | null, token?: null, fee?: null, staked?: null, includedBlocks?: null): TierUpdatedEventFilter;
        "Withdrawn(address,uint256)"(paymentAddress?: string | null, amount?: null): WithdrawnEventFilter;
        Withdrawn(paymentAddress?: string | null, amount?: null): WithdrawnEventFilter;
    };
    estimateGas: {
        INCLUDED_BLOCKS_EPOCH(overrides?: CallOverrides): Promise<BigNumber>;
        accountByAddrProofs(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        accountProofs(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        dagGraphSubscriptions(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        getIavlSpec(overrides?: CallOverrides): Promise<BigNumber>;
        latestRootHashTable(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        nonce(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        proofs(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        relayer(overrides?: CallOverrides): Promise<BigNumber>;
        relayerHashTable(arg0: BytesLike, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        seq(overrides?: CallOverrides): Promise<BigNumber>;
        stablecoin(overrides?: CallOverrides): Promise<BigNumber>;
        tiers(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        totalHeaderUpdatesByDagGraph(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        totalSubmittedByDagGraphUser(arg0: string, arg1: string, overrides?: CallOverrides): Promise<BigNumber>;
        verify(proof: ExistenceProofStruct, spec: ProofSpecStruct, root: BytesLike, key: BytesLike, value: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        whitelistedDagGraph(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getContractIdentifier(overrides?: CallOverrides): Promise<BigNumber>;
        verifyContractIdentifier(usernonce: BigNumberish, sender: string, hash: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getNonce(overrides?: CallOverrides): Promise<BigNumber>;
        registerDagGraphTier(moniker: BytesLike, dagAddress: string, tier: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        updateRelayerHeader(moniker: BytesLike, rootHash: BytesLike, height: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setPaymentToken(tokenAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        addTier(id: BytesLike, tokenAddress: string, amount: BigNumberish, amountStaked: BigNumberish, includedBlocks: BigNumberish, setupFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setTierSettings(id: BytesLike, tokenAddress: string, amount: BigNumberish, amountStaked: BigNumberish, includedBlocks: BigNumberish, setupFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        withdraw(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        withdrawToken(payee: string, erc20token: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getProtocolHeader(moniker: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getProof(did: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        hasProof(key: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        enrollL2Account(moniker: BytesLike, key: BytesLike, did: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        submitPacketWithProof(moniker: BytesLike, sender: string, userProof: ExistenceProofStruct, key: BytesLike, packet: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        verifyProofWithKV(moniker: BytesLike, key: BytesLike, value: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        INCLUDED_BLOCKS_EPOCH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        accountByAddrProofs(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        accountProofs(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        dagGraphSubscriptions(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getIavlSpec(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        latestRootHashTable(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonce(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proofs(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        relayer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        relayerHashTable(arg0: BytesLike, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        seq(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        stablecoin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tiers(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalHeaderUpdatesByDagGraph(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSubmittedByDagGraphUser(arg0: string, arg1: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verify(proof: ExistenceProofStruct, spec: ProofSpecStruct, root: BytesLike, key: BytesLike, value: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        whitelistedDagGraph(arg0: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getContractIdentifier(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        verifyContractIdentifier(usernonce: BigNumberish, sender: string, hash: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getNonce(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registerDagGraphTier(moniker: BytesLike, dagAddress: string, tier: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        updateRelayerHeader(moniker: BytesLike, rootHash: BytesLike, height: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setPaymentToken(tokenAddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        addTier(id: BytesLike, tokenAddress: string, amount: BigNumberish, amountStaked: BigNumberish, includedBlocks: BigNumberish, setupFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setTierSettings(id: BytesLike, tokenAddress: string, amount: BigNumberish, amountStaked: BigNumberish, includedBlocks: BigNumberish, setupFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        withdraw(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        withdrawToken(payee: string, erc20token: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getProtocolHeader(moniker: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getProof(did: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasProof(key: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        enrollL2Account(moniker: BytesLike, key: BytesLike, did: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        submitPacketWithProof(moniker: BytesLike, sender: string, userProof: ExistenceProofStruct, key: BytesLike, packet: BytesLike, proof: ExistenceProofStruct, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        verifyProofWithKV(moniker: BytesLike, key: BytesLike, value: BytesLike, exProof: ExistenceProofStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
