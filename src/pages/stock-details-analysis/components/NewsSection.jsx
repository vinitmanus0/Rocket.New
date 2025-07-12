import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const NewsSection = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All News', icon: 'Newspaper' },
    { id: 'company', label: 'Company', icon: 'Building2' },
    { id: 'sector', label: 'Sector', icon: 'Factory' },
    { id: 'market', label: 'Market', icon: 'TrendingUp' },
    { id: 'earnings', label: 'Earnings', icon: 'Calculator' }
  ];

  // Mock news data
  const mockNews = [
    {
      id: 1,
      title: 'Reliance Industries Reports Strong Q3 Results with 25% Growth in Net Profit',
      summary: 'RIL posted consolidated net profit of ₹18,549 crore for Q3FY24, up 25.1% YoY, driven by strong performance across all business segments including retail and digital services.',
      source: 'Economic Times',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: 'earnings',
      sentiment: 'positive',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop&crop=center',
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'Oil Prices Surge 3% on Supply Concerns, Benefiting Refining Majors',
      summary: 'Crude oil prices jumped following OPEC+ production cuts announcement. Analysts expect positive impact on Indian refiners including Reliance and ONGC.',
      source: 'Business Standard',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      category: 'sector',
      sentiment: 'positive',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center',
      readTime: '2 min read'
    },
    {
      id: 3,
      title: 'Jio Platforms Launches New AI-Powered Services for Enterprise Customers',
      summary: 'Reliance Jio announced suite of AI and cloud services targeting enterprise segment, expected to drive digital services revenue growth in coming quarters.',
      source: 'Mint',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      category: 'company',
      sentiment: 'positive',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&crop=center',
      readTime: '4 min read'
    },
    {
      id: 4,
      title: 'Regulatory Concerns Over Petrochemical Emissions Impact Industry Outlook',
      summary: 'New environmental regulations may require additional capex for compliance. Industry experts analyze potential impact on margins and growth prospects.',
      source: 'Financial Express',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      category: 'sector',
      sentiment: 'negative',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop&crop=center',
      readTime: '5 min read'
    },
    {
      id: 5,
      title: 'Market Volatility Continues as Global Economic Uncertainty Persists',
      summary: 'Indian equity markets remain volatile amid global economic concerns. Large-cap stocks showing resilience compared to mid and small-cap segments.',
      source: 'CNBC TV18',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      category: 'market',
      sentiment: 'neutral',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop&crop=center',
      readTime: '3 min read'
    },
    {
      id: 6,
      title: 'Reliance Retail Expansion Plans Include 500 New Stores This Fiscal',
      summary: 'RIL plans aggressive retail expansion with focus on tier-2 and tier-3 cities. Management expects retail business to contribute significantly to overall growth.',
      source: 'Times of India',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      category: 'company',
      sentiment: 'positive',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&crop=center',
      readTime: '4 min read'
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  }, [symbol]);

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success bg-success-50';
      case 'negative':
        return 'text-error bg-error-50';
      case 'neutral':
        return 'text-secondary bg-secondary-100';
      default:
        return 'text-secondary bg-secondary-100';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      case 'neutral':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-secondary-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="w-20 h-16 bg-secondary-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                  <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* News Categories */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Latest News & Updates</h2>
        
        <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-150 ease-out whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-primary text-white' :'text-secondary-600 hover:text-text-primary hover:bg-secondary-100'
              }`}
            >
              <Icon name={category.icon} size={16} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* News List */}
        <div className="space-y-4">
          {filteredNews.map((article) => (
            <div key={article.id} className="flex space-x-4 p-4 bg-background rounded-lg hover:shadow-medium transition-shadow duration-150 ease-out cursor-pointer">
              <div className="w-24 h-18 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-text-primary line-clamp-2 pr-2">
                    {article.title}
                  </h3>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getSentimentColor(article.sentiment)}`}>
                    <Icon name={getSentimentIcon(article.sentiment)} size={12} className="mr-1" />
                    {article.sentiment}
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{article.source}</span>
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-secondary-100 rounded transition-colors duration-150 ease-out">
                      <Icon name="Bookmark" size={14} />
                    </button>
                    <button className="p-1 hover:bg-secondary-100 rounded transition-colors duration-150 ease-out">
                      <Icon name="Share2" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-6">
          <button className="btn-secondary px-6 py-2 rounded-lg font-medium transition-all duration-150 ease-out">
            Load More News
          </button>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-6">News Sentiment Analysis</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-success-50 rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">65%</div>
            <div className="text-sm text-success font-medium">Positive</div>
          </div>
          <div className="text-center p-4 bg-secondary-100 rounded-lg">
            <div className="text-2xl font-bold text-secondary mb-1">20%</div>
            <div className="text-sm text-secondary font-medium">Neutral</div>
          </div>
          <div className="text-center p-4 bg-error-50 rounded-lg">
            <div className="text-2xl font-bold text-error mb-1">15%</div>
            <div className="text-sm text-error font-medium">Negative</div>
          </div>
        </div>
        
        <div className="bg-background rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Icon name="TrendingUp" size={18} className="text-success mr-2" />
            <span className="font-medium text-text-primary">Overall Sentiment: Positive</span>
          </div>
          <p className="text-sm text-text-secondary">
            Recent news coverage shows predominantly positive sentiment driven by strong earnings results 
            and expansion announcements. Market outlook remains favorable despite some regulatory concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;