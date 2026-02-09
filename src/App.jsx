import { useState, useEffect } from 'react';
import './App.css';
import TransactionForm from './components/TransactionForm';
import TransactionLedger from './components/TransactionLedger';
import SpendingChart from './components/SpendingChart';
import TotalAssets from './components/TotalAssets';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Load transactions from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('financePulseTransactions');
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('financePulseTransactions', JSON.stringify(transactions));
    } else {
      localStorage.removeItem('financePulseTransactions');
    }
  }, [transactions]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setTransactions([newTransaction, ...transactions]);
    showNotification('Transaction added successfully', 'success');
  };

  const deleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter(t => t.id !== id));
      showNotification('Transaction deleted', 'info');
    }
  };

  const calculateTotalAssets = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.amount >= 0 ? total + transaction.amount : total + transaction.amount;
    }, 0);
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="nav-logo">FINANCEPULSE</h1>
          <div className="nav-links">
            <span className="nav-link">By Sophonie Graham</span>
          </div>
        </div>
      </nav>

      {/* Toast Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Main Content */}
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-label">Financial Analytics Platform</div>
          <h1 className="hero-title">FinancePulse Dashboard</h1>
          <p className="hero-subtitle">Track transactions, visualize spending trends, and manage your financial health</p>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <TotalAssets total={calculateTotalAssets()} />
          <div className="stat-card">
            <div className="stat-label">Total Transactions</div>
            <div className="stat-value">{transactions.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">This Month</div>
            <div className="stat-value">
              {transactions.filter(t => {
                const transactionDate = new Date(t.date);
                const now = new Date();
                return transactionDate.getMonth() === now.getMonth() && 
                       transactionDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="main-grid">
          {/* Left Column - Form and Chart */}
          <div className="left-column">
            <TransactionForm onAddTransaction={addTransaction} />
            <SpendingChart transactions={transactions} />
          </div>

          {/* Right Column - Ledger */}
          <div className="right-column">
            <TransactionLedger 
              transactions={transactions} 
              onDeleteTransaction={deleteTransaction}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 FinancePulse Dashboard | Built by Sophonie Graham</p>
        <p className="footer-contact">sgraha04@gmail.com | United States</p>
      </footer>
    </div>
  );
}

export default App;