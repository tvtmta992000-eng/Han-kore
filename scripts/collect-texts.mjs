// Gom mọi câu tiếng Hàn trong dữ liệu → scripts/texts.json để tạo file âm thanh.
import { writeFileSync } from 'node:fs';
import { CONS, DCONS, VOWS, CVOWS, RULES, PATCHIM, MINIMAL, PRON_QUIZ, CONFUSE, ARTIC } from '../src/data/hangul.js';
import { TOPICS } from '../src/data/vocab.js';
import { GRAMMAR } from '../src/data/grammar.js';
import { PHRASE_SETS } from '../src/data/phrases.js';
import { LESSONS } from '../src/data/lessons.js';
import { audioKey, speakable, VOICES, voiceForSpeaker } from '../src/lib/speakable.js';

const items = new Map();
const add = (text, voice = 'female') => {
  if (!text || !/[가-힣ㄱ-ㅣ]/.test(text)) return;
  const key = audioKey(VOICES[voice], text);
  if (!items.has(key)) items.set(key, { key, voice: VOICES[voice], text: speakable(text) });
};

['한', '국', '어'].forEach(t => add(t));
for (const j of [...CONS, ...DCONS]) { add(j[6]); add(j[4]); add(`${j[1]}. ${j[6]}`); add(j[1]); }
for (const j of [...VOWS, ...CVOWS]) { add(j[6]); add(j[4]); }
// mọi âm tiết không có patchim cho phần ghép chữ
for (let l = 0; l < 19; l++) for (let v = 0; v < 21; v++) add(String.fromCharCode(0xac00 + (l * 21 + v) * 28));
RULES.forEach(r => r.ex.forEach(e => add(e[0])));
PATCHIM.forEach(r => add(r[3]));
MINIMAL.flat().forEach(s => s && add(s));
PRON_QUIZ.forEach(([w]) => add(w));
CONFUSE.flat().forEach(s => add(s));
ARTIC.forEach(a => a.sounds.forEach(s => add(s.syl)));
TOPICS.forEach(t => t.words.forEach(w => add(w.ko)));
GRAMMAR.forEach(g => g.ex.forEach(e => add(e.ko)));
PHRASE_SETS.forEach(s => s.lines.forEach(l => add(l.ko)));
for (const l of LESSONS) {
  l.listen.lines.forEach(([sp, ko]) => add(ko, voiceForSpeaker(sp)));
  add(l.read.text); add(l.speak.sample); add(l.write.model);
  l.quiz.forEach(q => q.audio && add(q.audio));
}

const list = [...items.values()];
writeFileSync(new URL('./texts.json', import.meta.url), JSON.stringify(list, null, 0));
console.log(`Đã gom ${list.length} câu cần đọc → scripts/texts.json`);
