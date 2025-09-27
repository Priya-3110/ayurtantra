import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const QuickSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('patients');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const patientResults = [
    {
      id: 1,
      name: 'Priya Sharma',
      age: 32,
      lastVisit: '2 days ago',
      condition: 'Weight Management',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Raj Patel',
      age: 45,
      lastVisit: '1 week ago',
      condition: 'Digestive Issues',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Meera Singh',
      age: 28,
      lastVisit: '3 days ago',
      condition: 'Diabetes Management',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const foodResults = [
    {
      id: 1,
      name: 'Basmati Rice',
      category: 'Grains',
      calories: '130 kcal/100g',
      ayurvedicProperty: 'Cooling, Easy to digest',
      rasa: 'Sweet'
    },
    {
      id: 2,
      name: 'Turmeric',
      category: 'Spices',
      calories: '312 kcal/100g',
      ayurvedicProperty: 'Heating, Anti-inflammatory',
      rasa: 'Bitter, Pungent'
    },
    {
      id: 3,
      name: 'Almonds',
      category: 'Nuts',
      calories: '579 kcal/100g',
      ayurvedicProperty: 'Heating, Nourishing',
      rasa: 'Sweet'
    }
  ];

  const filteredResults = searchType === 'patients' 
    ? patientResults?.filter(patient => 
        patient?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        patient?.condition?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )
    : foodResults?.filter(food => 
        food?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        food?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchQuery('');
    console.log('Selected:', result);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-xl text-foreground">
          Quick Search
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSearchType('patients')}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
              ${searchType === 'patients' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }
            `}
          >
            Patients
          </button>
          <button
            onClick={() => setSearchType('foods')}
            className={`
              px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
              ${searchType === 'foods' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }
            `}
          >
            Foods
          </button>
        </div>
      </div>
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder={`Search ${searchType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onFocus={handleSearchFocus}
            className="w-full pl-10 pr-4 py-3 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Search Results Dropdown */}
        {showResults && (searchQuery || true) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-soft-lg z-50 max-h-80 overflow-y-auto animate-fade-in">
            <div className="p-2">
              <p className="font-caption text-xs text-muted-foreground px-2 py-1 mb-2">
                {searchQuery ? `Results for "${searchQuery}"` : `Recent ${searchType}`}
              </p>
              
              {filteredResults?.length > 0 ? (
                filteredResults?.map((result) => (
                  <button
                    key={result?.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full p-3 text-left hover:bg-muted rounded-lg transition-colors duration-200 flex items-center space-x-3"
                  >
                    {searchType === 'patients' ? (
                      <>
                        <img
                          src={result?.avatar}
                          alt={result?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-medium text-sm text-foreground">
                            {result?.name}
                          </p>
                          <p className="font-caption text-xs text-muted-foreground">
                            Age {result?.age} • {result?.condition} • Last visit: {result?.lastVisit}
                          </p>
                        </div>
                        <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Icon name="Apple" size={20} className="text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-medium text-sm text-foreground">
                            {result?.name}
                          </p>
                          <p className="font-caption text-xs text-muted-foreground">
                            {result?.category} • {result?.calories} • {result?.rasa}
                          </p>
                        </div>
                        <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                      </>
                    )}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center">
                  <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="font-body text-sm text-muted-foreground">
                    No {searchType} found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-caption">
          Press Enter to search or click on results
        </span>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{patientResults?.length} patients</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Database" size={14} />
            <span>8,000+ foods</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;