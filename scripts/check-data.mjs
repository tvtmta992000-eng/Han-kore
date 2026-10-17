// Kiểm tra dữ liệu bài học: id ngữ pháp, chủ đề từ vựng, bài tập, truyện tranh.
import { LESSONS } from '../src/data/lessons.js';
import { GRAMMAR } from '../src/data/grammar.js';
import { TOPICS } from '../src/data/vocab.js';
import { PHRASE_SETS } from '../src/data/phrases.js';
import { COMICS } from '../src/data/comics.js';
const g = new Set(GRAMMAR.map(x => x.id)), t = new Set(TOPICS.map(x => x.id)), ph = new Set(PHRASE_SETS.map(x => x.id));
let errs = 0; const err = (id, m) => { errs++; console.log('✗', id, m); };
const ids = new Set();
for (const l of LESSONS) {
  if (ids.has(l.id)) err(l.id, 'trùng id'); ids.add(l.id);
  l.grammar.forEach(x => g.has(x) || err(l.id, 'ngữ pháp ' + x));
  l.vocabTopics.forEach(x => t.has(x) || err(l.id, 'chủ đề ' + x));
  ph.has(l.speak.phrases) || err(l.id, 'mẫu câu ' + l.speak.phrases);
  COMICS[l.id] || err(l.id, 'thiếu truyện tranh');
  const sp = [...new Set(l.listen.lines.map(x => x[0]))];
  sp.forEach(s => COMICS[l.id]?.cast[s] || err(l.id, 'thiếu nhân vật cho ' + s));
  [...l.listen.qs, ...l.read.qs].forEach((q, i) => q.o.length === 4 || err(l.id, 'câu hỏi ' + i + ' không đủ 4 lựa chọn'));
  l.quiz.forEach((q, i) => { if (q.t === 'order') { q.w.length >= 2 || err(l.id, 'order ' + i); } else { (q.o.length === 4 && new Set(q.o).size === 4) || err(l.id, 'quiz ' + i + ' lựa chọn'); } });
  l.write.model.length >= l.write.min * 0.85 || err(l.id, `bài mẫu ${l.write.model.length} chữ < yêu cầu ${l.write.min}`);
}
console.log(`${LESSONS.length} bài · ${errs} lỗi`);
console.log(LESSONS.map(l => `${l.id}:${l.write.model.length}/${l.write.min}-${l.write.max}`).join('  '));
process.exit(errs ? 1 : 0);
