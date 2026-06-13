# Audit critique produit - GevoCroisee

Date : 13/06/2026

Perimetre : analyse produit, game design et premiere experience utilisateur avant tests reels.

Contraintes respectees :

- aucune modification du code ;
- aucune modification des regles ;
- aucune modification du scoring ;
- aucune modification des 365 grilles ;
- aucune modification des anecdotes ou medias.

## Synthese

GevoCroisee a une proposition forte : transformer les departements francais en jeu quotidien de croisements, entre geographie, culture generale et intuition. Le produit a deja plusieurs atouts rares pour un MVP : un format quotidien clair, un score final, des archives, des fiches departement, des anecdotes, des collections et un potentiel de partage.

Le principal risque n'est pas la profondeur du jeu. Au contraire, le jeu a beaucoup de matiere. Le risque est que le joueur debutant ne voie pas assez vite la structure mentale attendue : une case n'appelle pas une unique bonne reponse, mais un departement plus ou moins pertinent selon deux indices. Cette subtilite est interessante, mais elle demande un cadrage tres net dans les 30 premieres secondes.

Le scoring est coherent cote moteur, mais partiellement opaque cote joueur. Le joueur voit des notes, un total sur 101 et plusieurs bonus, mais il peut ne pas comprendre immediatement comment passer de "j'ai trouve un departement qui marche" a "j'ai optimise ma grille". Le bonus de rarete est surtout explique apres coup, dans les fiches et les resultats. Il est moins evident pendant la prise de decision.

Verdict produit : prometteur, distinctif, testable, mais avec un besoin fort de clarification avant un test large. Les premiers tests utilisateurs doivent observer en priorite la comprehension du scoring, la perception des choix rares et le desir de revenir le lendemain.

## 1. Analyse du onboarding

### Ce que l'utilisateur comprend probablement en moins de 30 secondes

L'accueil actuel donne bien trois informations :

- il existe une grille du jour ;
- le jeu porte sur les departements francais ;
- une nouvelle grille arrive chaque jour.

Le bouton principal "Jouer la grille du jour" est clair. Le titre "La grille du jour." et le sous-titre "Une nouvelle grille chaque jour, les anciennes a rejouer plus tard" installent correctement le rituel quotidien.

Le joueur comprend probablement qu'il doit lancer une grille et placer des departements. Cette partie est suffisamment directe.

### Ce qui reste fragile

La notion centrale du jeu, "plusieurs reponses peuvent etre valides", est presente dans les regles, mais elle n'est pas encore assez visible dans l'accueil ou dans les premieres secondes de la grille. Un joueur peut arriver avec un reflexe de quiz : trouver LA bonne reponse. Or le jeu fonctionne plutot comme une optimisation de pertinence.

Le joueur ne comprend pas forcement, avant d'avoir joue, que :

- chaque case croise une ligne et une colonne ;
- un departement peut etre "valide" sans etre optimal ;
- le score de case depend de la qualite du croisement ;
- un choix rare est lie a un departement moins evident ou plus prestigieux ;
- la grille complete ajoute une couche strategique.

Ces elements existent, mais ils sont disperses : regles, score de case, fiche departement, resultat final. Pour un premier joueur, la logique peut se reveler seulement apres une premiere validation.

### Reponses aux questions de comprehension

| Question | Reponse probable | Risque |
|---|---|---|
| Que dois-je faire ? | Placer des departements dans une grille. | Faible |
| Comment gagner des points ? | Reponses justes, mais les details restent flous. | Moyen |
| Pourquoi plusieurs reponses peuvent etre valides ? | Compris seulement si les regles sont ouvertes ou apres une case notee. | Moyen |
| Qu'est-ce qu'un choix rare ? | Pas immediatement clair avant resultat ou fiche. | Fort |
| Pourquoi revenir demain ? | La grille quotidienne est claire. | Faible a moyen |

### Diagnostic onboarding

Le jeu est comprehensible en surface, mais pas encore pleinement en profondeur. Le joueur peut commencer vite, ce qui est bon. En revanche, il risque de ne pas comprendre la promesse strategique avant d'avoir deja fait des choix.

Le meilleur onboarding pour ce produit n'est probablement pas un tutoriel long. Il faut plutot une micro-explication contextuelle au moment ou le joueur touche sa premiere case : "Plusieurs departements peuvent fonctionner. Le score mesure lequel colle le mieux aux deux indices." Cette piste serait a tester, pas a appliquer automatiquement sans validation.

## 2. Analyse du scoring

### Structure actuelle

Le score a plusieurs couches :

- score de case sur 9 ;
- points de cases ;
- bonus choix rare ;
- bonus diversite ;
- bonus grille complete ;
- score total sur 101 ;
- rang final ;
- meilleur choix mis en avant.

Cote game design, cette structure est interessante. Elle permet d'avoir des reponses partiellement bonnes, des arbitrages, des optimisations et une marge de progression. Elle evite le binaire vrai/faux, ce qui differencie GevoCroisee de nombreux quiz geographiques.

### Intuitivite

Le score de case sur 9 est probablement le signal le plus intuitif. Une case remplie qui affiche "7/9 - Tres pertinent" donne un retour rapide et comprehensible.

Le score total sur 101 est plus original, mais moins immediat. Il peut intriguer positivement, mais il peut aussi sembler arbitraire. Un joueur comprend "j'ai 62/101", mais pas forcement pourquoi 101, ni comment gagner les derniers points.

Les bonus sont utiles pour donner de la profondeur, mais ils demandent une lecture plus experte :

- "Points de cases" est clair ;
- "Grille completee" est clair ;
- "Diversite" est assez clair, mais son effet exact reste flou ;
- "Bonus choix rare" est attractif, mais sa definition est incertaine ;
- le bonus risque/prestige existe techniquement, mais n'est pas expose comme une ligne distincte dans l'interface.

### Bonus de rarete

La rarete melange plusieurs perceptions possibles :

- rarete d'un departement dans l'imaginaire du joueur ;
- prestige du departement dans les donnees ;
- faible probabilite estimee que d'autres joueurs tentent ce choix ;
- anecdote rare decouverte ;
- choix optimal mais inattendu.

Ces couches sont riches, mais elles peuvent se concurrencer. Quand le resultat dit "Seulement 7% des joueurs auraient probablement tente ce choix", le joueur peut croire a une statistique communautaire reelle. Si ce taux est simule ou derive localement, il faut etre prudent dans le wording produit.

Le terme "choix rare" est motivant, mais il doit etre compris comme un concept de jeu. Sinon, un joueur risque de penser : "Pourquoi ce departement est rare ?" ou "Rare par rapport a quoi ?".

### Resultats et envie de rejouer

L'ecran de resultat donne plusieurs accroches :

- score global ;
- rang ;
- meilleur choix ;
- decomposition des points ;
- commentaire de progression ;
- anecdotes ;
- fiche departement ;
- partage ;
- rejouer quand c'est possible.

Ces elements donnent envie de comprendre et d'ameliorer son score. Le point fort est le "meilleur choix" : il transforme la correction en moment valorisant. Le joueur voit ce qu'il a bien fait, pas seulement ce qu'il a rate.

Le risque est la surcharge. Apres une premiere partie, le joueur peut devoir traiter en meme temps le score, les bonus, la rarete, une anecdote, une collection, une tendance locale, un lieu, une fiche et le partage. Pour un joueur motive, c'est riche. Pour un joueur novice, c'est dense.

### Zones de confusion probables

1. "Valide" ne veut pas dire "meilleur choix".
2. Un departement evident peut marcher mais rapporter moins qu'un choix plus fin.
3. Le score de case et le score total ne sont pas la meme chose.
4. Le bonus de rarete peut etre confondu avec la rarete des anecdotes.
5. Les pourcentages de tentative peuvent etre pris pour des statistiques nationales.
6. La diversite regionale et de tiers est probablement invisible pendant la partie.
7. Le joueur ne sait pas toujours s'il doit completer vite ou optimiser lentement.

## 3. Analyse de la retention

### Elements qui incitent deja a revenir

Le rituel quotidien est le principal levier. "Une nouvelle grille chaque jour" place GevoCroisee dans la famille Wordle/Cemantix : un rendez-vous court, partageable, renouvelable.

Les archives deja debloquees soutiennent la retention secondaire : un joueur qui decouvre le jeu au jour 3 peut rejouer les jours precedents. Cela evite la frustration d'avoir manque le lancement.

Les statistiques personnelles peuvent creer une motivation d'amelioration : meilleur score, moyenne, parties jouees, coups de maitre, departement favori.

Les collections et anecdotes peuvent creer une retention exploratoire : revenir pour decouvrir de nouveaux lieux, themes ou departements.

### Elements encore trop faibles

Le retour demain est annonce, mais il n'est pas encore dramatise. Le joueur sait qu'il y aura une autre grille, mais ne ressent pas necessairement une tension de rendez-vous.

Le partage existe, mais on ne sait pas si la sortie partagee est suffisamment lisible, competitive ou expressive pour susciter une boucle sociale.

Les statistiques sont peu parlantes au premier lancement. Elles prennent de la valeur apres plusieurs parties, mais elles ne motivent pas encore fortement le joueur debutant.

Les collections sont riches mais secondaires. Elles sont probablement decouvertes apres coup, pas encore percues comme une raison principale de revenir.

La progression quotidienne n'a pas encore de promesse simple du type "gardez votre serie", "ameliorez votre meilleur rang" ou "decouvrez un nouveau territoire chaque jour". Ajouter une telle promesse serait un choix produit a tester, pas une correction urgente.

### Leviers a renforcer sans modifier le coeur du jeu

Priorites possibles :

- mieux expliquer que la grille du jour est un rendez-vous ;
- rendre le partage plus comprehensible et plus fier ;
- clarifier les rangs et leur progression ;
- afficher une phrase de fin orientee retour : "Revenez demain pour une nouvelle grille" ;
- rendre les archives plus clairement secondaires : "deja debloquees" plutot que simple stock ;
- rendre les collections visibles seulement quand elles apportent une emotion, pas comme un tableau de bord froid.

## 4. Analyse emotionnelle

### Moments de satisfaction

Le premier moment satisfaisant est le remplissage d'une case. Voir un departement apparaitre avec un score donne un feedback immediat.

Le deuxieme moment est la reconnaissance d'une association personnelle : "ce departement colle bien a ces deux indices". C'est le coeur emotionnel du jeu. GevoCroisee fonctionne quand le joueur se sent intelligent, cultive ou intuitif.

Le troisieme moment est le resultat qui valorise un meilleur choix. Le bloc "Votre meilleur choix" cree un moment de fierte, meme avec un score global faible.

Les anecdotes et fiches departement peuvent produire un plaisir de decouverte. Elles donnent au jeu une personnalite plus culturelle qu'un simple puzzle abstrait.

### Moments de frustration

La liste des departements est longue. Sur mobile, choisir parmi beaucoup de chips peut etre fatigant, surtout si le joueur ne sait pas quel departement chercher.

Le joueur peut etre frustre si une reponse qu'il pense valable obtient un score faible. Sans explication immediate, il peut percevoir le moteur comme arbitraire.

La validation d'une grille incomplete peut donner un score tres bas. C'est utile techniquement, mais emotionnellement delicat : le joueur peut avoir l'impression d'avoir "rate" alors qu'il decouvrait encore les regles.

Les resultats riches peuvent creer une fatigue cognitive. Le joueur a fini un puzzle et doit ensuite interpreter plusieurs couches d'information.

### Risques d'abandon en premiere partie

1. Le joueur ne comprend pas qu'il faut d'abord selectionner une case avant de choisir un departement.
2. Le joueur est intimide par la liste complete des departements.
3. Le joueur pense qu'il doit connaitre parfaitement la France pour jouer.
4. Le joueur choisit un departement plausible, obtient peu de points et ne comprend pas pourquoi.
5. Le joueur valide trop tot, obtient un score faible et ne percoit pas l'interet de rejouer.
6. Le joueur lit les resultats comme une correction dense plutot que comme une invitation a progresser.

## 5. Analyse concurrentielle theorique

### Wordle

Wordle gagne par simplicite radicale : une action evidente, un feedback couleur immediat, une contrainte quotidienne et un partage iconique. Le joueur comprend le jeu en quelques secondes.

GevoCroisee est plus riche culturellement, mais moins instantane. Sa force est la profondeur des associations et la decouverte territoriale. Sa faiblesse relative est la charge cognitive initiale.

Positionnement : moins universel que Wordle, mais potentiellement plus riche pour un public qui aime culture generale, geographie et optimisation.

### Cemantix

Cemantix repose sur une boucle de feedback continue : chaque mot donne une temperature, le joueur ajuste. La frustration est forte, mais la progression est lisible.

GevoCroisee a une boucle plus structuree mais moins fluide : on fait des placements, puis on lit un score. Le feedback par case aide, mais la recherche dans une liste de departements peut ralentir l'experimentation.

Positionnement : moins hypnotique que Cemantix, mais plus accessible si le sujet interesse le joueur.

### Pedantix

Pedantix attire par la decouverte progressive d'un texte cache. Le plaisir vient de la revelation et de l'enquete.

GevoCroisee partage ce plaisir de revelation culturelle via les anecdotes et les fiches. En revanche, Pedantix a un objectif unique tres clair : deviner la page. GevoCroisee a un objectif plus nuance : composer la meilleure grille.

Positionnement : plus visuel et plus geographique, mais doit clarifier son objectif optimal.

### GeoGuessr

GeoGuessr a une accroche emotionnelle immediate : voir un lieu et essayer de le situer. L'immersion visuelle est tres forte.

GevoCroisee est moins spectaculaire visuellement au depart, mais plus editorial et plus strategique. Il demande de raisonner sur des categories plutot que de reconnaitre une image.

Positionnement : moins immersif, plus cerebral. Peut seduire un public qui aime les cartes, les departements et les jeux de connaissances sans pression.

### Travle

Travle propose un objectif geographique clair : relier des pays ou territoires. La progression est tangible, avec une logique spatiale forte.

GevoCroisee est moins spatialement evident, car les croisements sont thematiques. Sa promesse est plus culturelle que cartographique. C'est une force distinctive, mais aussi une faiblesse pour les joueurs qui attendent une logique geographique concrete.

Positionnement : plus original editorialement, moins immediatement lisible comme puzzle geographique.

### Bilan concurrentiel

Forces relatives :

- proposition culturelle distinctive ;
- theme francais identifiable ;
- format quotidien compatible avec les habitudes Wordle-like ;
- profondeur superieure a un quiz binaire ;
- potentiel d'apprentissage et de conversation.

Faiblesses relatives :

- onboarding moins instantane ;
- scoring plus opaque ;
- feedback moins iconique que les couleurs Wordle ;
- partage probablement moins viral sans format tres lisible ;
- expertise percue potentiellement intimidante.

## 6. Priorisation

### Forces majeures du produit

1. Concept distinctif : croiser des indices pour choisir des departements.
2. Format quotidien deja clair.
3. Profondeur culturelle via anecdotes, lieux et fiches departement.
4. Scoring non binaire qui valorise les bonnes approximations.
5. Archives debloquees sans exposition des grilles futures.
6. Potentiel de progression personnelle avec stats, rangs et collections.
7. Ton moins punitif qu'un quiz classique.

### Faiblesses majeures du produit

1. La logique "plusieurs reponses valides mais pas equivalentes" n'est pas assez immediate.
2. Le bonus choix rare est motivant mais conceptuellement ambigu.
3. Le score sur 101 peut sembler arbitraire.
4. La liste des departements peut intimider ou ralentir sur mobile.
5. Les resultats peuvent etre trop denses pour une premiere partie.
6. Les statistiques et collections ont une valeur faible au tout debut.
7. La boucle de retour quotidien manque encore d'une phrase ou d'un rituel memorable.

### Ameliorations a fort impact

Ces ameliorations ne changeraient pas le coeur du jeu, mais doivent etre validees par test avant implementation.

1. Ajouter une micro-explication contextuelle au premier choix de case.
   Exemple de promesse : "Plusieurs departements peuvent marcher. Le score mesure lequel colle le mieux aux deux indices."

2. Clarifier le "choix rare" dans les resultats.
   Objectif : distinguer choix rare, anecdote rare et statistique de tentative.

3. Simplifier la premiere lecture du resultat.
   Objectif : montrer d'abord score, meilleur choix, un conseil de progression, puis les details.

4. Renforcer le rituel de retour.
   Objectif : finir une partie avec une phrase simple : nouvelle grille demain, archives deja debloquees disponibles.

5. Mieux guider la recherche departement sur mobile.
   Sans changer les regles, il faudrait tester si un tri, une recherche ou une reduction progressive de la liste est necessaire. C'est potentiellement tres impactant, mais plus proche d'une vraie fonctionnalite.

6. Rendre le partage plus expressif.
   Objectif : faire comprendre le score, le rang et les cases fortes en un bloc partageable.

### Ameliorations a faible impact

1. Ajouter plus de texte dans les regles.
   Risque : alourdir sans ameliorer la comprehension immediate.

2. Afficher davantage de statistiques avant plusieurs parties.
   Risque : donner de l'importance a des donnees encore vides.

3. Ajouter de nouveaux badges de rarete.
   Risque : augmenter la confusion rarete/collection/anecdote.

4. Multiplier les anecdotes sur l'accueil.
   Risque : detourner de l'action principale.

5. Rendre les archives plus visibles au jour 1.
   Ce serait contradictoire avec la logique quotidienne validee.

## 7. Recommandation pour les tests utilisateurs reels

Le test doit verifier moins "est-ce que le jeu marche ?" que "qu'est-ce que le joueur croit etre en train de faire ?".

Questions a poser pendant ou apres la premiere partie :

1. Que pensais-tu devoir faire en arrivant ?
2. As-tu compris qu'une case pouvait accepter plusieurs departements ?
3. As-tu compris pourquoi ton departement a obtenu ce score ?
4. Que signifie pour toi "choix rare" ?
5. Le score final t'a-t-il donne envie d'ameliorer quelque chose ?
6. Qu'est-ce qui t'a donne envie, ou non, de revenir demain ?
7. A quel moment as-tu hesite ?
8. La liste des departements t'a-t-elle aide ou bloque ?
9. Les anecdotes t'ont-elles donne l'impression de decouvrir quelque chose ?
10. Le resultat t'a-t-il paru clair ou trop charge ?

Signaux a observer :

- temps avant clic sur "Jouer la grille du jour" ;
- ouverture ou non des regles ;
- premiere hesitation sur la grille ;
- temps passe avant premier departement choisi ;
- reaction au premier score de case ;
- reaction au score final ;
- comprehension spontanee du bonus choix rare ;
- envie declaree de partager ou revenir.

## Conclusion

GevoCroisee possede une vraie singularite : ce n'est ni un quiz pur, ni un jeu de carte pur, ni un Wordle clone. Sa valeur vient du croisement entre intuition, culture territoriale et optimisation douce.

Le produit est deja suffisamment solide pour un test utilisateur reel, mais les tests doivent se concentrer sur la comprehension. Si les joueurs comprennent rapidement que le but n'est pas seulement de trouver une reponse, mais de trouver une bonne reponse parmi plusieurs possibles, le coeur du jeu a de fortes chances de fonctionner.

Le chantier prioritaire n'est pas d'ajouter plus de contenu. Le stock est deja large. Le chantier prioritaire est de rendre la promesse strategique plus lisible dans la premiere minute, puis de verifier que le score final transforme la curiosite en envie de rejouer.
