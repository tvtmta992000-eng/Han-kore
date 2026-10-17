import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useProgress, streakOf } from '../lib/store.jsx';
import { LESSONS, LEVELS } from '../data/lessons.js';
import { LEVEL_NAMES } from '../data/vocab.js';
import Icon from '../components/Icon.jsx';
import InstallCard from '../components/InstallCard.jsx';

// Mỗi cấp một màu, mỗi bài một chữ Hàn làm biểu tượng.
const LV_TONE = { 1: 'blue', 2: 'green', 3: 'orange', 4: 'violet', 5: 'pink' };
const GLYPH = { 's1-1': '안', 's1-2': '집', 's2-1': '돈', 's2-2': '날', 'm1-1': '몸', 'm1-2': '일', 'm2-1': '숲', 'm2-2': '값', 'c-1': '뇌', 'c-2': '전' };
const RECENT_GLYPH = { lesson: '수', vocab: '어', alphabet: '한', pron: '발', write: '쓰', speak: '말', grammar: '문' };

export function lessonSteps(l, p) {
  const steps = [
    p.quiz['ls-' + l.id] != null,
    p.quiz['rd-' + l.id] != null,
    p.quiz['lv-' + l.id] != null,
    (p.drafts[l.id] || '').length >= l.write.min,
    Object.keys(p.practiced).some(k => k.startsWith(`ls-${l.id}-`) || k === `sp-${l.id}`),
    !!p.lessonsDone[l.id]
  ];
  return { done: steps.filter(Boolean).length, total: steps.length };
}
const NEXT_SKILL = ['listen', 'read', 'quiz', 'write', 'speak', 'quiz'];
const SKILL_NAME = { listen: 'Nghe', read: 'Đọc', quiz: 'Bài tập', write: 'Viết', speak: 'Nói' };

function ago(ts) {
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 1) return 'vừa xong';
  if (m < 60) return `${m} phút trước`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} giờ trước`;
  return `${Math.round(h / 24)} ngày trước`;
}

function Bulb() {
  return (
    <svg className="bulb" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="50" r="44" fill="#FFE58A" opacity=".35" />
      <path d="M60 14c-19 0-33 14-33 32 0 12 6 20 12 26 4 4 6 8 6 13h30c0-5 2-9 6-13 6-6 12-14 12-26 0-18-14-32-33-32z" fill="#FFD43B" stroke="#E0A800" strokeWidth="2" />
      <path d="M50 70c0-12 4-22 10-28 6 6 10 16 10 28" fill="none" stroke="#C47F00" strokeWidth="3" strokeLinecap="round" />
      <rect x="45" y="86" width="30" height="8" rx="3" fill="#8D99AE" /><rect x="47" y="96" width="26" height="8" rx="3" fill="#6C7A91" /><rect x="52" y="106" width="16" height="6" rx="3" fill="#4B566A" />
      <path d="M18 26l-8-6M102 26l8-6M10 52H2M110 52h8" stroke="#FFD43B" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const { user } = useAuth();
  const { p } = useProgress();
  const scroller = useRef(null);
  const [tab, setTab] = useState('courses');
  const [sort, setSort] = useState('recent');
  const [view, setView] = useState('card');

  const withSteps = LESSONS.map(l => ({ l, ...lessonSteps(l, p) }));
  const schedule = [...withSteps.filter(x => x.done > 0 && x.done < x.total), ...withSteps.filter(x => x.done === 0)].slice(0, 4);
  const lastVisit = path => p.recent.find(r => r.path === path)?.ts || 0;
  const courses = useMemo(() => {
    const list = withSteps.slice();
    if (sort === 'recent') list.sort((a, b) => lastVisit(`/bai-hoc/${b.l.id}`) - lastVisit(`/bai-hoc/${a.l.id}`));
    return list;
  }, [sort, p]);

  const pending = withSteps.filter(x => x.done < x.total).slice(0, 3);
  const dueIn = [1, 2, 4];
  const now = new Date();
  const fmt = d => d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  const scroll = d => scroller.current?.scrollBy({ left: d * 260, behavior: 'smooth' });

  return (
    <div className="dash">
      <div className="dash-main">
        <section className="sec">
          <div className="sec-row"><h2>Lịch học hôm nay</h2>
            <div className="row"><span className="small muted">Chuỗi {streakOf(p.days)} ngày</span>
              <button type="button" className="circle-btn" onClick={() => scroll(-1)} aria-label="Trước"><Icon name="left" size={14} /></button>
              <button type="button" className="circle-btn" onClick={() => scroll(1)} aria-label="Sau"><Icon name="right" size={14} /></button></div>
          </div>
          <div className="hscroll" ref={scroller}>
            {schedule.map(({ l, done, total }, i) => {
              const pct = Math.round(done / total * 100);
              const skill = NEXT_SKILL[Math.min(done, NEXT_SKILL.length - 1)];
              return (
                <Link key={l.id} to={`/bai-hoc/${l.id}?ky-nang=${skill}`} className="sched card">
                  <span className={`glyph tone-${LV_TONE[l.level]}`}>{GLYPH[l.id]}</span>
                  <b>{l.title}</b>
                  <div className="sched-meta"><span>{LEVEL_NAMES[l.level]}</span><span>Bước <em>{done} / {total}</em></span></div>
                  <div className="prog"><span className="bar"><i style={{ width: pct + '%' }} /></span><b>{pct}%</b></div>
                  <small className="muted">Hôm nay · <b>{SKILL_NAME[skill]}</b> · ~{15 + i * 5} phút</small>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="sec">
          <div className="sec-row"><h2>Học gần đây</h2></div>
          <div className="files">
            {(p.recent.length ? p.recent.slice(0, 2) : [
              { path: '/bang-chu-cai', title: 'Bảng chữ cái Hangul', type: 'alphabet', sub: 'Gợi ý bắt đầu', preview: ['ㄱ', 'ㄴ', 'ㄷ', 'ㅏ', 'ㅓ', 'ㅗ'] },
              { path: '/phat-am', title: 'Khẩu hình phát âm', type: 'pron', sub: 'Gợi ý bắt đầu', preview: ['가', '카', '까', '국물', '[궁물]'] }
            ]).map(r => (
              <Link key={r.path} to={r.path} className="file card">
                <div className={`file-thumb t-${r.type}`}>
                  {(r.preview || [r.title]).slice(0, 6).map((w, i) => <span key={i} className="ko">{w}</span>)}
                </div>
                <div className="file-body">
                  <span className={`file-icon t-${r.type} ko`}>{RECENT_GLYPH[r.type] || '한'}</span>
                  <div><b>{r.title}</b><small className="muted">{r.ts ? `Mở ${ago(r.ts)}` : r.sub}</small></div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="sec">
          <div className="sec-row"><h2>Khóa học của tôi</h2></div>
          <div className="sec-row wrap">
            <div className="seg-tabs" role="group">
              <button type="button" aria-pressed={tab === 'courses'} onClick={() => setTab('courses')}>Bài học</button>
              <button type="button" aria-pressed={tab === 'timeline'} onClick={() => setTab('timeline')}>Lộ trình</button>
            </div>
            {tab === 'courses' && <div className="row">
              <label className="select"><span className="sr-only">Sắp xếp</span>
                <select id="course-sort" value={sort} onChange={e => setSort(e.target.value)}><option value="recent">Mở gần đây</option><option value="level">Theo cấp độ</option></select></label>
              <label className="select"><span className="sr-only">Kiểu hiển thị</span>
                <select id="course-view" value={view} onChange={e => setView(e.target.value)}><option value="card">Thẻ</option><option value="list">Danh sách</option></select></label>
            </div>}
          </div>
          {tab === 'courses' && <Link to="/bai-hoc" className="btn sm more-link">Xem tất cả {LESSONS.length} bài học</Link>}
          {tab === 'courses' ? (
            <div className={view === 'card' ? 'courses' : 'courses list'}>
              {courses.map(({ l, done, total }) => (
                <Link key={l.id} to={`/bai-hoc/${l.id}`} className="course card">
                  <div className="course-top">
                    <div><b>{l.title}</b><small className="muted">{done}/{total} bước{p.lessonsDone[l.id] ? ' · đã xong' : ''}</small></div>
                    <span className={`pill tone-${LV_TONE[l.level]}`}>{LEVEL_NAMES[l.level]}</span>
                  </div>
                  <div className="course-foot"><span>Xem chi tiết</span><Icon name="arrow" size={15} /></div>
                </Link>
              ))}
            </div>
          ) : (
            <ol className="timeline">
              <li className="tl done"><b>Nhập môn: Hangul & phát âm</b><small className="muted">40 chữ cái · khẩu hình · biến âm</small><Link to="/bang-chu-cai">Mở</Link></li>
              {LEVELS.map(lv => {
                const ls = withSteps.filter(x => x.l.level === lv.level);
                const d = ls.reduce((n, x) => n + x.done, 0), t = ls.reduce((n, x) => n + x.total, 0);
                return (
                  <li key={lv.level} className={`tl ${d === t ? 'done' : d ? 'now' : ''}`}>
                    <b>{lv.name} <span className={`pill tone-${LV_TONE[lv.level]}`}>{lv.topik}</span></b>
                    <small className="muted">{lv.desc}</small>
                    <span className="bar"><i style={{ width: Math.round(d / t * 100) + '%' }} /></span>
                    <Link to={`/bai-hoc?cap=${lv.level}`}>Xem {ls.length} bài</Link>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      </div>

      <aside className="dash-side">
        <Link to="/luyen-noi" className="promo">
          <div><b>Luyện nói mỗi ngày</b><span>Ghi âm giọng bạn và để máy chấm điểm phát âm từng câu</span></div>
          <Bulb />
        </Link>

        <section className="sec">
          <h2>Hoạt động gần đây</h2>
          {p.activity.length ? p.activity.slice(0, 4).map((a, i) => (
            <div key={i} className={`act act-${a.type}`}>
              <span className="act-icon"><Icon name={a.type === 'graded' ? 'check' : a.type === 'speak' ? 'mic' : 'file'} size={16} /></span>
              <div><b>{a.text}</b><small className="muted">{ago(a.ts)}</small></div>
            </div>
          )) : (
            <div className="act act-empty"><span className="act-icon"><Icon name="clock" size={16} /></span>
              <div><b>Chưa có hoạt động</b><small className="muted">Làm một bài tập hoặc luyện nói, kết quả sẽ hiện ở đây.</small></div></div>
          )}
        </section>

        <section className="sec">
          <h2>Bài cần làm</h2>
          {pending.map(({ l, done }, i) => {
            const d = new Date(now); d.setDate(d.getDate() + dueIn[i]);
            const skill = NEXT_SKILL[Math.min(done, NEXT_SKILL.length - 1)];
            const tone = dueIn[i] <= 1 ? 'red' : dueIn[i] <= 2 ? 'orange' : 'green';
            return (
              <Link key={l.id} to={`/bai-hoc/${l.id}?ky-nang=${skill}`} className="todo card">
                <div className="todo-top"><b>{SKILL_NAME[skill]}: {l.title}</b>{tone !== 'green' && <span className={`warn tone-${tone}`}><Icon name="alert" size={16} /></span>}</div>
                <small className="muted">{LEVEL_NAMES[l.level]}</small>
                <div className="todo-foot"><span><Icon name="calendar" size={14} /> Hạn {fmt(d)}</span><span className={`due tone-${tone}`}>còn {dueIn[i]} ngày</span></div>
              </Link>
            );
          })}
        </section>

        {!user && <InstallCard />}
      </aside>
    </div>
  );
}
