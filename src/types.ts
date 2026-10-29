export type TransactionType = 'pemasukan' | 'pengeluaran';
export type TransactionStatus = 'approved' | 'pending';
export type POV = 'client' | 'admin';

export interface Transaction {
  id: string;
  date: string;
  desc: string;
  type: TransactionType;
  category: string;
  method: string;
  amount: number;
  receiptName: string;
  receiptDataUrl?: string;
  status: TransactionStatus;
  coaCode: string;
  auditorNote: string;
  verifiedBy: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
