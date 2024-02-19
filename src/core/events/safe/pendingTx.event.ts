import { AbstractEvent } from '../abstract.event';

export class PendingTxEvent extends AbstractEvent {
  constructor(
    public name: string,
    public data: any,
  ) {
    super(name, data);
  }

  canBeEmitted(): boolean {
    //sprawdzam ich status czy są pending i jeśli są to podpisuje
    return true;
  }
}