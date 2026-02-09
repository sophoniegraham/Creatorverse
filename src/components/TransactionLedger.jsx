import { useState } from 'react';

function TransactionLedger({ transactions, onDeleteTransaction }) {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedTransactions = [...transactions].sort((a, b) => {
    let compareA, compareB;

    if (sortBy === 'date') {
      compareA = new Date(a.date);
      compareB = new Date(b.date);
    } else if (sortBy === 'description') {
      compareA = a.description.toLowerCase();
      compareB = b.description.toLowerCase();
    } else if (sortBy === 'amount') {
      compareA = a.amount;
      compareB = b.amount;
    }

    if (sortOrder === 'asc') {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatAmount = (amount) => {
    const formatted = Math.abs(amount).toFixed(2);
    return amount >= 0 ? `+$${formatted}` : `-$${formatted}`;
  };

  return (
    <div className="transaction-ledger-container">
      <div className="ledger-header">
        <h2 className="section-title">Transaction Ledger</h2>
        <div className="ledger-count">{transactions.length} transactions</div>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">No Transactions</div>
          <p>Add your first transaction to get started</p>
        </div>
      ) : (
        <div className="ledger-table-wrapper">
          <table className="ledger-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('date')} className="sortable">
                  Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('description')} className="sortable">
                  Description {sortBy === 'description' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('amount')} className="sortable amount-header">
                  Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="date-cell">{formatDate(transaction.date)}</td>
                  <td className="description-cell">{transaction.description}</td>
                  <td className={`amount-cell ${transaction.amount >= 0 ? 'positive' : 'negative'}`}>
                    {formatAmount(transaction.amount)}
                  </td>
                  <td className="actions-cell">
                    <button 
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="delete-btn"
                      aria-label="Delete transaction"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionLedger;