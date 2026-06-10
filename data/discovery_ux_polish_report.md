# Rapport - Polish UX des decouvertes

Date : 2026-06-10

## Fichiers modifies

- `src/main.jsx`
- `src/styles.css`
- `data/product_phase_07.md`
- `data/discovery_ux_polish_report.md`

## Changements UI

### Nouveau composant reutilisable

Ajout de :

- `DiscoveryBadge`
- `DiscoverySignals`

Le composant centralise les signaux de decouverte :

- rarete ;
- collection ;
- tendance locale.

## Logique d'affichage

### Rarete

Les raretes visibles sont transformees en micro-messages :

- rare : `Anecdote rare decouverte` ;
- tres rare : `Anecdote tres rare decouverte` ;
- legendaire : `Anecdote legendaire decouverte`.

Les anecdotes communes et peu communes ne creent pas de badge de rarete, comme avant.

### Collection

Le badge collection utilise les informations deja fournies par `collectionsService` :

- nouvelle collection : `Nouvelle collection decouverte` ;
- nouvelle anecdote dans une collection existante : `Collection enrichie` ;
- collection deja connue : `Collection`.

La progression courte reste affichee sous la forme `nom collection x/y`.

### Tendance locale

La tendance locale reste affichee sur les cartes de resultat, mais elle est maintenant integree au meme bloc visuel.

Elle apparait apres rarete et collection, conformement a la priorite :

1. legendaire ;
2. tres rare ;
3. rare ;
4. collection ;
5. tendance locale.

## Anti-empilement

Le design evite l'empilement de pastilles en traitant la tendance locale comme une ligne informative pleine largeur.

Sur mobile :

- les libelles peuvent revenir a la ligne ;
- les details longs ne debordent pas ;
- les badges gardent une hauteur contenue ;
- la tendance locale reste lisible sans pousser le texte hors de sa carte.

## Verifications fonctionnelles

### Statistiques Phase 03

La logique de statistiques locales n'a pas ete modifiee.

`getCommunityInsightForPlacement` est toujours appele au meme endroit, sur les cartes de resultat.

### Decouvertes Phase 04

La logique de decouverte rare n'a pas ete modifiee.

`getRarityMetadata` est toujours la source d'information pour savoir si une rarete doit etre affichee.

### Collections Phase 08

La logique de collection n'a pas ete modifiee.

Le composant exploite seulement l'objet `displayAnecdote.collection` deja calcule par `recordCollectionDiscovery`.

### Anti-redondance Phase 05

La selection d'anecdote et l'anti-redondance par theme restent dans `anecdotesService`.

Aucun changement de service n'a ete applique.

### Validation editoriale

Le composant n'affiche les signaux de rarete et de collection que pour les anecdotes non fallback deja selectionnees par le moteur existant.

La garantie de non-exposition des anecdotes non validees reste portee par le service de selection existant.

## Risques restants

- La tendance locale reste parfois longue : elle est contenue visuellement, mais le texte pourrait etre raccourci plus tard si besoin.
- Les micro-messages sont volontairement sobres : un futur test utilisateur dira s'ils sont assez gratifiants.
- Les raretes tres rares et legendaires restent peu visibles par nature, comme indique dans l'audit Phase 10.

## Resultat

La richesse produit devient plus perceptible sans ajout de regle.

Le joueur voit maintenant une zone coherente de decouverte sur les cartes de resultat et dans la fiche departement, au lieu de signaux separes.
