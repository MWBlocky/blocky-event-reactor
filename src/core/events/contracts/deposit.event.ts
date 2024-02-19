import { AbstractEvent } from '../abstract.event';

export class DepositEvent extends AbstractEvent {
  constructor(
    public name: string,
    public data: any,
  ) {
    super(name, data);
  }

  canBeEmitted(): boolean {
    //trzeba przefiltrować, żeby zostały eventy nowsze niż ostatnio sprawdzone (dane z bazy)
    return true;
  }
}