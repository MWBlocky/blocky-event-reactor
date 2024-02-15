import { AbstractEvent } from '../event.factory';
export class TransactionEvent extends AbstractEvent {
  constructor(
    public name: string,
    public data: any,
  ) {
    super(name, data);
  }

  canBeEmitted(): boolean {
    return true;
  }
}