/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { Level, Curriculum, Chapter, QuizQuestion, ScienceNews } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const GeminiService = {
  /**
   * Generates a curriculum (list of chapters) for a given level and subject.
   */
  async generateCurriculum(level: Level, subject: string): Promise<Curriculum> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Génère un programme d'étude structuré (curriculum) pour le niveau "${level}" et la matière "${subject}". 
      Le programme doit être complet et inclure environ 5 à 10 chapitres logiques.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING },
            subject: { type: Type.STRING },
            chapters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["id", "title", "description"]
              }
            }
          },
          required: ["level", "subject", "chapters"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as Curriculum;
  },

  /**
   * Generates the detailed content for a specific chapter, including YouTube search suggestions and a quiz.
   */
  async generateChapterDetails(level: Level, subject: string, chapterTitle: string): Promise<Partial<Chapter>> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Génère le contenu détaillé pour le chapitre "${chapterTitle}" dans la matière "${subject}" au niveau "${level}".
      CONTRÔLE DE FORMAT CRITIQUE:
      1. Le "content" doit être un cours approfondi au format Markdown pur. 
      2. INCLURE SYSTÉMATIQUEMENT des exemples concrets, des cas d'utilisation réels et des blocs de code (avec syntax highlighting) si le sujet est technique ou scientifique.
      3. NE PAS inclure le titre du chapitre au début du contenu. Commence directement par l'introduction.
      4. Utilise des titres de section clairs (ex: ## 1. Introduction).
      5. Assure-toi qu'il y a des doubles retours à la ligne entre chaque paragraphe et chaque titre pour un rendu optimal.
      6. Ne mets pas tout le texte en gras. Réserve le gras pour les termes techniques importants uniquement.
      Inclus aussi:
      - 3 suggestions de titres de vidéos YouTube pertinentes.
      - Un quiz de 3 questions QCM.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING },
            youtubeLinks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING, description: "Un lien de recherche YouTube basé sur le titre" }
                },
                required: ["title", "url"]
              }
            },
            quiz: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.NUMBER, description: "Index de la bonne réponse (0-indexed)" },
                  explanation: { type: Type.STRING }
                },
                required: ["question", "options", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["content", "youtubeLinks", "quiz"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    // Ensure URLs are valid YouTube searches if not provided correctly
    data.youtubeLinks = data.youtubeLinks.map((link: any) => ({
      ...link,
      url: link.url.startsWith('http') ? link.url : `https://www.youtube.com/results?search_query=${encodeURIComponent(link.title)}`
    }));
    
    return data;
  },

  /**
   * Generates the latest scientific news across multiple domains or a specific one.
   */
  async generateScienceNews(specificDomain?: string): Promise<ScienceNews[]> {
    const prompt = specificDomain 
      ? `Génère les dernières actualités scientifiques, innovations et découvertes les plus marquantes spécifiquement pour le domaine : "${specificDomain}". Assure-toi que les actualités soient les plus récentes possibles.`
      : `Génère les dernières actualités scientifiques, innovations et découvertes les plus marquantes. Organise-les par domaines (ex: Astronomie, Médecine, Intelligence Artificielle, Environnement, Physique). Assure-toi que les actualités soient les plus récentes possibles.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${prompt}
      Pour chaque domaine, inclus 2 à 3 actualités récentes avec :
      1. Un titre, un résumé court, une description détaillée, la date et l'impact potentiel.
      2. Une liste de 2 à 3 ressources complémentaires (livres disponibles, vidéos YouTube, articles de recherche) avec type, titre et un lien URL factuel ou de recherche (ex: recherche YouTube ou Google Books).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              domain: { type: Type.STRING },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    description: { type: Type.STRING },
                    date: { type: Type.STRING },
                    impact: { type: Type.STRING },
                    resources: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          type: { type: Type.STRING, enum: ["book", "video", "article"] },
                          title: { type: Type.STRING },
                          url: { type: Type.STRING }
                        },
                        required: ["type", "title", "url"]
                      }
                    }
                  },
                  required: ["id", "title", "summary", "description", "date", "impact", "resources"]
                }
              }
            },
            required: ["domain", "items"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]") as ScienceNews[];
  }
};
