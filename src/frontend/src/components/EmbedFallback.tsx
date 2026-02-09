import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ExternalLink, AlertCircle } from 'lucide-react';

interface EmbedFallbackProps {
  url: string;
  embedUrl: string | null;
}

export function EmbedFallback({ url, embedUrl }: EmbedFallbackProps) {
  if (embedUrl) {
    return (
      <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation"
          title="Video player"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full bg-muted/30 flex items-center justify-center p-8" style={{ aspectRatio: '16/9' }}>
      <Alert className="max-w-md">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Cannot embed this video</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>
            This video link cannot be embedded directly. You can open it in a new tab to watch it on the original platform.
          </p>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="gap-2"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              Open in New Tab
            </a>
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
