# Phase 19 - Conception de l'identite visuelle GevoCroisee

## Objectif

Proposer trois directions artistiques distinctes pour installer une identite visuelle coherente avec `GévoCroisée`, jeu quotidien de reflexion territoriale fonde sur la geographie, l'evocation, la memoire, l'interpretation, le croisement d'idees et la decouverte des departements francais.

Aucune modification applicative, fonctionnelle ou graphique n'a ete effectuee pendant cette phase.

## Synthese issue de la phase 18

L'audit visuel a mis en evidence une base existante solide mais encore tres heritee de GeoDoku :

- palette actuelle dominante : creme, bleu nuit, brun patrimonial ;
- logo applicatif compose en React/CSS avec une icone `Map` Lucide ;
- icone PWA renommee mais toujours fondee sur une grille 3 x 3 et une silhouette cartographique ;
- deux signes de marque concurrents : pictogramme d'en-tete et icone PWA ;
- illustrations SVG territoriales coherentes entre elles, mais generiques et peu specifiques a `GévoCroisée` ;
- absence d'image OpenGraph/Twitter et de systeme de marque source unique ;
- vocabulaire graphique centre sur la grille, la carte et le puzzle, mais pas encore sur l'idee de croisement.

Le principal enjeu de la refonte est donc de conserver la lisibilite territoriale tout en donnant a `GévoCroisée` un signe propre, memorisable et deployable en favicon, PWA, header, resultats et partages.

## Direction A - Territoriale, cartographique, institutionnelle moderne

### Concept

Une identite precise, calme et fiable, inspiree des cartes contemporaines, des services publics numeriques et des atlas modernes. La marque se positionne comme un jeu intelligent, rigoureux et quotidien, avec une forte legitimite geographique.

Le croisement est exprime par des lignes de coordonnees, des axes cartographiques, des intersections et des fragments de contours departementaux.

### Palette couleur

| Role | Couleur | Intention |
|---|---:|---|
| Primaire | `#18324A` | Bleu cartographique profond, serieux et lisible |
| Secondaire | `#2F6F62` | Vert territoire, vegetation, relief |
| Accent | `#D66A3A` | Corail administratif, signal de decision |
| Fond | `#F5F7F2` | Blanc casse froid, propre et institutionnel |
| Surface | `#FFFFFF` | Cartes et panneaux UI |
| Texte | `#0F172A` | Lisibilite forte |
| Ligne | `#CBD5D1` | Grilles, contours, separations |

### Typographies recommandees

- UI principale : `IBM Plex Sans`, `Inter` ou `Source Sans 3`.
- Titres editoriaux : `IBM Plex Serif` ou `Source Serif 4` si l'on veut conserver une dimension atlas.
- Chiffres et codes departements : variante tabulaire de la police UI, ou `IBM Plex Mono` en usage ponctuel.

Raison : ces familles donnent un rendu moderne, robuste et institutionnel sans tomber dans une froideur purement administrative.

### Style d'icone

Icone vectorielle simple, construite autour :

- d'un contour stylise de carte ou de territoire ;
- de deux axes qui se croisent ;
- d'un point d'intersection central ;
- d'une grille plus fine que l'ancienne grille GeoDoku.

Le signe doit rester lisible en 32 px. La grille 3 x 3 actuelle peut etre abandonnee ou reduite a un indice secondaire.

### Style de logo

Wordmark sobre : `GévoCroisée` en sans-serif nette, avec un accent graphique sur la croisee centrale, par exemple :

- un `o` ou un `é` traverse par deux axes ;
- un signe autonome a gauche du nom ;
- une ligature discrete entre l'idee de carte et l'idee d'intersection.

Le logo doit fonctionner en trois versions : icone seule, lockup horizontal, lockup vertical pour OpenGraph/PWA.

### Style des illustrations departementales

Illustrations vectorielles type atlas :

- aplats propres ;
- lignes topographiques tres legeres ;
- contours simplifiés ;
- pictogrammes locaux minimaux ;
- peu de textures ;
- codes couleur coherents par relief, littoral, ville, fleuve.

Les images doivent ressembler a des extraits de cartes interpretees, pas a des cartes administratives completes.

### Coherence avec GevoCroisee

Cette direction sert tres bien la geographie, la rigueur et la notion de croisement de criteres. Elle rassure, clarifie le produit et convient a un jeu de reflexion quotidien. Elle est aussi la plus proche du socle actuel, donc la moins risquee techniquement.

### Risques

- Peut paraitre trop institutionnelle ou trop serieuse.
- Moins memorable en mobile si le symbole reste trop fin.
- Risque de prolonger l'heritage GeoDoku si la grille reste trop presente.

## Direction B - Evocation, patrimoine, decouverte

### Concept

Une identite plus sensible, construite comme un carnet de voyage quotidien dans les territoires francais. Le joueur ne resout pas seulement une grille : il retrouve des lieux, des histoires, des paysages et des indices culturels.

Le croisement est exprime comme une rencontre entre souvenirs, indices et territoires : chemins, fragments, vignettes, annotations, traces.

### Palette couleur

| Role | Couleur | Intention |
|---|---:|---|
| Primaire | `#24334F` | Encre bleue, memoire, lecture |
| Secondaire | `#6F7F4F` | Vert olive, paysage, patrimoine |
| Accent | `#B85C38` | Terre cuite, architecture, chaleur |
| Accent clair | `#D8A84F` | Ocre, archives, soleil |
| Fond | `#F7F1E6` | Papier chaud, carnet |
| Surface | `#FFFDF7` | Page, fiche, carte |
| Texte | `#1D2433` | Encre sombre |
| Ligne | `#D8C9B6` | Trame papier et bordures |

### Typographies recommandees

- Titres et marque : `Fraunces`, `Literata` ou `Source Serif 4`.
- Interface : `Inter`, `Atkinson Hyperlegible` ou `Source Sans 3`.
- Annotations optionnelles : une italique serif tres limitee, pour anecdotes et citations courtes.

Raison : cette combinaison conserve la precision UI tout en renforcant le caractere editorial et memoriel.

### Style d'icone

Icone plus narrative :

- croisement de deux chemins ;
- repere de carte simplifie ;
- fragment de territoire ou pli de carte ;
- point central comme lieu de decouverte.

Le signe peut etre moins geometrique que la direction A, avec des angles adoucis et une forme plus organique.

### Style de logo

Logo editorial chaleureux, avec un mot-symbole plus distinctif :

- serif contemporaine pour `GévoCroisée` ;
- accent aigu possiblement transforme en petit repere ou point de carte ;
- symbole separe pouvant vivre seul sur favicon/PWA.

Le logo doit eviter l'effet "office de tourisme" en restant compact et numerique.

### Style des illustrations departementales

Illustrations type carnet d'exploration :

- aplats chauds ;
- silhouettes de monuments, paysages ou objets locaux ;
- compositions par plans successifs ;
- texture tres legere de papier ou de gravure simplifiee ;
- petites annotations visuelles possibles, sans texte obligatoire.

Les illustrations doivent evoquer le territoire sans chercher l'exactitude exhaustive.

### Coherence avec GevoCroisee

Cette direction sert fortement l'evocation, la memoire et la decouverte. Elle donne une personnalite plus riche que la base actuelle et valorise les anecdotes. Elle explique bien pourquoi un departement peut etre associe a plusieurs idees croisees.

### Risques

- Peut devenir trop editorial et moins immediatement percu comme un jeu.
- Plus couteuse a decliner sur tous les departements si les illustrations sont trop detaillees.
- Le favicon peut perdre en force si le symbole est trop narratif.

## Direction C - Jeu moderne, mobile first, forte memorisation

### Concept

Une identite plus compacte, vive et reconnaissable, pensee d'abord pour l'ecran mobile, le partage de score et l'icone PWA. `GévoCroisée` devient un rituel quotidien clair : on ouvre, on croise, on trouve, on partage.

Le croisement est exprime par un signe simple et proprietaire : une croix douce, un carrefour, quatre tuiles qui se rencontrent, ou un `G` construit autour d'une intersection.

### Palette couleur

| Role | Couleur | Intention |
|---|---:|---|
| Primaire | `#17213A` | Bleu nuit stable, fond de marque |
| Secondaire | `#1F8A70` | Vert-bleu distinctif, territoire moderne |
| Accent | `#FF6B4A` | Corail vif, reponse, energie |
| Accent jeu | `#F7C948` | Jaune signal, victoire, partage |
| Fond | `#F4F6F0` | Clair mobile, doux et lisible |
| Surface | `#FFFFFF` | Cartes nettes |
| Texte | `#111827` | Contraste UI |
| Erreur / rarete forte | `#7C3AED` | Option ponctuelle pour etats speciaux, a doser |

### Typographies recommandees

- Marque et titres compacts : `Sora`, `Space Grotesk` ou `Plus Jakarta Sans`.
- Interface : `Inter` ou `Atkinson Hyperlegible`.
- Chiffres et resultats : meme famille UI avec chiffres tabulaires.

Raison : ces familles sont lisibles en mobile, plus distinctives que l'Inter seul, et compatibles avec un jeu quotidien moderne.

### Style d'icone

Icone proprietaire tres simple :

- quatre tuiles ou quatre chemins qui convergent ;
- intersection centrale nette ;
- une diagonale ou un axe secondaire pour rappeler l'idee de "croisee" ;
- contour de territoire suggere en negatif, pas dominant.

Objectif : etre identifiable en favicon 32 px, en PWA 192 px et dans les partages de resultats.

### Style de logo

Logo court, memorisable, avec une construction modulaire :

- symbole autonome a gauche ;
- `GévoCroisée` en sans-serif geometrique ;
- accent ou point central colore ;
- version compacte `Gévo` possible pour petits espaces.

Le logo ne doit pas dependre du dessin d'une carte. La geographie doit etre un second niveau de lecture, pas le seul signe.

### Style des illustrations departementales

Illustrations plus systematiques et scalables :

- formes simples ;
- couleurs franches mais controlees ;
- un objet ou paysage cle par departement ;
- composition compatible avec miniatures ;
- pas de texture lourde ;
- grille d'illustration commune pour produire facilement de nouveaux departements.

Les images doivent fonctionner autant en grande fiche qu'en vignette de resultat.

### Coherence avec GevoCroisee

Cette direction est la plus forte pour installer la nouvelle marque. Elle traduit directement le "croisement d'idees", renforce la memorisation, simplifie les icones et rend le produit plus mobile-first. Elle permet aussi de sortir clairement de l'heritage GeoDoku sans nier le sujet territorial.

### Risques

- Peut paraitre moins patrimoniale si les couleurs sont trop vives.
- Demande une discipline stricte pour ne pas devenir generique "app de quiz".
- Les illustrations devront garder suffisamment d'indices territoriaux pour ne pas perdre la promesse geographique.

## Comparaison des trois pistes

| Critere | Direction A | Direction B | Direction C |
|---|---:|---:|---:|
| Lisibilite geographique | Tres forte | Forte | Moyenne a forte |
| Evocation / memoire | Moyenne | Tres forte | Moyenne |
| Memorisation de marque | Moyenne | Forte | Tres forte |
| Efficacite mobile / PWA | Forte | Moyenne | Tres forte |
| Rupture avec GeoDoku | Moyenne | Forte | Tres forte |
| Cout de declinaison | Faible a moyen | Moyen a eleve | Moyen |
| Compatibilite UI existante | Tres forte | Forte | Moyenne |
| Potentiel partage social | Moyen | Fort | Tres fort |

## Classement final recommande

### 1. Direction C - Jeu moderne, mobile first, forte memorisation

Recommandation principale.

Elle repond le mieux au besoin de creer une identite `GévoCroisée` distincte de GeoDoku. Le produit est un jeu quotidien : l'icone PWA, le header mobile, l'ecran de resultat et le partage doivent porter une marque simple, reconnaissable et repetable. La direction C donne le meilleur socle pour cela.

Condition de reussite : conserver des indices territoriaux dans les illustrations et les micro-details, afin que le jeu ne devienne pas visuellement interchangeable avec un quiz abstrait.

### 2. Direction B - Evocation, patrimoine, decouverte

Piste secondaire tres pertinente pour enrichir l'univers.

Elle exprime le mieux la memoire, les anecdotes et la decouverte des territoires. Elle peut devenir la couche illustrative de la direction C : un logo et une UI memorisables, accompagnes d'illustrations plus sensibles.

Condition de reussite : limiter la complexite graphique pour garder une experience rapide, lisible et facile a produire sur de nombreux departements.

### 3. Direction A - Territoriale, cartographique, institutionnelle moderne

Piste la plus sure, mais la moins distinctive.

Elle est compatible avec l'existant et rassurante, mais elle risque de prolonger l'identite GeoDoku sous une forme simplement plus propre. Elle peut fournir des principes utiles : rigueur cartographique, lignes de croisement, sobriete des surfaces, mais ne devrait pas etre la direction principale si l'objectif est une vraie relance de marque.

## Recommandation de synthese

Adopter la direction C comme structure de marque, en l'enrichissant avec :

- la precision cartographique de la direction A pour les grilles, criteres et indices ;
- la chaleur patrimoniale de la direction B pour les illustrations departementales et les anecdotes.

La future identite pourrait donc suivre ce principe :

`marque mobile-first et memorable` + `indices cartographiques sobres` + `illustrations territoriales evocatrices`.

Cette combinaison installe `GévoCroisée` comme un jeu moderne de croisement d'idees, sans perdre la promesse de decouverte des departements francais.

## Livrables a prevoir pour une phase suivante

- Logo source SVG : symbole seul, lockup horizontal, lockup vertical.
- Favicon 32 px et variantes masquees.
- Icones PWA 192 px et 512 px.
- Apple touch icon 180 px.
- Image OpenGraph/Twitter 1200 x 630 px.
- Palette de variables CSS cible.
- Gabarit d'illustration departementale.
- Mini charte d'usage : tailles minimales, fonds, marges, couleurs, interdits.

## Confirmation de non-modification

Aucun fichier applicatif, asset graphique, donnees, regle de gameplay, scoring, rarete, anecdote, collection ou logique metier n'a ete modifie. Le seul fichier cree pour cette phase est `product_phase_19.md`.
