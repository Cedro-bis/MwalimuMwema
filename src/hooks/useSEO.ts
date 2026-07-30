/**
 * useSEO — Hook de gestion dynamique des métadonnées SEO/GEO/AEO
 *
 * Met à jour le <head> selon la vue active pour optimiser :
 * - SEO classique : title, description, canonical
 * - GEO : og:title, og:description (cités par les LLMs)
 * - AEO : descriptions conversationnelles courtes pour featured snippets
 */

import { useEffect } from 'react';

interface SEOConfig {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
}

const BASE_URL = 'https://mwalimu-mwema.web.app';
const BRAND = 'MwalimuMwema';

/** Met à jour ou crée une balise <meta> dans le <head> */
function setMeta(selector: string, attribute: string, value: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    // Extraire l'attribut d'identification (name ou property)
    if (selector.includes('name=')) {
      el.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
    } else if (selector.includes('property=')) {
      el.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
    }
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, value);
}

/** Met à jour le lien canonical */
function setCanonical(href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Hook principal */
export function useSEO(config: SEOConfig): void {
  useEffect(() => {
    const {
      title,
      description,
      canonical = BASE_URL + '/',
      ogTitle,
      ogDescription,
      noIndex = false,
    } = config;

    // --- Titre ---
    if (title) {
      document.title = `${title} | ${BRAND}`;
    }

    // --- Meta description (SEO + AEO) ---
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
    }

    // --- Robots ---
    setMeta(
      'meta[name="robots"]',
      'content',
      noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // --- Canonical (SEO) ---
    setCanonical(canonical);

    // --- Open Graph (GEO / Social) ---
    const finalOgTitle = ogTitle || title || BRAND;
    const finalOgDesc = ogDescription || description || '';

    setMeta('meta[property="og:title"]', 'content', finalOgTitle);
    if (finalOgDesc) {
      setMeta('meta[property="og:description"]', 'content', finalOgDesc);
    }
    setMeta('meta[property="og:url"]', 'content', canonical);

    // --- Twitter Card (GEO / Social) ---
    setMeta('meta[name="twitter:title"]', 'content', finalOgTitle);
    if (finalOgDesc) {
      setMeta('meta[name="twitter:description"]', 'content', finalOgDesc);
    }

    // Cleanup : restaurer les valeurs par défaut au démontage
    return () => {
      document.title = `${BRAND} — Cours IA Personnalisés | Apprendre sans Limites`;
    };
  }, [
    config.title,
    config.description,
    config.canonical,
    config.ogTitle,
    config.ogDescription,
    config.noIndex,
  ]);
}

/** Configs SEO pré-définies par vue — importer et utiliser directement */
export const SEO_CONFIGS = {
  onboarding: {
    title: 'Cours IA Personnalisés — Apprendre sans Limites',
    description:
      'MwalimuMwema génère en quelques secondes un programme de cours complet sur n\'importe quelle matière, adapté à votre niveau. Gratuit, propulsé par Gemini AI.',
    ogTitle: 'MwalimuMwema — Apprendre n\'importe quoi avec l\'IA',
    ogDescription:
      'Créez votre curriculum personnalisé grâce à l\'IA Gemini. Tous niveaux, toutes matières. 100% gratuit.',
  },

  curriculum: (subject: string, level: string) => ({
    title: `Curriculum : ${subject} — Niveau ${level}`,
    description: `Explorez votre programme personnalisé de ${subject} pour le niveau ${level}, généré par l'IA MwalimuMwema. Chapitres structurés, leçons détaillées et quiz d'évaluation.`,
    noIndex: true, // Le contenu utilisateur n'est pas indexé
  }),

  lesson: (chapterTitle: string, subject: string) => ({
    title: `${chapterTitle} — ${subject}`,
    description: `Leçon : ${chapterTitle}. Cours détaillé généré par l'IA MwalimuMwema sur ${subject}. Inclut exemples, ressources vidéo et quiz de validation.`,
    noIndex: true,
  }),

  quiz: (chapterTitle: string) => ({
    title: `Quiz : ${chapterTitle}`,
    description: `Évaluez vos connaissances sur "${chapterTitle}" avec 10 questions générées par l'IA MwalimuMwema.`,
    noIndex: true,
  }),

  news: {
    title: 'Actualités Scientifiques — Veille et Innovations',
    description:
      'Découvrez les dernières actualités et découvertes scientifiques, synthétisées par l\'IA MwalimuMwema. Restez informé des avancées en science, technologie et innovation.',
    ogTitle: 'Actualités Scientifiques — MwalimuMwema',
    ogDescription:
      'Veille scientifique et innovations mondiales, résumées par l\'IA en temps réel.',
    noIndex: true,
  },

  profile: {
    title: 'Mon Profil et Ma Progression',
    description:
      'Consultez votre progression d\'apprentissage, vos scores et vos cours terminés sur MwalimuMwema.',
    noIndex: true,
  },
} as const;
