# Rapport - Limitation des réinitialisations quotidiennes

Date : 13/06/2026

## Objectif

Limiter le grattage sur la grille du jour en autorisant une seule réinitialisation avant validation finale, sans modifier les règles, le scoring, les 365 grilles, les archives ni la logique calendrier.

## Fichiers modifiés

- `src/dailyResetLimit.js` : nouveau module localStorage pour la consommation de reset par ID de grille.
- `src/main.jsx` : branchement de la limite uniquement sur la grille du jour active.
- `src/styles.css` : style sobre pour le bouton désactivé et la microcopy.

## Comportement implémenté

- Grille du jour non validée :
  - 1 réinitialisation disponible ;
  - usage enregistré dans `localStorage` avec une clé liée à l'ID de grille ;
  - bouton désactivé après consommation ;
  - microcopy affichée avant et après consommation.
- Grille du jour validée :
  - comportement existant conservé : édition verrouillée comme jouée.
- Archives :
  - aucune limite appliquée ;
  - reset libre conservé.
- Changement de jour :
  - nouvelle clé par ID de grille ;
  - quota disponible pour la nouvelle grille.

## Clé localStorage

Format :

```text
geodoku-france-daily-reset-v1-<gridId>
```

Exemple :

```text
geodoku-france-daily-reset-v1-001
```

Un fallback mémoire existe si `localStorage` est indisponible, afin de conserver la protection pendant la session courante.

## Vérifications effectuées

| Scénario | Résultat |
|---|---|
| Jour 1 grille du jour : reset initial disponible | OK |
| Premier reset consommé | OK |
| Deuxième reset refusé | OK |
| Refresh simulé après reset : reset toujours consommé | OK |
| Validation après reset | OK par conservation du flux `validateGrid` existant |
| Grille validée verrouillée | OK par conservation de `dailyResults` |
| Archive : reset libre | OK par condition limitée à `isCurrentDailyEdition` |
| Lendemain simulé : nouvelle grille avec reset disponible | OK |
| Calendrier jour 1 / jour 2 / jour 365 | OK via `node scripts\auditCalendarUx.js` |
| Build production | OK via `npm.cmd run build` |

## Limites restantes

- La protection reste locale au navigateur : elle n'empêche pas un contournement volontaire via suppression du localStorage ou autre navigateur.
- Aucun backend n'est utilisé ; c'est cohérent avec l'état actuel du projet.
- L'UI a été limitée au minimum demandé : pas de compteur complexe ni modale supplémentaire.

## Verdict

Prêt pour test utilisateur. La limitation anti-grattage est appliquée uniquement à la grille du jour et ne modifie pas les archives, le scoring, les règles, les grilles ni le calendrier.
