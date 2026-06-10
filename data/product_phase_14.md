# Produit Phase 14 - Infrastructure media departements et anecdotes

Date : 2026-06-10

## Objectif

Poser l'infrastructure technique permettant d'afficher des images associees aux departements, aux lieux remarquables et aux anecdotes, avec des fallbacks propres lorsque l'image n'existe pas encore.

Les phases 09 a 13 restent conservees telles quelles. Cette phase ne les renumerote pas et ne les remplace pas.

## Audit initial

Avant cette phase :

- les cartes de resultat affichaient seulement un bloc couleur avec le code departement ;
- le coup de maitre affichait seulement un bloc couleur avec le code departement ;
- les fiches departementales savaient deja lire `place.image`, mais tous les champs etaient vides ;
- les anecdotes editorialisees n'exposaient pas encore d'image exploitable ;
- aucun dossier public dedie aux images de departements ou d'anecdotes n'existait ;
- aucun fallback media commun n'etait disponible.

Les donnees existantes indiquent surtout une intention via les champs `places[].image`, actuellement vides. Les anecdotes et departements pourront recevoir plus tard un champ `image`, `imageUrl`, `image_url`, `thumbnail`, `coverImage` ou `media.image` sans changer les composants.

## Fichiers modifies

- `src/main.jsx`
- `src/styles.css`
- `src/services/mediaService.js`
- `public/images/departments/.gitkeep`
- `public/images/anecdotes/.gitkeep`
- `public/images/fallbacks/department-fallback.svg`
- `public/images/fallbacks/anecdote-fallback.svg`
- `public/images/fallbacks/place-fallback.svg`
- `data/product_phase_14.md`

## Structure media retenue

```text
public/images/
  departments/
  anecdotes/
  fallbacks/
    department-fallback.svg
    anecdote-fallback.svg
    place-fallback.svg
```

Les dossiers `departments` et `anecdotes` sont prepares pour les futurs visuels verifies. Ils ne contiennent pas encore d'images reelles.

Les fallbacks SVG sont des creations locales, sans dependance a une banque d'images externe.

## Logique de selection

Le service `mediaService.js` centralise la resolution des medias :

- `getDepartmentMedia(dep, relatedPlace)` ;
- `getPlaceMedia(place)` ;
- `getAnecdoteMedia(anecdote)` ;
- `getMediaAlt(entity, fallback)` ;
- `MEDIA_FALLBACKS`.

Les sources acceptees sont locales. Les URLs externes `http://`, `https://` et `//` sont ignorees afin d'eviter une dependance involontaire a des ressources non controlees.

Si un champ image est vide, le composant affiche un fallback local.

Si un champ image pointe vers un fichier local absent ou casse, le composant bascule automatiquement vers le fallback local.

## Composants et affichages touches

### Cartes de resultat

La miniature departementale utilise maintenant `DepartmentThumbnail`.

Elle peut afficher :

- une image departementale locale si elle existe ;
- une image de lieu associe si elle existe ;
- sinon le fallback departemental.

Le code departement reste toujours superpose et lisible.

### Coup de maitre

Le bloc code du coup de maitre utilise aussi `DepartmentThumbnail`.

Il conserve le meme role visuel, mais devient compatible avec une future image departementale.

### Fiche departementale

Le hero de lieu remarquable utilise maintenant `MediaFrame`.

Il peut afficher :

- `featuredPlace.image` ;
- une image departementale si disponible ;
- sinon le fallback de lieu.

Le code departement reste visible en overlay.

### Bloc anecdote

Le bloc `A retenir` contient maintenant une zone media compacte.

Elle peut afficher :

- une image d'anecdote si le futur objet editorial la fournit ;
- sinon le fallback anecdote.

## Conventions recommandees

### Departements

Format recommande :

```text
public/images/departments/29-finistere.webp
public/images/departments/75-paris.webp
public/images/departments/971-guadeloupe.webp
```

Champ possible a ajouter plus tard dans les donnees :

```js
image: "/images/departments/29-finistere.webp"
```

### Anecdotes

Format recommande :

```text
public/images/anecdotes/45-histoire-001.webp
public/images/anecdotes/75-culture-003.webp
```

Champ possible a ajouter plus tard dans les donnees :

```js
image: "/images/anecdotes/45-histoire-001.webp"
```

### Lieux remarquables

Le champ existant peut etre utilise directement :

```js
places: [
  {
    name: "Pointe du Raz",
    type: "paysage",
    image: "/images/departments/29-pointe-du-raz.webp",
    fact: "..."
  }
]
```

## Recommandations droits et qualite

Avant d'ajouter une image :

- verifier la licence ;
- conserver la source dans un futur rapport ou champ editorial dedie ;
- preferer des fichiers locaux optimises ;
- eviter les hotlinks ;
- eviter les photos dont le statut juridique est ambigu ;
- privilegier `.webp` ou `.jpg` optimise pour les photos ;
- garder une taille raisonnable pour le mobile.

## Limites volontairement conservees

- aucune image reelle non sourcee n'a ete ajoutee ;
- aucun CMS n'a ete introduit ;
- aucun import automatique de banque d'images n'a ete fait ;
- aucun changement de scoring, de gameplay, de regles, d'anecdotes, de collections ou de statuts ;
- pas de chargement distant ;
- pas de champ image ajoute massivement aux 101 departements ou aux anecdotes.

## Pistes reportees

- audit legal et sourcing des images ;
- premier lot pilote d'images verifiees ;
- generation d'un manifest media public ;
- compression automatique des images ;
- lazy loading plus avance ;
- tests visuels sur appareil mobile reel ;
- enrichissement des exports publics avec images validees.

## Verification

Controles prevus :

- build Vite ;
- presence des dossiers `public/images` ;
- presence des fallbacks dans `dist` apres build ;
- rendu non vide des fallbacks ;
- aucun contenu editorial ou statut modifie.
