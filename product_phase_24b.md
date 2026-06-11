# Phase 24b - Controle visuel reel post-integration GevoCroisee

## Methode

Controle realise en local avec `npm.cmd run dev`, Chrome local pilote via le protocole DevTools, puis captures PNG des vues demandees.

Aucune correction applicative n'a ete necessaire.

## Captures creees

- `data/phase_24b_desktop_home.png` : accueil desktop, 1366 x 900.
- `data/phase_24b_mobile_home.png` : accueil mobile, 390 x 844.
- `data/phase_24b_result.png` : ecran de resultat, 1366 x 900.
- `data/phase_24b_department_sheet.png` : fiche departement ouverte, 1366 x 900.

## Constats visuels

- Le logo d'en-tete charge bien `/brand/gevocroisee-mark.svg`.
- Le symbole C1 est visible en desktop et mobile : croisee centrale, quatre tuiles et hexagone discret.
- La palette C1 est appliquee : bleu nuit, vert croisee, corail, fond clair.
- L'ecran d'accueil est lisible en desktop et mobile.
- La grille de jeu a ete parcourue en conditions reelles pour produire un resultat.
- L'ecran resultat s'affiche correctement avec la nouvelle identite en en-tete.
- La fiche departement s'ouvre correctement au-dessus du resultat.
- Le favicon est reference par l'application : `/icons/favicon-32.png`.
- Le manifest PWA est reference par l'application : `/site.webmanifest`.
- Les icones PWA sont servies en local pendant le test :
  - `/icons/gevocroisee-icon-192.png`
  - `/icons/gevocroisee-icon-512.png`
- L'image OpenGraph est presente et servie :
  - `public/social/gevocroisee-opengraph.png`
  - `dist/social/gevocroisee-opengraph.png`

## Verification PWA et partage

- `site.webmanifest` contient `name: GévoCroisée`.
- `theme_color` : `#17213A`.
- `background_color` : `#F4F6F0`.
- Icone PWA 192 : 192 x 192.
- Icone PWA 512 : 512 x 512.
- Favicon : 32 x 32.
- OpenGraph : 1200 x 630.
- Les metadonnees OpenGraph et Twitter/X sont presentes dans `dist/index.html`.

## Problemes eventuels

Aucun asset casse constate.

Point mineur non bloquant : le build conserve le warning Vite existant sur la taille du chunk JavaScript superieur a 500 kB. Ce warning n'est pas lie a l'identite visuelle.

## Fichiers modifies pendant cette phase

Aucun fichier applicatif n'a ete modifie pendant la phase 24b.

Fichiers generes :

- `data/phase_24b_desktop_home.png`
- `data/phase_24b_mobile_home.png`
- `data/phase_24b_result.png`
- `data/phase_24b_department_sheet.png`
- `product_phase_24b.md`

`dist/` a ete regenere par `npm.cmd run build`.

## Resultat du build

Commande lancee :

```bash
npm.cmd run build
```

Resultat : succes.

Sortie :

- `dist/index.html`
- `dist/assets/index-Cpws403w.css`
- `dist/assets/index-DTpnmX_-.js`

## Confirmation hors perimetre

Aucune modification n'a ete faite sur :

- gameplay ;
- scoring ;
- donnees ;
- anecdotes ;
- collections ;
- rarete ;
- logique metier.
