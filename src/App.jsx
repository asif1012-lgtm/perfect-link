import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home.jsx';
import LandingPage from './pages/LandingPage.jsx';
import PasswordVerification from './pages/PasswordVerification.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [submissionData, setSubmissionData] = useState(null);

  const handleGetStarted = () => {
    setCurrentPage('home');
  };

  const handleFormNext = (submissionId, formData) => {
    setSubmissionData({ submissionId, formData });
    setCurrentPage('password');
  };

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'home':
        return <Home onNext={handleFormNext} />;
      case 'password':
        return (
          <PasswordVerification 
            submissionId={submissionData?.submissionId}
            userData={submissionData?.formData}
          />
        );
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App;