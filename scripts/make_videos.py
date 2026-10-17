#!/usr/bin/env python3
"""Tạo video MP4 hướng dẫn thứ tự nét cho 40 chữ cái Hangul.

Chạy:  python3 scripts/make_videos.py
Cần:   Pillow, ffmpeg và một font có chữ Hàn (Noto Sans KR, Nanum Gothic, WenQuanYi...).
Kết quả: public/video/stroke-<mã>.mp4 và src/data/strokes.json
"""
import json, math, os, shutil, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "public", "video")
JSON_OUT = os.path.join(ROOT, "src", "data", "strokes.json")

# Lưới 100×100. Một nét là danh sách điểm; {"c": [cx, cy, r]} là vòng tròn ㅇ viết ngược chiều kim đồng hồ từ đỉnh.
BASE = {
    "ㄱ": [[[20, 20], [80, 20], [80, 85]]],
    "ㄴ": [[[22, 15], [22, 82], [85, 82]]],
    "ㄷ": [[[20, 18], [80, 18]], [[20, 18], [20, 82], [84, 82]]],
    "ㄹ": [[[20, 14], [78, 14], [78, 48]], [[22, 48], [78, 48]], [[22, 48], [22, 86], [84, 86]]],
    "ㅁ": [[[20, 20], [20, 82]], [[20, 20], [80, 20], [80, 82]], [[20, 82], [80, 82]]],
    "ㅂ": [[[22, 14], [22, 86]], [[78, 14], [78, 86]], [[22, 48], [78, 48]], [[22, 86], [78, 86]]],
    "ㅅ": [[[50, 14], [16, 86]], [[44, 46], [84, 86]]],
    "ㅇ": [{"c": [50, 50, 32]}],
    "ㅈ": [[[20, 18], [80, 18]], [[52, 18], [16, 86]], [[46, 50], [84, 86]]],
    "ㅊ": [[[50, 6], [50, 20]], [[20, 26], [80, 26]], [[52, 26], [16, 90]], [[46, 56], [84, 90]]],
    "ㅋ": [[[20, 18], [80, 18], [80, 86]], [[22, 50], [78, 50]]],
    "ㅌ": [[[22, 14], [80, 14]], [[22, 48], [78, 48]], [[22, 14], [22, 86], [84, 86]]],
    "ㅍ": [[[14, 18], [86, 18]], [[36, 18], [36, 80]], [[64, 18], [64, 80]], [[10, 80], [90, 80]]],
    "ㅎ": [[[50, 6], [50, 18]], [[18, 26], [82, 26]], {"c": [50, 62, 22]}],
    "ㅏ": [[[40, 8], [40, 92]], [[40, 50], [72, 50]]],
    "ㅑ": [[[40, 8], [40, 92]], [[40, 38], [72, 38]], [[40, 62], [72, 62]]],
    "ㅓ": [[[28, 50], [60, 50]], [[60, 8], [60, 92]]],
    "ㅕ": [[[28, 38], [60, 38]], [[28, 62], [60, 62]], [[60, 8], [60, 92]]],
    "ㅗ": [[[50, 30], [50, 64]], [[10, 64], [90, 64]]],
    "ㅛ": [[[38, 30], [38, 64]], [[62, 30], [62, 64]], [[10, 64], [90, 64]]],
    "ㅜ": [[[10, 38], [90, 38]], [[50, 38], [50, 76]]],
    "ㅠ": [[[10, 38], [90, 38]], [[38, 38], [38, 76]], [[62, 38], [62, 76]]],
    "ㅡ": [[[10, 50], [90, 50]]],
    "ㅣ": [[[50, 8], [50, 92]]],
    "ㅐ": [[[30, 8], [30, 92]], [[30, 50], [52, 50]], [[70, 8], [70, 92]]],
    "ㅒ": [[[30, 8], [30, 92]], [[30, 38], [52, 38]], [[30, 62], [52, 62]], [[70, 8], [70, 92]]],
    "ㅔ": [[[22, 50], [42, 50]], [[42, 8], [42, 92]], [[70, 8], [70, 92]]],
    "ㅖ": [[[20, 38], [42, 38]], [[20, 62], [42, 62]], [[42, 8], [42, 92]], [[70, 8], [70, 92]]],
    "ㅘ": [[[35, 40], [35, 66]], [[8, 66], [62, 66]], [[72, 8], [72, 92]], [[72, 50], [92, 50]]],
    "ㅙ": [[[30, 40], [30, 66]], [[6, 66], [52, 66]], [[62, 8], [62, 92]], [[62, 50], [76, 50]], [[86, 8], [86, 92]]],
    "ㅚ": [[[38, 40], [38, 66]], [[8, 66], [68, 66]], [[80, 8], [80, 92]]],
    "ㅝ": [[[6, 40], [60, 40]], [[34, 40], [34, 76]], [[56, 58], [76, 58]], [[76, 8], [76, 92]]],
    "ㅞ": [[[4, 40], [50, 40]], [[27, 40], [27, 76]], [[48, 58], [62, 58]], [[62, 8], [62, 92]], [[84, 8], [84, 92]]],
    "ㅟ": [[[6, 40], [64, 40]], [[35, 40], [35, 76]], [[80, 8], [80, 92]]],
    "ㅢ": [[[6, 55], [64, 55]], [[80, 8], [80, 92]]],
}
DOUBLES = {"ㄲ": "ㄱ", "ㄸ": "ㄷ", "ㅃ": "ㅂ", "ㅆ": "ㅅ", "ㅉ": "ㅈ"}
ORDER = list("ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㄲㄸㅃㅆㅉㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ")
NAMES = {"ㄱ": "기역", "ㄴ": "니은", "ㄷ": "디귿", "ㄹ": "리을", "ㅁ": "미음", "ㅂ": "비읍", "ㅅ": "시옷", "ㅇ": "이응",
         "ㅈ": "지읒", "ㅊ": "치읓", "ㅋ": "키읔", "ㅌ": "티읕", "ㅍ": "피읖", "ㅎ": "히읗", "ㄲ": "쌍기역",
         "ㄸ": "쌍디귿", "ㅃ": "쌍비읍", "ㅆ": "쌍시옷", "ㅉ": "쌍지읒"}


def squeeze(strokes, x0):
    """Thu hẹp một chữ vào nửa ô (dùng cho phụ âm đôi)."""
    out = []
    for s in strokes:
        if isinstance(s, dict):
            cx, cy, r = s["c"]
            out.append({"c": [x0 + cx * 0.46, cy, r * 0.46]})
        else:
            out.append([[round(x0 + x * 0.46, 1), y] for x, y in s])
    return out


def all_strokes():
    data = dict(BASE)
    for d, b in DOUBLES.items():
        data[d] = squeeze(BASE[b], 3) + squeeze(BASE[b], 51)
    return {k: data[k] for k in ORDER}


def to_points(stroke, steps=72):
    if isinstance(stroke, dict):
        cx, cy, r = stroke["c"]
        # bắt đầu từ đỉnh, đi ngược chiều kim đồng hồ (trên màn hình: sang trái trước)
        return [(cx - r * math.sin(2 * math.pi * i / steps), cy - r * math.cos(2 * math.pi * i / steps)) for i in range(steps + 1)]
    return [tuple(p) for p in stroke]


def partial(points, frac):
    seg = [math.dist(points[i], points[i + 1]) for i in range(len(points) - 1)]
    total = sum(seg)
    target = total * frac
    out = [points[0]]
    acc = 0
    for i, L in enumerate(seg):
        if acc + L >= target:
            t = (target - acc) / L if L else 0
            a, b = points[i], points[i + 1]
            out.append((a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t))
            return out
        out.append(points[i + 1])
        acc += L
    return out


def length(points):
    return sum(math.dist(points[i], points[i + 1]) for i in range(len(points) - 1))


def find_font():
    cands = [
        "/usr/share/fonts/truetype/noto/NotoSansKR-Regular.otf",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
        "/usr/share/fonts/truetype/nanum/NanumGothic.ttf",
        "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc",
        "C:/Windows/Fonts/malgun.ttf",
        "/System/Library/Fonts/AppleSDGothicNeo.ttc",
    ]
    for c in cands:
        if os.path.exists(c):
            return c
    try:
        out = subprocess.run(["fc-list", ":lang=ko", "file"], capture_output=True, text=True).stdout.split("\n")
        for line in out:
            if line.strip():
                return line.split(":")[0]
    except FileNotFoundError:
        pass
    sys.exit("Không tìm thấy font tiếng Hàn. Hãy cài Noto Sans KR hoặc Nanum Gothic.")


W = 480
PAD_TOP = 24
BOX = 384
FPS = 30
BG = (243, 245, 244)
CARD = (255, 255, 255)
GRID = (205, 214, 210)
GHOST = (226, 233, 230)
INK = (23, 33, 30)
RED = (180, 57, 44)
TEAL = (18, 107, 95)


def render(ch, strokes, font_path, tmp):
    big = ImageFont.truetype(font_path, 34)
    small = ImageFont.truetype(font_path, 20)
    ox = (W - BOX) // 2
    pts_list = [to_points(s) for s in strokes]
    S = lambda p: (ox + p[0] / 100 * BOX, PAD_TOP + p[1] / 100 * BOX)
    lw = 26

    def base_frame(done, current, frac, label):
        img = Image.new("RGB", (W, W + 40), BG)
        d = ImageDraw.Draw(img)
        d.rounded_rectangle([ox, PAD_TOP, ox + BOX, PAD_TOP + BOX], 14, fill=CARD, outline=GRID, width=2)
        for i in range(0, BOX, 12):
            d.line([ox + BOX / 2, PAD_TOP + i, ox + BOX / 2, PAD_TOP + i + 6], fill=GRID, width=1)
            d.line([ox + i, PAD_TOP + BOX / 2, ox + i + 6, PAD_TOP + BOX / 2], fill=GRID, width=1)
        for pts in pts_list:
            d.line([S(p) for p in pts], fill=GHOST, width=lw + 8, joint="curve")
            for p in (pts[0], pts[-1]):
                x, y = S(p); r = (lw + 8) / 2
                d.ellipse([x - r, y - r, x + r, y + r], fill=GHOST)

        def stroke(pts, color):
            sp = [S(p) for p in pts]
            if len(sp) > 1:
                d.line(sp, fill=color, width=lw, joint="curve")
            for p in (sp[0], sp[-1]):
                r = lw / 2
                d.ellipse([p[0] - r, p[1] - r, p[0] + r, p[1] + r], fill=color)

        for i in range(done):
            stroke(pts_list[i], INK)
        if current is not None:
            stroke(partial(pts_list[current], frac), RED)
        # số thứ tự nét
        placed = []
        for i, pts in enumerate(pts_list):
            x, y = S(pts[0])
            x -= 22; y -= 22
            while any(math.dist((x, y), q) < 26 for q in placed):
                y += 30
            placed.append((x, y))
            col = RED if (current == i) else (TEAL if i < done else (150, 160, 156))
            d.ellipse([x - 13, y - 13, x + 13, y + 13], fill=col)
            d.text((x, y), str(i + 1), fill=(255, 255, 255), font=small, anchor="mm")
        d.text((W / 2, W + 14), label, fill=INK, font=big, anchor="mm")
        return img

    name = NAMES.get(ch, "")
    title = f"{ch}  {name}".strip()
    frames = []
    for _ in range(int(FPS * 0.6)):
        frames.append(base_frame(0, None, 0, title))
    for i, pts in enumerate(pts_list):
        n = max(int(FPS * 0.5), int(length(pts) / 100 * FPS * 1.1))
        for f in range(n + 1):
            t = f / n
            ease = 0.5 - 0.5 * math.cos(math.pi * t)
            frames.append(base_frame(i, i, ease, f"{title}  ·  nét {i + 1}/{len(pts_list)}"))
        for _ in range(int(FPS * 0.3)):
            frames.append(base_frame(i + 1, None, 0, f"{title}  ·  nét {i + 1}/{len(pts_list)}"))
    for _ in range(int(FPS * 1.2)):
        frames.append(base_frame(len(pts_list), None, 0, title))
    for k, fr in enumerate(frames):
        fr.save(os.path.join(tmp, f"f{k:04d}.png"))
    return len(frames)


def main():
    if not shutil.which("ffmpeg"):
        sys.exit("Cần cài ffmpeg.")
    os.makedirs(OUT_DIR, exist_ok=True)
    data = all_strokes()
    font = find_font()
    meta = {}
    for idx, ch in enumerate(ORDER):
        code = f"{ord(ch):04x}"
        out = os.path.join(OUT_DIR, f"stroke-{code}.mp4")
        with tempfile.TemporaryDirectory() as tmp:
            n = render(ch, data[ch], font, tmp)
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(tmp, "f%04d.png"),
                            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "30", "-preset", "slow", "-movflags", "+faststart", out], check=True)
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", os.path.join(tmp, "f%04d.png"),
                            "-c:v", "libvpx-vp9", "-pix_fmt", "yuv420p", "-crf", "40", "-b:v", "0", "-row-mt", "1", out[:-4] + ".webm"], check=True)
        meta[ch] = {"strokes": data[ch], "video": f"/video/stroke-{code}", "seconds": round(n / FPS, 1)}
        print(f"[{idx + 1}/{len(ORDER)}] {ch} → {os.path.relpath(out, ROOT)}")
    with open(JSON_OUT, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False)
    print("Xong:", os.path.relpath(JSON_OUT, ROOT))


if __name__ == "__main__":
    main()
