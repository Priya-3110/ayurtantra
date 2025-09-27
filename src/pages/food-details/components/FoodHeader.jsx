import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FoodHeader = ({ foodItem, onPortionChange, onAddToDietPlan }) => {
  const [selectedPortion, setSelectedPortion] = useState(foodItem?.defaultPortion);
  const [isFavorite, setIsFavorite] = useState(false);

  const portionOptions = [
    { value: '50g', label: '50g (Small portion)' },
    { value: '100g', label: '100g (Standard portion)' },
    { value: '150g', label: '150g (Large portion)' },
    { value: '200g', label: '200g (Extra large)' },
    { value: '1 cup', label: '1 cup (240ml)' },
    { value: '1 bowl', label: '1 bowl (300ml)' }
  ];

  const handlePortionChange = (value) => {
    setSelectedPortion(value);
    onPortionChange(value);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Food Image */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-48 h-48 rounded-lg overflow-hidden bg-muted">
            <Image
              src={foodItem?.image}
              alt={foodItem?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Food Information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="font-heading font-semibold text-2xl lg:text-3xl text-foreground mb-2">
                {foodItem?.name}
              </h1>
              <p className="font-body text-muted-foreground mb-2">
                {foodItem?.scientificName}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {foodItem?.categories?.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm font-caption"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                className={isFavorite ? 'text-warning' : 'text-muted-foreground'}
              >
                <Icon name={isFavorite ? "Heart" : "Heart"} size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Share2" size={20} />
              </Button>
            </div>
          </div>

          {/* Portion Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Select
                label="Portion Size"
                options={portionOptions}
                value={selectedPortion}
                onChange={handlePortionChange}
                className="w-full"
              />
            </div>
            <div className="flex items-end">
              <div className="bg-muted rounded-lg p-3 w-full">
                <p className="font-caption text-xs text-muted-foreground mb-1">
                  Calories per portion
                </p>
                <p className="font-heading font-semibold text-lg text-foreground">
                  {foodItem?.caloriesPerPortion} kcal
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="font-data font-medium text-lg text-foreground">
                {foodItem?.protein}g
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                Protein
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="font-data font-medium text-lg text-foreground">
                {foodItem?.carbs}g
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                Carbs
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="font-data font-medium text-lg text-foreground">
                {foodItem?.fat}g
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                Fat
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="font-data font-medium text-lg text-foreground">
                {foodItem?.fiber}g
              </p>
              <p className="font-caption text-xs text-muted-foreground">
                Fiber
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="default"
              onClick={onAddToDietPlan}
              iconName="Plus"
              iconPosition="left"
            >
              Add to Diet Plan
            </Button>
            <Button variant="outline" iconName="Calculator" iconPosition="left">
              Compare Foods
            </Button>
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodHeader;