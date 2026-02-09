import { useState } from 'react';

function TransactionForm({ onAddTransaction }) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!date) {
      newErrors.date = 'Date is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 3) {
      newErrors.description = 'Description must be at least 3 characters';
    } else if (description.trim().length > 100) {
      newErrors.description = 'Description must be less than 100 characters';
    }

    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(amount)) {
      newErrors.amount = 'Amount must be a valid number';
    } else if (parseFloat(amount) === 0) {
      newErrors.amount = 'Amount cannot be zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onAddTransaction({
        date,
        description: description.trim(),
        amount: parseFloat(amount)
      });

      // Reset form
      setDate('');
      setDescription('');
      setAmount('');
      setErrors({});
    }
  };

  return (
    <div className="transaction-form-container">
      <h2 className="section-title">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter transaction description"
            maxLength="100"
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Positive for income, negative for expense"
            step="0.01"
            className={errors.amount ? 'error' : ''}
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
          <small className="form-hint">Use negative numbers for expenses (e.g., -50.00)</small>
        </div>

        <button type="submit" className="submit-btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;