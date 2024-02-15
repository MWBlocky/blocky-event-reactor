import { Module } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { PublishersService } from '../publishers/publishers.service';
import { SchedulerUtil } from '../common/utils/scheduler.util';
import { EventFactory } from '../publishers/event.factory';
import { EthersService } from '../integrations/ethers-rpc/ethers.service';
import { IntegrationsDataProviderService } from '../integrations/integrations-data-provider.service';

@Module({
  providers: [ListenersService, PublishersService,  SchedulerUtil,
    EventFactory,
    EthersService,
    IntegrationsDataProviderService],
  exports: [ListenersService],
})
export class ListenersModule {}