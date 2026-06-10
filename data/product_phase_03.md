# Produit Phase 03 - MVP Statistiques communautaires locales

Date : 2026-06-09

Objectif : lancer une premiere fonctionnalite produit visible autour des statistiques communautaires, sans backend et sans modifier les regles de jeu, le scoring ou les contenus editoriaux.

## 1. Perimetre MVP

Le MVP enregistre localement les choix valides par le joueur et calcule des tendances a partir de l'historique stocke dans le navigateur.

Ce n'est pas encore une statistique communautaire globale. C'est une couche locale, concue pour etre compatible avec un futur backend d'agregation anonyme.

## 2. Donnees enregistrees

Chaque validation de grille ajoute une entree de partie et une entree par reponse posee.

Pour chaque reponse :

| Champ | Description |
| --- | --- |
| `editionId` | Edition jouee. |
| `difficulty` | Niveau de la grille. |
| `cellKey` | Croisement ligne-colonne. |
| `rowId`, `colId` | Identifiants des criteres. |
| `targetDepartmentCode` | Departement cible statistique, calcule comme meilleure reponse theorique de la case. |
| `chosenDepartmentCode` | Departement choisi par le joueur. |
| `success` | `true` si le score de case est au moins 7. |
| `firstTry` | `true` si la case n'a ete choisie qu'une fois avant validation. |
| `attemptCount` | Nombre de selections effectuees sur cette case pendant la partie. |
| `score` | Score de case obtenu. |
| `date` | Date ISO de validation. |
| `source` | `localStorage` pour le MVP. |

## 3. Calculs disponibles

Le service `src/services/communityStatsService.js` calcule :

- nombre de parties jouees ;
- nombre de reponses enregistrees ;
- nombre de reussites ;
- taux de reussite global ;
- taux de reussite au premier essai ;
- taux de reussite par departement cible ;
- reussites au premier essai par departement cible ;
- departement le plus souvent confondu avec une cible ;
- taux de reussite par croisement.

## 4. Definition du succes

Une reponse est consideree comme reussie si son score de case est superieur ou egal a 7.

Cette definition respecte le scoring existant :

- elle ne change aucun point ;
- elle ne change aucun bonus ;
- elle ne change aucune grille ;
- elle sert uniquement a produire une lecture statistique.

## 5. Departement cible

Le departement cible statistique est calcule pour chaque croisement en cherchant, dans la base actuelle, le departement qui obtient le meilleur score de case.

En cas d'egalite :

1. prestige le plus eleve ;
2. taux de selection le plus faible ;
3. ordre stable par code.

Cette cible n'est pas affichee comme "la seule bonne reponse". Elle sert a detecter les confusions et a structurer les tendances.

## 6. Affichage MVP

Dans les cartes de resultat, une ligne discrete peut apparaitre :

- `Tendance locale : 67% de reussite sur ce croisement.`
- `Tendance locale : 58% de reussite pour la Lozere.`
- `Tendance locale : l'Indre-et-Loire est le plus souvent confondu avec le Loiret.`

Tant que peu de donnees existent, la phrase reste locale et prudente. Elle ne pretend pas representer tous les joueurs.

## 7. Stockage local

Cle localStorage :

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

Le service utilise une cle dediee. Il ne remplace pas :

- les statistiques joueur existantes ;
- les resultats quotidiens ;
- l'historique des anecdotes vues ;
- les donnees editoriales.

## 8. Compatibilite backend futur

Les evenements sont deja structures comme des payloads anonymes :

- edition ;
- case ;
- departement cible ;
- departement choisi ;
- score ;
- succes ;
- premier essai ;
- date.

Un futur backend pourrait recevoir ces memes evenements, les agreger par edition et renvoyer des taux globaux. Le MVP local garde donc la meme logique conceptuelle sans imposer de dependance serveur.

## 9. Limites assumées

- Les statistiques sont locales au navigateur, pas encore communautaires globales.
- Le "premier essai" est calcule depuis les changements effectues avant validation.
- Les donnees ne sont enregistrees qu'a la validation, pas a chaque clic.
- Les archives rejouees peuvent enrichir plusieurs fois l'historique local.
- La cible statistique est une convention de lecture, pas une nouvelle regle de jeu.

## 10. Prochaine iteration

Priorites recommandees :

1. afficher un petit compteur de decouvertes ou de croisements observes ;
2. ajouter une page debug locale des stats communautaires ;
3. introduire un fichier de stats globales simulees ou statiques pour le MVP public ;
4. brancher plus tard un backend d'agregation anonyme ;
5. fusionner tendances locales et tendances globales quand elles existent.

