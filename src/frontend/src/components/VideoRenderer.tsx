import { detectVideoType, getEmbedUrl } from '@/lib/videoUrl';
import { EmbedFallback } from './EmbedFallback';

interface VideoRendererProps {
  url: string;
}

export function VideoRenderer({ url }: VideoRendererProps) {
  const videoType = detectVideoType(url);

  if (videoType === 'direct') {
    return (
      <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
        <video
          src={url}
          controls
          className="w-full h-full"
          controlsList="nodownload"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(url);
  
  return <EmbedFallback url={url} embedUrl={embedUrl} />;
}
