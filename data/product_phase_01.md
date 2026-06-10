# Phase Produit 01 - GeoDoku France

Date : 2026-06-09

Objectif : acter le passage de GeoDoku France de la phase "constitution de contenu" vers la phase "experience produit". Ce document ne modifie aucun contenu, aucun statut et aucun code gameplay.

## 1. Lecture des 281 priorites A

Les 281 priorites A restantes ne doivent pas etre lues comme 281 corrections urgentes. Le recalcul montre qu'elles viennent presque exclusivement de controles automatiques formels.

| Signal automatique | Nombre | Lecture produit |
| --- | ---: | --- |
| Source manquante | 0 | Pas de risque bloquant detecte. |
| Doublon de contenu | 0 | Pas de copie evidente entre anecdotes. |
| Categorie invalide | 0 | Structure editoriale saine. |
| Texte hors 40-90 mots | 273 | Signal majoritairement mecanique. |
| Doublon de titre | 12 | Surtout des sujets transdepartementaux legitimes. |

### Classification produit

| Classe | Nombre | Critere retenu | Action recommandee |
| --- | ---: | --- | --- |
| Vraie anomalie | 18 | Texte sous 30 mots. | Relire quand le departement repasse en revue. |
| Anomalie mineure acceptable | 24 | Texte entre 30 et 34 mots. | Ne pas bloquer la validation si le fait est clair. |
| Faux positif | 8 | Doublon de titre seul, sans doublon de contenu. | Accepter ou renommer uniquement si l'interface affiche les deux proches. |
| A ignorer pour l'instant | 231 | Texte entre 35 et 39 mots. | Ne pas corriger maintenant. La contrainte mobile prime sur la regle brute. |

Conclusion : les priorites A restantes sont un probleme de calibrage d'audit plus qu'un probleme editorial massif. La regle 40-90 mots a ete utile pour cadrer la production, mais elle devient trop stricte pour juger des anecdotes courtes et efficaces.

### Details utiles

| Tranche de longueur | Nombre | Interpretation |
| --- | ---: | --- |
| Moins de 25 mots | 12 | Trop court pour porter une vraie anecdote. |
| 25 a 29 mots | 6 | Probablement enrichissable. |
| 30 a 34 mots | 24 | Court, mais souvent exploitable en mobile. |
| 35 a 39 mots | 231 | Acceptable pour une lecture rapide. |
| Plus de 90 mots | 0 | Aucun probleme de longueur excessive. |

### Codes concernes par les vraies anomalies probables

| Code | Lecture |
| --- | --- |
| 45 Loiret | 2 textes sous 30 mots. |
| 77 Seine-et-Marne | 3 textes sous 30 mots. |
| 75 Paris | 3 textes sous 30 mots. |
| 59 Nord | 2 textes sous 30 mots. |
| 44 Loire-Atlantique | 2 textes sous 30 mots. |
| 13 Bouches-du-Rhone | 2 textes sous 30 mots. |
| 69 Rhone | 2 textes sous 30 mots. |
| 33 Gironde | 1 texte sous 30 mots. |
| 06 Alpes-Maritimes | 1 texte sous 30 mots. |

### Doublons de titre a relativiser

Les doublons de titre signalent souvent des objets territoriaux partages : estuaire, canal, massif, route, specialite regionale. Exemples : `La route Napoleon`, `Le Canal du Midi`, `La Montagne Noire`, `La ficelle picarde`, `La volaille de Bresse`.

Ce ne sont pas des doublons de contenu. Le bon traitement n'est pas une correction systematique, mais une regle editoriale : si deux departements partagent un sujet, le titre peut rester proche a condition que l'angle soit distinct.

## 2. Usage reel des champs existants

### rarete

| Rareté | Anecdotes validees |
| --- | ---: |
| commune | 2326 |
| peu commune | 449 |
| rare | 57 |
| tres rare | 6 |
| legendaire | 2 |

Usage actuel : le service sait selectionner une anecdote rare via `getRareAnecdote`, principalement exploitable pour le coup de maitre. Il n'y a pas encore de vraie pondération de rarete dans l'experience standard.

Potentiel produit : afficher une "decouverte rare", creer des badges de curiosite, valoriser les departements moins evidents.

### contexte

| Contexte | Anecdotes validees |
| --- | ---: |
| decouverte | 2840 |

Usage actuel : `main.jsx` demande des contextes differents selon le score de case : `bonne_reponse`, `mauvaise_reponse`, `decouverte`, `anecdote_rare`. Mais les donnees validees sont presque toutes en `decouverte`, donc le moteur retombe souvent sur le fallback general.

Potentiel produit : creer progressivement des anecdotes adaptees aux situations :

- bonne reponse : confirmer et recompenser ;
- mauvaise reponse : expliquer l'erreur sans punir ;
- anecdote rare : donner une vraie recompense culturelle ;
- statistique : relier la reponse du joueur au comportement collectif.

### ton

| Ton | Anecdotes validees |
| --- | ---: |
| neutre | 1429 |
| pedagogique | 673 |
| surprenant | 451 |
| poetique | 247 |
| amusant | 35 |
| piegeux | 5 |

Usage actuel : le ton est stocke et exporte, mais il ne pilote pas encore l'affichage. Il n'est pas utilise pour varier l'experience ou eviter une sequence trop monotone.

Potentiel produit : alterner les tons dans les cartes de resultat, reserver `piegeux` aux erreurs frequentes, reserver `surprenant` aux coups de maitre ou decouvertes rares.

### theme

| Indicateur | Valeur |
| --- | ---: |
| Anecdotes validees avec theme | 2615 |
| Anecdotes validees sans theme | 225 |
| Themes distincts valides | 2513 |
| Anecdotes totales avec theme | 2619 |

Usage actuel : le champ existe, il est exporte dans le JSON public, mais il n'est pas exploite pour la selection.

Potentiel produit : anti-redondance. Deux anecdotes de theme proche ne devraient pas apparaitre dans la meme partie ou dans deux fiches consecutives si une alternative existe.

### historique joueur

Usage actuel :

- `geodoku-france-anecdotes-seen` stocke localement les anecdotes deja vues ;
- `geodoku-france-anecdotes-stats` peut stocker affichages, lectures et appreciation ;
- le moteur anti-repetition existe via `getNeverSeenAnecdoteForDepartment`.

Limite actuelle : l'historique reste discret. Le joueur ne voit pas encore la progression de decouverte, les themes explores, ni les anecdotes rares deja croisees.

Potentiel produit : transformer l'historique en collection culturelle legere : departements decouverts, themes rencontres, anecdotes rares, records personnels.

## 3. Systeme de statistiques communautaires

Les statistiques communautaires sont probablement le levier produit le plus fort. Elles donnent au joueur le sentiment de participer a une experience vivante, pas seulement a un quiz solitaire.

### Principes

- Aucun compte utilisateur obligatoire.
- Aucune donnee personnelle.
- Donnees envoyees uniquement sous forme de codes, scores et identifiants de case.
- Agregation par edition, cellule, departement choisi et tranche de score.
- Affichage toujours formule comme une tendance, jamais comme une surveillance individuelle.

### Evenements minimaux a agreger

| Evenement | Champs utiles | Usage produit |
| --- | --- | --- |
| `game_started` | edition, difficulty, source | Mesurer l'entree dans les grilles. |
| `game_completed` | edition, score, difficulty, scoreCells, bonus | Taux de completion et scores moyens. |
| `cell_answered` ou agregat equivalent | edition, cellKey, rowId, colId, departmentCode, cellScore | Confusions frequentes et choix populaires. |
| `department_opened` | edition, departmentCode, context | Departements qui suscitent la curiosite. |
| `game_shared` | edition, score | Score social et viralite. |

### Metriques communautaires a produire

| Metrique | Exemple d'affichage | Valeur joueur |
| --- | --- | --- |
| Taux de reussite par case | "Seulement 18 % des joueurs ont marque 7+ ici." | Situe la difficulte. |
| Departement le plus joue par case | "Le choix le plus tente ici : Loire." | Rend la grille vivante. |
| Confusion frequente | "73 % des joueurs ont repondu Loire au lieu de Loiret." | Explique les erreurs. |
| Departement rare trouve | "Seulement 4 % des joueurs ont trouve la Lozere du premier coup." | Recompense la decouverte. |
| Score moyen edition | "Score moyen de la communaute : 68/101." | Donne un repere social. |
| Coup de maitre communautaire | "Le coup de maitre le plus rare aujourd'hui : Creuse." | Valorise les choix inattendus. |
| Departement le plus confondu | "L'Aisne est souvent confondue avec l'Oise." | Transforme l'erreur en apprentissage. |

### Records

Records possibles sans compte utilisateur :

- meilleur score local ;
- meilleur score communautaire par edition, si backend agrege ;
- departement le moins choisi avec score fort ;
- grille avec le plus fort taux d'erreur ;
- meilleur coup de maitre moyen ;
- temps moyen avant validation, si la mesure existe deja cote client.

### Badges

Badges locaux possibles :

- Explorateur discret : jouer 5 departements avec selectionRate faible.
- Anti-evidence : obtenir 7+ avec un departement choisi par moins de 10 % des joueurs.
- Memoire vive : ouvrir 10 fiches departement.
- Grand ecart territorial : jouer metropole et outre-mer dans la meme session d'archives.
- Collectionneur rare : voir 10 anecdotes `rare` ou plus.
- Cartographe patient : terminer 10 editions.

Badges communautaires possibles :

- Trouvaille du jour : choisir un departement fort mais peu joue.
- Contre-courant : choisir une reponse differente du choix majoritaire et mieux scorer.
- Precision locale : trouver un departement souvent confondu.

### Decouverte rare

La decouverte rare doit devenir un moment d'interface :

1. le joueur joue ou ouvre un departement peu attendu ;
2. le moteur choisit une anecdote `rare`, `tres rare` ou `legendaire` si disponible ;
3. l'interface signale sobrement : "Decouverte rare" ;
4. le partage peut inclure un marqueur culturel, sans alourdir le format Wordle.

## 4. Quick wins

### Moins de 1 jour

| Action | Impact joueur | Complexite | Dette |
| --- | --- | --- | --- |
| Reclasser mentalement les 231 alertes 35-39 mots comme non bloquantes. | Moyen | Tres faible | Reduit la fausse dette. |
| Creer une liste de 18 vraies anomalies sous 30 mots pour revue ciblee. | Moyen | Faible | Nettoie la dette utile. |
| Afficher un libelle "Decouverte rare" quand une anecdote rare est servie. | Fort | Faible | Faible. |
| Eviter deux anecdotes du meme `theme` dans une meme session si possible. | Moyen | Faible | Exploite un champ deja pret. |
| Ajouter une phrase statistique locale apres validation. | Fort | Faible | Peut rester simulee ou locale au debut. |

### Moins de 1 semaine

| Action | Impact joueur | Complexite | Dette |
| --- | --- | --- | --- |
| Specifier le modele d'agregation communautaire par edition et cellule. | Tres fort | Moyen | Necessaire avant backend. |
| Produire un premier fichier de statistiques communautaires statique. | Fort | Moyen | Sans backend, mais utile en MVP. |
| Ajouter un panneau "Ce que les joueurs ont tente". | Tres fort | Moyen | Depend des donnees. |
| Utiliser `ton` pour varier les anecdotes affichees. | Moyen | Faible | Peu risqué. |
| Creer 20 anecdotes contextuelles pilotes : bonne/mauvaise reponse. | Fort | Moyen | Travail editorial limite. |

### Moins de 1 mois

| Action | Impact joueur | Complexite | Dette |
| --- | --- | --- | --- |
| Mettre en place un backend d'agregation minimal. | Tres fort | Moyen a eleve | A cadrer proprement. |
| Construire les statistiques communautaires reelles par edition. | Tres fort | Moyen | Depend du volume de joueurs. |
| Ajouter badges et collection de decouvertes. | Fort | Moyen | Peut rester local au depart. |
| Creer des chaines thematiques. | Fort | Moyen | Exploite `theme` et `rarete`. |
| Migrer vers chargement differe du JSON public. | Moyen | Moyen | A faire quand le produit est teste. |

## 5. Priorisation des evolutions

| Priorite | Evolution | Impact joueur | Complexite technique | Dette technique | Decision |
| ---: | --- | --- | --- | --- | --- |
| 1 | Comprendre et reclasser les priorites A. | Moyen | Faible | Reduit la dette percue | A faire maintenant. |
| 2 | Concevoir les statistiques communautaires. | Tres fort | Moyen | Cree une fondation produit | A faire avant nouvelle production massive. |
| 3 | Exploiter `rarete`, `theme`, `ton`, `contexte`. | Fort | Faible a moyen | Valorise l'existant | A faire par petits incréments. |
| 4 | Ajouter des badges locaux. | Fort | Moyen | Peu risque si localStorage | Apres cadrage stats. |
| 5 | Chargement differe JSON public. | Moyen | Moyen | Reduit le bundle | Plus tard, pas prioritaire MVP. |
| 6 | Nouvelle production editoriale massive. | Moyen | Faible | Peut masquer les vrais enjeux produit | A suspendre temporairement. |

## 6. Recommandation produit

GeoDoku n'a pas besoin, tout de suite, de plus de contenu. Il a besoin de mieux faire ressentir le contenu deja produit.

La prochaine sequence recommandee est :

1. traiter uniquement les 18 vraies anomalies probables, ou les laisser en attente si elles ne sont pas exposees ;
2. accepter les 231 textes de 35-39 mots comme compatibles mobile ;
3. formaliser le schema de statistiques communautaires ;
4. afficher une premiere couche de statistiques dans le resultat ;
5. exploiter `rarete` et `theme` avant toute optimisation de bundle.

Le chargement differe reste une bonne strategie long terme, mais il ne doit pas devancer la validation de l'experience joueur. Pour le MVP, le build fonctionne, le JSON public existe, et la priorite est l'effet produit.

