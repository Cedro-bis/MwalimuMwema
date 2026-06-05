/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { Level, Curriculum, Chapter, QuizQuestion, ScienceNews } from "../types";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Double-layer Server Caching utilities (In-memory + Writable Cloud Run /tmp/ directory)
const CACHE_DIR = "/tmp/mwalimu_gemini_cache";
const memoryCache = new Map<string, { data: any; timestamp: number }>();

try {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
} catch (err) {
  console.warn("[CACHE] Failed to initialize /tmp cache directory:", err);
}

function getCacheKey(prefix: string, ...parts: string[]): string {
  const normalized = parts.map(p => 
    String(p || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
  ).join('_');
  return `${prefix}_${normalized}`;
}

function getFromCache<T>(key: string, maxAgeMs: number = 0): T | null {
  // 1. Try In-memory Cache first
  if (memoryCache.has(key)) {
    const payload = memoryCache.get(key);
    if (payload) {
      if (maxAgeMs > 0 && Date.now() - payload.timestamp > maxAgeMs) {
        console.log(`[CACHE IN-MEMORY EXPIRED] Key: ${key}`);
        memoryCache.delete(key);
      } else {
        console.log(`[CACHE IN-MEMORY HIT] Key: ${key}`);
        return payload.data as T;
      }
    }
  }

  // 2. Try Disk Cache (/tmp filesystem)
  try {
    const filePath = path.join(CACHE_DIR, `${key}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const payload = JSON.parse(content);
      if (maxAgeMs > 0 && Date.now() - payload.timestamp > maxAgeMs) {
        console.log(`[CACHE DISK EXPIRED] Key: ${key}`);
        try { fs.unlinkSync(filePath); } catch {}
      } else {
        // Hydrate In-memory cache
        memoryCache.set(key, payload);
        console.log(`[CACHE DISK HIT] Key: ${key}`);
        return payload.data as T;
      }
    }
  } catch (err) {
    console.warn(`[CACHE] Error reading disk cache for key ${key}:`, err);
  }

  return null;
}

function saveToCache<T>(key: string, data: T): void {
  const payload = {
    data,
    timestamp: Date.now()
  };

  // 1. Save to memory Map
  memoryCache.set(key, payload);

  // 2. Save to /tmp (Cloud Run memory-backed temporary cache)
  try {
    const filePath = path.join(CACHE_DIR, `${key}.json`);
    fs.writeFileSync(filePath, JSON.stringify(payload), 'utf8');
    console.log(`[CACHE SAVE SUCCESS] Key: ${key}`);
  } catch (err) {
    console.warn(`[CACHE] Error writing disk cache for key ${key}:`, err);
  }
}

/**
 * Helper to call Gemini with retries for transient RPC/XHR errors
 */
async function callGeminiWithRetry(params: any, maxRetries = 2): Promise<string> {
  let attempts = 0;
  while (attempts <= maxRetries) {
    try {
      const response = await ai.models.generateContent({
        ...params,
        model: "gemini-3.5-flash", // Use current reliable model alias
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
    const cacheKey = getCacheKey("curriculum", level, subject);
    const cached = getFromCache<Curriculum>(cacheKey);
    if (cached) {
      return cached;
    }

    const text = await callGeminiWithRetry({
      contents: `Génère un programme d'étude structuré (curriculum) exhaustif, complet, et riche pour le niveau ou la classe/promotion "${level}" et la matière "${subject}". 
      Le programme doit être complet et inclure :
      1. Environ 5 à 10 chapitres logiques couvrant l'intégralité de la matière avec rigueur pédagogique.
      2. Une liste de 4 objectifs principaux globaux (objectives) d'apprentissage extrêmement clairs et détaillés, adaptés spécifiquement pour le niveau ou la promotion "${level}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            level: { type: Type.STRING },
            subject: { type: Type.STRING },
            objectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4 objectifs d'apprentissage globaux détaillés pour ce cours"
            },
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
          required: ["level", "subject", "chapters", "objectives"]
        }
      }
    });

    const result = JSON.parse(text || "{}") as Curriculum;
    saveToCache(cacheKey, result);
    return result;
  },

  /**
   * Generates the detailed content for a specific chapter, including YouTube search suggestions and a quiz.
   */
  async generateChapterDetails(level: Level, subject: string, chapterTitle: string): Promise<Partial<Chapter>> {
    const cacheKey = getCacheKey("chapter", level, subject, chapterTitle);
    const cached = getFromCache<Partial<Chapter>>(cacheKey);
    if (cached) {
      return cached;
    }

    const lvl = String(level).toLowerCase();
    let promptQuizRatio = "";

    if (lvl.includes("prim")) {
      promptQuizRatio = "Le quiz doit contenir exactement 10 questions au total : exactement 9 questions de type choix multiples (type: 'mcq') et exactement 1 question explicative ouverte (type: 'text').";
    } else if (lvl.includes("coll")) {
      promptQuizRatio = "Le quiz doit contenir exactement 10 questions au total : exactement 8 questions de type choix multiples (type: 'mcq') et exactement 2 questions explicatives ouvertes (type: 'text').";
    } else if (lvl.includes("lyc")) {
      promptQuizRatio = "Le quiz doit contenir exactement 10 questions au total : exactement 7 questions de type choix multiples (type: 'mcq') et exactement 3 questions explicatives ouvertes (type: 'text').";
    } else if (lvl.includes("univ") || lvl.includes("mast")) {
      promptQuizRatio = "Le quiz doit contenir exactement 10 questions au total : exactement 5 questions de type choix multiples (type: 'mcq') et exactement 5 questions explicatives ouvertes (type: 'text').";
    } else if (lvl.includes("approf")) {
      promptQuizRatio = "Le quiz doit contenir exactement 10 questions au total : exactement 10 questions de type explicatives ouvertes (type: 'text') et absolument 0 question à choix multiple (type: 'mcq').";
    } else {
      promptQuizRatio = "Le quiz doit contenir exactement 10 questions au total : exactement 8 questions de type choix multiples (type: 'mcq') et exactement 2 questions explicatives ouvertes (type: 'text').";
    }

    // Dynamic cache busting seed to ensure questions are completely different if generated multiple times
    const dynamicSeed = `${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const text = await callGeminiWithRetry({
      contents: `Génère le cours magistral le plus complet, le plus détaillé, riche et approfondi au format Markdown pour le chapitre "${chapterTitle}" dans la matière "${subject}" au niveau ou classe/promotion "${level}".
      [UNIQUE_SESSION_SEED: ${dynamicSeed}]
      
      RÈGLE D'UNICITÉ CRITIQUE: Génère un jeu de questions de quiz totalement uniques, nouvelles, inédites et différentes des sessions précédentes pour évaluer l'étudiant. Variez les notions testées.

      CONTRÔLE DE FORMAT ET EXIGENCE DE RICHESSE:
      1. Le "content" doit être un cours magistral d'excellence, extrêmement complet (au moins 5 à 6 grandes sections thématiques détaillées avec sous-chapitres) au format Markdown pur. Évite les résumés hâtifs. Écris des explications profondes, de la théorie solide et des analyses conceptuelles.
      2. INCLURE SYSTÉMATIÈVEMENT des exemples concrets du monde réel, des cas d'utilisation réels et des blocs de code exhaustifs (avec coloration syntaxique appropriée) si le sujet est technique ou scientifique.
      3. INCLURE obligatoirement une section "### Références Bibliographiques" à la fin du cours avec des ouvrages académiques réels, reconnus et validés scientifiquement pour approfondir le sujet, adaptés au niveau ou classe "${level}".
      4. RÈGLE D'OR POUR LES LIENS: N'utilisez QUE des liens de recherche ultra-fiables vers Google Books ou Open Library. 
         Exemple : [Titre du Livre - Auteur](https://www.google.com/search?tbm=bks&q=TITRE+AUTEUR)
      5. SI LE LIEN N'EST PAS GARANTI FONCTIONNEL À 100%, NE METTEZ PAS DE LIEN. Affichez simplement la référence textuellement. Mieux vaut pas de lien qu'un lien mort (404).
      6. NE PAS inclure le titre du chapitre au début du contenu. Commence directement par l'introduction.
      7. Utilise des titres de section clairs (ex: ## 1. Introduction).
      8. Assure-toi qu'il y a des doubles retours à la ligne entre chaque paragraphe et chaque titre pour un rendu optimal.
      9. Ne mets pas tout le texte en gras. Réserve le gras pour les termes techniques importants uniquement.
      
      Inclus aussi:
      - exactes 2 ou 3 objectifs spécifiques de ce chapitre (objectives), rédigées de façon percutante et claire pour l'étudiant de cette classe.
      - 3 suggestions de titres de vidéos YouTube pertinentes pour enrichir visuellement le chapitre.
      - Un quiz complet de 10 questions pour parcourir tout le chapitre en profondeur :
        - ${promptQuizRatio}
        - Pour chaque question ouverte de type 'text' (question explicative), l'étudiant doit expliquer. Vous devez obligatoirement laisser le champ 'options' sous forme de tableau vide [], mettre correctAnswerIndex à -1, et dans 'correctAnswerText' mettre la liste de 3 ou 4 mots-clés essentiels attendus dans la réponse (séparés par des virgules), ou une explication clé concise contenant ces notions clefs. L'explication et la correction détaillées doivent être motivantes, denses et très instructives.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING },
            objectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 ou 3 objectifs spécifiques pour ce chapitre"
            },
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
                  type: { type: Type.STRING, enum: ["mcq", "text"], description: "Type de question: 'mcq' pour choix multiple, 'text' pour réponse écrite libre" },
                  question: { type: Type.STRING },
                  options: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING },
                    description: "Les options possibles (4 choix) pour mcq. Tableau vide [] si type de question is 'text'."
                  },
                  correctAnswerIndex: { 
                    type: Type.NUMBER, 
                    description: "Uniquement pour le type 'mcq', l'index de la bonne réponse (0-indexed). Mettez -1 pour le type 'text'." 
                  },
                  correctAnswerText: { 
                    type: Type.STRING, 
                    description: "La réponse écrite courte correcte pour le type 'text' (ou liste de mots-clés séparés par des virgules). Mettez un texte vide pour le type 'mcq'." 
                  },
                  explanation: { type: Type.STRING }
                },
                required: ["type", "question", "options", "correctAnswerIndex", "correctAnswerText", "explanation"]
              }
            }
          },
          required: ["content", "objectives", "youtubeLinks", "quiz"]
        }
      }
    });

    const data = JSON.parse(text || "{}");
    data.youtubeLinks = data.youtubeLinks.map((link: any) => ({
      ...link,
      url: link.url.startsWith('http') ? link.url : `https://www.youtube.com/results?search_query=${encodeURIComponent(link.title)}`
    }));
    
    saveToCache(cacheKey, data);
    return data;
  },

  /**
   * Answers a user question about a specific lesson content.
   */
  async askAi(level: string, subject: string, chapterTitle: string, lessonContent: string, question: string): Promise<string> {
    const text = await callGeminiWithRetry({
      contents: `Tu es MwalimuMwema, un tuteur IA expert et chaleureux. Un étudiant suit le cours "${subject}" au niveau "${level}".
      Chapitre actuel : "${chapterTitle}".
      
      CONTENU DU CHAPITRE :
      ---
      ${lessonContent}
      ---
      
      DIRECTIVES POUR LES RÉPONSES :
      1. Aide l'étudiant à comprendre en profondeur le chapitre actuel : "${chapterTitle}".
      2. Réponds de façon pédagogique, claire, d'un ton chaleureux et très étayé en français (réponses riches et approfondies).
      3. Si la question de l'étudiant dépasse légèrement le strict cadre textuel du chapitre, utilise ton expertise pour y répondre précisément tout en rattachant tes explications au sujet principal du chapitre.
      4. Si la question est totalement hors-sujet par rapport au cours, réoriente gentiment l'étudiant vers le chapitre "${chapterTitle}" tout en donnant un mot d'explication poli.
      
      QUESTION DE L'ÉTUDIANT : "${question}"`,
    });
    return text || "Désolé, je n'ai pas pu générer de réponse.";
  },

  /**
   * Generates the latest scientific news across multiple domains or a specific one.
   * Cached for 4 hours to ensure instantaneous loading while keeping content cutting-edge.
   */
  async generateScienceNews(specificDomain?: string): Promise<ScienceNews[]> {
    const key = specificDomain || "global";
    const cacheKey = getCacheKey("news", key);
    // News cache expires in 4 hours
    const cached = getFromCache<ScienceNews[]>(cacheKey, 4 * 60 * 60 * 1000);
    if (cached) {
      return cached;
    }

    const prompt = specificDomain 
      ? `Génère les dernières actualités scientifiques, innovations et découvertes les plus marquantes et révolutionnaires spécifiquement pour le domaine : "${specificDomain}". Assure-toi que les actualités soient riches, extrêmement détaillés et de niveau professionnel.`
      : `Génère les dernières actualités scientifiques, innovations et découvertes les plus marquantes et révolutionnaires du moment. Organise-les par domaines majeurs (ex: Astronomie, Médecine, Intelligence Artificielle, Environnement, Physique). Assure-toi que chaque domaine propose des innovations majeures réelles ou inspirées de récents papiers de recherche.`;

    const text = await callGeminiWithRetry({
      contents: `${prompt}
      Pour chaque domaine, inclus 2 à 3 actualités passionnantes sous forme d'articles détaillés, comprenant :
      1. Un titre marquant, un résumé court accrocheur, une description longue, très complète et approfondie de l'actualité (2 à 3 paragraphes détaillant les enjeux, la méthodologie, et les défis), la date exacte (récente) et l'impact potentiel sur l'humanité de cette innovation dans les 10 prochaines années.
      2. Une liste de 2 à 3 ressources complémentaires exceptionnelles (livres réels disponibles, tutoriels académiques, vidéos YouTube, articles scientifiques célèbres sur ArXiv ou Google Scholar) avec le type de ressource, le titre et un lien URL factuel de recherche (ex: recherche YouTube, recherche Google Books).`,
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

    const result = JSON.parse(text || "[]") as ScienceNews[];
    saveToCache(cacheKey, result);
    return result;
  }
};
