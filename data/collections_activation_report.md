# Rapport d'activation - Collections thematiques

Date : 2026-06-09

## Fichiers modifies

- `src/services/collectionsService.js`
- `src/main.jsx`
- `src/styles.css`
- `data/product_phase_06.md`
- `data/collections_activation_report.md`

Aucun contenu editorial, aucun statut, aucune source, aucune grille, aucun fichier de scoring et aucune regle de jeu n'ont ete modifies.

## Logique ajoutee

Le nouveau service de collections enregistre une decouverte lorsqu'une anecdote deja selectionnee par le moteur editorial possede un `theme`.

La sequence reste volontairement simple :

1. le moteur d'anecdotes choisit une anecdote validee ;
2. l'anti-repetition par ID et l'anti-redondance par theme restent actifs ;
3. l'anecdote est enregistree comme affichee ;
4. si sa rarete le justifie, elle est enregistree comme decouverte rare ;
5. si elle possede un `theme`, elle enrichit la collection locale.

La Phase 06 ne modifie donc pas le tirage des anecdotes. Elle observe seulement l'anecdote finalement affichee.

## Stockage local

Nouvelle cle :

```text
geodoku-france-collections-v1
```

Donnees stockees par decouverte :

- `theme`
- `themeLabel`
- `anecdoteId`
- `codeDepartement`
- `rarete`
- `discoveredAt`

Garanties :

- une meme anecdote n'est pas dupliquee ;
- les anciennes cles localStorage restent inchangees ;
- aucune donnee de statistiques Phase 03 n'est ecrasee ;
- aucune donnee de decouverte Phase 04 n'est ecrasee ;
- aucun historique de themes Phase 05 n'est ecrase.

## Interface ajoutee

### Fiche departement

Une pastille de collection est affichee sous la rarete lorsqu'une anecdote editoriale possede un theme :

```text
Collection : Resistance Ain
```

### Cartes de resultat

La meme pastille est affichee dans les cartes de resultat, pres de l'anecdote.

### Ecran statistiques

Nouvelle section :

```text
Collections decouvertes
```

Elle affiche :

- nombre de collections decouvertes ;
- nombre d'anecdotes a theme decouvertes ;
- derniere collection decouverte ;
- top 3 des collections les plus avancees.

## Donnees disponibles

| Indicateur | Valeur |
| --- | ---: |
| Anecdotes editoriales totales | 3311 |
| Anecdotes validees | 2840 |
| Anecdotes validees avec theme | 2615 |
| Themes distincts disponibles | 2513 |
| Anecdotes dans le JSON public | 2840 |
| Codes couverts dans le JSON public | 107 |
| Anecdotes non validees dans le JSON public | 0 |

## Verifications effectuees

| Verification | Resultat |
| --- | --- |
| Creation de `collectionsService.js` | OK |
| Cle dediee `geodoku-france-collections-v1` | OK |
| Enregistrement d'une anecdote avec theme | OK |
| Deduplication d'une meme anecdote | OK |
| Calcul du nombre de themes decouverts | OK |
| Calcul du top 3 des collections | OK |
| Affichage fiche departement | OK |
| Affichage cartes de resultat | OK |
| Section statistiques | OK |
| Anecdotes validees uniquement dans le service public | OK |
| JSON public sans anecdote non validee | OK |
| Statistiques Phase 03 independantes | OK |
| Decouvertes rares Phase 04 independantes | OK |
| Anti-redondance theme Phase 05 conservee | OK |
| `npm.cmd run build` | OK |

Test localStorage isole :

```json
{
  "storageKey": "geodoku-france-collections-v1",
  "firstRecorded": true,
  "secondRecorded": false,
  "draftRecorded": false,
  "totalThemes": 1,
  "totalThemedAnecdotes": 1
}
```

Verification du filtre public :

```json
{
  "editorialTotal": 3311,
  "validated": 2840,
  "publicTotal": 2840,
  "publicCodes": 107,
  "publicNonValidated": 0
}
```

## Impact gameplay

- Scoring inchange.
- Regles inchangees.
- Grilles inchangees.
- Selection des departements inchangee.
- Validation de grille inchangee.
- Partage inchange.
- Fallback `dep.anecdote` conserve.

## Limites MVP

- Les themes restent tres nombreux et souvent tres precis.
- Il n'y a pas encore de regroupement par familles de collection.
- Les collections restent locales au navigateur.
- Les badges complexes ne sont pas encore crees.

## Recommandation

Conserver ce MVP tel quel pour observer l'effet produit.

La prochaine amelioration utile serait de creer une couche de "familles de collections" au-dessus des themes bruts, afin d'afficher des collections plus lisibles :

- Resistance ;
- Phares ;
- Volcans ;
- Gastronomie locale ;
- Patrimoine industriel ;
- Littoraux ;
- Montagnes ;
- Outre-mer.

Cela permettrait de garder la finesse editoriale du champ `theme`, tout en offrant au joueur une progression plus claire.
