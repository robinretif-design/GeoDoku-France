# Audit fonctionnel du système d'anecdotes

Date d'audit : 2026-06-04

## Conclusion courte

GeoDoku dispose maintenant d'une base éditoriale solide sur le plan quantitatif : 1700 anecdotes validées sur 2171 anecdotes éditoriales, couvrant les 101 départements avec au moins une anecdote validée chacun.

Le point bloquant n'est pas la donnée ni le service : c'est l'intégration produit. L'écran de résultat et la fiche département affichent encore l'anecdote courte de `gameData.js` via `dep.anecdote`. Les fonctions de sélection éditoriale existent dans `src/services/anecdotesService.js`, mais elles ne sont pas encore utilisées par `main.jsx`.

## 1. Répartition réelle des anecdotes validées

| Indicateur | Valeur |
| --- | --- |
| Anecdotes éditoriales totales | 2171 |
| Anecdotes validées | 1700 |
| Anecdotes à vérifier | 471 |
| Départements suivis | 101 |
| Départements avec au moins 1 anecdote validée | 101 |
| Départements avec au moins 20 anecdotes validées | 53 |
| Départements sous 20 anecdotes validées | 48 |
| Moyenne validée sur tous les départements | 16.83 |
| Moyenne validée sur départements ayant au moins 1 validée | 16.83 |

Lecture : la couverture est très polarisée. 53 départements ont une vraie profondeur exploitable, généralement 31 anecdotes validées. Les 48 autres reposent encore surtout sur l'anecdote legacy issue de `gameData.js` ou sur quelques anecdotes validées manuellement.

### Répartition par catégorie

| Catégorie | Anecdotes validées |
| --- | --- |
| cinéma | 43 |
| culture | 266 |
| gastronomie | 267 |
| géographie | 265 |
| histoire | 537 |
| insolite | 265 |
| nature | 6 |
| patrimoine | 51 |

### Répartition par rareté

| Rareté | Anecdotes validées |
| --- | --- |
| commune | 1486 |
| légendaire | 2 |
| peu commune | 179 |
| rare | 27 |
| très rare | 6 |

### Répartition par contexte

| Contexte | Anecdotes validées |
| --- | --- |
| découverte | 1700 |

### Répartition par ton

| Ton | Anecdotes validées |
| --- | --- |
| amusant | 6 |
| neutre | 992 |
| pédagogique | 360 |
| poétique | 148 |
| surprenant | 194 |

### Répartition par département

| Code | Département | Total éditorial | Validées | À vérifier | Thèmes distincts validés | Rares ou plus |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | Ain | 31 | 3 | 28 | 1 | 2 |
| 02 | Aisne | 31 | 2 | 29 | 1 | 1 |
| 03 | Allier | 31 | 31 | 0 | 1 | 2 |
| 04 | Alpes-de-Haute-Provence | 31 | 1 | 30 | 0 | 0 |
| 05 | Hautes-Alpes | 31 | 2 | 29 | 1 | 1 |
| 06 | Alpes-Maritimes | 31 | 2 | 29 | 0 | 1 |
| 07 | Ardèche | 31 | 31 | 0 | 0 | 0 |
| 08 | Ardennes | 31 | 31 | 0 | 0 | 1 |
| 09 | Ariège | 31 | 1 | 30 | 0 | 1 |
| 10 | Aube | 31 | 31 | 0 | 0 | 0 |
| 11 | Aude | 31 | 1 | 30 | 0 | 0 |
| 12 | Aveyron | 31 | 31 | 0 | 24 | 0 |
| 13 | Bouches-du-Rhône | 31 | 2 | 29 | 0 | 1 |
| 14 | Calvados | 31 | 31 | 0 | 25 | 0 |
| 15 | Cantal | 31 | 31 | 0 | 23 | 1 |
| 16 | Charente | 31 | 31 | 0 | 18 | 0 |
| 17 | Charente-Maritime | 31 | 31 | 0 | 26 | 0 |
| 18 | Cher | 31 | 31 | 0 | 21 | 0 |
| 19 | Corrèze | 31 | 31 | 0 | 22 | 1 |
| 21 | Côte-d'Or | 31 | 31 | 0 | 23 | 0 |
| 22 | Côtes-d’Armor | 31 | 31 | 0 | 23 | 0 |
| 23 | Creuse | 31 | 31 | 0 | 30 | 1 |
| 24 | Dordogne | 31 | 31 | 0 | 30 | 0 |
| 25 | Doubs | 31 | 31 | 0 | 30 | 0 |
| 26 | Drôme | 31 | 31 | 0 | 30 | 0 |
| 27 | Eure | 31 | 31 | 0 | 30 | 0 |
| 28 | Eure-et-Loir | 31 | 31 | 0 | 30 | 0 |
| 29 | Finistère | 31 | 31 | 0 | 30 | 0 |
| 2A | Corse-du-Sud | 1 | 1 | 0 | 0 | 0 |
| 2B | Haute-Corse | 1 | 1 | 0 | 0 | 0 |
| 30 | Gard | 31 | 31 | 0 | 30 | 0 |
| 31 | Haute-Garonne | 31 | 31 | 0 | 30 | 0 |
| 32 | Gers | 31 | 31 | 0 | 30 | 1 |
| 33 | Gironde | 31 | 1 | 30 | 0 | 0 |
| 34 | Hérault | 31 | 2 | 29 | 0 | 1 |
| 35 | Ille-et-Vilaine | 31 | 31 | 0 | 30 | 0 |
| 36 | Indre | 31 | 31 | 0 | 30 | 1 |
| 37 | Indre-et-Loire | 31 | 31 | 0 | 30 | 0 |
| 38 | Isère | 31 | 31 | 0 | 30 | 0 |
| 39 | Jura | 31 | 31 | 0 | 30 | 0 |
| 40 | Landes | 31 | 31 | 0 | 30 | 0 |
| 41 | Loir-et-Cher | 31 | 31 | 0 | 30 | 0 |
| 42 | Loire | 31 | 31 | 0 | 30 | 0 |
| 43 | Haute-Loire | 31 | 31 | 0 | 30 | 1 |
| 44 | Loire-Atlantique | 31 | 1 | 30 | 0 | 0 |
| 45 | Loiret | 31 | 1 | 30 | 0 | 0 |
| 46 | Lot | 31 | 31 | 0 | 30 | 0 |
| 47 | Lot-et-Garonne | 31 | 31 | 0 | 30 | 1 |
| 48 | Lozère | 31 | 31 | 0 | 30 | 1 |
| 49 | Maine-et-Loire | 31 | 31 | 0 | 30 | 0 |
| 50 | Manche | 31 | 31 | 0 | 30 | 0 |
| 51 | Marne | 31 | 31 | 0 | 30 | 0 |
| 52 | Haute-Marne | 31 | 31 | 0 | 30 | 1 |
| 53 | Mayenne | 31 | 31 | 0 | 30 | 1 |
| 54 | Meurthe-et-Moselle | 31 | 31 | 0 | 30 | 0 |
| 55 | Meuse | 31 | 31 | 0 | 30 | 1 |
| 56 | Morbihan | 31 | 31 | 0 | 30 | 0 |
| 57 | Moselle | 31 | 31 | 0 | 30 | 0 |
| 58 | Nièvre | 31 | 31 | 0 | 30 | 1 |
| 59 | Nord | 31 | 2 | 29 | 0 | 1 |
| 60 | Oise | 31 | 31 | 0 | 30 | 0 |
| 61 | Orne | 31 | 31 | 0 | 30 | 1 |
| 62 | Pas-de-Calais | 31 | 31 | 0 | 30 | 0 |
| 63 | Puy-de-Dôme | 31 | 31 | 0 | 30 | 0 |
| 64 | Pyrénées-Atlantiques | 31 | 31 | 0 | 30 | 0 |
| 65 | Hautes-Pyrénées | 31 | 31 | 0 | 30 | 0 |
| 66 | Pyrénées-Orientales | 31 | 31 | 0 | 30 | 0 |
| 67 | Bas-Rhin | 31 | 31 | 0 | 30 | 0 |
| 68 | Haut-Rhin | 1 | 1 | 0 | 0 | 0 |
| 69 | Rhône | 31 | 1 | 30 | 0 | 0 |
| 70 | Haute-Saône | 1 | 1 | 0 | 0 | 1 |
| 71 | Saône-et-Loire | 1 | 1 | 0 | 0 | 0 |
| 72 | Sarthe | 1 | 1 | 0 | 0 | 0 |
| 73 | Savoie | 1 | 1 | 0 | 0 | 0 |
| 74 | Haute-Savoie | 1 | 1 | 0 | 0 | 0 |
| 75 | Paris | 31 | 1 | 30 | 0 | 0 |
| 76 | Seine-Maritime | 1 | 1 | 0 | 0 | 0 |
| 77 | Seine-et-Marne | 31 | 2 | 29 | 0 | 1 |
| 78 | Yvelines | 1 | 1 | 0 | 0 | 0 |
| 79 | Deux-Sèvres | 1 | 1 | 0 | 0 | 1 |
| 80 | Somme | 1 | 1 | 0 | 0 | 0 |
| 81 | Tarn | 1 | 1 | 0 | 0 | 0 |
| 82 | Tarn-et-Garonne | 1 | 1 | 0 | 0 | 1 |
| 83 | Var | 1 | 1 | 0 | 0 | 0 |
| 84 | Vaucluse | 1 | 1 | 0 | 0 | 0 |
| 85 | Vendée | 1 | 1 | 0 | 0 | 0 |
| 86 | Vienne | 1 | 1 | 0 | 0 | 0 |
| 87 | Haute-Vienne | 1 | 1 | 0 | 0 | 1 |
| 88 | Vosges | 1 | 1 | 0 | 0 | 0 |
| 89 | Yonne | 1 | 1 | 0 | 0 | 1 |
| 90 | Territoire de Belfort | 1 | 1 | 0 | 0 | 1 |
| 91 | Essonne | 1 | 1 | 0 | 0 | 1 |
| 92 | Hauts-de-Seine | 1 | 1 | 0 | 0 | 0 |
| 93 | Seine-Saint-Denis | 1 | 1 | 0 | 0 | 0 |
| 94 | Val-de-Marne | 1 | 1 | 0 | 0 | 0 |
| 95 | Val-d’Oise | 1 | 1 | 0 | 0 | 0 |
| 971 | Guadeloupe | 1 | 1 | 0 | 0 | 0 |
| 972 | Martinique | 1 | 1 | 0 | 0 | 0 |
| 973 | Guyane | 1 | 1 | 0 | 0 | 1 |
| 974 | La Réunion | 1 | 1 | 0 | 0 | 0 |
| 976 | Mayotte | 1 | 1 | 0 | 0 | 1 |

## 2. Nombre moyen d'anecdotes disponibles par département validé

La moyenne réelle est de 16.83 anecdotes validées par département, car les 101 départements ont au moins une anecdote validée.

Cette moyenne est trompeuse : elle mélange deux situations très différentes.

| Groupe | Départements | Moyenne validée |
| --- | --- | --- |
| Départements fortement couverts, >= 20 validées | 53 | 31.00 |
| Départements faiblement couverts, < 20 validées | 48 | 1.19 |

## 3. Départements sous les seuils de couverture

Les trois seuils produisent actuellement la même liste : aucun département ne se situe entre 5 et 19 anecdotes validées. Le système est donc divisé entre départements très couverts et départements presque seulement legacy.

### Moins de 5 anecdotes validées (48)

- 04 Alpes-de-Haute-Provence : 1 validée(s), 30 à vérifier, 31 totale(s)
- 09 Ariège : 1 validée(s), 30 à vérifier, 31 totale(s)
- 11 Aude : 1 validée(s), 30 à vérifier, 31 totale(s)
- 2A Corse-du-Sud : 1 validée(s), 0 à vérifier, 1 totale(s)
- 2B Haute-Corse : 1 validée(s), 0 à vérifier, 1 totale(s)
- 33 Gironde : 1 validée(s), 30 à vérifier, 31 totale(s)
- 44 Loire-Atlantique : 1 validée(s), 30 à vérifier, 31 totale(s)
- 45 Loiret : 1 validée(s), 30 à vérifier, 31 totale(s)
- 68 Haut-Rhin : 1 validée(s), 0 à vérifier, 1 totale(s)
- 69 Rhône : 1 validée(s), 30 à vérifier, 31 totale(s)
- 70 Haute-Saône : 1 validée(s), 0 à vérifier, 1 totale(s)
- 71 Saône-et-Loire : 1 validée(s), 0 à vérifier, 1 totale(s)
- 72 Sarthe : 1 validée(s), 0 à vérifier, 1 totale(s)
- 73 Savoie : 1 validée(s), 0 à vérifier, 1 totale(s)
- 74 Haute-Savoie : 1 validée(s), 0 à vérifier, 1 totale(s)
- 75 Paris : 1 validée(s), 30 à vérifier, 31 totale(s)
- 76 Seine-Maritime : 1 validée(s), 0 à vérifier, 1 totale(s)
- 78 Yvelines : 1 validée(s), 0 à vérifier, 1 totale(s)
- 79 Deux-Sèvres : 1 validée(s), 0 à vérifier, 1 totale(s)
- 80 Somme : 1 validée(s), 0 à vérifier, 1 totale(s)
- 81 Tarn : 1 validée(s), 0 à vérifier, 1 totale(s)
- 82 Tarn-et-Garonne : 1 validée(s), 0 à vérifier, 1 totale(s)
- 83 Var : 1 validée(s), 0 à vérifier, 1 totale(s)
- 84 Vaucluse : 1 validée(s), 0 à vérifier, 1 totale(s)
- 85 Vendée : 1 validée(s), 0 à vérifier, 1 totale(s)
- 86 Vienne : 1 validée(s), 0 à vérifier, 1 totale(s)
- 87 Haute-Vienne : 1 validée(s), 0 à vérifier, 1 totale(s)
- 88 Vosges : 1 validée(s), 0 à vérifier, 1 totale(s)
- 89 Yonne : 1 validée(s), 0 à vérifier, 1 totale(s)
- 90 Territoire de Belfort : 1 validée(s), 0 à vérifier, 1 totale(s)
- 91 Essonne : 1 validée(s), 0 à vérifier, 1 totale(s)
- 92 Hauts-de-Seine : 1 validée(s), 0 à vérifier, 1 totale(s)
- 93 Seine-Saint-Denis : 1 validée(s), 0 à vérifier, 1 totale(s)
- 94 Val-de-Marne : 1 validée(s), 0 à vérifier, 1 totale(s)
- 95 Val-d’Oise : 1 validée(s), 0 à vérifier, 1 totale(s)
- 971 Guadeloupe : 1 validée(s), 0 à vérifier, 1 totale(s)
- 972 Martinique : 1 validée(s), 0 à vérifier, 1 totale(s)
- 973 Guyane : 1 validée(s), 0 à vérifier, 1 totale(s)
- 974 La Réunion : 1 validée(s), 0 à vérifier, 1 totale(s)
- 976 Mayotte : 1 validée(s), 0 à vérifier, 1 totale(s)
- 02 Aisne : 2 validée(s), 29 à vérifier, 31 totale(s)
- 05 Hautes-Alpes : 2 validée(s), 29 à vérifier, 31 totale(s)
- 06 Alpes-Maritimes : 2 validée(s), 29 à vérifier, 31 totale(s)
- 13 Bouches-du-Rhône : 2 validée(s), 29 à vérifier, 31 totale(s)
- 34 Hérault : 2 validée(s), 29 à vérifier, 31 totale(s)
- 59 Nord : 2 validée(s), 29 à vérifier, 31 totale(s)
- 77 Seine-et-Marne : 2 validée(s), 29 à vérifier, 31 totale(s)
- 01 Ain : 3 validée(s), 28 à vérifier, 31 totale(s)

### Moins de 10 anecdotes validées (48)

Même liste que le seuil < 5.

### Moins de 20 anecdotes validées (48)

Même liste que le seuil < 5.

## 4. Comportement actuel du moteur de sélection

| Point audité | État actuel |
| --- | --- |
| Tirage réellement aléatoire | Oui pour `getRandomValidatedAnecdoteForDepartment` : sélection uniforme via `Math.random` dans les candidates filtrées. Exemple déterministe testé sur Moselle : `57-seed-0029`. |
| Pondération | Non. Aucun poids par rareté, difficulté, ton, thème ou fraîcheur. |
| Répétitions possibles | Oui avec la fonction aléatoire simple. Une fonction anti-répétition existe : `getNeverSeenAnecdoteForDepartment`, avec stockage local des ids vus et fallback quand tout est épuisé. Exemple testé : `57-seed-0029`. |
| Prise en compte de `theme` | Non dans le moteur. Le champ existe dans les données et l'import CSV, mais aucun filtre ni anti-redondance thématique n'est implémenté. |
| Prise en compte du contexte | Oui dans le service via `getContextualAnecdote`, mais les données validées sont toutes en contexte `découverte`. Une demande `bonne_reponse` retombe donc sur le fallback général. Exemple testé : `57-seed-0029`. |
| Prise en compte de la rareté | Oui partiellement. `getAnecdotesForDepartment` sait filtrer par `rarete`; `getRareAnecdote` choisit la rareté la plus élevée, puis la difficulté, puis l'id. Ce n'est pas un tirage aléatoire pondéré. Exemple testé : `90-seed-0013`. |
| Prise en compte du ton | Oui comme filtre générique dans `getAnecdotesForDepartment`, mais pas utilisé par l'interface. |
| Statistiques locales | Présentes : affichages, lectures, appréciation. Non branchées dans l'interface publique. |
| Historique joueur | Présent via `geodoku-france-anecdotes-seen`, mais seulement exploité si l'interface appelle les fonctions smart/contextuelles. |

## 5. Fonctionnalités présentes mais non exploitées

| Fonctionnalité | Présente dans les données/services | Exploitée dans le gameplay actuel | Commentaire |
| --- | --- | --- | --- |
| `theme` | Oui : 1475 anecdotes validées ont un thème, 1391 thèmes distincts | Non | Base idéale pour éviter deux anecdotes proches sur un même département. |
| `rarete` | Oui : 35 anecdotes validées sont rare/très rare/légendaire | Non dans l'UI | Potentiel immédiat pour créer un effet de surprise. |
| `contexte` | Oui structurellement | Faible | Les 1700 anecdotes validées sont toutes en `découverte`, donc pas encore de vraie contextualisation bonne/mauvaise réponse. |
| `ton` | Oui : neutre, pédagogique, poétique, surprenant, amusant | Non | Peut orienter le ressenti de fin de partie. |
| Statistiques | Oui dans `anecdotesService.js` | Non | Affichages, lectures et feedback ne sont pas déclenchés par l'interface actuelle. |
| Historique joueur | Oui via localStorage | Non branché dans `main.jsx` | L'anti-répétition existe mais n'est pas encore visible pour le joueur. |

### Top thèmes validés

| Thème | Anecdotes validées |
| --- | --- |
| aubrac | 4 |
| bd-angouleme | 4 |
| climats-bourgogne | 4 |
| cognac | 4 |
| millevaches | 4 |
| salers | 4 |
| sancerre | 4 |
| bayeux-tapisserie | 3 |
| charente-fleuve | 3 |
| alpes-mancelles | 2 |
| angouleme | 2 |
| ardoise-travassac | 2 |
| arromanches | 2 |
| aubazine | 2 |
| aubeterre | 2 |
| baie-saint-brieuc | 2 |
| bourges-cathedrale | 2 |
| brehat | 2 |
| brive | 2 |
| brouage | 2 |

## 6. Gains de gameplay à faible coût

### Anecdotes rares

Gain fort, coût faible. Après validation, afficher prioritairement une anecdote `rare`, `très rare` ou `légendaire` quand elle existe pour le département, puis retomber sur une anecdote standard. Cela créerait un sentiment de découverte sans modifier le scoring.

### Anecdotes contextuelles

Gain fort, coût moyen. Le service est prêt, mais les données ne le sont pas encore : il faut requalifier une partie du stock en `bonne_reponse`, `mauvaise_reponse`, `anecdote_rare`, `défi` ou `statistique`. À court terme, on peut déduire un contexte simple depuis le score de case.

### Anti-répétition

Gain très fort, coût faible. Remplacer l'appel futur à une anecdote aléatoire par `getNeverSeenAnecdoteForDepartment` suffit à éviter de revoir toujours la même anecdote sur les départements très couverts.

### Statistiques communautaires

Gain produit intéressant, coût plus élevé. Les statistiques locales existent, mais les statistiques communautaires nécessiteraient un backend ou une analytics agrégée dédiée. À court terme, rester local.

### Chaînes thématiques

Gain différenciant, coût moyen. Le champ `theme` peut alimenter des suites du type "Voir une autre anecdote sur Michelin", "Explorer les fortifications", "Autour du volcanisme". Le contenu existe déjà assez largement pour les départements validés.

## 7. Feuille de route

### Quick wins (<1 jour)

1. Brancher la fiche département sur `getNeverSeenAnecdoteForDepartment(dep.code)` au lieu de `dep.anecdote`, avec fallback vers `dep.anecdote`.
2. Enregistrer l'affichage via `recordAnecdoteDisplay` et la lecture via `recordAnecdoteRead` si la fiche est ouverte.
3. Afficher une variante "Anecdote rare" quand `getRareAnecdote(dep.code)` retourne un résultat.
4. Ajouter un petit libellé discret de catégorie : histoire, géographie, gastronomie, culture ou insolite.
5. Ne pas appeler le système éditorial sur les départements avec une seule anecdote validée si l'expérience paraît trop répétitive ; garder le fallback legacy.

### Moyen terme

1. Requalifier progressivement les 471 anecdotes encore `à vérifier`, surtout les départements déjà produits mais non validés.
2. Ajouter une règle anti-redondance par `theme` : ne pas montrer deux anecdotes du même thème dans une même session ou sur deux ouvertures successives.
3. Dériver le contexte depuis le jeu : bon score -> `bonne_reponse`, score faible -> `mauvaise_reponse`, coup de maître -> `anecdote_rare`.
4. Créer une sélection pondérée simple : favoriser les anecdotes peu vues localement, puis les rares, puis varier les catégories.
5. Ajouter un panneau debug éditorial local : département, candidates, exclues par historique, anecdote sélectionnée.

### Long terme

1. Construire une vraie taxonomie éditoriale reliant `theme`, tags territoriaux, catégories d'anecdotes et familles de grilles.
2. Créer des parcours thématiques : "France industrielle", "Frontières", "Volcans", "Ports", "Mémoire", "Gastronomie locale".
3. Ajouter une couche de statistiques agrégées respectueuse de la vie privée si le produit en a besoin : taux de lecture, thèmes les plus ouverts, départements les plus consultés.
4. Produire un moteur de recommandation éditoriale local : équilibrer rareté, contexte, nouveauté, département et thème.
5. Mettre en place une console de revue humaine pour modifier statut, thème, contexte et ton sans toucher au code.

## Verdict fonctionnel

GeoDoku est techniquement prêt à exploiter les 1700 anecdotes validées, mais ne le fait pas encore dans l'expérience joueur principale. Le meilleur prochain incrément n'est pas de produire immédiatement plus de contenu : c'est de brancher prudemment le service existant dans la fiche département, avec fallback legacy et anti-répétition local.
