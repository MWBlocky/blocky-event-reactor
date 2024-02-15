import { ProtocolKitService } from './protocol-kit.service';
import { ApiKitService } from './api-kit.service';
import { Web3ConfigService } from '../../common/config/web3-config.service';
import { WalletService } from './wallet.service';

export class TransactionService {
  constructor(
    private walletService: WalletService,
    private protocolKitService: ProtocolKitService,
    private apiKitService: ApiKitService,
    private web3ConfigService: Web3ConfigService
  ) {}

  // async createTransaction(privateKey: string, safeAccountConfig: any, transactions: any[]) {
  //   const protocolKit = await this.protocolKitService.getProtocolKit(privateKey, safeAccountConfig)
  //   return await protocolKit.createTransaction({ transactions })
  // }

  // async proposeTransaction(privateKey: string, safeAccountConfig: any, transaction: any) {
  //   const protocolKit = await this.protocolKitService.getProtocolKit(privateKey, safeAccountConfig)
  //   const safeTxHash = await protocolKit.getTransactionHash(transaction)
  //   const senderSignature = await protocolKit.signHash(safeTxHash)
  //
  //   await this.apiKitService.getApiKit(this.web3ConfigService.network.chainId).proposeTransaction({
  //     safeAddress: await protocolKit.getAddress(),
  //     safeTransactionData: transaction.data,
  //     safeTxHash,
  //     senderAddress: await this.walletService.getWallet(privateKey).getAddress(),
  //     senderSignature: senderSignature.data,
  //   })
  // }
}
