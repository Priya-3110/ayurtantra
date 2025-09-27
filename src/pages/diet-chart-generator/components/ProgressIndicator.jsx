import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    {
      id: 1,
      title: 'Patient Selection',
      description: 'Choose patient for diet chart',
      icon: 'User'
    },
    {
      id: 2,
      title: 'Health Goals',
      description: 'Set health objectives',
      icon: 'Target'
    },
    {
      id: 3,
      title: 'Ayurvedic Setup',
      description: 'Constitution & preferences',
      icon: 'Flower'
    },
    {
      id: 4,
      title: 'Meal Planning',
      description: 'Create meal schedule',
      icon: 'UtensilsCrossed'
    },
    {
      id: 5,
      title: 'Preview & Generate',
      description: 'Review and finalize',
      icon: 'FileText'
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-lg text-foreground">
          Diet Chart Generation Progress
        </h3>
        <span className="font-caption text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${getStepStatus(step?.id) === 'completed'
                      ? 'bg-success border-success text-success-foreground'
                      : getStepStatus(step?.id) === 'current' ?'bg-primary border-primary text-primary-foreground' :'bg-muted border-border text-muted-foreground'
                    }
                  `}
                >
                  {getStepStatus(step?.id) === 'completed' ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <Icon name={step?.icon} size={20} />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`
                      font-body font-medium text-sm
                      ${getStepStatus(step?.id) === 'current' ?'text-primary'
                        : getStepStatus(step?.id) === 'completed' ?'text-success' :'text-muted-foreground'
                      }
                    `}
                  >
                    {step?.title}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground mt-1">
                    {step?.description}
                  </p>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps?.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mx-4 transition-all duration-300
                    ${getStepStatus(step?.id) === 'completed'
                      ? 'bg-success' :'bg-border'
                    }
                  `}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="flex items-center mb-4">
          <div className="flex-1 bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <span className="ml-3 font-data text-sm text-foreground">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        
        {/* Current Step Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name={steps?.[currentStep - 1]?.icon} size={18} color="white" />
          </div>
          <div>
            <p className="font-body font-medium text-sm text-foreground">
              {steps?.[currentStep - 1]?.title}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              {steps?.[currentStep - 1]?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;