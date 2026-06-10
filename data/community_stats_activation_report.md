# Rapport d'activation - Statistiques communautaires locales

Date : 2026-06-09

## Fichiers modifies

- `src/services/communityStatsService.js`
- `src/main.jsx`
- `src/styles.css`
- `data/product_phase_03.md`
- `data/community_stats_activation_report.md`

Aucun contenu editorial, aucun statut d'anecdote, aucune grille et aucun fichier de scoring n'ont ete modifies.

## Logique ajoutee

Un service dedie, `communityStatsService.js`, gere les statistiques locales.

Il enregistre uniquement au moment de la validation :

- departement cible statistique ;
- departement choisi ;
- succes ou echec ;
- premier essai ou non ;
- score de case ;
- edition ;
- croisement ;
- date.

Le departement cible est calcule comme la meilleure reponse theorique de la case selon le scoring existant. Ce calcul ne change pas le score du joueur et ne modifie aucune regle.

## Stockage local

Nouvelle cle :

```text
geodoku-france-community-stats-v1
```

Structure :

```json
{
  "schemaVersion": 1,
  "games": [],
  "answers": []
}
```

Les anciennes cles localStorage ne sont pas modifiees :

- `geodoku-france-player-stats`
- `geodoku-france-daily-results`
- `geodoku-france-anecdotes-seen`
- `geodoku-france-anecdotes-stats`

## Affichage ajoute

Une ligne discrete est ajoutee dans les cartes de resultat :

```text
Tendance locale : 67% de reussite sur ce croisement.
```

ou :

```text
Tendance locale : l'Indre-et-Loire est le plus souvent confondu avec le Loiret.
```

La formulation reste volontairement locale, car aucun backend communautaire n'est encore branche.

## Compatibilite backend futur

Les evenements locaux sont deja structurés comme des payloads anonymes.

Un futur backend pourra agreger les memes champs :

- edition ;
- case ;
- departement cible ;
- departement choisi ;
- succes ;
- premier essai ;
- score ;
- date.

## Verification fonctionnelle

Test Node effectue sur une grille reelle :

- 1 evenement genere ;
- departement cible renseigne ;
- departement choisi renseigne ;
- succes calcule ;
- premier essai calcule ;
- resume global calcule ;
- stats par departement calculees.

## Garanties gameplay

- Pas de modification de `scoreCell`.
- Pas de modification de `scoreGrid`.
- Pas de modification de `findMasterMove`.
- Pas de modification des grilles.
- Pas de modification du contenu editorial.
- Enregistrement uniquement apres validation.
- Consultation d'un resultat quotidien deja joue : pas de nouvel enregistrement.

## Etat des verifications

| Verification | Resultat |
| --- | --- |
| Service local dedie | OK |
| Donnees anonymes | OK |
| Anciennes donnees localStorage preservees | OK |
| Test evenement local | OK |
| `npm.cmd run build` | OK |

Note : Vite signale toujours le gros chunk JavaScript, comme avant ce chantier. Cet avertissement est lie au volume editorial embarque et ne bloque pas le build.
