import React from 'react';
import { X, Printer, CheckCircle, FileCheck2 } from 'lucide-react';
import { Transaction } from '../types';
import { formatIDR } from '../data/initialData';

interface ModalReportProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  incomeSum: number;
  incomeCount: number;
  expenseSum: number;
  expenseCount: number;
  realBalance: number;
}

export const ModalReport: React.FC<ModalReportProps> = ({
  isOpen,
  onClose,
  transactions,
  incomeSum,
  incomeCount,
  expenseSum,
  expenseCount,
  realBalance,
}) => {
  if (!isOpen) return null;

  // Breakdown per category
  const catMap: Record<string, number> = {};
  transactions
    .filter((t) => t.status === 'approved' && t.type === 'pengeluaran')
    .forEach((t) => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto custom-scroll border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Bar (Hidden in Print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print sticky top-0 z-10 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold">
              Laporan Realisasi Kas & Pertanggungjawaban Resmi (LPJ)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div
          id="printable-report-modal"
          className="p-8 sm:p-12 font-sans text-xs space-y-6 bg-white text-slate-800"
        >
          {/* Letterhead Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-blue-900 text-white rounded-lg flex items-center justify-center font-bold text-base shadow-sm">
                  D
                </div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  DOKU FINANCIAL SERVICES
                </h1>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Layanan Tata Kelola Akuntansi, Audit Nota, dan Akuntabilitas Finansial
              </p>
              <p className="text-[11px] text-slate-500">
                Izin Akuntan Register / KJA No. 04/DOKU-FIN/2026 • Jakarta Pusat
              </p>
            </div>
            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded">
                LAPORAN ARUS KAS SAH
              </span>
              <p className="font-mono text-xs font-bold text-slate-800 mt-2">
                DOC/2026/LPJ-BEM-001
              </p>
              <p className="text-[11px] text-slate-500">
                Periode: <strong className="text-slate-800">Oktober 2026</strong>
              </p>
            </div>
          </div>

          {/* Entity Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Entitas / Klien:
              </span>
              <p className="font-bold text-slate-900 text-sm">
                BEM Universitas Indonesia Merdeka
              </p>
              <p className="text-slate-600 text-xs">
                Kepanitiaan Dies Natalis & Rapat Kerja Mahasiswa 2026
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                Status Opini Audit DOKU:
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-100 font-bold px-2.5 py-1 rounded-md text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>WAJAR TANPA PENGECUALIAN (RECONCILED)</span>
              </span>
            </div>
          </div>

          {/* Cashflow Summary Table */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">
              1. Rangkuman Arus Kas & Saldo Akhir
            </h4>
            <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Pos Akun Finansial</th>
                  <th className="p-2.5 text-center">Jumlah Transaksi</th>
                  <th className="p-2.5 text-right">Nilai Total (IDR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                <tr>
                  <td className="p-2.5 font-sans font-bold text-emerald-700">
                    Total Pemasukan Kas Sah
                  </td>
                  <td className="p-2.5 text-center font-sans">
                    {incomeCount} Transaksi
                  </td>
                  <td className="p-2.5 text-right font-bold text-emerald-700">
                    {formatIDR(incomeSum)}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-bold text-rose-700">
                    Total Pengeluaran Kas Sah (Beban Operasional)
                  </td>
                  <td className="p-2.5 text-center font-sans">
                    {expenseCount} Transaksi
                  </td>
                  <td className="p-2.5 text-right font-bold text-rose-700">
                    - {formatIDR(expenseSum)}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-300 font-mono text-xs">
                <tr>
                  <td colSpan={2} className="p-2.5 text-right font-bold font-sans">
                    SALDO AKHIR KAS RIIL (TERTUTUP):
                  </td>
                  <td className="p-2.5 text-right font-black text-slate-900">
                    {formatIDR(realBalance)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Detail Breakdown per Category */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">
              2. Rincian Realisasi Pengeluaran per Kategori
            </h4>
            <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Kategori Beban</th>
                  <th className="p-2.5">Persentase dari Total Belanja</th>
                  <th className="p-2.5 text-right">Realisasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                {Object.keys(catMap).length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-3 text-center text-slate-400">
                      Belum ada realisasi pengeluaran yang disahkan.
                    </td>
                  </tr>
                ) : (
                  Object.entries(catMap).map(([cat, val]) => {
                    const pct = expenseSum > 0 ? ((val / expenseSum) * 100).toFixed(1) : '0';
                    return (
                      <tr key={cat}>
                        <td className="p-2.5 font-bold text-slate-800">{cat}</td>
                        <td className="p-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-blue-600 h-full rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="font-mono text-slate-500">{pct}%</span>
                          </div>
                        </td>
                        <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                          {formatIDR(val)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Official Signatures with Digital Stamps */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs">
            <div className="text-center">
              <p className="text-slate-500">Pihak Klien / Bendahara</p>
              <p className="font-bold text-slate-900 mt-1">
                BEM Universitas Indonesia Merdeka
              </p>
              <div className="h-16 flex items-center justify-center">
                <span className="font-mono text-[10px] text-slate-400 italic">
                  [Tanda Tangan Digital Klien]
                </span>
              </div>
              <p className="font-bold text-slate-900 underline">M. Ihsan</p>
              <p className="text-[10px] text-slate-500">NIM: 22010892 • Bendahara Umum</p>
            </div>

            <div className="text-center">
              <p className="text-slate-500">Diverifikasi & Disahkan Oleh Akuntan</p>
              <p className="font-bold text-blue-900 mt-1">DOKU Financial Services</p>
              <div className="h-16 flex items-center justify-center">
                <div className="border-2 border-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg text-emerald-800 font-mono font-bold text-[10px] -rotate-2 shadow-xs leading-tight">
                  ★ DOKU AUDITED & VERIFIED ★<br />
                  SAK EMKM COMPLIANT
                </div>
              </div>
              <p className="font-bold text-slate-900 underline">
                Rian Pratama, S.Ak., CA
              </p>
              <p className="text-[10px] text-slate-500">
                Managing Accountant Reg. #098812
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
