import React from 'react';
import { STORAGE_KEYS, readData } from '../store/mockStore';
import { ConsumerNav } from '../components/Navbar.jsx';

const ConsumerHistory = ({ setPage }) => {
  const transactions = readData(STORAGE_KEYS.transactions);
  const salaryClaims = readData(STORAGE_KEYS.salaryClaims);
  const leaves = readData(STORAGE_KEYS.leaveApplications);
  return (
    <div className="w-full min-h-screen flex items-start justify-center pt-20 sm:pt-24">
      <ConsumerNav setPage={setPage} active="history" />
      <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-16 flex flex-col gap-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 text-center">Your History</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl">
            <h2 className="font-semibold text-gray-800 dark:text-white mb-4">Transactions</h2>
            <div className="space-y-3 max-h-72 overflow-auto pr-1">
              {transactions.length === 0 && <p className="text-sm text-gray-500">No transactions yet.</p>}
              {transactions.map(t => (
                <div key={t.id} className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/40 border border-gray-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{t.productName} × {t.quantity}</p>
                  <p className="text-xs text-gray-500">${t.amount.toFixed(2)} • {new Date(t.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl">
            <h2 className="font-semibold text-gray-800 dark:text-white mb-4">Salary Claims</h2>
            <div className="space-y-3 max-h-72 overflow-auto pr-1">
              {salaryClaims.length === 0 && <p className="text-sm text-gray-500">No claims yet.</p>}
              {salaryClaims.map(c => (
                <div key={c.id} className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/40 border border-gray-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">${c.amount.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{c.status.toUpperCase()} • {new Date(c.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl">
            <h2 className="font-semibold text-gray-800 dark:text-white mb-4">Leaves</h2>
            <div className="space-y-3 max-h-72 overflow-auto pr-1">
              {leaves.length === 0 && <p className="text-sm text-gray-500">No leaves yet.</p>}
              {leaves.map(l => (
                <div key={l.id} className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/40 border border-gray-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{l.reason}</p>
                  <p className="text-xs text-gray-500">{l.status.toUpperCase()} • {new Date(l.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerHistory;


