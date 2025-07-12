import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from 'components/ui/MainSidebar';

import NotificationCenter from 'components/ui/NotificationCenter';
import QuickActionMenu from 'components/ui/QuickActionMenu';
import MarketStatusBanner from './components/MarketStatusBanner';
import PortfolioSummaryCard from './components/PortfolioSummaryCard';
import WatchlistPreview from './components/WatchlistPreview';
import MarketMovers from './components/MarketMovers';
import AIInsightsCard from './components/AIInsightsCard';
import NewsTicker from './components/NewsTicker';
import Icon from 'components/AppIcon';

const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [marketData, setMarketData] = useState({});
  const navigate = useNavigate();

  // Mock market data
  const mockMarketData = {
    nifty: {
      value: 19847.25,
      change: 156.75,
      changePercent: 0.80,
      isPositive: true
    },
    sensex: {
      value: 66589.93,
      change: 528.17,
      changePercent: 0.80,
      isPositive: true
    },
    marketStatus: 'OPEN',
    lastUpdated: new Date()
  };

  const mockPortfolioData = {
    totalValue: 2847650,
    dayChange: 22840,
    dayChangePercent: 0.81,
    totalGainLoss: 184750,
    totalGainLossPercent: 6.95,
    isPositive: true
  };

  const mockWatchlistData = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      price: 2456.80,
      change: 18.45,
      changePercent: 0.76,
      isPositive: true
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: 3542.15,
      change: -12.30,
      changePercent: -0.35,
      isPositive: false
    },
    {
      symbol: 'INFY',
      name: 'Infosys Limited',
      price: 1456.90,
      change: 24.65,
      changePercent: 1.72,
      isPositive: true
    },
    {
      symbol: 'HDFC',
      name: 'HDFC Bank Limited',
      price: 1634.25,
      change: -8.75,
      changePercent: -0.53,
      isPositive: false
    },
    {
      symbol: 'ICICIBANK',
      name: 'ICICI Bank Limited',
      price: 945.60,
      change: 15.20,
      changePercent: 1.63,
      isPositive: true
    }
  ];

  const mockTopGainers = [
    { symbol: 'ADANIPORTS', name: 'Adani Ports & SEZ', change: 4.85, changePercent: 5.12 },
    { symbol: 'TATASTEEL', name: 'Tata Steel Limited', change: 6.25, changePercent: 4.78 },
    { symbol: 'JSWSTEEL', name: 'JSW Steel Limited', change: 28.40, changePercent: 4.23 },
    { symbol: 'HINDALCO', name: 'Hindalco Industries', change: 18.75, changePercent: 3.95 }
  ];

  const mockTopLosers = [
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Limited', change: -89.45, changePercent: -1.85 },
    { symbol: 'HCLTECH', name: 'HCL Technologies', change: -18.30, changePercent: -1.62 },
    { symbol: 'WIPRO', name: 'Wipro Limited', change: -6.75, changePercent: -1.45 },
    { symbol: 'TECHM', name: 'Tech Mahindra Limited', change: -15.20, changePercent: -1.28 }
  ];

  const mockAIInsights = [
    {
      type: 'recommendation',
      title: 'Banking Sector Outlook',
      message: 'Banking stocks showing strong momentum with improving NPA ratios. Consider increasing allocation.',
      confidence: 85,
      action: 'BUY'
    },
    {
      type: 'alert',
      title: 'IT Sector Caution',
      message: 'IT stocks facing headwinds due to global economic uncertainty. Monitor closely.',
      confidence: 72,
      action: 'HOLD'
    },
    {
      type: 'opportunity',
      title: 'Pharma Breakout',
      message: 'Pharmaceutical sector showing technical breakout patterns. Good entry opportunity.',
      confidence: 78,
      action: 'BUY'
    }
  ];

  const mockNewsData = [
    {
      id: 1,
      headline: 'RBI maintains repo rate at 6.5%, focuses on inflation control',
      sentiment: 'neutral',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 2,
      headline: 'IT sector Q3 results exceed expectations, TCS leads the pack',
      sentiment: 'positive',
      timestamp: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: 3,
      headline: 'Banking stocks rally on improved credit growth numbers',
      sentiment: 'positive',
      timestamp: new Date(Date.now() - 60 * 60 * 1000)
    },
    {
      id: 4,
      headline: 'Oil prices surge impacts energy sector stocks negatively',
      sentiment: 'negative',
      timestamp: new Date(Date.now() - 90 * 60 * 1000)
    }
  ];

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setMarketData(mockMarketData);
      setIsLoading(false);
    }, 1000);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        lastUpdated: new Date()
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <MainSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-100 bg-surface border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={16} />
                <span>Last updated: {marketData.lastUpdated?.toLocaleTimeString('en-IN')}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <button
                onClick={() => navigate('/profile-settings')}
                className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-all duration-150 ease-out"
              >
                <Icon name="User" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6">
          {/* Market Status Banner */}
          <MarketStatusBanner marketData={marketData} />

          {/* News Ticker */}
          <NewsTicker newsData={mockNewsData} />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Portfolio Summary */}
            <div className="xl:col-span-1">
              <PortfolioSummaryCard 
                portfolioData={mockPortfolioData}
                onViewMore={() => navigate('/portfolio-tracker')}
              />
            </div>

            {/* Watchlist Preview */}
            <div className="xl:col-span-1">
              <WatchlistPreview 
                watchlistData={mockWatchlistData}
                onViewMore={() => navigate('/stock-screener')}
                onStockClick={(symbol) => navigate(`/stock-details-analysis?symbol=${symbol}`)}
              />
            </div>

            {/* AI Insights */}
            <div className="xl:col-span-1">
              <AIInsightsCard 
                insights={mockAIInsights}
                onViewMore={() => navigate('/market-analytics-hub')}
              />
            </div>
          </div>

          {/* Market Movers Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketMovers 
              title="Top Gainers"
              data={mockTopGainers}
              type="gainers"
              onViewMore={() => navigate('/market-analytics-hub')}
              onStockClick={(symbol) => navigate(`/stock-details-analysis?symbol=${symbol}`)}
            />
            
            <MarketMovers 
              title="Top Losers"
              data={mockTopLosers}
              type="losers"
              onViewMore={() => navigate('/market-analytics-hub')}
              onStockClick={(symbol) => navigate(`/stock-details-analysis?symbol=${symbol}`)}
            />
          </div>

          {/* Quick Actions Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/stock-screener')}
              className="card card-hover p-6 text-center transition-all duration-150 ease-out micro-interaction"
            >
              <Icon name="Search" size={32} className="text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary mb-2">Stock Screener</h3>
              <p className="text-sm text-text-secondary">Find stocks based on your criteria</p>
            </button>

            <button
              onClick={() => navigate('/market-analytics-hub')}
              className="card card-hover p-6 text-center transition-all duration-150 ease-out micro-interaction"
            >
              <Icon name="TrendingUp" size={32} className="text-success mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary mb-2">Market Analytics</h3>
              <p className="text-sm text-text-secondary">Comprehensive market insights</p>
            </button>

            <button
              onClick={() => navigate('/portfolio-tracker')}
              className="card card-hover p-6 text-center transition-all duration-150 ease-out micro-interaction"
            >
              <Icon name="PieChart" size={32} className="text-accent mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary mb-2">Portfolio</h3>
              <p className="text-sm text-text-secondary">Track your investments</p>
            </button>

            <button
              onClick={() => navigate('/stock-details-analysis')}
              className="card card-hover p-6 text-center transition-all duration-150 ease-out micro-interaction"
            >
              <Icon name="BarChart3" size={32} className="text-warning mx-auto mb-3" />
              <h3 className="font-semibold text-text-primary mb-2">Stock Analysis</h3>
              <p className="text-sm text-text-secondary">Detailed stock insights</p>
            </button>
          </div>
        </div>
      </div>

      <QuickActionMenu />

      {/* Mobile Bottom Padding */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default DashboardHome;