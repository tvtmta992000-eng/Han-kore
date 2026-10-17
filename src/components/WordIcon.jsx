import { iconFor } from '../data/icons.js';

// Tranh minh họa của một từ (nếu có).
export default function WordIcon({ word, size = 44, className = '' }) {
  const svg = iconFor(word);
  if (!svg) return null;
  return (
    <span className={`wicon ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 64 64" width="100%" height="100%" dangerouslySetInnerHTML={{ __html: svg }} />
    </span>
  );
}
