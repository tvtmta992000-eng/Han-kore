import { useEffect, useRef, useState } from 'react';
import STROKES from '../data/strokes.json';

// Video hướng dẫn thứ tự nét (tạo bằng scripts/make_videos.py).
export default function StrokeVideo({ ch }) {
  const ref = useRef(null);
  const [speed, setSpeed] = useState(1);
  const meta = STROKES[ch];
  useEffect(() => { const v = ref.current; if (v) { v.playbackRate = speed; v.currentTime = 0; v.play().catch(() => {}); } }, [ch]);
  useEffect(() => { if (ref.current) ref.current.playbackRate = speed; }, [speed]);
  if (!meta) return <p className="muted small">Chưa có video cho chữ này.</p>;
  return (
    <div className="sec">
      <video key={ch} ref={ref} className="stroke-video" muted playsInline preload="auto" onClick={e => { const v = e.currentTarget; v.paused ? v.play() : v.pause(); }} aria-label={`Video thứ tự nét chữ ${ch}`}>
        <source src={import.meta.env.BASE_URL + meta.video.slice(1) + '.webm'} type="video/webm" />
        <source src={import.meta.env.BASE_URL + meta.video.slice(1) + '.mp4'} type="video/mp4" />
      </video>
      <div className="row">
        <span className="small muted">{meta.strokes.length} nét · Tốc độ</span>
        <div className="seg" role="group" aria-label="Tốc độ video">
          {[0.5, 1, 1.5].map(s => <button key={s} type="button" aria-pressed={speed === s} onClick={() => setSpeed(s)}>{s}×</button>)}
        </div>
        <button type="button" className="btn" onClick={() => { const v = ref.current; v.currentTime = 0; v.play(); }}>Xem lại</button>
      </div>
    </div>
  );
}
