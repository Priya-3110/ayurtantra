import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, route, color = 'primary', disabled = false }) => {
  const navigate = useNavigate();

  const getColorClasses = (colorType) => {
    const colors = {
      primary: 'bg-primary/5 border-primary/20 hover:bg-primary/10',
      secondary: 'bg-secondary/5 border-secondary/20 hover:bg-secondary/10',
      accent: 'bg-accent/5 border-accent/20 hover:bg-accent/10',
      success: 'bg-success/5 border-success/20 hover:bg-success/10'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getIconColor = (colorType) => {
    const colors = {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      success: 'text-success'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const handleClick = () => {
    if (!disabled && route) {
      navigate(route);
    }
  };

  return (
    <div 
      className={`
        bg-card border rounded-lg p-6 cursor-pointer transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : getColorClasses(color)}
      `}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center ${getIconColor(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            {title}
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-4">
            {description}
          </p>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            disabled={disabled}
            className="pointer-events-none"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;