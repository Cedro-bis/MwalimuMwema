/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Level = 'Primaire' | 'Collège' | 'Lycée' | 'Université';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  content?: string;
  youtubeLinks?: { title: string; url: string }[];
  quiz?: QuizQuestion[];
  isCompleted?: boolean;
}

export interface Curriculum {
  level: Level;
  subject: string;
  chapters: Chapter[];
}
