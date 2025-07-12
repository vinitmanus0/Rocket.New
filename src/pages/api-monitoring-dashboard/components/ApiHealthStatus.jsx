import React from 'react';
import Icon from 'components/AppIcon';

const ApiHealthStatus = ({ apis, selectedTimeframe, onTimeframeChange }) => {
  const getHealthStats = () => {
    if (!apis || apis.length === 0) return { healthy: 0, warning: 0, error: 0, total: 0 };
    
    const healthy = apis.filter(api => api.status === 'connected').length;
    const warning = apis.filter(api => api.status === 'warning').length;
    const error = apis.filter(api => api.status === 'error').length;
    
    return { healthy, warning, error, total: apis.length };
  };

  const getOverallHealth = () => {
    if (!apis || apis.length === 0) return 0;
    return Math.round(apis.reduce((sum, api) => sum + api.healthScore, 0) / apis.length);
  };

  const getAverageResponseTime = () => {
    if (!apis || apis.length === 0) return 0;
    const connectedApis = apis.filter(api => api.status === 'connected');
    if (connectedApis.length === 0) return 0;
    return Math.round(connectedApis.reduce((sum, api) => sum + api.responseTime, 0) / connectedApis.length);
  };

  const getTotalRequests = () => {
    if (!apis || apis.length === 0) return 0;
    return apis.reduce((sum, api) => sum + api.requestCount, 0);
  };

  const getTotalErrors = () => {
    if (!apis || apis.length === 0) return 0;
    return apis.reduce((sum, api) => sum + api.errorCount, 0);
  };

  const stats = getHealthStats();
  const overallHealth = getOverallHealth();
  const avgResponseTime = getAverageResponseTime();
  const totalRequests = getTotalRequests();
  const totalErrors = getTotalErrors();
  const errorRate = totalRequests > 0 ? ((totalErrors / totalRequests) * 100).toFixed(2) : 0;

  const timeframeOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '6h', label: '6 Hours' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">API Health Overview</h3>
          <p className="text-sm text-text-secondary">Real-time monitoring of all connected APIs</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-text-secondary">Timeframe:</label>
            <select 
              value={selectedTimeframe} 
              onChange={(e) => onTimeframeChange(e.target.value)}
              className="input-field py-1 px-2 text-sm"
            >
              {timeframeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              overallHealth >= 90 ? 'bg-success' : 
              overallHealth >= 70 ? 'bg-warning' : 'bg-danger'
            }`}></div>
            <span className="text-sm font-medium text-text-primary">
              {overallHealth}% Healthy
            </span>
          </div>
        </div>
      </div>

      <div className="card-body">
        {/* Status Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-success-50 rounded-lg border border-success-200">
            <div className="flex items-center justify-center mb-2">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
            <div className="text-2xl font-bold text-success">{stats.healthy}</div>
            <div className="text-sm text-text-secondary">Healthy</div>
          </div>
          
          <div className="text-center p-4 bg-warning-50 rounded-lg border border-warning-200">
            <div className="flex items-center justify-center mb-2">
              <Icon name="AlertTriangle" size={24} className="text-warning" />
            </div>
            <div className="text-2xl font-bold text-warning">{stats.warning}</div>
            <div className="text-sm text-text-secondary">Warning</div>
          </div>
          
          <div className="text-center p-4 bg-danger-50 rounded-lg border border-danger-200">
            <div className="flex items-center justify-center mb-2">
              <Icon name="XCircle" size={24} className="text-danger" />
            </div>
            <div className="text-2xl font-bold text-danger">{stats.error}</div>
            <div className="text-sm text-text-secondary">Error</div>
          </div>
          
          <div className="text-center p-4 bg-secondary-50 rounded-lg border border-secondary-200">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Database" size={24} className="text-text-primary" />
            </div>
            <div className="text-2xl font-bold text-text-primary">{stats.total}</div>
            <div className="text-sm text-text-secondary">Total APIs</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-background p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Zap" size={20} className="text-primary" />
              <span className="text-xs text-text-secondary">AVG</span>
            </div>
            <div className="text-xl font-bold text-text-primary">{avgResponseTime}ms</div>
            <div className="text-sm text-text-secondary">Response Time</div>
          </div>
          
          <div className="bg-background p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Activity" size={20} className="text-success" />
              <span className="text-xs text-text-secondary">TOTAL</span>
            </div>
            <div className="text-xl font-bold text-text-primary">{totalRequests.toLocaleString()}</div>
            <div className="text-sm text-text-secondary">Requests</div>
          </div>
          
          <div className="bg-background p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <Icon name="AlertCircle" size={20} className="text-danger" />
              <span className="text-xs text-text-secondary">TOTAL</span>
            </div>
            <div className="text-xl font-bold text-text-primary">{totalErrors.toLocaleString()}</div>
            <div className="text-sm text-text-secondary">Errors</div>
          </div>
          
          <div className="bg-background p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Percent" size={20} className="text-warning" />
              <span className="text-xs text-text-secondary">RATE</span>
            </div>
            <div className="text-xl font-bold text-text-primary">{errorRate}%</div>
            <div className="text-sm text-text-secondary">Error Rate</div>
          </div>
        </div>

        {/* API Status List */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-text-primary mb-3">API Status Details</h4>
          <div className="space-y-2">
            {apis?.map(api => (
              <div key={api.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    api.status === 'connected' ? 'bg-success' : 
                    api.status === 'warning' ? 'bg-warning' : 'bg-danger'
                  }`}></div>
                  <span className="font-medium text-text-primary">{api.name}</span>
                  <span className="text-xs text-text-secondary bg-secondary-100 px-2 py-1 rounded">
                    {api.type}
                  </span>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-text-primary">{api.responseTime}ms</div>
                    <div className="text-xs text-text-secondary">Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-text-primary">{api.requestCount}</div>
                    <div className="text-xs text-text-secondary">Requests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-text-primary">{api.healthScore}%</div>
                    <div className="text-xs text-text-secondary">Health</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiHealthStatus;