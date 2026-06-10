# Produit Phase 04 - Decouvertes et rarete

Date : 2026-06-09

Objectif : creer la premiere mecanique de collection et de decouverte de GeoDoku France a partir des anecdotes validees deja presentes, sans backend et sans modifier les regles de jeu.

## 1. Principe produit

GeoDoku ne doit pas seulement donner un score. Il doit aussi donner au joueur l'impression d'avoir decouvert une parcelle du territoire.

La rarete des anecdotes devient donc un signal emotionnel :

- une anecdote commune enrichit la fiche ;
- une anecdote rare devient une petite recompense ;
- une anecdote legendaire devient un moment de collection.

## 2. Niveaux de rarete

| Rareté | Niveau | Indicateur MVP |
| --- | ---: | --- |
| commune | 0 | Aucun indicateur. |
| peu commune | 1 | Aucun indicateur pour l'instant. |
| rare | 2 | ⭐ Anecdote rare |
| tres rare | 3 | ⭐⭐ Anecdote tres rare |
| legendaire | 4 | ⭐⭐⭐ Anecdote legendaire |

Le MVP affiche uniquement les raretes `rare` ou superieures afin de ne pas surcharger les cartes de resultat.

## 3. Service dedie

Service cree :

```text
src/services/discoveryService.js
```

Responsabilites :

- normaliser les valeurs de rarete ;
- fournir les metadonnees visuelles ;
- identifier les anecdotes qui declenchent une decouverte ;
- enregistrer localement les anecdotes rares, tres rares et legendaires vues ;
- calculer les statistiques de collection.

## 4. Historique local

Cle localStorage :

```text
geodoku-france-discoveries-v1
```

Structure :

```json
{
  "schemaVersion": 1,
  "discoveries": []
}
```

Chaque decouverte contient :

- id de l'anecdote ;
- titre ;
- rarete ;
- code departement ;
- nom departement ;
- contexte d'affichage ;
- theme ;
- date de decouverte.

L'enregistrement est idempotent : revoir la meme anecdote ne la compte pas deux fois.

## 5. Affichage MVP

L'indicateur est affiche :

- dans les cartes de resultat ;
- dans la fiche "A propos du departement".

Exemples :

```text
⭐ Anecdote rare
⭐⭐ Anecdote tres rare
⭐⭐⭐ Anecdote legendaire
```

Le style reste discret : badge compact, couleurs deja proches de l'identite actuelle, pas de refonte visuelle.

## 6. Statistiques ajoutees

Dans l'ecran "Statistiques du joueur", deux compteurs de collection sont ajoutes :

- anecdotes rares decouvertes ;
- anecdotes legendaires decouvertes.

Le compteur "anecdotes rares" inclut les raretes `rare`, `tres rare` et `legendaire`.

## 7. Ce qui ne change pas

- scoring inchange ;
- grilles inchangees ;
- regles inchangees ;
- contenus editoriaux inchanges ;
- statuts editoriaux inchanges ;
- statistiques joueur existantes conservees ;
- statistiques communautaires locales conservees.

## 8. Limites du MVP

- Les decouvertes restent locales au navigateur.
- Le joueur ne voit pas encore la liste complete des anecdotes decouvertes.
- Les collections par theme ne sont pas encore affichees.
- `peu commune` est definie visuellement dans le service, mais pas encore mise en avant dans l'interface.

## 9. Prochaine iteration

Priorites recommandees :

1. afficher une petite collection des dernieres decouvertes rares ;
2. ajouter les themes decouverts ;
3. creer des collections par familles territoriales ;
4. ajouter un indicateur "premiere decouverte du departement" ;
5. connecter plus tard les decouvertes aux statistiques communautaires.

