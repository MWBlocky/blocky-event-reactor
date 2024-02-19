import { Injectable, OnModuleInit } from '@nestjs/common';
import { ContractEventsService } from './schedulers/contract-events.service';
import { SchedulerType } from './common/enums/scheduler';
import { Events } from './common/enums/events';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private contractEventsService: ContractEventsService) {
  }
  onModuleInit() {
    this.contractEventsService
      .registerCronJob(Events.CONTRACT_DEPOSIT_EVENT, SchedulerType.HALF_MINUTE);
  }
}
