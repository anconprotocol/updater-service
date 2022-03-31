import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import helper from './helper';
import fetch from 'node-fetch';
import { ethers } from 'ethers';
import AnconProtocol from './AnconProtocol';
import { argv } from 'process';

const instanceWeb3WithAccount = (_url: string, pk: string) => {
  const web3 = new Web3(_url);
  const web3Account = web3.eth.accounts.privateKeyToAccount(pk);
  web3.eth.accounts.wallet.add(web3Account);
  return web3;
};

let anconEndpoint: string;
let pk: string;
let url: string;
let web3: Web3;
let Ancon: AnconProtocol;
let ethWeb3Prov: ethers.providers.Web3Provider;
let wallet: ethers.Wallet;
let firstTimeTopic: boolean;
// let dagChainReduxHandler: DAGChainReduxHandler;
let uuidIndexTopicName: string;

async function main() {
  const conf = new ConfigService();

  const args = [];
  argv.forEach((val, index) => {
    args.push(val);
  });

  anconEndpoint = conf.get('ANCON_URL');
  pk = conf.get(`DAG_STORE_KEY`);
  url = conf.get('BSC_TESTNET');
  uuidIndexTopicName = conf.get('REACT_APP_ANCON_UUID_Index_Topic_Name');

  web3 = instanceWeb3WithAccount(url, pk.split('0x')[1]);

  ethWeb3Prov = new ethers.providers.Web3Provider(web3.currentProvider as any);

  wallet = new ethers.Wallet(Web3.utils.hexToBytes(pk), ethWeb3Prov);

  const { AnconNFTContract, MarketPlaceContract } = helper.getContracts(
    wallet,
    web3,
  );

  // this.AnconNFTContract = AnconNFTContract;
  // this.MarketPlaceContract = MarketPlaceContract;

  Ancon = new AnconProtocol(ethWeb3Prov, wallet.address, anconEndpoint);

  // dagChainReduxHandler = new DAGChainReduxHandler(
  //   rules,
  //   wallet.address,
  //   anconEndpoint,
  // );

  Ancon.initialize();

  const currentBlock = await web3.eth.getBlockNumber();

  const uuid = `${args[2]}`;

  // const tokenTopicRes = await fetch(
  //   `${anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${wallet.address}`,
  // );

  // const tokenTopicResJson = await tokenTopicRes.json();
  // console.log(tokenTopicResJson.content);

  const indexTopicRes = await fetch(
    `${anconEndpoint}v0/topics?topic=${uuidIndexTopicName}&from=${wallet.address}`,
  );

  const indexTopicJson = await indexTopicRes.json();

  console.log('[Selected token UUID]: ', uuid);

  const lookupTokenMetadata = indexTopicJson.content[uuid];

  // lookupTokenMetadata.push({ offensiveContent: true });
  console.log(lookupTokenMetadata);
}

main();
