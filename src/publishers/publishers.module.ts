import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { SchedulerUtil } from '../common/utils/scheduler.util';
import { EventFactory } from './event.factory';
import { EthersService } from '../integrations/ethers-rpc/ethers.service';
import { IntegrationsDataProviderService } from '../integrations/integrations-data-provider.service';

@Module({
  providers: [
    PublishersService,
    SchedulerUtil,
    EventFactory,
    EthersService,
    IntegrationsDataProviderService,
  ],
  exports: [PublishersService],
})
export class PublishersModule {
}