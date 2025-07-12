import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const MainSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-home',
      icon: 'LayoutDashboard',
      badge: null,
      tooltip: 'Market overview and personalized insights'
    },
    {
      label: 'Portfolio',
      path: '/portfolio-tracker',
      icon: 'PieChart',
      badge: null,
      tooltip: 'Track your investments and performance'
    },
    {
      label: 'Analytics',
      path: '/market-analytics-hub',
      icon: 'TrendingUp',
      badge: null,
      tooltip: 'Comprehensive market insights and trends'
    },
    {
      label: 'Screener',
      path: '/stock-screener',
      icon: 'Search',
      badge: null,
      tooltip: 'Discover and filter investment opportunities'
    },
    {
      label: 'Stock Details',
      path: '/stock-details-analysis',
      icon: 'BarChart3',
      badge: null,
      tooltip: 'Detailed stock analysis and insights'
    },
    {
      label: 'API Manager',
      path: '/api-integration-manager',
      icon: 'Database',
      badge: null,
      tooltip: 'Manage external data connections'
    },
    {
      label: 'API Monitor',
      path: '/api-monitoring-dashboard',
      icon: 'Activity',
      badge: null,
      tooltip: 'Monitor API health and performance'
    },
    {
      label: 'Profile',
      path: '/profile-settings',
      icon: 'Settings',
      badge: null,
      tooltip: 'Account settings and preferences'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-3 px-6 py-4">
      <div className="flex-shrink-0">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <rect width="32" height="32" rx="8" fill="currentColor" />
          <path
            d="M8 20L12 16L16 20L24 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="12" r="2" fill="white" />
        </svg>
      </div>
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-text-primary">StockSight</span>
          <span className="text-xs text-text-secondary">AI</span>
        </div>
      )}
    </div>
  );

  const NavigationItem = ({ item }) => {
    const isActive = isActiveRoute(item.path);
    
    return (
      <div className="relative group">
        <button
          onClick={() => handleNavigation(item.path)}
          className={`nav-item w-full ${
            isActive ? 'nav-item-active' : 'nav-item-inactive'
          } ${isCollapsed ? 'justify-center px-3' : 'justify-start px-6'}`}
        >
          <Icon
            name={item.icon}
            size={20}
            className={`flex-shrink-0 ${
              isActive ? 'text-primary-700' : 'text-secondary-600 group-hover:text-secondary-900'
            }`}
          />
          {!isCollapsed && (
            <>
              <span className="ml-3 truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </button>
        
        {isCollapsed && (
          <div className="tooltip left-full top-1/2 transform -translate-y-1/2 ml-2 group-hover:tooltip-visible">
            {item.tooltip}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-200 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-300 p-2 bg-surface rounded-lg shadow-medium md:hidden"
      >
        <Icon name="Menu" size={20} className="text-text-primary" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          flex-shrink-0 h-full bg-surface border-r border-border transition-all duration-300 ease-out
          ${isCollapsed ? 'w-16' : 'w-240'}
          ${isMobileOpen ? 'fixed top-0 left-0 z-100 translate-x-0' : 'hidden md:flex md:flex-col -translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex-shrink-0 border-b border-border">
            <Logo />
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavigationItem key={item.path} item={item} />
            ))}
          </nav>

          {/* Collapse Toggle - Desktop Only */}
          <div className="hidden md:block flex-shrink-0 border-t border-border p-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center p-2 text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 rounded-md transition-colors duration-150 ease-out"
            >
              <Icon
                name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
                size={20}
              />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-100 bg-surface border-t border-border md:hidden">
        <div className="flex items-center justify-around py-2">
          {navigationItems.slice(0, 4).map((item) => {
            const isActive = isActiveRoute(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-150 ease-out ${
                  isActive
                    ? 'text-primary-700 bg-primary-50' :'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MainSidebar;