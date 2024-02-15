import { OnEvent } from '@nestjs/event-emitter';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerType } from '../common/enums/scheduler';
import { PublishersService } from '../publishers/publishers.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Events } from '../common/enums/events';

@Injectable()
export class ListenersService {
  private logger = new Logger('ListenersService');
  private contractLastCheckedBlock = 0;
  constructor(
    private publisherService: PublishersService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  @OnEvent(Events.CONTRACT_NEW_EVENT)
  processContractNewEvent(eventName: string, payload: any) {
    payload.forEach((event: any) => {
      if (this.contractLastCheckedBlock >= event.blockNumber) {
        return;
      }

      const newEventName = `${Events.SAFE_SIGN_TRANSACTION}-${event.blockNumber}-${event.transactionIndex}`;

      const isCronJobExists = this.schedulerRegistry.doesExist('cron', newEventName);
      if (!isCronJobExists) {
        this.publisherService.registerPublisher(newEventName, SchedulerType.HALF_MINUTE);
        this.contractLastCheckedBlock = event.blockNumber;
      }
    });
  }

  @OnEvent(Events.SAFE_SIGN_TRANSACTION)
  processSafeTransaction(eventName: string, payload: any) {
    this.logger.log(payload);
    this.schedulerRegistry.deleteCronJob(eventName);
    this.logger.log(`Cron job for ${eventName} deleted`);
  }
}