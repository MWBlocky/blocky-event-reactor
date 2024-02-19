import { ethers, toBigInt } from 'ethers';
import { Injectable } from '@nestjs/common';
import { EIP712_SAFE_TX_TYPE } from '../../common/utils/misc.util';

@Injectable()
export class EthersService {
  constructor() {}
  get ethers() {
    return ethers;
  }
  getProvider(rpcUrl: string) {
    return ethers.getDefaultProvider(rpcUrl);
  }
  getContract(abi: any, contractAddress: string, provider: any): ethers.Contract {
    return new ethers.Contract(contractAddress, abi.abi, provider);
  }
  getContractEvents(contract: ethers.Contract, eventName: string): Promise<any> {
    return contract.queryFilter(contract.filters[eventName]());
  }
  hashSafeTx(chainId: bigint, safeAddress: string, tx: any): any {
    return ethers.TypedDataEncoder.hash({
        chainId: chainId,
        verifyingContract: safeAddress,
      }, EIP712_SAFE_TX_TYPE, tx.data,
    )
  }
  async getSafeContractNonce(safeAddress: string, signer: any) {
    const contract = new ethers.Contract(safeAddress, new ethers.Interface(["function nonce() view returns(uint256)"]), signer);
    const nonce = await contract.nonce();
    const nonceNumber = Number(nonce);
    return nonceNumber;
  }
}
