import SafeApiKit from '@safe-global/api-kit';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';

export class SafeSdkService {
  constructor() {
  }
  getSafeApiKit(chainId: bigint) {
    return new SafeApiKit({ chainId: chainId });
  }
  async getPendingTransactions(apiKit: any, safeAddress: string) {
    return await apiKit.getPendingTransactions(safeAddress).results;
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
}