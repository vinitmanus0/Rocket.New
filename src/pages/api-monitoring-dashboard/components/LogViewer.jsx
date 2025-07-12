import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LogViewer = ({ logs }) => {
  const [selectedLog, setSelectedLog] = useState(null);
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-success';
    if (status >= 300 && status < 400) return 'text-warning';
    if (status >= 400) return 'text-danger';
    return 'text-text-secondary';
  };

  const getStatusIcon = (status) => {
    if (status >= 200 && status < 300) return 'CheckCircle';
    if (status >= 300 && status < 400) return 'AlertTriangle';
    if (status >= 400) return 'XCircle';
    return 'Circle';
  };

  const getLogLevel = (status) => {
    if (status >= 200 && status < 300) return 'success';
    if (status >= 300 && status < 400) return 'warning';
    if (status >= 400) return 'error';
    return 'info';
  };

  const filteredLogs = logs?.filter(log => {
    const level = getLogLevel(log.status);
    const matchesLevel = filterLevel === 'all' || level === filterLevel;
    const matchesSearch = searchTerm === '' || 
      log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.method.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  }) || [];

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">API Request Logs</h3>
          <p className="text-sm text-text-secondary">Recent API calls and responses</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="Search" size={16} className="text-text-secondary" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field py-1 px-2 text-sm w-48"
            />
          </div>
          
          <select 
            value={filterLevel} 
            onChange={(e) => setFilterLevel(e.target.value)}
            className="input-field py-1 px-2 text-sm"
          >
            <option value="all">All Levels</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          
          <button className="btn btn-outline btn-sm">
            <Icon name="Download" size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Log List */}
          <div className="lg:col-span-2">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-3" />
                  <p className="text-text-secondary">No logs found matching your criteria</p>
                </div>
              ) : (
                filteredLogs.map(log => (
                  <div
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                      selectedLog?.id === log.id 
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-secondary-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={getStatusIcon(log.status)} 
                          size={16} 
                          className={getStatusColor(log.status)} 
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-text-primary">{log.method}</span>
                            <span className={`text-sm font-medium ${getStatusColor(log.status)}`}>
                              {log.status}
                            </span>
                          </div>
                          <div className="text-sm text-text-secondary font-mono truncate max-w-xs">
                            {log.endpoint}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-text-primary">
                          {log.responseTime > 0 ? `${log.responseTime}ms` : 'N/A'}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {formatTimestamp(log.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Log Details */}
          <div className="lg:col-span-1">
            {selectedLog ? (
              <div className="bg-background p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-text-primary">Log Details</h4>
                  <button
                    onClick={() => setSelectedLog(null)}
                    className="p-1 text-text-secondary hover:text-text-primary"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-text-secondary uppercase tracking-wide">Timestamp</label>
                    <div className="text-sm text-text-primary">
                      {selectedLog.timestamp.toLocaleString()}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-text-secondary uppercase tracking-wide">Method & Status</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-text-primary">{selectedLog.method}</span>
                      <span className={`text-sm font-medium ${getStatusColor(selectedLog.status)}`}>
                        {selectedLog.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-text-secondary uppercase tracking-wide">Endpoint</label>
                    <div className="text-sm text-text-primary font-mono bg-secondary-50 p-2 rounded break-all">
                      {selectedLog.endpoint}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-text-secondary uppercase tracking-wide">Response Time</label>
                    <div className="text-sm text-text-primary">
                      {selectedLog.responseTime > 0 ? `${selectedLog.responseTime}ms` : 'N/A'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-text-secondary uppercase tracking-wide">Request Size</label>
                      <div className="text-sm text-text-primary">
                        {formatBytes(selectedLog.requestSize)}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-text-secondary uppercase tracking-wide">Response Size</label>
                      <div className="text-sm text-text-primary">
                        {formatBytes(selectedLog.responseSize)}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-text-secondary uppercase tracking-wide">User Agent</label>
                    <div className="text-sm text-text-primary font-mono">
                      {selectedLog.userAgent}
                    </div>
                  </div>
                  
                  {selectedLog.error && (
                    <div>
                      <label className="text-xs text-text-secondary uppercase tracking-wide">Error</label>
                      <div className="text-sm text-danger bg-danger-50 p-2 rounded">
                        {selectedLog.error}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-background p-4 rounded-lg border border-border text-center">
                <Icon name="MousePointer" size={48} className="text-text-secondary mx-auto mb-3" />
                <p className="text-text-secondary">Select a log entry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;