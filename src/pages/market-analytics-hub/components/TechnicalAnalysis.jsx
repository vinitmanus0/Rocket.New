import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const TechnicalAnalysis = ({ timeframe }) => {
  const [technicalData, setTechnicalData] = useState({});
  const [selectedIndicator, setSelectedIndicator] = useState('RSI');
  const navigate = useNavigate();

  // Mock technical analysis data
  const mockTechnicalData = {
    marketIndicators: [
      {
        name: 'Advance-Decline Ratio',
        value: 1.47,
        signal: 'Bullish',
        description: 'More stocks advancing than declining',
        trend: 'up',
        strength: 'Strong'
      },
      {
        name: 'VIX (Volatility Index)',
        value: 14.25,
        signal: 'Low Volatility',
        description: 'Market showing low fear levels',
        trend: 'down',
        strength: 'Moderate'
      },
      {
        name: 'Put-Call Ratio',
        value: 0.78,
        signal: 'Bullish',
        description: 'More calls than puts being traded',
        trend: 'down',
        strength: 'Strong'
      },
      {
        name: 'TRIN (Arms Index)',
        value: 0.85,
        signal: 'Bullish',
        description: 'Buying pressure exceeding selling',
        trend: 'down',
        strength: 'Moderate'
      }
    ],
    momentumOscillators: {
      RSI: {
        value: 67.5,
        signal: 'Bullish',
        level: 'Overbought Territory',
        data: [
          { time: '09:15', value: 62.3 },
          { time: '10:00', value: 64.1 },
          { time: '11:00', value: 65.8 },
          { time: '12:00', value: 66.9 },
          { time: '13:00', value: 67.2 },
          { time: '14:00', value: 67.8 },
          { time: '15:00', value: 67.5 },
          { time: '15:30', value: 67.5 }
        ]
      },
      MACD: {
        value: 45.2,
        signal: 'Bullish Crossover',
        level: 'Above Signal Line',
        data: [
          { time: '09:15', macd: 42.1, signal: 41.8 },
          { time: '10:00', macd: 43.2, signal: 42.1 },
          { time: '11:00', macd: 44.1, signal: 42.8 },
          { time: '12:00', macd: 44.8, signal: 43.2 },
          { time: '13:00', macd: 45.1, signal: 43.9 },
          { time: '14:00', macd: 45.3, signal: 44.2 },
          { time: '15:00', macd: 45.2, signal: 44.5 },
          { time: '15:30', macd: 45.2, signal: 44.6 }
        ]
      },
      Stochastic: {
        value: 72.8,
        signal: 'Overbought',
        level: 'Above 70',
        data: [
          { time: '09:15', k: 68.5, d: 65.2 },
          { time: '10:00', k: 69.8, d: 66.1 },
          { time: '11:00', k: 71.2, d: 67.8 },
          { time: '12:00', k: 72.1, d: 69.2 },
          { time: '13:00', k: 72.5, d: 70.1 },
          { time: '14:00', k: 72.8, d: 70.8 },
          { time: '15:00', k: 72.6, d: 71.2 },
          { time: '15:30', k: 72.8, d: 71.5 }
        ]
      }
    },
    supportResistance: [
      { level: 19950, type: 'Resistance', strength: 'Strong', touches: 5 },
      { level: 19850, type: 'Current', strength: 'N/A', touches: 0 },
      { level: 19750, type: 'Support', strength: 'Moderate', touches: 3 },
      { level: 19650, type: 'Support', strength: 'Strong', touches: 7 }
    ],
    patternRecognition: [
      {
        pattern: 'Ascending Triangle',
        timeframe: '1H',
        reliability: 78,
        target: 20100,
        status: 'Active'
      },
      {
        pattern: 'Bull Flag',
        timeframe: '4H',
        reliability: 85,
        target: 20250,
        status: 'Confirmed'
      },
      {
        pattern: 'Double Bottom',
        timeframe: '1D',
        reliability: 92,
        target: 20500,
        status: 'Completed'
      }
    ]
  };

  const indicators = ['RSI', 'MACD', 'Stochastic'];

  useEffect(() => {
    setTechnicalData(mockTechnicalData);
  }, [timeframe]);

  const getSignalColor = (signal) => {
    if (signal.includes('Bullish') || signal.includes('Strong')) return 'text-success';
    if (signal.includes('Bearish') || signal.includes('Weak')) return 'text-error';
    return 'text-warning';
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  const renderIndicatorChart = () => {
    const data = technicalData.momentumOscillators?.[selectedIndicator]?.data || [];
    
    if (selectedIndicator === 'MACD') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="time" stroke="var(--color-text-secondary)" />
            <YAxis stroke="var(--color-text-secondary)" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Line type="monotone" dataKey="macd" stroke="var(--color-primary)" strokeWidth={2} name="MACD" />
            <Line type="monotone" dataKey="signal" stroke="var(--color-error)" strokeWidth={2} name="Signal" />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (selectedIndicator === 'Stochastic') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
            <Line type="monotone" dataKey="k" stroke="var(--color-primary)" strokeWidth={2} name="%K" />
            <Line type="monotone" dataKey="d" stroke="var(--color-accent)" strokeWidth={2} name="%D" />
          </LineChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-primary)" 
              fill="var(--color-primary-100)" 
              strokeWidth={2}
              name="RSI"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {technicalData.marketIndicators?.map((indicator, idx) => (
          <div key={idx} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary text-sm">{indicator.name}</h3>
              <Icon 
                name={getTrendIcon(indicator.trend)} 
                size={20} 
                className={getSignalColor(indicator.signal)} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-bold text-text-primary">
                {indicator.value}
              </div>
              
              <div className={`text-sm font-medium ${getSignalColor(indicator.signal)}`}>
                {indicator.signal}
              </div>
              
              <div className="text-xs text-text-secondary">
                {indicator.description}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-secondary">Strength:</span>
                <span className={`text-xs font-medium ${
                  indicator.strength === 'Strong' ? 'text-success' : 
                  indicator.strength === 'Moderate' ? 'text-warning' : 'text-error'
                }`}>
                  {indicator.strength}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Momentum Oscillators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Oscillator Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Momentum Oscillators</h3>
            <div className="flex items-center space-x-2">
              {indicators.map((indicator) => (
                <button
                  key={indicator}
                  onClick={() => setSelectedIndicator(indicator)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ease-out ${
                    selectedIndicator === indicator
                      ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  {indicator}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64">
            {renderIndicatorChart()}
          </div>
          
          <div className="mt-4 p-3 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">
                {selectedIndicator}: {technicalData.momentumOscillators?.[selectedIndicator]?.value}
              </span>
              <span className={`text-sm font-medium ${
                getSignalColor(technicalData.momentumOscillators?.[selectedIndicator]?.signal)
              }`}>
                {technicalData.momentumOscillators?.[selectedIndicator]?.signal}
              </span>
            </div>
          </div>
        </div>

        {/* Support & Resistance */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Support & Resistance</h3>
            <Icon name="BarChart2" size={20} className="text-primary" />
          </div>
          
          <div className="space-y-3">
            {technicalData.supportResistance?.map((level, idx) => (
              <div 
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  level.type === 'Current' ?'bg-primary-50 border-primary' 
                    : level.type === 'Resistance' ?'bg-error-50 border-error-200' :'bg-success-50 border-success-200'
                }`}
              >
                <div>
                  <div className="font-medium text-text-primary">
                    {level.level.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {level.type} • {level.touches > 0 ? `${level.touches} touches` : 'Current Level'}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    level.strength === 'Strong' ? 'text-success' :
                    level.strength === 'Moderate' ? 'text-warning' : 'text-text-secondary'
                  }`}>
                    {level.strength !== 'N/A' ? level.strength : ''}
                  </div>
                  <Icon 
                    name={level.type === 'Resistance' ? 'ArrowUp' : level.type === 'Support' ? 'ArrowDown' : 'Minus'} 
                    size={16} 
                    className={
                      level.type === 'Resistance' ? 'text-error' :
                      level.type === 'Support' ? 'text-success' : 'text-primary'
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Pattern Recognition</h3>
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {technicalData.patternRecognition?.map((pattern, idx) => (
            <div 
              key={idx}
              className="p-4 border rounded-lg hover:bg-surface-hover cursor-pointer transition-colors duration-150 ease-out"
              onClick={() => navigate('/stock-details-analysis')}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-text-primary">{pattern.pattern}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  pattern.status === 'Confirmed' ? 'bg-success-100 text-success-700' :
                  pattern.status === 'Active'? 'bg-warning-100 text-warning-700' : 'bg-primary-100 text-primary-700'
                }`}>
                  {pattern.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Timeframe:</span>
                  <span className="text-text-primary font-medium">{pattern.timeframe}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Reliability:</span>
                  <span className="text-text-primary font-medium">{pattern.reliability}%</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Target:</span>
                  <span className="text-success font-medium">
                    {pattern.target.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <div className="w-full bg-secondary-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${pattern.reliability}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalAnalysis;