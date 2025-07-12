import React from 'react';
import Icon from 'components/AppIcon';

const PortfolioSummaryCard = ({ portfolioData, onViewMore }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatChange = (change, isPercent = false) => {
    const formatted = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(change));
    const sign = change >= 0 ? '+' : '-';
    return `${sign}${isPercent ? '' : '₹'}${formatted}${isPercent ? '%' : ''}`;
  };

  return (
    <div className="card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Portfolio Summary</h3>
        </div>
        
        <button
          onClick={onViewMore}
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150 ease-out"
        >
          View More
        </button>
      </div>

      <div className="space-y-6">
        {/* Total Portfolio Value */}
        <div>
          <p className="text-sm text-text-secondary mb-1">Total Portfolio Value</p>
          <p className="text-3xl font-bold text-text-primary">
            {formatCurrency(portfolioData.totalValue)}
          </p>
        </div>

        {/* Day's Performance */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-text-secondary mb-1">Today's P&L</p>
            <div className={`flex items-center space-x-1 ${
              portfolioData.isPositive ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={portfolioData.isPositive ? "TrendingUp" : "TrendingDown"} 
                size={16} 
              />
              <span className="font-semibold">
                {formatChange(portfolioData.dayChange)}
              </span>
            </div>
            <p className={`text-sm font-medium ${
              portfolioData.isPositive ? 'text-success' : 'text-error'
            }`}>
              {formatChange(portfolioData.dayChangePercent, true)}
            </p>
          </div>

          <div className="bg-background rounded-lg p-4">
            <p className="text-xs text-text-secondary mb-1">Total P&L</p>
            <div className={`flex items-center space-x-1 ${
              portfolioData.totalGainLoss >= 0 ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={portfolioData.totalGainLoss >= 0 ? "TrendingUp" : "TrendingDown"} 
                size={16} 
              />
              <span className="font-semibold">
                {formatChange(portfolioData.totalGainLoss)}
              </span>
            </div>
            <p className={`text-sm font-medium ${
              portfolioData.totalGainLoss >= 0 ? 'text-success' : 'text-error'
            }`}>
              {formatChange(portfolioData.totalGainLossPercent, true)}
            </p>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="bg-gradient-to-r from-primary-50 to-success-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Performance</span>
            <span className={`text-sm font-semibold ${
              portfolioData.totalGainLossPercent >= 0 ? 'text-success' : 'text-error'
            }`}>
              {portfolioData.totalGainLossPercent >= 0 ? 'Profitable' : 'Loss'}
            </span>
          </div>
          
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ease-out ${
                portfolioData.totalGainLossPercent >= 0 ? 'bg-success' : 'bg-error'
              }`}
              style={{ 
                width: `${Math.min(Math.abs(portfolioData.totalGainLossPercent) * 10, 100)}%` 
              }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onViewMore}
            className="flex-1 btn-primary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out"
          >
            View Portfolio
          </button>
          
          <button className="flex-1 btn-secondary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out">
            Add Stock
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCard;