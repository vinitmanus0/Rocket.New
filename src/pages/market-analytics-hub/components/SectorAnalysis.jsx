import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const SectorAnalysis = ({ timeframe }) => {
  const [sectorData, setSectorData] = useState([]);
  const [selectedSector, setSelectedSector] = useState('Banking');
  const [rotationData, setRotationData] = useState([]);
  const navigate = useNavigate();

  // Mock sector data
  const mockSectorData = [
    {
      name: 'Banking',
      performance: 1.25,
      marketCap: '₹15,67,890 Cr',
      volume: '₹8,945 Cr',
      stocks: 45,
      topPerformers: [
        { symbol: 'HDFC BANK', change: 2.45, price: 1678.45 },
        { symbol: 'ICICI BANK', change: 1.89, price: 945.67 },
        { symbol: 'SBI', change: 1.67, price: 567.89 }
      ],
      aiInsight: `Banking sector showing strong momentum driven by improved asset quality and rising interest rates. Credit growth remains robust with corporate lending picking up pace.`
    },
    {
      name: 'Information Technology',
      performance: 2.15,
      marketCap: '₹12,34,567 Cr',
      volume: '₹6,789 Cr',
      stocks: 38,
      topPerformers: [
        { symbol: 'TCS', change: 2.89, price: 3456.90 },
        { symbol: 'INFOSYS', change: 2.34, price: 1456.78 },
        { symbol: 'WIPRO', change: 1.98, price: 456.78 }
      ],
      aiInsight: `IT sector benefiting from digital transformation trends and strong deal pipeline. Cloud migration and AI adoption driving revenue growth across major players.`
    },
    {
      name: 'Pharmaceuticals',
      performance: -0.85,
      marketCap: '₹8,90,123 Cr',
      volume: '₹3,456 Cr',
      stocks: 52,
      topPerformers: [
        { symbol: 'SUN PHARMA', change: 0.45, price: 1123.45 },
        { symbol: 'DR REDDY', change: -0.23, price: 4567.89 },
        { symbol: 'CIPLA', change: -0.67, price: 1234.56 }
      ],
      aiInsight: `Pharma sector facing headwinds from pricing pressure in US markets. However, domestic formulations showing steady growth with improving margins.`
    },
    {
      name: 'Automotive',
      performance: 0.95,
      marketCap: '₹6,78,901 Cr',
      volume: '₹4,567 Cr',
      stocks: 29,
      topPerformers: [
        { symbol: 'MARUTI', change: 1.45, price: 9876.54 },
        { symbol: 'TATA MOTORS', change: 0.89, price: 567.89 },
        { symbol: 'M&M', change: 0.67, price: 1456.78 }
      ],
      aiInsight: `Auto sector recovering with festive season demand and rural market improvement. EV transition gaining momentum with government policy support.`
    },
    {
      name: 'FMCG',
      performance: -0.45,
      marketCap: '₹9,87,654 Cr',
      volume: '₹2,345 Cr',
      stocks: 34,
      topPerformers: [
        { symbol: 'HINDUSTAN UNILEVER', change: 0.23, price: 2345.67 },
        { symbol: 'ITC', change: -0.12, price: 456.78 },
        { symbol: 'NESTLE', change: -0.89, price: 23456.78 }
      ],
      aiInsight: `FMCG sector facing margin pressure from input cost inflation. Urban demand showing signs of recovery while rural markets remain subdued.`
    },
    {
      name: 'Energy',
      performance: 1.85,
      marketCap: '₹11,23,456 Cr',
      volume: '₹7,890 Cr',
      stocks: 23,
      topPerformers: [
        { symbol: 'RELIANCE', change: 2.25, price: 2567.80 },
        { symbol: 'ONGC', change: 1.67, price: 234.56 },
        { symbol: 'IOC', change: 1.45, price: 123.45 }
      ],
      aiInsight: `Energy sector benefiting from stable crude prices and strong refining margins. Green energy investments positioning companies for future growth.`
    }
  ];

  const mockRotationData = [
    { period: 'Week 1', banking: 2.1, it: 1.8, pharma: -0.5, auto: 0.8, fmcg: -0.2, energy: 1.5 },
    { period: 'Week 2', banking: 1.9, it: 2.2, pharma: -0.8, auto: 1.2, fmcg: 0.1, energy: 1.8 },
    { period: 'Week 3', banking: 1.5, it: 2.5, pharma: -0.3, auto: 0.9, fmcg: -0.4, energy: 2.1 },
    { period: 'Week 4', banking: 1.2, it: 2.1, pharma: -0.9, auto: 0.7, fmcg: -0.6, energy: 1.9 }
  ];

  const pieChartData = mockSectorData.map(sector => ({
    name: sector.name,
    value: parseFloat(sector.marketCap.replace(/[₹,\sCr]/g, '')),
    performance: sector.performance
  }));

  const COLORS = ['#1E40AF', '#059669', '#EF4444', '#F59E0B', '#8B5CF6', '#06B6D4'];

  useEffect(() => {
    setSectorData(mockSectorData);
    setRotationData(mockRotationData);
  }, [timeframe]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const selectedSectorData = sectorData.find(sector => sector.name === selectedSector);

  return (
    <div className="space-y-6">
      {/* Sector Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectorData.map((sector, idx) => (
          <div 
            key={idx} 
            className={`card p-6 cursor-pointer transition-all duration-150 ease-out ${
              selectedSector === sector.name ? 'ring-2 ring-primary bg-primary-50' : 'card-hover'
            }`}
            onClick={() => setSelectedSector(sector.name)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-primary">{sector.name}</h3>
              <Icon 
                name={sector.performance >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                size={20} 
                className={sector.performance >= 0 ? 'text-success' : 'text-error'} 
              />
            </div>
            
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${
                sector.performance >= 0 ? 'text-success' : 'text-error'
              }`}>
                {sector.performance >= 0 ? '+' : ''}{sector.performance}%
              </div>
              
              <div className="text-sm text-text-secondary">
                Market Cap: {sector.marketCap}
              </div>
              
              <div className="text-sm text-text-secondary">
                Volume: {sector.volume}
              </div>
              
              <div className="text-sm text-text-secondary">
                {sector.stocks} stocks
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Composition */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Market Cap Distribution</h3>
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹${(value / 100000).toFixed(0)}K Cr`, 'Market Cap']}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Rotation Trends */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Sector Rotation Trends</h3>
            <Icon name="RefreshCw" size={20} className="text-primary" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rotationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="period" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="banking" stroke="#1E40AF" strokeWidth={2} name="Banking" />
                <Line type="monotone" dataKey="it" stroke="#059669" strokeWidth={2} name="IT" />
                <Line type="monotone" dataKey="energy" stroke="#F59E0B" strokeWidth={2} name="Energy" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Selected Sector Details */}
      {selectedSectorData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Top Performers - {selectedSector}
              </h3>
              <Icon name="Award" size={20} className="text-primary" />
            </div>
            
            <div className="space-y-4">
              {selectedSectorData.topPerformers.map((stock, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover cursor-pointer transition-colors duration-150 ease-out"
                  onClick={() => navigate('/stock-details-analysis')}
                >
                  <div>
                    <div className="font-medium text-text-primary">{stock.symbol}</div>
                    <div className="text-sm text-text-secondary">{formatCurrency(stock.price)}</div>
                  </div>
                  
                  <div className={`text-right ${
                    stock.change >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    <div className="font-semibold">
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </div>
                    <Icon 
                      name={stock.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                      size={16} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                AI Insights - {selectedSector}
              </h3>
              <Icon name="Brain" size={20} className="text-primary" />
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg border-l-4 border-primary">
                <p className="text-text-primary leading-relaxed">
                  {selectedSectorData.aiInsight}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Confidence Level</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-secondary-200 rounded-full">
                    <div className="w-4/5 h-2 bg-success rounded-full"></div>
                  </div>
                  <span className="text-success font-medium">85%</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/stock-screener')}
                className="w-full btn-primary py-2 rounded-lg font-medium transition-all duration-150 ease-out"
              >
                Explore {selectedSector} Stocks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectorAnalysis;