import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreparationGuide = ({ preparationData }) => {
  const [activeMethod, setActiveMethod] = useState(0);

  const preparationMethods = [
    {
      name: 'Raw Consumption',
      description: 'Best consumed fresh and uncooked to retain maximum nutrients',
      steps: [
        'Wash thoroughly under running water',
        'Remove any damaged or bruised parts',
        'Cut into desired size just before consumption',
        'Consume immediately for best taste and nutrition'
      ],
      ayurvedicNotes: 'Raw consumption increases Vata dosha. Best for Pitta constitution during hot weather.',
      icon: 'Apple',
      suitable: preparationData?.methods?.includes('raw')
    },
    {
      name: 'Steaming',
      description: 'Gentle cooking method that preserves nutrients and enhances digestibility',
      steps: [
        'Clean and cut the food item appropriately',
        'Place in steamer basket over boiling water',
        'Steam for 5-8 minutes until tender',
        'Season with rock salt and ghee if desired'
      ],
      ayurvedicNotes: 'Steaming makes food easier to digest while maintaining its natural properties.',
      icon: 'Flame',
      suitable: preparationData?.methods?.includes('steamed')
    },
    {
      name: 'Sautéing',
      description: 'Quick cooking with minimal oil to enhance flavor and digestibility',
      steps: [
        'Heat ghee or coconut oil in a pan',
        'Add cumin seeds and let them splutter',
        'Add the food item and sauté for 3-5 minutes',
        'Season with turmeric, salt, and herbs'
      ],
      ayurvedicNotes: 'Sautéing with spices improves digestive fire and reduces Vata.',
      icon: 'ChefHat',
      suitable: preparationData?.methods?.includes('sauteed')
    },
    {
      name: 'Boiling',
      description: 'Traditional method for making easily digestible preparations',
      steps: [
        'Bring water to boil in a heavy-bottomed pot',
        'Add the food item and reduce heat',
        'Cook until tender (timing varies by item)',
        'Drain excess water and season as needed'
      ],
      ayurvedicNotes: 'Boiling makes food very easy to digest, suitable for weak digestion.',
      icon: 'Droplets',
      suitable: preparationData?.methods?.includes('boiled')
    }
  ];

  const compatibleSpices = [
    { name: 'Turmeric', benefit: 'Anti-inflammatory, aids digestion', icon: 'Zap' },
    { name: 'Cumin', benefit: 'Improves digestive fire, reduces gas', icon: 'Flame' },
    { name: 'Coriander', benefit: 'Cooling, balances all doshas', icon: 'Leaf' },
    { name: 'Ginger', benefit: 'Stimulates digestion, reduces nausea', icon: 'Zap' },
    { name: 'Black Pepper', benefit: 'Enhances nutrient absorption', icon: 'Circle' },
    { name: 'Cardamom', benefit: 'Aromatic, aids respiratory health', icon: 'Heart' }
  ];

  const timingRecommendations = [
    {
      time: 'Morning (6-10 AM)',
      recommendation: preparationData?.timing?.morning,
      description: 'Kapha time - heavy, slow digestion',
      icon: 'Sunrise'
    },
    {
      time: 'Midday (10 AM-2 PM)',
      recommendation: preparationData?.timing?.midday,
      description: 'Pitta time - strongest digestive fire',
      icon: 'Sun'
    },
    {
      time: 'Evening (2-6 PM)',
      recommendation: preparationData?.timing?.evening,
      description: 'Vata time - light, quick digestion',
      icon: 'Sunset'
    },
    {
      time: 'Night (6-10 PM)',
      recommendation: preparationData?.timing?.night,
      description: 'Kapha time - avoid heavy foods',
      icon: 'Moon'
    }
  ];

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'avoid': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRecommendationIcon = (recommendation) => {
    switch (recommendation) {
      case 'excellent': return 'CheckCircle';
      case 'good': return 'Check';
      case 'moderate': return 'AlertCircle';
      case 'avoid': return 'X';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground">
          Preparation Guide & Recommendations
        </h2>
        <Button variant="outline" size="sm" iconName="BookOpen" iconPosition="left">
          View Recipes
        </Button>
      </div>
      <div className="space-y-8">
        {/* Preparation Methods */}
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-4">
            Preparation Methods
          </h3>
          
          {/* Method Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {preparationMethods?.map((method, index) => (
              <Button
                key={index}
                variant={activeMethod === index ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMethod(index)}
                iconName={method?.icon}
                iconPosition="left"
                disabled={!method?.suitable}
                className={!method?.suitable ? 'opacity-50' : ''}
              >
                {method?.name}
              </Button>
            ))}
          </div>

          {/* Active Method Details */}
          {preparationMethods?.[activeMethod] && (
            <div className="bg-muted rounded-lg p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={preparationMethods?.[activeMethod]?.icon} size={24} color="white" />
                </div>
                <div>
                  <h4 className="font-heading font-medium text-lg text-foreground mb-2">
                    {preparationMethods?.[activeMethod]?.name}
                  </h4>
                  <p className="font-body text-muted-foreground">
                    {preparationMethods?.[activeMethod]?.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-body font-medium text-foreground mb-3">
                    Preparation Steps
                  </h5>
                  <ol className="space-y-2">
                    {preparationMethods?.[activeMethod]?.steps?.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="font-body text-sm text-foreground">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h5 className="font-body font-medium text-foreground mb-3">
                    Ayurvedic Notes
                  </h5>
                  <div className="bg-accent/20 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Icon name="Info" size={16} className="text-accent-foreground mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-foreground">
                        {preparationMethods?.[activeMethod]?.ayurvedicNotes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Compatible Spices */}
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-4">
            Compatible Spices & Herbs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatibleSpices?.map((spice, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon name={spice?.icon} size={20} className="text-primary" />
                  <span className="font-body font-medium text-foreground">
                    {spice?.name}
                  </span>
                </div>
                <p className="font-caption text-sm text-muted-foreground">
                  {spice?.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timing Recommendations */}
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-4">
            Best Time to Consume
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {timingRecommendations?.map((timing, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name={timing?.icon} size={20} className="text-primary" />
                  <span className="font-body font-medium text-foreground text-sm">
                    {timing?.time}
                  </span>
                </div>
                
                <div className={`flex items-center space-x-2 p-2 rounded-md mb-2 ${getRecommendationColor(timing?.recommendation)}`}>
                  <Icon 
                    name={getRecommendationIcon(timing?.recommendation)} 
                    size={16} 
                  />
                  <span className="font-caption text-sm capitalize font-medium">
                    {timing?.recommendation}
                  </span>
                </div>
                
                <p className="font-caption text-xs text-muted-foreground">
                  {timing?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Instructions */}
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-4">
            Storage & Shelf Life
          </h3>
          <div className="bg-muted rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-body font-medium text-foreground mb-3">
                  Storage Instructions
                </h4>
                <ul className="space-y-2">
                  {preparationData?.storage?.instructions?.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-foreground">
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-body font-medium text-foreground mb-3">
                  Shelf Life
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground">
                      Room Temperature
                    </span>
                    <span className="font-data text-sm text-foreground">
                      {preparationData?.storage?.roomTemp}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground">
                      Refrigerated
                    </span>
                    <span className="font-data text-sm text-foreground">
                      {preparationData?.storage?.refrigerated}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm text-foreground">
                      Frozen
                    </span>
                    <span className="font-data text-sm text-foreground">
                      {preparationData?.storage?.frozen}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationGuide;