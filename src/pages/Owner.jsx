import React, { useState } from 'react';
import { STORAGE_KEYS, readData, writeData } from '../store/mockStore';
import { OwnerNav } from '../components/Navbar.jsx';

const Owner = ({ setPage }) => {
  const [tab, setTab] = useState('employees');
  const [employees, setEmployees] = useState(() => readData(STORAGE_KEYS.employees));
  const [salaryClaims, setSalaryClaims] = useState(() => readData(STORAGE_KEYS.salaryClaims));
  const [leaves, setLeaves] = useState(() => readData(STORAGE_KEYS.leaveApplications));
  const transactions = readData(STORAGE_KEYS.transactions);

  const approveClaim = (id, status) => {
    const updated = salaryClaims.map(c => c.id === id ? { ...c, status } : c);
    setSalaryClaims(updated);
    writeData(STORAGE_KEYS.salaryClaims, updated);
  };

  const decideLeave = (id, status) => {
    const updated = leaves.map(l => l.id === id ? { ...l, status } : l);
    setLeaves(updated);
    writeData(STORAGE_KEYS.leaveApplications, updated);
  };

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalTransactions = transactions.length;

  return (
    <div className="w-full min-h-screen flex items-start justify-center pt-20 sm:pt-24">
      <OwnerNav setPage={setPage} active="owner" />
      <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-16 flex flex-col gap-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 text-center">Owner / Manager</h1>

        <div className="flex justify-center">
          <div className="inline-flex rounded-xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 p-1">
            {['employees','approvals','stats'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm md:text-base ${tab === t ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
        </div>

        {tab === 'employees' && (
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl">
            <h2 className="font-semibold text-gray-800 dark:text-white mb-4">All Employees</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {employees.map(emp => (
                <div key={emp.id} className="p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40">
                  <p className="font-semibold text-gray-800 dark:text-white">{emp.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{emp.role} • {emp.phone}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Salary: ${emp.salary.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'approvals' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl">
              <h2 className="font-semibold text-gray-800 dark:text-white mb-4">Salary Claims</h2>
              <div className="space-y-3">
                {salaryClaims.length === 0 && <p className="text-sm text-gray-500">No claims pending.</p>}
                {salaryClaims.map(c => (
                  <div key={c.id} className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/40 border border-gray-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">${c.amount.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">{c.status.toUpperCase()} • {new Date(c.date).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => approveClaim(c.id, 'approved')} className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm">Approve</button>
                      <button onClick={() => approveClaim(c.id, 'rejected')} className="px-3 py-1 rounded-lg bg-rose-600 text-white text-sm">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl">
              <h2 className="font-semibold text-gray-800 dark:text-white mb-4">Leave Applications</h2>
              <div className="space-y-3">
                {leaves.length === 0 && <p className="text-sm text-gray-500">No leaves pending.</p>}
                {leaves.map(l => (
                  <div key={l.id} className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/40 border border-gray-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{l.reason}</p>
                      <p className="text-xs text-gray-500">{l.status.toUpperCase()} • {new Date(l.date).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => decideLeave(l.id, 'approved')} className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm">Approve</button>
                      <button onClick={() => decideLeave(l.id, 'rejected')} className="px-3 py-1 rounded-lg bg-rose-600 text-white text-sm">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'stats' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl">
              <h3 className="text-sm text-gray-500">Total Revenue</h3>
              <p className="text-3xl font-extrabold text-gray-800 dark:text-white">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl">
              <h3 className="text-sm text-gray-500">Transactions</h3>
              <p className="text-3xl font-extrabold text-gray-800 dark:text-white">{totalTransactions}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl">
              <h3 className="text-sm text-gray-500">Employees</h3>
              <p className="text-3xl font-extrabold text-gray-800 dark:text-white">{employees.length}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Owner;


