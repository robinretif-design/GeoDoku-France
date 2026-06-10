# Rapport d'activation - Collections Joueur MVP

Date : 2026-06-09

## Fichiers modifies

- `src/data/collections.js`
- `src/services/collectionsService.js`
- `src/main.jsx`
- `data/product_phase_08.md`
- `data/collections_player_activation_report.md`

Aucun fichier de scoring, aucune grille, aucune anecdote, aucun statut editorial et aucune source n'ont ete modifies.

## Logique activee

La Phase 08 separe maintenant deux niveaux :

- `theme` : sujet editorial precis ;
- `collection` : progression joueur lisible.

Le moteur de collection enregistre toujours le theme brut, mais calcule et stocke aussi la collection joueur.

## Taxonomie

Le fichier `src/data/collections.js` definit :

- 40 collections internes ;
- 18 collections visibles au lancement ;
- un mapping explicite pour les themes multi-occurrences ;
- des regles par mots-cles ;
- un fallback par categorie editoriale ;
- une collection cachee `Autres decouvertes` en dernier recours.

Resultat mesure :

```json
{
  "defined": 40,
  "launchVisible": 18,
  "validated": 2840,
  "themed": 2615,
  "fallback": 0
}
```

## Migration Phase 06

La cle localStorage reste :

```text
geodoku-france-collections-v1
```

Les anciennes decouvertes qui contenaient seulement :

```json
{
  "theme": "vercors-resistance",
  "anecdoteId": "old-001"
}
```

sont normalisees en :

```json
{
  "theme": "vercors-resistance",
  "collection": "resistance-maquis",
  "collectionLabel": "Resistance et maquis",
  "anecdoteId": "old-001"
}
```

Controle effectue :

```json
{
  "migratedCollection": "resistance-maquis",
  "migratedLabel": "Resistance et maquis",
  "visibleCollections": 18,
  "recorded": true,
  "recordedCollection": "fromages-terroirs",
  "rejected": false,
  "storedKeys": ["geodoku-france-collections-v1"]
}
```

La valeur `rejected: false` correspond au rejet attendu d'une anecdote `a verifier`.

## Interface

### Cartes et fiches

La pastille affiche maintenant la collection joueur :

```text
Nouvelle collection : Resistance et maquis
Fromages et terroirs : 1/33
Collection : Outre-mer
```

### Statistiques

La section Collections affiche maintenant :

- collections decouvertes ;
- anecdotes classees ;
- derniere collection ;
- progression des collections visibles.

Les collections rares restent masquees tant qu'elles ne sont pas decouvertes.

Les collections vides ne sont pas affichees.

## Verifications

| Verification | Resultat |
| --- | --- |
| `npm.cmd run build` | OK |
| Collections definies | 40 |
| Collections visibles au lancement | 18 |
| Aucune collection vide visible | OK |
| Migration Phase 06 sans perte | OK |
| Ancienne cle localStorage conservee | OK |
| Rejet des anecdotes non validees dans le service collections | OK |
| JSON public sans anecdote non validee | OK |
| Statistiques Phase 03 conservees | OK |
| Decouvertes rares Phase 04 conservees | OK |
| Anti-redondance theme Phase 05 conservee | OK |

Verification JSON public :

```json
{
  "publicTotal": 2840,
  "publicNonValidated": 0
}
```

## Impact gameplay

- Scoring inchange.
- Regles inchangees.
- Grilles inchangees.
- Validation de grille inchangee.
- Selection d'anecdotes validees inchangee.
- Anti-repetition par ID conservee.
- Anti-redondance par theme conservee.
- Decouvertes rares conservees.

## Etat du build

Build OK.

L'avertissement Vite sur le gros chunk JavaScript reste present et attendu. Il est lie au volume editorial embarque cote client.

## Recommandation suivante

La Phase 07 peut maintenant polir l'UX sur une base plus saine :

- harmoniser rarete, collection et tendance locale ;
- eviter l'empilement de pastilles ;
- valoriser `Nouvelle collection` et `Collection enrichie` ;
- garder les collections cachees tant qu'elles ne sont pas decouvertes.
