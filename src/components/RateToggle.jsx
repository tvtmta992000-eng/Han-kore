import { useEffect, useState } from 'react';
import { getRate, onRate, setRate } from '../lib/audio.js';

export default function RateToggle() {
  const [r, setR] = useState(getRate());
  useEffect(() => onRate(setR), []);
  return (
    <div className="seg" role="group" aria-label="Tốc độ đọc">
      {[[1, 'Thường'], [0.75, 'Chậm']].map(([v, l]) => (
        <button key={v} type="button" aria-pressed={r === v} onClick={() => setRate(v)}>{l}</button>
      ))}
    </div>
  );
}
