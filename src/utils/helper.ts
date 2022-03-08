/* eslint-disable @typescript-eslint/no-var-requires */
import Web3 from 'web3';
import { ethers } from 'ethers';
const AnconNFT = require('../contracts/AnconNFT.sol/AnconNFT.json');
const NFTEX = require('../contracts/NFTEX.sol/NFTEX.json');

class helper {
  static getContracts(_wallet: ethers.Wallet, _web3: Web3) {
    const wallet = _wallet;
    const web3 = _web3;
    web3.eth.defaultAccount = wallet.address;
    const anconNFTContractAddress = process.env.REACT_APP_AnconTestNFTAddress;
    const _anconNFTContract = new web3.eth.Contract(
      AnconNFT.abi,
      anconNFTContractAddress,
    );
    const marketPlaceContractAddress = process.env.REACT_APP_MarketplaceAddress;
    const _marketPlaceContract = new web3.eth.Contract(
      NFTEX.abi,
      marketPlaceContractAddress,
    );

    return {
      AnconNFTContract: _anconNFTContract,
      MarketPlaceContract: _marketPlaceContract,
    };
  }
  static async getOrderBlockNumber(contracts, tokenId) {
    const lastBlock = await contracts.web3.eth.getBlockNumber();
    let response = 0;
    for (let i = 0; i < lastBlock / 5000; i++) {
      const sub = i * 4999;
      const events = await contracts.MarketPlaceContract.getPastEvents(
        'MakeOrder',
        {
          toBlock: lastBlock - sub,
          fromBlock: lastBlock - sub - 4999,
          filter: {
            token: process.env.REACT_APP_AnconTestNFTAddress,
          },
        },
      );
      if (events.length > 0) {
        for (const e of events) {
          if (e.returnValues.id.toString() == tokenId) {
            const owner = await contracts.AnconNFTContract.methods
              .ownerOf(e.returnValues.id)
              .call();
            console.log('owner', owner, 'hash', e.returnValues.hash);
            if (owner == process.env.REACT_APP_MarketplaceAddress) {
              response = e.blockNumber;
              i = lastBlock / 5000 + 1;
              break;
            }
          }
        }
      }
    }
    return response;
  }
  static toHumanDate(_timestamp) {
    const d = new Date(0);
    d.setUTCSeconds(_timestamp);
    return d.toDateString();
  }
}
export default helper;
