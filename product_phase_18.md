# Phase 18 - Audit complet de l'identite visuelle GevoCroisee

## Perimetre

Audit realise sans modification fonctionnelle ni creation de nouveau visuel. Les fichiers applicatifs, les donnees, le gameplay, le scoring, les anecdotes, les collections et les images existantes n'ont pas ete modifies.

Les captures deja produites en phase 17b ont ete reutilisees comme base de constat visuel :

- `data/phase_17b_desktop_home.png`
- `data/phase_17b_desktop_rules.png`
- `data/phase_17b_desktop_department_modal.png`
- `data/phase_17b_desktop_result.png`
- `data/phase_17b_mobile_home.png`

## Fichiers inspectes

- `index.html`
- `public/site.webmanifest`
- `public/icons/*`
- `public/images/departments/*`
- `public/images/anecdotes/*`
- `public/images/fallbacks/*`
- `src/main.jsx`
- `src/styles.css`
- `src/services/mediaService.js`
- `src/data/mediaPilot.js`
- `README.md`

## Cartographie des surfaces d'identite

| Surface | Fichier / source | Role |
|---|---|---|
| Titre HTML et theme navigateur | `index.html` | Metadonnees publiques, couleur navigateur mobile, liens favicon/manifest |
| Manifest PWA | `public/site.webmanifest` | Nom PWA, short name, description, couleurs et icones installees |
| Favicon | `public/icons/favicon-32.png` | Icone navigateur 32 px |
| Apple touch icon | `public/icons/apple-touch-icon.png` | Icone iOS 180 px |
| Icones PWA | `public/icons/gevocroisee-icon-192.png`, `public/icons/gevocroisee-icon-512.png` | Icones d'installation PWA |
| Icone source SVG | `public/icons/gevocroisee-icon.svg` | Source vectorielle de l'icone de marque |
| Logo applicatif | `src/main.jsx`, `src/styles.css` | Lockup en-tete : pictogramme Lucide + nom + sous-titre |
| Illustrations departements | `public/images/departments/*`, `src/data/mediaPilot.js` | Visuels pilotes affiches dans les fiches et cartes media |
| Illustrations anecdotes | `public/images/anecdotes/*`, `src/data/mediaPilot.js` | Visuels pilotes affiches pour certaines anecdotes |
| Fallbacks media | `public/images/fallbacks/*`, `src/services/mediaService.js` | Visuels generiques quand aucun media pilote n'est disponible |
| OpenGraph / Twitter | Non trouve | Aucune image sociale dediee n'est declaree |
| Splash screen dedie | Non trouve | Aucun fichier de splash screen ; le rendu PWA depend du manifest, des icones et des couleurs |

## Inventaire des assets graphiques

| Element | Fichier | Format | Dimensions | Utilisation | Dependances |
|---|---:|---:|---:|---|---|
| Logo principal applicatif | `src/main.jsx` + `src/styles.css` | SVG React via `lucide-react` | Conteneur CSS 48 x 48 px, icone 19 px | En-tete, bouton de retour accueil | `Map` de `lucide-react`, classes `.brand`, `.logo` |
| Favicon | `public/icons/favicon-32.png` | PNG | 32 x 32 px | `index.html`, onglet navigateur | Lien `<link rel="icon">` |
| Apple touch icon | `public/icons/apple-touch-icon.png` | PNG | 180 x 180 px | `index.html`, raccourci iOS | Lien `<link rel="apple-touch-icon">` |
| Icone PWA 192 | `public/icons/gevocroisee-icon-192.png` | PNG | 192 x 192 px | `public/site.webmanifest` | Entree `icons[]`, type `image/png` |
| Icone PWA 512 | `public/icons/gevocroisee-icon-512.png` | PNG | 512 x 512 px | `public/site.webmanifest` | Entree `icons[]`, type `image/png` |
| Icone source PWA | `public/icons/gevocroisee-icon.svg` | SVG | viewBox 512 x 512 | `index.html`, source vectorielle publique | `<title>GévoCroisée</title>`, `<desc>` interne |
| Image departement 13 | `public/images/departments/13-marseille-calanques.svg` | SVG | 900 x 560 px | Media pilote departement / lieu | `src/data/mediaPilot.js` |
| Image departement 14 | `public/images/departments/14-omaha-beach.svg` | SVG | 900 x 560 px | Media pilote departement / lieu | `src/data/mediaPilot.js` |
| Image departement 17 | `public/images/departments/17-fort-boyard.svg` | SVG | 900 x 560 px | Media pilote departement / lieu | `src/data/mediaPilot.js` |
| Image departement 44 | `public/images/departments/44-saint-nazaire.svg` | SVG | 900 x 560 px | Media pilote departement / lieu | `src/data/mediaPilot.js` |
| Image departement 75 | `public/images/departments/75-paris-urbain.svg` | SVG | 900 x 560 px | Media pilote departement / lieu | `src/data/mediaPilot.js` |
| Image anecdote 13 | `public/images/anecdotes/13-histoire-006-berre-industriel.svg` | SVG | 900 x 420 px | Media pilote anecdote | `src/data/mediaPilot.js` |
| Image anecdote 14 | `public/images/anecdotes/14-histoire-003-debarquement.svg` | SVG | 900 x 420 px | Media pilote anecdote | `src/data/mediaPilot.js` |
| Image anecdote 17 | `public/images/anecdotes/17-histoire-005-fort-boyard.svg` | SVG | 900 x 420 px | Media pilote anecdote | `src/data/mediaPilot.js` |
| Image anecdote 44 | `public/images/anecdotes/44-seed-0015-saint-nazaire.svg` | SVG | 900 x 420 px | Media pilote anecdote | `src/data/mediaPilot.js` |
| Image anecdote 75 | `public/images/anecdotes/75-seed-0011-paris.svg` | SVG | 900 x 420 px | Media pilote anecdote | `src/data/mediaPilot.js` |
| Fallback departement | `public/images/fallbacks/department-fallback.svg` | SVG | 640 x 420 px | Media generique departement | `src/services/mediaService.js` |
| Fallback anecdote | `public/images/fallbacks/anecdote-fallback.svg` | SVG | 640 x 300 px | Media generique anecdote | `src/services/mediaService.js` |
| Fallback lieu | `public/images/fallbacks/place-fallback.svg` | SVG | 640 x 420 px | Media generique lieu | `src/services/mediaService.js` |

## Manifest et metadonnees

`public/site.webmanifest` declare l'identite PWA suivante :

- `name` : `GévoCroisée`
- `short_name` : `Gévo`
- `description` : `Le jeu des territoires français à la croisée des idées.`
- `start_url` : `/`
- `display` : `standalone`
- `background_color` : `#f6f0e4`
- `theme_color` : `#273a5c`
- icones : `gevocroisee-icon-192.png`, `gevocroisee-icon-512.png`

`index.html` declare :

- `theme-color` : `#273a5c`
- manifest : `/site.webmanifest`
- favicon SVG : `/icons/gevocroisee-icon.svg`
- favicon PNG : `/icons/favicon-32.png`
- Apple touch icon : `/icons/apple-touch-icon.png`

Aucune image `og:image`, `twitter:image`, `og:title`, `twitter:title` ou visuel social dedie n'a ete trouvee dans `index.html`.

## Palette actuelle

| Role | Couleur | Source | Usage observe |
|---|---:|---|---|
| Fond principal | `#f7f2e8` | `--bg` dans `src/styles.css` | Arriere-plan global creme |
| Fond PWA | `#f6f0e4` | `public/site.webmanifest` | Splash PWA implicite / fond installation |
| Surface papier | `#fffdf7` | `--paper` | Cartes, panneaux, modales |
| Texte principal | `#14213d` | `--ink` | Texte fort, titres secondaires |
| Texte attenue | `#667085` | `--muted` | Labels, aides, meta |
| Ligne claire | `#ded4c5` | `--line` | Bordures |
| Ligne forte | `#cbbda8` | `--line-strong` | Bordures accentuees |
| Bleu nuit | `#101828` | `--navy` | Logo carre, boutons, elements forts |
| Bleu marque / theme | `#273a5c` | `--blue`, manifest, meta theme | Couleur navigateur, media frames, accents |
| Accent brun | `#7a4f35` | `--accent` | Etats experts, accents editoriaux |
| Gradient bouton primaire | `#243553` vers `#0d1321` | `.primary` | Boutons principaux |
| Accent media brun | `#8a725c`, `#8a5d3d`, `#8d6b49` | `src/styles.css`, SVG | Fonds media et illustrations |
| Vert validation / facile | `#2f6f4e` | `src/styles.css` | Badges ou etats faciles |
| Tons illustration | `#fff8e7`, `#fff8e6`, `#fff6df`, `#fff5d4`, `#fff3d5`, `#fff1bd` | SVG publics | Fonds et formes des illustrations |

Lecture generale : l'identite actuelle repose sur un trio creme / bleu nuit / brun. Cette palette est coherente avec une ambiance patrimoniale et territoriale, mais elle reste tres proche de l'identite visuelle heritee du projet GeoDoku.

## Description des elements visibles

### Ecran d'accueil

Capture : `data/phase_17b_desktop_home.png` et `data/phase_17b_mobile_home.png`.

L'en-tete affiche un pictogramme carte dans un carre bleu nuit, suivi du nom `GévoCroisée` en serif et du sous-titre en petites capitales espacees. Le hero conserve une structure de jeu de puzzle territorial : grand titre editorial, edition du jour, boutons arrondis, grille de departements et palette creme/bleu/brun.

### Ecran de resultats

Capture : `data/phase_17b_desktop_result.png`.

Le resultat reprend le meme en-tete et la meme palette. Les cartes de score, les miniatures et les etats de reponse utilisent le langage visuel existant : surfaces papier, bordures beiges, boutons bleu nuit, badges et illustrations territoriales.

### Fiche departement

Capture : `data/phase_17b_desktop_department_modal.png`.

La fiche departement utilise une grande image SVG territoriale ou un fallback, avec badge media, surface papier et overlay sombre. Le rendu reste plus proche d'une fiche documentaire/patrimoniale que d'une identite de marque specifique a `GévoCroisée`.

### Icone PWA

Fichiers : `public/icons/gevocroisee-icon.svg`, `public/icons/gevocroisee-icon-192.png`, `public/icons/gevocroisee-icon-512.png`.

L'icone affiche une grille 3 x 3 avec une silhouette cartographique stylisee. Les textes internes SVG ont ete renommes vers `GévoCroisée`, mais le vocabulaire visuel reste celui d'une grille GeoDoku.

### Favicon

Fichier : `public/icons/favicon-32.png`.

Le favicon est un PNG 32 x 32. Son nom est generique, mais son style semble derive de la meme famille graphique que l'icone PWA : bleu nuit, creme et logique de grille/carte.

## Restes visuels herites de GeoDoku

- L'icone PWA `gevocroisee-icon.svg` est renommee, mais son dessin reste centre sur une grille 3 x 3 et une silhouette cartographique. C'est le principal heritage visuel de GeoDoku.
- Les PNG PWA, le favicon et l'Apple touch icon semblent etre des exports de cette meme logique graphique.
- Le logo applicatif dans l'en-tete n'utilise pas l'icone PWA : il utilise un pictogramme `Map` de Lucide. Il existe donc deux signes de marque concurrents.
- Les illustrations SVG departements/anecdotes/fallbacks partagent la palette creme/bleu/brun et une direction pictographique generique. Elles ne portent pas encore une signature `GévoCroisée`.
- Le langage visuel global reste organise autour du puzzle, de la grille, de la carte et du patrimoine. Ces elements sont compatibles avec le gameplay, mais ils ne traduisent pas encore fortement l'idee de croisement portee par le nouveau nom.
- Aucune image OpenGraph/Twitter ne permet d'installer la nouvelle identite sur les partages sociaux.
- Aucun splash screen dedie ni jeu de screenshots PWA n'a ete trouve.

## Points faibles de l'identite actuelle

- Absence de logo source unique : l'application assemble un lockup en React/CSS, tandis que la PWA utilise une icone separee.
- Incoherence entre le pictogramme d'en-tete et l'icone PWA.
- Identite visuelle encore tres dependante du vocabulaire GeoDoku : grille, cases, carte stylisee.
- Palette solide mais peu distinctive pour une nouvelle marque ; elle evoque davantage un jeu patrimonial/documentaire qu'une identite proprement `GévoCroisée`.
- Assets sociaux absents : pas d'OpenGraph, pas de Twitter/X image.
- Pas de systeme documente pour regenerer favicon, Apple touch icon et icones PWA a partir d'une source maitresse.
- Couleurs dispersees entre variables CSS, styles directs et SVG ; la maintenance d'une future refonte demandera une consolidation.
- Les illustrations pilotes et fallbacks ne sont pas separees conceptuellement des assets de marque, ce qui peut brouiller la frontiere entre contenu editorial et identite.

## Recommandations techniques pour une future identite GevoCroisee

1. Creer une source logo maitresse, par exemple `public/brand/gevocroisee-logo.svg` et `public/brand/gevocroisee-icon.svg`, puis generer favicon, Apple touch icon et PWA PNG depuis cette source.
2. Aligner le logo d'en-tete et l'icone PWA sur le meme signe graphique.
3. Explorer un symbole de marque fonde sur l'idee de croisement : intersections, chemins, diagonales, coordonnees, croix douce ou carte croisee, sans abandonner les indices territoriaux.
4. Ajouter une image OpenGraph/Twitter 1200 x 630 px dediee a `GévoCroisée`.
5. Ajouter des screenshots PWA dans le manifest si l'objectif est une installation mobile plus soignee.
6. Centraliser les couleurs de marque dans des variables CSS explicites : `--brand-primary`, `--brand-secondary`, `--brand-accent`, `--brand-bg`, `--brand-surface`.
7. Sortir les couleurs dures des SVG ou documenter une palette d'illustration, afin de pouvoir thematiser les images lors d'une refonte.
8. Distinguer les assets de marque (`public/brand` ou `public/icons`) des assets editoriaux (`public/images`), pour eviter que les illustrations de contenu definissent l'identite produit par accident.
9. Prevoir des variantes claire/sombre ou petit format pour garantir la lisibilite du logo en favicon, PWA, header et partage social.
10. Documenter la chaine de generation des icones dans le README ou un fichier dedie, afin que les exports restent synchronises.

## Confirmation de non-modification

Aucun fichier applicatif, asset graphique, donnees departementales, anecdote, collection, rarete, scoring ou logique metier n'a ete modifie dans le cadre de cet audit. Le seul livrable cree pour la phase 18 est ce rapport.
