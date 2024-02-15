import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';

@Injectable()
export class Web3ConfigService {
  constructor(
    private environmentConfigService: EnvironmentConfigService
  ) {}

  get network(): Network {
    const rpcUrl = this.environmentConfigService.rpcUrl;
    const chainId = this.environmentConfigService.chainId;
    const contractAddress = this.environmentConfigService.contractAddress;
    const contractAbi = this.environmentConfigService.contractAbi;
    return {
      rpcUrl: rpcUrl,
      chainId: BigInt(chainId),
      contractAddress: contractAddress,
      contractAbi: contractAbi,
    }
  }
}

interface Network {
  rpcUrl: string;
  chainId: bigint;
  contractAddress: string;
  contractAbi: any;
}