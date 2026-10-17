import { useEffect, useMemo, useState } from 'react';
import { play } from '../lib/audio.js';
import { useProgress } from '../lib/store.jsx';
import Icon from './Icon.jsx';
import WordIcon from './WordIcon.jsx';

const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// Thẻ ghi nhớ: mặt trước tiếng Hàn, lật xem nghĩa. "Chưa thuộc" chỉ ôn các từ chưa đánh dấu.
export default function Flashcards({ words }) {
  const { p, toggleWord } = useProgress();
  const [onlyNew, setOnlyNew] = useState(true);
  const [seed, setSeed] = useState(0);
  const deck = useMemo(() => {
    const base = onlyNew ? words.filter(w => !p.words[w.ko]) : words;
    return seed ? shuffle(base) : base;
  }, [words, onlyNew, seed]);
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const w = deck[Math.min(i, deck.length - 1)];
  useEffect(() => { setI(0); setFlip(false); }, [deck]);
  useEffect(() => { if (w) play(w.ko); }, [w]);

  if (!w) return <div className="card sec"><p>Bạn đã thuộc hết các từ trong chủ đề này.</p><div><button type="button" className="btn" onClick={() => setOnlyNew(false)}>Ôn lại tất cả</button></div></div>;
  const known = !!p.words[w.ko];
  const go = d => { setFlip(false); setI(x => (x + d + deck.length) % deck.length); };
  return (
    <div className="flash">
      <div className="row">
        <label className="small"><input type="checkbox" checked={onlyNew} onChange={e => setOnlyNew(e.target.checked)} /> Chỉ từ chưa thuộc</label>
        <button type="button" className="btn sm" onClick={() => setSeed(s => s + 1)}><Icon name="refresh" size={14} /> Trộn</button>
      </div>
      <button type="button" className="fc" onClick={() => setFlip(f => !f)}>
        {flip ? <><WordIcon word={w} size={72} /><span className="vi">{w.vi}</span><span className="ko muted">{w.ko}</span></> : <><WordIcon word={w} size={88} /><span className="ko">{w.ko}</span><small>Chạm để lật thẻ</small></>}
      </button>
      <div className="row center">
        <button type="button" className="btn" onClick={() => go(-1)}>← Trước</button>
        <button type="button" className="btn" onClick={() => play(w.ko)}><Icon name="sound" size={16} /> Nghe</button>
        <button type="button" className={`btn ${known ? 'ok' : ''}`} onClick={() => { toggleWord(w.ko); if (!known) go(1); }}><Icon name="check" size={16} /> {known ? 'Đã thuộc' : 'Thuộc rồi'}</button>
        <button type="button" className="btn primary" onClick={() => go(1)}>Sau →</button>
      </div>
      <span className="small muted count">{Math.min(i, deck.length - 1) + 1} / {deck.length}</span>
    </div>
  );
}
