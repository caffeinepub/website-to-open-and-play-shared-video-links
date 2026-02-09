interface ValidationResult {
  valid: boolean;
  error?: string;
  normalizedUrl?: string;
}

export function validateVideoUrl(url: string): ValidationResult {
  const trimmed = url.trim();

  if (!trimmed) {
    return {
      valid: false,
      error: 'Please enter a video URL',
    };
  }

  try {
    const urlObj = new URL(trimmed);
    
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return {
        valid: false,
        error: 'URL must start with http:// or https://',
      };
    }

    return {
      valid: true,
      normalizedUrl: trimmed,
    };
  } catch {
    // Try adding https:// if missing
    try {
      const withProtocol = `https://${trimmed}`;
      new URL(withProtocol);
      return {
        valid: true,
        normalizedUrl: withProtocol,
      };
    } catch {
      return {
        valid: false,
        error: 'Please enter a valid URL',
      };
    }
  }
}
