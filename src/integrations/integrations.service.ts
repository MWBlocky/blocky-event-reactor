import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { Web3ConfigService } from '../common/config/web3-config.service';
import { EthersService } from './ethers-rpc/ethers.service';
import { SafeSdkService } from './safe-sdk/safe-sdk.service';

@Injectable()
export class IntegrationsService {
  constructor(
    private web3ConfigService: Web3ConfigService,
    private ethersService: EthersService,
    private safeSdkService: SafeSdkService
  ){}

  async getContractEvents(eventName: string) {
    const url = this.web3ConfigService.network.rpcUrl;
    const contractAddress = this.web3ConfigService.network.contractAddress;
    const contractAbi = this.web3ConfigService.network.contractAbi;

    const provider = this.ethersService.getProvider(url);

    const abiPath :string = path.resolve(__dirname, contractAbi);
    const abi = JSON.parse(fs.readFileSync(abiPath, {encoding:'utf8'}));

    const contract = this.ethersService.getContract(abi, contractAddress, provider);
    const events = await this.ethersService.getContractEvents(contract, eventName);

    return events;
  }

  async getPendingTransactions() {
    const chainId = this.web3ConfigService.network.chainId;
    const safeAddress = this.web3ConfigService.network.safeAddress;
    return await this.safeSdkService.getPendingTransactions(chainId, safeAddress);
  }

  async confirmTransaction(safeTxHash: any) {
    const chainId = this.web3ConfigService.network.chainId;
    const safeApiKit = this.safeSdkService.createSafeApiKit(chainId);
    const ethers = this.ethersService.ethers;
    const safeAddress = this.web3ConfigService.network.safeAddress;
    const url = this.web3ConfigService.network.rpcUrl;
    const botPrivateKey = this.web3ConfigService.network.botPrivateKey;
    const botWallet = new ethers.Wallet(botPrivateKey, this.ethersService.getProvider(url));
    const ethAdapterBot = this.safeSdkService.createEthAdapter(ethers, botWallet.getAddress());
    const protocolKitBot = await this.safeSdkService.createSafe(ethAdapterBot, safeAddress);
    const signature = await protocolKitBot.signHash(safeTxHash)
    const confirmedTx = this.safeSdkService.confirmTransaction(safeApiKit, safeTxHash, signature.data);

    return confirmedTx;
  }
}