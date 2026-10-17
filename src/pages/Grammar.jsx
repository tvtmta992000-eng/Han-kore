import useVisit from '../lib/useVisit.js';
import { useMemo, useState } from 'react';
import { GRAMMAR } from '../data/grammar.js';
import { LEVEL_NAMES } from '../data/vocab.js';
import Say from '../components/Say.jsx';

export default function Grammar() {
  useVisit({ path: '/ngu-phap', title: 'Ngữ pháp tiếng Hàn', type: 'grammar', sub: '111 cấu trúc', preview: ['-아요/어요','-고 싶다','-기 때문에'] });
  const [lv, setLv] = useState(1);
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return GRAMMAR.filter(g => (s ? (g.p + g.m + g.n).toLowerCase().includes(s) : g.level === lv));
  }, [lv, q]);
  return (
    <section className="sec">
      <div className="sec-h"><span className="eyebrow">문법 · Ngữ pháp</span><h2>{GRAMMAR.length} cấu trúc câu từ sơ cấp đến cao cấp</h2>
        <p className="lead">Mỗi cấu trúc có nghĩa, cách chia và câu ví dụ đọc mẫu. Học theo cấp hoặc tìm theo tên.</p></div>
      <input id="g-search" type="search" className="search" placeholder="Tìm cấu trúc, ví dụ: 때문에, nếu, quá khứ…" value={q} onChange={e => setQ(e.target.value)} />
      {!q && <div className="tabs" role="group">{[1, 2, 3, 4, 5].map(l => (
        <button key={l} type="button" aria-pressed={lv === l} onClick={() => setLv(l)}>{LEVEL_NAMES[l]} ({GRAMMAR.filter(g => g.level === l).length})</button>
      ))}</div>}
      <div className="grid g2">{list.map(g => (
        <div key={g.id} className="card gram">
          <div className="row" style={{ justifyContent: 'space-between' }}><span className="pat">{g.p}</span>{q && <span className="tag">{LEVEL_NAMES[g.level]}</span>}</div>
          <b>{g.m}</b>
          <div className="note">{g.n}</div>
          <div className="exs">{g.ex.map((e, i) => (
            <div key={i} className="exl"><Say text={e.ko} /><span className="w ko">{e.ko}</span><span className="vi">{e.vi}</span></div>
          ))}</div>
        </div>
      ))}</div>
      {!list.length && <p className="muted">Không tìm thấy cấu trúc phù hợp.</p>}
    </section>
  );
}
