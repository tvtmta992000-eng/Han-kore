import useVisit from '../lib/useVisit.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ARTIC, MINIMAL, PATCHIM, RULES } from '../data/hangul.js';
import MouthDiagram from '../components/MouthDiagram.jsx';
import Say from '../components/Say.jsx';
import { play } from '../lib/audio.js';

export default function Pronunciation() {
  useVisit({ path: '/phat-am', title: 'Khẩu hình phát âm', type: 'pron', sub: '10 nhóm âm · 7 quy tắc', preview: ['가','카','까','국물','[궁물]'] });
  const [g, setG] = useState(0);
  return (
    <>
      <section className="sec">
        <div className="sec-h"><span className="eyebrow">발음 · Phát âm</span><h2>Cách đặt lưỡi và khẩu hình</h2>
          <p className="lead">Sơ đồ mặt cắt khoang miệng cho thấy lưỡi, môi, vòm mềm di chuyển thế nào và luồng hơi đi ra đâu. Chọn nhóm âm, rồi bấm "Xem chuyển động" để xem từng bước kèm âm thanh.</p></div>
        <div className="tabs scroll" role="group">
          {ARTIC.map((a, i) => <button key={a.id} type="button" aria-pressed={i === g} onClick={() => setG(i)}>{a.title} <span className="ko">{a.sub.split(' ').slice(0, 4).join(' ')}</span></button>)}
        </div>
        <div className="card"><MouthDiagram key={ARTIC[g].id} group={ARTIC[g]} /></div>
      </section>

      <section className="sec">
        <h3>Âm thường · bật hơi · căng</h3>
        <p className="small muted">Đặt tờ giấy trước miệng: âm bật hơi làm giấy rung mạnh; âm căng gần như không rung nhưng cổ họng căng và giọng cao hơn.</p>
        <div className="grid g3">{MINIMAL.map((t, i) => (
          <div key={i} className="card"><div className="trio">{t.map((s, k) => s
            ? <button key={k} type="button" onClick={() => play(s)}><span className="ko">{s}</span><small>{['thường', 'bật hơi', 'căng'][k]}</small></button>
            : <span key={k} />)}</div></div>
        ))}</div>
      </section>

      <section className="sec">
        <h3>Patchim: 7 âm đại diện</h3>
        <p className="small muted">Dù viết bằng phụ âm nào, patchim chỉ phát ra 7 âm. Âm [k], [t], [p] cuối được "nuốt", không bật hơi.</p>
        <div className="tbl-wrap"><table>
          <thead><tr><th>Âm đọc</th><th>Patchim viết</th><th>Ví dụ</th><th /></tr></thead>
          <tbody>{PATCHIM.map(r => <tr key={r[0]}><td className="pr">{r[0]}</td><td className="ko">{r[1]}</td><td className="ko">{r[2]}</td><td><Say text={r[3]} /></td></tr>)}</tbody>
        </table></div>
      </section>

      <section className="sec">
        <h3>Bảy quy tắc biến âm</h3>
        <div className="grid g2">{RULES.map(r => (
          <div key={r.ko} className="card rule">
            <div className="rule-h"><b>{r.vi}</b><span className="ko muted small">{r.ko}</span></div>
            <p className="small">{r.desc}</p>
            <div className="exs">{r.ex.map(e => (
              <div key={e[0]} className="exl"><Say text={e[0]} /><span className="w ko">{e[0]}</span><span className="muted">→</span><span className="pr">[{e[1]}]</span><span className="vi">{e[2]}</span></div>
            ))}</div>
          </div>
        ))}</div>
        <div className="row"><Link className="btn primary" to="/luyen-tap?tab=pron">Làm bài tập phát âm</Link><Link className="btn" to="/luyen-noi">Luyện nói có chấm điểm</Link></div>
      </section>
    </>
  );
}
