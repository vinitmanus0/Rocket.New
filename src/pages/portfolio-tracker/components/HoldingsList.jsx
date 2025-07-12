import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const HoldingsList = ({ holdings, onStockClick, isRefreshing }) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const toggleRowExpansion = (holdingId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(holdingId)) {
      newExpanded.delete(holdingId);
    } else {
      newExpanded.add(holdingId);
    }
    setExpandedRows(newExpanded);
  };

  const handleQuickAction = (action, holding, e) => {
    e.stopPropagation();
    console.log(`${action} action for ${holding.symbol}`);
  };

  if (holdings.length === 0) {
    return (
      <div className="card p-8 text-center">
        <Icon name="PieChart" size={48} className="text-secondary-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">No Holdings Found</h3>
        <p className="text-text-secondary">
          Start building your portfolio by adding your first investment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          Holdings ({holdings.length})
        </h2>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-text-secondary text-sm">Stock</th>
                <th className="text-right py-3 px-4 font-medium text-text-secondary text-sm">Qty</th>
                <th className="text-right py-3 px-4 font-medium text-text-secondary text-sm">Avg Price</th>
                <th className="text-right py-3 px-4 font-medium text-text-secondary text-sm">Current Price</th>
                <th className="text-right py-3 px-4 font-medium text-text-secondary text-sm">Investment</th>
                <th className="text-right py-3 px-4 font-medium text-text-secondary text-sm">Current Value</th>
                <th className="text-right py-3 px-4 font-medium text-text-secondary text-sm">P&L</th>
                <th className="text-center py-3 px-4 font-medium text-text-secondary text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr
                  key={holding.id}
                  className={`border-b border-border hover:bg-surface-hover cursor-pointer transition-colors duration-150 ease-out ${
                    isRefreshing ? 'opacity-50' : ''
                  }`}
                  onClick={() => onStockClick(holding.symbol)}
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-semibold text-text-primary">{holding.symbol}</div>
                      <div className="text-sm text-text-secondary truncate max-w-48">
                        {holding.companyName}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-data">{holding.quantity}</td>
                  <td className="py-4 px-4 text-right font-data">{formatCurrency(holding.avgPrice)}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="font-data font-semibold">{formatCurrency(holding.currentPrice)}</div>
                    <div className={`text-sm ${
                      holding.dayChange >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {formatPercentage(holding.dayChangePercent)}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-data">{formatCurrency(holding.investmentValue)}</td>
                  <td className="py-4 px-4 text-right font-data font-semibold">{formatCurrency(holding.currentValue)}</td>
                  <td className="py-4 px-4 text-right">
                    <div className={`font-data font-semibold ${
                      holding.totalPL >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {formatCurrency(holding.totalPL)}
                    </div>
                    <div className={`text-sm ${
                      holding.totalPL >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {formatPercentage(holding.totalPLPercent)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={(e) => handleQuickAction('buy', holding, e)}
                        className="p-1 text-success hover:bg-success-50 rounded transition-colors duration-150 ease-out"
                        title="Buy More"
                      >
                        <Icon name="Plus" size={16} />
                      </button>
                      <button
                        onClick={(e) => handleQuickAction('sell', holding, e)}
                        className="p-1 text-error hover:bg-error-50 rounded transition-colors duration-150 ease-out"
                        title="Sell"
                      >
                        <Icon name="Minus" size={16} />
                      </button>
                      <button
                        onClick={(e) => handleQuickAction('analyze', holding, e)}
                        className="p-1 text-primary hover:bg-primary-50 rounded transition-colors duration-150 ease-out"
                        title="Analyze"
                      >
                        <Icon name="BarChart3" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {holdings.map((holding) => (
          <div
            key={holding.id}
            className={`card transition-all duration-150 ease-out ${
              isRefreshing ? 'opacity-50' : 'hover:shadow-financial-hover'
            }`}
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => onStockClick(holding.symbol)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">{holding.symbol}</h3>
                  <p className="text-sm text-text-secondary truncate">
                    {holding.companyName}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRowExpansion(holding.id);
                  }}
                  className="p-1 text-secondary-500 hover:text-text-primary transition-colors duration-150 ease-out"
                >
                  <Icon 
                    name={expandedRows.has(holding.id) ? 'ChevronUp' : 'ChevronDown'} 
                    size={20} 
                  />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-text-muted">Current Value</p>
                  <p className="font-semibold text-text-primary font-data">
                    {formatCurrency(holding.currentValue)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-muted">P&L</p>
                  <p className={`font-semibold font-data ${
                    holding.totalPL >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {formatCurrency(holding.totalPL)}
                  </p>
                  <p className={`text-xs ${
                    holding.totalPL >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    {formatPercentage(holding.totalPLPercent)}
                  </p>
                </div>
              </div>

              {expandedRows.has(holding.id) && (
                <div className="border-t border-border pt-3 mt-3">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-text-muted">Quantity</p>
                      <p className="font-data">{holding.quantity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Avg Price</p>
                      <p className="font-data">{formatCurrency(holding.avgPrice)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Current Price</p>
                      <p className="font-data">{formatCurrency(holding.currentPrice)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Investment</p>
                      <p className="font-data">{formatCurrency(holding.investmentValue)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        holding.dayChange >= 0 ? 'bg-success' : 'bg-error'
                      }`} />
                      <span className={`text-xs ${
                        holding.dayChange >= 0 ? 'text-success' : 'text-error'
                      }`}>
                        {formatPercentage(holding.dayChangePercent)} today
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => handleQuickAction('buy', holding, e)}
                        className="flex items-center space-x-1 px-3 py-1 bg-success-50 text-success rounded-lg text-xs font-medium transition-colors duration-150 ease-out hover:bg-success-100"
                      >
                        <Icon name="Plus" size={14} />
                        <span>Buy</span>
                      </button>
                      <button
                        onClick={(e) => handleQuickAction('sell', holding, e)}
                        className="flex items-center space-x-1 px-3 py-1 bg-error-50 text-error rounded-lg text-xs font-medium transition-colors duration-150 ease-out hover:bg-error-100"
                      >
                        <Icon name="Minus" size={14} />
                        <span>Sell</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoldingsList;