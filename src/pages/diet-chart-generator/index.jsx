import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProgressIndicator from './components/ProgressIndicator';
import PatientSelector from './components/PatientSelector';
import GoalSetting from './components/GoalSetting';
import AyurvedicCustomization from './components/AyurvedicCustomization';
import MealPlanning from './components/MealPlanning';
import ChartPreview from './components/ChartPreview';

const DietChartGenerator = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Form State
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [customization, setCustomization] = useState({
    constitution: '',
    season: '',
    restrictions: []
  });
  const [mealPlan, setMealPlan] = useState({});
  const [chartData, setChartData] = useState(null);

  const totalSteps = 5;

  useEffect(() => {
    document.title = 'Diet Chart Generator - AyurTantra';
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileSidebarClose = () => {
    setMobileSidebarOpen(false);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepNavigation = (step) => {
    setCurrentStep(step);
  };

  const handleGenerateChart = () => {
    // Compile all data
    const compiledChartData = {
      patient: selectedPatient,
      goals: selectedGoals,
      customization,
      mealPlan,
      generatedAt: new Date()?.toISOString()
    };
    
    setChartData(compiledChartData);
    setShowSuccessModal(true);
    
    // Auto-close modal after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
      // Reset form or navigate
      handleReset();
    }, 3000);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedPatient('');
    setSelectedGoals([]);
    setCustomization({
      constitution: '',
      season: '',
      restrictions: []
    });
    setMealPlan({});
    setChartData(null);
  };

  const handleEditChart = () => {
    setCurrentStep(4); // Go back to meal planning
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PatientSelector
            selectedPatient={selectedPatient}
            onPatientSelect={setSelectedPatient}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <GoalSetting
            selectedGoals={selectedGoals}
            onGoalsChange={setSelectedGoals}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 3:
        return (
          <AyurvedicCustomization
            customization={customization}
            onCustomizationChange={setCustomization}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 4:
        return (
          <MealPlanning
            mealPlan={mealPlan}
            onMealPlanChange={setMealPlan}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 5:
        return (
          <ChartPreview
            chartData={chartData}
            onEdit={handleEditChart}
            onGenerate={handleGenerateChart}
            onBack={handlePreviousStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      {/* Header */}
      <Header
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setMobileSidebarOpen(true)}
      />

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300 ease-out pt-16
          ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
        `}
      >
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-bold text-2xl text-foreground">
                  Diet Chart Generator
                </h1>
                <p className="font-body text-muted-foreground mt-1">
                  Create personalized Ayurvedic meal plans for your patients
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/patient-management')}
                  iconName="Users"
                  iconPosition="left"
                >
                  Manage Patients
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />

          {/* Step Content */}
          <div className="mb-6">
            {renderCurrentStep()}
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-medium text-lg text-foreground mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/patient-management')}
                iconName="UserPlus"
                iconPosition="left"
                className="justify-start"
              >
                Add New Patient
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/food-details')}
                iconName="Database"
                iconPosition="left"
                className="justify-start"
              >
                Browse Food Database
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                iconName="BarChart3"
                iconPosition="left"
                className="justify-start"
              >
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                Diet Chart Generated Successfully!
              </h3>
              <p className="font-body text-muted-foreground mb-6">
                The personalized diet chart has been created and is ready for download. 
                The patient will receive a comprehensive meal plan based on Ayurvedic principles.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/dashboard');
                  }}
                  iconName="BarChart3"
                  iconPosition="left"
                >
                  View Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietChartGenerator;