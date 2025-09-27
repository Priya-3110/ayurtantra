import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const NutrientAnalysisChart = () => {
  const [chartType, setChartType] = useState('bar');

  const weeklyNutrientData = [
    { day: 'Mon', protein: 65, carbs: 280, fats: 45, fiber: 25 },
    { day: 'Tue', protein: 70, carbs: 320, fats: 50, fiber: 30 },
    { day: 'Wed', protein: 60, carbs: 290, fats: 40, fiber: 28 },
    { day: 'Thu', protein: 75, carbs: 310, fats: 55, fiber: 32 },
    { day: 'Fri', protein: 68, carbs: 300, fats: 48, fiber: 29 },
    { day: 'Sat', protein: 72, carbs: 330, fats: 52, fiber: 35 },
    { day: 'Sun', protein: 66, carbs: 285, fats: 46, fiber: 27 }
  ];

  const macroDistribution = [
    { name: 'Carbohydrates', value: 45, color: '#2D5A27' },
    { name: 'Proteins', value: 25, color: '#8B4513' },
    { name: 'Fats', value: 20, color: '#F4A460' },
    { name: 'Fiber', value: 10, color: '#059669' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-soft-lg">
          <p className="font-body font-medium text-sm text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="font-caption text-xs" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}g
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-soft-lg">
          <p className="font-body font-medium text-sm text-foreground">
            {data?.name}: {data?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Nutrient Analysis Trends
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('bar')}
              iconName="BarChart3"
            >
              Weekly
            </Button>
            <Button
              variant={chartType === 'pie' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('pie')}
              iconName="PieChart"
            >
              Distribution
            </Button>
          </div>
        </div>
        
        <p className="font-body text-sm text-muted-foreground">
          {chartType === 'bar' ?'Average daily nutrient intake across the week' :'Current macronutrient distribution percentage'
          }
        </p>
      </div>
      <div className="p-6">
        {chartType === 'bar' ? (
          <div className="w-full h-80" aria-label="Weekly Nutrient Intake Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyNutrientData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="day" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  fontFamily="var(--font-caption)"
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  fontFamily="var(--font-caption)"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="protein" fill="#8B4513" name="Protein" radius={[2, 2, 0, 0]} />
                <Bar dataKey="carbs" fill="#2D5A27" name="Carbohydrates" radius={[2, 2, 0, 0]} />
                <Bar dataKey="fats" fill="#F4A460" name="Fats" radius={[2, 2, 0, 0]} />
                <Bar dataKey="fiber" fill="#059669" name="Fiber" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="w-full h-80" aria-label="Macronutrient Distribution Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {chartType === 'bar' ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm bg-[#8B4513]"></div>
                <span className="font-caption text-xs text-muted-foreground">Protein</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm bg-[#2D5A27]"></div>
                <span className="font-caption text-xs text-muted-foreground">Carbohydrates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm bg-[#F4A460]"></div>
                <span className="font-caption text-xs text-muted-foreground">Fats</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm bg-[#059669]"></div>
                <span className="font-caption text-xs text-muted-foreground">Fiber</span>
              </div>
            </>
          ) : (
            macroDistribution?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item?.color }}></div>
                <span className="font-caption text-xs text-muted-foreground">
                  {item?.name} ({item?.value}%)
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NutrientAnalysisChart;