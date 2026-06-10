# Produit Phase 02 - Statistiques communautaires et decouverte

Date : 2026-06-09

Objectif : transformer GeoDoku France d'une base de connaissances territoriale en experience vivante, comparative et communautaire, sans modifier le gameplay existant dans cette phase de conception.

Ce document ne modifie aucun code, aucun contenu editorial et aucun statut.

## 1. Systeme de statistiques communautaires

Les statistiques communautaires doivent repondre a une question simple : "Comment mon intuition territoriale se situe-t-elle par rapport aux autres joueurs ?"

Elles doivent etre visibles apres validation, au moment ou le joueur est le plus receptif : il vient de decouvrir son score, ses erreurs et son coup de maitre.

### Principes de conception

| Principe | Decision |
| --- | --- |
| Donnees personnelles | Aucune donnee personnelle, aucun compte obligatoire. |
| Granularite | Agregation par edition, case, departement choisi et score de case. |
| Affichage | Toujours formuler en tendances communautaires, pas en surveillance individuelle. |
| Temporalite | Conserver une lecture globale et une lecture par edition/jour. |
| Robustesse | Masquer les statistiques quand l'echantillon est trop faible. |
| MVP | Commencer par des donnees locales ou simulees, puis brancher l'agregation reelle. |

### Modele de donnees communautaires

#### Niveau edition

| Champ | Description |
| --- | --- |
| `editionId` | Identifiant de l'edition jouee. |
| `difficulty` | easy, normal ou expert. |
| `startedCount` | Nombre de parties lancees. |
| `completedCount` | Nombre de parties terminees. |
| `averageScore` | Score moyen observe. |
| `medianScore` | Score median, plus stable que la moyenne. |
| `shareRate` | Part des parties terminees qui donnent lieu a un partage. |
| `averageCompletionTime` | Temps moyen avant validation. |

#### Niveau case

| Champ | Description |
| --- | --- |
| `editionId` | Edition concernee. |
| `cellKey` | Identifiant ligne-colonne. |
| `rowId` | Critere de ligne. |
| `colId` | Critere de colonne. |
| `attempts` | Nombre de reponses posees sur cette case. |
| `successRate` | Part des reponses avec score fort, par exemple 7+. |
| `firstTrySuccessRate` | Part des premieres reponses fortes. |
| `averageCellScore` | Score moyen de la case. |
| `mostPlayedDepartments` | Departements les plus tentes. |
| `bestPerformingDepartments` | Departements qui scorent le mieux. |
| `confusedDepartments` | Departements souvent tentes mais peu performants. |

#### Niveau departement

| Champ | Description |
| --- | --- |
| `departmentCode` | Code departement ou territoire. |
| `playedCount` | Nombre total de selections. |
| `successRate` | Taux de selections avec bon score. |
| `firstTrySuccessRate` | Taux de reussite quand joue en premier choix sur une case. |
| `averageScoreWhenPlayed` | Score moyen obtenu quand le departement est choisi. |
| `bestCells` | Cases ou le departement fonctionne le mieux. |
| `worstCells` | Cases ou il est souvent mal employe. |
| `mostConfusedWith` | Departements substituts frequents. |
| `realDifficulty` | Difficulte observee, calculee depuis les scores et la frequence. |
| `trend` | Evolution : en hausse, stable, en baisse, echantillon faible. |

### Taux de reussite par departement

Le taux de reussite ne doit pas signifier "le departement est correct en soi". Il doit mesurer la pertinence de son usage dans les cases ou les joueurs le placent.

Proposition :

```text
successRate = selections_avec_score_7_plus / selections_totales
firstTrySuccessRate = premieres_selections_score_7_plus / premieres_selections_totales
averageScoreWhenPlayed = somme_scores_case / selections_totales
```

Affichages possibles :

- "La Lozere marque 7+ dans 62 % des cas ou elle est jouee."
- "Seulement 4 % des joueurs ont trouve la Lozere du premier coup ici."
- "Paris est tres joue, mais rarement optimal sur cette case."

### Departements les plus confondus

Une confusion utile n'est pas seulement un mauvais choix. C'est un mauvais choix recurrent qui raconte quelque chose.

Exemples :

- Aisne confondue avec Oise ;
- Loire confondue avec Loiret ;
- Savoie confondue avec Haute-Savoie ;
- Bas-Rhin confondu avec Haut-Rhin ;
- Tarn confondu avec Tarn-et-Garonne ;
- Corse-du-Sud confondue avec Haute-Corse.

Modele :

```text
confusion(A, B, cell) =
  B est souvent joue sur une case ou A score mieux
  et B obtient un score faible ou moyen
  et A/B partagent un signal nominal, regional ou thematique
```

Affichages possibles :

- "73 % des joueurs ont tente Loire au lieu de Loiret."
- "Le departement le plus confondu avec l'Aisne est l'Oise."
- "Ici, beaucoup de joueurs pensent au Var, mais le Gard score mieux."

### Evolution dans le temps

L'evolution donne une sensation de jeu vivant.

Metriques utiles :

- score moyen par edition dans les 24 premieres heures ;
- taux de completion par jour ;
- departements qui progressent dans les choix ;
- departements qui deviennent moins confondus ;
- meilleure decouverte de la semaine ;
- edition la plus difficile de la rotation.

Affichages possibles :

- "Depuis hier, cette case est mieux reussie : +8 points de taux de reussite."
- "Cette edition est plus difficile que 71 % des editions precedentes."
- "La Creuse est moins jouee cette semaine, mais reste tres efficace."

### Niveau de difficulte reel observe

Le `difficulty` editorial est une intention. Le niveau de difficulte reel doit venir du comportement joueur.

Proposition d'indice :

```text
realDifficulty =
  10
  - score_moyen_normalise
  + penalite_taux_abandon
  + penalite_temps_validation
  + bonus_dispersion_reponses
```

Lecture :

- une edition difficile a un score moyen bas, des reponses dispersees et beaucoup de confusions ;
- une edition facile a des reponses concentrees, des scores eleves et peu d'abandon ;
- une edition interessante n'est pas seulement difficile : elle produit des arbitrages varies.

## 2. Systeme de decouvertes

La decouverte doit etre le langage emotionnel de GeoDoku. Le joueur ne doit pas seulement savoir s'il a marque des points ; il doit repartir avec une chose apprise.

### Types de decouvertes

| Type | Declencheur | Effet joueur |
| --- | --- | --- |
| Anecdote rare | Anecdote `rare`, `tres rare` ou `legendaire` affichee. | Sentiment d'avoir trouve une pepite. |
| Anecdote legendaire | Rareté `legendaire`, tres faible frequence. | Moment special, partageable. |
| Premiere decouverte | Premier affichage d'un departement ou theme. | Debut de collection. |
| Serie thematique | Plusieurs anecdotes d'un meme `theme` ou famille. | Sens de progression culturelle. |
| Collection completee | Tous les themes ou departements d'un groupe vus. | Objectif long terme. |
| Contre-intuition | Choix minoritaire mais bon score. | Valorise l'audace. |
| Correction elegante | Mauvaise reponse suivie d'une explication contextuelle. | Apprentissage sans frustration. |

### Decouverte rare

Regle MVP :

- si une anecdote rare est affichee, ajouter un libelle discret "Decouverte rare" ;
- si elle est `tres rare`, ajouter "Decouverte tres rare" ;
- si elle est `legendaire`, ajouter "Decouverte legendaire".

Ne pas surcharger l'ecran : le libelle suffit. La rarete doit enrichir, pas gamifier lourdement.

### Series thematiques

Le champ `theme` permet une progression culturelle fine.

Exemples de series :

- Route Napoleon ;
- Canal du Midi ;
- memoire 14-18 ;
- phares ;
- volcans ;
- fromages ;
- architecture brutaliste ;
- Outre-mer institutionnel ;
- vins et paysages ;
- villages fortifies.

Regle produit :

- une serie ne doit apparaitre que si elle contient au moins 3 anecdotes valides ;
- elle peut etre locale au joueur au debut ;
- elle peut devenir communautaire plus tard.

### Premiere decouverte

Evenement local :

```text
si departmentCode jamais vu dans geodoku-france-anecdotes-seen :
  afficher "Premiere decouverte : [departement]"
```

Alternative plus robuste : stocker `geodoku-france-discovered-departments`.

Affichages possibles :

- "Premiere decouverte : Haute-Marne"
- "Nouveau territoire explore : Wallis-et-Futuna"
- "Vous avez decouvert 38 territoires sur 107."

### Collection completee

Collections simples :

- 10 departements de montagne ;
- 10 departements littoraux ;
- 5 territoires ultramarins ;
- 10 anecdotes rares ;
- 20 themes differents ;
- 1 anecdote par categorie principale.

Collections avancees :

- memoire industrielle ;
- patrimoine religieux ;
- culture populaire ;
- France maritime ;
- France volcanique ;
- France des frontieres.

## 3. Exploitation des champs existants

### rarete

Usage actuel : exploitable par `getRareAnecdote`, mais peu visible.

Usage cible :

- marquer visuellement les decouvertes rares ;
- favoriser une anecdote rare pour un coup de maitre ;
- mesurer les anecdotes rares vues par le joueur ;
- creer badges et collections autour de la rarete.

### theme

Usage actuel : donnees largement disponibles, pas encore utilisees dans la selection.

Usage cible :

- anti-redondance dans une meme partie ;
- series thematiques ;
- collection de themes vus ;
- statistiques communautaires par theme ;
- recommandation d'anecdote complementaire.

### ton

Usage actuel : stocke, non pilotant.

Usage cible :

- `surprenant` pour decouverte rare ou resultat inattendu ;
- `pedagogique` pour mauvaise reponse ;
- `poetique` pour fiche departement ;
- `amusant` pour insolite ;
- `piegeux` pour confusions frequentes.

### contexte

Usage actuel : le moteur le prend en charge, mais les anecdotes validees sont toutes en `decouverte`.

Usage cible :

- produire ou reclassifier progressivement des anecdotes `bonne_reponse`, `mauvaise_reponse`, `anecdote_rare`, `statistique` ;
- afficher des messages adaptes au score de case ;
- eviter le ton professoral apres une erreur.

### historique joueur

Usage actuel :

- anecdotes vues stockees localement ;
- stats locales disponibles pour affichages, lectures, appreciations.

Usage cible :

- departements decouverts ;
- themes decouverts ;
- raretes vues ;
- collections ;
- anti-redondance ;
- personnalisation legere sans compte.

## 4. Quick wins et gains produit

### Quick wins - moins de 1 jour

| Action | Impact joueur | Complexite | Dette technique |
| --- | --- | --- | --- |
| Afficher "Decouverte rare" quand une anecdote rare sort. | Fort | Faible | Faible |
| Stocker les departements decouverts localement. | Fort | Faible | Faible |
| Afficher "Premiere decouverte" dans la fiche departement. | Fort | Faible | Faible |
| Eviter deux anecdotes du meme `theme` dans une partie. | Moyen | Faible | Faible |
| Ajouter une statistique locale dans le resultat. | Moyen | Faible | Faible |
| Renommer mentalement les priorites A 35-39 mots en "OK mobile". | Moyen | Tres faible | Reduit la dette percue |

### Gains forts - moins de 1 semaine

| Action | Impact joueur | Complexite | Dette technique |
| --- | --- | --- | --- |
| Concevoir un schema d'agregation communautaire minimal. | Tres fort | Moyen | Faible si bien limite |
| Ajouter un premier fichier statique de stats communautaires par edition. | Fort | Moyen | Dette acceptable MVP |
| Afficher "choix le plus tente" et "choix rare" sur l'ecran resultat. | Tres fort | Moyen | Depend des donnees |
| Exploiter `ton` selon le contexte de score. | Moyen | Faible | Faible |
| Creer une collection locale de themes vus. | Fort | Moyen | Faible |
| Produire 30 anecdotes contextuelles pilotes. | Fort | Moyen | Dette editoriale controlee |

### Evolutions structurantes - moins de 1 mois

| Action | Impact joueur | Complexite | Dette technique |
| --- | --- | --- | --- |
| Backend d'agregation anonyme. | Tres fort | Moyen a eleve | A cadrer strictement |
| Statistiques communautaires reelles par case et departement. | Tres fort | Moyen | Forte valeur produit |
| Badges locaux puis communautaires. | Fort | Moyen | Faible si local d'abord |
| Collections thematiques persistantes. | Fort | Moyen | Faible a moyen |
| Tableau de bord editorial des confusions. | Fort cote production | Moyen | Aide les futures grilles |
| Chargement differe des anecdotes validees. | Moyen | Moyen | A faire apres validation produit |

## 5. Feuille de route priorisee

| Priorite | Evolution | Impact joueur | Complexite | Dette technique | Decision |
| ---: | --- | --- | --- | --- | --- |
| 1 | Decouverte rare visible. | Fort | Faible | Faible | Premier increment recommande. |
| 2 | Premiere decouverte et departements decouverts. | Fort | Faible | Faible | Renforce la retention. |
| 3 | Anti-redondance par `theme`. | Moyen | Faible | Faible | Exploite un champ deja massif. |
| 4 | Schema stats communautaires. | Tres fort | Moyen | Faible | A specifier avant code backend. |
| 5 | Stats communautaires statiques MVP. | Fort | Moyen | Moyenne | Bon pont avant backend. |
| 6 | Confusions frequentes par case. | Tres fort | Moyen | Moyenne | Coeur de l'experience vivante. |
| 7 | Collections thematiques locales. | Fort | Moyen | Faible | Donne une progression douce. |
| 8 | Backend anonyme d'agregation. | Tres fort | Moyen a eleve | Variable | Apres test MVP. |
| 9 | Chargement differe JSON public. | Moyen | Moyen | Reduit la dette bundle | Pas prioritaire maintenant. |

## 6. Recommandation centrale

La prochaine evolution produit ne doit pas etre "plus de donnees". Elle doit etre "plus de retour vivant".

Sequence recommandee :

1. afficher les decouvertes rares ;
2. suivre localement les departements et themes decouverts ;
3. afficher une premiere statistique communautaire simple apres validation ;
4. formaliser le modele de confusions ;
5. seulement ensuite envisager un backend anonyme ou une optimisation de chargement.

GeoDoku peut devenir distinctif si chaque partie produit trois couches :

- un score ;
- une comparaison avec les autres joueurs ;
- une decouverte territoriale memorable.

La base editoriale existe deja. La phase produit doit maintenant la rendre perceptible.

