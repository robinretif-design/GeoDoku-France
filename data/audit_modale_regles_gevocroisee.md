# Audit editorial - Modale Regles / Comment jouer

Date : 2026-06-11

## 1. Points forts de la modale

- L'acces est logique : le bouton `Regles` est visible dans l'en-tete et correspond bien au besoin d'un nouveau joueur.
- Le principe general est compris rapidement : une grille 3x3, des criteres croises, des departements a placer.
- Le texte pose bien la difference centrale de GevoCroisee : il ne s'agit pas seulement de trouver une bonne reponse, mais de choisir la meilleure reponse pour la grille.
- Le bloc `Pourquoi GevoCroisee ?` renforce efficacement l'identite du jeu. Il installe une personnalite claire : geographie, culture generale, evocation, associations d'idees.
- Le ton est globalement coherent avec l'application : sobre, culturel, accessible, sans etre trop technique.
- La mise en carte du bloc de marque aide a distinguer la partie editoriale de la partie regles.

## 2. Incoherences eventuelles

### Structure

L'ordre actuel est globalement logique, mais la transition entre les regles et l'explication du nom est un peu abrupte. Le joueur passe directement d'un avertissement strategique a une explication de marque.

### Clarification des actions

La modale explique le principe, mais elle ne dit pas explicitement le geste de premiere partie : toucher une case, choisir un departement, remplir la grille, valider. Cette information existe sur l'ecran de jeu, mais un nouveau joueur qui lit les regles avant de commencer peut beneficier d'une phrase plus concrete.

### Densite du bloc de marque

Le bloc `Pourquoi GevoCroisee ?` est elegant, mais il est plus long que la partie purement pedagogique. C'est acceptable dans une modale scrollable, mais le risque est qu'un joueur presse ne lise pas jusqu'au bout.

### Redondance legere

Les idees de croisement apparaissent dans les regles, dans le nom et dans la phrase de marque. C'est coherent avec l'identite, mais le bloc de marque pourrait gagner en rythme en reduisant une ou deux formulations explicatives.

## 3. Corrections recommandees

Les corrections ci-dessous sont minimales et ne touchent qu'au texte de la modale.

### Correction 1 - Rendre la premiere action plus explicite

Texte actuel :

> Chaque jour, une grille 3x3 croise plusieurs themes lies au territoire francais.
> Votre objectif n'est pas seulement de trouver une reponse correcte.
> Vous devez placer les departements les plus pertinents, sans jamais utiliser deux fois le meme.

Texte propose :

> Chaque jour, une grille 3x3 croise plusieurs themes lies aux territoires francais.
> Touchez une case, choisissez un departement, puis completez la grille sans utiliser deux fois le meme departement.
> Votre objectif n'est pas seulement de trouver une reponse correcte : il faut placer les departements les plus pertinents au bon endroit.

Justification :

- Le geste concret arrive plus tot.
- La sequence de jeu devient immediate pour un nouveau joueur.
- La phrase conserve l'esprit strategique du texte actuel.

### Correction 2 - Simplifier la phrase sur le score

Texte actuel :

> Le score, sur 101, recompense la coherence, l'originalite, la rarete et votre capacite a optimiser toute la grille.

Texte propose :

> Le score, sur 101, recompense la coherence de la grille, les choix rares et les placements bien optimises.

Justification :

- La formulation est plus directe.
- `Originalite` et `rarete` se recouvrent partiellement dans la lecture.
- La phrase reste fidele au scoring sans entrer dans le detail technique.

### Correction 3 - Adoucir la transition vers le bloc de marque

Texte a ajouter juste avant la carte `Pourquoi GevoCroisee ?` :

> Le nom du jeu raconte aussi cette maniere de jouer.

Justification :

- La transition rend le passage entre regles et identite beaucoup plus fluide.
- Elle prepare le lecteur au changement de registre.
- Elle evite l'impression d'un bloc ajoute apres coup.

### Correction 4 - Rythmer legerement le bloc `Pourquoi GevoCroisee ?`

Texte propose pour le bloc complet :

> **Pourquoi GevoCroisee ?**
>
> Le nom du jeu reunit trois idees qui en constituent le coeur.
>
> **Ge**, pour la geographie et les territoires francais.
>
> **Evo**, pour l'evocation. Face a deux criteres, le joueur ne cherche pas seulement une reponse exacte : il mobilise ses souvenirs, sa culture generale, ses intuitions et les associations d'idees que les indices lui inspirent.
>
> **Croisee**, parce que tout le jeu repose sur des croisements. Chaque case nait de la rencontre entre deux criteres. Chaque reponse se trouve a l'intersection de plusieurs connaissances. Et chaque departement revele des liens inattendus entre l'histoire, la culture, le patrimoine, les paysages ou les traditions.
>
> GevoCroisee est donc un jeu ou la geographie rencontre l'evocation, a travers une multitude de croisements.
>
> Car la France se decouvre rarement par une seule reponse. Elle se revele la ou les idees se croisent.

Justification :

- Le fond est conserve.
- La partie `Evo` devient plus fluide et moins explicative.
- Le bloc garde sa dimension editoriale sans ralentir excessivement la lecture.

## 4. Niveau de qualite editoriale estime

**8 / 10**

La modale est deja solide : le principe est comprehensible, le ton est juste, et l'identite de marque est bien perceptible.

Les deux points qui l'empechent d'atteindre un niveau superieur sont :

- une premiere explication encore un peu abstraite pour un tout nouveau joueur ;
- une transition trop directe entre les regles pratiques et le bloc de marque.

## 5. Recommandation finale

**Appliquer les corrections proposees.**

La version actuelle peut etre conservee sans risque, mais les ajustements recommandes amelioreraient nettement la premiere lecture avec un impact tres faible sur le code.

Priorite recommandee :

1. Ajouter la phrase de transition vers `Pourquoi GevoCroisee ?`.
2. Reformuler les trois premieres phrases pour expliquer l'action concrete.
3. Simplifier legerement la phrase sur le score.
4. Rythmer le bloc `Evo` si l'on veut reduire la densite de lecture.

## Confirmation de perimetre

Cet audit ne recommande aucune modification du gameplay, du scoring, des mecaniques, des donnees departementales, des anecdotes, des collections ou des contenus JSON.
