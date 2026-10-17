import useVisit from '../lib/useVisit.js';
import { useState } from 'react';
import { PHRASE_SETS } from '../data/phrases.js';
import { LEVEL_NAMES } from '../data/vocab.js';
import { useProgress } from '../lib/store.jsx';
import SpeakCheck from '../components/SpeakCheck.jsx';

export default function Speaking() {
  useVisit({ path: '/luyen-noi', title: 'Luyện nói có chấm điểm', type: 'speak', sub: '96 mẫu câu', preview: ['안녕하세요','감사합니다'] });
  const [i, setI] = useState(0);
  const { p } = useProgress();
  const set = PHRASE_SETS[i];
  return (
    <section className="sec">
      <div className="sec-h"><span className="eyebrow">말하기 · Luyện nói</span><h2>Nghe mẫu, nói theo, máy chấm điểm</h2>
        <p className="lead">Bấm <b>Nghe mẫu</b>, rồi bấm <b>Nói</b> và đọc to câu tiếng Hàn. Ứng dụng ghi âm để bạn nghe lại giọng mình và chấm độ giống câu mẫu (chấm điểm chạy trên Chrome, Edge và Safari mới).</p></div>
      <div className="tabs scroll" role="group">
        {PHRASE_SETS.map((s, k) => {
          const n = s.lines.filter((_, j) => p.practiced[`ph-${s.id}-${j}`]).length;
          return <button key={s.id} type="button" aria-pressed={i === k} onClick={() => setI(k)}>{s.name} <small>{n}/{s.lines.length}</small></button>;
        })}
      </div>
      <p className="small muted">{LEVEL_NAMES[set.level]} · {set.lines.length} câu</p>
      <div className="speak-list">{set.lines.map((l, j) => <SpeakCheck key={set.id + j} text={l.ko} vi={l.vi} pkey={`ph-${set.id}-${j}`} />)}</div>
    </section>
  );
}
