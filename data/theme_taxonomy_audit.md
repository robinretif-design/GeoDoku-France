# Produit Phase 06.5 - Audit et rationalisation des themes

Date : 2026-06-09

Objectif : analyser la taxonomie actuelle des `theme` d'anecdotes afin de determiner si les collections doivent etre regroupees avant de poursuivre le developpement UX.

Ce rapport ne modifie aucun code, aucun contenu editorial, aucun statut et aucune source.

## Synthese

Le diagnostic est confirme.

La base contient 2615 anecdotes validees avec un `theme`, mais 2513 themes distincts. Cela signifie que le theme actuel fonctionne surtout comme une etiquette editoriale fine, pas comme une vraie collection joueur.

La distribution est extreme :

| Nombre d'anecdotes par theme | Nombre de themes |
| ---: | ---: |
| 1 | 2429 |
| 2 | 73 |
| 3 | 4 |
| 4 | 7 |
| 5 ou plus | 0 |

Conclusion produit : il faut conserver `theme` comme niveau fin, mais ajouter une couche de collections regroupees avant de polisher fortement l'UX des collections.

Recommandation : viser environ 35 a 45 collections finales lisibles, au lieu de 2513 themes bruts.

## 1. Nombres exacts

| Indicateur | Valeur |
| --- | ---: |
| Anecdotes editoriales totales | 3311 |
| Anecdotes validees | 2840 |
| Anecdotes validees avec theme | 2615 |
| Themes uniques distincts | 2513 |
| Themes a occurrence unique | 2429 |
| Themes quasi uniques, 1 a 2 anecdotes | 2502 |
| Themes avec 3 anecdotes | 4 |
| Themes avec 4 anecdotes | 7 |
| Themes avec 5 anecdotes ou plus | 0 |

Lecture : 99,56% des themes ont 1 ou 2 anecdotes. Le joueur decouvre donc beaucoup de labels, mais progresse rarement dans une meme collection.

## 2. Top themes actuels

### Top 50 themes les plus frequents

| Rang | Theme | Anecdotes |
| ---: | --- | ---: |
| 1 | aubrac | 4 |
| 2 | bd-angouleme | 4 |
| 3 | climats-bourgogne | 4 |
| 4 | cognac | 4 |
| 5 | millevaches | 4 |
| 6 | salers | 4 |
| 7 | sancerre | 4 |
| 8 | alpes-mancelles | 3 |
| 9 | bayeux-tapisserie | 3 |
| 10 | charente-fleuve | 3 |
| 11 | pate-pommes-terre | 3 |
| 12 | agneau-pre-sale | 2 |
| 13 | angouleme | 2 |
| 14 | ardoise-travassac | 2 |
| 15 | arromanches | 2 |
| 16 | aubazine | 2 |
| 17 | aubeterre | 2 |
| 18 | baie-saint-brieuc | 2 |
| 19 | boucles-seine | 2 |
| 20 | bourges-cathedrale | 2 |
| 21 | brehat | 2 |
| 22 | brive | 2 |
| 23 | brouage | 2 |
| 24 | burons | 2 |
| 25 | cagouilles | 2 |
| 26 | calvados-eau-de-vie | 2 |
| 27 | camembert | 2 |
| 28 | canal-berry | 2 |
| 29 | canal-garonne | 2 |
| 30 | canal-nivernais | 2 |
| 31 | cancoillotte | 2 |
| 32 | cap-frehel | 2 |
| 33 | champagne-berrichonne | 2 |
| 34 | collonges | 2 |
| 35 | croustade | 2 |
| 36 | debarquement | 2 |
| 37 | dijon-ducs | 2 |
| 38 | dinan | 2 |
| 39 | estuaire-seine | 2 |
| 40 | ficelle-picarde | 2 |
| 41 | flammekueche | 2 |
| 42 | forestines | 2 |
| 43 | fort-boyard | 2 |
| 44 | gateau-broche | 2 |
| 45 | gorges-tarn | 2 |
| 46 | granit-rose | 2 |
| 47 | guerledan | 2 |
| 48 | hospices-beaune | 2 |
| 49 | jacques-coeur | 2 |
| 50 | kougelhopf | 2 |

### Tous les themes avec plusieurs anecdotes

Ces themes sont les seuls qui produisent deja une micro-progression interne.

- aubrac : 4
- bd-angouleme : 4
- climats-bourgogne : 4
- cognac : 4
- millevaches : 4
- salers : 4
- sancerre : 4
- alpes-mancelles : 3
- bayeux-tapisserie : 3
- charente-fleuve : 3
- pate-pommes-terre : 3
- agneau-pre-sale : 2
- angouleme : 2
- ardoise-travassac : 2
- arromanches : 2
- aubazine : 2
- aubeterre : 2
- baie-saint-brieuc : 2
- boucles-seine : 2
- bourges-cathedrale : 2
- brehat : 2
- brive : 2
- brouage : 2
- burons : 2
- cagouilles : 2
- calvados-eau-de-vie : 2
- camembert : 2
- canal-berry : 2
- canal-garonne : 2
- canal-nivernais : 2
- cancoillotte : 2
- cap-frehel : 2
- champagne-berrichonne : 2
- collonges : 2
- croustade : 2
- debarquement : 2
- dijon-ducs : 2
- dinan : 2
- estuaire-seine : 2
- ficelle-picarde : 2
- flammekueche : 2
- forestines : 2
- fort-boyard : 2
- gateau-broche : 2
- gorges-tarn : 2
- granit-rose : 2
- guerledan : 2
- hospices-beaune : 2
- jacques-coeur : 2
- kougelhopf : 2
- la-rochelle : 2
- lioran : 2
- lomagne : 2
- mitterrand-jarnac : 2
- moutarde-dijon : 2
- muma : 2
- najac : 2
- noirlac : 2
- noix-perigord : 2
- paimpol-islande : 2
- pineau : 2
- resistance-ain : 2
- rhin-frontiere : 2
- rochefort-arsenal : 2
- roquefort : 2
- saint-flour : 2
- seuil-poitou : 2
- sologne : 2
- statues-menhirs : 2
- teurgoule : 2
- troglodytes : 2
- truffade : 2
- turenne : 2
- vallee-lot : 2
- vallee-oise : 2
- ventadour : 2
- vercors : 2
- vercors-resistance : 2
- vezere : 2
- viaduc-millau : 2
- vierzon : 2
- vix : 2
- volaille-bresse : 2
- volcan-cantal : 2

### Themes uniques

Nombre exact : 2429 themes.

Exemples representatifs :

- abbaye-epau
- abers
- abolition-1848-guadeloupe
- abolition-1848-martinique
- abolition-guyane
- abolition-reunion
- abondance
- abraxas
- abraxas-cinema
- absinthe
- absinthe-pontarlier
- acadiens-spm
- acadiens-vienne
- accras-guadeloupe
- accras-martinique
- accras-stbarth
- aeroport-court
- aeropostale
- aeroscopia
- agriates
- aigues-mortes
- aiguille-etretat
- aiguille-midi
- ail-blanc-lomagne
- ail-lomagne
- ail-rose-lautrec
- airbus
- aires-coutumieres
- ajaccio-imperiale
- albi-cite-episcopale
- albigeois-cathares
- aleria-antique
- alesia
- alfort-veterinaire
- aligot-lozere
- alofi
- alofi-insolite
- alpe-huez
- alstom-belfort
- alta-rocca
- amazonie-landaise
- ambialet
- ambialet-boucle
- amboise
- america-saint-die
- amerindiens-guadeloupe
- amneville-loisirs
- anchois-collioure
- ancy-le-franc
- andelys

Lecture : les themes uniques sont souvent de bons sujets editoriaux, mais de mauvais supports de collection.

### Themes quasi uniques

Nombre exact : 2502 themes a 1 ou 2 anecdotes.

Ils representent presque toute la taxonomie actuelle. La consequence produit est directe : le joueur voit souvent une nouvelle collection, mais il voit rarement une collection s'enrichir.

## 3. Redondances et synonymes

### Redondances par lieu

Plusieurs themes designent le meme lieu, le meme territoire ou la meme aire culturelle avec des angles differents.

Exemples :

- `angouleme`, `bd-angouleme`
- `cognac`, `polar-cognac`, `chateau-cognac`
- `millevaches`, `plateau-millevaches`
- `vercors`, `vercors-resistance`
- `dijon-ducs`, `moutarde-dijon`, `culture-dijon`
- `chartres-cathedrale`, `vitrail-chartres`, `macarons-chartres`, `chartres-lumieres`
- `saint-malo-corsaires`, `beurre-saint-malo`
- `grenoble-1968`, `bastille-grenoble`, `street-art-grenoble`

Interpretation : ces themes sont utiles pour l'edition, mais ils doivent remonter dans une collection plus large pour etre lisibles.

### Synonymes fonctionnels

Plusieurs themes racontent le meme type de territoire ou de fait.

Exemples :

- fleuves et eau : `fleuve-loire`, `charente-fleuve`, `riviere-marne`, `source-seine`, `canal-nivernais`, `canal-garonne`
- resistance et guerre : `resistance-ain`, `vercors-resistance`, `maquis-morvan`, `debarquement`, `debarquement-provence`, `douaumont`, `verdun`
- religieux : `cathedrale-amiens`, `bourges-cathedrale`, `abbaye-epau`, `vitrail-chartres`, `notre-dame-port`
- littoral : `cap-frehel`, `baie-saint-brieuc`, `ouessant`, `abers`, `eckmuhl`, `port-cros-marin`
- gastronomie : `camembert`, `roquefort`, `cancoillotte`, `kougelhopf`, `truffade`, `pate-pommes-terre`
- outre-mer : `accras-guadeloupe`, `accras-martinique`, `carnaval-guadeloupe`, `carnaval-martinique`, `lagon-mayotte`, `lagon-wallis`

### Themes trop specifiques

Un theme est trop specifique quand il ne peut pratiquement jamais produire de progression visible.

Exemples :

- `24-heures-1923`
- `aeroport-court`
- `acariens-fromage`
- `bambouseraie-insolite`
- `condom-nom`
- `source-mystere`
- `maison-assiettes`
- `peniche-violette`
- `plaine-villejuif`
- `grand-case-tables`

Ces themes peuvent rester comme detail editorial interne, mais ils ne devraient pas etre affiches tels quels comme collections principales.

## 4. Themes exploitables comme collections

Certains ensembles sont deja assez clairs pour devenir des collections joueur.

| Collection candidate | Pourquoi elle fonctionne |
| --- | --- |
| Resistance | Sujet narratif fort, deja present dans plusieurs departements |
| Debarquements et guerres | Facile a comprendre, forte charge historique |
| Chateaux et fortifications | Tres lisible pour un joueur |
| Patrimoine religieux | Cathedrales, abbayes, vitraux, pelerinages |
| Gastronomie locale | Tres large, tres accessible |
| Vins et boissons | Cognac, armagnac, cidre, rhum, vins |
| Littoral et iles | Ports, caps, iles, baies, phares |
| Montagnes et volcans | Alpes, Pyrenees, volcans, massifs |
| Fleuves et canaux | Loire, Seine, Garonne, canaux, sources |
| Outre-mer | Tres fort pour la diversite territoriale |
| Frontieres | Rhin, Alpes, Pyrenees, Pays basque, zones transfrontalieres |
| Industrie et savoir-faire | Mines, textile, arsenal, aviation, faience |
| Culture et arts | Musees, festivals, BD, cinema, musique |
| Insolite et records | Tres compatible avec un jeu mobile |
| Villes iconiques | Lieux, quartiers, villes, architectures reconnaissables |

## 5. Taxonomie cible proposee

### Principe

Ne pas remplacer `theme`.

Ajouter une couche logique au-dessus :

```text
theme brut -> collection -> famille
```

Exemple :

```text
vercors-resistance -> Resistance -> Histoire et memoire
camembert -> Fromages et terroirs -> Gastronomie
cap-frehel -> Caps, phares et iles -> Littoral
lagon-mayotte -> Lagons et outre-mer -> Outre-mer
```

Cette approche preserve la finesse editoriale tout en donnant au joueur une progression lisible.

### Familles cibles

| Famille | Collections possibles |
| --- | --- |
| Histoire et memoire | Resistance, Guerres, Jeanne d'Arc, Antiquite, Revolutions, Memoire ouvriere |
| Patrimoine | Chateaux, Fortifications, Patrimoine religieux, Sites UNESCO, Archeologie |
| Geographie | Montagnes, Volcans, Fleuves, Canaux, Forets, Marais, Littoral, Iles |
| Gastronomie | Fromages, Vins, Alcools, Patisseries, Produits du terroir, Cuisine d'outre-mer |
| Culture | Cinema, BD, Litterature, Musique, Festivals, Musees |
| Economie et savoir-faire | Industrie, Mines, Textile, Aviation, Ports, Artisanat |
| Territoires singuliers | Outre-mer, Frontieres, Langues regionales, Villes nouvelles, Lieux iconiques |
| Insolite | Records, Noms surprenants, Curiosites, Traditions rares |

### Collections finales recommandees

Une cible realiste pour le MVP produit serait :

- minimum : 25 collections ;
- cible recommandee : 35 a 45 collections ;
- maximum avant complexite UX : 60 collections.

Avec 2615 anecdotes actuellement themees :

| Nombre de collections finales | Moyenne theorique d'anecdotes par collection |
| ---: | ---: |
| 25 | 105 |
| 35 | 75 |
| 45 | 58 |
| 60 | 44 |

Lecture : 35 a 45 collections donnent assez de profondeur pour creer une vraie progression, sans transformer l'ecran statistiques en catalogue illisible.

## 6. Estimation par collection cible

Les chiffres ci-dessous sont des estimations de regroupement. Ils ne doivent pas etre lus comme un audit definitif tant qu'un mapping theme -> collection n'existe pas.

| Collection cible | Estimation basse detectee automatiquement | Estimation produit apres mapping |
| --- | ---: | ---: |
| Gastronomie locale | 126 | 350-450 |
| Culture, arts et festivals | 151 | 300-450 |
| Histoire locale | 10 | 300-500 |
| Insolite et records | 42 | 250-350 |
| Outre-mer | 99 | 220-260 |
| Littoral, iles et ports | 92 | 150-220 |
| Montagnes, volcans et reliefs | 99 | 130-190 |
| Fleuves, canaux et sources | 87 | 120-180 |
| Nature et paysages | 85 | 120-200 |
| Patrimoine religieux | 98 | 100-150 |
| Chateaux et fortifications | 27 | 80-130 |
| Industrie et savoir-faire | 24 | 80-140 |
| Resistance et guerres | 26 | 80-140 |
| Frontieres et cultures transfrontalieres | 28 | 50-100 |
| Villes et lieux iconiques | 82 | 100-180 |

Pourquoi l'estimation basse est parfois faible : les themes sont tres atomises et ne contiennent pas toujours un mot-cle explicite. Par exemple une anecdote historique peut avoir un theme de lieu sans contenir `histoire`.

## 7. Decision produit recommandee

### Ne pas continuer avec les themes bruts comme collections

Raison : trop d'atomisation.

Avec 2513 collections brutes, le joueur a l'impression de collectionner des etiquettes isolées plutot que de progresser dans des familles reconnaissables.

### Ne pas renommer tous les themes maintenant

Raison : le champ `theme` garde une valeur editoriale forte.

Il sert a :

- eviter les redondances fines ;
- garder une trace du sujet precis ;
- preparer des selections avancees ;
- documenter la logique editoriale.

### Ajouter une couche de mapping

Option recommandee :

```js
themeCollectionMap = {
  "vercors-resistance": "resistance",
  "resistance-ain": "resistance",
  "maquis-morvan": "resistance",
  "camembert": "fromages-terroirs",
  "roquefort": "fromages-terroirs",
  "cognac": "vins-alcools",
  "lagon-mayotte": "outre-mer-lagons"
}
```

Ou, plus durable :

```js
themeTaxonomy = {
  collections: {
    resistance: {
      label: "Resistance",
      family: "histoire_memoire",
      themes: [...]
    }
  }
}
```

## 8. Impact sur Produit Phase 07

Avant de polisher fortement l'UX des collections, il faut eviter d'embellir un modele trop atomise.

Phase 07 peut tout de meme avancer sur :

- harmonisation visuelle rarete / collection / tendance locale ;
- reduction de l'empilement de pastilles ;
- micro-formulations gratifiantes.

Mais il vaut mieux ne pas investir trop dans :

- une page complete de collections ;
- des badges de collection ;
- une progression detaillee par theme brut ;
- des animations de collection avancees.

La meilleure sequence est :

1. Phase 06.5 : valider la taxonomie cible ;
2. Phase 07 : polir l'affichage avec des badges simples ;
3. Phase 08 : introduire un mapping `theme -> collection` ;
4. Phase 09 : afficher une progression de collections lisibles.

## 9. Verdict

Les collections doivent etre regroupees avant de devenir un pilier UX majeur.

Etat actuel :

- excellent pour la finesse editoriale ;
- insuffisant pour une progression joueur claire ;
- trop granulaire pour une collection visible ;
- utile pour l'anti-redondance, mais pas assez pour produire un effet collection fort.

Decision recommandee :

- conserver `theme` ;
- creer une couche `collection` ou `collectionKey` ;
- viser 35 a 45 collections finales ;
- afficher au joueur les collections, pas les themes bruts ;
- garder les themes bruts pour les services internes et les futurs filtres fins.
