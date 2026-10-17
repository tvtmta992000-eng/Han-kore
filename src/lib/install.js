import { useEffect, useState } from 'react';

// Bắt sự kiện cài đặt PWA (Android/Chrome). iPhone phải cài qua nút Chia sẻ → "Thêm vào MH chính".
let deferred = null;
const subs = new Set();
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; subs.forEach(f => f()); });
  window.addEventListener('appinstalled', () => { deferred = null; subs.forEach(f => f()); });
}

export function useInstall() {
  const [, force] = useState(0);
  useEffect(() => { const f = () => force(x => x + 1); subs.add(f); return () => subs.delete(f); }, []);
  const standalone = typeof window !== 'undefined' && (matchMedia('(display-mode: standalone)').matches || navigator.standalone);
  const ios = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);
  return {
    canPrompt: !!deferred,
    standalone,
    ios,
    async install() { if (!deferred) return; deferred.prompt(); await deferred.userChoice; deferred = null; force(x => x + 1); }
  };
}
