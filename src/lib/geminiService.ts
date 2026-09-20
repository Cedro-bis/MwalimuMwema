/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Level, Curriculum, Chapter, ScienceNews } from "../types";
import { OfflineAiService } from "./offlineAiService";

/**
 * Fast network timeout (in milliseconds) before falling back to local Offline AI.
 * Keeps response time snappy without leaving the user waiting.
 */
const FAST_NETWORK_TIMEOUT_MS = 2500;

function isExplicitlyOffline(): boolean {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("mwalimu_offline_mode") === "true") return true;
  if (localStorage.getItem("mwalimu_offline_forced") === "true") return true;
  if (typeof navigator !== "undefined" && !navigator.onLine) return true;
  return false;
}

export const GeminiService = {
  /**
   * Generates a curriculum (list of chapters) for a given level and subject.
   * If offline or in forced offline mode, responds INSTANTLY via local Offline AI.
   * If online, attempts a fast 2.5s network request and falls back seamlessly if unreachable.
   */
  async generateCurriculum(level: Level, subject: string): Promise<Curriculum> {
    if (!isExplicitlyOffline()) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FAST_NETWORK_TIMEOUT_MS);
        
        const res = await fetch("/api/generateCurriculum", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ level, subject }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.info("[GeminiService] Network fetch bypassed, using instant Offline AI engine");
      }
    }

    return OfflineAiService.generateCurriculum(level, subject);
  },

  /**
   * Generates detailed content for a specific chapter.
   * Responds immediately via local Offline AI if offline or if network is delayed.
   */
  async generateChapterDetails(level: Level, subject: string, chapterTitle: string): Promise<Partial<Chapter>> {
    if (!isExplicitlyOffline()) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FAST_NETWORK_TIMEOUT_MS);

        const res = await fetch("/api/generateChapterDetails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ level, subject, chapterTitle }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.info("[GeminiService] Network fetch bypassed, using instant Offline AI engine");
      }
    }

    return OfflineAiService.generateChapterDetails(level, subject, chapterTitle);
  },

  /**
   * Answers a user question about a specific lesson content.
   * Uses local Offline AI Tutor instantly if offline.
   */
  async askAi(level: string, subject: string, chapterTitle: string, lessonContent: string, question: string): Promise<string> {
    if (!isExplicitlyOffline()) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FAST_NETWORK_TIMEOUT_MS);

        const res = await fetch("/api/askAi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ level, subject, chapterTitle, lessonContent, question }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          return data.response;
        }
      } catch (err) {
        console.info("[GeminiService] Network fetch bypassed, using instant Offline AI Tutor");
      }
    }

    return OfflineAiService.askAi(level, subject, chapterTitle, lessonContent, question);
  },

  /**
   * Generates or fetches scientific news across multiple domains.
   * Seamlessly returns curated offline scientific repository when offline.
   */
  async generateScienceNews(specificDomain?: string): Promise<ScienceNews[]> {
    if (!isExplicitlyOffline()) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FAST_NETWORK_TIMEOUT_MS);

        const res = await fetch("/api/generateScienceNews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ specificDomain }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          return data;
        }
      } catch (err) {
        console.info("[GeminiService] Network fetch bypassed, using offline repository");
      }
    }

    return OfflineAiService.generateScienceNews(specificDomain);
  }
};
