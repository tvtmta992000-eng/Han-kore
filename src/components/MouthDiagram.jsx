import { useEffect, useRef, useState } from 'react';
import { POSES, KIND_LABEL } from '../data/hangul.js';
import { play } from '../lib/audio.js';
import Icon from './Icon.jsx';

const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
function mix(A, B, t) {
  return {
    tongue: A.tongue.map((p, i) => [lerp(p[0], B.tongue[i][0], t), lerp(p[1], B.tongue[i][1], t)]),
    lips: lerp(A.lips, B.lips, t), round: lerp(A.round, B.round, t), jaw: lerp(A.jaw, B.jaw, t), velum: lerp(A.velum, B.velum, t)
  };
}

// Đường cong mượt đi qua các điểm (Catmull-Rom → Bézier)
function smooth(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
}

// Kịch bản chuyển động cho một âm.
function timeline(sound, groupPose) {
  const target = { ...POSES[sound.pose || groupPose] };
  if (sound.kind === 'nasal') target.velum = 1;
  const vowel = POSES.vA;
  if (sound.kind === 'vowel') {
    return [
      { pose: POSES.rest, dur: 350, cap: 'Tư thế nghỉ' },
      { pose: target, dur: 650, cap: 'Đặt lưỡi và môi', flow: 'none' },
      { pose: target, dur: 1100, cap: 'Phát âm: hơi đi tự do qua miệng', flow: 'oral', sound: true }
    ];
  }
  const release = sound.kind === 'nasal'
    ? { pose: { ...vowel, velum: 0.4 }, dur: 900, cap: 'Mở miệng sang nguyên âm', flow: 'oral' }
    : { pose: vowel, dur: 900, cap: sound.kind === 'asp' ? 'Bật mạnh: luồng hơi lớn' : sound.kind === 'tense' ? 'Bật căng: không có luồng hơi' : 'Mở ra nhẹ nhàng', flow: 'oral', puff: sound.kind === 'asp' ? 2 : sound.kind === 'tense' ? 0 : 1 };
  return [
    { pose: POSES.rest, dur: 350, cap: 'Tư thế nghỉ' },
    { pose: target, dur: 650, cap: 'Đặt lưỡi / môi vào vị trí', flow: 'none' },
    { pose: target, dur: 750, cap: sound.kind === 'nasal' ? 'Giữ nguyên, hơi thoát ra mũi' : sound.kind === 'tense' ? 'Giữ và căng cổ họng' : 'Giữ và dồn hơi', flow: sound.kind === 'nasal' ? 'nasal' : 'none', tense: sound.kind === 'tense', sound: sound.kind === 'nasal' || sound.kind === 'fric' || sound.kind === 'liquid' },
    { ...release, sound: !(sound.kind === 'nasal' || sound.kind === 'fric' || sound.kind === 'liquid') }
  ];
}

export default function MouthDiagram({ group }) {
  const [sel, setSel] = useState(0);
  const sound = group.sounds[sel];
  const [pose, setPose] = useState(POSES[sound.pose || group.pose]);
  const [frame, setFrame] = useState({ cap: 'Chạm "Xem chuyển động" để bắt đầu', flow: 'none', puff: 0, tense: false });
  const [playing, setPlaying] = useState(false);
  const raf = useRef(0);
  const run = useRef(0);
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => { const base = POSES[sound.pose || group.pose]; setPose(sound.kind === 'nasal' ? { ...base, velum: 1 } : base); setFrame(f => ({ ...f, flow: 'none', puff: 0, tense: false })); }, [sel, group]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  async function start() {
    cancelAnimationFrame(raf.current);
    const my = ++run.current;
    setPlaying(true);
    const steps = timeline(sound, group.pose);
    let from = POSES.rest;
    for (const st of steps) {
      if (my !== run.current) return;
      setFrame({ cap: st.cap, flow: st.flow || 'none', puff: st.puff || 0, tense: !!st.tense });
      if (st.sound) play(sound.syl);
      await new Promise(res => {
        const t0 = performance.now();
        const tick = now => {
          const t = reduce ? 1 : Math.min(1, (now - t0) / Math.min(st.dur, 500));
          setPose(mix(from, st.pose, ease(t)));
          if (now - t0 < st.dur && my === run.current) raf.current = requestAnimationFrame(tick); else res();
        };
        raf.current = requestAnimationFrame(tick);
      });
      from = st.pose;
    }
    if (my === run.current) setPlaying(false);
  }

  const j = pose.jaw * 24;
  const gap = (1 - pose.lips) * 22;
  const pr = pose.round * 9;
  const upY = 108;                        // mép dưới môi trên
  const loY = upY + gap + j * 0.55;       // mép trên môi dưới
  const midY = (upY + loY) / 2;
  const [tx, ty] = pose.tongue[0];
  const tongue = `${smooth(pose.tongue)} C${pose.tongue[5][0] + 6},186 208,198 198,203 C170,206 130,${194 + j * 0.3} 104,${180 + j * 0.5} C90,${174 + j * 0.5} ${tx - 6},${ty + 16} ${tx},${ty} Z`;
  const vel = [lerp(232, 214, pose.velum), lerp(100, 130, pose.velum)];
  const velum = `M180,90 C196,${lerp(90, 98, pose.velum)} ${vel[0] - 8},${vel[1] - 6} ${vel[0]},${vel[1]}`;
  const head = `M118,0 C104,18 74,32 62,48 C52,62 26,70 18,80 C14,86 24,92 40,92 C42,96 ${32 - pr},${upY - 8} ${30 - pr},${upY - 3} C${30 - pr},${upY} 40,${upY} 52,${upY - 1}
    L52,${loY + 1} C40,${loY} ${30 - pr},${loY + 2} ${30 - pr},${loY + 8} C${32 - pr},${loY + 18} 42,${loY + 22} 44,${loY + 28}
    C44,${176 + j} 40,${200 + j} 56,${214 + j} C86,${232 + j} 140,228 160,280 L300,280 L300,0 Z`;
  const oral = `M52,${upY - 2} L60,${upY - 4} C70,100 80,96 92,95 C120,92 150,90 180,90 L238,96 L246,104 L246,280 L214,280 L212,220
    C176,214 120,${206 + j * 0.4} 92,${184 + j * 0.6} C76,${172 + j * 0.8} 66,${150 + j} 60,${loY + 4} L52,${loY + 2} Z`;
  const nasal = 'M40,90 C54,74 70,58 100,54 C140,48 200,50 228,62 C240,70 246,84 246,104 L238,96 L180,86 C140,84 90,86 52,90 Z';
  const flowPath = `M232,272 C232,200 234,${Math.min(140, ty)} 214,${Math.min(pose.tongue[4][1], 126) - 12} C170,${pose.tongue[3][1] - 14} 120,${pose.tongue[2][1] - 14} 80,${Math.min(ty - 10, midY + 2)} L10,${midY}`;

  return (
    <div className="mouth">
      <div className="mouth-stage">
        <svg viewBox="0 0 300 280" role="img" aria-label={`Sơ đồ khẩu hình âm ${sound.ch}`}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="m-flow-head" />
            </marker>
          </defs>
          <path className="m-skin" d={head} />
          <path className="m-cavity" d={nasal} />
          <path className="m-cavity" d={oral} />
          <path className="m-palate" d="M60,104 C70,100 80,96 92,95 C120,92 150,90 180,90" />
          <path className="m-velum" d={velum} />
          <path className="m-teeth" d="M54,94 L66,94 L68,110 L58,114 Z" />
          <path className="m-teeth" d={`M56,${loY + 20} L66,${loY + 14} L68,${loY + 28} L58,${loY + 30} Z`} />
          <path className="m-lip" d={`M40,92 C42,96 ${32 - pr},${upY - 8} ${30 - pr},${upY - 3} C${30 - pr},${upY} 40,${upY} 52,${upY - 1} L54,${upY - 8} C50,98 46,94 40,92 Z`} />
          <path className="m-lip" d={`M52,${loY + 1} C40,${loY} ${30 - pr},${loY + 2} ${30 - pr},${loY + 8} C${32 - pr},${loY + 16} 42,${loY + 18} 50,${loY + 14} Z`} />
          <path className="m-tongue" d={tongue} />
          <path className={`m-larynx ${frame.tense ? 'm-tense' : ''}`} d="M222,236 L244,236 M222,246 L244,246" />
          {frame.tense && <g className="m-tense-mark"><path d="M254,226 l8,-6 M254,241 l10,0 M254,256 l8,6" /></g>}
          {frame.flow === 'oral' && <path className="m-flow" markerEnd="url(#arrow)" d={flowPath} />}
          {frame.flow === 'nasal' && <path className="m-flow" markerEnd="url(#arrow)" d="M232,272 C232,200 236,120 232,92 C220,64 150,60 90,66 L22,84" />}
          {frame.puff > 0 && Array.from({ length: frame.puff * 3 }, (_, i) => (
            <circle key={i} className="m-puff" cx={12 - i * 3} cy={midY + ((i % 3) - 1) * 7} r={2 + frame.puff * 1.5} style={{ animationDelay: `${i * 80}ms` }} />
          ))}
          <text className="m-label" x="120" y="72">Khoang mũi</text>
          <text className="m-label" x="128" y="84">Vòm cứng</text>
          <text className="m-label" x="190" y="80">Vòm mềm</text>
          <text className="m-label" x="72" y="86">Lợi</text>
          <text className="m-label m-label-in" x="140" y="180">Lưỡi</text>
          <text className="m-label" x="252" y="270">Họng</text>
        </svg>
        <div className="mouth-cap" aria-live="polite">{frame.cap}</div>
      </div>
      <div className="mouth-side">
        <div className="chips">
          {group.sounds.map((s, i) => (
            <button key={i} type="button" aria-pressed={i === sel} onClick={() => { run.current++; setPlaying(false); setSel(i); }}>
              <span className="ko">{s.ch}</span>{s.syl !== s.ch && <small className="ko"> {s.syl}</small>}
            </button>
          ))}
        </div>
        <p className="small"><b>{KIND_LABEL[sound.kind]}</b></p>
        <div className="row">
          <button type="button" className="btn primary" onClick={start} disabled={playing}><Icon name="play" size={16} /> Xem chuyển động</button>
          <button type="button" className="btn" onClick={() => play(sound.syl)}><Icon name="sound" size={16} /> Nghe <span className="ko">{sound.syl}</span></button>
        </div>
        <ol className="steps small">{group.how.map((h, i) => <li key={i}>{h}</li>)}</ol>
      </div>
    </div>
  );
}
