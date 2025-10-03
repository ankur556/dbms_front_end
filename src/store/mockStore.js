// LocalStorage-backed mock store used by pages

export const STORAGE_KEYS = {
  products: 'nexus_products',
  employees: 'nexus_employees',
  transactions: 'nexus_transactions',
  salaryClaims: 'nexus_salary_claims',
  leaveApplications: 'nexus_leave_applications',
  authOwner: 'nexus_auth_owner',
  authWorker: 'nexus_auth_worker',
};

export const initializeMockData = () => {
  const hasProducts = localStorage.getItem(STORAGE_KEYS.products);
  const hasEmployees = localStorage.getItem(STORAGE_KEYS.employees);
  if (!hasProducts) {
    const demoProducts = [
      { id: 'p1', name: 'Cement (50kg)', price: 12.5, stock: 120, image: 'https://images.unsplash.com/photo-1560179707-f14e90ef41d5?q=80&w=1200&auto=format&fit=crop' },
      { id: 'p2', name: 'Steel Rod (10mm)', price: 6.0, stock: 300, image: 'https://images.unsplash.com/photo-1581094651181-3592d5d99b50?q=80&w=1200&auto=format&fit=crop' },
      { id: 'p3', name: 'Bricks (100pcs)', price: 25.0, stock: 80, image: 'https://images.unsplash.com/photo-1582582621959-48d7f2b13fb2?q=80&w=1200&auto=format&fit=crop' },
      { id: 'p4', name: 'Paint (20L)', price: 40.0, stock: 45, image: 'https://images.unsplash.com/photo-1520975922284-5f72a6d59336?q=80&w=1200&auto=format&fit=crop' },
    ];
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(demoProducts));
  }
  if (!hasEmployees) {
    const demoEmployees = [
      { id: 'e1', name: 'John Doe', role: 'Worker', phone: '+1 555 0111', salary: 600 },
      { id: 'e2', name: 'Jane Smith', role: 'Worker', phone: '+1 555 0222', salary: 650 },
      { id: 'e3', name: 'Alex Lee', role: 'Manager', phone: '+1 555 0333', salary: 900 },
    ];
    localStorage.setItem(STORAGE_KEYS.employees, JSON.stringify(demoEmployees));
  }
  for (const key of [STORAGE_KEYS.transactions, STORAGE_KEYS.salaryClaims, STORAGE_KEYS.leaveApplications]) {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  }
  if (!localStorage.getItem(STORAGE_KEYS.authOwner)) localStorage.setItem(STORAGE_KEYS.authOwner, JSON.stringify({ loggedIn: false }));
  if (!localStorage.getItem(STORAGE_KEYS.authWorker)) localStorage.setItem(STORAGE_KEYS.authWorker, JSON.stringify({ loggedIn: false }));
};

export const readData = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
};

export const writeData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const readAuth = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return { loggedIn: false }; }
};

export const writeAuth = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};


