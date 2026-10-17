#!/usr/bin/env python3
"""Tạo file MP3 giọng đọc tiếng Hàn (Microsoft Neural: SunHi nữ, InJoon nam) cho mọi câu trong ứng dụng.

Chạy:   npm run audio          (gom câu + tạo âm thanh)
Cần:    Python 3.9+ và  pip install edge-tts
Kết quả: public/audio/<mã>.mp3 và public/audio/manifest.json
Chỉ tạo file còn thiếu, nên chạy lại bao nhiêu lần cũng được.
"""
import asyncio, json, os, sys

try:
    import edge_tts
except ImportError:
    sys.exit("Thiếu thư viện: chạy  pip install edge-tts")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "audio")
TEXTS = os.path.join(ROOT, "scripts", "texts.json")
CONCURRENCY = int(os.environ.get("AUDIO_CONCURRENCY", "4"))
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")


async def one(sem, item, stats):
    path = os.path.join(OUT, item["key"] + ".mp3")
    if os.path.exists(path) and os.path.getsize(path) > 0:
        stats["skip"] += 1
        return
    async with sem:
        for attempt in range(4):
            try:
                comm = edge_tts.Communicate(item["text"], item["voice"], rate="-5%", proxy=PROXY)
                await comm.save(path)
                if os.path.getsize(path) > 0:
                    stats["new"] += 1
                    return
            except Exception as e:  # mạng chập chờn → thử lại
                err = e
            await asyncio.sleep(2 ** attempt)
        if os.path.exists(path):
            os.remove(path)
        stats["fail"] += 1
        print(f"  Lỗi: {item['text'][:30]}… ({err})")


async def main():
    if not os.path.exists(TEXTS):
        sys.exit("Chưa có scripts/texts.json — chạy: node scripts/collect-texts.mjs")
    os.makedirs(OUT, exist_ok=True)
    items = json.load(open(TEXTS, encoding="utf-8"))
    stats = {"new": 0, "skip": 0, "fail": 0}
    sem = asyncio.Semaphore(CONCURRENCY)
    tasks = [one(sem, it, stats) for it in items]
    for i in range(0, len(tasks), 50):
        await asyncio.gather(*tasks[i:i + 50])
        print(f"  {min(i + 50, len(tasks))}/{len(tasks)}")
    files = sorted(f[:-4] for f in os.listdir(OUT) if f.endswith(".mp3") and os.path.getsize(os.path.join(OUT, f)) > 0)
    with open(os.path.join(OUT, "manifest.json"), "w") as f:
        json.dump({"voices": ["ko-KR-SunHiNeural", "ko-KR-InJoonNeural"], "files": files}, f)
    print(f"Xong: {stats['new']} file mới, {stats['skip']} đã có, {stats['fail']} lỗi. Tổng {len(files)} file.")


asyncio.run(main())
