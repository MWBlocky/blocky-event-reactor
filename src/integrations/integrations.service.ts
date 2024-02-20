import { Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { Web3ConfigService } from '../common/config/web3-config.service';
import { EthersService } from './ethers-rpc/ethers.service';
import { SafeSdkService } from './safe-sdk/safe-sdk.service';
import { DepositEvent } from '../common/interfaces/events';
import { TransactionData } from '../common/interfaces/transactions';

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
    const mappedEvents: DepositEvent[] = events.map((event: any) => {
      return {
        blockNumber: event.blockNumber,
        transactionIndex: event.transactionIndex,
        args: event.args
      }
    });
    return mappedEvents;
  }

  async createTransaction(data: TransactionData) {
    const { botPrivateKey, rpcUrl, safeAddress, chainId } = this.web3ConfigService.network;
    const ethers = this.ethersService.ethers;
    const provider = this.ethersService.getProvider(rpcUrl);

    const owner1Signer = new ethers.Wallet(botPrivateKey, provider);
    const senderAddress = await owner1Signer.getAddress();

    const protocolKitOwner1 = await this.safeSdkService.createProtocolKit(ethers, owner1Signer);
    const safeContractNonce = await this.ethersService.getSafeContractNonce(safeAddress, owner1Signer);

    const newTx = await this.safeSdkService.createTransaction(protocolKitOwner1,{
        nonce: safeContractNonce,
        ...data
      });

    const safeTxHash = this.ethersService.hashSafeTx(chainId, safeAddress, newTx);
    const senderSignature = await protocolKitOwner1.signHash(safeTxHash);

    const safeApiKit = await this.safeSdkService.createSafeApiKit(chainId);
    await safeApiKit.proposeTransaction({
      safeAddress,
      safeTransactionData: newTx.data,
      safeTxHash,
      senderAddress,
      senderSignature: senderSignature.data,
    })

    return await safeApiKit.getTransaction(safeTxHash)
  }
}
