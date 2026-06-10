# Produit Phase 10 - Audit de la rarete

Date : 2026-06-10

## Objectif

Determiner si la mecanique de rarete est suffisamment perceptible pour justifier un futur travail UX, sans modifier les raretes existantes.

Cette phase est un audit en lecture seule : aucun code, contenu, statut ou tag de rarete n'a ete modifie.

## Synthese

Le systeme de rarete existe techniquement et s'affiche correctement, mais il est encore trop discret comme mecanique produit.

Sur 2840 anecdotes validees :

- 2326 sont communes (81.9 %) ;
- 449 sont peu communes (15.8 %) ;
- 57 sont rares (2.0 %) ;
- 6 sont tres rares (0.2 %) ;
- 2 sont legendaires (0.1 %).

La rarete visible, c'est-a-dire rare ou mieux, represente seulement 65 anecdotes validees (2.3 %).

## Verdict produit

La rarete est assez faible pour garder un effet de surprise, mais pas assez frequente pour porter seule une mecanique de collection visible.

Etat actuel :

- 1 partie : environ 0.09 anecdote rare+ attendue, 8.9 % de chance d'en voir au moins une ;
- 5 parties : 37.2 % de chance d'en voir au moins une ;
- 20 parties : 84.8 % ;
- 100 parties : rare+ quasi garantie, mais legendaire seulement 27.8 % de chance.

## Probleme principal

Le stock est domine par le niveau commune. Ce n'est pas un probleme editorial, mais c'est un probleme de perception : un joueur peut jouer plusieurs sessions sans jamais percevoir la rarete comme une mecanique structurante.

Les niveaux tres rare et legendaire sont surtout symboliques : ils existent, mais ils ne seront probablement pas vus par la majorite des joueurs MVP.

## Recommandation MVP

Ne pas retoucher les raretes maintenant.

Avant toute modification editoriale, la meilleure option est un ajustement de selection futur :

- garder le tirage naturel la plupart du temps ;
- augmenter legerement la probabilite de tirer une anecdote rare+ quand le joueur n'en a pas vue depuis plusieurs parties ;
- ne jamais garantir une legendaire ;
- afficher un signal UX clair quand une rarete apparait.

Objectif recommande : une anecdote rare+ toutes les 5 a 10 parties en ressenti joueur, et une tres rare toutes les 30 a 50 parties.

## Calibrage recommande

Le calibrage Equilibre est le meilleur horizon produit :

- assez rare pour garder de la valeur ;
- assez frequent pour etre percu ;
- compatible avec une future logique de tirage pondere sans changer toutes les donnees.

Le calibrage Collectionneur est trop genereux pour GeoDoku : il transforme la rarete en ressource frequente et risque de banaliser le signal.

## Decision avant UX

Un polish UX de rarete est utile, mais seulement s'il reste sobre. La rarete ne doit pas prendre le dessus sur la decouverte territoriale.

Priorite UX future : rendre chaque rarete visible quand elle arrive, pas essayer de l'afficher plus souvent artificiellement dans l'interface.
