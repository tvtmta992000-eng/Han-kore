import { useMemo, useState } from 'react';
import { useProgress } from '../lib/store.jsx';
import Say from './Say.jsx';

const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// items: [{q, o:[đúng, sai...], a?:index đúng, ko, oko, audio, ex}] hoặc {t:'order', q, w:[...]}
// make: hàm tạo bộ câu mới mỗi lần làm lại (dùng cho bài tập ngẫu nhiên).
export default function Quiz({ id, items, make, title }) {
  const { p, setScore } = useProgress();
  const [round, setRound] = useState(0);
  const set = useMemo(() => {
    const list = make ? make() : items;
    return list.map(it => ({ ...it, a: it.a ?? 0, perm: shuffle((it.t === 'order' ? it.w : it.o).map((_, i) => i)) }));
  }, [items, make, round]);
  const [ans, setAns] = useState({});
  const [pick, setPick] = useState({});

  const total = set.length;
  const done = Object.keys(ans).length;
  const correct = Object.values(ans).filter(x => x.ok).length;
  const best = p.quiz[id];

  function answer(i, v) {
    if (ans[i]) return;
    const it = set[i];
    const ok = it.t === 'order' ? v.every((w, k) => w === k) : v === it.a;
    const next = { ...ans, [i]: { v, ok } };
    setAns(next);
    if (Object.keys(next).length === total) setScore(id, Object.values(next).filter(x => x.ok).length, total, title);
  }
  function restart() { setAns({}); setPick({}); setRound(r => r + 1); }

  return (
    <div className="quiz">
      {set.map((it, i) => {
        const st = ans[i];
        const isKo = it.ko || it.oko;
        return (
          <div key={`${round}-${i}`} className={`qq ${st ? (st.ok ? 'right' : 'wrong') : ''}`}>
            <div className="qh">
              <span className="qn">Câu {i + 1}</span>
              <div className={`qt ${it.ko ? 'ko' : ''}`}>{it.q}</div>
              {it.audio && <Say text={it.audio} label="Nghe câu hỏi" />}
            </div>
            {it.t === 'order' ? (
              <>
                <div className="line" aria-label="Câu của bạn">
                  {(pick[i] || []).length === 0 && <span className="muted small">Chạm các từ bên dưới theo đúng thứ tự</span>}
                  {(pick[i] || []).map((w, k) => (
                    <button key={k} type="button" className="wchip" disabled={!!st}
                      onClick={() => setPick({ ...pick, [i]: pick[i].filter((_, x) => x !== k) })}>{it.w[w]}</button>
                  ))}
                </div>
                <div className="chips">
                  {it.perm.filter(w => !(pick[i] || []).includes(w)).map(w => (
                    <button key={w} type="button" className="wchip" disabled={!!st}
                      onClick={() => setPick({ ...pick, [i]: [...(pick[i] || []), w] })}>{it.w[w]}</button>
                  ))}
                </div>
                {!st && <div><button type="button" className="btn primary" disabled={(pick[i] || []).length < it.w.length} onClick={() => answer(i, pick[i])}>Kiểm tra</button></div>}
              </>
            ) : (
              <div className="opts">
                {it.perm.map(o => {
                  let c = '';
                  if (st) { if (o === it.a) c = 'right'; else if (o === st.v) c = 'wrong'; }
                  return <button key={o} type="button" className={`opt ${c} ${isKo ? 'ko' : ''}`} disabled={!!st} onClick={() => answer(i, o)}>{it.o[o]}</button>;
                })}
              </div>
            )}
            {st && (
              <div className={`fb ${st.ok ? 'right' : 'wrong'}`}>
                {st.ok ? 'Chính xác! ' : 'Chưa đúng. '}
                {!st.ok && (it.t === 'order'
                  ? <>Đáp án: <span className="ko">{it.w.join(' ')}</span>. </>
                  : <>Đáp án: <b className={isKo ? 'ko' : ''}>{it.o[it.a]}</b>. </>)}
                {it.ex}
              </div>
            )}
          </div>
        );
      })}
      <div className="quiz-foot">
        <span><b className="score">{correct}/{total}</b> <span className="muted small">· đã làm {done}/{total}{best != null ? ` · tốt nhất ${best}/${total}` : ''}</span></span>
        <button type="button" className="btn" onClick={restart}>Làm lại</button>
      </div>
    </div>
  );
}
