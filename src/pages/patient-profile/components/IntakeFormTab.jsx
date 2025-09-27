import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const IntakeFormTab = ({ patient, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    dietaryHabits: patient?.intakeForm?.dietaryHabits || 'vegetarian',
    mealFrequency: patient?.intakeForm?.mealFrequency || '3',
    waterIntake: patient?.intakeForm?.waterIntake || '8',
    bowelMovements: patient?.intakeForm?.bowelMovements || 'regular',
    sleepPattern: patient?.intakeForm?.sleepPattern || '7-8',
    exerciseFrequency: patient?.intakeForm?.exerciseFrequency || 'moderate',
    stressLevel: patient?.intakeForm?.stressLevel || 'moderate',
    constitution: patient?.intakeForm?.constitution || 'vata-pitta',
    allergies: patient?.intakeForm?.allergies || [],
    currentMedications: patient?.intakeForm?.currentMedications || '',
    healthGoals: patient?.intakeForm?.healthGoals || [],
    digestiveIssues: patient?.intakeForm?.digestiveIssues || [],
    energyLevels: patient?.intakeForm?.energyLevels || 'moderate',
    appetite: patient?.intakeForm?.appetite || 'normal'
  });

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'non-vegetarian', label: 'Non-Vegetarian' },
    { value: 'eggetarian', label: 'Eggetarian' },
    { value: 'jain', label: 'Jain' }
  ];

  const mealFrequencyOptions = [
    { value: '2', label: '2 meals per day' },
    { value: '3', label: '3 meals per day' },
    { value: '4', label: '4 meals per day' },
    { value: '5', label: '5-6 small meals' }
  ];

  const bowelOptions = [
    { value: 'regular', label: 'Regular (once daily)' },
    { value: 'irregular', label: 'Irregular' },
    { value: 'constipated', label: 'Constipated' },
    { value: 'loose', label: 'Loose/Frequent' }
  ];

  const exerciseOptions = [
    { value: 'sedentary', label: 'Sedentary (No exercise)' },
    { value: 'light', label: 'Light (1-2 times/week)' },
    { value: 'moderate', label: 'Moderate (3-4 times/week)' },
    { value: 'active', label: 'Active (5-6 times/week)' },
    { value: 'very-active', label: 'Very Active (Daily)' }
  ];

  const stressOptions = [
    { value: 'low', label: 'Low' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'high', label: 'High' },
    { value: 'very-high', label: 'Very High' }
  ];

  const constitutionOptions = [
    { value: 'vata', label: 'Vata Dominant' },
    { value: 'pitta', label: 'Pitta Dominant' },
    { value: 'kapha', label: 'Kapha Dominant' },
    { value: 'vata-pitta', label: 'Vata-Pitta' },
    { value: 'pitta-kapha', label: 'Pitta-Kapha' },
    { value: 'vata-kapha', label: 'Vata-Kapha' },
    { value: 'tridoshic', label: 'Tridoshic (Balanced)' }
  ];

  const energyOptions = [
    { value: 'low', label: 'Low Energy' },
    { value: 'moderate', label: 'Moderate Energy' },
    { value: 'high', label: 'High Energy' },
    { value: 'fluctuating', label: 'Fluctuating' }
  ];

  const appetiteOptions = [
    { value: 'poor', label: 'Poor Appetite' },
    { value: 'normal', label: 'Normal Appetite' },
    { value: 'strong', label: 'Strong Appetite' },
    { value: 'irregular', label: 'Irregular Appetite' }
  ];

  const allergyOptions = [
    'Dairy', 'Gluten', 'Nuts', 'Shellfish', 'Eggs', 'Soy', 'Fish', 'Sesame', 'Peanuts', 'Tree Nuts'
  ];

  const healthGoalOptions = [
    'Weight Loss', 'Weight Gain', 'Muscle Building', 'Digestive Health', 'Energy Boost', 
    'Stress Management', 'Better Sleep', 'Immunity Boost', 'Skin Health', 'Mental Clarity'
  ];

  const digestiveIssueOptions = [
    'Acidity', 'Bloating', 'Gas', 'Indigestion', 'Constipation', 'Diarrhea', 
    'Heartburn', 'Nausea', 'Loss of Appetite', 'Food Sensitivities'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, option, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev?.[field], option]
        : prev?.[field]?.filter(item => item !== option)
    }));
  };

  const handleSave = () => {
    onSave({ intakeForm: formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      dietaryHabits: patient?.intakeForm?.dietaryHabits || 'vegetarian',
      mealFrequency: patient?.intakeForm?.mealFrequency || '3',
      waterIntake: patient?.intakeForm?.waterIntake || '8',
      bowelMovements: patient?.intakeForm?.bowelMovements || 'regular',
      sleepPattern: patient?.intakeForm?.sleepPattern || '7-8',
      exerciseFrequency: patient?.intakeForm?.exerciseFrequency || 'moderate',
      stressLevel: patient?.intakeForm?.stressLevel || 'moderate',
      constitution: patient?.intakeForm?.constitution || 'vata-pitta',
      allergies: patient?.intakeForm?.allergies || [],
      currentMedications: patient?.intakeForm?.currentMedications || '',
      healthGoals: patient?.intakeForm?.healthGoals || [],
      digestiveIssues: patient?.intakeForm?.digestiveIssues || [],
      energyLevels: patient?.intakeForm?.energyLevels || 'moderate',
      appetite: patient?.intakeForm?.appetite || 'normal'
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Ayurvedic Intake Assessment
          </h3>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Comprehensive lifestyle and health evaluation
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                iconName="Save"
                iconPosition="left"
              >
                Save Assessment
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit Assessment
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Dietary Habits */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-heading font-medium text-base text-foreground mb-4 flex items-center">
              <Icon name="Utensils" size={18} className="mr-2 text-primary" />
              Dietary Habits
            </h4>
            <div className="space-y-4">
              <Select
                label="Dietary Preference"
                options={dietaryOptions}
                value={formData?.dietaryHabits}
                onChange={(value) => handleInputChange('dietaryHabits', value)}
                disabled={!isEditing}
              />
              
              <Select
                label="Meal Frequency"
                options={mealFrequencyOptions}
                value={formData?.mealFrequency}
                onChange={(value) => handleInputChange('mealFrequency', value)}
                disabled={!isEditing}
              />

              <Input
                label="Daily Water Intake (glasses)"
                type="number"
                value={formData?.waterIntake}
                onChange={(e) => handleInputChange('waterIntake', e?.target?.value)}
                disabled={!isEditing}
                min="1"
                max="20"
              />

              <Select
                label="Appetite Pattern"
                options={appetiteOptions}
                value={formData?.appetite}
                onChange={(value) => handleInputChange('appetite', value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Lifestyle Patterns */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-heading font-medium text-base text-foreground mb-4 flex items-center">
              <Icon name="Activity" size={18} className="mr-2 text-primary" />
              Lifestyle Patterns
            </h4>
            <div className="space-y-4">
              <Input
                label="Sleep Duration (hours)"
                type="text"
                value={formData?.sleepPattern}
                onChange={(e) => handleInputChange('sleepPattern', e?.target?.value)}
                disabled={!isEditing}
                placeholder="7-8 hours"
              />

              <Select
                label="Exercise Frequency"
                options={exerciseOptions}
                value={formData?.exerciseFrequency}
                onChange={(value) => handleInputChange('exerciseFrequency', value)}
                disabled={!isEditing}
              />

              <Select
                label="Stress Level"
                options={stressOptions}
                value={formData?.stressLevel}
                onChange={(value) => handleInputChange('stressLevel', value)}
                disabled={!isEditing}
              />

              <Select
                label="Energy Levels"
                options={energyOptions}
                value={formData?.energyLevels}
                onChange={(value) => handleInputChange('energyLevels', value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Allergies */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-heading font-medium text-base text-foreground mb-4 flex items-center">
              <Icon name="AlertTriangle" size={18} className="mr-2 text-warning" />
              Food Allergies & Sensitivities
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {allergyOptions?.map((allergy) => (
                <Checkbox
                  key={allergy}
                  label={allergy}
                  checked={formData?.allergies?.includes(allergy)}
                  onChange={(e) => handleCheckboxChange('allergies', allergy, e?.target?.checked)}
                  disabled={!isEditing}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Ayurvedic Constitution */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-heading font-medium text-base text-foreground mb-4 flex items-center">
              <Icon name="Leaf" size={18} className="mr-2 text-primary" />
              Ayurvedic Constitution (Prakriti)
            </h4>
            <div className="space-y-4">
              <Select
                label="Dominant Dosha"
                options={constitutionOptions}
                value={formData?.constitution}
                onChange={(value) => handleInputChange('constitution', value)}
                disabled={!isEditing}
                description="Based on assessment by Ayurvedic practitioner"
              />

              <Select
                label="Bowel Movement Pattern"
                options={bowelOptions}
                value={formData?.bowelMovements}
                onChange={(value) => handleInputChange('bowelMovements', value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Health Goals */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-heading font-medium text-base text-foreground mb-4 flex items-center">
              <Icon name="Target" size={18} className="mr-2 text-success" />
              Health Goals
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {healthGoalOptions?.map((goal) => (
                <Checkbox
                  key={goal}
                  label={goal}
                  checked={formData?.healthGoals?.includes(goal)}
                  onChange={(e) => handleCheckboxChange('healthGoals', goal, e?.target?.checked)}
                  disabled={!isEditing}
                />
              ))}
            </div>
          </div>

          {/* Digestive Issues */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-heading font-medium text-base text-foreground mb-4 flex items-center">
              <Icon name="Zap" size={18} className="mr-2 text-error" />
              Digestive Issues
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {digestiveIssueOptions?.map((issue) => (
                <Checkbox
                  key={issue}
                  label={issue}
                  checked={formData?.digestiveIssues?.includes(issue)}
                  onChange={(e) => handleCheckboxChange('digestiveIssues', issue, e?.target?.checked)}
                  disabled={!isEditing}
                />
              ))}
            </div>
          </div>

          {/* Current Medications */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-heading font-medium text-base text-foreground mb-4 flex items-center">
              <Icon name="Pill" size={18} className="mr-2 text-secondary" />
              Current Medications
            </h4>
            <Input
              label="Medications & Supplements"
              type="text"
              value={formData?.currentMedications}
              onChange={(e) => handleInputChange('currentMedications', e?.target?.value)}
              disabled={!isEditing}
              placeholder="List current medications, supplements, or herbal remedies"
              description="Include dosage and frequency if known"
            />
          </div>
        </div>
      </div>
      {/* Assessment Summary */}
      <div className="bg-muted rounded-lg p-6">
        <h4 className="font-heading font-medium text-base text-foreground mb-4 flex items-center">
          <Icon name="FileText" size={18} className="mr-2 text-primary" />
          Assessment Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-body font-medium text-foreground">Constitution:</p>
            <p className="font-caption text-muted-foreground capitalize">
              {formData?.constitution?.replace('-', ' & ')}
            </p>
          </div>
          <div>
            <p className="font-body font-medium text-foreground">Primary Goals:</p>
            <p className="font-caption text-muted-foreground">
              {formData?.healthGoals?.slice(0, 2)?.join(', ') || 'Not specified'}
            </p>
          </div>
          <div>
            <p className="font-body font-medium text-foreground">Key Concerns:</p>
            <p className="font-caption text-muted-foreground">
              {formData?.digestiveIssues?.slice(0, 2)?.join(', ') || 'None reported'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeFormTab;