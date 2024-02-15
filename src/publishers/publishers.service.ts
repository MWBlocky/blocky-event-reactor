import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerType } from '../common/enums/scheduler';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventFactory } from './event.factory';
import { SchedulerUtil } from '../common/utils/scheduler.util';
import { IntegrationsDataProviderService } from '../integrations/integrations-data-provider.service';

@Injectable()
export class PublishersService {
  private logger = new Logger('PublishersService');
  constructor(
    private schedulerUtils: SchedulerUtil,
    private schedulerRegistry: SchedulerRegistry,
    private eventEmitter: EventEmitter2,
    private eventFactory: EventFactory,
    private dataProvider: IntegrationsDataProviderService,
  ) {
  }
  registerPublisher(eventName: string, schedulerType: SchedulerType) {
    this.logger.log(`${eventName} > registered Publisher`);
    this.schedulerUtils.addCronJob(
      eventName,
      schedulerType,
      () => this.handler(eventName),
      this.schedulerRegistry,
    );
  }

  async handler(eventName: string){
    const splittedEventName = eventName.split('-');
    const data = await this.dataProvider.getDataForEvent(splittedEventName[0]);
    const event = this.eventFactory.createEvent(splittedEventName[0], data);

    if (event.canBeEmitted()){
      this.eventEmitter.emit(event.name, eventName, event.data);
    }
  }
}