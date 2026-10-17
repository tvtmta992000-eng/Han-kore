import { useState } from 'react';
import { COMICS } from '../data/comics.js';
import { CHARACTERS } from './Avatar.jsx';
import Avatar from './Avatar.jsx';
import Scene from './Scene.jsx';
import Icon from './Icon.jsx';
import { play, playSequence, stopAudio } from '../lib/audio.js';
import { voiceForSpeaker } from '../lib/speakable.js';

// Hội thoại dạng truyện tranh: mỗi câu là một khung, nhân vật đang nói sáng lên và mở miệng.
export default function Comic({ lessonId, lines }) {
  const cfg = COMICS[lessonId] || { scene: 'classroom', cast: {} };
  const speakers = [...new Set(lines.map(l => l[0]))];
  const who = sp => cfg.cast[sp] || (speakers.indexOf(sp) === 0 ? 'minsu' : 'lan');
  const [on, setOn] = useState(-1);
  const [hidden, setHidden] = useState(true);
  const [showVi, setShowVi] = useState(false);

  const playAll = () => playSequence(lines.map(l => ({ text: l[1], voice: voiceForSpeaker(l[0]) })), setOn);
  const playOne = i => { setOn(i); play(lines[i][1], voiceForSpeaker(lines[i][0])).then(() => setOn(x => (x === i ? -1 : x))); };

  return (
    <div className="sec">
      <div className="row">
        <button type="button" className="btn primary" onClick={playAll}><Icon name="play" size={16} /> Nghe cả bài</button>
        <button type="button" className="btn" onClick={() => { stopAudio(); setOn(-1); }}><Icon name="stop" size={16} /> Dừng</button>
        <button type="button" className="btn" onClick={() => setHidden(h => !h)}>{hidden ? 'Hiện lời thoại' : 'Ẩn lời thoại'}</button>
        {!hidden && <button type="button" className="btn" onClick={() => setShowVi(v => !v)}>{showVi ? 'Ẩn bản dịch' : 'Hiện bản dịch'}</button>}
      </div>
      <div className="cast">
        {speakers.map(sp => <span key={sp} className="cast-item"><Avatar id={who(sp)} size={30} /> {CHARACTERS[who(sp)].vi} <span className="ko muted">({CHARACTERS[who(sp)].name})</span></span>)}
      </div>
      <div className={`comic ${on >= 0 ? 'playing' : ''}`}>
        {lines.map((l, i) => {
          const right = speakers.length > 1 && speakers.indexOf(l[0]) === 1;
          return (
            <button key={i} type="button" className={`panel ${right ? 'right' : ''} ${on === i ? 'on' : ''}`} onClick={() => playOne(i)} aria-label={`Nghe câu ${i + 1}`}>
              <Scene id={cfg.scene} className="panel-bg" />
              <span className="panel-no">{i + 1}</span>
              <span className="panel-char"><Avatar id={who(l[0])} talking={on === i} size={112} flip={right} /></span>
              <span className={`bubble ${hidden ? 'blur' : ''}`}>
                <span className="ko">{hidden ? l[1].replace(/[^\s.,?!]/g, '○') : l[1]}</span>
                {!hidden && showVi && <small>{l[2]}</small>}
              </span>
            </button>
          );
        })}
      </div>
      <p className="small muted">Chạm vào một khung để nghe riêng câu đó.</p>
    </div>
  );
}
