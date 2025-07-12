import React from 'react';
import Icon from 'components/AppIcon';

const PresetTemplates = ({ onTemplateSelect, selectedTemplate }) => {
  const templates = [
    {
      id: 'value-stocks',
      name: 'Value Stocks',
      description: 'Undervalued stocks with strong fundamentals',
      icon: 'TrendingDown',
      color: 'success',
      filters: {
        marketCap: { min: 10000, max: 1000000 },
        peRatio: { min: 0, max: 20 },
        debtToEquity: { min: 0, max: 0.5 },
        rsi: { min: 20, max: 50 },
        returns1Y: { min: -20, max: 500 },
        dividend: { min: 2, max: 15 },
        sector: [],
        exchange: []
      }
    },
    {
      id: 'growth-stocks',
      name: 'Growth Stocks',
      description: 'High-growth potential companies',
      icon: 'TrendingUp',
      color: 'primary',
      filters: {
        marketCap: { min: 50000, max: 1000000 },
        peRatio: { min: 15, max: 100 },
        debtToEquity: { min: 0, max: 1 },
        rsi: { min: 40, max: 80 },
        returns1Y: { min: 15, max: 500 },
        dividend: { min: 0, max: 5 },
        sector: ['IT', 'Healthcare', 'Consumer'],
        exchange: []
      }
    },
    {
      id: 'dividend-aristocrats',
      name: 'Dividend Aristocrats',
      description: 'Consistent dividend-paying stocks',
      icon: 'Coins',
      color: 'warning',
      filters: {
        marketCap: { min: 25000, max: 1000000 },
        peRatio: { min: 0, max: 30 },
        debtToEquity: { min: 0, max: 0.8 },
        rsi: { min: 30, max: 70 },
        returns1Y: { min: 0, max: 500 },
        dividend: { min: 3, max: 15 },
        sector: ['Banking', 'FMCG', 'Utilities'],
        exchange: []
      }
    },
    {
      id: 'momentum-stocks',
      name: 'Momentum Stocks',
      description: 'Stocks with strong price momentum',
      icon: 'Zap',
      color: 'accent',
      filters: {
        marketCap: { min: 5000, max: 1000000 },
        peRatio: { min: 0, max: 50 },
        debtToEquity: { min: 0, max: 2 },
        rsi: { min: 60, max: 100 },
        returns1Y: { min: 20, max: 500 },
        dividend: { min: 0, max: 10 },
        sector: [],
        exchange: []
      }
    },
    {
      id: 'large-cap',
      name: 'Large Cap Stocks',
      description: 'Established large-cap companies',
      icon: 'Building2',
      color: 'secondary',
      filters: {
        marketCap: { min: 200000, max: 1000000 },
        peRatio: { min: 0, max: 40 },
        debtToEquity: { min: 0, max: 1 },
        rsi: { min: 0, max: 100 },
        returns1Y: { min: -50, max: 500 },
        dividend: { min: 0, max: 15 },
        sector: [],
        exchange: []
      }
    },
    {
      id: 'small-cap',
      name: 'Small Cap Gems',
      description: 'High-potential small-cap stocks',
      icon: 'Gem',
      color: 'error',
      filters: {
        marketCap: { min: 1000, max: 50000 },
        peRatio: { min: 0, max: 60 },
        debtToEquity: { min: 0, max: 3 },
        rsi: { min: 0, max: 100 },
        returns1Y: { min: -30, max: 500 },
        dividend: { min: 0, max: 8 },
        sector: [],
        exchange: []
      }
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 text-primary-700 border-primary-200',
      success: 'bg-success-50 text-success-700 border-success-200',
      warning: 'bg-warning-50 text-warning-700 border-warning-200',
      accent: 'bg-accent-50 text-accent-700 border-accent-200',
      error: 'bg-error-50 text-error-700 border-error-200',
      secondary: 'bg-secondary-100 text-secondary-700 border-secondary-200'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getIconColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      accent: 'text-accent-600',
      error: 'text-error-600',
      secondary: 'text-secondary-600'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Screening Templates</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className={`p-4 rounded-lg border-2 transition-all duration-150 ease-out hover:shadow-medium micro-interaction ${
              selectedTemplate?.id === template.id
                ? getColorClasses(template.color)
                : 'bg-surface border-border hover:border-secondary-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-full mb-3 ${
                selectedTemplate?.id === template.id
                  ? 'bg-white bg-opacity-20' :'bg-secondary-100'
              }`}>
                <Icon
                  name={template.icon}
                  size={24}
                  className={
                    selectedTemplate?.id === template.id
                      ? 'text-current'
                      : getIconColorClasses(template.color)
                  }
                />
              </div>
              
              <h4 className={`font-semibold mb-1 ${
                selectedTemplate?.id === template.id
                  ? 'text-current' :'text-text-primary'
              }`}>
                {template.name}
              </h4>
              
              <p className={`text-xs ${
                selectedTemplate?.id === template.id
                  ? 'text-current opacity-80' :'text-text-secondary'
              }`}>
                {template.description}
              </p>
            </div>
          </button>
        ))}
      </div>
      
      {selectedTemplate && (
        <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name={selectedTemplate.icon} size={20} className="text-primary-600" />
              <div>
                <span className="font-medium text-primary-700">
                  {selectedTemplate.name} template applied
                </span>
                <p className="text-sm text-primary-600">
                  {selectedTemplate.description}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => onTemplateSelect(null)}
              className="p-1 text-primary-600 hover:text-primary-700 transition-colors duration-150 ease-out"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresetTemplates;