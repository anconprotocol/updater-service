import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { AnconProtocol__factory } from './types/ethers-contracts/factories/AnconProtocol__factory';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { base64, hexlify } from 'ethers/lib/utils';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_10_SECONDS) //10 secs for testing, 5 min for productions
  async handleCron() {
    const conf = new ConfigService();
    console.log('init task serv');
    this.logger.debug('Called every 30 seconds');

    const ipfsUrl = 'https://api.ancon.did.pa/';

    let ipfsRes: any;
    axios.get(ipfsUrl + 'v0/proofs/lasthash').then(function (response) {
      ipfsRes = response;
      // handle success
      console.log(response.data);
    });
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        'https://data-seed-prebsc-1-s2.binance.org:8545/',
      ),
    );
    web3.eth.accounts.wallet.add(conf.get('PKEY'));
    const provider = new ethers.providers.Web3Provider(
      web3.currentProvider as any,
    );

    const contract2 = AnconProtocol__factory.connect(
      conf.get('CONTRACT_ADDRESS'),
      provider.getSigner(0),
    );

    const relayHash = await contract2.relayNetworkHash();

    if (relayHash !== ipfsRes.data.lastHash.hash) {
      await contract2.updateProtocolHeader(
        base64.decode(ipfsRes.data.lastHash.hash),
      );
    }
    // let resA = toABIproofs();
  }
}

const proofCombined = [
  {
    exist: {
      valid: true,
      key: 'L2FuY29ucHJvdG9jb2wvZTA1NDZjMDZlNDZlYWIzNDcyMmVhMTNjNTAyNGNiMDBmYjEzNmVmZDg3OGY0NThiNTViMDQ3YzhkOGU4Y2JiNi91c2VyL2JhZ3VxZWVyYWVocGRhN3pwcmJ1bXhoZzVncWlmbHkzYm1kbmFlb2NxbzRmbHZub2ZzaXB0ZmVoa3F5d3E=',
      value: 'ZGlkOndlYjppcGZzOnVzZXI6dGVzdA==',
      leaf: {
        valid: true,
        hash: 1,
        length: 1,
        prefix: 'AAIi',
        prehash_value: 1,
      },
      path: [
        {
          valid: true,
          hash: 1,
          prefix: 'AgQiIA==',
          suffix: 'IEga3tvbzXYCsg0xSYPX36OPlz1bwOPxMp239NZ9XwG+',
        },
        {
          valid: true,
          hash: 1,
          prefix: 'BAgiIKLI0YDL04HqPwDpHF8ht5pGCiq+Uw/0DTzSMDp7pE6mIA==',
        },
        {
          valid: true,
          hash: 1,
          prefix: 'BgwiIADQ5R72VKesArREiAa1kDeAFiOgt9tZ+32NLHPOPjP9IA==',
        },
        {
          valid: true,
          hash: 1,
          prefix: 'CBIiIA==',
          suffix: 'IPhUy0NkQUD/fk42UPtKzT0QWd1NDgJshHnLRSm3j7XQ',
        },
        {
          valid: true,
          hash: 1,
          prefix: 'CiAiIA==',
          suffix: 'IMo1qcvqM7Duwq5Ac3wtuoTitJjOTDVrB92+pkPPAlzW',
        },
      ],
    },
  },
];

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
