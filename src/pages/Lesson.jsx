import { Link, useParams, useSearchParams } from 'react-router-dom';
import { LESSONS } from '../data/lessons.js';
import { LEVEL_NAMES, TOPICS } from '../data/vocab.js';
import { GRAMMAR } from '../data/grammar.js';
import { PHRASE_SETS } from '../data/phrases.js';
import { useProgress } from '../lib/store.jsx';
import Say from '../components/Say.jsx';
import Quiz from '../components/Quiz.jsx';
import Dialogue from '../components/Dialogue.jsx';
import SpeakCheck from '../components/SpeakCheck.jsx';
import { useState } from 'react';

const SKILLS = [['vocab', 'Từ vựng'], ['grammar', 'Ngữ pháp'], ['listen', 'Nghe'], ['speak', 'Nói'], ['read', 'Đọc'], ['write', 'Viết'], ['quiz', 'Bài tập']];

function Writing({ l }) {
  const { p, setDraft } = useProgress();
  const W = l.write;
  const text = p.drafts[l.id] || '';
  const n = text.length;
  const [checks, setChecks] = useState({});
  return (
    <div className="sec">
      <div className="card sec"><span className="eyebrow">Đề bài</span><p>{W.prompt}</p>
        {W.data && <div className="tbl-wrap"><table className="datatbl"><tbody>{W.data.map(r => <tr key={r[0]}><th>{r[0]}</th><td className="ko">{r[1]}</td></tr>)}</tbody></table></div>}
        <ul className="steps small">{W.tips.map(t => <li key={t}>{t}</li>)}</ul></div>
      <label htmlFor={`w-${l.id}`} className="small muted">Bài viết của bạn (tự lưu nháp)</label>
      <textarea id={`w-${l.id}`} className="ko" value={text} onChange={e => setDraft(l.id, e.target.value)} placeholder="여기에 쓰세요…" />
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className={`count ${n >= W.min && n <= W.max ? 'good' : n ? 'warn' : ''}`}>{n} chữ</span>
        <span className="small muted">Yêu cầu: {W.min}–{W.max} chữ (tính cả dấu cách)</span>
      </div>
      <div className="card sec"><h3>Tự kiểm tra</h3><div className="checklist">{W.check.map((c, i) => (
        <label key={c}><input type="checkbox" checked={!!checks[i]} onChange={e => setChecks({ ...checks, [i]: e.target.checked })} /> {c}</label>
      ))}</div></div>
      <details><summary>Xem bài mẫu ({W.model.length} chữ)</summary>
        <div className="row top"><Say text={W.model} label="Nghe bài mẫu" /><p className="model ko">{W.model}</p></div></details>
    </div>
  );
}

export default function Lesson() {
  const { id } = useParams();
  const [sp, setSp] = useSearchParams();
  const { p, markLesson } = useProgress();
  const l = LESSONS.find(x => x.id === id);
  const [showVi, setShowVi] = useState(false);
  if (!l) return <section className="sec"><h2>Không tìm thấy bài học</h2><Link to="/bai-hoc" className="btn">Danh sách bài học</Link></section>;
  const skill = sp.get('ky-nang') || 'vocab';
  const words = TOPICS.filter(t => l.vocabTopics.includes(t.id));
  const gram = GRAMMAR.filter(g => l.grammar.includes(g.id));
  const phrases = PHRASE_SETS.find(s => s.id === l.speak.phrases);
  const idx = LESSONS.indexOf(l);
  const next = LESSONS[idx + 1];

  return (
    <section className="sec">
      <Link to={`/bai-hoc?cap=${l.level}`} className="small">← {LEVEL_NAMES[l.level]}</Link>
      <div className="sec-h"><span className="eyebrow">{LEVEL_NAMES[l.level]}</span><h2>{l.title}</h2><p className="lead">Mục tiêu: {l.goal}</p></div>
      <div className="skilltabs" role="group" aria-label="Kỹ năng">
        {SKILLS.map(([k, label]) => <button key={k} type="button" aria-pressed={k === skill} onClick={() => setSp({ 'ky-nang': k }, { replace: true })}>{label}</button>)}
      </div>

      {skill === 'vocab' && words.map(t => (
        <div key={t.id} className="sec">
          <div className="row" style={{ justifyContent: 'space-between' }}><h3>{t.name}</h3><Link className="btn sm" to={`/tu-vung/${t.id}`}>Thẻ ghi nhớ & kiểm tra</Link></div>
          <div className="vocab">{t.words.map(w => <div key={w.ko} className="vw"><Say text={w.ko} /><div className="t"><span className="ko">{w.ko}</span><small>{w.vi}</small></div></div>)}</div>
        </div>
      ))}

      {skill === 'grammar' && <div className="grid g2">{gram.map(g => (
        <div key={g.id} className="card gram"><span className="pat">{g.p}</span><b>{g.m}</b><div className="note">{g.n}</div>
          <div className="exs">{g.ex.map((e, i) => <div key={i} className="exl"><Say text={e.ko} /><span className="w ko">{e.ko}</span><span className="vi">{e.vi}</span></div>)}</div></div>
      ))}</div>}

      {skill === 'listen' && <>
        <div className="card sec"><h3>{l.listen.title}</h3><p className="small muted">Nghe 2–3 lần, trả lời câu hỏi, rồi mới mở lời thoại để kiểm tra.</p><Dialogue lines={l.listen.lines} /></div>
        <h3>Câu hỏi nghe hiểu</h3><Quiz id={`ls-${l.id}`} items={l.listen.qs} />
      </>}

      {skill === 'speak' && <>
        <div className="card sec"><h3>Nghe và nhắc lại</h3><p className="small muted">Mỗi câu: nghe mẫu → bấm Nói → nghe lại giọng mình và xem điểm.</p>
          <div className="speak-list">{l.listen.lines.map((ln, i) => <SpeakCheck key={'d' + i} text={ln[1]} vi={ln[2]} voice={ln[0] === 'A' || ln[0] === '남' ? 'male' : 'female'} pkey={`ls-${l.id}-${i}`} />)}
            {phrases?.lines.slice(0, 4).map((ln, i) => <SpeakCheck key={'p' + i} text={ln.ko} vi={ln.vi} pkey={`ph-${phrases.id}-${i}`} />)}</div></div>
        <div className="card sec"><span className="eyebrow">Chủ đề nói</span><h3>{l.speak.prompt}</h3>
          <ul className="steps small">{l.speak.tips.map(t => <li key={t}>{t}</li>)}</ul>
          <details><summary>Bài nói mẫu</summary><div className="row top"><Say text={l.speak.sample} label="Nghe bài mẫu" /><p className="model ko">{l.speak.sample}</p></div></details>
          <SpeakCheck text={l.speak.sample} vi="Đọc lại bài mẫu để luyện ngữ điệu" pkey={`sp-${l.id}`} />
        </div>
      </>}

      {skill === 'read' && <>
        <div className="card sec">
          <div className="row" style={{ justifyContent: 'space-between' }}><h3>{l.read.title}</h3><div className="row"><Say text={l.read.text}>Nghe bài đọc</Say><button type="button" className="btn" onClick={() => setShowVi(v => !v)}>{showVi ? 'Ẩn bản dịch' : 'Hiện bản dịch'}</button></div></div>
          <p className="passage ko">{l.read.text}</p>
          {showVi && <p className="passage vi">{l.read.vi}</p>}
        </div>
        <h3>Câu hỏi đọc hiểu</h3><Quiz id={`rd-${l.id}`} items={l.read.qs} />
      </>}

      {skill === 'write' && <Writing l={l} />}

      {skill === 'quiz' && <>
        <Quiz id={`lv-${l.id}`} items={l.quiz} />
        <div className="row">
          <button type="button" className="btn primary" onClick={() => markLesson(l.id)} disabled={!!p.lessonsDone[l.id]}>{p.lessonsDone[l.id] ? 'Đã hoàn thành bài này' : 'Đánh dấu hoàn thành bài'}</button>
          {next && <Link className="btn" to={`/bai-hoc/${next.id}`}>Bài tiếp: {next.title} →</Link>}
        </div>
      </>}
    </section>
  );
}
