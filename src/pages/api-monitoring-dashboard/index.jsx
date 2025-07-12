import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from 'components/ui/MainSidebar';
import NotificationCenter from 'components/ui/NotificationCenter';
import Icon from 'components/AppIcon';
import MonitoringCard from './components/MonitoringCard';
import PerformanceChart from './components/PerformanceChart';
import ApiHealthStatus from './components/ApiHealthStatus';
import LogViewer from './components/LogViewer';
import ConfigurationPanel from './components/ConfigurationPanel';
import AlertSystem from './components/AlertSystem';

const ApiMonitoringDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [monitoringData, setMonitoringData] = useState({});
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [showConfigPanel, setShowConfigPanel] = useState(false);

  // Mock API monitoring data
  const mockApiData = [
    {
      id: 'api-1',
      name: 'Alpha Vantage',
      type: 'REST',
      endpoint: 'https://www.alphavantage.co/query',
      status: 'connected',
      responseTime: 245,
      lastUpdate: new Date(Date.now() - 30000),
      requestCount: 1247,
      errorCount: 3,
      rateLimit: { used: 487, limit: 500, resetTime: new Date(Date.now() + 3600000) },
      healthScore: 95,
      trend: 'up'
    },
    {
      id: 'api-2',
      name: 'Yahoo Finance',
      type: 'REST',
      endpoint: 'https://finance.yahoo.com/api',
      status: 'warning',
      responseTime: 1250,
      lastUpdate: new Date(Date.now() - 120000),
      requestCount: 892,
      errorCount: 12,
      rateLimit: { used: 245, limit: 300, resetTime: new Date(Date.now() + 1800000) },
      healthScore: 78,
      trend: 'down'
    },
    {
      id: 'api-3',
      name: 'IEX Cloud',
      type: 'WebSocket',
      endpoint: 'wss://ws-api.iextrading.com/1.0/tops',
      status: 'connected',
      responseTime: 89,
      lastUpdate: new Date(Date.now() - 5000),
      requestCount: 2156,
      errorCount: 0,
      rateLimit: { used: 1250, limit: 5000, resetTime: new Date(Date.now() + 7200000) },
      healthScore: 100,
      trend: 'stable'
    },
    {
      id: 'api-4',
      name: 'Polygon.io',
      type: 'REST',
      endpoint: 'https://api.polygon.io/v2/aggs',
      status: 'error',
      responseTime: 0,
      lastUpdate: new Date(Date.now() - 300000),
      requestCount: 456,
      errorCount: 25,
      rateLimit: { used: 89, limit: 100, resetTime: new Date(Date.now() + 900000) },
      healthScore: 32,
      trend: 'down'
    },
    {
      id: 'api-5',
      name: 'News API',
      type: 'REST',
      endpoint: 'https://newsapi.org/v2/everything',
      status: 'connected',
      responseTime: 456,
      lastUpdate: new Date(Date.now() - 60000),
      requestCount: 678,
      errorCount: 1,
      rateLimit: { used: 456, limit: 1000, resetTime: new Date(Date.now() + 86400000) },
      healthScore: 92,
      trend: 'up'
    }
  ];

  const mockPerformanceData = {
    responseTime: [
      { time: '10:00', value: 245 },
      { time: '10:05', value: 289 },
      { time: '10:10', value: 234 },
      { time: '10:15', value: 267 },
      { time: '10:20', value: 245 },
      { time: '10:25', value: 223 },
      { time: '10:30', value: 198 }
    ],
    errorRate: [
      { time: '10:00', value: 0.2 },
      { time: '10:05', value: 0.8 },
      { time: '10:10', value: 0.1 },
      { time: '10:15', value: 0.3 },
      { time: '10:20', value: 0.1 },
      { time: '10:25', value: 0.0 },
      { time: '10:30', value: 0.1 }
    ],
    throughput: [
      { time: '10:00', value: 125 },
      { time: '10:05', value: 134 },
      { time: '10:10', value: 142 },
      { time: '10:15', value: 138 },
      { time: '10:20', value: 145 },
      { time: '10:25', value: 152 },
      { time: '10:30', value: 148 }
    ]
  };

  const mockAlerts = [
    {
      id: 'alert-1',
      type: 'warning',
      title: 'Rate Limit Approaching',
      message: 'Yahoo Finance API has used 245/300 requests. Reset in 30 minutes.',
      timestamp: new Date(Date.now() - 300000),
      apiId: 'api-2',
      severity: 'medium'
    },
    {
      id: 'alert-2',
      type: 'error',
      title: 'Connection Failed',
      message: 'Polygon.io API connection failed. Check endpoint configuration.',
      timestamp: new Date(Date.now() - 600000),
      apiId: 'api-4',
      severity: 'high'
    },
    {
      id: 'alert-3',
      type: 'info',
      title: 'High Response Time',
      message: 'Yahoo Finance API response time exceeded 1s threshold.',
      timestamp: new Date(Date.now() - 900000),
      apiId: 'api-2',
      severity: 'low'
    }
  ];

  const mockLogData = [
    {
      id: 'log-1',
      timestamp: new Date(Date.now() - 30000),
      apiId: 'api-1',
      method: 'GET',
      endpoint: '/query?function=TIME_SERIES_DAILY&symbol=AAPL',
      status: 200,
      responseTime: 245,
      requestSize: 1024,
      responseSize: 15360,
      userAgent: 'StockSight/1.0'
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 60000),
      apiId: 'api-3',
      method: 'WebSocket',
      endpoint: '/tops',
      status: 101,
      responseTime: 89,
      requestSize: 512,
      responseSize: 2048,
      userAgent: 'StockSight/1.0'
    },
    {
      id: 'log-3',
      timestamp: new Date(Date.now() - 90000),
      apiId: 'api-4',
      method: 'GET',
      endpoint: '/v2/aggs/ticker/AAPL/range/1/day',
      status: 429,
      responseTime: 0,
      requestSize: 256,
      responseSize: 0,
      userAgent: 'StockSight/1.0',
      error: 'Rate limit exceeded'
    }
  ];

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setMonitoringData({
        apis: mockApiData,
        performance: mockPerformanceData,
        alerts: mockAlerts,
        logs: mockLogData
      });
      setIsLoading(false);
    }, 1000);

    // Set up real-time updates
    const interval = setInterval(() => {
      setMonitoringData(prev => ({
        ...prev,
        apis: prev.apis?.map(api => ({
          ...api,
          lastUpdate: api.status === 'connected' ? new Date() : api.lastUpdate,
          responseTime: api.status === 'connected' ? 
            Math.max(50, api.responseTime + (Math.random() - 0.5) * 100) : 
            api.responseTime
        }))
      }));
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleTestAllConnections = async () => {
    setIsLoading(true);
    // Simulate bulk testing
    setTimeout(() => {
      setIsLoading(false);
      // Show success notification
    }, 2000);
  };

  const handleRefreshAll = () => {
    setMonitoringData(prev => ({
      ...prev,
      apis: prev.apis?.map(api => ({
        ...api,
        lastUpdate: new Date()
      }))
    }));
  };

  const handleExportReport = () => {
    const report = {
      timestamp: new Date(),
      apis: monitoringData.apis,
      alerts: monitoringData.alerts,
      performance: monitoringData.performance
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `api-monitoring-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredApis = monitoringData.apis?.filter(api => {
    if (filterStatus === 'all') return true;
    return api.status === filterStatus;
  }) || [];

  const overallHealth = monitoringData.apis?.reduce((acc, api) => acc + api.healthScore, 0) / (monitoringData.apis?.length || 1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading monitoring data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <MainSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-50 bg-surface border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-text-primary">API Monitoring Dashboard</h1>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  overallHealth >= 90 ? 'bg-success' : 
                  overallHealth >= 70 ? 'bg-warning' : 'bg-danger'
                }`}></div>
                <span className="text-sm text-text-secondary">
                  Overall Health: {overallHealth.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-text-secondary">Filter:</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input-field py-1 px-2 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="connected">Connected</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              
              <button
                onClick={handleTestAllConnections}
                className="btn btn-outline btn-sm"
                disabled={isLoading}
              >
                <Icon name="RefreshCw" size={16} />
                Test All
              </button>
              
              <button
                onClick={handleRefreshAll}
                className="btn btn-outline btn-sm"
              >
                <Icon name="RotateCcw" size={16} />
                Refresh
              </button>
              
              <button
                onClick={handleExportReport}
                className="btn btn-outline btn-sm"
              >
                <Icon name="Download" size={16} />
                Export
              </button>
              
              <button
                onClick={() => setShowConfigPanel(true)}
                className="btn btn-outline btn-sm"
              >
                <Icon name="Settings" size={16} />
                Config
              </button>
              
              <NotificationCenter />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6">
          {/* Alert System */}
          <AlertSystem alerts={monitoringData.alerts} />

          {/* API Health Status Overview */}
          <ApiHealthStatus 
            apis={monitoringData.apis} 
            selectedTimeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
          />

          {/* Performance Charts */}
          <PerformanceChart 
            data={monitoringData.performance}
            timeframe={selectedTimeframe}
          />

          {/* API Monitoring Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApis.map((api) => (
              <MonitoringCard 
                key={api.id} 
                api={api}
                onTest={() => {/* Test individual API */}}
                onEdit={() => navigate(`/api-integration-manager?edit=${api.id}`)}
                onDelete={() => {/* Delete API */}}
              />
            ))}
          </div>

          {/* Log Viewer */}
          <LogViewer logs={monitoringData.logs} />
        </div>
      </div>

      {/* Configuration Panel */}
      {showConfigPanel && (
        <ConfigurationPanel 
          refreshInterval={refreshInterval}
          onRefreshIntervalChange={setRefreshInterval}
          onClose={() => setShowConfigPanel(false)}
        />
      )}

      {/* Mobile Bottom Padding */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default ApiMonitoringDashboard;