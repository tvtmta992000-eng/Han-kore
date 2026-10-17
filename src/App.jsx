import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Help from './pages/Help.jsx';
import Games from './pages/Games.jsx';
import { Privacy, Terms } from './pages/Legal.jsx';
import Icon from './components/Icon.jsx';
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

const TABS = [['/', 'Trang chủ', 'home'], ['/bai-hoc', 'Bài học', 'book'], ['/tu-vung', 'Từ vựng', 'layers'], ['/luyen-noi', 'Luyện nói', 'mic'], ['/tai-khoan', 'Tài khoản', 'user']];

export default function App() {
  const loc = useLocation();
  const [menu, setMenu] = useState(false);
  useEffect(() => { stopAudio(); window.scrollTo(0, 0); setMenu(false); }, [loc.pathname]);

  return (
    <div className="shell">
      <Sidebar open={menu} onClose={() => setMenu(false)} />
      <div className="content">
        <Topbar onMenu={() => setMenu(true)} />
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
          <Route path="/huong-dan" element={<Help />} />
          <Route path="/tro-choi" element={<Games />} />
          <Route path="/chinh-sach-bao-mat" element={<Privacy />} />
          <Route path="/dieu-khoan" element={<Terms />} />
          <Route path="*" element={<div className="sec"><h2>Không tìm thấy trang</h2><Link to="/" className="btn">Về trang chủ</Link></div>} />
        </Routes>
      </main>
      <nav className="tabbar" aria-label="Điều hướng nhanh">
        {TABS.map(([to, label, icon]) => (
          <NavLink key={to} to={to} end={to === '/'}><Icon name={icon} size={20} /><span>{label}</span></NavLink>
        ))}
      </nav>
      </div>
    </div>
  );
}
