import React, { useState, useEffect } from 'react';
import Home from './pages/Home.jsx';
import Gateway from './pages/Gateway.jsx';
import Consumer from './pages/Consumer.jsx';
import ConsumerHistory from './pages/ConsumerHistory.jsx';
import Worker from './pages/Worker.jsx';
import Owner from './pages/Owner.jsx';
import WorkerLogin from './pages/WorkerLogin.jsx';
import OwnerLogin from './pages/OwnerLogin.jsx';
import { initializeMockData, readAuth, STORAGE_KEYS } from './store/mockStore.js';

// --- SVG Icons ---
// Using inline SVGs to avoid external dependencies and ensure they adapt to theme colors.

const UserIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const BriefcaseIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);

const HardHatIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s2-7 10-7 10 7 10 7v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"></path><path d="M12 12v-2"></path><path d="M16 12a4 4 0 0 0-8 0"></path><path d="M18 19a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2"></path></svg>
);


// --- Role Selection Component ---
const RoleSelection = () => {
    const [selectedRole, setSelectedRole] = useState('Consumer');
    const roles = [
        { name: 'Consumer', icon: <UserIcon className="w-8 h-8 mb-3 transition-transform duration-300 group-hover:scale-110" /> },
        { name: 'Owner', icon: <BriefcaseIcon className="w-8 h-8 mb-3 transition-transform duration-300 group-hover:scale-110" /> },
        { name: 'Worker', icon: <HardHatIcon className="w-8 h-8 mb-3 transition-transform duration-300 group-hover:scale-110" /> },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-medium text-center text-gray-600 dark:text-gray-300 mb-8">Choose Your Role</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
                {roles.map(role => (
                    <div
                        key={role.name}
                        onClick={() => setSelectedRole(role.name)}
                        className={`group cursor-pointer p-8 w-full md:w-52 h-48 flex flex-col justify-center items-center rounded-2xl border-2 transition-all duration-300 ease-in-out ${
                            selectedRole === role.name 
                                ? 'bg-indigo-600 dark:bg-indigo-500 border-indigo-600 dark:border-indigo-500 text-white shadow-2xl shadow-indigo-500/30' 
                                : 'bg-white/50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-xl hover:-translate-y-2'
                        }`}
                    >
                        {role.icon}
                        <span className="text-lg font-semibold">{role.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Home Page Component ---
const HomePage = ({ setPage }) => {
  return (
    <div className="w-full text-center flex flex-col justify-center items-center gap-12 py-12 px-4">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
          Nexus Platform
        </h1>
        <p className="max-w-xl text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Uniting Consumers, Owners, and Workers in a seamless, decentralized ecosystem. Your journey starts here.
        </p>
      </div>

      <RoleSelection />

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button onClick={() => setPage('features')} className="px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-900">
          Explore Features
        </button>
        <button onClick={() => setPage('about')} className="px-6 py-3 font-semibold text-gray-800 dark:text-white bg-white/80 dark:bg-slate-800/80 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-900">
          About Us
        </button>
         <button onClick={() => setPage('contact')} className="px-6 py-3 font-semibold text-gray-800 dark:text-white bg-white/80 dark:bg-slate-800/80 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-900">
          Contact
        </button>
      </div>
    </div>
  );
};


// --- Generic Page Component ---
// Used for the other 3 pages to demonstrate routing
const GenericPage = ({ title, setPage }) => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12 text-center flex flex-col items-center animate-fade-in">
             <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 mb-8">
                {title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                This is the {title.toLowerCase()} page. Content for this section will go here, showcasing the amazing capabilities of the Nexus Platform.
            </p>
            <button onClick={() => setPage('home')} className="px-8 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-900">
                Back to Home
            </button>
        </div>
    );
};


// removed in-file pages; now imported from /pages


// --- Main App Component ---
export default function App() {
  const [page, setPage] = useState('home');
  // Keep theme handling internal without exposing a toggle button
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {};

  useEffect(() => {
    initializeMockData();
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'features':
        return <GenericPage title="Features" setPage={setPage} />;
      case 'about':
        return <GenericPage title="About Us" setPage={setPage} />;
      case 'contact':
        return <GenericPage title="Contact" setPage={setPage} />;
      case 'gateway':
        return <Gateway setPage={setPage} />;
      case 'workerLogin':
        return <WorkerLogin setPage={setPage} />;
      case 'ownerLogin':
        return <OwnerLogin setPage={setPage} />;
      case 'consumer':
        return <Consumer setPage={setPage} />;
      case 'history':
        return <ConsumerHistory setPage={setPage} />;
      case 'worker': {
        const { loggedIn } = readAuth(STORAGE_KEYS.authWorker) || {};
        return loggedIn ? <Worker setPage={setPage} /> : <WorkerLogin setPage={setPage} />;
      }
      case 'owner': {
        const { loggedIn } = readAuth(STORAGE_KEYS.authOwner) || {};
        return loggedIn ? <Owner setPage={setPage} /> : <OwnerLogin setPage={setPage} />;
      }
      case 'home':
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <main className={`relative min-h-screen w-full font-inter transition-colors duration-500 bg-gray-50 dark:bg-slate-900`}>
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-200 via-white to-purple-200 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-900/50 opacity-50 dark:opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-purple-500/20 dark:bg-purple-500/10 filter blur-3xl animate-blob"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-indigo-500/20 dark:bg-indigo-500/10 filter blur-3xl animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-1/4 -left-1/4 w-1/3 h-1/3 rounded-full bg-pink-500/20 dark:bg-pink-500/10 filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
            {renderPage()}
        </div>
    </main>
  );
}
