import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerType } from '../common/enums/scheduler';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventFactory } from '../core/events/event.factory';
import { SchedulerUtil } from '../common/utils/scheduler.util';
import { extractEventName } from '../common/utils/misc.util';
import { DataProviderService } from '../core/data-provider.service';

@Injectable()
export class PublishersService {
  private logger = new Logger('PublishersService');
  constructor(
    private schedulerUtils: SchedulerUtil,
    private schedulerRegistry: SchedulerRegistry,
    private eventEmitter: EventEmitter2,
    private eventFactory: EventFactory,
    private dataProvider: DataProviderService,
  ) {
  }
  registerPublisher(eventName: string, schedulerType: SchedulerType) {
    this.logger.log(`Publisher registered for event: ${eventName}`);
    this.schedulerUtils.addCronJob(
      eventName,
      schedulerType,
      () => this.handler(eventName),
      this.schedulerRegistry,
    );
  }

  async handler(eventName: string){
    const name = extractEventName(eventName);
    const data = await this.dataProvider.getDataForEvent(name);
    const event = this.eventFactory.createEvent(name, data);

    if (event.canBeEmitted()){
      this.eventEmitter.emit(event.name, eventName, event.data);
    }
  }
}