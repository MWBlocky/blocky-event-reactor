import { SafeFactory } from '@safe-global/protocol-kit'
import { EthersAdapterService } from './ethers-adapter.service';

export class SafeFactoryService {
  constructor(private ethersAdapterService: EthersAdapterService) {}

  // async getSafeFactory(privateKey: string) {
  //   const ethAdapter = this.ethersAdapterService.getEthersAdapter(privateKey)
  //   return await SafeFactory.create({ ethAdapter })
  // }
}