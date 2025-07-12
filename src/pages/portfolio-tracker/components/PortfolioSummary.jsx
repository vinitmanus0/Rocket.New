import React from 'react';
import Icon from 'components/AppIcon';

const PortfolioSummary = ({ data, isRefreshing }) => {
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

  const summaryCards = [
    {
      title: 'Total Portfolio Value',
      value: formatCurrency(data.totalValue),
      icon: 'TrendingUp',
      color: 'primary',
      subtitle: `Invested: ${formatCurrency(data.totalInvestment)}`
    },
    {
      title: "Today\'s P&L",
      value: formatCurrency(data.dayPL),
      percentage: formatPercentage(data.dayPLPercent),
      icon: data.dayPL >= 0 ? 'ArrowUp' : 'ArrowDown',
      color: data.dayPL >= 0 ? 'success' : 'error',
      isChange: true
    },
    {
      title: 'Total Returns',
      value: formatCurrency(data.totalPL),
      percentage: formatPercentage(data.totalPLPercent),
      icon: data.totalPL >= 0 ? 'TrendingUp' : 'TrendingDown',
      color: data.totalPL >= 0 ? 'success' : 'error',
      isChange: true
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary bg-primary-50',
      success: 'text-success bg-success-50',
      error: 'text-error bg-error-50'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getTextColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary',
      success: 'text-success',
      error: 'text-error'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
      {summaryCards.map((card, index) => (
        <div
          key={index}
          className={`card p-6 transition-all duration-150 ease-out ${
            isRefreshing ? 'opacity-50' : 'hover:shadow-financial-hover'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-text-secondary mb-1">
                {card.title}
              </p>
              <div className="flex items-baseline space-x-2">
                <h3 className="text-2xl font-bold text-text-primary">
                  {card.value}
                </h3>
                {card.percentage && (
                  <span className={`text-sm font-medium ${getTextColorClasses(card.color)}`}>
                    {card.percentage}
                  </span>
                )}
              </div>
              {card.subtitle && (
                <p className="text-xs text-text-muted mt-1">
                  {card.subtitle}
                </p>
              )}
            </div>
            
            <div className={`p-3 rounded-lg ${getColorClasses(card.color)}`}>
              <Icon name={card.icon} size={20} />
            </div>
          </div>

          {card.isChange && (
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                card.color === 'success' ? 'bg-success' : 'bg-error'
              }`} />
              <span className="text-xs text-text-muted">
                Since last market close
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Last Updated Info */}
      <div className="md:col-span-3 flex items-center justify-center mt-4">
        <div className="flex items-center space-x-2 text-xs text-text-muted">
          <Icon name="Clock" size={14} />
          <span>
            Last updated: {data.lastUpdated.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Asia/Kolkata'
            })} IST
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;