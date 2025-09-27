import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isCollapsed = false, onToggleSidebar }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'patient',
      title: 'New Patient Registration',
      message: 'Priya Sharma has completed her intake form',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Upcoming Consultation',
      message: 'Consultation with Raj Patel in 30 minutes',
      time: '25 min ago',
      unread: true
    },
    {
      id: 3,
      type: 'system',
      title: 'Diet Chart Generated',
      message: 'Personalized diet chart ready for Meera Singh',
      time: '1 hour ago',
      unread: false
    }
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    // Handle logout logic and navigate to login
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-60 bg-background border-b border-border z-40 transition-all duration-300 ease-out">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="mr-2"
          >
            <Icon name="Menu" size={20} />
          </Button>
          
          {/* Mobile Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 flex-shrink-0">
      <img 
        src="/logo.png"   // ✅ path to your logo
        alt="Logo"
        className="w-full h-full object-contain"
      />
    </div>
            <span className="font-heading font-semibold text-lg text-foreground">
              AyurTantra
            </span>
          </div>
        </div>

        {/* Desktop Page Title */}
        <div className="hidden lg:block">
          <h1 className="font-heading font-medium text-xl text-foreground">
            Dashboard
          </h1>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Patient Quick Search */}
          <div className="hidden md:block relative">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-64 pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-soft-lg z-50 animate-fade-in">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-medium text-sm text-foreground">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted transition-colors duration-200 cursor-pointer ${
                        notification?.unread ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification?.unread ? 'bg-primary' : 'bg-muted-foreground'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-medium text-sm text-foreground">
                            {notification?.title}
                          </p>
                          <p className="font-body text-sm text-muted-foreground mt-1">
                            {notification?.message}
                          </p>
                          <p className="font-caption text-xs text-muted-foreground mt-2">
                            {notification?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleUserMenuClick}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-medium text-sm">
                  DR
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-body font-medium text-sm text-foreground">
                  Dr. Rajesh Kumar
                </p>
                <p className="font-caption text-xs text-muted-foreground">
                  Ayurvedic Dietitian
                </p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-soft-lg z-50 animate-fade-in">
                <div className="p-3 border-b border-border">
                  <p className="font-body font-medium text-sm text-foreground">
                    Dr. Rajesh Kumar
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    rajesh.kumar@ayurnutricare.com
                  </p>
                </div>
                <div className="py-2">
                  <button 
                    className="w-full px-3 py-2 text-left font-body text-sm text-foreground hover:bg-muted transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => navigate('/settings')}
                  >
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button 
                    className="w-full px-3 py-2 text-left font-body text-sm text-foreground hover:bg-muted transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => navigate('/settings')}
                  >
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <button 
                    className="w-full px-3 py-2 text-left font-body text-sm text-foreground hover:bg-muted transition-colors duration-200 flex items-center space-x-2"
                    onClick={() => navigate('/help')}
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left font-body text-sm text-error hover:bg-muted transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;