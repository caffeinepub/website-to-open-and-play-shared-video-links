import { useState, useEffect } from 'react';

const VIDEO_PARAM = 'v';

function getVideoUrlFromBrowser(): string {
  const params = new URLSearchParams(window.location.search);
  const encodedUrl = params.get(VIDEO_PARAM);
  if (!encodedUrl) return '';
  
  try {
    return decodeURIComponent(encodedUrl);
  } catch {
    return '';
  }
}

function updateBrowserUrl(videoUrl: string) {
  const url = new URL(window.location.href);
  
  if (videoUrl) {
    url.searchParams.set(VIDEO_PARAM, encodeURIComponent(videoUrl));
  } else {
    url.searchParams.delete(VIDEO_PARAM);
  }
  
  window.history.pushState({}, '', url.toString());
}

export function useShareVideoUrl() {
  const [videoUrl, setVideoUrlState] = useState<string>('');

  useEffect(() => {
    const initialUrl = getVideoUrlFromBrowser();
    if (initialUrl) {
      setVideoUrlState(initialUrl);
    }
  }, []);

  const setVideoUrl = (url: string) => {
    setVideoUrlState(url);
    updateBrowserUrl(url);
  };

  return {
    videoUrl,
    setVideoUrl,
  };
}
