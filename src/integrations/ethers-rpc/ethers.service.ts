import { ethers, EventLog, Log } from 'ethers';
import { Injectable } from '@nestjs/common';
import { EIP712_SAFE_TX_TYPE } from '../../common/utils/misc.util';
import { SafeTransaction } from '@safe-global/safe-core-sdk-types';

@Injectable()
export class EthersService {
  constructor() {
  }

  get ethers() {
    return ethers;
  }

  getProvider(rpcUrl: string) {
    return ethers.getDefaultProvider(rpcUrl);
  }

  getContract(
    abi: { abi: ethers.Interface | ethers.InterfaceAbi; },
    contractAddress: string | ethers.Addressable,
    provider: ethers.AbstractProvider | ethers.ContractRunner): ethers.Contract {
    return new ethers.Contract(contractAddress, abi.abi, provider);
  }

  getContractEvents(contract: ethers.Contract, eventName: string): Promise<(EventLog | Log)[]> {
    return contract.queryFilter(contract.filters[eventName]());
  }

  hashSafeTx(chainId: bigint, safeAddress: string, tx: SafeTransaction): string {
    return ethers.TypedDataEncoder.hash({
        chainId: chainId,
        verifyingContract: safeAddress,
      }, EIP712_SAFE_TX_TYPE, tx.data,
    );
  }

  async getSafeContractNonce(safeAddress: string, signer: ethers.ContractRunner | ethers.Wallet): Promise<number> {
    const contract = new ethers.Contract(
      safeAddress,
      new ethers.Interface(['function nonce() view returns(uint256)']),
      signer
    );
    const nonce = await contract.nonce();
    return Number(nonce);
  }
}
