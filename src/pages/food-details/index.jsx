import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FoodHeader from './components/FoodHeader';
import NutritionalBreakdown from './components/NutritionalBreakdown';
import AyurvedicProperties from './components/AyurvedicProperties';
import PreparationGuide from './components/PreparationGuide';
import SimilarFoods from './components/SimilarFoods';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const FoodDetails = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPortion, setSelectedPortion] = useState('100g');
  const [showAddToDietModal, setShowAddToDietModal] = useState(false);

  // Mock food data - in real app, this would come from API or route params
  const foodData = {
    id: 'spinach-1',
    name: 'Spinach (Palak)',
    scientificName: 'Spinacia oleracea',
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg',
    categories: ['Leafy Greens', 'Vegetables', 'Iron-Rich Foods'],
    defaultPortion: '100g',
    caloriesPerPortion: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    
    // Detailed nutritional data
    nutritionalData: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      sugars: 0.4,
      saturatedFat: 0.1,
      cholesterol: 0,
      water: 91.4,
      glycemicIndex: 15,
      antioxidants: 'High',
      
      // Vitamins
      vitaminA: 469,
      vitaminC: 28.1,
      vitaminD: 0,
      vitaminE: 2.0,
      vitaminK: 483,
      thiamine: 0.08,
      riboflavin: 0.19,
      niacin: 0.72,
      folate: 194,
      
      // Minerals
      calcium: 99,
      iron: 2.7,
      magnesium: 79,
      phosphorus: 49,
      potassium: 558,
      sodium: 79,
      zinc: 0.5,
      copper: 0.1
    },
    
    // Ayurvedic properties
    ayurvedicProperties: {
      thermal: 'cold',
      digestibility: 'easy',
      tastes: ['bitter', 'astringent'],
      doshaEffects: {
        vata: 'increases',
        pitta: 'decreases',
        kapha: 'decreases'
      },
      bestSeasons: ['Summer', 'Spring'],
      avoidSeasons: ['Winter', 'Monsoon']
    },
    
    // Preparation data
    preparationData: {
      methods: ['raw', 'steamed', 'sauteed', 'boiled'],
      timing: {
        morning: 'good',
        midday: 'excellent',
        evening: 'moderate',
        night: 'avoid'
      },
      storage: {
        instructions: [
          'Store in refrigerator at 32-36°F (0-2°C)',
          'Keep in perforated plastic bags to maintain humidity',
          'Do not wash before storing',
          'Remove damaged leaves before storage',
          'Use within 3-7 days for best quality'
        ],
        roomTemp: '1-2 days',
        refrigerated: '5-7 days',
        frozen: '10-12 months'
      }
    }
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handlePortionChange = (newPortion) => {
    setSelectedPortion(newPortion);
    // In real app, recalculate all nutritional values based on portion
  };

  const handleAddToDietPlan = () => {
    setShowAddToDietModal(true);
  };

  const handleFoodSelect = (food) => {
    // In real app, navigate to the selected food's detail page console.log('Selected food:', food);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location?.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
        isMobileOpen={mobileMenuOpen}
        onMobileClose={handleMobileMenuClose}
      />
      {/* Header */}
      <Header
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={handleMobileMenuToggle}
      />
      {/* Main Content */}
      <main
        className={`transition-all duration-300 ease-out pt-16 min-h-screen ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}
      >
        <div className="p-6 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <span className="font-body">Food Database</span>
            <Icon name="ChevronRight" size={16} />
            <span className="font-body">Leafy Greens</span>
            <Icon name="ChevronRight" size={16} />
            <span className="font-body text-foreground">{foodData?.name}</span>
          </nav>

          {/* Food Header */}
          <FoodHeader
            foodItem={foodData}
            onPortionChange={handlePortionChange}
            onAddToDietPlan={handleAddToDietPlan}
          />

          {/* Nutritional Breakdown */}
          <NutritionalBreakdown
            nutritionData={foodData?.nutritionalData}
            portion={selectedPortion}
          />

          {/* Ayurvedic Properties */}
          <AyurvedicProperties
            ayurvedicData={foodData?.ayurvedicProperties}
          />

          {/* Preparation Guide */}
          <PreparationGuide
            preparationData={foodData?.preparationData}
          />

          {/* Similar Foods */}
          <SimilarFoods
            currentFood={foodData}
            onFoodSelect={handleFoodSelect}
          />

          {/* Action Bar */}
          <div className="sticky bottom-6 bg-card border border-border rounded-lg p-4 shadow-soft-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="font-data font-semibold text-lg text-foreground">
                    {foodData?.caloriesPerPortion}
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    kcal per {selectedPortion}
                  </p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="font-data font-semibold text-lg text-foreground">
                    {foodData?.protein}g
                  </p>
                  <p className="font-caption text-xs text-muted-foreground">
                    Protein
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Heart"
                  iconPosition="left"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Share2"
                  iconPosition="left"
                >
                  Share
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleAddToDietPlan}
                >
                  Add to Diet Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Add to Diet Plan Modal */}
      {showAddToDietModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Add to Diet Plan
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddToDietModal(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-background">
                  <img
                    src={foodData?.image}
                    alt={foodData?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground">
                    {foodData?.name}
                  </p>
                  <p className="font-caption text-sm text-muted-foreground">
                    {selectedPortion} • {foodData?.caloriesPerPortion} kcal
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddToDietModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => {
                    setShowAddToDietModal(false);
                    // Handle add to diet plan logic
                  }}
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;