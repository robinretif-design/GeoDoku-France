# Phase 24 - Integration de l'identite officielle GevoCroisee

## Objectif

Faire du Concept C1 - Hexagone discret l'identite officielle active de `GévoCroisée`.

Le gameplay, le scoring, les donnees, les anecdotes, les collections, la rarete et la logique metier n'ont pas ete modifies.

## Fichiers remplaces ou ajoutes

### Assets actifs remplaces

- `public/icons/gevocroisee-icon.svg`
- `public/icons/favicon-32.png`
- `public/icons/apple-touch-icon.png`
- `public/icons/gevocroisee-icon-192.png`
- `public/icons/gevocroisee-icon-512.png`

Ces fichiers utilisent maintenant le symbole officiel C1 :

`quatre idees` + `croisee centrale` + `point de decouverte` + `hexagone discret`.

### Assets officiels ajoutes

- `public/brand/gevocroisee-mark.svg`
- `public/brand/gevocroisee-logo.svg`
- `public/social/gevocroisee-opengraph.svg`
- `public/social/gevocroisee-opengraph.png`

### Fichiers applicatifs/metadonnees modifies

- `index.html`
- `public/site.webmanifest`
- `src/main.jsx`
- `src/styles.css`

## Details d'integration

### `index.html`

- `theme-color` mis a jour vers `#17213A`.
- ajout des metadonnees OpenGraph :
  - `og:type`
  - `og:site_name`
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:image`
  - dimensions et texte alternatif.
- ajout des metadonnees Twitter/X :
  - `twitter:card`
  - `twitter:site`
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`
  - texte alternatif.
- favicon SVG/PNG et Apple touch icon conserves aux routes actives, avec nouveaux contenus C1.

### `public/site.webmanifest`

- `name` : `GévoCroisée`
- `short_name` : `Gévo`
- `background_color` : `#F4F6F0`
- `theme_color` : `#17213A`
- icones PWA :
  - `/icons/gevocroisee-icon-192.png`
  - `/icons/gevocroisee-icon-512.png`
- `purpose` : `any maskable`

### Header applicatif

- le pictogramme Lucide `Map` a ete remplace par l'asset officiel `/brand/gevocroisee-mark.svg`.
- la palette CSS active a ete alignee sur C1 :
  - bleu nuit `#17213A`
  - vert croisee `#1F8A70`
  - corail `#FF6B4A`
  - jaune `#F7C948`
  - fond clair `#F4F6F0`

## Resultat du build

Commande lancee :

```bash
npm.cmd run build
```

Resultat : succes.

Sortie principale :

- `dist/index.html` genere.
- `dist/assets/index-Cpws403w.css` genere.
- `dist/assets/index-DTpnmX_-.js` genere.

Note : Vite signale toujours un warning de chunk JavaScript superieur a 500 kB. Ce warning existait hors sujet identite et ne bloque pas le build.

## Verification PWA

Verification effectuee :

- manifest JSON valide.
- `dist/site.webmanifest` contient bien `theme_color: #17213A`.
- `dist/site.webmanifest` reference les icones C1 192 et 512.
- assets presents dans `dist/icons/` :
  - `favicon-32.png` : 32 x 32
  - `apple-touch-icon.png` : 180 x 180
  - `gevocroisee-icon-192.png` : 192 x 192
  - `gevocroisee-icon-512.png` : 512 x 512
- inspection visuelle effectuee sur :
  - `public/icons/gevocroisee-icon-512.png`
  - `public/icons/favicon-32.png`

## Verification partage social

Verification effectuee :

- `index.html` et `dist/index.html` contiennent les metadonnees OpenGraph.
- `index.html` et `dist/index.html` contiennent les metadonnees Twitter/X.
- image sociale declaree :
  - `https://gevocroisee.fr/social/gevocroisee-opengraph.png`
- image locale generee :
  - `public/social/gevocroisee-opengraph.png`
- image de build presente :
  - `dist/social/gevocroisee-opengraph.png`
- dimensions verifiees : 1200 x 630.
- inspection visuelle effectuee sur l'image OpenGraph generee.

## Controle visuel final

Controle effectue sur les assets actifs :

- icone PWA 512 : lisible, hexagone discret visible, croisee centrale conservee.
- favicon 32 : lisible en petit format.
- OpenGraph : nom, sous-titre, baseline et symbole C1 visibles.

Tentative de controle navigateur local :

- Vite a repondu `200` lors du lancement local.
- Edge/Chrome headless n'ont pas produit de fichiers de capture exploitables dans cette session.
- Le serveur de developpement lance pour le controle s'est arrete avant capture stable.

La validation visuelle finale repose donc sur les assets actifs inspectes, la presence des references dans `dist`, et le build de production reussi.

## Confirmation hors perimetre

Aucune modification n'a ete faite sur :

- gameplay ;
- scoring ;
- donnees departementales ;
- anecdotes ;
- collections ;
- rarete ;
- logique metier.
