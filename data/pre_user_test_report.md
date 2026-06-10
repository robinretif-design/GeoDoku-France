# Phase 11 - Pre-test utilisateur

Date : 2026-06-10

## Objectif

Verifier que GeoDoku est pret a etre teste par un vrai joueur sans ajouter de nouvelle fonctionnalite.

Cette phase ne modifie aucun code, aucun contenu editorial, aucun statut et aucune regle de gameplay.

## Recommandation finale

Statut : **pret avec reserves**.

GeoDoku est pret pour une session de test humain encadree. Les mecaniques principales sont en place, le build passe, les anecdotes publiques sont filtrees correctement et les couches produit recentes sont visibles.

Reserves avant test large :

- valider visuellement le rendu mobile sur un vrai navigateur ;
- surveiller la surcharge des cartes de resultat ;
- expliquer au testeur que les statistiques locales sont faibles au debut ;
- accepter que la rarete soit volontairement discrete ;
- ne pas optimiser le gros chunk Vite avant retour utilisateur.

## Verification technique rapide

| Point | Etat |
|---|---|
| Build production | OK |
| Bundle JS | 2 072,41 kB brut, 456,16 kB gzip |
| Avertissement Vite gros chunk | Present, connu, acceptable MVP |
| Anecdotes editoriales | 3 311 |
| Anecdotes validees | 2 840 |
| Anecdotes a verifier | 471 |
| JSON public | 2 840 anecdotes |
| Non-validees dans JSON public | 0 |
| Services metier modifies en Phase 11 | Non |
| Gameplay modifie en Phase 11 | Non |

Commande executee :

```text
npm.cmd run build
```

Resultat : build OK avec l'avertissement Vite deja connu sur le gros chunk.

## 1. Parcours complet

### Lancement

Etat attendu :

- l'accueil affiche l'edition du jour ;
- les boutons principaux sont visibles : jouer, editions precedentes, statistiques, regles ;
- si l'edition du jour est deja terminee, le joueur voit le message correspondant et peut consulter son resultat.

Points a tester :

- comprehension immediate du bouton de lancement ;
- comprehension du bouton `Editions precedentes` ;
- absence de confusion entre edition du jour et archives.

### Partie

Etat attendu :

- le joueur selectionne une case ;
- les departements deviennent cliquables ;
- un departement deja utilise devient indisponible ;
- la grille reste lisible, y compris quand les noms longs apparaissent.

Point de vigilance :

- sur mobile, la grille 3x3 est large et doit rester manipulable sans debordement incoherent.

### Reponse correcte

Definition fonctionnelle actuelle :

- une reponse forte correspond a un score de case eleve ;
- le moteur d'anecdotes utilise le contexte `bonne_reponse` pour les placements a partir de 7/9.

Etat attendu :

- la case affiche le departement et le score ;
- l'ecran resultat valorise le placement ;
- la fiche departement explique les tags actives et le score.

### Reponse incorrecte ou faible

Definition fonctionnelle actuelle :

- une reponse faible correspond a un score de case bas ;
- le moteur d'anecdotes utilise le contexte `mauvaise_reponse` pour les placements a 4/9 ou moins.

Etat attendu :

- la case affiche quand meme le departement choisi ;
- le score de case rend visible que le placement est faible ;
- l'anecdote peut rester une decouverte, sans sanction UI agressive.

### Affichage anecdote

Etat attendu :

- les cartes de resultat affichent jusqu'a 4 anecdotes ;
- la fiche departement affiche l'anecdote dynamique si disponible ;
- si aucune anecdote validee n'est disponible, le fallback `dep.anecdote` reste utilise.

Garantie :

- une anecdote non validee est rejetee avant affichage par le moteur existant.

### Rarete

Etat attendu :

- commune et peu commune ne creent pas de badge ;
- rare, tres rare et legendaire creent un message court ;
- les messages sont sobres : `Anecdote rare decouverte`, `Anecdote tres rare decouverte`, `Anecdote legendaire decouverte`.

Point de vigilance :

- la rarete est rare par conception : un testeur peut ne pas en voir pendant une courte session.

### Collection

Etat attendu :

- une anecdote avec collection affiche un signal collection ;
- une nouvelle collection affiche `Nouvelle collection decouverte` ;
- une collection deja connue affiche `Collection enrichie` ou `Collection` ;
- la progression apparait sous une forme courte.

Point de vigilance :

- le systeme compte 40 collections, dont 18 visibles au lancement et 22 masquees jusqu'a decouverte.

### Tendance locale

Etat attendu :

- la tendance locale apparait sur les cartes de resultat ;
- elle est integree au bloc de decouverte ;
- elle reste locale au navigateur.

Point de vigilance :

- a la premiere partie, les donnees sont peu robustes et doivent etre lues comme un signal en construction.

### Ecran statistiques

Etat attendu :

- meilleur score ;
- parties jouees ;
- moyenne ;
- anecdotes rares ;
- legendaires ;
- coups de maitre ;
- departement favori ;
- section Collections.

Point de vigilance :

- l'ecran est plus utile apres plusieurs parties qu'a la premiere ouverture.

## 2. Lisibilite mobile

### Cartes de resultat

Etat attendu :

- les cartes restent lisibles en colonne ;
- les badges ne debordent pas ;
- la tendance locale prend une ligne complete ;
- le bouton `A propos du departement` reste accessible.

Risque :

- une carte peut contenir beaucoup d'informations : lieu, score, taux simule, tendance, collection, titre, anecdote.

### Fiche departement

Etat attendu :

- le lieu remarquable reste l'entree principale ;
- l'ancrage departement / code / region est visible ;
- le bloc score reste lisible ;
- les tags restent en dernier et discrets.

Risque :

- les noms longs de regions, lieux ou collections doivent etre verifies sur petit ecran.

### Badges

Etat attendu :

- rarete prioritaire ;
- collection ensuite ;
- tendance locale ensuite ;
- pas d'empilement visuel excessif.

### Collections

Etat attendu :

- l'ecran statistiques affiche les collections visibles ;
- aucune collection vide ne doit apparaitre ;
- les collections masquees apparaissent uniquement apres decouverte.

### Tendances

Etat attendu :

- les tendances sont comprehensibles ;
- elles ne doivent pas etre percues comme statistiques nationales ;
- le libelle `Tendance locale` doit aider a cadrer le sens.

## 3. Donnees

| Donnee | Etat |
|---|---|
| Anecdotes validees disponibles | 2 840 |
| Anecdotes non validees exposees | 0 |
| JSON public | OK |
| Fallback vers `dep.anecdote` | OK |
| Donnees a verifier encore presentes | 471 |

Verification effectuee :

- `getValidatedAnecdotes()` retourne 2 840 anecdotes ;
- `public/data/anecdotes-valides.json` contient 2 840 anecdotes ;
- comparaison avec la base editoriale : 0 anecdote publique non validee.

## 4. localStorage

### Cles preservees

| Cle | Role |
|---|---|
| `geodoku-france-player-stats` | statistiques joueur : meilleur score, parties, moyenne, coups de maitre, departement favori |
| `geodoku-france-daily-results` | edition quotidienne deja terminee et resultats consultables |
| `geodoku-france-anecdotes-seen` | anti-repetition par anecdote |
| `geodoku-france-anecdotes-stats` | affichages, lectures et appreciations locales |
| `geodoku-france-anecdotes-recent-themes` | anti-redondance theme sur les derniers themes vus |
| `geodoku-france-community-stats-v1` | statistiques locales de reponses et confusions |
| `geodoku-france-discoveries-v1` | decouvertes rares, tres rares et legendaires |
| `geodoku-france-collections-v1` | collections joueur et migration Phase 06 vers Phase 08 |

### Absence d'ecrasement

Etat actuel :

- les cles existantes ne sont pas renommees ;
- les nouveaux systemes utilisent des cles dediees ;
- les services normalisent les donnees lues avant sauvegarde ;
- les decouvertes et statistiques ajoutent des entrees au lieu de remplacer les donnees globales.

Point a tester :

- conserver une partie deja jouee, ouvrir stats, rejouer une archive, puis verifier que les anciennes statistiques restent presentes.

## 5. Risques avant test utilisateur

### Gros chunk Vite

Risque : temps de chargement initial plus eleve.

Statut : acceptable pour MVP, a surveiller apres test reel.

Action recommandee : ne pas optimiser avant retour utilisateur, sauf probleme manifeste de chargement.

### Surcharge visuelle

Risque : les cartes de resultat peuvent contenir trop de signaux.

Statut : Phase 07 a reduit l'empilement, mais un test mobile reel reste necessaire.

### Stats locales peu robustes au debut

Risque : le joueur peut croire voir une statistique communautaire alors qu'elle est locale.

Statut : libelle `Tendance locale` correct, mais a verifier en comprehension utilisateur.

### Rarete tres discrete

Risque : un testeur court peut ne jamais voir d'anecdote rare.

Statut : connu et coherent avec l'audit Phase 10.

### Collections nombreuses

Risque : l'ecran statistiques peut sembler riche mais difficile a interpreter.

Statut : acceptable pour test, a observer.

### Encodage et accents

Risque : certains affichages console montrent des accents mal interpretes par PowerShell.

Statut : a verifier dans le navigateur reel pendant la session de test.

## 6. Checklist de test manuel

### Scenario 1 - Premier lancement desktop

- Ouvrir l'application sur desktop.
- Verifier l'edition du jour.
- Verifier les boutons : jouer, editions precedentes, statistiques, regles.
- Verifier que l'accueil donne envie de lancer une partie.

### Scenario 2 - Regles

- Ouvrir les regles.
- Lire le contenu.
- Fermer la modale.
- Verifier que le retour a l'accueil est propre.

### Scenario 3 - Premiere partie simple

- Lancer la grille du jour.
- Selectionner une case.
- Choisir un departement.
- Verifier que la case se remplit et que le departement devient indisponible.

### Scenario 4 - Reponse forte

- Choisir volontairement un departement coherent.
- Valider la grille.
- Verifier le score de case, la fiche departement et l'explication des tags.

### Scenario 5 - Reponse faible

- Choisir volontairement un departement peu coherent.
- Valider la grille.
- Verifier que le score faible est comprehensible sans ton punitif.

### Scenario 6 - Resultat et decouvertes

- Lire l'ecran resultat.
- Verifier le score final, le coup de maitre, les 4 cartes de resultat.
- Verifier les signaux : rarete si presente, collection, tendance locale.

### Scenario 7 - Fiche departement

- Ouvrir `A propos du departement` depuis une carte.
- Ouvrir aussi depuis le coup de maitre si disponible.
- Verifier l'ordre : lieu, departement, score, explication, anecdote, tags.

### Scenario 8 - Statistiques apres une partie

- Ouvrir l'ecran statistiques.
- Verifier les compteurs joueur.
- Verifier les collections decouvertes.
- Verifier que les statistiques faibles restent comprehensibles.

### Scenario 9 - Plusieurs parties via archives

- Ouvrir `Editions precedentes`.
- Rejouer au moins deux anciennes editions.
- Verifier que les stats, collections, anecdotes vues et tendances s'enrichissent.

### Scenario 10 - Reset localStorage

- Vider le localStorage du navigateur.
- Recharger l'application.
- Verifier que le jeu repart proprement comme nouveau joueur.
- Refaire une partie rapide et verifier que les cles sont recreees sans erreur.

## 7. Checklist mobile

Tester au minimum :

- largeur autour de 390 px ;
- une carte de resultat avec badge collection ;
- une carte avec tendance locale longue ;
- la fiche departement ;
- l'ecran statistiques ;
- la grille avec scroll horizontal si necessaire ;
- les boutons d'action en bas de resultat.

## 8. Decision

GeoDoku est **pret avec reserves** pour un test utilisateur reel.

Il ne faut pas ajouter de fonctionnalite avant cette session. Les prochains apprentissages doivent venir d'un joueur :

- comprend-il le principe de grille ?
- lit-il les anecdotes ?
- remarque-t-il les collections ?
- comprend-il `Tendance locale` ?
- trouve-t-il l'ecran resultat trop dense ?
- a-t-il envie de rejouer une archive ?

La prochaine etape recommandee est une session courte de 20 a 30 minutes avec observation directe, sur desktop puis mobile.
