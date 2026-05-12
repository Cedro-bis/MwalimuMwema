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
          createdAt: Timestamp.now()
        });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${uid}`);
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

  // Update curriculum progress (completed chapters)
  async updateProgress(userId: string, curriculumId: string, completedChapters: string[]) {
    const id = curriculumId.replace(/\s+/g, '_');
    const ref = doc(db, 'users', userId, 'curriculums', id);
    try {
      await setDoc(ref, { 
        completedChapters,
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
  }
};
