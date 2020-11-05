import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TimeoutsService } from './timeouts.service';
import { IntervalsService } from './intervals.service';
import { Tasks2Service } from './tasks2.service';

@Module({
  providers: [TasksService, Tasks2Service, TimeoutsService, IntervalsService],
})
export class TaskModule {}
