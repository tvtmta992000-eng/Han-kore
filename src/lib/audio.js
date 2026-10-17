import { audioKey, speakable, VOICES } from './speakable.js';

// Ưu tiên file MP3 giọng thật (public/audio/<key>.mp3, liệt kê trong manifest.json).
// Nếu chưa có file, dùng giọng đọc tiếng Hàn của trình duyệt.
let manifest = null;
const manifestReady = fetch(import.meta.env.BASE_URL + 'audio/manifest.json')
  .then(r => (r.ok ? r.json() : { files: [] }))
  .then(m => { manifest = new Set(m.files || []); })
  .catch(() => { manifest = new Set(); });

let rate = 1;
try { rate = parseFloat(localStorage.getItem('hg-rate')) || 1; } catch { /* trình duyệt chặn lưu trữ */ }
const listeners = new Set();
export const getRate = () => rate;
export function setRate(r) {
  rate = r;
  try { localStorage.setItem('hg-rate', String(r)); } catch { /* bỏ qua */ }
  listeners.forEach(fn => fn(r));
}
export const onRate = fn => { listeners.add(fn); return () => listeners.delete(fn); };

let current = null;
let token = 0;
export function stopAudio() {
  token++;
  if (current) { current.pause(); current = null; }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

let koVoice = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  koVoice = speechSynthesis.getVoices().find(v => /^ko/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
export const hasRealAudio = () => !!(manifest && manifest.size);

function tts(text, voice) {
  return new Promise(resolve => {
    if (!('speechSynthesis' in window)) return resolve(false);
    const u = new SpeechSynthesisUtterance(speakable(text));
    u.lang = 'ko-KR';
    if (koVoice) u.voice = koVoice;
    u.rate = 0.9 * rate;
    u.pitch = voice === 'male' ? 0.8 : 1.15;
    u.onend = () => resolve(true);
    u.onerror = () => resolve(false);
    speechSynthesis.speak(u);
  });
}

function playFile(key) {
  return new Promise(resolve => {
    const a = new Audio(`${import.meta.env.BASE_URL}audio/${key}.mp3`);
    a.playbackRate = rate;
    current = a;
    a.onended = () => resolve(true);
    a.onerror = () => resolve(false);
    a.play().catch(() => resolve(false));
  });
}

// Phát một câu. voice: 'female' | 'male'. Trả về promise khi đọc xong.
export async function play(text, voice = 'female', { keep = false } = {}) {
  if (!keep) stopAudio();
  const my = token;
  await manifestReady;
  if (my !== token) return;
  const key = audioKey(VOICES[voice], text);
  if (manifest.has(key)) {
    const ok = await playFile(key);
    if (ok || my !== token) return;
  }
  await tts(text, voice);
}

// Phát lần lượt nhiều câu (hội thoại). onLine(i) báo câu đang đọc.
export async function playSequence(items, onLine) {
  stopAudio();
  const my = token;
  for (let i = 0; i < items.length; i++) {
    if (my !== token) break;
    onLine && onLine(i);
    await play(items[i].text, items[i].voice, { keep: true });
    await new Promise(r => setTimeout(r, 350));
  }
  if (my === token) onLine && onLine(-1);
}
