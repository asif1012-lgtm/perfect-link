import React, { useState } from 'react';
import FormInput from '../components/FormInput';

function Home({ onNext }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate a mock submission ID
      const submissionId = Date.now();
      
      // Get device info
      const deviceInfo = {
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        isTouchDevice: 'ontouchstart' in window,
        userAgent: navigator.userAgent,
        platform: navigator.platform
      };

      const submissionData = {
        ...formData,
        ...deviceInfo,
        submittedAt: new Date().toISOString()
      };

      setIsSubmitting(false);
      onNext(submissionId, submissionData);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="form-container">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Personal Information
        </h2>
        
        <form onSubmit={handleSubmit}>
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            required
            placeholder="Enter your first name"
          />
          
          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            required
            placeholder="Enter your last name"
          />
          
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            placeholder="Enter your email"
          />
          
          <FormInput
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            error={errors.phoneNumber}
            required
            placeholder="Enter your phone number"
          />
          
          <FormInput
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            error={errors.dateOfBirth}
            required
          />
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;