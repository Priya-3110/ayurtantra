import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MealPlanning = ({ mealPlan, onMealPlanChange, onNext, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealSlot, setSelectedMealSlot] = useState('breakfast');
  const [draggedItem, setDraggedItem] = useState(null);

  const mealSlots = [
    {
      id: 'breakfast',
      name: 'Breakfast',
      time: '7:00 - 9:00 AM',
      icon: 'Sunrise',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'lunch',
      name: 'Lunch',
      time: '12:00 - 2:00 PM',
      icon: 'Sun',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'snack',
      name: 'Evening Snack',
      time: '4:00 - 6:00 PM',
      icon: 'Coffee',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'dinner',
      name: 'Dinner',
      time: '7:00 - 9:00 PM',
      icon: 'Moon',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const foodDatabase = [
    {
      id: 'food-1',
      name: 'Quinoa Khichdi',
      category: 'Grains',
      calories: 180,
      protein: 6,
      carbs: 32,
      fat: 3,
      ayurvedicProps: { taste: 'Sweet', energy: 'Cooling', effect: 'Easy to digest' },
      constitution: ['vata', 'pitta'],
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=150&h=150&fit=crop'
    },
    {
      id: 'food-2',
      name: 'Moong Dal Soup',
      category: 'Legumes',
      calories: 120,
      protein: 8,
      carbs: 18,
      fat: 2,
      ayurvedicProps: { taste: 'Sweet', energy: 'Cooling', effect: 'Light' },
      constitution: ['vata', 'pitta', 'kapha'],
      image: 'https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg?w=150&h=150&fit=crop'
    },
    {
      id: 'food-3',
      name: 'Steamed Vegetables',
      category: 'Vegetables',
      calories: 80,
      protein: 3,
      carbs: 15,
      fat: 1,
      ayurvedicProps: { taste: 'Sweet, Bitter', energy: 'Cooling', effect: 'Light' },
      constitution: ['pitta', 'kapha'],
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?w=150&h=150&fit=crop'
    },
    {
      id: 'food-4',
      name: 'Coconut Rice',
      category: 'Grains',
      calories: 220,
      protein: 4,
      carbs: 38,
      fat: 8,
      ayurvedicProps: { taste: 'Sweet', energy: 'Cooling', effect: 'Heavy' },
      constitution: ['vata', 'pitta'],
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?w=150&h=150&fit=crop'
    },
    {
      id: 'food-5',
      name: 'Ginger Tea',
      category: 'Beverages',
      calories: 25,
      protein: 0,
      carbs: 6,
      fat: 0,
      ayurvedicProps: { taste: 'Pungent', energy: 'Heating', effect: 'Light' },
      constitution: ['vata', 'kapha'],
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?w=150&h=150&fit=crop'
    },
    {
      id: 'food-6',
      name: 'Fresh Fruit Salad',
      category: 'Fruits',
      calories: 95,
      protein: 2,
      carbs: 24,
      fat: 0,
      ayurvedicProps: { taste: 'Sweet, Sour', energy: 'Cooling', effect: 'Light' },
      constitution: ['pitta'],
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=150&h=150&fit=crop'
    }
  ];

  const filteredFoods = foodDatabase?.filter(food =>
    food?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    food?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleDragStart = (e, food) => {
    setDraggedItem(food);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, mealSlotId) => {
    e?.preventDefault();
    if (draggedItem) {
      const updatedMealPlan = {
        ...mealPlan,
        [mealSlotId]: [...(mealPlan?.[mealSlotId] || []), draggedItem]
      };
      onMealPlanChange(updatedMealPlan);
      setDraggedItem(null);
    }
  };

  const handleRemoveFood = (mealSlotId, foodId) => {
    const updatedMealPlan = {
      ...mealPlan,
      [mealSlotId]: mealPlan?.[mealSlotId]?.filter(food => food?.id !== foodId)
    };
    onMealPlanChange(updatedMealPlan);
  };

  const handleAddFood = (food) => {
    const updatedMealPlan = {
      ...mealPlan,
      [selectedMealSlot]: [...(mealPlan?.[selectedMealSlot] || []), food]
    };
    onMealPlanChange(updatedMealPlan);
  };

  const getTotalNutrition = () => {
    let total = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    Object.values(mealPlan)?.forEach(foods => {
      foods?.forEach(food => {
        total.calories += food?.calories;
        total.protein += food?.protein;
        total.carbs += food?.carbs;
        total.fat += food?.fat;
      });
    });
    return total;
  };

  const totalNutrition = getTotalNutrition();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Meal Planning
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Drag and drop foods to create personalized meal plan
          </p>
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="UtensilsCrossed" size={24} className="text-primary" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Database */}
        <div className="lg:col-span-1">
          <div className="bg-muted rounded-lg p-4 h-full">
            <h3 className="font-heading font-medium text-lg text-foreground mb-4">
              Food Database
            </h3>
            
            {/* Search */}
            <div className="mb-4">
              <Input
                type="search"
                placeholder="Search foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
              />
            </div>

            {/* Meal Slot Selector */}
            <div className="mb-4">
              <label className="font-body text-sm text-foreground mb-2 block">
                Add to Meal:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {mealSlots?.map((slot) => (
                  <button
                    key={slot?.id}
                    onClick={() => setSelectedMealSlot(slot?.id)}
                    className={`
                      p-2 rounded-md text-xs font-medium transition-all duration-200
                      ${selectedMealSlot === slot?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-foreground hover:bg-primary/10'
                      }
                    `}
                  >
                    {slot?.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Items */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredFoods?.map((food) => (
                <div
                  key={food?.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, food)}
                  className="p-3 bg-background border border-border rounded-lg cursor-move hover:shadow-soft transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={food?.image}
                        alt={food?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-body font-medium text-sm text-foreground truncate">
                        {food?.name}
                      </h4>
                      <p className="font-caption text-xs text-muted-foreground">
                        {food?.calories} cal • {food?.category}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="inline-block w-2 h-2 bg-success rounded-full"></span>
                        <span className="font-caption text-xs text-muted-foreground">
                          {food?.ayurvedicProps?.taste}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAddFood(food)}
                      className="flex-shrink-0"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meal Slots */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {mealSlots?.map((slot) => (
              <div
                key={slot?.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, slot?.id)}
                className="bg-muted rounded-lg p-4 min-h-48"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 ${slot?.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon name={slot?.icon} size={16} className={slot?.color} />
                    </div>
                    <div>
                      <h4 className="font-body font-medium text-sm text-foreground">
                        {slot?.name}
                      </h4>
                      <p className="font-caption text-xs text-muted-foreground">
                        {slot?.time}
                      </p>
                    </div>
                  </div>
                  <span className="font-caption text-xs text-muted-foreground">
                    {(mealPlan?.[slot?.id] || [])?.reduce((sum, food) => sum + food?.calories, 0)} cal
                  </span>
                </div>

                <div className="space-y-2">
                  {(mealPlan?.[slot?.id] || [])?.map((food, index) => (
                    <div
                      key={`${food?.id}-${index}`}
                      className="flex items-center justify-between p-2 bg-background rounded-md border border-border"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-muted rounded overflow-hidden">
                          <img
                            src={food?.image}
                            alt={food?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-body text-xs text-foreground">
                            {food?.name}
                          </p>
                          <p className="font-caption text-xs text-muted-foreground">
                            {food?.calories} cal
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFood(slot?.id, food?.id)}
                        className="h-6 w-6"
                      >
                        <Icon name="X" size={12} />
                      </Button>
                    </div>
                  ))}
                  
                  {(mealPlan?.[slot?.id] || [])?.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
                      <Icon name="Plus" size={24} className="text-muted-foreground mx-auto mb-2" />
                      <p className="font-caption text-xs text-muted-foreground">
                        Drag foods here or click + to add
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Nutrition Summary */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-heading font-medium text-sm text-foreground mb-3">
              Daily Nutrition Summary
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="font-data text-lg font-semibold text-foreground">
                  {totalNutrition?.calories}
                </p>
                <p className="font-caption text-xs text-muted-foreground">Calories</p>
              </div>
              <div className="text-center">
                <p className="font-data text-lg font-semibold text-foreground">
                  {totalNutrition?.protein}g
                </p>
                <p className="font-caption text-xs text-muted-foreground">Protein</p>
              </div>
              <div className="text-center">
                <p className="font-data text-lg font-semibold text-foreground">
                  {totalNutrition?.carbs}g
                </p>
                <p className="font-caption text-xs text-muted-foreground">Carbs</p>
              </div>
              <div className="text-center">
                <p className="font-data text-lg font-semibold text-foreground">
                  {totalNutrition?.fat}g
                </p>
                <p className="font-caption text-xs text-muted-foreground">Fat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
        <Button
          variant="outline"
          onClick={onBack}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Customization
        </Button>
        <div className="flex items-center space-x-3">
          <Button variant="outline" iconName="Eye">
            Preview Chart
          </Button>
          <Button
            onClick={onNext}
            disabled={Object.keys(mealPlan)?.length === 0}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Generate Chart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanning;