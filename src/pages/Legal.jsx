import { Link } from 'react-router-dom';

const UPDATED = '17/10/2026';
const CONTACT = 'tvtmta992000@gmail.com';

export function Privacy() {
  return (
    <section className="sec narrow legal">
      <div className="page-head"><h1>Chính sách quyền riêng tư</h1><p className="muted small">Cập nhật ngày {UPDATED}</p></div>
      <p>Hangul Gil là ứng dụng tự học tiếng Hàn. Trang này giải thích dữ liệu nào được thu thập và được dùng như thế nào.</p>
      <h3>1. Dữ liệu chúng tôi lưu</h3>
      <ul className="steps">
        <li><b>Thông tin tài khoản:</b> email, họ tên hiển thị. Nếu bạn đăng nhập bằng Google, chúng tôi chỉ nhận email, tên và ảnh đại diện công khai do Google cung cấp.</li>
        <li><b>Tiến độ học:</b> từ đã thuộc, điểm bài tập, bài viết nháp, danh sách bài đã mở và số ngày học.</li>
      </ul>
      <h3>2. Dữ liệu chúng tôi không lưu</h3>
      <ul className="steps">
        <li>Bản ghi âm giọng nói trong phần Luyện nói chỉ nằm trên thiết bị của bạn và không được gửi lên máy chủ của chúng tôi.</li>
        <li>Khi chấm điểm phát âm, trình duyệt của bạn (Chrome, Edge, Safari) có thể dùng dịch vụ nhận dạng giọng nói của nhà cung cấp trình duyệt; việc này tuân theo chính sách của nhà cung cấp đó.</li>
        <li>Chúng tôi không bán, không chia sẻ dữ liệu cho bên thứ ba và không dùng dữ liệu để quảng cáo.</li>
      </ul>
      <h3>3. Nơi lưu trữ</h3>
      <p>Dữ liệu tài khoản và tiến độ được lưu trên Supabase (hạ tầng cơ sở dữ liệu). Mỗi người dùng chỉ đọc và ghi được dữ liệu của chính mình. Website được phục vụ qua Vercel.</p>
      <h3>4. Quyền của bạn</h3>
      <p>Bạn có thể xóa toàn bộ tiến độ trong trang <Link to="/tai-khoan">Tài khoản</Link>. Để xóa hẳn tài khoản, hãy gửi email tới <b>{CONTACT}</b>; chúng tôi xử lý trong vòng 7 ngày.</p>
      <h3>5. Liên hệ</h3>
      <p>Mọi câu hỏi về quyền riêng tư: <b>{CONTACT}</b></p>
    </section>
  );
}

export function Terms() {
  return (
    <section className="sec narrow legal">
      <div className="page-head"><h1>Điều khoản sử dụng</h1><p className="muted small">Cập nhật ngày {UPDATED}</p></div>
      <ul className="steps">
        <li>Hangul Gil cung cấp miễn phí nội dung học tiếng Hàn cho mục đích học tập cá nhân.</li>
        <li>Bạn chịu trách nhiệm giữ an toàn mật khẩu tài khoản của mình.</li>
        <li>Không dùng ứng dụng để phát tán nội dung vi phạm pháp luật hoặc tấn công hệ thống.</li>
        <li>Nội dung bài học được biên soạn cẩn thận nhưng có thể còn sai sót; điểm luyện nói do máy chấm chỉ mang tính tham khảo.</li>
        <li>Chúng tôi có thể cập nhật nội dung và điều khoản; thay đổi được ghi ngày ở đầu trang này.</li>
      </ul>
      <p>Xem thêm <Link to="/chinh-sach-bao-mat">Chính sách quyền riêng tư</Link>. Liên hệ: <b>{CONTACT}</b></p>
    </section>
  );
}
