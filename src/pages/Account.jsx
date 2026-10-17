import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useProgress, streakOf } from '../lib/store.jsx';
import { authEnabled } from '../lib/supabase.js';
import { hasRealAudio } from '../lib/audio.js';
import InstallCard from '../components/InstallCard.jsx';

const SYNC = { local: 'Chỉ lưu trên thiết bị này', loading: 'Đang tải tiến độ…', saving: 'Đang lưu…', saved: 'Đã đồng bộ lên tài khoản', error: 'Lỗi đồng bộ — tiến độ vẫn được giữ trên máy' };

export default function Account() {
  const auth = useAuth();
  const { p, sync, reset } = useProgress();
  const [name, setName] = useState(auth.name);
  const [msg, setMsg] = useState('');
  const [confirm, setConfirm] = useState(false);
  const days = Object.keys(p.days).length;

  return (
    <section className="sec narrow">
      <div className="sec-h"><span className="eyebrow">Tài khoản</span><h2>{auth.user ? auth.name : 'Chế độ khách'}</h2></div>
      {auth.user ? (
        <div className="card sec">
          <p className="small muted">{auth.user.email}</p>
          <form className="form inline" onSubmit={async e => { e.preventDefault(); await auth.updateName(name); setMsg('Đã lưu tên.'); }}>
            <label>Tên hiển thị<input id="f-display" type="text" value={name} onChange={e => setName(e.target.value)} /></label>
            <button className="btn">Lưu</button>
          </form>
          {msg && <p className="ok-msg small">{msg}</p>}
          <p className={`small sync ${sync}`}>● {SYNC[sync]}</p>
          <div><button type="button" className="btn" onClick={auth.signOut}>Đăng xuất</button></div>
        </div>
      ) : (
        <div className="card sec">
          <p>Bạn đang học ở chế độ khách. Tiến độ chỉ lưu trên thiết bị này.</p>
          {authEnabled && <div><Link className="btn primary" to="/dang-nhap">Đăng nhập / Đăng ký</Link></div>}
        </div>
      )}

      <div className="stats">
        <div className="stat"><b>{streakOf(p.days)}</b><span>ngày liên tiếp</span></div>
        <div className="stat"><b>{days}</b><span>ngày đã học</span></div>
        <div className="stat"><b>{Object.keys(p.words).length}</b><span>từ đã thuộc</span></div>
        <div className="stat"><b>{Object.keys(p.quiz).length}</b><span>bộ bài tập đã làm</span></div>
      </div>

      <InstallCard />

      <div className="card sec">
        <h3>Âm thanh</h3>
        <p className="small">{hasRealAudio() ? 'Đang dùng file âm thanh giọng người bản xứ (Neural TTS).' : 'Chưa có file âm thanh trên máy chủ: ứng dụng đang dùng giọng đọc tiếng Hàn của thiết bị. Nếu không nghe thấy, hãy cài giọng "Korean" trong cài đặt ngôn ngữ của điện thoại/máy tính.'}</p>
      </div>

      <div className="card sec">
        <h3>Xóa tiến độ</h3>
        {!confirm
          ? <div><button type="button" className="btn" onClick={() => setConfirm(true)}>Xóa toàn bộ tiến độ…</button></div>
          : <div className="row"><span className="small err">Thao tác này không hoàn tác được.</span><button type="button" className="btn danger" onClick={() => { reset(); setConfirm(false); }}>Xóa</button><button type="button" className="btn" onClick={() => setConfirm(false)}>Hủy</button></div>}
      </div>
    </section>
  );
}
