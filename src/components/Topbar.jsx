import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import RateToggle from './RateToggle.jsx';
import { useAuth, useProgress } from '../lib/store.jsx';
import { useTheme } from '../lib/theme.js';
import { ALL_WORDS, TOPICS, LEVEL_NAMES } from '../data/vocab.js';
import { GRAMMAR } from '../data/grammar.js';
import { LESSONS } from '../data/lessons.js';
import { MENU } from './Sidebar.jsx';

const PAGES = MENU.flatMap(([, items]) => items.map(([to, label]) => ({ to, label, kind: 'Trang' })));

function useSearch(q) {
  return useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const out = [];
    PAGES.forEach(x => x.label.toLowerCase().includes(s) && out.push(x));
    LESSONS.forEach(l => l.title.toLowerCase().includes(s) && out.push({ to: `/bai-hoc/${l.id}`, label: l.title, kind: 'Bài học' }));
    TOPICS.forEach(t => t.name.toLowerCase().includes(s) && out.push({ to: `/tu-vung/${t.id}`, label: t.name, kind: 'Chủ đề' }));
    GRAMMAR.forEach(g => (g.p + ' ' + g.m).toLowerCase().includes(s) && out.push({ to: '/ngu-phap', label: `${g.p} — ${g.m}`, kind: LEVEL_NAMES[g.level], ko: true }));
    ALL_WORDS.forEach(w => (w.ko.includes(s) || w.vi.toLowerCase().includes(s)) && out.push({ to: `/tu-vung/${w.topic}`, label: `${w.ko} · ${w.vi}`, kind: 'Từ vựng', ko: true }));
    return out.slice(0, 12);
  }, [q]);
}

export default function Topbar({ onMenu }) {
  const { user, name } = useAuth();
  const { p } = useProgress();
  const [theme, toggle] = useTheme();
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const [bell, setBell] = useState(false);
  const results = useSearch(q);
  const nav = useNavigate();
  const input = useRef(null);
  const today = new Date().toISOString().slice(0, 10);
  const studiedToday = !!p.days[today];
  const notes = [
    ...(!studiedToday ? [{ t: 'Hôm nay bạn chưa học. Dành 10 phút ôn từ vựng nhé!', to: '/tu-vung' }] : []),
    ...(!user ? [{ t: 'Đăng nhập để đồng bộ tiến độ giữa điện thoại và máy tính.', to: '/dang-nhap' }] : []),
    ...p.activity.slice(0, 3).map(a => ({ t: a.text, to: '/' }))
  ];

  useEffect(() => {
    const k = e => { if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); input.current?.focus(); } };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  const go = to => { nav(to); setQ(''); setFocus(false); input.current?.blur(); };
  const h = new Date().getHours();
  const greet = h < 11 ? 'Chào buổi sáng' : h < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

  return (
    <header className="topbar">
      <button type="button" className="icon-btn only-mobile" onClick={onMenu} aria-label="Mở menu"><Icon name="menu" /></button>
      <div className="greet"><small>{greet},</small><b>{user ? name : 'bạn học tiếng Hàn'}</b></div>
      <div className="search-wrap">
        <Icon name="search" size={16} />
        <input ref={input} id="global-search" type="search" placeholder="Tìm bài học, từ vựng, ngữ pháp…" value={q}
          onChange={e => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setTimeout(() => setFocus(false), 150)}
          onKeyDown={e => { if (e.key === 'Enter' && results[0]) go(results[0].to); if (e.key === 'Escape') setQ(''); }} />
        <kbd>/</kbd>
        {focus && q.trim() && (
          <div className="dropdown search-results">
            {results.length ? results.map((r, i) => (
              <button key={i} type="button" onMouseDown={() => go(r.to)}><span className={r.ko ? 'ko' : ''}>{r.label}</span><small>{r.kind}</small></button>
            )) : <p className="small muted">Không tìm thấy kết quả.</p>}
          </div>
        )}
      </div>
      <div className="top-actions">
        <span className="only-desktop"><RateToggle /></span>
        <div className="bell-wrap">
          <button type="button" className="icon-btn" onClick={() => setBell(b => !b)} aria-label="Thông báo" aria-expanded={bell}>
            <Icon name="bell" />{notes.length > 0 && <i className="dot" />}
          </button>
          {bell && (
            <div className="dropdown notes" onMouseLeave={() => setBell(false)}>
              <b>Thông báo</b>
              {notes.length ? notes.map((n, i) => <button key={i} type="button" onClick={() => { setBell(false); nav(n.to); }}>{n.t}</button>) : <p className="small muted">Không có thông báo mới.</p>}
            </div>
          )}
        </div>
        <button type="button" className="icon-btn" onClick={toggle} aria-label={theme === 'dark' ? 'Chuyển sang nền sáng' : 'Chuyển sang nền tối'}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
        </button>
      </div>
    </header>
  );
}
