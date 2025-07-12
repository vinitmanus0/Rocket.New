import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-50 rounded-full mb-6">
            <Icon name="AlertTriangle" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/dashboard-home')}
            className="w-full btn-primary px-6 py-3 rounded-lg font-medium transition-all duration-150 ease-out"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full btn-secondary px-6 py-3 rounded-lg font-medium transition-all duration-150 ease-out"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;