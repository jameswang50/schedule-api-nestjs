import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjsplus/schedule';

@Injectable()
export class IntervalsService {
  private readonly logger = new Logger(IntervalsService.name);
  @Interval(5000)
  handle1() {
    this.logger.debug('@Interval(5000) handler called');
  }

  @Interval('ten', 10000)
  handle2() {
    this.logger.debug('@Interval(1000) handler called');
  }
}
