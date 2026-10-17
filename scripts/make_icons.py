#!/usr/bin/env python3
"""Tạo icon ứng dụng (chữ 한 trên nền xanh ngọc)."""
import os, subprocess
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'icons')
os.makedirs(OUT, exist_ok=True)
font_path = subprocess.run(['fc-list', ':lang=ko', 'file'], capture_output=True, text=True).stdout.split('\n')[0].split(':')[0]

def icon(size, pad_ratio, rounded, name):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = int(size * 0.22) if rounded else 0
    d.rounded_rectangle([0, 0, size - 1, size - 1], r, fill=(18, 107, 95))
    f = ImageFont.truetype(font_path, int(size * (1 - pad_ratio) * 0.78))
    d.text((size / 2, size / 2 + size * 0.02), '한', font=f, fill=(255, 255, 255), anchor='mm')
    d.ellipse([size * 0.70, size * 0.16, size * 0.80, size * 0.26], fill=(224, 112, 95))
    img.save(os.path.join(OUT, name))

icon(192, 0.18, True, 'icon-192.png')
icon(512, 0.18, True, 'icon-512.png')
icon(512, 0.36, False, 'icon-maskable-512.png')
icon(180, 0.18, False, 'apple-touch-icon.png')
icon(64, 0.12, True, 'favicon.png')
print('Đã tạo icon trong public/icons')
