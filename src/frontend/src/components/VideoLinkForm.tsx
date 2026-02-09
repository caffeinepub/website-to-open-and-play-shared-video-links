import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Play, AlertCircle } from 'lucide-react';
import { validateVideoUrl } from '@/lib/validation';

interface VideoLinkFormProps {
  onSubmit: (url: string) => void;
  initialValue?: string;
  submitLabel?: string;
}

export function VideoLinkForm({ onSubmit, initialValue = '', submitLabel = 'Play Video' }: VideoLinkFormProps) {
  const [url, setUrl] = useState(initialValue);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateVideoUrl(url);
    if (!validation.valid) {
      setError(validation.error || 'Invalid URL');
      return;
    }

    onSubmit(validation.normalizedUrl || url);
  };

  const handleInputChange = (value: string) => {
    setUrl(value);
    if (error) setError('');
  };

  return (
    <Card className="border-2 shadow-lg">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="Paste video URL here..."
              value={url}
              onChange={(e) => handleInputChange(e.target.value)}
              className="flex-1 h-12 text-base"
              autoFocus
            />
            <Button 
              type="submit" 
              size="lg"
              className="h-12 px-8 gap-2 font-semibold"
            >
              <Play className="w-5 h-5" />
              {submitLabel}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
