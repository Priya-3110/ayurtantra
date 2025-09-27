import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const NutritionalBreakdown = ({ nutritionData, portion }) => {
  const [activeTab, setActiveTab] = useState('macros');

  const macroData = [
    { name: 'Protein', value: nutritionData?.protein, color: '#2D5A27', unit: 'g' },
    { name: 'Carbs', value: nutritionData?.carbs, color: '#8B4513', unit: 'g' },
    { name: 'Fat', value: nutritionData?.fat, color: '#F4A460', unit: 'g' },
    { name: 'Fiber', value: nutritionData?.fiber, color: '#059669', unit: 'g' }
  ];

  const vitamins = [
    { name: 'Vitamin A', value: nutritionData?.vitaminA, unit: 'μg', dailyValue: 85 },
    { name: 'Vitamin C', value: nutritionData?.vitaminC, unit: 'mg', dailyValue: 45 },
    { name: 'Vitamin D', value: nutritionData?.vitaminD, unit: 'μg', dailyValue: 12 },
    { name: 'Vitamin E', value: nutritionData?.vitaminE, unit: 'mg', dailyValue: 25 },
    { name: 'Vitamin K', value: nutritionData?.vitaminK, unit: 'μg', dailyValue: 30 },
    { name: 'Thiamine (B1)', value: nutritionData?.thiamine, unit: 'mg', dailyValue: 15 },
    { name: 'Riboflavin (B2)', value: nutritionData?.riboflavin, unit: 'mg', dailyValue: 20 },
    { name: 'Niacin (B3)', value: nutritionData?.niacin, unit: 'mg', dailyValue: 18 },
    { name: 'Folate', value: nutritionData?.folate, unit: 'μg', dailyValue: 35 }
  ];

  const minerals = [
    { name: 'Calcium', value: nutritionData?.calcium, unit: 'mg', dailyValue: 25 },
    { name: 'Iron', value: nutritionData?.iron, unit: 'mg', dailyValue: 40 },
    { name: 'Magnesium', value: nutritionData?.magnesium, unit: 'mg', dailyValue: 30 },
    { name: 'Phosphorus', value: nutritionData?.phosphorus, unit: 'mg', dailyValue: 35 },
    { name: 'Potassium', value: nutritionData?.potassium, unit: 'mg', dailyValue: 20 },
    { name: 'Sodium', value: nutritionData?.sodium, unit: 'mg', dailyValue: 15 },
    { name: 'Zinc', value: nutritionData?.zinc, unit: 'mg', dailyValue: 28 },
    { name: 'Copper', value: nutritionData?.copper, unit: 'mg', dailyValue: 22 }
  ];

  const tabs = [
    { id: 'macros', label: 'Macronutrients', icon: 'PieChart' },
    { id: 'vitamins', label: 'Vitamins', icon: 'Zap' },
    { id: 'minerals', label: 'Minerals', icon: 'Gem' },
    { id: 'detailed', label: 'Detailed View', icon: 'List' }
  ];

  const renderMacroChart = () => (
    <div className="space-y-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={macroData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {macroData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}g`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {macroData?.map((macro, index) => (
          <div key={index} className="text-center p-4 bg-muted rounded-lg">
            <div
              className="w-4 h-4 rounded-full mx-auto mb-2"
              style={{ backgroundColor: macro?.color }}
            />
            <p className="font-data font-medium text-lg text-foreground">
              {macro?.value}{macro?.unit}
            </p>
            <p className="font-caption text-xs text-muted-foreground">
              {macro?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVitaminsChart = () => (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vitamins} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis fontSize={12} />
            <Tooltip 
              formatter={(value, name) => [`${value}% DV`, 'Daily Value']}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="dailyValue" fill="#2D5A27" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {vitamins?.map((vitamin, index) => (
          <div key={index} className="p-3 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-foreground">
                {vitamin?.name}
              </span>
              <span className="font-data text-sm text-foreground">
                {vitamin?.value}{vitamin?.unit}
              </span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(vitamin?.dailyValue, 100)}%` }}
                />
              </div>
              <p className="font-caption text-xs text-muted-foreground mt-1">
                {vitamin?.dailyValue}% Daily Value
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMineralsChart = () => (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={minerals} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis fontSize={12} />
            <Tooltip 
              formatter={(value, name) => [`${value}% DV`, 'Daily Value']}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="dailyValue" fill="#8B4513" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {minerals?.map((mineral, index) => (
          <div key={index} className="p-3 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-foreground">
                {mineral?.name}
              </span>
              <span className="font-data text-sm text-foreground">
                {mineral?.value}{mineral?.unit}
              </span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-secondary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(mineral?.dailyValue, 100)}%` }}
                />
              </div>
              <p className="font-caption text-xs text-muted-foreground mt-1">
                {mineral?.dailyValue}% Daily Value
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetailedView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-heading font-medium text-lg text-foreground mb-4">
            Energy & Macronutrients
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-body text-foreground">Calories</span>
              <span className="font-data text-foreground">{nutritionData?.calories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-foreground">Protein</span>
              <span className="font-data text-foreground">{nutritionData?.protein}g</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-foreground">Total Carbohydrates</span>
              <span className="font-data text-foreground">{nutritionData?.carbs}g</span>
            </div>
            <div className="flex justify-between pl-4">
              <span className="font-body text-muted-foreground">Dietary Fiber</span>
              <span className="font-data text-foreground">{nutritionData?.fiber}g</span>
            </div>
            <div className="flex justify-between pl-4">
              <span className="font-body text-muted-foreground">Sugars</span>
              <span className="font-data text-foreground">{nutritionData?.sugars}g</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-foreground">Total Fat</span>
              <span className="font-data text-foreground">{nutritionData?.fat}g</span>
            </div>
            <div className="flex justify-between pl-4">
              <span className="font-body text-muted-foreground">Saturated Fat</span>
              <span className="font-data text-foreground">{nutritionData?.saturatedFat}g</span>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-heading font-medium text-lg text-foreground mb-4">
            Additional Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-body text-foreground">Cholesterol</span>
              <span className="font-data text-foreground">{nutritionData?.cholesterol}mg</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-foreground">Water Content</span>
              <span className="font-data text-foreground">{nutritionData?.water}g</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-foreground">Glycemic Index</span>
              <span className="font-data text-foreground">{nutritionData?.glycemicIndex}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-foreground">Antioxidants</span>
              <span className="font-data text-foreground">{nutritionData?.antioxidants}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground">
          Nutritional Breakdown
        </h2>
        <div className="text-sm text-muted-foreground">
          Per {portion}
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <Button
            key={tab?.id}
            variant={activeTab === tab?.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab?.id)}
            iconName={tab?.icon}
            iconPosition="left"
            className="mb-2"
          >
            {tab?.label}
          </Button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'macros' && renderMacroChart()}
        {activeTab === 'vitamins' && renderVitaminsChart()}
        {activeTab === 'minerals' && renderMineralsChart()}
        {activeTab === 'detailed' && renderDetailedView()}
      </div>
    </div>
  );
};

export default NutritionalBreakdown;