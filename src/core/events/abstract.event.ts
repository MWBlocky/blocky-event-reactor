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
