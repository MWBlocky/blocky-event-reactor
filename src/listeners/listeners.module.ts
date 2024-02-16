import { Module } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { IntegrationsModule } from '../integrations/integrations.module';
import { PublishersModule } from '../publishers/publishers.module';

@Module({
  imports: [
    IntegrationsModule,
    PublishersModule
  ],
  providers: [
    ListenersService,
  ],
  exports: [ListenersService],
})
export class ListenersModule {}