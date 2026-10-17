import useVisit from '../lib/useVisit.js';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ALPHABET_GROUPS } from '../data/hangul.js';
import { L_LIST, V_LIST, T_LIST, compose } from '../lib/korean.js';
import { play } from '../lib/audio.js';
import StrokeVideo from '../components/StrokeVideo.jsx';
import TraceCanvas from '../components/TraceCanvas.jsx';
import Say from '../components/Say.jsx';

export default function Alphabet() {
  useVisit({ path: '/bang-chu-cai', title: 'Bảng chữ cái Hangul', type: 'alphabet', sub: '40 chữ cái · video nét', preview: ['ㄱ','ㄴ','ㄷ','ㅏ','ㅓ','ㅗ'] });
  const [g, setG] = useState(0);
  const [sel, setSel] = useState(ALPHABET_GROUPS[0].list[0]);
  const [b, setB] = useState([0, 0, 0]);
  const group = ALPHABET_GROUPS[g];
  const isCons = group.id.endsWith('cons');
  const syl = compose(...b);

  const detail = useRef(null);
  function choose(j) {
    setSel(j); play(j[6]);
    if (window.innerWidth < 900) setTimeout(() => detail.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  return (
    <>
      <section className="sec">
        <div className="sec-h"><span className="eyebrow">한글 · Nhập môn</span><h2>Bảng chữ cái Hangul</h2>
          <p className="lead">19 phụ âm và 21 nguyên âm. Chọn một chữ để xem video thứ tự nét, nghe cách đọc và tập viết ngay bên cạnh. Muốn biết đặt lưỡi thế nào, xem mục <Link to="/phat-am">Phát âm</Link>.</p></div>
        <div className="tabs" role="group">
          {ALPHABET_GROUPS.map((x, i) => <button key={x.id} type="button" aria-pressed={i === g} onClick={() => { setG(i); setSel(x.list[0]); }}>{x.name} ({x.list.length})</button>)}
        </div>
        <div className="alpha-layout">
          <div className="jamo-grid">
            {group.list.map(j => (
              <button key={j[0]} type="button" className={`jamo ${sel[0] === j[0] ? 'sel' : ''}`} onClick={() => choose(j)}>
                <span className="big">{j[0]}</span><span className="rom">{j[2]}</span><span className="small muted ko">{j[1]}</span>
              </button>
            ))}
          </div>
          <div className="card sec alpha-detail" ref={detail}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div><span className="detail-big">{sel[0]}</span> <span className="ko muted">{sel[1]}</span></div>
              <Say text={isCons ? `${sel[1]}. ${sel[6]}` : sel[6]}>Nghe</Say>
            </div>
            <p className="small">Phiên âm <b>{sel[2]}</b> · đọc gần giống <b>{sel[3]}</b></p>
            <div className="exl"><Say text={sel[4]} /><span className="w ko">{sel[4]}</span><span className="vi">{sel[5]}</span></div>
            <div className="write-wrap">
              <div><h3 className="small-h">Video thứ tự nét</h3><StrokeVideo ch={sel[0]} /></div>
              <div><h3 className="small-h">Tập viết theo</h3><TraceCanvas guide={sel[0]} /></div>
            </div>
          </div>
        </div>
        <p className="note">{isCons ? <>Tên phụ âm (ví dụ <span className="ko">기역</span>) dùng khi đánh vần. Khi đọc, phụ âm luôn đi với nguyên âm, ví dụ <span className="ko">ㄱ + ㅏ = 가</span>.</> : <>Nguyên âm không đứng một mình: khi viết luôn thêm ㅇ câm phía trước, ví dụ <span className="ko">ㅏ → 아</span>.</>}</p>
      </section>

      <section className="sec card">
        <div className="sec-h"><span className="eyebrow">Thử ghép chữ</span><h3>Phụ âm đầu + nguyên âm + patchim</h3><p className="small muted">Chọn từng phần, khối chữ hiện ra và đọc ngay.</p></div>
        <div className="builder">
          <div className="sec">
            {[['Phụ âm đầu (초성)', L_LIST, 0], ['Nguyên âm (중성)', V_LIST, 1], ['Patchim (종성) · tùy chọn', T_LIST, 2]].map(([label, list, k]) => (
              <div key={k}><div className="small muted">{label}</div>
                <div className="chips">{list.map((c, i) => (
                  <button key={i} type="button" aria-pressed={b[k] === i} onClick={() => { const n = [...b]; n[k] = i; setB(n); play(compose(...n)); }}>{c || '∅'}</button>
                ))}</div>
              </div>
            ))}
          </div>
          <div className="out"><div className="syl">{syl}</div><Say text={syl}>Nghe</Say><span className="small muted">{L_LIST[b[0]]} + {V_LIST[b[1]]}{b[2] ? ' + ' + T_LIST[b[2]] : ''}</span></div>
        </div>
      </section>
    </>
  );
}
