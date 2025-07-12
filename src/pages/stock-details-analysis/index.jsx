import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';
import MainSidebar from 'components/ui/MainSidebar';
import NavigationHeader from 'components/ui/NavigationHeader';
import QuickActionMenu from 'components/ui/QuickActionMenu';

import StockChart from './components/StockChart';
import KeyMetrics from './components/KeyMetrics';
import FinancialsSection from './components/FinancialsSection';
import TechnicalIndicators from './components/TechnicalIndicators';
import NewsSection from './components/NewsSection';
import PeerComparison from './components/PeerComparison';
import AIAnalysis from './components/AIAnalysis';
import RelatedStocks from './components/RelatedStocks';
import Image from '../../components/AppImage';


const StockDetailsAnalysis = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [priceAlertSet, setPriceAlertSet] = useState(false);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  const symbol = searchParams.get('symbol') || 'RELIANCE';

  // Mock stock data
  const mockStockData = {
    RELIANCE: {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Limited',
      currentPrice: 2485.75,
      change: 45.30,
      changePercent: 1.86,
      dayHigh: 2495.80,
      dayLow: 2440.20,
      volume: 12450000,
      marketCap: 1678500000000,
      peRatio: 24.5,
      pbRatio: 2.1,
      dividendYield: 0.35,
      weekHigh52: 2856.15,
      weekLow52: 2220.30,
      sector: 'Oil & Gas',
      industry: 'Refineries',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      description: `Reliance Industries Limited is India's largest private sector company on all major financial parameters. RIL's activities span hydrocarbon exploration and production, petroleum refining and marketing, petrochemicals, retail and digital services. The company operates the world's largest refining complex at Jamnagar with a combined capacity of 1.24 million barrels per day. RIL is also India's largest producer of petrochemicals with a manufacturing capacity of over 20 million tonnes per annum.`,
      aiRecommendation: 'BUY',
      aiScore: 8.2,
      aiInsight: `Strong fundamentals with robust cash flows from refining and petrochemicals business. Digital services segment showing exceptional growth. Recent expansion in renewable energy presents long-term value creation opportunities.

Key positives include debt reduction, strong operational performance, and strategic investments in future technologies. The stock is trading at attractive valuations compared to historical averages.`
    },
    TCS: {
      symbol: 'TCS',
      name: 'Tata Consultancy Services Limited',
      currentPrice: 3542.85,
      change: -28.45,
      changePercent: -0.80,
      dayHigh: 3580.20,
      dayLow: 3535.10,
      volume: 8750000,
      marketCap: 1295600000000,
      peRatio: 28.3,
      pbRatio: 12.8,
      dividendYield: 1.2,
      weekHigh52: 4043.75,
      weekLow52: 3056.65,
      sector: 'Information Technology',
      industry: 'IT Services',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center',
      description: `Tata Consultancy Services is an Indian multinational information technology services and consulting company headquartered in Mumbai. It is a part of the Tata Group and operates in 149 locations across 46 countries.

TCS is one of the largest Indian companies by market capitalization and has been ranked among the most valuable IT services brands worldwide. The company provides a wide range of IT services, business solutions and outsourcing services.`,
      aiRecommendation: 'HOLD',
      aiScore: 7.5,
      aiInsight: `Solid fundamentals with consistent revenue growth and strong client relationships. However, facing headwinds from economic uncertainties and reduced IT spending by clients.

The company's strong balance sheet and market leadership position provide stability, but near-term growth may be challenged by macro factors.`
    }
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStockData(mockStockData[symbol] || mockStockData.RELIANCE);
      setLoading(false);
    }, 1000);
  }, [symbol]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'charts', label: 'Charts', icon: 'TrendingUp' },
    { id: 'news', label: 'News', icon: 'Newspaper' },
    { id: 'financials', label: 'Financials', icon: 'Calculator' }
  ];

  const handleAddToWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  const handleSetAlert = () => {
    setPriceAlertSet(!priceAlertSet);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${stockData?.name} - Stock Analysis`,
        text: `Check out the analysis for ${stockData?.symbol} on StockSight AI`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex">
        <MainSidebar />
        <div className="flex-1 md:ml-64">
          <NavigationHeader />
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading stock data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <MainSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <NavigationHeader />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
          {/* Stock Header */}
          <div className="sticky top-16 z-50 bg-surface border-b border-border">
            <div className="px-4 md:px-6 py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary-100 flex-shrink-0">
                    <Image
                      src={stockData?.logo}
                      alt={stockData?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="text-xl md:text-2xl font-bold text-text-primary">
                        {stockData?.symbol}
                      </h1>
                      <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                        {stockData?.sector}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary truncate max-w-xs md:max-w-none">
                      {stockData?.name}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end space-x-4">
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-bold text-text-primary">
                      {formatCurrency(stockData?.currentPrice)}
                    </div>
                    <div className={`flex items-center justify-end space-x-1 text-sm font-medium ${
                      stockData?.change >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      <Icon 
                        name={stockData?.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                        size={16} 
                      />
                      <span>
                        {stockData?.change >= 0 ? '+' : ''}{stockData?.change?.toFixed(2)} 
                        ({stockData?.change >= 0 ? '+' : ''}{stockData?.changePercent?.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleAddToWatchlist}
                      className={`p-2 rounded-lg transition-all duration-150 ease-out ${
                        isInWatchlist
                          ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      <Icon name={isInWatchlist ? 'Heart' : 'Plus'} size={18} />
                    </button>
                    
                    <button
                      onClick={handleSetAlert}
                      className={`p-2 rounded-lg transition-all duration-150 ease-out ${
                        priceAlertSet
                          ? 'bg-warning text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                      }`}
                    >
                      <Icon name="Bell" size={18} />
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className="p-2 bg-secondary-100 text-secondary-700 hover:bg-secondary-200 rounded-lg transition-all duration-150 ease-out"
                    >
                      <Icon name="Share2" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 md:px-6 py-4 border-b border-border bg-surface">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-white' :'text-secondary-600 hover:text-text-primary hover:bg-secondary-100'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Primary Content */}
            <div className="flex-1 p-4 md:p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <StockChart stockData={stockData} />
                  <KeyMetrics stockData={stockData} />
                  <AIAnalysis stockData={stockData} />
                </div>
              )}
              
              {activeTab === 'charts' && (
                <div className="space-y-6">
                  <StockChart stockData={stockData} showAdvanced={true} />
                  <TechnicalIndicators stockData={stockData} />
                </div>
              )}
              
              {activeTab === 'news' && (
                <NewsSection symbol={stockData?.symbol} />
              )}
              
              {activeTab === 'financials' && (
                <FinancialsSection stockData={stockData} />
              )}
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block w-80 p-6 border-l border-border bg-surface">
              <div className="space-y-6">
                <RelatedStocks currentSymbol={stockData?.symbol} />
                <PeerComparison stockData={stockData} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <QuickActionMenu />
    </div>
  );
};

export default StockDetailsAnalysis;