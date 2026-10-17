import { Link } from 'react-router-dom';
import RateToggle from '../components/RateToggle.jsx';
import InstallCard from '../components/InstallCard.jsx';

const FAQ = [
  ['Nên học theo thứ tự nào?', 'Bắt đầu với Bảng chữ cái và Khẩu hình phát âm khoảng 1–2 tuần, sau đó học Bài học theo cấp. Mỗi ngày: ôn thẻ từ vựng 10 phút, làm một kỹ năng của bài học, luyện nói 5 câu.'],
  ['Không nghe thấy âm thanh?', 'Kiểm tra âm lượng và chế độ im lặng của điện thoại. Nếu website chưa có file âm thanh, ứng dụng dùng giọng tiếng Hàn của thiết bị: hãy cài giọng "Korean" trong cài đặt ngôn ngữ/giọng nói.'],
  ['Luyện nói không chấm điểm?', 'Chấm điểm dùng nhận dạng giọng nói của trình duyệt: hãy dùng Chrome, Edge hoặc Safari bản mới và cho phép quyền micro. Firefox chỉ ghi âm để bạn tự so.'],
  ['Tiến độ có bị mất không?', 'Khi đăng nhập, tiến độ được lưu lên tài khoản và đồng bộ giữa các thiết bị. Ở chế độ khách, tiến độ chỉ lưu trên trình duyệt đang dùng.'],
  ['Điểm luyện nói bao nhiêu là đạt?', 'Từ 70 trở lên là khá; từ 90 là gần chuẩn. Âm tiết gạch đỏ là chỗ máy nghe chưa đúng: nghe lại mẫu ở tốc độ Chậm và đọc lại.']
];

export default function Help() {
  return (
    <section className="sec narrow">
      <div className="page-head"><h1>Trợ giúp</h1><p className="muted">Cách dùng Hangul Gil hiệu quả.</p></div>
      <div className="card sec"><h3>Tốc độ đọc mẫu</h3><p className="small muted">Áp dụng cho mọi nút nghe trong ứng dụng.</p><div><RateToggle /></div></div>
      <InstallCard />
      {FAQ.map(([q, a]) => <details key={q} className="faq"><summary>{q}</summary><p className="small">{a}</p></details>)}
      <p className="small muted"><Link to="/chinh-sach-bao-mat">Chính sách quyền riêng tư</Link> · <Link to="/dieu-khoan">Điều khoản sử dụng</Link></p>
      <p className="small muted">Chưa có tài khoản? <Link to="/dang-nhap">Đăng ký miễn phí</Link>.</p>
    </section>
  );
}
