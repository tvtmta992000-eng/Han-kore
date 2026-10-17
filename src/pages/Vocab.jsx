import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ALL_WORDS, LEVEL_NAMES, TOPICS } from '../data/vocab.js';
import { useProgress } from '../lib/store.jsx';
import Say from '../components/Say.jsx';
import Flashcards from '../components/Flashcards.jsx';
import Quiz from '../components/Quiz.jsx';
import Icon from '../components/Icon.jsx';
import { playSequence } from '../lib/audio.js';

const pickN = (arr, n) => arr.slice().sort(() => Math.random() - 0.5).slice(0, n);

export function makeVocabQuiz(words, n = 10) {
  return pickN(words, Math.min(n, words.length)).map((w, i) => {
    const others = pickN(words.filter(x => x.vi !== w.vi), 3);
    if (i % 3 === 2) return { q: 'Nghe và chọn nghĩa đúng', audio: w.ko, o: [w.vi, ...others.map(x => x.vi)] };
    if (i % 3 === 1) return { q: `"${w.vi}" trong tiếng Hàn là`, o: [w.ko, ...others.map(x => x.ko)], oko: 1 };
    return { q: w.ko, ko: 1, o: [w.vi, ...others.map(x => x.vi)] };
  });
}

function TopicView({ topic }) {
  const { p, toggleWord, visit } = useProgress();
  const [mode, setMode] = useState('list');
  useEffect(() => { visit({ path: `/tu-vung/${topic.id}`, title: topic.name, type: 'vocab', sub: `${topic.words.length} từ`, preview: topic.words.slice(0, 6).map(w => w.ko) }); }, [topic.id]);
  const make = useCallback(() => makeVocabQuiz(topic.words), [topic]);
  const learned = topic.words.filter(w => p.words[w.ko]).length;
  return (
    <section className="sec">
      <Link to="/tu-vung" className="small">← Tất cả chủ đề</Link>
      <div className="sec-h"><span className="eyebrow">{LEVEL_NAMES[topic.level]} · {topic.words.length} từ</span><h2>{topic.name}</h2>
        <p className="small muted">Đã thuộc {learned}/{topic.words.length}</p></div>
      <div className="tabs" role="group">
        {[['list', 'Danh sách'], ['cards', 'Thẻ ghi nhớ'], ['quiz', 'Kiểm tra']].map(([k, l]) => <button key={k} type="button" aria-pressed={mode === k} onClick={() => setMode(k)}>{l}</button>)}
        {mode === 'list' && <button type="button" className="btn" onClick={() => playSequence(topic.words.map(w => ({ text: w.ko, voice: 'female' })))}><Icon name="sound" size={16} /> Nghe tất cả</button>}
      </div>
      {mode === 'list' && (
        <div className="vocab">{topic.words.map(w => (
          <div key={w.ko} className={`vw ${p.words[w.ko] ? 'known' : ''}`}>
            <Say text={w.ko} />
            <div className="t"><span className="ko">{w.ko}</span><small>{w.vi}</small></div>
            <button type="button" className="tick" aria-pressed={!!p.words[w.ko]} aria-label="Đánh dấu đã thuộc" onClick={() => toggleWord(w.ko)}><Icon name="check" size={14} /></button>
          </div>
        ))}</div>
      )}
      {mode === 'cards' && <Flashcards words={topic.words} />}
      {mode === 'quiz' && <Quiz id={`vq-${topic.id}`} make={make} title={`Từ vựng: ${topic.name}`} />}
    </section>
  );
}

export default function Vocab() {
  const { topic: tid } = useParams();
  const { p } = useProgress();
  const [lv, setLv] = useState(0);
  const [q, setQ] = useState('');
  const topic = TOPICS.find(t => t.id === tid);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return ALL_WORDS.filter(w => w.ko.includes(s) || w.vi.toLowerCase().includes(s)).slice(0, 60);
  }, [q]);
  if (topic) return <TopicView topic={topic} />;

  return (
    <section className="sec">
      <div className="sec-h"><span className="eyebrow">어휘 · Từ vựng</span><h2>{ALL_WORDS.length.toLocaleString('vi-VN')} từ theo {TOPICS.length} chủ đề</h2>
        <p className="lead">Mỗi chủ đề có danh sách nghe được, thẻ ghi nhớ và bài kiểm tra. Đánh dấu từ đã thuộc để thẻ chỉ còn các từ cần ôn.</p></div>
      <input id="v-search" type="search" className="search" placeholder="Tìm từ tiếng Hàn hoặc tiếng Việt…" value={q} onChange={e => setQ(e.target.value)} />
      {q.trim() ? (
        <div className="vocab">{results.length ? results.map((w, i) => (
          <div key={i} className="vw"><Say text={w.ko} /><div className="t"><span className="ko">{w.ko}</span><small>{w.vi} · {LEVEL_NAMES[w.level]}</small></div></div>
        )) : <p className="muted">Không tìm thấy từ phù hợp.</p>}</div>
      ) : (
        <>
          <div className="tabs" role="group">
            {[0, 1, 2, 3, 4, 5].map(l => <button key={l} type="button" aria-pressed={lv === l} onClick={() => setLv(l)}>{l ? LEVEL_NAMES[l] : 'Tất cả'}</button>)}
          </div>
          <div className="topics">{TOPICS.filter(t => !lv || t.level === lv).map(t => {
            const k = t.words.filter(w => p.words[w.ko]).length;
            return (
              <Link key={t.id} to={`/tu-vung/${t.id}`} className="topic">
                <span className="tag">{LEVEL_NAMES[t.level]}</span>
                <b>{t.name}</b>
                <span className="ko small muted">{t.words.slice(0, 4).map(w => w.ko).join(' · ')}</span>
                <span className="small muted">{k}/{t.words.length} đã thuộc</span>
                <span className="bar"><i style={{ width: (k / t.words.length * 100) + '%' }} /></span>
              </Link>
            );
          })}</div>
        </>
      )}
    </section>
  );
}
