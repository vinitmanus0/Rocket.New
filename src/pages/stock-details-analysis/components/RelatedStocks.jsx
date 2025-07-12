import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RelatedStocks = ({ currentSymbol }) => {
  const navigate = useNavigate();

  const relatedStocks = [
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: 3542.85,
      change: -28.45,
      changePercent: -0.80,
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=50&h=50&fit=crop&crop=center'
    },
    {
      symbol: 'INFY',
      name: 'Infosys Limited',
      price: 1456.30,
      change: 12.75,
      changePercent: 0.88,
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop&crop=center'
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Limited',
      price: 1678.90,
      change: 8.45,
      changePercent: 0.51,
      logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=50&h=50&fit=crop&crop=center'
    },
    {
      symbol: 'ICICIBANK',
      name: 'ICICI Bank Limited',
      price: 1089.25,
      change: -5.60,
      changePercent: -0.51,
      logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=50&h=50&fit=crop&crop=center'
    },
    {
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever',
      price: 2456.80,
      change: 18.90,
      changePercent: 0.78,
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=50&h=50&fit=crop&crop=center'
    }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const handleStockClick = (symbol) => {
    navigate(`/stock-details-analysis?symbol=${symbol}`);
  };

  return (
    <div className="bg-background rounded-lg p-4">
      <h3 className="font-semibold text-text-primary mb-4 flex items-center">
        <Icon name="TrendingUp" size={18} className="mr-2 text-primary" />
        Related Stocks
      </h3>
      
      <div className="space-y-3">
        {relatedStocks
          .filter(stock => stock.symbol !== currentSymbol)
          .slice(0, 4)
          .map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => handleStockClick(stock.symbol)}
              className="w-full flex items-center space-x-3 p-3 bg-surface rounded-lg hover:shadow-medium transition-all duration-150 ease-out micro-interaction"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-secondary-100 flex-shrink-0">
                <Image
                  src={stock.logo}
                  alt={stock.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 text-left min-w-0">
                <div className="font-medium text-text-primary text-sm truncate">
                  {stock.symbol}
                </div>
                <div className="text-xs text-text-secondary truncate">
                  {stock.name}
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-text-primary">
                  {formatCurrency(stock.price)}
                </div>
                <div className={`text-xs font-medium flex items-center justify-end ${
                  stock.change >= 0 ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={stock.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                    className="mr-1" 
                  />
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </button>
          ))}
      </div>
      
      <button
        onClick={() => navigate('/stock-screener')}
        className="w-full mt-4 p-2 text-center text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-150 ease-out"
      >
        View More Stocks
      </button>
    </div>
  );
};

export default RelatedStocks;