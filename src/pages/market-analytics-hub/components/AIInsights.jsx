import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AIInsights = ({ timeframe }) => {
  const [aiData, setAiData] = useState({});
  const [selectedInsight, setSelectedInsight] = useState('predictions');
  const navigate = useNavigate();

  // Mock AI insights data
  const mockAiData = {
    predictions: [
      {
        symbol: 'NIFTY 50',
        currentPrice: 19847.50,
        prediction: 20150,
        confidence: 78,
        timeframe: '1 Week',
        direction: 'Bullish',
        factors: ['Strong momentum', 'Positive sentiment', 'Technical breakout'],
        risk: 'Medium'
      },
      {
        symbol: 'RELIANCE',
        currentPrice: 2567.80,
        prediction: 2650,
        confidence: 85,
        timeframe: '2 Weeks',
        direction: 'Bullish',
        factors: ['Earnings beat', 'Sector rotation', 'Volume surge'],
        risk: 'Low'
      },
      {
        symbol: 'TCS',
        currentPrice: 3456.90,
        prediction: 3580,
        confidence: 72,
        timeframe: '1 Month',
        direction: 'Bullish',
        factors: ['Deal pipeline', 'Digital transformation', 'Margin expansion'],
        risk: 'Medium'
      }
    ],
    sentimentAnalysis: {
      overall: 68,
      news: 72,
      social: 65,
      institutional: 71,
      retail: 64,
      trends: [
        { time: '9 AM', sentiment: 62 },
        { time: '10 AM', sentiment: 65 },
        { time: '11 AM', sentiment: 68 },
        { time: '12 PM', sentiment: 70 },
        { time: '1 PM', sentiment: 69 },
        { time: '2 PM', sentiment: 71 },
        { time: '3 PM', sentiment: 68 },
        { time: '3:30 PM', sentiment: 68 }
      ]
    },
    patternAlerts: [
      {
        id: 1,
        type: 'Breakout Alert',
        symbol: 'HDFC BANK',
        pattern: 'Ascending Triangle',
        confidence: 89,
        action: 'Buy',
        target: 1750,
        stopLoss: 1620,
        timestamp: new Date(Date.now() - 15 * 60 * 1000)
      },
      {
        id: 2,
        type: 'Reversal Signal',
        symbol: 'BAJAJ FINANCE',
        pattern: 'Double Bottom',
        confidence: 76,
        action: 'Watch',
        target: 7200,
        stopLoss: 6500,
        timestamp: new Date(Date.now() - 45 * 60 * 1000)
      },
      {
        id: 3,
        type: 'Momentum Alert',
        symbol: 'INFOSYS',
        pattern: 'Bull Flag',
        confidence: 82,
        action: 'Buy',
        target: 1520,
        stopLoss: 1420,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ],
    marketInsights: [
      {
        title: 'Sector Rotation Detected',
        description: `AI models detect significant capital flow from defensive sectors to cyclical stocks. Banking and IT sectors showing strong institutional buying while FMCG and Pharma witnessing profit booking.`,
        impact: 'High',
        timeframe: 'Next 2-3 weeks',
        actionable: true
      },
      {
        title: 'Volatility Compression',
        description: `VIX levels indicate market consolidation phase ending. Historical patterns suggest potential breakout within 5-7 trading sessions with 73% probability.`,
        impact: 'Medium',
        timeframe: '1 Week',
        actionable: true
      },
      {
        title: 'Options Flow Analysis',
        description: `Unusual call option activity in Banking index suggests institutional positioning for upside. Put-call ratio at multi-week lows indicating bullish sentiment.`,
        impact: 'Medium',
        timeframe: 'Current session',
        actionable: false
      }
    ],
    riskMetrics: {
      marketRisk: 35,
      sectorRisk: 42,
      volatilityRisk: 28,
      liquidityRisk: 22,
      overallRisk: 32
    }
  };

  const insightTabs = [
    { id: 'predictions', label: 'AI Predictions', icon: 'TrendingUp' },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: 'Heart' },
    { id: 'patterns', label: 'Pattern Alerts', icon: 'Zap' },
    { id: 'insights', label: 'Market Insights', icon: 'Brain' }
  ];

  useEffect(() => {
    setAiData(mockAiData);
  }, [timeframe]);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'text-success';
    if (risk === 'Medium') return 'text-warning';
    return 'text-error';
  };

  const renderInsightContent = () => {
    switch (selectedInsight) {
      case 'predictions':
        return (
          <div className="space-y-4">
            {aiData.predictions?.map((prediction, idx) => (
              <div key={idx} className="card p-6 card-hover cursor-pointer" onClick={() => navigate('/stock-details-analysis')}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-text-primary">{prediction.symbol}</h4>
                    <p className="text-sm text-text-secondary">{prediction.timeframe} forecast</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${prediction.direction === 'Bullish' ? 'text-success' : 'text-error'}`}>
                      {prediction.direction}
                    </div>
                    <div className={`text-sm ${getConfidenceColor(prediction.confidence)}`}>
                      {prediction.confidence}% confidence
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-text-secondary">Current Price</span>
                    <div className="text-lg font-semibold text-text-primary">
                      ₹{prediction.currentPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-text-secondary">Target Price</span>
                    <div className="text-lg font-semibold text-success">
                      ₹{prediction.prediction.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm text-text-secondary mb-2 block">Key Factors</span>
                  <div className="flex flex-wrap gap-2">
                    {prediction.factors.map((factor, factorIdx) => (
                      <span key={factorIdx} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">Risk Level:</span>
                    <span className={`text-sm font-medium ${getRiskColor(prediction.risk)}`}>
                      {prediction.risk}
                    </span>
                  </div>
                  <div className="w-24 bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'sentiment':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Overall', value: aiData.sentimentAnalysis?.overall },
                { label: 'News', value: aiData.sentimentAnalysis?.news },
                { label: 'Social', value: aiData.sentimentAnalysis?.social },
                { label: 'Institutional', value: aiData.sentimentAnalysis?.institutional },
                { label: 'Retail', value: aiData.sentimentAnalysis?.retail }
              ].map((sentiment, idx) => (
                <div key={idx} className="card p-4 text-center">
                  <div className="text-2xl font-bold text-text-primary mb-2">
                    {sentiment.value}%
                  </div>
                  <div className="text-sm text-text-secondary">{sentiment.label}</div>
                  <div className="w-full bg-secondary-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ease-out ${
                        sentiment.value >= 70 ? 'bg-success' :
                        sentiment.value >= 50 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${sentiment.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="card p-6">
              <h4 className="text-lg font-semibold text-text-primary mb-4">Sentiment Trends</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={aiData.sentimentAnalysis?.trends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="time" stroke="var(--color-text-secondary)" />
                    <YAxis domain={[0, 100]} stroke="var(--color-text-secondary)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sentiment" 
                      stroke="var(--color-primary)" 
                      strokeWidth={3}
                      name="Market Sentiment"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'patterns':
        return (
          <div className="space-y-4">
            {aiData.patternAlerts?.map((alert, idx) => (
              <div key={idx} className="card p-6 border-l-4 border-primary">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Zap" size={20} className="text-primary" />
                    <div>
                      <h4 className="font-semibold text-text-primary">{alert.type}</h4>
                      <p className="text-sm text-text-secondary">{alert.symbol} • {alert.pattern}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      alert.action === 'Buy' ? 'bg-success-100 text-success-700' :
                      alert.action === 'Sell'? 'bg-error-100 text-error-700' : 'bg-warning-100 text-warning-700'
                    }`}>
                      {alert.action}
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                      {formatTimestamp(alert.timestamp)}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-text-secondary">Confidence</span>
                    <div className={`text-lg font-semibold ${getConfidenceColor(alert.confidence)}`}>
                      {alert.confidence}%
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-text-secondary">Target</span>
                    <div className="text-lg font-semibold text-success">
                      ₹{alert.target.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-text-secondary">Stop Loss</span>
                    <div className="text-lg font-semibold text-error">
                      ₹{alert.stopLoss.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate('/stock-details-analysis')}
                  className="w-full btn-primary py-2 rounded-lg font-medium transition-all duration-150 ease-out"
                >
                  View Detailed Analysis
                </button>
              </div>
            ))}
          </div>
        );

      case 'insights':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {Object.entries(aiData.riskMetrics || {}).map(([key, value], idx) => (
                <div key={idx} className="card p-4 text-center">
                  <div className={`text-2xl font-bold mb-2 ${
                    value <= 30 ? 'text-success' :
                    value <= 60 ? 'text-warning' : 'text-error'
                  }`}>
                    {value}%
                  </div>
                  <div className="text-sm text-text-secondary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              {aiData.marketInsights?.map((insight, idx) => (
                <div key={idx} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Brain" size={20} className="text-primary" />
                      <div>
                        <h4 className="font-semibold text-text-primary">{insight.title}</h4>
                        <p className="text-sm text-text-secondary">{insight.timeframe}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        insight.impact === 'High' ? 'bg-error-100 text-error-700' :
                        insight.impact === 'Medium'? 'bg-warning-100 text-warning-700' : 'bg-success-100 text-success-700'
                      }`}>
                        {insight.impact} Impact
                      </span>
                      {insight.actionable && (
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          Actionable
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-text-primary leading-relaxed mb-4">
                    {insight.description}
                  </p>
                  
                  {insight.actionable && (
                    <button
                      onClick={() => navigate('/stock-screener')}
                      className="btn-secondary px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out"
                    >
                      Explore Opportunities
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Navigation */}
      <div className="flex flex-wrap gap-2">
        {insightTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedInsight(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out ${
              selectedInsight === tab.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-border'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* AI Insights Content */}
      <div className="min-h-[400px]">
        {renderInsightContent()}
      </div>
    </div>
  );
};

export default AIInsights;