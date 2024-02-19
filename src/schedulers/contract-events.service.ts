import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { CronJobStatus, SchedulerType } from '../common/enums/scheduler';
import { SchedulerUtil } from '../common/utils/scheduler.util';
import { ContractsProcessorService } from '../core/contracts-processor.service';

@Injectable()
export class ContractEventsService {
  private logger = new Logger('ContractEventsService');
  private cronJobStatus = {
    status: CronJobStatus.IDLE,
  };

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
    if (this.cronJobStatus.status === CronJobStatus.RUNNING) {
      this.logger.debug('Contract events scheduler is already running');
      return;
    }
    this.logger.debug('Contract events scheduler called');
    try {
      this.cronJobStatus.status = CronJobStatus.RUNNING;
      await this.processorService.processSignedTransactionPropositionCreation();
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
    } finally {
      this.cronJobStatus.status = CronJobStatus.IDLE;
    }
  }
}
