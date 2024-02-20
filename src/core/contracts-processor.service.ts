import { Injectable, Logger } from '@nestjs/common';
import { Events } from '../common/enums/events';
import { IntegrationsService } from '../integrations/integrations.service';
import { StorageService } from '../storage/storage.service';
import { DepositEvent } from './contracts-processor.interface';

@Injectable()
export class ContractsProcessorService {
  private logger = new Logger('ContractsProcessorService');
  constructor(
    private integrationsService: IntegrationsService,
    private storageUtil: StorageService,
  ) {
  }

  async processSignedTransactionCreation(): Promise<void> {
    const {blockNumber, transactionIndex} = await this.storageUtil.readStorage();
    this.logger.log(`Last processed block: ${blockNumber}`);

    const events: DepositEvent[] = await this.integrationsService.getContractEvents(
      Events.CONTRACT_DEPOSIT_EVENT,
    );
    const filteredEvents = this.filterEvents(events, blockNumber, transactionIndex);
    const newTxs = await this.createTransactions(filteredEvents);
    this.logger.log(`Created: ${newTxs.length} transactions`);
  }
  filterEvents(events: DepositEvent[], blockNumber: number, transactionIndex: number): DepositEvent[] {
    return events.filter(
      (event) => event.blockNumber > blockNumber
        || (event.blockNumber === blockNumber && event.transactionIndex > transactionIndex),
    );
  }
  async createTransactions(events: DepositEvent[]): Promise<string[]> {
    const newTxs:string[] = [];
    for (const event of events) {
      try {
        const data = event.args[0].toString();
        const value = event.args[1].toString();
        const to = event.args[2].toString();
        const transaction = await this.integrationsService.createTransaction({data, value, to});
        newTxs.push(transaction.safeTxHash);
        await this.storageUtil.saveStorage({
          blockNumber: event.blockNumber,
          transactionIndex: event.transactionIndex,
        });
      } catch (e) {
        this.logger.error(`Error processing transaction: ${e}`);
      }
    }
    return newTxs;
  }
}
