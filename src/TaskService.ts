import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
// const axios = require('axios').default;

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    console.log('init task serv');
    this.logger.debug('Called every 30 seconds');

    const ipfsUrl = 'https://api.ancon.did.pa/';

    let ipfsRes: any;
    axios.get(ipfsUrl + 'v0/proofs/lasthash').then(function (response) {
      ipfsRes = response;
      // handle success
      console.log(response.data);
    });
    // console.log(ipfsRes);
  }
}
