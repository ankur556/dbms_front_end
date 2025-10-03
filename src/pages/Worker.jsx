import React from 'react';
import { STORAGE_KEYS, readData } from '../store/mockStore';
import { WorkerNav } from '../components/Navbar.jsx';

const Worker = ({ setPage }) => {
  const leaves = readData(STORAGE_KEYS.leaveApplications);
  return (
    <div className="w-full min-h-screen flex items-start justify-center pt-20 sm:pt-24">
      <WorkerNav setPage={setPage} active="worker" />
      <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-16 flex flex-col gap-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 text-center">Worker Portal</h1>
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl">
          <h2 className="font-semibold text-gray-800 dark:text-white mb-4">Your Leave Applications</h2>
          <div className="space-y-3">
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
  );
};

export default Worker;


