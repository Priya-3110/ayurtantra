import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


const AyurvedicCustomization = ({ customization, onCustomizationChange, onNext, onBack }) => {
  const [constitution, setConstitution] = useState(customization?.constitution || '');
  const [season, setSeason] = useState(customization?.season || '');
  const [restrictions, setRestrictions] = useState(customization?.restrictions || []);

  const constitutionTypes = [
    {
      value: 'vata',
      label: 'Vata Dominant',
      description: 'Air & Space elements - Light, dry, cold, rough, mobile'
    },
    {
      value: 'pitta',
      label: 'Pitta Dominant',
      description: 'Fire & Water elements - Hot, sharp, light, oily, liquid'
    },
    {
      value: 'kapha',
      label: 'Kapha Dominant',
      description: 'Earth & Water elements - Heavy, slow, cool, oily, smooth'
    },
    {
      value: 'vata-pitta',
      label: 'Vata-Pitta',
      description: 'Dual constitution with variable characteristics'
    },
    {
      value: 'pitta-kapha',
      label: 'Pitta-Kapha',
      description: 'Dual constitution with moderate characteristics'
    },
    {
      value: 'vata-kapha',
      label: 'Vata-Kapha',
      description: 'Dual constitution with contrasting qualities'
    }
  ];

  const seasonalOptions = [
    {
      value: 'spring',
      label: 'Spring (Vasant)',
      description: 'Kapha season - Focus on light, warm foods'
    },
    {
      value: 'summer',
      label: 'Summer (Grishma)',
      description: 'Pitta season - Cooling, sweet foods recommended'
    },
    {
      value: 'monsoon',
      label: 'Monsoon (Varsha)',
      description: 'Vata season - Warm, dry, easily digestible foods'
    },
    {
      value: 'autumn',
      label: 'Autumn (Sharad)',
      description: 'Pitta-Vata transition - Balanced, nourishing foods'
    },
    {
      value: 'winter',
      label: 'Winter (Shishir)',
      description: 'Kapha season - Warm, heavy, oily foods'
    }
  ];

  const dietaryRestrictions = [
    {
      id: 'vegetarian',
      title: 'Vegetarian',
      description: 'No meat, fish, or poultry',
      icon: 'Leaf'
    },
    {
      id: 'vegan',
      title: 'Vegan',
      description: 'No animal products including dairy',
      icon: 'Sprout'
    },
    {
      id: 'gluten-free',
      title: 'Gluten-Free',
      description: 'No wheat, barley, rye, or oats',
      icon: 'Wheat'
    },
    {
      id: 'dairy-free',
      title: 'Dairy-Free',
      description: 'No milk, cheese, yogurt, or butter',
      icon: 'Milk'
    },
    {
      id: 'nut-free',
      title: 'Nut-Free',
      description: 'No tree nuts or peanuts',
      icon: 'Nut'
    },
    {
      id: 'low-sodium',
      title: 'Low Sodium',
      description: 'Reduced salt intake',
      icon: 'Droplets'
    }
  ];

  const handleRestrictionToggle = (restrictionId) => {
    const updatedRestrictions = restrictions?.includes(restrictionId)
      ? restrictions?.filter(id => id !== restrictionId)
      : [...restrictions, restrictionId];
    setRestrictions(updatedRestrictions);
    onCustomizationChange({
      ...customization,
      restrictions: updatedRestrictions
    });
  };

  const handleConstitutionChange = (value) => {
    setConstitution(value);
    onCustomizationChange({
      ...customization,
      constitution: value
    });
  };

  const handleSeasonChange = (value) => {
    setSeason(value);
    onCustomizationChange({
      ...customization,
      season: value
    });
  };

  const getConstitutionRecommendations = () => {
    const recommendations = {
      vata: {
        foods: ['Warm, cooked foods', 'Sweet, sour, salty tastes', 'Ghee and oils', 'Root vegetables'],
        avoid: ['Cold, raw foods', 'Bitter, pungent, astringent tastes', 'Excessive caffeine']
      },
      pitta: {
        foods: ['Cool, refreshing foods', 'Sweet, bitter, astringent tastes', 'Fresh fruits', 'Leafy greens'],
        avoid: ['Spicy, hot foods', 'Sour, salty, pungent tastes', 'Excessive heat']
      },
      kapha: {
        foods: ['Light, warm foods', 'Pungent, bitter, astringent tastes', 'Spices', 'Steamed vegetables'],
        avoid: ['Heavy, oily foods', 'Sweet, sour, salty tastes', 'Dairy products']
      }
    };
    return recommendations?.[constitution?.split('-')?.[0]] || null;
  };

  const recommendations = getConstitutionRecommendations();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Ayurvedic Customization
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Personalize based on constitution, season, and dietary preferences
          </p>
        </div>
        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
          <Icon name="Flower" size={24} className="text-secondary" />
        </div>
      </div>
      {/* Constitution Selection */}
      <div className="mb-8">
        <h3 className="font-heading font-medium text-lg text-foreground mb-4">
          Ayurvedic Constitution (Prakriti)
        </h3>
        <Select
          label="Patient's Constitution Type"
          placeholder="Select constitution type"
          options={constitutionTypes}
          value={constitution}
          onChange={handleConstitutionChange}
          description="Based on patient assessment and consultation"
        />

        {/* Constitution Recommendations */}
        {recommendations && (
          <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
            <h4 className="font-heading font-medium text-sm text-foreground mb-3">
              Constitution-Based Recommendations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-body font-medium text-xs text-success mb-2 flex items-center">
                  <Icon name="CheckCircle" size={14} className="mr-1" />
                  Recommended Foods
                </h5>
                <ul className="space-y-1">
                  {recommendations?.foods?.map((food, index) => (
                    <li key={index} className="font-caption text-xs text-muted-foreground">
                      • {food}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-body font-medium text-xs text-error mb-2 flex items-center">
                  <Icon name="XCircle" size={14} className="mr-1" />
                  Foods to Avoid
                </h5>
                <ul className="space-y-1">
                  {recommendations?.avoid?.map((food, index) => (
                    <li key={index} className="font-caption text-xs text-muted-foreground">
                      • {food}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Seasonal Adjustments */}
      <div className="mb-8">
        <h3 className="font-heading font-medium text-lg text-foreground mb-4">
          Seasonal Considerations
        </h3>
        <Select
          label="Current Season"
          placeholder="Select current season"
          options={seasonalOptions}
          value={season}
          onChange={handleSeasonChange}
          description="Adjust recommendations based on seasonal influences"
        />
      </div>
      {/* Dietary Restrictions */}
      <div className="mb-8">
        <h3 className="font-heading font-medium text-lg text-foreground mb-4">
          Dietary Restrictions & Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dietaryRestrictions?.map((restriction) => (
            <button
              key={restriction?.id}
              onClick={() => handleRestrictionToggle(restriction?.id)}
              className={`
                p-4 border rounded-lg text-left transition-all duration-200 hover:shadow-soft
                ${restrictions?.includes(restriction?.id)
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={restriction?.icon} size={20} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-body font-medium text-sm text-foreground">
                      {restriction?.title}
                    </h4>
                    {restrictions?.includes(restriction?.id) && (
                      <Icon name="CheckCircle" size={16} className="text-primary" />
                    )}
                  </div>
                  <p className="font-caption text-xs text-muted-foreground mt-1">
                    {restriction?.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Compatibility Check */}
      <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Shield" size={16} className="text-success" />
          <h4 className="font-heading font-medium text-sm text-success">
            Compatibility Check
          </h4>
        </div>
        <p className="font-caption text-xs text-muted-foreground">
          All selected preferences are compatible with Ayurvedic principles. 
          The diet plan will automatically filter foods based on your selections.
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Goals
        </Button>
        <Button
          onClick={onNext}
          disabled={!constitution}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Meal Planning
        </Button>
      </div>
    </div>
  );
};

export default AyurvedicCustomization;