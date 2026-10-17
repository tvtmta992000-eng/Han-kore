# Hangul Gil (한글길) — Ứng dụng tự học tiếng Hàn

Website + ứng dụng điện thoại (PWA) học tiếng Hàn từ bảng chữ cái đến TOPIK 6, đủ 4 kỹ năng nghe – nói – đọc – viết.

## Có gì trong ứng dụng

| Mục | Nội dung |
|---|---|
| Bảng chữ cái | 40 chữ cái, mỗi chữ có **video thứ tự nét** (MP4 + WebM), âm thanh, từ ví dụ, ô tập viết bằng tay/chuột, công cụ ghép âm tiết |
| Phát âm | **Sơ đồ khẩu hình chuyển động** (mặt cắt miệng: vị trí lưỡi, môi, vòm mềm, luồng hơi) cho 10 nhóm âm; âm thường/bật hơi/căng; 7 âm patchim; 7 quy tắc biến âm |
| Luyện viết | Video nét + ô tập viết, cấu trúc khối chữ, quy tắc cách chữ, cách viết giấy ô 원고지 TOPIK |
| Từ vựng | **1.057 từ / 33 chủ đề**, chia 5 cấp; nghe từng từ, thẻ ghi nhớ, đánh dấu đã thuộc, bài kiểm tra tự sinh |
| Ngữ pháp | **111 cấu trúc câu** từ sơ cấp đến cao cấp, mỗi cấu trúc có cách dùng và 2 câu ví dụ đọc mẫu |
| Luyện nói | **96 mẫu câu / 12 tình huống**: nghe mẫu → ghi âm giọng mình → nghe lại → máy chấm điểm phát âm (0–100) |
| Bài học | 10 bài (2 bài × 5 cấp), mỗi bài: từ vựng, ngữ pháp, hội thoại nghe (2 giọng nam/nữ), nói, đọc, đề viết dạng TOPIK có bài mẫu, bài tập |
| Bài tập | Nghe phân biệt chữ, phát âm đúng, từ vựng & ngữ pháp theo cấp (đề mới mỗi lần làm) |
| Tài khoản | Đăng ký / đăng nhập email hoặc Google, quên mật khẩu, đồng bộ tiến độ giữa các thiết bị, chuỗi ngày học |

Chưa cấu hình tài khoản thì ứng dụng vẫn chạy ở **chế độ khách** (lưu tiến độ trên máy).

## Chạy thử trên máy

```bash
npm install
npm run dev          # mở http://localhost:5173
```

## Đưa lên mạng (miễn phí) — làm một lần

### 1. Tạo cơ sở dữ liệu & đăng nhập (Supabase)
1. Vào https://supabase.com → **New project**.
2. **SQL Editor** → dán nội dung file `supabase/schema.sql` → **Run**.
3. **Project Settings → API**: chép `Project URL` và `anon public key`.
4. **Authentication → URL Configuration**: điền *Site URL* là địa chỉ website của bạn (ví dụ `https://hangul-gil.vercel.app`) và thêm địa chỉ đó vào *Redirect URLs*.
5. (Tùy chọn) Đăng nhập Google: **Authentication → Providers → Google**, nhập Client ID/Secret tạo ở Google Cloud Console.

### 2. Đưa mã lên GitHub
Tạo kho mã mới trên GitHub và đẩy thư mục này lên (nhánh `main`).

### 3. Tạo file âm thanh giọng Hàn chuẩn
Ứng dụng phát file MP3 giọng nữ **SunHi** và giọng nam **InJoon** (Microsoft Neural). Khi chưa có file, ứng dụng tạm dùng giọng đọc có sẵn của điện thoại/máy tính.

- **Tự động:** workflow `.github/workflows/audio.yml` chạy khi bạn đẩy mã lên. Cần bật quyền ghi: *Settings → Actions → General → Workflow permissions → Read and write*. Có thể chạy tay ở tab **Actions → Tạo âm thanh tiếng Hàn → Run workflow**. Lần đầu tạo ~1.900 file, mất khoảng 10–20 phút.
- **Trên máy bạn:** `pip install edge-tts` rồi `npm run audio`.

Lưu ý: `edge-tts` dùng dịch vụ đọc của trình duyệt Microsoft Edge, phù hợp cho dự án học tập cá nhân. Nếu dùng thương mại, hãy chuyển sang Azure Speech (có giấy phép) — chỉ cần thay phần gọi API trong `scripts/generate_audio.py`.

### 4. Xuất bản website (Vercel)
1. Vào https://vercel.com → **Add New → Project** → chọn kho mã GitHub.
2. *Environment Variables*: thêm `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY`.
3. **Deploy**. Mỗi lần đẩy mã mới, Vercel tự cập nhật.

(Netlify cũng được: build `npm run build`, thư mục `dist`, file `public/_redirects` đã có sẵn.)

### 5. Cài lên điện thoại
- **Android (Chrome):** mở website → nút **Cài ứng dụng** trên trang chủ, hoặc menu ⋮ → *Cài đặt ứng dụng*.
- **iPhone (Safari):** mở website → nút **Chia sẻ** → *Thêm vào MH chính*.

Ứng dụng mở toàn màn hình như app thật, có thanh tab dưới cùng, và lưu sẵn các bài, video, âm thanh đã mở để học khi mất mạng.

### (Tùy chọn) Đưa lên CH Play / App Store
Có thể đóng gói bằng [Capacitor](https://capacitorjs.com): `npm i @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios`, `npx cap init "Hangul Gil" vn.hangulgil.app --web-dir dist`, `npm run build && npx cap add android`. Cần tài khoản nhà phát triển Google (25 USD) / Apple (99 USD/năm) và máy Mac để build iOS.

## Cấu trúc thư mục

```
src/data/        nội dung: vocab.js, grammar.js, phrases.js, lessons.js, hangul.js, strokes.json
src/pages/       các trang
src/components/  Quiz, SpeakCheck (ghi âm + chấm điểm), MouthDiagram, StrokeVideo, TraceCanvas…
src/lib/         âm thanh, tài khoản & đồng bộ tiến độ, xử lý chữ Hàn
scripts/         make_videos.py (video nét), generate_audio.py (MP3), collect-texts.mjs, make_icons.py
public/video/    80 video thứ tự nét (40 chữ × MP4/WebM)
public/audio/    file MP3 + manifest.json
supabase/        schema.sql
```

## Thêm nội dung
- Từ vựng: thêm dòng `tiếng Hàn|nghĩa` vào chủ đề trong `src/data/vocab.js`.
- Ngữ pháp: thêm dòng `mẫu|nghĩa|cách dùng|ví dụ=dịch|ví dụ=dịch` vào `src/data/grammar.js`.
- Bài học: thêm đối tượng vào `src/data/lessons.js` theo mẫu có sẵn.

Sau khi thêm, đẩy mã lên GitHub: workflow sẽ tự tạo file âm thanh cho câu mới.

## Chấm điểm phát âm hoạt động thế nào
Ứng dụng ghi âm bằng micro (MediaRecorder) để bạn nghe lại, đồng thời dùng nhận dạng giọng nói tiếng Hàn của trình duyệt (Web Speech API — Chrome, Edge, Safari mới) để chuyển giọng thành chữ. Câu nghe được được tách thành từng chữ cái (ㄱ, ㅏ…) và so với câu mẫu để ra điểm 0–100; âm tiết sai được gạch đỏ. Firefox chưa hỗ trợ nhận dạng giọng nói nên chỉ ghi âm để tự so sánh.
