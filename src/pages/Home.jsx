import { Link } from 'react-router-dom';
import { useAuth, useProgress, streakOf } from '../lib/store.jsx';
import { authEnabled } from '../lib/supabase.js';
import { LESSONS, LEVELS } from '../data/lessons.js';
import { ALL_WORDS, TOPICS } from '../data/vocab.js';
import { GRAMMAR } from '../data/grammar.js';
import { PHRASE_SETS } from '../data/phrases.js';
import { SECTIONS } from '../App.jsx';
import { play } from '../lib/audio.js';
import InstallCard from '../components/InstallCard.jsx';

export default function Home() {
  const { user, name } = useAuth();
  const { p } = useProgress();
  const streak = streakOf(p.days);
  const learned = Object.keys(p.words).length;
  const lessonsDone = Object.keys(p.lessonsDone).length;
  const phraseCount = PHRASE_SETS.reduce((n, s) => n + s.lines.length, 0);

  const levelPct = lv => {
    const ls = LESSONS.filter(l => l.level === lv);
    let got = 0, tot = 0;
    ls.forEach(l => { tot += l.quiz.length + l.listen.qs.length + l.read.qs.length; got += (p.quiz['lv-' + l.id] || 0) + (p.quiz['ls-' + l.id] || 0) + (p.quiz['rd-' + l.id] || 0); });
    return tot ? Math.round(got / tot * 100) : 0;
  };

  return (
    <>
      <section className="hero">
        <div className="sec">
          <span className="eyebrow">{user ? `Chào ${name}` : 'Tự học từ con số 0 đến TOPIK 6'}</span>
          <h1>Học tiếng Hàn đủ <em>nghe, nói, đọc, viết</em>.</h1>
          <p className="lead">Video thứ tự nét cho 40 chữ cái, sơ đồ đặt lưỡi khi phát âm, {ALL_WORDS.length.toLocaleString('vi-VN')} từ vựng, {GRAMMAR.length} cấu trúc ngữ pháp, {phraseCount} mẫu câu luyện nói có ghi âm và chấm điểm.</p>
          <div className="row">
            <Link className="btn primary" to="/bang-chu-cai">Bắt đầu với Hangul</Link>
            <Link className="btn" to="/bai-hoc">Vào bài học</Link>
            {!user && authEnabled && <Link className="btn ghost" to="/dang-nhap">Đăng nhập để lưu tiến độ</Link>}
          </div>
        </div>
        <div>
          <div className="hero-ko" aria-label="한국어">{['한', '국', '어'].map(c => <button key={c} type="button" onClick={() => play(c)}>{c}</button>)}</div>
          <p className="hero-cap">Chạm vào từng chữ để nghe · <span className="ko">한국어</span> = tiếng Hàn</p>
        </div>
      </section>

      <section className="stats">
        <div className="stat"><b>{streak}</b><span>ngày học liên tiếp</span></div>
        <div className="stat"><b>{learned}</b><span>từ đã thuộc / {ALL_WORDS.length}</span></div>
        <div className="stat"><b>{lessonsDone}</b><span>bài học xong / {LESSONS.length}</span></div>
        <div className="stat"><b>{Object.keys(p.practiced).length}</b><span>câu đã luyện nói</span></div>
      </section>

      <InstallCard />

      <section className="sec">
        <div className="sec-h"><span className="eyebrow">Lộ trình</span><h2>Chọn cấp độ</h2></div>
        <div className="path">
          <Link className="lv" to="/bang-chu-cai"><span className="tag">Nhập môn</span><b>Hangul & phát âm</b><span className="small muted">40 chữ cái, video nét viết, khẩu hình, 7 quy tắc biến âm.</span></Link>
          {LEVELS.map(lv => {
            const pct = levelPct(lv.level);
            return (
              <Link key={lv.level} className="lv" to={`/bai-hoc?cap=${lv.level}`}>
                <span className="tag">{lv.topik}</span><b>{lv.name}</b>
                <span className="small muted">{lv.desc}</span>
                <span className="small muted">{TOPICS.filter(t => t.level === lv.level).reduce((n, t) => n + t.words.length, 0)} từ · {GRAMMAR.filter(g => g.level === lv.level).length} ngữ pháp · {pct}% bài tập</span>
                <span className="bar"><i style={{ width: pct + '%' }} /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="sec">
        <div className="sec-h"><span className="eyebrow">Tất cả mục</span><h2>Học theo kỹ năng</h2></div>
        <div className="sections">
          {SECTIONS.map(([to, label, ko]) => <Link key={to} to={to} className="sk"><span className="ko">{ko}</span><b>{label}</b></Link>)}
        </div>
      </section>
    </>
  );
}
