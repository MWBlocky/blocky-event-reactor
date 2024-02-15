import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {EnvironmentConfigService} from "./common/config/environment-config.service";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const envConfigService = app.get(EnvironmentConfigService);

  const port = envConfigService.port;
  await app.listen(port).then(() => {
    logger.log(`Listening on port ${port}`);
  });
}
bootstrap();
