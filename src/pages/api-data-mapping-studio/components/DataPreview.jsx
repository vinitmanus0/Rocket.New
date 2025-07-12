import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DataPreview = ({ apiData, onFieldSelect, selectedFields }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  const getDataType = (value) => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'object';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'boolean') return 'boolean';
    return 'unknown';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'string': return 'text-green-600';
      case 'number': return 'text-blue-600';
      case 'boolean': return 'text-purple-600';
      case 'array': return 'text-orange-600';
      case 'object': return 'text-gray-600';
      case 'null': return 'text-red-600';
      default: return 'text-text-secondary';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'string': return 'Type';
      case 'number': return 'Hash';
      case 'boolean': return 'ToggleLeft';
      case 'array': return 'List';
      case 'object': return 'Package';
      case 'null': return 'Minus';
      default: return 'Help';
    }
  };

  const toggleNode = (path) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const isFieldSelected = (path) => {
    return selectedFields.some(field => field.path === path);
  };

  const renderValue = (value, path = '', level = 0) => {
    const type = getDataType(value);
    const isExpanded = expandedNodes.has(path);
    const hasChildren = type === 'object' || type === 'array';
    const isSelected = isFieldSelected(path);

    return (
      <div key={path} className="select-none">
        <div
          className={`flex items-center space-x-2 py-1 px-2 rounded cursor-pointer hover:bg-secondary-50 transition-colors ${
            isSelected ? 'bg-primary-50 border border-primary-200' : ''
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => onFieldSelect && onFieldSelect(path, value, type)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(path);
              }}
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center"
            >
              <Icon 
                name={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
                size={12} 
                className="text-text-secondary"
              />
            </button>
          )}
          
          {!hasChildren && <div className="w-4" />}
          
          <Icon 
            name={getTypeIcon(type)} 
            size={14} 
            className={`flex-shrink-0 ${getTypeColor(type)}`} 
          />
          
          <span className="text-sm font-medium text-text-primary">
            {path.split('.').pop() || 'root'}
          </span>
          
          <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(type)} bg-opacity-10`}>
            {type}
          </span>
          
          {!hasChildren && (
            <span className="text-sm text-text-secondary truncate max-w-xs">
              {type === 'string' ? `"${value}"` : String(value)}
            </span>
          )}
          
          {hasChildren && (
            <span className="text-xs text-text-secondary">
              {type === 'array' ? `[${value.length}]` : `{${Object.keys(value).length}}`}
            </span>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-2">
            {type === 'array' ? (
              value.map((item, index) => 
                renderValue(item, `${path}[${index}]`, level + 1)
              )
            ) : (
              Object.entries(value).map(([key, val]) => 
                renderValue(val, path ? `${path}.${key}` : key, level + 1)
              )
            )}
          </div>
        )}
      </div>
    );
  };

  if (!apiData) {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-center py-8">
          <Icon name="Database" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No API Data</h3>
          <p className="text-text-secondary">
            Select an API and test the connection to preview the data structure
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={20} className="text-text-secondary" />
          <h3 className="text-lg font-medium text-text-primary">Data Preview</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setExpandedNodes(new Set())}
            className="text-sm text-text-secondary hover:text-text-primary"
          >
            Collapse All
          </button>
          <button
            onClick={() => {
              const allPaths = new Set();
              const collectPaths = (obj, path = '') => {
                if (typeof obj === 'object' && obj !== null) {
                  if (Array.isArray(obj)) {
                    obj.forEach((item, index) => collectPaths(item, `${path}[${index}]`));
                  } else {
                    Object.entries(obj).forEach(([key, value]) => {
                      const newPath = path ? `${path}.${key}` : key;
                      allPaths.add(newPath);
                      collectPaths(value, newPath);
                    });
                  }
                }
              };
              collectPaths(apiData);
              setExpandedNodes(allPaths);
            }}
            className="text-sm text-text-secondary hover:text-text-primary"
          >
            Expand All
          </button>
        </div>
      </div>
      
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="mb-4 p-3 bg-accent-50 border border-accent-200 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-accent-600" />
            <span className="text-sm text-accent-700 font-medium">Interactive Preview</span>
          </div>
          <p className="text-sm text-accent-600 mt-1">
            Click on any data field to select it for widget mapping
          </p>
        </div>
        
        {renderValue(apiData)}
      </div>
    </div>
  );
};

export default DataPreview;