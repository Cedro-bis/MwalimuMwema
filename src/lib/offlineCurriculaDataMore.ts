/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubjectKnowledgeTier } from "./offlineCurriculaData";

export const ADDITIONAL_SUBJECT_TIERS: SubjectKnowledgeTier[] = [
  // =================================================================
  // 4. SCIENCES DE LA VIE ET DE LA TERRE (SVT) / BIOLOGIE
  // =================================================================
  {
    domainName: "Sciences de la Vie et de la Terre",
    keywords: ["svt", "biologie", "vivant", "corps", "animaux", "plantes", "cellule", "adn", "genetique", "geologie", "volcan", "ecosysteme"],
    tiers: {
      primary: {
        objectives: [
          "Découvrir le monde du vivant : les animaux, les plantes et leurs besoins vitaux.",
          "Comprendre le corps humain, les 5 sens et l'importance d'une bonne alimentation.",
          "Observer le cycle de vie des végétaux : de la graine à la plante.",
          "Prendre soin de notre planète et de la biodiversité."
        ],
        chapters: [
          {
            title: "Le Corps Humain, les 5 Sens et la Santé",
            desc: "Découvrir la vue, l'ouïe, l'odorat, le goût, le toucher, et comment grandir en bonne santé.",
            coreConcepts: ["Les 5 sens et leurs organes", "Les os et les muscles qui nous font bouger", "Manger équilibré et bien dormir", "L'hygiène : se laver les mains"],
            practicalEx: "Expérience du goût : reconnaître les yeux fermés la saveur sucrée, salée ou acide d'un aliment.",
            formulas: ["5 Sens : Yeux (Vue), Oreilles (Ouïe), Nez (Odorat), Langue (Goût), Peau (Toucher)"],
            sampleQuestions: [
              {
                question: "Quel organe permet d'entendre les sons et la musique ?",
                options: ["Les yeux", "Les oreilles", "Le nez", "La bouche"],
                correctIndex: 1,
                explanation: "Les oreilles sont les organes du sens de l'ouïe qui captent les sons."
              }
            ]
          },
          {
            title: "Les Animaux et leurs Milieux de Vie",
            desc: "Comment les animaux se déplacent, se nourrissent et élèvent leurs petits.",
            coreConcepts: ["Herbivores, carnivores et omnivores", "Ceux qui nagent, volent, courent ou rampent", "Les animaux ovipares (œufs) et vivipares (ventre de la maman)", "La chaîne alimentaire simple"],
            practicalEx: "L'herbe est mangée par le lapin, qui est mangé par le renard.",
            formulas: ["Plante -> Herbivore -> Carnivore"],
            sampleQuestions: [
              {
                question: "Un animal qui ne mange que des plantes et de l'herbe est un :",
                options: ["Carnivore", "Herbivore", "Piscivore", "Omnivore"],
                correctIndex: 1,
                explanation: "Un animal herbivore se nourrit exclusivement de végétaux (comme la vache ou le lapin)."
              }
            ]
          },
          {
            title: "La Vie des Plantes : De la Graine à la Fleur",
            desc: "Faire germer une graine et comprendre ce dont une plante a besoin pour vivre.",
            coreConcepts: ["De quoi a besoin la graine : eau, chaleur, terre et lumière", "Les racines, la tige et les feuilles", "La photosynthèse expliquée simplement (la plante fabrique sa nourriture avec le soleil)", "Les abeilles et la pollinisation"],
            practicalEx: "Planter un haricot dans du coton humide et observer la petite racine blanche sortir après 3 jours.",
            formulas: ["Graine + Eau + Lumière + Chaleur = Belle plante verte"],
            sampleQuestions: [
              {
                question: "Que boit une plante grâce à ses racines enfoncées dans la terre ?",
                options: ["Du lait", "De l'eau et des minéraux", "De l'huile", "Du soda"],
                correctIndex: 1,
                explanation: "Les racines absorbent l'eau et les sels minéraux de la terre pour nourrir toute la plante."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Observer et décrire la structure de la cellule végétale et animale au microscope.",
          "Comprendre la reproduction sexuée, la puberté et les chromosomes/gènes.",
          "Expliquer la tectonique des plaques, les séismes et les éruptions volcaniques.",
          "Analyser le fonctionnement du système nerveux et de la circulation sanguine."
        ],
        chapters: [
          {
            title: "La Cellule : Unité Fondamentale du Vivant",
            desc: "Observation microscopique, membrane, cytoplasme, noyau et diversité cellulaire.",
            coreConcepts: ["La théorie cellulaire", "Membrane plasmique, cytoplasme et noyau", "Cellules végétales avec paroi et chloroplastes", "Organismes unicellulaires et pluricellulaires"],
            practicalEx: "Préparation et coloration au bleu de méthylène d'une fine pelure d'oignon observée au microscope grossissement ×400.",
            formulas: ["Grossissement total = Grossissement oculaire × Grossissement objectif"],
            sampleQuestions: [
              {
                question: "Quelle partie de la cellule renferme l'information génétique ?",
                options: ["La membrane", "Le noyau", "Le cytoplasme", "La vacuole"],
                correctIndex: 1,
                explanation: "Le noyau cellulaire contient l'ADN et les chromosomes porteurs des gènes."
              }
            ]
          },
          {
            title: "Génétique et Hérédité : Chromosomes et Caractères",
            desc: "Transmission de l'information génétique, caryotype humain, allèles et diversité.",
            coreConcepts: ["Caryotype humain : 23 paires de chromosomes (46 chromosomes)", "Paire 23 déterminant le sexe (XX pour une fille, XY pour un garçon)", "Les gènes portés par les chromosomes et leurs versions (allèles)", "Allèles dominants et récessifs"],
            practicalEx: "Transmission des groupes sanguins ABO : un enfant reçoit un allèle de son père et un allèle de sa mère.",
            formulas: ["Caryotype humain = 2n = 46 chromosomes (23 paires)"],
            sampleQuestions: [
              {
                question: "Combien de paires de chromosomes comporte une cellule humaine ordinaire ?",
                options: ["12 paires", "23 paires", "46 paires", "100 paires"],
                correctIndex: 1,
                explanation: "Une cellule humaine normale contient 23 paires de chromosomes, soit 46 chromosomes au total."
              }
            ]
          },
          {
            title: "Tectonique des Plaques, Séismes et Volcanisme",
            desc: "La lithosphère découpée en plaques en mouvement, subduction, dorsales océaniques et failles.",
            coreConcepts: ["Plaques lithosphériques flottant sur l'asthénosphère", "Mouvements de divergence (dorsales) et de convergence (subduction/collision)", "Ondes sismiques (ondes P et S) mesurées par sismographe", "Volcanisme effusif (lave fluide) et explosif (nuées ardentes)"],
            practicalEx: "Localisation des séismes et volcans le long de la 'Ceinture de feu du Pacifique'.",
            formulas: ["Vitesse de déplacement des plaques ~ quelques centimètres par an"],
            sampleQuestions: [
              {
                question: "Où se produit la création de nouvelle croûte océanique ?",
                options: ["Au niveau des fosses de subduction", "Au niveau des dorsales océaniques", "Au sommet des hautes montagnes", "Au centre des continents"],
                correctIndex: 1,
                explanation: "Le magma remonte au niveau des dorsales médio-océaniques pour créer le plancher océanique."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Décortiquer la structure moléculaire de l'ADN, la réplication semi-conservative et la transcription/traduction.",
          "Étudier la méiose, le brassage génétique inter/intrachromosomique et les mutations.",
          "Analyser le système immunitaire adaptatif et inné (anticorps, lymphocytes B et T).",
          "Comprendre le climat global, le bilan radiatif terrestre et le cycle du carbone."
        ],
        chapters: [
          {
            title: "Génétique Moléculaire : Réplication de l'ADN et Expression Génique",
            desc: "Double hélice d'ADN, complémentarité des bases azotées, transcription en ARNm et code génétique.",
            coreConcepts: ["Structure en double hélice (A-T, G-C)", "Réplication semi-conservative par l'ADN polymérase", "Transcription nucléaire de l'ADN en ARN messager (A-U, G-C)", "Traduction dans le cytoplasme par les ribosomes et code génétique universel et redondant"],
            practicalEx: "Traduire le codon AUG en Méthionine et repérer les codons STOP (UAA, UAG, UGA).",
            formulas: ["ADN (transcription) -> ARNm (traduction) -> Protéine (chaîne d'acides aminés)"],
            sampleQuestions: [
              {
                question: "Dans l'ARN messager, quelle base azotée remplace la Thymine (T) présente dans l'ADN ?",
                options: ["L'Uracile (U)", "La Guanine (G)", "La Cytosine (C)", "L'Adénine (A)"],
                correctIndex: 0,
                explanation: "L'ARN contient de l'uracile (U) à la place de la thymine (T)."
              }
            ]
          },
          {
            title: "Méiose, Brassages Génétiques et Diversité des Génomes",
            desc: "Division réductionnelle et équationnelle, crossing-over et fécondation aléatoire.",
            coreConcepts: ["Les 2 divisions successives de la méiose (cellule diploïde 2n -> 4 gamètes haploïdes n)", "Brassage intrachromosomique lors de la prophase I (crossing-over)", "Brassage interchromosomique en anaphase I", "Fécondation amplifiant la diversité génétique des descendants"],
            practicalEx: "Calcul de la proportion de recombinaison génétique entre deux gènes liés distants.",
            formulas: ["Diversité potentielle gamètes = 2^n (avec n = 23 pour l'humain, soit > 8 millions de combinaisons)"],
            sampleQuestions: [
              {
                question: "Le crossing-over (enjambement de chromatides homologues) intervient au cours de quelle phase ?",
                options: ["La télophase II", "La prophase I de la méiose", "L'anaphase II", "L'interphase"],
                correctIndex: 1,
                explanation: "Le crossing-over se produit lors de l'appariement des chromosomes homologues en prophase I."
              }
            ]
          },
          {
            title: "Immunologie : Réponses Immunitaires Innée et Adaptative",
            desc: "Phagocytose, réaction inflammatoire, sélection clonale des lymphocytes B et T, et mémoire immunitaire.",
            coreConcepts: ["Réaction inflammatoire aiguë et cellules sentinelles (mastocytes, macrophages)", "Médiateurs chimiques : histamine et prostaglandines", "Immunité adaptative : lymphocytes B producteurs d'anticorps spécifiques", "Lymphocytes T CD8 cytotoxiques et principe de la vaccination (cellules mémoires)"],
            practicalEx: "Mécanisme d'action d'un vaccin : induction de plasmocytes mémoires sans déclencher la maladie.",
            formulas: ["Antigène + Anticorps spécifique = Complexe immun"],
            sampleQuestions: [
              {
                question: "Quelles cellules sécrètent les anticorps circulants dans le sang ?",
                options: ["Les globules rouges", "Les plasmocytes (lymphocytes B activés)", "Les plaquettes", "Les neurones"],
                correctIndex: 1,
                explanation: "Les lymphocytes B se différencient en plasmocytes qui synthétisent et libèrent massivement des anticorps."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Explorer la biologie moléculaire approfondie : régulation de la chromatine et signalisation intracellulaire.",
          "Modéliser la dynamique des populations, génétique quantitative et équilibre de Hardy-Weinberg.",
          "Comprendre la neurobiologie fonctionnelle : potentiels d'action, synapses chimiques et plasticité cérébrale.",
          "Analyser l'écologie évolutive, sélection sexuelle et phylogénie cladistique."
        ],
        chapters: [
          {
            title: "Biologie Cellulaire & Voies de Signalisation Intracellulaire",
            desc: "Récepteurs couplés aux protéines G (GPCR), cascades de kinases (MAPK) et trafic vésiculaire.",
            coreConcepts: ["Seconds messagers : AMPc, IP3, DAG et ions Ca²⁺", "Récepteurs tyrosines kinases et voie Ras/Raf/MEK/ERK", "Trafic vésiculaire : manteaux COP I, COP II, clathrine et protéines SNARE", "Voies d'induction de l'apoptose (caspases dépendantes)"],
            practicalEx: "Cascade d'activation de la glycogénolyse hépatique induite par l'adrénaline via l'AMPc et la PKA.",
            formulas: ["Équation de Michaelis-Menten : v = (V_max [S]) / (K_m + [S])"],
            sampleQuestions: [
              {
                question: "Quel rôle jouent les protéines SNARE dans la cellule ?",
                options: ["La transcription de l'ADN", "La fusion spécifique des vésicules avec la membrane cible", "La dégradation des lipides", "La synthèse des ribosomes"],
                correctIndex: 1,
                explanation: "Les complexes SNARE (v-SNARE et t-SNARE) catalysent la fusion membranaire des vésicules de transport."
              }
            ]
          },
          {
            title: "Génétique des Populations et Évolution Moléculaire",
            desc: "Loi de Hardy-Weinberg, dérive génétique, sélection naturelle et horloge moléculaire.",
            coreConcepts: ["Équilibre panmictique de Hardy-Weinberg p² + 2pq + q² = 1", "Dérive génétique stochastique et goulots d'étranglement", "Coefficients de sélection s et fitness relative w", "Théorie neutraliste de l'évolution moléculaire de Motoo Kimura"],
            practicalEx: "Calcul des fréquences alléliques et du taux d'hétérozygotie attendu dans une population isolée.",
            formulas: ["p² + 2pq + q² = 1", "Delta q = (pq / overline{w}) (w_q - overline{w})"],
            sampleQuestions: [
              {
                question: "Dans une population panmictique idéale à l'équilibre de Hardy-Weinberg, la fréquence d'un allèle récessif q = 0,3. Quelle est la fréquence des hétérozygotes (2pq) ?",
                options: ["0,09", "0,42", "0,49", "0,21"],
                correctIndex: 1,
                explanation: "Si q = 0,3 alors p = 1 - 0,3 = 0,7. La proportion d'hétérozygotes vaut 2pq = 2 × 0,7 × 0,3 = 0,42."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Maîtriser les technologies de génomique fonctionnelle, épigénétique et édition génomique CRISPR-Cas9/Prime Editing.",
          "Analyser les réseaux biologiques complexes par la biologie des systèmes et modélisation mathématique.",
          "Approfondir les mécanismes de cancérogénèse : oncogènes, suppresseurs de tumeurs et immunothérapie.",
          "Concevoir des protocoles de biologie synthétique et ingénierie métabolique avancée."
        ],
        chapters: [
          {
            title: "Épigénétique Avancée & Remodelage de la Chromatine",
            desc: "Méthylation des îlots CpG, code des histones, ARN non codants et reprogrammation cellulaire.",
            coreConcepts: ["DNA Méthyltransférases (DNMT1, DNMT3A/B) et déméthylation via enzymes TET", "Modifications post-traductionnelles des histones (acétylation HAT/HDAC, méthylation HMT/KDM)", "Compaction en hétérochromatine constitutive vs facultative", "Reprogrammation des cellules souches pluripotentes induites (facteurs de Yamanaka)"],
            practicalEx: "Analyse par séquençage au bisulfite (Bisulfite-seq) du statut de méthylation d'un promoteur oncogénique.",
            formulas: ["Inactivation du chromosome X via l'ARN lncRNA XIST"],
            sampleQuestions: [
              {
                question: "Quel effet a généralement l'hyperacétylation des queues d'histones sur la transcription génique ?",
                options: ["Elle réprime fortement l'expression génique", "Elle favorise une chromatine ouverte (euchromatine) et active la transcription", "Elle détruit l'ADN", "Elle bloque la réplication"],
                correctIndex: 1,
                explanation: "L'acétylation neutralise les charges positives des résidus lysine, réduisant l'affinité pour l'ADN chargé négativement, ce qui décompacte la chromatine et permet l'accès aux facteurs de transcription."
              }
            ]
          },
          {
            title: "Oncologie Moléculaire et Mécanismes de Résistance Thérapeutique",
            desc: "Hallmarks du cancer, instabilité génomique, angiogenèse tumorale et checkpoints immunitaires (PD-1/PD-L1).",
            coreConcepts: ["Mutations conductrices (driver) vs passagères (passenger)", "Dérégulation du cycle cellulaire (p53, Rb) et échappement à l'apoptose", "Échappement tumoral au système immunitaire et anticorps monoclonaux anti-CTLA-4 et anti-PD-1", "Hétérogénéité clonale tumorale et résistance acquise aux thérapies ciblées"],
            practicalEx: "Mécanismes de résistance secondaire aux inhibiteurs de tyrosine kinase de l'EGFR dans l'adénocarcinome pulmonaire.",
            formulas: ["Inhibition des checkpoints immunitaires : Blocage de PD-1 restaurant l'activité lytique des lymphocytes T"],
            sampleQuestions: [
              {
                question: "Quelle protéine est surnommée le 'gardien du génome' en raison de son rôle crucial dans l'arrêt du cycle cellulaire et l'apoptose en cas de dommage à l'ADN ?",
                options: ["p53", "L'insuline", "La tubuline", "Le collagène"],
                correctIndex: 0,
                explanation: "La protéine p53 (gène TP53) est un facteur de transcription suppresseur de tumeurs clé activé en réponse aux stress génotoxiques."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  // 5. FRANÇAIS ET LITTÉRATURE
  // =================================================================
  {
    domainName: "Français et Littérature",
    keywords: ["francais", "litterature", "grammaire", "conjugaison", "orthographe", "vocabulaire", "poesie", "theatre", "roman", "dissertation", "commentaire"],
    tiers: {
      primary: {
        objectives: [
          "Identifier les éléments d'une phrase (majuscule, point, sujet, verbe).",
          "Conjuguer les verbes usuels au présent, au futur et au passé composé.",
          "Accorder le nom, le déterminant et l'adjectif dans le groupe nominal.",
          "Lire avec plaisir des contes, poésies et rédiger de petits récits."
        ],
        chapters: [
          {
            title: "La Phrase, le Sujet et le Verbe",
            desc: "Comment construire une phrase qui a du sens : qui fait l'action et que fait-il ?",
            coreConcepts: ["La phrase commence par une majuscule et finit par un point", "Le verbe : le mot qui exprime l'action", "Le sujet : qui fait l'action ? (poser la question 'qui est-ce qui ?')", "Les types de phrases : déclarative, interrogative et exclamative"],
            practicalEx: "Dans la phrase 'Le petit chat boit du lait', qui boit ? 'Le petit chat' est le sujet, 'boit' est le verbe.",
            formulas: ["Sujet + Verbe + Complément = Phrase correcte"],
            sampleQuestions: [
              {
                question: "Dans la phrase 'Les enfants jouent dans la cour', quel est le verbe ?",
                options: ["Les enfants", "jouent", "dans", "la cour"],
                correctIndex: 1,
                explanation: "'jouent' est le verbe d'action (verbe jouer au présent)."
              }
            ]
          },
          {
            title: "Le Groupe Nominal et les Accords : Masculin, Féminin, Singulier et Pluriel",
            desc: "Accorder comme un champion le déterminant, le nom et l'adjectif qualificatif.",
            coreConcepts: ["Le nom d'objet, d'animal ou de personne", "Les déterminants (le, la, les, un, une, des)", "L'adjectif qui donne des détails sur le nom", "La marque du pluriel (le 's') et du féminin (le 'e')"],
            practicalEx: "Un chat noir -> Des chat**s** noir**s** (on ajoute un s au nom et à l'adjectif au pluriel).",
            formulas: ["Nom au pluriel = on ajoute souvent un 's'"],
            sampleQuestions: [
              {
                question: "Quelle est l'écriture correcte au pluriel de 'une belle fleur' ?",
                options: ["des belle fleurs", "des belles fleurs", "des belles fleur", "les belle fleur"],
                correctIndex: 1,
                explanation: "Au pluriel, l'adjectif et le nom s'accordent avec un 's' : des belles fleurs."
              }
            ]
          },
          {
            title: "Conjugaison : Le Présent des Verbes du 1er Groupe (-ER)",
            desc: "Apprendre par cœur les terminaisons du présent de l'indicatif : -e, -es, -e, -ons, -ez, -ent.",
            coreConcepts: ["Le radical et la terminaison", "Je mange (-e), Tu manges (-es), Il/Elle mange (-e)", "Nous mangeons (-ons), Vous mangez (-ez), Ils/Elles mangent (-ent)", "Les verbes Être et Avoir au présent"],
            practicalEx: "Conjuguer le verbe chanter avec 'tu' : Tu chant**es**.",
            formulas: ["Terminaisons verbes en -ER : -e, -es, -e, -ons, -ez, -ent"],
            sampleQuestions: [
              {
                question: "Quelle est la bonne terminaison avec 'nous' au présent pour le verbe parler ?",
                options: ["Nous parlent", "Nous parlons", "Nous parlez", "Nous parlonses"],
                correctIndex: 1,
                explanation: "Avec 'nous', la terminaison du présent est toujours '-ons' : Nous parlons."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Maîtriser les valeurs des temps du passé (imparfait vs passé simple) dans le récit.",
          "Analyser la structure de la phrase complexe (propositions subordonnées relatives et conjonctives).",
          "Étudier les genres littéraires majeurs : théâtre classique (Molière), poésie et roman d'aventures.",
          "Rédiger un paragraphe argumenté structuré avec des connecteurs logiques."
        ],
        chapters: [
          {
            title: "Le Récit au Passé : Imparfait et Passé Simple",
            desc: "Distinguer le décor et les actions de premier plan dans une narration littéraire.",
            coreConcepts: ["L'imparfait pour la description, les actions habituelles ou inachevées", "Le passé simple pour les actions soudaines, brèves et délimitées", "Conjugaison des verbes du 3e groupe au passé simple", "L'accord du participe passé avec être et avoir"],
            practicalEx: "'Il dormait (imparfait, second plan) quand soudain un grand bruit retentit (passé simple, premier plan).'",
            formulas: ["Imparfait = Décor & Durée / Passé simple = Action brève & Rupture"],
            sampleQuestions: [
              {
                question: "Dans un récit au passé, quel temps emploie-t-on pour décrire le paysage ou la météo ?",
                options: ["Le passé simple", "L'imparfait", "Le futur antérieur", "Le présent"],
                correctIndex: 1,
                explanation: "L'imparfait exprime l'arrière-plan, la description et les circonstances d'une scène."
              }
            ]
          },
          {
            title: "La Phrase Complexe et les Propositions Subordonnées",
            desc: "Juxtaposition, coordination et subordination (relatives, conjonctives et circonstancielles).",
            coreConcepts: ["Propositions indépendantes coordonnées par conjonctions (mais, ou, et, donc, or, ni, car)", "La subordonnée relative introduite par qui, que, quoi, dont, où", "Les subordonnées circonstancielles de cause, conséquence, but et temps", "La concordance des temps"],
            practicalEx: "La maison [que mon grand-père a bâtie] (subordonnée relative introduite par 'que', antécédent 'maison').",
            formulas: ["Mais Ou Et Donc Or Ni Car (conjonctions de coordination)"],
            sampleQuestions: [
              {
                question: "Quel pronom relatif remplace un complément introduit par la préposition 'de' (ex: parler de...) ?",
                options: ["Qui", "Que", "Dont", "Où"],
                correctIndex: 2,
                explanation: "'Dont' remplace un nom ou groupe nominal introduit par 'de' (Le livre dont je parle)."
              }
            ]
          },
          {
            title: "Le Théâtre et la Comédie : Texte et Représentation (Molière)",
            desc: "Didascalies, répliques, tirades, apartés, quiproquos et ressorts comiques.",
            coreConcepts: ["Double énonciation théâtrale (les personnages se parlent, l'auteur s'adresse au public)", "Les 4 types de comique : geste, mots, situation et caractère", "La règle classique des trois unités (temps, lieu, action)", "Le rôle satirique de la comédie ('castigat ridendo mores')"],
            practicalEx: "Analyse du comique de répétition dans 'Les Fourberies de Scapin' de Molière : 'Mais que diable allait-il faire dans cette galère ?'",
            formulas: ["Double énonciation : Personnage A -> Personnage B ET Personnage A -> Spectateur"],
            sampleQuestions: [
              {
                question: "Comment appelle-t-on une parole prononcée par un comédien à l'attention exclusive du public, que les autres personnages sont censés ne pas entendre ?",
                options: ["Une tirade", "Un aparté", "Une didascalie", "Un monologue"],
                correctIndex: 1,
                explanation: "Un aparté est une convention théâtrale où le personnage s'adresse aux spectateurs à l'insu des autres protagonistes."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Maîtriser la méthodologie du Commentaire Littéraire et de la Dissertation pour le Bac.",
          "Parcourir les grands mouvements littéraires : Humanisme, Lumières, Romantisme, Réalisme, Surréalisme.",
          "Analyser finement les figures de style, le rythme poétique, la métrique et les registres littéraires.",
          "Développer une pensée critique argumentée et contextualisée dans l'histoire des idées."
        ],
        chapters: [
          {
            title: "Méthodologie du Commentaire Composé et Analyse Littéraire",
            desc: "De la lecture linéaire au plan analytique en 2 ou 3 axes : citation, procédé formel et interprétation.",
            coreConcepts: ["Lecture attentive et repérage des champs lexicaux, figures de style et tonalités", "Problématique littéraire articulée autour de l'enjeu esthétique du texte", "Structure d'un paragraphe de commentaire : Idée directrice -> Citation -> Analyse du procédé stylistique -> Interprétation", "Les registres littéraires (tragique, lyrique, pathétique, satirique, polémique)"],
            practicalEx: "Analyse d'une strophe de Baudelaire dans Les Fleurs du Mal : montrer comment l'antithèse et la métaphore filée traduisent le déchirement entre le Spleen et l'Idéal.",
            formulas: ["Citation + Procédé Formel (figure, syntaxe) = Interprétation Sensée"],
            sampleQuestions: [
              {
                question: "Quelle figure de style consiste à attribuer des comportements ou sentiments humains à un objet ou à un animal inanimé ?",
                options: ["L'oxymore", "La personnification", "La métonymie", "L'hyperbole"],
                correctIndex: 1,
                explanation: "La personnification prête des caractéristiques humaines à un élément non humain."
              }
            ]
          },
          {
            title: "Les Lumières et le Combat Contre l'Obscurantisme (XVIIIe Siècle)",
            desc: "Voltaire, Rousseau, Diderot, Montesquieu : l'Encyclopédie, le conte philosophique et l'ironie.",
            coreConcepts: ["L'esprit des Lumières : émancipation par la raison et la science (Kant : 'Sapere aude')", "L'ironie voltairienne comme arme argumentative dans Candide et Zadig", "L'Encyclopédie de Diderot et d'Alembert : diffusion du savoir et critique de l'absolutisme", "La réflexion politique sur la séparation des pouvoirs (Montesquieu) et le contrat social (Rousseau)"],
            practicalEx: "Étude du chapitre 19 de Candide ('Le nègre de Surinam') : dénonciation de l'esclavage par l'ironie cinglante.",
            formulas: ["Ironie = Dire le contraire de ce qu'on veut faire penser pour créer un décalage critique"],
            sampleQuestions: [
              {
                question: "Qui est l'auteur des célèbres 'Lettres persanes' dénonçant les travers de la société française sous le regard d'étrangers ?",
                options: ["Voltaire", "Montesquieu", "Diderot", "Rousseau"],
                correctIndex: 1,
                explanation: "Montesquieu publie anonymement les Lettres persanes en 1721."
              }
            ]
          },
          {
            title: "Le Romantisme et le Lyrisme Poétique au XIXe Siècle",
            desc: "Victor Hugo, Lamartine, Musset : expression du moi, mélancolie, nature bienveillante et engagement.",
            coreConcepts: ["Le 'mal du siècle' et l'angoisse existentielle face au temps qui passe", "L'effusion lyrique et l'expression subjective des passions intimes", "Le poète comme prophète et éclaireur de l'humanité (Hugo)", "La rupture avec le classicisme (Préface de Cromwell et bataille d'Hernani)"],
            practicalEx: "Commentaire du poème 'Le Lac' d'Alphonse de Lamartine : 'Ô temps ! suspends ton vol...'.",
            formulas: ["Alexandrin : Vers de 12 syllabes avec césure à l'hémistiche (6 // 6)"],
            sampleQuestions: [
              {
                question: "Quel poème célèbre de Victor Hugo commence par le vers : 'Demain, dès l'aube, à l'heure où blanchit la campagne...' ?",
                options: ["Booz endormi", "Demain dès l'aube (Les Contemplations)", "Oceano Nox", "La Saison des semailles"],
                correctIndex: 1,
                explanation: "Ce chef-d'œuvre élégiaque est dédié à la mémoire de sa fille Léopoldine disparue tragiquement."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Maîtriser les théories de la narratologie (Genette), sémiotique et linguistique textuelle.",
          "Analyser l'histoire des formes littéraires et l'esthétique de la réception (Jauss).",
          "Conduire une étude stylistique formelle approfondie sur les textes des XVIe au XXe siècles.",
          "Étudier la littérature comparée et les transferts culturels transnationaux."
        ],
        chapters: [
          {
            title: "Théorie du Récit & Narratologie de Gérard Genette",
            desc: "Voix narrative, focalisation (zéro, interne, externe), ordre, durée (ellipse, scène, pause) et fréquence.",
            coreConcepts: ["Distinction histoire, récit et narration", "Focalisation interne, externe et zéro (narrateur omniscient)", "Anachronies narratives : analepse (retour en arrière) et prolepses (anticipation)", "Typologie du narrateur : intradiégétique vs extradiégétique, homodiégétique vs hétérodiégétique"],
            practicalEx: "Analyse des distorsions temporelles et de la polyphonie énonciative dans 'À la recherche du temps perdu' de Marcel Proust.",
            formulas: ["Récit = Histoire (signifié narratif) racontée par un Narrateur (acte énonciatif)"],
            sampleQuestions: [
              {
                question: "Selon la typologie de Gérard Genette, comment qualifie-t-on un narrateur qui est lui-même un personnage au sein de l'histoire qu'il raconte ?",
                options: ["Extradiégétique-hétérodiégétique", "Homodiégétique", "Omniscient", "Focalisé zéro"],
                correctIndex: 1,
                explanation: "Un narrateur homodiégétique est présent comme personnage dans l'univers diégétique de l'histoire."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Pratiquer la génétique textuelle (analyse des manuscrits, ratures, variantes d'auteur).",
          "Mobiliser les théories critiques contemporaines (déconstruction, post-colonialisme, écocritique).",
          "Conduire des recherches heuristiques autonomes dans les fonds d'archives et bases numériques.",
          "Rédiger un mémoire de recherche respectant les standards académiques et épistémologiques."
        ],
        chapters: [
          {
            title: "Génétique Textuelle & Philologie Moderne",
            desc: "Exploration des avant-textes, dossiers génétiques, manuscrits de travail et variantes éditoriales.",
            coreConcepts: ["L'avant-texte selon Jean Bellemin-Noël", "Protocoles de transcription diplomatique et critique des manuscrits", "Phases de la genèse : pré-rédactionnelle (plans, notes), rédactionnelle (brouillons) et pré-éditoriale (épreuves corrigées)", "Poétique du brouillon et dynamique de l'écriture en train de se faire"],
            practicalEx: "Étude comparative des états successifs des brouillons de 'Madame Bovary' de Flaubert montrant le travail de suppression des métaphores faciles.",
            formulas: ["Dossier génétique = Plans + Carnets + Brouillons d'atelier + Mises au net + Épreuves"],
            sampleQuestions: [
              {
                question: "Quelle discipline littéraire se consacre à l'étude des manuscrits d'auteurs pour reconstituer le processus dynamique de création d'une œuvre ?",
                options: ["La génétique textuelle", "La paléographie juridique", "La sociolinguistique", "La prosodie métrique"],
                correctIndex: 0,
                explanation: "La génétique textuelle analyse les traces matérielles (brouillons, carnets, ratures) témoignant de l'élaboration de l'œuvre."
              }
            ]
          }
        ]
      }
    }
  }
];
