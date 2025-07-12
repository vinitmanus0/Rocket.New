import React from 'react';
import Icon from 'components/AppIcon';

const WidgetGallery = ({ onWidgetSelect, selectedFields }) => {
  const widgetTypes = [
    {
      id: 'metric-card',
      name: 'Metric Card',
      icon: 'Square',
      description: 'Display single numeric values with change indicators',
      supportedTypes: ['number', 'string'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'line-chart',
      name: 'Line Chart',
      icon: 'TrendingUp',
      description: 'Show trends over time with line graphs',
      supportedTypes: ['number', 'array'],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'bar-chart',
      name: 'Bar Chart',
      icon: 'BarChart3',
      description: 'Compare values with horizontal or vertical bars',
      supportedTypes: ['number', 'array'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'pie-chart',
      name: 'Pie Chart',
      icon: 'PieChart',
      description: 'Show proportions with circular charts',
      supportedTypes: ['number', 'array'],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'data-table',
      name: 'Data Table',
      icon: 'Table',
      description: 'Display structured data in rows and columns',
      supportedTypes: ['array', 'object'],
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: 'news-feed',
      name: 'News Feed',
      icon: 'Newspaper',
      description: 'List items with titles, descriptions, and timestamps',
      supportedTypes: ['array', 'object'],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'gauge-chart',
      name: 'Gauge Chart',
      icon: 'Gauge',
      description: 'Display progress or performance metrics',
      supportedTypes: ['number'],
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'text-display',
      name: 'Text Display',
      icon: 'Type',
      description: 'Show formatted text content',
      supportedTypes: ['string', 'number'],
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ];

  const getCompatibleWidgets = (dataType) => {
    return widgetTypes.filter(widget => 
      widget.supportedTypes.includes(dataType)
    );
  };

  const getSuggestions = () => {
    if (selectedFields.length === 0) return [];
    
    const suggestions = [];
    selectedFields.forEach(field => {
      const compatible = getCompatibleWidgets(field.type);
      if (compatible.length > 0) {
        suggestions.push({
          field,
          recommendedWidget: compatible[0], // First compatible widget as recommendation
          allCompatible: compatible
        });
      }
    });
    
    return suggestions;
  };

  const suggestions = getSuggestions();

  return (
    <div className="space-y-6">
      {/* Auto Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Lightbulb" size={20} className="text-warning" />
            <h3 className="text-lg font-medium text-text-primary">Smart Suggestions</h3>
          </div>
          
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${suggestion.recommendedWidget.borderColor} ${suggestion.recommendedWidget.bgColor}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={suggestion.recommendedWidget.icon} 
                        size={16} 
                        className={suggestion.recommendedWidget.color} 
                      />
                      <span className="text-sm font-medium text-text-primary">
                        {suggestion.recommendedWidget.name}
                      </span>
                      <span className="text-xs text-text-secondary">
                        for {suggestion.field.path}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {suggestion.recommendedWidget.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onWidgetSelect(suggestion.recommendedWidget, suggestion.field)}
                    className="ml-4 px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary-600 transition-colors"
                  >
                    Use This
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Widget Gallery */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Layout" size={20} className="text-text-secondary" />
          <h3 className="text-lg font-medium text-text-primary">Widget Gallery</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {widgetTypes.map(widget => (
            <div
              key={widget.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md ${widget.borderColor} ${widget.bgColor}`}
              onClick={() => onWidgetSelect(widget, selectedFields[0])}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${widget.bgColor}`}>
                  <Icon name={widget.icon} size={24} className={widget.color} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">{widget.name}</h4>
                  <p className="text-xs text-text-secondary">
                    {widget.supportedTypes.join(', ')}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-text-secondary mb-3">
                {widget.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {widget.supportedTypes.map(type => (
                    <span
                      key={type}
                      className="text-xs px-2 py-0.5 bg-white bg-opacity-60 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
                
                <Icon name="ArrowRight" size={16} className={widget.color} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="HelpCircle" size={20} className="text-text-secondary" />
          <h3 className="text-lg font-medium text-text-primary">How to Use</h3>
        </div>
        
        <div className="space-y-3 text-sm text-text-secondary">
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs">1</span>
            <p>Select data fields from the preview on the left</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs">2</span>
            <p>Review smart suggestions based on your data types</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs">3</span>
            <p>Click on any widget to create a mapping</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs">4</span>
            <p>Customize the widget configuration in the next step</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetGallery;