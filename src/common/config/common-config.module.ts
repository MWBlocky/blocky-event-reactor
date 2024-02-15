import { Global, Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { Web3ConfigService } from './web3-config.service';
@Global()
@Module({
  providers: [EnvironmentConfigService, Web3ConfigService],
  exports: [EnvironmentConfigService, Web3ConfigService],
})
export class CommonConfigModule {}
