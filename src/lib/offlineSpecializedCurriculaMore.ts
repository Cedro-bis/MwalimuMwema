/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubjectKnowledgeTier } from "./offlineCurriculaData";

export const SPECIALIZED_SUBJECT_TIERS_MORE: SubjectKnowledgeTier[] = [
  // =================================================================
  // 4. BASES DE DONNÉES ET SQL
  // =================================================================
  {
    domainName: "Bases de Données",
    keywords: [
      "base de donnees",
      "bases de donnees",
      "bdd",
      "sql",
      "mysql",
      "postgresql",
      "nosql",
      "relationnel",
      "requete sql",
      "select",
      "join",
      "database"
    ],
    tiers: {
      primary: {
        objectives: [
          "Comprendre ce qu'est un fichier ou carnet d'informations bien rangé.",
          "Découvrir la notion de tableau avec des colonnes (titres) et des lignes (entrées).",
          "Apprendre à chercher une information rapidement sans tout relire.",
          "Comprendre pourquoi il ne faut pas mélanger les affaires dans son classeur."
        ],
        chapters: [
          {
            title: "Le Grand Classeur Magique : Découvrir les Tableaux de Données",
            desc: "Pourquoi range-t-on les informations dans des colonnes et des lignes bien droites ?",
            coreConcepts: [
              "La ligne : une fiche d'identité (un élève, un livre, un animal)",
              "La colonne : un renseignement précis (Nom, Prénom, Âge, Couleur préférée)",
              "Le tri : ranger par ordre alphabétique ou du plus petit au plus grand",
              "Le filtre : n'afficher que les élèves qui ont 10 ans"
            ],
            practicalEx: "Dans le carnet de la classe, trouver immédiatement le numéro de téléphone de Lucas grâce à la colonne 'Téléphone'.",
            formulas: ["Tableau = Lignes (enregistrements) × Colonnes (attributs)"],
            sampleQuestions: [
              {
                question: "Dans un tableau de bibliothèque, que représente généralement une ligne ?",
                options: ["Un livre précis avec toutes ses informations", "Le nom du concierge", "La couleur du mur", "Une page blanche"],
                correctIndex: 0,
                explanation: "Dans une table de base de données, chaque ligne représente un élément unique (un enregistrement)."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Comprendre le modèle d'une table relationnelle (attributs, types de données, enregistrements).",
          "Découvrir la clé primaire garantissant l'unicité de chaque ligne.",
          "Écrire des requêtes simples en langage SQL (SELECT, FROM, WHERE).",
          "Trier et ordonner les résultats avec ORDER BY."
        ],
        chapters: [
          {
            title: "Organisation d'une Base Relationnelle et Clé Primaire",
            desc: "Tables, colonnes typées (texte, entier, date) et identifiant unique.",
            coreConcepts: [
              "La table comme ensemble de fiches structurées",
              "Types de données : INT (entier), VARCHAR/TEXT (texte), DATE, BOOLEAN",
              "La Clé Primaire (Primary Key) : un identifiant unique qui ne se répète jamais",
              "Pourquoi on n'utilise jamais le nom de famille comme clé (les homonymes)"
            ],
            practicalEx: "Dans une table 'Eleves', chaque élève possède un identifiant unique 'id_eleve' (ex: 101, 102, 103) pour éviter toute confusion entre deux personnes du même nom.",
            formulas: ["PRIMARY KEY (id)"],
            sampleQuestions: [
              {
                question: "Quel est le rôle indispensable d'une clé primaire dans une table de base de données ?",
                options: ["Identifier de manière unique et certaine chaque enregistrement d'une table", "Changer la couleur du texte", "Trier automatiquement par taille", "Supprimer les données périmées"],
                correctIndex: 0,
                explanation: "La clé primaire garantit qu'aucune ligne ne peut être confondue avec une autre, assurant l'intégrité de la table."
              }
            ]
          },
          {
            title: "Interrogation des Données en SQL : SELECT, FROM et WHERE",
            desc: "Formuler des questions précises à la base de données avec la syntaxe normalisée.",
            coreConcepts: [
              "La structure de base : SELECT [colonnes] FROM [table]",
              "Sélectionner toutes les colonnes avec l'étoile : SELECT *",
              "Filtrer les lignes avec WHERE et les opérateurs (=, !=, <, >, <=, >=)",
              "Combiner les conditions avec AND, OR et NOT"
            ],
            practicalEx: "Afficher le nom et le prix des produits qui coûtent moins de 20 € : SELECT nom, prix FROM Produits WHERE prix < 20;",
            formulas: ["SELECT colonne1, colonne2 FROM NomTable WHERE condition;"],
            sampleQuestions: [
              {
                question: "En SQL, quel mot-clé permet de filtrer les résultats selon une condition logique ?",
                options: ["WHERE", "FILTER", "SEARCH", "WHEN"],
                correctIndex: 0,
                explanation: "WHERE est la clause standard de filtrage des lignes en langage SQL."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Modéliser une base de données avec des clés étrangères (intégrité référentielle).",
          "Maîtriser les jointures relationnelles : INNER JOIN sur clés liées.",
          "Utiliser les fonctions d'agrégation (COUNT, SUM, AVG, MIN, MAX) et GROUP BY.",
          "Manipuler les données avec INSERT, UPDATE et DELETE."
        ],
        chapters: [
          {
            title: "Le Modèle Relationnel et Clés Étrangères (Foreign Keys)",
            desc: "Lier des tables entre elles sans duplication, relations 1-à-plusieurs et intégrité référentielle.",
            coreConcepts: [
              "La clé étrangère (Foreign Key) référençant la clé primaire d'une autre table",
              "Éviter la redondance d'informations (anomalies de mise à jour)",
              "Contraintes d'intégrité référentielle (ON DELETE CASCADE, RESTRICT)",
              "Représentation schématique des relations entre tables (schéma relationnel)"
            ],
            practicalEx: "Table 'Commandes' contenant 'client_id' qui pointe vers la table 'Clients(id)'. On ne stocke pas l'adresse du client dans chaque commande.",
            formulas: ["FOREIGN KEY (client_id) REFERENCES Clients(id)"],
            sampleQuestions: [
              {
                question: "Qu'est-ce qu'une clé étrangère dans une base de données relationnelle ?",
                options: ["Un attribut qui fait référence à la clé primaire d'une autre table", "Un mot de passe chiffré", "Une clé venue d'un autre pays", "Une table temporaire"],
                correctIndex: 0,
                explanation: "Une clé étrangère crée un lien formel entre deux tables en pointant vers la clé primaire de la table cible."
              }
            ]
          },
          {
            title: "Jointures SQL et Fonctions d'Agrégation Avancées",
            desc: "Croiser plusieurs tables avec INNER JOIN, regrouper les données avec GROUP BY et HAVING.",
            coreConcepts: [
              "La jointure interne : SELECT ... FROM A INNER JOIN B ON A.id = B.a_id",
              "Fonctions d'agrégation : COUNT(*), SUM(prix), AVG(note), MAX(score)",
              "Le regroupement par catégorie avec GROUP BY",
              "Filtrer les groupes avec HAVING condition (différence entre WHERE et HAVING)"
            ],
            practicalEx: "Calculer le chiffre d'affaires par ville : SELECT ville, SUM(montant) FROM Commandes JOIN Clients ON Commandes.client_id = Clients.id GROUP BY ville;",
            formulas: ["SELECT cat, COUNT(*) FROM T JOIN U ON T.id = U.t_id GROUP BY cat HAVING COUNT(*) > 5;"],
            sampleQuestions: [
              {
                question: "Quelle clause SQL permet de filtrer les résultats APRÈS un regroupement effectué par GROUP BY ?",
                options: ["HAVING", "WHERE", "ORDER", "LIMIT"],
                correctIndex: 0,
                explanation: "HAVING filtre les agrégats calculés après le GROUP BY, tandis que WHERE filtre les lignes brutes avant le regroupement."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Théorie de la normalisation : 1ère, 2ème, 3ème Forme Normale (3FN) et Boyce-Codd (BCNF).",
          "Propriétés ACID des transactions, mécanismes de verrouillage et niveaux d'isolation.",
          "Optimisation des requêtes : plans d'exécution (EXPLAIN), indexation B-Tree et Hash.",
          "Conception de bases NoSQL (documents, clé-valeur, colonnes larges, graphes) et théorème CAP."
        ],
        chapters: [
          {
            title: "Normalisation et Dépendances Fonctionnelles (1FN, 2FN, 3FN et BCNF)",
            desc: "Axiomes d'Armstrong, décomposition sans perte d'information et préservation des dépendances.",
            coreConcepts: [
              "Définition formelle des dépendances fonctionnelles X -> Y",
              "Fermeture d'un ensemble d'attributs et recherche algorithmique des clés candidates",
              "1ère Forme Normale (atomicité des valeurs des attributs)",
              "2ème FN (pas de dépendance partielle) et 3ème FN (pas de dépendance transitive non triviale)"
            ],
            practicalEx: "Décomposition d'une table à dépendance transitive Client -> CodePostal -> Ville en deux relations en 3FN pour éliminer les anomalies d'insertion.",
            formulas: ["3FN : Pour tout X -> A non trivial, X est superclé OU A est attribut premier"],
            sampleQuestions: [
              {
                question: "Quelle condition fondamentale caractérise la Troisième Forme Normale (3FN) ?",
                options: ["Aucun attribut non clé ne dépend de manière transitive d'une clé candidate", "Toutes les tables ont moins de 10 colonnes", "Les requêtes s'exécutent en moins d'une seconde", "Tous les nombres sont entiers"],
                correctIndex: 0,
                explanation: "La 3FN élimine les dépendances transitives, assurant que chaque information non clé dépend directement et uniquement de la clé."
              }
            ]
          },
          {
            title: "Transactions ACID, Contrôle de Concurrence et Indexation B-Tree",
            desc: "Atomicité, Cohérence, Isolation, Durabilité, verrouillage à deux phases (2PL) et structures d'index.",
            coreConcepts: [
              "Les 4 propriétés ACID et le journal des transactions (Write-Ahead Logging / WAL)",
              "Niveaux d'isolation SQL-92 (Read Uncommitted, Read Committed, Repeatable Read, Serializable)",
              "Anomalies de concurrence : dirty read, non-repeatable read, phantom read",
              "Structure physique d'un index B+Tree : temps d'accès en O(log N) et sélectivité"
            ],
            practicalEx: "Transaction bancaire de virement : BEGIN TRANSACTION; UPDATE Comptes SET solde = solde - 100 WHERE id = 1; UPDATE Comptes SET solde = solde + 100 WHERE id = 2; COMMIT; assurant l'atomicité totale.",
            formulas: ["ACID = Atomicité, Cohérence, Isolation, Durabilité"],
            sampleQuestions: [
              {
                question: "Quelle propriété ACID garantit qu'une transaction s'exécute entièrement ou est complètement annulée en cas de panne ?",
                options: ["L'Atomicité", "La Durabilité", "L'Isolation", "La Cohérence"],
                correctIndex: 0,
                explanation: "L'Atomicité (tout ou rien) assure qu'aucune modification partielle ne peut être enregistrée si une erreur survient."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Architectures distribuées : sharding, réplication maître-esclave, consensus Raft/Paxos.",
          "Théorème CAP, modèles de cohérence éventuelle (Eventual Consistency) et CRDTs.",
          "Entrepôts de données (Data Warehouses), modélisation en étoile/flocon et architectures Lakehouse.",
          "Moteurs de traitement distribué (Apache Spark, Trino) et streaming de données en temps réel (Kafka)."
        ],
        chapters: [
          {
            title: "Systèmes de Données Distribués : Théorème CAP, Consensus et Sharding",
            desc: "Partitionnement horizontal, réplication synchrone/asynchrone et résolution de conflits distribués.",
            coreConcepts: [
              "Le théorème CAP de Brewer (Cohérence, Disponibilité, Tolérance au partitionnement)",
              "Algorithmes de consensus distribué : Raft et Paxos",
              "Partitionnement par hachage cohérent (Consistent Hashing) et rééquilibrage de nœuds",
              "Types de données répliquées sans conflit (CRDT : Conflict-free Replicated Data Types)"
            ],
            practicalEx: "Conception d'un cluster distributed key-value résistant à la coupure de réseau de 2 nœuds sur 5 tout en garantissant un quorum de lecture/écriture (R + W > N).",
            formulas: ["Quorum : R + W > N (pour garantir la cohérence séquentielle)"],
            sampleQuestions: [
              {
                question: "Selon le théorème CAP, que doit sacrifier un système distribué lors d'un partitionnement réseau (P) inévitable ?",
                options: ["Soit la cohérence stricte (C), soit la disponibilité absolue (A)", "La sécurité des données", "La vitesse des disques", "L'électricité"],
                correctIndex: 0,
                explanation: "En présence d'une coupure réseau (P), le système doit choisir entre rejeter des requêtes pour rester cohérent (CP) ou répondre avec des données potentiellement périmées (AP)."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  // 5. PROBABILITÉS ET STATISTIQUES (Sujet dédié distinct de l'algèbre/géométrie)
  // =================================================================
  {
    domainName: "Probabilités et Statistiques",
    keywords: [
      "probabilite",
      "probabilites",
      "statistique",
      "statistiques",
      "loi normale",
      "loi binomiale",
      "moyenne",
      "mediane",
      "variance",
      "ecart type",
      "variable aleatoire",
      "echantillonnage",
      "estimation",
      "esperance",
      "proba"
    ],
    tiers: {
      primary: {
        objectives: [
          "Comprendre les notions de hasard, de chance et d'impossibilité.",
          "Lire et compléter un tableau simple ou un graphique en bâtons.",
          "Calculer une moyenne simple de notes ou de points.",
          "Jouer avec des dés et des pièces pour observer les résultats possibles."
        ],
        chapters: [
          {
            title: "Le Hasard, la Chance et les Jeux de Dés",
            desc: "Découvrir ce qui est certain, probable ou complètement impossible.",
            coreConcepts: [
              "Événement certain : demain le soleil se lèvera",
              "Événement impossible : obtenir un 7 avec un dé à 6 faces",
              "Événement possible : tirer une bille rouge dans un sac mélangé",
              "Avoir autant de chances (pile ou face)"
            ],
            practicalEx: "Dans un sac avec 3 bonbons à la fraise et 1 au citron, il y a plus de chances de piocher de la fraise que du citron.",
            formulas: ["Plus de chances = Plus d'éléments favorables"],
            sampleQuestions: [
              {
                question: "Si tu lances une pièce de monnaie équilibrée, quel résultat as-tu autant de chances d'obtenir ?",
                options: ["Pile ou Face (1 chance sur 2)", "Toujours Pile", "Toujours la tranche", "Jamais rien"],
                correctIndex: 0,
                explanation: "Une pièce équilibrée offre exactement 1 chance sur 2 d'obtenir Pile et 1 chance sur 2 d'obtenir Face."
              }
            ]
          },
          {
            title: "Lire un Graphique et Calculer une Moyenne",
            desc: "Regarder des diagrammes en barres et faire des partages équitables de points.",
            coreConcepts: [
              "Le diagramme en bâtons pour comparer des quantités",
              "Trouver la valeur la plus grande et la plus petite",
              "La moyenne : mettre tout en commun et partager en parts égales",
              "Le calcul : additionner puis diviser par le nombre de données"
            ],
            practicalEx: "Léa a eu 12, 14 et 16 aux trois contrôles. Somme = 42. Moyenne = 42 / 3 = 14.",
            formulas: ["Moyenne = Somme totale / Nombre de notes"],
            sampleQuestions: [
              {
                question: "Quelle est la moyenne des deux nombres 10 et 20 ?",
                options: ["15", "30", "12", "18"],
                correctIndex: 0,
                explanation: "(10 + 20) / 2 = 30 / 2 = 15."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Organiser des données statistiques : effectifs, fréquences et pourcentages.",
          "Calculer la moyenne (simple et pondérée), la médiane et l'étendue d'une série.",
          "Calculer des probabilités simples dans des situations d'équiprobabilité (P = favorables / possibles).",
          "Construire et exploiter un arbre des probabilités à deux épreuves indépendantes."
        ],
        chapters: [
          {
            title: "Statistiques Descriptives : Moyenne, Médiane et Étendue",
            desc: "Analyser une série de données, trouver la valeur centrale et mesurer la dispersion.",
            coreConcepts: [
              "Effectif total N et fréquences (fréquence = effectif / effectif total)",
              "Moyenne pondérée : somme des (valeurs × coefficients) divisée par la somme des coefficients",
              "Médiane Me : valeur qui partage la population en deux groupes de même effectif",
              "Étendue : différence entre la plus grande valeur et la plus petite valeur"
            ],
            practicalEx: "Notes ordonnées : 8, 11, 13, 15, 17. Médiane = 13 (la valeur du milieu). Étendue = 17 - 8 = 9.",
            formulas: ["Moyenne pondérée = sum(xi * ni) / sum(ni)", "Étendue = Max - Min"],
            sampleQuestions: [
              {
                question: "Quelle est la médiane de la série statistique ordonnée suivante : 5, 8, 12, 16, 20 ?",
                options: ["12", "8", "16", "12.2"],
                correctIndex: 0,
                explanation: "Il y a 5 valeurs. La valeur centrale (3ème) est 12, qui sépare la série en deux sous-groupes de 2 valeurs."
              }
            ]
          },
          {
            title: "Probabilités : Équiprobabilité et Arbres de Choix",
            desc: "Calculer la probabilité d'un événement, événement contraire et arbres à deux épreuves.",
            coreConcepts: [
              "Expérience aléatoire et ensemble des issues (univers Ω)",
              "Formule de l'équiprobabilité : P(A) = Nombre d'issues favorables / Nombre total d'issues possibles",
              "Événement contraire : P(non A) = 1 - P(A)",
              "Règle multiplicative sur un arbre pondéré pour des épreuves successives"
            ],
            practicalEx: "Dans un jeu de 32 cartes, quelle est la probabilité de tirer un As ? Il y a 4 As sur 32 cartes : P = 4/32 = 1/8 = 0,125 (soit 12,5%).",
            formulas: ["P(A) = Cas favorables / Cas possibles", "P(A bar) = 1 - P(A)", "0 <= P(A) <= 1"],
            sampleQuestions: [
              {
                question: "On lance un dé équilibré à 6 faces. Quelle est la probabilité d'obtenir un multiple de 3 (3 ou 6) ?",
                options: ["2/6 = 1/3", "1/6", "3/6 = 1/2", "4/6 = 2/3"],
                correctIndex: 0,
                explanation: "Les issues favorables sont 3 et 6, soit 2 issues sur 6 possibles : 2/6 = 1/3."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Maîtriser les probabilités conditionnelles et la formule des probabilités totales.",
          "Définir une variable aléatoire, calculer son espérance E(X), sa variance V(X) et son écart-type σ(X).",
          "Étudier la loi binomiale B(n, p) : schéma de Bernoulli et coefficients binomiaux.",
          "Comprendre les lois à densité : loi uniforme et loi normale (courbe de Gauss)."
        ],
        chapters: [
          {
            title: "Probabilités Conditionnelles et Indépendance",
            desc: "Probabilité de B sachant A, arbres pondérés et formule des probabilités totales.",
            coreConcepts: [
              "Définition formelle : P_A(B) = P(A ∩ B) / P(A) avec P(A) > 0",
              "Critère d'indépendance de deux événements : P(A ∩ B) = P(A) × P(B) <=> P_A(B) = P(B)",
              "Formule des probabilités totales pour une partition de l'univers : P(B) = sum P(Ai ∩ B)",
              "Théorème de Bayes pour inverser les probabilités conditionnelles"
            ],
            practicalEx: "Dépistage médical : calcul de la valeur prédictive positive d'un test sensible à 99% dans une population où la maladie est rare (1/1000).",
            formulas: ["P_A(B) = P(A ∩ B) / P(A)", "P(B) = P(A) * P_A(B) + P(A bar) * P_{A bar}(B)"],
            sampleQuestions: [
              {
                question: "Si deux événements A et B sont indépendants avec P(A) = 0,4 et P(B) = 0,5, que vaut P(A ∩ B) ?",
                options: ["0,20", "0,90", "0,10", "0,45"],
                correctIndex: 0,
                explanation: "Par indépendance, P(A ∩ B) = P(A) × P(B) = 0,4 × 0,5 = 0,20."
              }
            ]
          },
          {
            title: "Variables Aléatoires et Loi Binomiale B(n, p)",
            desc: "Loi de probabilité d'une variable aléatoire, espérance mathématique et répétition d'épreuves de Bernoulli.",
            coreConcepts: [
              "Définition d'une variable aléatoire X et tableau de sa loi de probabilité",
              "Espérance E(X) = sum xi*pi, variance V(X) = E(X²) - (E(X))² et écart-type σ = √V",
              "Schéma de Bernoulli : répétition de n épreuves identiques et indépendantes à 2 issues (succès/échec)",
              "Formule de la loi binomiale : P(X = k) = (n parmi k) × p^k × (1 - p)^{n - k} avec E(X) = np"
            ],
            practicalEx: "On lance 10 fois une pièce équilibrée. Probabilité d'avoir exactement 5 piles : (10 parmi 5) × 0,5⁵ × 0,5⁵ = 252 / 1024 ≈ 0,246 (24,6%).",
            formulas: ["P(X = k) = binom(n, k) * p^k * (1 - p)^{n - k}", "E(X) = n * p", "V(X) = n * p * (1 - p)"],
            sampleQuestions: [
              {
                question: "Quelle est l'espérance mathématique d'une variable aléatoire X suivant la loi binomiale B(100, 0,3) ?",
                options: ["30", "3", "70", "21"],
                correctIndex: 0,
                explanation: "Pour une loi binomiale B(n, p), l'espérance est E(X) = n × p = 100 × 0,3 = 30."
              }
            ]
          },
          {
            title: "Loi Normale et Théorème Central Limite (Introduction)",
            desc: "Variables aléatoires continues, densité de probabilité, loi normale centrée réduite N(0, 1) et intervalles de fluctuation.",
            coreConcepts: [
              "Fonction de densité de probabilité continue f(x) >= 0 telle que l'intégrale totale vaille 1",
              "Loi normale centrée réduite N(0, 1) et sa courbe en cloche de Gauss symétrique",
              "Théorème des 1σ (68%), 2σ (95%) et 3σ (99,7%) pour toute loi normale N(μ, σ²)",
              "Intervalle de fluctuation asymptotique au seuil de 95% : [p - 1,96√(p(1-p)/n) ; p + 1,96√(p(1-p)/n)]"
            ],
            practicalEx: "Si les notes à un concours national suivent N(10, 4) (moyenne 10, écart-type 2), environ 95% des candidats ont entre 10 - 2×2 = 6 et 10 + 2×2 = 14.",
            formulas: ["P(μ - 2σ <= X <= μ + 2σ) ≈ 0.954", "Z = (X - μ) / σ ~ N(0, 1)"],
            sampleQuestions: [
              {
                question: "Pour une variable normale X suivant la loi N(μ, σ²), quel pourcentage approximatif des valeurs se situe dans l'intervalle [μ - 2σ ; μ + 2σ] ?",
                options: ["Environ 95%", "Environ 50%", "Environ 68%", "100%"],
                correctIndex: 0,
                explanation: "La règle empirique de la loi normale établit qu'environ 95,4% de la masse de probabilité se trouve à moins de deux écarts-types de la moyenne."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Fondements de la théorie de la mesure et espaces probabilisés de Kolmogorov (Ω, F, P).",
          "Convergence des variables aléatoires : presque sûre, en probabilité, en loi et dans L^p.",
          "Démonstration rigoureuse de la Loi Forte des Grands Nombres et du Théorème Central Limite.",
          "Statistique inférentielle : estimateurs sans biais, convergence, méthode du maximum de vraisemblance et tests d'hypothèses."
        ],
        chapters: [
          {
            title: "Espaces Probabilisés et Théorie de la Mesure",
            desc: "Tribus boréliennes, mesures de probabilité, variables aléatoires mesurables et intégrale de Lebesgue.",
            coreConcepts: [
              "Axiomatique de Kolmogorov : univers Ω, tribu F (σ-algèbre) et mesure de probabilité P countably additive",
              "Variables aléatoires comme applications mesurables et tribu engendrée σ(X)",
              "Espérance définie comme l'intégrale de Lebesgue E(X) = ∫_Ω X dP",
              "Théorèmes de convergence dominée de Lebesgue et lemme de Fatou appliqués aux probabilités"
            ],
            practicalEx: "Démonstration que la mesure de Lebesgue sur [0, 1] muni de la tribu borélienne constitue le modèle continu parfait pour la loi uniforme U([0, 1]).",
            formulas: ["P(bigcup An) = sum P(An) (si disjoints)", "E[X] = int_Ω X(ω) dP(ω)"],
            sampleQuestions: [
              {
                question: "Quel théorème d'intégration assure que la limite d'une suite d'espérances E(X_n) égale l'espérance de la limite sous réserve d'une domination intégrable |X_n| <= Y ?",
                options: ["Le Théorème de Convergence Dominée de Lebesgue", "Le théorème de Pythagore", "La règle de L'Hôpital", "Le lemme de Zorn"],
                correctIndex: 0,
                explanation: "Le Théorème de Convergence Dominée est l'outil fondamental de l'analyse moderne autorisant l'interversion limite / espérance."
              }
            ]
          },
          {
            title: "Théorèmes Limites et Statistique Inférentielle",
            desc: "Loi des grands nombres, fonctions caractéristiques, TCL, maximum de vraisemblance et tests de Student/Chi2.",
            coreConcepts: [
              "Fonction caractéristique φ_X(t) = E[e^{itX}] et son injectivité déterminant univoquement la loi",
              "Loi Forte des Grands Nombres (LFGN) : convergence presque sûre de la moyenne empirique vers l'espérance",
              "Théorème Central Limite (TCL) : convergence en loi de √n (Xbar_n - μ) / σ vers N(0, 1)",
              "Estimateur du Maximum de Vraisemblance (EMV), information de Fisher et borne de Cramér-Rao"
            ],
            practicalEx: "Construction du test d'hypothèse de Neyman-Pearson au seuil de risque α = 5% pour tester la conformité d'une chaîne industrielle de fabrication.",
            formulas: ["φ_X(t) = E[e^{i t X}]", "sqrt(n) (bar{X}_n - μ) / σ -d-> N(0, 1)", "I(θ) = -E[∂² ln L / ∂θ²]"],
            sampleQuestions: [
              {
                question: "Quelle borne théorique minime la variance de tout estimateur sans biais d'un paramètre θ en statistique inférentielle ?",
                options: ["La borne de Cramér-Rao (1 / I(θ))", "L'infini", "Le zéro absolu", "La constante d'Euler"],
                correctIndex: 0,
                explanation: "L'inégalité de Cramér-Rao établit que Var(T) >= 1 / I_n(θ) pour tout estimateur non biaisé, I_n étant l'information de Fisher."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Processus stochastiques en temps continu : mouvement brownien et martingales.",
          "Calcul stochastique d'Itô : intégrale d'Itô, lemme d'Itô et équations différentielles stochastiques (EDS).",
          "Statistique non-paramétrique, apprentissage statistique et bornes de concentration (Hoeffding, McDiarmid).",
          "Méthodes bayésiennes modernes : échantillonnage MCMC (Metropolis-Hastings, Gibbs) et inférence variationnelle."
        ],
        chapters: [
          {
            title: "Calcul Stochastique d'Itô et Équations Différentielles Stochastiques",
            desc: "Mouvement brownien standard, filtration naturelle, intégrale stochastique par rapport à une semi-martingale et lemme d'Itô.",
            coreConcepts: [
              "Mouvement brownien (processus de Wiener) : trajectoires presque sûrement continues, accroissements indépendants et gaussiens",
              "Intégrale stochastique d'Itô ∫ H_s dW_s et isométrie d'Itô E[(∫ H dW)²] = E[∫ H² ds]",
              "Formule canonique d'Itô : df(t, W_t) = ∂_t f dt + ∂_x f dW_t + (1/2) ∂²_xx f dt (terme quadratique dW² = dt)",
              "Modèle de Black-Scholes et théorème de Girsanov pour le changement de probabilité risque-neutre"
            ],
            practicalEx: "Résolution de l'EDS du mouvement brownien géométrique dS_t = μ S_t dt + σ S_t dW_t donnant S_t = S_0 exp((μ - σ²/2)t + σ W_t).",
            formulas: ["(dW_t)² = dt", "df(X_t) = f'(X_t) dX_t + (1/2) f''(X_t) d<X>_t", "E[int_0^T H_s dW_s] = 0"],
            sampleQuestions: [
              {
                question: "Pourquoi le calcul d'Itô fait-il apparaître un terme supplémentaire d'ordre 2 ((1/2) f''(x) dt) absent du calcul différentiel classique ?",
                options: ["Parce que la variation quadratique du mouvement brownien est non nulle : (dW_t)² = dt", "C'est une erreur de calcul historique", "Parce que le temps avance deux fois plus vite", "Pour compenser l'arrondi numérique"],
                correctIndex: 0,
                explanation: "La variation quadratique non nulle du mouvement brownien dW_t² = dt introduit le terme correcteur du second ordre dans le développement de Taylor d'Itô."
              }
            ]
          }
        ]
      }
    }
  }
];
