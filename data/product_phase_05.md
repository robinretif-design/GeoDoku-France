# Produit Phase 05 - Anti-redondance thematique

Date : 2026-06-09

Objectif : ameliorer la sensation de variete dans les anecdotes affichees, sans complexifier le gameplay et sans modifier les contenus editoriaux.

## 1. Principe MVP

Le moteur d'anecdotes exploite maintenant le champ `theme` quand il existe.

Lorsqu'il doit choisir une anecdote, il privilegie une anecdote dont le theme ne fait pas partie des 3 derniers themes vus localement.

Cette logique est douce :

- elle ne bloque jamais l'affichage ;
- elle ne desactive jamais le fallback existant ;
- elle conserve le filtre `validée` ;
- elle revient au tirage normal si aucune alternative n'existe.

## 2. Historique local

Nouvelle cle localStorage :

```text
geodoku-france-anecdotes-recent-themes
```

Contenu :

```json
[
  "theme-recent-1",
  "theme-recent-2"
]
```

Regles :

- maximum 10 themes conserves ;
- les 3 plus recents sont utilises pour eviter une redondance immediate ;
- un theme revu remonte en tete ;
- les anecdotes sans theme restent eligibles.

## 3. Selection

Le service conserve d'abord ses filtres existants :

1. departement ;
2. statut valide ;
3. contexte, categorie, ton ou rarete si demandes ;
4. exclusion des anecdotes deja vues quand activee.

Ensuite seulement, la diversite thematique intervient :

```text
si une alternative hors des 3 derniers themes existe :
  choisir parmi ces alternatives
sinon :
  choisir dans les candidates initiales
```

## 4. Fonctions exposees

Ajouts dans `src/services/anecdotesService.js` :

- `getRecentAnecdoteThemes()`
- `recordAnecdoteTheme(theme)`
- `resetRecentAnecdoteThemes()`

La fonction existante `recordAnecdoteDisplay(id, anecdote)` enregistre maintenant aussi le theme de l'anecdote affichee.

## 5. Compatibilite avec les phases precedentes

### Phase 03 - statistiques locales

Pas de modification des statistiques communautaires locales.

Le service `communityStatsService.js` reste independant.

### Phase 04 - decouvertes et rarete

Pas de modification du service `discoveryService.js`.

Les anecdotes rares restent selectionnables. Si plusieurs anecdotes rares existent, le moteur privilegie celle dont le theme n'est pas recent. Si une seule existe, elle reste affichee.

## 6. Garanties

- Seules les anecdotes validees peuvent etre affichees.
- Les anecdotes `à vérifier`, `brouillon` ou `rejetée` restent exclues.
- Le fallback vers `dep.anecdote` reste actif si aucune anecdote validee n'est disponible.
- Le scoring est inchange.
- Les grilles sont inchangees.
- Les contenus editoriaux sont inchanges.
- Les statuts sont inchanges.
- Les sources sont inchangees.

## 7. Limites assumées

- Le champ `theme` n'est pas present sur toutes les anecdotes.
- La logique ne mesure pas encore la proximite semantique entre deux themes differents.
- L'historique est local au navigateur.
- Le joueur ne voit pas encore la liste des themes vus.

## 8. Prochaine iteration

Priorites possibles :

1. afficher les themes recemment decouverts dans l'ecran statistiques ;
2. creer une collection de themes vus ;
3. regrouper les themes proches en familles ;
4. utiliser les familles pour eviter des redondances plus fines ;
5. connecter theme, rarete et statistiques communautaires.

