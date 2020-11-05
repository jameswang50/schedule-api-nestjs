import { Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjsplus/schedule';

@Injectable()
export class TimeoutsService {
  private readonly logger = new Logger(TimeoutsService.name);
  @Timeout(5000)
  handle1() {
    this.logger.debug('@Timeout(5000) handler called');
  }

  @Timeout('ten', 10000)
  handle2() {
    this.logger.debug('@Timeout(10000) handler called');
  }
}
