import { Injectable } from '@nestjs/common';

export class AbstractEvent {
  constructor(
    public name: string,
    public data: any,
  ) {
  }
  canBeEmitted(): boolean {
    throw new Error('Method not implemented.');
  }
}

import { TransferEvent } from './contracts/transfer.event';
import { TransactionEvent } from './safe/transaction.event';
import { Events } from '../common/enums/events';

@Injectable()
export class EventFactory {
  createEvent(eventName: string, data: any): AbstractEvent {
    switch (eventName) {
      case Events.CONTRACT_NEW_EVENT:
        return new TransferEvent(eventName, data);
      case Events.SAFE_SIGN_TRANSACTION:
        return new TransactionEvent(eventName, data);
      default:
        throw new Error(`Event ${eventName} not found`);
    }
  }
}

