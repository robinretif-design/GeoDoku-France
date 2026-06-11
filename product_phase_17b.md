# Phase 17b - Controle visuel post-renommage

## Perimetre

Controle visuel local de l'application apres renommage public vers GevoCroisee.

Aucune correction de gameplay, scoring, donnees, anecdotes, collections, raretes ou logique metier n'a ete effectuee.

## Methode

- Lancement local de l'app via Vite sur `http://127.0.0.1:5173/`.
- Le navigateur integre Codex a bloque `localhost` et `127.0.0.1` avec `ERR_BLOCKED_BY_CLIENT`; le controle visuel a donc ete execute avec Playwright + Chrome local.
- Verification desktop : `1366 x 900`.
- Verification mobile : `390 x 844`.
- Controle du manifest et des icones PWA par requetes HTTP locales.

## Captures

- `data/phase_17b_desktop_home.png`
- `data/phase_17b_desktop_rules.png`
- `data/phase_17b_desktop_department_modal.png`
- `data/phase_17b_desktop_result.png`
- `data/phase_17b_mobile_home.png`

## Constats visuels

- Logo / titre : `GévoCroisée` visible en desktop et mobile.
- Sous-titre : `Le jeu des territoires français à la croisée des idées.` visible dans l'en-tete, affiche en capitales espacees par le style existant de la marque.
- Baseline : `Chaque jour, croisez vos idées et redécouvrez les départements français.` visible sur l'accueil desktop et mobile.
- Modale "Comment jouer" : visible, aucune mention publique GeoDoku detectee.
- Ecran de resultats : `GévoCroisée #024` visible, partage disponible, aucune mention publique GeoDoku detectee.
- Partage : contenu verifie avec `GévoCroisée #024` et `https://gevocroisee.fr`; aucune mention GeoDoku dans le payload de partage.
- Fiche departement : visible depuis la grille, aucune mention publique GeoDoku detectee.
- Footer : aucun footer present dans l'application.
- Page confidentialite : aucun lien ou page confidentialite visible dans l'application actuelle.
- Manifest PWA : `name`, `short_name`, `description` et chemins d'icones conformes.
- Icones PWA : `/icons/gevocroisee-icon-192.png`, `/icons/gevocroisee-icon-512.png` et `/icons/gevocroisee-icon.svg` servent en HTTP 200.

## Fichiers modifies en phase 17b

- `product_phase_17b.md` : nouveau rapport.
- `data/phase_17b_desktop_home.png` : capture de controle.
- `data/phase_17b_desktop_rules.png` : capture de controle.
- `data/phase_17b_desktop_department_modal.png` : capture de controle.
- `data/phase_17b_desktop_result.png` : capture de controle.
- `data/phase_17b_mobile_home.png` : capture de controle.

Aucun fichier applicatif n'a ete modifie pendant cette phase.

## Build

Commande lancee :

```bash
npm.cmd run build
```

Resultat :

- build Vite reussi ;
- 1762 modules transformes ;
- `dist/index.html`, `dist/assets/index-VgK2OpQ4.css` et `dist/assets/index-BesNmtkz.js` generes ;
- avertissement conserve : chunk JS superieur a 500 kB apres minification.

## Occurrences restantes

Audit final hors `node_modules` :

- Surfaces publiques prioritaires (`index.html`, `public/site.webmanifest`, `public/icons`, `README.md`, `package.json`, `package-lock.json`, `src/main.jsx`, `src/analytics.js`) :
  - `src/main.jsx:39` : `geodoku-france-player-stats`
  - `src/main.jsx:40` : `geodoku-france-daily-results`
  - justification : cles `localStorage` historiques conservees pour ne pas casser les donnees joueur locales.
- Autres fichiers actifs incluant services et donnees editoriales : occurrences restantes dans les cles `localStorage` versionnees et dans `src/data/anecdotes*`.
  - justification : schemas de stockage historiques et contenu editorial/anecdotique explicitement hors perimetre.
- `dist` genere :
  - 6 lignes restantes, issues des anecdotes publiques generees et du bundle applicatif contenant les cles historiques.
- `data` historique/editorial :
  - 118 lignes restantes dans les rapports produit, audits, inventaires et lots CSV historiques.
  - justification : documents historiques et donnees editoriales hors perimetre.
- Anciens dossiers `geodoku-france-mvp` et `geodoku-france-v02` :
  - 10 lignes restantes.
  - justification : anciennes versions explicitement hors perimetre.

## Confirmation

Aucune mention publique visible de GeoDoku n'a ete constatee sur les ecrans controles.

Aucune logique gameplay/scoring/donnees/anecdotes/collections n'a ete modifiee.
