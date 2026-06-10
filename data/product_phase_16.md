# Produit Phase 16 - Verification visuelle du lot pilote media

Date : 2026-06-10

## Objectif

Verifier le rendu visuel reel du lot pilote media ajoute en Phase 15, puis corriger uniquement les problemes d'affichage lies aux images.

Les phases 09 a 15 restent conservees telles quelles. Cette phase ne les renumerote pas et ne les remplace pas.

## Scenarios testes

### Banc temporaire de verification

Un banc HTML temporaire hors depot a ete utilise avec le CSS reel du projet et les images locales Phase 15.

Scenarios couverts :

- carte resultat avec departement pilote ;
- carte resultat avec departement non pilote ;
- fiche departement pilote ;
- fiche departement non pilote ;
- bloc anecdote pilote ;
- bloc anecdote non pilote ;
- desktop ;
- mobile etroit.

### Application reelle

L'application construite a ete servie localement via `vite preview`, puis testee avec Chrome headless et le protocole DevTools.

Un resultat quotidien local a ete injecte dans `localStorage` uniquement pour la session de test.

Scenarios verifies dans l'app reelle :

- ecran resultat mobile ;
- ecran resultat desktop ;
- carte resultat avec departement pilote ;
- carte resultat avec departement non pilote ;
- fiche departement pilote ;
- fiche departement non pilote ;
- fallback de fiche non pilote ;
- fallback d'anecdote non pilote.

## Mesures observees

### Resultat mobile reel

- `scrollWidth`: 390 ;
- `clientWidth`: 390 ;
- aucun debordement horizontal detecte apres correction ;
- images pilotes chargees :
  - `/images/departments/17-fort-boyard.svg` ;
  - `/images/departments/14-omaha-beach.svg` ;
  - `/images/departments/75-paris-urbain.svg` ;
- fallback departement charge pour un departement non pilote :
  - `/images/fallbacks/department-fallback.svg`.

### Resultat desktop reel

- `scrollWidth`: 1345 ;
- `clientWidth`: 1345 ;
- aucun debordement horizontal detecte ;
- les memes images pilotes et fallbacks sont correctement resolus.

### Fiche pilote reelle

Fiche ouverte : Charente-Maritime / Fort Boyard.

- `scrollWidth`: 390 ;
- `clientWidth`: 390 ;
- hero charge : `/images/departments/17-fort-boyard.svg` ;
- codes visibles : `17`, `17` ;
- pas de debordement horizontal.

### Fiche non pilote reelle

Fiche ouverte : Allier.

- hero fallback charge : `/images/fallbacks/place-fallback.svg` ;
- anecdote fallback charge : `/images/fallbacks/anecdote-fallback.svg` ;
- code visible : `03` ;
- pas de debordement horizontal.

## Problemes trouves

Le premier test mobile temporaire a montre un risque de debordement horizontal dans les cartes de resultat :

- certaines lignes longues pouvaient etre coupees a droite ;
- les grilles CSS utilisaient `1fr` sans `minmax(0, 1fr)` ;
- certains conteneurs n'avaient pas `min-width: 0` ;
- les textes de cartes et de lieux ne forçaient pas explicitement le retour a la ligne ;
- le code departement en overlay pouvait paraitre trop proche du bord lorsque le conteneur debordait.

## Corrections apportees

Fichier modifie : `src/styles.css`.

Corrections ciblees :

- ajout de `min-width: 0` et `max-width: 100%` aux cartes et blocs media concernes ;
- passage des grilles `.story` et `.place-spotlight` a `minmax(0, 1fr)` ;
- ajout de `width: 100%` sur `.story` ;
- ajout de `min-width: 0` aux blocs texte internes ;
- retour a la ligne explicite sur :
  - titres de cartes ;
  - croisements ;
  - statistiques ;
  - textes de lieux ;
  - textes du hero ;
- largeur maximale forcee sur le hero media.

Ces corrections ne modifient ni le gameplay, ni les donnees, ni le registre pilote.

## Verification des points demandes

| Point | Resultat |
|---|---|
| Lisibilite du code departement en overlay | OK |
| Cadrage des SVG | OK |
| Contraste texte/image | OK |
| Absence de debordement mobile | OK apres correction |
| Coherence images departementales/anecdotes | OK sur le lot pilote |
| Fallback si image absente | OK |
| Absence de saut de mise en page | OK, dimensions fixes conservees |
| Desktop | OK |
| Mobile etroit | OK apres correction |

## Limites restantes

- Les anecdotes sont tirees dynamiquement : une fiche pilote peut afficher une anecdote non pilote selon la selection du moteur. Le fallback anecdote est donc encore visible dans certains cas, ce qui est attendu.
- Les images pilotes d'anecdotes ont ete validees sur le banc temporaire et par resolution de chemins, mais leur apparition dans l'app depend de l'anecdote tiree.
- Les captures de test restent hors depot pour ne pas ajouter d'images supplementaires.
- Aucun test sur appareil physique iOS/Android n'a ete effectue dans cette phase.

## Fichiers modifies

- `src/styles.css`
- `data/product_phase_16.md`

## Fichiers non modifies

- scoring ;
- regles ;
- gameplay ;
- anecdotes editoriales ;
- collections ;
- statuts ;
- registre pilote `src/data/mediaPilot.js` ;
- images du lot pilote.

## Verdict

Pret pour extension prudente a plus de departements.

Avant une generalisation large, il reste recommande de proceder par lots controles, avec verification mobile apres chaque ajout d'images et inventaire de droits maintenu.
