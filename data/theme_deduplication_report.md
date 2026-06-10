# Rapport d'activation - Anti-redondance thematique

Date : 2026-06-09

## Fichiers modifies

- `src/services/anecdotesService.js`
- `src/main.jsx`
- `data/product_phase_05.md`
- `data/theme_deduplication_report.md`

Aucun contenu editorial, aucun statut, aucune source, aucune grille et aucun fichier de scoring n'ont ete modifies.

## Logique ajoutee

Le moteur d'anecdotes conserve ses filtres existants, puis applique une preference douce sur le champ `theme`.

Si une anecdote candidate possede un theme present dans les 3 derniers themes vus, le moteur tente de choisir une autre candidate.

Si aucune alternative n'existe, l'anecdote reste affichable.

## Stockage local

Nouvelle cle :

```text
geodoku-france-anecdotes-recent-themes
```

Regles :

- maximum 10 themes recents ;
- les 3 derniers themes sont evites si possible ;
- un theme revu remonte en tete ;
- les anciennes cles localStorage restent inchangees.

## Fonctions ajoutees

Dans `src/services/anecdotesService.js` :

- `getRecentAnecdoteThemes()`
- `recordAnecdoteTheme(theme)`
- `resetRecentAnecdoteThemes()`

La fonction `recordAnecdoteDisplay(id, anecdote)` accepte maintenant l'objet anecdote complet et enregistre son theme si disponible.

## Verifications effectuees

Test isole du service :

- theme recent `same` enregistre ;
- deux anecdotes validees disponibles : `same` et `fresh` ;
- selection avec random stable ;
- resultat : anecdote `fresh` choisie ;
- theme `fresh` ajoute a l'historique ;
- fallback avec une seule anecdote `same` disponible : anecdote affichee quand meme.

Autres controles :

- les anecdotes non validees restent exclues du filtre public ;
- l'anti-repetition par ID reste compatible avec `getNeverSeenAnecdoteForDepartment` ;
- les decouvertes Phase 04 restent independantes ;
- les statistiques locales Phase 03 restent independantes.

## Garanties gameplay

- Aucun changement de scoring.
- Aucun changement de grille.
- Aucun changement de validation.
- Aucun changement de contenu editorial.
- Aucun changement de statut editorial.
- Aucun blocage d'affichage si le theme est recent.

## Etat des verifications

| Verification | Resultat |
| --- | --- |
| Service anti-redondance theme | OK |
| Historique max 10 themes | OK |
| Evite les 3 derniers themes si alternative | OK |
| Fallback si aucune alternative | OK |
| Anecdotes validees uniquement | OK |
| Phase 04 rarete / decouverte | OK |
| Phase 03 statistiques locales | OK |
| Anti-repetition par ID | OK |
| `npm.cmd run build` | OK |

Note : l'avertissement Vite sur le gros chunk JavaScript reste present et attendu. Il est lie au volume editorial embarque, pas a l'anti-redondance thematique.
