import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const ChatMessage = ({ message, isUser, timestamp, model, suggestions = [] }) => {
  const navigate = useNavigate();

  const handleNavigationClick = (path) => {
    navigate(path);
  };

  const handleSuggestionClick = (suggestion) => {
    // This would be handled by the parent component
    if (suggestion.action) {
      suggestion.action();
    }
  };

  const renderNavigationSuggestions = (content) => {
    const navigationPatterns = [
      { pattern: /portfolio/i, path: '/portfolio-tracker', label: 'View Portfolio' },
      { pattern: /news/i, path: '/market-analytics-hub', label: 'Market News' },
      { pattern: /analysis/i, path: '/stock-details-analysis', label: 'Stock Analysis' },
      { pattern: /screener/i, path: '/stock-screener', label: 'Stock Screener' },
      { pattern: /analytics/i, path: '/market-analytics-hub', label: 'Market Analytics' }
    ];

    const suggestedPaths = navigationPatterns.filter(nav => 
      nav.pattern.test(content)
    );

    if (suggestedPaths.length === 0) return null;

    return (
      <div className="mt-3 pt-3 border-t border-border-light">
        <div className="flex items-center space-x-1 mb-2">
          <Icon name="Navigation" size={14} className="text-primary" />
          <span className="text-xs text-text-secondary">Quick Navigation</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedPaths.map((nav, index) => (
            <button
              key={index}
              onClick={() => handleNavigationClick(nav.path)}
              className="inline-flex items-center px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 transition-colors duration-150"
            >
              <Icon name="ExternalLink" size={12} className="mr-1" />
              {nav.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderStockAnalysisButton = (content) => {
    const stockPattern = /\b([A-Z]{2,10})\b/g;
    const matches = content.match(stockPattern);
    
    if (!matches) return null;

    const stockSymbols = [...new Set(matches)].slice(0, 3); // Limit to 3 unique symbols

    return (
      <div className="mt-3 pt-3 border-t border-border-light">
        <div className="flex items-center space-x-1 mb-2">
          <Icon name="TrendingUp" size={14} className="text-success" />
          <span className="text-xs text-text-secondary">Stock Analysis</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stockSymbols.map((symbol, index) => (
            <button
              key={index}
              onClick={() => handleNavigationClick(`/stock-details-analysis?symbol=${symbol}`)}
              className="inline-flex items-center px-2 py-1 text-xs bg-success-50 text-success-700 rounded-md hover:bg-success-100 transition-colors duration-150"
            >
              <Icon name="BarChart3" size={12} className="mr-1" />
              Analyze {symbol}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderContent = (content) => {
    // Simple formatting for better readability
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');

    return (
      <div 
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    );
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${isUser 
              ? 'bg-primary text-white' :'bg-gradient-to-br from-primary to-accent text-white'
            }
          `}>
            {isUser ? (
              <Icon name="User" size={16} />
            ) : (
              <Icon name="Bot" size={16} />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className={`
          px-4 py-3 rounded-xl shadow-light
          ${isUser 
            ? 'bg-primary text-white' :'bg-surface border border-border'
          }
        `}>
          <div className={`text-sm ${isUser ? 'text-white' : 'text-text-primary'}`}>
            {renderContent(message)}
          </div>

          {/* Timestamp and Model */}
          <div className={`
            flex items-center justify-between mt-2 pt-2 border-t 
            ${isUser ? 'border-primary-400' : 'border-border-light'}
          `}>
            <span className={`
              text-xs 
              ${isUser ? 'text-primary-200' : 'text-text-secondary'}
            `}>
              {formatTimestamp(timestamp)}
            </span>
            {!isUser && model && (
              <span className="text-xs text-text-muted">
                {model}
              </span>
            )}
          </div>

          {/* Navigation Suggestions (only for bot messages) */}
          {!isUser && renderNavigationSuggestions(message)}
          
          {/* Stock Analysis Buttons (only for bot messages) */}
          {!isUser && renderStockAnalysisButton(message)}

          {/* Custom Suggestions */}
          {!isUser && suggestions?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border-light">
              <div className="flex items-center space-x-1 mb-2">
                <Icon name="Lightbulb" size={14} className="text-warning" />
                <span className="text-xs text-text-secondary">Suggestions</span>
              </div>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="block w-full text-left px-2 py-1 text-xs bg-warning-50 text-warning-700 rounded-md hover:bg-warning-100 transition-colors duration-150"
                  >
                    {suggestion.text || suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;