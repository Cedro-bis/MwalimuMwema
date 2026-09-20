/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

export function useNetworkStatus() {
  const getStatus = () => {
    if (typeof window === 'undefined') return { isOnline: true, isForcedOffline: false };
    const forced = localStorage.getItem('mwalimu_offline_mode') === 'true' || 
                   localStorage.getItem('mwalimu_offline_forced') === 'true';
    const physicalOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    return {
      isOnline: !forced && physicalOnline,
      isForcedOffline: forced
    };
  };

  const [{ isOnline, isForcedOffline }, setStatus] = useState(getStatus);

  useEffect(() => {
    const update = () => setStatus(getStatus());

    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    window.addEventListener('storage', update);
    window.addEventListener('offline-mode-change', update);

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      window.removeEventListener('storage', update);
      window.removeEventListener('offline-mode-change', update);
    };
  }, []);

  const toggleForcedOffline = (forced?: boolean) => {
    const newValue = forced !== undefined ? forced : !isForcedOffline;
    if (newValue) {
      localStorage.setItem('mwalimu_offline_mode', 'true');
      localStorage.setItem('mwalimu_offline_forced', 'true');
    } else {
      localStorage.removeItem('mwalimu_offline_mode');
      localStorage.removeItem('mwalimu_offline_forced');
    }
    window.dispatchEvent(new CustomEvent('offline-mode-change', { detail: { forced: newValue } }));
    setStatus(getStatus());
  };

  return { isOnline, isForcedOffline, toggleForcedOffline };
}
