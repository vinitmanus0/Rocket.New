import React from 'react';
import Icon from 'components/AppIcon';

const MarketStatusBanner = ({ marketData }) => {
  const getMarketStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return 'text-success bg-success-50 border-success-100';
      case 'CLOSED':
        return 'text-error bg-error-50 border-error-100';
      case 'PRE_OPEN':
        return 'text-warning bg-warning-50 border-warning-100';
      default:
        return 'text-secondary bg-secondary-100 border-secondary-200';
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatChange = (change, isPercent = false) => {
    const formatted = formatNumber(Math.abs(change));
    const sign = change >= 0 ? '+' : '-';
    return `${sign}${formatted}${isPercent ? '%' : ''}`;
  };

  return (
    <div className="card p-6 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={24} className="text-primary" />
          <h2 className="text-lg font-semibold text-text-primary">Market Overview</h2>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getMarketStatusColor(marketData.marketStatus)}`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${marketData.marketStatus === 'OPEN' ? 'bg-success animate-pulse' : 'bg-current'}`} />
            <span>{marketData.marketStatus}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NIFTY 50 */}
        <div className="bg-surface rounded-lg p-4 border border-border-light">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-text-secondary">NIFTY 50</h3>
            <Icon 
              name={marketData.nifty?.isPositive ? "TrendingUp" : "TrendingDown"} 
              size={16} 
              className={marketData.nifty?.isPositive ? "text-success" : "text-error"} 
            />
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-text-primary">
                {formatNumber(marketData.nifty?.value || 0)}
              </p>
              <div className={`flex items-center space-x-2 text-sm font-medium ${
                marketData.nifty?.isPositive ? 'text-success' : 'text-error'
              }`}>
                <span>{formatChange(marketData.nifty?.change || 0)}</span>
                <span>({formatChange(marketData.nifty?.changePercent || 0, true)})</span>
              </div>
            </div>
            
            <div className="w-16 h-8 bg-gradient-to-r from-primary-100 to-primary-200 rounded opacity-60" />
          </div>
        </div>

        {/* SENSEX */}
        <div className="bg-surface rounded-lg p-4 border border-border-light">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-text-secondary">SENSEX</h3>
            <Icon 
              name={marketData.sensex?.isPositive ? "TrendingUp" : "TrendingDown"} 
              size={16} 
              className={marketData.sensex?.isPositive ? "text-success" : "text-error"} 
            />
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-text-primary">
                {formatNumber(marketData.sensex?.value || 0)}
              </p>
              <div className={`flex items-center space-x-2 text-sm font-medium ${
                marketData.sensex?.isPositive ? 'text-success' : 'text-error'
              }`}>
                <span>{formatChange(marketData.sensex?.change || 0)}</span>
                <span>({formatChange(marketData.sensex?.changePercent || 0, true)})</span>
              </div>
            </div>
            
            <div className="w-16 h-8 bg-gradient-to-r from-accent-100 to-accent-200 rounded opacity-60" />
          </div>
        </div>
      </div>

      {/* Market Timing Info */}
      <div className="mt-4 pt-4 border-t border-border-light">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-4">
            <span>Market Hours: 9:15 AM - 3:30 PM IST</span>
            <span>•</span>
            <span>Pre-Open: 9:00 AM - 9:15 AM IST</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={14} />
            <span>Auto-refresh: 30s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketStatusBanner;