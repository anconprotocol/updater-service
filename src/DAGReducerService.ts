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

import { ConfigService } from '@nestjs/config';
require('dotenv').config();
@Injectable()
export class DAGReducerService {
  private readonly logger = new Logger(DAGReducerService.name);

  @Cron(process.env.REDUCER_INTERVAL)
  async handleAllEvents() {
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

    //

    // Update relayer header will charge the fee configured in anconprotocol stablecoin.
  }
}

// function toABIproofs() {
//   const z: any = { ...proofCombined[0].exist };
//   z.key = hexlify(base64.decode(z.key));
//   z.value = hexlify(base64.decode(z.value));
//   z.leaf.prefix = hexlify(base64.decode(z.leaf.prefix));
//   z.leaf.hash = 1;
//   z.path = z.path.map((x) => {
//     let suffix;
//     if (!!x.suffix) {
//       suffix = hexlify(base64.decode(x.suffix));
//       return {
//         valid: true,
//         prefix: hexlify(base64.decode(x.prefix)),
//         suffix: suffix,
//         hash: 1,
//       };
//     } else {
//       return {
//         valid: true,
//         prefix: hexlify(base64.decode(x.prefix)),
//         hash: 1,
//         suffix: '0x',
//       };
//     }
//   });
//   z.leaf.prehash_key = 0;
//   z.leaf.len = z.leaf.length;
//   z.valid = true;
//   z.leaf.valid = true;

//   return z;
// }
