import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from 'components/AppIcon';

const PerformanceAnalytics = ({ holdings, portfolioData, selectedTimeframe, onTimeframeChange }) => {
  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];

  // Calculate sector allocation
  const sectorData = holdings.reduce((acc, holding) => {
    const existing = acc.find(item => item.sector === holding.sector);
    if (existing) {
      existing.value += holding.currentValue;
      existing.percentage += (holding.currentValue / portfolioData.totalValue) * 100;
    } else {
      acc.push({
        sector: holding.sector,
        value: holding.currentValue,
        percentage: (holding.currentValue / portfolioData.totalValue) * 100
      });
    }
    return acc;
  }, []);

  // Mock historical performance data
  const performanceData = [
    { date: '2024-01-01', value: 1000000 },
    { date: '2024-01-15', value: 1050000 },
    { date: '2024-02-01', value: 1080000 },
    { date: '2024-02-15', value: 1120000 },
    { date: '2024-03-01', value: 1150000 },
    { date: '2024-03-15', value: 1200000 },
    { date: '2024-04-01', value: 1250000 }
  ];

  // Top performers data
  const topPerformers = holdings
    .sort((a, b) => b.totalPLPercent - a.totalPLPercent)
    .slice(0, 5)
    .map(holding => ({
      symbol: holding.symbol,
      return: holding.totalPLPercent
    }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-medium">
          <p className="text-sm font-medium text-text-primary">
            {`${label}: ${formatCurrency(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-medium">
          <p className="text-sm font-medium text-text-primary">
            {`${payload[0].payload.sector}: ${payload[0].payload.percentage.toFixed(1)}%`}
          </p>
          <p className="text-sm text-text-secondary">
            {formatCurrency(payload[0].payload.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Performance Analytics</h2>
      </div>

      {/* Portfolio Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Sector Allocation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {sectorData.map((sector, index) => (
              <div key={sector.sector} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-text-secondary">{sector.sector}</span>
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {sector.percentage.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Top Performers</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPerformers} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="symbol" 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748B' }}
                  axisLine={{ stroke: '#E2E8F0' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(2)}%`, 'Return']}
                  labelStyle={{ color: '#0F172A' }}
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="return" 
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Historical Performance */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 md:mb-0">
            Portfolio Performance
          </h3>
          <div className="flex items-center space-x-2">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => onTimeframeChange(timeframe)}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-150 ease-out ${
                  selectedTimeframe === timeframe
                    ? 'bg-primary text-white' :'text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Portfolio Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Icon name="Target" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Diversification Score</p>
              <p className="text-lg font-semibold text-text-primary">8.5/10</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-50 rounded-lg">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Risk Level</p>
              <p className="text-lg font-semibold text-text-primary">Moderate</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Sharpe Ratio</p>
              <p className="text-lg font-semibold text-text-primary">1.24</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;