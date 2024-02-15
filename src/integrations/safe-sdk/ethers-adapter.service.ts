import { EthersAdapter } from '@safe-global/protocol-kit'
import { ethers } from 'ethers'
import { WalletService } from './wallet.service';

export class EthersAdapterService {
  constructor(private walletService: WalletService) {}

  // getEthersAdapter(privateKey: string) {
  //   const signer = this.walletService.getWallet(privateKey)
  //   return new EthersAdapter({
  //     ethers,
  //     signerOrProvider: signer
  //   })
  // }
}