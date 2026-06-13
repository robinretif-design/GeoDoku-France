# Rapport de pré-test utilisateur - GévoCroisée

Date : 13/06/2026

## Scénarios vérifiés

- Première visite au jour 1 : grille #001 seule, aucune archive affichée, aucun message maladroit de type "archives vides".
- Parcours mobile 390 x 844 : accueil, lancement, choix d'une case, sélection d'un département, validation, résultats, fiche département, retour accueil.
- Etats calendrier simulés : jour 1, jour 2, jour 30, jour 180, jour 365, jour 366.
- Garde-fous : grille future bloquée, grille inexistante refusée, stock épuisé sans grille du jour, archives conservées.
- Etats de contenu incomplet : les fiches département, anecdotes et médias disposent de fallbacks existants ; aucune modification de données n'a été faite.

## Corrections appliquées

- Microcopy d'accueil clarifiée : grille du jour, cadence quotidienne et archives débloquées plus tard.
- Textes courts resserrés pour les règles, le lancement, la validation, les archives, les résultats et la fiche département.
- Libellés rendus plus naturels : "Voir mon score", "Voir la fiche", "Grilles débloquées", "Pourquoi ça fonctionne".

## Résultats observés

- Le parcours mobile complet ne déclenche aucune erreur console.
- Aucun débordement horizontal observé sur l'accueil, la grille, les résultats et la fiche département.
- Les futures grilles ne sont pas listées dans l'interface et ne sont pas jouables via `startGrid`.
- Le jour 366 affiche un état de stock épuisé proprement géré.

## Limites restantes

- Le test navigateur a été réalisé sur un parcours mobile représentatif, pas sur un panel réel.
- Les états "donnée départementale manquante" et "anecdote absente" sont couverts par inspection des fallbacks existants, sans altérer les données de production.
- Aucun paramètre public de simulation de date n'a été ajouté, afin de ne pas créer de chemin de déblocage des grilles futures.

## Verdict

Prêt pour un test utilisateur réel limité.
