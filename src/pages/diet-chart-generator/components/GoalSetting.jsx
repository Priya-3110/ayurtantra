import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const GoalSetting = ({ selectedGoals, onGoalsChange, onNext, onBack }) => {
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [duration, setDuration] = useState('');

  const healthGoals = [
    {
      id: 'weight-loss',
      title: 'Weight Management',
      description: 'Healthy weight loss or gain based on constitution',
      icon: 'Scale',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'digestive-health',
      title: 'Digestive Health',
      description: 'Improve digestion and gut health',
      icon: 'Heart',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'energy-balance',
      title: 'Energy Balance',
      description: 'Boost energy levels and reduce fatigue',
      icon: 'Zap',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'stress-management',
      title: 'Stress Management',
      description: 'Reduce stress through balanced nutrition',
      icon: 'Brain',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'immunity-boost',
      title: 'Immunity Boost',
      description: 'Strengthen immune system naturally',
      icon: 'Shield',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'skin-health',
      title: 'Skin Health',
      description: 'Improve skin condition through diet',
      icon: 'Sparkles',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  const specificConditions = [
    { value: 'diabetes', label: 'Diabetes Management' },
    { value: 'hypertension', label: 'Hypertension Control' },
    { value: 'arthritis', label: 'Joint Health & Arthritis' },
    { value: 'insomnia', label: 'Sleep Disorders' },
    { value: 'anxiety', label: 'Anxiety & Mental Health' },
    { value: 'hormonal', label: 'Hormonal Imbalance' }
  ];

  const durationOptions = [
    { value: '2-weeks', label: '2 Weeks (Trial Plan)' },
    { value: '1-month', label: '1 Month (Standard)' },
    { value: '3-months', label: '3 Months (Recommended)' },
    { value: '6-months', label: '6 Months (Comprehensive)' }
  ];

  const handleGoalToggle = (goalId) => {
    const updatedGoals = selectedGoals?.includes(goalId)
      ? selectedGoals?.filter(id => id !== goalId)
      : [...selectedGoals, goalId];
    onGoalsChange(updatedGoals);
  };

  const isGoalSelected = (goalId) => selectedGoals?.includes(goalId);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Health Goals & Objectives
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Select primary health goals for personalized recommendations
          </p>
        </div>
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
          <Icon name="Target" size={24} className="text-accent" />
        </div>
      </div>
      {/* Primary Health Goals */}
      <div className="mb-8">
        <h3 className="font-heading font-medium text-lg text-foreground mb-4">
          Primary Health Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthGoals?.map((goal) => (
            <button
              key={goal?.id}
              onClick={() => handleGoalToggle(goal?.id)}
              className={`
                p-4 border rounded-lg text-left transition-all duration-200 hover:shadow-soft
                ${isGoalSelected(goal?.id)
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${goal?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={goal?.icon} size={20} className={goal?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-body font-medium text-sm text-foreground">
                      {goal?.title}
                    </h4>
                    {isGoalSelected(goal?.id) && (
                      <Icon name="CheckCircle" size={16} className="text-primary" />
                    )}
                  </div>
                  <p className="font-caption text-xs text-muted-foreground mt-1">
                    {goal?.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Specific Health Conditions */}
      <div className="mb-8">
        <h3 className="font-heading font-medium text-lg text-foreground mb-4">
          Specific Health Conditions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Primary Health Condition"
            placeholder="Select if applicable"
            options={specificConditions}
            value={primaryGoal}
            onChange={setPrimaryGoal}
            description="Choose the most important condition to address"
          />
          <Select
            label="Treatment Duration"
            placeholder="Select duration"
            options={durationOptions}
            value={duration}
            onChange={setDuration}
            description="Recommended duration for optimal results"
          />
        </div>
      </div>
      {/* Goal Summary */}
      {selectedGoals?.length > 0 && (
        <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
          <h4 className="font-heading font-medium text-sm text-foreground mb-3">
            Selected Goals Summary
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedGoals?.map((goalId) => {
              const goal = healthGoals?.find(g => g?.id === goalId);
              return (
                <span
                  key={goalId}
                  className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                >
                  <Icon name={goal?.icon} size={12} className="mr-1" />
                  {goal?.title}
                </span>
              );
            })}
          </div>
          {primaryGoal && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="font-caption text-xs text-muted-foreground">
                <span className="font-medium">Primary Condition:</span> {specificConditions?.find(c => c?.value === primaryGoal)?.label}
                {duration && (
                  <span className="ml-3">
                    <span className="font-medium">Duration:</span> {durationOptions?.find(d => d?.value === duration)?.label}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Patient
        </Button>
        <Button
          onClick={onNext}
          disabled={selectedGoals?.length === 0}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Customization
        </Button>
      </div>
    </div>
  );
};

export default GoalSetting;