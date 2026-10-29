import React, { useState } from 'react';
import { X, FileSpreadsheet, Upload, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatIDR } from '../data/initialData';

interface ModalReconcileProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncSuccess: () => void;
  currentBalance: number;
}

export const ModalReconcile: React.FC<ModalReconcileProps> = ({
  isOpen,
  onClose,
  onSyncSuccess,
  currentBalance,
}) => {
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleStartSync = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSyncSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Sinkronisasi Rekening Koran Bank</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            Unggah berkas mutasi bank (format CSV / e-Statement PDF) dari rekening giro atau tabungan kepanitiaan Anda untuk rekonsiliasi otomatis dengan buku kas DOKU.
          </p>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="font-bold text-slate-800 block text-xs">Rekening Terdaftar:</span>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-medium">BCA Giro Kepanitiaan</span>
              <span className="font-mono font-bold text-slate-900">8831-2940-112</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 text-[11px] border-t border-slate-200 pt-1.5">
              <span>Saldo Terakhir Bank:</span>
              <span className="font-mono font-bold text-emerald-700">
                {formatIDR(currentBalance)}
              </span>
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 transition p-4 rounded-xl text-center bg-slate-50/50">
            <Upload className="w-6 h-6 mx-auto text-slate-400 mb-1" />
            <span className="text-xs text-slate-700 font-semibold block">
              {fileName || 'Pilih Berkas Rekening Koran'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Format CSV, XLS, atau PDF e-Statement</span>
            <input
              type="file"
              accept=".csv,.pdf,.xlsx,.xls"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              className="mt-2 text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-[11px] file:bg-emerald-50 file:text-emerald-700 cursor-pointer"
            />
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2 text-emerald-900 text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Sistem pencocokan otomatis DOKU akan mendeteksi perbedaan saldo kasir vs saldo mutasi mutakhir secara instan.
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition"
            >
              Batal
            </button>
            <button
              onClick={handleStartSync}
              disabled={isProcessing}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              {isProcessing ? (
                <span>Mencocokkan Mutasi...</span>
              ) : (
                <>
                  <span>Mulai Rekonsiliasi Kas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
