/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Wifi, WifiOff, Sparkles, Check, Zap, RefreshCw } from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export const OfflineStatusIndicator: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isOnline, isForcedOffline, toggleForcedOffline } = useNetworkStatus();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        id="offline-status-pill"
        onClick={() => setShowDetails(!showDetails)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none ${
          !isOnline
            ? 'bg-amber-500/10 text-amber-900 border-amber-400 hover:bg-amber-500/20'
            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
        }`}
        title={!isOnline ? "Mode Hors-Ligne Actif — Cliquez pour gérer" : "Connecté — Cliquez pour options"}
      >
        {!isOnline ? (
          <>
            <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="font-bold">Hors-Ligne</span>
            <span className="hidden lg:inline text-[11px] font-medium text-amber-700">(IA Locale Instantanée)</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="hidden sm:inline text-xs font-medium">En Ligne</span>
          </>
        )}
      </button>

      {showDetails && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowDetails(false)} 
          />
          <div className="absolute right-0 mt-2 w-84 p-4 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                {!isOnline ? (
                  <WifiOff className="w-4 h-4 text-amber-600" />
                ) : (
                  <Wifi className="w-4 h-4 text-emerald-600" />
                )}
                <span className="font-bold text-sm text-slate-900">
                  {!isOnline ? "Mode Hors-Ligne Actif" : "Mode En Ligne"}
                </span>
              </div>
              <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                !isOnline ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
              }`}>
                {!isOnline ? "100% Autonome" : "Connecté"}
              </span>
            </div>

            {/* Quick Toggle Button */}
            <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Forcer le mode hors-ligne</p>
                <p className="text-[11px] text-slate-500">Réponse immédiate garantie sans réseau</p>
              </div>
              <button
                id="toggle-offline-mode"
                onClick={() => toggleForcedOffline()}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isForcedOffline
                    ? 'bg-amber-600 text-white shadow-xs hover:bg-amber-700'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {isForcedOffline ? 'Activé' : 'Désactivé'}
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {!isOnline ? (
                "L'IA Mwalimu locale répond directement sur votre appareil sans aucune latence de réseau. Toutes vos actions sont sauvegardées instantanément dans votre espace sécurisé local."
              ) : (
                "Vous profitez de la synchronisation cloud et des modèles Gemini distants. En cas de coupure réseau, le basculement local s'effectue automatiquement en moins de 2.5 secondes."
              )}
            </p>

            <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Génération des cours & chapitres</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Quiz d'évaluation interactifs</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="font-semibold text-slate-900">Temps de réponse local : &lt; 50ms</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="font-medium text-indigo-900">Tuteur IA Mwalimu embarqué</span>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="mt-3 w-full py-1.5 text-center text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </>
      )}
    </div>
  );
};
