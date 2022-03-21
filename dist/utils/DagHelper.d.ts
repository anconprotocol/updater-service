import { ethers } from 'ethers';
import AnconProtocol from './AnconProtocol';
export declare const anconPostMetadata: (_address: any, _uuid: string, _web3Prov: ethers.providers.Web3Provider, Ancon: AnconProtocol, _wallet: ethers.Wallet, payload: any) => Promise<any>;
export declare const anconUpdateMintMetadata: (_address: any, _uuid: string, _web3Prov: ethers.providers.Web3Provider, Ancon: AnconProtocol, _wallet: ethers.Wallet, oldPayload: any, _blockchainTxHash: string, _blockchainTokenId: string, _mintBlockNumber: number) => Promise<any>;
export declare const anconUpdateMetadataMakeOrder: (_address: any, _uuid: string, _web3Prov: ethers.providers.Web3Provider, Ancon: AnconProtocol, _wallet: ethers.Wallet, oldPayload: any, _blockchainMakeOrderTxHash: string, _currentOrderHash: string, _makeOrderBlockNumber: number, _price: number, _timestamp: number) => Promise<any>;
export declare const anconUpdateMetadataCancelOrder: (_address: any, _uuid: string, _web3Prov: ethers.providers.Web3Provider, Ancon: AnconProtocol, _wallet: ethers.Wallet, oldPayload: any) => Promise<any>;
export declare const anconUpdateMetadataClaim: (_address: any, _uuid: string, _web3Prov: ethers.providers.Web3Provider, Ancon: AnconProtocol, _wallet: ethers.Wallet, oldPayload: any, _buyerAddress: string) => Promise<any>;
