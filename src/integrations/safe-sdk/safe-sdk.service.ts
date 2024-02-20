import SafeApiKit from '@safe-global/api-kit';
import Safe, { DeploySafeProps, EthersAdapter, SafeAccountConfig } from '@safe-global/protocol-kit';
import { SafeFactory } from '@safe-global/protocol-kit';
import { toHexString } from '../../common/utils/misc.util';
import { TransactionData } from '../integrations.interface';

export class SafeSdkService {
  constructor() {
  }
  async createSafeApiKit(chainId: bigint) {
    return new SafeApiKit({ chainId });
  }
  async createProtocolKit(
    ethers: typeof import("ethers/lib.commonjs/ethers"),
    owner1Signer): Promise<Safe> {
    const ethAdapterOwner1 = new EthersAdapter({
      ethers,
      signerOrProvider: owner1Signer,
    });
    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 });
    const owner1WalletAddress = await owner1Signer.getAddress();
    const safeAccountConfig: SafeAccountConfig = {
      owners: [owner1WalletAddress],
      threshold: 1,
    };
    const saltNonce = Math.floor(Date.now() / 1000);
    const deploySafeProps: DeploySafeProps = {
      safeAccountConfig: safeAccountConfig,
      saltNonce: saltNonce.toString(),
    };
    return await safeFactory.deploySafe(deploySafeProps);
  }
  async createTransaction(protocolKitOwner1: Safe, transactionData: TransactionData){
    const stringValue = transactionData.value.toString();
    const hexData = toHexString(transactionData.data);
    const safeTransactionData = {
      to: transactionData.to,
      value: stringValue,
      data: hexData,
      nonce: transactionData.nonce,
    }
    return await protocolKitOwner1.createTransaction({ transactions: [safeTransactionData] })
  }
}
