import React, { useState, useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';
import perplexityService from 'services/perplexityService';

const ModelSelector = ({ selectedModel, onModelChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const models = perplexityService.getAvailableModels();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleModelSelect = (modelId) => {
    onModelChange(modelId);
    setIsOpen(false);
  };

  const selectedModelData = models.find(model => model.id === selectedModel);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center justify-between w-full px-3 py-2 text-sm 
          bg-surface border border-border rounded-lg transition-all duration-150
          ${disabled 
            ? 'cursor-not-allowed opacity-50' :'hover:border-primary-300 hover:bg-surface-hover cursor-pointer'
          }
          ${isOpen ? 'border-primary-300 bg-surface-hover' : ''}
        `}
      >
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={16} className="text-primary" />
          <span className="text-text-primary font-medium">
            {selectedModelData?.name || 'Select Model'}
          </span>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-large z-300">
          <div className="py-1 max-h-64 overflow-y-auto">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model.id)}
                className={`
                  w-full px-3 py-2 text-left text-sm transition-all duration-150
                  hover:bg-primary-50 hover:text-primary-700
                  ${selectedModel === model.id 
                    ? 'bg-primary-50 text-primary-700' :'text-text-primary'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`
                      w-2 h-2 rounded-full
                      ${selectedModel === model.id ? 'bg-primary' : 'bg-secondary-300'}
                    `} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{model.name}</div>
                    <div className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                      {model.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;