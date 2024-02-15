import { EthersService } from './ethers-rpc/ethers.service';
import { Injectable } from '@nestjs/common';
import { Events } from '../common/enums/events';

@Injectable()
export class IntegrationsDataProviderService {
  constructor(
    private ethersService: EthersService,
  ){}

  async getDataForEvent(eventName: string): Promise<any> {
    switch (eventName) {
      case Events.CONTRACT_NEW_EVENT:
        return await this.ethersService.getContractEvents("TestEvent");
      case Events.SAFE_SIGN_TRANSACTION:
        return "mocked data for Safe.Transaction event";
      default:
        return null;
    }
  }
}