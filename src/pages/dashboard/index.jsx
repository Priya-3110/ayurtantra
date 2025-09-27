import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import QuickActionCard from './components/QuickActionCard';
import ActivityFeed from './components/ActivityFeed';
import UpcomingAppointments from './components/UpcomingAppointments';
import NutrientAnalysisChart from './components/NutrientAnalysisChart';
import QuickSearch from './components/QuickSearch';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const metricsData = [
    {
      title: 'Total Patients',
      value: '247',
      change: '+12%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Active Diet Plans',
      value: '89',
      change: '+8%',
      changeType: 'increase',
      icon: 'FileText',
      color: 'success'
    },
    {
      title: 'Consultations Today',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: 'Calendar',
      color: 'warning'
    },
    {
      title: 'Pending Follow-ups',
      value: '23',
      change: '-5',
      changeType: 'decrease',
      icon: 'Clock',
      color: 'accent'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Patient',
      description: 'Register a new patient and create their comprehensive health profile with intake forms',
      icon: 'UserPlus',
      route: '/patient-management',
      color: 'primary'
    },
    {
      title: 'Search Food Database',
      description: 'Explore 8,000+ food items with detailed nutritional and Ayurvedic properties',
      icon: 'Database',
      route: '/food-details',
      color: 'secondary'
    },
    {
      title: 'Generate Diet Chart',
      description: 'Create personalized Ayurveda-compliant meal plans with automatic nutrient analysis',
      icon: 'FileText',
      route: '/diet-chart-generator',
      color: 'accent'
    },
    {
      title: 'View Patient Profile',
      description: 'Access detailed patient records, history, and progress tracking information',
      icon: 'User',
      route: '/patient-profile',
      color: 'success'
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleMobileClose = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={handleMobileClose}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ease-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        {/* Header */}
        <Header
          isCollapsed={sidebarCollapsed}
          onToggleSidebar={handleMobileToggle}
        />

        {/* Dashboard Content */}
        <main className="pt-16 p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
                  Welcome back, Dr. Rajesh Kumar
                </h1>
                <p className="font-body text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  You have 4 appointments scheduled for today and 23 pending follow-ups
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-data text-lg font-semibold text-primary">
                    89%
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    Patient Satisfaction
                  </p>
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={24} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Quick Actions
              </h2>
              <Button variant="ghost" size="sm" iconName="Grid3X3" iconPosition="left">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions?.map((action, index) => (
                <QuickActionCard
                  key={index}
                  title={action?.title}
                  description={action?.description}
                  icon={action?.icon}
                  route={action?.route}
                  color={action?.color}
                />
              ))}
            </div>
          </div>

          {/* Quick Search */}
          <QuickSearch />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Activity Feed */}
            <div className="xl:col-span-2">
              <ActivityFeed />
            </div>

            {/* Right Column - Appointments */}
            <div>
              <UpcomingAppointments />
            </div>
          </div>

          {/* Nutrient Analysis Chart */}
          <NutrientAnalysisChart />

          {/* System Status & Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  System Status
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="font-caption text-xs text-success">All Systems Operational</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-foreground">Database Connection</span>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="font-caption text-xs text-success">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-foreground">Food Database Sync</span>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="font-caption text-xs text-success">Up to date</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-foreground">Backup Status</span>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="font-caption text-xs text-success">Last: 2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  Recent Alerts
                </h3>
                <Button variant="ghost" size="sm" iconName="Bell">
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-foreground">
                      Patient Follow-up Reminder
                    </p>
                    <p className="font-caption text-xs text-muted-foreground">
                      5 patients due for follow-up consultations
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <Icon name="Info" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-foreground">
                      Food Database Update
                    </p>
                    <p className="font-caption text-xs text-muted-foreground">
                      25 new seasonal items added to database
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;