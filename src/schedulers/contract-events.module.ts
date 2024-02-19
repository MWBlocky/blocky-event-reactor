import { Module } from '@nestjs/common';
import { ContractEventsService } from './contract-events.service';
import { SchedulerUtil } from '../common/utils/scheduler.util';
import { ContractsProcessorService } from '../core/contracts-processor.service';
import { IntegrationsModule } from '../integrations/integrations.module';

@Module({
  imports: [IntegrationsModule],
  providers: [
    ContractEventsService,
    SchedulerUtil,
    ContractsProcessorService,
  ],
  exports: [ContractEventsService],
})
export class ContractEventsModule {
}
