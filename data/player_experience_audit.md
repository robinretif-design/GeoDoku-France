# Audit d'exposition joueur - GeoDoku France

Date : 2026-06-09

Objectif : determiner ce qu'un joueur voit reellement apres 1, 5, 20 et 100 parties avant d'investir dans le polish UX de la Phase 07.

Ce rapport ne modifie aucun code, aucun contenu editorial, aucun statut et aucune regle de gameplay.

## Synthese courte

GeoDoku expose deja beaucoup de richesse, mais une partie importante reste implicite.

Ce qui est tres visible :

- 4 anecdotes dynamiques sur l'ecran resultat ;
- une tendance locale sous les cartes de resultat ;
- le score, le coup de maitre et la fiche departement ;
- les statistiques joueur de base.

Ce qui est moyennement visible :

- les collections, car environ 92% des anecdotes validees ont un theme ;
- les anecdotes rares, car elles existent mais ne representent que 2,3% des anecdotes validees ;
- les decouvertes rares et legendaires, visibles surtout dans l'ecran statistiques.

Ce qui est quasi invisible :

- l'anti-repetition par ID ;
- l'anti-redondance par theme ;
- le champ `ton` ;
- le champ `contexte`, car toutes les anecdotes validees sont actuellement en contexte `decouverte` ;
- la logique de selection intelligente ;
- la plupart des collections, car les themes sont trop granulaires.

Conclusion : les fondations produit sont fortes, mais le joueur voit surtout des anecdotes et quelques pastilles. Les mecanismes de progression existent, mais ils demandent encore une meilleure hierarchie visuelle.

## Donnees de reference

| Indicateur | Valeur |
| --- | ---: |
| Editions jouables | 33 |
| Editions normales | 23 |
| Editions expert | 10 |
| Departements / territoires jouables dans `gameData.js` | 101 |
| Codes avec au moins une anecdote validee | 107 |
| Codes jouables couverts par au moins une anecdote validee | 101/101 |
| Anecdotes editoriales totales | 3311 |
| Anecdotes validees | 2840 |
| Anecdotes validees avec theme | 2615 |
| Themes distincts disponibles | 2513 |
| Anecdotes non validees dans le JSON public | 0 |

Hypothese d'exposition passive utilisee dans ce rapport :

- une partie terminee affiche 4 cartes de resultat ;
- chaque carte peut afficher une anecdote dynamique ;
- l'audit ne compte pas les fiches departement ouvertes volontairement pendant la partie ou depuis le coup de maitre ;
- 100 parties supposent des replays/archives, car la rotation quotidienne seule ne suffit pas a produire 100 parties rapidement.

## 1. Anecdotes

### Frequence reelle d'apparition

Sur l'ecran resultat, le code affiche les 4 premiers placements :

```text
placedDepartments.slice(0, 4)
```

Donc, sans interaction supplementaire :

| Parties terminees | Anecdotes visibles passivement |
| ---: | ---: |
| 1 | 4 |
| 5 | 20 |
| 20 | 80 |
| 100 | 400 |

Le joueur peut voir davantage d'anecdotes s'il ouvre :

- une fiche departement pendant la partie ;
- une fiche depuis une carte de resultat ;
- la fiche du coup de maitre.

### Diversite observee

La couverture est tres bonne en largeur : tous les 101 departements / territoires jouables disposent d'au moins une anecdote validee.

Mais la profondeur est asymetrique :

| Couverture par code jouable | Nombre de codes |
| --- | ---: |
| 0 anecdote validee | 0 |
| 1 a 2 anecdotes validees | 15 |
| 3 a 9 anecdotes validees | 1 |
| 10 a 19 anecdotes validees | 0 |
| 20 a 29 anecdotes validees | 0 |
| 30+ anecdotes validees | 85 |

Les codes jouables ayant moins de 5 anecdotes validees sont :

- 04 Alpes-de-Haute-Provence : 1 ;
- 09 Ariege : 1 ;
- 11 Aude : 1 ;
- 33 Gironde : 1 ;
- 44 Loire-Atlantique : 1 ;
- 45 Loiret : 1 ;
- 69 Rhone : 1 ;
- 75 Paris : 1 ;
- 02 Aisne : 2 ;
- 05 Hautes-Alpes : 2 ;
- 06 Alpes-Maritimes : 2 ;
- 13 Bouches-du-Rhone : 2 ;
- 34 Herault : 2 ;
- 59 Nord : 2 ;
- 77 Seine-et-Marne : 2 ;
- 01 Ain : 3.

Lecture produit : un joueur qui tombe souvent sur les 85 codes bien couverts ressentira une grande diversite. Sur les 16 codes peu couverts, l'anti-repetition aura peu d'effet et les anecdotes pourront revenir vite.

### Impact de l'anti-repetition

L'anti-repetition par ID est utile mais discret :

- il empeche de revoir une meme anecdote tant qu'une alternative validee existe ;
- il devient tres efficace sur les 85 codes a 30+ anecdotes ;
- il est presque invisible sur les codes avec 1 ou 2 anecdotes ;
- si tout a deja ete vu pour un departement, le moteur autorise de nouveau une anecdote vue pour ne jamais bloquer l'affichage.

Experience joueur :

- apres 1 partie : effet invisible ;
- apres 5 parties : effet sensible seulement si les memes departements reviennent ;
- apres 20 parties : effet reel sur les departements bien couverts ;
- apres 100 parties : indispensable pour eviter la repetition, mais toujours non explique au joueur.

### Impact de l'anti-redondance theme

L'anti-redondance theme evite les 3 derniers themes vus si une alternative existe.

Mais la structure actuelle des themes limite fortement son effet :

| Indicateur theme | Valeur |
| --- | ---: |
| Anecdotes validees avec theme | 2615 |
| Themes distincts | 2513 |
| Themes avec une seule anecdote | 2429 |
| Themes avec plusieurs anecdotes | 84 |
| Maximum d'anecdotes dans un meme theme | 4 |
| Moyenne d'anecdotes par theme | 1,04 |
| Mediane d'anecdotes par theme | 1 |

Lecture produit : le champ `theme` sert deja tres bien a creer des collections, mais il est encore trop granulaire pour produire une anti-redondance perceptible. Le joueur verra souvent une nouvelle collection, mais rarement une progression claire dans une meme collection.

## 2. Rarete

### Distribution des raretes validees

| Rarete | Anecdotes validees | Part des anecdotes validees |
| --- | ---: | ---: |
| commune | 2326 | 81,90% |
| peu commune | 449 | 15,81% |
| rare | 57 | 2,01% |
| tres rare | 6 | 0,21% |
| legendaire | 2 | 0,07% |

Total rare ou plus : 65 anecdotes, soit 2,3% des anecdotes validees.

### Probabilite de rencontre passive

Estimation basee sur 4 anecdotes visibles par partie et une distribution moyenne des anecdotes validees.

| Parties | Expositions | Chance de voir au moins une rare | tres rare | legendaire | rare ou plus |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 4 | 7,8% | 0,8% | 0,3% | 8,8% |
| 5 | 20 | 33,3% | 4,1% | 1,4% | 37,1% |
| 20 | 80 | 80,2% | 15,6% | 5,5% | 84,3% |
| 100 | 400 | ~100% | 57,1% | 24,6% | ~100% |

Lecture produit :

- la rarete est une bonne recompense long terme ;
- elle est trop rare pour etre un signal garanti en premiere session ;
- la fiche du coup de maitre peut augmenter l'exposition aux anecdotes rares, mais seulement si le joueur clique.

## 3. Collections

### Nombre de themes et profondeur

Il existe 2513 themes distincts pour 2615 anecdotes validees avec theme.

Cela produit un effet paradoxal :

- la premiere collection visible arrive presque immediatement ;
- la progression dans une collection est rarement perceptible ;
- beaucoup de collections ressemblent a des etiquettes ponctuelles plus qu'a de vrais albums.

### Frequence de decouverte

92,1% des anecdotes validees possedent un theme.

Estimation passive :

| Parties | Expositions | Collections attendues | Chance de voir au moins une collection |
| ---: | ---: | ---: | ---: |
| 1 | 4 | 3,7 | ~100% |
| 5 | 20 | 18,4 | ~100% |
| 20 | 80 | 73,7 | ~100% |
| 100 | 400 | 368,3 | ~100% |

Temps moyen avant premiere collection visible : moins d'une partie, probablement des la premiere carte de resultat.

### Limite de lisibilite

Le joueur voit une pastille `Collection : ...`, mais les libelles peuvent etre tres specifiques :

- `Resistance Ain` ;
- `Bayeux Tapisserie` ;
- `Climats Bourgogne` ;
- `Millevaches`.

Ces themes ont de la valeur editoriale, mais ils ne sont pas encore organises en familles lisibles comme :

- Resistance ;
- Phares ;
- Volcans ;
- Gastronomie locale ;
- Patrimoine industriel ;
- Outre-mer.

## 4. Statistiques communautaires

### Quand apparaissent-elles ?

Les tendances locales apparaissent sur les cartes de resultat, apres validation de la grille.

Le flux actuel :

1. le joueur valide ;
2. `recordCommunityGame` enregistre les reponses localement ;
3. l'ecran resultat affiche `getCommunityInsightForPlacement` ;
4. les 4 cartes visibles peuvent afficher une tendance locale.

### Sont-elles visibles des la premiere partie ?

Oui, mais avec une nuance importante : ce sont des statistiques locales au navigateur, pas encore des statistiques communautaires globales.

Des la premiere partie, le joueur peut voir :

```text
Tendance locale : X% de reussite pour [departement].
```

ou :

```text
Tendance locale : premieres donnees en cours de constitution.
```

### Quantite de donnees necessaire pour etre pertinente

| Donnee affichee | Seuil actuel | Pertinence produit |
| --- | ---: | --- |
| Premiere tendance locale | 1 tentative | Visible mais fragile |
| Taux de reussite sur un croisement | 2 tentatives sur la meme case | Debut de signal |
| Departement le plus confondu | 2 confusions identiques | Interessant mais rare localement |
| Statistique vraiment credible | 20+ evenements comparables | Necessite backend ou usage regulier |

Lecture produit : la fonctionnalite est visible tot, mais son potentiel narratif fort n'arrivera vraiment qu'avec des donnees agregees ou des statistiques simulees/editees.

## 5. Experience joueur simulee

### Nouveau joueur - 1 partie

Ce qu'il voit probablement :

- une grille jouable ;
- un score ;
- un coup de maitre ;
- 4 cartes de resultat ;
- 4 anecdotes dynamiques ;
- 3 a 4 pastilles de collection ;
- parfois une anecdote peu commune ;
- rarement une anecdote rare ;
- une tendance locale encore peu significative ;
- une section statistiques s'il clique sur le bouton.

Ressenti probable :

- la richesse editoriale existe deja ;
- les collections peuvent intriguer ;
- la rarete peut passer totalement inapercue ;
- l'anti-repetition et l'anti-redondance sont invisibles.

### Joueur occasionnel - 5 parties

Ce qu'il voit probablement :

- environ 20 anecdotes passives ;
- 18 collections ou themes decouverts ;
- une chance sur trois environ de voir au moins une anecdote rare ;
- plusieurs tendances locales ;
- un debut de stats personnelles ;
- quelques repetitions evitees si des departements reviennent.

Ressenti probable :

- le jeu commence a ressembler a une experience de decouverte ;
- les collections sont visibles mais encore peu structurees ;
- le joueur ne comprend pas forcement qu'il progresse dans des themes.

### Joueur regulier - 20 parties

Ce qu'il voit probablement :

- environ 80 anecdotes passives ;
- plus de 70 anecdotes a theme ;
- au moins une anecdote rare dans la plupart des parcours ;
- une faible chance de voir une legendaire ;
- des statistiques locales plus nombreuses ;
- une vraie reduction des repetitions sur les departements bien couverts.

Ressenti probable :

- GeoDoku devient clairement un jeu de culture territoriale ;
- les anecdotes portent l'identite produit ;
- les collections manquent encore de regroupements lisibles.

### Joueur tres regulier - 100 parties

Ce qu'il voit probablement :

- environ 400 anecdotes passives ;
- presque toutes avec collection ;
- plusieurs anecdotes rares ;
- environ une chance sur deux de voir au moins une tres rare ;
- environ une chance sur quatre de voir une legendaire ;
- beaucoup de statistiques locales ;
- de nombreuses collections, mais souvent avec 1 seule anecdote chacune.

Ressenti probable :

- la profondeur editoriale devient evidente ;
- l'absence de familles de collections peut rendre la progression confuse ;
- les statistiques locales deviennent plus credibles, mais restent limitees au navigateur.

## 6. Fonctionnalites invisibles ou peu perceptibles

| Fonctionnalite | Etat code | Visibilite joueur | Commentaire |
| --- | --- | --- | --- |
| Selection dynamique d'anecdotes validees | Active | Moyenne | Visible par le contenu, pas expliquee |
| Fallback `dep.anecdote` | Active | Invisible | Important pour la robustesse |
| Anti-repetition par ID | Active | Quasi invisible | Ressenti seulement sur la duree |
| Anti-redondance theme | Active | Quasi invisible | Trop peu de themes repetes |
| Rareté | Active | Moyenne | Visible uniquement si rare ou plus |
| Decouvertes rares en localStorage | Active | Faible | Visible surtout dans stats |
| Collections par theme | Active | Moyenne | Pastille visible, progression moins claire |
| Top 3 collections dans stats | Active | Faible a moyenne | Necessite d'ouvrir l'ecran stats |
| Statistiques locales | Active | Moyenne | Visible dans resultat mais donnees faibles au debut |
| Confusions frequentes | Active | Faible | Seuil local difficile a atteindre |
| Champ `ton` | Present | Invisible | Non exploite dans l'UI |
| Champ `contexte` | Present | Invisible | Toutes les validees sont `decouverte` |
| Historique joueur | Present | Faible | Visible via stats seulement |
| JSON public valide uniquement | Present | Invisible | Garantie technique |
| Sources editoriales | Presentes | Invisible | Non affichees en jeu |

## 7. Classement de visibilite

### Tres visible

- Score final ;
- rang ;
- coup de maitre ;
- cartes de resultat ;
- anecdotes affichees dans les cartes ;
- fiche departement ;
- tendance locale, meme si elle reste statistiquement fragile.

### Moyennement visible

- rarete des anecdotes ;
- collections ;
- progression statistiques joueur ;
- decouvertes rares / legendaires dans l'ecran statistiques ;
- lieux remarquables dans les fiches ;
- edition et difficulte.

### Quasi invisible

- anti-repetition par ID ;
- anti-redondance theme ;
- logique de selection contextuelle ;
- champ `ton` ;
- champ `contexte` ;
- statut editorial valide uniquement ;
- couverture profonde par departement ;
- progression reelle par theme ;
- distinction entre statistique locale et statistique communautaire globale.

## 8. Recommandations avant Phase 07

### Priorite UX immediate

Phase 07 doit surtout reduire l'empilement visuel :

- rarete ;
- collection ;
- tendance locale.

Ces trois signaux sont utiles, mais ils se concurrencent dans les cartes. Un composant commun de type `DiscoveryBadge` ou `InsightBadge` est pertinent.

### Ce qu'il faut rendre plus lisible

1. Distinguer les signaux :
   - rarete = valeur de l'anecdote ;
   - collection = progression ;
   - tendance locale = comportement joueur.

2. Ajouter une micro-formulation uniquement en cas de nouveaute :
   - `Nouvelle collection decouverte` ;
   - `Collection enrichie` ;
   - `Nouvelle anecdote rare`.

3. Limiter les libelles longs sur mobile :
   - conserver le theme complet dans les stats ;
   - raccourcir dans les cartes ;
   - eviter deux lignes de pastilles successives.

### Ce qu'il ne faut pas encore faire

- ne pas creer de badges complexes ;
- ne pas changer la logique de selection ;
- ne pas forcer les anecdotes rares ;
- ne pas transformer les stats locales en pseudo-communaute globale ;
- ne pas regrouper les themes dans le code tant que la taxonomie de familles n'est pas posee.

## Verdict produit

GeoDoku a deja assez de matiere pour que le joueur ressente une experience de decouverte.

Mais aujourd'hui, les mecanismes construits sont plus riches que leur exposition visuelle :

- les anecdotes sont bien visibles ;
- les collections apparaissent vite mais restent trop atomisees ;
- la rarete est gratifiante mais peu frequente ;
- les statistiques locales sont visibles mais pas encore tres parlantes ;
- l'anti-repetition et l'anti-redondance ameliorent l'experience sans etre percues.

La Phase 07 est donc justifiee, mais elle doit rester un polish de clarte, pas une nouvelle couche fonctionnelle lourde.
