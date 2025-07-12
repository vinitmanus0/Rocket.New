import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const AddInvestmentModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  // Mock stock search results
  const mockStocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', price: 2520, sector: 'Energy' },
    { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.', price: 3780, sector: 'IT' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', price: 1620, sector: 'Banking' },
    { symbol: 'INFY', name: 'Infosys Ltd.', price: 1425, sector: 'IT' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.', price: 985, sector: 'Banking' },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', price: 2650, sector: 'FMCG' },
    { symbol: 'ITC', name: 'ITC Ltd.', price: 420, sector: 'FMCG' },
    { symbol: 'SBIN', name: 'State Bank of India', price: 580, sector: 'Banking' }
  ];

  const filteredStocks = mockStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setPrice(stock.price.toString());
    setSearchQuery('');
  };

  const handleAddInvestment = () => {
    if (selectedStock && quantity && price) {
      console.log('Adding investment:', {
        stock: selectedStock,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        totalValue: parseInt(quantity) * parseFloat(price)
      });
      onClose();
    }
  };

  const handleGoToScreener = () => {
    onClose();
    navigate('/stock-screener');
  };

  const totalValue = quantity && price ? parseInt(quantity) * parseFloat(price) : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-500 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl shadow-large max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Add Investment</h2>
          <button
            onClick={onClose}
            className="p-2 text-secondary-500 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-150 ease-out"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!selectedStock ? (
            <>
              {/* Stock Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Search Stock
                </label>
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" 
                  />
                  <input
                    type="text"
                    placeholder="Enter stock symbol or company name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-150 ease-out"
                  />
                </div>
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-text-secondary mb-3">Search Results</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredStocks.length > 0 ? (
                      filteredStocks.map((stock) => (
                        <button
                          key={stock.symbol}
                          onClick={() => handleStockSelect(stock)}
                          className="w-full p-3 text-left bg-background hover:bg-surface-hover border border-border rounded-lg transition-colors duration-150 ease-out"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-text-primary">{stock.symbol}</div>
                              <div className="text-sm text-text-secondary truncate">{stock.name}</div>
                              <div className="text-xs text-text-muted">{stock.sector}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-text-primary">
                                {formatCurrency(stock.price)}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-4 text-text-muted">
                        No stocks found matching your search
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Action */}
              <div className="text-center">
                <p className="text-sm text-text-muted mb-4">
                  Can't find the stock you're looking for?
                </p>
                <button
                  onClick={handleGoToScreener}
                  className="btn-secondary px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out"
                >
                  <Icon name="Search" size={16} className="mr-2" />
                  Go to Stock Screener
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Selected Stock */}
              <div className="mb-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary">{selectedStock.symbol}</h3>
                    <p className="text-sm text-text-secondary">{selectedStock.name}</p>
                    <p className="text-xs text-text-muted">{selectedStock.sector}</p>
                  </div>
                  <button
                    onClick={() => setSelectedStock(null)}
                    className="p-1 text-secondary-500 hover:text-text-primary transition-colors duration-150 ease-out"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>

              {/* Investment Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-150 ease-out"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Price per Share
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-150 ease-out"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    Current market price: {formatCurrency(selectedStock.price)}
                  </p>
                </div>

                {totalValue > 0 && (
                  <div className="p-4 bg-success-50 border border-success-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-text-secondary">Total Investment:</span>
                      <span className="text-lg font-bold text-text-primary">
                        {formatCurrency(totalValue)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {selectedStock && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <button
              onClick={onClose}
              className="px-4 py-2 text-secondary-600 hover:text-text-primary transition-colors duration-150 ease-out"
            >
              Cancel
            </button>
            <button
              onClick={handleAddInvestment}
              disabled={!quantity || !price}
              className="btn-primary px-6 py-2 rounded-lg font-medium transition-all duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Investment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddInvestmentModal;