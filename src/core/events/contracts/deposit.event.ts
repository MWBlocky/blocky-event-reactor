import { AbstractEvent } from '../abstract.event';

export class DepositEvent extends AbstractEvent {
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