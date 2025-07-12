import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSidebar from 'components/ui/MainSidebar';
import NotificationCenter from 'components/ui/NotificationCenter';
import Icon from 'components/AppIcon';
import APIForm from './components/APIForm';
import APITable from './components/APITable';
import APIHealthDashboard from './components/APIHealthDashboard';
import TestConnectionModal from './components/TestConnectionModal';

const APIIntegrationManager = () => {
  const [apis, setApis] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingApi, setEditingApi] = useState(null);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testingApi, setTestingApi] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(30000);
  const [activeTab, setActiveTab] = useState('apis');
  const navigate = useNavigate();

  // Mock API data
  const mockApis = [
    {
      id: 1,
      name: 'Alpha Vantage Stock Data',
      type: 'REST',
      endpoint: 'https://www.alphavantage.co/query',
      apiKey: 'demo',
      status: 'connected',
      responseTime: 245,
      lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
      headers: [
        { id: 1, key: 'Content-Type', value: 'application/json' }
      ],
      parameters: [
        { id: 1, key: 'function', value: 'TIME_SERIES_INTRADAY' },
        { id: 2, key: 'symbol', value: 'IBM' }
      ],
      errors: []
    },
    {
      id: 2,
      name: 'Finnhub WebSocket',
      type: 'WebSocket',
      endpoint: 'wss://ws.finnhub.io',
      apiKey: 'demo',
      status: 'disconnected',
      responseTime: null,
      lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
      headers: [],
      parameters: [],
      errors: [
        {
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          message: 'Connection timeout',
          details: 'Failed to establish WebSocket connection'
        }
      ]
    },
    {
      id: 3,
      name: 'Yahoo Finance API',
      type: 'REST',
      endpoint: 'https://query1.finance.yahoo.com/v8/finance/chart',
      apiKey: '',
      status: 'connected',
      responseTime: 156,
      lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
      headers: [],
      parameters: [],
      errors: []
    }
  ];

  useEffect(() => {
    setApis(mockApis);
  }, []);

  const handleAddAPI = (formData) => {
    const newApi = {
      id: Date.now(),
      ...formData,
      status: 'unknown',
      responseTime: null,
      lastUpdated: null,
      errors: []
    };
    setApis(prev => [...prev, newApi]);
    setShowAddForm(false);
  };

  const handleEditAPI = (formData) => {
    setApis(prev => prev.map(api => 
      api.id === editingApi.id 
        ? { ...api, ...formData, lastUpdated: new Date() }
        : api
    ));
    setEditingApi(null);
  };

  const handleDeleteAPI = (apiId) => {
    if (window.confirm('Are you sure you want to delete this API?')) {
      setApis(prev => prev.filter(api => api.id !== apiId));
    }
  };

  const handleTestConnection = async (apiId) => {
    const api = apis.find(a => a.id === apiId);
    if (!api) return;

    setTestingApi(api);
    setShowTestModal(true);
  };

  const performAPITest = async (apiId) => {
    const api = apis.find(a => a.id === apiId);
    if (!api) throw new Error('API not found');

    // Update API status to testing
    setApis(prev => prev.map(a => 
      a.id === apiId ? { ...a, status: 'testing' } : a
    ));

    try {
      const startTime = Date.now();
      
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const responseTime = Date.now() - startTime;
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        // Update API status to connected
        setApis(prev => prev.map(a => 
          a.id === apiId ? { 
            ...a, 
            status: 'connected', 
            responseTime,
            lastUpdated: new Date() 
          } : a
        ));

        return {
          success: true,
          responseTime,
          data: {
            timestamp: new Date().toISOString(),
            symbol: 'AAPL',
            price: 150.25,
            volume: 1000000,
            change: 2.5,
            changePercent: 1.69
          }
        };
      } else {
        // Update API status to disconnected
        setApis(prev => prev.map(a => 
          a.id === apiId ? { 
            ...a, 
            status: 'disconnected',
            responseTime: null,
            lastUpdated: new Date(),
            errors: [
              ...a.errors,
              {
                timestamp: new Date(),
                message: 'Connection failed',
                details: 'Unable to establish connection to the API endpoint'
              }
            ]
          } : a
        ));

        throw new Error('Unable to establish connection to the API endpoint');
      }
    } catch (error) {
      setApis(prev => prev.map(a => 
        a.id === apiId ? { 
          ...a, 
          status: 'disconnected',
          responseTime: null,
          lastUpdated: new Date() 
        } : a
      ));
      throw error;
    }
  };

  const handleViewLogs = (apiId) => {
    const api = apis.find(a => a.id === apiId);
    if (!api) return;
    
    // For now, just show an alert. In a real app, this would open a logs modal
    alert(`Viewing logs for ${api.name}\n\nErrors: ${api.errors.length}\nLast updated: ${api.lastUpdated ? api.lastUpdated.toLocaleString() : 'Never'}`);
  };

  const handleDataMapping = (apiId) => {
    navigate(`/api-data-mapping-studio?apiId=${apiId}`);
  };

  const tabs = [
    { id: 'apis', label: 'API Management', icon: 'Database' },
    { id: 'health', label: 'Health Dashboard', icon: 'Activity' }
  ];

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
                <span className="text-text-primary">API Manager</span>
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
              <h1 className="text-2xl font-semibold text-text-primary">API Integration Manager</h1>
              <p className="text-text-secondary mt-1">
                Manage your external data connections and monitor API health
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/api-data-mapping-studio')}
                className="flex items-center space-x-2 px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary-50 transition-colors"
              >
                <Icon name="MapPin" size={16} />
                <span>Data Mapping Studio</span>
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                <Icon name="Plus" size={16} />
                <span>Add New API</span>
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-warning-600" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-warning-800">Security Best Practices</h3>
                <p className="text-sm text-warning-700 mt-1">
                  Keep your API keys secure and never commit them to public repositories. 
                  For production deployments, consider using environment variables or a secure backend proxy.
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'apis' && (
            <div className="space-y-6">
              <APITable
                apis={apis}
                onEdit={setEditingApi}
                onDelete={handleDeleteAPI}
                onTest={handleTestConnection}
                onViewLogs={handleViewLogs}
              />
              
              {apis.length > 0 && (
                <div className="text-center">
                  <button
                    onClick={() => navigate('/api-data-mapping-studio')}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-600 transition-colors"
                  >
                    <Icon name="ArrowRight" size={16} />
                    <span>Configure Data Mapping</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'health' && (
            <APIHealthDashboard
              apis={apis}
              refreshInterval={refreshInterval}
              onRefreshIntervalChange={setRefreshInterval}
            />
          )}
        </div>
      </div>

      {/* Add API Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-text-primary">Add New API</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <APIForm
                onSubmit={handleAddAPI}
                onCancel={() => setShowAddForm(false)}
                isEdit={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit API Modal */}
      {editingApi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-text-primary">Edit API</h2>
              <button
                onClick={() => setEditingApi(null)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <APIForm
                onSubmit={handleEditAPI}
                onCancel={() => setEditingApi(null)}
                initialData={editingApi}
                isEdit={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Test Connection Modal */}
      <TestConnectionModal
        isOpen={showTestModal}
        onClose={() => setShowTestModal(false)}
        api={testingApi}
        onTest={performAPITest}
      />
    </div>
  );
};

export default APIIntegrationManager;