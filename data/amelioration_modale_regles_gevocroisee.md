# Rapport amelioration editoriale - Modale Regles / Comment jouer

Date : 2026-06-11

## 1. Textes modifies

### Clarification de la premiere action

Ancien texte :

> Chaque jour, une grille 3x3 croise plusieurs themes lies au territoire francais.
> Votre objectif n'est pas seulement de trouver une reponse correcte.
> Vous devez placer les departements les plus pertinents, sans jamais utiliser deux fois le meme.

Nouveau texte :

> Chaque jour, une grille 3x3 croise plusieurs themes lies aux territoires francais.
> Touchez une case, choisissez un departement, puis completez les 9 cases sans utiliser deux fois le meme departement.
> Plusieurs reponses peuvent fonctionner pour un meme croisement : le but est de trouver les departements les plus pertinents, originaux ou rares.

### Simplification de la phrase sur le score

Ancien texte :

> Le score, sur 101, recompense la coherence, l'originalite, la rarete et votre capacite a optimiser toute la grille.

Nouveau texte :

> Le score, sur 101, recompense la coherence de la grille, les choix rares et les placements bien optimises.

### Transition vers l'explication du nom

Texte ajoute :

> Le nom du jeu raconte aussi cette maniere de jouer.

## 2. Justification des changements

- La premiere action du joueur est maintenant explicite des la premiere lecture : toucher une case, choisir un departement, remplir les 9 cases.
- La possibilite de plusieurs reponses par croisement est clarifiee sans introduire de jargon.
- L'objectif editorial reste coherent avec l'esprit du jeu : pertinence, originalite et rarete.
- La phrase sur le score est plus directe et evite une accumulation de notions proches.
- La transition vers `Pourquoi GevoCroisee ?` rend le passage entre les regles pratiques et l'identite du jeu plus naturel.
- La structure generale de la modale est conservee.

## 3. Fichiers touches

- `src/main.jsx`
- `src/styles.css`
- `data/amelioration_modale_regles_gevocroisee.md`

## 4. Resultat du build

Commande executee :

```bash
npm.cmd run build
```

Resultat : succes.

Sortie generee :

- `dist/index.html`
- `dist/assets/index-BvZ9Iv7D.css`
- `dist/assets/index-EKP9jbHC.js`

Note : Vite conserve le warning existant sur un chunk JavaScript superieur a 500 kB. Ce warning n'est pas lie a cette modification editoriale.

## 5. Estimation editoriale finale

**9 / 10**

La modale conserve son ton actuel, gagne en clarte pour un premier joueur et integre plus naturellement le bloc `Pourquoi GevoCroisee ?`.

## Confirmation de perimetre

Aucun gameplay, scoring, mecanique, departement, anecdote, collection ou JSON metier n'a ete modifie.
