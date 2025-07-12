import React from 'react';
import Icon from 'components/AppIcon';

const MarketMovers = ({ title, data, type, onViewMore, onStockClick }) => {
  const formatChange = (change, isPercent = false) => {
    const formatted = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(change));
    const sign = change >= 0 ? '+' : '-';
    return `${sign}${formatted}${isPercent ? '%' : ''}`;
  };

  const getIconAndColor = () => {
    if (type === 'gainers') {
      return {
        icon: 'TrendingUp',
        color: 'text-success',
        bgColor: 'bg-success-50'
      };
    } else {
      return {
        icon: 'TrendingDown',
        color: 'text-error',
        bgColor: 'bg-error-50'
      };
    }
  };

  const { icon, color, bgColor } = getIconAndColor();

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 ${bgColor} rounded-lg`}>
            <Icon name={icon} size={20} className={color} />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        </div>
        
        <button
          onClick={onViewMore}
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150 ease-out"
        >
          View More
        </button>
      </div>

      <div className="space-y-3">
        {data.map((stock, index) => (
          <button
            key={stock.symbol}
            onClick={() => onStockClick(stock.symbol)}
            className="w-full p-3 bg-background hover:bg-surface-hover rounded-lg transition-all duration-150 ease-out micro-interaction"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-secondary-100 rounded-full text-sm font-semibold text-text-primary">
                  {index + 1}
                </div>
                
                <div className="text-left">
                  <p className="font-semibold text-text-primary">{stock.symbol}</p>
                  <p className="text-sm text-text-secondary truncate max-w-32">
                    {stock.name}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`flex items-center justify-end space-x-1 font-semibold ${
                  type === 'gainers' ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={type === 'gainers' ? "ArrowUp" : "ArrowDown"} 
                    size={14} 
                  />
                  <span>{formatChange(stock.changePercent, true)}</span>
                </div>
                <p className="text-sm text-text-secondary">
                  ₹{formatChange(stock.change)}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-8">
          <Icon name="BarChart3" size={48} className="text-secondary-300 mx-auto mb-3" />
          <p className="text-text-secondary">No data available</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border-light">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-text-secondary">Average Change</p>
            <p className={`font-semibold ${type === 'gainers' ? 'text-success' : 'text-error'}`}>
              {data.length > 0 
                ? formatChange(
                    data.reduce((sum, stock) => sum + stock.changePercent, 0) / data.length, 
                    true
                  )
                : '0.00%'
              }
            </p>
          </div>
          
          <div>
            <p className="text-sm text-text-secondary">Total Stocks</p>
            <p className="font-semibold text-text-primary">{data.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketMovers;