import { Injectable, OnModuleInit } from '@nestjs/common';
import { PublishersService } from './publishers/publishers.service';
import { SchedulerType } from './common/enums/scheduler';
import { Events } from './common/enums/events';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private publisherService: PublishersService) {
  }

  onModuleInit() {
    // PublisherService is a class that is used to register cron jobs for emitting events
    this.publisherService.registerPublisher(Events.CONTRACT_NEW_EVENT, SchedulerType.FIVE_SECONDS);
  }
}
