import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AyurvedicProperties = ({ ayurvedicData }) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const thermalProperties = [
    { 
      name: 'Hot (Ushna)', 
      active: ayurvedicData?.thermal === 'hot',
      description: 'Increases body heat, improves digestion, suitable for Kapha constitution',
      color: 'text-red-600 bg-red-50'
    },
    { 
      name: 'Cold (Sheetal)', 
      active: ayurvedicData?.thermal === 'cold',
      description: 'Cooling effect, reduces inflammation, suitable for Pitta constitution',
      color: 'text-blue-600 bg-blue-50'
    },
    { 
      name: 'Neutral (Sama)', 
      active: ayurvedicData?.thermal === 'neutral',
      description: 'Balanced thermal effect, suitable for all constitutions',
      color: 'text-green-600 bg-green-50'
    }
  ];

  const digestibilityLevels = [
    { 
      level: 'Easy', 
      active: ayurvedicData?.digestibility === 'easy',
      description: 'Light, easily digestible, suitable for weak digestion',
      color: 'bg-green-100 text-green-800'
    },
    { 
      level: 'Moderate', 
      active: ayurvedicData?.digestibility === 'moderate',
      description: 'Moderately heavy, requires normal digestive fire',
      color: 'bg-yellow-100 text-yellow-800'
    },
    { 
      level: 'Heavy', 
      active: ayurvedicData?.digestibility === 'heavy',
      description: 'Heavy to digest, requires strong digestive fire',
      color: 'bg-red-100 text-red-800'
    }
  ];

  const sixTastes = [
    { 
      name: 'Sweet (Madhura)', 
      present: ayurvedicData?.tastes?.includes('sweet'),
      description: 'Nourishing, building, increases Kapha, decreases Vata and Pitta',
      icon: 'Heart',
      color: 'text-pink-600'
    },
    { 
      name: 'Sour (Amla)', 
      present: ayurvedicData?.tastes?.includes('sour'),
      description: 'Stimulating, increases Pitta and Kapha, decreases Vata',
      icon: 'Zap',
      color: 'text-yellow-600'
    },
    { 
      name: 'Salty (Lavana)', 
      present: ayurvedicData?.tastes?.includes('salty'),
      description: 'Heating, increases Pitta and Kapha, decreases Vata',
      icon: 'Droplets',
      color: 'text-blue-600'
    },
    { 
      name: 'Pungent (Tikta)', 
      present: ayurvedicData?.tastes?.includes('pungent'),
      description: 'Heating, increases Vata and Pitta, decreases Kapha',
      icon: 'Flame',
      color: 'text-red-600'
    },
    { 
      name: 'Bitter (Katu)', 
      present: ayurvedicData?.tastes?.includes('bitter'),
      description: 'Cooling, increases Vata, decreases Pitta and Kapha',
      icon: 'Leaf',
      color: 'text-green-600'
    },
    { 
      name: 'Astringent (Kashaya)', 
      present: ayurvedicData?.tastes?.includes('astringent'),
      description: 'Cooling, increases Vata, decreases Pitta and Kapha',
      icon: 'Shield',
      color: 'text-purple-600'
    }
  ];

  const doshaEffects = [
    {
      dosha: 'Vata',
      effect: ayurvedicData?.doshaEffects?.vata,
      description: 'Air and Space elements - governs movement and nervous system',
      icon: 'Wind',
      color: 'text-gray-600'
    },
    {
      dosha: 'Pitta',
      effect: ayurvedicData?.doshaEffects?.pitta,
      description: 'Fire and Water elements - governs metabolism and digestion',
      icon: 'Flame',
      color: 'text-orange-600'
    },
    {
      dosha: 'Kapha',
      effect: ayurvedicData?.doshaEffects?.kapha,
      description: 'Earth and Water elements - governs structure and immunity',
      icon: 'Mountain',
      color: 'text-green-600'
    }
  ];

  const getEffectIcon = (effect) => {
    switch (effect) {
      case 'increases': return 'TrendingUp';
      case 'decreases': return 'TrendingDown';
      case 'neutral': return 'Minus';
      default: return 'Minus';
    }
  };

  const getEffectColor = (effect) => {
    switch (effect) {
      case 'increases': return 'text-red-600';
      case 'decreases': return 'text-green-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground">
          Ayurvedic Properties
        </h2>
        <Button variant="outline" size="sm" iconName="Info" iconPosition="left">
          Learn More
        </Button>
      </div>
      <div className="space-y-8">
        {/* Thermal Properties */}
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-4">
            Thermal Nature (Virya)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {thermalProperties?.map((property, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  property?.active 
                    ? 'border-primary bg-primary/10' :'border-border bg-muted hover:border-primary/50'
                }`}
                onMouseEnter={() => setShowTooltip(`thermal-${index}`)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-body font-medium text-foreground">
                    {property?.name}
                  </span>
                  {property?.active && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                {showTooltip === `thermal-${index}` && (
                  <p className="font-caption text-xs text-muted-foreground mt-2">
                    {property?.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Digestibility */}
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-4">
            Digestibility (Guru-Laghu)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {digestibilityLevels?.map((level, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  level?.active 
                    ? 'border-primary bg-primary/10' :'border-border bg-muted hover:border-primary/50'
                }`}
                onMouseEnter={() => setShowTooltip(`digest-${index}`)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-body font-medium text-foreground">
                    {level?.level}
                  </span>
                  {level?.active && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
                {showTooltip === `digest-${index}` && (
                  <p className="font-caption text-xs text-muted-foreground mt-2">
                    {level?.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Six Tastes */}
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-4">
            Six Tastes (Shad Rasa)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sixTastes?.map((taste, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  taste?.present 
                    ? 'border-primary bg-primary/10' :'border-border bg-muted opacity-60'
                }`}
                onMouseEnter={() => setShowTooltip(`taste-${index}`)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={taste?.icon} 
                    size={20} 
                    className={taste?.present ? taste?.color : 'text-muted-foreground'} 
                  />
                  <div className="flex-1">
                    <span className="font-body font-medium text-foreground">
                      {taste?.name}
                    </span>
                    {taste?.present && (
                      <Icon name="Check" size={16} className="text-primary ml-2" />
                    )}
                  </div>
                </div>
                {showTooltip === `taste-${index}` && (
                  <p className="font-caption text-xs text-muted-foreground mt-2">
                    {taste?.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dosha Effects */}
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-4">
            Effects on Doshas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doshaEffects?.map((dosha, index) => (
              <div
                key={index}
                className="p-4 bg-muted rounded-lg border border-border"
                onMouseEnter={() => setShowTooltip(`dosha-${index}`)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={dosha?.icon} size={20} className={dosha?.color} />
                    <span className="font-body font-medium text-foreground">
                      {dosha?.dosha}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={getEffectIcon(dosha?.effect)} 
                      size={16} 
                      className={getEffectColor(dosha?.effect)} 
                    />
                    <span className={`font-caption text-sm capitalize ${getEffectColor(dosha?.effect)}`}>
                      {dosha?.effect}
                    </span>
                  </div>
                </div>
                {showTooltip === `dosha-${index}` && (
                  <p className="font-caption text-xs text-muted-foreground">
                    {dosha?.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Recommendations */}
        <div>
          <h3 className="font-heading font-medium text-lg text-foreground mb-4">
            Seasonal Recommendations
          </h3>
          <div className="bg-muted rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-body font-medium text-foreground mb-2">
                  Best Seasons
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ayurvedicData?.bestSeasons?.map((season, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/20 text-green-700  rounded-full text-sm font-caption"
                    >
                      {season}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-body font-medium text-foreground mb-2">
                  Avoid in Seasons
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ayurvedicData?.avoidSeasons?.map((season, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-destructive/20 text-green-700 rounded-full text-sm font-caption"
                    >
                      {season}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AyurvedicProperties;