import React from 'react';
import Icon from 'components/AppIcon';

const KeyMetrics = ({ stockData }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return new Intl.NumberFormat('en-IN').format(value);
  };

  const formatPercentage = (value) => {
    return `${value?.toFixed(2)}%`;
  };

  const metrics = [
    {
      label: 'Market Cap',
      value: formatNumber(stockData?.marketCap),
      icon: 'Building2',
      color: 'primary'
    },
    {
      label: 'P/E Ratio',
      value: stockData?.peRatio?.toFixed(2),
      icon: 'Calculator',
      color: 'accent'
    },
    {
      label: 'P/B Ratio',
      value: stockData?.pbRatio?.toFixed(2),
      icon: 'BarChart3',
      color: 'success'
    },
    {
      label: 'Dividend Yield',
      value: formatPercentage(stockData?.dividendYield),
      icon: 'Percent',
      color: 'warning'
    },
    {
      label: '52W High',
      value: formatCurrency(stockData?.weekHigh52),
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      label: '52W Low',
      value: formatCurrency(stockData?.weekLow52),
      icon: 'TrendingDown',
      color: 'error'
    },
    {
      label: 'Day High',
      value: formatCurrency(stockData?.dayHigh),
      icon: 'ArrowUp',
      color: 'success'
    },
    {
      label: 'Day Low',
      value: formatCurrency(stockData?.dayLow),
      icon: 'ArrowDown',
      color: 'error'
    },
    {
      label: 'Volume',
      value: formatNumber(stockData?.volume),
      icon: 'Activity',
      color: 'secondary'
    },
    {
      label: 'Industry',
      value: stockData?.industry,
      icon: 'Factory',
      color: 'primary'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary bg-primary-50',
      accent: 'text-accent bg-accent-50',
      success: 'text-success bg-success-50',
      warning: 'text-warning bg-warning-50',
      error: 'text-error bg-error-50',
      secondary: 'text-secondary bg-secondary-100'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Key Metrics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-background rounded-lg p-4 hover:shadow-medium transition-shadow duration-150 ease-out">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>
                <Icon name={metric.icon} size={16} />
              </div>
            </div>
            
            <div>
              <p className="text-sm text-text-secondary mb-1">{metric.label}</p>
              <p className="text-lg font-semibold text-text-primary truncate" title={metric.value}>
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Price Range</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Today's Range</span>
                <span className="font-medium text-text-primary">
                  {formatCurrency(stockData?.dayLow)} - {formatCurrency(stockData?.dayHigh)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">52 Week Range</span>
                <span className="font-medium text-text-primary">
                  {formatCurrency(stockData?.weekLow52)} - {formatCurrency(stockData?.weekHigh52)}
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">Valuation</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Price to Earnings</span>
                <span className="font-medium text-text-primary">{stockData?.peRatio?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Price to Book</span>
                <span className="font-medium text-text-primary">{stockData?.pbRatio?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;