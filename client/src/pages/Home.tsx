import MainForm from '@/components/MainForm';

interface HomeProps {
  onNext: (submissionId: number, formData: any) => void;
}

export default function Home({ onNext }: HomeProps) {
  return (
    <div className="min-h-screen bg-facebook-gray">
      <div className="container mx-auto py-8 px-4">
        <MainForm onNext={onNext} />
      </div>
    </div>
  );
}
