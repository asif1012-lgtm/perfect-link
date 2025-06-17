import React from 'react';

function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="form-container">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to My React App
        </h1>
        <p className="text-gray-600 mb-8">
          Get started with our simple and secure form system
        </p>
        <button 
          onClick={onGetStarted}
          className="submit-button"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;