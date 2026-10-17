import { useState } from 'react';
import { playSequence, stopAudio } from '../lib/audio.js';
import { voiceForSpeaker } from '../lib/speakable.js';
import Say from './Say.jsx';
import Icon from './Icon.jsx';

export default function Dialogue({ lines, hideByDefault = true }) {
  const [hidden, setHidden] = useState(hideByDefault);
  const [on, setOn] = useState(-1);
  const female = sp => voiceForSpeaker(sp) === 'female';
  return (
    <div className="sec">
      <div className="row">
        <button type="button" className="btn primary" onClick={() => playSequence(lines.map(l => ({ text: l[1], voice: voiceForSpeaker(l[0]) })), setOn)}><Icon name="play" size={16} /> Nghe cả bài</button>
        <button type="button" className="btn" onClick={() => { stopAudio(); setOn(-1); }}><Icon name="stop" size={16} /> Dừng</button>
        <button type="button" className="btn" onClick={() => setHidden(h => !h)}>{hidden ? 'Hiện lời thoại' : 'Ẩn lời thoại'}</button>
      </div>
      <div className={`dlg ${hidden ? 'hidden-script' : ''}`}>
        {lines.map((l, i) => (
          <div key={i} className={`ln ${on === i ? 'on' : ''}`}>
            <span className={`sp ${female(l[0]) ? 'b' : ''}`}>{l[0]}</span>
            <div className="txt"><div className="ko">{l[1]}</div><div className="vi">{l[2]}</div></div>
            <Say text={l[1]} voice={voiceForSpeaker(l[0])} />
          </div>
        ))}
      </div>
    </div>
  );
}
