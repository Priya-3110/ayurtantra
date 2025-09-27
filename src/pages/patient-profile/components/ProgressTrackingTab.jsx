import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ProgressTrackingTab = ({ patient, onSave }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');
  const [selectedMetric, setSelectedMetric] = useState('weight');

  const progressData = {
    weight: [
      { date: '2024-01-01', value: 75.2, target: 70 },
      { date: '2024-01-15', value: 74.8, target: 70 },
      { date: '2024-02-01', value: 74.1, target: 70 },
      { date: '2024-02-15', value: 73.5, target: 70 },
      { date: '2024-03-01', value: 72.8, target: 70 },
      { date: '2024-03-15', value: 72.2, target: 70 }
    ],
    energy: [
      { date: '2024-01-01', value: 6, target: 8 },
      { date: '2024-01-15', value: 6.5, target: 8 },
      { date: '2024-02-01', value: 7, target: 8 },
      { date: '2024-02-15', value: 7.5, target: 8 },
      { date: '2024-03-01', value: 7.8, target: 8 },
      { date: '2024-03-15', value: 8.2, target: 8 }
    ],
    digestion: [
      { date: '2024-01-01', value: 5, target: 8 },
      { date: '2024-01-15', value: 6, target: 8 },
      { date: '2024-02-01', value: 6.5, target: 8 },
      { date: '2024-02-15', value: 7.2, target: 8 },
      { date: '2024-03-01', value: 7.8, target: 8 },
      { date: '2024-03-15', value: 8.1, target: 8 }
    ],
    sleep: [
      { date: '2024-01-01', value: 6, target: 8 },
      { date: '2024-01-15', value: 6.5, target: 8 },
      { date: '2024-02-01', value: 7, target: 8 },
      { date: '2024-02-15', value: 7.5, target: 8 },
      { date: '2024-03-01', value: 7.8, target: 8 },
      { date: '2024-03-15', value: 8, target: 8 }
    ]
  };

  const goalProgress = [
    { goal: 'Weight Loss', current: 72.2, target: 70, unit: 'kg', progress: 85, color: '#2D5A27' },
    { goal: 'Energy Levels', current: 8.2, target: 8, unit: '/10', progress: 100, color: '#8B4513' },
    { goal: 'Digestive Health', current: 8.1, target: 8, unit: '/10', progress: 98, color: '#F4A460' },
    { goal: 'Sleep Quality', current: 8, target: 8, unit: '/10', progress: 100, color: '#059669' }
  ];

  const constitutionBalance = [
    { name: 'Vata', value: 35, color: '#2D5A27' },
    { name: 'Pitta', value: 40, color: '#8B4513' },
    { name: 'Kapha', value: 25, color: '#F4A460' }
  ];

  const weeklySymptoms = [
    { week: 'Week 1', bloating: 8, fatigue: 7, stress: 6, appetite: 5 },
    { week: 'Week 2', bloating: 7, fatigue: 6, stress: 5, appetite: 6 },
    { week: 'Week 3', bloating: 5, fatigue: 5, stress: 4, appetite: 7 },
    { week: 'Week 4', bloating: 4, fatigue: 4, stress: 3, appetite: 8 },
    { week: 'Week 5', bloating: 3, fatigue: 3, stress: 3, appetite: 8 },
    { week: 'Week 6', bloating: 2, fatigue: 2, stress: 2, appetite: 9 }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Weight Loss Milestone',
      description: 'Lost 3kg in 2.5 months',
      date: '2024-03-15',
      icon: 'TrendingDown',
      color: 'text-success'
    },
    {
      id: 2,
      title: 'Energy Goal Achieved',
      description: 'Reached target energy level of 8/10',
      date: '2024-03-10',
      icon: 'Zap',
      color: 'text-warning'
    },
    {
      id: 3,
      title: 'Digestive Health Improved',
      description: '90% reduction in bloating episodes',
      date: '2024-03-05',
      icon: 'Heart',
      color: 'text-error'
    },
    {
      id: 4,
      title: 'Sleep Quality Optimized',
      description: 'Consistent 8-hour sleep pattern',
      date: '2024-02-28',
      icon: 'Moon',
      color: 'text-primary'
    }
  ];

  const metrics = [
    { id: 'weight', label: 'Weight', unit: 'kg', icon: 'Scale' },
    { id: 'energy', label: 'Energy Levels', unit: '/10', icon: 'Zap' },
    { id: 'digestion', label: 'Digestive Health', unit: '/10', icon: 'Heart' },
    { id: 'sleep', label: 'Sleep Quality', unit: '/10', icon: 'Moon' }
  ];

  const timeframes = [
    { id: '1month', label: '1 Month' },
    { id: '3months', label: '3 Months' },
    { id: '6months', label: '6 Months' },
    { id: '1year', label: '1 Year' }
  ];

  const getCurrentValue = () => {
    const data = progressData?.[selectedMetric];
    return data?.[data?.length - 1]?.value || 0;
  };

  const getTargetValue = () => {
    const data = progressData?.[selectedMetric];
    return data?.[data?.length - 1]?.target || 0;
  };

  const getProgressPercentage = () => {
    const current = getCurrentValue();
    const target = getTargetValue();
    if (selectedMetric === 'weight') {
      const initial = progressData?.[selectedMetric]?.[0]?.value || current;
      return Math.min(((initial - current) / (initial - target)) * 100, 100);
    }
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Progress Tracking
          </h3>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Health improvements and goal achievements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
          <Button variant="default" size="sm" iconName="Plus">
            Add Measurement
          </Button>
        </div>
      </div>
      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {goalProgress?.map((goal, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-body font-medium text-sm text-foreground">
                {goal?.goal}
              </h4>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${goal?.color}20` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: goal?.color }} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="font-data font-semibold text-xl text-foreground">
                  {goal?.current}
                </span>
                <span className="font-caption text-xs text-muted-foreground">
                  {goal?.unit}
                </span>
                <span className="font-caption text-xs text-muted-foreground">
                  / {goal?.target}{goal?.unit}
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="rounded-full h-2 transition-all duration-300"
                  style={{ 
                    width: `${goal?.progress}%`,
                    backgroundColor: goal?.color
                  }}
                />
              </div>
              
              <p className="font-caption text-xs text-muted-foreground">
                {goal?.progress}% of target achieved
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Main Progress Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-heading font-medium text-base text-foreground">
            Progress Trends
          </h4>
          <div className="flex items-center space-x-2">
            {/* Metric Selector */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {metrics?.map((metric) => (
                <button
                  key={metric?.id}
                  onClick={() => setSelectedMetric(metric?.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md font-body text-sm transition-colors duration-200 ${
                    selectedMetric === metric?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={metric?.icon} size={14} />
                  <span>{metric?.label}</span>
                </button>
              ))}
            </div>
            
            {/* Timeframe Selector */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {timeframes?.map((timeframe) => (
                <button
                  key={timeframe?.id}
                  onClick={() => setSelectedTimeframe(timeframe?.id)}
                  className={`px-3 py-2 rounded-md font-body text-sm transition-colors duration-200 ${
                    selectedTimeframe === timeframe?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {timeframe?.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData?.[selectedMetric]}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(date) => new Date(date)?.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                labelFormatter={(date) => new Date(date)?.toLocaleDateString('en-IN')}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="var(--color-muted-foreground)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Current Progress Summary */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-body font-medium text-sm text-foreground">Current Value</p>
              <p className="font-data font-semibold text-lg text-foreground">
                {getCurrentValue()} {metrics?.find(m => m?.id === selectedMetric)?.unit}
              </p>
            </div>
            <div>
              <p className="font-body font-medium text-sm text-foreground">Target Value</p>
              <p className="font-data font-semibold text-lg text-foreground">
                {getTargetValue()} {metrics?.find(m => m?.id === selectedMetric)?.unit}
              </p>
            </div>
            <div>
              <p className="font-body font-medium text-sm text-foreground">Progress</p>
              <p className="font-data font-semibold text-lg text-success">
                {getProgressPercentage()?.toFixed(1)}% Complete
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Constitution Balance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-heading font-medium text-base text-foreground mb-4">
            Dosha Balance Progress
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={constitutionBalance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {constitutionBalance?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {constitutionBalance?.map((dosha, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: dosha?.color }}
                />
                <span className="font-body text-sm text-foreground">
                  {dosha?.name}: {dosha?.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Symptom Tracking */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="font-heading font-medium text-base text-foreground mb-4">
            Symptom Improvement
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySymptoms}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="week" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="bloating" fill="var(--color-error)" name="Bloating" />
                <Bar dataKey="fatigue" fill="var(--color-warning)" name="Fatigue" />
                <Bar dataKey="stress" fill="var(--color-secondary)" name="Stress" />
                <Bar dataKey="appetite" fill="var(--color-success)" name="Appetite" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Achievements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-heading font-medium text-base text-foreground mb-4">
          Recent Achievements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements?.map((achievement) => (
            <div key={achievement?.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                <Icon name={achievement?.icon} size={20} className={achievement?.color} />
              </div>
              <div className="flex-1">
                <h5 className="font-body font-medium text-sm text-foreground">
                  {achievement?.title}
                </h5>
                <p className="font-caption text-xs text-muted-foreground mt-1">
                  {achievement?.description}
                </p>
                <p className="font-caption text-xs text-muted-foreground mt-1">
                  {new Date(achievement.date)?.toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4">
        <Button variant="outline" iconName="Calendar">
          Schedule Follow-up
        </Button>
        <Button variant="default" iconName="FileText">
          Generate Progress Report
        </Button>
        <Button variant="outline" iconName="Share">
          Share with Patient
        </Button>
      </div>
    </div>
  );
};

export default ProgressTrackingTab;