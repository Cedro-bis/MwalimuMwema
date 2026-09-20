/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubjectKnowledgeTier } from "./offlineCurriculaData";

/**
 * Highly specialized, topic-specific offline curricula designed to eliminate hallucinations
 * (e.g. Web programming getting Python, Geometry getting polynomials, etc.)
 */
export const SPECIALIZED_SUBJECT_TIERS: SubjectKnowledgeTier[] = [
  // =================================================================
  // 1. PROGRAMMATION WEB / DÉVELOPPEMENT WEB
  // =================================================================
  {
    domainName: "Programmation Web",
    keywords: [
      "programmation web",
      "developpement web",
      "web",
      "html",
      "css",
      "javascript web",
      "frontend",
      "site web",
      "creation web",
      "web dev",
      "html5",
      "css3",
      "dom",
      "navigateur"
    ],
    tiers: {
      primary: {
        objectives: [
          "Découvrir ce qu'est un site Internet et comment les pages s'affichent.",
          "Comprendre la différence entre un texte, une image et un lien cliquable.",
          "Découvrir les premières balises secrètes pour fabriquer une mini-page Web.",
          "Adopter les bons réflexes pour explorer le Web en toute sécurité."
        ],
        chapters: [
          {
            title: "Comment Fonctionne un Site Web : Les Secrets d'Internet",
            desc: "Découvrir les coulisses d'une page Web : le rôle de l'ordinateur, du navigateur et du serveur.",
            coreConcepts: [
              "Le navigateur Web (Chrome, Firefox, Safari)",
              "L'adresse du site (URL) comme une adresse postale",
              "Le serveur qui stocke les images et les pages",
              "La différence entre regarder un site et le fabriquer"
            ],
            practicalEx: "Quand tu tapes une adresse web, ton navigateur envoie une lettre au serveur qui lui renvoie la page demandée.",
            formulas: ["Navigateur (Toi) + Internet -> Serveur Web -> Page affichée"],
            sampleQuestions: [
              {
                question: "Quel logiciel utilise-t-on pour afficher et visiter des sites Web sur son écran ?",
                options: ["Un navigateur Web", "Une calculatrice", "Un jeu vidéo", "Une imprimante"],
                correctIndex: 0,
                explanation: "Le navigateur Web (comme Chrome ou Safari) permet de lire le code et d'afficher les pages Internet."
              },
              {
                question: "Que signifie le mot 'lien' (ou hyperlien) sur une page Web ?",
                options: ["Un bouton ou texte sur lequel on clique pour ouvrir une autre page", "Un câble derrière l'ordinateur", "Un mot de passe", "Un dessin animé"],
                correctIndex: 0,
                explanation: "Un lien hypertexte permet de naviguer d'une page à une autre d'un simple clic."
              }
            ]
          },
          {
            title: "Les Briques de la Page : Titres, Textes et Images avec HTML",
            desc: "Apprendre comment le langage HTML structure tout ce qui apparaît sur l'écran.",
            coreConcepts: [
              "Le langage HTML (la structure de la maison)",
              "Les balises ouvrantes et fermantes (<p> et </p>)",
              "Les titres du plus grand au plus petit (h1 à h3)",
              "Insérer une belle image avec la balise <img>"
            ],
            practicalEx: "Écrire <h1>Mon Super Blog</h1> pour afficher le plus grand titre en haut de sa page.",
            formulas: ["<h1>Grand Titre</h1>", "<p>Mon paragraphe de texte</p>"],
            sampleQuestions: [
              {
                question: "En HTML, quelle balise utilise-t-on pour écrire un paragraphe de texte ordinaire ?",
                options: ["<p>", "<h1>", "<texte>", "<img>"],
                correctIndex: 0,
                explanation: "<p> signifie 'paragraphe' en HTML et encadre le texte normal."
              }
            ]
          },
          {
            title: "Mettre de la Couleur et du Style avec CSS",
            desc: "Changer la couleur du texte, le fond de la page et la taille des écritures.",
            coreConcepts: [
              "Le langage CSS (la peinture et la décoration)",
              "Changer la couleur (color: red, blue, green)",
              "La couleur d'arrière-plan (background-color)",
              "Changer la taille des lettres (font-size)"
            ],
            practicalEx: "Appliquer du bleu au titre : h1 { color: blue; } pour que tous les grands titres soient bleus.",
            formulas: ["Sélecteur { propriété: valeur; }", "p { color: green; font-size: 18px; }"],
            sampleQuestions: [
              {
                question: "À quoi sert le langage CSS sur un site Web ?",
                options: ["À donner des couleurs, du style et une belle présentation", "À allumer l'ordinateur", "À taper au clavier", "À effacer la mémoire"],
                correctIndex: 0,
                explanation: "Le CSS s'occupe de la mise en page, des couleurs et de la beauté visuelle du site."
              }
            ]
          },
          {
            title: "Les Boutons Magiques et l'Interactivité",
            desc: "Découvrir comment un bouton réagit quand on clique dessus grâce au code.",
            coreConcepts: [
              "La balise <button> pour créer un bouton cliquable",
              "L'action du clic de souris",
              "Afficher un petit message secret 'Bravo !' au clic",
              "Fabriquer un petit jeu de devinette sur sa page"
            ],
            practicalEx: "Cliquer sur un bouton 'Clique ici pour voir mon animal préféré' et voir l'image apparaître.",
            formulas: ["<button>Clique-moi</button>"],
            sampleQuestions: [
              {
                question: "Quelle balise HTML permet d'afficher un bouton sur lequel le visiteur peut appuyer ?",
                options: ["<button>", "<clic>", "<push>", "<box>"],
                correctIndex: 0,
                explanation: "<button> est la balise officielle qui crée un bouton interactif sur une page Web."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Comprendre l'architecture du Web : protocole HTTP, requêtes client-serveur et navigateurs.",
          "Structurer des pages Web complètes et accessibles avec HTML5 sémantique.",
          "Maîtriser la mise en page CSS3 (sélecteurs, Box Model, couleurs, polices et flexibilité).",
          "Découvrir JavaScript pour modifier dynamiquement les éléments d'une page (DOM et événements)."
        ],
        chapters: [
          {
            title: "Architecture Web : Client, Serveur et Protocole HTTP",
            desc: "Comprendre comment une page web transite sur le réseau : requête GET, réponse HTML et code de statut.",
            coreConcepts: [
              "Le modèle Client (navigateur) - Serveur d'hébergement",
              "Le protocole HTTP / HTTPS et la méthode GET",
              "Codes de réponse HTTP fondamentaux (200 OK, 404 Not Found)",
              "Le rôle de l'URL, du nom de domaine et du serveur DNS"
            ],
            practicalEx: "Quand un utilisateur tape https://mon-site.fr, le navigateur résout l'IP via DNS puis fait un 'GET /' et reçoit le code HTML 200 OK.",
            formulas: ["Requête : GET /index.html HTTP/1.1", "Réponse : HTTP/1.1 200 OK (Content-Type: text/html)"],
            sampleQuestions: [
              {
                question: "Quel code HTTP indique qu'une page web demandée n'existe pas sur le serveur ?",
                options: ["200", "404", "500", "301"],
                correctIndex: 1,
                explanation: "Le code 404 Not Found signale au navigateur que la ressource demandée est introuvable."
              },
              {
                question: "Quel protocole sécurise les échanges entre le navigateur et le serveur web par chiffrement ?",
                options: ["FTP", "HTTPS", "DNS", "DHCP"],
                correctIndex: 1,
                explanation: "HTTPS (HTTP Secure) utilise le protocole TLS/SSL pour chiffrer l'ensemble des données transmises."
              }
            ]
          },
          {
            title: "HTML5 Sémantique : Structuration Structurée d'une Page",
            desc: "Balises de structure, hiérarchie de titres, listes, liens, images et formulaires de base.",
            coreConcepts: [
              "Structure canonique <!DOCTYPE html>, <html>, <head>, <body>",
              "Balises sémantiques modernes : <header>, <nav>, <main>, <section>, <article>, <footer>",
              "Liens hypertexte avec <a href='...'> et attribut target='_blank'",
              "Formulaires de saisie avec <form>, <input>, <label> et bouton d'envoi"
            ],
            practicalEx: "Créer un formulaire de contact propre associant chaque champ <input id='nom'> à son <label for='nom'> pour une accessibilité parfaite.",
            formulas: ["<a href='destination.html'>Texte du lien</a>", "<form action='/submit' method='POST'>"],
            sampleQuestions: [
              {
                question: "En HTML5, quelle balise sémantique doit être utilisée pour regrouper les liens de navigation du site ?",
                options: ["<menu>", "<nav>", "<links>", "<header>"],
                correctIndex: 1,
                explanation: "<nav> est la balise sémantique officielle pour délimiter les menus et blocs de navigation."
              }
            ]
          },
          {
            title: "CSS3 et Modèle de Boîte (Box Model) : Mise en Page Réussie",
            desc: "Contrôler les marges, bordures, espacements internes et couleurs pour un rendu soigné.",
            coreConcepts: [
              "Le Box Model : Content, Padding, Border, Margin",
              "Sélecteurs CSS : balise, classe (.classe), identifiant (#id) et pseudo-classes (:hover)",
              "La propriété box-sizing: border-box pour des calculs fiables",
              "Initiation à la disposition moderne avec display: flex (Flexbox)"
            ],
            practicalEx: "Créer une barre de navigation horizontale où les éléments sont alignés et espacés : nav { display: flex; justify-content: space-between; }.",
            formulas: ["Largeur totale = Contenu + Padding (G/D) + Border (G/D) + Margin (G/D)", "box-sizing: border-box;"],
            sampleQuestions: [
              {
                question: "Dans le modèle de boîte CSS, quel espace sépare le contenu de la boîte de sa propre bordure ?",
                options: ["Le margin", "Le padding", "Le border", "L'outline"],
                correctIndex: 1,
                explanation: "Le padding représente la marge intérieure (rembourrage) entre le contenu et la bordure."
              }
            ]
          },
          {
            title: "JavaScript pour le Web : Manipulation du DOM et Événements",
            desc: "Donner vie à la page : sélectionner un élément HTML, modifier son texte et écouter les clics.",
            coreConcepts: [
              "L'arbre DOM (Document Object Model) représentant le document HTML",
              "Sélectionner des éléments avec document.querySelector() et document.getElementById()",
              "Modifier le contenu (.textContent, .innerHTML) et le style (.classList.toggle)",
              "Écouter les événements avec .addEventListener('click', fonction)"
            ],
            practicalEx: "Bouton de mode sombre : btn.addEventListener('click', () => document.body.classList.toggle('dark-mode')).",
            formulas: ["const el = document.querySelector('#monElement');", "el.addEventListener('click', (e) => { ... });"],
            sampleQuestions: [
              {
                question: "Quelle méthode JavaScript moderne permet de sélectionner le premier élément HTML correspondant à un sélecteur CSS ?",
                options: ["document.select()", "document.querySelector()", "document.find()", "window.getElement()"],
                correctIndex: 1,
                explanation: "document.querySelector() permet de cibler n'importe quel élément via un sélecteur CSS valide."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Concevoir des architectures frontend professionnelles, sémantiques et conformes aux standards W3C.",
          "Maîtriser CSS3 avancé : Flexbox bidirectionnel, CSS Grid 2D, variables CSS et Responsive Design (Media Queries).",
          "Programmer en JavaScript moderne (ES6+) : fonctions fléchées, manipulation avancée du DOM et gestion d'événements.",
          "Consommer des API distantes via Fetch, comprendre le format JSON et gérer l'asynchronisme (Promises, Async/Await)."
        ],
        chapters: [
          {
            title: "Frontend Moderne : Sémantique HTML5, Accessibilité (ARIA) et SEO",
            desc: "Structure irréprochable, accessibilité pour les lecteurs d'écran, métadonnées OpenGraph et bonnes pratiques de référencement.",
            coreConcepts: [
              "Balises structurelles avancées et hiérarchie logique des headings (h1 -> h6)",
              "Accessibilité numérique (normes RGAA / WCAG) et attributs aria-* (aria-label, aria-expanded)",
              "Métadonnées viewport, SEO et balises OpenGraph pour le partage social",
              "Formulaires sécurisés avec validation native (type='email', pattern, required, min/max)"
            ],
            practicalEx: "Conception d'un formulaire accessible avec labels liés, validation HTML5 sans rechargement de page et retour visuel aria-live.",
            formulas: ["<meta name='viewport' content='width=device-width, initial-scale=1.0'>", "<button aria-expanded='false' aria-controls='menu'>"],
            sampleQuestions: [
              {
                question: "Pourquoi est-il crucial d'associer systématiquement un <label> à son <input> avec l'attribut 'for' ?",
                options: ["Pour l'accessibilité aux technologies d'assistance et l'agrandissement de la zone de clic", "Pour que le texte devienne rouge", "Pour crypter la saisie", "C'est purement décoratif"],
                correctIndex: 0,
                explanation: "L'association for/id permet aux lecteurs d'écran d'annoncer l'intitulé et permet à l'utilisateur de cliquer sur le label pour activer le champ."
              }
            ]
          },
          {
            title: "Mise en Page CSS3 Avancée : Flexbox, CSS Grid et Responsive Design",
            desc: "Création d'interfaces adaptatives pour smartphones, tablettes et grands écrans sans bibliothèques externes.",
            coreConcepts: [
              "Flexbox pour les alignements 1D (flex-direction, justify-content, align-items, flex-wrap)",
              "CSS Grid pour les architectures bidimensionnelles (grid-template-columns: repeat(auto-fit, minmax(...)))",
              "Media Queries (@media (max-width: 768px)) et approche Mobile-First",
              "Variables CSS natives (--primary-color: #2563eb; var(--primary-color))"
            ],
            practicalEx: "Grille responsive automatique : display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; s'adaptant à toutes les résolutions.",
            formulas: ["@media (min-width: 768px) { ... }", "display: flex; justify-content: space-between; align-items: center;"],
            sampleQuestions: [
              {
                question: "Quelle propriété CSS Grid permet de créer une grille dont le nombre de colonnes s'adapte automatiquement sans media query ?",
                options: ["grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))", "display: inline-block", "float: left", "position: absolute"],
                correctIndex: 0,
                explanation: "La combinaison repeat(auto-fit, minmax(...)) crée une disposition fluide qui réorganise automatiquement le nombre de colonnes."
              }
            ]
          },
          {
            title: "JavaScript ES6+ : Programmation Réactive et Manipulation du DOM",
            desc: "Variables let/const, fonctions fléchées, déstructuration, templates littéraux et cycle des événements du navigateur.",
            coreConcepts: [
              "Différences fondamentales entre const, let et le hoisting de var",
              "Fonctions fléchées (arrow functions) et portée lexicale du 'this'",
              "Délégation d'événements (Event Bubbling, stopPropagation, preventDefault)",
              "Création et suppression dynamique de nœuds avec document.createElement() et .append()"
            ],
            practicalEx: "Implémentation d'une Todo-List interactive où l'ajout et la suppression des tâches s'effectuent sans recharger la page.",
            formulas: ["const updateUI = (data) => `<div>${data.title}</div>`;", "form.addEventListener('submit', (e) => e.preventDefault());"],
            sampleQuestions: [
              {
                question: "Quel est l'effet de l'appel 'event.preventDefault()' dans le gestionnaire d'événement d'un formulaire ?",
                options: ["Empêcher le rechargement par défaut de la page lors de la soumission", "Fermer le navigateur", "Effacer le disque dur", "Désactiver le CSS"],
                correctIndex: 0,
                explanation: "preventDefault() interrompt le comportement natif du navigateur, permettant de traiter la soumission en JavaScript (AJAX)."
              }
            ]
          },
          {
            title: "Communication Asynchrone : Fetch API, JSON et Traitement de Données REST",
            desc: "Interroger des serveurs distants, récupérer des données au format JSON et gérer les erreurs réseau.",
            coreConcepts: [
              "Le principe de l'asynchronisme dans la boucle d'événements (Event Loop)",
              "Les Promesses (Promises) : états pending, fulfilled, rejected",
              "La syntaxe moderne async / await et les blocs try...catch",
              "L'API Fetch native pour effectuer des requêtes HTTP (GET, POST) et parser du JSON"
            ],
            practicalEx: "Récupérer la météo en direct depuis une API publique : async function getMeteo() { const res = await fetch(url); const data = await res.json(); render(data); }.",
            formulas: ["const response = await fetch('/api/data');", "const json = await response.json();"],
            sampleQuestions: [
              {
                question: "Quelle syntaxe permet d'attendre la résolution d'une Promesse de manière lisible et séquentielle en ES2017+ ?",
                options: ["Le mot-clé await dans une fonction async", "Une boucle infinie while", "setTimeout()", "La balise <async>"],
                correctIndex: 0,
                explanation: "await suspend l'exécution de la fonction async jusqu'à la résolution de la promesse, rendant le code aussi clair qu'un code synchrone."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Comprendre en profondeur l'architecture du Web moderne : Single Page Applications (SPA), Virtual DOM et SSR.",
          "Maîtriser le backend Web avec Node.js, Express, middleware d'authentification et architecture RESTful.",
          "Sécuriser les applications Web : politiques CORS, protections XSS, CSRF, injections et gestion de tokens JWT.",
          "Optimiser les performances web : Critical Rendering Path, Web Vitals (LCP, FID, CLS), mise en cache et bundling."
        ],
        chapters: [
          {
            title: "Architectures Web Modernes : SPA, MPA, Rendu Côté Serveur (SSR) et Hydratation",
            desc: "Étude comparative des paradigmes d'architecture web, routage client, Virtual DOM et réconciliation.",
            coreConcepts: [
              "Cycle de vie d'une requête dans une Single Page Application vs Multi Page Application",
              "Le concept de Virtual DOM, diffing algorithm et réconciliation déclarative",
              "Server-Side Rendering (SSR) vs Static Site Generation (SSG) vs Client-Side Rendering (CSR)",
              "Mécanisme d'hydratation du DOM côté client et préservation de l'état applicatif"
            ],
            practicalEx: "Analyse du compromis Time-To-First-Byte (TTFB) vs First Contentful Paint (FCP) entre une SPA bundle lourde et un rendu hybride.",
            formulas: ["Hydratation : Rendu HTML Serveur + Attachement des Event Listeners Client = App Réactive"],
            sampleQuestions: [
              {
                question: "Quel est le principal avantage du Server-Side Rendering (SSR) par rapport au Client-Side Rendering (CSR) pur ?",
                options: ["Un meilleur référencement naturel (SEO) et un affichage initial plus rapide du contenu textuel", "L'élimination complète de JavaScript", "Aucun besoin de serveur", "La réduction de la bande passante serveur"],
                correctIndex: 0,
                explanation: "Le SSR sert du HTML pré-rendu directement lisible par les robots d'indexation et immédiatement visible pour l'utilisateur."
              }
            ]
          },
          {
            title: "Développement Backend Web : API RESTful, Node.js et Conception de Middlewares",
            desc: "Création de services web modulaires, gestion du cycle requête/réponse et validation de payloads.",
            coreConcepts: [
              "Architecture RESTful : statelessness, URI ressources et méthodes HTTP canoniques (GET, POST, PUT, PATCH, DELETE)",
              "Le patron d'architecture Middleware dans Express/Koa (req, res, next)",
              "Parsing des corps de requêtes, validation de schémas (JSON Schema / Zod) et gestion centralisée des erreurs",
              "Codes de statut normalisés (201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden)"
            ],
            practicalEx: "Conception d'une route sécurisée de mise à jour d'articles avec validation stricte du payload et middleware de logging.",
            formulas: ["app.use((req, res, next) => { authMiddleware(req); next(); });", "res.status(200).json({ success: true, data });"],
            sampleQuestions: [
              {
                question: "Dans le standard REST, quelle méthode HTTP est sémantiquement appropriée pour une mise à jour partielle d'une ressource existante ?",
                options: ["PATCH", "POST", "PUT", "GET"],
                correctIndex: 0,
                explanation: "PATCH applique des modifications partielles à une ressource, alors que PUT remplace la ressource intégrale."
              }
            ]
          },
          {
            title: "Sécurité Web Fondamentale : CORS, Authentification JWT, XSS et CSRF",
            desc: "Protocoles et vecteurs d'attaque sur le Web, stockage sécurisé des sessions et politiques de sécurité du navigateur.",
            coreConcepts: [
              "Same-Origin Policy (SOP) et configuration rigoureuse des en-têtes Cross-Origin Resource Sharing (CORS)",
              "Attaques Cross-Site Scripting (XSS réfléchi, stocké, DOM-based) et Content Security Policy (CSP)",
              "Cross-Site Request Forgery (CSRF) et parade via SameSite cookies / Tokens Anti-CSRF",
              "Authentification par JSON Web Token (JWT) : Header.Payload.Signature, cookies HttpOnly vs LocalStorage"
            ],
            practicalEx: "Implémentation d'une stratégie de tokens JWT avec access token court stocké en mémoire et refresh token en cookie HttpOnly Secure SameSite=Strict.",
            formulas: ["Signature JWT = HMACSHA256(base64Url(header) + '.' + base64Url(payload), secret)", "Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict"],
            sampleQuestions: [
              {
                question: "Pourquoi est-il fortement déconseillé de stocker un token d'authentification sensible dans le 'localStorage' du navigateur ?",
                options: ["Le localStorage est directement lisible par tout script JavaScript injecté via une faille XSS", "Le localStorage est effacé toutes les 5 minutes", "Le localStorage ne supporte que les nombres", "Le serveur ne peut pas le lire"],
                correctIndex: 0,
                explanation: "N'importe quel script malveillant injecté via XSS peut exécuter 'localStorage.getItem()' et voler le token, risque évité avec un cookie HttpOnly."
              }
            ]
          },
          {
            title: "Performance Web et Core Web Vitals : Optimisation du Rendu",
            desc: "Comprendre le chemin critique de rendu du navigateur, optimisation des assets et mesures de performance.",
            coreConcepts: [
              "Le Critical Rendering Path (DOM -> CSSOM -> Render Tree -> Layout -> Paint -> Composite)",
              "Métriques Core Web Vitals : LCP (Largest Contentful Paint), INP (Interaction to Next Paint), CLS (Cumulative Layout Shift)",
              "Stratégies de chargement : attributs defer et async sur les scripts, responsive images (srcset), lazy loading natif",
              "Mise en cache HTTP : en-têtes Cache-Control (max-age, no-cache, stale-while-revalidate), ETag et compression (Brotli/Gzip)"
            ],
            practicalEx: "Audit d'une application web sous Lighthouse : élimination des ressources bloquant le rendu et optimisation du CLS par réservation d'espace d'images.",
            formulas: ["Cache-Control: public, max-age=31536000, immutable", "CLS = Impact Fraction * Distance Fraction"],
            sampleQuestions: [
              {
                question: "Quelle métrique Core Web Vitals mesure la stabilité visuelle de la page en quantifiant les déplacements inattendus d'éléments ?",
                options: ["CLS (Cumulative Layout Shift)", "LCP (Largest Contentful Paint)", "FID (First Input Delay)", "TTFB (Time to First Byte)"],
                correctIndex: 0,
                explanation: "Le CLS mesure la stabilité visuelle pour éviter que des boutons ou textes sautent pendant le chargement de publicités ou d'images."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Concevoir des architectures Web distribuées à très haute échelle (Micro-frontends, Edge Computing, WebSockets).",
          "Maîtriser les protocoles temps réel (HTTP/2, HTTP/3 QUIC, WebSockets, WebRTC) et le streaming d'événements (SSE).",
          "Mettre en œuvre les mécanismes de résilience, d'observabilité (OpenTelemetry) et de sécurité cryptographique applicative.",
          "Gérer la cohérence des données distribuées, le sharding de caches globaux (Redis/CDN) et l'orchestration moderne."
        ],
        chapters: [
          {
            title: "Protocoles Réseau Émergents : HTTP/2, HTTP/3 (QUIC) et Flux Temps Réel",
            desc: "Analyse du multiplexage, suppression du Head-of-Line blocking, protocole de transport UDP et communications bidirectionnelles.",
            coreConcepts: [
              "Limites d'HTTP/1.1 (connexions persistantes, pipelining inefficace, Head-of-Line blocking)",
              "HTTP/2 : multiplexage binaire sur connexion TCP unique, compression des en-têtes HPACK",
              "HTTP/3 basé sur QUIC au-dessus d'UDP : 0-RTT handshake, résilience aux pertes de paquets et migration de connexion",
              "Technologies temps réel : Server-Sent Events (SSE) unidirectionnel vs WebSockets duplex RFC 6455 vs WebRTC pour P2P"
            ],
            practicalEx: "Mise en place d'un hub de notifications temps réel ultra-performant exploitant les SSE avec reconnexion automatique et réémission d'ID de transaction.",
            formulas: ["QUIC = UDP + TLS 1.3 + Multiplexage de flux indépendant", "WebSocket Frame : FIN (1b) + Opcode (4b) + Mask (1b) + Payload Length"],
            sampleQuestions: [
              {
                question: "Quelle limitation fondamentale de TCP le protocole HTTP/3 (QUIC) élimine-t-il grâce à son implémentation sur UDP ?",
                options: ["Le Head-of-Line blocking au niveau de la couche transport en cas de perte de paquet", "Le chiffrement des données", "L'utilisation de ports réseau", "L'obligation d'un nom de domaine"],
                correctIndex: 0,
                explanation: "Dans TCP, la perte d'un seul paquet bloque tous les flux multiplexés ; QUIC isole chaque flux au niveau UDP, évitant le blocage global."
              }
            ]
          },
          {
            title: "Architectures Distribuées : Micro-Frontends, Edge Computing et BFF",
            desc: "Découpage d'applications monolithiques, Module Federation, fonctions Serverless à la périphérie et Backend-For-Frontend.",
            coreConcepts: [
              "Motivations organisationnelles et techniques des Micro-Frontends (découplage d'équipes et de déploiements)",
              "Approches d'intégration : Web Components isolés, iframe sandboxing, Webpack 5 Module Federation au runtime",
              "Edge Computing (Cloudflare Workers, Vercel Edge Runtime) : calcul au plus proche de l'utilisateur avec V8 Isolates",
              "Le patron Backend-For-Frontend (BFF) pour adapter les données aux contraintes spécifiques du client"
            ],
            practicalEx: "Configuration d'un hôte Micro-Frontend chargeant dynamiquement au runtime un micro-service de paiement hébergé sur un domaine tiers via Module Federation.",
            formulas: ["new ModuleFederationPlugin({ remotes: { checkout: 'checkout@https://cdn.domain/remoteEntry.js' } })"],
            sampleQuestions: [
              {
                question: "Quel mécanisme d'exécution moderne permet aux plateformes 'Edge Computing' d'exécuter du JavaScript avec un temps de démarrage quasi nul (0ms cold start) ?",
                options: ["Les Isolats V8 (V8 Isolates)", "Des machines virtuelles complètes VMware", "Des conteneurs Docker lourds", "L'émulation CPU logicielle"],
                correctIndex: 0,
                explanation: "Les V8 Isolates permettent d'isoler des contextes d'exécution ultra-légers sans démarrer de processus Node.js complet ni conteneur lourd."
              }
            ]
          },
          {
            title: "Observabilité, Fiabilité et Stratégies de Mise en Cache Avancées",
            desc: "Traces distribuées, monitoring de performance en production (RUM), Service Workers et Offline First.",
            coreConcepts: [
              "Les Service Workers : cycle de vie (install, activate, fetch) et interception programmée des flux réseau",
              "Stratégies de cache Workbox : Cache First, Network First, Stale-While-Revalidate",
              "Observabilité complète : métriques, logs structurés et Distributed Tracing avec standards OpenTelemetry",
              "Gestion de charge : Rate Limiting algorithmique (Token Bucket / Leaky Bucket) et circuit-breakers (Resilience4j)"
            ],
            practicalEx: "Conception d'une Progressive Web App offline-first avec synchronisation en arrière-plan (Background Sync API) des mutations en file d'attente IndexedDB.",
            formulas: ["self.addEventListener('fetch', (event) => event.respondWith(caches.match(event.request).then(...)))"],
            sampleQuestions: [
              {
                question: "Dans un Service Worker, quelle stratégie de cache garantit une réponse instantanée tout en mettant à jour la ressource en arrière-plan pour la prochaine visite ?",
                options: ["Stale-While-Revalidate", "Network Only", "Cache Only", "No-Cache"],
                correctIndex: 0,
                explanation: "Stale-While-Revalidate retourne immédiatement la version en cache (stale) puis fetch la nouvelle version sur le réseau pour rafraîchir le cache."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  // 2. GÉOMÉTRIE PURE (Élimine les polynômes et algèbre de collège/lycée)
  // =================================================================
  {
    domainName: "Géométrie",
    keywords: [
      "geometrie",
      "geometrique",
      "triangle",
      "cercle",
      "pythagore",
      "thales",
      "vecteur",
      "vecteurs",
      "produit scalaire",
      "trigonometrie geometrique",
      "geometrie dans l espace",
      "aire",
      "perimetre",
      "volume",
      "polyedre",
      "angle",
      "angles"
    ],
    tiers: {
      primary: {
        objectives: [
          "Reconnaître, nommer et tracer les figures géométriques planes de base.",
          "Comprendre la notion d'angle droit et manipuler l'équerre et la règle.",
          "Calculer le périmètre des figures usuelles (carré, rectangle, triangle).",
          "Reconnaître et manipuler les solides simples : cube, pavé droit et cylindre."
        ],
        chapters: [
          {
            title: "Les Figures Planes : Carré, Rectangle, Triangle et Cercle",
            desc: "Apprendre à identifier les formes, compter les côtés et les sommets avec précision.",
            coreConcepts: [
              "Le côté et le sommet d'une figure",
              "Le carré : 4 côtés égaux et 4 angles droits",
              "Le rectangle : côtés opposés égaux 2 à 2 et 4 angles droits",
              "Le triangle (3 côtés) et le cercle (centre et rayon)"
            ],
            practicalEx: "Tracer un carré de 4 cm de côté avec une règle graduée et une équerre.",
            formulas: ["Carré : 4 côtés égaux", "Rectangle : 2 Longueurs + 2 largeurs", "Triangle : 3 côtés"],
            sampleQuestions: [
              {
                question: "Combien de sommets possède un triangle ?",
                options: ["3 sommets", "4 sommets", "5 sommets", "Aucun sommet"],
                correctIndex: 0,
                explanation: "Un triangle est un polygone composé de 3 côtés et de 3 sommets."
              }
            ]
          },
          {
            title: "L'Angle Droit, Droites Perpendiculaires et Parallèles",
            desc: "Vérifier les angles droits avec l'équerre et reconnaître les droites qui ne se touchent jamais.",
            coreConcepts: [
              "L'angle droit comme le coin d'une feuille de papier",
              "Utiliser l'équerre pour vérifier ou tracer un angle droit",
              "Droites perpendiculaires : deux droites qui se coupent en formant un angle droit",
              "Droites parallèles : deux droites ayant le même écartement qui ne se croiseront jamais"
            ],
            practicalEx: "Les rails du train sont deux droites parallèles : elles gardent toujours le même écartement.",
            formulas: ["Angle droit = 90 degrés", "Droites perpendiculaires : symbole ⊥"],
            sampleQuestions: [
              {
                question: "Quel instrument de géométrie permet de vérifier avec certitude qu'un angle est droit ?",
                options: ["L'équerre", "Le compas", "La calculatrice", "Le thermomètre"],
                correctIndex: 0,
                explanation: "L'équerre est l'outil spécifique servant à mesurer et tracer des angles droits à 90 degrés."
              }
            ]
          },
          {
            title: "Calculer le Périmètre : Faire le Tour d'une Figure",
            desc: "Mesurer la longueur de tous les côtés et les additionner pour trouver le périmètre total.",
            coreConcepts: [
              "Le périmètre est la longueur du contour d'une figure",
              "Périmètre du carré : Côté × 4",
              "Périmètre du rectangle : (Longueur + largeur) × 2",
              "Ne pas mélanger les unités (centimètres et mètres)"
            ],
            practicalEx: "Un jardin rectangulaire mesure 10 m de long et 6 m de large. Pour poser une clôture tout autour : (10 + 6) × 2 = 32 mètres de clôture.",
            formulas: ["Périmètre carré = 4 × c", "Périmètre rectangle = 2 × (L + l)"],
            sampleQuestions: [
              {
                question: "Quel est le périmètre d'un carré dont le côté mesure 6 cm ?",
                options: ["24 cm", "36 cm", "12 cm", "18 cm"],
                correctIndex: 0,
                explanation: "Un carré a 4 côtés égaux : 4 × 6 cm = 24 cm."
              }
            ]
          },
          {
            title: "Découverte des Solides : Cube, Pavé Droit et Pyramide",
            desc: "Passer de la feuille plate aux objets en 3 dimensions : faces, arêtes et sommets.",
            coreConcepts: [
              "La différence entre une figure plate (2D) et un solide (3D)",
              "Le cube : 6 faces carrées identiques, 12 arêtes et 8 sommets",
              "Le pavé droit (comme une boîte de chaussures) : 6 faces rectangulaires",
              "Le patron d'un solide : le dessin à découper et plier pour fabriquer la boîte"
            ],
            practicalEx: "Un dé à jouer est un cube parfait : il possède 6 faces numérotées de 1 à 6.",
            formulas: ["Cube : 6 faces, 12 arêtes, 8 sommets"],
            sampleQuestions: [
              {
                question: "Combien de faces carrées possède un cube ?",
                options: ["6 faces", "4 faces", "8 faces", "12 faces"],
                correctIndex: 0,
                explanation: "Le cube est délimité par exactement 6 faces carrées égales."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Démontrer et calculer des longueurs avec le théorème de Pythagore et sa réciproque.",
          "Appliquer le théorème de Thalès pour calculer des proportions et prouver le parallélisme.",
          "Maîtriser la trigonométrie dans le triangle rectangle (Cosinus, Sinus, Tangente).",
          "Comprendre les transformations géométriques : symétries, translations, rotations et homothéties."
        ],
        chapters: [
          {
            title: "Le Théorème de Pythagore et sa Réciproque",
            desc: "Calculer la longueur manquante d'un triangle rectangle et prouver qu'un angle est droit.",
            coreConcepts: [
              "Identification formelle de l'hypoténuse (le plus grand côté opposé à l'angle droit)",
              "Énoncé direct : Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des côtés de l'angle droit",
              "Formule canonique : BC² = AB² + AC²",
              "Réciproque et contraposée pour prouver si un triangle est rectangle ou non"
            ],
            practicalEx: "Triangle ABC avec AB = 6 cm, AC = 8 cm. Le triangle étant rectangle en A : BC² = 6² + 8² = 36 + 64 = 100. Donc BC = √100 = 10 cm.",
            formulas: ["BC² = AB² + AC²", "AB² = BC² - AC²"],
            sampleQuestions: [
              {
                question: "Dans un triangle rectangle dont l'hypoténuse mesure 13 cm et un côté 5 cm, quelle est la longueur du troisième côté ?",
                options: ["12 cm", "8 cm", "144 cm", "10 cm"],
                correctIndex: 0,
                explanation: "13² - 5² = 169 - 25 = 144. La racine carrée de 144 est 12 cm."
              },
              {
                question: "Si dans un triangle KLM on a KL² + LM² = KM², quel angle est droit ?",
                options: ["L'angle L", "L'angle K", "L'angle M", "Aucun"],
                correctIndex: 0,
                explanation: "KM est l'hypoténuse, le côté opposé à l'angle droit. Le triangle est donc rectangle en L."
              }
            ]
          },
          {
            title: "Le Théorème de Thalès et les Triangles Semblables",
            desc: "Calculer des longueurs proportionnelles dans des configurations emboîtées ou en papillon.",
            coreConcepts: [
              "Conditions d'application : deux droites sécantes coupées par deux droites parallèles",
              "Égalité des 3 rapports de longueurs : AM/AB = AN/AC = MN/BC",
              "Réciproque de Thalès : alignement dans le même ordre et égalité des rapports pour prouver le parallélisme",
              "Triangles semblables : angles égaux deux à deux et côtés proportionnels"
            ],
            practicalEx: "Dans un triangle ABC avec (MN) parallèle à (BC), si AB = 10 cm, AM = 4 cm et BC = 15 cm, alors MN = (AM × BC) / AB = (4 × 15) / 10 = 6 cm.",
            formulas: ["AM / AB = AN / AC = MN / BC (si (MN) // (BC))"],
            sampleQuestions: [
              {
                question: "Pour appliquer le théorème de Thalès, quelle condition géométrique indispensable doit être vérifiée ?",
                options: ["Deux droites doivent être strictement parallèles", "Le triangle doit être isocèle", "Il doit y avoir un angle de 45°", "Les longueurs doivent être entières"],
                correctIndex: 0,
                explanation: "Le parallélisme des deux droites coupant les sécantes est la condition requise par le théorème de Thalès."
              }
            ]
          },
          {
            title: "Trigonométrie dans le Triangle Rectangle : Cosinus, Sinus et Tangente",
            desc: "Relier les mesures des angles aigus et les rapports des longueurs des côtés.",
            coreConcepts: [
              "Côté adjacent, côté opposé et hypoténuse par rapport à un angle aigu",
              "Définition du Cosinus : Côté Adjacent / Hypoténuse",
              "Définition du Sinus : Côté Opposé / Hypoténuse",
              "Définition de la Tangente : Côté Opposé / Côté Adjacent (moyen mnémotechnique CAH-SOH-TOA)",
              "Utilisation des touches arccos, arcsin, arctan pour retrouver la mesure d'un angle en degrés"
            ],
            practicalEx: "Calcul de la hauteur d'un arbre : À 20 m de l'arbre, on voit son sommet sous un angle de 30°. tan(30°) = Hauteur / 20, donc Hauteur = 20 × tan(30°) ≈ 11,55 m.",
            formulas: ["cos(α) = Adjacent / Hyp", "sin(α) = Opposé / Hyp", "tan(α) = Opposé / Adjacent", "cos²(α) + sin²(α) = 1"],
            sampleQuestions: [
              {
                question: "Quelle formule trigonométrique correspond à la définition du sinus d'un angle aigu ?",
                options: ["Côté Opposé / Hypoténuse", "Côté Adjacent / Hypoténuse", "Côté Opposé / Côté Adjacent", "Hypoténuse / Côté Opposé"],
                correctIndex: 0,
                explanation: "Dans le triangle rectangle, sin(angle) = Côté Opposé / Hypoténuse (SOH)."
              }
            ]
          },
          {
            title: "Transformations du Plan et Géométrie dans l'Espace",
            desc: "Translations, rotations, homothéties, calcul d'aires, volumes de prismes, cônes et sphères.",
            coreConcepts: [
              "La translation définie par une direction, un sens et une longueur (glissement)",
              "La rotation définie par un centre, un angle et un sens (horaire/antihoraire)",
              "L'homothétie de centre O et de rapport k (agrandissement si |k| > 1, réduction si |k| < 1)",
              "Calcul du volume du cylindre (π × r² × h), du cône (1/3 × π × r² × h) et de la sphère (4/3 × π × r³)"
            ],
            practicalEx: "Calcul du volume d'une boîte de conserve cylindrique de rayon r = 5 cm et de hauteur h = 10 cm : V = π × 5² × 10 = 250π ≈ 785,4 cm³.",
            formulas: ["Volume cylindre = π × r² × h", "Volume cône = (1/3) × π × r² × h", "Volume sphère = (4/3) × π × r³"],
            sampleQuestions: [
              {
                question: "Lors d'un agrandissement d'une figure géométrique de rapport k = 2, par combien son volume est-il multiplié ?",
                options: ["Par 8 (car k³ = 2³ = 8)", "Par 4", "Par 2", "Par 16"],
                correctIndex: 0,
                explanation: "Dans un agrandissement de rapport k, les longueurs sont multipliées par k, les aires par k² et les volumes par k³."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Maîtriser la géométrie vectorielle dans le plan et dans l'espace (colinéarité, coplanarité, bases).",
          "Calculer et exploiter le produit scalaire : orthogonalité, projections et théorème d'Al-Kashi.",
          "Déterminer les équations cartésiennes et paramétriques de droites et de plans dans l'espace.",
          "Résoudre des problèmes métriques : calcul de distances, d'angles et d'intersections géométriques."
        ],
        chapters: [
          {
            title: "Vecteurs dans le Plan et dans l'Espace : Colinéarité et Coplanarité",
            desc: "Combinaisons linéaires de vecteurs, repères cartésiens, coordonnées de vecteurs et coplanarité.",
            coreConcepts: [
              "Caractérisation vectorielle d'un segment, milieu et relation de Chasles (AB + BC = AC)",
              "Colinéarité de deux vecteurs : u = k * v et déterminant dans le plan (xy' - x'y = 0)",
              "Coplanarité de trois vecteurs dans l'espace : w = a*u + b*v",
              "Repères orthonormés de l'espace (O; i, j, k) et coordonnées cartésiennes (x, y, z)"
            ],
            practicalEx: "Montrer que les points A(1, 2, 3), B(2, 4, 5) et C(4, 8, 9) sont alignés : vecteur AB = (1, 2, 2) et vecteur AC = (3, 6, 6) = 3*AB, donc colinéaires.",
            formulas: ["Relation de Chasles : vecteur(AB) + vecteur(BC) = vecteur(AC)", "Milieu I : ((xA + xB)/2, (yA + yB)/2, (zA + zB)/2)"],
            sampleQuestions: [
              {
                question: "Si deux vecteurs u et v sont colinéaires, que peut-on dire de leur direction géométrique ?",
                options: ["Ils ont la même direction (droites porteuses parallèles)", "Ils sont perpendiculaires", "Ils ont la même longueur", "Ils partent du même point"],
                correctIndex: 0,
                explanation: "La colinéarité signifie qu'il existe un scalaire k tel que u = k*v, ils partagent donc la même direction."
              }
            ]
          },
          {
            title: "Le Produit Scalaire : Propriétés, Orthogonalité et Théorème d'Al-Kashi",
            desc: "Définition géométrique et analytique du produit scalaire, projection orthogonale et relations métriques.",
            coreConcepts: [
              "Définition géométrique : u · v = ||u|| × ||v|| × cos(θ)",
              "Définition analytique en base orthonormée : u · v = xx' + yy' + zz'",
              "Critère fondamental d'orthogonalité : u · v = 0 <=> u et v sont orthogonaux",
              "Théorème d'Al-Kashi (Pythagore généralisé) : a² = b² + c² - 2bc × cos(A)"
            ],
            practicalEx: "Calcul de l'angle entre deux vecteurs u(1, 0, 1) et v(0, 1, 1) : u·v = 0 + 0 + 1 = 1. ||u|| = √2, ||v|| = √2. cos(θ) = 1/(√2 × √2) = 1/2, donc θ = 60° (π/3).",
            formulas: ["u · v = xx' + yy' + zz'", "u · v = ||u|| ||v|| cos(θ)", "a² = b² + c² - 2bc cos(A)"],
            sampleQuestions: [
              {
                question: "Dans un repère orthonormé, que vaut le produit scalaire des vecteurs u(2, -3, 1) et v(3, 2, 0) ?",
                options: ["0 (les vecteurs sont orthogonaux)", "12", "-1", "6"],
                correctIndex: 0,
                explanation: "u · v = (2 × 3) + (-3 × 2) + (1 × 0) = 6 - 6 + 0 = 0. Les deux vecteurs sont donc orthogonaux."
              }
            ]
          },
          {
            title: "Droites et Plans de l'Espace : Équations Cartésiennes et Représentations Paramétriques",
            desc: "Vecteurs directeurs, vecteurs normaux à un plan et étude d'intersections de droites et plans.",
            coreConcepts: [
              "Représentation paramétrique d'une droite passant par A(xA, yA, zA) de vecteur directeur u(a, b, c)",
              "Vecteur normal n(a, b, c) à un plan et équation cartésienne ax + by + cz + d = 0",
              "Intersection d'une droite et d'un plan (point d'intersection unique, droite incluse ou parallèle)",
              "Positions relatives de deux plans (plans sécants selon une droite ou plans strictement parallèles)"
            ],
            practicalEx: "Déterminer l'équation du plan passant par A(1, 1, 1) et de vecteur normal n(2, -1, 3) : 2x - y + 3z + d = 0. En remplaçant par A : 2(1) - 1 + 3(1) + d = 0 => 4 + d = 0 => d = -4. Équation : 2x - y + 3z - 4 = 0.",
            formulas: ["Plan : ax + by + cz + d = 0 avec n(a, b, c) normal", "Droite : x = x0 + at, y = y0 + bt, z = z0 + ct (t ∈ R)"],
            sampleQuestions: [
              {
                question: "Quelles sont les coordonnées d'un vecteur normal au plan d'équation 3x - 5y + 2z - 7 = 0 ?",
                options: ["(3, -5, 2)", "(3, 5, 2)", "(-3, 5, -2)", "(3, -5, -7)"],
                correctIndex: 0,
                explanation: "Dans l'équation cartésienne ax + by + cz + d = 0, les coefficients (a, b, c) forment directement un vecteur normal au plan."
              }
            ]
          },
          {
            title: "Distances Métriques et Projections Orthogonales dans l'Espace",
            desc: "Distance d'un point à un plan, projection orthogonale et sections planes de sphères.",
            coreConcepts: [
              "Formule de la distance d'un point M(x0, y0, z0) au plan P : d(M, P) = |ax0 + by0 + cz0 + d| / √(a² + b² + c²)",
              "Calcul du projeté orthogonal H d'un point sur une droite ou sur un plan",
              "Équation cartésienne de la sphère de centre Ω(a, b, c) et de rayon R : (x - a)² + (y - b)² + (z - c)² = R²",
              "Intersection sphère-plan : cercle de section si d(Ω, P) < R"
            ],
            practicalEx: "Distance du point M(1, 2, 3) au plan x + y + z - 1 = 0 : |1 + 2 + 3 - 1| / √(1 + 1 + 1) = 5 / √3 = 5√3 / 3 ≈ 2,89.",
            formulas: ["d(M, P) = |ax0 + by0 + cz0 + d| / sqrt(a² + b² + c²)", "(x - a)² + (y - b)² + (z - c)² = R²"],
            sampleQuestions: [
              {
                question: "Si la distance du centre d'une sphère à un plan est strictement égale au rayon R de la sphère, quelle est leur intersection ?",
                options: ["Le plan est tangent à la sphère en un point unique", "Ils se coupent selon un grand cercle", "Leur intersection est vide", "La sphère est entièrement incluse"],
                correctIndex: 0,
                explanation: "Lorsque la distance au centre égale le rayon (d = R), le plan est tangent à la sphère en un seul point de contact."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Formaliser la géométrie affine et euclidienne par la structure d'espace vectoriel préhilbertien.",
          "Étudier les isométries vectorielles et affines : groupe orthogonal O(n), réflexions et rotations.",
          "Comprendre la géométrie différentielle des courbes et surfaces : courbure, torsion et repère de Frenet.",
          "Découvrir la géométrie projective et les coniques sous l'angle algébrique et matriciel."
        ],
        chapters: [
          {
            title: "Espaces Affines et Espaces Euclidiens : Structure Axiomatique",
            desc: "Définition d'un espace affine attaché à un espace vectoriel, sous-espaces affines, barycentres et repères affines.",
            coreConcepts: [
              "Action simplement transitive d'un espace vectoriel E sur un ensemble de points E_aff",
              "Barycentres et coordonnées barycentriques d'un système de points pondérés",
              "Produit scalaire euclidien défini positif et norme hilbertienne associée",
              "Théorème de projection sur un convexe fermé ou un sous-espace vectoriel de dimension finie"
            ],
            practicalEx: "Démonstration du fait que les trois médianes d'un triangle concourent en l'isobarycentre G des trois sommets.",
            formulas: ["vecteur(OM) = sum_{i} λi * vecteur(OAi) avec sum λi = 1", "||x|| = sqrt(<x, x>)"],
            sampleQuestions: [
              {
                question: "Quelle condition doit impérativement vérifier la somme des coefficients pondérés d'un système pour définir un barycentre unique ?",
                options: ["La somme des coefficients doit être non nulle (≠ 0)", "Tous les coefficients doivent être positifs", "La somme doit être égale à 0", "Les coefficients doivent être entiers"],
                correctIndex: 0,
                explanation: "Le barycentre n'est défini que si la masse totale (somme des coefficients) est différente de zéro."
              }
            ]
          },
          {
            title: "Isométries Affines et Groupe Orthogonal O(n)",
            desc: "Caractérisation des isométries conservant les distances, classification en dimension 2 et 3.",
            coreConcepts: [
              "Endomorphismes orthogonaux : conservation du produit scalaire <f(u), f(v)> = <u, v> et matrice orthogonale tM * M = In",
              "Décomposition polaire et groupe spécial orthogonal SO(n) (rotations de déterminant +1)",
              "Classification des isométries dans R² : rotations et réflexions (symétries axiales)",
              "Classification dans R³ : rotations axiales, réflexions, symétries-rotations et vissages"
            ],
            practicalEx: "Décomposition de toute isométrie affine comme produit d'au plus n+1 réflexions hyperplanaires (Théorème de Cartan-Dieudonné).",
            formulas: ["M ∈ O(n) <=> tM * M = In", "det(M) = ±1 (SO(n) si det = +1)"],
            sampleQuestions: [
              {
                question: "Quel est le déterminant d'une matrice appartenant au groupe spécial orthogonal SO(n) ?",
                options: ["+1", "-1", "0", "N'importe quel réel"],
                correctIndex: 0,
                explanation: "Par définition, le groupe SO(n) (rotations) rassemble les matrices orthogonales de déterminant strictement égal à +1."
              }
            ]
          },
          {
            title: "Géométrie Différentielle : Courbure, Torsion et Repère de Frenet",
            desc: "Courbes paramétrées régulières, abscisse curviligne, repère mobile de Frenet et première forme fondamentale des surfaces.",
            coreConcepts: [
              "Paramétrage par l'abscisse curviligne s et vecteur tangent unitaire T = dM/ds",
              "Repère mobile de Frenet (T, N, B) pour une courbe gauche de classe C³",
              "Formules de Frenet reliant dérivées des vecteurs unitaires à la courbure κ(s) et à la torsion τ(s)",
              "Surfaces régulières, plan tangent et première forme fondamentale (E du² + 2F dudv + G dv²)"
            ],
            practicalEx: "Calcul de la courbure constante κ = 1/R d'un cercle de rayon R dans le plan euclidien.",
            formulas: ["dT/ds = κ * N", "dN/ds = -κ * T + τ * B", "dB/ds = -τ * N"],
            sampleQuestions: [
              {
                question: "Dans les formules de Frenet d'une courbe de l'espace, que mesure la courbure κ(s) en un point ?",
                options: ["La vitesse de changement de direction du vecteur tangent par rapport à l'abscisse curviligne", "La vitesse de rotation du plan osculateur", "La longueur de la courbe", "L'aire sous la courbe"],
                correctIndex: 0,
                explanation: "La courbure quantifie à quel point la courbe s'écarte localement d'une ligne droite dans le plan osculateur."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Approfondir la géométrie riemannienne : variétés différentielles, connexion de Levi-Civita et tenseur de courbure de Riemann.",
          "Maîtriser les géodésiques, le théorème de Hopf-Rinow et la complétude métrique.",
          "Étudier la géométrie symplectique et la mécanique hamiltonienne.",
          "Explorer la géométrie complexe et kählérienne dans le cadre de la physique théorique moderne."
        ],
        chapters: [
          {
            title: "Variétés Différentielles et Métriques Riemanniennes",
            desc: "Atlas, cartes locales, fibré tangent, tenseurs métriques g_ij et calcul différentiel sur les variétés.",
            coreConcepts: [
              "Définition d'une variété différentielle de dimension n et structure de fibré tangent TM",
              "Métrique riemannienne g comme champ de formes bilinéaires symétriques définies positives lisses",
              "Volume riemannien et intégration de formes différentielles sur les variétés orientables",
              "L'opérateur de Laplace-Beltrami généralisé et théorie spectrale sur les variétés compactes"
            ],
            practicalEx: "Calcul de la métrique riemannienne de Poincaré sur le demi-plan hyperbolique H² : ds² = (dx² + dy²) / y².",
            formulas: ["ds² = g_{ij} dx^i dx^j", "Δ_g f = (1 / sqrt(|g|)) ∂_i (sqrt(|g|) g^{ij} ∂_j f)"],
            sampleQuestions: [
              {
                question: "Sur une variété riemannienne, quelle propriété définit la connexion canonique de Levi-Civita ?",
                options: ["Elle est sans torsion et métrique (conserve la métrique g)", "Elle a une courbure nulle partout", "Elle est discontinue", "Elle annule tous les champs de vecteurs"],
                correctIndex: 0,
                explanation: "Le théorème fondamental de la géométrie riemannienne assure l'existence et l'unicité de la connexion de Levi-Civita (sans torsion et métrique)."
              }
            ]
          },
          {
            title: "Géodésiques, Connexion de Levi-Civita et Tenseur de Courbure",
            desc: "Dérivation covariante, équation des géodésiques, tenseur de courbure de Riemann et courbures de Ricci et scalaire.",
            coreConcepts: [
              "Symboles de Christoffel Γ^k_ij exprimés à partir des dérivées partielles du tenseur métrique",
              "Équation des géodésiques d²x^k/dt² + Γ^k_ij (dx^i/dt)(dx^j/dt) = 0",
              "Tenseur de courbure de Riemann R(X, Y)Z mesurant la non-commutativité des dérivées covariantes",
              "Courbure de Ricci R_ij = R^k_ikj et courbure scalaire R = g^{ij} R_ij utilisées en relativité générale"
            ],
            practicalEx: "Résolution des géodésiques sur la sphère S² : vérification formelle que les chemins de longueur minimale sont les grands cercles.",
            formulas: ["R(X,Y)Z = ∇_X ∇_Y Z - ∇_Y ∇_X Z - ∇_{[X,Y]} Z", "G_{μν} = R_{μν} - (1/2) R g_{μν}"],
            sampleQuestions: [
              {
                question: "Quelle équation tensorielle constitue le cœur des équations d'Einstein de la relativité générale en géométrie riemannienne ?",
                options: ["G_{μν} = 8π G T_{μν} (Tenseur d'Einstein proportionnel au tenseur énergie-impulsion)", "E = mc²", "F = ma", "V = IR"],
                correctIndex: 0,
                explanation: "Les équations d'Einstein relient la géométrie de l'espace-temps (tenseur d'Einstein G_{μν}) à la distribution de matière et d'énergie."
              }
            ]
          }
        ]
      }
    }
  },

  // =================================================================
  // 3. ALGÈBRE ET ARITHMÉTIQUE (Sujet dédié distinct de la géométrie)
  // =================================================================
  {
    domainName: "Algèbre",
    keywords: [
      "algebre",
      "algebrique",
      "calcul litteral",
      "polynome",
      "polynomes",
      "equation",
      "equations",
      "systeme lineaire",
      "matrice",
      "matrices",
      "espace vectoriel",
      "diagonalisation",
      "factorisation",
      "second degre"
    ],
    tiers: {
      primary: {
        objectives: [
          "Découvrir la notion d'inconnue sous forme de devinettes à trous (ex: 5 + ? = 12).",
          "Comprendre les propriétés d'égalité et de balance.",
          "Manipuler les suites de nombres régulières.",
          "Résoudre des petits problèmes arithmétiques du quotidien."
        ],
        chapters: [
          {
            title: "Les Opérations à Trous et la Notion d'Inconnue",
            desc: "Trouver le nombre manquant caché derrière un point d'interrogation ou une case vide.",
            coreConcepts: ["L'égalité comme une balance en équilibre", "Trouver le terme manquant dans une addition", "Trouver le terme manquant dans une soustraction", "La multiplication comme paquets égaux"],
            practicalEx: "Dans ma tirelire, j'avais un montant secret. Maman me donne 7 €, j'ai maintenant 20 €. Combien avais-je ? Calcul : 20 - 7 = 13 €.",
            formulas: ["a + ? = c <=> ? = c - a"],
            sampleQuestions: [
              {
                question: "Dans l'opération 8 + ? = 15, quel est le nombre manquant ?",
                options: ["7", "6", "8", "9"],
                correctIndex: 0,
                explanation: "15 - 8 = 7, donc le nombre manquant est 7."
              }
            ]
          },
          {
            title: "Les Suites de Nombres et Régularités",
            desc: "Reconnaître le rythme d'une suite pour deviner les nombres suivants.",
            coreConcepts: ["Ajouter toujours le même nombre (+2, +5, +10)", "Les nombres pairs et impairs", "Les tables de calcul comme suites régulières", "Découvrir la formule secrète d'une suite"],
            practicalEx: "La suite 3, 6, 9, 12, 15 avance de 3 en 3. Le nombre suivant est 15 + 3 = 18.",
            formulas: ["Nombre suivant = Nombre actuel + Pas"],
            sampleQuestions: [
              {
                question: "Quel est le nombre suivant dans la suite : 5, 10, 15, 20, ... ?",
                options: ["25", "30", "22", "24"],
                correctIndex: 0,
                explanation: "La suite progresse de 5 en 5, donc après 20 vient 25."
              }
            ]
          }
        ]
      },

      college: {
        objectives: [
          "Développer et réduire des expressions algébriques avec la distributivité.",
          "Factoriser en utilisant un facteur commun ou les identités remarquables.",
          "Résoudre avec méthode des équations du 1er degré à une inconnue (ax + b = c).",
          "Modéliser et résoudre des problèmes à l'aide d'équations et de systèmes."
        ],
        chapters: [
          {
            title: "Calcul Littéral : Développement, Réduction et Distributivité",
            desc: "Manipuler les lettres représentant des nombres, supprimer les parenthèses et regrouper les termes.",
            coreConcepts: [
              "La lettre comme variable ou inconnue désignant un nombre quelconque",
              "Règles de réduction : regrouper les termes de même degré (les x² avec les x², les x avec les x)",
              "Distributivité simple : k(a + b) = ka + kb",
              "Double distributivité : (a + b)(c + d) = ac + ad + bc + bd"
            ],
            practicalEx: "Développer et réduire A = 3(2x - 4) + 5x : A = 6x - 12 + 5x = 11x - 12.",
            formulas: ["k(a + b) = ka + kb", "(a + b)(c + d) = ac + ad + bc + bd"],
            sampleQuestions: [
              {
                question: "Quel est le développement réduit de l'expression 4(x + 3) ?",
                options: ["4x + 12", "4x + 3", "7x", "x + 12"],
                correctIndex: 0,
                explanation: "En appliquant la distributivité : 4 × x + 4 × 3 = 4x + 12."
              }
            ]
          },
          {
            title: "Identités Remarquables et Factorisation",
            desc: "Transformer une somme en produit grâce aux facteurs communs et aux trois identités remarquables.",
            coreConcepts: [
              "Factoriser par un facteur commun : ka + kb = k(a + b)",
              "Première identité remarquable : (a + b)² = a² + 2ab + b²",
              "Deuxième identité remarquable : (a - b)² = a² - 2ab + b²",
              "Troisième identité remarquable : (a + b)(a - b) = a² - b²"
            ],
            practicalEx: "Factoriser x² - 9 : On reconnaît a² - b² avec a = x et b = 3. Résultat : (x + 3)(x - 3).",
            formulas: ["(a + b)² = a² + 2ab + b²", "(a - b)² = a² - 2ab + b²", "(a + b)(a - b) = a² - b²"],
            sampleQuestions: [
              {
                question: "Quelle est la forme factorisée de x² - 16 ?",
                options: ["(x - 4)(x + 4)", "(x - 4)²", "(x - 8)(x + 8)", "x(x - 16)"],
                correctIndex: 0,
                explanation: "16 = 4², il s'agit de la 3ème identité remarquable a² - b² = (a - b)(a + b) avec a = x et b = 4."
              }
            ]
          },
          {
            title: "Résolution des Équations du 1er Degré et Équations Produits-Nuls",
            desc: "Isoler l'inconnue x étape par étape et appliquer la propriété du produit nul.",
            coreConcepts: [
              "Opérations autorisées sur une égalité : ajouter/soustraire ou multiplier/diviser par un nombre non nul des deux côtés",
              "Résolution systématique de l'équation ax + b = c",
              "Propriété fondamentale du produit nul : Un produit de facteurs est nul si et seulement si l'un au moins des facteurs est nul",
              "Résolution des équations (ax + b)(cx + d) = 0"
            ],
            practicalEx: "Résoudre (2x - 6)(x + 5) = 0 : Soit 2x - 6 = 0 => 2x = 6 => x = 3 ; soit x + 5 = 0 => x = -5. L'ensemble des solutions est S = {-5, 3}.",
            formulas: ["ax + b = 0 <=> x = -b / a (si a != 0)", "A × B = 0 <=> A = 0 ou B = 0"],
            sampleQuestions: [
              {
                question: "Quelles sont les solutions de l'équation (x - 7)(2x + 8) = 0 ?",
                options: ["x = 7 et x = -4", "x = -7 et x = 4", "x = 7 et x = 8", "x = 0 et x = 14"],
                correctIndex: 0,
                explanation: "x - 7 = 0 donne x = 7. Et 2x + 8 = 0 donne 2x = -8 donc x = -4."
              }
            ]
          }
        ]
      },

      lycee: {
        objectives: [
          "Résoudre de manière exhaustive les équations et inéquations du second degré (discriminant Δ).",
          "Maîtriser les polynômes, factorisation par racine évidente et division polynomiale.",
          "Résoudre des systèmes linéaires à plusieurs inconnues par la méthode du pivot de Gauss.",
          "Découvrir le calcul matriciel : opérations, produit de matrices et inversion."
        ],
        chapters: [
          {
            title: "Polynômes du Second Degré : Discriminant et Factorisation",
            desc: "Forme canonique, calcul de Delta = b² - 4ac, racines réelles et signe du trinôme ax² + bx + c.",
            coreConcepts: [
              "Forme canonique a(x - α)² + β avec α = -b/(2a) et β = -Δ/(4a)",
              "Discriminant Δ = b² - 4ac et discussion selon son signe (2 racines si Δ > 0, 1 racine double si Δ = 0, aucune si Δ < 0)",
              "Formules des racines : x1,2 = (-b ± √Δ) / (2a)",
              "Factorisation a(x - x1)(x - x2) et règle du signe du trinôme (du signe de 'a' à l'extérieur des racines)"
            ],
            practicalEx: "Résoudre 2x² - 5x + 2 = 0 : Δ = (-5)² - 4(2)(2) = 25 - 16 = 9 > 0. √Δ = 3. Racines : x1 = (5 - 3)/4 = 1/2 et x2 = (5 + 3)/4 = 2. Factorisation : 2(x - 1/2)(x - 2).",
            formulas: ["Δ = b² - 4ac", "x_{1,2} = (-b ± sqrt(Δ)) / (2a)", "Factorisation : a(x - x1)(x - x2)"],
            sampleQuestions: [
              {
                question: "Combien de racines réelles distinctes admet l'équation 3x² - 6x + 3 = 0 ?",
                options: ["Une racine double unique (Δ = 0)", "Deux racines distinctes", "Aucune racine réelle", "Une infinité"],
                correctIndex: 0,
                explanation: "Δ = (-6)² - 4(3)(3) = 36 - 36 = 0. Le discriminant étant nul, il y a une racine double x = 6/(2×3) = 1."
              }
            ]
          },
          {
            title: "Polynômes de Degré Supérieur et Racines Évidentes",
            desc: "Factorisation par (x - a) lorsqu'une racine est connue, schéma de Horner et division euclidienne polynomiale.",
            coreConcepts: [
              "Théorème de factorisation : a est racine de P(x) <=> P(x) est factorisable par (x - a)",
              "Recherche des racines évidentes (±1, ±2, ±3) pour abaisser le degré du polynôme",
              "Identification des coefficients par développement et système d'équations",
              "Signe d'un produit de facteurs par tableau de signes complet"
            ],
            practicalEx: "Soit P(x) = x³ - 4x² + x + 6. On teste x = -1 : (-1)³ - 4(-1)² + (-1) + 6 = -1 - 4 - 1 + 6 = 0. Donc P(x) se factorise par (x + 1)(x² - 5x + 6) = (x + 1)(x - 2)(x - 3).",
            formulas: ["P(a) = 0 <=> P(x) = (x - a) Q(x)", "deg(P) = deg(Q) + 1"],
            sampleQuestions: [
              {
                question: "Si P(2) = 0 pour un polynôme P(x), par quel facteur P(x) est-il divisible avec certitude ?",
                options: ["(x - 2)", "(x + 2)", "(2x - 1)", "2x"],
                correctIndex: 0,
                explanation: "D'après le théorème fondamental, si 'a' est racine de P, alors P(x) est divisible par le binôme (x - a)."
              }
            ]
          },
          {
            title: "Systèmes Linéaires et Méthode du Pivot de Gauss",
            desc: "Résolution algorithmique de systèmes de n équations à n inconnues par combinaisons linéaires.",
            coreConcepts: [
              "Écriture matricielle A · X = B d'un système linéaire",
              "Opérations élémentaires sur les lignes (L_i <- L_i + k*L_j, échange de lignes, multiplication par k non nul)",
              "Mise sous forme triangulaire supérieure par échelons successifs",
              "Résolution par remontée (substitution arrière) et interprétation géométrique"
            ],
            practicalEx: "Résolution d'un système 3x3 par Gauss pour trouver l'intersection unique de trois plans de l'espace.",
            formulas: ["L_i <- L_i - (a_{ij} / a_{jj}) L_j"],
            sampleQuestions: [
              {
                question: "Quelle opération élémentaire sur les lignes d'un système linéaire NE modifie PAS l'ensemble des solutions ?",
                options: ["Ajouter à une ligne un multiple d'une autre ligne", "Multiplier une ligne par zéro", "Supprimer une équation au hasard", "Remplacer x par y"],
                correctIndex: 0,
                explanation: "L_i <- L_i + k*L_j est une opération élémentaire réversible qui conserve exactement l'ensemble des solutions du système."
              }
            ]
          }
        ]
      },

      university: {
        objectives: [
          "Maîtriser la théorie des espaces vectoriels de dimension finie, bases, dimension et sous-espaces.",
          "Étudier les applications linéaires, noyau (Ker), image (Im) et théorème du rang.",
          "Calculer les valeurs propres, vecteurs propres et diagonaliser des endomorphismes (polynôme caractéristique).",
          "Comprendre les formes bilinéaires et la réduction des formes quadratiques (loi d'inertie de Sylvester)."
        ],
        chapters: [
          {
            title: "Espaces Vectoriels et Applications Linéaires",
            desc: "Structure axiomatique de K-espace vectoriel, familles libres, génératrices et bases, théorème du rang.",
            coreConcepts: [
              "Axiomes de K-espace vectoriel et sous-espaces vectoriels stables",
              "Familles libres, familles génératrices et bases (Théorème de la base incomplète)",
              "Applications linéaires f ∈ L(E, F), noyau Ker(f) et image Im(f)",
              "Le Théorème du Rang fondamental : dim(E) = dim(Ker f) + rg(f)"
            ],
            practicalEx: "Soit f : R³ -> R² l'application (x, y, z) -> (x - y, y + z). rg(f) = 2, donc dim(Ker f) = 3 - 2 = 1. Ker(f) est une droite vectorielle engendrée par (1, 1, -1).",
            formulas: ["dim(E) = dim(Ker f) + rg(f)", "Mat(f, B_E, B_F)"],
            sampleQuestions: [
              {
                question: "D'après le théorème du rang, si un endomorphisme f d'un espace de dimension 4 a un noyau de dimension 1, quel est son rang ?",
                options: ["3", "1", "4", "2"],
                correctIndex: 0,
                explanation: "rg(f) = dim(E) - dim(Ker f) = 4 - 1 = 3."
              }
            ]
          },
          {
            title: "Réduction des Endomorphismes : Diagonalisation et Trigonalisation",
            desc: "Polynôme caractéristique, sous-espaces propres, critères de diagonalisation et trigonalisation.",
            coreConcepts: [
              "Valeurs propres λ et vecteurs propres v non nuls vérifiant f(v) = λv <=> (f - λId)(v) = 0",
              "Polynôme caractéristique P_A(X) = det(A - X*In)",
              "Condition nécessaire et suffisante de diagonalisation : P_A scindé et multiplicité géométrique = multiplicité algébrique",
              "Théorème de Cayley-Hamilton : P_A(A) = 0 et polynôme minimal"
            ],
            practicalEx: "Calcul des puissances A^n d'une matrice via sa forme diagonale D = P⁻¹ A P => A^n = P D^n P⁻¹.",
            formulas: ["P_A(X) = det(A - X In)", "A = P D P^{-1} => A^n = P D^n P^{-1}"],
            sampleQuestions: [
              {
                question: "Quelle condition sur les valeurs propres assure immédiatement qu'une matrice n × n est diagonalisable ?",
                options: ["Avoir n valeurs propres distinctes deux à deux dans le corps de base K", "Avoir une trace nulle", "Avoir un déterminant positif", "Être triangulaire"],
                correctIndex: 0,
                explanation: "Si le polynôme caractéristique possède n racines simples distinctes dans K, la matrice est automatiquement diagonalisable."
              }
            ]
          }
        ]
      },

      master: {
        objectives: [
          "Théorie avancée des groupes, anneaux commutatifs et modules sur un anneau principal.",
          "Théorie de Galois : extensions de corps, résolubilité par radicaux et clôture algébrique.",
          "Algèbres de Lie semi-simples, systèmes de racines et représentations.",
          "Algèbre homologique : foncteurs dérivés, Ext et Tor."
        ],
        chapters: [
          {
            title: "Théorie de Galois et Extensions de Corps",
            desc: "Corps de rupture, corps de décomposition, séparabilité, groupe de Galois et correspondance de Galois.",
            coreConcepts: [
              "Extensions algébriques et degré [L:K] = dim_K(L)",
              "Polynômes séparables et extensions normales (extensions galoisiennes)",
              "Le groupe de Galois Gal(L/K) = Aut_K(L)",
              "Théorème fondamental de la correspondance de Galois et preuve de l'insolubilité de l'équation du 5ème degré par radicaux"
            ],
            practicalEx: "Calcul du groupe de Galois du polynôme X⁴ - 2 sur Q : Gal(Q(2^{1/4}, i)/Q) est isomorphe au groupe diédral D_4 d'ordre 8.",
            formulas: ["|Gal(L/K)| = [L:K] (si L/K est galoisienne)", "[L:K] = [L:M] * [M:K]"],
            sampleQuestions: [
              {
                question: "Quel résultat historique majeur de la théorie de Galois résout le problème de la résolution des équations polynomiales par radicaux ?",
                options: ["Un polynôme est résoluble par radicaux si et seulement si son groupe de Galois est un groupe résoluble", "Tous les polynômes sont résolubles", "Aucun polynôme de degré supérieur à 3 n'est résoluble", "Seuls les polynômes pairs sont résolubles"],
                correctIndex: 0,
                explanation: "Évariste Galois a prouvé que la résolubilité par radicaux équivaut à la résolubilité du groupe de permutations associé."
              }
            ]
          }
        ]
      }
    }
  }
];
