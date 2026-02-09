# Specification

## Summary
**Goal:** Provide a single-page website that opens and plays shared video links, with shareable playback via the app URL.

**Planned changes:**
- Build a landing view with a URL input that submits via button or Enter, validates empty/invalid input, and shows clear English errors.
- Add a player view that displays the provided URL (visible/editable) and renders:
  - an HTML5 `<video>` player for direct video file links (.mp4/.webm/.ogg),
  - an iframe embed fallback for other hosted video pages when possible, otherwise a message plus a safe external-open link.
- Encode the target video link into the browser URL so the app can be shared; auto-load the video when visiting a share URL.
- Add a “Copy share link” control that copies the current app URL and shows an English confirmation.
- Apply a consistent visual theme (non-blue/purple primary palette) across landing and player views.
- Add and use generated static images from `frontend/public/assets/generated` in the landing UI.

**User-visible outcome:** Users can paste a video link to play it in-page, share an app link that reopens the same video, and use a clean, consistently styled interface with a custom hero visual and play icon.
