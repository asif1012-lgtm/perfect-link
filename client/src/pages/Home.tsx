import FormModule from '@/modules/FormModule';

interface HomeProps {
  onNext: (submissionId: number, formData: any) => void;
}

export default function Home({ onNext }: HomeProps) {
  return <FormModule onNext={onNext} />;
}
