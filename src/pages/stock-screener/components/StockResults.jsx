import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const StockResults = ({
  stocks,
  viewMode,
  isLoading,
  selectedStocks,
  onStockSelect,
  onAddToWatchlist,
  onViewDetails
}) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatMarketCap = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L Cr`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K Cr`;
    }
    return `₹${value} Cr`;
  };

  const formatVolume = (value) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)}Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-secondary-600';
  };

  const getAIScoreColor = (score) => {
    if (score >= 80) return 'text-success bg-success-50';
    if (score >= 60) return 'text-warning bg-warning-50';
    return 'text-error bg-error-50';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card p-6 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-secondary-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-secondary-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
              </div>
              <div className="w-20 h-8 bg-secondary-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="card p-12 text-center">
        <Icon name="Search" size={48} className="text-secondary-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">No stocks found</h3>
        <p className="text-text-secondary mb-6">
          Try adjusting your filters or search criteria to find more results.
        </p>
        <button className="btn-primary px-6 py-2 rounded-lg font-medium">
          Reset Filters
        </button>
      </div>
    );
  }

  if (viewMode === 'table') {
    return (
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  P/E
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  1Y Return
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  AI Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {stocks.map((stock) => (
                <tr key={stock.id} className="hover:bg-surface-hover transition-colors duration-150 ease-out">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedStocks.includes(stock.id)}
                      onChange={() => onStockSelect(stock.id)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={stock.logo}
                        alt={stock.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-text-primary">{stock.symbol}</div>
                        <div className="text-xs text-text-secondary truncate max-w-32">{stock.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">
                      {formatCurrency(stock.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getChangeColor(stock.change)}`}>
                      {stock.change > 0 ? '+' : ''}{formatCurrency(stock.change)}
                    </div>
                    <div className={`text-xs ${getChangeColor(stock.change)}`}>
                      ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {formatMarketCap(stock.marketCap)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {stock.peRatio.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getChangeColor(stock.returns1Y)}`}>
                      {stock.returns1Y > 0 ? '+' : ''}{stock.returns1Y.toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAIScoreColor(stock.aiScore)}`}>
                      {stock.aiScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onAddToWatchlist(stock)}
                        className="p-1 text-secondary-600 hover:text-primary transition-colors duration-150 ease-out"
                        title="Add to Watchlist"
                      >
                        <Icon name="Plus" size={16} />
                      </button>
                      <button
                        onClick={() => onViewDetails(stock)}
                        className="p-1 text-secondary-600 hover:text-primary transition-colors duration-150 ease-out"
                        title="View Details"
                      >
                        <Icon name="Eye" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {stocks.map((stock) => (
        <div key={stock.id} className="card p-6 hover:shadow-medium transition-all duration-150 ease-out micro-interaction">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedStocks.includes(stock.id)}
                onChange={() => onStockSelect(stock.id)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
              />
              <Image
                src={stock.logo}
                alt={stock.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-text-primary">{stock.symbol}</h3>
                <p className="text-sm text-text-secondary truncate max-w-32">{stock.name}</p>
              </div>
            </div>
            
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAIScoreColor(stock.aiScore)}`}>
              AI: {stock.aiScore}
            </span>
          </div>

          {/* Price Information */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-text-primary">
                {formatCurrency(stock.price)}
              </span>
              <div className={`text-right ${getChangeColor(stock.change)}`}>
                <div className="font-medium">
                  {stock.change > 0 ? '+' : ''}{formatCurrency(stock.change)}
                </div>
                <div className="text-sm">
                  ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-xs text-text-secondary">Market Cap</span>
              <div className="font-medium text-text-primary">{formatMarketCap(stock.marketCap)}</div>
            </div>
            <div>
              <span className="text-xs text-text-secondary">P/E Ratio</span>
              <div className="font-medium text-text-primary">{stock.peRatio.toFixed(1)}</div>
            </div>
            <div>
              <span className="text-xs text-text-secondary">1Y Return</span>
              <div className={`font-medium ${getChangeColor(stock.returns1Y)}`}>
                {stock.returns1Y > 0 ? '+' : ''}{stock.returns1Y.toFixed(1)}%
              </div>
            </div>
            <div>
              <span className="text-xs text-text-secondary">Volume</span>
              <div className="font-medium text-text-primary">{formatVolume(stock.volume)}</div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
            <span>D/E: {stock.debtToEquity.toFixed(2)}</span>
            <span>RSI: {stock.rsi.toFixed(1)}</span>
            <span>Div: {stock.dividend.toFixed(1)}%</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onAddToWatchlist(stock)}
              className="flex-1 btn-secondary px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out"
            >
              <Icon name="Plus" size={16} className="mr-1" />
              Watchlist
            </button>
            
            <button
              onClick={() => onViewDetails(stock)}
              className="flex-1 btn-primary px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-out"
            >
              <Icon name="Eye" size={16} className="mr-1" />
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockResults;