import React from 'react';
import Icon from 'components/AppIcon';

const PeerComparison = ({ stockData }) => {
  const peerData = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      marketCap: 1678500,
      peRatio: 24.5,
      pbRatio: 2.1,
      roe: 12.5,
      debtToEquity: 0.42,
      dividendYield: 0.35,
      isCurrent: true
    },
    {
      symbol: 'ONGC',
      name: 'Oil & Natural Gas Corp',
      marketCap: 245600,
      peRatio: 8.2,
      pbRatio: 0.9,
      roe: 11.2,
      debtToEquity: 0.18,
      dividendYield: 2.1,
      isCurrent: false
    },
    {
      symbol: 'IOC',
      name: 'Indian Oil Corporation',
      marketCap: 156800,
      peRatio: 6.8,
      pbRatio: 0.7,
      roe: 9.8,
      debtToEquity: 0.35,
      dividendYield: 3.2,
      isCurrent: false
    },
    {
      symbol: 'BPCL',
      name: 'Bharat Petroleum Corp',
      marketCap: 89400,
      peRatio: 12.4,
      pbRatio: 1.2,
      roe: 8.9,
      debtToEquity: 0.28,
      dividendYield: 2.8,
      isCurrent: false
    }
  ];

  const metrics = [
    { key: 'marketCap', label: 'Market Cap (Cr)', format: 'currency' },
    { key: 'peRatio', label: 'P/E Ratio', format: 'number' },
    { key: 'pbRatio', label: 'P/B Ratio', format: 'number' },
    { key: 'roe', label: 'ROE (%)', format: 'percentage' },
    { key: 'debtToEquity', label: 'D/E Ratio', format: 'number' },
    { key: 'dividendYield', label: 'Div Yield (%)', format: 'percentage' }
  ];

  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return `₹${(value / 100).toFixed(0)} Cr`;
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'number':
        return value.toFixed(1);
      default:
        return value;
    }
  };

  const getComparisonColor = (currentValue, peerValue, metricKey) => {
    // For metrics where higher is better
    const higherIsBetter = ['roe', 'dividendYield'];
    // For metrics where lower is better
    const lowerIsBetter = ['peRatio', 'pbRatio', 'debtToEquity'];
    
    if (higherIsBetter.includes(metricKey)) {
      return currentValue > peerValue ? 'text-success' : currentValue < peerValue ? 'text-error' : 'text-secondary';
    } else if (lowerIsBetter.includes(metricKey)) {
      return currentValue < peerValue ? 'text-success' : currentValue > peerValue ? 'text-error' : 'text-secondary';
    }
    
    return 'text-text-primary';
  };

  const currentStock = peerData.find(stock => stock.isCurrent);
  const peers = peerData.filter(stock => !stock.isCurrent);

  return (
    <div className="bg-background rounded-lg p-4">
      <h3 className="font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="GitCompare" size={18} className="mr-2 text-primary" />
        Peer Comparison
      </h3>
      
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.key} className="bg-surface rounded-lg p-3">
            <h4 className="text-sm font-medium text-text-primary mb-3">{metric.label}</h4>
            
            <div className="space-y-2">
              {/* Current Stock */}
              <div className="flex items-center justify-between p-2 bg-primary-50 rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={14} className="text-primary" />
                  <span className="text-sm font-medium text-text-primary">
                    {currentStock?.symbol}
                  </span>
                </div>
                <span className="text-sm font-semibold text-text-primary">
                  {formatValue(currentStock?.[metric.key], metric.format)}
                </span>
              </div>
              
              {/* Peer Stocks */}
              {peers.map((peer) => (
                <div key={peer.symbol} className="flex items-center justify-between p-2 hover:bg-secondary-50 rounded transition-colors duration-150 ease-out">
                  <span className="text-sm text-text-secondary">{peer.symbol}</span>
                  <span className={`text-sm font-medium ${getComparisonColor(currentStock?.[metric.key], peer[metric.key], metric.key)}`}>
                    {formatValue(peer[metric.key], metric.format)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="mt-4 p-3 bg-surface rounded-lg">
        <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center">
          <Icon name="Target" size={14} className="mr-2 text-success" />
          Peer Analysis Summary
        </h4>
        <p className="text-xs text-text-secondary">
          {stockData?.symbol} shows competitive valuation metrics compared to sector peers. 
          Strong ROE and manageable debt levels indicate healthy financial position within the industry.
        </p>
      </div>
    </div>
  );
};

export default PeerComparison;