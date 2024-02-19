import SafeApiKit from '@safe-global/api-kit';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { SafeFactory } from '@safe-global/protocol-kit'

export class SafeSdkService {
  constructor() {
  }

  createSafeApiKit(chainId: bigint) {
    return new SafeApiKit({ chainId: chainId });
  }
  async createSafeFactory(ethAdapterOwner: any) {
    return await SafeFactory.create({ ethAdapter: ethAdapterOwner })
  }
  async deploySafe(safeFactory: any, owners: string[], threshold: number) {
    return await safeFactory.deploy({ owners, threshold });
  }

  createEthAdapter(ethers: any, signerOrProvider: any) {
    return new EthersAdapter({
      ethers,
      signerOrProvider: signerOrProvider
    });
  }
  async createSafe(ethAdapter: any, safeAddress: string) {
    return await Safe.create({
      ethAdapter: ethAdapter,
      safeAddress
    });
  }
  async confirmTransaction(apiKit: any, safeTxHash: string, signature: string) {
    return await apiKit.confirmTransaction(safeTxHash, signature);
  }

  async getPendingTransactions(chainId: bigint, safeAddress: string) {
    const service = new SafeApiKit({
      chainId: chainId,
    })

    const pendingTxs = await service.getMultisigTransactions(safeAddress);
    console.log(pendingTxs);
    return pendingTxs;
  }
}