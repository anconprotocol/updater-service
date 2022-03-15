import { ethers } from 'ethers';
import Web3 from 'web3';
export default class AnconProtocol {
    prov: ethers.providers.Web3Provider;
    network: ethers.providers.Network | any;
    signer: ethers.providers.JsonRpcSigner;
    postProofCid: string;
    address: string;
    provider: ethers.providers.Web3Provider;
    anconAddress: string;
    xdvnftAdress: string;
    provWeb3: Web3;
    moniker: string;
    anconEndpoint: string;
    constructor(provider: ethers.providers.Web3Provider, address: string, anconEndpoint: string);
    initialize(): Promise<void>;
    getNetwork(): Promise<any>;
    getDidTransaction(): Promise<any>;
    signMessage(): Promise<any>;
    toAbiProof(proof: any): any;
    getPubKey(transactionHash: string): Promise<any[]>;
    postProof(proofEndpoint: string, requestOptions: any, enrolling?: boolean): Promise<any>;
    getProof(key: string, height: string): Promise<any>;
    fetchDag(id: string): Promise<{
        cid: string;
        proofKey: string;
        proofHeight: string;
    }>;
    getDomainName(): Promise<{
        has: boolean;
        name: string;
    }>;
    getMetadata(cid: string, address: string): Promise<any>;
}
export declare function sleep(ms: any): Promise<unknown>;
