/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeaderPOV } from './components/HeaderPOV';
import { ClientPortal } from './components/ClientPortal';
import { AuditorWorkstation } from './components/AuditorWorkstation';
import { ModalSetorNota } from './components/ModalSetorNota';
import { ModalReconcile } from './components/ModalReconcile';
import { ModalReport } from './components/ModalReport';
import { ModalReceiptPreview } from './components/ModalReceiptPreview';
import { ToastContainer } from './components/ToastContainer';
import { INITIAL_TRANSACTIONS } from './data/initialData';
import { Transaction, POV, ToastMessage } from './types';

const STORAGE_KEY_TX = 'doku_transactions_v1';
const STORAGE_KEY_LOCK = 'doku_period_locked_v1';
const STORAGE_KEY_POV = 'doku_active_pov_v1';

export default function App() {
  // Load state from localStorage with fallbacks
  const [currentPOV, setCurrentPOV] = useState<POV>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POV);
      return saved === 'admin' ? 'admin' : 'client';
    } catch {
      return 'client';
    }
  });

  const [isPeriodLocked, setIsPeriodLocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_LOCK) === 'true';
    } catch {
      return false;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TX);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_TRANSACTIONS;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [isSetorNotaOpen, setIsSetorNotaOpen] = useState(false);
  const [isReconcileOpen, setIsReconcileOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [previewTx, setPreviewTx] = useState<Transaction | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(transactions));
    } catch {
      // ignore
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LOCK, String(isPeriodLocked));
    } catch {
      // ignore
    }
  }, [isPeriodLocked]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_POV, currentPOV);
    } catch {
      // ignore
    }
  }, [currentPOV]);

  const addToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSwitchPOV = (pov: POV) => {
    setCurrentPOV(pov);
    if (pov === 'client') {
      addToast(
        'Beralih ke Portal Klien: Anda dapat menyetor nota belanja dan memantau saldo riil sah.',
        'info'
      );
    } else {
      addToast(
        'Beralih ke Meja Kerja Akuntan: Anda memiliki wewenang mengaudit nota dan menjurnal transaksi.',
        'info'
      );
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset data pembukuan ke transaksi awal simulasi?')) {
      setTransactions(INITIAL_TRANSACTIONS);
      setIsPeriodLocked(false);
      setCurrentPOV('client');
      addToast('Data simulasi telah di-reset ke kondisi awal.', 'info');
    }
  };

  const handleSetorNota = (
    data: Omit<Transaction, 'id' | 'status' | 'coaCode' | 'auditorNote' | 'verifiedBy'>
  ) => {
    if (isPeriodLocked) {
      addToast(
        'Periode buku kas telah ditutup oleh akuntan! Tidak dapat menyetor transaksi bulan lalu.',
        'error'
      );
      return;
    }

    const nextIdNum = transactions.length + 1;
    const newTx: Transaction = {
      ...data,
      id: `TX-2026-${String(nextIdNum).padStart(3, '0')}`,
      status: 'pending',
      coaCode: '5-999 (Menunggu Klasifikasi)',
      auditorNote: 'Baru disetor klien, menunggu verifikasi staf DOKU.',
      verifiedBy: '-',
    };

    setTransactions((prev) => [newTx, ...prev]);
    addToast(
      `Nota "${data.desc}" berhasil disetor! Menunggu verifikasi tim Akuntan DOKU.`,
      'success'
    );
  };

  const handleApproveTransaction = (id: string, coaCode: string) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            status: 'approved',
            coaCode,
            auditorNote: 'Diverifikasi sah fisik kuitansi & masuk buku kas.',
            verifiedBy: 'Rian Pratama, CA',
          };
        }
        return t;
      })
    );
    addToast(
      `Transaksi ${id} disahkan! Jurnal umum dan saldo kas resmi telah diperbarui.`,
      'success'
    );
  };

  const handleRejectTransaction = (id: string) => {
    const tx = transactions.find((t) => t.id === id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    addToast(
      `Nota ${id} ${tx ? `("${tx.desc}") ` : ''}ditolak karena rincian fisik tidak memenuhi standar bukti sah.`,
      'error'
    );
  };

  const handleToggleLockPeriod = () => {
    setIsPeriodLocked((prev) => {
      const next = !prev;
      if (next) {
        addToast(
          'Periode buku kas resmi dikunci (Tutup Buku). Laporan keuangan final terbit.',
          'warning'
        );
      } else {
        addToast('Kunci periode dibuka kembali untuk entri koreksi jurnal.', 'info');
      }
      return next;
    });
  };

  const handleSyncSuccess = () => {
    addToast(
      'Sinkronisasi rekening koran berhasil! Saldo giro bank cocok 100% dengan buku kas DOKU.',
      'success'
    );
  };

  // Aggregates
  let incomeSum = 0;
  let incomeCount = 0;
  let expenseSum = 0;
  let expenseCount = 0;
  let pendingCount = 0;

  transactions.forEach((t) => {
    if (t.status === 'approved') {
      if (t.type === 'pemasukan') {
        incomeSum += t.amount;
        incomeCount++;
      } else {
        expenseSum += t.amount;
        expenseCount++;
      }
    } else {
      pendingCount++;
    }
  });

  const realBalance = incomeSum - expenseSum;
  const approvedCount = incomeCount + expenseCount;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Persistent Role Simulator Header */}
      <HeaderPOV
        currentPOV={currentPOV}
        onSwitchPOV={handleSwitchPOV}
        pendingCount={pendingCount}
        onResetData={handleResetData}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Main Viewport based on selected Role */}
      {currentPOV === 'client' ? (
        <ClientPortal
          transactions={transactions}
          incomeSum={incomeSum}
          incomeCount={incomeCount}
          expenseSum={expenseSum}
          expenseCount={expenseCount}
          pendingCount={pendingCount}
          realBalance={realBalance}
          isPeriodLocked={isPeriodLocked}
          onOpenSetorNota={() => setIsSetorNotaOpen(true)}
          onOpenReconcile={() => setIsReconcileOpen(true)}
          onOpenReport={() => setIsReportOpen(true)}
          onPreviewReceipt={(tx) => setPreviewTx(tx)}
        />
      ) : (
        <AuditorWorkstation
          transactions={transactions}
          pendingCount={pendingCount}
          approvedCount={approvedCount}
          realBalance={realBalance}
          isPeriodLocked={isPeriodLocked}
          onToggleLockPeriod={handleToggleLockPeriod}
          onApproveTransaction={handleApproveTransaction}
          onRejectTransaction={handleRejectTransaction}
          onPreviewReceipt={(tx) => setPreviewTx(tx)}
          onOpenReport={() => setIsReportOpen(true)}
        />
      )}

      {/* Modals */}
      <ModalSetorNota
        isOpen={isSetorNotaOpen}
        onClose={() => setIsSetorNotaOpen(false)}
        onSubmit={handleSetorNota}
        isPeriodLocked={isPeriodLocked}
      />

      <ModalReconcile
        isOpen={isReconcileOpen}
        onClose={() => setIsReconcileOpen(false)}
        onSyncSuccess={handleSyncSuccess}
        currentBalance={realBalance}
      />

      <ModalReport
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        transactions={transactions}
        incomeSum={incomeSum}
        incomeCount={incomeCount}
        expenseSum={expenseSum}
        expenseCount={expenseCount}
        realBalance={realBalance}
      />

      <ModalReceiptPreview
        transaction={previewTx}
        onClose={() => setPreviewTx(null)}
      />
    </div>
  );
}
