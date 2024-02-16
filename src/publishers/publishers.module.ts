import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { SchedulerUtil } from '../common/utils/scheduler.util';
import { EventFactory } from '../core/events/event.factory';
import { EthersService } from '../integrations/ethers-rpc/ethers.service';
import { DataProviderService } from '../core/data-provider.service';
import { IntegrationsModule } from '../integrations/integrations.module';

@Module({
  imports: [
    IntegrationsModule
  ],
  providers: [
    PublishersService,
    SchedulerUtil,
    EventFactory,
    EthersService,
    DataProviderService
  ],
  exports: [PublishersService],
})
export class PublishersModule {
}