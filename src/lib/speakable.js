// Chuẩn hóa chuỗi tiếng Hàn trước khi đọc / tạo file âm thanh.
// "하나 (한)" → "하나, 한" ; "계란 / 달걀" → "계란, 달걀"
export function speakable(text) {
  return String(text)
    .replace(/\s*\/\s*/g, ', ')
    .replace(/\s*\(([^)]*)\)/g, ', $1')
    .replace(/_{2,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// FNV-1a 32-bit trên UTF-8 — dùng chung cho app và script tạo âm thanh.
export function audioKey(voice, text) {
  const bytes = new TextEncoder().encode(voice + '|' + speakable(text));
  let h = 0x811c9dc5;
  for (const b of bytes) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}

export const VOICES = { female: 'ko-KR-SunHiNeural', male: 'ko-KR-InJoonNeural' };
export const voiceForSpeaker = sp => (sp === 'A' || sp === '남') ? 'male' : 'female';
