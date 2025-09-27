import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, isMobileOpen = false, onMobileClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPatientSearch, setShowPatientSearch] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard',
      description: 'Overview and analytics'
    },
    {
      id: 'patients',
      label: 'Patients',
      icon: 'Users',
      path: '/patient-management',
      description: 'Patient management and profiles',
      subItems: [
        { label: 'All Patients', path: '/patient-management' },
        { label: 'Patient Profile', path: '/patient-profile' }
      ]
    },
    {
      id: 'food-database',
      label: 'Food Database',
      icon: 'Database',
      path: '/food-details',
      description: 'Nutritional information and Ayurvedic properties'
    },
    {
      id: 'diet-plans',
      label: 'Diet Plans',
      icon: 'FileText',
      path: '/diet-chart-generator',
      description: 'Generate personalized diet charts'
    }
  ];

  const recentPatients = [
    { id: 1, name: 'Priya Sharma', lastVisit: '2 days ago' },
    { id: 2, name: 'Raj Patel', lastVisit: '1 week ago' },
    { id: 3, name: 'Meera Singh', lastVisit: '3 days ago' },
    { id: 4, name: 'Arjun Kumar', lastVisit: '5 days ago' }
  ];

  const filteredPatients = recentPatients?.filter(patient =>
    patient?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const isActiveRoute = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === path;
    }
    return location?.pathname?.startsWith(path);
  };

  const handlePatientSelect = (patient) => {
    setShowPatientSearch(false);
    setSearchQuery('');
    // Navigate to patient profile with patient data
    navigate('/patient-profile', { state: { patient } });
    if (isMobileOpen) {
      onMobileClose();
    }
  };

  const handleNavigation = (path) => {
    if (isMobileOpen) {
      onMobileClose();
    }
    // Use React Router navigation instead of console.log
    navigate(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-50 transition-all duration-300 ease-out
          ${isCollapsed ? 'w-16' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center h-16 px-4 border-b border-border">
            <div className="flex items-center min-w-0">
                    <div className="w-8 h-8 flex-shrink-0">
              <img 
                src="/logo.png"   // ✅ path to your logo
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
              {!isCollapsed && (
                <div className="ml-3 min-w-0">
                  <h1 className="font-heading font-semibold text-lg text-foreground truncate">
                    AyurTantra
                  </h1>
                  <p className="font-caption text-xs text-muted-foreground">
                    Ayurvedic Practice Management
                  </p>
                </div>
              )}
            </div>
            
            {/* Desktop Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="ml-auto hidden lg:flex"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>

            {/* Mobile Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onMobileClose}
              className="ml-auto lg:hidden"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Patient Quick Search */}
          {!isCollapsed && (
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  onFocus={() => setShowPatientSearch(true)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                
                {/* Patient Search Results */}
                {showPatientSearch && (searchQuery || true) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-soft-lg z-50 animate-fade-in">
                    <div className="p-2">
                      <p className="font-caption text-xs text-muted-foreground px-2 py-1">
                        {searchQuery ? 'Search Results' : 'Recent Patients'}
                      </p>
                      {filteredPatients?.map((patient) => (
                        <button
                          key={patient?.id}
                          onClick={() => handlePatientSelect(patient)}
                          className="w-full px-2 py-2 text-left hover:bg-muted rounded-md transition-colors duration-200 flex items-center justify-between"
                        >
                          <div>
                            <p className="font-body text-sm text-foreground">
                              {patient?.name}
                            </p>
                            <p className="font-caption text-xs text-muted-foreground">
                              Last visit: {patient?.lastVisit}
                            </p>
                          </div>
                          <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems?.map((item) => (
              <div key={item?.id}>
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 group
                    ${isActiveRoute(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                  title={isCollapsed ? item?.label : ''}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-body font-medium text-sm truncate">
                        {item?.label}
                      </p>
                      <p className="font-caption text-xs opacity-75 truncate">
                        {item?.description}
                      </p>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-medium text-sm">
                  DR
                </span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-foreground truncate">
                    Dr. Rajesh Kumar
                  </p>
                  <p className="font-caption text-xs text-muted-foreground truncate">
                    Ayurvedic Dietitian
                  </p>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <div className="mt-3 space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => navigate('/settings')}
                >
                  <Icon name="Settings" size={16} className="mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                  onClick={() => navigate('/login')}
                >
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Click outside to close patient search */}
      {showPatientSearch && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowPatientSearch(false)}
        />
      )}
    </>
  );
};

export default Sidebar;