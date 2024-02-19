import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { envValidator } from './common/config/environment-config.service';
import {ConfigModule} from "@nestjs/config";
import { ScheduleModule } from '@nestjs/schedule';
import { CommonConfigModule } from './common/config/common-config.module';
import { ContractEventsModule } from './schedulers/contract-events.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { ContractsProcessorModule } from './core/contracts-processor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
     validationSchema: envValidator,
    }),
    CommonConfigModule,
    ScheduleModule.forRoot(),
    IntegrationsModule,
    ContractsProcessorModule,
    ContractEventsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
