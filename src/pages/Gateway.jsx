import React from 'react';

const Gateway = ({ setPage }) => {
  const cards = [
    { id: 'consumer', title: 'Consumer', desc: 'Shop and manage your history', color: 'from-indigo-500 to-pink-500' },
    { id: 'workerLogin', title: 'Worker', desc: 'Login to view your portal', color: 'from-emerald-500 to-teal-500' },
    { id: 'ownerLogin', title: 'Owner / Manager', desc: 'Login to manage operations', color: 'from-amber-500 to-rose-500' },
  ];
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {cards.map(c => (
          <button
            key={c.id}
            onClick={() => setPage(c.id)}
            className="group rounded-2xl p-1 bg-gradient-to-r shadow-xl transition-transform hover:-translate-y-1"
            style={{ backgroundImage: `linear-gradient(90deg, var(--tw-gradient-stops))` }}
          >
            <div className="rounded-2xl p-6 bg-white/70 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 h-full">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${c.color} mb-4`}></div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{c.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{c.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gateway;


