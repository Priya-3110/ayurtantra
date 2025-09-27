import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'doctor',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different roles
  const mockCredentials = {
    doctor: { email: 'doctor@ayurnutricare.com', password: 'doctor123' },
    patient: { email: 'patient@ayurnutricare.com', password: 'patient123' },
    admin: { email: 'admin@ayurnutricare.com', password: 'admin123' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (e) => {
    setFormData(prev => ({ ...prev, role: e?.target?.value }));
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const credentials = mockCredentials?.[formData?.role];
      
      if (formData?.email === credentials?.email && formData?.password === credentials?.password) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          email: formData?.email,
          role: formData?.role,
          name: formData?.role === 'doctor' ? 'Dr. Rajesh Kumar' : 
                formData?.role === 'admin' ? 'Admin User' : 'Patient User',
          loginTime: new Date()?.toISOString()
        }));
        
        // Navigate based on role
        if (formData?.role === 'doctor' || formData?.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/patient-profile');
        }
      } else {
        setErrors({
          general: `Invalid credentials for ${formData?.role}. Please check your email and password.`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here');
  };

  const handleCreateAccount = () => {
    alert('Registration functionality would be implemented here');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-xl shadow-soft-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Leaf" size={32} color="white" />
          </div>
          <h1 className="font-heading font-semibold text-2xl text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="font-body text-muted-foreground">
            Sign in to your AyurNutriCare account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors?.general && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <p className="font-body text-sm text-error">{errors?.general}</p>
            </div>
          )}

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="font-body font-medium text-sm text-foreground">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'doctor', label: 'Doctor', icon: 'Stethoscope' },
                { value: 'patient', label: 'Patient', icon: 'User' },
                { value: 'admin', label: 'Admin', icon: 'Shield' }
              ]?.map((role) => (
                <label
                  key={role?.value}
                  className={`
                    flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200
                    ${formData?.role === role?.value
                      ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role?.value}
                    checked={formData?.role === role?.value}
                    onChange={handleRoleChange}
                    className="sr-only"
                  />
                  <Icon name={role?.icon} size={20} className="mb-1" />
                  <span className="font-body text-xs font-medium">{role?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            error={errors?.email}
            required
            disabled={isLoading}
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={errors?.password}
            required
            disabled={isLoading}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              name="rememberMe"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="font-body text-sm text-primary hover:text-primary/80 transition-colors duration-200"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="right"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          {/* Create Account Link */}
          <div className="text-center pt-4 border-t border-border">
            <p className="font-body text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={handleCreateAccount}
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                disabled={isLoading}
              >
                Create new account
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;