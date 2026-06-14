# Rapport dataset public anecdotes validees

Date : 2026-06-14

## Resume

Un dataset public global reste genere dans `public/data/anecdotes-valides.json`.

Des fichiers par departement sont aussi generes dans `public/data/anecdotes/{code}.json` pour permettre un chargement differe au strict besoin des resultats et fiches.

## Resultat de generation

| Indicateur | Valeur |
| --- | ---: |
| Anecdotes exportees | 2840 |
| Departements couverts | 107 |
| Anecdotes exclues `a verifier` | 471 |
| Brouillons exclus | 0 |
| Rejetees exclues | 0 |
| Poids JSON global brut | 1 825 104 o (1782.33 KiB) |
| Poids JSON global gzip estime | 312 336 o (305.02 KiB) |
| Fichiers par departement | 107 |
| Poids total fichiers departement | 1 750 073 o (1709.06 KiB) |
| Poids gzip cumule fichiers departement | 400 445 o (391.06 KiB) |
| Poids resume collections | 2 641 o (2.58 KiB) |
| Poids gzip resume collections | 721 o (0.70 KiB) |

## Champs conserves

- `id`
- `code_departement`
- `titre`
- `contenu`
- `categorie`
- `difficulte`
- `rarete`
- `ton`
- `contexte`
- `theme`
- `statut_validation`

## Champs exclus

- `source`
- `date_ajout`
- `date_modification`
- `validee`

## Couverture par departement

| Departement | Anecdotes exportees |
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

## Comparaison avec l'etat bundle actuel

| Element | Brut | Gzip estime |
| --- | ---: | ---: |
| Bundle JS actuel | 1 743 807 o (1702.94 KiB) | 356 345 o (347.99 KiB) |
| Batchs editoriaux source | 1 995 756 o (1948.98 KiB) | 363 693 o (355.17 KiB) |
| Dataset public valide global | 1 825 104 o (1782.33 KiB) | 312 336 o (305.02 KiB) |
| Fichiers publics par departement | 1 750 073 o (1709.06 KiB) | 400 445 o (391.06 KiB) |
| Resume collections public | 2 641 o (2.58 KiB) | 721 o (0.70 KiB) |

## Plus gros fichiers par departement

| Departement | Anecdotes | Brut | Gzip estime |
| --- | ---: | ---: | ---: |
| 03 | 31 | 19 936 o (19.47 KiB) | 4 971 o (4.85 KiB) |
| 08 | 31 | 19 863 o (19.40 KiB) | 4 841 o (4.73 KiB) |
| 07 | 31 | 19 853 o (19.39 KiB) | 4 926 o (4.81 KiB) |
| 66 | 31 | 19 720 o (19.26 KiB) | 4 492 o (4.39 KiB) |
| 49 | 31 | 19 616 o (19.16 KiB) | 3 652 o (3.57 KiB) |
| 28 | 31 | 19 597 o (19.14 KiB) | 3 894 o (3.80 KiB) |
| 10 | 31 | 19 588 o (19.13 KiB) | 4 759 o (4.65 KiB) |
| 35 | 31 | 19 581 o (19.12 KiB) | 3 882 o (3.79 KiB) |
| 55 | 31 | 19 558 o (19.10 KiB) | 3 553 o (3.47 KiB) |
| 38 | 31 | 19 548 o (19.09 KiB) | 3 786 o (3.70 KiB) |

## Strategie recommandee

1. Charger `public/data/anecdotes/{code}.json` uniquement pour les departements affiches en resultat ou fiche.
2. Garder `public/data/anecdotes-valides.json` comme artefact global de controle et d'audit.
3. Utiliser `public/data/anecdotes-collections-summary.json` pour les totaux de collections sans charger tous les contenus.
4. Garder le fallback `dep.anecdote` pendant le chargement ou en cas d'erreur reseau.
5. Si un departement devient trop lourd, fractionner ensuite par contexte ou rarete.
