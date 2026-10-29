import React from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let bgStyle = 'bg-slate-900 text-white border border-slate-800';
        let Icon = Info;

        if (toast.type === 'success') {
          bgStyle = 'bg-emerald-600 text-white shadow-emerald-950/20';
          Icon = CheckCircle2;
        } else if (toast.type === 'error') {
          bgStyle = 'bg-rose-600 text-white shadow-rose-950/20';
          Icon = AlertCircle;
        } else if (toast.type === 'warning') {
          bgStyle = 'bg-amber-600 text-white shadow-amber-950/20';
          Icon = AlertTriangle;
        }

        return (
          <div
            key={toast.id}
            className={`p-3.5 rounded-xl shadow-xl flex items-start gap-2.5 text-xs font-medium transition-all duration-300 pointer-events-auto ${bgStyle}`}
          >
            <Icon className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="flex-1 leading-snug">{toast.message}</span>
            <button
              onClick={() => onDismiss(toast.id)}
              className="opacity-70 hover:opacity-100 transition p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
