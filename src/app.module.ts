import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {envValidator} from "./common/config/environment-config.service";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: envValidator,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
