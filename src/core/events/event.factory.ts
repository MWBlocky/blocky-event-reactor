import { Injectable } from '@nestjs/common';
import { Events } from '../../common/enums/events';
import { DepositEvent } from './contracts/deposit.event';
import { PendingTxEvent } from './safe/pendingTx.event';
import { AbstractEvent } from './abstract.event';

@Injectable()
export class EventFactory {
  createEvent(eventName: string, data: any): AbstractEvent {
    switch (eventName) {
      case Events.CONTRACT_NEW_EVENT:
        return new DepositEvent(eventName, data);
      case Events.SAFE_SIGN_TRANSACTION:
        return new PendingTxEvent(eventName, data);
      default:
        throw new Error(`Event ${eventName} not found`);
    }
  }
}

