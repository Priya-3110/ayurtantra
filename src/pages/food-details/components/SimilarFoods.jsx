import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarFoods = ({ currentFood, onFoodSelect }) => {
  const [activeCategory, setActiveCategory] = useState('nutritional');

  const similarFoods = {
    nutritional: [
      {
        id: 'spinach-2',
        name: 'Baby Spinach',
        image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg',
        calories: 23,
        protein: 2.9,
        similarity: 95,
        reason: 'Similar iron and vitamin content'
      },
      {
        id: 'kale-1',
        name: 'Kale',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        calories: 35,
        protein: 2.2,
        similarity: 88,
        reason: 'High in vitamins A, C, and K'
      },
      {
        id: 'swiss-chard',
        name: 'Swiss Chard',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        calories: 19,
        protein: 1.8,
        similarity: 82,
        reason: 'Similar mineral profile'
      },
      {
        id: 'arugula',
        name: 'Arugula',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        calories: 25,
        protein: 2.6,
        similarity: 78,
        reason: 'Comparable antioxidant levels'
      }
    ],
    ayurvedic: [
      {
        id: 'methi-leaves',
        name: 'Fenugreek Leaves (Methi)',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        thermal: 'Hot',
        digestibility: 'Easy',
        similarity: 92,
        reason: 'Similar cooling properties and easy digestion'
      },
      {
        id: 'amaranth-leaves',
        name: 'Amaranth Leaves (Chaulai)',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        thermal: 'Cold',
        digestibility: 'Easy',
        similarity: 89,
        reason: 'Same thermal nature and dosha effects'
      },
      {
        id: 'bathua',
        name: 'Chenopodium (Bathua)',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        thermal: 'Cold',
        digestibility: 'Easy',
        similarity: 85,
        reason: 'Similar Pitta-pacifying properties'
      },
      {
        id: 'mint-leaves',
        name: 'Mint Leaves (Pudina)',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        thermal: 'Cold',
        digestibility: 'Easy',
        similarity: 80,
        reason: 'Cooling nature, good for Pitta'
      }
    ],
    seasonal: [
      {
        id: 'bottle-gourd',
        name: 'Bottle Gourd (Lauki)',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        season: 'Summer',
        availability: 'Peak',
        similarity: 87,
        reason: 'Available in same season, cooling properties'
      },
      {
        id: 'ridge-gourd',
        name: 'Ridge Gourd (Turai)',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        season: 'Summer',
        availability: 'Peak',
        similarity: 84,
        reason: 'Summer vegetable with similar benefits'
      },
      {
        id: 'cucumber',
        name: 'Cucumber (Kheera)',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        season: 'Summer',
        availability: 'Peak',
        similarity: 81,
        reason: 'High water content, cooling effect'
      },
      {
        id: 'ash-gourd',
        name: 'Ash Gourd (Petha)',
        image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg',
        season: 'Summer',
        availability: 'Good',
        similarity: 78,
        reason: 'Seasonal availability and cooling nature'
      }
    ]
  };

  const categories = [
    { id: 'nutritional', label: 'Nutritionally Similar', icon: 'BarChart3' },
    { id: 'ayurvedic', label: 'Ayurvedic Properties', icon: 'Leaf' },
    { id: 'seasonal', label: 'Seasonal Alternatives', icon: 'Calendar' }
  ];

  const handleFoodClick = (food) => {
    onFoodSelect(food);
  };

  const renderNutritionalCard = (food) => (
    <div
      key={food?.id}
      className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors duration-200 cursor-pointer"
      onClick={() => handleFoodClick(food)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
          <Image
            src={food?.image}
            alt={food?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-body font-medium text-foreground truncate">
              {food?.name}
            </h4>
            <div className="flex items-center space-x-1 ml-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="font-data text-xs text-primary">
                {food?.similarity}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-2">
            <span className="font-data text-sm text-foreground">
              {food?.calories} kcal
            </span>
            <span className="font-data text-sm text-foreground">
              {food?.protein}g protein
            </span>
          </div>
          
          <p className="font-caption text-xs text-muted-foreground">
            {food?.reason}
          </p>
        </div>
        
        <Icon name="ArrowRight" size={16} className="text-muted-foreground flex-shrink-0" />
      </div>
    </div>
  );

  const renderAyurvedicCard = (food) => (
    <div
      key={food?.id}
      className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors duration-200 cursor-pointer"
      onClick={() => handleFoodClick(food)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
          <Image
            src={food?.image}
            alt={food?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-body font-medium text-foreground truncate">
              {food?.name}
            </h4>
            <div className="flex items-center space-x-1 ml-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="font-data text-xs text-primary">
                {food?.similarity}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-caption ${
              food?.thermal === 'Hot' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {food?.thermal}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-caption">
              {food?.digestibility}
            </span>
          </div>
          
          <p className="font-caption text-xs text-muted-foreground">
            {food?.reason}
          </p>
        </div>
        
        <Icon name="ArrowRight" size={16} className="text-muted-foreground flex-shrink-0" />
      </div>
    </div>
  );

  const renderSeasonalCard = (food) => (
    <div
      key={food?.id}
      className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors duration-200 cursor-pointer"
      onClick={() => handleFoodClick(food)}
    >
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
          <Image
            src={food?.image}
            alt={food?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-body font-medium text-foreground truncate">
              {food?.name}
            </h4>
            <div className="flex items-center space-x-1 ml-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="font-data text-xs text-primary">
                {food?.similarity}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mb-2">
            <span className="px-2 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-caption">
              {food?.season}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-caption ${
              food?.availability === 'Peak' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {food?.availability}
            </span>
          </div>
          
          <p className="font-caption text-xs text-muted-foreground">
            {food?.reason}
          </p>
        </div>
        
        <Icon name="ArrowRight" size={16} className="text-muted-foreground flex-shrink-0" />
      </div>
    </div>
  );

  const renderFoodCards = () => {
    const foods = similarFoods?.[activeCategory];
    
    switch (activeCategory) {
      case 'nutritional':
        return foods?.map(renderNutritionalCard);
      case 'ayurvedic':
        return foods?.map(renderAyurvedicCard);
      case 'seasonal':
        return foods?.map(renderSeasonalCard);
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground">
          Similar Foods & Alternatives
        </h2>
        <Button variant="outline" size="sm" iconName="Search" iconPosition="left">
          Browse All
        </Button>
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveCategory(category?.id)}
            iconName={category?.icon}
            iconPosition="left"
            className="mb-2"
          >
            {category?.label}
          </Button>
        ))}
      </div>
      {/* Food Cards */}
      <div className="space-y-4">
        {renderFoodCards()}
      </div>
      {/* View More */}
      <div className="mt-6 text-center">
        <Button variant="outline" iconName="Plus" iconPosition="left">
          View More Similar Foods
        </Button>
      </div>
    </div>
  );
};

export default SimilarFoods;