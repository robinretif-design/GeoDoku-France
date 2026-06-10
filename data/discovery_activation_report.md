# Rapport d'activation - Decouvertes et rarete

Date : 2026-06-09

## Fichiers modifies

- `src/services/discoveryService.js`
- `src/main.jsx`
- `src/styles.css`
- `data/product_phase_04.md`
- `data/discovery_activation_report.md`

Aucun fichier de scoring, aucune grille, aucun contenu editorial et aucun statut d'anecdote n'ont ete modifies.

## Service ajoute

`discoveryService.js` fournit :

- `getRarityMetadata(rarity)` ;
- `isDiscoveryRarity(rarity)` ;
- `recordDiscovery(anecdote, metadata)` ;
- `getDiscoveryStats()` ;
- `getDiscoveryStorageKey()`.

## Raretés prises en charge

| Rareté | Indicateur |
| --- | --- |
| commune | Aucun affichage MVP |
| peu commune | Aucun affichage MVP |
| rare | ⭐ Anecdote rare |
| tres rare | ⭐⭐ Anecdote tres rare |
| legendaire | ⭐⭐⭐ Anecdote legendaire |

## Stockage local

Nouvelle cle :

```text
geodoku-france-discoveries-v1
```

Les anciennes cles ne sont pas modifiees :

- `geodoku-france-player-stats`
- `geodoku-france-community-stats-v1`
- `geodoku-france-daily-results`
- `geodoku-france-anecdotes-seen`
- `geodoku-france-anecdotes-stats`

## Enregistrement

Une decouverte est enregistree quand une anecdote validee de rarete `rare`, `tres rare` ou `legendaire` est selectionnee pour affichage.

L'enregistrement est idempotent :

- premiere apparition : ajoutee a l'historique ;
- apparitions suivantes : ignorees pour eviter les doublons.

## Affichage

L'indicateur de rarete est affiche :

- dans les cartes de resultat ;
- dans la fiche "A propos du departement".

Deux compteurs sont ajoutes dans l'ecran Statistiques :

- anecdotes rares ;
- legendaires.

## Verification effectuee

Test Node du service :

- metadonnees `rare`, `tres rare`, `legendaire` OK ;
- premier enregistrement OK ;
- second enregistrement de la meme anecdote ignore ;
- compteur rare OK ;
- compteur legendaire OK.

## Garanties gameplay

- `scoreCell` inchange.
- `scoreGrid` inchange.
- `findMasterMove` inchange.
- Aucune regle de validation modifiee.
- Aucun contenu editorial modifie.
- Aucun statut editorial modifie.
- Aucune ancienne donnee locale remplacee.

## Etat des verifications

| Verification | Resultat |
| --- | --- |
| Service dedie | OK |
| Historique local separe | OK |
| Enregistrement idempotent | OK |
| Indicateur rarete | OK |
| Statistiques de decouverte | OK |
| `npm.cmd run build` | OK |

Note : l'avertissement Vite sur le gros chunk JavaScript reste present et attendu. Il est lie au volume editorial embarque, pas au service de decouverte.
