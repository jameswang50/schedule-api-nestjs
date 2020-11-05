import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjsplus/schedule';

@Injectable()
export class Tasks2Service {
  private readonly logger = new Logger(Tasks2Service.name);

  // duplicate names are allowed, setting is overriden
  @Cron('48 * * * * *', { name: 'cron45' })
  handleCron48() {
    this.logger.debug('@Cron(48) handler called!');
  }
}
