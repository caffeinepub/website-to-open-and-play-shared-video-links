import { VideoLinkForm } from './VideoLinkForm';

interface LandingHeroProps {
  onSubmit: (url: string) => void;
}

export function LandingHero({ onSubmit }: LandingHeroProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="relative">
          {/* Hero Image Background */}
          <div className="absolute inset-0 -z-10 opacity-20 blur-sm">
            <img 
              src="/assets/generated/video-hero.dim_1600x900.png" 
              alt="" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>

          <div className="text-center space-y-8 py-16">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent via-primary to-accent/80 flex items-center justify-center shadow-lg">
                <img 
                  src="/assets/generated/play-icon.dim_128x128.png" 
                  alt="Play" 
                  className="w-14 h-14"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Share & Play Videos
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Paste any video link to watch it instantly. Share your playback with a single URL.
              </p>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto">
              <VideoLinkForm onSubmit={onSubmit} />
            </div>

            {/* Supported formats hint */}
            <p className="text-sm text-muted-foreground">
              Supports direct video files (.mp4, .webm, .ogg) and embeddable video links
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
