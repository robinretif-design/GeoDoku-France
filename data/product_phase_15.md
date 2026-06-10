# Produit Phase 15 - Lot pilote d'images locales verifiees

Date : 2026-06-10

## Objectif

Tester l'infrastructure media creee en Phase 14 avec un petit lot pilote d'images locales, sans introduire d'image non sourcee ni de dependance externe.

Les phases 09 a 14 restent conservees telles quelles. Cette phase ne les renumerote pas et ne les remplace pas.

## Principe retenu

Aucune banque d'images n'a ete interrogee.
Aucune photo externe n'a ete telechargee.
Aucune image dont la licence serait incertaine n'a ete ajoutee.

Le lot pilote utilise uniquement des illustrations SVG originales creees localement pour GeoDoku France.

## Lot pilote

### Departements

5 departements maximum, conformement a la contrainte :

- `13` Bouches-du-Rhone ;
- `14` Calvados ;
- `17` Charente-Maritime ;
- `44` Loire-Atlantique ;
- `75` Paris.

### Anecdotes

5 anecdotes maximum, conformement a la contrainte :

- `13-histoire-006` ;
- `14-histoire-003` ;
- `17-histoire-005` ;
- `44-seed-0015` ;
- `75-seed-0011`.

Les anecdotes n'ont pas ete modifiees. Le branchement image passe par un registre media separe.

## Fichiers modifies

- `src/data/mediaPilot.js`
- `src/services/mediaService.js`
- `public/images/departments/13-marseille-calanques.svg`
- `public/images/departments/14-omaha-beach.svg`
- `public/images/departments/17-fort-boyard.svg`
- `public/images/departments/44-saint-nazaire.svg`
- `public/images/departments/75-paris-urbain.svg`
- `public/images/anecdotes/13-histoire-006-berre-industriel.svg`
- `public/images/anecdotes/14-histoire-003-debarquement.svg`
- `public/images/anecdotes/17-histoire-005-fort-boyard.svg`
- `public/images/anecdotes/44-seed-0015-saint-nazaire.svg`
- `public/images/anecdotes/75-seed-0011-paris.svg`
- `data/media_inventory_phase_15.md`
- `data/product_phase_15.md`

## Branchement technique

Un fichier `src/data/mediaPilot.js` ajoute trois mappings :

- `PILOT_DEPARTMENT_MEDIA` : code departement vers image locale ;
- `PILOT_PLACE_MEDIA` : nom de lieu vers image locale ;
- `PILOT_ANECDOTE_MEDIA` : id anecdote vers image locale.

Le service `mediaService.js` lit ces mappings en complement des futurs champs directs `image`, `imageUrl`, `thumbnail`, `coverImage` ou `media.image`.

Cette approche permet de tester le rendu sans modifier :

- les objets departements dans `gameData.js` ;
- les objets anecdotes ;
- les statuts editoriaux ;
- les collections ;
- le gameplay.

## Rendu attendu

### Cartes de resultat

Pour les departements pilotes, la miniature affiche une image locale stylisee au lieu du fallback generique.

Le code departement reste en overlay et conserve la lisibilite.

### Fiche departementale

Le hero de lieu remarquable peut afficher l'image pilote si le lieu correspond au mapping :

- Calanques de Marseille ;
- Omaha Beach ;
- Fort Boyard ;
- Chantiers de l'Atlantique ;
- Canal Saint-Martin.

Si un autre lieu est selectionne aleatoirement, le systeme conserve le fallback de Phase 14.

### Bloc anecdote

Pour les 5 anecdotes pilotes, le bloc `A retenir` affiche une image locale d'anecdote.

Si une autre anecdote est tiree, le fallback anecdote reste actif.

## Verification effectuee

- comptage du lot pilote : 5 departements, 5 anecdotes, 5 lieux ;
- presence des 10 SVG dans `public/images` ;
- copie des 10 SVG dans `dist/images` apres build ;
- absence d'import d'image distante ;
- `npm.cmd run build` OK ;
- aucun statut editorial modifie ;
- aucun contenu d'anecdote modifie.

La verification navigateur integree n'a pas pu etre terminee dans cette session a cause d'un echec de sandbox de l'outil navigateur. Le rendu doit donc encore etre valide manuellement sur mobile ou via une session navigateur disponible.

## Limites

- Les images sont des illustrations pilotes, pas encore des photos documentaires ;
- aucune image reelle de monument ou de paysage n'a ete ajoutee ;
- le lot est volontairement limite a 5 departements et 5 anecdotes ;
- `44-seed-0015` et `75-seed-0011` sont des anecdotes generalistes utilisees pour tester le pipeline sur des contenus deja valides ;
- pas de compression avancee ni de format `.webp` dans cette phase ;
- pas de CMS media.

## Recommandations pour generaliser

1. Valider une politique de sources images avant toute production massive.
2. Prioriser un lot photo tres restreint avec licences documentees.
3. Ajouter un champ ou rapport de provenance media par fichier.
4. Convertir les photos reelles en `.webp` optimise mobile.
5. Tester chaque lot sur mobile avant extension.
6. Eviter de brancher une image sur une anecdote non validee.
