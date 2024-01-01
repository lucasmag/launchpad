import Button from '@src/shared/components/button/button.tsx';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-20">
      <h1>Launchpad</h1>
      <Button onClick={() => navigate('/song-list')}>Start</Button>
    </div>
  );
}
