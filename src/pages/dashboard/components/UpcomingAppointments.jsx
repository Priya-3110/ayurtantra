import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingAppointments = () => {
  const appointments = [
   {
  id: 1,
  patientName: "Ananya Iyer",
  patientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  type: "Initial Consultation",
  time: "10:00 AM",
  date: "Today",
  status: "confirmed",
  duration: "45 min"
},
{
  id: 2,
  patientName: "Karan Desai",
  patientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  type: "Follow-up",
  time: "2:30 PM",
  date: "Today",
  status: "confirmed",
  duration: "30 min"
},
{
  id: 3,
  patientName: "Neha Verma",
  patientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  type: "Diet Review",
  time: "11:00 AM",
  date: "Tomorrow",
  status: "pending",
  duration: "30 min"
},
{
  id: 4,
  patientName: "Siddharth Menon",
  patientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  type: "Progress Check",
  time: "4:00 PM",
  date: "Tomorrow",
  status: "confirmed",
  duration: "30 min"
}

  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      cancelled: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[status] || colors?.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: 'CheckCircle',
      pending: 'Clock',
      cancelled: 'XCircle'
    };
    return icons?.[status] || 'Clock';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Upcoming Appointments
          </h2>
          <Button variant="ghost" size="sm" iconName="Calendar" iconPosition="left">
            View Calendar
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {appointments?.map((appointment) => (
          <div key={appointment?.id} className="p-6 hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={appointment?.patientAvatar}
                  alt={appointment?.patientName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center ${getStatusColor(appointment?.status)}`}>
                  <Icon name={getStatusIcon(appointment?.status)} size={10} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-body font-medium text-sm text-foreground">
                    {appointment?.patientName}
                  </h3>
                  <span className="font-caption text-xs text-muted-foreground">
                    {appointment?.duration}
                  </span>
                </div>
                
                <p className="font-body text-sm text-muted-foreground mb-2">
                  {appointment?.type}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span className="font-caption text-xs">
                      {appointment?.date} at {appointment?.time}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="xs" iconName="MessageCircle">
                      Message
                    </Button>
                    <Button variant="ghost" size="xs" iconName="Phone">
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full">
          View All Appointments
        </Button>
      </div>
    </div>
  );
};

export default UpcomingAppointments;