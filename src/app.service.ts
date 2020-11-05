import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjsplus/schedule';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
