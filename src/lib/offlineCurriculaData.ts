/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Level, Chapter, QuizQuestion } from "../types";

export type LevelTier = 'primary' | 'college' | 'lycee' | 'university' | 'master';

/**
 * Accurately detects the pedagogical tier from a level string
 * e.g. "Primaire (CM2)" -> 'primary', "Collège (3ème)" -> 'college', "Lycée (Terminale)" -> 'lycee'
 */
export function detectLevelTier(levelStr: string): LevelTier {
  const s = String(levelStr || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (s.includes('prim') || s.includes('cp') || s.includes('ce1') || s.includes('ce2') || s.includes('cm1') || s.includes('cm2') || s.includes('elementaire') || s.includes('maternelle')) {
    return 'primary';
  }
  if (s.includes('coll') || s.includes('6e') || s.includes('5e') || s.includes('4e') || s.includes('3e') || s.includes('brevet')) {
    return 'college';
  }
  if (s.includes('lyc') || s.includes('2nd') || s.includes('seconde') || s.includes('1er') || s.includes('premiere') || s.includes('term') || s.includes('bac')) {
    return 'lycee';
  }
  if (s.includes('mast') || s.includes('m1') || s.includes('m2') || s.includes('approf') || s.includes('doc') || s.includes('these')) {
    return 'master';
  }
  return 'university';
}

export interface ChapterKnowledge {
  title: string;
  desc: string;
  coreConcepts: string[];
  practicalEx: string;
  formulas?: string[];
  sampleQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface SubjectKnowledgeTier {
  keywords: string[];
  domainName: string;
  tiers: Record<LevelTier, {
    objectives: string[];
    chapters: ChapterKnowledge[];
  }>;
}

export const TIERED_SUBJECT_KNOWLEDGE: SubjectKnowledgeTier[] = [
  // =================================================================
  // 1. MATHÉMATIQUES
  // =================================================================
  {
    domainName: "Mathématiques",
    keywords: ["math", "algebre", "geometrie", "analyse", "arithmetique", "calcul", "trigonometrie", "probabilite", "statistique", "derivee", "integrale"],
    tiers: {
      primary: {
        objectives: [
          "Comprendre les nombres entiers, la numération et les unités, dizaines et centaines.",
          "Maîtriser les 4 opérations de base : addition, soustraction, multiplication et division simple.",
          "Reconnaître les formes géométriques du quotidien et savoir utiliser une règle graduée.",
          "Résoudre avec succès de petits problèmes de la vie courante (courses, partages, monnaie)."
        ],
        chapters: [
          {
            title: "Les Nombres et la Numération : Unités, Dizaines et Centaines",
            desc: "Apprendre à lire, écrire, décomposer et comparer les nombres entiers jusqu'à 1 000 et 10 000.",
            coreConcepts: ["Chiffres et nombres", "Unités, dizaines, centaines et milliers", "La droite graduée et le rangement (ordre croissant et décroissant)", "Comparer avec les signes < et >"],
            practicalEx: "Léo collectionne 3 centaines, 4 dizaines et 7 unités d'images. Combien d'images possède-t-il au total ? Solution : 300 + 40 + 7 = 347 images.",
            formulas: ["1 dizaine = 10 unités", "1 centaine = 10 dizaines = 100 unités", "1 millier = 10 centaines = 1 000 unités"],
            sampleQuestions: [
              {
                question: "Dans le nombre 482, quel est le chiffre des dizaines ?",
                options: ["4", "8", "2", "40"],
                correctIndex: 1,
                explanation: "Dans 482 : 4 est le chiffre des centaines, 8 est le chiffre des dizaines, et 2 est le chiffre des unités."
              },
              {
                question: "Quel nombre est égal à 5 centaines + 3 unités ?",
                options: ["53", "530", "503", "350"],
                correctIndex: 2,
                explanation: "5 centaines font 500. 3 unités font 3. Donc 500 + 3 = 503."
              }
            ]
          },
          {
            title: "L'Addition et la Soustraction Posées",
            desc: "Comprendre le sens de l'ajout et du retrait, et réussir les additions et soustractions avec retenues.",
            coreConcepts: ["Sens de l'addition (mettre ensemble)", "Sens de la soustraction (enlever ou chercher la différence)", "Technique de l'addition posée en colonnes avec retenue", "Technique de la soustraction posée avec retenue"],
            practicalEx: "Dans un panier, il y a 48 pommes. On en ajoute 27. Combien y a-t-il de pommes en tout ? Calcul : 48 + 27 = 75 pommes.",
            formulas: ["a + b = b + a (l'addition ne change pas d'ordre)", "Différence = Grand nombre - Petit nombre"],
            sampleQuestions: [
              {
                question: "Combien font 35 + 19 ?",
                options: ["54", "44", "52", "64"],
                correctIndex: 0,
                explanation: "On additionne 5 + 9 = 14 (on pose 4 et retient 1). Puis 3 + 1 + 1 (retenue) = 5. Résultat : 54."
              },
              {
                question: "Si Sarah a 60 billes et qu'elle en donne 25 à son frère, combien lui en reste-t-il ?",
                options: ["45 billes", "35 billes", "40 billes", "25 billes"],
                correctIndex: 1,
                explanation: "60 - 25 = 35 billes."
              }
            ]
          },
          {
            title: "La Multiplication et les Tables de Calcul",
            desc: "Comprendre la multiplication comme une addition répétée et mémoriser les tables de multiplication.",
            coreConcepts: ["Sens de la multiplication (paquets égaux)", "Tables de 2, 3, 4, 5 et 10", "Tables de 6, 7, 8 et 9", "Multiplier par 10, 100 et 1 000"],
            practicalEx: "La maîtresse achète 4 paquets de 6 feutres. Combien de feutres a-t-elle achetés ? Calcul : 4 × 6 = 24 feutres.",
            formulas: ["4 × 6 = 6 + 6 + 6 + 6 = 24", "N × 10 = on ajoute un 0 à la fin"],
            sampleQuestions: [
              {
                question: "Combien font 7 × 8 ?",
                options: ["54", "56", "64", "48"],
                correctIndex: 1,
                explanation: "D'après la table de multiplication, 7 × 8 = 56."
              },
              {
                question: "Quel est le résultat de 42 × 10 ?",
                options: ["420", "402", "4200", "52"],
                correctIndex: 0,
                explanation: "Pour multiplier un nombre entier par 10, on ajoute un 0 à sa droite : 42 × 10 = 420."
              }
            ]
          },
          {
            title: "La Division et les Partages Équitables",
            desc: "Découvrir la notion de partage équitable, le quotient et le reste.",
            coreConcepts: ["Partager en parts égales", "Recherche de 'combien de fois'", "Division exacte et division avec reste", "Vérification : dividende = (diviseur × quotient) + reste"],
            practicalEx: "On veut partager 23 bonbons entre 4 enfants de manière égale. Chaque enfant reçoit 5 bonbons et il reste 3 bonbons. Calcul : 23 = (4 × 5) + 3.",
            formulas: ["Dividende = (Diviseur × Quotient) + Reste", "Le reste doit toujours être plus petit que le diviseur"],
            sampleQuestions: [
              {
                question: "Si on partage 20 chocolats équitablement entre 5 amis, combien chacun en reçoit-il ?",
                options: ["3 chocolats", "4 chocolats", "5 chocolats", "6 chocolats"],
                correctIndex: 1,
                explanation: "20 divisé par 5 donne 4, car 4 × 5 = 20."
              }
            ]
          },
          {
            title: "Les Fractions Simples et la Découverte des Décimaux",
            desc: "Comprendre le partage d'une unité en parts égales (demi, tiers, quart) et les nombres à virgule.",
            coreConcepts: ["La fraction comme part de gâteau ou de pizza", "Un demi (1/2), un tiers (1/3), un quart (1/4)", "Les dixièmes (0,1) et les centièmes (0,01)", "Les prix en euros et centimes d'euro"],
            practicalEx: "Une pizza est coupée en 4 parts égales. Si Paul mange 3 parts, il a mangé 3/4 de la pizza.",
            formulas: ["1/2 = 0,5", "1/4 = 0,25", "3/4 = 0,75"],
            sampleQuestions: [
              {
                question: "Quelle fraction correspond à la moitié d'un gâteau ?",
                options: ["1/4", "1/2", "1/3", "2/1"],
                correctIndex: 1,
                explanation: "La moitié correspond à 1 part sur 2, soit la fraction 1/2 (ou 0,5)."
              }
            ]
          },
          {
            title: "Grandeurs, Mesures et Monnaie : Longueurs, Masses et Temps",
            desc: "Utiliser les unités de mesure usuelles (m, cm, kg, g, litres) et lire l'heure sur une horloge.",
            coreConcepts: ["Unités de longueur : millimètre (mm), centimètre (cm) et mètre (m)", "Unités de masse : gramme (g) et kilogramme (kg)", "Lire l'heure : petite aiguille (heures) et grande aiguille (minutes)", "La monnaie : pièces et billets"],
            practicalEx: "Combien de centimètres y a-t-il dans 2 mètres ? Réponse : 1 m = 100 cm, donc 2 m = 200 cm.",
            formulas: ["1 mètre = 100 centimètres", "1 kilogramme = 1 000 grammes", "1 heure = 60 minutes"],
            sampleQuestions: [
              {
                question: "Combien de minutes y a-t-il dans 1 heure et demie ?",
                options: ["60 minutes", "75 minutes", "90 minutes", "100 minutes"],
                correctIndex: 2,
                explanation: "1 heure = 60 minutes. Une demi-heure = 30 minutes. 60 + 30 = 90 minutes."
              }
            ]
          },
          {
            title: "Géométrie Amusante : Formes, Angles Droits et Périmètre",
            desc: "Reconnaître le carré, le rectangle, le triangle, le cercle et calculer le tour d'une figure.",
            coreConcepts: ["Reconnaître carré, rectangle, triangle et cercle", "L'angle droit et l'utilisation de l'équerre", "Les côtés parallèles et perpendiculaires", "Le périmètre : faire le tour d'une figure en additionnant ses côtés"],
            practicalEx: "Un carré a des côtés de 5 cm. Quel est son périmètre ? Calcul : 5 + 5 + 5 + 5 = 20 cm.",
            formulas: ["Périmètre du carré = 4 × côté", "Périmètre du rectangle = 2 × (Longueur + largeur)"],
            sampleQuestions: [
              {
                question: "Combien de côtés égaux possède un carré ?",
                options: ["2 côtés", "3 côtés", "4 côtés", "Aucun"],
                correctIndex: 2,
                explanation: "Un carré possède 4 côtés de même longueur et 4 angles droits."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Manipuler avec rigueur les nombres relatifs, fractions, puissances et calcul littéral.",
          "Résoudre des équations du premier degré et modéliser des problèmes par une inconnue.",
          "Appliquer les théorèmes de Pythagore et de Thalès dans des configurations géométriques.",
          "Interpréter des données statistiques, calculer des moyennes et estimer des probabilités."
        ],
        chapters: [
          {
            title: "Nombres Relatifs et Priorités des Opérations",
            desc: "Addition, soustraction, multiplication et division des nombres positifs et négatifs avec règles des signes.",
            coreConcepts: ["Repérage sur un axe gradué et repère du plan", "Addition et soustraction de relatifs", "Règle des signes pour le produit et le quotient", "Ordre de priorité des opérations (PEMDAS/BODMAS)"],
            practicalEx: "Calcul de température : Il fait -3°C le matin. La température monte de 8°C l'après-midi puis baisse de 4°C le soir. Température finale : -3 + 8 - 4 = +1°C.",
            formulas: ["(-a) × (-b) = +(a × b)", "(-a) × (+b) = -(a × b)", "Priorité : Parenthèses > Puissances > Multiplications/Divisions > Additions/Soustractions"],
            sampleQuestions: [
              {
                question: "Quel est le résultat de (-4) × (-6) ?",
                options: ["-24", "+24", "-10", "+10"],
                correctIndex: 1,
                explanation: "Le produit de deux nombres négatifs est toujours positif : (-4) × (-6) = +24."
              },
              {
                question: "Calculez l'expression : 5 + 3 × 4",
                options: ["32", "17", "23", "20"],
                correctIndex: 1,
                explanation: "La multiplication est prioritaire sur l'addition : 3 × 4 = 12, puis 5 + 12 = 17."
              }
            ]
          },
          {
            title: "Fractions, Nombres Rationnels et Écritures Fractionnaires",
            desc: "Simplification, mise au même dénominateur, addition, soustraction, multiplication et division de fractions.",
            coreConcepts: ["Fractions égales et simplification par le PGCD", "Addition et soustraction avec réduction au même dénominateur", "Multiplication de fractions : numérateurs entre eux, dénominateurs entre eux", "Division par une fraction : multiplier par l'inverse"],
            practicalEx: "Calcul de 2/3 + 1/4 : Dénominateur commun = 12. 2/3 = 8/12 et 1/4 = 3/12. Somme = 8/12 + 3/12 = 11/12.",
            formulas: ["a/b + c/d = (ad + bc) / bd", "a/b × c/d = ac / bd", "(a/b) ÷ (c/d) = a/b × d/c"],
            sampleQuestions: [
              {
                question: "Calculez 3/5 × 2/7 :",
                options: ["5/12", "6/35", "21/10", "6/12"],
                correctIndex: 1,
                explanation: "Pour multiplier des fractions, on multiplie les numérateurs et les dénominateurs : 3 × 2 = 6 et 5 × 7 = 35, soit 6/35."
              }
            ]
          },
          {
            title: "Proportionnalité, Pourcentages, Échelles et Ratios",
            desc: "Tableaux de proportionnalité, coefficient multiplicateur, produit en croix et pourcentages d'évolution.",
            coreConcepts: ["Reconnaître une situation de proportionnalité", "Le produit en croix (quatrième proportionnelle)", "Calculer et appliquer un pourcentage", "Calculer une échelle et vitesse moyenne v = d/t"],
            practicalEx: "Un pantalon à 40 € est soldé à -20%. Montant de la réduction : 40 × 0,20 = 8 €. Prix payé : 40 - 8 = 32 €.",
            formulas: ["Quatrième proportionnelle : x = (b × c) / a", "v = d / t", "Augmentation de t% : multiplier par (1 + t/100)"],
            sampleQuestions: [
              {
                question: "Si 3 kg de pommes coûtent 6 €, combien coûtent 5 kg de ces mêmes pommes ?",
                options: ["8 €", "9 €", "10 €", "12 €"],
                correctIndex: 2,
                explanation: "1 kg coûte 6 ÷ 3 = 2 €. Donc 5 kg coûtent 5 × 2 = 10 € (produit en croix : (5 × 6) ÷ 3 = 10 €)."
              }
            ]
          },
          {
            title: "Calcul Littéral et Équations du 1er Degré",
            desc: "Développer, factoriser avec la distributivité et résoudre des équations ax + b = c.",
            coreConcepts: ["Distributivité simple : k(a + b) = ka + kb", "Double distributivité : (a + b)(c + d)", "Identités remarquables de collège", "Résolution pas-à-pas des équations du premier degré"],
            practicalEx: "Résoudre 3x - 5 = 10 : On ajoute 5 des deux côtés -> 3x = 15. On divise par 3 -> x = 5.",
            formulas: ["k(a + b) = ka + kb", "ax + b = 0 <=> x = -b / a"],
            sampleQuestions: [
              {
                question: "Quelle est la solution de l'équation 2x + 7 = 15 ?",
                options: ["x = 4", "x = 11", "x = 8", "x = 3"],
                correctIndex: 0,
                explanation: "2x = 15 - 7 = 8, donc x = 8 / 2 = 4."
              }
            ]
          },
          {
            title: "Théorème de Pythagore et Trigonométrie dans le Triangle Rectangle",
            desc: "Calculer une longueur manquante avec Pythagore et utiliser cosinus, sinus et tangente.",
            coreConcepts: ["Hypoténuse du triangle rectangle", "Égalité de Pythagore : BC² = AB² + AC²", "Réciproque de Pythagore pour prouver qu'un triangle est rectangle", "Formules trigonométriques : CAH-SOH-TOA"],
            practicalEx: "Triangle rectangle avec AB = 3 cm et AC = 4 cm. BC² = 3² + 4² = 9 + 16 = 25. Donc BC = √25 = 5 cm.",
            formulas: ["BC² = AB² + AC²", "cos(a) = Côté Adjacent / Hypoténuse", "sin(a) = Côté Opposé / Hypoténuse", "tan(a) = Côté Opposé / Côté Adjacent"],
            sampleQuestions: [
              {
                question: "Dans un triangle rectangle dont les côtés de l'angle droit mesurent 6 cm et 8 cm, que vaut l'hypoténuse ?",
                options: ["14 cm", "10 cm", "12 cm", "48 cm"],
                correctIndex: 1,
                explanation: "6² + 8² = 36 + 64 = 100. La racine carrée de 100 est 10 cm."
              }
            ]
          },
          {
            title: "Théorème de Thalès et Homothéties",
            desc: "Configurations de Thalès en triangles emboîtés et en papillon, agrandissements et réductions.",
            coreConcepts: ["Conditions d'application : droites sécantes et droites parallèles", "Rapports de longueurs égaux", "Réciproque de Thalès pour prouver le parallélisme", "Effet d'un agrandissement de rapport k sur les aires (k²) et volumes (k³)"],
            practicalEx: "Dans un triangle ABC avec (MN) // (BC), AM/AB = AN/AC = MN/BC.",
            formulas: ["AM / AB = AN / AC = MN / BC", "Aire agrandie = k² × Aire initiale", "Volume agrandi = k³ × Volume initial"],
            sampleQuestions: [
              {
                question: "Si une figure est agrandie avec un rapport k = 3, par combien son aire est-elle multipliée ?",
                options: ["Par 3", "Par 6", "Par 9", "Par 27"],
                correctIndex: 2,
                explanation: "Lors d'un agrandissement de rapport k, les aires sont multipliées par k² : 3² = 9."
              }
            ]
          },
          {
            title: "Statistiques, Médiane et Initiation aux Probabilités",
            desc: "Organisation de données, moyennes simples et pondérées, médiane, étendue et tirages aléatoires.",
            coreConcepts: ["Effectifs et fréquences", "Moyenne et moyenne pondérée", "Médiane (valeur centrale séparant la population en deux moitiés)", "Notion d'expérience aléatoire et probabilité d'un événement P(A) = cas favorables / cas possibles"],
            practicalEx: "Notes d'un élève : 10, 12, 14, 16, 18. Médiane = 14 (valeur du milieu). Moyenne = (10+12+14+16+18)/5 = 14.",
            formulas: ["Moyenne = Somme des valeurs / Effectif total", "P(A) = Nombre d'issues favorables / Nombre d'issues possibles", "0 <= P(A) <= 1"],
            sampleQuestions: [
              {
                question: "On lance un dé équilibré à 6 faces. Quelle est la probabilité d'obtenir un nombre pair (2, 4, 6) ?",
                options: ["1/6", "1/2", "1/3", "2/3"],
                correctIndex: 1,
                explanation: "Il y a 3 issues favorables (2, 4, 6) sur 6 possibles : 3/6 = 1/2."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Étudier rigoureusement les fonctions d'une variable réelle (dérivation, limites, variations).",
          "Maîtriser les polynômes du second degré, suites arithmético-géométriques et récurrence.",
          "Exploiter la géométrie vectorielle dans l'espace, le produit scalaire et les équations cartésiennes.",
          "Calculer des primitives, intégrales et appliquer les lois de probabilités usuelles."
        ],
        chapters: [
          {
            title: "Généralités sur les Fonctions et Étude des Variations",
            desc: "Ensemble de définition, parité, périodicité, sens de variation et représentations graphiques.",
            coreConcepts: ["Définition formelle f : D -> R", "Fonctions croissantes et décroissantes", "Tableau de variation et extrema locaux", "Interprétation graphique des équations f(x) = k et inéquations"],
            practicalEx: "Étude de la fonction f(x) = x² - 4x + 3 sur [-1, 5]. Sommet en x = 2 avec f(2) = -1. Décroissante sur ]-inf, 2] et croissante sur [2, +inf[.",
            formulas: ["f est croissante si a < b => f(a) <= f(b)", "Taux d'accroissement : (f(b) - f(a)) / (b - a)"],
            sampleQuestions: [
              {
                question: "Soit f une fonction dérivable. Si f'(x) > 0 sur un intervalle I, que peut-on affirmer ?",
                options: ["f est constante sur I", "f est strictement croissante sur I", "f est strictement décroissante sur I", "f s'annule sur I"],
                correctIndex: 1,
                explanation: "Le signe strictement positif de la dérivée implique la stricte croissance de la fonction sur l'intervalle."
              }
            ]
          },
          {
            title: "Polynômes du Second Degré et Factorisation",
            desc: "Forme canonique, discriminant Delta, signe du trinôme et factorisation algébrique.",
            coreConcepts: ["Forme développée f(x) = ax² + bx + c (a != 0)", "Forme canonique a(x - alpha)² + beta", "Discriminant Delta = b² - 4ac et étude du nombre de racines réelles", "Tableau de signes du trinôme selon le signe de a"],
            practicalEx: "Résoudre 2x² - 4x - 6 = 0 : Delta = (-4)² - 4(2)(-6) = 16 + 48 = 64. Racines : x1 = (4 - 8)/4 = -1 et x2 = (4 + 8)/4 = 3.",
            formulas: ["Delta = b² - 4ac", "x1,2 = (-b +- sqrt(Delta)) / (2a)", "Factorisation : a(x - x1)(x - x2) si Delta > 0"],
            sampleQuestions: [
              {
                question: "Combien de racines réelles possède l'équation x² + 2x + 5 = 0 ?",
                options: ["Deux racines distinctes", "Une racine double", "Aucune racine réelle", "Une infinité"],
                correctIndex: 2,
                explanation: "Delta = 2² - 4(1)(5) = 4 - 20 = -16 < 0. Le discriminant est strictement négatif, il n'y a donc aucune racine réelle."
              }
            ]
          },
          {
            title: "Dérivation, Nombre Dérivé et Équation de la Tangente",
            desc: "Taux d'accroissement, dérivées des fonctions usuelles, opérations sur les dérivées et tangentes.",
            coreConcepts: ["Définition du nombre dérivé f'(a) comme limite du taux de variation", "Équation de la tangente : y = f'(a)(x - a) + f(a)", "Dérivées usuelles : x^n, 1/x, sqrt(x), e^x", "Dérivée d'un produit (uv)' et d'un quotient (u/v)'"],
            practicalEx: "Calcul de la tangente à la parabole y = x² au point d'abscisse a = 3 : f(3) = 9, f'(x) = 2x donc f'(3) = 6. Équation : y = 6(x - 3) + 9 = 6x - 9.",
            formulas: ["f'(a) = lim_{h->0} (f(a+h) - f(a)) / h", "y = f'(a)(x - a) + f(a)", "(uv)' = u'v + uv'", "(u/v)' = (u'v - uv') / v²"],
            sampleQuestions: [
              {
                question: "Quelle est la dérivée de la fonction f(x) = 3x² - 5x + 2 ?",
                options: ["f'(x) = 6x - 5", "f'(x) = 3x - 5", "f'(x) = 6x + 2", "f'(x) = 6x² - 5"],
                correctIndex: 0,
                explanation: "La dérivée de 3x² est 3 × 2x = 6x. La dérivée de -5x est -5. La dérivée de la constante 2 est 0. Donc f'(x) = 6x - 5."
              }
            ]
          },
          {
            title: "Suites Numériques et Raisonnement par Récurrence",
            desc: "Suites arithmétiques, suites géométriques, limites de suites et principe de récurrence.",
            coreConcepts: ["Définition explicite u_n = f(n) et par récurrence u_{n+1} = f(u_n)", "Suites arithmétiques (terme général et somme)", "Suites géométriques (terme général et somme)", "Principe de récurrence (initialisation, hérédité, conclusion)", "Théorème de convergence monotone"],
            practicalEx: "Suite arithmétique de premier terme u0 = 2 et raison r = 3 : u_n = 2 + 3n. Calcul de u10 = 2 + 30 = 32.",
            formulas: ["Suite arithmétique : u_n = u_0 + n*r", "Suite géométrique : u_n = u_0 * q^n", "Somme suite géométrique : S = u_0 * (1 - q^{n+1}) / (1 - q)"],
            sampleQuestions: [
              {
                question: "Soit (u_n) une suite géométrique de premier terme u0 = 3 et de raison q = 2. Que vaut u4 ?",
                options: ["24", "48", "11", "32"],
                correctIndex: 1,
                explanation: "u4 = u0 × q⁴ = 3 × 2⁴ = 3 × 16 = 48."
              }
            ]
          },
          {
            title: "Fonctions Exponentielle et Logarithme Népérien",
            desc: "Propriétés algébriques, variations, limites aux bornes et croissances comparées.",
            coreConcepts: ["Définition de exp(x) comme unique solution de y' = y avec y(0) = 1", "Propriété fondamentale : exp(a + b) = exp(a) × exp(b)", "Fonction réciproque ln(x) définie sur ]0, +inf[", "Croissances comparées en +inf : lim e^x / x = +inf"],
            practicalEx: "Résolution de l'équation e^{2x} - 5 = 0 : e^{2x} = 5 <=> 2x = ln(5) <=> x = ln(5)/2.",
            formulas: ["exp(a + b) = exp(a) * exp(b)", "ln(a * b) = ln(a) + ln(b)", "(e^u)' = u' * e^u", "(ln u)' = u' / u"],
            sampleQuestions: [
              {
                question: "Que vaut la dérivée de f(x) = e^{3x} ?",
                options: ["f'(x) = e^{3x}", "f'(x) = 3e^{3x}", "f'(x) = 3x e^{3x-1}", "f'(x) = e^3"],
                correctIndex: 1,
                explanation: "La formule (e^u)' = u' e^u avec u(x) = 3x donne u'(x) = 3, d'où f'(x) = 3e^{3x}."
              }
            ]
          },
          {
            title: "Géométrie Vectorielle dans l'Espace et Produit Scalaire",
            desc: "Vecteurs dans l'espace, orthogonalité, produit scalaire et équations cartésiennes de plans.",
            coreConcepts: ["Repère orthonormé de l'espace (O; i, j, k)", "Produit scalaire u . v = xx' + yy' + zz'", "Vecteur normal à un plan et équation cartésienne ax + by + cz + d = 0", "Représentation paramétrique d'une droite de l'espace"],
            practicalEx: "Plan passant par A(1, 2, 3) de vecteur normal n(2, -1, 4) : 2(x - 1) - 1(y - 2) + 4(z - 3) = 0 <=> 2x - y + 4z - 12 = 0.",
            formulas: ["u . v = ||u|| ||v|| cos(theta)", "u . v = xx' + yy' + zz'", "u et v orthogonaux <=> u . v = 0"],
            sampleQuestions: [
              {
                question: "Deux vecteurs non nuls de l'espace sont orthogonaux si et seulement si :",
                options: ["Leurs coordonnées sont égales", "Leur produit scalaire est nul", "Leur somme est nulle", "Leurs normes sont égales"],
                correctIndex: 1,
                explanation: "Par définition, l'orthogonalité de deux vecteurs correspond à l'annulation de leur produit scalaire."
              }
            ]
          },
          {
            title: "Calcul Intégral, Primitives et Probabilités",
            desc: "Primitives des fonctions usuelles, intégration par parties, calcul d'aires et lois continues.",
            coreConcepts: ["Notion de primitive F'(x) = f(x)", "Théorème fondamental de l'analyse : Intégrale de a à b de f(t)dt = F(b) - F(a)", "Aire délimitée par une courbe positive", "Variables aléatoires à densité et loi normale centrée réduite N(0, 1)"],
            practicalEx: "Calcul de l'intégrale de 0 à 2 de (3x² + 2x) dx : Primitive F(x) = x³ + x². F(2) - F(0) = (8 + 4) - 0 = 12.",
            formulas: ["int_a^b f(t) dt = [F(t)]_a^b = F(b) - F(a)", "Intégration par parties : int u'v = [uv] - int uv'"],
            sampleQuestions: [
              {
                question: "Quelle est une primitive de la fonction f(x) = 2x sur R ?",
                options: ["F(x) = x²", "F(x) = 2", "F(x) = x", "F(x) = 2x²"],
                correctIndex: 0,
                explanation: "La dérivée de F(x) = x² est bien 2x."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Maîtriser les structures d'espaces vectoriels, de réduction des endomorphismes et dualité.",
          "Comprendre la topologie générale des espaces métriques et espaces vectoriels normés.",
          "Résoudre des systèmes d'équations différentielles et pratiquer le calcul différentiel multivarié.",
          "Appliquer les théorèmes limites des probabilités et l'intégration de Riemann multiple."
        ],
        chapters: [
          {
            title: "Espaces Vectoriels et Applications Linéaires",
            desc: "Sous-espaces vectoriels, familles libres et génératrices, théorème du rang et dualité.",
            coreConcepts: ["Axiomes d'espace vectoriel sur un corps K", "Sous-espaces supplémentaires et somme directe E = F + G", "Théorème du rang : dim(E) = dim(Ker u) + dim(Im u)", "Matrices associées et changement de base"],
            practicalEx: "Soit f : R³ -> R² définie par f(x, y, z) = (x + y, y - z). Déterminer le noyau Ker(f) : x + y = 0 et y - z = 0 => y = -x, z = -x. Noyau de dimension 1 engendré par (1, -1, -1).",
            formulas: ["dim(E) = dim(Ker u) + dim(Im u)", "M_{B'}(u) = P^{-1} M_B(u) P"],
            sampleQuestions: [
              {
                question: "Dans un espace de dimension finie n, que vaut la somme de la dimension du noyau et du rang d'une application linéaire u ?",
                options: ["2n", "n", "n - 1", "0"],
                correctIndex: 1,
                explanation: "D'après le théorème du rang, dim(Ker u) + rg(u) = dim(E) = n."
              }
            ]
          },
          {
            title: "Réduction des Endomorphismes : Diagonalisation et Trigonalisation",
            desc: "Valeurs propres, sous-espaces propres, polynôme caractéristique et lemme des noyaux.",
            coreConcepts: ["Valeurs propres et spectre d'une matrice Sp(A)", "Polynôme caractéristique chi_A(X) = det(XI - A)", "Critères nécessaires et suffisants de diagonalisabilité", "Théorème de Cayley-Hamilton et polynôme minimal"],
            practicalEx: "Diagonalisation d'une matrice symétrique réelle 2x2. Les sous-espaces propres associés à des valeurs propres distinctes sont orthogonaux.",
            formulas: ["chi_A(lambda) = 0 <=> lambda est valeur propre", "chi_A(A) = 0 (Cayley-Hamilton)"],
            sampleQuestions: [
              {
                question: "Une matrice carrée d'ordre n admettant n valeurs propres réelles distinctes est-elle diagonalisable sur R ?",
                options: ["Jamais", "Toujours", "Seulement si elle est inversible", "Seulement si son déterminant est positif"],
                correctIndex: 1,
                explanation: "Si une matrice d'ordre n admet n valeurs propres distinctes, les sous-espaces propres sont tous de dimension 1 et leur somme directe est de dimension n, elle est donc toujours diagonalisable."
              }
            ]
          },
          {
            title: "Topologie des Espaces Métriques et Normés",
            desc: "Ouverts, fermés, compacité, connexité, complétude et théorème du point fixe de Banach.",
            coreConcepts: ["Distances et normes équivalentes", "Suites de Cauchy et espaces de Banach complets", "Parties compactes : théorème de Bolzano-Weierstrass", "Théorème du point fixe contractant de Picard-Banach"],
            practicalEx: "Démonstration de la complétude de R muni de la valeur absolue usuelle.",
            formulas: ["||x + y|| <= ||x|| + ||y||", "d(x, y) = ||x - y||"],
            sampleQuestions: [
              {
                question: "Dans R^n muni d'une norme usuelle, une partie est compacte si et seulement si elle est :",
                options: ["Ouverte et bornée", "Fermée et bornée", "Connexe et non vide", "Dénombrable"],
                correctIndex: 1,
                explanation: "D'après le théorème de Borel-Lebesgue, en dimension finie, un sous-ensemble est compact si et seulement s'il est fermé et borné."
              }
            ]
          },
          {
            title: "Calcul Différentiel à Plusieurs Variables et Optimisation",
            desc: "Différentiabilité, matrice jacobienne, matrice hessienne et extrema sous contraintes.",
            coreConcepts: ["Dérivées partielles et différentielle totale", "Théorème de Schwarz sur la symétrie des dérivées secondes", "Recherche d'extrema libres : gradient nul et hessienne définie positive", "Multiplicateurs de Lagrange pour extrema sous contraintes"],
            practicalEx: "Minimisation de f(x, y) = x² + 2y² sous la contrainte x + y = 1.",
            formulas: ["df(x) = sum (partial f / partial x_i) dx_i", "Hessienne H = (partial² f / partial x_i partial x_j)"],
            sampleQuestions: [
              {
                question: "Si la différentielle d'une fonction f en un point critique a s'annule et que sa matrice hessienne est définie positive, le point a est :",
                options: ["Un maximum local strict", "Un minimum local strict", "Un point selle", "Un point de discontinuité"],
                correctIndex: 1,
                explanation: "Une hessienne définie positive en un point critique garantit un minimum local strict."
              }
            ]
          },
          {
            title: "Intégrales Multiples et Théorèmes d'Analyse Vectorielle",
            desc: "Intégrales doubles et triples, changement de variables jacobien, Green-Riemann et Stokes.",
            coreConcepts: ["Théorème de Fubini pour intégrales itérées", "Changement de variables et déterminant jacobien", "Intégrales curvilignes et circulation d'un champ", "Formules de Green-Riemann et flux de divergence"],
            practicalEx: "Calcul de l'aire d'un disque via intégrale double en coordonnées polaires r dr dtheta.",
            formulas: ["dx dy = r dr dtheta", "iint_D (partial Q/partial x - partial P/partial y) dx dy = oint (P dx + Q dy)"],
            sampleQuestions: [
              {
                question: "Quel est le déterminant jacobien du passage en coordonnées polaires (x = r cos theta, y = r sin theta) ?",
                options: ["1", "r", "r²", "cos(theta) + sin(theta)"],
                correctIndex: 1,
                explanation: "Le jacobien vaut r, ce qui donne l'élément d'aire dx dy = r dr dtheta."
              }
            ]
          },
          {
            title: "Équations Différentielles et Systèmes Dynamiques",
            desc: "Équations différentielles linéaires, matrice fondamentale, théorème de Cauchy-Lipschitz et stabilité.",
            coreConcepts: ["Théorème d'existence et d'unicité de Cauchy-Lipschitz", "Résolution de X' = AX via exponentielle de matrice exp(tA)", "Portrait de phase et points d'équilibre", "Stabilité au sens de Lyapunov"],
            practicalEx: "Oscillateur harmonique x'' + omega² x = 0 modélisé par un système dynamique du premier ordre.",
            formulas: ["X(t) = exp(tA) X(0)", "exp(tA) = sum_{k=0}^inf (t^k A^k) / k!"],
            sampleQuestions: [
              {
                question: "La solution du problème de Cauchy y' = ay avec y(0) = y0 est donnée par :",
                options: ["y(t) = y0 e^{at}", "y(t) = y0 + at", "y(t) = y0 cos(at)", "y(t) = at² / 2"],
                correctIndex: 0,
                explanation: "L'unique solution est l'exponentielle y(t) = y0 exp(at)."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Formaliser les théories de la mesure, intégration de Lebesgue et espaces de Banach/Hilbert.",
          "Développer la géométrie différentielle des variétés lisses et groupes de Lie.",
          "Construire les théories probabilistes avancées, calcul stochastique d'Itô et martingales.",
          "Résoudre des équations aux dérivées partielles via méthodes variationnelles et éléments finis."
        ],
        chapters: [
          {
            title: "Théorie de la Mesure et Intégration de Lebesgue",
            desc: "Tribus boréliennes, mesures positives, théorèmes de convergence monotone et de convergence dominée.",
            coreConcepts: ["Tribus (sigma-algèbres) et espaces mesurables (X, T, mu)", "Construction de l'intégrale de Lebesgue pour fonctions étagées", "Théorème de convergence monotone de Beppo-Levi", "Théorème de convergence dominée de Lebesgue et lemme de Fatou"],
            practicalEx: "Démonstration de l'interversion limite-intégrale pour une suite de fonctions bornées par une fonction intégrable.",
            formulas: ["lim int f_n dmu = int (lim f_n) dmu (sous hypothèse de domination g in L^1)"],
            sampleQuestions: [
              {
                question: "Quelle condition clé est requise pour appliquer le théorème de convergence dominée de Lebesgue ?",
                options: ["La monotonie stricte de la suite", "L'existence d'une fonction dominante intégrable g telle que |f_n| <= g", "La continuité uniforme des f_n", "La compacité de l'espace de base"],
                correctIndex: 1,
                explanation: "Le théorème de Lebesgue exige la convergence simple et une domination ponctuelle par une fonction positive intégrable."
              }
            ]
          },
          {
            title: "Analyse Fonctionnelle et Espaces de Hilbert",
            desc: "Théorème de Riesz, opérateurs bornés, compacité spectrale et théorème de Hahn-Banach.",
            coreConcepts: ["Espaces de Hilbert et produit scalaire hermitien", "Théorème de représentation de Riesz-Fréchet", "Théorème de Banach-Steinhaus et théorème du graphe fermé", "Théorie spectrale des opérateurs compacts auto-adjoints"],
            practicalEx: "Décomposition spectrale d'un opérateur laplacien avec conditions aux limites de Dirichlet.",
            formulas: ["<x, y> = overline{<y, x>}", "||T|| = sup_{||x||=1} ||Tx||"],
            sampleQuestions: [
              {
                question: "D'après le théorème de représentation de Riesz dans un espace de Hilbert H, toute forme linéaire continue phi s'écrit sous la forme :",
                options: ["phi(x) = <x, y> pour un unique y in H", "phi(x) = ||x||", "phi(x) = det(x)", "phi(x) = 0"],
                correctIndex: 0,
                explanation: "Le théorème de Riesz établit un isomorphisme isométrique entre H et son dual topologique H* via le produit scalaire."
              }
            ]
          },
          {
            title: "Équations aux Dérivées Partielles et Méthodes Variationnelles",
            desc: "Espaces de Sobolev W^{k,p}, formulation faible, lemme de Lax-Milgram et ellipticité.",
            coreConcepts: ["Dérivées au sens des distributions et espaces de Sobolev H^1(Omega)", "Formulation variationnelle a(u, v) = l(v)", "Lemme de Lax-Milgram garantissant existence et unicité", "Régularité des solutions elliptiques"],
            practicalEx: "Résolution faible du problème de Poisson -Delta u = f sur un ouvert borné avec u = 0 au bord.",
            formulas: ["int_Omega grad(u) . grad(v) dx = int_Omega f v dx"],
            sampleQuestions: [
              {
                question: "Le lemme de Lax-Milgram nécessite que la forme bilinéaire a(u, v) soit :",
                options: ["Symétrique uniquement", "Continue et coercive (elliptique)", "Dégénérée", "Bornée par 1"],
                correctIndex: 1,
                explanation: "La continuité et la coercivité (a(v, v) >= alpha ||v||²) assurent l'isomorphisme et l'existence d'une unique solution."
              }
            ]
          },
          {
            title: "Processus Stochastiques et Calcul d'Itô",
            desc: "Mouvement brownien, filtrations, martingales, intégrale stochastique et formule d'Itô.",
            coreConcepts: ["Mouvement brownien standard (processus de Wiener)", "Martingales en temps continu et temps d'arrêt", "Intégrale stochastique d'Itô par rapport au brownien", "Formule d'Itô et calcul différentiel stochastique (dB_t)² = dt"],
            practicalEx: "Modélisation du cours boursier par un mouvement brownien géométrique dS_t = mu S_t dt + sigma S_t dB_t.",
            formulas: ["df(X_t) = f'(X_t) dX_t + 1/2 f''(X_t) (dX_t)²", "(dB_t)² = dt"],
            sampleQuestions: [
              {
                question: "Dans le calcul différentiel stochastique d'Itô, que vaut le terme d'ordre deux (dB_t)² ?",
                options: ["0", "dt", "dB_t", "infiny"],
                correctIndex: 1,
                explanation: "La variation quadratique du mouvement brownien standard impose la règle fondamentale (dB_t)² = dt."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  // 2. PHYSIQUE ET CHIMIE
  // =================================================================
  {
    domainName: "Physique et Chimie",
    keywords: ["physique", "chimie", "mecanique", "electricite", "optique", "atome", "mole", "reaction", "thermodynamique", "cinetique", "ondes"],
    tiers: {
      primary: {
        objectives: [
          "Découvrir la matière qui nous entoure et ses états (solide, liquide, gaz).",
          "Comprendre le cycle de l'eau et les mélanges simples du quotidien.",
          "Réaliser des circuits électriques simples avec une pile, des fils et une ampoule.",
          "Observer la lumière, les ombres et les forces de poussée et d'attraction."
        ],
        chapters: [
          {
            title: "L'Eau et la Matière dans tous ses États",
            desc: "L'eau sous forme de glace, de liquide ou de vapeur : découverte des changements d'état.",
            coreConcepts: ["Les 3 états : solide, liquide, gazeux", "La glace fond (fusion) et l'eau bout (évaporation)", "Le thermomètre et la température (0°C et 100°C)", "L'eau dans la nature (pluie, nuages, rivières)"],
            practicalEx: "Expérience du glaçon qui fond au soleil et se transforme en eau liquide.",
            formulas: ["Glace + Chaleur = Eau liquide (Fusion)", "Eau liquide + Chaleur = Vapeur d'eau (Ébullition)"],
            sampleQuestions: [
              {
                question: "À quelle température l'eau pure gèle-t-elle pour devenir de la glace ?",
                options: ["100°C", "0°C", "20°C", "-50°C"],
                correctIndex: 1,
                explanation: "L'eau se transforme en glace à 0°C à pression ambiante."
              }
            ]
          },
          {
            title: "L'Électricité Simple : Piles, Fils et Ampoules",
            desc: "Construire un circuit électrique qui fonctionne en toute sécurité.",
            coreConcepts: ["La pile (borne + et borne -)", "Le circuit fermé où le courant circule et le circuit ouvert", "L'interrupteur qui allume ou éteint", "Les conducteurs (métaux) et isolants (plastique, bois)"],
            practicalEx: "Brancher une petite ampoule sur une pile plate : l'ampoule s'allume quand les deux bornes sont reliées.",
            formulas: ["Circuit fermé = La lampe brille", "Circuit ouvert = Le courant s'arrête"],
            sampleQuestions: [
              {
                question: "Quel matériau est un bon conducteur d'électricité ?",
                options: ["Le plastique", "Le fer ou le cuivre", "Le bois sec", "Le verre"],
                correctIndex: 1,
                explanation: "Les métaux comme le cuivre et le fer laissent passer le courant électrique."
              }
            ]
          },
          {
            title: "Lumières et Ombres : Le Jour et la Nuit",
            desc: "D'où vient la lumière, comment se forment les ombres et pourquoi la Terre tourne.",
            coreConcepts: ["Sources de lumière : le Soleil, la lampe, la bougie", "Les objets opaques qui créent une ombre", "Le trajet en ligne droite de la lumière", "La rotation de la Terre qui crée le jour et la nuit"],
            practicalEx: "Mettre sa main devant une lampe de poche pour projeter une ombre sur le mur.",
            formulas: ["Lumière + Objet opaque = Ombre projetée"],
            sampleQuestions: [
              {
                question: "Pourquoi avons-nous une ombre quand nous sommes au soleil ?",
                options: ["Parce que notre corps bloque la lumière", "Parce que le sol est froid", "Parce que le vent souffle", "Parce que le Soleil bouge"],
                correctIndex: 0,
                explanation: "Notre corps est opaque et arrête les rayons de lumière, créant une zone sombre derrière nous appelée ombre."
              }
            ]
          },
          {
            title: "Mélanges et Solutions : Ce qui se dissout et ce qui flotte",
            desc: "Mélanger du sel, du sucre, du sable et de l'huile dans de l'eau.",
            coreConcepts: ["Mélange homogène (on ne voit qu'une seule chose)", "Mélange hétérogène (on voit plusieurs couches)", "La dissolution du sucre et du sel", "Flotter ou couler selon la matière"],
            practicalEx: "Le sucre se dissout dans l'eau chaude et devient invisible, mais le goût sucré reste !",
            formulas: ["Soluté (sucre) + Solvant (eau) = Solution sucrée"],
            sampleQuestions: [
              {
                question: "Que se passe-t-il si on verse de l'huile dans un verre d'eau ?",
                options: ["L'huile coule au fond", "L'huile flotte au-dessus de l'eau", "L'huile disparaît complètement", "L'eau se transforme en huile"],
                correctIndex: 1,
                explanation: "L'huile est moins dense que l'eau et ne s'y mélange pas : elle flotte à la surface."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Décrire la constitution de la matière à l'échelle atomique et moléculaire.",
          "Équilibrer des équations de réactions chimiques simples et comprendre la conservation de la masse.",
          "Mesurer la tension (V) et l'intensité (A) dans des circuits en série et en dérivation (Loi d'Ohm).",
          "Calculer des vitesses, caractériser les mouvements et comprendre les interactions mécaniques."
        ],
        chapters: [
          {
            title: "Constitution de la Matière : Atomes et Molécules",
            desc: "De quoi est faite la matière ? Découverte des molécules d'eau, de dioxygène et des atomes.",
            coreConcepts: ["Modèle particulaire de la matière", "Atomes (carbone C, hydrogène H, oxygène O, azote N)", "Molécules (H2O, CO2, O2)", "Masse volumique rho = m/V"],
            practicalEx: "Calcul de la masse volumique d'un caillou de 150 g et volume 50 mL : rho = 150 / 50 = 3 g/cm³.",
            formulas: ["rho = m / V", "Conservation de la masse"],
            sampleQuestions: [
              {
                question: "Quelle est la formule chimique de la molécule d'eau ?",
                options: ["CO2", "H2O", "NaCl", "O2"],
                correctIndex: 1,
                explanation: "La molécule d'eau est composée de 2 atomes d'hydrogène (H) et 1 atome d'oxygène (O) : H2O."
              }
            ]
          },
          {
            title: "Les Transformations Chimiques et la Règle de Lavoisier",
            desc: "Réactifs, produits, combustion du carbone et conservation des atomes.",
            coreConcepts: ["Différence entre transformation physique et chimique", "Réactifs et produits de la réaction", "Conservation de la masse : 'Rien ne se perd, rien ne se crée'", "Équilibrer une équation bilan"],
            practicalEx: "Combustion du carbone dans le dioxygène : C + O2 -> CO2.",
            formulas: ["Masse des réactifs consommés = Masse des produits formés"],
            sampleQuestions: [
              {
                question: "Lors d'une réaction chimique, que deviennent les atomes ?",
                options: ["Ils disparaissent", "Ils se réorganisent pour former de nouvelles molécules", "Ils se transforment en électricité", "Ils doublent de masse"],
                correctIndex: 1,
                explanation: "Les atomes se conservent en nombre et en nature : ils se réarrangent pour créer de nouvelles substances."
              }
            ]
          },
          {
            title: "Circuits Électriques : Tension, Intensité et Loi d'Ohm",
            desc: "Lois des nœuds et des mailles, utilisation du voltmètre et de l'ampèremètre, résistance électrique.",
            coreConcepts: ["Tension électrique U en Volts (V) mesurée en dérivation", "Intensité I en Ampères (A) mesurée en série", "Loi d'Ohm : U = R × I", "Lois des circuits en série et en dérivation"],
            practicalEx: "Une résistance R = 100 ohms est traversée par un courant I = 0,05 A. Tension : U = 100 × 0,05 = 5 V.",
            formulas: ["U = R * I", "P = U * I"],
            sampleQuestions: [
              {
                question: "D'après la loi d'Ohm U = R × I, si R = 50 ohms et I = 0,2 A, que vaut la tension U ?",
                options: ["10 V", "25 V", "100 V", "0,004 V"],
                correctIndex: 0,
                explanation: "U = 50 × 0,2 = 10 V."
              }
            ]
          },
          {
            title: "Mouvements, Vitesse et Interactions Mécaniques",
            desc: "Trajectoire, vitesse constante ou accélérée, forces de contact et à distance.",
            coreConcepts: ["Référentiel terrestre", "Trajectoire rectiligne, circulaire ou quelconque", "Calcul de la vitesse moyenne v = d / t", "Action mécanique modélisée par une force (direction, sens, valeur en Newtons)"],
            practicalEx: "Un train parcourt 300 km en 2 heures. Vitesse moyenne : v = 300 / 2 = 150 km/h.",
            formulas: ["v = d / t", "Poids : P = m * g (avec g ~ 9,8 N/kg)"],
            sampleQuestions: [
              {
                question: "Quelle est l'unité internationale de mesure d'une force ?",
                options: ["Le Joule (J)", "Le Newton (N)", "Le Watt (W)", "Le Kilogramme (kg)"],
                correctIndex: 1,
                explanation: "L'unité de mesure d'une force dans le Système International est le Newton, noté N."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Modéliser l'atome, le cortège électronique et quantifier la matière en moles.",
          "Appliquer les lois du mouvement de Newton, l'énergie mécanique et ses transferts.",
          "Caractériser les ondes mécaniques et électromagnétiques (longueur d'onde, fréquence, diffraction).",
          "Réaliser des bilans de matière, titrages acido-basiques et calculs de pH."
        ],
        chapters: [
          {
            title: "Structure Atomique, Quantité de Matière et Mole",
            desc: "Protons, neutrons, électrons, constante d'Avogadro et calculs de quantité de matière.",
            coreConcepts: ["Modèle du noyau atomique A, Z et cortège électronique", "La mole comme unité de quantité de matière (N_A = 6,022 × 10²³ mol⁻¹)", "Masse molaire atomique et moléculaire M (g/mol)", "Concentration molaire C = n/V et massique Cm = m/V"],
            practicalEx: "Nombre de moles dans 36 g d'eau (M = 18 g/mol) : n = 36 / 18 = 2,0 mol.",
            formulas: ["n = m / M", "n = N / N_A", "C = n / V = Cm / M"],
            sampleQuestions: [
              {
                question: "Combien de moles d'eau représente une masse de 90 g d'eau pure (Masse molaire de H2O = 18 g/mol) ?",
                options: ["2 mol", "5 mol", "18 mol", "0,2 mol"],
                correctIndex: 1,
                explanation: "n = m / M = 90 / 18 = 5 mol."
              }
            ]
          },
          {
            title: "Cinématique et Lois Fondamentales de Newton",
            desc: "Vecteurs position, vitesse, accélération et le principe fondamental de la dynamique.",
            coreConcepts: ["Référentiels galiléens", "Définition vectorielle : v = dr/dt et a = dv/dt", "Deuxième loi de Newton : Somme des forces = m × a", "Mouvement dans un champ de pesanteur uniforme (trajectoire parabolique)"],
            practicalEx: "Chute libre d'une balle sans frottement : accélération a = g verticale vers le bas. Vitesse v(t) = gt.",
            formulas: ["sum F = m * a", "v(t) = d r(t) / dt", "a(t) = d v(t) / dt"],
            sampleQuestions: [
              {
                question: "Que stipule la deuxième loi de Newton pour un système de masse constante m soumis à une force résultante F ?",
                options: ["F = m × v", "F = m × a", "F = 1/2 m v²", "F = m / a"],
                correctIndex: 1,
                explanation: "La seconde loi de Newton s'énonce : Somme des forces extérieures = m × a."
              }
            ]
          },
          {
            title: "Énergie Mécanique, Travail et Théorèmes Énergétiques",
            desc: "Travail d'une force, énergie cinétique, énergie potentielle de pesanteur et conservation.",
            coreConcepts: ["Travail d'une force constante W(F) = F . AB", "Énergie cinétique Ec = 1/2 m v²", "Énergie potentielle de pesanteur Epp = mgh", "Théorème de l'énergie mécanique : Em = Ec + Epp"],
            practicalEx: "Vitesse d'un objet tombant d'une hauteur h = 5 m sans vitesse initiale : mgh = 1/2 mv² => v = sqrt(2gh) = sqrt(2 × 9,8 × 5) ~ 9,9 m/s.",
            formulas: ["Ec = 1/2 m v²", "Epp = m g h", "Em = Ec + Epp = constante (sans frottement)"],
            sampleQuestions: [
              {
                question: "Si la vitesse d'une voiture est doublée, que devient son énergie cinétique Ec = 1/2 m v² ?",
                options: ["Elle est doublée (×2)", "Elle est quadruplée (×4)", "Elle est divisée par 2", "Elle reste identique"],
                correctIndex: 1,
                explanation: "L'énergie cinétique dépend du carré de la vitesse : (2v)² = 4v², l'énergie est donc multipliée par 4."
              }
            ]
          },
          {
            title: "Ondes Mécaniques, Électromagnétiques et Phénomènes Ondulatoires",
            desc: "Propagation, diffraction, interférences et effet Doppler.",
            coreConcepts: ["Période temporelle T, fréquence f = 1/T et longueur d'onde lambda = v × T", "Spectre des ondes électromagnétiques", "Diffraction de la lumière par une fente de largeur a : theta = lambda / a", "Interférences constructives et destructives"],
            practicalEx: "Fréquence d'un laser rouge de longueur d'onde lambda = 632,8 nm : f = c / lambda = (3 × 10⁸) / (632,8 × 10⁻⁹) ~ 4,74 × 10¹⁴ Hz.",
            formulas: ["lambda = v / f = v * T", "theta = lambda / a"],
            sampleQuestions: [
              {
                question: "Quelle est la relation reliant la longueur d'onde lambda, la célérité c et la fréquence f d'une onde électromagnétique ?",
                options: ["lambda = c × f", "lambda = c / f", "lambda = f / c", "lambda = c² × f"],
                correctIndex: 1,
                explanation: "La longueur d'onde spatiale est égale à la célérité divisée par la fréquence temporelle : lambda = c / f."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Formuler les équations de Maxwell et la théorie électromagnétique complète.",
          "Appliquer la mécanique analytique lagrangienne et hamiltonienne aux systèmes complexes.",
          "Modéliser la thermodynamique statistique, potentiels thermodynamiques et entropie.",
          "Comprendre les postulats de la mécanique quantique et l'équation de Schrödinger."
        ],
        chapters: [
          {
            title: "Électromagnétisme de Maxwell et Propagation dans le Vide",
            desc: "Équations de Maxwell sous forme locale et intégrale, ondes planes et vecteur de Poynting.",
            coreConcepts: ["Équations de Maxwell-Gauss, Maxwell-Thomson, Maxwell-Faraday et Maxwell-Ampère", "Équation de propagation de d'Alembert pour le champ E et B", "Vecteur de Poynting et flux d'énergie électromagnétique", "Jauge de Lorentz et potentiels V et A"],
            practicalEx: "Démonstration que la célérité de la lumière dans le vide est c = 1 / sqrt(mu_0 epsilon_0).",
            formulas: ["div E = rho / epsilon_0", "rot E = - partial B / partial t", "rot B = mu_0 j + mu_0 epsilon_0 partial E / partial t"],
            sampleQuestions: [
              {
                question: "Quelle équation de Maxwell traduit l'absence de monopôle magnétique isolé (div B = 0) ?",
                options: ["Maxwell-Gauss", "Maxwell-Thomson", "Maxwell-Faraday", "Maxwell-Ampère"],
                correctIndex: 1,
                explanation: "L'équation div B = 0 (Maxwell-Thomson) formalise la conservation du flux magnétique et l'inexistence de monopôles magnétiques."
              }
            ]
          },
          {
            title: "Mécanique Analytique : Formalismes de Lagrange et de Hamilton",
            desc: "Principe de moindre action, coordonnées généralisées, équations d'Euler-Lagrange et théorème de Noether.",
            coreConcepts: ["Action de Hamilton et principe variationnel delta S = 0", "Lagrangien L = T - V en coordonnées généralisées q_i", "Équations d'Euler-Lagrange : d/dt (partial L / partial q'_i) - partial L / partial q_i = 0", "Théorème de Noether et constantes du mouvement"],
            practicalEx: "Résolution du pendule double via le formalisme lagrangien sans calcul de forces de tension.",
            formulas: ["L = T - V", "H = sum p_i q'_i - L", "d/dt (partial L / partial q'_i) = partial L / partial q_i"],
            sampleQuestions: [
              {
                question: "D'après le théorème d'Emmy Noether, l'invariance du Lagrangien par translation dans le temps implique la conservation de :",
                options: ["La quantité de mouvement", "L'énergie mécanique totale", "Le moment cinétique", "La charge électrique"],
                correctIndex: 1,
                explanation: "La symétrie par translation temporelle correspond à la loi de conservation de l'énergie."
              }
            ]
          },
          {
            title: "Thermodynamique Statistique et Ensembles Statistiques",
            desc: "Micro-états, macro-états, ensemble microcanonique, canonique et fonction de partition.",
            coreConcepts: ["Postulat fondamental d'équiprobabilité des micro-états accessibles", "Formule de Boltzmann de l'entropie S = k_B ln(Omega)", "Facteur de Boltzmann exp(-E_i / k_B T) et fonction de partition Z", "Énergie libre F = -k_B T ln(Z)"],
            practicalEx: "Retrouver l'équation des gaz parfaits P V = N k_B T à partir de la fonction de partition canonique.",
            formulas: ["S = k_B * ln(Omega)", "Z = sum exp(-E_i / (k_B T))", "F = - k_B T ln Z"],
            sampleQuestions: [
              {
                question: "Que représente le facteur k_B dans la formule fondamentale de Boltzmann S = k_B ln(Omega) ?",
                options: ["La constante de Planck", "La constante de Boltzmann", "La constante des gaz parfaits", "Le nombre d'Avogadro"],
                correctIndex: 1,
                explanation: "k_B est la constante universelle de Boltzmann (~ 1,3806 × 10⁻²³ J/K)."
              }
            ]
          },
          {
            title: "Postulats de la Mécanique Quantique et Puits de Potentiel",
            desc: "Fonction d'onde psi, opérateurs hermitiens, relation d'incertitude d'Heisenberg et équation de Schrödinger.",
            coreConcepts: ["Vecteur d'état dans l'espace de Hilbert et interprétation probabiliste de Born |psi|²", "Opérateurs position X et impulsion P = -i hbar d/dx", "Équation de Schrödinger dépendante et indépendante du temps", "Puits de potentiel infini 1D et quantification des niveaux d'énergie"],
            practicalEx: "Calcul des niveaux d'énergie quantifiés d'une particule piégée dans une boîte de largeur L : E_n = n² pi² hbar² / (2m L²).",
            formulas: ["i hbar partial psi / partial t = H psi", "[X, P] = i hbar", "E_n = n² h² / (8 m L²)"],
            sampleQuestions: [
              {
                question: "Quelle est l'interprétation physique de la quantité |psi(x, t)|² dx selon Max Born ?",
                options: ["La masse de la particule", "La probabilité de présence de la particule entre x et x + dx", "La force exercée sur la particule", "L'énergie cinétique"],
                correctIndex: 1,
                explanation: "Le module au carré de la fonction d'onde représente la densité de probabilité spatiale de présence de la particule."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Maîtriser la théorie quantique des champs et l'électrodynamique quantique (QED).",
          "Comprendre la relativité générale d'Einstein et la dynamique de l'espace-temps courbe.",
          "Étudier la physique de la matière condensée avancée, supraconductivité et effet Hall quantique.",
          "Explorer les modèles contemporains de cosmologie observationnelle et physique des hautes énergies."
        ],
        chapters: [
          {
            title: "Relativité Générale et Équations d'Einstein",
            desc: "Géométrie riemannienne, tenseur métrique g_munu, courbure de Riemann et tenseur d'Einstein.",
            coreConcepts: ["Principe d'équivalence fort d'Einstein", "Connexion de Levi-Civita et symboles de Christoffel", "Tenseur de Ricci R_munu et scalaire de courbure R", "Équations de champ d'Einstein : G_munu = (8 pi G / c⁴) T_munu", "Solution de Schwarzschild pour les trous noirs statiques"],
            practicalEx: "Dérivation de l'avance du périhélie de Mercure et déviation gravitationnelle des rayons lumineux.",
            formulas: ["G_munu = R_munu - 1/2 g_munu R = (8 pi G / c^4) T_munu", "ds² = g_munu dx^mu dx^nu"],
            sampleQuestions: [
              {
                question: "Quel tenseur représente la distribution d'énergie, d'impulsion et de contraintes de la matière dans les équations d'Einstein ?",
                options: ["Le tenseur métrique g_munu", "Le tenseur énergie-impulsion T_munu", "Le tenseur de Riemann R_sigma_mu_nu", "Le tenseur de Weyl"],
                correctIndex: 1,
                explanation: "T_munu est le tenseur source représentant le contenu matière-énergie dans les équations d'Einstein."
              }
            ]
          },
          {
            title: "Théorie Quantique des Champs et Équation de Dirac",
            desc: "Seconde quantification, quantification du champ de Klein-Gordon et champ de Dirac des fermions.",
            coreConcepts: ["Formalisme lagrangien pour les densités de champs", "Équation relativiste de Dirac (i gamma^mu partial_mu - m) psi = 0", "Matrices de Dirac gamma^mu et structure de spineurs à 4 composantes", "Création, annihilation d'antiparticules et symétrie CPT"],
            practicalEx: "Prédiction de l'existence du positron par Paul Dirac à partir des solutions d'énergie négative.",
            formulas: ["(i gamma^mu partial_mu - m) psi = 0", "{gamma^mu, gamma^nu} = 2 eta^munu"],
            sampleQuestions: [
              {
                question: "L'équation de Dirac décrit les particules de spin :",
                options: ["0 (bosons scalaires)", "1/2 (fermions comme l'électron)", "1 (bosons de jauge)", "2 (graviton)"],
                correctIndex: 1,
                explanation: "L'équation de Dirac décrit les particules relativistes de spin 1/2 telles que l'électron ou le quark."
              }
            ]
          },
          {
            title: "Matière Condensée Avancée et Supraconductivité",
            desc: "Paires de Cooper, théorie BCS, modèle de Ginzburg-Landau et effet Meissner.",
            coreConcepts: ["Interaction électron-phonon attractive effective", "Formation des paires de Cooper et condensation bosonique", "Théorie BCS et ouverture du gap supraconducteur Delta(T)", "Effet Meissner d'expulsion du champ magnétique et longueur de pénétration de London"],
            practicalEx: "Lévitation magnétique d'un supraconducteur YBaCuO au-dessus d'un réseau d'aimants permanents.",
            formulas: ["Delta(0) = 1,764 k_B T_c", "B(x) = B_0 exp(-x / lambda_L)"],
            sampleQuestions: [
              {
                question: "Quel phénomène caractérise l'expulsion totale du champ magnétique de l'intérieur d'un supraconducteur ?",
                options: ["L'effet Meissner", "L'effet Hall", "L'effet Seebeck", "L'effet Joule"],
                correctIndex: 0,
                explanation: "L'effet Meissner-Ochsenfeld est l'expulsion spontanée du flux magnétique à la transition supraconductrice."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  // 3. INFORMATIQUE ET PROGRAMMATION
  // =================================================================
  {
    domainName: "Informatique et Algorithmique",
    keywords: ["informatique", "python", "algorithme", "programmation", "code", "donnees", "web", "reseau", "base de donnees", "sql", "ia", "intelligence artificielle"],
    tiers: {
      primary: {
        objectives: [
          "Découvrir l'ordinateur, le clavier, l'écran et la souris.",
          "Comprendre ce qu'est un algorithme : une suite d'instructions précises.",
          "Découvrir le codage par blocs (Scratch) pour animer un personnage.",
          "Adopter les bons réflexes pour utiliser Internet en toute sécurité."
        ],
        chapters: [
          {
            title: "Découverte de l'Ordinateur et du Numérique",
            desc: "Comment fonctionne un ordinateur, reconnaître le clavier, la souris, l'écran et les fichiers.",
            coreConcepts: ["L'écran, le clavier, la souris et l'unité centrale", "Cliquer, double-cliquer et glisser-déposer", "Qu'est-ce qu'un fichier et un dossier ?", "Les règles de sécurité et de temps d'écran"],
            practicalEx: "Créer un dossier 'Mes Dessins' sur le bureau et y enregistrer une image.",
            formulas: ["1. Allumer -> 2. Travailler -> 3. Enregistrer -> 4. Éteindre"],
            sampleQuestions: [
              {
                question: "Quel élément de l'ordinateur permet de taper des lettres et des chiffres ?",
                options: ["La souris", "Le clavier", "L'écran", "L'imprimante"],
                correctIndex: 1,
                explanation: "Le clavier est le périphérique d'entrée qui comporte les touches de lettres et de chiffres."
              }
            ]
          },
          {
            title: "Les Algorithmes Expliqués Simplement : Donner des Ordres au Robot",
            desc: "Un algorithme est comme une recette de cuisine : des étapes à suivre dans le bon ordre.",
            coreConcepts: ["La notion d'instruction pas-à-pas", "L'ordre des étapes compte !", "Répéter une action (la boucle)", "Prendre une décision : Si... Alors..."],
            practicalEx: "Guider un robot pour sortir d'un labyrinthe : 'Avance de 2 cases, tourne à droite, avance de 1 case'.",
            formulas: ["Algorithme = Recette d'instructions précises"],
            sampleQuestions: [
              {
                question: "Pourquoi l'ordre des instructions est-il très important en programmation ?",
                options: ["Parce que l'ordinateur fait exactement ce qu'on lui dit dans l'ordre donné", "Parce que l'ordinateur change les ordres tout seul", "Ce n'est pas important", "Pour faire joli"],
                correctIndex: 0,
                explanation: "L'ordinateur exécute les instructions pas à pas de manière stricte : changer l'ordre change le résultat."
              }
            ]
          },
          {
            title: "Coder avec des Blocs : Faire Bouger un Personnage (Scratch)",
            desc: "Assembler des blocs comme des Legos pour créer une animation ou un petit jeu interactif.",
            coreConcepts: ["Les blocs de mouvement ('Avancer de 10 pas')", "Les blocs d'événement ('Quand drapeau vert cliqué')", "Les boucles 'Répéter 10 fois'", "Faire parler le personnage avec une bulle de dialogue"],
            practicalEx: "Faire faire un carré au petit chat Scratch en répétant 4 fois : 'avancer de 50 pas, tourner de 90 degrés'.",
            formulas: ["Répéter 4 fois [Avancer + Tourner 90°] = Carré"],
            sampleQuestions: [
              {
                question: "Dans Scratch, quel bloc utilise-t-on pour démarrer une action quand on clique sur le drapeau vert ?",
                options: ["Un bloc de mouvement", "Un bloc d'événement", "Un bloc de son", "Un bloc de calcul"],
                correctIndex: 1,
                explanation: "Les blocs d'événements (jaunes) déclenchent les scripts lors d'un clic ou d'une touche pressée."
              }
            ]
          },
          {
            title: "Internet, Sécurité et Respect en Ligne",
            desc: "Les bons réflexes pour naviguer sur le web : protéger ses mots de passe et rester vigilant.",
            coreConcepts: ["Qu'est-ce qu'Internet (un réseau mondial d'ordinateurs connectés)", "Garder ses mots de passe secrets", "Ne jamais donner ses informations personnelles à des inconnus", "Demander l'aide d'un adulte en cas de doute"],
            practicalEx: "Créer un mot de passe solide en mélangeant des lettres, des chiffres et un symbole secret.",
            formulas: ["Mot de passe secret = Protection de mes données"],
            sampleQuestions: [
              {
                question: "Dois-tu partager ton mot de passe personnel avec tes camarades de classe ?",
                options: ["Oui, avec tout le monde", "Non, un mot de passe doit rester strictement secret", "Oui, si on me le demande gentiment", "Seulement à l'école"],
                correctIndex: 1,
                explanation: "Un mot de passe personnel ne doit jamais être divulgué pour protéger sa vie privée."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Maîtriser les bases du code Python : variables, conditions et boucles.",
          "Créer des fonctions pour découper et réutiliser son code avec méthode.",
          "Comprendre l'architecture d'un ordinateur (RAM, processeur) et le binaire (0 et 1).",
          "Découvrir le fonctionnement du réseau Internet, adresses IP et requêtes web."
        ],
        chapters: [
          {
            title: "Initiation à Python : Variables et Types de Données",
            desc: "Prendre en main Python, afficher des messages et stocker des informations dans des variables.",
            coreConcepts: ["La fonction print() et l'affichage console", "Variables numériques (int, float) et chaînes de caractères (str)", "La fonction input() pour demander une saisie à l'utilisateur", "Les opérations arithmétiques de base (+, -, *, /, //, %)"],
            practicalEx: "Programme qui demande l'âge de l'utilisateur et calcule son année de naissance approximative.",
            formulas: ["nom_variable = valeur", "int('42') convertit en entier"],
            sampleQuestions: [
              {
                question: "En Python, quelle fonction permet d'afficher un texte à l'écran de la console ?",
                options: ["echo()", "print()", "display()", "write()"],
                correctIndex: 1,
                explanation: "print() est l'instruction standard en Python pour afficher des messages dans le terminal."
              }
            ]
          },
          {
            title: "Conditions (Si / Sinon) et Logique Booléenne",
            desc: "Permettre à un programme de prendre des décisions selon les données fournies.",
            coreConcepts: ["Les instructions if, elif et else", "Opérateurs de comparaison (==, !=, <, >, <=, >=)", "Opérateurs logiques and, or, not", "L'importance de l'indentation en Python"],
            practicalEx: "Programme vérifiant si un utilisateur a l'âge requis pour entrer dans un manège : if age >= 12: print('Accès autorisé').",
            formulas: ["if condition: \n    # action si vrai \nelse: \n    # action si faux"],
            sampleQuestions: [
              {
                question: "En Python, quel opérateur permet de tester l'égalité stricte entre deux valeurs ?",
                options: ["=", "==", "===", "equals"],
                correctIndex: 1,
                explanation: "Le simple signe '=' est réservé à l'affectation, tandis que '==' teste l'égalité de deux valeurs."
              }
            ]
          },
          {
            title: "Les Boucles : Répéter des Actions avec 'For' et 'While'",
            desc: "Parcourir des séries de nombres ou répéter une boucle jusqu'à ce qu'une condition soit vérifiée.",
            coreConcepts: ["La boucle for i in range(n) pour répéter un nombre précis de fois", "La boucle while condition: qui tourne tant qu'une condition est vraie", "Attention aux boucles infinies !", "L'instruction break pour quitter une boucle"],
            practicalEx: "Création d'un jeu du 'Nombre Mystère' où le joueur devine un nombre entre 1 et 100 avec des indices 'c'est plus' / 'c'est moins'.",
            formulas: ["for i in range(10): # répète de 0 à 9", "while not gagne:"],
            sampleQuestions: [
              {
                question: "Combien de fois la boucle 'for i in range(5):' va-t-elle s'exécuter ?",
                options: ["4 fois", "5 fois", "6 fois", "Une infinité de fois"],
                correctIndex: 1,
                explanation: "range(5) génère les entiers 0, 1, 2, 3, 4, ce qui correspond à exactement 5 itérations."
              }
            ]
          },
          {
            title: "Réseaux, Adresses IP et Fonctionnement d'Internet",
            desc: "Comment voyagent les données à travers le monde : routeurs, adresses IP et protocoles.",
            coreConcepts: ["Qu'est-ce qu'une adresse IP (identifiant unique d'une machine sur le réseau)", "Le modèle Client - Serveur", "Le rôle du DNS (annuaire qui transforme google.com en adresse IP)", "Le protocole HTTP / HTTPS et la sécurisation des échanges"],
            practicalEx: "Retrouver l'adresse IP d'un serveur web grâce à la commande de terminal 'ping'.",
            formulas: ["Client (Navigateur) -> Requête HTTP -> Serveur Web -> Réponse HTML"],
            sampleQuestions: [
              {
                question: "Quel est le rôle d'un serveur DNS sur Internet ?",
                options: ["Envoyer des emails", "Traduire un nom de domaine lisible en adresse IP numérique", "Afficher des publicités", "Fabriquer des ordinateurs"],
                correctIndex: 1,
                explanation: "Le DNS (Domain Name System) fait office d'annuaire en convertissant les adresses web en adresses IP."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Concevoir des algorithmes structurés en Python (fonctions, listes, dictionnaires, tuples).",
          "Maîtriser les algorithmes de recherche dichotomique et de tris (sélection, insertion).",
          "Modéliser et interroger des bases de données relationnelles avec des requêtes SQL.",
          "Comprendre les architectures matérielles, le modèle TCP/IP et le développement Web (HTML/CSS/JS)."
        ],
        chapters: [
          {
            title: "Structures de Données Python : Listes, Tuples et Dictionnaires",
            desc: "Organisation des données en mémoire, mutabilité, parcours et compréhensions de listes.",
            coreConcepts: ["Listes mutables [] et méthodes (.append, .pop, .index)", "Tuples immuables () pour données figées", "Dictionnaires clé-valeur {} pour accès direct en O(1)", "Compréhensions de listes [f(x) for x in L if cond]"],
            practicalEx: "Création d'un annuaire d'élèves associant un identifiant unique à un dictionnaire de notes.",
            formulas: ["dico['cle'] = valeur", "L = [x**2 for x in range(10) if x % 2 == 0]"],
            sampleQuestions: [
              {
                question: "Quelle est la principale différence entre un tuple et une liste en Python ?",
                options: ["Le tuple est modifiable (mutable), la liste ne l'est pas", "La liste est modifiable (mutable), le tuple est immuable", "Les listes ne contiennent que des entiers", "Il n'y a aucune différence"],
                correctIndex: 1,
                explanation: "Les tuples sont immuables (non modifiables après création), contrairement aux listes qui sont mutables."
              }
            ]
          },
          {
            title: "Algorithmique : Recherche Dichotomique et Algorithmes de Tri",
            desc: "Analyse de complexité temporelle, algorithmes de tri par sélection et tri par insertion.",
            coreConcepts: ["Recherche linéaire en O(n) vs recherche dichotomique en O(log n) dans un tableau trié", "Tri par sélection du minimum", "Tri par insertion élément par élément", "Preuve de terminaison par variant et de correction par invariant de boucle"],
            practicalEx: "Implémentation de la recherche dichotomique pour trouver un mot dans un dictionnaire de 100 000 mots en moins de 17 étapes.",
            formulas: ["Complexité recherche dichotomique : O(log_2 n)", "Tri par sélection / insertion : O(n²) dans le pire des cas"],
            sampleQuestions: [
              {
                question: "Dans une liste triée de 1 000 éléments, combien d'itérations au maximum nécessite une recherche dichotomique ?",
                options: ["1 000", "500", "Environ 10", "100"],
                correctIndex: 2,
                explanation: "2¹⁰ = 1 024 > 1 000. La recherche dichotomique trouve la réponse en 10 étapes maximum grâce à sa complexité logarithmique O(log₂ n)."
              }
            ]
          },
          {
            title: "Bases de Données Relationnelles et Langage SQL",
            desc: "Modèle relationnel, clés primaires, clés étrangères et requêtes SQL d'interrogation et de mise à jour.",
            coreConcepts: ["Tables relationnelles, attributs et types", "Clé primaire (unicité) et clé étrangère (intégrité référentielle)", "Requêtes de sélection : SELECT ... FROM ... WHERE ... ORDER BY", "Jointures : INNER JOIN ... ON et fonctions d'agrégation (COUNT, AVG, SUM)"],
            practicalEx: "Écrire une requête SQL sélectionnant le nom et la moyenne des étudiants inscrits en spécialité Mathématiques.",
            formulas: ["SELECT colonnes FROM table WHERE condition JOIN autre ON cle = cle"],
            sampleQuestions: [
              {
                question: "En SQL, quelle clause permet de filtrer les enregistrements selon une condition précise ?",
                options: ["ORDER BY", "WHERE", "GROUP BY", "SELECT"],
                correctIndex: 1,
                explanation: "La clause WHERE spécifie les critères de filtrage des lignes renvoyées par la requête."
              }
            ]
          },
          {
            title: "Réseaux, Modèle TCP/IP et Protocoles du Web",
            desc: "Architecture en couches TCP/IP, encapsulation des paquets, routage et adresses IPv4/IPv6.",
            coreConcepts: ["Les 4 couches du modèle TCP/IP (Application, Transport, Réseau, Accès réseau)", "Différence entre TCP (fiable avec accusé de réception) et UDP (rapide sans garantie)", "Routage des paquets IP et tables de routage (RIP, OSPF)", "Protocole client-serveur HTTP/HTTPS et format JSON"],
            practicalEx: "Simulation du routage d'un paquet à travers 3 routeurs pour atteindre sa destination finale.",
            formulas: ["Encapsulation : Données -> Segment TCP -> Paquet IP -> Trame Ethernet"],
            sampleQuestions: [
              {
                question: "Quel protocole de la couche transport garantit la livraison ordonnée et sans perte de tous les paquets transmis ?",
                options: ["UDP", "TCP", "IP", "DNS"],
                correctIndex: 1,
                explanation: "TCP (Transmission Control Protocol) assure une connexion orientée flux avec vérification d'erreurs et réémission des paquets perdus."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Maîtriser les structures de données avancées (arbres binaires, graphes, tables de hachage).",
          "Analyser formellement la complexité spatio-temporelle et les classes P et NP.",
          "Comprendre les systèmes d'exploitation : processus, threads, sémaphores et gestion mémoire.",
          "Pratiquer la programmation orientée objet avancée et les patrons de conception (Design Patterns)."
        ],
        chapters: [
          {
            title: "Structures de Données Avancées : Arbres, Tas et Graphes",
            desc: "Arbres binaires de recherche (ABR), arbres équilibrés AVL, tas binaires et représentations de graphes.",
            coreConcepts: ["Arbres binaires de recherche et parcours (préfixe, infixe, postfixe)", "Équilibrage dynamique d'arbres AVL par rotations gauche/droite", "Tas binaire (Heap) et file de priorité en O(log n)", "Graphes : matrice d'adjacence, listes d'adjacence, algorithmes BFS et DFS"],
            practicalEx: "Implémentation de l'algorithme de Dijkstra pour trouver le plus court chemin dans un réseau routier pondéré.",
            formulas: ["Hauteur d'un arbre AVL : h <= 1,44 log_2(n)", "Dijkstra avec tas binaire : O((|V| + |E|) log |V|)"],
            sampleQuestions: [
              {
                question: "Quel est le temps d'accès moyen pour rechercher une clé dans une table de hachage bien dimensionnée ?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                correctIndex: 0,
                explanation: "Grâce à une fonction de hachage uniforme et une résolution efficace des collisions, l'accès se fait en temps constant O(1) moyen."
              }
            ]
          },
          {
            title: "Théorie de la Complexité et Algorithmique Avancée",
            desc: "Complexité asymptotique, programmation dynamique, algorithmes gloutons et NP-complétude.",
            coreConcepts: ["Notations asymptotiques O, Omega, Theta", "Théorème maître de récurrence T(n) = a T(n/b) + f(n)", "Programmation dynamique : mémoïsation et tabulation", "Classes de complexité P, NP, NP-complet et réductions polynomiales"],
            practicalEx: "Résolution du problème du sac à dos (Knapsack Problem) par programmation dynamique en temps pseudo-polynomial O(n W).",
            formulas: ["Théorème Maître : T(n) = a T(n/b) + Theta(n^d)", "P subseteq NP"],
            sampleQuestions: [
              {
                question: "Si un problème de décision appartient à la classe NP et que tout problème de NP peut se réduire polynomialement à lui, ce problème est dit :",
                options: ["NP-complet", "Linéaire", "Non décidable", "Sous-exponentiel"],
                correctIndex: 0,
                explanation: "C'est la définition formelle d'un problème NP-complet établie par le théorème de Cook-Levin."
              }
            ]
          },
          {
            title: "Systèmes d'Exploitation : Processus, Mémoire et Concurrence",
            desc: "Ordonnancement, commutation de contexte, mémoire virtuelle paginée, exclusion mutuelle et interblocage.",
            coreConcepts: ["Gestion des processus et threads d'exécution", "Algorithmes d'ordonnancement (Round Robin, Priorités)", "Problème de la section critique, verrous (mutex) et sémaphores de Dijkstra", "Mémoire virtuelle, pagination, défauts de page et algorithme LRU"],
            practicalEx: "Résolution du problème classique des 'Producteurs-Consommateurs' avec un tampon circulaire et des sémaphores.",
            formulas: ["Conditions de Coffman pour l'interblocage (Deadlock)", "Temps d'accès effectif mémoire = h * t_m + (1-h) * t_defaut"],
            sampleQuestions: [
              {
                question: "Quel mécanisme matériel permet de séparer l'espace d'adressage virtuel de chaque processus de la mémoire vive physique ?",
                options: ["La MMU (Memory Management Unit)", "Le GPU", "La carte réseau", "Le bus PCI"],
                correctIndex: 0,
                explanation: "La MMU assure la traduction matérielle d'adresses virtuelles en adresses physiques via les tables de pages."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Concevoir des modèles d'apprentissage profond (Transformers, réseaux de diffusion et LLMs).",
          "Déployer des architectures distribuées scalables à tolérance de panne (Consensus Raft, Paxos).",
          "Analyser la cryptographie moderne post-quantique, preuves à divulgation nulle (ZKP) et sécurité.",
          "Optimiser le calcul haute performance parallèle (HPC, GPU computing avec CUDA)."
        ],
        chapters: [
          {
            title: "Apprentissage Profond & Architectures Transformers (LLM)",
            desc: "Mécanismes d'auto-attention, rétropropagation du gradient, transformeurs génératifs et optimisation de modèles.",
            coreConcepts: ["Scaled Dot-Product Attention : Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V", "Mécanismes Multi-Head Attention et normalisation de couche (LayerNorm)", "Techniques de fine-tuning efficace (LoRA, QLoRA, RLHF)", "Optimiseurs adaptatifs (AdamW, cosine learning rate schedule)"],
            practicalEx: "Entraînement d'un modèle d'attention compact pour la traduction automatique neuronale avec régularisation par dropout.",
            formulas: ["Attention(Q, K, V) = text{softmax}((Q K^T) / sqrt(d_k)) V", "L_{CE} = - sum y_i log(p_i)"],
            sampleQuestions: [
              {
                question: "Dans l'architecture Transformer, quel est le rôle de la division par sqrt(d_k) dans le calcul du produit scalaire des clés et requêtes ?",
                options: ["Éviter que les gradients ne s'annulent lorsque les valeurs de produit scalaire deviennent trop grandes", "Augmenter la vitesse du processeur", "Réduire le nombre de paramètres du modèle", "Inverser la matrice"],
                correctIndex: 0,
                explanation: "Pour de grandes dimensions d_k, le produit scalaire croît en magnitude, poussant la fonction softmax vers des régions à gradient quasi nul (saturation). Le facteur d'échelle compense cela."
              }
            ]
          },
          {
            title: "Systèmes Distribués et Algorithmes de Consensus (Raft, Paxos)",
            desc: "Théorème CAP, horloges logiques de Lamport, réplication de machine à états et consensus distribué.",
            coreConcepts: ["Théorème CAP (Cohérence, Disponibilité, Tolérance au partitionnement)", "Horloges vectorielles et causalité distribuée", "Algorithme de consensus Raft : élection de leader et réplication de logs", "Transactions distribuées à deux phases (2PC) et modèle PACELC"],
            practicalEx: "Mise en œuvre d'un cluster Raft à 3 nœuds résistant à la panne arbitraire d'un nœud sans perte de données.",
            formulas: ["Quorum = lfloor n/2 rfloor + 1", "CAP Theorem : Choisir 2 parmi C, A, P"],
            sampleQuestions: [
              {
                question: "Dans un cluster utilisant l'algorithme de consensus Raft composé de 5 nœuds, combien de nœuds peuvent tomber en panne tout en maintenant le consensus opérationnel ?",
                options: ["1 nœud", "2 nœuds", "3 nœuds", "4 nœuds"],
                correctIndex: 1,
                explanation: "Le quorum majoritaire requis est (5 // 2) + 1 = 3 nœuds. Le système peut donc tolérer la panne de 2 nœuds (5 - 3 = 2)."
              }
            ]
          }
        ]
      }
    }
  }
];

/**
 * Generates an adaptive, level-tailored generic curriculum for any bespoke subject
 * when the subject doesn't match predefined subjects.
 */
export function generateGenericCurriculumForTier(level: Level, subject: string, tier: LevelTier): { objectives: string[]; chapters: ChapterKnowledge[] } {
  const cap = subject.charAt(0).toUpperCase() + subject.slice(1);

  if (tier === 'primary') {
    return {
      objectives: [
        `Découvrir les bases faciles et amusantes de ${subject} adaptées aux élèves du primaire.`,
        `Comprendre le vocabulaire essentiel avec des mots simples et des images du quotidien.`,
        `Réaliser des exercices guidés pas-à-pas avec des exemples très concrets.`,
        `Prendre confiance en soi et réussir le petit quiz final avec le sourire.`
      ],
      chapters: [
        {
          title: `Découverte et Premiers Pas en ${cap}`,
          desc: `Qu'est-ce que ${subject} ? Une histoire simple pour tout comprendre sans se tromper.`,
          coreConcepts: [`À quoi sert ${subject} dans la vraie vie`, `Les 3 mots magiques à retenir`, `Observer et reconnaître autour de soi`, `La première règle d'or`],
          practicalEx: `Exemple tout simple inspiré de l'école et de la maison pour bien comprendre.`,
          formulas: [`Règle d'or : Bien lire la question avant de répondre !`],
          sampleQuestions: [
            {
              question: `Pourquoi est-il important de découvrir "${subject}" ?`,
              options: [`Pour apprendre de nouvelles choses passionnantes et progresser`, `C'est inutile`, `Pour perdre du temps`, `Pour rien du tout`],
              correctIndex: 0,
              explanation: `Apprendre ${subject} permet de mieux comprendre le monde et de développer ses connaissances pas à pas.`
            }
          ]
        },
        {
          title: `Les Règles et Secrets Faciles de ${cap}`,
          desc: `Les astuces de Mwalimu pour devenir un champion de ${subject} en s'amusant.`,
          coreConcepts: [`La méthode pas à pas`, `Comment éviter les petits pièges`, `Les exemples à retenir par cœur`, `Mon petit mémo illustré`],
          practicalEx: `Résolution d'un petit problème amusant guidé étape par étape.`,
          formulas: [`Astuce de Mwalimu : La pratique régulière rend fort !`],
          sampleQuestions: [
            {
              question: `Quelle est la meilleure façon de réussir un exercice de ${subject} ?`,
              options: [`Suivre la méthode pas à pas avec calme et attention`, `Répondre au hasard`, `Ne rien lire`, `Abandonner`],
              correctIndex: 0,
              explanation: `Prendre son temps et suivre les étapes permet d'arriver à la bonne réponse sans faire d'erreur.`
            }
          ]
        },
        {
          title: `Exercices et Jeux Pratiques sur ${cap}`,
          desc: `Mettre en pratique ce qu'on a appris avec des petits jeux et des énigmes.`,
          coreConcepts: [`Tester ce qu'on a compris`, `Faire l'exercice avec l'aide de Mwalimu`, `Expliquer avec ses propres mots`, `Fêter ses progrès`],
          practicalEx: `Un jeu de questions-réponses pour valider ses nouvelles compétences.`,
          formulas: [`Formule magique : Observer + Réfléchir = Réussir`],
          sampleQuestions: [
            {
              question: `Quand tu as réussi ton exercice de ${subject}, que dois-tu faire ?`,
              options: [`Vérifier rapidement une dernière fois pour être fier de ton travail`, `Tout effacer`, `Jeter ton cahier`, `Dormir`],
              correctIndex: 0,
              explanation: `Vérifier son travail est le réflexe des meilleurs élèves pour s'assurer d'avoir tout juste.`
            }
          ]
        }
      ]
    };
  }

  if (tier === 'college') {
    return {
      objectives: [
        `Maîtriser les définitions fondamentales et le vocabulaire disciplinaire de ${subject}.`,
        `Apprendre à structurer une démarche d'analyse et résoudre les exercices types du collège.`,
        `Établir des liens entre les notions théoriques et les situations de la vie quotidienne.`,
        `Se préparer efficacement aux évaluations et au contrôle continu.`
      ],
      chapters: [
        {
          title: `Fondements et Vocabulaire Clé de ${cap}`,
          desc: `Définitions rigoureuses, concepts initiaux et cadre général de la discipline.`,
          coreConcepts: [`Définitions normalisées de ${subject}`, `Vocabulaire technique obligatoire`, `Principes de base et premières lois`, `Méthode de lecture d'énoncé`],
          practicalEx: `Étude d'un cas classique permettant d'appliquer directement les définitions du cours.`,
          formulas: [`Propriété fondamentale de ${subject} (niveau Collège)`],
          sampleQuestions: [
            {
              question: `Dans l'étude de "${subject}", quel est le premier réflexe méthodologique ?`,
              options: [`Identifier clairement les données fournies et la question posée`, `Écrire une réponse sans lire`, `Ignorer les définitions`, `Faire une approximation`],
              correctIndex: 0,
              explanation: `Une démarche rigoureuse commence toujours par l'analyse des données de départ et l'identification précise du problème.`
            }
          ]
        },
        {
          title: `Méthodes d'Analyse et Outils Pratiques de ${cap}`,
          desc: `Protocoles, démarches guidées et résolution d'exercices d'application directe.`,
          coreConcepts: [`Étapes de résolution standardisées`, `Utilisation des outils méthodologiques`, `Repérage des erreurs classiques`, `Formulation de la réponse argumentée`],
          practicalEx: `Exercice type pas-à-pas avec application d'une règle de méthode.`,
          formulas: [`Règle méthodologique de déduction`],
          sampleQuestions: [
            {
              question: `Comment valide-t-on la cohérence d'un résultat en ${subject} ?`,
              options: [`En vérifiant qu'il répond à la question et respecte les ordres de grandeur`, `En ne relisant jamais`, `En copiant le voisin`, `En changeant la question`],
              correctIndex: 0,
              explanation: `La vérification de cohérence et la conformité des unités ou termes garantissent l'exactitude de la réponse.`
            }
          ]
        },
        {
          title: `Approfondissement et Synthèse Préparatoire aux Évaluations`,
          desc: `Mise en relation des concepts, synthèse transversale et préparation au brevet/contrôles.`,
          coreConcepts: [`Synthèse des acquis`, `Fiche mémo de révision`, `Résolution d'un problème complet de synthèse`, `Auto-évaluation des compétences`],
          practicalEx: `Sujet de synthèse guidé intégrant l'ensemble des connaissances du module.`,
          formulas: [`Bilan des compétences du chapitre`],
          sampleQuestions: [
            {
              question: `Quel élément garantit une bonne note lors d'une évaluation de ${subject} ?`,
              options: [`La clarté de la rédaction, la justification méthodique et la précision du vocabulaire`, `La longueur du texte uniquement`, `L'écriture illisible`, `L'absence d'arguments`],
              correctIndex: 0,
              explanation: `Les enseignants valorisent particulièrement la précision du vocabulaire et la structure logique de la démonstration.`
            }
          ]
        }
      ]
    };
  }

  if (tier === 'lycee') {
    return {
      objectives: [
        `Acquérir une compréhension théorique approfondie des concepts majeurs de ${subject}.`,
        `Développer une rigueur de raisonnement formalisée adaptée aux exigences du Baccalauréat.`,
        `Maîtriser les protocoles de démonstration, d'analyse critique et de modélisation formelle.`,
        `Résoudre des problèmes complexes enchaînant plusieurs compétences interdisciplinaires.`
      ],
      chapters: [
        {
          title: `Problématique et Cadre Théorique de ${cap}`,
          desc: `Introduction académique, hypothèses fondatrices et formalisation des concepts majeurs.`,
          coreConcepts: [`Problématique centrale de ${subject}`, `Axiomes et définitions formelles`, `Modélisation abstraite du système`, `Hypothèses de validité`],
          practicalEx: `Modélisation d'une situation concrète à travers les concepts théoriques du programme de lycée.`,
          formulas: [`Relation formelle générale : Modèle = f(Variables, Paramètres)`],
          sampleQuestions: [
            {
              question: `Dans le cadre du programme de lycée, quelle est l'exigence première d'une démarche en ${subject} ?`,
              options: [`Formuler des hypothèses explicites et justifier chaque déduction par un théorème ou principe établi`, `Donner un avis personnel non argumenté`, `Utiliser des approximations non quantifiées`, `Omettre les conditions d'application`],
              correctIndex: 0,
              explanation: `L'argumentation formelle et la vérification des hypothèses de départ constituent le cœur des critères d'évaluation du lycée.`
            }
          ]
        },
        {
          title: `Démonstrations, Théorèmes et Propriétés Clés`,
          desc: `Étude analytique poussée, théorèmes fondamentaux et relations de dépendance.`,
          coreConcepts: [`Théorèmes pivots de la discipline`, `Démonstrations types à maîtriser`, `Relations de cause à effet`, `Analyse dimensionnelle et invariances`],
          practicalEx: `Démonstration complète d'une propriété fondamentale avec commentaire pédagogique.`,
          formulas: [`Théorème fondamental de ${subject}`],
          sampleQuestions: [
            {
              question: `Pourquoi est-il crucial de vérifier les conditions d'application d'un théorème ?`,
              options: [`Parce que si les conditions ne sont pas réunies, la conclusion du théorème n'est plus garantie`, `Ce n'est qu'une formalité inutile`, `Pour allonger la copie`, `Pour éviter d'utiliser des formules`],
              correctIndex: 0,
              explanation: `Un théorème n'est valide que dans son domaine d'hypothèses strict : l'absence d'une condition rend le résultat caduc.`
            }
          ]
        },
        {
          title: `Problèmes Types Bac et Études de Cas Approfondies`,
          desc: `Résolution commentée d'exercices complexes avec barème d'évaluation et pièges à éviter.`,
          coreConcepts: [`Méthodologie de décomposition du problème`, `Rédaction rigoureuse et formalisée`, `Critique des résultats obtenus`, `Transfert vers des situations inédites`],
          practicalEx: `Problème de synthèse type épreuve officielle résolu pas-à-pas avec commentaire critique.`,
          formulas: [`Synthèse méthodologique`],
          sampleQuestions: [
            {
              question: `Face à un problème complexe à plusieurs questions de ${subject}, quelle stratégie est recommandée ?`,
              options: [`Repérer l'articulation logique entre les questions et réutiliser les résultats intermédiaires`, `Traiter chaque question sans aucun lien avec les précédentes`, `Ignorer les premières questions`, `Répondre uniquement à la conclusion`],
              correctIndex: 0,
              explanation: `Les sujets d'examen sont construits selon une progression logique où chaque résultat intermédiaire prépare la conclusion finale.`
            }
          ]
        }
      ]
    };
  }

  // University / Master
  return {
    objectives: [
      `Formaliser le cadre axiomatique, théorique et épistémologique de ${subject}.`,
      `Maîtriser les méthodologies de recherche contemporaine, modèles mathématiques et analytiques de pointe.`,
      `Analyser de manière critique l'état de l'art, les controverses académiques et les limites des paradigmes existants.`,
      `Développer des capacités d'investigation autonome, de modélisation avancée et de synthèse scientifique.`
    ],
    chapters: [
      {
        title: `Cadre Épistémologique et Fondements Théoriques de ${cap}`,
        desc: `Genèse des concepts, structuration axiomatique et formalisme contemporain de la discipline.`,
        coreConcepts: [`Épistémologie et histoire conceptuelle de ${subject}`, `Axiomatisation et structures formelles sous-jacentes`, `Paradigmes dominants et controverses méthodologiques`, `Définition des espaces de travail et métriques d'analyse`],
        practicalEx: `Examen critique d'un article fondateur et formalisation des hypothèses restrictives du modèle initial.`,
        formulas: [`Formalisation générale : inf / sup des fonctionnelles caractéristiques`],
        sampleQuestions: [
          {
            question: `Dans la recherche universitaire sur "${subject}", quelle est la fonction principale d'une formalisation axiomatique ?`,
            options: [`Délimiter rigoureusement le champ de validité déductif et éliminer les ambiguïtés sémantiques`, `Rendre le sujet inaccessible`, `Remplacer l'expérimentation concrète`, `Éviter toute confrontation empirique`],
            correctIndex: 0,
            explanation: `L'axiomatisation fournit une base rigoureuse et non contradictoire permettant de déduire l'ensemble des théorèmes du système.`
          }
        ]
      },
      {
        title: `Modélisation Analytique Avancée et Analyse des Cas Limites`,
        desc: `Développements mathématiques/formels de haut niveau, lemmes techniques et régimes asymptotiques.`,
        coreConcepts: [`Dérivation des équations gouvernantes`, `Analyse des singularités et stabilité asymptotique`, `Comportement aux limites et bifurcations`, `Méthodes variationnelles ou empiriques de calibration`],
        practicalEx: `Résolution analytique complète d'un modèle non-linéaire avec étude de sensibilité aux conditions aux limites.`,
        formulas: [`Système d'équations fondamentales et conditions de régularité`],
        sampleQuestions: [
          {
            question: `Quelle propriété caractérise un régime asymptotique dans un modèle de ${subject} ?`,
            options: [`Le comportement vers lequel tend le système lorsque l'un des paramètres devient arbitrairement grand ou petit`, `Une solution temporaire fausse`, `L'absence de solution mathématique`, `Une valeur moyenne constante`],
            correctIndex: 0,
            explanation: `L'analyse asymptotique permet d'extraire les lois d'échelle et les invariants directeurs aux limites du domaine de définition.`
          }
        ]
      },
      {
        title: `État de l'Art, Débats Scientifiques et Perspectives de Recherche`,
        desc: `Synthèse critique des publications récentes, questions ouvertes et applications de pointe.`,
        coreConcepts: [`Revue critique de la littérature scientifique`, `Problématiques ouvertes et impasses actuelles`, `Interdisciplinarité et convergence technologique`, `Protocoles d'expérimentation et d'évaluation par les pairs`],
        practicalEx: `Élaboration d'une proposition de recherche originale visant à dépasser les limites d'un modèle établi.`,
        formulas: [`Synthèse bibliographique et critères d'évaluation`],
        sampleQuestions: [
          {
            question: `Comment valide-t-on une avancée théorique ou empirique dans la recherche académique en ${subject} ?`,
            options: [`Par l'évaluation par les pairs (peer-review), la reproductibilité des résultats et la confrontation critique aux données`, `Par un vote de popularité en ligne`, `Par la réputation de l'auteur uniquement`, `Sans aucune vérification externe`],
            correctIndex: 0,
            explanation: `Le processus de peer-review et la reproductibilité constituent le socle de la validation scientifique moderne.`
          }
        ]
      }
    ]
  };
}
