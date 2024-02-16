import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';

@Injectable()
export class Web3ConfigService {
  constructor(
    private environmentConfigService: EnvironmentConfigService
  ) {}

  get network(): Network {
    const botPrivateKey = this.environmentConfigService.botPrivateKey;
    const rpcUrl = this.environmentConfigService.rpcUrl;
    const chainId = this.environmentConfigService.chainId;
    const contractAddress = this.environmentConfigService.contractAddress;
    const contractAbi = this.environmentConfigService.contractAbi;
    const safeAddress = this.environmentConfigService.safeAddress;
    return {
      botPrivateKey: botPrivateKey,
      rpcUrl: rpcUrl,
      chainId: BigInt(chainId),
      contractAddress: contractAddress,
      contractAbi: contractAbi,
      safeAddress: safeAddress,
    }
  }
}

interface Network {
  botPrivateKey: string;
  rpcUrl: string;
  chainId: bigint;
  contractAddress: string;
  contractAbi: any;
  safeAddress: string;
}