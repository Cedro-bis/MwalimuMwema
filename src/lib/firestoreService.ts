import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  Timestamp,
  deleteDoc
} from 'firebase/firestore';
import { db, auth, OperationType, handleFirestoreError } from './firebase';
import { Curriculum, Chapter } from '../types';

/**
 * Checks if an operation should be executed purely offline
 * Returns true if:
 * 1. User id indicates an offline/synthetic user
 * 2. Device is offline or user activated explicit offline mode
 * 3. User is not currently authenticated with Firebase Auth (which would trigger permission errors)
 */
function isOfflineTarget(uid?: string | null): boolean {
  if (!uid) return true;
  if (uid === 'offline_local_user' || uid.startsWith('offline_')) return true;
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('mwalimu_offline_mode') === 'true') return true;
    if (localStorage.getItem('mwalimu_offline_forced') === 'true') return true;
    if (typeof navigator !== 'undefined' && !navigator.onLine) return true;
  }
  // If not signed in to Firebase Auth or UID mismatch, bypass Firestore to prevent permission exceptions
  if (!auth.currentUser || auth.currentUser.uid !== uid) {
    return true;
  }
  return false;
}

export const FirestoreService = {
  // Sync user profile
  async ensureUser(uid: string, email: string) {
    const localProfileKey = `mwalimu_profile_${uid}`;
    const localData = {
      uid,
      email,
      createdAt: new Date().toISOString(),
      isVerified: true
    };
    try {
      if (!localStorage.getItem(localProfileKey)) {
        localStorage.setItem(localProfileKey, JSON.stringify(localData));
      }
    } catch {}

    if (isOfflineTarget(uid)) {
      return;
    }

    const userRef = doc(db, 'users', uid);
    try {
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid,
          email,
          createdAt: Timestamp.now(),
          isVerified: false
        });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${uid}`);
    }
  },

  async updateUserPhoto(uid: string, photoDataUrl: string) {
    const localProfileKey = `mwalimu_profile_${uid}`;
    try {
      const existing = JSON.parse(localStorage.getItem(localProfileKey) || '{}');
      localStorage.setItem(localProfileKey, JSON.stringify({ ...existing, photoDataUrl }));
    } catch {}

    if (isOfflineTarget(uid)) {
      return;
    }

    const userRef = doc(db, 'users', uid);
    try {
      await setDoc(userRef, { photoDataUrl }, { merge: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${uid}`);
    }
  },

  async getUserProfile(uid: string) {
    const localProfileKey = `mwalimu_profile_${uid}`;
    const getLocal = () => {
      try {
        const stored = localStorage.getItem(localProfileKey);
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    };

    if (isOfflineTarget(uid)) {
      return getLocal();
    }

    const userRef = doc(db, 'users', uid);
    try {
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const data = snap.data();
        try {
          localStorage.setItem(localProfileKey, JSON.stringify(data));
        } catch {}
        return data;
      }
      return getLocal();
    } catch (e) {
      return getLocal();
    }
  },

  // Sync Google user profile
  async ensureGoogleUser(uid: string, email: string) {
    const localProfileKey = `mwalimu_profile_${uid}`;
    try {
      localStorage.setItem(localProfileKey, JSON.stringify({
        uid,
        email,
        createdAt: new Date().toISOString(),
        isVerified: true
      }));
    } catch {}

    if (isOfflineTarget(uid)) {
      return;
    }

    const userRef = doc(db, 'users', uid);
    try {
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid,
          email,
          createdAt: Timestamp.now(),
          isVerified: true
        });
      } else if (snap.data()?.isVerified !== true) {
        await setDoc(userRef, { isVerified: true }, { merge: true });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${uid}`);
    }
  },

  // Save verification code (temp)
  async saveVerificationCode(uid: string, code: string) {
    try {
      localStorage.setItem(`mwalimu_code_${uid}`, code);
    } catch {}

    if (isOfflineTarget(uid)) {
      return;
    }

    const ref = doc(db, 'users', uid, 'private', 'verification');
    try {
      await setDoc(ref, {
        code,
        createdAt: Timestamp.now()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${uid}/private/verification`);
    }
  },

  // Check verification status
  async checkUserVerification(uid: string) {
    if (isOfflineTarget(uid)) {
      return true;
    }

    const userRef = doc(db, 'users', uid);
    try {
      const snap = await getDoc(userRef);
      return snap.exists() ? snap.data()?.isVerified === true : false;
    } catch (e) {
      // If offline cache indicates verified, trust it
      return localStorage.getItem(`mwalimu_verified_${uid}`) === 'true';
    }
  },

  // Set user as verified
  async setUserVerified(uid: string) {
    try {
      localStorage.setItem(`mwalimu_verified_${uid}`, 'true');
    } catch {}

    if (isOfflineTarget(uid)) {
      return;
    }

    const userRef = doc(db, 'users', uid);
    try {
      await setDoc(userRef, { isVerified: true }, { merge: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${uid}`);
    }
  },

  // Save a new curriculum (with local storage caching for offline resilience)
  async saveCurriculum(userId: string, curriculum: Curriculum) {
    const id = `${curriculum.level}_${curriculum.subject}`.replace(/\s+/g, '_');
    const localKey = `mwalimu_user_curr_${userId}`;
    
    // Always mirror to localStorage immediately for instant offline access
    try {
      const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
      const filtered = existing.filter((c: any) => `${c.level}_${c.subject}`.replace(/\s+/g, '_') !== id);
      filtered.unshift({
        ...curriculum,
        userId,
        createdAt: new Date().toISOString(),
        lastAccessed: new Date().toISOString()
      });
      localStorage.setItem(localKey, JSON.stringify(filtered.slice(0, 20)));
    } catch (e) {
      console.warn('[FirestoreService] Local cache save failed:', e);
    }

    if (isOfflineTarget(userId)) {
      return;
    }

    const ref = doc(db, 'users', userId, 'curriculums', id);
    try {
      await setDoc(ref, {
        ...curriculum,
        userId,
        createdAt: Timestamp.now(),
        lastAccessed: Timestamp.now()
      });
    } catch (e) {
      console.warn(`[FirestoreService] Cloud save postponed for ${id}`);
    }
  },

  // Get user history (with offline fallback)
  async getUserCurriculums(userId: string) {
    const localKey = `mwalimu_user_curr_${userId}`;
    const getLocal = (): any[] => {
      try {
        return JSON.parse(localStorage.getItem(localKey) || '[]');
      } catch {
        return [];
      }
    };

    if (isOfflineTarget(userId)) {
      return getLocal();
    }

    const ref = collection(db, 'users', userId, 'curriculums');
    try {
      const snap = await getDocs(query(ref, orderBy('lastAccessed', 'desc'), limit(10)));
      const results = snap.docs.map(doc => doc.data() as Curriculum & { createdAt: Timestamp, lastAccessed: Timestamp });
      if (results.length > 0) {
        try {
          localStorage.setItem(localKey, JSON.stringify(results));
        } catch {}
        return results;
      }
      return getLocal();
    } catch (e) {
      return getLocal();
    }
  },

  // Save chapter details (with offline caching)
  async saveChapterDetails(userId: string, curriculumId: string, chapter: Chapter) {
    const id = curriculumId.replace(/\s+/g, '_');
    const safeTitle = chapter.title.replace(/\s+/g, '_');
    const localKey = `mwalimu_chap_${userId}_${id}_${safeTitle}`;

    try {
      localStorage.setItem(localKey, JSON.stringify({
        content: chapter.content,
        youtubeLinks: chapter.youtubeLinks,
        quiz: chapter.quiz,
        updatedAt: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('[FirestoreService] Chapter local cache save failed:', e);
    }

    if (isOfflineTarget(userId)) {
      return;
    }

    const chapterRef = doc(db, 'users', userId, 'curriculums', id, 'details', safeTitle);
    try {
      await setDoc(chapterRef, {
        content: chapter.content,
        youtubeLinks: chapter.youtubeLinks,
        quiz: chapter.quiz,
        updatedAt: Timestamp.now()
      });
    } catch (e) {
      console.warn(`[FirestoreService] Cloud chapter save postponed for ${safeTitle}`);
    }
  },

  // Get chapter details (with offline fallback)
  async getChapterDetails(userId: string, curriculumId: string, chapterTitle: string) {
    const id = curriculumId.replace(/\s+/g, '_');
    const safeTitle = chapterTitle.replace(/\s+/g, '_');
    const localKey = `mwalimu_chap_${userId}_${id}_${safeTitle}`;

    const getLocal = (): Partial<Chapter> | null => {
      try {
        const saved = localStorage.getItem(localKey);
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    };

    if (isOfflineTarget(userId)) {
      return getLocal();
    }

    const chapterRef = doc(db, 'users', userId, 'curriculums', id, 'details', safeTitle);
    try {
      const snap = await getDoc(chapterRef);
      if (snap.exists()) {
        const data = snap.data() as Partial<Chapter>;
        try {
          localStorage.setItem(localKey, JSON.stringify(data));
        } catch {}
        return data;
      }
      return getLocal();
    } catch (e) {
      return getLocal();
    }
  },

  // Invalidate / delete chapter details
  async deleteChapterDetails(userId: string, curriculumId: string, chapterTitle: string) {
    const id = curriculumId.replace(/\s+/g, '_');
    const safeTitle = chapterTitle.replace(/\s+/g, '_');
    const localKey = `mwalimu_chap_${userId}_${id}_${safeTitle}`;
    try {
      localStorage.removeItem(localKey);
    } catch {}

    if (isOfflineTarget(userId)) {
      return;
    }

    const chapterRef = doc(db, 'users', userId, 'curriculums', id, 'details', safeTitle);
    try {
      await deleteDoc(chapterRef);
    } catch (e) {
      console.warn(`[FirestoreService] Cloud delete chapter postponed for ${safeTitle}`);
    }
  },

  // Update curriculum progress (completed chapters and scores)
  async updateProgress(userId: string, curriculumId: string, completedChapters: string[], chapterScores?: Record<string, number>) {
    const id = curriculumId.replace(/\s+/g, '_');
    const localKey = `mwalimu_user_curr_${userId}`;

    try {
      const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
      const updated = existing.map((c: any) => {
        if (`${c.level}_${c.subject}`.replace(/\s+/g, '_') === id) {
          return {
            ...c,
            completedChapters,
            chapterScores: chapterScores || {},
            lastAccessed: new Date().toISOString()
          };
        }
        return c;
      });
      localStorage.setItem(localKey, JSON.stringify(updated));
    } catch {}

    if (isOfflineTarget(userId)) {
      return;
    }

    const ref = doc(db, 'users', userId, 'curriculums', id);
    try {
      await setDoc(ref, { 
        completedChapters,
        chapterScores: chapterScores || {},
        lastAccessed: Timestamp.now() 
      }, { merge: true });
    } catch (e) {
      console.warn(`[FirestoreService] Cloud update progress postponed for ${id}`);
    }
  },

  // Delete a curriculum
  async deleteCurriculum(userId: string, curriculumId: string) {
    const id = curriculumId.replace(/\s+/g, '_');
    const localKey = `mwalimu_user_curr_${userId}`;
    try {
      const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
      const filtered = existing.filter((c: any) => `${c.level}_${c.subject}`.replace(/\s+/g, '_') !== id);
      localStorage.setItem(localKey, JSON.stringify(filtered));
    } catch {}

    if (isOfflineTarget(userId)) {
      return;
    }

    const ref = doc(db, 'users', userId, 'curriculums', id);
    try {
      await deleteDoc(ref);
    } catch (e) {
      console.warn(`[FirestoreService] Cloud delete curriculum postponed for ${id}`);
    }
  },

  // Delete all user data
  async deleteAccount(userId: string) {
    const localKey = `mwalimu_user_curr_${userId}`;
    try {
      localStorage.removeItem(localKey);
      localStorage.removeItem(`mwalimu_profile_${userId}`);
      localStorage.removeItem(`mwalimu_verified_${userId}`);
    } catch {}

    if (isOfflineTarget(userId)) {
      return;
    }

    const userRef = doc(db, 'users', userId);
    const verificationRef = doc(db, 'users', userId, 'private', 'verification');
    try {
      await deleteDoc(verificationRef).catch(() => {});
      await deleteDoc(userRef);
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `users/${userId}`);
    }
  }
};
