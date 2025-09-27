import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CurrentDietTab = ({ patient, onNavigate }) => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  const currentDietPlan = {
    id: 'diet-001',
    name: 'Vata-Pitta Balancing Diet',
    createdDate: '2024-01-20',
    duration: '3 months',
    status: 'active',
    compliance: 78,
    totalCalories: 1850,
    targetCalories: 1900,
    meals: {
      breakfast: {
        time: '7:00 AM - 8:00 AM',
        items: [
          {
            name: 'Oats Porridge with Almonds',
            quantity: '1 bowl (150g)',
            calories: 320,
            properties: 'Warm, Easy to digest',
            rasa: 'Sweet, Astringent'
          },
          {
            name: 'Fresh Seasonal Fruits',
            quantity: '1 medium (100g)',
            calories: 80,
            properties: 'Cool, Light',
            rasa: 'Sweet, Sour'
          },
          {
            name: 'Herbal Tea (Ginger-Tulsi)',
            quantity: '1 cup (200ml)',
            calories: 5,
            properties: 'Warm, Digestive',
            rasa: 'Pungent, Bitter'
          }
        ],
        totalCalories: 405,
        compliance: 85
      },
      lunch: {
        time: '12:30 PM - 1:30 PM',
        items: [
          {
            name: 'Brown Rice',
            quantity: '1 cup (150g)',
            calories: 220,
            properties: 'Warm, Grounding',
            rasa: 'Sweet'
          },
          {
            name: 'Dal (Moong)',
            quantity: '1 bowl (100g)',
            calories: 180,
            properties: 'Warm, Easy to digest',
            rasa: 'Sweet, Astringent'
          },
          {
            name: 'Mixed Vegetable Curry',
            quantity: '1 bowl (150g)',
            calories: 150,
            properties: 'Warm, Nourishing',
            rasa: 'Sweet, Pungent'
          },
          {
            name: 'Buttermilk',
            quantity: '1 glass (200ml)',
            calories: 60,
            properties: 'Cool, Digestive',
            rasa: 'Sour, Salty'
          }
        ],
        totalCalories: 610,
        compliance: 75
      },
      snack: {
        time: '4:00 PM - 5:00 PM',
        items: [
          {
            name: 'Roasted Nuts Mix',
            quantity: '1 handful (30g)',
            calories: 180,
            properties: 'Warm, Heavy',
            rasa: 'Sweet, Astringent'
          },
          {
            name: 'Green Tea',
            quantity: '1 cup (200ml)',
            calories: 2,
            properties: 'Warm, Light',
            rasa: 'Bitter, Astringent'
          }
        ],
        totalCalories: 182,
        compliance: 70
      },
      dinner: {
        time: '7:00 PM - 8:00 PM',
        items: [
          {
            name: 'Quinoa Khichdi',
            quantity: '1 bowl (200g)',
            calories: 280,
            properties: 'Warm, Light',
            rasa: 'Sweet, Astringent'
          },
          {
            name: 'Steamed Vegetables',
            quantity: '1 bowl (150g)',
            calories: 100,
            properties: 'Warm, Light',
            rasa: 'Sweet, Bitter'
          },
          {
            name: 'Cucumber Raita',
            quantity: '1 small bowl (100g)',
            calories: 50,
            properties: 'Cool, Light',
            rasa: 'Sweet, Astringent'
          }
        ],
        totalCalories: 430,
        compliance: 80
      }
    },
    weeklyProgress: [
      { day: 'Mon', compliance: 85, calories: 1820 },
      { day: 'Tue', compliance: 75, calories: 1750 },
      { day: 'Wed', compliance: 80, calories: 1880 },
      { day: 'Thu', compliance: 70, calories: 1650 },
      { day: 'Fri', compliance: 85, calories: 1900 },
      { day: 'Sat', compliance: 90, calories: 1950 },
      { day: 'Sun', compliance: 75, calories: 1780 }
    ],
    nutrients: {
      carbs: { current: 245, target: 250, unit: 'g' },
      protein: { current: 85, target: 90, unit: 'g' },
      fat: { current: 62, target: 65, unit: 'g' },
      fiber: { current: 28, target: 30, unit: 'g' }
    }
  };

  const mealTabs = [
    { id: 'breakfast', label: 'Breakfast', icon: 'Sunrise' },
    { id: 'lunch', label: 'Lunch', icon: 'Sun' },
    { id: 'snack', label: 'Snack', icon: 'Coffee' },
    { id: 'dinner', label: 'Dinner', icon: 'Moon' }
  ];

  const getComplianceColor = (compliance) => {
    if (compliance >= 80) return 'text-success';
    if (compliance >= 60) return 'text-warning';
    return 'text-error';
  };

  const getComplianceBg = (compliance) => {
    if (compliance >= 80) return 'bg-success';
    if (compliance >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getNutrientProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Current Diet Plan
          </h3>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Active meal plan and nutrition tracking
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('/diet-chart-generator')}
            iconName="Edit"
            iconPosition="left"
          >
            Modify Plan
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            New Plan
          </Button>
        </div>
      </div>
      {/* Diet Plan Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan Details */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-heading font-medium text-base text-foreground">
                {currentDietPlan?.name}
              </h4>
              <p className="font-caption text-xs text-muted-foreground">
                Created on {new Date(currentDietPlan.createdDate)?.toLocaleDateString('en-IN')} • Duration: {currentDietPlan?.duration}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-success/10 text-success font-caption text-xs rounded-md">
                Active
              </span>
            </div>
          </div>

          {/* Progress Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${(currentDietPlan?.compliance / 100) * 175.93} 175.93`}
                    className={getComplianceColor(currentDietPlan?.compliance)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-data font-semibold text-sm text-foreground">
                    {currentDietPlan?.compliance}%
                  </span>
                </div>
              </div>
              <p className="font-caption text-xs text-muted-foreground">Compliance</p>
            </div>

            <div className="text-center">
              <p className="font-data font-semibold text-lg text-foreground">
                {currentDietPlan?.totalCalories}
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                of {currentDietPlan?.targetCalories} kcal
              </p>
            </div>

            <div className="text-center">
              <p className="font-data font-semibold text-lg text-foreground">
                4
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                Meals/Day
              </p>
            </div>

            <div className="text-center">
              <p className="font-data font-semibold text-lg text-foreground">
                21
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                Days Active
              </p>
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="mb-4">
            <h5 className="font-body font-medium text-sm text-foreground mb-3">
              Weekly Compliance
            </h5>
            <div className="flex items-end justify-between h-32 space-x-2">
              {currentDietPlan?.weeklyProgress?.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-muted rounded-t-md relative" style={{ height: '100px' }}>
                    <div
                      className={`absolute bottom-0 w-full rounded-t-md transition-all duration-300 ${getComplianceBg(day?.compliance)}`}
                      style={{ height: `${day?.compliance}%` }}
                    />
                  </div>
                  <span className="font-caption text-xs text-muted-foreground mt-2">
                    {day?.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nutrient Breakdown */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-heading font-medium text-base text-foreground mb-4">
            Daily Nutrients
          </h4>
          <div className="space-y-4">
            {Object.entries(currentDietPlan?.nutrients)?.map(([nutrient, data]) => (
              <div key={nutrient}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm text-foreground capitalize">
                    {nutrient}
                  </span>
                  <span className="font-data text-sm text-foreground">
                    {data?.current}/{data?.target}{data?.unit}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${getNutrientProgress(data?.current, data?.target)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Meal Details */}
      <div className="bg-card border border-border rounded-lg">
        {/* Meal Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0 overflow-x-auto">
            {mealTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setSelectedMeal(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-body font-medium text-sm border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  selectedMeal === tab?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-caption ${
                  selectedMeal === tab?.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentDietPlan?.meals?.[tab?.id]?.compliance}%
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Meal Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-heading font-medium text-base text-foreground capitalize">
                {selectedMeal} Plan
              </h4>
              <p className="font-caption text-xs text-muted-foreground">
                Recommended time: {currentDietPlan?.meals?.[selectedMeal]?.time}
              </p>
            </div>
            <div className="text-right">
              <p className="font-data font-semibold text-lg text-foreground">
                {currentDietPlan?.meals?.[selectedMeal]?.totalCalories} kcal
              </p>
              <p className={`font-caption text-xs ${getComplianceColor(currentDietPlan?.meals?.[selectedMeal]?.compliance)}`}>
                {currentDietPlan?.meals?.[selectedMeal]?.compliance}% compliance
              </p>
            </div>
          </div>

          {/* Food Items */}
          <div className="space-y-4">
            {currentDietPlan?.meals?.[selectedMeal]?.items?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <h5 className="font-body font-medium text-sm text-foreground">
                    {item?.name}
                  </h5>
                  <p className="font-caption text-xs text-muted-foreground mt-1">
                    Quantity: {item?.quantity}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary font-caption text-xs rounded-md">
                      {item?.properties}
                    </span>
                    <span className="px-2 py-1 bg-secondary/10 text-secondary font-caption text-xs rounded-md">
                      Rasa: {item?.rasa}
                    </span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-data font-semibold text-sm text-foreground">
                    {item?.calories} kcal
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Meal Notes */}
          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-accent mt-0.5" />
              <div>
                <p className="font-body font-medium text-sm text-foreground">
                  Ayurvedic Guidelines for {selectedMeal}
                </p>
                <p className="font-caption text-xs text-muted-foreground mt-1">
                  {selectedMeal === 'breakfast' && "Start with warm foods to kindle digestive fire. Avoid cold drinks and raw foods in the morning."}
                  {selectedMeal === 'lunch' && "Largest meal of the day when digestive fire is strongest. Include all six tastes for balance."}
                  {selectedMeal === 'snack' && "Light, warm foods preferred. Avoid heavy or cold snacks that may disturb dinner digestion."}
                  {selectedMeal === 'dinner' && "Light, easily digestible foods. Finish eating 3 hours before bedtime for proper digestion."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="outline"
          onClick={() => onNavigate('/diet-chart-generator')}
          iconName="Edit"
          iconPosition="left"
        >
          Modify Current Plan
        </Button>
        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
        >
          Download Diet Chart
        </Button>
        <Button
          variant="outline"
          iconName="Share"
          iconPosition="left"
        >
          Share with Patient
        </Button>
      </div>
    </div>
  );
};

export default CurrentDietTab;