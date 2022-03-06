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
require('dotenv').config();

@Injectable()
export class DAGReducerService {
  private readonly logger = new Logger(DAGReducerService.name);

  @Cron(process.env.REDUCER_INTERVAL)
  async handleAllEvents() {
    const dagChainReduxHandler = new DAGChainReduxHandler();
    const conf = new ConfigService();
    this.logger.debug('Called every 30 minutes');

    const ipfsUrl = conf.get('ANCON_URL');
    const moniker = keccak256(toUtf8Bytes(conf.get(`DAG_STORE_MONIKER`)));
    const url = conf.get('BSC_TESTNET');
    const provider = new ethers.providers.JsonRpcProvider(url);
    const pk = conf.get(`DAG_STORE_KEY`);
    const signer = new ethers.Wallet(Web3.utils.hexToBytes(pk));
    // TODO: Listener getAllEvents
    // TODO: Fetch JEXL smart contracts by CID hash
    const rules = {};
    const evt = {};
    dagChainReduxHandler.handleEvent(rules, evt);
    // TODO: Write DAG
    // TODO: PING relayer
  }
}
