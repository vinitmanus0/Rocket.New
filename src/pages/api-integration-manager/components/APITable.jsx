import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const APITable = ({ apis, onEdit, onDelete, onTest, onViewLogs }) => {
  const [testingStates, setTestingStates] = useState({});

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success bg-success-50 border-success-200';
      case 'disconnected':
        return 'text-error bg-error-50 border-error-200';
      case 'testing':
        return 'text-warning bg-warning-50 border-warning-200';
      default:
        return 'text-text-secondary bg-secondary-50 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'disconnected':
        return 'XCircle';
      case 'testing':
        return 'Clock';
      default:
        return 'Minus';
    }
  };

  const handleTest = async (apiId) => {
    setTestingStates(prev => ({ ...prev, [apiId]: true }));
    try {
      await onTest(apiId);
    } finally {
      setTestingStates(prev => ({ ...prev, [apiId]: false }));
    }
  };

  const formatResponseTime = (time) => {
    if (!time) return 'N/A';
    return time < 1000 ? `${time}ms` : `${(time / 1000).toFixed(1)}s`;
  };

  if (apis.length === 0) {
    return (
      <div className="text-center py-12 bg-surface rounded-lg border border-border">
        <Icon name="Database" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No APIs Connected</h3>
        <p className="text-text-secondary">Add your first API integration to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Name</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Type</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Response Time</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-text-secondary">Last Updated</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {apis.map(api => (
              <tr key={api.id} className="hover:bg-secondary-25 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Icon name="Database" size={20} className="text-text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">{api.name}</div>
                      <div className="text-xs text-text-secondary truncate max-w-xs">{api.endpoint}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={api.type === 'REST' ? 'Globe' : 'Zap'} 
                      size={16} 
                      className="text-text-secondary" 
                    />
                    <span className="text-sm text-text-primary">{api.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(api.status)}`}>
                    <Icon name={getStatusIcon(api.status)} size={12} className="mr-1" />
                    {api.status?.charAt(0).toUpperCase() + api.status?.slice(1) || 'Unknown'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-primary">
                    {formatResponseTime(api.responseTime)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">
                    {api.lastUpdated ? new Date(api.lastUpdated).toLocaleString() : 'Never'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleTest(api.id)}
                      disabled={testingStates[api.id]}
                      className="p-2 text-primary hover:bg-primary-50 rounded-md transition-colors disabled:opacity-50"
                      title="Test Connection"
                    >
                      <Icon 
                        name={testingStates[api.id] ? 'Loader' : 'Play'} 
                        size={16} 
                        className={testingStates[api.id] ? 'animate-spin' : ''}
                      />
                    </button>
                    <button
                      onClick={() => onViewLogs(api.id)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors"
                      title="View Logs"
                    >
                      <Icon name="FileText" size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(api)}
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors"
                      title="Edit API"
                    >
                      <Icon name="Edit" size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(api.id)}
                      className="p-2 text-error hover:bg-error-50 rounded-md transition-colors"
                      title="Delete API"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default APITable;