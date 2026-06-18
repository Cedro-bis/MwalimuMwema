import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence, initializeFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Force session-based persistence so users must re-authenticate when closing the app
setPersistence(auth, browserSessionPersistence).catch((err) => {
  console.error("Auth persistence error:", err);
});

// Gracefully enable Firestore offline indexedDB persistence to buffer edits and allows reading existing caches
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn("Firestore indexedDB persistence failed: Multiple tabs open.");
    } else if (err.code === 'unimplemented') {
      console.warn("Firestore indexedDB persistence is not supported by this browser.");
    } else {
      console.warn("Firestore indexedDB persistence error:", err);
    }
  });
}

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
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errObj = error as any;
  const errMsg = String(errObj?.message || error).toLowerCase();
  const errCode = String(errObj?.code || '').toLowerCase();
  
  // Strict check if it's a security rule / permissions denial (as required by Firestore Integration skill)
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
    // Quiet offline or network notifications: print as warnings instead of breaking the flow
    console.warn(`[Firestore Non-Permission Event] Operation: ${operationType} on ${path || 'unknown'}. Info:`, error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}
