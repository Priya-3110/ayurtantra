import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import BackgroundPattern from './components/BackgroundPattern';
import CredentialsHelper from './components/CredentialsHelper';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      // Redirect based on role
      if (userData?.role === 'doctor' || userData?.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/patient-profile');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Pattern */}
      <BackgroundPattern />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full py-6 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.06.66C6.16 17.74 9 14 17 12V8zm2.71-5.68l-1.42 1.42C19.54 4.99 21 7.44 21 10c0 2.56-1.46 5.01-2.71 6.26l1.42 1.42C21.05 16.34 23 13.35 23 10s-1.95-6.34-3.29-7.68z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="font-heading font-bold text-xl text-foreground">
                    AyurNutriCare
                  </h1>
                  <p className="font-caption text-xs text-muted-foreground">
                    Ayurvedic Practice Management
                  </p>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center space-x-6 text-sm text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>Secure</span>
                </span>
                <span className="flex items-center space-x-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                  <span>HIPAA Compliant</span>
                </span>
                <span className="flex items-center space-x-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Trusted Platform</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Login Form */}
            <LoginForm />
            
            {/* Demo Credentials Helper */}
            <CredentialsHelper />
            
            {/* Security Badges */}
            <SecurityBadges />
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 px-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-foreground transition-colors duration-200">
                  Support
                </a>
              </div>
              
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} AyurNutriCare. All rights reserved.
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-center text-xs text-muted-foreground">
                Empowering Ayurvedic practitioners with modern technology for better patient care
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;