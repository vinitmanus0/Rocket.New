import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import MainSidebar from 'components/ui/MainSidebar';
import NavigationHeader from 'components/ui/NavigationHeader';
import QuickActionMenu from 'components/ui/QuickActionMenu';
import NotificationCenter from 'components/ui/NotificationCenter';
import PortfolioSummary from './components/PortfolioSummary';
import HoldingsList from './components/HoldingsList';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import AddInvestmentModal from './components/AddInvestmentModal';

const PortfolioTracker = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('performance');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const navigate = useNavigate();

  // Mock portfolio data
  const portfolioData = {
    totalValue: 1250000,
    totalInvestment: 1100000,
    dayPL: 15000,
    dayPLPercent: 1.2,
    totalPL: 150000,
    totalPLPercent: 13.64,
    lastUpdated: new Date()
  };

  const holdings = [
    {
      id: 1,
      symbol: 'RELIANCE',
      companyName: 'Reliance Industries Ltd.',
      quantity: 50,
      avgPrice: 2450,
      currentPrice: 2520,
      investmentValue: 122500,
      currentValue: 126000,
      dayChange: 25,
      dayChangePercent: 1.0,
      totalPL: 3500,
      totalPLPercent: 2.86,
      purchaseDate: '2024-01-15',
      dividendReceived: 1250,
      sector: 'Energy'
    },
    {
      id: 2,
      symbol: 'TCS',
      companyName: 'Tata Consultancy Services Ltd.',
      quantity: 30,
      avgPrice: 3650,
      currentPrice: 3780,
      investmentValue: 109500,
      currentValue: 113400,
      dayChange: 45,
      dayChangePercent: 1.2,
      totalPL: 3900,
      totalPLPercent: 3.56,
      purchaseDate: '2024-02-10',
      dividendReceived: 2100,
      sector: 'IT'
    },
    {
      id: 3,
      symbol: 'HDFCBANK',
      companyName: 'HDFC Bank Ltd.',
      quantity: 75,
      avgPrice: 1580,
      currentPrice: 1620,
      investmentValue: 118500,
      currentValue: 121500,
      dayChange: 12,
      dayChangePercent: 0.75,
      totalPL: 3000,
      totalPLPercent: 2.53,
      purchaseDate: '2024-01-20',
      dividendReceived: 1875,
      sector: 'Banking'
    },
    {
      id: 4,
      symbol: 'INFY',
      companyName: 'Infosys Ltd.',
      quantity: 40,
      avgPrice: 1450,
      currentPrice: 1425,
      investmentValue: 58000,
      currentValue: 57000,
      dayChange: -8,
      dayChangePercent: -0.56,
      totalPL: -1000,
      totalPLPercent: -1.72,
      purchaseDate: '2024-03-05',
      dividendReceived: 800,
      sector: 'IT'
    },
    {
      id: 5,
      symbol: 'ICICIBANK',
      companyName: 'ICICI Bank Ltd.',
      quantity: 60,
      avgPrice: 950,
      currentPrice: 985,
      investmentValue: 57000,
      currentValue: 59100,
      dayChange: 15,
      dayChangePercent: 1.55,
      totalPL: 2100,
      totalPLPercent: 3.68,
      purchaseDate: '2024-02-28',
      dividendReceived: 1200,
      sector: 'Banking'
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleStockClick = (symbol) => {
    navigate(`/stock-details-analysis?symbol=${symbol}`);
  };

  const filteredHoldings = holdings.filter(holding =>
    holding.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    holding.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    switch (sortBy) {
      case 'performance':
        return b.totalPLPercent - a.totalPLPercent;
      case 'alphabetical':
        return a.symbol.localeCompare(b.symbol);
      case 'investment':
        return b.investmentValue - a.investmentValue;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background flex">
      <MainSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <NavigationHeader />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                Portfolio Tracker
              </h1>
              <p className="text-text-secondary">
                Monitor your investments and track performance
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <NotificationCenter />
              
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 rounded-lg transition-colors duration-150 ease-out disabled:opacity-50"
              >
                <Icon 
                  name="RefreshCw" 
                  size={16} 
                  className={isRefreshing ? 'animate-spin' : ''} 
                />
                <span className="text-sm font-medium">
                  {isRefreshing ? 'Updating...' : 'Refresh'}
                </span>
              </button>
            </div>
          </div>

          {/* Portfolio Summary */}
          <PortfolioSummary 
            data={portfolioData}
            isRefreshing={isRefreshing}
          />

          {/* Controls Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500" 
              />
              <input
                type="text"
                placeholder="Search holdings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-150 ease-out"
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-text-secondary">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
              >
                <option value="performance">Performance</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="investment">Investment Amount</option>
              </select>
            </div>
          </div>

          {/* Holdings List */}
          <HoldingsList 
            holdings={sortedHoldings}
            onStockClick={handleStockClick}
            isRefreshing={isRefreshing}
          />

          {/* Performance Analytics */}
          <PerformanceAnalytics 
            holdings={holdings}
            portfolioData={portfolioData}
            selectedTimeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
          />

          {/* Add Investment Modal */}
          {showAddModal && (
            <AddInvestmentModal 
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
            />
          )}
        </main>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-primary hover:bg-primary-700 text-white rounded-full shadow-large flex items-center justify-center transition-all duration-200 ease-out hover:scale-110 z-200"
      >
        <Icon name="Plus" size={24} />
      </button>

      <QuickActionMenu />
    </div>
  );
};

export default PortfolioTracker;