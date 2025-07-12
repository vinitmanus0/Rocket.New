import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const APIForm = ({ onSubmit, onCancel, initialData = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'REST',
    endpoint: initialData?.endpoint || '',
    apiKey: initialData?.apiKey || '',
    headers: initialData?.headers || [],
    parameters: initialData?.parameters || []
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [newHeader, setNewHeader] = useState({ key: '', value: '' });
  const [newParameter, setNewParameter] = useState({ key: '', value: '' });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addHeader = () => {
    if (newHeader.key && newHeader.value) {
      setFormData(prev => ({
        ...prev,
        headers: [...prev.headers, { ...newHeader, id: Date.now() }]
      }));
      setNewHeader({ key: '', value: '' });
    }
  };

  const removeHeader = (id) => {
    setFormData(prev => ({
      ...prev,
      headers: prev.headers.filter(header => header.id !== id)
    }));
  };

  const addParameter = () => {
    if (newParameter.key && newParameter.value) {
      setFormData(prev => ({
        ...prev,
        parameters: [...prev.parameters, { ...newParameter, id: Date.now() }]
      }));
      setNewParameter({ key: '', value: '' });
    }
  };

  const removeParameter = (id) => {
    setFormData(prev => ({
      ...prev,
      parameters: prev.parameters.filter(param => param.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* API Name */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          API Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter API name"
          required
        />
      </div>

      {/* API Type */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          API Type *
        </label>
        <select
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        >
          <option value="REST">REST API</option>
          <option value="WebSocket">WebSocket</option>
        </select>
      </div>

      {/* Endpoint URL */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Endpoint URL *
        </label>
        <input
          type="url"
          value={formData.endpoint}
          onChange={(e) => handleInputChange('endpoint', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="https://api.example.com/v1/data"
          required
        />
      </div>

      {/* API Key */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          API Key / Token
        </label>
        <div className="relative">
          <input
            type={showApiKey ? 'text' : 'password'}
            value={formData.apiKey}
            onChange={(e) => handleInputChange('apiKey', e.target.value)}
            className="w-full px-3 py-2 pr-10 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter API key or token"
          />
          <button
            type="button"
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
          >
            <Icon name={showApiKey ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        <div className="mt-2 p-3 bg-warning-50 border border-warning-200 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-warning-600" />
            <span className="text-sm text-warning-700 font-medium">Security Warning</span>
          </div>
          <p className="text-sm text-warning-600 mt-1">
            Keep your API keys secure. Never expose them in public repositories or client-side code.
          </p>
        </div>
      </div>

      {/* Headers */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Headers (Optional)
        </label>
        <div className="space-y-2">
          {formData.headers.map(header => (
            <div key={header.id} className="flex items-center space-x-2 p-2 bg-secondary-50 rounded-md">
              <span className="text-sm text-text-secondary flex-1">{header.key}: {header.value}</span>
              <button
                type="button"
                onClick={() => removeHeader(header.id)}
                className="text-error hover:text-error-600"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newHeader.key}
              onChange={(e) => setNewHeader(prev => ({ ...prev, key: e.target.value }))}
              className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Header name"
            />
            <input
              type="text"
              value={newHeader.value}
              onChange={(e) => setNewHeader(prev => ({ ...prev, value: e.target.value }))}
              className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Header value"
            />
            <button
              type="button"
              onClick={addHeader}
              className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Parameters */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Custom Parameters (Optional)
        </label>
        <div className="space-y-2">
          {formData.parameters.map(param => (
            <div key={param.id} className="flex items-center space-x-2 p-2 bg-secondary-50 rounded-md">
              <span className="text-sm text-text-secondary flex-1">{param.key}: {param.value}</span>
              <button
                type="button"
                onClick={() => removeParameter(param.id)}
                className="text-error hover:text-error-600"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newParameter.key}
              onChange={(e) => setNewParameter(prev => ({ ...prev, key: e.target.value }))}
              className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Parameter name"
            />
            <input
              type="text"
              value={newParameter.value}
              onChange={(e) => setNewParameter(prev => ({ ...prev, value: e.target.value }))}
              className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Parameter value"
            />
            <button
              type="button"
              onClick={addParameter}
              className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-secondary-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          {isEdit ? 'Update API' : 'Add API'}
        </button>
      </div>
    </form>
  );
};

export default APIForm;