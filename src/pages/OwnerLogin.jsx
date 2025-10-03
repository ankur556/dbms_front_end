import React, { useState } from 'react';
import { STORAGE_KEYS, writeAuth } from '../store/mockStore';

const OwnerLogin = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    if (!email.includes('@') || password.trim().length < 4) { setError('Enter valid email and password'); return; }
    writeAuth(STORAGE_KEYS.authOwner, { loggedIn: true, email });
    setPage('owner');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 shadow-xl">
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-rose-500 mb-6">Owner / Manager Login</h1>
        {error && <p className="text-sm text-rose-500 mb-2">{error}</p>}
        <div className="space-y-3">
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100" />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100" />
          <button onClick={login} className="w-full px-4 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold">Login</button>
        </div>
        <button onClick={() => setPage('gateway')} className="mt-4 w-full px-4 py-3 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100">Back</button>
      </div>
    </div>
  );
};

export default OwnerLogin;


