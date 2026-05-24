/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Level = 'Primaire' | 'Collège' | 'Lycée' | 'Université' | 'Master' | 'Études approfondies' | string;

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex?: number;
  correctAnswerText?: string;
  explanation: string;
  type?: 'mcq' | 'text';
  correctAnswer?: number; // for backwards compatibility
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  objectives?: string[];
  content?: string;
  youtubeLinks?: { title: string; url: string }[];
  quiz?: QuizQuestion[];
  isCompleted?: boolean;
}

export interface Curriculum {
  level: Level;
  subject: string;
  chapters: Chapter[];
  objectives?: string[];
  completedChapters?: string[];
  chapterScores?: Record<string, number>;
  lastAccessed?: any;
}

export interface HistoryItem {
  id: string;
  curriculum: Curriculum;
  completedChapters: string[];
  chapterScores?: Record<string, number>;
  lastUpdated: number;
}

export interface ScienceNews {
  domain: string;
  items: {
    id: string;
    title: string;
    summary: string;
    description: string;
    date: string;
    impact: string;
    resources: {
      type: 'book' | 'video' | 'article';
      title: string;
      url: string;
    }[];
  }[];
}
