import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {EnvironmentConfigService} from "./common/config/environment-config.service";
import {ConfigService} from "@nestjs/config";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const envConfigService = new EnvironmentConfigService(configService);

  const host = envConfigService.host;
  const port = envConfigService.port;

  await app.listen(port, host, async () => {
    logger.log(`Application is running on http://${host}:${port}`);
  });
}
bootstrap();
