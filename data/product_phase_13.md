# Produit Phase 13 - Identite app & icone PWA

Date : 2026-06-10

## Objectif

Remplacer l'icone generique de GeoDoku France par une identite visuelle propre, reconnaissable et coherente avec le jeu, sans modifier le gameplay, les donnees metier, le scoring, les anecdotes ni les collections.

Les phases 09 a 12 restent conservees telles quelles. Cette phase ne les renumerote pas et ne les remplace pas.

## Audit PWA initial

Avant cette phase :

- `index.html` ne declarait pas de manifest ;
- aucun favicon dedie GeoDoku n'etait reference ;
- aucun `apple-touch-icon` n'etait reference ;
- aucun jeu d'icones PWA Android/iOS n'existait dans `public` ;
- aucune configuration Vite PWA specifique n'etait presente.

Le dossier `public` contenait principalement le dataset public des anecdotes validees.

## Fichiers modifies

- `index.html`
- `public/site.webmanifest`
- `public/icons/geodoku-icon.svg`
- `public/icons/geodoku-icon-512.png`
- `public/icons/geodoku-icon-192.png`
- `public/icons/apple-touch-icon.png`
- `public/icons/favicon-32.png`
- `data/product_phase_13.md`

## Choix visuels

L'icone creee vise une lecture immediate en petit format :

- fond profond bleu nuit avec nuance chaude brune ;
- silhouette cartographique stylisee pour evoquer la France sans complexite excessive ;
- grille centrale 3 x 3 pour rappeler la mecanique GeoDoku ;
- tuile centrale accentuee pour evoquer le choix de case ;
- etoile/boussole discrete pour renforcer l'idee d'exploration territoriale.

L'objectif est d'eviter l'effet placeholder ou icone generique tout en restant coherent avec l'identite actuelle : sobre, territoriale, chaude, lisible.

## Formats generes

- `512x512` : icone PWA principale Android / installation ;
- `192x192` : icone PWA Android secondaire ;
- `180x180` : `apple-touch-icon` iOS ;
- `32x32` : favicon PNG ;
- `SVG` : favicon vectoriel et source visuelle maintenable.

Le manifest declare les icones `192x192` et `512x512` avec `purpose: "any maskable"` pour ameliorer le rendu comme application installee.

## References ajoutees

Dans `index.html` :

- `meta theme-color` ;
- `link rel="manifest"` ;
- `link rel="icon"` SVG ;
- `link rel="icon"` PNG 32x32 ;
- `link rel="apple-touch-icon"` 180x180.

Dans `public/site.webmanifest` :

- nom long : `GeoDoku France` ;
- nom court : `GeoDoku` ;
- description ;
- `display: standalone` ;
- couleurs de fond et de theme ;
- icones PWA.

## Verification

Controles effectues :

- existence des fichiers d'icones ;
- dimensions PNG verifiees localement ;
- rendu visuel de l'icone 512 controle ;
- manifest lisible et coherent ;
- references HTML presentes ;
- build Vite execute.

La verification d'installation reelle sur un telephone ou un navigateur externe reste a faire manuellement apres deploiement, car elle depend du navigateur, du cache et du contexte HTTPS.

## Limites conservees

- pas de service worker ajoute ;
- pas de configuration PWA avancee ;
- pas de systeme d'images dans le jeu ;
- pas de refonte de l'identite globale ;
- pas de modification du gameplay, du scoring, des grilles, des anecdotes, des collections ou des statuts.

## Pistes reportees

- test manuel d'installation sur Android Chrome ;
- test manuel d'ajout a l'ecran d'accueil sur iOS Safari ;
- generation eventuelle d'un `maskable` dedie avec marge de securite plus large ;
- ajout futur d'un splash screen ou d'une page de demarrage PWA si le besoin apparait ;
- audit Lighthouse PWA apres deploiement public.
