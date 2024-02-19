import SafeApiKit from '@safe-global/api-kit';
import { DeploySafeProps, EthersAdapter, SafeAccountConfig } from '@safe-global/protocol-kit';
import { SafeFactory } from '@safe-global/protocol-kit'
import { MetaTransactionData } from '@safe-global/safe-core-sdk-types';
import { numberToHexString } from '../../common/utils/misc.util';
import { SafeTransactionData } from '@safe-global/safe-core-sdk-types/dist/src/types';

export class SafeSdkService {
  constructor() {}

  async createSafeApiKit(chainId: bigint) {
    return new SafeApiKit({chainId});
  }

  async createProtocolKit(ethers: any, owner1Signer: any, safeAddress: string) {
    const ethAdapterOwner1 = new EthersAdapter({
      ethers,
      signerOrProvider: owner1Signer
    })
    const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })
    const owner1WalletAddress = await owner1Signer.getAddress();
    const safeAccountConfig: SafeAccountConfig = {
      owners: [owner1WalletAddress],
      threshold: 1,
    }
    const saltNonce = Math.floor(Date.now() / 1000);
    const deploySafeProps:DeploySafeProps = {
      safeAccountConfig: safeAccountConfig,
      saltNonce: saltNonce.toString()
    }
    return await safeFactory.deploySafe(deploySafeProps);
  }

  async createTransaction(protocolKitOwner1: any, transactionData: any){
    const stringValue = transactionData.value.toString();
    const hexData = numberToHexString(transactionData.data);
    const safeTransactionData: any = {
      to: transactionData.to,
      value: stringValue,
      data: hexData,
      nonce: transactionData.nonce,
    }
    return await protocolKitOwner1.createTransaction({ transactions: [safeTransactionData] })
  }
}