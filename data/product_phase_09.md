# Produit Phase 09 - Parcours joueur simule

Date : 2026-06-10

## Objectif

Verifier ce qu'un joueur voit reellement apres l'activation des collections joueur de la Phase 08, avant d'investir dans badges, polish UX ou nouvelles mecaniques.

Cette phase est un audit produit en lecture seule :

- aucun code modifie ;
- aucun contenu editorial modifie ;
- aucun statut modifie ;
- aucun gameplay modifie.

## Methode

La simulation part du parcours visible actuel :

- une partie terminee affiche 4 cartes de resultat avec anecdotes (`placedDepartments.slice(0, 4)`) ;
- une fiche departement peut afficher une anecdote supplementaire si le joueur l'ouvre, mais ce comportement n'est pas inclus dans la simulation de base ;
- les anecdotes affichees proviennent uniquement du moteur valide, avec fallback vers `dep.anecdote` si aucune anecdote validee n'existe ;
- les collections sont enregistrees seulement si l'anecdote possede un `theme` exploitable ;
- les tendances locales sont calculees depuis `localStorage`, sans backend.

Simulation effectuee sur 1 000 tirages par palier :

- nouveau joueur : 1, 3, 5 parties ;
- joueur regulier : 20, 50 parties ;
- joueur tres engage : 100 parties.

## Etat mesure

| Indicateur | Valeur |
|---|---:|
| Anecdotes editoriales totales | 3 311 |
| Anecdotes validees | 2 840 |
| Anecdotes encore a verifier | 471 |
| Departements jouables | 101 |
| Anecdotes validees liees aux departements jouables | 2 660 |
| Anecdotes jouables avec collection enregistrable | 2 435 |
| Anecdotes jouables validees sans theme | 225 |
| Anecdotes dans le JSON public | 2 840 |
| Anecdotes non validees dans le JSON public | 0 |
| Collections joueur totales | 40 |
| Collections visibles au lancement | 18 |
| Collections visibles vides au lancement | 0 |
| Collections masquees avec contenu | 22 |

## Resultats de simulation

| Profil | Parties | Anecdotes vues | Rares ou mieux | Collections decouvertes | Collections masquees revelees | Progression moyenne |
|---|---:|---:|---:|---:|---:|---:|
| Nouveau joueur | 1 | 4 | 0,1 | 3,3 | 0,9 | 1,8 % |
| Nouveau joueur | 3 | 12 | 0,3 | 7,5 | 2,2 | 2,3 % |
| Nouveau joueur | 5 | 20 | 0,5 | 10,5 | 3,5 | 2,9 % |
| Joueur regulier | 20 | 80 | 1,8 | 21,3 | 8,8 | 5,6 % |
| Joueur regulier | 50 | 200 | 4,5 | 29,9 | 14,1 | 10,0 % |
| Joueur tres engage | 100 | 400 | 9,2 | 35,1 | 17,9 | 17,2 % |

## Verification produit

| Point controle | Etat |
|---|---|
| Collections visibles au lancement | OK : 18 collections visibles |
| Collections masquees jusqu'a decouverte | OK : 22 collections masquees, revelees apres decouverte |
| Aucune collection vide affichee | OK : 0 collection vide visible au lancement |
| Aucune anecdote non validee exposee | OK : JSON public 2 840, non validees 0 |
| Donnees Phase 06 conservees | OK : les anciens themes sont migres vers une collection joueur |
| Rarete toujours affichee | OK : rare, tres rare et legendaire gardent un indicateur visible |
| Stats locales toujours affichees | OK : tendances disponibles des le resultat, mais peu robustes au debut |
| Anti-redondance theme active | OK : les 3 derniers themes sont evites quand une alternative existe |

## Lecture produit

La Phase 08 fonctionne : les collections deviennent visibles rapidement, sans afficher de collections vides et sans exposer d'anecdotes non validees.

Le gain joueur est reel des les premieres parties :

- apres 1 partie, un joueur voit deja environ 3 collections ;
- apres 5 parties, il a croise environ 10 collections ;
- apres 20 parties, la moitie du systeme de collections est deja perceptible.

Le probleme principal n'est plus l'absence de contenu. Le risque est maintenant la lisibilite :

- sur une carte de resultat, le joueur peut voir lieu, tendance locale, rarete, collection, titre et anecdote ;
- les anecdotes tres rares et legendaires sont mathematiquement tres peu visibles ;
- certaines collections tres vastes progressent lentement et peuvent sembler impossibles a completer ;
- les tendances locales existent des la premiere partie, mais restent peu credibles tant que les donnees sont strictement locales.

## Decision avant Phase 07

La Phase 07 de polish UX est justifiee.

Priorite recommandee :

1. harmoniser rarete, collection et tendance locale dans une seule zone legere ;
2. limiter l'empilement visuel sur mobile ;
3. rendre les micro-evenements plus explicites : nouvelle collection, collection enrichie, anecdote rare ;
4. ne pas ajouter de badges complexes avant d'avoir clarifie l'affichage existant.

## Conclusion

GeoDoku est maintenant jouable comme experience de decouverte, pas seulement comme grille de score.

La progression existe, mais elle doit etre mieux mise en scene. Le prochain chantier utile n'est pas de produire davantage de contenu, mais de rendre les signaux deja presents plus lisibles, plus gratifiants et moins disperses.
