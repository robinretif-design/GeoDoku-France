# Audit UX et securite fonctionnelle du calendrier quotidien

Date : 2026-06-13

## Scenarios testes

Audit automatisé : `node scripts/auditCalendarUx.js`.

| Scenario | Resultat |
|---|---|
| Jour 1 | Grille du jour `#001`, aucune archive, futures non lançables |
| Jour 2 | Grille du jour `#002`, archive `#001`, futures non lançables |
| Jour 30 | Grille du jour `#030`, 29 archives, futures non lançables |
| Jour 180 | Grille du jour `#180`, 179 archives, futures non lançables |
| Jour 365 | Grille du jour `#365`, 364 archives, aucune future |
| Jour 366 | Aucune grille du jour, 365 archives, stock épuisé proprement |

Contrôles navigateur réel sur l'état courant du 2026-06-13 :

| Vue | Desktop | Mobile |
|---|---|---|
| Accueil | OK | OK |
| Grille du jour | OK | OK |
| Archives jour 1 | Accès masqué car aucune archive | Accès masqué car aucune archive |
| Débordement horizontal | Aucun | Aucun |
| Erreurs console | Aucune | Aucune |

## Resultats observes

- L'accueil présente explicitement `Grille du jour · GévoCroisée #001`.
- Le bouton principal indique `Jouer la grille du jour`.
- Le texte d'accueil explique qu'une grille est publiée chaque jour.
- Au jour 1, aucune archive n'est affichée.
- Au jour 1, le bouton `Éditions précédentes` est masqué pour éviter une page vide.
- Les archives simulées ne contiennent que les grilles passées déjà débloquées.
- Les grilles futures ne sont jamais listées dans les états audités.
- `startGrid` refuse une grille future et une grille inexistante via le contrôle `unlockedGrids`.
- L'état stock épuisé conserve les archives et ne renvoie aucune grille future.

## Corrections appliquees

- Libellé de l'édition courante clarifié : `Grille du jour · GévoCroisée #001`.
- Bouton `Éditions précédentes` masqué tant que `pastGrids.length === 0`.
- Message d'archives vides remplacé par une phrase contextuelle, uniquement en garde-fou : `Les éditions précédentes apparaîtront ici à partir de demain.`
- Ajout du script `scripts/auditCalendarUx.js` pour simuler les jours clés sans ajouter de paramètre public de date.

## Limites restantes

- Les états futurs et l'état stock épuisé sont vérifiés par simulation de `getGridCalendarState`, pas par un paramètre public dans l'interface. C'est volontaire : ajouter un paramètre d'URL de simulation créerait un risque de déblocage public des futures grilles.
- L'écran Archives avec un très grand nombre d'archives reste fonctionnel, mais pourra mériter plus tard une pagination ou un filtre si l'usage réel montre une lourdeur de navigation.

## Verdict

Prêt pour test utilisateur réel.

Le calendrier quotidien est compréhensible côté joueur, les futures grilles restent inaccessibles, les grilles inexistantes sont refusées proprement, et les contrôles desktop/mobile ne signalent ni erreur console ni débordement horizontal de page.
