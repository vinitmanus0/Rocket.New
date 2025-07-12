import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const NewsTicker = ({ newsData }) => {
  const [currentNews, setCurrentNews] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || !newsData || newsData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, newsData]);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success bg-success-50 border-success-200';
      case 'negative':
        return 'text-error bg-error-50 border-error-200';
      case 'neutral':
        return 'text-secondary bg-secondary-100 border-secondary-200';
      default:
        return 'text-secondary bg-secondary-100 border-secondary-200';
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
        return 'Info';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  if (!newsData || newsData.length === 0) {
    return (
      <div className="card p-4 bg-gradient-to-r from-secondary-50 to-background">
        <div className="flex items-center justify-center space-x-2 text-text-secondary">
          <Icon name="Newspaper" size={20} />
          <span>No market news available</span>
        </div>
      </div>
    );
  }

  const currentNewsItem = newsData[currentNews];

  return (
    <div className="card p-4 bg-gradient-to-r from-primary-50 via-surface to-accent-50 border-primary-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-surface rounded-lg shadow-sm">
            <Icon name="Newspaper" size={18} className="text-primary" />
          </div>
          <h3 className="font-semibold text-text-primary">Market News</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 text-secondary-600 hover:text-text-primary hover:bg-surface rounded-lg transition-all duration-150 ease-out"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
          </button>
          
          <div className="flex space-x-1">
            {newsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentNews(index)}
                className={`w-2 h-2 rounded-full transition-all duration-150 ease-out ${
                  index === currentNews ? 'bg-primary' : 'bg-secondary-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getSentimentColor(currentNewsItem.sentiment)}`}>
          <Icon name={getSentimentIcon(currentNewsItem.sentiment)} size={12} />
          <span className="capitalize">{currentNewsItem.sentiment}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-text-primary font-medium truncate">
            {currentNewsItem.headline}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Clock" size={14} />
          <span>{formatTimestamp(currentNewsItem.timestamp)}</span>
        </div>
      </div>

      {/* Mobile Responsive - Stack on small screens */}
      <div className="md:hidden mt-3 pt-3 border-t border-border-light">
        <p className="text-sm text-text-primary mb-2">{currentNewsItem.headline}</p>
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium border ${getSentimentColor(currentNewsItem.sentiment)}`}>
            <Icon name={getSentimentIcon(currentNewsItem.sentiment)} size={10} />
            <span className="capitalize">{currentNewsItem.sentiment}</span>
          </div>
          <span className="text-xs text-text-secondary">
            {formatTimestamp(currentNewsItem.timestamp)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="mt-3">
          <div className="w-full bg-secondary-200 rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-100 ease-linear"
              style={{ 
                animation: 'progress 5s linear infinite',
                animationPlayState: isPlaying ? 'running' : 'paused'
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;