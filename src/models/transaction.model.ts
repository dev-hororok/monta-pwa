export type TransactionType = 'Purchase' | 'Sell';

export interface ITransactionRecord {
  amount: number;
  count: number;
  notes: string;
  transaction_record_id: string; // bigint라 string으로 옴
  transaction_type: TransactionType;
  balance_after_transaction: number;
}
