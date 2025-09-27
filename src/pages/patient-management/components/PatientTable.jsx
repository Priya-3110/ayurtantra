import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientTable = ({ patients, onEdit, onDelete, onViewProfile, onGenerateReport }) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPatients = [...patients]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'lastConsultation') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success/10', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Inactive' },
      followup: { bg: 'bg-warning/10', text: 'text-warning', label: 'Follow-up Required' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.inactive;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 font-body font-medium text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span>Patient Name</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('age')}
                  className="flex items-center space-x-2 font-body font-medium text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span>Age</span>
                  <SortIcon field="age" />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="font-body font-medium text-sm text-foreground">Contact</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('lastConsultation')}
                  className="flex items-center space-x-2 font-body font-medium text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span>Last Consultation</span>
                  <SortIcon field="lastConsultation" />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="font-body font-medium text-sm text-foreground">Status</span>
              </th>
              <th className="text-left p-4">
                <span className="font-body font-medium text-sm text-foreground">Diet Plan</span>
              </th>
              <th className="text-right p-4">
                <span className="font-body font-medium text-sm text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPatients?.map((patient) => (
              <tr key={patient?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-medium text-sm text-primary">
                        {patient?.name?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-body font-medium text-sm text-foreground">{patient?.name}</p>
                      <p className="font-caption text-xs text-muted-foreground">ID: {patient?.patientId}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-body text-sm text-foreground">{patient?.age} years</span>
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-body text-sm text-foreground">{patient?.phone}</p>
                    <p className="font-caption text-xs text-muted-foreground">{patient?.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-body text-sm text-foreground">
                    {formatDate(patient?.lastConsultation)}
                  </span>
                </td>
                <td className="p-4">
                  {getStatusBadge(patient?.status)}
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-body text-sm text-foreground">{patient?.dietPlan}</p>
                    <p className="font-caption text-xs text-muted-foreground">
                      {patient?.dietPlanStatus}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewProfile(patient)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(patient)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onGenerateReport(patient)}
                      className="h-8 w-8"
                    >
                      <Icon name="FileText" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(patient)}
                      className="h-8 w-8 text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden">
        {sortedPatients?.map((patient) => (
          <div key={patient?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-medium text-sm text-primary">
                    {patient?.name?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-body font-medium text-sm text-foreground">{patient?.name}</p>
                  <p className="font-caption text-xs text-muted-foreground">
                    {patient?.age} years • ID: {patient?.patientId}
                  </p>
                </div>
              </div>
              {getStatusBadge(patient?.status)}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="font-body text-sm text-foreground">{patient?.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} className="text-muted-foreground" />
                <span className="font-body text-sm text-foreground">{patient?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="font-body text-sm text-foreground">
                  Last visit: {formatDate(patient?.lastConsultation)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={14} className="text-muted-foreground" />
                <span className="font-body text-sm text-foreground">
                  {patient?.dietPlan} • {patient?.dietPlanStatus}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(patient)}
                iconName="Eye"
                iconPosition="left"
              >
                View Profile
              </Button>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(patient)}
                  className="h-8 w-8"
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onGenerateReport(patient)}
                  className="h-8 w-8"
                >
                  <Icon name="FileText" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(patient)}
                  className="h-8 w-8 text-error hover:text-error"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {patients?.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Users" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-2">
            No patients found
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Start by adding your first patient to begin managing their care.
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/patient-profile')}
            iconName="Plus"
            iconPosition="left"
          >
            Add First Patient
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientTable;