import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SavedScreens = () => {
  const [savedScreens, setSavedScreens] = useState([
    {
      id: 1,
      name: 'High Dividend Banking',
      description: 'Banking stocks with dividend yield > 3%',
      filters: {
        sector: ['Banking'],
        dividend: { min: 3, max: 15 }
      },
      resultCount: 12,
      createdAt: new Date('2024-01-15'),
      isActive: false
    },
    {
      id: 2,
      name: 'IT Growth Stocks',
      description: 'IT companies with strong growth metrics',
      filters: {
        sector: ['IT'],
        returns1Y: { min: 15, max: 500 }
      },
      resultCount: 8,
      createdAt: new Date('2024-01-10'),
      isActive: false
    },
    {
      id: 3,
      name: 'Undervalued Large Caps',
      description: 'Large cap stocks with low P/E ratios',
      filters: {
        marketCap: { min: 200000, max: 1000000 },
        peRatio: { min: 0, max: 20 }
      },
      resultCount: 15,
      createdAt: new Date('2024-01-08'),
      isActive: true
    }
  ]);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newScreenName, setNewScreenName] = useState('');
  const [newScreenDescription, setNewScreenDescription] = useState('');

  const handleSaveScreen = () => {
    if (newScreenName.trim()) {
      const newScreen = {
        id: Date.now(),
        name: newScreenName.trim(),
        description: newScreenDescription.trim() || 'Custom screening criteria',
        filters: {}, // Would be populated with current filters
        resultCount: 0,
        createdAt: new Date(),
        isActive: false
      };

      setSavedScreens(prev => [newScreen, ...prev]);
      setNewScreenName('');
      setNewScreenDescription('');
      setShowSaveDialog(false);
    }
  };

  const handleLoadScreen = (screen) => {
    setSavedScreens(prev =>
      prev.map(s => ({
        ...s,
        isActive: s.id === screen.id
      }))
    );
    console.log('Loading screen:', screen.name);
  };

  const handleDeleteScreen = (screenId) => {
    setSavedScreens(prev => prev.filter(s => s.id !== screenId));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Saved Screens</h3>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="p-2 text-primary hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-150 ease-out"
          title="Save Current Screen"
        >
          <Icon name="Bookmark" size={18} />
        </button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <h4 className="font-medium text-primary-700 mb-3">Save Current Screen</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Screen Name
              </label>
              <input
                type="text"
                value={newScreenName}
                onChange={(e) => setNewScreenName(e.target.value)}
                placeholder="Enter screen name..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Description (Optional)
              </label>
              <textarea
                value={newScreenDescription}
                onChange={(e) => setNewScreenDescription(e.target.value)}
                placeholder="Brief description of screening criteria..."
                rows={2}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm resize-none"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveScreen}
                className="btn-primary px-4 py-2 rounded-lg text-sm font-medium"
              >
                Save Screen
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Screens List */}
      <div className="space-y-3">
        {savedScreens.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="Bookmark" size={32} className="text-secondary-300 mx-auto mb-2" />
            <p className="text-sm text-text-secondary">No saved screens yet</p>
            <p className="text-xs text-text-secondary">Save your current filters for quick access</p>
          </div>
        ) : (
          savedScreens.map((screen) => (
            <div
              key={screen.id}
              className={`p-3 border rounded-lg transition-all duration-150 ease-out ${
                screen.isActive
                  ? 'border-primary-200 bg-primary-50' :'border-border hover:border-secondary-300 hover:bg-surface-hover'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium truncate ${
                    screen.isActive ? 'text-primary-700' : 'text-text-primary'
                  }`}>
                    {screen.name}
                  </h4>
                  <p className={`text-xs truncate ${
                    screen.isActive ? 'text-primary-600' : 'text-text-secondary'
                  }`}>
                    {screen.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-1 ml-2">
                  <button
                    onClick={() => handleLoadScreen(screen)}
                    className={`p-1 rounded transition-colors duration-150 ease-out ${
                      screen.isActive
                        ? 'text-primary-600' :'text-secondary-500 hover:text-primary'
                    }`}
                    title="Load Screen"
                  >
                    <Icon name="Play" size={14} />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteScreen(screen.id)}
                    className="p-1 text-secondary-500 hover:text-error rounded transition-colors duration-150 ease-out"
                    title="Delete Screen"
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className={screen.isActive ? 'text-primary-600' : 'text-text-secondary'}>
                  {screen.resultCount} results
                </span>
                <span className={screen.isActive ? 'text-primary-600' : 'text-text-secondary'}>
                  {formatDate(screen.createdAt)}
                </span>
              </div>
              
              {screen.isActive && (
                <div className="mt-2 flex items-center space-x-1">
                  <Icon name="CheckCircle" size={12} className="text-primary-600" />
                  <span className="text-xs text-primary-600 font-medium">Active</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {savedScreens.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span>{savedScreens.length} saved screens</span>
            <button
              onClick={() => setSavedScreens([])}
              className="text-error hover:text-error-700 font-medium transition-colors duration-150 ease-out"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedScreens;