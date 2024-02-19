import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { Web3ConfigService } from '../common/config/web3-config.service';
import { EthersService } from './ethers-rpc/ethers.service';
import { SafeSdkService } from './safe-sdk/safe-sdk.service';

@Module({
  providers: [
    IntegrationsService,
    Web3ConfigService,
    EthersService,
    SafeSdkService
  ],
  exports: [IntegrationsService],
})
export class IntegrationsModule {
}
