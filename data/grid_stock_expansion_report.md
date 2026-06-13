# Rapport de consolidation du calendrier des grilles

Date : 2026-06-13

## Synthese

- Grilles historiques conservees : 33 (`#001` a `#033`).
- Grilles ajoutees par generation deterministe : 332 (`#034` a `#365`).
- Total disponible : 365 grilles.
- Couverture quotidienne : 365 jours.
- Premiere grille : `#001`, le 2026-06-13.
- Derniere grille disponible : `#365`, le 2027-06-12.
- Date theorique d'epuisement : 2027-06-13.

## Nettoyage historique

L'audit precedent signalait 8 doublons exacts de croisements ligne/colonne herites des 33 premieres grilles. Ils ont ete corriges sans changer les IDs ni l'ordre chronologique :

- `#001` / `#002`
- `#004` / `#011`
- `#024` / `#033`
- `#025` / `#029`
- `#026` / `#030` : 2 croisements
- `#028` / `#033` : 2 croisements

Correction appliquee : ajustement limite de quelques tags de criteres historiques concernes. Le moteur de jeu, le scoring, les departements, les anecdotes, les medias et les collections restent inchanges.

## Qualite globale

Audit execute avec `node scripts/auditGridStock.js`.

- Cellules injouables : 0.
- Cellules faibles avec moins de 3 departements candidats : 0.
- Departements totalement absents : 0.
- Doublons exacts de croisements : 0.
- Doublons exacts de grilles completes : 0.
- Repetitions fortes sur jours consecutifs : 0.
- Domination maximale d'un departement comme meilleur candidat : Indre, 459 cellules sur 3285, soit 13,97 %. Seuil de controle : 15 %.

## Repartition des categories

Nombre de grilles ou la categorie apparait au moins une fois :

| Categorie | Grilles |
|---|---:|
| geographie | 290 |
| histoire | 234 |
| patrimoine | 257 |
| culture | 125 |
| gastronomie | 110 |
| demographie | 105 |
| economie | 136 |
| nature | 153 |
| tourisme | 91 |
| insolite | 123 |

## Top 20 des departements les plus presents

Presence mesuree en nombre de cellules ou le departement est candidat direct.

| Rang | Departement | Code | Cellules candidates |
|---:|---|---:|---:|
| 1 | Gironde | 33 | 2434 |
| 2 | Var | 83 | 2380 |
| 3 | Isere | 38 | 2373 |
| 4 | Martinique | 972 | 2293 |
| 5 | Guyane | 973 | 2285 |
| 6 | Herault | 34 | 2277 |
| 7 | Correze | 19 | 2233 |
| 8 | Charente-Maritime | 17 | 2211 |
| 9 | Doubs | 25 | 2192 |
| 10 | Drome | 26 | 2185 |
| 11 | Tarn | 81 | 2163 |
| 12 | Haute-Saone | 70 | 2144 |
| 13 | Landes | 40 | 2099 |
| 14 | Mayotte | 976 | 2099 |
| 15 | Ain | 01 | 2096 |
| 16 | Haute-Garonne | 31 | 2092 |
| 17 | Haute-Savoie | 74 | 2091 |
| 18 | Vendee | 85 | 2081 |
| 19 | Hautes-Alpes | 05 | 2045 |
| 20 | Savoie | 73 | 2045 |

## Top 20 des departements les moins presents

| Rang | Departement | Code | Cellules candidates |
|---:|---|---:|---:|
| 1 | Paris | 75 | 808 |
| 2 | Loire-Atlantique | 44 | 823 |
| 3 | Pas-de-Calais | 62 | 915 |
| 4 | Aude | 11 | 975 |
| 5 | Finistere | 29 | 990 |
| 6 | Moselle | 57 | 1010 |
| 7 | Bouches-du-Rhone | 13 | 1026 |
| 8 | Lozere | 48 | 1030 |
| 9 | Puy-de-Dome | 63 | 1077 |
| 10 | Alpes-Maritimes | 06 | 1121 |
| 11 | Creuse | 23 | 1143 |
| 12 | Territoire de Belfort | 90 | 1158 |
| 13 | Nord | 59 | 1183 |
| 14 | Manche | 50 | 1232 |
| 15 | Seine-Saint-Denis | 93 | 1251 |
| 16 | Hauts-de-Seine | 92 | 1253 |
| 17 | Cantal | 15 | 1261 |
| 18 | Bas-Rhin | 67 | 1267 |
| 19 | Alpes-de-Haute-Provence | 04 | 1291 |
| 20 | Meurthe-et-Moselle | 54 | 1296 |

## Top 20 des meilleurs candidats automatiques

Cette mesure sert uniquement a detecter une domination excessive des solutions optimales.

| Rang | Departement | Code | Cellules optimales |
|---:|---|---:|---:|
| 1 | Indre | 36 | 459 |
| 2 | Guyane | 973 | 313 |
| 3 | Ariege | 09 | 220 |
| 4 | Essonne | 91 | 204 |
| 5 | Territoire de Belfort | 90 | 188 |
| 6 | Creuse | 23 | 135 |
| 7 | Haute-Loire | 43 | 119 |
| 8 | Cantal | 15 | 107 |
| 9 | Cotes-d'Armor | 22 | 101 |
| 10 | Mayotte | 976 | 72 |
| 11 | Charente-Maritime | 17 | 70 |
| 12 | Correze | 19 | 65 |
| 13 | Meuse | 55 | 59 |
| 14 | Alpes-de-Haute-Provence | 04 | 57 |
| 15 | Loire | 42 | 55 |
| 16 | Lot | 46 | 53 |
| 17 | Corse-du-Sud | 2A | 52 |
| 18 | Val-de-Marne | 94 | 50 |
| 19 | Seine-Maritime | 76 | 47 |
| 20 | Ardennes | 08 | 42 |

## Controle du calendrier quotidien

| Jour | Date | Grille du jour | Archives | Futures | Etat |
|---:|---|---:|---:|---:|---|
| 1 | 2026-06-13 | #001 | 0 | 364 | actif |
| 90 | 2026-09-10 | #090 | 89 | 275 | actif |
| 180 | 2026-12-09 | #180 | 179 | 185 | actif |
| 365 | 2027-06-12 | #365 | 364 | 0 | actif |
| 366 | 2027-06-13 | aucune | 365 | 0 | stock epuise |

Les grilles futures restent inaccessibles via le calendrier : seules `todayGrid` et `pastGrids` sont exposees a l'interface, et `startGrid` refuse une grille absente de `unlockedGrids`.
