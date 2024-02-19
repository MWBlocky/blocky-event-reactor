import { ethers } from 'ethers';
import { Injectable } from '@nestjs/common';

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
}
