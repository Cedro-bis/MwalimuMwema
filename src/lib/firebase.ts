import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Modern Firestore initialization with persistent local cache and multi-tab sync
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  }),
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

// Use local persistence so users remain logged in and functional while offline
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn("Auth persistence notice:", err);
});

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const isOffline = typeof window !== 'undefined' && (
    localStorage.getItem('mwalimu_offline_mode') === 'true' ||
    (typeof navigator !== 'undefined' && !navigator.onLine)
  );

  // If in offline mode, silently handle network/permission issues without logging noisy errors
  if (isOffline) {
    console.info(`[Offline Mode] Handled Firestore operation locally for ${path || 'unknown'}`);
    return;
  }

  const errObj = error as any;
  const errMsg = String(errObj?.message || error).toLowerCase();
  const errCode = String(errObj?.code || '').toLowerCase();
  
  const isPermission = errMsg.includes('permission') || errMsg.includes('insufficient') || 
                       errCode.includes('permission') || errCode.includes('unauthenticated');

  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };

  if (isPermission) {
    console.error('Firestore Permission Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  } else {
    console.warn(`[Firestore Event] Operation: ${operationType} on ${path || 'unknown'}. Info:`, error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}
