import { useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/LandingPage";
import Home from "@/pages/Home";
import PasswordVerification from "@/pages/PasswordVerification";

// Debug log
console.log('App component loaded');

function App() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'main' | 'password'>('landing');
  const [submissionData, setSubmissionData] = useState<{
    submissionId: number;
    userData: any;
  } | null>(null);

  const handleGetStarted = () => {
    setCurrentStep('main');
  };

  const handleMainFormNext = (submissionId: number, userData: any) => {
    setSubmissionData({ submissionId, userData });
    setCurrentStep('password');
  };

  const renderCurrentStep = () => {
    try {
      switch (currentStep) {
        case 'landing':
          return <LandingPage onGetStarted={handleGetStarted} />;
        case 'main':
          return <Home onNext={handleMainFormNext} />;
        case 'password':
          return submissionData && (
            <PasswordVerification 
              submissionId={submissionData.submissionId}
              userData={submissionData.userData}
            />
          );
        default:
          return <LandingPage onGetStarted={handleGetStarted} />;
      }
    } catch (error) {
      console.error('Render error:', error);
      return <div>Loading...</div>;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-100">
          {renderCurrentStep()}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
