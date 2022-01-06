import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { AnconProtocol__factory } from './types/ethers-contracts/factories/AnconProtocol__factory';
import { ethers, providers } from 'ethers';
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

    const ipfsUrl = conf.get('ANCON_URL');

    let ipfsRes: any;
    axios.get(ipfsUrl + 'v0/proofs/lasthash').then(function (response) {
      ipfsRes = response;
      // handle success
      console.log(response.data);
    });
    const provider = new ethers.providers.JsonRpcProvider(conf.get('CHAIN'));
    const signer = ethers.Wallet.fromMnemonic(conf.get('MNEMONIC'));

    signer.connect(provider);
    const f = new AnconProtocol__factory(signer.connect(provider));
    const contract = AnconProtocol__factory.connect(
      conf.get('CONTRACT_ADDRESS'),
      provider,
    );
    const contract2 = f.attach(conf.get('CONTRACT_ADDRESS'));

    const relayHash = await contract.getProtocolHeader({
      from: '0x32A21c1bB6E7C20F547e930b53dAC57f42cd25F6',
    });

    const h = hexlify(base64.decode(ipfsRes.data.lastHash.hash));
    if (relayHash !== h) {
      const tx = await contract2.updateProtocolHeader(h);
      console.log('header updated successfully ' + tx.hash);
    }
    // let resA = toABIproofs();
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
