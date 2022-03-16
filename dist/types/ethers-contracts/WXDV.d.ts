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
export interface WXDVInterface extends utils.Interface {
    functions: {
        "ENROLL_NFT()": FunctionFragment;
        "NFTRegistrationFee()": FunctionFragment;
        "TOKEN_AVAILABLE()": FunctionFragment;
        "TOKEN_BURNED()": FunctionFragment;
        "TOKEN_LOCKED()": FunctionFragment;
        "anconprotocol()": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "burn(uint256)": FunctionFragment;
        "dagContractOperator()": FunctionFragment;
        "getApproved(uint256)": FunctionFragment;
        "getSigner()": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "name()": FunctionFragment;
        "owner()": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "paused()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "safeTransferFrom(address,address,uint256)": FunctionFragment;
        "serviceFeeForContract()": FunctionFragment;
        "serviceFeeForPaymentAddress()": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "setSigner(address)": FunctionFragment;
        "setUrl(string)": FunctionFragment;
        "stablecoin()": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "symbol()": FunctionFragment;
        "tokenLockStorage(address,uint256)": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "url()": FunctionFragment;
        "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
        "mint(address,uint256)": FunctionFragment;
        "submitMintWithProof(address,uint256,bytes32,bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),bytes32)": FunctionFragment;
        "enrollNFT(address)": FunctionFragment;
        "deactivateNFT(address)": FunctionFragment;
        "lockWithProof(address,bytes32,bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),bytes32)": FunctionFragment;
        "releaseWithProof(address,bytes32,bytes,bytes,(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),(bool,bytes,bytes,(bool,uint8,uint8,uint8,uint8,bytes),(bool,uint8,bytes,bytes)[]),bytes32)": FunctionFragment;
        "tokenURI(uint256)": FunctionFragment;
        "withdrawBalance(address)": FunctionFragment;
        "withdraw(address)": FunctionFragment;
        "islocked(uint256,address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "ENROLL_NFT", values?: undefined): string;
    encodeFunctionData(functionFragment: "NFTRegistrationFee", values?: undefined): string;
    encodeFunctionData(functionFragment: "TOKEN_AVAILABLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "TOKEN_BURNED", values?: undefined): string;
    encodeFunctionData(functionFragment: "TOKEN_LOCKED", values?: undefined): string;
    encodeFunctionData(functionFragment: "anconprotocol", values?: undefined): string;
    encodeFunctionData(functionFragment: "approve", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
    encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "dagContractOperator", values?: undefined): string;
    encodeFunctionData(functionFragment: "getApproved", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getSigner", values?: undefined): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [string, string]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeTransferFrom", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "serviceFeeForContract", values?: undefined): string;
    encodeFunctionData(functionFragment: "serviceFeeForPaymentAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [string, boolean]): string;
    encodeFunctionData(functionFragment: "setSigner", values: [string]): string;
    encodeFunctionData(functionFragment: "setUrl", values: [string]): string;
    encodeFunctionData(functionFragment: "stablecoin", values?: undefined): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenLockStorage", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    encodeFunctionData(functionFragment: "url", values?: undefined): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [string, string, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "mint", values: [string, BigNumberish]): string;
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
    encodeFunctionData(functionFragment: "enrollNFT", values: [string]): string;
    encodeFunctionData(functionFragment: "deactivateNFT", values: [string]): string;
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
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "withdrawBalance", values: [string]): string;
    encodeFunctionData(functionFragment: "withdraw", values: [string]): string;
    encodeFunctionData(functionFragment: "islocked", values: [BigNumberish, string]): string;
    decodeFunctionResult(functionFragment: "ENROLL_NFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "NFTRegistrationFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "TOKEN_AVAILABLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "TOKEN_BURNED", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "TOKEN_LOCKED", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "anconprotocol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "dagContractOperator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getSigner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serviceFeeForContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "serviceFeeForPaymentAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSigner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUrl", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stablecoin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenLockStorage", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "url", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC721Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitMintWithProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "enrollNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deactivateNFT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lockWithProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "releaseWithProof", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "islocked", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalForAll(address,address,bool)": EventFragment;
        "Locked(address,uint256)": EventFragment;
        "NFTEnrolled(bool,address)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "Paused(address)": EventFragment;
        "ProofAccepted(address,bytes32)": EventFragment;
        "Released(address,uint256)": EventFragment;
        "ServiceFeePaid(address,uint256)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
        "Unpaused(address)": EventFragment;
        "Withdrawn(address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Locked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "NFTEnrolled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProofAccepted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Released"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ServiceFeePaid"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Withdrawn"): EventFragment;
}
export declare type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], {
    owner: string;
    approved: string;
    tokenId: BigNumber;
}>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export declare type ApprovalForAllEvent = TypedEvent<[
    string,
    string,
    boolean
], {
    owner: string;
    operator: string;
    approved: boolean;
}>;
export declare type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;
export declare type LockedEvent = TypedEvent<[
    string,
    BigNumber
], {
    nftContractAddress: string;
    id: BigNumber;
}>;
export declare type LockedEventFilter = TypedEventFilter<LockedEvent>;
export declare type NFTEnrolledEvent = TypedEvent<[
    boolean,
    string
], {
    enrolledStatus: boolean;
    NFTaddress: string;
}>;
export declare type NFTEnrolledEventFilter = TypedEventFilter<NFTEnrolledEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export declare type PausedEvent = TypedEvent<[string], {
    account: string;
}>;
export declare type PausedEventFilter = TypedEventFilter<PausedEvent>;
export declare type ProofAcceptedEvent = TypedEvent<[
    string,
    string
], {
    sender: string;
    signatureHash: string;
}>;
export declare type ProofAcceptedEventFilter = TypedEventFilter<ProofAcceptedEvent>;
export declare type ReleasedEvent = TypedEvent<[
    string,
    BigNumber
], {
    sender: string;
    id: BigNumber;
}>;
export declare type ReleasedEventFilter = TypedEventFilter<ReleasedEvent>;
export declare type ServiceFeePaidEvent = TypedEvent<[
    string,
    BigNumber
], {
    from: string;
    fee: BigNumber;
}>;
export declare type ServiceFeePaidEventFilter = TypedEventFilter<ServiceFeePaidEvent>;
export declare type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], {
    from: string;
    to: string;
    tokenId: BigNumber;
}>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export declare type UnpausedEvent = TypedEvent<[string], {
    account: string;
}>;
export declare type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;
export declare type WithdrawnEvent = TypedEvent<[
    string,
    BigNumber
], {
    paymentAddress: string;
    amount: BigNumber;
}>;
export declare type WithdrawnEventFilter = TypedEventFilter<WithdrawnEvent>;
export interface WXDV extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: WXDVInterface;
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
        ENROLL_NFT(overrides?: CallOverrides): Promise<[string]>;
        NFTRegistrationFee(overrides?: CallOverrides): Promise<[BigNumber]>;
        TOKEN_AVAILABLE(overrides?: CallOverrides): Promise<[string]>;
        TOKEN_BURNED(overrides?: CallOverrides): Promise<[string]>;
        TOKEN_LOCKED(overrides?: CallOverrides): Promise<[string]>;
        anconprotocol(overrides?: CallOverrides): Promise<[string]>;
        approve(to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        burn(tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        dagContractOperator(overrides?: CallOverrides): Promise<[string]>;
        getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        getSigner(overrides?: CallOverrides): Promise<[string]>;
        isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<[boolean]>;
        name(overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        paused(overrides?: CallOverrides): Promise<[boolean]>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: string, to: string, tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        serviceFeeForContract(overrides?: CallOverrides): Promise<[BigNumber]>;
        serviceFeeForPaymentAddress(overrides?: CallOverrides): Promise<[BigNumber]>;
        setApprovalForAll(operator: string, approved: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setSigner(signer_: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setUrl(url_: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        stablecoin(overrides?: CallOverrides): Promise<[string]>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        tokenLockStorage(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        url(overrides?: CallOverrides): Promise<[string]>;
        onERC721Received(operator: string, from: string, tokenId: BigNumberish, data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        mint(toAddress: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        submitMintWithProof(sender: string, newItemId: BigNumberish, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        enrollNFT(NFTaddress: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        deactivateNFT(NFTaddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        lockWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        releaseWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        withdrawBalance(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        withdraw(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        islocked(tokenId: BigNumberish, sender: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    ENROLL_NFT(overrides?: CallOverrides): Promise<string>;
    NFTRegistrationFee(overrides?: CallOverrides): Promise<BigNumber>;
    TOKEN_AVAILABLE(overrides?: CallOverrides): Promise<string>;
    TOKEN_BURNED(overrides?: CallOverrides): Promise<string>;
    TOKEN_LOCKED(overrides?: CallOverrides): Promise<string>;
    anconprotocol(overrides?: CallOverrides): Promise<string>;
    approve(to: string, tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
    burn(tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    dagContractOperator(overrides?: CallOverrides): Promise<string>;
    getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    getSigner(overrides?: CallOverrides): Promise<string>;
    isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<boolean>;
    name(overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    renounceOwnership(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256)"(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256,bytes)"(from: string, to: string, tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    serviceFeeForContract(overrides?: CallOverrides): Promise<BigNumber>;
    serviceFeeForPaymentAddress(overrides?: CallOverrides): Promise<BigNumber>;
    setApprovalForAll(operator: string, approved: boolean, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setSigner(signer_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setUrl(url_: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    stablecoin(overrides?: CallOverrides): Promise<string>;
    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    symbol(overrides?: CallOverrides): Promise<string>;
    tokenLockStorage(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<string>;
    transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    url(overrides?: CallOverrides): Promise<string>;
    onERC721Received(operator: string, from: string, tokenId: BigNumberish, data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    mint(toAddress: string, tokenId: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    submitMintWithProof(sender: string, newItemId: BigNumberish, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    enrollNFT(NFTaddress: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    deactivateNFT(NFTaddress: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    lockWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    releaseWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    withdrawBalance(payee: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    withdraw(payee: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    islocked(tokenId: BigNumberish, sender: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        ENROLL_NFT(overrides?: CallOverrides): Promise<string>;
        NFTRegistrationFee(overrides?: CallOverrides): Promise<BigNumber>;
        TOKEN_AVAILABLE(overrides?: CallOverrides): Promise<string>;
        TOKEN_BURNED(overrides?: CallOverrides): Promise<string>;
        TOKEN_LOCKED(overrides?: CallOverrides): Promise<string>;
        anconprotocol(overrides?: CallOverrides): Promise<string>;
        approve(to: string, tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
        burn(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        dagContractOperator(overrides?: CallOverrides): Promise<string>;
        getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
        getSigner(overrides?: CallOverrides): Promise<string>;
        isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<boolean>;
        name(overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
        paused(overrides?: CallOverrides): Promise<boolean>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256)"(from: string, to: string, tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: string, to: string, tokenId: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<void>;
        serviceFeeForContract(overrides?: CallOverrides): Promise<BigNumber>;
        serviceFeeForPaymentAddress(overrides?: CallOverrides): Promise<BigNumber>;
        setApprovalForAll(operator: string, approved: boolean, overrides?: CallOverrides): Promise<void>;
        setSigner(signer_: string, overrides?: CallOverrides): Promise<void>;
        setUrl(url_: string, overrides?: CallOverrides): Promise<void>;
        stablecoin(overrides?: CallOverrides): Promise<string>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        symbol(overrides?: CallOverrides): Promise<string>;
        tokenLockStorage(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<string>;
        transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
        url(overrides?: CallOverrides): Promise<string>;
        onERC721Received(operator: string, from: string, tokenId: BigNumberish, data: BytesLike, overrides?: CallOverrides): Promise<string>;
        mint(toAddress: string, tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
        submitMintWithProof(sender: string, newItemId: BigNumberish, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        enrollNFT(NFTaddress: string, overrides?: CallOverrides): Promise<boolean>;
        deactivateNFT(NFTaddress: string, overrides?: CallOverrides): Promise<boolean>;
        lockWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        releaseWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
        withdrawBalance(payee: string, overrides?: CallOverrides): Promise<void>;
        withdraw(payee: string, overrides?: CallOverrides): Promise<void>;
        islocked(tokenId: BigNumberish, sender: string, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: string | null, approved?: string | null, tokenId?: BigNumberish | null): ApprovalEventFilter;
        Approval(owner?: string | null, approved?: string | null, tokenId?: BigNumberish | null): ApprovalEventFilter;
        "ApprovalForAll(address,address,bool)"(owner?: string | null, operator?: string | null, approved?: null): ApprovalForAllEventFilter;
        ApprovalForAll(owner?: string | null, operator?: string | null, approved?: null): ApprovalForAllEventFilter;
        "Locked(address,uint256)"(nftContractAddress?: null, id?: BigNumberish | null): LockedEventFilter;
        Locked(nftContractAddress?: null, id?: BigNumberish | null): LockedEventFilter;
        "NFTEnrolled(bool,address)"(enrolledStatus?: null, NFTaddress?: null): NFTEnrolledEventFilter;
        NFTEnrolled(enrolledStatus?: null, NFTaddress?: null): NFTEnrolledEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        "Paused(address)"(account?: null): PausedEventFilter;
        Paused(account?: null): PausedEventFilter;
        "ProofAccepted(address,bytes32)"(sender?: null, signatureHash?: null): ProofAcceptedEventFilter;
        ProofAccepted(sender?: null, signatureHash?: null): ProofAcceptedEventFilter;
        "Released(address,uint256)"(sender?: null, id?: BigNumberish | null): ReleasedEventFilter;
        Released(sender?: null, id?: BigNumberish | null): ReleasedEventFilter;
        "ServiceFeePaid(address,uint256)"(from?: string | null, fee?: null): ServiceFeePaidEventFilter;
        ServiceFeePaid(from?: string | null, fee?: null): ServiceFeePaidEventFilter;
        "Transfer(address,address,uint256)"(from?: string | null, to?: string | null, tokenId?: BigNumberish | null): TransferEventFilter;
        Transfer(from?: string | null, to?: string | null, tokenId?: BigNumberish | null): TransferEventFilter;
        "Unpaused(address)"(account?: null): UnpausedEventFilter;
        Unpaused(account?: null): UnpausedEventFilter;
        "Withdrawn(address,uint256)"(paymentAddress?: string | null, amount?: null): WithdrawnEventFilter;
        Withdrawn(paymentAddress?: string | null, amount?: null): WithdrawnEventFilter;
    };
    estimateGas: {
        ENROLL_NFT(overrides?: CallOverrides): Promise<BigNumber>;
        NFTRegistrationFee(overrides?: CallOverrides): Promise<BigNumber>;
        TOKEN_AVAILABLE(overrides?: CallOverrides): Promise<BigNumber>;
        TOKEN_BURNED(overrides?: CallOverrides): Promise<BigNumber>;
        TOKEN_LOCKED(overrides?: CallOverrides): Promise<BigNumber>;
        anconprotocol(overrides?: CallOverrides): Promise<BigNumber>;
        approve(to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;
        burn(tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        dagContractOperator(overrides?: CallOverrides): Promise<BigNumber>;
        getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getSigner(overrides?: CallOverrides): Promise<BigNumber>;
        isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        paused(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256)"(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: string, to: string, tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        serviceFeeForContract(overrides?: CallOverrides): Promise<BigNumber>;
        serviceFeeForPaymentAddress(overrides?: CallOverrides): Promise<BigNumber>;
        setApprovalForAll(operator: string, approved: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setSigner(signer_: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setUrl(url_: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        stablecoin(overrides?: CallOverrides): Promise<BigNumber>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        tokenLockStorage(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        url(overrides?: CallOverrides): Promise<BigNumber>;
        onERC721Received(operator: string, from: string, tokenId: BigNumberish, data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        mint(toAddress: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        submitMintWithProof(sender: string, newItemId: BigNumberish, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        enrollNFT(NFTaddress: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        deactivateNFT(NFTaddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        lockWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        releaseWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        withdrawBalance(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        withdraw(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        islocked(tokenId: BigNumberish, sender: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        ENROLL_NFT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        NFTRegistrationFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        TOKEN_AVAILABLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        TOKEN_BURNED(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        TOKEN_LOCKED(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        anconprotocol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(owner: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        burn(tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        dagContractOperator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getApproved(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getSigner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isApprovedForAll(owner: string, operator: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: string, to: string, tokenId: BigNumberish, _data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        serviceFeeForContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        serviceFeeForPaymentAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setApprovalForAll(operator: string, approved: boolean, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setSigner(signer_: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setUrl(url_: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        stablecoin(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenLockStorage(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferFrom(from: string, to: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        url(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC721Received(operator: string, from: string, tokenId: BigNumberish, data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        mint(toAddress: string, tokenId: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        submitMintWithProof(sender: string, newItemId: BigNumberish, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        enrollNFT(NFTaddress: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        deactivateNFT(NFTaddress: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        lockWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        releaseWithProof(sender: string, moniker: BytesLike, key: BytesLike, packet: BytesLike, userProof: ExistenceProofStruct, proof: ExistenceProofStruct, hash: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        withdrawBalance(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        withdraw(payee: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        islocked(tokenId: BigNumberish, sender: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}