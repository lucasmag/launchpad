import Button from '@src/shared/components/button/button.tsx';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-20">
      <div className="leading-3">
        <h1 className="font-black">KeyJam</h1>
        <div className="py-2 bg-white rounded-lg">
          <h3 className="text-primary">Virtual Launchpad</h3>
        </div>
      </div>
      <Button onClick={() => navigate('/song-list')}>Start</Button>
    </div>
  );
}
