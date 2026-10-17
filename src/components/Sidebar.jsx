import { NavLink, Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useAuth, useProgress } from '../lib/store.jsx';
import { LESSONS } from '../data/lessons.js';

export const MENU = [
  ['Menu chính', [
    ['/', 'Bảng điều khiển', 'home'],
    ['/bai-hoc', 'Bài học', 'book'],
    ['/tu-vung', 'Từ vựng', 'layers'],
    ['/ngu-phap', 'Ngữ pháp', 'list'],
    ['/luyen-tap', 'Bài tập', 'check', 'todo']
  ]],
  ['Công cụ', [
    ['/bang-chu-cai', 'Bảng chữ cái', 'abc'],
    ['/phat-am', 'Khẩu hình phát âm', 'wave'],
    ['/luyen-viet', 'Luyện viết', 'pen'],
    ['/luyen-noi', 'Luyện nói', 'mic']
  ]],
  ['Tài khoản', [
    ['/tai-khoan', 'Hồ sơ', 'user'],
    ['/huong-dan', 'Trợ giúp', 'help']
  ]]
];

export default function Sidebar({ open, onClose }) {
  const { user, name } = useAuth();
  const { p } = useProgress();
  const todo = LESSONS.filter(l => p.quiz['lv-' + l.id] == null).length;
  return (
    <>
      <div className={`scrim ${open ? 'show' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Điều hướng">
        <Link to="/" className="logo" onClick={onClose}><span className="logo-mark ko">한</span>Hangul Gil</Link>
        <Link to={user ? '/tai-khoan' : '/dang-nhap'} className="user-card" onClick={onClose}>
          <span className="avatar">{(name || 'K').slice(0, 1).toUpperCase()}</span>
          <span className="uc-text"><b>{user ? name : 'Khách'}</b><small>{user ? user.email : 'Đăng nhập để lưu tiến độ'}</small></span>
          <Icon name="chevron" size={16} />
        </Link>
        {MENU.map(([group, items]) => (
          <div key={group} className="nav-group">
            <div className="nav-title">{group}</div>
            {items.map(([to, label, icon, badge]) => (
              <NavLink key={to} to={to} end={to === '/'} className="nav-item" onClick={onClose}>
                <Icon name={icon} size={17} /><span>{label}</span>
                {badge === 'todo' && todo > 0 && <span className="nav-badge">{todo}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </aside>
    </>
  );
}
