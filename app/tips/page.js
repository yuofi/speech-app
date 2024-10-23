import dynamic from 'next/dynamic';

// Оключаем рендкринг на стороне сервера для устранения ошибок при начальной загрузки страницы
const Tips = dynamic(() => import('./tips'), { ssr: false });

export default function TrainingPage() {
  return <Tips />;
}