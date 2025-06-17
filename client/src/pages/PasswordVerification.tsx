import PasswordModule from '@/modules/PasswordModule';

interface PasswordVerificationProps {
  submissionId: number;
  userData: any;
}

export default function PasswordVerification({ submissionId, userData }: PasswordVerificationProps) {
  return <PasswordModule submissionId={submissionId} userData={userData} />;
}
