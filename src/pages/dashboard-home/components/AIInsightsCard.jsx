import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AIInsightsCard = ({ insights, onViewMore }) => {
  const [currentInsight, setCurrentInsight] = useState(0);

  const getActionColor = (action) => {
    switch (action) {
      case 'BUY':
        return 'text-success bg-success-50 border-success-200';
      case 'SELL':
        return 'text-error bg-error-50 border-error-200';
      case 'HOLD':
        return 'text-warning bg-warning-50 border-warning-200';
      default:
        return 'text-secondary bg-secondary-100 border-secondary-200';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'recommendation':
        return 'ThumbsUp';
      case 'alert':
        return 'AlertTriangle';
      case 'opportunity':
        return 'Target';
      default:
        return 'Brain';
    }
  };

  const nextInsight = () => {
    setCurrentInsight((prev) => (prev + 1) % insights.length);
  };

  const prevInsight = () => {
    setCurrentInsight((prev) => (prev - 1 + insights.length) % insights.length);
  };

  if (!insights || insights.length === 0) {
    return (
      <div className="card p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Icon name="Brain" size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">AI Insights</h3>
          </div>
        </div>
        
        <div className="text-center py-8">
          <Icon name="Brain" size={48} className="text-secondary-300 mx-auto mb-3" />
          <p className="text-text-secondary">No insights available</p>
        </div>
      </div>
    );
  }

  const insight = insights[currentInsight];

  return (
    <div className="card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-50 rounded-lg">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">AI Insights</h3>
        </div>
        
        <button
          onClick={onViewMore}
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150 ease-out"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {/* Current Insight */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-4 border border-primary-100">
          <div className="flex items-start space-x-3 mb-3">
            <div className="p-2 bg-surface rounded-lg">
              <Icon name={getInsightIcon(insight.type)} size={18} className="text-primary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-text-primary">{insight.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getActionColor(insight.action)}`}>
                  {insight.action}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary mb-3">{insight.message}</p>
              
              {/* Confidence Meter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">AI Confidence</span>
                  <span className="font-medium text-text-primary">{insight.confidence}%</span>
                </div>
                
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {insights.length > 1 && (
          <div className="flex items-center justify-between">
            <button
              onClick={prevInsight}
              className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-all duration-150 ease-out"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            
            <div className="flex space-x-2">
              {insights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentInsight(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-150 ease-out ${
                    index === currentInsight ? 'bg-primary' : 'bg-secondary-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextInsight}
              className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-all duration-150 ease-out"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-light">
          <div className="text-center">
            <p className="text-xs text-text-secondary">Total Insights</p>
            <p className="font-semibold text-text-primary">{insights.length}</p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-text-secondary">Avg Confidence</p>
            <p className="font-semibold text-text-primary">
              {Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)}%
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-text-secondary">Buy Signals</p>
            <p className="font-semibold text-success">
              {insights.filter(i => i.action === 'BUY').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsCard;