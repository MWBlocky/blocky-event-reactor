import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { envValidator } from './common/config/environment-config.service';
import {ConfigModule} from "@nestjs/config";
import { ScheduleModule } from '@nestjs/schedule';
import { ListenersModule } from './listeners/listeners.module';
import { CommonConfigModule } from './common/config/common-config.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PublishersModule } from './publishers/publishers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
     validationSchema: envValidator,
    }),
    CommonConfigModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ListenersModule,
    PublishersModule,

  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
