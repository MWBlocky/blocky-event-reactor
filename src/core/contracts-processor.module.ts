import { Module } from '@nestjs/common';
import { ContractsProcessorService } from './contracts-processor.service';
import { IntegrationsModule } from '../integrations/integrations.module';

@Module({
  imports: [IntegrationsModule],
  providers: [ContractsProcessorService],
  exports: [ContractsProcessorService],
})
export class ContractsProcessorModule {
}
