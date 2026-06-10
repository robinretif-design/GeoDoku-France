# Rapport dataset public anecdotes validées

Date : 2026-06-04

## Résumé

Un dataset public allégé a été généré dans `public/data/anecdotes-valides.json`.

Ce fichier prépare une future bascule vers un chargement différé, sans modifier le comportement actuel de l'application. `main.jsx` continue d'utiliser l'import existant pour le MVP.

## Résultat de génération

| Indicateur | Valeur |
| --- | ---: |
| Anecdotes exportées | 2840 |
| Départements couverts | 107 |
| Anecdotes exclues `à vérifier` | 471 |
| Brouillons exclus | 0 |
| Rejetées exclues | 0 |
| Poids JSON brut | 1 557 809 o (1521.30 KiB) |
| Poids gzip estimé | 299 898 o (292.87 KiB) |

## Champs conservés

- `id`
- `titre`
- `contenu`
- `categorie`
- `rarete`
- `ton`
- `contexte`
- `theme`

## Champs exclus

- `code_departement`
- `source`
- `statut_validation`
- `date_ajout`
- `date_modification`
- `difficulte`
- `validee`

Les sources ne sont pas incluses parce qu'elles ne sont pas nécessaires à l'affichage public actuel. Les statuts ne sont pas inclus parce que ce dataset public ne contient déjà que des anecdotes validées.

## Structure du JSON

```json
{
  "45": [
    {
      "id": "...",
      "titre": "...",
      "contenu": "...",
      "categorie": "...",
      "rarete": "...",
      "ton": "...",
      "contexte": "...",
      "theme": "..."
    }
  ]
}
```

## Couverture par département

| Département | Anecdotes exportées |
| --- | ---: |
| 01 | 3 |
| 02 | 2 |
| 03 | 31 |
| 04 | 1 |
| 05 | 2 |
| 06 | 2 |
| 07 | 31 |
| 08 | 31 |
| 09 | 1 |
| 10 | 31 |
| 11 | 1 |
| 12 | 31 |
| 13 | 2 |
| 14 | 31 |
| 15 | 31 |
| 16 | 31 |
| 17 | 31 |
| 18 | 31 |
| 19 | 31 |
| 21 | 31 |
| 22 | 31 |
| 23 | 31 |
| 24 | 31 |
| 25 | 31 |
| 26 | 31 |
| 27 | 31 |
| 28 | 31 |
| 29 | 31 |
| 2A | 31 |
| 2B | 31 |
| 30 | 31 |
| 31 | 31 |
| 32 | 31 |
| 33 | 1 |
| 34 | 2 |
| 35 | 31 |
| 36 | 31 |
| 37 | 31 |
| 38 | 31 |
| 39 | 31 |
| 40 | 31 |
| 41 | 31 |
| 42 | 31 |
| 43 | 31 |
| 44 | 1 |
| 45 | 1 |
| 46 | 31 |
| 47 | 31 |
| 48 | 31 |
| 49 | 31 |
| 50 | 31 |
| 51 | 31 |
| 52 | 31 |
| 53 | 31 |
| 54 | 31 |
| 55 | 31 |
| 56 | 31 |
| 57 | 31 |
| 58 | 31 |
| 59 | 2 |
| 60 | 31 |
| 61 | 31 |
| 62 | 31 |
| 63 | 31 |
| 64 | 31 |
| 65 | 31 |
| 66 | 31 |
| 67 | 31 |
| 68 | 31 |
| 69 | 1 |
| 70 | 31 |
| 71 | 31 |
| 72 | 31 |
| 73 | 31 |
| 74 | 31 |
| 75 | 1 |
| 76 | 31 |
| 77 | 2 |
| 78 | 31 |
| 79 | 31 |
| 80 | 31 |
| 81 | 31 |
| 82 | 31 |
| 83 | 31 |
| 84 | 31 |
| 85 | 31 |
| 86 | 31 |
| 87 | 31 |
| 88 | 31 |
| 89 | 31 |
| 90 | 31 |
| 91 | 31 |
| 92 | 31 |
| 93 | 31 |
| 94 | 31 |
| 95 | 31 |
| 971 | 31 |
| 972 | 31 |
| 973 | 31 |
| 974 | 31 |
| 975 | 30 |
| 976 | 31 |
| 977 | 30 |
| 978 | 30 |
| 986 | 30 |
| 987 | 30 |
| 988 | 30 |

## Comparaison avec l'état bundle actuel

| Élément | Brut | Gzip estimé |
| --- | ---: | ---: |
| Bundle JS actuel | 2 043 221 o (1995.33 KiB) | 444 191 o (433.78 KiB) |
| Batchs éditoriaux source | 1 995 756 o (1948.98 KiB) | 363 693 o (355.17 KiB) |
| Dataset public validé | 1 557 809 o (1521.30 KiB) | 299 898 o (292.87 KiB) |

Lecture : le dataset public validé est plus léger que les batchs source complets car il exclut les anecdotes non validées et les champs internes. Il ne réduit toutefois pas encore le bundle tant que `main.jsx` importe le moteur actuel, qui agrège les batchs JS.

## Recommandation future

Stratégie recommandée pour une bascule ultérieure :

1. Conserver `public/data/anecdotes-valides.json` comme artefact public généré.
2. Remplacer progressivement l'import statique par un chargement différé depuis ce JSON.
3. Ajouter un petit index par département si le fichier global devient trop gros.
4. Garder le fallback `dep.anecdote` pendant le chargement ou en cas d'erreur réseau.
5. À terme, générer soit un JSON global validé, soit un fichier par département selon la taille atteinte.

Pour le MVP, aucune bascule n'est effectuée : ce dataset prépare l'optimisation sans modifier le gameplay.
