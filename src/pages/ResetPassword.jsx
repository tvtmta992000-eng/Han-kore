import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/store.jsx';

export default function ResetPassword() {
  const { user, updatePassword } = useAuth();
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();
  if (!user) return <section className="auth card sec"><h2>Đặt lại mật khẩu</h2><p>Liên kết đã hết hạn hoặc chưa đăng nhập. Hãy yêu cầu gửi lại email từ trang Đăng nhập.</p></section>;
  return (
    <section className="auth card sec">
      <h2>Đặt mật khẩu mới</h2>
      <form className="form" onSubmit={async e => { e.preventDefault(); try { await updatePassword(pw); nav('/tai-khoan'); } catch (ex) { setErr(ex.message); } }}>
        <label>Mật khẩu mới<input id="f-newpass" type="password" minLength={6} value={pw} onChange={e => setPw(e.target.value)} required autoComplete="new-password" /></label>
        {err && <p className="err small">{err}</p>}
        <button className="btn primary block">Lưu mật khẩu</button>
      </form>
    </section>
  );
}
