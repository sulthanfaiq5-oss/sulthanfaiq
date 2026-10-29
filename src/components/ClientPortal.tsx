import React, { useState } from 'react';
import {
  Receipt,
  FileSpreadsheet,
  ShieldCheck,
  FileText,
  Landmark,
  ArrowDownLeft,
  ArrowUpRight,
  BookOpenCheck,
  Route,
  Printer,
  Paperclip,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { Transaction } from '../types';
import { formatIDR } from '../data/initialData';

interface ClientPortalProps {
  transactions: Transaction[];
  incomeSum: number;
  incomeCount: number;
  expenseSum: number;
  expenseCount: number;
  pendingCount: number;
  realBalance: number;
  isPeriodLocked: boolean;
  onOpenSetorNota: () => void;
  onOpenReconcile: () => void;
  onOpenReport: () => void;
  onPreviewReceipt: (transaction: Transaction) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  transactions,
  incomeSum,
  incomeCount,
  expenseSum,
  expenseCount,
  pendingCount,
  realBalance,
  isPeriodLocked,
  onOpenSetorNota,
  onOpenReconcile,
  onOpenReport,
  onPreviewReceipt,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending'>('all');

  const filteredTransactions = transactions.filter((t) => {
    if (filterStatus === 'approved') return t.status === 'approved';
    if (filterStatus === 'pending') return t.status === 'pending';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col">
      {/* Client Top Nav */}
      <header className="bg-white border-b border-slate-200 sticky top-12 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-900 to-indigo-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              D
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-base">
                  DOKU Financial
                </span>
                <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                  Portal Klien
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Klien Aktif: <strong className="text-slate-800">BEM Universitas Indonesia Merdeka</strong> • Paket Jasa: Standard Monthly Bookkeeping
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSetorNota}
              className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm"
            >
              <Receipt className="w-4 h-4" />
              <span>Setor Nota / Struk Baru</span>
            </button>
            <button
              onClick={onOpenReconcile}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 transition flex items-center gap-1.5 hidden sm:flex"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Sinkron Mutasi Bank</span>
            </button>
            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-xs">
                BM
              </div>
              <div className="hidden md:block text-left text-xs">
                <p className="font-bold text-slate-900 leading-tight">
                  M. Ihsan (Bendahara)
                </p>
                <p className="text-[11px] text-slate-500">Panitia Dies Natalis 2026</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Client Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-6 flex-1">
        {/* Informative Greeting Banner */}
        <div className="rounded-2xl p-4 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-800/60 border border-blue-700 shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold">
                Layanan Pengelolaan Keuangan & Akuntansi DOKU Aktif
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                Seluruh nota belanja Anda diaudit, dijurnal, dan dicocokkan dengan mutasi bank oleh tim akuntan profesional.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={onOpenReport}
              className="flex-1 md:flex-initial bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lihat Laporan LPJ Sah</span>
            </button>
          </div>
        </div>

        {/* Financial Metrics Cards (Client Saldo Real) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Kas Riil Tervalidasi */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-500">Saldo Kas Riil Sah</span>
              <h3 className="text-xl font-black text-slate-900 font-mono mt-1">
                {formatIDR(realBalance)}
              </h3>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Tervalidasi Auditor DOKU
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
          </div>

          {/* Total Pemasukan */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-500">Pemasukan Disahkan</span>
              <h3 className="text-xl font-black text-emerald-600 font-mono mt-1">
                {formatIDR(incomeSum)}
              </h3>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {incomeCount} Penerimaan Dana Sah
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
          </div>

          {/* Total Pengeluaran Sah */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-500">Pengeluaran Disahkan</span>
              <h3 className="text-xl font-black text-rose-600 font-mono mt-1">
                {formatIDR(expenseSum)}
              </h3>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                {expenseCount} Transaksi Belanja Sah
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          {/* Status Tutup Buku Periode */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-500">Status Buku Kas Periode</span>
              <h3
                className={`text-sm font-bold mt-1 ${
                  isPeriodLocked ? 'text-emerald-700' : 'text-blue-900'
                }`}
              >
                {isPeriodLocked ? 'Buku Ditutup (Locked)' : 'Buku Terbuka (Audit Berjalan)'}
              </h3>
              <span className="text-[11px] text-amber-600 font-medium mt-0.5 block">
                {pendingCount} Nota Menunggu Audit DOKU
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <BookOpenCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Accounting Workflow Stepper for Client */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
            <Route className="w-4 h-4 text-blue-600" />
            <span>Alur Transparansi Jasa Pembukuan Organisasi Anda</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-bold text-[10px] flex items-center justify-center">
                  1
                </span>
                <strong className="text-blue-950">Setor Nota & Struk</strong>
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                Unggah foto struk belanja panitia dan mutasi transfer bank secara praktis.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                  2
                </span>
                <strong className="text-slate-800">Pemeriksaan Auditor</strong>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Akuntan DOKU menguji keaslian nota, pos akun beban, dan mencegah belanja duplikat.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                  3
                </span>
                <strong className="text-slate-800">Penjurnalan Kas Sah</strong>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Saldo kas otomatis terbarui dan dicocokkan dengan buku besar akuntansi.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                  4
                </span>
                <strong className="text-emerald-950">Terbit LPJ Sah (PDF)</strong>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Laporan pertanggungjawaban bertanda tangan digital siap dipertanggungjawabkan.
              </p>
            </div>
          </div>
        </div>

        {/* Buku Kas Klien Table (Transactions) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Buku Kas Transaksi Organisasi
              </h3>
              <p className="text-xs text-slate-500">
                Daftar transaksi yang disetor panitia dan status verifikasi dari tim akuntansi DOKU.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option value="all">Semua Status</option>
                <option value="approved">Hanya yang Sah (Tervalidasi)</option>
                <option value="pending">Menunggu Audit DOKU</option>
              </select>
              <button
                onClick={onOpenReport}
                className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak LPJ Kas</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Kode Transaksi</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Deskripsi Transaksi</th>
                  <th className="py-3 px-4">Kategori Beban / Pendapatan</th>
                  <th className="py-3 px-4">Bukti Nota Fisik</th>
                  <th className="py-3 px-4 text-right">Nominal</th>
                  <th className="py-3 px-4 text-center">Status Audit DOKU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-400">
                      Tidak ada transaksi yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((t) => {
                    const isApproved = t.status === 'approved';
                    const isIncome = t.type === 'pemasukan';

                    return (
                      <tr key={t.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono font-bold text-[11px] text-slate-700">
                          {t.id}
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                          {t.date}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {t.desc}
                          <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                            Metode: {t.method} • {t.auditorNote}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[11px]">
                            {t.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => onPreviewReceipt(t)}
                            className="text-blue-700 hover:text-blue-900 underline flex items-center gap-1 font-semibold text-[11px]"
                          >
                            <Paperclip className="w-3 h-3" />
                            <span className="truncate max-w-[140px]">{t.receiptName}</span>
                          </button>
                        </td>
                        <td
                          className={`py-3 px-4 text-right font-mono font-bold ${
                            isIncome ? 'text-emerald-600' : 'text-slate-900'
                          }`}
                        >
                          {isIncome ? '+' : '-'} {formatIDR(t.amount)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {isApproved ? (
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                              <CheckCircle className="w-3 h-3 text-emerald-700" />
                              <span>Tervalidasi</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                              <Clock className="w-3 h-3 text-amber-700" />
                              <span>Diaudit DOKU</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
