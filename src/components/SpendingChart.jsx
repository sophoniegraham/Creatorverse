import { useEffect, useRef } from 'react';

function SpendingChart({ transactions }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || transactions.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // Calculate monthly spending
    const monthlyData = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      
      // Only count expenses (negative amounts)
      if (transaction.amount < 0) {
        monthlyData[monthYear] += Math.abs(transaction.amount);
      }
    });

    // Sort by date and take last 6 months
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
      return new Date(a) - new Date(b);
    }).slice(-6);

    const data = sortedMonths.map(month => monthlyData[month]);
    const maxValue = Math.max(...data, 1);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Chart dimensions
    const padding = { top: 20, right: 20, bottom: 60, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;
    const barWidth = chartWidth / sortedMonths.length - 10;
    const barSpacing = 10;

    // Draw bars
    sortedMonths.forEach((month, index) => {
      const value = data[index];
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding.left + (index * (barWidth + barSpacing));
      const y = padding.top + chartHeight - barHeight;

      // Draw bar
      ctx.fillStyle = '#EF4444'; // Red for expenses
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value on top
      ctx.fillStyle = '#CCD6F6';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(`$${value.toFixed(0)}`, x + barWidth / 2, y - 5);

      // Draw month label
      ctx.fillStyle = '#8892B0';
      ctx.font = '11px Inter';
      ctx.save();
      ctx.translate(x + barWidth / 2, rect.height - 10);
      ctx.rotate(-Math.PI / 4);
      ctx.textAlign = 'right';
      ctx.fillText(month, 0, 0);
      ctx.restore();
    });

    // Draw axes
    ctx.strokeStyle = '#1A2F4A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Y axis
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + chartHeight);
    // X axis
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
    ctx.stroke();

    // Y axis label
    ctx.fillStyle = '#8892B0';
    ctx.font = '12px Inter';
    ctx.save();
    ctx.translate(15, rect.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Monthly Spending ($)', 0, 0);
    ctx.restore();

  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="spending-chart-container">
        <h2 className="section-title">Monthly Spending Trends</h2>
        <div className="chart-empty">
          <p>Add transactions to see spending trends</p>
        </div>
      </div>
    );
  }

  return (
    <div className="spending-chart-container">
      <h2 className="section-title">Monthly Spending Trends</h2>
      <div className="chart-wrapper">
        <canvas ref={canvasRef} className="spending-chart"></canvas>
      </div>
    </div>
  );
}

export default SpendingChart;