function TotalAssets({ total }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="stat-card total-assets">
      <div className="stat-label">Total Assets</div>
      <div className={`stat-value ${total >= 0 ? 'positive' : 'negative'}`}>
        {formatCurrency(total)}
      </div>
    </div>
  );
}

export default TotalAssets;