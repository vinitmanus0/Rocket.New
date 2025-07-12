import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ConfigurationPanel = ({ refreshInterval, onRefreshIntervalChange, onClose }) => {
  const [localRefreshInterval, setLocalRefreshInterval] = useState(refreshInterval / 1000);
  const [alertThresholds, setAlertThresholds] = useState({
    responseTime: 1000,
    errorRate: 5,
    rateLimitWarning: 80
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    slackIntegration: false
  });

  const handleSave = () => {
    onRefreshIntervalChange(localRefreshInterval * 1000);
    // Save other configurations
    onClose();
  };

  const intervalOptions = [
    { value: 1, label: '1 second', warning: 'May cause high API usage' },
    { value: 5, label: '5 seconds', warning: null },
    { value: 10, label: '10 seconds', warning: null },
    { value: 30, label: '30 seconds', warning: null },
    { value: 60, label: '1 minute', warning: null },
    { value: 300, label: '5 minutes', warning: null }
  ];

  const getIntervalWarning = (interval) => {
    if (interval <= 2) return 'Very aggressive polling - high API usage';
    if (interval <= 5) return 'Aggressive polling - monitor rate limits';
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Monitoring Configuration</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Refresh Interval */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-2">Refresh Interval</h3>
              <p className="text-sm text-text-secondary">
                How often to update monitoring data. Lower intervals provide more real-time data but consume more API calls.
              </p>
            </div>
            
            <div className="space-y-3">
              {intervalOptions.map(option => (
                <div key={option.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={`interval-${option.value}`}
                    name="refreshInterval"
                    value={option.value}
                    checked={localRefreshInterval === option.value}
                    onChange={(e) => setLocalRefreshInterval(Number(e.target.value))}
                    className="text-primary"
                  />
                  <label htmlFor={`interval-${option.value}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary">{option.label}</span>
                      {option.warning && (
                        <span className="text-xs text-warning bg-warning-50 px-2 py-1 rounded">
                          {option.warning}
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>
            
            {getIntervalWarning(localRefreshInterval) && (
              <div className="flex items-center space-x-2 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm text-warning">
                  {getIntervalWarning(localRefreshInterval)}
                </span>
              </div>
            )}
          </div>

          {/* Alert Thresholds */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-2">Alert Thresholds</h3>
              <p className="text-sm text-text-secondary">
                Configure when to trigger alerts for various metrics.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Response Time (ms)
                </label>
                <input
                  type="number"
                  value={alertThresholds.responseTime}
                  onChange={(e) => setAlertThresholds(prev => ({
                    ...prev,
                    responseTime: Number(e.target.value)
                  }))}
                  className="input-field w-full"
                  min="0"
                  step="100"
                />
                <p className="text-xs text-text-secondary mt-1">
                  Alert when response time exceeds this value
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Error Rate (%)
                </label>
                <input
                  type="number"
                  value={alertThresholds.errorRate}
                  onChange={(e) => setAlertThresholds(prev => ({
                    ...prev,
                    errorRate: Number(e.target.value)
                  }))}
                  className="input-field w-full"
                  min="0"
                  max="100"
                  step="1"
                />
                <p className="text-xs text-text-secondary mt-1">
                  Alert when error rate exceeds this percentage
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  Rate Limit Warning (%)
                </label>
                <input
                  type="number"
                  value={alertThresholds.rateLimitWarning}
                  onChange={(e) => setAlertThresholds(prev => ({
                    ...prev,
                    rateLimitWarning: Number(e.target.value)
                  }))}
                  className="input-field w-full"
                  min="0"
                  max="100"
                  step="5"
                />
                <p className="text-xs text-text-secondary mt-1">
                  Warn when rate limit usage exceeds this percentage
                </p>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-2">Notification Settings</h3>
              <p className="text-sm text-text-secondary">
                Configure how you want to receive monitoring alerts.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div>
                  <div className="font-medium text-text-primary">Email Notifications</div>
                  <div className="text-sm text-text-secondary">Receive alerts via email</div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      emailNotifications: e.target.checked
                    }))}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div>
                  <div className="font-medium text-text-primary">Push Notifications</div>
                  <div className="text-sm text-text-secondary">Browser push notifications</div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      pushNotifications: e.target.checked
                    }))}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div>
                  <div className="font-medium text-text-primary">Slack Integration</div>
                  <div className="text-sm text-text-secondary">Send alerts to Slack channel</div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notificationSettings.slackIntegration}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      slackIntegration: e.target.checked
                    }))}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-warning mb-1">Security Best Practices</h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Keep your API keys secure and never commit them to public repositories</li>
                  <li>• Use environment variables for sensitive configuration</li>
                  <li>• Consider using a backend proxy for production deployments</li>
                  <li>• Regularly rotate your API keys and monitor for unusual activity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;