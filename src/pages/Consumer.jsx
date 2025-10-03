import React, { useEffect, useState } from 'react';
import { STORAGE_KEYS, readData, writeData } from '../store/mockStore';
import { ConsumerNav } from '../components/Navbar.jsx';

const Consumer = ({ setPage }) => {
  const [products, setProducts] = useState(() => readData(STORAGE_KEYS.products));
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [salaryAmount, setSalaryAmount] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  useEffect(() => {
    setProducts(readData(STORAGE_KEYS.products));
  }, []);

  const registerTransaction = () => {
    if (!selectedId || quantity <= 0) return;
    const prod = products.find(p => p.id === selectedId);
    if (!prod || prod.stock < quantity) return;
    const transactions = readData(STORAGE_KEYS.transactions);
    const newTxn = {
      id: 't' + (transactions.length + 1),
      productId: prod.id,
      productName: prod.name,
      quantity: Number(quantity),
      amount: Number((prod.price * quantity).toFixed(2)),
      date: new Date().toISOString(),
    };
    const updated = [...transactions, newTxn];
    writeData(STORAGE_KEYS.transactions, updated);
    const updatedProducts = products.map(p => p.id === prod.id ? { ...p, stock: p.stock - Number(quantity) } : p);
    setProducts(updatedProducts);
    writeData(STORAGE_KEYS.products, updatedProducts);
    setSelectedId('');
    setQuantity(1);
    alert('Transaction recorded');
  };

  const claimSalary = () => {
    if (!salaryAmount || Number(salaryAmount) <= 0) return;
    const claims = readData(STORAGE_KEYS.salaryClaims);
    const newClaim = { id: 's' + (claims.length + 1), amount: Number(salaryAmount), status: 'pending', date: new Date().toISOString() };
    writeData(STORAGE_KEYS.salaryClaims, [...claims, newClaim]);
    setSalaryAmount('');
    alert('Salary claim submitted');
  };

  const applyLeave = () => {
    if (!leaveReason.trim()) return;
    const leaves = readData(STORAGE_KEYS.leaveApplications);
    const newLeave = { id: 'l' + (leaves.length + 1), reason: leaveReason.trim(), status: 'pending', date: new Date().toISOString() };
    writeData(STORAGE_KEYS.leaveApplications, [...leaves, newLeave]);
    setLeaveReason('');
    alert('Leave application submitted');
  };

  return (
    <div className="w-full min-h-screen flex items-start justify-center pt-20 sm:pt-24">
      <ConsumerNav setPage={setPage} active="consumer" />
      <div className="w-full max-w-6xl mx-auto px-4 py-16 flex flex-col gap-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 text-center">Consumer Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map(p => (
              <div key={p.id} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 shadow">
                {p.image && (
                  <div className="h-40 w-full overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{p.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">${p.price.toFixed(2)} • Stock: {p.stock}</p>
                  </div>
                  <button onClick={() => setSelectedId(p.id)} className={`px-3 py-1 rounded-lg text-sm ${selectedId === p.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200'}`}>Select</button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 shadow-xl flex flex-col gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Register Transaction</h3>
              <div className="flex items-center gap-2">
                <input value={quantity} onChange={e => setQuantity(Number(e.target.value))} type="number" min="1" className="w-24 px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100" />
                <button onClick={registerTransaction} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Submit</button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Select a product above first.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Claim Salary</h3>
              <div className="flex items-center gap-2">
                <input value={salaryAmount} onChange={e => setSalaryAmount(e.target.value)} type="number" min="1" className="w-32 px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100" />
                <button onClick={claimSalary} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Submit</button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Apply for Leave</h3>
              <div className="flex items-center gap-2">
                <input value={leaveReason} onChange={e => setLeaveReason(e.target.value)} type="text" placeholder="Reason" className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100" />
                <button onClick={applyLeave} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Apply</button>
              </div>
            </div>

            <button onClick={() => setPage('history')} className="px-4 py-2 rounded-lg bg-white/70 dark:bg-slate-900/40 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800">Go to History</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consumer;


