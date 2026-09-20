/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubjectKnowledgeTier } from "./offlineCurriculaData";

export const EXTENDED_SUBJECT_TIERS: SubjectKnowledgeTier[] = [
  // =================================================================
  // 6. HISTOIRE
  // =================================================================
  {
    domainName: "Histoire",
    keywords: ["histoire", "histoire-geographie", "antiquite", "moyen age", "renaissance", "revolution", "guerre", "siecle", "empire", "epoque"],
    tiers: {
      primary: {
        objectives: [
          "Découvrir la frise chronologique et les 5 grandes périodes de l'Histoire.",
          "Comprendre le mode de vie des hommes de la Préhistoire et de l'Antiquité (Gaulois et Romains).",
          "Explorer le Moyen Âge : les châteaux forts, les chevaliers et les paysans.",
          "Découvrir la Révolution française et la naissance des symboles républicains."
        ],
        chapters: [
          {
            title: "La Frise du Temps et les Grandes Périodes de l'Histoire",
            desc: "Se repérer dans le temps : de la Préhistoire jusqu'à notre époque contemporaine.",
            coreConcepts: [
              "La Préhistoire (apparition de l'Homme, grottes de Lascaux)",
              "L'Antiquité (invention de l'écriture en -3000)",
              "Le Moyen Âge (chute de Rome en 476 jusqu'en 1492)",
              "Les Temps Modernes et l'Époque Contemporaine (1789 à nos jours)"
            ],
            practicalEx: "Placer sur la frise chronologique l'invention de l'écriture (-3000), la découverte de l'Amérique (1492) et la Révolution française (1789).",
            formulas: ["5 Périodes : Préhistoire -> Antiquité -> Moyen Âge -> Temps Modernes -> Époque Contemporaine"],
            sampleQuestions: [
              {
                question: "Quel événement marque traditionnellement la fin de la Préhistoire et le début de l'Histoire ?",
                options: ["L'invention de l'écriture", "La découverte du feu", "La construction des châteaux", "L'électricité"],
                correctIndex: 0,
                explanation: "L'invention de l'écriture vers -3000 avant J.-C. en Mésopotamie marque le début de l'Histoire car les humains ont laissé des traces écrites."
              }
            ]
          },
          {
            title: "L'Antiquité : Gaulois et Gallo-Romains",
            desc: "Vercingétorix, Jules César, la romanisation de la Gaule, les arènes et les aqueducs.",
            coreConcepts: [
              "Les Gaulois : artisans habiles, agriculteurs et guerriers",
              "La guerre des Gaules et la bataille d'Alésia (-52 av. J.-C.)",
              "La paix romaine (Pax Romana) et le mode de vie gallo-romain",
              "Les monuments : aqueducs (Pont du Gard), amphithéâtres et thermes"
            ],
            practicalEx: "À quoi servait le Pont du Gard ? Solution : À acheminer l'eau potable des sources de montagne jusqu'à la ville romaine de Nîmes.",
            formulas: ["Gaule celtique + Conquête romaine = Civilisation Gallo-Romaine"],
            sampleQuestions: [
              {
                question: "Qui était le jeune chef gaulois qui a uni les tribus contre Jules César à Alésia ?",
                options: ["Vercingétorix", "Clovis", "Charlemagne", "Astérix"],
                correctIndex: 0,
                explanation: "Vercingétorix est le chef arverne qui a mené la résistance gauloise avant de se rendre à Alésia en 52 av. J.-C."
              }
            ]
          },
          {
            title: "Le Moyen Âge : Seigneurs, Châteaux Forts et Chevaliers",
            desc: "La vie quotidienne au château, le code d'honneur de la chevalerie et le travail des paysans.",
            coreConcepts: [
              "Le château fort et sa défense (fossé, pont-levis, donjon, meurtrières)",
              "Les seigneurs et l'adoubement des chevaliers",
              "La vie des paysans (serfs et vilains) et les corvées",
              "La foi chrétienne et la construction des cathédrales gothiques"
            ],
            practicalEx: "Décrire les étapes pour devenir chevalier : page à 7 ans, écuyer à 14 ans, puis cérémonie de l'adoubement à 20 ans.",
            formulas: ["Société médiévale : Ceux qui prient (clergé), ceux qui combattent (noblesse), ceux qui travaillent (paysans)"],
            sampleQuestions: [
              {
                question: "Quelle tour maîtresse du château fort servait de refuge ultime pour le seigneur ?",
                options: ["Le donjon", "Les écuries", "Le pont-levis", "La basse-cour"],
                correctIndex: 0,
                explanation: "Le donjon est la plus haute et plus solide tour du château fort où réside le seigneur et sa famille."
              }
            ]
          },
          {
            title: "La Renaissance et les Grandes Découvertes (XVe - XVIe siècle)",
            desc: "Christophe Colomb, Gutenberg et l'imprimerie, Léonard de Vinci et François Ier.",
            coreConcepts: [
              "Les voyages maritimes et la découverte du continent américain (1492)",
              "L'invention de l'imprimerie par Gutenberg (1450) diffusant les livres",
              "Les artistes de la Renaissance (Léonard de Vinci, la Joconde)",
              "Les châteaux de la Loire (Chambord, Chenonceau) sous François Ier"
            ],
            practicalEx: "Comment l'imprimerie a changé le monde : avant, les moines recopiaient chaque livre à la main pendant des mois. Gutenberg a permis d'imprimer des milliers de livres rapidement !",
            formulas: ["Imprimerie + Grandes Découvertes + Art = Renaissance"],
            sampleQuestions: [
              {
                question: "En quelle année Christophe Colomb a-t-il atteint pour la première fois les Amériques ?",
                options: ["1492", "1789", "800", "1914"],
                correctIndex: 0,
                explanation: "Le 12 octobre 1492, les trois caravelles de Christophe Colomb atteignent les Bahamas en Amérique."
              }
            ]
          },
          {
            title: "La Révolution Française et la Naissance de la République (1789)",
            desc: "La prise de la Bastille, l'abolition des privilèges et la Déclaration des Droits de l'Homme.",
            coreConcepts: [
              "Le roi absolu Louis XVI et la colère du Tiers-État",
              "La prise de la Bastille le 14 juillet 1789 (Fête nationale)",
              "La Déclaration des Droits de l'Homme et du Citoyen : 'Tous les hommes naissent libres et égaux'",
              "Les symboles de la République : drapeau tricolore, Marianne, devise Liberté Égalité Fraternité"
            ],
            practicalEx: "Pourquoi le 14 juillet est-il le jour de notre fête nationale ? Parce qu'il commémore la prise de la Bastille (1789) et la fête de la Fédération (1790).",
            formulas: ["Devise Républicaine : Liberté, Égalité, Fraternité"],
            sampleQuestions: [
              {
                question: "Quelle forteresse royale parisienne a été prise par le peuple en colère le 14 juillet 1789 ?",
                options: ["La Bastille", "Le Louvre", "Versailles", "La Tour Eiffel"],
                correctIndex: 0,
                explanation: "La prise de la Bastille le 14 juillet 1789 est l'événement symbole de la chute de l'arbitraire royal."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Analyser les civilisations de la Méditerranée antique (Grèce classique et Empire romain).",
          "Comprendre les bouleversements politiques de la Révolution française et de l'Empire napoléonien.",
          "Étudier l'industrialisation, les transformations sociales et le colonialisme au XIXe siècle.",
          "Examiner les deux Guerres mondiales, le génocide et la construction européenne au XXe siècle."
        ],
        chapters: [
          {
            title: "La Méditerranée Antique : Démocratie Athénienne et Empire Romain",
            desc: "Citoyenneté à Athènes, conquêtes romaines, principat d'Auguste et christianisation.",
            coreConcepts: [
              "Athènes au Ve siècle av. J.-C. : ecclésia, démocratie directe et exclusions (femmes, métèques, esclaves)",
              "Rome : du modèle républicain au principat autoritaire fondé par Auguste (-27)",
              "La romanisation par le droit, la langue latine et l'urbanisme monumental",
              "Diffusion du christianisme et Édit de Constantin (313)"
            ],
            practicalEx: "Analyse d'un discours de Périclès sur les mérites de la constitution athénienne qui 'assure l'égalité de tous devant la loi'.",
            formulas: ["Pax Romana = Droit romain + Réseau routier + Sécurisation des frontières (Limes)"],
            sampleQuestions: [
              {
                question: "Qui étaient exclus de la citoyenneté politique dans l'Athènes du Ve siècle av. J.-C. ?",
                options: ["Les femmes, les métèques (étrangers résidents) et les esclaves", "Seuls les esclaves", "Tous les artisans", "Les soldats"],
                correctIndex: 0,
                explanation: "La démocratie athénienne était réservée aux hommes libres nés de père citoyen et de mère fille de citoyen."
              }
            ]
          },
          {
            title: "L'Europe des Lumières et la Rupture Révolutionnaire (1789-1815)",
            desc: "Des idées philosophiques à la souveraineté nationale, la Terreur et l'Empire napoléonien.",
            coreConcepts: [
              "Critique de l'absolutisme par Voltaire, Montesquieu et Rousseau",
              "Été 1789 : fin des privilèges féodaux et proclamation de la souveraineté nationale",
              "La Première République, guerre contre les monarchies et Terreur robespierriste (1793-1794)",
              "Le Consulat et l'Empire de Napoléon Bonaparte : Code Civil, préfets et guerres européennes"
            ],
            practicalEx: "L'article 1er de la Déclaration de 1789 : 'Les hommes naissent et demeurent libres et égaux en droits. Les distinctions sociales ne peuvent être fondées que sur l'utilité commune.'",
            formulas: ["Souveraineté de droit divin -> Souveraineté de la Nation"],
            sampleQuestions: [
              {
                question: "Quel texte fondamental promulgué en 1804 unifie le droit civil français sous Napoléon ?",
                options: ["Le Code Civil (ou Code Napoléon)", "La Constitution de l'An II", "L'Habeas Corpus", "L'Édit de Nantes"],
                correctIndex: 0,
                explanation: "Le Code Civil des Français unifie les lois sur l'état civil, la propriété et les contrats dans toute la France."
              }
            ]
          },
          {
            title: "L'Industrialisation et les Transformations Sociales du XIXe Siècle",
            desc: "Machine à vapeur, essor des usines, prolétariat ouvrier, bourgeoisie et idéologies (socialisme, libéralisme).",
            coreConcepts: [
              "Révolution industrielle : machine à vapeur de Watt, charbon, textile et chemin de fer",
              "Exode rural et explosion de l'urbanisation européenne",
              "Conditions ouvrières pénibles, émergence du syndicalisme et lois sociales",
              "Affrontement idéologique : Libéralisme économique d'Adam Smith vs Socialisme marxiste"
            ],
            practicalEx: "Étude d'une grève minière au XIXe siècle et de la loi de 1884 autorisant les syndicats en France (loi Waldeck-Rousseau).",
            formulas: ["Charbon + Vapeur + Métallurgie = Première Révolution Industrielle"],
            sampleQuestions: [
              {
                question: "Quelle nouvelle énergie fossile a été le moteur principal de la première révolution industrielle ?",
                options: ["Le charbon (houille)", "Le pétrole", "L'uranium", "Le gaz naturel"],
                correctIndex: 0,
                explanation: "La combustion du charbon alimentait les chaudières des machines à vapeur, locomotives et hauts-fourneaux."
              }
            ]
          },
          {
            title: "La Première Guerre Mondiale (1914-1918) : Guerre Totale et Expérience Combattante",
            desc: "Tranchées, mobilisation industrielle, Verdun, génocide arménien et traité de Versailles.",
            coreConcepts: [
              "L'engrenage des alliances et le déclenchement du conflit en août 1914",
              "Guerre de position et enfer des tranchées (Verdun, la Somme, gaz, obus)",
              "Guerre totale : mobilisation des femmes à l'usine ('munitionnettes') et censure",
              "Le génocide des Arméniens dans l'Empire ottoman (1915-1916) et le bilan humain"
            ],
            practicalEx: "Analyse d'une lettre de 'Poilu' décrivant la boue, le fracas permanent de l'artillerie et la peur de la mort.",
            formulas: ["Front militaire + Front de l'arrière (usines, emprunts) = Guerre totale"],
            sampleQuestions: [
              {
                question: "Quelle grande bataille défensive française de 1916 est devenue le symbole de la guerre de tranchées ?",
                options: ["La bataille de Verdun", "La bataille de Marignan", "La bataille de Sedan", "La bataille de Waterloo"],
                correctIndex: 0,
                explanation: "La bataille de Verdun (février-décembre 1916) a coûté la vie à plus de 300 000 soldats français et allemands."
              }
            ]
          },
          {
            title: "La Seconde Guerre Mondiale (1939-1945) et la Shoah",
            desc: "Totalitarismes, guerre d'anéantissement, collaboration et résistance, génocide des Juifs et des Roms.",
            coreConcepts: [
              "Agression nazie, guerre éclair (Blitzkrieg) et expansion de l'Axe",
              "La France divisée : régime de Vichy de Pétain (collaboration) et Résistance de De Gaulle (Appel du 18 juin)",
              "Guerre d'anéantissement à l'Est (Stalingrad, 1942-1943)",
              "Le processus génocidaire nazi : ghettos, fusillades (Shoah par balles) et centres de mise à mort (Auschwitz-Birkenau)"
            ],
            practicalEx: "Étude des deux discours de juin 1940 : Pétain demandant l'armistice le 17 juin vs De Gaulle appelant à la résistance le 18 juin depuis Londres.",
            formulas: ["18 Juin 1940 : 'Quoi qu'il arrive, la flamme de la résistance française ne doit pas s'éteindre.'"],
            sampleQuestions: [
              {
                question: "Quel général français a lancé le célèbre Appel du 18 juin 1940 sur les ondes de la BBC ?",
                options: ["Charles de Gaulle", "Philippe Pétain", "Jean Moulin", "Jacques Chaban-Delmas"],
                correctIndex: 0,
                explanation: "Charles de Gaulle refuse la capitulation et fonde la France Libre à Londres."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Comprendre l'affirmation de l'État monarchique et moderne en France (XVIe - XVIIIe siècle).",
          "Analyser le moment révolutionnaire et l'Empire : souveraineté nationale et citoyenneté.",
          "Étudier la mise en place de la République au XIXe siècle et l'expansion coloniale.",
          "Décortiquer les totalitarismes, les guerres mondiales, la guerre froide et le monde post-1989."
        ],
        chapters: [
          {
            title: "L'Affirmation de l'État en France à l'Époque Moderne (XVIe-XVIIIe)",
            desc: "De François Ier à Louis XIV : centralisation administrative, fiscalité et absolutisme monarchique.",
            coreConcepts: [
              "Ordonnance de Villers-Cotterêts (1539) : le français langue administrative et registres paroissiaux",
              "Guerres de Religion et Édit de Nantes (1598) pacifiant le royaume sous Henri IV",
              "L'absolutisme louis-quatorzien : monarchie de droit divin, Versailles et révocation de l'édit de Nantes (1685)",
              "Colbertisme et développement du mercantilisme étatique"
            ],
            practicalEx: "Analyse critique des Mémoires de Saint-Simon illustrant le contrôle strict de la haute noblesse à Versailles.",
            formulas: ["Monarchie administrative : Conseil du Roi + Intendants de province = Centralisation du pouvoir"],
            sampleQuestions: [
              {
                question: "Quelle ordonnance de 1539 impose l'usage de la langue française dans tous les actes administratifs et juridiques ?",
                options: ["L'ordonnance de Villers-Cotterêts", "L'édit de Nantes", "Le traité de Westphalie", "L'ordonnance de Blois"],
                correctIndex: 0,
                explanation: "L'ordonnance signée par François Ier à Villers-Cotterêts fait du français la langue officielle de l'administration et de la justice."
              }
            ]
          },
          {
            title: "La Révolution Française et l'Empire : Une Nouvelle Conception de la Nation",
            desc: "Souveraineté nationale, égalité civile, radicalisation jacobine et refondation napoléonienne.",
            coreConcepts: [
              "La rupture politique de 1789 : réunion des États Généraux, serment du Jeu de Paume et souveraineté de la Nation",
              "La Déclaration des Droits de 1789 et la sécularisation des biens du clergé",
              "La République menacée, levée en masse et politique de Salut Public",
              "L'héritage institutionnel napoléonien : Code Civil, Banque de France, lycées et Concordat de 1801"
            ],
            practicalEx: "Commentaire de document : le décret du 4 août 1789 prononçant la destruction intégrale du régime féodal.",
            formulas: ["Nation = Communauté politique de citoyens libres et égaux en droits"],
            sampleQuestions: [
              {
                question: "Quel serment solennel prêté le 20 juin 1789 stipule de ne jamais se séparer avant d'avoir donné une constitution à la France ?",
                options: ["Le serment du Jeu de Paume", "La constitution civile du clergé", "Le serment civique", "La paix des Dames"],
                correctIndex: 0,
                explanation: "Les députés du Tiers-État et quelques membres du clergé jurent de rester unis jusqu'à l'adoption d'une constitution."
              }
            ]
          },
          {
            title: "L'Enracinement de la Troisième République (1870-1914)",
            desc: "Lois scolaires de Jules Ferry, laïcité de 1905, crise de l'Affaire Dreyfus et culture républicaine.",
            coreConcepts: [
              "Proclamation du 4 septembre 1870 et écrasement de la Commune de Paris (1871)",
              "L'école laïque, gratuite et obligatoire (lois Ferry 1881-1882) comme fabrique du citoyen",
              "L'Affaire Dreyfus (1894-1906) et la mobilisation des intellectuels (Zola, 'J'accuse !')",
              "La loi de séparation des Églises et de l'État du 9 décembre 1905"
            ],
            practicalEx: "Étude de la loi de 1905, article 2 : 'La République ne reconnaît, ne salarie ni ne subventionne aucun culte.'",
            formulas: ["République = Suffrage universel masculin + École républicaine + Laïcité de l'espace public"],
            sampleQuestions: [
              {
                question: "Quel écrivain a publié l'article retentissant 'J'accuse... !' dans le journal L'Aurore pour dénoncer l'injustice faite au capitaine Dreyfus ?",
                options: ["Émile Zola", "Victor Hugo", "Guy de Maupassant", "Gustave Flaubert"],
                correctIndex: 0,
                explanation: "La lettre ouverte d'Émile Zola au président Félix Faure a galvanisé le camp dreyfusard et la défense de la vérité juridique."
              }
            ]
          },
          {
            title: "Les Régimes Totalitaires de l'Entre-Deux-Guerres (URSS, Fascisme, Nazisme)",
            desc: "Genèse idéologique, parti unique, propagande de masse, terreur policière et volonté de forger 'l'homme nouveau'.",
            coreConcepts: [
              "L'URSS stalinienne : collectivisation forcée, goulag, culte de la personnalité et procès de Moscou",
              "Le fascisme italien de Mussolini : culte de l'État et encadrement de la jeunesse",
              "Le nazisme hitlérien : idéologie raciste et antisémite, lois de Nuremberg (1935), espace vital (Lebensraum)",
              "Caractéristiques du totalitarisme selon Hannah Arendt : terreur et idéologie totalisante"
            ],
            practicalEx: "Tableau synoptique comparant l'idéologie, la cible désignée et les instruments de terreur des trois régimes.",
            formulas: ["Totalitarisme = Parti unique + Monopole de l'idéologie + Police politique + Destruction de la société civile"],
            sampleQuestions: [
              {
                question: "Quelles lois antisémites adoptées par le Reich nazi en 1935 privent les Juifs allemands de leur citoyenneté ?",
                options: ["Les lois de Nuremberg", "Les accords de Munich", "Le pacte germano-soviétique", "La loi des pleins pouvoirs"],
                correctIndex: 0,
                explanation: "Les lois de Nuremberg excluent juridiquement les citoyens juifs de la communauté nationale allemande."
              }
            ]
          },
          {
            title: "Guerre Froide, Décolonisation et Nouvel Ordre Mondial",
            desc: "De la bipolarisation Est-Ouest à la dislocation de l'URSS et l'émergence d'un monde multipolaire.",
            coreConcepts: [
              "Affrontement bipolaire : Doctrine Truman (endiguement) vs Doctrine Jdanov, crise de Cuba (1962)",
              "Le processus de décolonisation : indépendances en Asie (Inde 1947) et Afrique (guerre d'Algérie 1954-1962)",
              "Chute du mur de Berlin (1989) et implosion de l'Union Soviétique (1991)",
              "Le monde contemporain : puissance américaine, émergence des BRICS et résurgence des conflits territoriaux"
            ],
            practicalEx: "Analyse du discours de Fulton de Churchill (1946) théorisant le 'rideau de fer' tombé à travers l'Europe.",
            formulas: ["Guerre Froide = Paix impossible, guerre improbable (Raymond Aron)"],
            sampleQuestions: [
              {
                question: "Quelle crise majeure de 1962 a failli faire basculer le monde dans un holocauste nucléaire entre les USA et l'URSS ?",
                options: ["La crise des missiles de Cuba", "Le blocus de Berlin", "La guerre de Corée", "La crise de Suez"],
                correctIndex: 0,
                explanation: "La découverte de rampes de lancement nucléaires soviétiques à Cuba a conduit à un bras de fer tendu entre Kennedy et Khrouchtchev."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Maîtriser les paradigmes épistémologiques et l'école historique des Annales (Bloch, Febvre, Braudel).",
          "Conduire la critique diplomatique et heuristique des sources d'archives primaires.",
          "Analyser l'histoire globale connectée, les empires coloniaux et les circulations transnationales.",
          "Déconstruire les récits mémoriels contemporains et la fabrique des identités nationales."
        ],
        chapters: [
          {
            title: "Épistémologie Historique et l'École des Annales",
            desc: "Histoire problème, temps long braudélien, histoire quantitative et histoire des mentalités.",
            coreConcepts: [
              "Rupture avec l'histoire positiviste événementielle (Langlois et Seignobos)",
              "Marc Bloch et Lucien Febvre : l'Histoire comme 'science des hommes dans le temps'",
              "Fernand Braudel et la pluralité des temporalités : temps court politique, temps moyen conjoncturel, temps long géographique",
              "L'anthropologie historique et la Nouvelle Histoire (Le Roy Ladurie, Duby, Le Goff)"
            ],
            practicalEx: "Étude de 'La Méditerranée et le monde méditerranéen à l'époque de Philippe II' de Braudel démontrant le primat de l'espace sur l'événement diplomatique.",
            formulas: ["Temps géographique (longue durée) > Temps économique et social > Temps événementiel individuel"],
            sampleQuestions: [
              {
                question: "Dans la théorie des temporalités de Fernand Braudel, quelle échelle temporelle gouverne les relations profondes entre l'homme et son environnement physique ?",
                options: ["Le temps long (ou longue durée)", "Le temps court événementiel", "Le temps conjoncturel", "Le temps biographique"],
                correctIndex: 0,
                explanation: "La longue durée caractérise les structures presque immobiles comme les contraintes climatiques, géographiques et agraires."
              }
            ]
          },
          {
            title: "Heuristique, Paléographie et Critique des Sources Primaires",
            desc: "Critique externe, critique interne, restitution contextuelle et déconstruction des intentions de l'auteur.",
            coreConcepts: [
              "Heuristique : recherche systématique et inventaire des fonds d'archives (publiques, notariales, judiciaires)",
              "Critique d'authenticité (paléographie, sigillographie, filigranes du papier)",
              "Critique de sincérité et d'exactitude : repérer les biais, le statut de l'énonciateur et les silences de la source",
              "L'archive comme monument d'un pouvoir selon Michel Foucault"
            ],
            practicalEx: "Dépouillement critique d'un registre de délibérations échevinales du XVIIe siècle lors d'une crise frumentaire.",
            formulas: ["Source = Trace matérielle située + Intentionnalité d'un producteur + Biais de conservation"],
            sampleQuestions: [
              {
                question: "Que vise la 'critique interne' d'un document d'archive en méthodologie historique ?",
                options: ["Évaluer la cohérence, la véracité du contenu et les intentions subjectives de l'auteur", "Vérifier l'âge de l'encre et du parchemin", "Traduire les mots latins uniquement", "Restaurer la reliure du manuscrit"],
                correctIndex: 0,
                explanation: "La critique interne analyse le sens du texte, sa sincérité, la compétence du témoin et ses biais idéologiques."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Concevoir et rédiger un mémoire de recherche inédit fondé sur le dépouillement exhaustif de sources primaires.",
          "Mobiliser l'histoire connectée, subalterne et les transferts culturels transatlantiques.",
          "Maîtriser les outils de l'histoire numérique : bases relationnelles, SIG historique et fouille textuelle.",
          "Débattre des controverses épistémologiques : régimes d'historicité, anthropocène et usages politiques du passé."
        ],
        chapters: [
          {
            title: "Histoire Connectée, Approches Subalternes et Circulations Impériales",
            desc: "Décentrement du regard eurocentrique, réseaux marchands transocéaniques et agence des acteurs subalternes.",
            coreConcepts: [
              "L'histoire connectée selon Sanjay Subrahmanyam : dépasser le cadre stato-national",
              "Subaltern Studies (Guha, Spivak) : retrouver la voix des dominés et des populations colonisées",
              "Circulation des savoirs, métissages linguistiques et accommodements impériaux",
              "Microhistoire globale : suivre la trajectoire d'un individu ou d'une marchandise à l'échelle planétaire"
            ],
            practicalEx: "Étude de cas : reconstitution du parcours d'un commerçant arménien entre Ispahan, Venise et Goa au XVIIe siècle à travers sa correspondance marchande.",
            formulas: ["Histoire connectée = Reconstitution des réseaux empiriques sans postulat hégémonique"],
            sampleQuestions: [
              {
                question: "Quel est l'objectif épistémologique central de l'Histoire Connectée (Connected History) ?",
                options: ["Retracer les interconnexions réelles et les circulations réciproques entre aires culturelles sans centrage eurocentrique", "Compiler des statistiques mondiales sans sources locales", "Ignorer les archives locales", "Justifier la colonisation"],
                correctIndex: 0,
                explanation: "L'histoire connectée met en lumière les contacts, les emprunts mutuels et les circulations entre sociétés à l'époque moderne et contemporaine."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  // 7. GÉOGRAPHIE & GÉOPOLITIQUE
  // =================================================================
  {
    domainName: "Géographie et Géopolitique",
    keywords: ["geographie", "geopolitique", "climat", "mondialisation", "territoires", "cartes", "population", "amenagement", "urbanisme", "villes", "relief"],
    tiers: {
      primary: {
        objectives: [
          "Savoir lire une carte, utiliser la rose des vents et situer les continents et océans.",
          "Découvrir la France : les fleuves, les massifs montagneux et les grandes villes.",
          "Reconnaître les différents paysages : mer, montagne, campagne et métropole.",
          "Comprendre l'importance de protéger notre environnement et économiser l'eau."
        ],
        chapters: [
          {
            title: "Se Repérer sur Terre : Les Continents et les Océans",
            desc: "Le globe terrestre, le planisphère, l'Équateur, les 6 continents et les grands océans.",
            coreConcepts: [
              "Les 4 points cardinaux : Nord, Sud, Est, Ouest (la boussole)",
              "Le globe terrestre et le planisphère (carte à plat)",
              "Les 6 continents : Europe, Asie, Afrique, Amérique, Océanie, Antarctique",
              "Les 5 océans : Pacifique, Atlantique, Indien, Arctique, Austral"
            ],
            practicalEx: "Retrouver sur le planisphère le plus grand océan de la Terre (l'Océan Pacifique) et le continent le plus peuplé (l'Asie).",
            formulas: ["La Terre = 71% d'eau (la planète bleue) et 29% de terres émergées"],
            sampleQuestions: [
              {
                question: "Quel instrument utilise une aiguille aimantée pour indiquer le Nord ?",
                options: ["Une boussole", "Un thermomètre", "Une règle", "Un sablier"],
                correctIndex: 0,
                explanation: "L'aiguille aimantée de la boussole s'oriente naturellement vers le pôle Nord magnétique."
              }
            ]
          },
          {
            title: "Les Paysages de France : Mers, Montagnes, Campagnes et Villes",
            desc: "Observer et décrire ce qui nous entoure : le littoral, les reliefs et les habitations.",
            coreConcepts: [
              "Le littoral : plages de sable, falaises et ports de pêche",
              "La montagne : sommets, neiges éternelles, vallées et alpages",
              "La campagne : champs cultivés, bocages et villages ruraux",
              "La ville : immeubles, transports en commun et quartiers animés"
            ],
            practicalEx: "Identifier les deux plus hautes chaînes de montagnes de France métropolitaine : les Alpes (avec le Mont-Blanc) et les Pyrénées.",
            formulas: ["Paysage = Éléments naturels (relief, cours d'eau) + Activités humaines (bâtiments, routes)"],
            sampleQuestions: [
              {
                question: "Quel est le sommet le plus haut de France et d'Europe occidentale (4 809 mètres) ?",
                options: ["Le Mont Blanc", "Le Pic du Midi", "Le Puy de Dôme", "Le Grand Ballon"],
                correctIndex: 0,
                explanation: "Le Mont Blanc culmine à environ 4 809 m dans le massif des Alpes."
              }
            ]
          },
          {
            title: "Protéger la Planète : L'Eau, les Déchets et la Biodiversité",
            desc: "Les éco-gestes faciles du quotidien pour prendre soin de notre belle Terre.",
            coreConcepts: [
              "L'eau potable est précieuse : ne pas laisser couler le robinet",
              "Le tri sélectif des déchets (poubelle jaune pour les emballages recyclables)",
              "Les transports doux : marcher, prendre le vélo ou le bus pour éviter la pollution",
              "Respecter les animaux et les forêts"
            ],
            practicalEx: "Calculer les litres d'eau économisés si on prend une douche rapide (50 litres) au lieu d'un grand bain (150 litres) : 100 litres d'eau sauvés !",
            formulas: ["Réduire + Réutiliser + Recycler = La règle des 3R"],
            sampleQuestions: [
              {
                question: "Pourquoi est-il important de trier les emballages en plastique et en carton ?",
                options: ["Pour pouvoir les recycler et économiser les matières premières", "Pour faire joli", "Parce que c'est interdit de jeter", "Pour les brûler dans son jardin"],
                correctIndex: 0,
                explanation: "Le tri permet de réutiliser la matière pour fabriquer de nouveaux objets sans puiser de nouvelles ressources."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Analyser le phénomène de métropolisation et les disparités socio-spatiales dans le monde.",
          "Comprendre la démographie mondiale, la transition urbaine et les migrations.",
          "Étudier l'aménagement des territoires en France et les politiques d'aménagement durable.",
          "Explorer les mers et océans comme espaces stratégiques de la mondialisation."
        ],
        chapters: [
          {
            title: "Habiter les Métropoles : Croissance Urbaine et Ségrégation Spatiale",
            desc: "CBD, gratte-ciels, banlieues pavillonnaires, gated communities et bidonvilles (slums).",
            coreConcepts: [
              "Plus de 55% de l'humanité vit aujourd'hui en milieu urbain (transition urbaine)",
              "Le CBD (Central Business District) : centre d'affaires verticalisé et symbole de puissance économique",
              "Ségrégation socio-spatiale : cohabitation des quartiers aisés et des favelas/slums insalubres",
              "Les défis de la ville durable : transports décarbonés, gestion des déchets et étalement urbain"
            ],
            practicalEx: "Étude comparative de la métropole de Tokyo (ville la plus peuplée du monde, connectée par shinkansen) et de Mumbai (saturation et bidonville de Dharavi).",
            formulas: ["Taux d'urbanisation = (Population urbaine / Population totale) × 100"],
            sampleQuestions: [
              {
                question: "Comment appelle-t-on le quartier d'affaires d'une métropole dominé par les gratte-ciels des sièges d'entreprises ?",
                options: ["Le CBD (Central Business District)", "La friche industrielle", "Le quartier résidentiel", "La zone périurbaine"],
                correctIndex: 0,
                explanation: "Le CBD regroupe les fonctions tertiaires supérieures, banques et sièges sociaux."
              }
            ]
          },
          {
            title: "Mondialisation et Mobilités Humaines : Flux Migratoires et Tourisme",
            desc: "Migrations économiques, réfugiés climatiques et géopolitiques, flux touristiques massifs.",
            coreConcepts: [
              "Facteurs d'émigration (push factors) : pauvreté, guerre, dérèglement climatique",
              "Facteurs d'attraction (pull factors) : emploi, sécurité, regroupement familial",
              "Rémittances (remises) : flux financiers envoyés par les diasporas vers leurs pays d'origine",
              "Le tourisme international : première industrie mondiale et ses impacts sur les écosystèmes"
            ],
            practicalEx: "Cartographie des principaux flux migratoires mondiaux : d'Amérique centrale vers les États-Unis, d'Afrique subsaharienne vers l'Europe.",
            formulas: ["Solde migratoire = Nombre d'entrants (immigrants) - Nombre de sortants (émigrants)"],
            sampleQuestions: [
              {
                question: "Que désignent les 'remises' ou 'rémittances' dans les flux financiers transnationaux ?",
                options: ["L'argent envoyé par les travailleurs émigrés à leurs familles restées au pays d'origine", "Les taxes douanières", "Les dépenses des touristes", "Les prêts du FMI"],
                correctIndex: 0,
                explanation: "Les remises représentent une ressource économique vitale dépassant souvent l'aide publique au développement."
              }
            ]
          },
          {
            title: "L'Aménagement du Territoire Français : Réduire les Inégalités",
            desc: "Le rôle de Paris, la décentralisation, les lignes à grande vitesse (LGV) et les territoires ruraux.",
            coreConcepts: [
              "Le poids disproportionné de l'agglomération parisienne (métropole de rang mondial)",
              "Les métropoles régionales dynamiques (Lyon, Toulouse, Nantes, Bordeaux, Lille)",
              "La 'diagonale des faibles densités' et les difficultés d'accès aux services publics et soins médicaux",
              "Infrastructures de désenclavement : réseaux TGV, autoroutes et déploiement de la fibre optique"
            ],
            practicalEx: "Étude d'un conflit d'usage local : projet de contournement autoroutier contesté par les agriculteurs et écologistes.",
            formulas: ["Aménagement = Volonté publique de corriger les déséquilibres géographiques naturels"],
            sampleQuestions: [
              {
                question: "Quel objectif poursuit la politique publique d'aménagement du territoire en France ?",
                options: ["Réduire les disparités économiques régionales et garantir l'accès aux services essentiels pour tous les citoyens", "Concentrer tous les emplois à Paris", "Fermer les petites gares", "Augmenter les prix des billets"],
                correctIndex: 0,
                explanation: "L'aménagement du territoire vise l'équité territoriale et la cohésion économique de toutes les régions."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Décrypter les réseaux et acteurs de la mondialisation (firmes transnationales, États, ONG).",
          "Analyser les espaces maritimes comme vecteurs du commerce international et zones de conflictualité.",
          "Comprendre les dynamiques territoriales de la France et de l'Union Européenne.",
          "Étudier la géopolitique des ressources stratégiques (eau, hydrocarbures, terres rares)."
        ],
        chapters: [
          {
            title: "Les Espaces Maritimes : Vecteurs Majeurs de la Mondialisation et Tensions Géostratégiques",
            desc: "Conteneurisation, détroits stratégiques, câbles sous-marins et appropriation des ZEE.",
            coreConcepts: [
              "La maritimisation de l'économie mondiale : plus de 85% du commerce en volume emprunte la voie maritime",
              "La révolution du conteneur (standardisation EVP) et les routes de l'Asie vers l'Europe et l'Amérique",
              "Les goulets d'étranglement (chokepoints) : détroits de Malacca, d'Ormuz, de Bab-el-Mandeb et canaux de Suez et Panama",
              "Droit de la mer (convention de Montego Bay) et Zones Économiques Exclusives (ZEE)"
            ],
            practicalEx: "Étude de la mer de Chine méridionale : revendication chinoise de la 'ligne en neuf traits' face aux voisins de l'ASEAN et présence de la marine américaine.",
            formulas: ["Conteneurisation + Gigantisme des porte-conteneurs = Baisse drastique du coût unitaire de transport maritime"],
            sampleQuestions: [
              {
                question: "Quelle part approximative du volume du commerce international de marchandises transite par les voies maritimes ?",
                options: ["Environ 85% à 90%", "Moins de 20%", "Environ 50%", "Uniquement 10%"],
                correctIndex: 0,
                explanation: "Le fret maritime est l'artère vitale de la mondialisation économique contemporaine grâce aux flottes de porte-conteneurs et vraquiers."
              }
            ]
          },
          {
            title: "Des Territoires Inégalement Intégrés dans la Mondialisation",
            desc: "Archipel mégalopolitain mondial, villes globales (Sassen), puissances émergentes et marges enclavées.",
            coreConcepts: [
              "La notion de 'ville globale' (Saskia Sassen) : New York, Londres, Tokyo, Paris commandant les flux financiers mondiaux",
              "L'Archipel Mégalopolitain Mondial (AMM) connecté par hubs aéroportuaires et télécommunications",
              "Les puissances émergentes et réorganisations des chaînes de valeur globales",
              "Les angles morts et marges délaissées : pays les moins avancés (PMA) pénalisés par la mauvaise gouvernance ou l'enclavement"
            ],
            practicalEx: "Cartographie en anamorphose des flux financiers boursiers mondiaux centrés sur les grandes places financières (Wall Street, City, Tokyo, Shanghai).",
            formulas: ["Mégalopole = Nébuleuse urbaine continue de plusieurs dizaines de millions d'habitants dotée de fonctions de commandement global"],
            sampleQuestions: [
              {
                question: "Qui a théorisé le concept fondamental de 'ville globale' (Global City) pour désigner les métropoles directrices du capitalisme financier ?",
                options: ["Saskia Sassen", "Paul Vidal de la Blache", "Milton Santos", "Fernand Braudel"],
                correctIndex: 0,
                explanation: "La sociologue et économiste Saskia Sassen a publié l'ouvrage fondateur 'The Global City' en 1991."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Maîtriser l'épistémologie de la géographie critique, analyse spatiale et cartographie quantitative.",
          "Analyser la géopolitique des frontières, disputes territoriales et conflits asymétriques.",
          "Pratiquer les Systèmes d'Information Géographique (SIG) et l'imagerie satellitaire.",
          "Étudier la transition socio-écologique des systèmes productifs et vulnérabilités climatiques."
        ],
        chapters: [
          {
            title: "Géopolitique des Frontières et Souverainetés Disputées",
            desc: "De la frontière-ligne westphalienne aux frontières réticulaires, murs de séparation et zones grises.",
            coreConcepts: [
              "Épistémologie de Michel Foucher : la frontière comme marqueur politique d'un rapport de force territorial",
              "Frontières physiques vs frontières immatérielles (contrôles biométriques déterritorialisés)",
              "Le 'retour des murs' et la militarisation des confins frontaliers face aux migrations",
              "Conflits territoriaux non résolus et souverainetés contestées (Taïwan, Cachemire, Sahara occidental)"
            ],
            practicalEx: "Analyse cartographique multiscalaire de la frontière États-Unis / Mexique (twin cities, maquiladoras et barrière frontalière).",
            formulas: ["Frontière = Enveloppe juridique de la souveraineté étatique"],
            sampleQuestions: [
              {
                question: "Selon l'approche géopolitique de Michel Foucher, qu'exprime fondamentalement une frontière étatique ?",
                options: ["Un compromis géopolitique matérialisant un rapport de force historique à une époque donnée", "Une ligne naturelle tracée par les dieux", "Une séparation purement commerciale sans enjeu politique", "Un obstacle toujours voué à disparaître"],
                correctIndex: 0,
                explanation: "Une frontière n'est jamais naturelle : elle résulte de traités, guerres et négociations entre souverainetés rivales."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Modéliser les dynamiques spatiales complexes par télédétection satellitaire et géomatique avancée.",
          "Concevoir des stratégies de prospective territoriale et politiques d'adaptation climatique.",
          "Approfondir la géopolitique critique des ressources rares (terres rares, hydrogène, semi-conducteurs).",
          "Produire une recherche originale en sciences géographiques respectant les standards académiques."
        ],
        chapters: [
          {
            title: "Géopolitique Critique des Chaînes de Valeur Critiques et Terres Rares",
            desc: "Dépendances stratégiques, monopoles miniers, transition énergétique et rivalités sino-américaines.",
            coreConcepts: [
              "Quotas d'extraction et raffinage des métaux critiques (lithium, cobalt, néodyme) concentrés en Chine",
              "La vulnérabilité des transitions 'vertes' occidentales dépendantes des approvisionnements miniers asiatiques",
              "La bataille des puces électroniques (semi-conducteurs avancés de TSMC à Taïwan)",
              "Reshoring, friendshoring et reconfiguration géo-économique des corridors logistiques"
            ],
            practicalEx: "Analyse systémique du cycle de production des batteries de véhicules électriques : extraction en Amérique du Sud / RDC, raffinage en Asie, assemblage en Europe.",
            formulas: ["Transition bas-carbone = Intensification sans précédent de la demande en métaux critiques terrestres et marins"],
            sampleQuestions: [
              {
                question: "Quel pays détient aujourd'hui le quasi-monopole mondial sur les étapes de séparation et raffinage des terres rares ?",
                options: ["La Chine", "L'Allemagne", "Le Canada", "L'Afrique du Sud"],
                correctIndex: 0,
                explanation: "La Chine contrôle plus de 70% de l'extraction et plus de 90% du raffinage chimique des terres rares nécessaires aux moteurs électriques et éoliennes."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  // 8. PHILOSOPHIE
  // =================================================================
  {
    domainName: "Philosophie",
    keywords: ["philosophie", "philo", "morale", "ethique", "metaphysique", "epistemologie", "conscience", "liberte", "devoir", "verite", "justice"],
    tiers: {
      primary: {
        objectives: [
          "Apprendre à se poser de grandes questions : qu'est-ce qui est juste ou injuste ?",
          "Comprendre ce que signifie être libre tout en respectant les autres.",
          "Découvrir la différence entre la vérité et le mensonge.",
          "S'initier aux petits débats philosophiques d'enfants pour exprimer sa pensée avec respect."
        ],
        chapters: [
          {
            title: "C'est Quoi Être Libre ? La Liberté et les Règles",
            desc: "Pourquoi y a-t-il des règles à l'école et dans la vie ? Peut-on faire tout ce que l'on veut ?",
            coreConcepts: [
              "Faire ce qui nous plaît n'est pas toujours être libre",
              "La liberté des uns s'arrête là où commence celle des autres",
              "Les règles du jeu nous protègent et permettent de jouer ensemble",
              "Réfléchir avant d'agir pour faire les bons choix"
            ],
            practicalEx: "Que se passerait-il sur la route s'il n'y avait aucun feu rouge ? Tout le monde aurait un accident. Les règles nous rendent libres de circuler en sécurité !",
            formulas: ["Liberté + Respect des autres = Vivre ensemble heureux"],
            sampleQuestions: [
              {
                question: "Est-ce qu'être libre signifie pouvoir faire du mal aux autres sans punition ?",
                options: ["Non, la liberté respecte les droits et la sécurité de chacun", "Oui, la liberté c'est faire n'importe quoi", "La liberté est interdite", "La liberté n'existe pas"],
                correctIndex: 0,
                explanation: "La vraie liberté s'exprime dans le respect mutuel et la responsabilité de ses actes."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Distinguer la croyance de la connaissance rationnelle.",
          "Comprendre les dilemmes moraux : le juste, l'injuste et la solidarité.",
          "Développer son esprit critique face aux rumeurs et fausses informations.",
          "Formuler une argumentation structurée avec thèse, arguments et exemples."
        ],
        chapters: [
          {
            title: "Vérité, Opinion et Esprit Critique",
            desc: "Distinguer ce que l'on croit, ce que l'on ressent et ce qui est prouvé scientifiquement.",
            coreConcepts: [
              "L'opinion personnelle : subjective et parfois changeante",
              "La vérité démontrée : prouvée par la logique mathématique ou l'expérience",
              "Le doute méthodique : questionner les évidences trompeuses",
              "L'allégorie de la caverne de Platon expliquée simplement"
            ],
            practicalEx: "La différence entre dire 'Le chocolat est le meilleur aliment du monde' (jugement de goût) et 'L'eau bout à 100°C sous pression normale' (vérité scientifique démontrable).",
            formulas: ["Opinion = Jugement subjectif / Vérité = Affirmation universellement vérifiable"],
            sampleQuestions: [
              {
                question: "Dans l'allégorie de la caverne de Platon, que représentent les ombres projetées sur le mur pour les prisonniers ?",
                options: ["Des illusions trompeuses qu'ils prennent faussement pour la réalité", "La vérité absolue", "Des peintures d'artistes", "Le soleil véritable"],
                correctIndex: 0,
                explanation: "Les prisonniers enchaînés confondent les reflets et les ombres avec la véritable réalité des choses."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Explorer les notions au programme du Bac : La Conscience, La Liberté, Le Devoir, La Vérité, L'État.",
          "Maîtriser la méthodologie de la Dissertation philosophique et de l'Explication de texte.",
          "Mobiliser les grands auteurs classiques (Platon, Descartes, Kant, Spinoza, Rousseau, Nietzsche).",
          "Articuler une problématisation féconde dépassant les réponses manichéennes simplistes."
        ],
        chapters: [
          {
            title: "La Conscience, l'Inconscient et le Sujet",
            desc: "Descartes (le Cogito), Kant, Freud et la critique de l'illusion de la transparence à soi.",
            coreConcepts: [
              "Le doute cartésien et la certitude inaugurale : 'Cogito, ergo sum' (Discours de la méthode)",
              "La conscience morale kantienne et la dignité de la personne autonome",
              "L'hypothèse freudienne de l'inconscient psychique : Ça, Moi, Surmoi et refoulement",
              "Critiques existentialistes de Sartre : la mauvaise foi et le refus du déterminisme"
            ],
            practicalEx: "Problématique de dissertation : 'Suis-je le mieux placé pour savoir qui je suis ?' — confrontation entre l'évidence immédiate de la conscience réflexive et les biais de l'aveuglement inconscient.",
            formulas: ["Cogito ergo sum = Je pense, donc je suis (René Descartes)"],
            sampleQuestions: [
              {
                question: "Quelle certitude indestructible résiste au doute méthodique hyperbolique de René Descartes ?",
                options: ["L'existence de la pensée en acte ('Je pense, donc je suis')", "L'existence du monde matériel", "Les sens humains", "Les démonstrations mathématiques"],
                correctIndex: 0,
                explanation: "Même si un malin génie me trompe, pour être trompé, il faut nécessairement que j'existe en tant que sujet pensant."
              }
            ]
          },
          {
            title: "La Liberté, la Morale et le Devoir",
            desc: "Libre arbitre, déterminismes sociopsychologiques, impératif catégorique kantien et responsabilité.",
            coreConcepts: [
              "Le libre arbitre comme pouvoir de choisir sans contrainte extérieure",
              "Le déterminisme de Spinoza : les hommes se croient libres parce qu'ils ignorent les causes qui les déterminent",
              "L'impératif catégorique de Kant : agir uniquement selon une maxime qu'on peut ériger en loi universelle",
              "Sartre : 'L'homme est condamné à être libre' et responsable de toute l'humanité"
            ],
            practicalEx: "L'impératif kantien appliqué au mensonge : si chacun érigeait le mensonge en règle universelle, la notion même de promesse s'autodétruirait instantanément.",
            formulas: ["Agis de telle sorte que la maxime de ta volonté puisse toujours valoir en même temps comme principe d'une législation universelle (Kant)"],
            sampleQuestions: [
              {
                question: "Selon la philosophie morale d'Emmanuel Kant, quelle est la caractéristique d'une action accomplie par devoir ?",
                options: ["Elle est motivée purement par le respect de la loi morale universelle, sans intérêt égoïste ni recherche de récompense", "Elle cherche la popularité", "Elle obéit à la peur du gendarme", "Elle maximise le profit personnel"],
                correctIndex: 0,
                explanation: "Pour Kant, seule la volonté guidée désintéressément par l'impératif catégorique possède une valeur morale authentique."
              }
            ]
          },
          {
            title: "La Justice, le Droit et l'État",
            desc: "L'état de nature (Hobbes vs Rousseau), contrat social, justice distributive et désobéissance civile.",
            coreConcepts: [
              "L'état de nature : 'l'homme est un loup pour l'homme' (Hobbes) vs homme bon corrompu par la propriété (Rousseau)",
              "Le pacte social aliénant la liberté naturelle au profit de la liberté civile garantie par la loi",
              "Droit positif (lois écrites de la cité) vs Droit naturel (justice idéale imprescriptible - mythe d'Antigone)",
              "La théorie de la justice de John Rawls : équité sous le 'voile d'ignorance'"
            ],
            practicalEx: "Dilemme d'Antigone : désobéir au décret injuste du roi Créon pour obéir aux lois sacrées et non écrites de la conscience humaine.",
            formulas: ["Justice = Égalité des droits fondamentaux + Équité compensatoire des inégalités"],
            sampleQuestions: [
              {
                question: "Dans 'Du Contrat Social', quelle entité souveraine incarne la volonté générale du peuple selon Jean-Jacques Rousseau ?",
                options: ["Le corps des citoyens réunis exprimant l'intérêt commun", "Le roi héréditaire", "Une cour de justice privée", "Les plus riches propriétaires"],
                correctIndex: 0,
                explanation: "Pour Rousseau, la souveraineté réside inaliénablement dans le peuple exprimant la volonté générale par la loi."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Approfondir les philosophies de la modernité (Spinoza, Leibniz, Kant, Hegel).",
          "Maîtriser la phénoménologie husserlienne et l'ontologie heideggérienne.",
          "Analyser l'épistémologie critique et la philosophie des sciences (Popper, Feyerabend, Canguilhem).",
          "Conduire une exégèse conceptuelle rigoureuse dans les langues philosophiques d'origine."
        ],
        chapters: [
          {
            title: "L'Idéalisme Allemand : Dialectique Hégélienne et Phénoménologie de l'Esprit",
            desc: "Aufhebung, dialectique du maître et de l'esclave, esprit objectif et historicité de la raison.",
            coreConcepts: [
              "Le dépassement hégélien de l'antinomie kantienne entre phénomène et noumène",
              "La dialectique tripartite : thèse, antithèse et Aufhebung (négation et conservation créatrice)",
              "La lutte à mort pour la reconnaissance dans la dialectique du maître et de l'esclave",
              "L'État rationnel comme accomplissement de l'Idée éthique dans l'Histoire"
            ],
            practicalEx: "Commentaire conceptuel du passage de la 'Phénoménologie de l'Esprit' sur la libération du serviteur par le travail transformateur du monde.",
            formulas: ["Ce qui est rationnel est réel, ce qui est réel est rationnel (G.W.F. Hegel)"],
            sampleQuestions: [
              {
                question: "Quel terme philosophique allemand forge Hegel pour désigner le mouvement dialectique de négation conservatrice d'une étape par une synthèse supérieure ?",
                options: ["L'Aufhebung", "La Dasein", "L'Eidos", "L'Épochè"],
                correctIndex: 0,
                explanation: "L'Aufhebung désigne l'acte simultané d'abolir, conserver et élever à un degré supérieur de rationalité."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Mener une recherche inédite sur les corpus philosophiques complexes.",
          "Déconstruire les métarécits de la métaphysique occidentale (Derrida, Foucault, Deleuze).",
          "Approfondir l'éthique contemporaine, la bioéthique et la justice distributive mondiale.",
          "Rédiger un mémoire de Master validé par un jury académique universitaire."
        ],
        chapters: [
          {
            title: "Déconstruction Métaphysique et Archéologie du Savoir",
            desc: "La différance derridienne, biopolitique foucaldienne et agencements deleuziens.",
            coreConcepts: [
              "La clôture de la métaphysique de la présence selon Jacques Derrida",
              "La généalogie des dispositifs de pouvoir et le concept de biopolitique de Michel Foucault",
              "Le rhizome et la déterritorialisation chez Gilles Deleuze et Félix Guattari",
              "La philosophie post-analytique et pragmatiste contemporaine (Rorty, Brandom)"
            ],
            practicalEx: "Déconstruction des binarismes hiérarchiques occidentaux (Présence/Absence, Parole/Écriture, Nature/Culture).",
            formulas: ["Il n'y a pas de hors-texte (Jacques Derrida)"],
            sampleQuestions: [
              {
                question: "Quel penseur français a introduit les notions d'archéologie du savoir, d'épistémè et de biopouvoir ?",
                options: ["Michel Foucault", "René Descartes", "Jean-Paul Sartre", "Henri Bergson"],
                correctIndex: 0,
                explanation: "Michel Foucault a analysé les structures sous-jacentes du savoir institutionnel et l'exercice disciplinaire du pouvoir."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  // 9. ANGLAIS & LANGUES VIVANTES
  // =================================================================
  {
    domainName: "Anglais et Langues Vivantes",
    keywords: ["anglais", "english", "anglophone", "grammar", "vocabulaire", "traduction", "toefl", "toeic", "langue", "vocabulary"],
    tiers: {
      primary: {
        objectives: [
          "Apprendre les salutations usuelles et se présenter en anglais.",
          "Connaître les nombres de 1 à 20, les couleurs et les jours de la semaine.",
          "Nommer les membres de la famille, les animaux et la nourriture.",
          "Comprendre des consignes simples et chanter de petites comptines anglaises."
        ],
        chapters: [
          {
            title: "Hello! Greetings and Introductions (Se Présenter)",
            desc: "Hello, Good morning, What is your name? My name is Leo. How are you?",
            coreConcepts: [
              "Greetings : Hello, Hi, Good morning, Goodbye, See you soon",
              "Asking a name : 'What's your name?' -> 'My name is...'",
              "Asking feelings : 'How are you?' -> 'I am fine, thank you! / I am happy'",
              "Polite words : Please, Thank you, You are welcome"
            ],
            practicalEx: "Dialogue de présentation : 'Hello! My name is Emma. What is your name?' — 'Hi Emma! My name is Tom. Nice to meet you!'",
            formulas: ["What is your name? = Comment tu t'appelles ? / My name is... = Je m'appelle..."],
            sampleQuestions: [
              {
                question: "Comment répond-on poliment en anglais à la question 'How are you?' ?",
                options: ["I'm fine, thank you!", "My name is John", "I have 10 years", "Good night"],
                correctIndex: 0,
                explanation: "'I'm fine, thank you!' signifie 'Je vais bien, merci !'."
              }
            ]
          },
          {
            title: "Colors and Numbers from 1 to 20 (Couleurs et Nombres)",
            desc: "One, two, three... Red, blue, green, yellow, orange, purple, pink.",
            coreConcepts: [
              "Numbers 1 to 10 : one, two, three, four, five, six, seven, eight, nine, ten",
              "Numbers 11 to 20 : eleven, twelve, thirteen, fourteen, fifteen...",
              "Primary and secondary colors : red, blue, green, yellow, black, white",
              "Placing the color adjective BEFORE the noun : 'a blue car', 'a red apple'"
            ],
            practicalEx: "Décrire un objet : 'I see three yellow birds.' (En anglais, la couleur se place toujours AVANT le nom !)",
            formulas: ["A + Adjectif de couleur + Nom = A green tree"],
            sampleQuestions: [
              {
                question: "Comment dit-on 'un chat noir' en anglais en respectant la bonne place de l'adjectif ?",
                options: ["A black cat", "A cat black", "A noir cat", "The cat is black"],
                correctIndex: 0,
                explanation: "En anglais, l'adjectif se place toujours devant le nom : a black cat."
              }
            ]
          },
          {
            title: "Animals and Family (Les Animaux et la Famille)",
            desc: "Dog, cat, bird, horse... Father, mother, brother, sister, pet.",
            coreConcepts: [
              "Pets and farm animals : dog, cat, rabbit, bird, horse, cow, sheep",
              "Family members : mother/mom, father/dad, brother, sister, grandmother, grandfather",
              "Expressing possession : 'I have a dog', 'She has a brother'",
              "Asking questions : 'Do you have a pet?'"
            ],
            practicalEx: "Présenter sa famille : 'This is my mother. Her name is Sarah. We have one brown dog.'",
            formulas: ["I have = J'ai / He has = Il a / She has = Elle a"],
            sampleQuestions: [
              {
                question: "Quel mot anglais désigne la sœur dans la famille ?",
                options: ["Sister", "Brother", "Mother", "Father"],
                correctIndex: 0,
                explanation: "'Sister' signifie sœur (et 'Brother' signifie frère)."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Maîtriser le Present Simple et le Present Continuous (BE + V-ing).",
          "Exprimer le passé avec le Preterit (verbes réguliers en -ed et liste des verbes irréguliers).",
          "Utiliser les modaux de permission, d'obligation et d'interdiction (Can, Must, Should).",
          "Découvrir la culture des pays anglophones (Royaume-Uni, États-Unis, Australie, Canada)."
        ],
        chapters: [
          {
            title: "Present Simple vs. Present Continuous : Habitudes vs. Actions en Cours",
            desc: "Distinguer les vérités permanentes et routines des actions immédiates en train de se dérouler.",
            coreConcepts: [
              "Present Simple : pour les goûts, habitudes et vérités générales (adverbes : always, usually, often)",
              "Le 'S' impératif à la 3e personne du singulier : 'He plays, She likes'",
              "Present Continuous (BE au présent + Base verbale + -ING) : action au moment où l'on parle",
              "Formes négatives et interrogatives : auxiliaires Do/Does et Be"
            ],
            practicalEx: "Comparaison : 'Listen! John is playing the piano right now (Present Continuous), but he usually plays football on Saturdays (Present Simple).'",
            formulas: ["Present Continuous = Sujet + AM / IS / ARE + Verbe-ING"],
            sampleQuestions: [
              {
                question: "Quelle phrase illustre une action qui se déroule en ce moment même ?",
                options: ["Look! It is raining outside.", "It rains every day in November.", "It rained yesterday.", "It will rain tomorrow."],
                correctIndex: 0,
                explanation: "'Look! It is raining outside' utilise le Present Continuous (is raining) pour une action en train d'avoir lieu."
              }
            ]
          },
          {
            title: "Le Prétérit et les Verbes Irréguliers : Raconter au Passé",
            desc: "Les verbes réguliers avec terminaison -ED, la négation avec 'didn't' et les verbes irréguliers clés.",
            coreConcepts: [
              "Verbes réguliers : Base verbale + -ED (ex: watch -> watched, play -> played)",
              "Prononciation de -ED : /t/, /d/ ou /id/ (après t ou d)",
              "Verbes irréguliers indispensables : go/went, see/saw, buy/bought, have/had, be/was-were",
              "Négation et question au passé avec l'auxiliaire DID : 'I didn't go', 'Did you see?'"
            ],
            practicalEx: "Mettre au passé : 'Yesterday, Sarah went (go) to London and she bought (buy) a beautiful red coat.'",
            formulas: ["Négation au prétérit : Sujet + DID NOT (didn't) + Base Verbale à l'infinitif"],
            sampleQuestions: [
              {
                question: "Quel est le prétérit du verbe irrégulier 'to go' (aller) ?",
                options: ["Went", "Goed", "Gone", "Going"],
                correctIndex: 0,
                explanation: "Le prétérit de 'go' est 'went' (et son participe passé est 'gone')."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Exprimer des nuances complexes : conditionnels (If clauses), voix passive et discours indirect.",
          "Développer une argumentation fluide sur des thématiques contemporaines (médias, climat, égalité).",
          "Analyser des extraits littéraires anglophones (Shakespeare, Orwell, Woolf) et articles de presse.",
          "Perfectionner la compréhension orale et écrite au niveau B2 du CECRL."
        ],
        chapters: [
          {
            title: "Advanced Grammar : Conditionals, Subjunctive and Passive Voice",
            desc: "Conditionnels de type 0, 1, 2 et 3, inversion oratoire et structures passives journalistiques.",
            coreConcepts: [
              "Conditional Type 1 (réaliste) : If + Present -> WILL + V",
              "Conditional Type 2 (hypothèse imaginaire) : If + Past -> WOULD + V ('If I were you...')",
              "Conditional Type 3 (regret sur le passé) : If + Past Perfect -> WOULD HAVE + Past Participle",
              "La voix passive : BE (au temps voulu) + Participe passé ('The bridge was built in 1890')"
            ],
            practicalEx: "Expression du regret rétrospectif : 'If I had studied harder, I would have passed the Cambridge examination with honors.'",
            formulas: ["Third Conditional : If + Subject + HAD + V-pp, Subject + WOULD HAVE + V-pp"],
            sampleQuestions: [
              {
                question: "Quelle phrase traduit correctement un regret hypothétique dans le passé (Conditionnel 3) ?",
                options: ["If we had taken the early train, we wouldn't have missed the flight.", "If we take the train, we will arrive on time.", "If we took the train, we would arrive.", "We take the train."],
                correctIndex: 0,
                explanation: "La structure 'If + past perfect / would have + past participle' exprime une condition passée non réalisée et son regret."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Maîtriser la linguistique contrastive anglais/français, stylistique et traduction (thème et version).",
          "Étudier l'histoire littéraire britannique et américaine de la Renaissance au postmodernisme.",
          "Analyser la civilisation anglophone : systèmes constitutionnels comparés et politiques publiques.",
          "Rédiger des dissertations académiques en anglais au niveau C1/C2."
        ],
        chapters: [
          {
            title: "Linguistique Contrastive et Traductologie : Thème et Version",
            desc: "Transposition, modulation, étoffement, chassé-croisé et faux-amis idiomatiques.",
            coreConcepts: [
              "Les 7 procédés de traduction selon Vinay et Darbelnet (emprunt, calque, traduction littérale, transposition, modulation, équivalence, adaptation)",
              "Le chassé-croisé prépositionnel : 'He swam across the river' -> 'Il a traversé la rivière à la nage'",
              "L'étoffement des prépositions anglaises en français",
              "Évitement des faux-amis classiques (actually = en fait, currently = actuellement)"
            ],
            practicalEx: "Traduire avec chassé-croisé : 'The thief ran away' -> 'Le voleur s'est enfui en courant'.",
            formulas: ["Verbe de mouvement + Préposition de direction (EN) <=> Verbe de direction + Participe présent de moyen (FR)"],
            sampleQuestions: [
              {
                question: "En traductologie anglais-français, comment traduit-on par la technique du chassé-croisé : 'She danced into the room' ?",
                options: ["Elle entra dans la pièce en dansant", "Elle dansa dans la pièce", "Elle est entrée dansante", "Elle a dansé la pièce"],
                correctIndex: 0,
                explanation: "La préposition de direction anglaise 'into' devient le verbe principal français 'entra', tandis que le verbe anglais 'danced' devient le modifieur 'en dansant'."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Conduire des recherches critiques en littérature ou linguistique anglophone.",
          "Analyser les discours politiques et médiatiques anglophones (Critical Discourse Analysis).",
          "Étudier les littératures postcoloniales et études de genre dans le monde anglophone.",
          "Rédiger un mémoire de Master intégrale en langue anglaise académique."
        ],
        chapters: [
          {
            title: "Critical Discourse Analysis and Political Rhetoric in Anglophone Spheres",
            desc: "Pragmatique linguistique, cadrage idéologique, métaphores cognitives et analyse de corpus.",
            coreConcepts: [
              "Le cadre théorique de Norman Fairclough et Teun van Dijk",
              "Les métaphores conceptuelles en politique selon George Lakoff ('Metaphors We Live By')",
              "Modalité épistémique et déontique dans les discours présidentiels (Inaugural Addresses)",
              "Outils de linguistique de corpus computationnelle (analyse de collocations et fréquences)"
            ],
            practicalEx: "Analyse stylistique comparée des discours d'investiture de John F. Kennedy (1961) et Barack Obama (2009).",
            formulas: ["Discourse = Social Practice shaped by and shaping Power Relations"],
            sampleQuestions: [
              {
                question: "Quel linguiste cognitif a théorisé les métaphores conceptuelles organisant la pensée politique américaine dans 'Metaphors We Live By' et 'Moral Politics' ?",
                options: ["George Lakoff", "Noam Chomsky", "Ferdinand de Saussure", "William Labov"],
                correctIndex: 0,
                explanation: "George Lakoff a démontré que les métaphores conceptuelles structurent inconsciemment nos raisonnements politiques et sociaux."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  // 10. SCIENCES ÉCONOMIQUES ET SOCIALES (SES) & ÉCONOMIE
  // =================================================================
  {
    domainName: "Sciences Économiques et Sociales",
    keywords: ["economie", "ses", "microeconomie", "macroeconomie", "marche", "finance", "monnaie", "sociologie", "entreprise", "pib", "croissance", "inflation"],
    tiers: {
      primary: {
        objectives: [
          "Comprendre d'où vient l'argent et pourquoi le travail est rémunéré.",
          "Découvrir la monnaie, les billets, les pièces et les achats du quotidien.",
          "Faire la différence entre un besoin essentiel (manger, se loger) et une envie.",
          "Apprendre à épargner dans une tirelire pour réaliser un beau projet."
        ],
        chapters: [
          {
            title: "L'Argent, la Monnaie et les Achats du Quotidien",
            desc: "D'où viennent les pièces et les billets ? À quoi sert l'argent à la boulangerie ou au supermarché ?",
            coreConcepts: [
              "Le troc d'autrefois (échanger une pomme contre du pain)",
              "L'invention des pièces et billets de monnaie (l'Euro en France)",
              "Le salaire : la récompense du travail des adultes",
              "Besoins vitaux (se nourrir, se vêtir) vs simples envies"
            ],
            practicalEx: "Calcul de monnaie : si un livre coûte 7 euros et que tu donnes un billet de 10 euros, la commerçante te rend 3 euros (10 - 7 = 3).",
            formulas: ["Monnaie rendue = Somme payée - Prix de l'objet"],
            sampleQuestions: [
              {
                question: "Avant l'invention de la monnaie, comment les hommes échangeaient-ils leurs biens ?",
                options: ["Par le troc (échange direct d'objets)", "Par carte bancaire", "Par chèque", "Par smartphone"],
                correctIndex: 0,
                explanation: "Le troc consistait à échanger directement un bien contre un autre (ex: du blé contre du tissu)."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Comprendre le fonctionnement d'une entreprise et la création de richesse.",
          "Identifier les sources de revenus, les impôts et la redistribution solidaire.",
          "Analyser le budget des ménages et les mécanismes du crédit bancaire.",
          "Découvrir le rôle économique de l'État et des services publics."
        ],
        chapters: [
          {
            title: "L'Entreprise et la Création de Richesse : Chiffre d'Affaires et Bénéfice",
            desc: "Comment une entreprise produit-elle des biens ou des services ? Facteurs travail et capital.",
            coreConcepts: [
              "La différence entre un bien matériel (voiture, pain) et un service immatériel (coiffure, transport)",
              "Le chiffre d'affaires (l'ensemble des ventes)",
              "Les coûts de production (salaires, matières premières, électricité)",
              "Le bénéfice : Chiffre d'affaires - Coûts = Bénéfice net réinvesti ou partagé"
            ],
            practicalEx: "Calcul d'une boulangerie : elle vend 500 baguettes à 1,20 € (Chiffre d'affaires = 600 €). Ses dépenses (farine, électricité) s'élèvent à 250 €. Son bénéfice est de 600 - 250 = 350 €.",
            formulas: ["Bénéfice = Chiffre d'Affaires - Coûts Totaux"],
            sampleQuestions: [
              {
                question: "Quelle est la différence fondamentale entre le Chiffre d'Affaires et le Bénéfice d'une entreprise ?",
                options: ["Le chiffre d'affaires est le total des ventes, tandis que le bénéfice est ce qui reste après déduction de toutes les dépenses", "C'est la même chose", "Le bénéfice est toujours négatif", "Le chiffre d'affaires est un impôt"],
                correctIndex: 0,
                explanation: "Le chiffre d'affaires mesure l'activité commerciale brute, le bénéfice mesure le gain financier réel net."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Analyser les marchés concurrentiels : équilibre de l'offre et de la demande, et surplus.",
          "Comprendre la monnaie, la création monétaire par le crédit bancaire et les taux d'intérêt.",
          "Étudier la croissance économique, le PIB, les gains de productivité et les limites écologiques.",
          "Examiner la stratification sociale, la mobilité sociale et la réduction des inégalités."
        ],
        chapters: [
          {
            title: "Le Marché Concurrentiel : Équilibre de l'Offre, de la Demande et Formation des Prix",
            desc: "Loi de l'offre et de la demande, surplus du consommateur et du producteur, et élasticité-prix.",
            coreConcepts: [
              "L'hypothèse de concurrence pure et parfaite (atomicité, homogénéité, transparence, mobilité, libre entrée)",
              "La courbe de demande décroissante en fonction du prix et la courbe d'offre croissante",
              "Le prix et la quantité d'équilibre de marché",
              "Effets des taxes, des subventions ou des chocs d'offre/demande exogènes"
            ],
            practicalEx: "Effet d'une taxe carbone sur le carburant : déplacement de la courbe d'offre vers la gauche, entraînant une hausse du prix d'équilibre et une baisse de la quantité consommée.",
            formulas: ["Offre(P) = Demande(P) => Prix d'équilibre P*"],
            sampleQuestions: [
              {
                question: "Sur un marché concurrentiel normal, que se produit-il généralement si l'offre d'un bien augmente fortement sans changement de la demande ?",
                options: ["Le prix d'équilibre baisse et la quantité échangée augmente", "Le prix monte en flèche", "Le marché disparaît", "La demande s'annule"],
                correctIndex: 0,
                explanation: "L'abondance de l'offre par rapport à la demande exerce une pression à la baisse sur le prix d'équilibre."
              }
            ]
          },
          {
            title: "La Monnaie et le Financement de l'Économie : Le Rôle des Banques",
            desc: "Création monétaire, rôle de la Banque Centrale, politique monétaire et inflation.",
            coreConcepts: [
              "Les 3 fonctions de la monnaie (unité de compte, intermédiaire des échanges, réserve de valeur)",
              "Le mécanisme de la création monétaire : 'les crédits font les dépôts'",
              "Le rôle de la Banque Centrale Européenne (BCE) : fixer les taux directeurs et réguler l'inflation (cible de 2%)",
              "Les risques d'inflation excessive (perte de pouvoir d'achat) ou de déflation (spirale récessive)"
            ],
            practicalEx: "Lorsqu'une banque accorde un prêt immobilier de 200 000 € à un particulier, elle ne prend pas l'argent d'un autre épargnant : elle crée ex-nihilo cette somme sur le compte de l'emprunteur.",
            formulas: ["Taux d'intérêt réel = Taux d'intérêt nominal - Taux d'inflation"],
            sampleQuestions: [
              {
                question: "Comment la majeure partie de la monnaie en circulation moderne (monnaie scripturale) est-elle créée ?",
                options: ["Par les banques commerciales lorsqu'elles accordent des crédits aux ménages et aux entreprises", "Par l'impression exclusive de pièces en métal", "Par la découverte de mines d'or", "Par le parlement"],
                correctIndex: 0,
                explanation: "Les banques de second rang créent de la monnaie scripturale par simple jeu d'écriture comptable lors de l'octroi d'un prêt."
              }
            ]
          },
          {
            title: "Croissance Économique, Progrès Technique et Limites Environnementales",
            desc: "PIB, facteurs de production, productivité globale des facteurs (PGF) et soutenabilité.",
            coreConcepts: [
              "Définition et calcul du Produit Intérieur Brut (PIB) : somme des valeurs ajoutées",
              "Croissance extensive (accumulation du travail et du capital) vs Croissance intensive (progrès technique)",
              "Théories de la croissance endogène (Romer, Lucas, Barro) et investissements dans la R&D et le capital humain",
              "Externalités négatives environnementales et débat entre soutenabilité faible (substituabilité) et soutenabilité forte"
            ],
            practicalEx: "Calcul de la valeur ajoutée : Chiffre d'affaires (100 000 €) - Consommations intermédiaires (40 000 €) = 60 000 € de valeur ajoutée créée.",
            formulas: ["PIB = Somme des Valeurs Ajoutées + Impôts sur les produits - Subventions"],
            sampleQuestions: [
              {
                question: "Qu'est-ce que la 'Productivité Globale des Facteurs' (PGF) mesure dans l'analyse de la croissance ?",
                options: ["L'efficacité avec laquelle les facteurs travail et capital sont combinés, attribuable au progrès technique", "Le nombre d'ouvriers uniquement", "Le montant des dividendes", "Le coût de l'électricité"],
                correctIndex: 0,
                explanation: "La PGF représente la part de la croissance qui n'est pas expliquée par la simple hausse de la quantité de travail ou de machines (le résidu de Solow)."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Formaliser les modèles microéconomiques du consommateur et du producteur (Lagrangien, Slutsky).",
          "Maîtriser les modèles macroéconomiques d'équilibre général (IS-LM, AS-AD, Phillips).",
          "Pratiquer l'économétrie appliquée : régressions linéaires MCO, tests d'hétéroscédasticité et séries temporelles.",
          "Analyser les défaillances de marché : asymétrie d'information, aléa moral et sélection adverse."
        ],
        chapters: [
          {
            title: "Microéconomie Avancée : Théorie du Consommateur et Équilibre Général de Walras",
            desc: "Maximisation sous contrainte budgétaire, équation de Slutsky et premier théorème du bien-être.",
            coreConcepts: [
              "Fonction d'utilité ordinale U(x1, x2), Taux Marginal de Substitution (TMS)",
              "Optimisation par la méthode des multiplicateurs de Lagrange",
              "Effet substitution vs effet revenu dans l'équation de Slutsky",
              "L'optimum de Pareto et le Premier Théorème Fondamental de l'économie du bien-être"
            ],
            practicalEx: "Résolution analytique d'une fonction d'utilité Cobb-Douglas U(x, y) = x^alpha y^{1-alpha} sous la contrainte p_x x + p_y y = R.",
            formulas: ["TMS = (partial U / partial x_1) / (partial U / partial x_2) = p_1 / p_2", "L(x_1, x_2, lambda) = U(x_1, x_2) + lambda (R - p_1 x_1 - p_2 x_2)"],
            sampleQuestions: [
              {
                question: "Que signifie qu'une allocation de ressources est 'optimale au sens de Pareto' ?",
                options: ["Qu'il est impossible d'améliorer la situation d'un individu sans détériorer celle d'au moins un autre", "Que tout le monde a exactement le même revenu", "Que l'État contrôle tous les prix", "Que le chômage est à zéro"],
                correctIndex: 0,
                explanation: "L'optimum de Pareto désigne un état d'efficacité allocative où aucun gain mutuel supplémentaire n'est réalisable sans faire de perdant."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Modéliser la macroéconomie dynamique stochastique (modèles DSGE néo-keynésiens).",
          "Maîtriser la théorie des contrats, théorie des jeux et conception de mécanismes d'incitation.",
          "Conduire des évaluations d'impact économétriques (diff-in-diff, variables instrumentales, RDD).",
          "Analyser la régulation financière systémique et macroprudentielle (Accords de Bâle III/IV)."
        ],
        chapters: [
          {
            title: "Théorie des Contrats, Incitations et Asymétrie d'Information",
            desc: "Modèle Principal-Agent, sélection adverse, antisélection de Stiglitz-Akerlof et signal de Spence.",
            coreConcepts: [
              "Le modèle des 'Lemons' d'Akerlof : effondrement du marché sous asymétrie d'information",
              "La sélection adverse dans les assurances et le modèle de Rothschild-Stiglitz",
              "L'aléa moral (moral hazard) et la conception de contrats optimaux (franchises, bonus-malus)",
              "La théorie du signal de Michael Spence appliquée au marché du travail"
            ],
            practicalEx: "Dérivation de la rente informationnelle cédée à l'agent le plus productif pour révéler son véritable type dans un contrat de fourniture.",
            formulas: ["Contraintes d'incitation (IC) et contrainte de participation (IR) dans le problème du Principal"],
            sampleQuestions: [
              {
                question: "Dans le célèbre article de George Akerlof ('The Market for Lemons', 1970), que provoque l'asymétrie d'information sur la qualité des véhicules d'occasion ?",
                options: ["L'antisélection évince progressivement les véhicules de bonne qualité pour ne laisser que les 'citrons' (mauvais véhicules)", "Une baisse des impôts", "Une hausse uniforme des prix", "La disparition totale des acheteurs"],
                correctIndex: 0,
                explanation: "Les acheteurs ne pouvant vérifier la qualité proposent un prix moyen, ce qui dissuade les propriétaires de bonnes voitures de vendre, menant à l'antisélection."
              }
            ]
          }
        ]
      }
    }
  }
];
