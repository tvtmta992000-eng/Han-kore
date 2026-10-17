import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Khi chưa cấu hình Supabase, ứng dụng chạy ở chế độ khách: tiến độ lưu trên máy.
export const supabase = url && key ? createClient(url, key) : null;
export const authEnabled = !!supabase;
