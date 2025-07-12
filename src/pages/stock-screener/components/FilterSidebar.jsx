import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterSidebar = ({ filters, onFiltersChange, resultCount }) => {
  const [expandedSections, setExpandedSections] = useState({
    fundamental: true,
    technical: false,
    performance: false,
    categories: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilter = (filterType, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    onFiltersChange({
      marketCap: { min: 0, max: 1000000 },
      peRatio: { min: 0, max: 100 },
      debtToEquity: { min: 0, max: 5 },
      rsi: { min: 0, max: 100 },
      returns1Y: { min: -100, max: 500 },
      dividend: { min: 0, max: 15 },
      sector: [],
      exchange: []
    });
  };

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L Cr`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K Cr`;
    }
    return `₹${value} Cr`;
  };

  const RangeSlider = ({ label, min, max, value, onChange, step = 1, formatter }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <span className="text-xs text-text-secondary">
          {formatter ? formatter(value.min) : value.min} - {formatter ? formatter(value.max) : value.max}
        </span>
      </div>
      
      <div className="px-2">
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value.min}
            onChange={(e) => onChange({ ...value, min: Number(e.target.value) })}
            className="absolute w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value.max}
            onChange={(e) => onChange({ ...value, max: Number(e.target.value) })}
            className="absolute w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
        </div>
      </div>
    </div>
  );

  const CheckboxGroup = ({ label, options, value, onChange }) => (
    <div className="mb-4">
      <label className="text-sm font-medium text-text-primary mb-2 block">{label}</label>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...value, option]);
                } else {
                  onChange(value.filter(v => v !== option));
                }
              }}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <span className="text-sm text-text-secondary">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="mb-4 bg-surface border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-hover transition-colors duration-150 ease-out"
      >
        <span className="font-medium text-text-primary">{title}</span>
        <Icon
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size={18}
          className="text-secondary-500"
        />
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );

  const sectors = ['Banking', 'IT', 'FMCG', 'Healthcare', 'Energy', 'Telecom', 'Auto', 'Pharma', 'Metals', 'Realty'];
  const exchanges = ['NSE', 'BSE'];

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-primary hover:text-primary-700 font-medium transition-colors duration-150 ease-out"
        >
          Reset All
        </button>
      </div>

      <div className="mb-6 p-3 bg-primary-50 border border-primary-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={16} className="text-primary-600" />
          <span className="text-sm font-medium text-primary-700">
            {resultCount} stocks match your criteria
          </span>
        </div>
      </div>

      {/* Fundamental Analysis */}
      <FilterSection
        title="Fundamental Analysis"
        isExpanded={expandedSections.fundamental}
        onToggle={() => toggleSection('fundamental')}
      >
        <RangeSlider
          label="Market Cap"
          min={0}
          max={1000000}
          step={10000}
          value={filters.marketCap}
          onChange={(value) => updateFilter('marketCap', value)}
          formatter={formatCurrency}
        />
        
        <RangeSlider
          label="P/E Ratio"
          min={0}
          max={100}
          step={0.1}
          value={filters.peRatio}
          onChange={(value) => updateFilter('peRatio', value)}
        />
        
        <RangeSlider
          label="Debt-to-Equity"
          min={0}
          max={5}
          step={0.1}
          value={filters.debtToEquity}
          onChange={(value) => updateFilter('debtToEquity', value)}
        />
        
        <RangeSlider
          label="Dividend Yield (%)"
          min={0}
          max={15}
          step={0.1}
          value={filters.dividend}
          onChange={(value) => updateFilter('dividend', value)}
          formatter={(value) => `${value}%`}
        />
      </FilterSection>

      {/* Technical Analysis */}
      <FilterSection
        title="Technical Analysis"
        isExpanded={expandedSections.technical}
        onToggle={() => toggleSection('technical')}
      >
        <RangeSlider
          label="RSI"
          min={0}
          max={100}
          step={1}
          value={filters.rsi}
          onChange={(value) => updateFilter('rsi', value)}
        />
      </FilterSection>

      {/* Performance Metrics */}
      <FilterSection
        title="Performance Metrics"
        isExpanded={expandedSections.performance}
        onToggle={() => toggleSection('performance')}
      >
        <RangeSlider
          label="1-Year Returns (%)"
          min={-100}
          max={500}
          step={1}
          value={filters.returns1Y}
          onChange={(value) => updateFilter('returns1Y', value)}
          formatter={(value) => `${value}%`}
        />
      </FilterSection>

      {/* Categories */}
      <FilterSection
        title="Categories"
        isExpanded={expandedSections.categories}
        onToggle={() => toggleSection('categories')}
      >
        <CheckboxGroup
          label="Sectors"
          options={sectors}
          value={filters.sector}
          onChange={(value) => updateFilter('sector', value)}
        />
        
        <CheckboxGroup
          label="Exchanges"
          options={exchanges}
          value={filters.exchange}
          onChange={(value) => updateFilter('exchange', value)}
        />
      </FilterSection>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;