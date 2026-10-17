import { useEffect, useRef, useState } from 'react';
import { play, stopAudio } from '../lib/audio.js';
import { markSyllables, similarity } from '../lib/korean.js';
import { useProgress } from '../lib/store.jsx';
import Icon from './Icon.jsx';

const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

function verdict(score) {
  if (score >= 90) return ['good', 'Rất tốt! Phát âm gần như chuẩn.'];
  if (score >= 70) return ['ok', 'Khá tốt. Nghe lại mẫu và chú ý các âm tô đỏ.'];
  if (score >= 40) return ['warn', 'Cần luyện thêm. Đọc chậm, rõ từng âm tiết.'];
  return ['bad', 'Máy chưa nhận ra câu. Hãy nói to, rõ và gần micro hơn.'];
}

// Luyện nói một câu: nghe mẫu → ghi âm giọng mình → nghe lại → máy chấm điểm (nếu trình duyệt hỗ trợ).
export default function SpeakCheck({ text, vi, voice = 'female', pkey }) {
  const { p, markPracticed } = useProgress();
  const [state, setState] = useState('idle'); // idle | rec | done
  const [url, setUrl] = useState(null);
  const [heard, setHeard] = useState(null);
  const [score, setScore] = useState(null);
  const [err, setErr] = useState('');
  const rec = useRef(null);
  const recog = useRef(null);
  const stream = useRef(null);

  useEffect(() => () => { stopAll(); if (url) URL.revokeObjectURL(url); }, []);

  function stopAll() {
    try { recog.current?.stop(); } catch { /* đã dừng */ }
    if (rec.current?.state === 'recording') rec.current.stop();
    stream.current?.getTracks().forEach(t => t.stop());
  }

  async function start() {
    setErr(''); setHeard(null); setScore(null);
    stopAudio();
    if (!navigator.mediaDevices?.getUserMedia) { setErr('Trình duyệt này không cho phép ghi âm.'); return; }
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setErr('Không truy cập được micro. Hãy cho phép quyền micro trong trình duyệt rồi thử lại.');
      return;
    }
    const chunks = [];
    const mr = new MediaRecorder(stream.current);
    mr.ondataavailable = e => e.data.size && chunks.push(e.data);
    mr.onstop = () => {
      const blob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' });
      setUrl(old => { if (old) URL.revokeObjectURL(old); return URL.createObjectURL(blob); });
      stream.current?.getTracks().forEach(t => t.stop());
      setState('done');
      if (pkey) markPracticed(pkey);
    };
    rec.current = mr;
    mr.start();
    setState('rec');

    if (SR) {
      const r = new SR();
      r.lang = 'ko-KR'; r.interimResults = false; r.maxAlternatives = 5;
      r.onresult = e => {
        const alts = Array.from(e.results[0]).map(a => a.transcript);
        let best = alts[0], bestScore = -1;
        for (const a of alts) { const s = similarity(text, a); if (s > bestScore) { best = a; bestScore = s; } }
        setHeard(best); setScore(bestScore);
      };
      r.onerror = ev => { if (ev.error !== 'no-speech' && ev.error !== 'aborted') setErr('Không chấm điểm được lần này (lỗi nhận dạng giọng nói).'); };
      r.onend = () => { if (rec.current?.state === 'recording') setTimeout(() => rec.current?.state === 'recording' && rec.current.stop(), 300); };
      recog.current = r;
      try { r.start(); } catch { /* đang chạy */ }
    } else {
      setTimeout(() => rec.current?.state === 'recording' && rec.current.stop(), Math.min(12000, 2500 + text.length * 250));
    }
  }

  const [cls, msg] = score != null ? verdict(score) : [];
  return (
    <div className={`speak ${p.practiced[pkey] ? 'is-done' : ''}`}>
      <div className="speak-text">
        <span className="ko">{text}</span>
        {vi && <small>{vi}</small>}
      </div>
      <div className="row">
        <button type="button" className="btn" onClick={() => play(text, voice)}><Icon name="sound" size={16} /> Nghe mẫu</button>
        {state !== 'rec'
          ? <button type="button" className="btn primary" onClick={start}><Icon name="mic" size={16} /> {state === 'done' ? 'Nói lại' : 'Nói'}</button>
          : <button type="button" className="btn rec" onClick={stopAll}><Icon name="stop" size={16} /> Dừng ghi</button>}
        {url && <audio src={url} controls className="mini-audio" aria-label="Giọng bạn vừa ghi" />}
      </div>
      {state === 'rec' && <p className="small muted">Đang ghi âm… Hãy đọc to câu trên.</p>}
      {score != null && (
        <div className={`score-box ${cls}`}>
          <b className="score-num">{score}</b><span className="small">/100</span>
          <div className="score-detail">
            <div className="ko marks">{markSyllables(text, heard || '').map((m, i) => <span key={i} className={m.ok ? '' : 'miss'}>{m.ch}</span>)}</div>
            <small>Máy nghe được: <span className="ko">{heard}</span></small>
            <small>{msg}</small>
          </div>
        </div>
      )}
      {state === 'done' && score == null && !SR && <p className="small muted">Trình duyệt này không chấm điểm tự động (hãy dùng Chrome hoặc Edge). Bạn vẫn có thể nghe lại giọng mình để so với mẫu.</p>}
      {err && <p className="small err">{err}</p>}
    </div>
  );
}
