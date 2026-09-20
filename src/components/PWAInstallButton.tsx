/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if already in standalone / installed mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If browser doesn't expose prompt (e.g. iOS Safari or already running), show helpful guidance
      alert(
        "Pour installer MwalimuMwema sur votre appareil :\n\n" +
        "• Sur Chrome / Edge / Android : Cliquez sur les 3 points en haut à droite > 'Installer l'application' ou 'Ajouter à l'écran d'accueil'.\n" +
        "• Sur iPhone / iPad (Safari) : Touchez le bouton de partage > 'Sur l'écran d'accueil'."
      );
      return;
    }

    try {
      setIsInstalling(true);
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
    } catch (err) {
      console.warn('Install prompt error:', err);
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
    }
  };

  if (isInstalled) {
    return (
      <div 
        id="pwa-installed-badge"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 ${className}`}
        title="Application installée et prête pour un usage hors-ligne"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span className="hidden sm:inline">App Hors-Ligne Prête</span>
      </div>
    );
  }

  return (
    <button
      id="pwa-install-button"
      onClick={handleInstallClick}
      disabled={isInstalling}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-full bg-slate-900 text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs border border-slate-700 cursor-pointer ${className}`}
      title="Installer l'application pour l'utiliser sans connexion internet"
    >
      <Download className="w-3.5 h-3.5 text-indigo-300" />
      <span>{isInstalling ? 'Installation...' : "Installer l'App"}</span>
    </button>
  );
};
