import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PersonalInfoTab from './components/PersonalInfoTab';
import IntakeFormTab from './components/IntakeFormTab';
import MedicalHistoryTab from './components/MedicalHistoryTab';
import CurrentDietTab from './components/CurrentDietTab';
import DocumentsTab from './components/DocumentsTab';
import ProgressTrackingTab from './components/ProgressTrackingTab';

const PatientProfile = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [patient, setPatient] = useState({
    id: 'PAT-001',
    name: "Ananya Iyer",
    age: 32,
    gender: 'female',
    phone: '+91 98765 43210',
     email: "ananya.iyer@email.com",
    address: '123 Green Valley, Sector 15, Gurgaon, Haryana 122001',
    emergencyContact: '+91 98765 43211',
    height: 165,
    weight: 72.2,
    bloodGroup: 'A+',
    occupation: 'Software Engineer',
    registrationDate: '2024-01-15',
    lastVisit: '2024-03-15',
    status: 'active',
    intakeForm: {
      dietaryHabits: 'vegetarian',
      mealFrequency: '3',
      waterIntake: '8',
      bowelMovements: 'irregular',
      sleepPattern: '6-7',
      exerciseFrequency: 'light',
      stressLevel: 'high',
      constitution: 'vata-pitta',
      allergies: ['Dairy', 'Nuts'],
      currentMedications: 'Multivitamin, Omega-3 supplements',
      healthGoals: ['Weight Loss', 'Digestive Health', 'Stress Management'],
      digestiveIssues: ['Bloating', 'Gas', 'Irregular bowel movements'],
      energyLevels: 'low',
      appetite: 'irregular'
    }
  });

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: 'User',
      description: 'Basic demographics and contact details'
    },
    {
      id: 'intake',
      label: 'Intake Form',
      icon: 'FileText',
      description: 'Ayurvedic assessment and lifestyle evaluation'
    },
    {
      id: 'history',
      label: 'Medical History',
      icon: 'Clock',
      description: 'Consultation records and health timeline'
    },
    {
      id: 'diet',
      label: 'Current Diet',
      icon: 'Utensils',
      description: 'Active meal plan and nutrition tracking'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: 'FolderOpen',
      description: 'Medical records and reports'
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: 'TrendingUp',
      description: 'Health improvements and achievements'
    }
  ];

  useEffect(() => {
    document.title = `${patient?.name} - Patient Profile | AyurNutriCare`;
  }, [patient?.name]);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  const handlePatientSave = (updatedData) => {
    setPatient(prev => ({
      ...prev,
      ...updatedData
    }));
    console.log('Patient data updated:', updatedData);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-muted-foreground bg-muted';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return patient?.age;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today?.getFullYear() - birth?.getFullYear();
    const monthDiff = today?.getMonth() - birth?.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birth?.getDate())) {
      age--;
    }
    return age;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoTab patient={patient} onSave={handlePatientSave} />;
      case 'intake':
        return <IntakeFormTab patient={patient} onSave={handlePatientSave} />;
      case 'history':
        return <MedicalHistoryTab patient={patient} onSave={handlePatientSave} />;
      case 'diet':
        return <CurrentDietTab patient={patient} onNavigate={handleNavigation} />;
      case 'documents':
        return <DocumentsTab patient={patient} onSave={handlePatientSave} />;
      case 'progress':
        return <ProgressTrackingTab patient={patient} onSave={handlePatientSave} />;
      default:
        return <PersonalInfoTab patient={patient} onSave={handlePatientSave} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />
      <Header
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setMobileSidebarOpen(true)}
      />
      <main className={`transition-all duration-300 ease-out pt-16 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="hover:text-foreground transition-colors duration-200"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={14} />
            <button 
              onClick={() => navigate('/patient-management')}
              className="hover:text-foreground transition-colors duration-200"
            >
              Patients
            </button>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground font-medium">Patient Profile</span>
          </div>

          {/* Patient Header */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-heading font-semibold text-xl">
                    {patient?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>

                {/* Patient Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="font-heading font-semibold text-2xl text-foreground">
                      {patient?.name}
                    </h1>
                    <span className={`px-2 py-1 rounded-full font-caption text-xs ${getStatusColor(patient?.status)}`}>
                      {patient?.status?.charAt(0)?.toUpperCase() + patient?.status?.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Age:</span>
                      <span className="text-foreground font-medium">{patient?.age} years</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Gender:</span>
                      <span className="text-foreground font-medium capitalize">{patient?.gender}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="text-foreground font-medium">{patient?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-foreground font-medium">{patient?.email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="UserPlus" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Registered:</span>
                      <span className="text-foreground font-medium">
                        {new Date(patient.registrationDate)?.toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Last Visit:</span>
                      <span className="text-foreground font-medium">
                        {new Date(patient.lastVisit)?.toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">ID:</span>
                      <span className="text-foreground font-medium">{patient?.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('/diet-chart-generator')}
                  iconName="FileText"
                  iconPosition="left"
                >
                  Generate Diet Chart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule Appointment
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-card border border-border rounded-lg mb-6">
            <div className="border-b border-border">
              <div className="flex space-x-0 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-body font-medium text-sm border-b-2 transition-colors duration-200 whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <div className="text-left">
                      <div>{tab?.label}</div>
                      <div className="font-caption text-xs opacity-75 hidden lg:block">
                        {tab?.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientProfile;