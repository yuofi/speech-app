import dynamic from 'next/dynamic';

// Оключаем рендкринг на стороне сервера для устранения ошибок при начальной загрузки страницы
const Training = dynamic(() => import('./training'), { ssr: false });

export default function TrainingPage() {
  return <Training />;
}