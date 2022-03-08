import { ethers } from 'ethers';
import {
  arrayify,
  base64,
  formatBytes32String,
  hexlify,
  keccak256,
  toUtf8Bytes,
} from 'ethers/lib/utils';
import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';
import helper from '../src/utils/helper';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const main = async () => {
  const conf = new ConfigService();

  const anconUrl = conf.get('ANCON_URL_TENSTA');

  const moniker = keccak256(toUtf8Bytes(conf.get(`DAG_STORE_MONIKER`)));
  const url = conf.get('BSC_TESTNET');
  const provider = new ethers.providers.JsonRpcProvider(url);
  const pk = conf.get(`DAG_STORE_KEY`);
  const signer = new ethers.Wallet(Web3.utils.hexToBytes(pk));
  const web3 = new Web3(signer.provider as any);

  // console.log('[WEB 3]', web3);

  // let nftContract, marketContract;
  const { AnconNFTContract, MarketPlaceContract } = helper.getContracts(
    signer,
    web3,
  );

  console.log('[NFT contract events]', AnconNFTContract.events);
  console.log('[NFTEX contract events]', MarketPlaceContract.events);
};

main().then();
