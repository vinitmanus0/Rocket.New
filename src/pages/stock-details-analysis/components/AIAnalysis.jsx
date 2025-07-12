import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AIAnalysis = ({ stockData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'BUY':
        return 'text-success bg-success-50 border-success';
      case 'SELL':
        return 'text-error bg-error-50 border-error';
      case 'HOLD':
        return 'text-warning bg-warning-50 border-warning';
      default:
        return 'text-secondary bg-secondary-100 border-secondary';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-error';
  };

  const analysisFactors = [
    {
      factor: 'Financial Health',
      score: 8.5,
      description: 'Strong balance sheet with healthy cash flows and manageable debt levels.',
      icon: 'TrendingUp'
    },
    {
      factor: 'Growth Prospects',
      score: 8.0,
      description: 'Expanding into renewable energy and digital services with significant potential.',
      icon: 'Zap'
    },
    {
      factor: 'Market Position',
      score: 9.0,
      description: 'Market leader in refining and petrochemicals with strong competitive moats.',
      icon: 'Award'
    },
    {
      factor: 'Valuation',
      score: 7.5,
      description: 'Trading at reasonable valuations compared to historical averages and peers.',
      icon: 'Calculator'
    },
    {
      factor: 'Risk Assessment',
      score: 7.0,
      description: 'Moderate risk due to commodity price volatility and regulatory changes.',
      icon: 'Shield'
    }
  ];

  const riskFactors = [
    'Commodity price volatility affecting margins',
    'Regulatory changes in environmental policies',
    'Global economic slowdown impact on demand',
    'Competition in digital services segment'
  ];

  const opportunities = [
    'Renewable energy expansion plans',
    'Digital services monetization',
    'Petrochemical capacity expansion',
    'Strategic partnerships and acquisitions'
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">AI Analysis</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-primary" />
          <span className="text-sm text-text-secondary">Powered by AI</span>
        </div>
      </div>

      {/* Recommendation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full border-2 font-semibold text-lg ${getRecommendationColor(stockData?.aiRecommendation)}`}>
            <Icon 
              name={stockData?.aiRecommendation === 'BUY' ? 'TrendingUp' : stockData?.aiRecommendation === 'SELL' ? 'TrendingDown' : 'Minus'} 
              size={20} 
              className="mr-2" 
            />
            {stockData?.aiRecommendation}
          </div>
          <p className="text-sm text-text-secondary mt-2">AI Recommendation</p>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-bold ${getScoreColor(stockData?.aiScore)}`}>
            {stockData?.aiScore}/10
          </div>
          <p className="text-sm text-text-secondary">AI Confidence Score</p>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-background rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Lightbulb" size={18} className="mr-2 text-primary" />
          AI Insight
        </h3>
        <div className={`text-text-secondary ${isExpanded ? '' : 'line-clamp-3'}`}>
          <p>{stockData?.aiInsight}</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150 ease-out"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      </div>

      {/* Analysis Factors */}
      <div className="mb-6">
        <h3 className="font-semibold text-text-primary mb-4">Analysis Breakdown</h3>
        <div className="space-y-4">
          {analysisFactors.map((factor, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 bg-background rounded-lg">
              <div className="flex-shrink-0 p-2 bg-primary-50 text-primary rounded-lg">
                <Icon name={factor.icon} size={16} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-text-primary">{factor.factor}</h4>
                  <span className={`font-semibold ${getScoreColor(factor.score)}`}>
                    {factor.score}/10
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{factor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk & Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="AlertTriangle" size={18} className="mr-2 text-error" />
            Risk Factors
          </h3>
          <ul className="space-y-2">
            {riskFactors.map((risk, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="Minus" size={14} className="text-error mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-text-primary mb-3 flex items-center">
            <Icon name="Target" size={18} className="mr-2 text-success" />
            Opportunities
          </h3>
          <ul className="space-y-2">
            {opportunities.map((opportunity, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="Plus" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-text-secondary">{opportunity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-text-secondary">
          <Icon name="Info" size={14} className="inline mr-1" />
          This AI analysis is for informational purposes only and should not be considered as investment advice. 
          Please consult with a financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
};

export default AIAnalysis;