import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import MainSidebar from 'components/ui/MainSidebar';
import NavigationHeader from 'components/ui/NavigationHeader';
import QuickActionMenu from 'components/ui/QuickActionMenu';
import NotificationCenter from 'components/ui/NotificationCenter';
import FilterSidebar from './components/FilterSidebar';
import StockResults from './components/StockResults';
import PresetTemplates from './components/PresetTemplates';
import SavedScreens from './components/SavedScreens';

const StockScreener = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState({
    marketCap: { min: 0, max: 1000000 },
    peRatio: { min: 0, max: 100 },
    debtToEquity: { min: 0, max: 5 },
    rsi: { min: 0, max: 100 },
    returns1Y: { min: -100, max: 500 },
    dividend: { min: 0, max: 15 },
    sector: [],
    exchange: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState([]);

  // Mock stock data
  const mockStocks = [
    {
      id: 1,
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      price: 2485.50,
      change: 45.30,
      changePercent: 1.86,
      marketCap: 1678450,
      peRatio: 24.5,
      debtToEquity: 0.35,
      rsi: 65.2,
      returns1Y: 12.5,
      dividend: 2.8,
      sector: 'Energy',
      exchange: 'NSE',
      volume: 2450000,
      aiScore: 85,
      logo: 'https://logo.clearbit.com/ril.com'
    },
    {
      id: 2,
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: 3542.80,
      change: -28.90,
      changePercent: -0.81,
      marketCap: 1289650,
      peRatio: 28.3,
      debtToEquity: 0.08,
      rsi: 45.8,
      returns1Y: 8.2,
      dividend: 3.2,
      sector: 'IT',
      exchange: 'NSE',
      volume: 1850000,
      aiScore: 78,
      logo: 'https://logo.clearbit.com/tcs.com'
    },
    {
      id: 3,
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Ltd',
      price: 1642.35,
      change: 12.75,
      changePercent: 0.78,
      marketCap: 1245780,
      peRatio: 19.8,
      debtToEquity: 0.12,
      rsi: 58.4,
      returns1Y: 15.8,
      dividend: 1.8,
      sector: 'Banking',
      exchange: 'NSE',
      volume: 3200000,
      aiScore: 82,
      logo: 'https://logo.clearbit.com/hdfcbank.com'
    },
    {
      id: 4,
      symbol: 'INFY',
      name: 'Infosys Ltd',
      price: 1456.90,
      change: 18.45,
      changePercent: 1.28,
      marketCap: 612450,
      peRatio: 22.1,
      debtToEquity: 0.05,
      rsi: 62.1,
      returns1Y: 18.5,
      dividend: 2.5,
      sector: 'IT',
      exchange: 'NSE',
      volume: 1950000,
      aiScore: 79,
      logo: 'https://logo.clearbit.com/infosys.com'
    },
    {
      id: 5,
      symbol: 'ITC',
      name: 'ITC Ltd',
      price: 412.80,
      change: -2.15,
      changePercent: -0.52,
      marketCap: 512890,
      peRatio: 26.8,
      debtToEquity: 0.18,
      rsi: 42.3,
      returns1Y: 5.2,
      dividend: 5.8,
      sector: 'FMCG',
      exchange: 'NSE',
      volume: 4500000,
      aiScore: 72,
      logo: 'https://logo.clearbit.com/itcportal.com'
    },
    {
      id: 6,
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever Ltd',
      price: 2654.20,
      change: 35.80,
      changePercent: 1.37,
      marketCap: 623450,
      peRatio: 58.2,
      debtToEquity: 0.02,
      rsi: 68.9,
      returns1Y: 22.8,
      dividend: 3.5,
      sector: 'FMCG',
      exchange: 'NSE',
      volume: 890000,
      aiScore: 88,
      logo: 'https://logo.clearbit.com/hul.co.in'
    },
    {
      id: 7,
      symbol: 'ICICIBANK',
      name: 'ICICI Bank Ltd',
      price: 985.45,
      change: 8.90,
      changePercent: 0.91,
      marketCap: 689750,
      peRatio: 16.5,
      debtToEquity: 0.15,
      rsi: 55.7,
      returns1Y: 28.5,
      dividend: 2.2,
      sector: 'Banking',
      exchange: 'NSE',
      volume: 2800000,
      aiScore: 84,
      logo: 'https://logo.clearbit.com/icicibank.com'
    },
    {
      id: 8,
      symbol: 'BHARTIARTL',
      name: 'Bharti Airtel Ltd',
      price: 1124.60,
      change: -15.30,
      changePercent: -1.34,
      marketCap: 634520,
      peRatio: 32.4,
      debtToEquity: 1.25,
      rsi: 38.2,
      returns1Y: 45.8,
      dividend: 1.2,
      sector: 'Telecom',
      exchange: 'NSE',
      volume: 1650000,
      aiScore: 76,
      logo: 'https://logo.clearbit.com/airtel.in'
    }
  ];

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [activeFilters, searchQuery, selectedTemplate]);

  const applyFilters = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...mockStocks];

      // Apply search query
      if (searchQuery) {
        filtered = filtered.filter(stock => 
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply filters
      filtered = filtered.filter(stock => {
        return (
          stock.marketCap >= activeFilters.marketCap.min &&
          stock.marketCap <= activeFilters.marketCap.max &&
          stock.peRatio >= activeFilters.peRatio.min &&
          stock.peRatio <= activeFilters.peRatio.max &&
          stock.debtToEquity >= activeFilters.debtToEquity.min &&
          stock.debtToEquity <= activeFilters.debtToEquity.max &&
          stock.rsi >= activeFilters.rsi.min &&
          stock.rsi <= activeFilters.rsi.max &&
          stock.returns1Y >= activeFilters.returns1Y.min &&
          stock.returns1Y <= activeFilters.returns1Y.max &&
          stock.dividend >= activeFilters.dividend.min &&
          stock.dividend <= activeFilters.dividend.max &&
          (activeFilters.sector.length === 0 || activeFilters.sector.includes(stock.sector)) &&
          (activeFilters.exchange.length === 0 || activeFilters.exchange.includes(stock.exchange))
        );
      });

      // Apply sorting
      filtered.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setFilteredStocks(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setActiveFilters(template.filters);
  };

  const handleStockSelect = (stockId) => {
    setSelectedStocks(prev => {
      if (prev.includes(stockId)) {
        return prev.filter(id => id !== stockId);
      } else {
        return [...prev, stockId];
      }
    });
  };

  const handleAddToWatchlist = (stock) => {
    console.log('Adding to watchlist:', stock.symbol);
  };

  const handleViewDetails = (stock) => {
    navigate(`/stock-details-analysis?symbol=${stock.symbol}`);
  };

  const handleCompareStocks = () => {
    if (selectedStocks.length > 1) {
      const symbols = selectedStocks.map(id => {
        const stock = filteredStocks.find(s => s.id === id);
        return stock?.symbol;
      }).join(',');
      navigate(`/stock-details-analysis?compare=${symbols}`);
    }
  };

  const exportResults = (format) => {
    console.log(`Exporting results as ${format}`);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <MainSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <NavigationHeader />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Stock Screener</h1>
                <p className="text-text-secondary">
                  Discover investment opportunities with AI-powered screening
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <NotificationCenter />
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`p-2 rounded-lg transition-colors duration-150 ease-out ${
                      viewMode === 'cards' ?'bg-primary text-white' :'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                    }`}
                  >
                    <Icon name="Grid3X3" size={18} />
                  </button>
                  
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-lg transition-colors duration-150 ease-out ${
                      viewMode === 'table' ?'bg-primary text-white' :'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                    }`}
                  >
                    <Icon name="List" size={18} />
                  </button>
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-primary px-4 py-2 rounded-lg font-medium"
                >
                  <Icon name="Filter" size={18} className="mr-2" />
                  Filters
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Icon
                name="Search"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500"
              />
              <input
                type="text"
                placeholder="Search stocks by symbol or company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-150 ease-out"
              />
            </div>

            {/* Preset Templates */}
            <PresetTemplates
              onTemplateSelect={handleTemplateSelect}
              selectedTemplate={selectedTemplate}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Sidebar */}
            <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <FilterSidebar
                filters={activeFilters}
                onFiltersChange={setActiveFilters}
                resultCount={filteredStocks.length}
              />
              
              <div className="mt-6">
                <SavedScreens />
              </div>
            </div>

            {/* Results Section */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <span className="text-text-secondary">
                    {isLoading ? 'Searching...' : `${filteredStocks.length} stocks found`}
                  </span>
                  
                  {selectedStocks.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-primary font-medium">
                        {selectedStocks.length} selected
                      </span>
                      
                      {selectedStocks.length > 1 && (
                        <button
                          onClick={handleCompareStocks}
                          className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-150 ease-out"
                        >
                          Compare
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split('-');
                      setSortBy(field);
                      setSortOrder(order);
                    }}
                    className="px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="marketCap-desc">Market Cap (High to Low)</option>
                    <option value="marketCap-asc">Market Cap (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="changePercent-desc">Change % (High to Low)</option>
                    <option value="changePercent-asc">Change % (Low to High)</option>
                    <option value="aiScore-desc">AI Score (High to Low)</option>
                    <option value="returns1Y-desc">1Y Returns (High to Low)</option>
                  </select>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => exportResults('csv')}
                      className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-all duration-150 ease-out"
                      title="Export as CSV"
                    >
                      <Icon name="Download" size={18} />
                    </button>
                    
                    <button
                      onClick={() => exportResults('pdf')}
                      className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-all duration-150 ease-out"
                      title="Export as PDF"
                    >
                      <Icon name="FileText" size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stock Results */}
              <StockResults
                stocks={filteredStocks}
                viewMode={viewMode}
                isLoading={isLoading}
                selectedStocks={selectedStocks}
                onStockSelect={handleStockSelect}
                onAddToWatchlist={handleAddToWatchlist}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </main>
      </div>

      <QuickActionMenu />
    </div>
  );
};

export default StockScreener;