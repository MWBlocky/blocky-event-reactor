import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerType } from '../common/enums/scheduler';
import { SchedulerUtil } from '../common/utils/scheduler.util';
import { ContractsProcessorService } from '../core/contracts-processor.service';

@Injectable()
export class ContractEventsService {
  private logger = new Logger('ContractEventsService');

  constructor(
    private schedulerUtils: SchedulerUtil,
    private schedulerRegistry: SchedulerRegistry,
    private processorService: ContractsProcessorService,
  ) {
  }

  registerCronJob(eventName: string, schedulerType: SchedulerType) {
    this.logger.log(`Scheduler registered for event: ${eventName}`);
    this.schedulerUtils.addCronJob(
      eventName,
      schedulerType,
      () => this.handleCron(eventName),
      this.schedulerRegistry,
    );
  }

  async handleCron(eventName: string) {
    this.logger.debug('Contract events scheduler called');
    this.processorService.processSignedTransactionPropositionCreation()
      .then((tx: string) => {
        this.logger.log('Created: ' + tx.length || 0 + ' transactions');
      });
  }
}