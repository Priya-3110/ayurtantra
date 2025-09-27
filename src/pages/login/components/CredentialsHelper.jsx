import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const CredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: 'Doctor',
      email: 'doctor@ayurnutricare.com',
      password: 'doctor123',
      icon: 'Stethoscope',
      color: 'text-primary'
    },
    {
      role: 'Patient',
      email: 'patient@ayurnutricare.com',
      password: 'patient123',
      icon: 'User',
      color: 'text-accent'
    },
    {
      role: 'Admin',
      email: 'admin@ayurnutricare.com',
      password: 'admin123',
      icon: 'Shield',
      color: 'text-secondary'
    }
  ];

  const copyToClipboard = (text, type) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      // You could add a toast notification here
      console.log(`${type} copied to clipboard`);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="bg-muted/30 border border-border/50 rounded-lg overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="font-body font-medium text-sm text-foreground">
              Demo Credentials
            </span>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground transition-transform duration-200" 
          />
        </button>
        
        {isExpanded && (
          <div className="border-t border-border/50 p-4 space-y-4 animate-fade-in">
            <p className="font-caption text-xs text-muted-foreground mb-3">
              Use these credentials to test different user roles:
            </p>
            
            {credentials?.map((cred, index) => (
              <div key={index} className="bg-background/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={cred?.icon} size={14} className={cred?.color} />
                  <span className="font-body font-medium text-sm text-foreground">
                    {cred?.role}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-xs text-muted-foreground">Email:</span>
                    <div className="flex items-center space-x-1">
                      <code className="font-data text-xs bg-muted px-2 py-1 rounded text-foreground">
                        {cred?.email}
                      </code>
                      <button
                        onClick={() => copyToClipboard(cred?.email, 'Email')}
                        className="p-1 hover:bg-muted rounded transition-colors duration-200"
                        title="Copy email"
                      >
                        <Icon name="Copy" size={12} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-xs text-muted-foreground">Password:</span>
                    <div className="flex items-center space-x-1">
                      <code className="font-data text-xs bg-muted px-2 py-1 rounded text-foreground">
                        {cred?.password}
                      </code>
                      <button
                        onClick={() => copyToClipboard(cred?.password, 'Password')}
                        className="p-1 hover:bg-muted rounded transition-colors duration-200"
                        title="Copy password"
                      >
                        <Icon name="Copy" size={12} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-4 pt-3 border-t border-border/50">
              <p className="font-caption text-xs text-muted-foreground text-center">
                <Icon name="AlertTriangle" size={12} className="inline mr-1" />
                These are demo credentials for testing purposes only
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CredentialsHelper;