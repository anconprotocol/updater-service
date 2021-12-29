import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('init task serv');
    this.logger.debug('Called every 30 seconds');
  }
}
