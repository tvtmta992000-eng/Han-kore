import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { supabase } from './supabase.js';

/* ---------- Tài khoản ---------- */
const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(!supabase);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  const user = session?.user || null;
  const value = {
    ready,
    user,
    name: user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || '',
    async signUp(email, password, fullName) {
      const { error, data } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName }, emailRedirectTo: location.origin } });
      if (error) throw error;
      return data;
    },
    async signIn(email, password) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    },
    async signInGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin } });
      if (error) throw error;
    },
    async resetPassword(email) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: location.origin + '/dat-lai-mat-khau' });
      if (error) throw error;
    },
    async updatePassword(password) {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    },
    async updateName(fullName) {
      const { error } = await supabase.auth.updateUser({ data: { full_name: fullName } });
      if (error) throw error;
    },
    async signOut() { await supabase.auth.signOut(); }
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);

/* ---------- Tiến độ học ---------- */
const EMPTY = { words: {}, quiz: {}, practiced: {}, drafts: {}, days: {}, lessonsDone: {} };
const LS_KEY = 'hg-progress';

function loadLocal() {
  try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(LS_KEY) || '{}') }; } catch { return { ...EMPTY }; }
}
function saveLocal(p) { try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch { /* bỏ qua */ } }

// Gộp tiến độ máy và máy chủ: điểm lấy cao nhất, đánh dấu lấy hợp, nháp lấy bản dài hơn.
function merge(a, b) {
  const out = { ...EMPTY };
  for (const k of Object.keys(EMPTY)) out[k] = { ...(a[k] || {}), ...(b[k] || {}) };
  for (const id of Object.keys(out.quiz)) out.quiz[id] = Math.max(a.quiz?.[id] ?? 0, b.quiz?.[id] ?? 0);
  for (const id of Object.keys(out.days)) out.days[id] = Math.max(a.days?.[id] ?? 0, b.days?.[id] ?? 0);
  for (const id of Object.keys(out.drafts)) {
    const x = a.drafts?.[id] || '', y = b.drafts?.[id] || '';
    out.drafts[id] = x.length >= y.length ? x : y;
  }
  return out;
}

const today = () => new Date().toISOString().slice(0, 10);
const ProgressCtx = createContext(null);

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [p, setP] = useState(loadLocal);
  const [sync, setSync] = useState('local'); // local | loading | saved | saving | error
  const timer = useRef(null);
  const loadedFor = useRef(null);

  // Tải tiến độ từ máy chủ khi đăng nhập
  useEffect(() => {
    if (!supabase || !user) { setSync('local'); loadedFor.current = null; return; }
    let cancel = false;
    setSync('loading');
    supabase.from('progress').select('data').eq('user_id', user.id).maybeSingle().then(({ data, error }) => {
      if (cancel) return;
      if (error) { setSync('error'); return; }
      setP(prev => { const m = merge(prev, data?.data || {}); saveLocal(m); return m; });
      loadedFor.current = user.id;
      setSync('saved');
    });
    return () => { cancel = true; };
  }, [user]);

  const push = useCallback(next => {
    if (!supabase || !user || loadedFor.current !== user.id) return;
    clearTimeout(timer.current);
    setSync('saving');
    timer.current = setTimeout(async () => {
      const { error } = await supabase.from('progress').upsert({ user_id: user.id, data: next, updated_at: new Date().toISOString() });
      setSync(error ? 'error' : 'saved');
    }, 1200);
  }, [user]);

  const update = useCallback(fn => {
    setP(prev => {
      const next = fn(structuredClone(prev));
      next.days[today()] = (next.days[today()] || 0) + 1;
      saveLocal(next);
      push(next);
      return next;
    });
  }, [push]);

  const api = {
    p, sync,
    toggleWord: ko => update(s => { if (s.words[ko]) delete s.words[ko]; else s.words[ko] = 1; return s; }),
    setScore: (id, score) => update(s => { s.quiz[id] = Math.max(s.quiz[id] || 0, score); return s; }),
    togglePracticed: key => update(s => { if (s.practiced[key]) delete s.practiced[key]; else s.practiced[key] = 1; return s; }),
    markPracticed: key => update(s => { s.practiced[key] = 1; return s; }),
    setDraft: (id, text) => update(s => { s.drafts[id] = text; return s; }),
    markLesson: id => update(s => { s.lessonsDone[id] = 1; return s; }),
    reset: () => { const e = structuredClone(EMPTY); saveLocal(e); setP(e); push(e); }
  };
  return <ProgressCtx.Provider value={api}>{children}</ProgressCtx.Provider>;
}
export const useProgress = () => useContext(ProgressCtx);

export function streakOf(days) {
  let n = 0;
  const d = new Date();
  if (!days[d.toISOString().slice(0, 10)]) d.setDate(d.getDate() - 1);
  while (days[d.toISOString().slice(0, 10)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
