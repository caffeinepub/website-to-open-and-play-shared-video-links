import { type ReactNode } from 'react';
import { SiCaffeine } from 'react-icons/si';
import { Heart } from 'lucide-react';

interface LayoutShellProps {
  children: ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <img 
                src="/assets/generated/play-icon.dim_128x128.png" 
                alt="Play" 
                className="w-6 h-6"
              />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">VideoShare</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="border-t border-border/40 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <span>© 2026. Built with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive inline-block" />
            <span>using</span>
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors font-medium"
            >
              <SiCaffeine className="w-4 h-4" />
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
