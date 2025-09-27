import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'patient',
      title: 'New Patient Registration',
      description: 'Ananya Iyer completed her intake form and medical history',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      icon: 'UserPlus',
      color: 'success'
    },
    {
      id: 2,
      type: 'diet-chart',
      title: 'Diet Chart Generated',
      description: 'Personalized Ayurvedic diet plan created for Raj Patel',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      icon: 'FileText',
      color: 'primary'
    },
    {
      id: 3,
      type: 'consultation',
      title: 'Consultation Completed',
      description: 'Follow-up session with Meera Singh - progress reviewed',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'Calendar',
      color: 'accent'
    },
    {
      id: 4,
      type: 'system',
      title: 'Food Database Updated',
      description: 'Added 25 new seasonal vegetables with Ayurvedic properties',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'Database',
      color: 'secondary'
    },
    {
      id: 5,
      type: 'patient',
      title: 'Patient Profile Updated',
      description: 'Arjun Kumar updated his dietary preferences and restrictions',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'User',
      color: 'primary'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'patient', label: 'Patients' },
    { value: 'diet-chart', label: 'Diet Charts' },
    { value: 'consultation', label: 'Consultations' },
    { value: 'system', label: 'System' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      secondary: 'bg-secondary/10 text-secondary',
      accent: 'bg-accent/10 text-accent',
      success: 'bg-success/10 text-success'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return timestamp?.toLocaleDateString();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Recent Activity
          </h2>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`
                px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                ${filter === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }
              `}
            >
              {option?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.map((activity, index) => (
          <div
            key={activity?.id}
            className={`p-6 hover:bg-muted/50 transition-colors duration-200 cursor-pointer ${
              index !== filteredActivities?.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(activity?.color)}`}>
                <Icon name={activity?.icon} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-body font-medium text-sm text-foreground">
                    {activity?.title}
                  </h3>
                  <span className="font-caption text-xs text-muted-foreground">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
                <p className="font-body text-sm text-muted-foreground">
                  {activity?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full">
          View All Activities
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;