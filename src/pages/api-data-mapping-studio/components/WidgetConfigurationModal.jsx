import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const WidgetConfigurationModal = ({ isOpen, onClose, onSave, widget, field, apiData }) => {
  const [config, setConfig] = useState({
    title: `${widget?.name || ''} - ${field?.path || ''}`,
    refreshInterval: 30000,
    displayFormat: 'auto',
    colorScheme: 'default',
    showLegend: true,
    showGrid: true,
    aggregationType: 'none',
    filterCondition: '',
    customTransform: '',
    height: 'medium',
    width: 'medium'
  });

  const refreshIntervals = [
    { value: 1000, label: '1 second' },
    { value: 5000, label: '5 seconds' },
    { value: 30000, label: '30 seconds' },
    { value: 60000, label: '1 minute' },
    { value: 300000, label: '5 minutes' },
    { value: 600000, label: '10 minutes' }
  ];

  const colorSchemes = [
    { value: 'default', label: 'Default', colors: ['#3B82F6', '#10B981', '#F59E0B'] },
    { value: 'monochrome', label: 'Monochrome', colors: ['#6B7280', '#4B5563', '#374151'] },
    { value: 'warm', label: 'Warm', colors: ['#EF4444', '#F59E0B', '#F97316'] },
    { value: 'cool', label: 'Cool', colors: ['#3B82F6', '#06B6D4', '#8B5CF6'] },
    { value: 'nature', label: 'Nature', colors: ['#10B981', '#059669', '#047857'] }
  ];

  const displayFormats = [
    { value: 'auto', label: 'Auto' },
    { value: 'number', label: 'Number' },
    { value: 'percentage', label: 'Percentage' },
    { value: 'currency', label: 'Currency' },
    { value: 'date', label: 'Date' },
    { value: 'time', label: 'Time' },
    { value: 'datetime', label: 'Date & Time' }
  ];

  const aggregationTypes = [
    { value: 'none', label: 'None' },
    { value: 'sum', label: 'Sum' },
    { value: 'average', label: 'Average' },
    { value: 'count', label: 'Count' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' }
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'full', label: 'Full Width' }
  ];

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const widgetConfig = {
      id: Date.now(),
      widget,
      field,
      config,
      apiData: field?.value || apiData
    };
    onSave(widgetConfig);
    onClose();
  };

  const getPreviewData = () => {
    if (!field?.value) return null;
    
    const data = field.value;
    if (Array.isArray(data)) {
      return data.slice(0, 5); // Show first 5 items
    }
    return data;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg border border-border max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name={widget?.icon || 'Settings'} size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Configure Widget</h2>
              <p className="text-sm text-text-secondary">{widget?.name} for {field?.path}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-md transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Configuration Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Basic Settings */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Basic Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Widget Title
                    </label>
                    <input
                      type="text"
                      value={config.title}
                      onChange={(e) => handleConfigChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Refresh Interval
                    </label>
                    <select
                      value={config.refreshInterval}
                      onChange={(e) => handleConfigChange('refreshInterval', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {refreshIntervals.map(interval => (
                        <option key={interval.value} value={interval.value}>
                          {interval.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Display Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Display Format
                    </label>
                    <select
                      value={config.displayFormat}
                      onChange={(e) => handleConfigChange('displayFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {displayFormats.map(format => (
                        <option key={format.value} value={format.value}>
                          {format.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Color Scheme
                    </label>
                    <select
                      value={config.colorScheme}
                      onChange={(e) => handleConfigChange('colorScheme', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {colorSchemes.map(scheme => (
                        <option key={scheme.value} value={scheme.value}>
                          {scheme.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Size Settings */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-4">Size Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Width
                    </label>
                    <select
                      value={config.width}
                      onChange={(e) => handleConfigChange('width', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {sizeOptions.map(size => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Height
                    </label>
                    <select
                      value={config.height}
                      onChange={(e) => handleConfigChange('height', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {sizeOptions.map(size => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Chart-specific Settings */}
              {['line-chart', 'bar-chart', 'pie-chart'].includes(widget?.id) && (
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Chart Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={config.showLegend}
                          onChange={(e) => handleConfigChange('showLegend', e.target.checked)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-text-primary">Show Legend</span>
                      </label>
                      
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={config.showGrid}
                          onChange={(e) => handleConfigChange('showGrid', e.target.checked)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-text-primary">Show Grid</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Processing */}
              {field?.type === 'array' && (
                <div>
                  <h3 className="text-lg font-medium text-text-primary mb-4">Data Processing</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Aggregation Type
                      </label>
                      <select
                        value={config.aggregationType}
                        onChange={(e) => handleConfigChange('aggregationType', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {aggregationTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Filter Condition (Optional)
                      </label>
                      <input
                        type="text"
                        value={config.filterCondition}
                        onChange={(e) => handleConfigChange('filterCondition', e.target.value)}
                        placeholder="e.g., value > 100"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-1/3 bg-secondary-25 border-l border-border p-6">
            <h3 className="text-lg font-medium text-text-primary mb-4">Preview</h3>
            
            <div className="bg-surface rounded-lg border border-border p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-text-primary">{config.title}</h4>
                <Icon name="RefreshCw" size={14} className="text-text-secondary" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center h-24 bg-secondary-50 rounded-lg">
                  <Icon name={widget?.icon || 'BarChart3'} size={32} className="text-text-secondary" />
                </div>
                
                <div className="text-xs text-text-secondary">
                  <p>Refresh: {refreshIntervals.find(i => i.value === config.refreshInterval)?.label}</p>
                  <p>Format: {displayFormats.find(f => f.value === config.displayFormat)?.label}</p>
                  <p>Size: {config.width} × {config.height}</p>
                </div>
              </div>
            </div>

            {/* Sample Data */}
            <div className="bg-surface rounded-lg border border-border p-4">
              <h4 className="text-sm font-medium text-text-primary mb-3">Sample Data</h4>
              <div className="text-xs text-text-secondary bg-secondary-50 rounded p-2 max-h-32 overflow-y-auto">
                <pre>{JSON.stringify(getPreviewData(), null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-secondary-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Save Widget
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetConfigurationModal;