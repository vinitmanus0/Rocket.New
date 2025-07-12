import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from 'components/AppIcon';

const PerformanceChart = ({ data, timeframe }) => {
  const [selectedMetric, setSelectedMetric] = React.useState('responseTime');

  const getChartData = () => {
    switch (selectedMetric) {
      case 'responseTime':
        return data?.responseTime || [];
      case 'errorRate':
        return data?.errorRate || [];
      case 'throughput':
        return data?.throughput || [];
      default:
        return [];
    }
  };

  const getMetricConfig = () => {
    switch (selectedMetric) {
      case 'responseTime':
        return {
          title: 'Response Time',
          unit: 'ms',
          color: '#3B82F6',
          description: 'Average API response time over time'
        };
      case 'errorRate':
        return {
          title: 'Error Rate',
          unit: '%',
          color: '#EF4444',
          description: 'Percentage of failed requests over time'
        };
      case 'throughput':
        return {
          title: 'Throughput',
          unit: 'req/min',
          color: '#10B981',
          description: 'Number of requests processed per minute'
        };
      default:
        return {
          title: 'Metric',
          unit: '',
          color: '#6B7280',
          description: ''
        };
    }
  };

  const chartData = getChartData();
  const config = getMetricConfig();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-text-secondary">{`Time: ${label}`}</p>
          <p className="text-sm font-medium text-text-primary">
            {`${config.title}: ${payload[0].value}${config.unit}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Performance Analytics</h3>
          <p className="text-sm text-text-secondary">{config.description}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-text-secondary">Metric:</label>
            <select 
              value={selectedMetric} 
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="input-field py-1 px-2 text-sm"
            >
              <option value="responseTime">Response Time</option>
              <option value="errorRate">Error Rate</option>
              <option value="throughput">Throughput</option>
            </select>
          </div>
          
          <button className="btn btn-outline btn-sm">
            <Icon name="Download" size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {selectedMetric === 'errorRate' ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={config.color} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={config.color} 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorError)" 
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={config.color} 
                  strokeWidth={2}
                  dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: config.color }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {Math.round(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length)}
              <span className="text-sm text-text-secondary ml-1">{config.unit}</span>
            </div>
            <div className="text-sm text-text-secondary">Average</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {Math.min(...chartData.map(item => item.value))}
              <span className="text-sm text-text-secondary ml-1">{config.unit}</span>
            </div>
            <div className="text-sm text-text-secondary">Best</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-danger">
              {Math.max(...chartData.map(item => item.value))}
              <span className="text-sm text-text-secondary ml-1">{config.unit}</span>
            </div>
            <div className="text-sm text-text-secondary">Worst</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">
              {chartData.length}
            </div>
            <div className="text-sm text-text-secondary">Data Points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;