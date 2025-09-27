import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PatientFilters = ({ onFilterChange, totalCount, filteredCount }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dietaryPreference: '',
    healthCondition: '',
    consultationStatus: '',
    dateRange: ''
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'followup', label: 'Follow-up Required' }
  ];

  const dietaryPreferenceOptions = [
    { value: '', label: 'All Preferences' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'non-vegetarian', label: 'Non-Vegetarian' },
    { value: 'jain', label: 'Jain' },
    { value: 'gluten-free', label: 'Gluten-Free' }
  ];

  const healthConditionOptions = [
    { value: '', label: 'All Conditions' },
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'Hypertension' },
    { value: 'obesity', label: 'Obesity' },
    { value: 'digestive-issues', label: 'Digestive Issues' },
    { value: 'thyroid', label: 'Thyroid Disorders' },
    { value: 'heart-disease', label: 'Heart Disease' }
  ];

  const consultationStatusOptions = [
    { value: '', label: 'All Consultations' },
    { value: 'recent', label: 'Recent (Last 30 days)' },
    { value: 'overdue', label: 'Overdue (90+ days)' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      status: '',
      dietaryPreference: '',
      healthCondition: '',
      consultationStatus: '',
      dateRange: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      {/* Search and Quick Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search patients by name, ID, phone, or email..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="font-body text-sm text-muted-foreground">
              Showing {filteredCount} of {totalCount} patients
            </span>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                iconName="X"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground"
              >
                Clear filters
              </Button>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Advanced Filters
          </Button>
        </div>
      </div>
      {/* Quick Status Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {statusOptions?.slice(1)?.map((status) => (
          <Button
            key={status?.value}
            variant={filters?.status === status?.value ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange('status', 
              filters?.status === status?.value ? '' : status?.value
            )}
            className="text-xs"
          >
            {status?.label}
          </Button>
        ))}
      </div>
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Dietary Preference"
              options={dietaryPreferenceOptions}
              value={filters?.dietaryPreference}
              onChange={(value) => handleFilterChange('dietaryPreference', value)}
              className="w-full"
            />
            
            <Select
              label="Health Condition"
              options={healthConditionOptions}
              value={filters?.healthCondition}
              onChange={(value) => handleFilterChange('healthCondition', value)}
              className="w-full"
            />
            
            <Select
              label="Consultation Status"
              options={consultationStatusOptions}
              value={filters?.consultationStatus}
              onChange={(value) => handleFilterChange('consultationStatus', value)}
              className="w-full"
            />
            
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              className="w-full"
            />
          </div>
          
          {/* Filter Summary */}
          {hasActiveFilters && (
            <div className="mt-4 p-3 bg-muted/50 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters)?.map(([key, value]) => {
                    if (!value) return null;
                    
                    let label = value;
                    if (key === 'status') {
                      label = statusOptions?.find(opt => opt?.value === value)?.label || value;
                    } else if (key === 'dietaryPreference') {
                      label = dietaryPreferenceOptions?.find(opt => opt?.value === value)?.label || value;
                    } else if (key === 'healthCondition') {
                      label = healthConditionOptions?.find(opt => opt?.value === value)?.label || value;
                    } else if (key === 'consultationStatus') {
                      label = consultationStatusOptions?.find(opt => opt?.value === value)?.label || value;
                    } else if (key === 'dateRange') {
                      label = dateRangeOptions?.find(opt => opt?.value === value)?.label || value;
                    }
                    
                    return (
                      <span
                        key={key}
                        className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                      >
                        {key === 'search' ? `"${label}"` : label}
                        <button
                          onClick={() => handleFilterChange(key, '')}
                          className="ml-1 hover:text-primary/70"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    );
                  })}
                </div>
                
                <span className="font-caption text-xs text-muted-foreground">
                  {filteredCount} result{filteredCount !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientFilters;