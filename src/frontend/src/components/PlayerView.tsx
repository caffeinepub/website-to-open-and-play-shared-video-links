import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VideoRenderer } from './VideoRenderer';
import { VideoLinkForm } from './VideoLinkForm';
import { Edit2, Copy, Check, X } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PlayerViewProps {
  videoUrl: string;
  onEdit: (url: string) => void;
  onClear: () => void;
}

export function PlayerView({ videoUrl, onEdit, onClear }: PlayerViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyShareLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleEdit = (newUrl: string) => {
    onEdit(newUrl);
    setIsEditing(false);
  };

  return (
    <div className="flex-1 px-4 py-8">
      <div className="container mx-auto max-w-6xl space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <VideoLinkForm 
                  onSubmit={handleEdit}
                  initialValue={videoUrl}
                  submitLabel="Update Video"
                />
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-muted-foreground">Playing:</span>
                  <code className="text-sm bg-muted px-3 py-1 rounded-md truncate max-w-md">
                    {videoUrl}
                  </code>
                </div>
              </div>
            )}
          </div>

          {!isEditing && (
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit URL
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyShareLink}
                className="gap-2"
              >
                {copySuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Share Link
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>
          )}
        </div>

        {copySuccess && (
          <Alert className="bg-accent/50 border-accent">
            <Check className="h-4 w-4" />
            <AlertDescription>
              Share link copied to clipboard! Anyone with this link can watch the same video.
            </AlertDescription>
          </Alert>
        )}

        {/* Video Player */}
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-lg">Video Player</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <VideoRenderer url={videoUrl} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
