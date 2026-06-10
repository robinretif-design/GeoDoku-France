# Produit Phase 06.6 - Conception des collections

Date : 2026-06-09

Objectif : definir une couche intermediaire `theme -> collection` sans modifier les anecdotes, les themes existants, les statuts, le scoring ou l'interface.

Ce document est une specification produit. Il ne modifie aucun code.

## Synthese

Le champ `theme` doit rester une granularite editoriale fine.

Pour le joueur, il faut ajouter une couche de regroupement :

```text
theme brut -> collection joueur -> famille produit
```

Exemple :

```text
vercors-resistance -> Resistance et maquis -> Histoire et memoire
camembert -> Fromages et terroirs -> Gastronomie
cap-frehel -> Littoraux, iles et ports -> Geographie sensible
```

Recommandation produit :

- definir 40 collections maximum ;
- en afficher 18 a 22 au lancement ;
- masquer les collections rares tant qu'elles ne sont pas decouvertes ;
- ne pas viser la completion totale comme objectif principal ;
- utiliser des paliers de progression : 1, 3, 5, 10, 20 decouvertes.

## 1. Collections cible proposees

Les volumes ci-dessous sont des estimations de lancement. Ils doivent etre valides par un futur mapping exhaustif `theme -> collection`.

| # | Nom joueur | Description courte | Estimation | Exemples de themes associes |
| ---: | --- | --- | ---: | --- |
| 1 | Histoire locale | Episodes historiques lies a des villes, pays et territoires. | 180 | dijon-ducs, capitouls, parlement-toulouse, jacques-coeur |
| 2 | Resistance et maquis | Maquis, liberation, France libre, lieux de resistance. | 45 | resistance-ain, vercors-resistance, maquis-morvan, debarquement |
| 3 | Guerres et memoire | Batailles, sieges, lieux de memoire et traces de guerre. | 65 | verdun, douaumont, bataille-marne, saint-lo-1944 |
| 4 | Jeanne d'Arc | Lieux et episodes lies a Jeanne d'Arc. | 8 | chinon-jeanne, jeanne-rouen, jeanne-domremy |
| 5 | Chateaux et fortifications | Chateaux, citadelles, remparts, forts et places fortes. | 70 | fort-boyard, turenne, najac, ventadour |
| 6 | Cathedrales et abbayes | Edifices religieux, vitraux, abbayes et pelerinages. | 95 | bourges-cathedrale, aubazine, noirlac, saint-flour |
| 7 | Antiquite et archeologie | Antiquite, vestiges, sites gallo-romains et prehistoire. | 45 | vix, statues-menhirs, nimes-romaine, alesia |
| 8 | Fleuves et canaux | Fleuves, sources, estuaires, canaux et navigation interieure. | 90 | charente-fleuve, canal-berry, canal-garonne, boucles-seine |
| 9 | Littoraux, iles et ports | Iles, ports, baies, rades et cultures littorales. | 110 | la-rochelle, brehat, baie-saint-brieuc, paimpol-islande |
| 10 | Phares, caps et cotes | Caps, pointes, phares et paysages de bord de mer. | 55 | cap-frehel, granit-rose, ouessant, eckmuhl |
| 11 | Montagnes et volcans | Massifs, volcans, hauts plateaux et cultures de montagne. | 100 | aubrac, volcan-cantal, lioran, vercors |
| 12 | Forets, marais et campagnes | Sologne, Brenne, marais, landes, forets et campagnes fortes. | 65 | sologne, marais-vernier, foret-lyons, champagne-berrichonne |
| 13 | Vallees, gorges et plateaux | Vallees, gorges, causses, plateaux et paysages encaisses. | 60 | gorges-tarn, vallee-lot, vallee-oise, millevaches |
| 14 | Outre-mer | Territoires ultramarins, lagons, cultures creoles et oceaniennes. | 130 | accras-guadeloupe, rhum-aoc-martinique, lagon-mayotte, kanak |
| 15 | Frontieres | Espaces frontaliers et cultures transfrontalieres. | 45 | rhin-frontiere, frontiere-suisse, cote-basque, decapole-alsace |
| 16 | Fromages et terroirs | Fromages, elevage, terroirs de montagne ou de campagne. | 55 | roquefort, camembert, salers, cancoillotte |
| 17 | Vins, cidres et alcools | Vins, cognac, armagnac, cidre, rhum et boissons locales. | 65 | cognac, sancerre, pineau, calvados-eau-de-vie |
| 18 | Cuisine locale | Plats, produits sales, recettes regionales et tables populaires. | 80 | cagouilles, ficelle-picarde, volaille-bresse, truffade |
| 19 | Douceurs et patisseries | Gateaux, biscuits, confiseries et douceurs regionales. | 50 | kougelhopf, teurgoule, gateau-broche, forestines |
| 20 | Industrie et mines | Mines, usines, bassins industriels et paysages productifs. | 55 | ardoise-travassac, vierzon, mines-ales, bassin-minier |
| 21 | Savoir-faire et artisanat | Tapisserie, cuir, faience, dentelle, horlogerie et metiers. | 60 | bayeux-tapisserie, rochefort-arsenal, moutarde-dijon, muma |
| 22 | Trains, routes et ponts | Infrastructures, viaducs, trains, routes et grands ouvrages. | 65 | viaduc-millau, pont-du-gard, train-jaune, canal-velo |
| 23 | Monde maritime | Peche, arsenaux, morue, ports militaires et memoires maritimes. | 45 | rochefort-arsenal, paimpol-islande, brest-arsenal, arromanches |
| 24 | Cinema et BD | Bandes dessinees, tournages, festivals et culture visuelle. | 40 | bd-angouleme, angouleme, rochefort-cinema, deauville-cinema |
| 25 | Musees et arts | Musees, peintres, art moderne, lieux artistiques et collections. | 90 | muma, vallee-peintres, courbet, musee-temps |
| 26 | Musiques et festivals | Musique, theatre, jazz, festivals et scenes locales. | 55 | jazz-marciac, festival-avignon, cornouaille, nougaro |
| 27 | Litterature et ecrivains | Ecrivains, maisons d'auteurs et imaginaires litteraires. | 35 | proust, colette, jules-verne-amiens, ronsard |
| 28 | Villes iconiques | Villes, quartiers et lieux immediatement identifiables. | 85 | dijon-ducs, dinan, collonges, brive |
| 29 | Villes nouvelles et modernite | Villes nouvelles, grands ensembles, urbanisme contemporain. | 35 | ville-nouvelle, evry-ville-nouvelle, la-defense, abraxas |
| 30 | Architecture moderne | Beton, modernisme, architectures singulieres et brutalistes. | 30 | abraxas-cinema, unesco-beton, maison-totale, art-defense |
| 31 | Jardins et paysages composes | Jardins, parcs, paysages dessines et sites amenages. | 40 | monet-jardin, bambouseraie, chaumont-jardins, jardins-chaumont |
| 32 | Insolite et records | Noms surprenants, faits etranges, records et curiosites. | 90 | condom-nom, zizim-insolite, source-mystere, bambouseraie-insolite |
| 33 | Langues et cultures regionales | Langues, cultures locales et identites regionales. | 50 | creole-guadeloupe, gateau-basque, occitan-rouergue, langue-corse-corte |
| 34 | Sports et aventures | Courses, montagnes sportives, stades, grands defis. | 35 | 24-heures-1923, alpe-huez, vendee-globe, asm-rugby |
| 35 | UNESCO et sites classes | Sites classes, labels patrimoniaux et paysages reconnus. | 35 | climats-bourgogne, unesco-reunion, lagon-unesco-nc, albi-cite-episcopale |
| 36 | Animaux et biodiversite | Faune, reserves, especes locales et biodiversite. | 45 | papillon-guadeloupe, phoques-baie, makis-mayotte, crocodile-nimes |
| 37 | Thermalisme et eaux | Eaux, sources, thermalisme, bains et stations de cure. | 30 | royat-thermale, cauterets-thermale, vichy, bareges-eaux |
| 38 | Fetes, marches et traditions | Fetes populaires, marches, foires et rituels locaux. | 60 | marches-noel-alsace, feria, foire-beaucaire, carnaval-martinique |
| 39 | Personnalites locales | Figures politiques, artistes, savants et personnages territoriaux. | 65 | mitterrand-jarnac, jacques-coeur, denis-papin, cesaire-fort-de-france |
| 40 | Sciences et inventions | Sciences, techniques, inventions, explorations et savoirs. | 35 | aeropostale, cite-espace, alfort-veterinaire, denis-papin |

Estimation totale couverte : environ 2500 a 2650 anecdotes themees, selon arbitrages et exclusions.

## 2. Table theme -> collection pour les themes multi-occurrences

Cette table couvre les themes qui apparaissent au moins deux fois dans les anecdotes validees. Elle donne une premiere base de mapping manuel.

| Theme | Occurrences | Collection proposee |
| --- | ---: | --- |
| aubrac | 4 | Montagnes et volcans |
| bd-angouleme | 4 | Cinema et BD |
| climats-bourgogne | 4 | UNESCO et sites classes |
| cognac | 4 | Vins, cidres et alcools |
| millevaches | 4 | Vallees, gorges et plateaux |
| salers | 4 | Fromages et terroirs |
| sancerre | 4 | Vins, cidres et alcools |
| alpes-mancelles | 3 | Montagnes et volcans |
| bayeux-tapisserie | 3 | Savoir-faire et artisanat |
| charente-fleuve | 3 | Fleuves et canaux |
| pate-pommes-terre | 3 | Cuisine locale |
| agneau-pre-sale | 2 | Cuisine locale |
| angouleme | 2 | Cinema et BD |
| ardoise-travassac | 2 | Savoir-faire et artisanat |
| arromanches | 2 | Guerres et memoire |
| aubazine | 2 | Cathedrales et abbayes |
| aubeterre | 2 | Cathedrales et abbayes |
| baie-saint-brieuc | 2 | Littoraux, iles et ports |
| boucles-seine | 2 | Fleuves et canaux |
| bourges-cathedrale | 2 | Cathedrales et abbayes |
| brehat | 2 | Littoraux, iles et ports |
| brive | 2 | Villes iconiques |
| brouage | 2 | Chateaux et fortifications |
| burons | 2 | Montagnes et volcans |
| cagouilles | 2 | Cuisine locale |
| calvados-eau-de-vie | 2 | Vins, cidres et alcools |
| camembert | 2 | Fromages et terroirs |
| canal-berry | 2 | Fleuves et canaux |
| canal-garonne | 2 | Fleuves et canaux |
| canal-nivernais | 2 | Fleuves et canaux |
| cancoillotte | 2 | Fromages et terroirs |
| cap-frehel | 2 | Phares, caps et cotes |
| champagne-berrichonne | 2 | Forets, marais et campagnes |
| collonges | 2 | Villes iconiques |
| croustade | 2 | Douceurs et patisseries |
| debarquement | 2 | Guerres et memoire |
| dijon-ducs | 2 | Histoire locale |
| dinan | 2 | Villes iconiques |
| estuaire-seine | 2 | Fleuves et canaux |
| ficelle-picarde | 2 | Cuisine locale |
| flammekueche | 2 | Cuisine locale |
| forestines | 2 | Douceurs et patisseries |
| fort-boyard | 2 | Chateaux et fortifications |
| gateau-broche | 2 | Douceurs et patisseries |
| gorges-tarn | 2 | Vallees, gorges et plateaux |
| granit-rose | 2 | Phares, caps et cotes |
| guerledan | 2 | Fleuves et canaux |
| hospices-beaune | 2 | Histoire locale |
| jacques-coeur | 2 | Personnalites locales |
| kougelhopf | 2 | Douceurs et patisseries |
| la-rochelle | 2 | Littoraux, iles et ports |
| lioran | 2 | Montagnes et volcans |
| lomagne | 2 | Cuisine locale |
| mitterrand-jarnac | 2 | Personnalites locales |
| moutarde-dijon | 2 | Cuisine locale |
| muma | 2 | Musees et arts |
| najac | 2 | Chateaux et fortifications |
| noirlac | 2 | Cathedrales et abbayes |
| noix-perigord | 2 | Cuisine locale |
| paimpol-islande | 2 | Monde maritime |
| pineau | 2 | Vins, cidres et alcools |
| resistance-ain | 2 | Resistance et maquis |
| rhin-frontiere | 2 | Frontieres |
| rochefort-arsenal | 2 | Monde maritime |
| roquefort | 2 | Fromages et terroirs |
| saint-flour | 2 | Villes iconiques |
| seuil-poitou | 2 | Vallees, gorges et plateaux |
| sologne | 2 | Forets, marais et campagnes |
| statues-menhirs | 2 | Antiquite et archeologie |
| teurgoule | 2 | Douceurs et patisseries |
| troglodytes | 2 | Villes iconiques |
| truffade | 2 | Cuisine locale |
| turenne | 2 | Chateaux et fortifications |
| vallee-lot | 2 | Vallees, gorges et plateaux |
| vallee-oise | 2 | Vallees, gorges et plateaux |
| ventadour | 2 | Chateaux et fortifications |
| vercors | 2 | Montagnes et volcans |
| vercors-resistance | 2 | Resistance et maquis |
| vezere | 2 | Fleuves et canaux |
| viaduc-millau | 2 | Trains, routes et ponts |
| vierzon | 2 | Industrie et mines |
| vix | 2 | Antiquite et archeologie |
| volaille-bresse | 2 | Cuisine locale |
| volcan-cantal | 2 | Montagnes et volcans |

## 3. Collections par taille

### Collections tres riches

Collections avec plus de 100 anecdotes potentielles ou proches de ce seuil :

- Histoire locale ;
- Outre-mer ;
- Littoraux, iles et ports ;
- Montagnes et volcans ;
- Cathedrales et abbayes ;
- Musees et arts ;
- Fleuves et canaux ;
- Insolite et records ;
- Villes iconiques ;
- Cuisine locale.

Ces collections doivent etre visibles rapidement, car elles peuvent produire une progression durable.

### Collections moyennes

Collections entre 40 et 100 anecdotes potentielles :

- Resistance et maquis ;
- Guerres et memoire ;
- Chateaux et fortifications ;
- Antiquite et archeologie ;
- Forets, marais et campagnes ;
- Vallees, gorges et plateaux ;
- Frontieres ;
- Fromages et terroirs ;
- Vins, cidres et alcools ;
- Douceurs et patisseries ;
- Industrie et mines ;
- Savoir-faire et artisanat ;
- Trains, routes et ponts ;
- Monde maritime ;
- Cinema et BD ;
- Musiques et festivals ;
- Langues et cultures regionales ;
- Animaux et biodiversite ;
- Fetes, marches et traditions ;
- Personnalites locales.

Ces collections sont les plus interessantes pour donner un sentiment d'accomplissement.

### Collections rares

Collections avec moins de 40 anecdotes potentielles :

- Jeanne d'Arc ;
- Litterature et ecrivains ;
- Villes nouvelles et modernite ;
- Architecture moderne ;
- Sports et aventures ;
- UNESCO et sites classes ;
- Thermalisme et eaux ;
- Sciences et inventions.

Ces collections ne doivent pas etre mises en avant comme objectifs principaux. Elles peuvent apparaitre comme decouvertes rares ou collections cachees.

## 4. Simulation joueur

Hypothese :

- une partie terminee expose passivement 4 anecdotes ;
- 92% des anecdotes validees possedent un theme ;
- une future couche `collection` regroupe les themes ;
- la selection reste globalement variee et non forcee.

### Apres 1 partie

Le joueur voit environ :

```text
Collections decouvertes : 3 ou 4
Gastronomie locale : 1/80
Littoraux, iles et ports : 1/110
Histoire locale : 1/180
```

Ressenti : la collection est visible, mais il ne faut pas encore parler de progression forte.

### Apres 5 parties

Environ 20 anecdotes visibles passivement.

Le joueur pourrait voir :

```text
Collections decouvertes : 12 a 18
Cuisine locale : 2/80
Histoire locale : 2/180
Outre-mer : 1/130
Musees et arts : 1/90
```

Ressenti : la diversite devient perceptible. Les collections sont des reperes, pas encore des objectifs.

### Apres 20 parties

Environ 80 anecdotes visibles passivement.

Le joueur pourrait voir :

```text
Collections decouvertes : 25 a 35
Histoire locale : 5/180
Littoraux, iles et ports : 4/110
Cuisine locale : 3/80
Resistance et maquis : 1/45
Chateaux et fortifications : 2/70
```

Ressenti : les collections deviennent une couche de retour au jeu. Le joueur commence a reconnaitre ses familles preferees.

### Apres 100 parties

Environ 400 anecdotes visibles passivement.

Simulation plausible :

```text
Histoire locale : 25/180
Outre-mer : 18/130
Littoraux, iles et ports : 16/110
Montagnes et volcans : 14/100
Musees et arts : 13/90
Cuisine locale : 12/80
Chateaux et fortifications : 10/70
Resistance et maquis : 7/45
Jeanne d'Arc : 1/8
```

Ressenti : la progression est nette, mais la completion totale reste lointaine. Il faut donc valoriser les paliers, pas seulement le 100%.

## 5. Atteignabilite et temps de completion

### Nombre de collections atteignables

Avec 40 collections :

- 10 a 15 collections peuvent etre vues en quelques parties ;
- 25 a 35 peuvent etre decouvertes apres 20 parties ;
- presque toutes peuvent etre vues apres 100 parties si les grilles varient suffisamment ;
- les collections rares resteront naturellement moins frequentes.

### Temps moyen pour completer

La completion totale d'une collection n'est pas un objectif realiste a court terme.

Ordres de grandeur :

| Taille de collection | Premiere decouverte | 5 decouvertes | 20 decouvertes | Completion totale |
| ---: | --- | --- | --- | --- |
| 8 anecdotes | rapide si exposee | possible | difficile | possible mais rare |
| 40 anecdotes | quelques parties | moyen terme | long terme | tres long |
| 80 anecdotes | rapide | moyen terme | long terme | quasi impossible sans mode dedie |
| 130+ anecdotes | rapide | moyen terme | long terme | non pertinent comme objectif joueur |

Il faut donc penser les collections comme des parcours ouverts :

- 1 decouverte : collection revelee ;
- 3 decouvertes : collection amorcee ;
- 5 decouvertes : collection active ;
- 10 decouvertes : collection avancee ;
- 20 decouvertes : collection majeure.

### Interet joueur

Les collections les plus interessantes sont celles qui combinent :

- nom immediatement comprehensible ;
- volume suffisant ;
- variete de departements ;
- imaginaire fort.

Exemples tres forts :

- Resistance et maquis ;
- Outre-mer ;
- Littoraux, iles et ports ;
- Gastronomie locale ;
- Chateaux et fortifications ;
- Montagnes et volcans ;
- Fleuves et canaux ;
- Insolite et records.

## 6. Recommandations de lancement

### Nombre optimal de collections au lancement

Recommandation :

- definir les 40 collections en interne ;
- afficher seulement 18 a 22 collections principales dans l'ecran statistiques ;
- afficher les collections rares uniquement apres decouverte.

Cette approche evite l'effet catalogue tout en gardant une architecture complete.

### Collections a afficher immediatement

Collections recommandees pour l'affichage public initial :

1. Histoire locale
2. Resistance et maquis
3. Guerres et memoire
4. Chateaux et fortifications
5. Cathedrales et abbayes
6. Fleuves et canaux
7. Littoraux, iles et ports
8. Montagnes et volcans
9. Outre-mer
10. Frontieres
11. Gastronomie locale, ou regroupement Cuisine + Fromages + Vins
12. Industrie et mines
13. Savoir-faire et artisanat
14. Cinema et BD
15. Musees et arts
16. Villes iconiques
17. Insolite et records
18. Langues et cultures regionales

Option : garder "Fromages", "Vins" et "Cuisine" comme sous-collections internes si l'interface reste simple.

### Collections a masquer au lancement

Collections a garder cachees ou secondaires :

- Jeanne d'Arc ;
- Litterature et ecrivains ;
- Villes nouvelles et modernite ;
- Architecture moderne ;
- Sports et aventures ;
- UNESCO et sites classes ;
- Thermalisme et eaux ;
- Sciences et inventions ;
- Jardins et paysages composes ;
- Animaux et biodiversite.

Raison : elles sont pertinentes, mais trop faibles ou trop specialisees pour etre des objectifs principaux des le premier affichage.

### Collections a surveiller

Collections a clarifier avant implementation :

- Patrimoine religieux : attention au mot "Saint" qui peut creer des faux positifs ;
- Chateaux et fortifications : attention a `fort` dans `rochefort` ;
- Outre-mer : peut devenir trop large si elle regroupe tout ;
- Gastronomie locale : peut etre une seule grosse collection ou trois collections separees ;
- Villes iconiques : risque de devenir un fourre-tout.

## 7. Regles de mapping recommandees

Pour eviter les confusions, le mapping doit suivre un ordre de priorite.

Exemple :

1. mapping manuel explicite ;
2. collections rares ou tres specifiques ;
3. collections historiques ;
4. collections geographiques ;
5. collections gastronomiques ;
6. collections culturelles ;
7. fallback `Autres decouvertes`.

Exemples d'arbitrage :

- `vercors-resistance` doit aller dans `Resistance et maquis`, pas dans `Montagnes et volcans` ;
- `rochefort-arsenal` doit aller dans `Monde maritime`, pas dans `Chateaux et fortifications` ;
- `moutarde-dijon` doit aller dans `Cuisine locale`, pas dans `Villes iconiques` ;
- `climats-bourgogne` doit aller dans `UNESCO et sites classes`, pas dans `Vins, cidres et alcools` ;
- `cap-frehel` doit aller dans `Phares, caps et cotes`, pas seulement dans `Littoraux, iles et ports`.

## 8. Forme produit recommandee

### Dans les cartes de resultat

Afficher :

```text
Collection : Resistance et maquis
```

Si nouvelle collection :

```text
Nouvelle collection : Resistance et maquis
```

Si collection deja connue :

```text
Resistance et maquis : 3 decouvertes
```

### Dans les statistiques

Afficher le top 3 ou top 5 :

```text
Collections decouvertes

Resistance et maquis     8/45
Chateaux et fortifications 12/70
Outre-mer                5/130
```

Pour les grandes collections, preferer les paliers :

```text
Histoire locale : palier 10 atteint
```

plutot que :

```text
Histoire locale : 10/180
```

Le ratio brut peut decourager si le denominateur est trop grand.

## 9. Decision recommandee avant implementation

Avant toute implementation :

1. valider la liste des 40 collections ;
2. choisir les 18 a 22 collections visibles au lancement ;
3. creer un fichier de taxonomie dedie, par exemple `src/data/collectionsTaxonomy.js` ;
4. ne pas modifier les anecdotes ;
5. mapper les themes vers les collections dans un service dedie ;
6. conserver `theme` pour l'anti-redondance fine ;
7. utiliser `collection` pour la progression joueur.

## Verdict

Le systeme de collections peut devenir une vraie mecanique produit, mais seulement si le joueur ne voit pas les 2513 themes bruts.

La bonne architecture est :

```text
theme = sujet editorial precis
collection = progression joueur lisible
famille = organisation produit
```

Avec 40 collections internes et 18 a 22 visibles au lancement, GeoDoku peut donner une sensation de progression sans perdre la finesse culturelle de ses anecdotes.
