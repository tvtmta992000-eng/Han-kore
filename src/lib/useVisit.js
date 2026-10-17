import { useEffect } from 'react';
import { useProgress } from './store.jsx';

// Ghi lại trang vừa mở để hiện ở mục "Học gần đây".
export default function useVisit(item) {
  const { visit } = useProgress();
  useEffect(() => { visit(item); }, [item.path]);
}
