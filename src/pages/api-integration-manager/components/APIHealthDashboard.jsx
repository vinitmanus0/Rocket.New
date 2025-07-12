import React from 'react';
import Icon from 'components/AppIcon';

const APIHealthDashboard = ({ apis, refreshInterval, onRefreshIntervalChange }) => {
  const getHealthStats = () => {
    const total = apis.length;
    const connected = apis.filter(api => api.status === 'connected').length;
    const disconnected = apis.filter(api => api.status === 'disconnected').length;
    const avgResponseTime = apis.reduce((sum, api) => sum + (api.responseTime || 0), 0) / total || 0;
    
    return { total, connected, disconnected, avgResponseTime };
  };

  const getRecentErrors = () => {
    return apis
      .filter(api => api.errors && api.errors.length > 0)
      .flatMap(api => api.errors.map(error => ({ ...error, apiName: api.name })))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
  };

  const stats = getHealthStats();
  const recentErrors = getRecentErrors();

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className={`text-2xl font-semibold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-text-secondary mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-50')}`}>
          <Icon name={icon} size={24} className={color} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total APIs"
          value={stats.total}
          icon="Database"
          color="text-primary"
        />
        <StatCard
          title="Connected"
          value={stats.connected}
          icon="CheckCircle"
          color="text-success"
        />
        <StatCard
          title="Disconnected"
          value={stats.disconnected}
          icon="XCircle"
          color="text-error"
        />
        <StatCard
          title="Avg Response Time"
          value={stats.avgResponseTime < 1000 ? `${Math.round(stats.avgResponseTime)}ms` : `${(stats.avgResponseTime / 1000).toFixed(1)}s`}
          icon="Clock"
          color="text-warning"
        />
      </div>

      {/* Refresh Interval Settings */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">Monitoring Settings</h3>
          <Icon name="Settings" size={20} className="text-text-secondary" />
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Refresh Interval
            </label>
            <select
              value={refreshInterval}
              onChange={(e) => onRefreshIntervalChange(parseInt(e.target.value))}
              className="w-full md:w-auto px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value={1000}>1 second</option>
              <option value={5000}>5 seconds</option>
              <option value={10000}>10 seconds</option>
              <option value={30000}>30 seconds</option>
              <option value={60000}>1 minute</option>
              <option value={300000}>5 minutes</option>
            </select>
          </div>
          
          {refreshInterval <= 5000 && (
            <div className="p-3 bg-warning-50 border border-warning-200 rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning-600" />
                <span className="text-sm text-warning-700 font-medium">Rate Limit Warning</span>
              </div>
              <p className="text-sm text-warning-600 mt-1">
                Short refresh intervals may exceed API rate limits. Monitor your usage carefully.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Errors */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-text-primary">Recent Errors</h3>
          <Icon name="AlertCircle" size={20} className="text-error" />
        </div>
        
        {recentErrors.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <p className="text-text-secondary">No recent errors</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentErrors.map((error, index) => (
              <div key={index} className="p-3 bg-error-50 border border-error-200 rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-error">{error.apiName}</span>
                      <span className="text-xs text-text-secondary">
                        {new Date(error.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-text-primary">{error.message}</p>
                    {error.details && (
                      <p className="text-xs text-text-secondary mt-1">{error.details}</p>
                    )}
                  </div>
                  <Icon name="X" size={16} className="text-error flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default APIHealthDashboard;