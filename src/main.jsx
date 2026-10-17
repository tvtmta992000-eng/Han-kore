import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuthProvider, ProgressProvider } from './lib/store.jsx';
import App from './App.jsx';
import './styles.css';

// Bản demo tĩnh (không có máy chủ chuyển hướng) dùng HashRouter.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
