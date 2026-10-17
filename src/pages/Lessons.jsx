import { Link, useSearchParams } from 'react-router-dom';
import { LESSONS, LEVELS } from '../data/lessons.js';
import { useProgress } from '../lib/store.jsx';
import LessonCover from '../components/LessonCover.jsx';

export default function Lessons() {
  const [sp, setSp] = useSearchParams();
  const lv = +(sp.get('cap') || 1);
  const { p } = useProgress();
  const level = LEVELS.find(l => l.level === lv) || LEVELS[0];
  return (
    <section className="sec">
      <div className="sec-h"><span className="eyebrow">수업 · Bài học</span><h2>Bài học theo cấp độ</h2>
        <p className="lead">Mỗi bài gồm từ vựng, ngữ pháp, nghe, nói (ghi âm và chấm điểm), đọc, viết và bài tập.</p></div>
      <div className="lvtabs" role="group" aria-label="Cấp độ">
        {LEVELS.map(l => <button key={l.level} type="button" aria-pressed={l.level === lv} onClick={() => setSp({ cap: l.level })}><b>{l.name}</b><small>{l.topik}</small></button>)}
      </div>
      <p className="muted">{level.desc}</p>
      <div className="grid g2">{LESSONS.filter(l => l.level === lv).map((l, i) => {
        const tot = l.quiz.length + l.listen.qs.length + l.read.qs.length;
        const got = (p.quiz['lv-' + l.id] || 0) + (p.quiz['ls-' + l.id] || 0) + (p.quiz['rd-' + l.id] || 0);
        return (
          <Link key={l.id} to={`/bai-hoc/${l.id}`} className="card lesson-card has-cover">
            <LessonCover id={l.id} />
            <span className="tag">Bài {i + 1}{p.lessonsDone[l.id] ? ' · Đã hoàn thành' : ''}</span>
            <b>{l.title}</b>
            <span className="small muted">{l.goal}</span>
            <span className="bar"><i style={{ width: Math.round(got / tot * 100) + '%' }} /></span>
          </Link>
        );
      })}</div>
    </section>
  );
}
