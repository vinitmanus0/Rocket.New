import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AlertSystem = ({ alerts }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-blue-600';
      default: return 'text-text-secondary';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-danger-50 border-danger-200';
      case 'medium': return 'bg-warning-50 border-warning-200';
      case 'low': return 'bg-blue-50 border-blue-200';
      default: return 'bg-secondary-50 border-secondary-200';
    }
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp.getTime();
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const filteredAlerts = alerts?.filter(alert => {
    if (filterSeverity === 'all') return true;
    return alert.severity === filterSeverity;
  }) || [];

  const getActionButton = (alert) => {
    switch (alert.type) {
      case 'error':
        return (
          <button className="btn btn-sm btn-danger">
            <Icon name="Tool" size={14} />
            Troubleshoot
          </button>
        );
      case 'warning':
        return (
          <button className="btn btn-sm btn-warning">
            <Icon name="Eye" size={14} />
            Monitor
          </button>
        );
      default:
        return (
          <button className="btn btn-sm btn-outline">
            <Icon name="CheckCircle" size={14} />
            Acknowledge
          </button>
        );
    }
  };

  if (!alerts || alerts.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">All Systems Healthy</h3>
          <p className="text-text-secondary">No active alerts or warnings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-text-primary">Active Alerts</h3>
          <span className="bg-danger text-white text-xs px-2 py-1 rounded-full">
            {alerts.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={filterSeverity} 
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="input-field py-1 px-2 text-sm"
          >
            <option value="all">All Severities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <button className="btn btn-outline btn-sm">
            <Icon name="RefreshCw" size={16} />
            Refresh
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="space-y-3">
          {filteredAlerts.map(alert => (
            <div 
              key={alert.id}
              className={`border rounded-lg transition-all duration-200 ${getSeverityBg(alert.severity)}`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={getAlertTypeIcon(alert.type)} 
                      size={20} 
                      className={getSeverityColor(alert.severity)} 
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text-primary">{alert.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          alert.severity === 'high' ? 'bg-danger text-white' :
                          alert.severity === 'medium'? 'bg-warning text-white' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">{alert.message}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                        <span>API: {alert.apiId}</span>
                        <span>{formatTimeAgo(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getActionButton(alert)}
                    <button
                      onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                      className="p-1 text-text-secondary hover:text-text-primary"
                    >
                      <Icon 
                        name={expandedAlert === alert.id ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                      />
                    </button>
                  </div>
                </div>
                
                {expandedAlert === alert.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-text-primary mb-2">Alert Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Alert ID:</span>
                            <span className="text-text-primary font-mono">{alert.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Type:</span>
                            <span className="text-text-primary">{alert.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">First Occurred:</span>
                            <span className="text-text-primary">{alert.timestamp.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Status:</span>
                            <span className="text-warning">Active</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-text-primary mb-2">Recommended Actions</h5>
                        <div className="space-y-2 text-sm">
                          {alert.type === 'error' && (
                            <div className="flex items-start space-x-2">
                              <Icon name="ArrowRight" size={14} className="text-text-secondary mt-0.5" />
                              <span className="text-text-secondary">Check API endpoint configuration</span>
                            </div>
                          )}
                          {alert.type === 'warning' && (
                            <div className="flex items-start space-x-2">
                              <Icon name="ArrowRight" size={14} className="text-text-secondary mt-0.5" />
                              <span className="text-text-secondary">Monitor rate limit usage</span>
                            </div>
                          )}
                          <div className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={14} className="text-text-secondary mt-0.5" />
                            <span className="text-text-secondary">Review API documentation</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={14} className="text-text-secondary mt-0.5" />
                            <span className="text-text-secondary">Contact API provider if issue persists</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-text-secondary">
                          This alert will auto-resolve when the underlying issue is fixed.
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="btn btn-sm btn-outline">
                            <Icon name="Bell" size={14} />
                            Mute
                          </button>
                          <button className="btn btn-sm btn-outline">
                            <Icon name="X" size={14} />
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;