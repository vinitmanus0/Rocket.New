import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const MarketOverview = ({ timeframe }) => {
  const [marketData, setMarketData] = useState({});
  const [heatmapData, setHeatmapData] = useState([]);
  const [indexData, setIndexData] = useState([]);
  const navigate = useNavigate();

  // Mock market data
  const mockMarketData = {
    indices: [
      {
        name: 'NIFTY 50',
        value: 19847.50,
        change: 234.75,
        changePercent: 1.20,
        volume: '2.45B',
        high: 19892.30,
        low: 19654.20
      },
      {
        name: 'SENSEX',
        value: 66589.93,
        change: 759.49,
        changePercent: 1.15,
        volume: '1.89B',
        high: 66745.86,
        low: 65987.42
      },
      {
        name: 'NIFTY BANK',
        value: 44567.85,
        change: -123.45,
        changePercent: -0.28,
        volume: '892M',
        high: 44789.32,
        low: 44234.67
      },
      {
        name: 'NIFTY IT',
        value: 31245.67,
        change: 456.78,
        changePercent: 1.48,
        volume: '567M',
        high: 31398.45,
        low: 30987.23
      }
    ],
    marketBreadth: {
      advancing: 1847,
      declining: 1234,
      unchanged: 156,
      totalVolume: '₹45,678 Cr',
      totalTurnover: '₹2,34,567 Cr'
    },
    topGainers: [
      { symbol: 'RELIANCE', price: 2567.80, change: 5.67, changePercent: 2.25 },
      { symbol: 'TCS', price: 3456.90, change: 67.45, changePercent: 1.99 },
      { symbol: 'HDFC BANK', price: 1678.45, change: 23.56, changePercent: 1.42 },
      { symbol: 'INFOSYS', price: 1456.78, change: 18.90, changePercent: 1.31 },
      { symbol: 'ITC', price: 456.78, change: 5.67, changePercent: 1.26 }
    ],
    topLosers: [
      { symbol: 'BAJAJ FINANCE', price: 6789.45, change: -89.67, changePercent: -1.30 },
      { symbol: 'MARUTI', price: 9876.54, change: -98.76, changePercent: -0.99 },
      { symbol: 'ASIAN PAINTS', price: 3456.78, change: -32.45, changePercent: -0.93 },
      { symbol: 'NESTLE', price: 23456.78, change: -198.45, changePercent: -0.84 },
      { symbol: 'HDFC LIFE', price: 678.90, change: -5.43, changePercent: -0.79 }
    ]
  };

  const mockHeatmapData = [
    { sector: 'Banking', performance: 1.25, size: 25, color: '#10B981' },
    { sector: 'IT', performance: 2.15, size: 20, color: '#059669' },
    { sector: 'Pharma', performance: -0.85, size: 15, color: '#EF4444' },
    { sector: 'Auto', performance: 0.95, size: 18, color: '#10B981' },
    { sector: 'FMCG', performance: -0.45, size: 12, color: '#F59E0B' },
    { sector: 'Energy', performance: 1.85, size: 22, color: '#10B981' },
    { sector: 'Metals', performance: -1.25, size: 16, color: '#EF4444' },
    { sector: 'Realty', performance: 0.65, size: 10, color: '#10B981' }
  ];

  const mockIndexChartData = [
    { time: '09:15', nifty: 19612, sensex: 65830 },
    { time: '10:00', nifty: 19645, sensex: 65945 },
    { time: '11:00', nifty: 19678, sensex: 66089 },
    { time: '12:00', nifty: 19723, sensex: 66234 },
    { time: '13:00', nifty: 19756, sensex: 66345 },
    { time: '14:00', nifty: 19789, sensex: 66456 },
    { time: '15:00', nifty: 19834, sensex: 66567 },
    { time: '15:30', nifty: 19847, sensex: 66589 }
  ];

  useEffect(() => {
    setMarketData(mockMarketData);
    setHeatmapData(mockHeatmapData);
    setIndexData(mockIndexChartData);
  }, [timeframe]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  return (
    <div className="space-y-6">
      {/* Market Indices Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketData.indices?.map((index, idx) => (
          <div key={idx} className="card p-6 card-hover cursor-pointer" onClick={() => navigate('/stock-details-analysis')}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">{index.name}</h3>
              <Icon 
                name={index.changePercent >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                size={20} 
                className={index.changePercent >= 0 ? 'text-success' : 'text-error'} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-bold text-text-primary">
                {formatNumber(index.value)}
              </div>
              
              <div className={`flex items-center space-x-2 text-sm ${
                index.changePercent >= 0 ? 'text-success' : 'text-error'
              }`}>
                <span>{index.changePercent >= 0 ? '+' : ''}{formatNumber(index.change)}</span>
                <span>({index.changePercent >= 0 ? '+' : ''}{index.changePercent}%)</span>
              </div>
              
              <div className="text-xs text-text-secondary">
                Volume: {index.volume}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Index Movement Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Index Movement</h3>
            <Icon name="LineChart" size={20} className="text-primary" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={indexData}>
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
                <Line 
                  type="monotone" 
                  dataKey="nifty" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name="NIFTY 50"
                />
                <Line 
                  type="monotone" 
                  dataKey="sensex" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  name="SENSEX"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Heatmap */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Sector Performance</h3>
            <Icon name="Grid3x3" size={20} className="text-primary" />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {heatmapData.map((sector, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg text-white text-center cursor-pointer hover:opacity-80 transition-opacity duration-150 ease-out"
                style={{ backgroundColor: sector.color }}
                onClick={() => navigate('/stock-screener')}
              >
                <div className="font-medium text-sm">{sector.sector}</div>
                <div className="text-lg font-bold">
                  {sector.performance >= 0 ? '+' : ''}{sector.performance}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Breadth & Top Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Breadth */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Market Breadth</h3>
            <Icon name="Activity" size={20} className="text-primary" />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Advancing</span>
              <span className="font-semibold text-success">{formatNumber(marketData.marketBreadth?.advancing)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Declining</span>
              <span className="font-semibold text-error">{formatNumber(marketData.marketBreadth?.declining)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Unchanged</span>
              <span className="font-semibold text-text-secondary">{formatNumber(marketData.marketBreadth?.unchanged)}</span>
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-secondary">Total Volume</span>
                <span className="font-semibold text-text-primary">{marketData.marketBreadth?.totalVolume}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Turnover</span>
                <span className="font-semibold text-text-primary">{marketData.marketBreadth?.totalTurnover}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Gainers */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Top Gainers</h3>
            <Icon name="TrendingUp" size={20} className="text-success" />
          </div>
          
          <div className="space-y-3">
            {marketData.topGainers?.map((stock, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover cursor-pointer transition-colors duration-150 ease-out"
                onClick={() => navigate('/stock-details-analysis')}
              >
                <div>
                  <div className="font-medium text-text-primary text-sm">{stock.symbol}</div>
                  <div className="text-xs text-text-secondary">{formatCurrency(stock.price)}</div>
                </div>
                
                <div className="text-right">
                  <div className="text-success font-semibold text-sm">+{stock.changePercent}%</div>
                  <div className="text-success text-xs">+{formatNumber(stock.change)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Top Losers</h3>
            <Icon name="TrendingDown" size={20} className="text-error" />
          </div>
          
          <div className="space-y-3">
            {marketData.topLosers?.map((stock, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover cursor-pointer transition-colors duration-150 ease-out"
                onClick={() => navigate('/stock-details-analysis')}
              >
                <div>
                  <div className="font-medium text-text-primary text-sm">{stock.symbol}</div>
                  <div className="text-xs text-text-secondary">{formatCurrency(stock.price)}</div>
                </div>
                
                <div className="text-right">
                  <div className="text-error font-semibold text-sm">{stock.changePercent}%</div>
                  <div className="text-error text-xs">{formatNumber(stock.change)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;