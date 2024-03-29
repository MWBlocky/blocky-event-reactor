import { Global, Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { Web3ConfigService } from './web3-config.service';
import { StorageConfigService } from './storage-config.service';
@Global()
@Module({
  providers: [EnvironmentConfigService, Web3ConfigService, StorageConfigService],
  exports: [EnvironmentConfigService, Web3ConfigService, StorageConfigService],
})
export class CommonConfigModule {
}
