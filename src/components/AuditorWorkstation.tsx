import React, { useState } from 'react';
import {
  Briefcase,
  Lock,
  Unlock,
  FileClock,
  BookMarked,
  Scale,
  BadgeDollarSign,
  Stamp,
  CheckCheck,
  Eye,
  Check,
  FileCheck2,
} from 'lucide-react';
import { Transaction } from '../types';
import { formatIDR, COA_OPTIONS } from '../data/initialData';

interface AuditorWorkstationProps {
  transactions: Transaction[];
  pendingCount: number;
  approvedCount: number;
  realBalance: number;
  isPeriodLocked: boolean;
  onToggleLockPeriod: () => void;
  onApproveTransaction: (id: string, coaCode: string) => void;
  onRejectTransaction: (id: string) => void;
  onPreviewReceipt: (transaction: Transaction) => void;
  onOpenReport: () => void;
}

export const AuditorWorkstation: React.FC<AuditorWorkstationProps> = ({
  transactions,
  pendingCount,
  approvedCount,
  realBalance,
  isPeriodLocked,
  onToggleLockPeriod,
  onApproveTransaction,
  onRejectTransaction,
  onPreviewReceipt,
  onOpenReport,
}) => {
  // Keep local COA selection per pending transaction
  const [coaSelections, setCoaSelections] = useState<Record<string, string>>({});

  const pendingTransactions = transactions.filter((t) => t.status === 'pending');
  const approvedTransactions = transactions.filter((t) => t.status === 'approved');

  const handleCoaChange = (id: string, coa: string) => {
    setCoaSelections((prev) => ({ ...prev, [id]: coa }));
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Admin Top Nav */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-12 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">
                  DOKU Workstation
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Meja Akuntan & Auditor
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Auditor Utama: <strong className="text-slate-200">Rian Pratama, S.Ak., CA</strong> • Standar SAK EMKM / Akuntansi Nirlaba
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleLockPeriod}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 border shadow-sm ${
                isPeriodLocked
                  ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-200 border-rose-700'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {isPeriodLocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-rose-400" />
                  <span>Buka Kunci Periode</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kunci Periode (Tutup Buku)</span>
                </>
              )}
            </button>
            <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-slate-950 flex items-center justify-center font-black text-xs">
                RP
              </div>
              <span className="text-xs font-bold text-white hidden md:inline">
                Auditor Internal
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-6 flex-1">
        {/* Metrics Overview for Accountant */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-500">
                Antrean Nota Disetor Klien
              </span>
              <h3 className="text-xl font-black text-amber-600 font-mono mt-1">
                {pendingCount} Nota
              </h3>
              <span className="text-[11px] text-slate-500">
                Menunggu pemeriksaan fisik
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileClock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-500">
                Total Transaksi Sah Masuk Buku
              </span>
              <h3 className="text-xl font-black text-slate-900 font-mono mt-1">
                {approvedCount} Jurnal
              </h3>
              <span className="text-[11px] text-emerald-600 font-medium">
                Masuk Buku Besar
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-500">
                Saldo Akhir Buku Kas
              </span>
              <h3 className="text-xl font-black text-emerald-700 font-mono mt-1">
                {formatIDR(realBalance)}
              </h3>
              <span className="text-[11px] text-slate-500">
                Reconciled with Bank Statement
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-500">
                Billing Jasa Pembukuan
              </span>
              <h3 className="text-xl font-black text-slate-900 font-mono mt-1">
                Rp 750.000
              </h3>
              <span className="text-[11px] text-emerald-600 font-bold">
                Status: Terbayar (Paket Okt)
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BadgeDollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Main Operational Queue (Queue Verification Meja Kerja) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Stamp className="w-4 h-4 text-amber-500" />
                <span>Meja Kerja Auditor: Antrean Nota & Dokumen Belanja Masuk</span>
              </h3>
              <p className="text-xs text-slate-500">
                Periksa foto bukti kuitansi yang disetor panitia, tentukan akun beban yang sesuai, dan sahkan ke Buku Besar Kas.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 self-start sm:self-auto">
              {pendingCount} Nota Perlu Tindakan
            </span>
          </div>

          <div className="space-y-4">
            {pendingTransactions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 border border-dashed rounded-xl bg-slate-50 space-y-1.5">
                <CheckCheck className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-800">
                  Semua nota dan setoran belanja telah diaudit!
                </p>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Buku kas dan rekening koran klien saat ini berada dalam kondisi seimbang (Reconciled).
                </p>
              </div>
            ) : (
              pendingTransactions.map((t) => {
                const selectedCoa = coaSelections[t.id] || t.coaCode || COA_OPTIONS[0];

                return (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 pb-3 border-b border-amber-200/70">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded font-bold">
                            {t.id}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {t.desc}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            • {t.date}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Disetor via {t.method} • Kategori Usulan: <strong>{t.category}</strong>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 font-medium block">
                          Nominal Tertera:
                        </span>
                        <span className="text-base font-black font-mono text-rose-700">
                          {formatIDR(t.amount)}
                        </span>
                      </div>
                    </div>

                    {/* Auditor Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs items-center">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Verifikasi Bukti Kuitansi Fisik:
                        </label>
                        <button
                          onClick={() => onPreviewReceipt(t)}
                          className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-slate-800 font-semibold flex items-center gap-1.5 w-full transition shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">Tinjau {t.receiptName}</span>
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Tetapkan Kode COA Akuntansi:
                        </label>
                        <select
                          value={selectedCoa}
                          onChange={(e) => handleCoaChange(t.id, e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-slate-800 font-medium text-xs focus:ring-2 focus:ring-blue-500"
                        >
                          {COA_OPTIONS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2 pt-2 md:pt-4">
                        <button
                          onClick={() => onApproveTransaction(t.id, selectedCoa)}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Sahkan Jurnal</span>
                        </button>
                        <button
                          onClick={() => onRejectTransaction(t.id)}
                          className="px-3 py-2 border border-slate-300 hover:bg-white text-rose-700 font-bold rounded-xl transition"
                        >
                          Tolak Nota
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* General Ledger / Jurnal Umum Akuntansi */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Jurnal Umum (General Ledger) Resmi
              </h3>
              <p className="text-xs text-slate-500">
                Setiap transaksi sah telah dipetakan ke akun debit-kredit dan terkunci dari pengubahan liar.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenReport}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cetak Laporan Keuangan Sah</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">No. Ref Jurnal</th>
                  <th className="py-3 px-4">Tanggal Jurnal</th>
                  <th className="py-3 px-4">Keterangan Transaksi & Akun</th>
                  <th className="py-3 px-4">Kode COA & Kategori</th>
                  <th className="py-3 px-4 text-right">Debit (Masuk)</th>
                  <th className="py-3 px-4 text-right">Kredit (Keluar)</th>
                  <th className="py-3 px-4 text-center">Status Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {approvedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-slate-400 font-sans">
                      Belum ada transaksi yang disahkan ke buku besar.
                    </td>
                  </tr>
                ) : (
                  approvedTransactions.map((t) => {
                    const isIncome = t.type === 'pemasukan';
                    return (
                      <tr key={t.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-bold text-slate-800">{t.id}</td>
                        <td className="py-3 px-4 text-slate-500">{t.date}</td>
                        <td className="py-3 px-4 font-sans">
                          <strong className="text-slate-900 block">{t.desc}</strong>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Diverifikasi oleh: {t.verifiedBy}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{t.coaCode}</td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-600">
                          {isIncome ? formatIDR(t.amount) : '-'}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-rose-600">
                          {!isIncome ? formatIDR(t.amount) : '-'}
                        </td>
                        <td className="py-3 px-4 text-center font-sans">
                          <span className="inline-flex items-center gap-1 text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Sah</span>
                          </span>
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
