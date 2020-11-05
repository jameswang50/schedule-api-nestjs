import { Controller, Get, Param, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjsplus/schedule';
import { CronJob } from 'cron';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly scheduler: SchedulerRegistry) {}

  // cron jobs
  @Get('getCrons')
  getCrons() {
    const jobs = this.scheduler.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }

  @Get('addCron/:name/:seconds')
  addCronJob(@Param('name') name: string, @Param('seconds') seconds: string) {
    const newjob = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
    });
    this.scheduler.addCron(name, newjob);
    newjob.start();
    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }

  @Get('stopCron/:name')
  stopCronJob(@Param('name') name: string) {
    const job = this.scheduler.getCron(name);
    const stop = job.stop();
    this.logger.warn(`job ${name} stopped!`);
  }

  @Get('getCron/:name')
  getCronJob(@Param('name') name: string) {
    const job = this.scheduler.getCron(name);
    const next = job.nextDates().toDate();
    this.logger.warn(`job ${name} next fire: ${next}`);
    console.log('running?', job.running);
  }

  @Get('startCron/:name')
  startCron(@Param('name') name: string) {
    const job = this.scheduler.getCron(name);
    const start = job.start();
    this.logger.warn(`job ${name} started!`);
  }

  @Get('deleteCron/:name')
  deleteCron(@Param('name') name: string) {
    const ajob = this.scheduler.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }

  // timeouts
  @Get('getTimeouts')
  getTimeouts() {
    const timeouts = this.scheduler.getTimeouts();
    timeouts.forEach(key => {
      this.logger.log(`timeout: ${key}`);
    });
  }

  @Get('getTimeout/:name')
  getTimeout(@Param('name') name: string) {
    const t = this.scheduler.getTimeout(name);
    this.logger.warn(`timeout ${name}: ${t}`);
  }

  @Get('deleteTimeout/:name')
  deleteTimeout(@Param('name') name: string) {
    const t = this.scheduler.deleteTimeout(name);
    this.logger.warn(`timeout ${name} deleted!`);
  }

  // intervals
  @Get('getIntervals')
  getIntervals() {
    const intervals = this.scheduler.getIntervals();
    intervals.forEach(key => {
      this.logger.log(`interval: ${key}`);
    });
  }

  @Get('getInterval/:name')
  getInterval(@Param('name') name: string) {
    const i = this.scheduler.getInterval(name);
    this.logger.warn(`interval ${name}: ${i}`);
  }

  @Get('deleteInterval/:name')
  deleteInterval(@Param('name') name: string) {
    const i = this.scheduler.deleteInterval(name);
    this.logger.warn(`interval ${name} deleted!`);
  }
}
