/**
 * StructuredData — Composant d'injection de JSON-LD dynamique
 *
 * Injecte des données structurées Schema.org contextuelles dans le <head>
 * selon la vue active. Ces schémas sont fondamentaux pour :
 *   - GEO : être cité par ChatGPT, Gemini, Perplexity comme source fiable
 *   - AEO : apparaître dans les featured snippets et rich results Google
 */

import { useEffect } from 'react';
import type { Curriculum, Chapter } from '../types';

interface StructuredDataProps {
  /** Vue active de l'application */
  view: 'onboarding' | 'curriculum' | 'lesson' | 'quiz' | 'news' | 'profile';
  /** Curriculum actif (si applicable) */
  curriculum?: Curriculum | null;
  /** Chapitre actif (si applicable) */
  chapter?: Chapter | null;
}

const SCRIPT_ID = 'mwalimu-dynamic-jsonld';

function injectScript(data: object): void {
  // Supprimer l'ancien script s'il existe
  const existing = document.getElementById(SCRIPT_ID);
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = SCRIPT_ID;
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
}

function removeScript(): void {
  const existing = document.getElementById(SCRIPT_ID);
  if (existing) existing.remove();
}

/**
 * Génère un schéma `Course` pour un curriculum actif.
 * Signal GEO fort : les LLMs comprennent la structure du cours.
 */
function buildCourseSchema(curriculum: Curriculum) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${curriculum.subject} — Niveau ${curriculum.level}`,
    description: `Programme complet de ${curriculum.subject} pour le niveau ${curriculum.level}, généré par l'IA MwalimuMwema. Ce curriculum couvre ${curriculum.chapters.length} chapitres avec leçons détaillées, ressources vidéo et quiz d'évaluation.`,
    provider: {
      '@type': 'Organization',
      name: 'MwalimuMwema',
      url: 'https://mwalimu-mwema.web.app/',
    },
    educationalLevel: curriculum.level,
    teaches: curriculum.subject,
    inLanguage: 'fr',
    isAccessibleForFree: true,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `${curriculum.chapters.length} chapitres`,
    },
    syllabusSections: curriculum.chapters.map((ch, i) => ({
      '@type': 'Syllabus',
      name: ch.title,
      position: i + 1,
    })),
  };
}

/**
 * Génère un schéma `Article` pour une leçon active.
 * Signal AEO fort : contenu structuré directement lisible par les moteurs.
 */
function buildArticleSchema(chapter: Chapter, curriculum: Curriculum) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.title,
    description: `Leçon sur "${chapter.title}" dans le cadre du cours de ${curriculum.subject} pour le niveau ${curriculum.level}. Cours généré par l'IA MwalimuMwema.`,
    author: {
      '@type': 'Organization',
      name: 'MwalimuMwema',
      url: 'https://mwalimu-mwema.web.app/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MwalimuMwema',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mwalimu-mwema.web.app/og-image.png',
      },
    },
    inLanguage: 'fr',
    about: {
      '@type': 'Thing',
      name: curriculum.subject,
    },
    educationalLevel: curriculum.level,
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'Course',
      name: `${curriculum.subject} — Niveau ${curriculum.level}`,
      provider: {
        '@type': 'Organization',
        name: 'MwalimuMwema',
      },
    },
  };
}

/**
 * Génère un schéma `Quiz` / `LearningResource` pour les quiz.
 * Signal AEO : Google peut présenter le quiz comme une activité d'apprentissage.
 */
function buildQuizSchema(chapter: Chapter, curriculum: Curriculum) {
  const questions = chapter.quiz || [];
  return {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `Quiz : ${chapter.title}`,
    description: `Évaluez vos connaissances sur "${chapter.title}" (${curriculum.subject}, niveau ${curriculum.level}) avec ${questions.length} questions générées par MwalimuMwema.`,
    educationalLevel: curriculum.level,
    about: {
      '@type': 'Thing',
      name: chapter.title,
    },
    provider: {
      '@type': 'Organization',
      name: 'MwalimuMwema',
      url: 'https://mwalimu-mwema.web.app/',
    },
    inLanguage: 'fr',
    isAccessibleForFree: true,
    hasPart: questions.map((q, i) => ({
      '@type': 'Question',
      position: i + 1,
      name: q.question,
      ...(q.type !== 'text' && q.options
        ? {
            suggestedAnswer: q.options.map((opt, idx) => ({
              '@type': 'Answer',
              text: opt,
              position: idx + 1,
            })),
          }
        : {}),
    })),
  };
}

/**
 * Schéma pour la page d'actualités scientifiques.
 * Signal GEO : indique que la plateforme couvre l'actualité scientifique.
 */
const NEWS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Actualités Scientifiques — MwalimuMwema',
  description:
    'Veille scientifique et actualités des dernières découvertes et innovations mondiales, synthétisées par l\'IA MwalimuMwema (powered by Gemini).',
  url: 'https://mwalimu-mwema.web.app/',
  provider: {
    '@type': 'Organization',
    name: 'MwalimuMwema',
    url: 'https://mwalimu-mwema.web.app/',
  },
  about: {
    '@type': 'Thing',
    name: 'Actualités scientifiques et technologiques',
  },
  inLanguage: 'fr',
};

/**
 * Composant principal — ne rend rien visuellement,
 * gère uniquement les scripts JSON-LD dans le <head>.
 */
export function StructuredData({ view, curriculum, chapter }: StructuredDataProps) {
  useEffect(() => {
    switch (view) {
      case 'curriculum':
        if (curriculum) {
          injectScript(buildCourseSchema(curriculum));
        } else {
          removeScript();
        }
        break;

      case 'lesson':
        if (chapter && curriculum) {
          injectScript(buildArticleSchema(chapter, curriculum));
        } else {
          removeScript();
        }
        break;

      case 'quiz':
        if (chapter && curriculum) {
          injectScript(buildQuizSchema(chapter, curriculum));
        } else {
          removeScript();
        }
        break;

      case 'news':
        injectScript(NEWS_SCHEMA);
        break;

      case 'onboarding':
      case 'profile':
      default:
        removeScript();
        break;
    }

    // Nettoyage au démontage
    return () => {
      removeScript();
    };
  }, [view, curriculum, chapter]);

  // Ce composant est invisible — il ne rend que du JSON-LD dans le <head>
  return null;
}
