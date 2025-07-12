import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const MonitoringCard = ({ api, onTest, onEdit, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-danger';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'connected': return 'bg-success-50 border-success-200';
      case 'warning': return 'bg-warning-50 border-warning-200';
      case 'error': return 'bg-danger-50 border-danger-200';
      default: return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const formatLastUpdate = (date) => {
    const diff = Date.now() - date.getTime();
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const handleTest = async () => {
    setIsLoading(true);
    try {
      await onTest();
    } finally {
      setIsLoading(false);
    }
  };

  const getRateLimitColor = (rateLimit) => {
    const percentage = (rateLimit.used / rateLimit.limit) * 100;
    if (percentage >= 90) return 'text-danger';
    if (percentage >= 70) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className={`card border-2 ${getStatusBgColor(api.status)} transition-all duration-200 hover:shadow-lg`}>
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            api.status === 'connected' ? 'bg-success animate-pulse' : 
            api.status === 'warning' ? 'bg-warning' : 'bg-danger'
          }`}></div>
          <div>
            <h3 className="font-semibold text-text-primary">{api.name}</h3>
            <p className="text-sm text-text-secondary">{api.type}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={handleTest}
            disabled={isLoading}
            className="p-1 text-text-secondary hover:text-primary transition-colors"
            title="Test Connection"
          >
            <Icon name={isLoading ? "Loader" : "RefreshCw"} size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={onEdit}
            className="p-1 text-text-secondary hover:text-primary transition-colors"
            title="Edit API"
          >
            <Icon name="Edit" size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-text-secondary hover:text-danger transition-colors"
            title="Delete API"
          >
            <Icon name="Trash2" size={16} />
          </button>
        </div>
      </div>

      <div className="card-body space-y-4">
        {/* Status and Health Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getStatusColor(api.status)}`}>
              {api.status.charAt(0).toUpperCase() + api.status.slice(1)}
            </span>
            <Icon name={getTrendIcon(api.trend)} size={14} className={getStatusColor(api.status)} />
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-text-primary">{api.healthScore}%</div>
            <div className="text-xs text-text-secondary">Health Score</div>
          </div>
        </div>

        {/* Response Time */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Response Time</span>
            <span className="text-sm font-medium text-text-primary">
              {api.responseTime > 0 ? `${api.responseTime}ms` : 'N/A'}
            </span>
          </div>
          {api.responseTime > 0 && (
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  api.responseTime < 300 ? 'bg-success' : 
                  api.responseTime < 1000 ? 'bg-warning' : 'bg-danger'
                }`}
                style={{ width: `${Math.min(100, (api.responseTime / 2000) * 100)}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Request Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">{api.requestCount}</div>
            <div className="text-xs text-text-secondary">Requests</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-danger">{api.errorCount}</div>
            <div className="text-xs text-text-secondary">Errors</div>
          </div>
        </div>

        {/* Rate Limit */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Rate Limit</span>
            <span className={`text-sm font-medium ${getRateLimitColor(api.rateLimit)}`}>
              {api.rateLimit.used}/{api.rateLimit.limit}
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                (api.rateLimit.used / api.rateLimit.limit) >= 0.9 ? 'bg-danger' : 
                (api.rateLimit.used / api.rateLimit.limit) >= 0.7 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${(api.rateLimit.used / api.rateLimit.limit) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-text-secondary">
            Resets: {api.rateLimit.resetTime.toLocaleTimeString()}
          </div>
        </div>

        {/* Last Update */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Last Update:</span>
          <span>{formatLastUpdate(api.lastUpdate)}</span>
        </div>

        {/* Endpoint */}
        <div className="bg-secondary-50 p-2 rounded text-xs text-text-secondary font-mono truncate">
          {api.endpoint}
        </div>
      </div>
    </div>
  );
};

export default MonitoringCard;