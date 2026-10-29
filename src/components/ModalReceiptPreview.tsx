import React from 'react';
import { X, Image as ImageIcon, ReceiptText, ShieldCheck, Download } from 'lucide-react';
import { Transaction } from '../types';
import { formatIDR } from '../data/initialData';

interface ModalReceiptPreviewProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const ModalReceiptPreview: React.FC<ModalReceiptPreviewProps> = ({
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 text-xs animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
          <span className="font-bold flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-blue-400" />
            <span>Pratinjau Bukti Fisik / Kuitansi</span>
          </span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-5 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl relative space-y-3">
            {transaction.receiptDataUrl ? (
              <div className="rounded-lg overflow-hidden border border-slate-200 max-h-56 flex items-center justify-center bg-black/5">
                <img
                  src={transaction.receiptDataUrl}
                  alt={transaction.receiptName}
                  className="max-h-56 w-auto object-contain"
                />
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-2xl mx-auto flex items-center justify-center mb-2 shadow-xs">
                  <ReceiptText className="w-8 h-8" />
                </div>
                <strong className="text-slate-900 text-sm block">
                  {transaction.receiptName}
                </strong>
                <p className="text-slate-500 text-[11px] mt-1 max-w-xs mx-auto">
                  {transaction.desc}
                </p>
              </div>
            )}

            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between text-slate-500">
                <span>Kode Ref:</span>
                <span className="font-bold text-slate-800">{transaction.id}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Tanggal:</span>
                <span className="text-slate-800">{transaction.date}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Metode:</span>
                <span className="text-slate-800">{transaction.method}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Kategori:</span>
                <span className="text-slate-800">{transaction.category}</span>
              </div>
              <div className="border-t border-slate-100 pt-1.5 flex justify-between font-bold">
                <span className="text-slate-700">Nominal:</span>
                <span className={transaction.type === 'pemasukan' ? 'text-emerald-600' : 'text-rose-700'}>
                  {formatIDR(transaction.amount)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px]">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>TERVERIFIKASI FISIK DOKU</span>
              </span>
            </div>
          </div>

          <p className="text-[11px] text-center text-slate-400">
            Berkas terarsip aman di Private Storage Vault DOKU Financial Services.
          </p>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
};
