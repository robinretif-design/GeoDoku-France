# Rapport d'activation du moteur d'anecdotes

Date : 2026-06-04

## Fichiers modifiés

- `src/main.jsx`
- `README.md`
- `data/anecdotes_activation_report.md`

Aucun fichier de données éditoriales n'a été modifié.

## Logique utilisée

L'affichage fixe `dep.anecdote` est remplacé, dans l'écran de résultat et dans la fiche "À propos du département", par une sélection issue du moteur éditorial quand une anecdote validée est disponible.

Ordre de sélection :

1. Pour le coup de maître, tentative d'anecdote rare validée non vue localement.
2. Sélection contextuelle validée selon le score de case :
   - `bonne_reponse` pour une case forte ;
   - `mauvaise_reponse` pour une case faible ;
   - `découverte` par défaut.
3. Sélection anti-répétition via historique local `localStorage`.
4. Fallback vers l'ancien `dep.anecdote` si le moteur ne retourne aucune anecdote validée.

La sélection est déclenchée hors rendu React :

- via `useEffect` pour les cartes de résultat ;
- au clic pour la fiche département.

## Garanties de sécurité

- Le service utilisé filtre les anecdotes validées par défaut.
- `isAnecdoteValidated` est vérifié avant chaque affichage dynamique.
- Une anecdote non validée éventuellement retournée serait rejetée avant affichage.
- Les statuts `à vérifier`, `brouillon` et `rejetée` ne sont pas exposés.
- En développement, une trace console indique si une anecdote validée est trouvée ou si le fallback est utilisé.

## Tests effectués

| Test | Résultat |
| --- | --- |
| `npm.cmd run build` | OK |
| Total anecdotes éditoriales | 2171 |
| Anecdotes validées disponibles | 1700 |
| Anecdotes à vérifier | 471 |
| Anecdotes brouillon | 0 |
| Anecdotes rejetées | 0 |
| Anecdotes non validées dans le filtre public | 0 |
| Sélection contextuelle de test | OK, anecdote `validée` retournée |
| Sélection rare de test | OK, anecdote `validée` retournée |
| Département inconnu côté moteur | OK, aucune anecdote retournée |

## Vérification du fallback

Tous les 101 départements ont actuellement au moins une anecdote validée, car les anecdotes legacy sont validées. Le fallback ne se déclenche donc pas naturellement avec la base actuelle.

Le chemin de fallback est néanmoins présent dans `src/main.jsx` :

- si le moteur retourne `null`, l'application affiche l'ancien `dep.anecdote` ;
- si une anecdote non validée était retournée, elle serait rejetée puis remplacée par le fallback ;
- la vérification avec un département inconnu confirme que le moteur peut retourner `null` sans erreur.

## Vérification des statuts et contenus

Après activation :

- total éditorial inchangé : 2171 ;
- total validées inchangé : 1700 ;
- total à vérifier inchangé : 471 ;
- aucun statut éditorial modifié ;
- aucun contenu éditorial modifié ;
- aucune règle de scoring, grille ou réponse modifiée.

## Point d'attention

L'import du service d'anecdotes dans `main.jsx` charge maintenant l'agrégat éditorial côté client. Le build reste valide, mais le bundle JavaScript augmente nettement. Une optimisation future possible serait de charger le moteur d'anecdotes dynamiquement uniquement au moment d'afficher les résultats ou la fiche département.
