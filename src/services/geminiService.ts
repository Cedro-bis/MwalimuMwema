/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { Level, Curriculum, Chapter, QuizQuestion, ScienceNews } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Helper to call Gemini with retries for transient RPC/XHR errors
 */
async function callGeminiWithRetry(params: any, maxRetries = 2): Promise<string> {
  let attempts = 0;
  while (attempts <= maxRetries) {
    try {
      const response = await ai.models.generateContent({
        ...params,
        model: "gemini-3-flash-preview", // Use current reliable model alias
      });
      if (!response.text) throw new Error("Réponse vide de l'IA (Empty text)");
      return response.text;
    } catch (error: any) {
      attempts++;
      const isTransient = error?.message?.includes("Rpc failed") || error?.message?.includes("xhr error") || error?.code === 500;
      if (isTransient && attempts <= maxRetries) {
        console.warn(`Gemini RPC error on attempt ${attempts}. Retrying in ${attempts}s...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Échec après plusieurs tentatives");
}

export const GeminiService = {
  /**
   * Generates a curriculum (list of chapters) for a given level and subject.
   */
  async generateCurriculum(level: Level, subject: string): Promise<Curriculum> {
    const text = await callGeminiWithRetry({
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

    return JSON.parse(text || "{}") as Curriculum;
  },

  /**
   * Generates the detailed content for a specific chapter, including YouTube search suggestions and a quiz.
   */
  async generateChapterDetails(level: Level, subject: string, chapterTitle: string): Promise<Partial<Chapter>> {
    const text = await callGeminiWithRetry({
      contents: `Génère le contenu détaillé pour le chapitre "${chapterTitle}" dans la matière "${subject}" au niveau "${level}".
      CONTRÔLE DE FORMAT CRITIQUE:
      1. Le "content" doit être un cours approfondi au format Markdown pur. 
      2. INCLURE SYSTÉMATIQUEMENT des exemples concrets, des cas d'utilisation réels et des blocs de code (avec syntax highlighting) si le sujet est technique ou scientifique.
      3. INCLURE une section "### Références Bibliographiques" à la fin du cours avec des ouvrages ou articles académiques réels et reconnus pour approfondir le sujet, adaptés au niveau "${level}". 
      4. RÈGLE D'OR POUR LES LIENS: N'utilisez QUE des liens de recherche ultra-fiables vers Google Books ou Open Library. 
         Exemple : [Titre du Livre - Auteur](https://www.google.com/search?tbm=bks&q=TITRE+AUTEUR)
      5. SI LE LIEN N'EST PAS GARANTI FONCTIONNEL À 100%, NE METTEZ PAS DE LIEN. Affichez simplement la référence textuellement. Mieux vaut pas de lien qu'un lien mort (404).
      6. NE PAS inclure le titre du chapitre au début du contenu. Commence directement par l'introduction.
      7. Utilise des titres de section clairs (ex: ## 1. Introduction).
      8. Assure-toi qu'il y a des doubles retours à la ligne entre chaque paragraphe et chaque titre pour un rendu optimal.
      9. Ne mets pas tout le texte en gras. Réserve le gras pour les termes techniques importants uniquement.
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

    const data = JSON.parse(text || "{}");
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

    const text = await callGeminiWithRetry({
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

    return JSON.parse(text || "[]") as ScienceNews[];
  }
};
