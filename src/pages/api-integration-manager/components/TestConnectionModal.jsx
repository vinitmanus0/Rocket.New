import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const TestConnectionModal = ({ isOpen, onClose, api, onTest }) => {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && api) {
      handleTest();
    }
  }, [isOpen, api]);

  const handleTest = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const result = await onTest(api.id);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message,
        responseTime: null,
        data: null
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatJSON = (data) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return data;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg border border-border max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Test Connection</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* API Details */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-text-primary mb-3">API Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                <p className="text-sm text-text-primary">{api?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Type</label>
                <p className="text-sm text-text-primary">{api?.type}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-1">Endpoint</label>
                <p className="text-sm text-text-primary break-all">{api?.endpoint}</p>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-text-primary">Test Results</h3>
              <button
                onClick={handleTest}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                <Icon name={isLoading ? 'Loader' : 'RefreshCw'} size={16} className={isLoading ? 'animate-spin' : ''} />
                <span>Test Again</span>
              </button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Icon name="Loader" size={32} className="animate-spin text-primary" />
                <span className="ml-3 text-text-secondary">Testing connection...</span>
              </div>
            ) : testResult ? (
              <div className="space-y-4">
                {/* Connection Status */}
                <div className={`p-4 rounded-lg border ${testResult.success ? 'bg-success-50 border-success-200' : 'bg-error-50 border-error-200'}`}>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={testResult.success ? 'CheckCircle' : 'XCircle'} 
                      size={20} 
                      className={testResult.success ? 'text-success' : 'text-error'} 
                    />
                    <span className={`font-medium ${testResult.success ? 'text-success' : 'text-error'}`}>
                      {testResult.success ? 'Connection Successful' : 'Connection Failed'}
                    </span>
                  </div>
                  {testResult.responseTime && (
                    <p className="text-sm text-text-secondary mt-2">
                      Response time: {testResult.responseTime}ms
                    </p>
                  )}
                  {testResult.error && (
                    <p className="text-sm text-error mt-2">
                      Error: {testResult.error}
                    </p>
                  )}
                </div>

                {/* Sample Data */}
                {testResult.data && (
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-2">Sample Response Data</h4>
                    <div className="bg-secondary-50 border border-border rounded-lg p-4 max-h-64 overflow-y-auto">
                      <pre className="text-xs text-text-primary whitespace-pre-wrap">
                        {formatJSON(testResult.data)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon name="Play" size={48} className="text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">Click "Test Again" to test the connection</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-secondary-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestConnectionModal;