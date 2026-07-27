/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Level, Curriculum, Chapter, ScienceNews } from "../types";

export const GeminiService = {
  /**
   * Generates a curriculum (list of chapters) for a given level and subject.
   */
  async generateCurriculum(level: Level, subject: string): Promise<Curriculum> {
    const res = await fetch("/api/generateCurriculum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, subject }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to generate curriculum");
    }
    return res.json();
  },

  /**
   * Generates the detailed content for a specific chapter, including YouTube search suggestions and a quiz.
   */
  async generateChapterDetails(level: Level, subject: string, chapterTitle: string): Promise<Partial<Chapter>> {
    const res = await fetch("/api/generateChapterDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, subject, chapterTitle }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to generate chapter details");
    }
    return res.json();
  },

  /**
   * Answers a user question about a specific lesson content.
   */
  async askAi(level: string, subject: string, chapterTitle: string, lessonContent: string, question: string): Promise<string> {
    const res = await fetch("/api/askAi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, subject, chapterTitle, lessonContent, question }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to ask AI");
    }
    const data = await res.json();
    return data.response;
  },

  /**
   * Generates the latest scientific news across multiple domains or a specific one.
   */
  async generateScienceNews(specificDomain?: string): Promise<ScienceNews[]> {
    const res = await fetch("/api/generateScienceNews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ specificDomain }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to generate science news");
    }
    return res.json();
  }
};
