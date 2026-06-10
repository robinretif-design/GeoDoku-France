# Produit Phase 07 - Polish UX des decouvertes

Date : 2026-06-10

## Objectif

Rendre plus lisibles les mecaniques deja presentes dans GeoDoku :

- rarete ;
- collections ;
- tendances locales ;
- decouvertes.

Cette phase ne cree aucune nouvelle mecanique. Elle harmonise uniquement l'affichage.

## Principe UX

Avant cette phase, les signaux etaient affiches separement :

- rarete ;
- collection ;
- tendance locale.

Cela pouvait produire un empilement de pastilles et de lignes informatives sur les cartes de resultat.

La Phase 07 introduit un composant commun de signalement :

- `DiscoveryBadge` ;
- `DiscoverySignals`.

## Hierarchie visuelle

Ordre de priorite retenu :

1. legendaire ;
2. tres rare ;
3. rare ;
4. collection ;
5. tendance locale.

Dans l'interface actuelle, une anecdote ne possede qu'un seul niveau de rarete. Le bloc affiche donc :

- le signal de rarete si l'anecdote est rare ou mieux ;
- le signal de collection si l'anecdote appartient a une collection ;
- la tendance locale en dernier, sur une ligne plus informative.

## Micro-messages ajoutes

Les micro-messages restent courts et non intrusifs :

- `Anecdote rare decouverte` ;
- `Anecdote tres rare decouverte` ;
- `Anecdote legendaire decouverte` ;
- `Nouvelle collection decouverte` ;
- `Collection enrichie` ;
- `Collection` ;
- `Tendance locale`.

Il n'y a pas de popup, pas de modale, pas d'interruption du parcours joueur.

## Surfaces concernees

### Cartes de resultat

Les anciennes lignes separees ont ete remplacees par un bloc unique :

- rarete ;
- collection ;
- tendance locale.

La tendance locale reste visible, mais elle est visuellement rattachee aux decouvertes au lieu d'apparaitre comme un paragraphe isole.

### Fiche departement

Le meme composant est utilise dans la section anecdote departementale.

La fiche reste centree sur :

1. le lieu remarquable ;
2. l'ancrage geographique ;
3. le score ;
4. l'explication ;
5. l'anecdote ;
6. les tags.

## Mobile first

Les styles ajoutent :

- retour a la ligne possible sur les libelles longs ;
- details tronques sur desktop si necessaire ;
- details multilignes sur mobile ;
- tendance locale en ligne pleine pour eviter l'effet de pastilles empilees ;
- couleurs sobres coherentes avec l'identite visuelle existante.

## Ce qui n'a pas change

- scoring ;
- gameplay ;
- grilles ;
- contenus editoriaux ;
- statuts de validation ;
- sources ;
- services metier ;
- selection des anecdotes ;
- anti-redondance theme ;
- statistiques locales ;
- logique de collections.

## Resultat attendu

Le joueur doit mieux comprendre que certaines anecdotes sont speciales, que les collections progressent, et que les tendances locales font partie de la couche vivante du jeu.

La Phase 07 rend donc visibles les mecanismes deja construits sans alourdir les regles.
