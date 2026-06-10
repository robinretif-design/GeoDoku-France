# Produit Phase 06 - Collections thematiques

Date : 2026-06-09

Objectif : transformer le champ `theme` des anecdotes en mecanique legere de collection, sans modifier le scoring, les grilles, les contenus editoriaux, les statuts ou les sources.

## 1. Principe MVP

Lorsqu'une anecdote validee possede un `theme`, GeoDoku enregistre localement cette decouverte.

Le joueur commence ainsi a construire une collection de themes territoriaux au fil des parties :

- resistance ;
- gastronomie locale ;
- patrimoine industriel ;
- littoral ;
- montagne ;
- culture populaire ;
- autres themes issus du champ editorial existant.

La mecanique reste volontairement discrete : elle ajoute une sensation de progression, sans changer les regles du jeu.

## 2. Service dedie

Nouveau fichier :

```text
src/services/collectionsService.js
```

Le service exploite les champs deja presents dans les anecdotes :

- `theme`
- `rarete`
- `id`
- `code_departement`

Il expose les fonctions principales suivantes :

- `loadCollectionsStore()`
- `saveCollectionsStore(store)`
- `recordCollectionDiscovery(anecdote, metadata)`
- `getCollectionsStats(store, sourceAnecdotes)`
- `getThemeProgress(theme, store, catalog)`
- `getCollectionsStorageKey()`

## 3. Stockage local

Nouvelle cle localStorage :

```text
geodoku-france-collections-v1
```

Structure logique :

```json
{
  "schemaVersion": 1,
  "discoveries": [
    {
      "theme": "resistance-ain",
      "themeLabel": "Resistance Ain",
      "anecdoteId": "01-histoire-005",
      "codeDepartement": "01",
      "rarete": "peu commune",
      "discoveredAt": "2026-06-09T00:00:00.000Z"
    }
  ]
}
```

Regles :

- une anecdote deja decouverte n'est pas dupliquee ;
- une anecdote sans `theme` n'est pas enregistree dans les collections ;
- les anciennes cles localStorage ne sont pas modifiees ;
- si localStorage est indisponible ou plein, le jeu reste jouable.

## 4. Statistiques calculees

Le service calcule :

- nombre de themes decouverts ;
- nombre total d'anecdotes a theme decouvertes ;
- progression par theme ;
- top 3 des themes les plus avances ;
- dernier theme decouvert ;
- nombre total de themes disponibles dans les anecdotes validees.

Au moment de l'activation, la base contient :

| Indicateur | Valeur |
| --- | ---: |
| Anecdotes editoriales totales | 3311 |
| Anecdotes validees | 2840 |
| Anecdotes validees avec theme | 2615 |
| Themes distincts disponibles | 2513 |
| Anecdotes non validees dans le JSON public | 0 |

## 5. Affichage MVP

Quand l'anecdote affichee possede un `theme`, l'interface ajoute une pastille discrete :

```text
Collection : Resistance Ain
```

Si une nouvelle anecdote vient enrichir une collection deja connue, l'interface peut afficher :

```text
Collection Resistance Ain : 3 anecdotes decouvertes
```

La pastille est affichee :

- dans la fiche "A propos du departement" ;
- dans les cartes de resultat qui affichent une anecdote editoriale.

## 6. Ecran statistiques

L'ecran "Statistiques" affiche maintenant une section :

```text
Collections decouvertes
```

Elle presente :

- nombre de collections decouvertes ;
- nombre d'anecdotes a theme decouvertes ;
- derniere collection decouverte ;
- top 3 des collections les plus avancees.

## 7. Compatibilite avec les phases precedentes

### Phase 03 - statistiques locales

Le service `communityStatsService.js` reste independant.

Aucune donnee de statistiques communautaires locales n'est ecrasee.

### Phase 04 - decouvertes et rarete

Le service `discoveryService.js` reste actif.

Une anecdote rare peut a la fois :

- etre enregistree comme decouverte rare ;
- enrichir une collection thematique si elle possede un `theme`.

### Phase 05 - anti-redondance thematique

Le service `anecdotesService.js` continue d'eviter les 3 derniers themes vus quand une alternative existe.

La Phase 06 n'affaiblit pas cette logique : elle enregistre la collection apres selection, sans influencer le tirage.

## 8. Garanties

- Seules les anecdotes validees peuvent etre affichees.
- Les anecdotes `a verifier`, `brouillon` ou `rejetee` restent exclues.
- Le fallback vers `dep.anecdote` reste actif.
- Aucun changement de scoring.
- Aucun changement de regles.
- Aucun changement de grilles.
- Aucun changement de contenu editorial.
- Aucun changement de statut editorial.
- Aucun changement de source.
- Aucune ancienne donnee localStorage n'est ecrasee.

## 9. Limites assumees

- Les themes sont encore tres granulaires : beaucoup correspondent a une anecdote ou un lieu precis.
- Il n'existe pas encore de familles de collections.
- Il n'y a pas encore de badges ou recompenses complexes.
- La progression reste locale au navigateur.
- La synchronisation multi-appareil necessitera un futur backend.

## 10. Prochaines iterations possibles

Quick wins :

1. afficher une micro-animation lors d'une nouvelle collection ;
2. ajouter un compteur "nouvelle collection" dans le resultat ;
3. afficher une liste complete des collections vues.

Moyen terme :

1. regrouper les themes proches en familles ;
2. creer des collections officielles comme "Resistance", "Phares", "Volcans", "Gastronomie locale" ;
3. afficher une progression par famille.

Long terme :

1. synchroniser les collections avec un backend ;
2. creer des badges rares ;
3. relier collections, statistiques communautaires et editions speciales.
