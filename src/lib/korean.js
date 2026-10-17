const L = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const V = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const T = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
export const L_LIST = L.split('');
export const V_LIST = V.split('');
export const T_LIST = T;
export const compose = (l, v, t) => String.fromCharCode(0xac00 + (l * 21 + v) * 28 + t);

// Tách âm tiết thành chữ cái để so sánh phát âm chi tiết hơn.
export function toJamo(str) {
  let out = '';
  for (const ch of str) {
    const c = ch.charCodeAt(0) - 0xac00;
    if (c >= 0 && c < 11172) out += L[Math.floor(c / 588)] + V[Math.floor((c % 588) / 28)] + T[c % 28];
    else if (/[ㄱ-ㅣ0-9a-z]/i.test(ch)) out += ch.toLowerCase();
  }
  return out;
}

function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}

// Điểm giống nhau 0–100 giữa câu mẫu và câu máy nghe được.
export function similarity(target, heard) {
  const a = toJamo(target), b = toJamo(heard);
  if (!a.length) return 0;
  return Math.max(0, Math.round((1 - lev(a, b) / Math.max(a.length, b.length)) * 100));
}

// Đánh dấu từng âm tiết của câu mẫu: đúng nếu xuất hiện trong câu nghe được.
export function markSyllables(target, heard) {
  const pool = heard.replace(/\s/g, '');
  return [...target].map(ch => ({ ch, ok: /\s|[.,?!]/.test(ch) || pool.includes(ch) }));
}
