import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoTab = ({ patient, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: patient?.name,
    age: patient?.age,
    gender: patient?.gender,
    phone: patient?.phone,
    email: patient?.email,
    address: patient?.address,
    emergencyContact: patient?.emergencyContact,
    height: patient?.height,
    weight: patient?.weight,
    bloodGroup: patient?.bloodGroup,
    occupation: patient?.occupation
  });

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: patient?.name,
      age: patient?.age,
      gender: patient?.gender,
      phone: patient?.phone,
      email: patient?.email,
      address: patient?.address,
      emergencyContact: patient?.emergencyContact,
      height: patient?.height,
      weight: patient?.weight,
      bloodGroup: patient?.bloodGroup,
      occupation: patient?.occupation
    });
    setIsEditing(false);
  };

  const calculateBMI = () => {
    if (formData?.height && formData?.weight) {
      const heightInM = formData?.height / 100;
      const bmi = (formData?.weight / (heightInM * heightInM))?.toFixed(1);
      return bmi;
    }
    return 'N/A';
  };

  const getBMICategory = (bmi) => {
    if (bmi === 'N/A') return 'Unknown';
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue < 25) return 'Normal';
    if (bmiValue < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Personal Information
          </h3>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Basic demographics and contact details
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          )}
        </div>
      </div>
      {/* Personal Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age"
              type="number"
              value={formData?.age}
              onChange={(e) => handleInputChange('age', e?.target?.value)}
              disabled={!isEditing}
              min="1"
              max="120"
            />
            
            <Select
              label="Gender"
              options={genderOptions}
              value={formData?.gender}
              onChange={(value) => handleInputChange('gender', value)}
              disabled={!isEditing}
            />
          </div>

          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing}
            placeholder="+91 98765 43210"
          />

          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            placeholder="patient@example.com"
          />

          <Input
            label="Occupation"
            type="text"
            value={formData?.occupation}
            onChange={(e) => handleInputChange('occupation', e?.target?.value)}
            disabled={!isEditing}
            placeholder="Software Engineer"
          />
        </div>

        <div className="space-y-4">
          <Input
            label="Address"
            type="text"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            disabled={!isEditing}
            placeholder="Complete address"
          />

          <Input
            label="Emergency Contact"
            type="tel"
            value={formData?.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
            disabled={!isEditing}
            placeholder="+91 98765 43210"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Height (cm)"
              type="number"
              value={formData?.height}
              onChange={(e) => handleInputChange('height', e?.target?.value)}
              disabled={!isEditing}
              min="100"
              max="250"
            />
            
            <Input
              label="Weight (kg)"
              type="number"
              value={formData?.weight}
              onChange={(e) => handleInputChange('weight', e?.target?.value)}
              disabled={!isEditing}
              min="30"
              max="200"
              step="0.1"
            />
          </div>

          <Select
            label="Blood Group"
            options={bloodGroupOptions}
            value={formData?.bloodGroup}
            onChange={(value) => handleInputChange('bloodGroup', value)}
            disabled={!isEditing}
            placeholder="Select blood group"
          />

          {/* BMI Calculation */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body font-medium text-sm text-foreground">
                  Body Mass Index (BMI)
                </p>
                <p className="font-caption text-xs text-muted-foreground">
                  Calculated from height and weight
                </p>
              </div>
              <div className="text-right">
                <p className="font-data font-semibold text-lg text-foreground">
                  {calculateBMI()}
                </p>
                <p className={`font-caption text-xs ${
                  getBMICategory(calculateBMI()) === 'Normal' ?'text-success' 
                    : getBMICategory(calculateBMI()) === 'Underweight' || getBMICategory(calculateBMI()) === 'Overweight'
                    ? 'text-warning' :'text-error'
                }`}>
                  {getBMICategory(calculateBMI())}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Last Updated */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span className="font-caption text-xs">
            Last updated: {new Date()?.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="User" size={16} />
          <span className="font-caption text-xs">
            Updated by: Dr. Rajesh Kumar
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;