import Web3 from 'web3';
import { ethers } from 'ethers';
declare class helper {
    static getContracts(_wallet: ethers.Wallet, _web3: Web3): {
        AnconNFTContract: import("web3-eth-contract").Contract;
        MarketPlaceContract: import("web3-eth-contract").Contract;
    };
    static getOrderBlockNumber(contracts: any, tokenId: any): Promise<number>;
    static toHumanDate(_timestamp: any): string;
}
export default helper;
