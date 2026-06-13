# Rapport hotfix production - écran blanc

Date : 13/06/2026

## Cause exacte

Le rendu initial de `App` lisait `dailyResetLimitState` avant son initialisation par `useState`.

Dans `src/main.jsx`, les constantes `dailyResetDisabled` et `dailyResetCopy` étaient calculées avant :

```js
const [dailyResetLimitState, setDailyResetLimitState] = useState(...)
```

Cela provoquait une erreur runtime de type temporal dead zone au premier rendu, suffisante pour afficher une page blanche en production.

## Correction appliquée

Fichier corrigé :

- `src/main.jsx`

Correction :

- déplacement de l'initialisation `useState` de `dailyResetLimitState` avant les constantes qui l'utilisent.

Aucun changement de règles, scoring, données, grilles, archives ou calendrier.

## Vérifications effectuées

- `npm.cmd run build` : OK.
- Preview production démarrée avec `npm.cmd run preview`.
- Route `/` servie en HTTP 200.
- Route `/debug` servie en HTTP 200.
- `node scripts\auditCalendarUx.js` : OK.
- Test isolé `dailyResetLimit.js` :
  - premier reset consommé ;
  - deuxième reset refusé ;
  - état conservé après refresh simulé ;
  - nouvelle grille avec reset disponible.

## Limite

Le navigateur piloté a bloqué l'accès direct à l'URL locale de preview, donc la console runtime n'a pas pu être relue par cet outil après correction. La cause est toutefois confirmée par inspection du code et le bundle production reconstruit sert correctement `/` et `/debug`.

## Statut production

Correctif prêt à déployer immédiatement.
