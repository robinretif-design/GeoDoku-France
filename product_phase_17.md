# Phase 17 - Renommage identite publique

## Objectif

Renommer l'identite publique GeoDoku / GeoDoku France / geodoku-france vers GevoCroisee / gevocroisee, sans modifier le gameplay, le scoring, les regles, les anecdotes, les donnees departementales, les collections, les raretes, les images de contenu, les statuts editoriaux ou la logique metier.

Identite officielle appliquee :

- Nom public : GevoCroisee
- Slug ASCII : `gevocroisee`
- Domaine cible : `https://gevocroisee.fr`
- Reseaux sociaux : `@gevocroisee`
- Sous-titre : Le jeu des territoires francais a la croisee des idees.
- Baseline : Chaque jour, croisez vos idees et redecouvrez les departements francais.

## Fichiers modifies

- `index.html`
  - titre public remplace par `GevoCroisee` ;
  - meta description ajoutee ;
  - favicon SVG pointe vers `/icons/gevocroisee-icon.svg`.
- `public/site.webmanifest`
  - `name`, `short_name`, `description` et references d'icones remplaces.
- `public/icons/geodoku-icon.svg` -> `public/icons/gevocroisee-icon.svg`
  - seuls `title` et `desc` internes ont ete renommes.
- `public/icons/geodoku-icon-192.png` -> `public/icons/gevocroisee-icon-192.png`
- `public/icons/geodoku-icon-512.png` -> `public/icons/gevocroisee-icon-512.png`
- `README.md`
  - titre et mentions publiques renommes ;
  - bloc d'identite officielle ajoute ;
  - domaine Plausible d'exemple remplace par `gevocroisee.fr`.
- `package.json`
  - nom de package ajoute : `gevocroisee`.
- `package-lock.json`
  - nom de package remplace par `gevocroisee`.
- `src/main.jsx`
  - textes publics, marque, libelles d'edition, URL de partage, logs de debug et aria-labels renommes ;
  - baseline officielle ajoutee sur l'accueil ;
  - import et appels analytics mis a jour vers `trackGevocroiseeEvent`.
- `src/analytics.js`
  - logs documentaires renommes ;
  - attributs DOM internes `data-geodoku-analytics*` remplaces par `data-gevocroisee-analytics*` ;
  - export `trackGeoDokuEvent` renomme en `trackGevocroiseeEvent`.
- `dist/`
  - regenere uniquement via le build Vite.

## Occurrences restantes

Audit final hors `node_modules` :

- fichiers actifs (`index.html`, `public`, `src`, `README.md`, `package.json`, `package-lock.json`) : 21 lignes restantes ;
- `dist` genere : 6 lignes restantes ;
- `data` historique/editorial : 118 lignes restantes ;
- anciens dossiers `geodoku-france-mvp` et `geodoku-france-v02` : occurrences conservees, hors perimetre.

Familles conservees dans les fichiers actifs :

- Cles `localStorage` historiques :
  - `geodoku-france-player-stats`
  - `geodoku-france-daily-results`
  - `geodoku-france-anecdotes-seen`
  - `geodoku-france-anecdotes-stats`
  - `geodoku-france-anecdotes-recent-themes`
  - `geodoku-france-community-stats-v1`
  - `geodoku-france-collections-v1`
  - `geodoku-france-discoveries-v1`
  - justification : conservation volontaire pour ne pas casser les donnees locales joueur ni changer les schemas de stockage.
- Donnees et sources editoriales :
  - `src/data/anecdotes.js`
  - `src/data/anecdotes/batch001.js`
  - `src/data/anecdotes/batch009.js`
  - `src/data/anecdotes/batch011.js`
  - `public/data/anecdotes-valides.json`
  - justification : contenu editorial/anecdotique ou source de lot, explicitement hors perimetre de renommage pour eviter toute modification de donnees.

Familles conservees dans `dist` :

- `dist/data/anecdotes-valides.json` : occurrences issues des anecdotes publiques generees depuis les donnees editoriales conservees.
- `dist/assets/index-*.js` : occurrences issues du bundle applicatif, principalement cles de stockage historiques et contenu editorial embarque.

Familles conservees dans `data` :

- rapports produit, audits historiques, inventaires media et lots CSV historiques ;
- justification : documents d'historique projet et donnees editoriales, explicitement exclus de la phase.

Familles conservees dans les anciens dossiers :

- `geodoku-france-mvp`
- `geodoku-france-v02`
- justification : anciennes versions explicitement hors perimetre.

## Build

Commande demandee :

- `npm run build` : echec sous PowerShell, bloque par la policy d'execution de `npm.ps1`.

Commande equivalente lancee ensuite :

- `npm.cmd run build` : succes.

Resultat :

- Vite a compile 1762 modules ;
- `dist/index.html`, `dist/assets/index-VgK2OpQ4.css` et `dist/assets/index-BesNmtkz.js` generes ;
- avertissement Vite conserve : chunk JS superieur a 500 kB apres minification.

## Confirmation

Aucune modification volontaire n'a ete faite dans :

- gameplay ;
- scoring ;
- regles ;
- raretes ;
- anecdotes ;
- donnees departementales ;
- collections ;
- images de contenu ou fallback SVG ;
- statuts editoriaux ;
- logique metier.

Les seules modifications de code concernent les textes publics, les metadonnees, les references PWA, le nom de package et les identifiants analytics internes lies au renommage.
