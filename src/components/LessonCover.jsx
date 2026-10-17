import { COMICS } from '../data/comics.js';
import { iconFor } from '../data/icons.js';
import { SceneArt } from './Scene.jsx';
import Avatar from './Avatar.jsx';

// Ảnh bìa bài học: bối cảnh + nhân vật + đồ vật.
export default function LessonCover({ id, className = '' }) {
  const c = COMICS[id];
  if (!c) return null;
  const cast = Object.values(c.cast);
  return (
    <svg viewBox="0 0 320 180" className={`lesson-cover ${className}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ảnh minh họa bài học">
      <SceneArt id={c.scene} />
      {cast.map((who, i) => (
        <svg key={who} x={cast.length === 1 ? 110 : i === 0 ? 40 : 180} y="70" width="110" height="110" viewBox="0 0 100 100">
          <Avatar id={who} size={100} flip={i === 1} />
        </svg>
      ))}
      {c.props.map((k, i) => {
        const svg = iconFor({ ko: k });
        return svg ? (
          <g key={k}>
            <circle cx={cast.length === 1 ? 60 + i * 200 : 150 + i * 20} cy={cast.length === 1 ? 140 : 132 - i * 34} r="20" fill="#FFFFFF" opacity=".9" />
            <svg x={(cast.length === 1 ? 60 + i * 200 : 150 + i * 20) - 15} y={(cast.length === 1 ? 140 : 132 - i * 34) - 15} width="30" height="30" viewBox="0 0 64 64" dangerouslySetInnerHTML={{ __html: svg }} />
          </g>
        ) : null;
      })}
    </svg>
  );
}
