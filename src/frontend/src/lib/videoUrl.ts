type VideoType = 'direct' | 'embed' | 'unknown';

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];

export function detectVideoType(url: string): VideoType {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    
    // Check if it's a direct video file
    if (VIDEO_EXTENSIONS.some(ext => pathname.endsWith(ext))) {
      return 'direct';
    }

    // Check if it's a known embeddable platform
    const hostname = urlObj.hostname.toLowerCase();
    if (
      hostname.includes('youtube.com') ||
      hostname.includes('youtu.be') ||
      hostname.includes('vimeo.com') ||
      hostname.includes('dailymotion.com') ||
      hostname.includes('twitch.tv')
    ) {
      return 'embed';
    }

    return 'unknown';
  } catch {
    return 'unknown';
  }
}

export function getEmbedUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // YouTube
    if (hostname.includes('youtube.com')) {
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // YouTube short links
    if (hostname.includes('youtu.be')) {
      const videoId = urlObj.pathname.slice(1);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Vimeo
    if (hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.split('/').filter(Boolean)[0];
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    // Dailymotion
    if (hostname.includes('dailymotion.com')) {
      const videoId = urlObj.pathname.split('/video/')[1]?.split('_')[0];
      if (videoId) {
        return `https://www.dailymotion.com/embed/video/${videoId}`;
      }
    }

    // Twitch
    if (hostname.includes('twitch.tv')) {
      const channel = urlObj.pathname.split('/').filter(Boolean)[0];
      if (channel && channel !== 'videos') {
        return `https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}
