import { play } from '../lib/audio.js';
import Icon from './Icon.jsx';

// Nút phát âm. Có children → nút có chữ; không có → nút tròn nhỏ.
export default function Say({ text, voice = 'female', label, children, className = '' }) {
  const onClick = e => { e.stopPropagation(); play(text, voice); };
  if (children) {
    return <button type="button" className={`btn ${className}`} onClick={onClick}><Icon name="sound" size={16} />{children}</button>;
  }
  return (
    <button type="button" className={`say ${className}`} onClick={onClick} aria-label={label || `Nghe: ${text}`}>
      <Icon name="sound" size={15} />
    </button>
  );
}
