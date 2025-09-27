import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PatientSelector = ({ selectedPatient, onPatientSelect, onNext }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const patients = [
    {
      value: 'patient-1',
      label: 'Ananya Iyer',
      description: 'Age: 32, Constitution: Vata-Pitta, Last visit: 2 days ago'
    },
    {
      value: 'patient-2',
      label: 'Karan Desai',
      description: 'Age: 45, Constitution: Kapha-Vata, Last visit: 1 week ago'
    },
    {
      value: 'patient-3',
      label: 'Neha Verma',
      description: 'Age: 28, Constitution: Pitta-Kapha, Last visit: 3 days ago'
    },
    {
      value: 'patient-4',
      label: 'Siddharth Menon',
      description: 'Age: 38, Constitution: Vata-Kapha, Last visit: 5 days ago'
    },
    {
      value: 'patient-5',
      label: 'Kavya Reddy',
      description: 'Age: 29, Constitution: Pitta-Vata, Last visit: 1 day ago'
    }
  ];

  const recentPatients = [
    {
      id: 'patient-1',
      name: 'Ananya Iyer',
      age: 32,
      constitution: 'Vata-Pitta',
      lastVisit: '2 days ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'patient-2',
      name: 'Karan Desai',
      age: 45,
      constitution: 'Kapha-Vata',
      lastVisit: '1 week ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'patient-3',
      name: 'Neha Verma',
      age: 28,
      constitution: 'Pitta-Kapha',
      lastVisit: '3 days ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];


  const handleQuickSelect = (patient) => {
    onPatientSelect(patient?.id);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Select Patient
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Choose a patient to generate personalized diet chart
          </p>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="User" size={24} className="text-primary" />
        </div>
      </div>
      {/* Patient Search Dropdown */}
      <div className="mb-6">
        <Select
          label="Search and Select Patient"
          placeholder="Type to search patients..."
          options={patients}
          value={selectedPatient}
          onChange={onPatientSelect}
          searchable
          clearable
          description="Search by name or patient ID"
        />
      </div>
      {/* Recent Patients Quick Access */}
      <div className="mb-6">
        <h3 className="font-heading font-medium text-sm text-foreground mb-3">
          Recent Patients
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentPatients?.map((patient) => (
            <button
              key={patient?.id}
              onClick={() => handleQuickSelect(patient)}
              className={`
                p-4 border rounded-lg text-left transition-all duration-200 hover:shadow-soft
                ${selectedPatient === patient?.id
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-medium text-sm text-primary">
                    {patient?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-foreground truncate">
                    {patient?.name}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    Age: {patient?.age} • {patient?.constitution}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    Last visit: {patient?.lastVisit}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Selected Patient Info */}
      {selectedPatient && (
        <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="font-medium text-primary-foreground">
                  {patients?.find(p => p?.value === selectedPatient)?.label?.split(' ')?.map(n => n?.[0])?.join('')}
                </span>
              </div>
              <div>
                <p className="font-body font-medium text-foreground">
                  {patients?.find(p => p?.value === selectedPatient)?.label}
                </p>
                <p className="font-caption text-sm text-muted-foreground">
                  {patients?.find(p => p?.value === selectedPatient)?.description}
                </p>
              </div>
            </div>
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Add New Patient
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedPatient}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Goals
        </Button>
      </div>
    </div>
  );
};

export default PatientSelector;