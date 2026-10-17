import useVisit from '../lib/useVisit.js';
import { useState } from 'react';
import STROKES from '../data/strokes.json';
import StrokeVideo from '../components/StrokeVideo.jsx';
import TraceCanvas from '../components/TraceCanvas.jsx';

const LETTERS = Object.keys(STROKES);
const STRUCT = [
  ['Phụ âm + nguyên âm đứng', '가 너 미', '1fr / 1fr 1fr', [['PÂ', ''], ['NÂ', 'v']]],
  ['Phụ âm + nguyên âm ngang', '고 누 그', '1fr 1fr / 1fr', [['PÂ', ''], ['NÂ', 'v']]],
  ['Nguyên âm ghép', '과 뭐 의', '1fr 1fr / 1fr 1fr', [['PÂ', ''], ['ㅏ', 'v tall'], ['ㅗ', 'v']]],
  ['Có patchim', '강 손 꽃', '1fr 1fr / 1fr 1fr', [['PÂ', ''], ['NÂ', 'v'], ['Patchim', 'f wide']]]
];

export default function Writing() {
  useVisit({ path: '/luyen-viet', title: 'Luyện viết chữ Hàn', type: 'write', sub: 'Video nét + ô tập viết', preview: ['ㄹ','ㅂ','ㅎ','원고지'] });
  const [ch, setCh] = useState('ㄱ');
  const [own, setOwn] = useState('');
  const [guide, setGuide] = useState('ㄱ');
  return (
    <>
      <section className="sec">
        <div className="sec-h"><span className="eyebrow">쓰기 · Luyện viết</span><h2>Hướng dẫn viết chữ Hàn</h2>
          <p className="lead">Xem video thứ tự nét rồi tô lại trên ô tập viết. Quy tắc gốc: viết <b>từ trên xuống dưới</b>, <b>từ trái sang phải</b>; ㅇ viết một nét ngược chiều kim đồng hồ bắt đầu từ đỉnh.</p></div>
        <div className="chips">{LETTERS.map(c => <button key={c} type="button" aria-pressed={c === ch} onClick={() => { setCh(c); setGuide(c); }}>{c}</button>)}</div>
        <div className="write-wrap">
          <div className="card"><StrokeVideo ch={ch} /></div>
          <div className="card sec">
            <TraceCanvas guide={guide} />
            <form className="row" onSubmit={e => { e.preventDefault(); if (own.trim()) setGuide(own.trim().slice(0, 2)); }}>
              <label className="small muted" htmlFor="w-own">Tập chữ khác:</label>
              <input id="w-own" type="text" maxLength={2} value={own} onChange={e => setOwn(e.target.value)} placeholder="한" className="ko" style={{ width: 70 }} />
              <button className="btn">Dùng</button>
            </form>
          </div>
        </div>
      </section>

      <section className="sec">
        <h3>Cấu trúc một khối âm tiết</h3>
        <div className="struct">{STRUCT.map(([t, ex, tpl, cells]) => (
          <div key={t} className="card">
            <div className="blocks" style={{ gridTemplate: tpl }}>{cells.map(([l, c], i) => <div key={i} className={c}>{l}</div>)}</div>
            <b className="small">{t}</b><span className="ko" style={{ fontSize: '1.3rem' }}>{ex}</span>
          </div>
        ))}</div>
        <p className="small muted">Nguyên âm đứng (ㅏ ㅑ ㅓ ㅕ ㅣ) đặt bên phải phụ âm; nguyên âm ngang (ㅗ ㅛ ㅜ ㅠ ㅡ) đặt bên dưới. Patchim luôn nằm dưới cùng. Mọi khối chữ cân trong một ô vuông.</p>
      </section>

      <section className="grid g2">
        <div className="card sec"><h3>Cách chữ (띄어쓰기)</h3><ul className="steps small">
          <li>Trợ từ viết liền với danh từ: <span className="ko">저는, 학교에, 밥을</span>.</li>
          <li>Đuôi động từ viết liền: <span className="ko">먹었어요, 가려고 해요</span>.</li>
          <li>Danh từ phụ thuộc và đơn vị đếm viết cách: <span className="ko">먹을 수 있다, 사과 한 개</span>.</li>
          <li>Cách sai có thể đổi nghĩa: <span className="ko">아버지가 방에 들어가신다</span> (Bố vào phòng) khác <span className="ko">아버지 가방에 들어가신다</span> (Bố chui vào cái túi).</li></ul></div>
        <div className="card sec"><h3>Viết trên giấy ô 원고지 (TOPIK)</h3><ul className="steps small">
          <li>Mỗi ô một chữ Hàn; đầu đoạn lùi vào một ô.</li>
          <li>Dấu chấm, phẩy chiếm một ô, viết ở góc dưới bên trái ô.</li>
          <li>Chữ số và chữ Latin: hai ký tự một ô (20, AI).</li>
          <li>Không để ô trống ở đầu dòng mới (trừ đầu đoạn).</li></ul></div>
        <div className="card sec"><h3>Chọn văn phong</h3><ul className="steps small">
          <li><span className="ko">-ㅂ/습니다</span>: trang trọng, phát biểu, thư công việc.</li>
          <li><span className="ko">-아/어요</span>: thân mật lịch sự, hội thoại hằng ngày.</li>
          <li><span className="ko">-다 (한다, 했다)</span>: văn viết, báo chí. TOPIK câu 53–54 bắt buộc dùng.</li></ul></div>
        <div className="card sec"><h3>Từ nối nên thuộc</h3><ul className="steps small">
          <li>Thêm ý: <span className="ko">그리고, 또한, 게다가</span></li>
          <li>Đối lập: <span className="ko">그러나, 하지만, 반면에</span></li>
          <li>Kết quả: <span className="ko">그래서, 따라서, 그러므로</span></li>
          <li>Kết luận: <span className="ko">결국, 요컨대, 이처럼</span></li></ul></div>
      </section>
    </>
  );
}
