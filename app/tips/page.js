import dynamic from 'next/dynamic';

// Dynamically import the Training component with SSR disabled
const Tips = dynamic(() => import('./tips'), { ssr: false });

export default function TrainingPage() {
  return <Tips />;
}