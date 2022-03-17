import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BigNumber, ethers, providers } from 'ethers';
import AnconProtocol, { sleep } from './utils/AnconProtocol';
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
import fetch from 'node-fetch';
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
  MakeOrder: [
    {
      name: 'concatTransactionHash',
      condition: `returnValues.seller != null`,
      expression: `assign(dag, append(newData.uuid, newData))`,
      blockFetchCondition: 'returnValues.uri != null',
      blockFetchAddress: 'returnValues.creator',
      topicName: '@mintIndex',
    },
  ],
};

/**
  Post topic index list
**/
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

/**
  Post metadata with updated mint info
**/
const anconUpdateMetadata = async (
  _address,
  _uuid: string,
  _web3Prov: ethers.providers.Web3Provider,
  Ancon: AnconProtocol,
  _wallet: ethers.Wallet,
  oldPayload: any,
  _blockchainTxHash: string,
  _blockchainTokenId: string,
  _mintBlockNumber: number,
) => {
  //user Ancon ethers instance
  const network = await _web3Prov.getNetwork();

  const domainNameResponse = `did:ethr:${network.name}:${_address}`;

  console.log(
    'Requesting Ancon metadata creation, awaiting payload signing...',
  );

  const putPayload = {
    ...oldPayload,
    blockchainTxHash: _blockchainTxHash,
    blockchainTokenId: _blockchainTokenId,
    mintBlockNumber: _mintBlockNumber,
  };

  // sign the message
  //Current error in signature
  const signature = await _wallet.signMessage(
    ethers.utils.arrayify(ethers.utils.toUtf8Bytes(JSON.stringify(putPayload))),
  );

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: '/',
      from: domainNameResponse,
      signature,
      data: putPayload,
      topic: `uuid:${_uuid}`,
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

/**
  Post metadata with updated Make Order info
**/
const anconUpdateMetadataMakeOrder = async (
  _address,
  _uuid: string,
  _web3Prov: ethers.providers.Web3Provider,
  Ancon: AnconProtocol,
  _wallet: ethers.Wallet,
  oldPayload: any,
  _blockchainMakeOrderTxHash: string,
  _currentOrderHash: string,
  _makeOrderBlockNumber: number,
  _price: number,
) => {
  //user Ancon ethers instance
  const network = await _web3Prov.getNetwork();

  const domainNameResponse = `did:ethr:${network.name}:${_address}`;

  console.log(
    'Requesting Ancon metadata creation, awaiting payload signing...',
  );

  const putPayload = {
    ...oldPayload,
    blockchainMakeOrderTxHash: _blockchainMakeOrderTxHash,
    currentOrderHash: _currentOrderHash,
    makeOrderBlockNumber: _makeOrderBlockNumber,
    price: _price,
  };

  // sign the message
  //Current error in signature
  const signature = await _wallet.signMessage(
    ethers.utils.arrayify(ethers.utils.toUtf8Bytes(JSON.stringify(putPayload))),
  );

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: '/',
      from: domainNameResponse,
      signature,
      data: putPayload,
      topic: `uuid:${_uuid}`,
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
  private dagChainReduxHandler;

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

    this.dagChainReduxHandler = new DAGChainReduxHandler(
      rules,
      this.wallet.address,
      this.anconEndpoint,
    );

    this.Ancon.initialize();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleAllEvents() {
    //Checking if insdex topic exist
    const indexTopicRes = await fetch(
      `${this.anconEndpoint}v0/topics?topic=${rules.AddMintInfo[0].topicName}&from=${this.wallet.address}`,
    );
    this.firstTimeTopic = true;

    if (indexTopicRes.status == 200) {
      this.firstTimeTopic = false;
    }

    // console.log(
    //   '(AddMintInfoScan)[First Time Topic is]',
    //   this.firstTimeTopic,
    //   '\n',
    // );

    //Monitoring the chain
    const currentBlock = await this.web3.eth.getBlockNumber();
    const allEvents = await this.AnconNFTContract.getPastEvents('AddMintInfo', {
      toBlock: currentBlock,
      fromBlock: currentBlock - 3,
    });
    console.log(
      '\n(AddMintInfoScan)[FROM]',
      currentBlock - 3,
      '[TO]',
      currentBlock,
    );
    console.log('(AddMintInfoScan)[Events batch lenght]', allEvents.length);

    allEvents.length != 0
      ? console.log('(AddMintInfoScan)[Event batch]', allEvents, '\n')
      : null;

    allEvents.map(async (evt) => {
      let result, rule;
      const uuid = evt.returnValues.uri;

      //Checking the user generated topic without blockchain data

      const checkMintTopic = await fetch(
        `${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${evt.returnValues.creator}`,
      );

      if (checkMintTopic.status === 200) {
        console.log(
          '(AddMintInfoScan)[Got one event with uuid: ',
          uuid,
          ' Succesfully registered... proceeding to update]\n',
        );
        const checkMintTopicJson = await checkMintTopic.json();
        const eventContent = checkMintTopicJson.content;

        //Updating the metadata with indexer address generated topic
        await anconUpdateMetadata(
          this.wallet.address,
          uuid,
          this.Ancon.provider,
          this.Ancon,
          this.wallet,
          eventContent,
          evt.transactionHash,
          evt.returnValues.tokenId,
          evt.blockNumber,
        );

        const updatedRes = await fetch(
          `${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`,
        );

        const updatedResJson = await updatedRes.json();

        if (updatedRes.status == 200) {
          console.log(
            '(AddMintInfoScan)[Event Mint Metadata Succesfully Updated]',
            updatedResJson.content.uuid,
          );
        } else {
          console.log(
            '(AddMintInfoScan)[Event Mint Metadata Updated Failed]',
            updatedRes.status,
          );
        }

        if (this.firstTimeTopic) {
          //If there is no topic made, post a metadata with the first uriIndexObject
          const uriIndexObject = { [uuid]: updatedResJson.content };

          const rawPostRes = await anconPostMetadata(
            this.wallet.address,
            uuid,
            this.Ancon.provider,
            this.Ancon,
            this.wallet,
            uriIndexObject,
          );

          const updatedIndexTopicRes = await fetch(
            `${this.anconEndpoint}v0/topics?topic=${rules.AddMintInfo[0].topicName}&from=${this.wallet.address}`,
          );

          const updatedIndexTopicJson = await updatedIndexTopicRes.json();
        } else {
          const indexTopicJson = await indexTopicRes.json();
          //ancon update topic list
          const [result] = await this.dagChainReduxHandler.handleEvent(
            evt,
            updatedResJson.content,
            indexTopicJson.content,
          );

          const rawPostRes = await anconPostMetadata(
            this.wallet.address,
            uuid,
            this.Ancon.provider,
            this.Ancon,
            this.wallet,
            result,
          );
          rawPostRes.contentCid != 'error'
            ? console.log(
                '(AddMintInfoScan)[Event Transform Succesfully Posted]',
                rawPostRes.contentCid,
              )
            : console.log(
                '(AddMintInfoScan)[Event Transform Post Failed]',
                rawPostRes.contentCid,
              );
        }
      }
    });
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleMakeOrder() {
    //Checking if index topic exist
    const indexTopicRes = await fetch(
      `${this.anconEndpoint}v0/topics?topic=${rules.AddMintInfo[0].topicName}&from=${this.wallet.address}`,
    );

    // console.log(
    //   '(MakeOrderScan)[First Time Topic is]',
    //   this.firstTimeTopic,
    //   '\n',
    // );

    //Monitoring the chain
    const currentBlock = await this.web3.eth.getBlockNumber();
    const makeOrderEvents = await this.MarketPlaceContract.getPastEvents(
      'MakeOrder',
      {
        toBlock: currentBlock,
        fromBlock: currentBlock - 3,
      },
    );
    console.log(
      '\n(MakeOrderScan)[FROM]',
      currentBlock - 3,
      '[TO]',
      currentBlock,
    );
    console.log('(MakeOrderScan)[Events batch lenght]', makeOrderEvents.length);

    makeOrderEvents.length != 0
      ? console.log('(MakeOrderScan)[Event batch]', makeOrderEvents, '\n')
      : null;

    makeOrderEvents.map(async (evt) => {
      let result, rule;
      const uuid = evt.returnValues.uri;

      //Checking the user generated topic without blockchain data

      const checkMintTopic = await fetch(
        `${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`,
      );

      if (checkMintTopic.status === 200) {
        console.log(
          '(MakeOrderScan)[Got one event with uuid: ',
          uuid,
          ' Succesfully registered... proceeding to update]\n',
        );
        const checkMintTopicJson = await checkMintTopic.json();
        const eventContent = checkMintTopicJson.content;

        //Updating the metadata with indexer address generated topic
        await anconUpdateMetadataMakeOrder(
          this.wallet.address,
          uuid,
          this.Ancon.provider,
          this.Ancon,
          this.wallet,
          eventContent,
          evt.transactionHash,
          evt.returnValues.hash,
          evt.blockNumber,
          evt.price,
        );

        const updatedRes = await fetch(
          `${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`,
        );

        const updatedResJson = await updatedRes.json();

        if (updatedRes.status == 200) {
          console.log(
            '(MakeOrderScan)[Event Mint Metadata Succesfully Updated]',
            updatedResJson.content.uuid,
          );
        } else {
          console.log(
            '(MakeOrderScan)[Event Mint Metadata Updated Failed]',
            updatedRes.status,
          );
        }

        const indexTopicJson = await indexTopicRes.json();
        //ancon update topic list
        const [result] = await this.dagChainReduxHandler.handleEvent(
          evt,
          updatedResJson.content,
          indexTopicJson.content,
        );

        const rawPostRes = await anconPostMetadata(
          this.wallet.address,
          uuid,
          this.Ancon.provider,
          this.Ancon,
          this.wallet,
          result,
        );
        rawPostRes.contentCid != 'error'
          ? console.log(
              '(MakeOrderScan)[Event Transform Succesfully Posted]',
              rawPostRes.contentCid,
            )
          : console.log(
              '(MakeOrderScan)[Event Transform Post Failed]',
              rawPostRes.contentCid,
            );
      }
    });
  }
}
