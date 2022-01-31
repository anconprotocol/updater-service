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

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const conf = new ConfigService();
    this.logger.debug('Called every 60 seconds');

    const ipfsUrl = conf.get('ANCON_URL');

    let ipfsRes: any;
    axios.get(ipfsUrl + 'v0/proofs/lasthash').then(function (response) {
      ipfsRes = response;
      // handle success
      console.log(response.data);
    });

    const activeRelayers = conf.get('RELAYERS_ACTIVE').split(',');
    const pk = conf.get(`DAG_STORE_KEY`);
    const moniker = keccak256(toUtf8Bytes(conf.get(`DAG_STORE_MONIKER`)));
    // Update relayer header will charge the fee configured in anconprotocol stablecoin.
    // Please approve using console
    for (const relayerName of activeRelayers) {
      const url = conf.get(relayerName);
      const provider = new ethers.providers.JsonRpcProvider(url);
      const signer = new ethers.Wallet(Web3.utils.hexToBytes(pk));

      const f = new AnconProtocol__factory(signer.connect(provider));
      const contract = AnconProtocol__factory.connect(
        conf.get(`${relayerName}_CONTRACT_ADDRESS`),
        provider,
      );
      const contract2 = f.attach(conf.get(`${relayerName}_CONTRACT_ADDRESS`));

      const relayHeader = await contract.getProtocolHeader(moniker);
      const h = hexlify(base64.decode(ipfsRes.data.lastHash.hash));
      console.log(
        await signer.getAddress(),
        relayHeader,
        h,
        parseInt(ipfsRes.data.lastHash.version).toString(),
      );

      if (relayHeader !== h) {
        const gasLimit = await contract2.estimateGas.updateRelayerHeader(
          moniker,
          h,
          parseInt(ipfsRes.data.lastHash.version).toString(),
        );
        const rate = gasLimit.toNumber() * 1.2;
        const tx = await contract2.updateRelayerHeader(
          moniker,
          h,
          parseInt(ipfsRes.data.lastHash.version).toString(),
          { gasLimit: rate.toString() }, //gasPrice: 30000000000 },
        );
        console.log(`${relayerName} header updated successfully ${tx.hash}`);
      }
    }
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
