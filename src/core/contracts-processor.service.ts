import { Injectable, Logger } from '@nestjs/common';
import { Events } from '../common/enums/events';
import { IntegrationsService } from '../integrations/integrations.service';

interface DepositEvent {
  args: any[];
  transactionIndex: number;
  blockNumber: number;
}

@Injectable()
export class ContractsProcessorService {
  private logger = new Logger('ContractsProcessorService');
  constructor(
    private integrationsService: IntegrationsService,
  ) {}

  async processSignedTransactionPropositionCreation(): Promise<any> {
    const events: DepositEvent[] = await this.integrationsService.getContractEvents(
      Events.CONTRACT_DEPOSIT_EVENT,
    );
    const newTxs = [];
    for (const event of events) {
      try {
        const transaction = await this.integrationsService.createTransaction(
          {
            data: event.args[0],
            value: event.args[1],
            to: event.args[2],
          },
        );
        newTxs.push(transaction);
      }
     catch (e) {
        this.logger.error(`Error processing transaction: ${e}`);
      }
    }
    return newTxs;
  }
}