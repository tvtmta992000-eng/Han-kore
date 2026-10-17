import { useEffect, useRef } from 'react';

// Ô tập viết: chữ mẫu mờ + lưới chữ thập, người học tô bằng chuột hoặc ngón tay.
export default function TraceCanvas({ guide }) {
  const ref = useRef(null);
  const resetRef = useRef(() => {});

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d');
    let drawing = false, last = null;
    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    function reset() {
      const dpr = window.devicePixelRatio || 1, w = cv.clientWidth;
      cv.width = w * dpr; cv.height = w * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, w);
      ctx.strokeStyle = css('--line'); ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, w); ctx.moveTo(0, w / 2); ctx.lineTo(w, w / 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = css('--sunken'); ctx.font = `500 ${w * 0.72}px "Noto Sans KR", sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(guide, w / 2, w / 2 + w * 0.03);
      ctx.strokeStyle = css('--red'); ctx.lineWidth = Math.max(5, w / 38); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    }
    resetRef.current = reset;
    reset();
    document.fonts?.ready.then(reset);
    const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    cv.onpointerdown = e => { drawing = true; last = pos(e); cv.setPointerCapture(e.pointerId); };
    cv.onpointermove = e => { if (!drawing) return; const q = pos(e); ctx.beginPath(); ctx.moveTo(...last); ctx.lineTo(...q); ctx.stroke(); last = q; };
    cv.onpointerup = cv.onpointercancel = () => { drawing = false; };
    window.addEventListener('resize', reset);
    return () => window.removeEventListener('resize', reset);
  }, [guide]);

  return (
    <div className="sec">
      <div className="stage"><canvas ref={ref} aria-label={`Ô tập viết chữ ${guide}`} /></div>
      <div className="row"><button type="button" className="btn" onClick={() => resetRef.current()}>Xóa và viết lại</button></div>
    </div>
  );
}
