import { useEffect, useState } from 'react';
import { LandingHero } from './components/LandingHero';
import { PlayerView } from './components/PlayerView';
import { LayoutShell } from './components/LayoutShell';
import { useShareVideoUrl } from './hooks/useShareVideoUrl';

function App() {
  const { videoUrl, setVideoUrl } = useShareVideoUrl();
  const [currentUrl, setCurrentUrl] = useState<string>(videoUrl || '');

  useEffect(() => {
    if (videoUrl) {
      setCurrentUrl(videoUrl);
    }
  }, [videoUrl]);

  const handleVideoSubmit = (url: string) => {
    setCurrentUrl(url);
    setVideoUrl(url);
  };

  const handleClearVideo = () => {
    setCurrentUrl('');
    setVideoUrl('');
  };

  return (
    <LayoutShell>
      {currentUrl ? (
        <PlayerView 
          videoUrl={currentUrl} 
          onEdit={handleVideoSubmit}
          onClear={handleClearVideo}
        />
      ) : (
        <LandingHero onSubmit={handleVideoSubmit} />
      )}
    </LayoutShell>
  );
}

export default App;
