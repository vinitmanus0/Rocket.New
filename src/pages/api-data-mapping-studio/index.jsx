import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainSidebar from 'components/ui/MainSidebar';
import NotificationCenter from 'components/ui/NotificationCenter';
import Icon from 'components/AppIcon';
import DataPreview from './components/DataPreview';
import WidgetGallery from './components/WidgetGallery';
import WidgetConfigurationModal from './components/WidgetConfigurationModal';

const APIDataMappingStudio = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedApi, setSelectedApi] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);
  const [mappings, setMappings] = useState([]);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configuring, setConfiguring] = useState(null);

  // Mock APIs data
  const mockApis = [
    {
      id: 1,
      name: 'Alpha Vantage Stock Data',
      type: 'REST',
      endpoint: 'https://www.alphavantage.co/query',
      status: 'connected'
    },
    {
      id: 2,
      name: 'Yahoo Finance API',
      type: 'REST',
      endpoint: 'https://query1.finance.yahoo.com/v8/finance/chart',
      status: 'connected'
    },
    {
      id: 3,
      name: 'Finnhub WebSocket',
      type: 'WebSocket',
      endpoint: 'wss://ws.finnhub.io',
      status: 'disconnected'
    }
  ];

  // Mock API response data
  const mockApiData = {
    "Meta Data": {
      "1. Information": "Intraday (5min) open, high, low, close prices and volume",
      "2. Symbol": "AAPL",
      "3. Last Refreshed": "2024-01-15 20:00:00",
      "4. Interval": "5min",
      "5. Output Size": "Compact",
      "6. Time Zone": "US/Eastern"
    },
    "Time Series (5min)": {
      "2024-01-15 20:00:00": {
        "1. open": "185.2100",
        "2. high": "185.3300",
        "3. low": "185.1500",
        "4. close": "185.2500",
        "5. volume": "25847"
      },
      "2024-01-15 19:55:00": {
        "1. open": "185.1800",
        "2. high": "185.2400",
        "3. low": "185.1000",
        "4. close": "185.2100",
        "5. volume": "18254"
      }
    },
    "current_price": 185.25,
    "change": 2.15,
    "change_percent": 1.17,
    "volume": 45231654,
    "market_cap": 2876543210000,
    "pe_ratio": 28.5,
    "dividend_yield": 0.52,
    "52_week_high": 198.23,
    "52_week_low": 124.17,
    "news": [
      {
        "headline": "Apple Reports Strong Q4 Earnings",
        "summary": "Apple Inc. reported better-than-expected quarterly earnings...",
        "published_at": "2024-01-15T18:30:00Z",
        "sentiment": "positive",
        "source": "MarketWatch"
      },
      {
        "headline": "iPhone Sales Exceed Expectations",
        "summary": "The latest iPhone models have seen strong demand...",
        "published_at": "2024-01-15T16:45:00Z",
        "sentiment": "positive",
        "source": "TechCrunch"
      }
    ]
  };

  useEffect(() => {
    const apiId = searchParams.get('apiId');
    if (apiId) {
      const api = mockApis.find(a => a.id === parseInt(apiId));
      if (api) {
        setSelectedApi(api);
        setApiData(mockApiData);
      }
    }
  }, [searchParams]);

  const handleApiSelect = (api) => {
    setSelectedApi(api);
    if (api.status === 'connected') {
      setApiData(mockApiData);
    } else {
      setApiData(null);
    }
  };

  const handleFieldSelect = (path, value, type) => {
    const existingIndex = selectedFields.findIndex(field => field.path === path);
    
    if (existingIndex >= 0) {
      // Remove if already selected
      setSelectedFields(prev => prev.filter((_, index) => index !== existingIndex));
    } else {
      // Add new field
      setSelectedFields(prev => [...prev, { path, value, type }]);
    }
  };

  const handleWidgetSelect = (widget, field) => {
    setConfiguring({ widget, field });
    setShowConfigModal(true);
  };

  const handleSaveMapping = (mapping) => {
    setMappings(prev => [...prev, mapping]);
    setShowConfigModal(false);
    setConfiguring(null);
  };

  const handleRemoveMapping = (mappingId) => {
    setMappings(prev => prev.filter(m => m.id !== mappingId));
  };

  const handleExportMappings = () => {
    const exportData = {
      api: selectedApi,
      mappings: mappings,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `api-mappings-${selectedApi?.name || 'export'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateWidgets = () => {
    if (mappings.length === 0) {
      alert('No mappings configured. Please create some widget mappings first.');
      return;
    }
    
    // In a real application, this would integrate with the dashboard
    alert(`Generated ${mappings.length} widgets for dashboard integration!`);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <MainSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-100 bg-surface border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <nav className="flex items-center space-x-2 text-sm text-text-secondary">
                <button 
                  onClick={() => navigate('/dashboard-home')}
                  className="hover:text-text-primary transition-colors"
                >
                  Dashboard
                </button>
                <Icon name="ChevronRight" size={16} />
                <button 
                  onClick={() => navigate('/api-integration-manager')}
                  className="hover:text-text-primary transition-colors"
                >
                  API Manager
                </button>
                <Icon name="ChevronRight" size={16} />
                <span className="text-text-primary">Data Mapping Studio</span>
              </nav>
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
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">API Data Mapping Studio</h1>
              <p className="text-text-secondary mt-1">
                Create dynamic widgets from your API data with intelligent mapping
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {mappings.length > 0 && (
                <>
                  <button
                    onClick={handleExportMappings}
                    className="flex items-center space-x-2 px-4 py-2 text-text-secondary border border-border rounded-md hover:bg-secondary-50 transition-colors"
                  >
                    <Icon name="Download" size={16} />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={handleGenerateWidgets}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
                  >
                    <Icon name="Zap" size={16} />
                    <span>Generate Widgets</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* API Selection */}
          <div className="bg-surface rounded-lg border border-border p-6">
            <h3 className="text-lg font-medium text-text-primary mb-4">Select API Data Source</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockApis.map(api => (
                <button
                  key={api.id}
                  onClick={() => handleApiSelect(api)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedApi?.id === api.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-secondary-25'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Database" size={20} className="text-text-secondary" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-text-primary">{api.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          api.status === 'connected' ?'bg-success-50 text-success border border-success-200' :'bg-error-50 text-error border border-error-200'
                        }`}>
                          {api.status}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{api.type}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Mappings */}
          {mappings.length > 0 && (
            <div className="bg-surface rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">Current Mappings</h3>
                <span className="text-sm text-text-secondary">{mappings.length} widgets configured</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mappings.map(mapping => (
                  <div key={mapping.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name={mapping.widget.icon} size={16} className="text-primary" />
                        <span className="text-sm font-medium text-text-primary">{mapping.config.title}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveMapping(mapping.id)}
                        className="text-error hover:text-error-600"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                    <div className="text-xs text-text-secondary">
                      <p>Data: {mapping.field.path}</p>
                      <p>Type: {mapping.widget.name}</p>
                      <p>Refresh: {mapping.config.refreshInterval / 1000}s</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Data Preview */}
            <div>
              <DataPreview
                apiData={apiData}
                onFieldSelect={handleFieldSelect}
                selectedFields={selectedFields}
              />
            </div>

            {/* Widget Gallery */}
            <div>
              <WidgetGallery
                onWidgetSelect={handleWidgetSelect}
                selectedFields={selectedFields}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Widget Configuration Modal */}
      <WidgetConfigurationModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onSave={handleSaveMapping}
        widget={configuring?.widget}
        field={configuring?.field}
        apiData={apiData}
      />
    </div>
  );
};

export default APIDataMappingStudio;