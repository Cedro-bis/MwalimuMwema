import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for offline PWA operation
const updateSW = registerSW({
  onOfflineReady() {
    console.log('[PWA] MwalimuMwema est prêt à fonctionner hors-ligne !');
  },
  onNeedRefresh() {
    console.log('[PWA] Nouvelle version disponible, mise à jour en cours...');
    updateSW(true);
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

