import { Injectable } from '@nestjs/common';
import { Events } from '../common/enums/events';
import { IntegrationsService } from '../integrations/integrations.service';

@Injectable()
export class DataProviderService {
  constructor(
    private integrationsService: IntegrationsService,
  ){}

  async getDataForEvent(eventName: string): Promise<any> {
    switch (eventName) {
      case Events.CONTRACT_NEW_EVENT:
        return await this.integrationsService.getContractEvents("TestEvent");
      case Events.SAFE_SIGN_TRANSACTION:
        return "mocked data for Safe.Transaction event";
      default:
        return null;
    }
  }
}