import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from 'components/AppIcon';

const StockChart = ({ stockData, showAdvanced = false }) => {
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('line');
  const [chartData, setChartData] = useState([]);

  const timeframes = [
    { id: '1D', label: '1D' },
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '3M', label: '3M' },
    { id: '1Y', label: '1Y' },
    { id: '5Y', label: '5Y' }
  ];

  const chartTypes = [
    { id: 'line', label: 'Line', icon: 'TrendingUp' },
    { id: 'candlestick', label: 'Candlestick', icon: 'BarChart3' },
    { id: 'area', label: 'Area', icon: 'Activity' }
  ];

  // Mock chart data generation
  useEffect(() => {
    const generateMockData = () => {
      const basePrice = stockData?.currentPrice || 2485.75;
      const dataPoints = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 365;
      const data = [];

      for (let i = 0; i < dataPoints; i++) {
        const variation = (Math.random() - 0.5) * 100;
        const price = basePrice + variation;
        const volume = Math.floor(Math.random() * 1000000) + 500000;
        
        data.push({
          time: new Date(Date.now() - (dataPoints - i) * (timeframe === '1D' ? 3600000 : 86400000)).toISOString(),
          price: price,
          high: price + Math.random() * 20,
          low: price - Math.random() * 20,
          open: price + (Math.random() - 0.5) * 10,
          close: price,
          volume: volume
        });
      }
      
      return data;
    };

    setChartData(generateMockData());
  }, [timeframe, stockData]);

  const formatTooltipValue = (value, name) => {
    if (name === 'price') {
      return [`₹${value.toFixed(2)}`, 'Price'];
    }
    return [value, name];
  };

  const formatXAxisLabel = (tickItem) => {
    const date = new Date(tickItem);
    if (timeframe === '1D') {
      return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="card p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-text-primary">Price Chart</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Chart Type Selector - Advanced Mode */}
          {showAdvanced && (
            <div className="flex bg-secondary-100 rounded-lg p-1">
              {chartTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setChartType(type.id)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-all duration-150 ease-out ${
                    chartType === type.id
                      ? 'bg-white text-text-primary shadow-sm'
                      : 'text-secondary-600 hover:text-text-primary'
                  }`}
                >
                  <Icon name={type.icon} size={14} />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          )}
          
          {/* Timeframe Selector */}
          <div className="flex bg-secondary-100 rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf.id}
                onClick={() => setTimeframe(tf.id)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-150 ease-out ${
                  timeframe === tf.id
                    ? 'bg-white text-text-primary shadow-sm'
                    : 'text-secondary-600 hover:text-text-primary'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              tickFormatter={formatXAxisLabel}
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              domain={['dataMin - 10', 'dataMax + 10']}
              tickFormatter={(value) => `₹${value.toFixed(0)}`}
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(label) => new Date(label).toLocaleString('en-IN')}
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-medium)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={stockData?.change >= 0 ? 'var(--color-success)' : 'var(--color-error)'}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'var(--color-primary)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Controls - Advanced Mode */}
      {showAdvanced && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center space-x-2 px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-150 ease-out">
              <Icon name="ZoomIn" size={16} />
              <span className="text-sm">Zoom</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-150 ease-out">
              <Icon name="Move" size={16} />
              <span className="text-sm">Pan</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-150 ease-out">
              <Icon name="Minus" size={16} />
              <span className="text-sm">Trendline</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors duration-150 ease-out">
              <Icon name="Download" size={16} />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockChart;