import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  Timestamp,
  deleteDoc
} from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from './firebase';
import { Curriculum, Chapter, Level } from '../types';

export const FirestoreService = {
  // Sync user profile
  async ensureUser(uid: string, email: string) {
    const userRef = doc(db, 'users', uid);
    try {
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          uid,
          email,
          createdAt: Timestamp.now(),
          isVerified: false // Internal verification flag
        });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${uid}`);
    }
  },

  // Sync Google user profile (pre-verified and has Gmail photo capability)
  async ensureGoogleUser(uid: string, email: string) {
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
    const userRef = doc(db, 'users', uid);
    try {
      const snap = await getDoc(userRef);
      return snap.exists() ? snap.data()?.isVerified === true : false;
    } catch (e) {
      return false;
    }
  },

  // Set user as verified
  async setUserVerified(uid: string) {
    const userRef = doc(db, 'users', uid);
    try {
      await setDoc(userRef, { isVerified: true }, { merge: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${uid}`);
    }
  },

  // Save a new curriculum
  async saveCurriculum(userId: string, curriculum: Curriculum) {
    const id = `${curriculum.level}_${curriculum.subject}`.replace(/\s+/g, '_');
    const ref = doc(db, 'users', userId, 'curriculums', id);
    try {
      await setDoc(ref, {
        ...curriculum,
        userId,
        createdAt: Timestamp.now(),
        lastAccessed: Timestamp.now()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${userId}/curriculums/${id}`);
    }
  },

  // Get user history
  async getUserCurriculums(userId: string) {
    const ref = collection(db, 'users', userId, 'curriculums');
    try {
      const snap = await getDocs(query(ref, orderBy('lastAccessed', 'desc'), limit(10)));
      return snap.docs.map(doc => doc.data() as Curriculum & { createdAt: Timestamp, lastAccessed: Timestamp });
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, `users/${userId}/curriculums`);
      return [];
    }
  },

  // Save chapter details
  async saveChapterDetails(userId: string, curriculumId: string, chapter: Chapter) {
    const id = curriculumId.replace(/\s+/g, '_');
    const chapterRef = doc(db, 'users', userId, 'curriculums', id, 'details', chapter.title.replace(/\s+/g, '_'));
    try {
      await setDoc(chapterRef, {
        content: chapter.content,
        youtubeLinks: chapter.youtubeLinks,
        quiz: chapter.quiz,
        updatedAt: Timestamp.now()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${userId}/curriculums/${id}/details/${chapter.title}`);
    }
  },

  // Get chapter details
  async getChapterDetails(userId: string, curriculumId: string, chapterTitle: string) {
    const id = curriculumId.replace(/\s+/g, '_');
    const chapterRef = doc(db, 'users', userId, 'curriculums', id, 'details', chapterTitle.replace(/\s+/g, '_'));
    try {
      const snap = await getDoc(chapterRef);
      return snap.exists() ? snap.data() as Partial<Chapter> : null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `users/${userId}/curriculums/${id}/details/${chapterTitle}`);
      return null;
    }
  },

  // Invalidate / delete chapter details
  async deleteChapterDetails(userId: string, curriculumId: string, chapterTitle: string) {
    const id = curriculumId.replace(/\s+/g, '_');
    const chapterRef = doc(db, 'users', userId, 'curriculums', id, 'details', chapterTitle.replace(/\s+/g, '_'));
    try {
      await deleteDoc(chapterRef);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${userId}/curriculums/${id}/details/${chapterTitle}`);
    }
  },

  // Update curriculum progress (completed chapters and scores)
  async updateProgress(userId: string, curriculumId: string, completedChapters: string[], chapterScores?: Record<string, number>) {
    const id = curriculumId.replace(/\s+/g, '_');
    const ref = doc(db, 'users', userId, 'curriculums', id);
    try {
      await setDoc(ref, { 
        completedChapters,
        chapterScores: chapterScores || {},
        lastAccessed: Timestamp.now() 
      }, { merge: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${userId}/curriculums/${id}`);
    }
  },

  // Delete a curriculum
  async deleteCurriculum(userId: string, curriculumId: string) {
    const id = curriculumId.replace(/\s+/g, '_');
    const ref = doc(db, 'users', userId, 'curriculums', id);
    try {
      await deleteDoc(ref);
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `users/${userId}/curriculums/${id}`);
    }
  },

  // Delete all user data
  async deleteAccount(userId: string) {
    const userRef = doc(db, 'users', userId);
    const verificationRef = doc(db, 'users', userId, 'private', 'verification');
    try {
      // First delete private verification document if it exists
      await deleteDoc(verificationRef).catch(() => {});
      
      // Delete the main user profile
      await deleteDoc(userRef);
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `users/${userId}`);
    }
  }
};
