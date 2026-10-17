import { useEffect } from 'react';
import { NavLink, Route, Routes, useLocation, Link } from 'react-router-dom';
import Icon from './components/Icon.jsx';
import RateToggle from './components/RateToggle.jsx';
import { useAuth } from './lib/store.jsx';
import { stopAudio } from './lib/audio.js';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Account from './pages/Account.jsx';
import Alphabet from './pages/Alphabet.jsx';
import Pronunciation from './pages/Pronunciation.jsx';
import Writing from './pages/Writing.jsx';
import Vocab from './pages/Vocab.jsx';
import Grammar from './pages/Grammar.jsx';
import Speaking from './pages/Speaking.jsx';
import Lessons from './pages/Lessons.jsx';
import Lesson from './pages/Lesson.jsx';
import Practice from './pages/Practice.jsx';

export const SECTIONS = [
  ['/bang-chu-cai', 'Bảng chữ cái', '한글'],
  ['/phat-am', 'Phát âm', '발음'],
  ['/luyen-viet', 'Luyện viết', '쓰기'],
  ['/tu-vung', 'Từ vựng', '어휘'],
  ['/ngu-phap', 'Ngữ pháp', '문법'],
  ['/luyen-noi', 'Luyện nói', '말하기'],
  ['/bai-hoc', 'Bài học', '수업'],
  ['/luyen-tap', 'Bài tập', '연습']
];

const TABS = [['/', 'Trang chủ', 'home'], ['/bai-hoc', 'Bài học', 'book'], ['/tu-vung', 'Từ vựng', 'grid'], ['/luyen-noi', 'Luyện nói', 'mic'], ['/tai-khoan', 'Tài khoản', 'user']];

export default function App() {
  const { user, name } = useAuth();
  const loc = useLocation();
  useEffect(() => { stopAudio(); window.scrollTo(0, 0); }, [loc.pathname]);

  return (
    <>
      <header className="top">
        <div className="top-in">
          <Link to="/" className="brand" aria-label="Về trang chủ"><b>한글길</b><span>Hangul Gil</span></Link>
          <nav className="main-nav" aria-label="Mục chính">
            {SECTIONS.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
          </nav>
          <div className="top-right">
            <RateToggle />
            <Link to={user ? '/tai-khoan' : '/dang-nhap'} className="acct" aria-label={user ? 'Tài khoản' : 'Đăng nhập'}>
              {user ? <span className="avatar">{(name || '?').slice(0, 1).toUpperCase()}</span> : <span className="btn primary sm">Đăng nhập</span>}
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dat-lai-mat-khau" element={<ResetPassword />} />
          <Route path="/tai-khoan" element={<Account />} />
          <Route path="/bang-chu-cai" element={<Alphabet />} />
          <Route path="/phat-am" element={<Pronunciation />} />
          <Route path="/luyen-viet" element={<Writing />} />
          <Route path="/tu-vung" element={<Vocab />} />
          <Route path="/tu-vung/:topic" element={<Vocab />} />
          <Route path="/ngu-phap" element={<Grammar />} />
          <Route path="/luyen-noi" element={<Speaking />} />
          <Route path="/bai-hoc" element={<Lessons />} />
          <Route path="/bai-hoc/:id" element={<Lesson />} />
          <Route path="/luyen-tap" element={<Practice />} />
          <Route path="*" element={<div className="sec"><h2>Không tìm thấy trang</h2><Link to="/" className="btn">Về trang chủ</Link></div>} />
        </Routes>
      </main>
      <nav className="tabbar" aria-label="Điều hướng nhanh">
        {TABS.map(([to, label, icon]) => (
          <NavLink key={to} to={to} end={to === '/'}><Icon name={icon} size={20} /><span>{label}</span></NavLink>
        ))}
      </nav>
    </>
  );
}
