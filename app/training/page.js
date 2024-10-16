import dynamic from 'next/dynamic';

// Dynamically import the Training component with SSR disabled
const Training = dynamic(() => import('./training'), { ssr: false });

export default function TrainingPage() {
  return <Training />;
}