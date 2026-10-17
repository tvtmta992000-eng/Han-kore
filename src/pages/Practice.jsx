import { useCallback, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Quiz from '../components/Quiz.jsx';
import { CONFUSE, PRON_QUIZ } from '../data/hangul.js';
import { ALL_WORDS, LEVEL_NAMES } from '../data/vocab.js';
import { GRAMMAR } from '../data/grammar.js';
import { LESSONS } from '../data/lessons.js';
import { makeVocabQuiz } from './Vocab.jsx';

const rnd = a => a[Math.floor(Math.random() * a.length)];
const TABS = [['ear', 'Nghe chữ cái'], ['pron', 'Phát âm đúng'], ['vocab', 'Từ vựng'], ['grammar', 'Ngữ pháp'], ['lessons', 'Theo bài học']];

export default function Practice() {
  const [sp, setSp] = useSearchParams();
  const tab = sp.get('tab') || 'ear';
  const [lv, setLv] = useState(1);

  const ear = useCallback(() => Array.from({ length: 10 }, () => {
    const g = rnd(CONFUSE), t = rnd(g);
    const o = [...g];
    while (o.length < 4) { const x = rnd(rnd(CONFUSE)); if (!o.includes(x)) o.push(x); }
    return { q: 'Bạn nghe thấy chữ nào?', audio: t, o: [t, ...o.filter(x => x !== t)], oko: 1 };
  }), []);
  const pron = useCallback(() => PRON_QUIZ.slice().sort(() => Math.random() - 0.5).slice(0, 10)
    .map(([w, o]) => ({ q: `"${w}" được phát âm là?`, audio: w, o: o.map(x => `[${x}]`), oko: 1 })), []);
  const vocab = useCallback(() => makeVocabQuiz(ALL_WORDS.filter(w => w.level === lv), 12), [lv]);
  const grammar = useCallback(() => {
    const pool = GRAMMAR.filter(g => g.level === lv);
    return pool.slice().sort(() => Math.random() - 0.5).slice(0, 10).map(g => {
      const others = pool.filter(x => x.id !== g.id).sort(() => Math.random() - 0.5).slice(0, 3);
      return { q: `Cấu trúc nào mang nghĩa "${g.m}"?`, o: [g.p, ...others.map(x => x.p)], oko: 1, ex: `Ví dụ: ${g.ex[0].ko} — ${g.ex[0].vi}` };
    });
  }, [lv]);

  return (
    <section className="sec">
      <div className="sec-h"><span className="eyebrow">연습 · Bài tập</span><h2>Bài tập tổng hợp</h2>
        <p className="lead">Mỗi lần bấm "Làm lại" sẽ có bộ câu hỏi mới. Điểm cao nhất được lưu vào tài khoản.</p></div>
      <div className="tabs" role="group">{TABS.map(([k, l]) => <button key={k} type="button" aria-pressed={tab === k} onClick={() => setSp({ tab: k })}>{l}</button>)}</div>
      {(tab === 'vocab' || tab === 'grammar') && (
        <div className="tabs" role="group">{[1, 2, 3, 4, 5].map(l => <button key={l} type="button" aria-pressed={lv === l} onClick={() => setLv(l)}>{LEVEL_NAMES[l]}</button>)}</div>
      )}
      {tab === 'ear' && <><p className="small muted">Nghe âm tiết và chọn chữ đúng. Các lựa chọn là những âm dễ nhầm.</p><Quiz id="ear" make={ear} /></>}
      {tab === 'pron' && <><p className="small muted">Chọn cách đọc thực tế của từ theo quy tắc biến âm.</p><Quiz id="pron" make={pron} /></>}
      {tab === 'vocab' && <Quiz key={'v' + lv} id={`vocab-${lv}`} make={vocab} />}
      {tab === 'grammar' && <Quiz key={'g' + lv} id={`gram-${lv}`} make={grammar} />}
      {tab === 'lessons' && <div className="grid g2">{LESSONS.map(l => (
        <Link key={l.id} to={`/bai-hoc/${l.id}?ky-nang=quiz`} className="card lesson-card"><span className="tag">{LEVEL_NAMES[l.level]}</span><b>{l.title}</b><span className="small muted">{l.quiz.length} câu</span></Link>
      ))}</div>}
    </section>
  );
}
