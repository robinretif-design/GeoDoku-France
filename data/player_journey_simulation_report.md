# Rapport - Simulation de parcours joueur

Date : 2026-06-10

## Perimetre

Ce rapport simule l'exposition joueur apres l'activation des collections joueur de la Phase 08.

Hypotheses :

- 1 partie terminee = 4 anecdotes visibles sur l'ecran de resultat ;
- la consultation volontaire des fiches departement n'est pas incluse dans le volume de base ;
- les resultats sont des moyennes sur 1 000 simulations ;
- le tirage respecte l'idee d'anti-repetition, mais reste une approximation : le jeu reel depend des departements choisis, des grilles et des fiches ouvertes.

## Stock exposable

| Donnee | Valeur |
|---|---:|
| Anecdotes editoriales totales | 3 311 |
| Anecdotes validees | 2 840 |
| Anecdotes validees pour les 101 departements jouables | 2 660 |
| Anecdotes jouables avec theme enregistrable en collection | 2 435 |
| Anecdotes jouables validees sans theme | 225 |
| JSON public | 2 840 anecdotes |
| Non validees dans le JSON public | 0 |

Les 225 anecdotes jouables sans theme peuvent etre affichees, mais ne declenchent pas de progression de collection.

## Repartition des raretes

### Toutes anecdotes validees

| Rarete | Nombre | Part |
|---|---:|---:|
| commune | 2 326 | 81,9 % |
| peu commune | 449 | 15,8 % |
| rare | 57 | 2,0 % |
| tres rare | 6 | 0,2 % |
| legendaire | 2 | 0,1 % |

### Anecdotes validees jouables

| Rarete | Nombre | Part |
|---|---:|---:|
| commune | 2 198 | 82,6 % |
| peu commune | 401 | 15,1 % |
| rare | 53 | 2,0 % |
| tres rare | 6 | 0,2 % |
| legendaire | 2 | 0,1 % |

Lecture : une anecdote rare ou mieux reste un evenement discret. Sur 1 partie, la probabilite ressentie est faible ; sur 20 parties, elle devient visible.

## Collections

| Indicateur | Valeur |
|---|---:|
| Collections totales | 40 |
| Collections visibles au lancement | 18 |
| Collections masquees jusqu'a decouverte | 22 |
| Collections visibles vides | 0 |

### Collections les plus fournies

| Collection | Visible lancement | Anecdotes validees |
|---|---|---:|
| Histoire locale | oui | 558 |
| Cuisine locale | oui | 324 |
| Musees et arts | oui | 324 |
| Insolite et records | oui | 273 |
| Forets, marais et campagnes | non | 257 |
| Littoraux, iles et ports | oui | 104 |
| Outre-mer | oui | 96 |
| Fleuves et canaux | oui | 83 |
| Montagnes et volcans | oui | 74 |
| Vins, cidres et alcools | non | 51 |
| Villes iconiques | oui | 49 |
| Vallees, gorges et plateaux | non | 47 |

Le systeme est exploitable, mais les grosses collections progressent lentement. Pour eviter une sensation de progression trop lointaine, il faudra probablement ajouter plus tard des paliers intermediaires.

## Simulation par profil

### Nouveau joueur - 1 partie

| Indicateur | Valeur moyenne |
|---|---:|
| Anecdotes vues | 4 |
| Anecdotes rares ou mieux | 0,1 |
| Collections affichees sur cartes | 3,7 |
| Collections decouvertes | 3,3 |
| Collections masquees revelees | 0,9 |
| Progression moyenne des collections decouvertes | 1,8 % |
| Anecdotes sans theme | 0,3 |

Experience probable :

- le joueur voit surtout le lieu, l'anecdote et parfois une collection ;
- la collection peut etre comprise comme un bonus, mais pas encore comme une progression ;
- la rarete est souvent absente ;
- la tendance locale apparait deja, mais semble davantage informative que communautaire.

### Nouveau joueur - 3 parties

| Indicateur | Valeur moyenne |
|---|---:|
| Anecdotes vues | 12 |
| Anecdotes rares ou mieux | 0,3 |
| Collections affichees sur cartes | 11,0 |
| Collections decouvertes | 7,5 |
| Collections masquees revelees | 2,2 |
| Progression moyenne des collections decouvertes | 2,3 % |
| Anecdotes sans theme | 1,0 |

Experience probable :

- la variete devient perceptible ;
- le joueur commence a voir plusieurs familles de contenu ;
- les collections restent encore faibles comme mecanique de retention ;
- les tendances locales sont visibles, mais basees sur peu de donnees.

### Nouveau joueur - 5 parties

| Indicateur | Valeur moyenne |
|---|---:|
| Anecdotes vues | 20 |
| Anecdotes rares ou mieux | 0,5 |
| Collections affichees sur cartes | 18,3 |
| Collections decouvertes | 10,5 |
| Collections masquees revelees | 3,5 |
| Progression moyenne des collections decouvertes | 2,9 % |
| Anecdotes sans theme | 1,7 |

Experience probable :

- le jeu commence a ressembler a une experience culturelle vivante ;
- la progression collection existe, mais reste fragmentaire ;
- une anecdote rare peut apparaitre, sans etre garantie ;
- l'interface peut commencer a empiler plusieurs signaux sur certaines cartes.

### Joueur regulier - 20 parties

| Indicateur | Valeur moyenne |
|---|---:|
| Anecdotes vues | 80 |
| Anecdotes rares ou mieux | 1,8 |
| Collections affichees sur cartes | 73,1 |
| Collections decouvertes | 21,3 |
| Collections masquees revelees | 8,8 |
| Progression moyenne des collections decouvertes | 5,6 % |
| Anecdotes sans theme | 6,9 |

Experience probable :

- la profondeur de contenu devient nette ;
- le joueur voit environ la moitie des collections possibles ;
- les tendances locales deviennent plus interessantes, car certaines cases/departements ont plusieurs traces ;
- la rarete commence a produire quelques moments memorables.

### Joueur regulier - 50 parties

| Indicateur | Valeur moyenne |
|---|---:|
| Anecdotes vues | 200 |
| Anecdotes rares ou mieux | 4,5 |
| Collections affichees sur cartes | 182,9 |
| Collections decouvertes | 29,9 |
| Collections masquees revelees | 14,1 |
| Progression moyenne des collections decouvertes | 10,0 % |
| Anecdotes sans theme | 17,1 |

Experience probable :

- le joueur a une vraie sensation de base culturelle riche ;
- les collections deviennent lisibles, mais pas encore completables ;
- les tres rares et legendaires restent presque invisibles ;
- l'ecran statistiques commence a avoir de la valeur.

### Joueur tres engage - 100 parties

| Indicateur | Valeur moyenne |
|---|---:|
| Anecdotes vues | 400 |
| Anecdotes rares ou mieux | 9,2 |
| Anecdotes tres rares | 0,9 |
| Anecdotes legendaires | 0,3 |
| Collections affichees sur cartes | 366,1 |
| Collections decouvertes | 35,1 |
| Collections masquees revelees | 17,9 |
| Progression moyenne des collections decouvertes | 17,2 % |
| Meilleure progression moyenne d'une collection | 52,1 % |
| Anecdotes sans theme | 33,9 |

Experience probable :

- le joueur a presque tout vu comme familles de collections ;
- il reste beaucoup de contenu non lu, ce qui est positif ;
- la completion totale n'est pas un objectif realiste a court terme ;
- les collections doivent etre pensees comme progression longue, avec jalons.

## Tendances locales

Les statistiques locales apparaissent sur les cartes de resultat via `getCommunityInsightForPlacement`.

Etat actuel :

- visibles des la premiere partie terminee ;
- basees uniquement sur les donnees locales du navigateur ;
- plus credibles a partir de plusieurs parties ;
- encore formulees comme "Tendance locale", ce qui est honnete mais limite l'effet communautaire.

Lecture produit :

- apres 1 partie, elles donnent un signal vivant mais fragile ;
- apres 5 parties, elles commencent a raconter des habitudes du joueur ;
- apres 20 parties, elles deviennent utiles pour repeter des confusions ;
- sans backend, elles ne peuvent pas encore produire de vraies statistiques communautaires.

## Impact anti-repetition

### Anti-repetition par ID

Le moteur memorise les anecdotes vues via `geodoku-france-anecdotes-seen`.

Impact :

- tres positif sur les 100 premieres parties ;
- le stock valide est assez large pour eviter la repetition brute ;
- si un departement a peu d'anecdotes validees, le moteur autorise le fallback apres epuisement.

### Anti-redondance par theme

Le moteur conserve les 10 derniers themes et evite les 3 plus recents quand une alternative existe.

Impact :

- reduit les impressions de doublon thematique ;
- reste volontairement doux : il ne bloque jamais l'affichage ;
- fonctionne surtout quand le departement possede plusieurs anecdotes validees et plusieurs themes.

## Verifications ciblees

| Verification | Resultat |
|---|---|
| Collections visibles au lancement | OK : 18 visibles |
| Collections masquees jusqu'a decouverte | OK : 22 masquees avec contenu |
| Aucune collection vide affichee | OK : 0 vide visible |
| Aucune anecdote non validee exposee | OK : JSON public 2 840, non validees 0 |
| Aucune perte Phase 06 | OK : migration schema v1 theme -> schema v2 collection testee |
| Rarete affichee correctement | OK : indicateur pour rare, tres rare, legendaire |
| Stats locales affichees correctement | OK : tendance locale disponible sur les resultats |
| Anti-redondance theme active | OK : derniers themes recents evites si alternative |

## Fonctionnalites encore trop invisibles

| Fonctionnalite | Visibilite |
|---|---|
| Anecdotes dynamiques | Tres visible |
| Lieux remarquables | Tres visible |
| Collection sur carte de resultat | Moyennement visible |
| Section Collections dans statistiques | Moyennement visible |
| Raretés rare/tres rare/legendaire | Quasi invisible au debut |
| Decouvertes rares en historique | Quasi invisible si le joueur n'ouvre pas les stats |
| Anti-redondance theme | Invisible, mais utile |
| Migration Phase 06 | Invisible, technique |
| Tendances locales | Visible, mais credibilite faible au debut |
| Collections masquees | Invisibles par definition jusqu'a decouverte |

## Risque de surcharge UI

Le risque existe surtout sur mobile.

Une carte de resultat peut deja afficher :

- le departement ;
- le croisement ;
- le lieu remarquable ;
- la statistique simulee de selection ;
- la tendance locale ;
- la rarete ;
- la collection ;
- le titre d'anecdote ;
- le contenu ;
- le bouton "A propos du departement".

Si une anecdote est rare, appartient a une collection et possede une tendance locale, l'empilement devient dense. La Phase 07 doit donc regrouper ces signaux dans une hierarchie plus lisible au lieu d'ajouter de nouveaux elements.

## Recommandations

### Tres visible

- Conserver les anecdotes dynamiques et les lieux comme coeur emotionnel.
- Garder l'affichage collection sur les cartes, mais le rendre plus compact.
- Garder les tendances locales, avec une formulation prudente tant que les donnees sont locales.

### Moyennement visible

- Renforcer l'ecran statistiques pour mieux expliquer la progression collection.
- Ajouter des micro-formulations seulement sur evenement reel : nouvelle collection, collection enrichie, nouvelle anecdote rare.
- Afficher les collections masquees uniquement apres decouverte, comme actuellement.

### Quasi invisible

- Les tres rares et legendaires sont trop peu frequentes pour porter seules une mecanique.
- Les decouvertes rares doivent etre mieux signalees quand elles arrivent.
- L'anti-redondance doit rester invisible : c'est un confort, pas une fonctionnalite a expliquer.

## Verdict

L'experience actuelle est assez claire pour poursuivre vers la Phase 07.

La Phase 08 a bien transforme les themes editoriaux en collections joueur, mais l'interface doit maintenant mieux orchestrer les signaux. Le prochain gain produit n'est pas une nouvelle mecanique : c'est la lisibilite des decouvertes deja presentes.
