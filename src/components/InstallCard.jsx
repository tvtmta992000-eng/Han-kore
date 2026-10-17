import { useInstall } from '../lib/install.js';
import Icon from './Icon.jsx';

export default function InstallCard() {
  const { canPrompt, standalone, ios, install } = useInstall();
  if (standalone) return null;
  return (
    <div className="card install">
      <div>
        <b>Cài Hangul Gil lên điện thoại</b>
        {canPrompt && <p className="small muted">Mở như một ứng dụng, học được cả khi mất mạng với các bài đã mở.</p>}
        {!canPrompt && ios && <p className="small muted">Trên iPhone: mở trang này bằng Safari → chạm nút <b>Chia sẻ</b> → chọn <b>Thêm vào MH chính</b>.</p>}
        {!canPrompt && !ios && <p className="small muted">Trên Android: mở bằng Chrome → menu ⋮ → <b>Cài đặt ứng dụng</b> (hoặc "Thêm vào màn hình chính").</p>}
      </div>
      {canPrompt && <button type="button" className="btn primary" onClick={install}><Icon name="download" size={16} /> Cài ứng dụng</button>}
    </div>
  );
}
