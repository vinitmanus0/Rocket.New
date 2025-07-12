import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from 'components/AppIcon';

const TechnicalIndicators = ({ stockData }) => {
  const [selectedIndicator, setSelectedIndicator] = useState('RSI');

  const indicators = [
    { id: 'RSI', name: 'RSI (14)', value: 68.5, signal: 'Overbought', color: 'warning' },
    { id: 'MACD', name: 'MACD', value: 12.3, signal: 'Bullish', color: 'success' },
    { id: 'SMA', name: 'SMA (50)', value: 2456.80, signal: 'Above', color: 'success' },
    { id: 'EMA', name: 'EMA (20)', value: 2478.90, signal: 'Above', color: 'success' },
    { id: 'BB', name: 'Bollinger Bands', value: 'Middle', signal: 'Neutral', color: 'secondary' },
    { id: 'STOCH', name: 'Stochastic', value: 72.1, signal: 'Overbought', color: 'warning' }
  ];

  // Mock technical data
  const technicalData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    price: 2485 + Math.sin(i * 0.2) * 50 + Math.random() * 20,
    rsi: 50 + Math.sin(i * 0.3) * 20 + Math.random() * 10,
    macd: Math.sin(i * 0.25) * 15 + Math.random() * 5,
    sma50: 2450 + Math.sin(i * 0.1) * 30,
    ema20: 2460 + Math.sin(i * 0.15) * 25,
    bbUpper: 2520 + Math.sin(i * 0.1) * 20,
    bbLower: 2420 + Math.sin(i * 0.1) * 20,
    stoch: 50 + Math.sin(i * 0.4) * 30 + Math.random() * 10
  }));

  const getSignalColor = (color) => {
    const colorMap = {
      success: 'text-success bg-success-50',
      warning: 'text-warning bg-warning-50',
      error: 'text-error bg-error-50',
      secondary: 'text-secondary bg-secondary-100'
    };
    return colorMap[color] || colorMap.secondary;
  };

  const renderIndicatorChart = () => {
    switch (selectedIndicator) {
      case 'RSI':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={technicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-text-secondary)" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="var(--color-text-secondary)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <ReferenceLine y={70} stroke="var(--color-error)" strokeDasharray="2 2" />
              <ReferenceLine y={30} stroke="var(--color-success)" strokeDasharray="2 2" />
              <Line type="monotone" dataKey="rsi" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'MACD':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={technicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-text-secondary)" fontSize={12} />
              <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <ReferenceLine y={0} stroke="var(--color-text-secondary)" strokeDasharray="1 1" />
              <Line type="monotone" dataKey="macd" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <div className="h-48 flex items-center justify-center text-text-secondary">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Select an indicator to view chart</p>
            </div>
          </div>
        );
    }
  };

  const patterns = [
    {
      name: 'Double Top',
      probability: 75,
      timeframe: '1W',
      description: 'Bearish reversal pattern forming at resistance level',
      signal: 'Bearish'
    },
    {
      name: 'Support Level',
      probability: 85,
      timeframe: '1M',
      description: 'Strong support identified at ₹2,420 level',
      signal: 'Bullish'
    },
    {
      name: 'Volume Breakout',
      probability: 68,
      timeframe: '1D',
      description: 'Above average volume supporting price movement',
      signal: 'Bullish'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Technical Indicators Overview */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Technical Indicators</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {indicators.map((indicator) => (
            <div 
              key={indicator.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-150 ease-out ${
                selectedIndicator === indicator.id 
                  ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
              }`}
              onClick={() => setSelectedIndicator(indicator.id)}
            >
              <div className="text-center">
                <p className="text-sm font-medium text-text-primary mb-1">{indicator.name}</p>
                <p className="text-lg font-bold text-text-primary mb-2">
                  {typeof indicator.value === 'number' ? indicator.value.toFixed(2) : indicator.value}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSignalColor(indicator.color)}`}>
                  {indicator.signal}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Indicator Chart */}
        <div className="bg-background rounded-lg p-4">
          <h3 className="font-semibold text-text-primary mb-4">
            {indicators.find(i => i.id === selectedIndicator)?.name} Chart
          </h3>
          {renderIndicatorChart()}
        </div>
      </div>

      {/* Chart Patterns */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Chart Patterns</h2>
        
        <div className="space-y-4">
          {patterns.map((pattern, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-text-primary">{pattern.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pattern.signal === 'Bullish' ? 'text-success bg-success-50' : 'text-error bg-error-50'
                  }`}>
                    {pattern.signal}
                  </span>
                  <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                    {pattern.timeframe}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{pattern.description}</p>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-lg font-bold text-text-primary">{pattern.probability}%</div>
                <div className="text-xs text-text-secondary">Probability</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support & Resistance */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Support & Resistance Levels</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-success mb-4 flex items-center">
              <Icon name="ArrowUp" size={18} className="mr-2" />
              Resistance Levels
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-error-50 rounded-lg">
                <span className="text-text-secondary">R3 (Strong)</span>
                <span className="font-semibold text-text-primary">₹2,580</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-error-50 rounded-lg">
                <span className="text-text-secondary">R2 (Medium)</span>
                <span className="font-semibold text-text-primary">₹2,520</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-error-50 rounded-lg">
                <span className="text-text-secondary">R1 (Weak)</span>
                <span className="font-semibold text-text-primary">₹2,495</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-success mb-4 flex items-center">
              <Icon name="ArrowDown" size={18} className="mr-2" />
              Support Levels
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
                <span className="text-text-secondary">S1 (Weak)</span>
                <span className="font-semibold text-text-primary">₹2,440</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
                <span className="text-text-secondary">S2 (Medium)</span>
                <span className="font-semibold text-text-primary">₹2,420</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-success-50 rounded-lg">
                <span className="text-text-secondary">S3 (Strong)</span>
                <span className="font-semibold text-text-primary">₹2,380</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicators;