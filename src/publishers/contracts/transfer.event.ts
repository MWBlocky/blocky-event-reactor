import { AbstractEvent } from '../event.factory';
export class TransferEvent extends AbstractEvent {
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