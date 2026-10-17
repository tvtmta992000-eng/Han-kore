import { useEffect, useState } from 'react';

// Chế độ sáng/tối: lưu lựa chọn, mặc định theo hệ thống.
function initial() {
  try { const t = localStorage.getItem('hg-theme'); if (t) return t; } catch { /* bỏ qua */ }
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(initial);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#171A21' : '#FFFFFF');
    try { localStorage.setItem('hg-theme', theme); } catch { /* bỏ qua */ }
  }, [theme]);
  return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))];
}
