import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'price_alert',
      title: 'Price Alert Triggered',
      message: 'RELIANCE has reached your target price of ₹2,500',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
      actionPath: '/stock-details-analysis?symbol=RELIANCE',
      icon: 'TrendingUp',
      color: 'success'
    },
    {
      id: 2,
      type: 'ai_insight',
      title: 'AI Market Insight',
      message: 'Banking sector showing strong momentum. Consider reviewing your portfolio allocation.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      actionPath: '/market-analytics-hub',
      icon: 'Brain',
      color: 'primary'
    },
    {
      id: 3,
      type: 'portfolio_update',
      title: 'Portfolio Performance',
      message: 'Your portfolio gained 2.3% today. Top performer: TCS (+4.2%)',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      actionPath: '/portfolio-tracker',
      icon: 'PieChart',
      color: 'success'
    },
    {
      id: 4,
      type: 'market_alert',
      title: 'Market Alert',
      message: 'NIFTY 50 approaching resistance level at 19,800',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      actionPath: '/market-analytics-hub',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'New features added to Stock Screener. Check them out!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      actionPath: '/stock-screener',
      icon: 'Settings',
      color: 'secondary'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getIconColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary bg-primary-50',
      success: 'text-success bg-success-50',
      warning: 'text-warning bg-warning-50',
      error: 'text-error bg-error-50',
      secondary: 'text-secondary bg-secondary-100'
    };
    return colorMap[color] || colorMap.primary;
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    if (notification.actionPath) {
      navigate(notification.actionPath);
    }
    
    setIsOpen(false);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-all duration-150 ease-out transform hover:scale-102"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-error rounded-full min-w-5 h-5">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-surface rounded-xl shadow-large border border-border z-400 opacity-0 animate-fade-in animate-opacity-100">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary hover:text-primary-700 font-medium transition-colors duration-150 ease-out"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={clearAllNotifications}
                className="p-1 text-secondary-500 hover:text-secondary-700 transition-colors duration-150 ease-out"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icon name="Bell" size={48} className="text-secondary-300 mb-3" />
                <p className="text-secondary-600 font-medium">No notifications</p>
                <p className="text-secondary-500 text-sm">You're all caught up!</p>
              </div>
            ) : (
              <div className="py-2">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full px-4 py-3 text-left hover:bg-surface-hover transition-colors duration-150 ease-out ${
                      !notification.isRead ? 'bg-primary-50 border-l-2 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 p-2 rounded-lg ${getIconColorClasses(notification.color)}`}>
                        <Icon name={notification.icon} size={16} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm font-medium truncate ${
                            !notification.isRead ? 'text-text-primary' : 'text-secondary-700'
                          }`}>
                            {notification.title}
                          </p>
                          {!notification.isRead && (
                            <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full ml-2" />
                          )}
                        </div>
                        
                        <p className="text-sm text-secondary-600 line-clamp-2 mb-1">
                          {notification.message}
                        </p>
                        
                        <p className="text-xs text-secondary-500">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-border px-4 py-3">
              <button
                onClick={() => {
                  navigate('/profile-settings');
                  setIsOpen(false);
                }}
                className="w-full text-center text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-150 ease-out"
              >
                Notification Settings
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mobile Full Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-surface z-400 md:hidden transform translate-x-0 transition-transform duration-300 ease-out">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-secondary-600 hover:text-text-primary transition-colors duration-150 ease-out"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`w-full px-4 py-4 text-left border-b border-border last:border-b-0 ${
                  !notification.isRead ? 'bg-primary-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${getIconColorClasses(notification.color)}`}>
                    <Icon name={notification.icon} size={18} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className={`font-medium ${
                        !notification.isRead ? 'text-text-primary' : 'text-secondary-700'
                      }`}>
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full ml-2" />
                      )}
                    </div>
                    
                    <p className="text-secondary-600 mb-2">
                      {notification.message}
                    </p>
                    
                    <p className="text-sm text-secondary-500">
                      {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animate-opacity-100 {
          animation: opacityFade 200ms ease-out forwards;
        }
        
        @keyframes opacityFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @media (max-width: 768px) {
          .w-96 {
            width: 100vw;
            height: 100vh;
            position: fixed;
            top: 0;
            right: 0;
            border-radius: 0;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationCenter;