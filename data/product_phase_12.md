# Produit Phase 12 - Refonte UX des ecrans de resultat

Date : 2026-06-10

## Objectif

Ameliorer concretement l'experience visuelle mobile des ecrans de resultat, des fiches departementales et des libelles visibles, sans modifier le gameplay ni les donnees metier.

Les phases 09, 10 et 11 restent conservees telles quelles. Cette phase ne les renumerote pas et ne les remplace pas.

## Fichiers modifies

- `src/main.jsx`
- `src/styles.css`
- `data/product_phase_12.md`

## Changements UX codes

### 1. Libelles visibles

Le libelle visible `Bonus underdog` a ete remplace par :

- `Bonus choix rare`

Le tag metier `underdog` reste conserve dans les donnees, mais son affichage joueur passe par `choix rare`.

Dans la fiche departement, les textes associes au bonus de prestige ont ete rendus plus naturels :

- `Bonus choix rare +1`
- `Bonus choix rare plafonne`
- `Choix rare`

La variable interne `underdogBonus` n'a pas ete renommee afin de ne pas toucher au scoring ni aux contrats de donnees existants.

### 2. Resultats plus compacts sur mobile

Les cartes de score utilisent maintenant :

- moins de marge parasite dans la grille ;
- des cartes plus petites sur mobile ;
- des chiffres et libelles reduits ;
- des cartes de recit plus compactes ;
- un code departement plus petit dans les cartes de resultat ;
- un texte de taux plus naturel : `X% des joueurs pourraient tenter ce departement ici.`

Objectif : reduire l'empilement visuel sans retirer d'information.

### 3. Fiche departement plus attractive

La fiche departement met davantage en avant la decouverte :

1. lieu remarquable ;
2. ancrage geographique ;
3. score ;
4. bloc `A retenir` ;
5. explication du score ;
6. caracteristiques du departement.

Le bloc anecdote est maintenant traite comme un bloc editorial :

- fond legerement distingue ;
- titre plus lisible ;
- texte mieux espace ;
- badges de decouverte conserves ;
- position plus haute dans la fiche.

### 4. Sections plus lisibles

Les libelles techniques ont ete adoucis :

- `Pourquoi il marque` devient `Pourquoi ce choix marque` ;
- `Tags ligne actives` devient `Cote ligne` ;
- `Tags colonne actives` devient `Cote colonne` ;
- `Tags actives` devient `Ce qui a compte` ;
- `Tags du departement` devient `Caracteristiques du departement`.

Le vocabulaire visible est moins technique pour un joueur non specialiste.

### 5. Tags moins envahissants

Les tags de fin de fiche sont conserves, mais rendus plus discrets :

- opacite reduite ;
- pastilles plus petites ;
- espacement plus serre ;
- section moins presente visuellement.

Ils restent disponibles pour comprendre le systeme, mais ne concurrencent plus l'anecdote.

### 6. Mobile first

Les styles mobiles ajoutent :

- raisons de score en une colonne ;
- bloc anecdote plus compact ;
- hero de fiche reduit ;
- cartes de resultat moins hautes ;
- badges et tendances contenus dans leur parent ;
- textes longs capables de revenir a la ligne.

## Ce qui n'a pas ete modifie

- scoring ;
- regles ;
- grilles ;
- anecdotes ;
- collections ;
- statuts de validation ;
- sources ;
- services metier ;
- selection des anecdotes ;
- systeme de rarete ;
- statistiques locales ;
- chargement des donnees.

## Limites volontairement conservees

### Pas d'images supplementaires

Aucun systeme d'images n'a ete ajoute. Les placeholders existants restent en place.

### Pas de refonte du moteur

La Phase 12 ne modifie pas :

- la logique de score ;
- la logique d'anecdotes ;
- la logique de collections ;
- la logique de tendances locales.

### Pas de reduction du bundle

Le gros chunk Vite reste un sujet connu, mais il n'est pas traite ici pour eviter de melanger UX et optimisation technique.

### Pas de masquage interactif des tags

Les tags sont rendus plus discrets, mais aucun accordéon ni bouton d'expansion n'est ajoute.

## Pistes reportees

- test visuel sur mobile reel avec capture ;
- compression ou chargement differe des anecdotes ;
- mode compact pour l'ecran statistiques ;
- accordéon optionnel pour les caracteristiques ;
- images reelles ou placeholders enrichis pour les lieux ;
- formulation plus courte des tendances locales si les tests montrent une surcharge ;
- renommage interne futur de `underdogBonus` si un nettoyage technique est decide.

## Verification

Commande a lancer apres cette phase :

```text
npm run build
```

Objectif de verification :

- build OK ;
- aucun changement de scoring ;
- aucun changement de donnees editoriales ;
- aucun changement de statut ;
- aucun changement de service metier.
