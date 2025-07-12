import React from 'react';
import Icon from 'components/AppIcon';

const WatchlistPreview = ({ watchlistData, onViewMore, onStockClick }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatChange = (change, isPercent = false) => {
    const formatted = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(change));
    const sign = change >= 0 ? '+' : '-';
    return `${sign}${formatted}${isPercent ? '%' : ''}`;
  };

  return (
    <div className="card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent-50 rounded-lg">
            <Icon name="Eye" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Watchlist</h3>
        </div>
        
        <button
          onClick={onViewMore}
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150 ease-out"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {watchlistData.slice(0, 5).map((stock, index) => (
          <button
            key={stock.symbol}
            onClick={() => onStockClick(stock.symbol)}
            className="w-full p-3 bg-background hover:bg-surface-hover rounded-lg transition-all duration-150 ease-out micro-interaction"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 text-left">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-text-primary">{stock.symbol}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    stock.isPositive ? 'bg-success' : 'bg-error'
                  }`} />
                </div>
                <p className="text-sm text-text-secondary truncate">{stock.name}</p>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-text-primary">₹{formatPrice(stock.price)}</p>
                <div className={`flex items-center justify-end space-x-1 text-sm ${
                  stock.isPositive ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={stock.isPositive ? "ArrowUp" : "ArrowDown"} 
                    size={12} 
                  />
                  <span>{formatChange(stock.changePercent, true)}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {watchlistData.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Plus" size={48} className="text-secondary-300 mx-auto mb-3" />
          <p className="text-text-secondary font-medium mb-2">No stocks in watchlist</p>
          <p className="text-sm text-text-muted">Add stocks to track their performance</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border-light">
        <div className="flex space-x-3">
          <button
            onClick={onViewMore}
            className="flex-1 btn-secondary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out"
          >
            Manage List
          </button>
          
          <button className="flex-1 btn-primary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out">
            Add Stock
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistPreview;