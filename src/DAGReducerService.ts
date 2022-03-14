import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { AnconProtocol__factory } from './types/ethers-contracts/factories/AnconProtocol__factory';
import { BigNumber, ethers, providers } from 'ethers';
import Web3 from 'web3';
import {
  arrayify,
  base64,
  formatBytes32String,
  hexlify,
  keccak256,
  toUtf8Bytes,
} from 'ethers/lib/utils';
import { DAGChainReduxHandler } from './redux';
import { ConfigService } from '@nestjs/config';
import helper from './utils/helper';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const rules = {
  AddMintInfo: [
    {
      name: 'concatTransactionHash',
      condition: `returnValues.creator != null`,
      expression: `assign(dag, append(newData.uuid, newData))`,
      blockFetchCondition: 'returnValues.uri != null',
      blockFetchAddress: 'returnValues.creator',
      topicName: '@mintIndex',
    },
  ],
};

const anconPostMetadata = async (
  _address,
  _uuid: string,
  _web3Prov: ethers.providers.Web3Provider,
  Ancon: AnconProtocol,
  _wallet: ethers.Wallet,
  payload: any,
) => {
  //user Ancon ethers instance
  const network = await _web3Prov.getNetwork();

  const domainNameResponse = `did:ethr:${network.name}:${_address}`;

  console.log(
    'Requesting Ancon metadata creation, awaiting payload signing...',
  );

  // sign the message
  //Current error in signature
  const signature = await _wallet.signMessage(
    ethers.utils.arrayify(ethers.utils.toUtf8Bytes(JSON.stringify(payload))),
  );

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: '/',
      from: domainNameResponse,
      signature,
      data: payload,
      topic: `@mintIndex`,
    }),
  };

  // UPLOADING the metadata
  const PostRequest = async () => {
    console.log(
      'Requesting Ancon metadata creation, posting Ancon metadata...',
    );

    const metadataPost = await Ancon.postProof('dagjson', requestOptions);

    // // returns the metadata cid
    console.log('metadata', metadataPost);
    const id = await metadataPost.proofCid;

    return metadataPost;
  };

  return await PostRequest();
};

const instanceWeb3WithAccount = (_url: string, pk: string) => {
  const web3 = new Web3(_url);
  const web3Account = web3.eth.accounts.privateKeyToAccount(pk);
  web3.eth.accounts.wallet.add(web3Account);
  return web3;
};

@Injectable()
export class DAGReducerService {
  private readonly logger = new Logger(DAGReducerService.name);
  private AnconNFTContract;
  private anconEndpoint;
  private pk;
  private url;
  private web3;
  private Ancon;
  private ethWeb3Prov;
  private wallet;
  private MarketPlaceContract;
  private firstTimeTopic;

  constructor() {
    const conf = new ConfigService();

    this.anconEndpoint = conf.get('ANCON_URL_TENSTA');
    this.pk = conf.get(`DAG_STORE_KEY`);
    this.url = conf.get('BSC_TESTNET');

    this.web3 = instanceWeb3WithAccount(this.url, this.pk.split('0x')[1]);

    this.ethWeb3Prov = new ethers.providers.Web3Provider(
      this.web3.currentProvider as any,
    );

    this.wallet = new ethers.Wallet(
      Web3.utils.hexToBytes(this.pk),
      this.ethWeb3Prov,
    );

    const { AnconNFTContract, MarketPlaceContract } = helper.getContracts(
      this.wallet,
      this.web3,
    );

    this.AnconNFTContract = AnconNFTContract;
    this.MarketPlaceContract = MarketPlaceContract;

    console.log('[Instance ANCON]');
    this.Ancon = new AnconProtocol(
      this.ethWeb3Prov,
      this.wallet.address,
      this.anconEndpoint,
    );

    const dagChainReduxHandler = new DAGChainReduxHandler(
      rules,
      this.wallet.address,
      this.anconEndpoint,
    );

    // await this.Ancon.initialize();

    // const indexTopicRes = await fetch(
    //   `${this.anconEndpoint}v0/topics?topic=${rules.AddMintInfo[0].topicName}&from=${this.wallet.address}`,
    // );
    // this.firstTimeTopic = true;

    // if (indexTopicRes.status == 200) {
    //   this.firstTimeTopic = false;
    // }
    // console.log('[First Time Topic is]', this.firstTimeTopic, '\n');
  }

  @Cron(process.env.REDUCER_INTERVAL)
  async handleAllEvents() {
    const dagChainReduxHandler = new DAGChainReduxHandler();
    const conf = new ConfigService();
    this.logger.debug('Called every 30 minutes');

    const anconUrl = conf.get('ANCON_URL_TENSTA');
    const moniker = keccak256(toUtf8Bytes(conf.get(`DAG_STORE_MONIKER`)));
    const url = conf.get('BSC_TESTNET');
    const provider = new ethers.providers.JsonRpcProvider(url);
    const pk = conf.get(`DAG_STORE_KEY`);
    const signer = new ethers.Wallet(Web3.utils.hexToBytes(pk));

    //Instantiate web3

    const web3 = new Web3(signer.provider as any);

    //Instantiate anconNFT & NFTEX contract
    // let nftContract, marketContract;
    const { AnconNFTContract, MarketPlaceContract } = helper.getContracts(
      signer,
      web3,
    );

    // AnconNFTContract.events

    // TODO: Listener getAllEvents

    // for (let index = currentBlock; index > firstBlockNumber; index -= 4999) {
    //   responseMintedNFT = await nftContract.getPastEvents("AddMintInfo", {
    //     toBlock: index,
    //     fromBlock: index - 4999,
    //   });

    // TODO: Fetch JEXL smart contracts by CID hash
    const rules = {};
    const evt = {};
    dagChainReduxHandler.handleEvent(rules, evt);

    // TODO: Write DAG
    // TODO: PING relayer
  }
}
