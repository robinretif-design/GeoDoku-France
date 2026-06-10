# Produit Phase 08 - Collections Joueur MVP

Date : 2026-06-09

Objectif : transformer la couche de conception des collections en fonctionnalite visible pour les joueurs, sans modifier les anecdotes, les themes existants, le scoring, les regles ou les grilles.

## 1. Principe

Le champ `theme` reste la granularite editoriale fine.

La Phase 08 ajoute une couche joueur distincte :

```text
theme -> collection
```

Exemples :

```text
vercors-resistance -> Resistance et maquis
camembert -> Fromages et terroirs
cap-frehel -> Phares, caps et cotes
climats-bourgogne -> UNESCO et sites classes
```

## 2. Taxonomie

Nouveau fichier :

```text
src/data/collections.js
```

Il contient :

- 40 collections internes ;
- 18 collections visibles au lancement ;
- un mapping explicite pour les themes multi-occurrences ;
- des regles de fallback par mots-cles ;
- un fallback par categorie editoriale ;
- une collection technique cachee `Autres decouvertes` si aucun mapping ne correspond.

Les collections rares restent masquees jusqu'a leur premiere decouverte.

## 3. Collections visibles au lancement

Les 18 collections visibles initialement sont :

- Histoire locale ;
- Resistance et maquis ;
- Guerres et memoire ;
- Chateaux et fortifications ;
- Cathedrales et abbayes ;
- Fleuves et canaux ;
- Littoraux, iles et ports ;
- Montagnes et volcans ;
- Outre-mer ;
- Frontieres ;
- Cuisine locale ;
- Industrie et mines ;
- Savoir-faire et artisanat ;
- Cinema et BD ;
- Musees et arts ;
- Villes iconiques ;
- Insolite et records ;
- Langues et cultures regionales.

## 4. Service

Le service `src/services/collectionsService.js` conserve la meme cle localStorage :

```text
geodoku-france-collections-v1
```

La structure stockee evolue sans changer de cle :

```json
{
  "schemaVersion": 2,
  "discoveries": [
    {
      "theme": "vercors-resistance",
      "themeLabel": "Vercors Resistance",
      "collection": "resistance-maquis",
      "collectionLabel": "Resistance et maquis",
      "anecdoteId": "exemple",
      "codeDepartement": "38",
      "rarete": "rare",
      "discoveredAt": "2026-06-09T00:00:00.000Z"
    }
  ]
}
```

Les anciennes decouvertes Phase 06 ne sont pas perdues :

- si une decouverte contient seulement un `theme`, le service infere automatiquement sa `collection` ;
- le stockage reste sur `geodoku-france-collections-v1` ;
- la prochaine sauvegarde ecrit la structure normalisee.

## 5. Affichage joueur

### Fiches et cartes de resultat

La pastille de collection affiche maintenant la collection joueur, pas le theme brut.

Exemples :

```text
Nouvelle collection : Resistance et maquis
Fromages et terroirs : 1/33
Collection : Outre-mer
```

### Ecran statistiques

La section Collections affiche :

- nombre de collections decouvertes ;
- nombre d'anecdotes classees ;
- derniere collection decouverte ;
- progression des collections visibles.

Les collections vides ne sont pas affichees.

Les collections rares ne sont affichees que si elles sont decouvertes.

## 6. Donnees mesurees

| Indicateur | Valeur |
| --- | ---: |
| Collections internes | 40 |
| Collections visibles au lancement | 18 |
| Anecdotes validees | 2840 |
| Anecdotes validees avec theme | 2615 |
| Collections disponibles apres mapping | 40 |
| Anecdotes non validees dans le JSON public | 0 |

Top collections par volume apres mapping :

| Collection | Anecdotes disponibles |
| --- | ---: |
| Histoire locale | 558 |
| Cuisine locale | 324 |
| Musees et arts | 324 |
| Insolite et records | 273 |
| Forets, marais et campagnes | 257 |
| Littoraux, iles et ports | 104 |
| Outre-mer | 96 |
| Fleuves et canaux | 83 |
| Montagnes et volcans | 74 |
| Vins, cidres et alcools | 51 |

## 7. Garanties

- Aucun scoring modifie.
- Aucune regle modifiee.
- Aucune grille modifiee.
- Aucune anecdote modifiee.
- Aucun statut modifie.
- Aucune source modifiee.
- Les themes existants restent inchanges.
- Seules les anecdotes validees peuvent etre affichees.
- Les anecdotes non validees ne sont pas exportees dans le JSON public.

## 8. Limites MVP

- Le mapping n'est pas encore un audit editorial exhaustif theme par theme.
- Le fallback par categorie cree de grandes collections, notamment `Histoire locale`, `Cuisine locale`, `Musees et arts` et `Insolite et records`.
- Les ratios de completion doivent etre lus comme progression ouverte, pas comme objectif de completion rapide.
- Les accents des labels historiques du projet restent soumis a l'encodage actuel des fichiers sources.

## 9. Prochaine iteration

Avant d'ajouter des badges complexes, les priorites recommandees sont :

1. polir l'affichage rarete / collection / tendance locale ;
2. ajouter des paliers de collection : 1, 3, 5, 10, 20 decouvertes ;
3. affiner le mapping manuel pour reduire les fallbacks par categorie ;
4. distinguer collections principales et collections cachees dans l'interface.
