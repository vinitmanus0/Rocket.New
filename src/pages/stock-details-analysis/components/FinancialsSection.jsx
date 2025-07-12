import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from 'components/AppIcon';

const FinancialsSection = ({ stockData }) => {
  const [activeTab, setActiveTab] = useState('quarterly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const tabs = [
    { id: 'quarterly', label: 'Quarterly Results', icon: 'Calendar' },
    { id: 'annual', label: 'Annual Results', icon: 'BarChart3' },
    { id: 'ratios', label: 'Financial Ratios', icon: 'Calculator' },
    { id: 'cash-flow', label: 'Cash Flow', icon: 'TrendingUp' }
  ];

  // Mock financial data
  const quarterlyData = [
    {
      quarter: 'Q3 FY24',
      revenue: 185490,
      netProfit: 18549,
      ebitda: 35280,
      eps: 28.5,
      margin: 10.0
    },
    {
      quarter: 'Q2 FY24',
      revenue: 178500,
      netProfit: 16800,
      ebitda: 32100,
      eps: 25.8,
      margin: 9.4
    },
    {
      quarter: 'Q1 FY24',
      revenue: 172300,
      netProfit: 15600,
      ebitda: 30800,
      eps: 24.0,
      margin: 9.1
    },
    {
      quarter: 'Q4 FY23',
      revenue: 168900,
      netProfit: 14200,
      ebitda: 28900,
      eps: 21.8,
      margin: 8.4
    },
    {
      quarter: 'Q3 FY23',
      revenue: 164800,
      netProfit: 14830,
      ebitda: 29200,
      eps: 22.8,
      margin: 9.0
    }
  ];

  const annualData = [
    {
      year: 'FY23',
      revenue: 658700,
      netProfit: 58430,
      ebitda: 118600,
      eps: 89.8,
      margin: 8.9,
      roe: 12.5,
      roce: 14.2
    },
    {
      year: 'FY22',
      revenue: 615300,
      netProfit: 52100,
      ebitda: 105800,
      eps: 80.1,
      margin: 8.5,
      roe: 11.8,
      roce: 13.5
    },
    {
      year: 'FY21',
      revenue: 578900,
      netProfit: 47200,
      ebitda: 98600,
      eps: 72.6,
      margin: 8.2,
      roe: 10.9,
      roce: 12.8
    },
    {
      year: 'FY20',
      revenue: 542400,
      netProfit: 42800,
      ebitda: 89300,
      eps: 65.8,
      margin: 7.9,
      roe: 10.2,
      roce: 11.9
    }
  ];

  const ratiosData = [
    {
      category: 'Profitability Ratios',
      ratios: [
        { name: 'Gross Profit Margin', value: 24.5, unit: '%', trend: 'up' },
        { name: 'Operating Margin', value: 12.8, unit: '%', trend: 'up' },
        { name: 'Net Profit Margin', value: 10.0, unit: '%', trend: 'up' },
        { name: 'Return on Equity', value: 12.5, unit: '%', trend: 'up' },
        { name: 'Return on Assets', value: 8.2, unit: '%', trend: 'stable' }
      ]
    },
    {
      category: 'Liquidity Ratios',
      ratios: [
        { name: 'Current Ratio', value: 1.85, unit: 'x', trend: 'up' },
        { name: 'Quick Ratio', value: 1.42, unit: 'x', trend: 'stable' },
        { name: 'Cash Ratio', value: 0.68, unit: 'x', trend: 'up' }
      ]
    },
    {
      category: 'Leverage Ratios',
      ratios: [
        { name: 'Debt to Equity', value: 0.42, unit: 'x', trend: 'down' },
        { name: 'Interest Coverage', value: 8.5, unit: 'x', trend: 'up' },
        { name: 'Debt Service Coverage', value: 2.8, unit: 'x', trend: 'up' }
      ]
    },
    {
      category: 'Efficiency Ratios',
      ratios: [
        { name: 'Asset Turnover', value: 0.82, unit: 'x', trend: 'stable' },
        { name: 'Inventory Turnover', value: 6.2, unit: 'x', trend: 'up' },
        { name: 'Receivables Turnover', value: 12.4, unit: 'x', trend: 'up' }
      ]
    }
  ];

  const cashFlowData = [
    {
      year: 'FY23',
      operating: 68500,
      investing: -45200,
      financing: -18900,
      net: 4400
    },
    {
      year: 'FY22',
      operating: 62800,
      investing: -38600,
      financing: -22100,
      net: 2100
    },
    {
      year: 'FY21',
      operating: 58900,
      investing: -42800,
      financing: -15600,
      net: 500
    },
    {
      year: 'FY20',
      operating: 54200,
      investing: -35900,
      financing: -19800,
      net: -1500
    }
  ];

  const formatCurrency = (value) => {
    if (value >= 10000) {
      return `₹${(value / 100).toFixed(0)} Cr`;
    } else if (value >= 100) {
      return `₹${(value / 100).toFixed(1)} Cr`;
    }
    return `₹${value}`;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <Icon name="TrendingUp" size={16} className="text-success" />;
      case 'down':
        return <Icon name="TrendingDown" size={16} className="text-error" />;
      case 'stable':
        return <Icon name="Minus" size={16} className="text-secondary" />;
      default:
        return null;
    }
  };

  const renderQuarterlyResults = () => (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-text-primary">Quarter</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">Revenue</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">Net Profit</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">EBITDA</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">EPS</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">Margin %</th>
            </tr>
          </thead>
          <tbody>
            {quarterlyData.map((quarter, index) => (
              <tr key={index} className="border-b border-border hover:bg-surface-hover">
                <td className="py-3 px-4 font-medium text-text-primary">{quarter.quarter}</td>
                <td className="py-3 px-4 text-right text-text-primary">{formatCurrency(quarter.revenue)}</td>
                <td className="py-3 px-4 text-right text-text-primary">{formatCurrency(quarter.netProfit)}</td>
                <td className="py-3 px-4 text-right text-text-primary">{formatCurrency(quarter.ebitda)}</td>
                <td className="py-3 px-4 text-right text-text-primary">₹{quarter.eps}</td>
                <td className="py-3 px-4 text-right text-text-primary">{quarter.margin}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background rounded-lg p-4">
          <h3 className="font-semibold text-text-primary mb-4">Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quarterlyData.slice().reverse()}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="quarter" stroke="var(--color-text-secondary)" fontSize={12} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-background rounded-lg p-4">
          <h3 className="font-semibold text-text-primary mb-4">Profit Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quarterlyData.slice().reverse()}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="quarter" stroke="var(--color-text-secondary)" fontSize={12} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Net Profit']}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="netProfit" stroke="var(--color-success)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnnualResults = () => (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-text-primary">Year</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">Revenue</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">Net Profit</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">EBITDA</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">ROE %</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">ROCE %</th>
            </tr>
          </thead>
          <tbody>
            {annualData.map((year, index) => (
              <tr key={index} className="border-b border-border hover:bg-surface-hover">
                <td className="py-3 px-4 font-medium text-text-primary">{year.year}</td>
                <td className="py-3 px-4 text-right text-text-primary">{formatCurrency(year.revenue)}</td>
                <td className="py-3 px-4 text-right text-text-primary">{formatCurrency(year.netProfit)}</td>
                <td className="py-3 px-4 text-right text-text-primary">{formatCurrency(year.ebitda)}</td>
                <td className="py-3 px-4 text-right text-text-primary">{year.roe}%</td>
                <td className="py-3 px-4 text-right text-text-primary">{year.roce}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={annualData.slice().reverse()}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="year" stroke="var(--color-text-secondary)" />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip 
              formatter={(value) => [formatCurrency(value), 'Revenue']}
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderRatios = () => (
    <div className="space-y-6">
      {ratiosData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-background rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.ratios.map((ratio, ratioIndex) => (
              <div key={ratioIndex} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <div>
                  <p className="text-sm text-text-secondary">{ratio.name}</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {ratio.value}{ratio.unit}
                  </p>
                </div>
                <div className="ml-2">
                  {getTrendIcon(ratio.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderCashFlow = () => (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-text-primary">Year</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">Operating CF</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">Investing CF</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">Financing CF</th>
              <th className="text-right py-3 px-4 font-semibold text-text-primary">Net CF</th>
            </tr>
          </thead>
          <tbody>
            {cashFlowData.map((year, index) => (
              <tr key={index} className="border-b border-border hover:bg-surface-hover">
                <td className="py-3 px-4 font-medium text-text-primary">{year.year}</td>
                <td className="py-3 px-4 text-right text-success">{formatCurrency(year.operating)}</td>
                <td className="py-3 px-4 text-right text-error">{formatCurrency(year.investing)}</td>
                <td className="py-3 px-4 text-right text-error">{formatCurrency(year.financing)}</td>
                <td className={`py-3 px-4 text-right font-semibold ${year.net >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatCurrency(year.net)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashFlowData.slice().reverse()}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="year" stroke="var(--color-text-secondary)" />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip 
              formatter={(value) => [formatCurrency(value), 'Cash Flow']}
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="operating" fill="var(--color-success)" name="Operating CF" />
            <Bar dataKey="investing" fill="var(--color-error)" name="Investing CF" />
            <Bar dataKey="financing" fill="var(--color-warning)" name="Financing CF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Financial Analysis</h2>
      
      {/* Tabs */}
      <div className="flex space-x-1 overflow-x-auto mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-primary text-white' :'text-secondary-600 hover:text-text-primary hover:bg-secondary-100'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'quarterly' && renderQuarterlyResults()}
      {activeTab === 'annual' && renderAnnualResults()}
      {activeTab === 'ratios' && renderRatios()}
      {activeTab === 'cash-flow' && renderCashFlow()}
    </div>
  );
};

export default FinancialsSection;