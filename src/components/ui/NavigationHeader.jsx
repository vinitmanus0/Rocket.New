import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const routeLabels = {
    '/dashboard-home': 'Dashboard',
    '/stock-details-analysis': 'Stock Analysis',
    '/portfolio-tracker': 'Portfolio',
    '/stock-screener': 'Stock Screener',
    '/market-analytics-hub': 'Market Analytics',
    '/profile-settings': 'Profile & Settings'
  };

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard-home' }];
    
    if (pathSegments.length > 0) {
      const currentPath = `/${pathSegments.join('/')}`;
      const currentLabel = routeLabels[currentPath] || pathSegments[pathSegments.length - 1];
      
      if (currentPath !== '/dashboard-home') {
        breadcrumbs.push({ label: currentLabel, path: currentPath });
      }
    }
    
    return breadcrumbs;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/stock-screener?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-100 bg-surface border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Breadcrumbs Section */}
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.path}>
                {index > 0 && (
                  <Icon
                    name="ChevronRight"
                    size={16}
                    className="text-secondary-400 flex-shrink-0"
                  />
                )}
                <button
                  onClick={() => handleBreadcrumbClick(crumb.path)}
                  className={`font-medium transition-colors duration-150 ease-out truncate ${
                    index === breadcrumbs.length - 1
                      ? 'text-text-primary cursor-default' :'text-secondary-600 hover:text-text-primary'
                  }`}
                  disabled={index === breadcrumbs.length - 1}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Search Section */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <form onSubmit={handleSearch} className="relative">
            <div
              className={`flex items-center bg-background border rounded-lg transition-all duration-200 ease-out ${
                isSearchFocused
                  ? 'border-primary-500 ring-2 ring-primary-100' :'border-border hover:border-secondary-300'
              }`}
            >
              <Icon
                name="Search"
                size={18}
                className="ml-3 text-secondary-500 flex-shrink-0"
              />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-64 px-3 py-2 bg-transparent border-none outline-none text-sm placeholder-secondary-500 text-text-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mr-3 p-1 text-secondary-400 hover:text-secondary-600 transition-colors duration-150 ease-out"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate('/portfolio-tracker')}
              className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-all duration-150 ease-out micro-interaction"
              title="View Portfolio"
            >
              <Icon name="PieChart" size={20} />
            </button>
            
            <button
              onClick={() => navigate('/market-analytics-hub')}
              className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-all duration-150 ease-out micro-interaction"
              title="Market Analytics"
            >
              <Icon name="TrendingUp" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .w-64 {
            width: 12rem;
          }
        }
        
        @media (max-width: 640px) {
          .w-64 {
            width: 8rem;
          }
        }
      `}</style>
    </header>
  );
};

export default NavigationHeader;