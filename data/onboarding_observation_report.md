# Observation onboarding - GevoCroisee

Date : 13/06/2026

Objectif : identifier ce qu'un nouveau joueur doit comprendre dans les 20 premieres secondes.

Perimetre : observation produit uniquement. Aucune modification du code, des regles, du scoring ou des grilles.

## Lecture rapide

L'accueil transmet correctement le rendez-vous quotidien et l'action principale. Le joueur sait probablement qu'il peut lancer une grille du jour autour des departements francais.

La comprehension fine du jeu est plus fragile : le joueur peut ne pas comprendre tout de suite que chaque case accepte plusieurs departements possibles, que ces reponses ne se valent pas, et que le score recompense l'optimisation plutot que la simple exactitude.

## Tableau d'observation

| Message a comprendre | Ou il apparait actuellement | Visibilite | Risque de confusion | Recommandation eventuelle |
|---|---|---|---|---|
| 1. C'est une grille quotidienne : une nouvelle grille est publiee chaque jour. | Accueil : titre "La grille du jour.", badge "Grille du jour", sous-titre "Une nouvelle grille chaque jour, les anciennes a rejouer plus tard.", bouton "Jouer la grille du jour". | Forte | Faible | Message deja bien porte par l'accueil. A conserver comme pilier du premier ecran. |
| 2. Le joueur doit placer des departements francais dans une grille 3 x 3. | Accueil : "choisissez les departements". Regles : "Touchez une case, choisissez un departement, puis remplissez les 9 cases". Ecran de jeu : "Touchez une case, puis choisissez un departement dans la liste." | Moyenne | Moyen | L'action est claire apres lancement, mais l'accueil ne montre pas encore explicitement le format 3 x 3. Observer si les testeurs comprennent avant de cliquer. |
| 3. Chaque case est un croisement entre deux indices. | Accueil : "Croisez les indices". Regles : "une grille 3 x 3 croise plusieurs themes". Ecran de jeu : structure ligne/colonne visible une fois la grille affichee. | Moyenne | Moyen | Le mot "croisez" est juste, mais abstrait avant de voir la grille. Recommandation possible : renforcer ce message au premier contact avec la grille, pas forcement sur l'accueil. |
| 4. Plusieurs departements peuvent fonctionner, mais certains rapportent plus de points. | Regles : "Plusieurs reponses peuvent fonctionner". Accueil : "departements qui collent le mieux". Resultat et cases : score par case sur 9, statut de pertinence, bilan de grille. | Faible a moyenne | Fort | Message essentiel mais pas assez visible dans les 20 premieres secondes si l'utilisateur ne lit pas les regles. C'est le principal risque d'onboarding. |
| 5. Le score recompense la pertinence, les choix rares et une grille bien composee. | Regles : "Le score, sur 101, recompense une grille coherente et des choix bien places." Resultats : points de cases, bonus choix rare, diversite, grille completee. Fiche departement : score de case, tags actives, choix rare. | Faible | Fort | Trop tardif pour une premiere comprehension. Le joueur peut croire a un quiz vrai/faux. A tester : une micro-explication contextuelle apres la premiere case ou avant validation. |

## Messages absents, peu visibles ou ambigus

### Message absent ou presque absent

"Un departement peut etre valide sans etre optimal."

Ce message est central pour eviter la confusion avec un quiz classique. Il est deduisible depuis les scores de case, mais il n'est pas formule directement dans le premier parcours.

Risque : le joueur peut percevoir un score faible comme une sanction arbitraire si son departement lui paraissait plausible.

### Message peu visible

"Le choix rare est une strategie de score, pas seulement une anecdote rare."

Le produit utilise plusieurs signaux de rarete : choix rare, anecdote rare, pourcentage de tentative, departement prestigieux. Cette richesse peut brouiller la definition pendant la premiere partie.

Risque : le joueur peut ne pas comprendre pourquoi un choix est rare, ou confondre rarete culturelle et rarete de scoring.

### Message ambigu

"Les anciennes grilles seront accessibles apres deblocage."

L'accueil dit que les anciennes sont "a rejouer plus tard". Le message est correct, mais il peut etre compris comme une promesse future vague plutot que comme un systeme d'archives debloquees jour apres jour.

Risque : faible au jour 1, plus important si le joueur cherche immediatement du contenu supplementaire.

## Evaluation par priorite

### A securiser en test utilisateur

1. Les joueurs comprennent-ils qu'il faut optimiser une grille, pas trouver une seule bonne reponse ?
2. Les joueurs comprennent-ils le score de case apres leur premier choix ?
3. Les joueurs comprennent-ils ce que signifie "choix rare" ?

### Deja solide

1. Identification de la grille du jour.
2. Promesse d'une nouvelle grille quotidienne.
3. Bouton principal de lancement.

### A observer sans corriger immediatement

1. Besoin reel d'expliquer le format 3 x 3 avant le clic.
2. Comprehension des archives au jour 1.
3. Reaction au score sur 101.

## Conclusion

Dans les 20 premieres secondes, GevoCroisee explique bien son rituel, mais pas encore toute sa logique strategique.

Le message le plus critique est : plusieurs departements peuvent fonctionner, mais le score mesure lequel colle le mieux au croisement. C'est ce message qu'il faut observer en priorite pendant les premiers tests reels.
