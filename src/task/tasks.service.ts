import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjsplus/schedule';
import * as moment from 'moment';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('45 * * * * *', { name: 'cron45' })
  handleCron45() {
    this.logger.debug('handleCron45 called when second is 45!');
  }

  // duplicate names are allowed, setting is overriden
  @Cron('47 * * * * *', { name: 'cron45' })
  handleCron47() {
    this.logger.debug('handleCron47 called when second is 47!');
  }
}
