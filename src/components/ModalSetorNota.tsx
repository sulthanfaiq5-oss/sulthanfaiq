import React, { useState } from 'react';
import { X, Receipt, Camera, Upload, AlertTriangle } from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { CATEGORY_OPTIONS, PAYMENT_METHODS } from '../data/initialData';

interface ModalSetorNotaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Transaction, 'id' | 'status' | 'coaCode' | 'auditorNote' | 'verifiedBy'>) => void;
  isPeriodLocked: boolean;
}

export const ModalSetorNota: React.FC<ModalSetorNotaProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isPeriodLocked,
}) => {
  const [type, setType] = useState<TransactionType>('pengeluaran');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState<number | ''>('');
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptDataUrl, setReceiptDataUrl] = useState<string | undefined>(undefined);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setReceiptDataUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setReceiptDataUrl(undefined);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPeriodLocked) return;

    if (!desc.trim()) return;
    const numAmount = typeof amount === 'number' ? amount : parseFloat(String(amount));
    if (isNaN(numAmount) || numAmount <= 0) return;

    const receiptName = receiptFile
      ? receiptFile.name
      : `struk-nota-${Math.floor(100 + Math.random() * 900)}.jpg`;

    onSubmit({
      desc: desc.trim(),
      date,
      type,
      category,
      method,
      amount: numAmount,
      receiptName,
      receiptDataUrl,
    });

    // Reset form
    setDesc('');
    setAmount('');
    setReceiptFile(null);
    setReceiptDataUrl(undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold">Setor Nota / Struk Bukti Transaksi</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isPeriodLocked && (
          <div className="p-4 bg-rose-50 border-b border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>
              Periode buku kas sedang <strong>DITUTUP (LOCKED)</strong> oleh auditor. Buka kunci periode untuk menyetor transaksi baru.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Jenis Transaksi *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label
                className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer font-medium transition ${
                  type === 'pengeluaran'
                    ? 'border-rose-400 bg-rose-50/50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="tx_type"
                  value="pengeluaran"
                  checked={type === 'pengeluaran'}
                  onChange={() => setType('pengeluaran')}
                  className="text-rose-600"
                />
                <span className="text-rose-700 font-bold">Pengeluaran / Beban</span>
              </label>
              <label
                className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer font-medium transition ${
                  type === 'pemasukan'
                    ? 'border-emerald-400 bg-emerald-50/50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="tx_type"
                  value="pemasukan"
                  checked={type === 'pemasukan'}
                  onChange={() => setType('pemasukan')}
                  className="text-emerald-600"
                />
                <span className="text-emerald-700 font-bold">Pemasukan / Dana Masuk</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Deskripsi / Keperluan Belanja *
            </label>
            <input
              type="text"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Contoh: Belanja Snack Konsumsi Seminar & Air Mineral"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Tanggal Transaksi *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Nominal Riil (Rp) *
              </label>
              <input
                type="number"
                min="1000"
                step="500"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="150000"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Metode Bayar *
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Usulan Kategori Akun
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Foto Nota / Kuitansi Fisik *
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 transition p-4 rounded-xl text-center bg-slate-50 relative">
              <Camera className="w-6 h-6 mx-auto text-blue-600 mb-1" />
              <p className="text-xs text-slate-700 font-semibold">
                {receiptFile ? receiptFile.name : 'Pilih foto struk / file kuitansi'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, atau PDF (Maks. 5 MB)</p>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="mt-2 text-xs w-full text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-[11px] file:bg-blue-50 file:text-blue-700 file:font-semibold cursor-pointer"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-[11px] leading-relaxed">
            <strong>Perhatian:</strong> Nota yang disetor akan masuk ke antrean verifikasi akuntan DOKU untuk dicocokkan sebelum memengaruhi saldo kas akhir.
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPeriodLocked}
              className={`px-4 py-2 text-white rounded-xl font-bold shadow-sm transition ${
                isPeriodLocked
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-blue-900 hover:bg-blue-800'
              }`}
            >
              Kirim ke Akuntan DOKU
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
