import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const getContextualActions = () => {
    const currentPath = location.pathname;
    
    switch (currentPath) {
      case '/dashboard-home':
        return [
          {
            label: 'Add to Watchlist',
            icon: 'Plus',
            action: () => navigate('/stock-screener'),
            color: 'primary'
          },
          {
            label: 'Quick Analysis',
            icon: 'BarChart3',
            action: () => navigate('/stock-details-analysis'),
            color: 'accent'
          },
          {
            label: 'Set Alert',
            icon: 'Bell',
            action: () => handleSetAlert(),
            color: 'warning'
          }
        ];
      
      case '/portfolio-tracker':
        return [
          {
            label: 'Add Stock',
            icon: 'Plus',
            action: () => navigate('/stock-screener'),
            color: 'success'
          },
          {
            label: 'Rebalance',
            icon: 'RefreshCw',
            action: () => handleRebalance(),
            color: 'primary'
          },
          {
            label: 'Export Data',
            icon: 'Download',
            action: () => handleExportData(),
            color: 'secondary'
          }
        ];
      
      case '/stock-screener':
        return [
          {
            label: 'Save Filter',
            icon: 'Bookmark',
            action: () => handleSaveFilter(),
            color: 'primary'
          },
          {
            label: 'Compare',
            icon: 'GitCompare',
            action: () => handleCompareStocks(),
            color: 'accent'
          }
        ];
      
      case '/market-analytics-hub':
        return [
          {
            label: 'Create Alert',
            icon: 'Bell',
            action: () => handleSetAlert(),
            color: 'warning'
          },
          {
            label: 'Export Chart',
            icon: 'Download',
            action: () => handleExportChart(),
            color: 'secondary'
          }
        ];
      
      case '/stock-details-analysis':
        return [
          {
            label: 'Add to Portfolio',
            icon: 'Plus',
            action: () => handleAddToPortfolio(),
            color: 'success'
          },
          {
            label: 'Set Price Alert',
            icon: 'Bell',
            action: () => handleSetAlert(),
            color: 'warning'
          },
          {
            label: 'Share Analysis',
            icon: 'Share2',
            action: () => handleShareAnalysis(),
            color: 'accent'
          }
        ];
      
      default:
        return [
          {
            label: 'Go to Dashboard',
            icon: 'LayoutDashboard',
            action: () => navigate('/dashboard-home'),
            color: 'primary'
          }
        ];
    }
  };

  const handleSetAlert = () => {
    console.log('Setting price alert...');
    setIsOpen(false);
  };

  const handleRebalance = () => {
    console.log('Rebalancing portfolio...');
    setIsOpen(false);
  };

  const handleExportData = () => {
    console.log('Exporting portfolio data...');
    setIsOpen(false);
  };

  const handleSaveFilter = () => {
    console.log('Saving current filter...');
    setIsOpen(false);
  };

  const handleCompareStocks = () => {
    console.log('Opening stock comparison...');
    setIsOpen(false);
  };

  const handleExportChart = () => {
    console.log('Exporting chart data...');
    setIsOpen(false);
  };

  const handleAddToPortfolio = () => {
    console.log('Adding stock to portfolio...');
    setIsOpen(false);
  };

  const handleShareAnalysis = () => {
    console.log('Sharing analysis...');
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const actions = getContextualActions();

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary hover:bg-primary-700 text-white',
      accent: 'bg-accent hover:bg-accent-700 text-white',
      success: 'bg-success hover:bg-success-700 text-white',
      warning: 'bg-warning hover:bg-warning-700 text-white',
      error: 'bg-error hover:bg-error-700 text-white',
      secondary: 'bg-secondary hover:bg-secondary-700 text-white'
    };
    return colorMap[color] || colorMap.primary;
  };

  if (actions.length === 0) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-300 transition-all duration-300 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 space-y-2 animate-fade-in">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-medium transition-all duration-150 ease-out micro-interaction ${getColorClasses(
                action.color
              )}`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <Icon name={action.icon} size={18} />
              <span className="text-sm font-medium whitespace-nowrap">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary-700 text-white rounded-full shadow-large transition-all duration-200 ease-out ${
          isOpen ? 'rotate-45' : 'hover:scale-110'
        } micro-interaction`}
      >
        <Icon name={isOpen ? 'X' : 'Plus'} size={24} />
      </button>

      {/* Mobile Adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .bottom-6 {
            bottom: 5rem;
          }
          
          .right-6 {
            right: 1rem;
          }
          
          .w-14 {
            width: 3rem;
          }
          
          .h-14 {
            height: 3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default QuickActionMenu;