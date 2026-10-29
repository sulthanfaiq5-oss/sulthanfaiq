import React from 'react';
import { Building2, Calculator, RotateCcw } from 'lucide-react';
import { POV } from '../types';

interface HeaderPOVProps {
  currentPOV: POV;
  onSwitchPOV: (pov: POV) => void;
  pendingCount: number;
  onResetData: () => void;
}

export const HeaderPOV: React.FC<HeaderPOVProps> = ({
  currentPOV,
  onSwitchPOV,
  pendingCount,
  onResetData,
}) => {
  return (
    <aside className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800 text-white px-4 py-2.5 shadow-md no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div className="text-xs">
            <span className="text-slate-400">Mode Simulasi Peran:</span>
            <strong
              className={`font-bold ml-1 uppercase ${
                currentPOV === 'client' ? 'text-blue-400' : 'text-emerald-400'
              }`}
            >
              {currentPOV === 'client'
                ? 'POV Klien (Pelanggan / Bendahara Organisasi)'
                : 'POV Akuntan / Auditor DOKU'}
            </strong>
          </div>
          <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 hidden md:inline font-mono">
            Shared Accounting Engine Active
          </span>
        </div>

        {/* Quick Switcher Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => onSwitchPOV('client')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold transition duration-200 ${
                currentPOV === 'client'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>POV Klien (Organisasi/UMKM)</span>
            </button>
            <button
              onClick={() => onSwitchPOV('admin')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition duration-200 ${
                currentPOV === 'admin'
                  ? 'bg-emerald-600 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>POV Akuntan / Auditor DOKU</span>
              {pendingCount > 0 && (
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={onResetData}
            title="Reset ke data awal"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px]">Reset Demo</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
