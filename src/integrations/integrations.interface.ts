export interface TransactionData {
  to: string;
  value: string;
  data: string;
  nonce?: number;
}

export interface Event {
  blockNumber: number;
  transactionIndex: number;
  args: string[];
}
