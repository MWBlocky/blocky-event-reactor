import { ethers } from 'ethers';
import { Web3ConfigService } from '../../common/config/web3-config.service';
import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';

@Injectable()
export class EthersService {
  constructor(
    private web3ConfigService: Web3ConfigService,
  ) {
  }

  async getContractEvents(eventName: string) {
    const url = this.web3ConfigService.network.rpcUrl;
    const contractAddress = this.web3ConfigService.network.contractAddress;

    const provider:ethers.providers.Provider = new ethers.providers.StaticJsonRpcProvider(url);

    const ROOT_DIR = path.resolve(__dirname, '..', '..');
    const abiPath = path.resolve(
      ROOT_DIR, 'src',
      this.web3ConfigService.network.contractAbi,
    );
    const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

    const contract = new ethers.Contract(contractAddress, abi.abi, provider);
    return await contract.queryFilter(contract.filters.TestEvent(null));
  }
}
