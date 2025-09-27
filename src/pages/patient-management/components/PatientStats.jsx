import React from 'react';
import Icon from '../../../components/AppIcon';

const PatientStats = ({ patients }) => {
  const totalPatients = patients?.length;
  const activePatients = patients?.filter(p => p?.status === 'active')?.length;
  const followupRequired = patients?.filter(p => p?.status === 'followup')?.length;
  const inactivePatients = patients?.filter(p => p?.status === 'inactive')?.length;

  // Calculate recent consultations (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo?.setDate(thirtyDaysAgo?.getDate() - 30);
  const recentConsultations = patients?.filter(p => 
    new Date(p.lastConsultation) >= thirtyDaysAgo
  )?.length;

  // Calculate overdue consultations (90+ days)
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo?.setDate(ninetyDaysAgo?.getDate() - 90);
  const overdueConsultations = patients?.filter(p => 
    new Date(p.lastConsultation) < ninetyDaysAgo
  )?.length;

  const stats = [
    {
      id: 'total',
      label: 'Total Patients',
      value: totalPatients,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'All registered patients'
    },
    {
      id: 'active',
      label: 'Active Patients',
      value: activePatients,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Currently under treatment'
    },
    {
      id: 'followup',
      label: 'Follow-up Required',
      value: followupRequired,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Need attention'
    },
    {
      id: 'recent',
      label: 'Recent Consultations',
      value: recentConsultations,
      icon: 'Calendar',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Last 30 days'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-soft-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className="text-right">
              <p className="font-heading font-bold text-2xl text-foreground">
                {stat?.value}
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                {totalPatients > 0 ? `${Math.round((stat?.value / totalPatients) * 100)}%` : '0%'}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-body font-medium text-sm text-foreground mb-1">
              {stat?.label}
            </h3>
            <p className="font-caption text-xs text-muted-foreground">
              {stat?.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientStats;