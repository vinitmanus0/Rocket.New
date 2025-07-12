import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import MainSidebar from 'components/ui/MainSidebar';
import NavigationHeader from 'components/ui/NavigationHeader';
import QuickActionMenu from 'components/ui/QuickActionMenu';
import NotificationCenter from 'components/ui/NotificationCenter';
import MarketOverview from './components/MarketOverview';
import SectorAnalysis from './components/SectorAnalysis';
import TechnicalAnalysis from './components/TechnicalAnalysis';
import AIInsights from './components/AIInsights';

const MarketAnalyticsHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('1D');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    {
      id: 'overview',
      label: 'Market Overview',
      icon: 'BarChart3',
      description: 'Comprehensive market snapshot'
    },
    {
      id: 'sectors',
      label: 'Sector Analysis',
      icon: 'PieChart',
      description: 'Industry performance insights'
    },
    {
      id: 'technical',
      label: 'Technical Analysis',
      icon: 'TrendingUp',
      description: 'Market indicators & patterns'
    },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      icon: 'Brain',
      description: 'ML predictions & sentiment'
    }
  ];

  const timeframes = [
    { value: '1D', label: '1 Day' },
    { value: '1W', label: '1 Week' },
    { value: '1M', label: '1 Month' },
    { value: '3M', label: '3 Months' },
    { value: '6M', label: '6 Months' },
    { value: '1Y', label: '1 Year' }
  ];

  const handleTabChange = (tabId) => {
    setIsLoading(true);
    setActiveTab(tabId);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleExportData = () => {
    console.log('Exporting analytics data...');
  };

  const renderActiveTab = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return <MarketOverview timeframe={timeframe} />;
      case 'sectors':
        return <SectorAnalysis timeframe={timeframe} />;
      case 'technical':
        return <TechnicalAnalysis timeframe={timeframe} />;
      case 'ai-insights':
        return <AIInsights timeframe={timeframe} />;
      default:
        return <MarketOverview timeframe={timeframe} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <MainSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <NavigationHeader />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                  Market Analytics Hub
                </h1>
                <p className="text-text-secondary">
                  Comprehensive market insights and trend analysis for strategic investment planning
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <NotificationCenter />
                
                {/* Timeframe Selector */}
                <div className="flex items-center space-x-2 bg-surface rounded-lg p-1 border border-border">
                  {timeframes.map((tf) => (
                    <button
                      key={tf.value}
                      onClick={() => setTimeframe(tf.value)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ease-out ${
                        timeframe === tf.value
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                      }`}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>
                
                {/* Export Button */}
                <button
                  onClick={handleExportData}
                  className="btn-secondary px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out flex items-center space-x-2"
                >
                  <Icon name="Download" size={16} />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-150 ease-out ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderActiveTab()}
          </div>
        </main>
      </div>

      <QuickActionMenu />
    </div>
  );
};

export default MarketAnalyticsHub;