import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ethers } from 'ethers';
import AnconProtocol from './utils/AnconProtocol';
import {
  anconPostMetadata,
  anconUpdateMintMetadata,
  anconUpdateMetadataMakeOrder,
  anconUpdateMetadataCancelOrder,
  anconUpdateMetadataClaim,
} from './utils/DagHelper';
import Web3 from 'web3';
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
      topicName: '@uuidIndex',
    },
  ],
  MakeOrder: [
    {
      name: 'concatTransactionHash',
      condition: `returnValues.uri != null`,
      expression: `assign(dag, append(newData.uuid, newData))`,
      blockFetchCondition: 'returnValues.uri != null',
      blockFetchAddress: 'returnValues.seller',
      topicName: '@uuidIndex',
    },
  ],
  CancelOrder: [
    {
      name: 'concatTransactionHash',
      condition: `returnValues.uri != null`,
      expression: `assign(dag, append(newData.uuid, newData))`,
      blockFetchCondition: 'returnValues.uri != null',
      blockFetchAddress: 'returnValues.seller',
      topicName: '@uuidIndex',
    },
  ],
  Claim: [
    {
      name: 'concatTransactionHash',
      condition: `returnValues.uri != null`,
      expression: `assign(dag, append(newData.uuid, newData))`,
      blockFetchCondition: 'returnValues.uri != null',
      blockFetchAddress: 'returnValues.seller',
      topicName: '@uuidIndex',
    },
  ],
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
  private anconEndpoint: string;
  private pk: string;
  private url: string;
  private web3: Web3;
  private Ancon: AnconProtocol;
  private ethWeb3Prov: ethers.providers.Web3Provider;
  private wallet: ethers.Wallet;
  private AnconNFTContract;
  private MarketPlaceContract;
  private firstTimeTopic: boolean;
  private dagChainReduxHandler: DAGChainReduxHandler;
  private uuidIndexTopicName: string;

  constructor() {
    const conf = new ConfigService();

    this.anconEndpoint = conf.get('ANCON_URL_TENSTA');
    this.pk = conf.get(`DAG_STORE_KEY`);
    this.url = conf.get('BSC_TESTNET');
    this.uuidIndexTopicName = conf.get('REACT_APP_ANCON_UUID_Index_Topic_Name');

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
  async handleMintEvents() {
    //Checking if insdex topic exist
    const indexTopicRes = await fetch(
      `${this.anconEndpoint}v0/topics?topic=${this.uuidIndexTopicName}&from=${this.wallet.address}`,
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
    const mintEvents = await this.AnconNFTContract.getPastEvents(
      'AddMintInfo',
      {
        toBlock: currentBlock,
        fromBlock: currentBlock - 3,
      },
    );
    console.log(
      '\n(AddMintInfoScan)[FROM]',
      currentBlock - 3,
      '[TO]',
      currentBlock,
    );
    console.log('(AddMintInfoScan)[Events batch lenght]', mintEvents.length);

    mintEvents.length != 0
      ? console.log('(AddMintInfoScan)[Event batch]', mintEvents, '\n')
      : null;

    mintEvents.map(async (evt) => {
      const uuid: string = evt.returnValues.uri;

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
        await anconUpdateMintMetadata(
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
      `${this.anconEndpoint}v0/topics?topic=${rules.MakeOrder[0].topicName}&from=${this.wallet.address}`,
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
          evt.timestamp,
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

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCancelOrder() {
    //Checking if index topic exist
    const indexTopicRes = await fetch(
      `${this.anconEndpoint}v0/topics?topic=${rules.CancelOrder[0].topicName}&from=${this.wallet.address}`,
    );

    // console.log(
    //   '(CancelScan)[First Time Topic is]',
    //   this.firstTimeTopic,
    //   '\n',
    // );

    //Monitoring the chain
    const currentBlock = await this.web3.eth.getBlockNumber();
    const cancelOrderEvents = await this.MarketPlaceContract.getPastEvents(
      'CancelOrder',
      {
        toBlock: currentBlock,
        fromBlock: currentBlock - 3,
      },
    );
    console.log('\n(CancelScan)[FROM]', currentBlock - 3, '[TO]', currentBlock);
    console.log('(CancelScan)[Events batch lenght]', cancelOrderEvents.length);

    cancelOrderEvents.length != 0
      ? console.log('(CancelScan)[Event batch]', cancelOrderEvents, '\n')
      : null;

    cancelOrderEvents.map(async (evt) => {
      const uuid = evt.returnValues.uri;

      //Checking the user generated topic without blockchain data

      const checkMintTopic = await fetch(
        `${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`,
      );

      if (checkMintTopic.status === 200) {
        console.log(
          '(CancelScan)[Got one event with uuid: ',
          uuid,
          ' Succesfully registered... proceeding to update]\n',
        );
        const checkMintTopicJson = await checkMintTopic.json();
        const eventContent = checkMintTopicJson.content;

        //Updating the metadata with indexer address generated topic
        await anconUpdateMetadataCancelOrder(
          this.wallet.address,
          uuid,
          this.Ancon.provider,
          this.Ancon,
          this.wallet,
          eventContent,
        );

        const updatedRes = await fetch(
          `${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`,
        );

        const updatedResJson = await updatedRes.json();

        if (updatedRes.status == 200) {
          console.log(
            '(CancelScan)[Event Mint Metadata Succesfully Updated]',
            updatedResJson.content.uuid,
          );
        } else {
          console.log(
            '(CancelScan)[Event Mint Metadata Updated Failed]',
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
              '(CancelScan)[Event Transform Succesfully Posted]',
              rawPostRes.contentCid,
            )
          : console.log(
              '(CancelScan)[Event Transform Post Failed]',
              rawPostRes.contentCid,
            );
      }
    });
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleClaim() {
    //Checking if index topic exist
    const indexTopicRes = await fetch(
      `${this.anconEndpoint}v0/topics?topic=${rules.Claim[0].topicName}&from=${this.wallet.address}`,
    );

    // console.log(
    //   '(ClaimScan)[First Time Topic is]',
    //   this.firstTimeTopic,
    //   '\n',
    // );

    //Monitoring the chain
    const currentBlock = await this.web3.eth.getBlockNumber();
    const cancelOrderEvents = await this.MarketPlaceContract.getPastEvents(
      'Claim',
      {
        toBlock: currentBlock,
        fromBlock: currentBlock - 3,
      },
    );
    console.log('\n(ClaimScan)[FROM]', currentBlock - 3, '[TO]', currentBlock);
    console.log('(ClaimScan)[Events batch lenght]', cancelOrderEvents.length);

    cancelOrderEvents.length != 0
      ? console.log('(ClaimScan)[Event batch]', cancelOrderEvents, '\n')
      : null;

    cancelOrderEvents.map(async (evt) => {
      const uuid = evt.returnValues.uri;

      //Checking the user generated topic without blockchain data

      const checkMintTopic = await fetch(
        `${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`,
      );

      if (checkMintTopic.status === 200) {
        console.log(
          '(ClaimScan)[Got one event with uuid: ',
          uuid,
          ' Succesfully registered... proceeding to update]\n',
        );
        const checkMintTopicJson = await checkMintTopic.json();
        const eventContent = checkMintTopicJson.content;

        //Updating the metadata with indexer address generated topic
        await anconUpdateMetadataClaim(
          this.wallet.address,
          uuid,
          this.Ancon.provider,
          this.Ancon,
          this.wallet,
          eventContent,
          evt.taker,
        );

        const updatedRes = await fetch(
          `${this.anconEndpoint}v0/topics?topic=uuid:${uuid}&from=${this.wallet.address}`,
        );

        const updatedResJson = await updatedRes.json();

        if (updatedRes.status == 200) {
          console.log(
            '(ClaimScan)[Event Mint Metadata Succesfully Updated]',
            updatedResJson.content.uuid,
          );
        } else {
          console.log(
            '(ClaimScan)[Event Mint Metadata Updated Failed]',
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
              '(ClaimScan)[Event Transform Succesfully Posted]',
              rawPostRes.contentCid,
            )
          : console.log(
              '(ClaimScan)[Event Transform Post Failed]',
              rawPostRes.contentCid,
            );
      }
    });
  }
}
