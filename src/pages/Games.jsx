import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_WORDS, TOPICS } from '../data/vocab.js';
import { iconFor } from '../data/icons.js';
import { play } from '../lib/audio.js';
import { useProgress } from '../lib/store.jsx';
import useVisit from '../lib/useVisit.js';
import WordIcon from '../components/WordIcon.jsx';
import Icon from '../components/Icon.jsx';

const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const PICS = ALL_WORDS.filter(iconFor);
const PIC_TOPICS = TOPICS.filter(t => t.words.filter(iconFor).length >= 6);
const short = ko => ko.split(' / ')[0];

const GAMES = [
  ['listen', 'Nghe và chọn hình', 'sound', 'Nghe một từ tiếng Hàn, chạm vào bức tranh đúng.'],
  ['memory', 'Lật thẻ ghép cặp', 'card', 'Lật 2 thẻ một lần, ghép chữ Hàn với tranh của nó.'],
  ['race', 'Đua 60 giây', 'clock', 'Nhìn tranh, chọn từ đúng nhanh nhất có thể trong 60 giây.'],
  ['spell', 'Xếp chữ thành từ', 'pen', 'Nhìn tranh và nghĩa, xếp các âm tiết theo đúng thứ tự.']
];

function Result({ title, score, total, best, onAgain }) {
  return (
    <div className="card game-result">
      <span className="result-num">{score}{total != null && <small>/{total}</small>}</span>
      <b>{title}</b>
      {best != null && <span className="small muted">Kỷ lục của bạn: {best}</span>}
      <button type="button" className="btn primary" onClick={onAgain}><Icon name="refresh" size={16} /> Chơi lại</button>
    </div>
  );
}

/* 1. Nghe và chọn hình */
function ListenGame({ pool, onEnd, onAgain }) {
  const rounds = useMemo(() => shuffle(pool).slice(0, 10).map(w => ({ w, opts: shuffle([w, ...shuffle(pool.filter(x => x.ko !== w.ko)).slice(0, 3)]) })), [pool]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState(null);
  const [score, setScore] = useState(0);
  const r = rounds[i];
  useEffect(() => { if (r) setTimeout(() => play(r.w.ko), 250); }, [i]);
  if (!r) return <Result title="Nghe và chọn hình" score={score} total={rounds.length} best={onEnd(score, rounds.length)} onAgain={onAgain} />;
  const choose = o => {
    if (pick) return;
    setPick(o);
    if (o.ko === r.w.ko) setScore(s => s + 1);
    setTimeout(() => { setPick(null); setI(x => x + 1); }, 1100);
  };
  return (
    <div className="sec">
      <div className="game-bar"><span>Câu {i + 1}/{rounds.length}</span><span>Đúng: <b>{score}</b></span></div>
      <button type="button" className="big-listen" onClick={() => play(r.w.ko)}><Icon name="sound" size={28} /> Nghe lại</button>
      <div className="pic-grid">
        {r.opts.map(o => {
          const st = pick ? (o.ko === r.w.ko ? 'right' : o === pick ? 'wrong' : '') : '';
          return (
            <button key={o.topic + o.ko} type="button" className={`pic ${st}`} onClick={() => choose(o)}>
              <WordIcon word={o} size={84} />
              {pick && <small className="ko">{short(o.ko)}</small>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* 2. Lật thẻ ghép cặp */
function MemoryGame({ pool, onEnd, onAgain }) {
  const deck = useMemo(() => {
    const ws = shuffle(pool).slice(0, 6);
    return shuffle(ws.flatMap(w => [{ id: w.ko + 'a', key: w.ko, w, face: 'pic' }, { id: w.ko + 'b', key: w.ko, w, face: 'word' }]));
  }, [pool]);
  const [open, setOpen] = useState([]);
  const [done, setDone] = useState([]);
  const [moves, setMoves] = useState(0);
  const t0 = useRef(Date.now());
  const finished = done.length === deck.length;
  const flip = c => {
    if (open.length === 2 || open.includes(c.id) || done.includes(c.id)) return;
    if (c.face === 'word') play(c.w.ko);
    const next = [...open, c.id];
    setOpen(next);
    if (next.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = next.map(id => deck.find(x => x.id === id));
      setTimeout(() => {
        if (a.key === b.key) setDone(d => [...d, a.id, b.id]);
        setOpen([]);
      }, a.key === b.key ? 450 : 900);
    }
  };
  if (finished) {
    const secs = Math.round((Date.now() - t0.current) / 1000);
    return <Result title={`Hoàn thành sau ${moves} lượt · ${secs} giây`} score={moves} best={onEnd(Math.max(0, 30 - moves), 30)} onAgain={onAgain} />;
  }
  return (
    <div className="sec">
      <div className="game-bar"><span>Đã ghép: <b>{done.length / 2}</b>/6</span><span>Lượt: <b>{moves}</b></span></div>
      <div className="mem-grid">
        {deck.map(c => {
          const show = open.includes(c.id) || done.includes(c.id);
          return (
            <button key={c.id} type="button" className={`mem ${show ? 'show' : ''} ${done.includes(c.id) ? 'done' : ''}`} onClick={() => flip(c)} aria-label={show ? c.w.vi : 'Thẻ úp'}>
              {show ? (c.face === 'pic' ? <WordIcon word={c.w} size={64} /> : <span className="ko mem-word">{short(c.w.ko)}</span>) : <span className="mem-back ko">한</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* 3. Đua 60 giây */
function RaceGame({ pool, onEnd, onAgain }) {
  const [left, setLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [miss, setMiss] = useState(0);
  const [flash, setFlash] = useState('');
  const make = () => { const w = pool[Math.floor(Math.random() * pool.length)]; return { w, opts: shuffle([w, ...shuffle(pool.filter(x => x.ko !== w.ko)).slice(0, 3)]) }; };
  const [r, setR] = useState(make);
  useEffect(() => { if (left <= 0) return; const t = setTimeout(() => setLeft(l => l - 1), 1000); return () => clearTimeout(t); }, [left]);
  if (left <= 0) return <Result title={`Đúng ${score} từ · sai ${miss}`} score={score} best={onEnd(score)} onAgain={onAgain} />;
  const choose = o => {
    const ok = o.ko === r.w.ko;
    if (ok) { setScore(s => s + 1); play(r.w.ko); } else setMiss(m => m + 1);
    setFlash(ok ? 'right' : 'wrong');
    setTimeout(() => setFlash(''), 250);
    setR(make());
  };
  return (
    <div className="sec">
      <div className="game-bar"><span className={left <= 10 ? 'err' : ''}><Icon name="clock" size={15} /> <b>{left}</b> giây</span><span>Đúng: <b>{score}</b></span></div>
      <div className="bar race-bar"><i style={{ width: (left / 60 * 100) + '%' }} /></div>
      <div className={`race-pic ${flash}`}><WordIcon word={r.w} size={120} /></div>
      <div className="opts">{r.opts.map(o => <button key={o.topic + o.ko} type="button" className="opt ko race-opt" onClick={() => choose(o)}>{short(o.ko)}</button>)}</div>
    </div>
  );
}

/* 4. Xếp chữ thành từ */
function SpellGame({ pool, onEnd, onAgain }) {
  const rounds = useMemo(() => shuffle(pool.filter(w => !/[ /]/.test(w.ko) && w.ko.length >= 2 && w.ko.length <= 5)).slice(0, 8)
    .map(w => { let s = shuffle([...w.ko]); if (s.join('') === w.ko) s = s.reverse(); return { w, s }; }), [pool]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState([]);
  const [score, setScore] = useState(0);
  const [state, setState] = useState('');
  const r = rounds[i];
  if (!r) return <Result title="Xếp chữ thành từ" score={score} total={rounds.length} best={onEnd(score, rounds.length)} onAgain={onAgain} />;
  const word = picked.map(k => r.s[k]).join('');
  const add = k => {
    if (state || picked.includes(k)) return;
    const next = [...picked, k];
    setPicked(next);
    if (next.length === r.s.length) {
      const ok = next.map(x => r.s[x]).join('') === r.w.ko;
      setState(ok ? 'right' : 'wrong');
      if (ok) setScore(s => s + 1);
      play(r.w.ko);
      setTimeout(() => { setState(''); setPicked([]); setI(x => x + 1); }, 1400);
    }
  };
  return (
    <div className="sec">
      <div className="game-bar"><span>Từ {i + 1}/{rounds.length}</span><span>Đúng: <b>{score}</b></span></div>
      <div className="spell-top"><WordIcon word={r.w} size={96} /><b>{r.w.vi}</b></div>
      <div className={`spell-slots ${state}`}>
        {r.s.map((_, k) => <span key={k} className="slot ko">{word[k] || ''}</span>)}
      </div>
      {state === 'wrong' && <p className="small err center">Đáp án: <span className="ko">{r.w.ko}</span></p>}
      <div className="chips center">
        {r.s.map((ch, k) => <button key={k} type="button" className="wchip big" disabled={picked.includes(k) || !!state} onClick={() => add(k)}>{ch}</button>)}
      </div>
      <div className="row center"><button type="button" className="btn sm" onClick={() => setPicked([])} disabled={!picked.length || !!state}>Xóa</button></div>
    </div>
  );
}

export default function Games() {
  useVisit({ path: '/tro-choi', title: 'Trò chơi ôn tập', type: 'vocab', sub: '4 trò chơi có tranh', preview: ['개', '사과', '버스', '우산'] });
  const { p, setScore } = useProgress();
  const [game, setGame] = useState(null);
  const [topic, setTopic] = useState('all');
  const [round, setRound] = useState(0);
  const pool = useMemo(() => (topic === 'all' ? PICS : PICS.filter(w => w.topic === topic)), [topic]);

  const onEnd = id => (score, total) => {
    const key = 'game-' + id;
    const prev = p.quiz[key];
    if (prev == null || score > prev) setTimeout(() => setScore(key, score, total, GAMES.find(g => g[0] === id)[1]), 0);
    return Math.max(prev ?? 0, score);
  };
  const G = { listen: ListenGame, memory: MemoryGame, race: RaceGame, spell: SpellGame }[game];

  return (
    <section className="sec">
      <div className="page-head"><span className="eyebrow">놀이 · Trò chơi</span><h1>Trò chơi ôn tập</h1>
        <p className="muted">{PICS.length} từ có tranh minh họa, chia theo chủ đề. Chọn chủ đề rồi chọn trò chơi.</p></div>
      <label className="select"><span className="small muted">Chủ đề: </span>
        <select id="game-topic" value={topic} onChange={e => { setTopic(e.target.value); setRound(r => r + 1); }}>
          <option value="all">Tất cả ({PICS.length} từ)</option>
          {PIC_TOPICS.map(t => <option key={t.id} value={t.id}>{t.name} ({t.words.filter(iconFor).length})</option>)}
        </select>
      </label>
      {!G ? (
        <div className="games">
          {GAMES.map(([id, name, icon, desc]) => (
            <button key={id} type="button" className="game-card card" onClick={() => setGame(id)}>
              <span className="game-ic"><Icon name={icon} size={22} /></span>
              <b>{name}</b><span className="small muted">{desc}</span>
              {p.quiz['game-' + id] != null && <span className="tag">Kỷ lục: {p.quiz['game-' + id]}</span>}
            </button>
          ))}
        </div>
      ) : (
        <div className="card sec game-stage">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <h2>{GAMES.find(g => g[0] === game)[1]}</h2>
            <div className="row">
              <button type="button" className="btn sm" onClick={() => setRound(r => r + 1)}><Icon name="refresh" size={14} /> Ván mới</button>
              <button type="button" className="btn sm" onClick={() => setGame(null)}>← Chọn trò khác</button>
            </div>
          </div>
          <G key={game + topic + round} pool={pool} onEnd={onEnd(game)} onAgain={() => setRound(r => r + 1)} />
        </div>
      )}
    </section>
  );
}
