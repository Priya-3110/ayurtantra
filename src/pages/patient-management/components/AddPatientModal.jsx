import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddPatientModal = ({ isOpen, onClose, onAddPatient }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    dietaryPreference: '',
    healthConditions: [],
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genderOptions = [
    { value: '', label: 'Select gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const dietaryPreferenceOptions = [
    { value: '', label: 'Select dietary preference' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'non-vegetarian', label: 'Non-Vegetarian' },
    { value: 'jain', label: 'Jain' },
    { value: 'gluten-free', label: 'Gluten-Free' }
  ];

  const healthConditionOptions = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'Hypertension' },
    { value: 'obesity', label: 'Obesity' },
    { value: 'digestive-issues', label: 'Digestive Issues' },
    { value: 'thyroid', label: 'Thyroid Disorders' },
    { value: 'heart-disease', label: 'Heart Disease' },
    { value: 'arthritis', label: 'Arthritis' },
    { value: 'allergies', label: 'Food Allergies' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Patient name is required';
    }

    if (!formData?.age || formData?.age < 1 || formData?.age > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }

    if (!formData?.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/?.test(formData?.phone?.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.dietaryPreference) {
      newErrors.dietaryPreference = 'Dietary preference is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate patient ID
      const patientId = `PAT${Date.now()?.toString()?.slice(-6)}`;
      
      const newPatient = {
        id: Date.now(),
        patientId,
        name: formData?.name?.trim(),
        age: parseInt(formData?.age),
        gender: formData?.gender,
        phone: formData?.phone?.trim(),
        email: formData?.email?.trim(),
        address: formData?.address?.trim(),
        dietaryPreference: formData?.dietaryPreference,
        healthConditions: formData?.healthConditions,
        emergencyContact: formData?.emergencyContact?.trim(),
        emergencyPhone: formData?.emergencyPhone?.trim(),
        status: 'active',
        dietPlan: 'Not Assigned',
        dietPlanStatus: 'Pending',
        lastConsultation: new Date()?.toISOString(),
        createdAt: new Date()?.toISOString()
      };

      await onAddPatient(newPatient);
      
      // Reset form
      setFormData({
        name: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        dietaryPreference: '',
        healthConditions: [],
        emergencyContact: '',
        emergencyPhone: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground">
              Add New Patient
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Enter patient information to create a new profile
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="font-body font-medium text-sm text-foreground mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter patient's full name"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  required
                />
                
                <Input
                  label="Age"
                  type="number"
                  placeholder="Enter age"
                  value={formData?.age}
                  onChange={(e) => handleInputChange('age', e?.target?.value)}
                  error={errors?.age}
                  min="1"
                  max="120"
                  required
                />
                
                <Select
                  label="Gender"
                  options={genderOptions}
                  value={formData?.gender}
                  onChange={(value) => handleInputChange('gender', value)}
                  error={errors?.gender}
                  required
                />
                
                <Select
                  label="Dietary Preference"
                  options={dietaryPreferenceOptions}
                  value={formData?.dietaryPreference}
                  onChange={(value) => handleInputChange('dietaryPreference', value)}
                  error={errors?.dietaryPreference}
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-body font-medium text-sm text-foreground mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  error={errors?.phone}
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address (optional)"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                />
              </div>
              
              <div className="mt-4">
                <Input
                  label="Address"
                  type="text"
                  placeholder="Enter complete address"
                  value={formData?.address}
                  onChange={(e) => handleInputChange('address', e?.target?.value)}
                />
              </div>
            </div>

            {/* Health Information */}
            <div>
              <h3 className="font-body font-medium text-sm text-foreground mb-4">
                Health Information
              </h3>
              <Select
                label="Health Conditions"
                description="Select any existing health conditions"
                options={healthConditionOptions}
                value={formData?.healthConditions}
                onChange={(value) => handleInputChange('healthConditions', value)}
                multiple
                searchable
              />
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="font-body font-medium text-sm text-foreground mb-4">
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Emergency Contact Name"
                  type="text"
                  placeholder="Enter emergency contact name"
                  value={formData?.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
                />
                
                <Input
                  label="Emergency Contact Phone"
                  type="tel"
                  placeholder="Enter emergency contact phone"
                  value={formData?.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e?.target?.value)}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="Plus"
              iconPosition="left"
            >
              Add Patient
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;