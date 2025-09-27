import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'HIPAA Compliant',
      description: 'Healthcare data protection standards'
    },
    {
      icon: 'Lock',
      title: 'SSL Encrypted',
      description: '256-bit encryption for secure data transmission'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Certified for healthcare professionals'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-muted/50 rounded-lg p-6">
        <div className="text-center mb-4">
          <h3 className="font-heading font-medium text-sm text-foreground mb-1">
            Trusted & Secure
          </h3>
          <p className="font-caption text-xs text-muted-foreground">
            Your data is protected with industry-standard security
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={16} className="text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-sm text-foreground">
                  {feature?.title}
                </p>
                <p className="font-caption text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>Est. 2024</span>
            </span>
            <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
            <span className="flex items-center space-x-1">
              <Icon name="Users" size={12} />
              <span>500+ Practitioners</span>
            </span>
            <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
            <span className="flex items-center space-x-1">
              <Icon name="Star" size={12} />
              <span>4.9 Rating</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;