import React, { useState } from 'react';
import { STORAGE_KEYS, readAuth, writeAuth } from '../store/mockStore';

const WorkerLogin = ({ setPage }) => {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    if (phone.trim().length < 4 || pin.trim().length < 4) { setError('Enter valid phone and PIN'); return; }
    writeAuth(STORAGE_KEYS.authWorker, { loggedIn: true, phone });
    setPage('worker');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 shadow-xl">
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 mb-6">Worker Login</h1>
        {error && <p className="text-sm text-rose-500 mb-2">{error}</p>}
        <div className="space-y-3">
          <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100" />
          <input value={pin} onChange={e => setPin(e.target.value)} type="password" placeholder="PIN" className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100" />
          <button onClick={login} className="w-full px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">Login</button>
        </div>
        <button onClick={() => setPage('gateway')} className="mt-4 w-full px-4 py-3 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100">Back</button>
      </div>
    </div>
  );
};

export default WorkerLogin;


