# Audit bundle - moteur d'anecdotes

Date : 2026-06-04

## Résumé exécutif

L'avertissement Vite est directement lié à l'activation du moteur d'anecdotes dans `main.jsx`.

Le bundle JavaScript principal actuel pèse :

| Artefact | Taille | Gzip |
| --- | ---: | ---: |
| `dist/assets/index-B4TWsjYm.js` | 1 571 722 octets, soit 1 534.88 KiB | 313 540 octets, soit 306.19 KiB |
| `dist/assets/index-DbBPqYTI.css` | 13 995 octets, soit 13.67 KiB | 3 453 octets, soit 3.37 KiB |

Vite signale l'avertissement car le chunk JS dépasse 500 kB après minification. Avant activation du moteur éditorial, le build observé était autour de 295 kB minifié et 88 kB gzip. Après activation, il est autour de 1.57 MB minifié et 316 kB gzip. Le saut est donc d'environ +1.28 MB minifié et +228 kB gzip.

La cause principale est l'import de `src/services/anecdotesService.js` dans `main.jsx`, qui importe `src/data/anecdotes.js`, qui agrège tous les batchs éditoriaux.

## Point critique

Le bundle ne charge pas seulement les 1700 anecdotes validées. Il charge actuellement l'agrégat complet :

| Statut | Nombre |
| --- | ---: |
| Anecdotes éditoriales totales chargées côté client | 2171 |
| Anecdotes validées exploitables | 1700 |
| Anecdotes encore à vérifier mais présentes dans le bundle | 471 |

Le service empêche bien l'affichage public des anecdotes non validées. En revanche, d'un point de vue bundle, les contenus `à vérifier` sont tout de même inclus dans le JavaScript envoyé au navigateur.

## Contribution probable de l'agrégat éditorial

Les fichiers `src/data/anecdotes/batch*.js` pèsent ensemble :

| Mesure | Valeur |
| --- | ---: |
| Total source brut des batchs | 1 509 155 octets, soit 1 473.78 KiB |
| Total source gzip des batchs concaténés | 230 983 octets, soit 225.57 KiB |
| Part du JS final brut représentée par les batchs source | environ 96.0 % |
| Part du JS final gzip représentée par les batchs source gzip | environ 73.7 % |

Ces ratios ne sont pas une mesure de bundle analyzer exacte, car Rollup/Vite transforme et compresse différemment le code final. Ils suffisent toutefois à expliquer l'ordre de grandeur : le poids vient très majoritairement des contenus textuels d'anecdotes.

## Fichiers source les plus lourds

| Fichier | Taille source | Gzip source |
| --- | ---: | ---: |
| `src/data/anecdotes/batch005.js` | 224 150 o | 29 022 o |
| `src/data/anecdotes/batch006.js` | 224 085 o | 28 532 o |
| `src/data/anecdotes/batch002.js` | 222 777 o | 37 678 o |
| `src/data/anecdotes/batch004.js` | 222 656 o | 30 236 o |
| `src/data/anecdotes/batch007.js` | 221 317 o | 41 030 o |
| `src/data/anecdotes/batch003.js` | 197 809 o | 35 380 o |
| `src/data/anecdotes/batch001.js` | 196 361 o | 34 890 o |
| `src/gameData.js` | 83 629 o | non mesuré ici |
| `src/main.jsx` | 35 108 o | 8 878 o |
| `src/tagTaxonomy.js` | 19 138 o | non mesuré ici |
| `src/services/anecdotesService.js` | 8 444 o | 2 069 o |
| `src/data/anecdotes.js` | 6 412 o | 2 065 o |

Le service lui-même est léger. Le problème n'est pas l'algorithme de sélection, mais le fait que les données éditoriales soient importées statiquement dans le chemin principal de l'application.

## Impact du chargement côté client

### Réseau

Le coût réseau gzip actuel est d'environ 306 KiB pour le JS principal. Ce n'est pas catastrophique pour un MVP, mais c'est déjà significatif pour un jeu mobile consulté rapidement, surtout sur réseau faible.

### Parsing JavaScript

Le navigateur doit télécharger, parser et initialiser un objet contenant 2171 anecdotes, dont 471 ne sont pas affichables. Sur desktop, l'impact restera probablement faible. Sur mobile d'entrée de gamme, cela peut retarder légèrement le premier affichage interactif.

### Cache

Le contenu éditorial étant inclus dans le chunk principal, toute modification d'anecdote peut invalider le hash du bundle applicatif. Un changement de contenu peut donc forcer le navigateur à retélécharger l'application complète, pas seulement les données éditoriales.

### Confidentialité éditoriale

Même si les anecdotes `à vérifier` ne sont pas exposées dans l'UI, elles sont techniquement présentes dans le bundle. Ce n'est pas un problème de données personnelles, mais c'est un problème éditorial : un utilisateur technique peut les inspecter.

### Évolutivité

À 1700 validées, le coût reste acceptable pour un MVP. À 3000 ou 5000 anecdotes, le bundle principal deviendra probablement trop lourd. À 10 000 anecdotes, l'import statique n'est plus défendable.

## Options d'optimisation

### 1. Conserver l'état actuel pour le MVP

| Critère | Évaluation |
| --- | --- |
| Complexité | Très faible |
| Gain attendu | Aucun gain technique |
| Risque de régression | Très faible |
| Avantage | Aucun chantier supplémentaire, logique déjà validée, build OK |
| Limite | Bundle lourd, anecdotes non validées présentes dans le JS, scalabilité limitée |
| Recommandation | Acceptable temporairement si le trafic bêta reste faible et que la priorité est de valider l'expérience produit |

Verdict : bon choix MVP court terme, à condition de ne pas dépasser longtemps quelques milliers d'anecdotes chargées statiquement.

### 2. Import dynamique par département

Principe : charger les anecdotes d'un département seulement quand une fiche ou une carte de résultat en a besoin.

Exemple conceptuel :

```js
const module = await import(`./data/anecdotes/byDepartment/${code}.js`);
```

| Critère | Évaluation |
| --- | --- |
| Complexité | Moyenne |
| Gain attendu | Très fort sur le bundle initial |
| Risque de régression | Moyen |
| Avantage | Charge uniquement les départements consultés ; très bon modèle pour un jeu de fiches |
| Limite | Nécessite de restructurer les données et de rendre la sélection asynchrone |
| Recommandation | Meilleure piste long terme pour l'expérience joueur |

Verdict : stratégie cible la plus saine si GeoDoku continue à grossir.

### 3. Découpage par batch

Principe : conserver les fichiers `batch001`, `batch002`, etc., mais les charger dynamiquement selon les départements couverts.

| Critère | Évaluation |
| --- | --- |
| Complexité | Faible à moyenne |
| Gain attendu | Moyen |
| Risque de régression | Faible à moyen |
| Avantage | Réutilise la structure actuelle ; migration plus simple |
| Limite | Un département consulté peut forcer le chargement de 300 anecdotes si son batch est importé |
| Recommandation | Bonne étape intermédiaire si l'on veut réduire vite le bundle sans refactor complet |

Verdict : compromis pragmatique, mais moins précis que le découpage par département.

### 4. Découpage par département

Principe : générer un fichier par département, par exemple `src/data/anecdotes/byDepartment/57.js`.

| Critère | Évaluation |
| --- | --- |
| Complexité | Moyenne à élevée |
| Gain attendu | Très fort |
| Risque de régression | Moyen |
| Avantage | Granularité parfaite ; chaque fiche charge seulement ce dont elle a besoin |
| Limite | Plus de fichiers, besoin d'un script de génération ou d'une convention stricte |
| Recommandation | Très recommandé à long terme, surtout avec 3000 à 10 000 anecdotes |

Verdict : meilleure architecture de données si le système éditorial devient central.

### 5. Index léger + chargement différé

Principe : charger au démarrage uniquement un index minimal :

```js
{
  "57": { count: 31, rareCount: 0, chunks: ["batch007"] }
}
```

Puis charger les anecdotes complètes au moment nécessaire.

| Critère | Évaluation |
| --- | --- |
| Complexité | Moyenne |
| Gain attendu | Très fort sur le premier chargement |
| Risque de régression | Moyen |
| Avantage | Permet d'afficher la disponibilité sans charger les textes ; prépare les statistiques et filtres |
| Limite | Nécessite une API interne asynchrone et une gestion de fallback pendant le chargement |
| Recommandation | Très bonne stratégie long terme, compatible avec découpage par département |

Verdict : probablement la meilleure architecture produit : index léger immédiat, contenu différé à la demande.

### 6. Compression ou minification spécifique

Pistes possibles :

- exporter les anecdotes en JSON compressible plutôt qu'en objets JS verbeux ;
- raccourcir les clés (`code_departement` -> `d`, `statut_validation` -> `s`) dans un format généré ;
- exclure les champs non nécessaires au runtime public (`source`, `date_ajout`, `date_modification`, `statut_validation` si le fichier public ne contient que des validées) ;
- servir un fichier `.json` statique gzip/brotli via le serveur ;
- générer un dataset public ne contenant que les anecdotes validées.

| Critère | Évaluation |
| --- | --- |
| Complexité | Faible à moyenne |
| Gain attendu | Moyen |
| Risque de régression | Faible si généré automatiquement |
| Avantage | Réduit le volume sans changer radicalement le modèle |
| Limite | Ne règle pas le problème principal si tout reste chargé au démarrage |
| Recommandation | Utile en complément, pas comme seule solution |

Verdict : intéressant une fois le découpage décidé, surtout pour ne publier que les champs nécessaires à l'affichage.

## Comparatif synthétique

| Piste | Complexité | Gain attendu | Risque | Recommandation |
| --- | --- | --- | --- | --- |
| État actuel MVP | Très faible | Aucun | Très faible | Garder temporairement |
| Import dynamique par département | Moyenne | Très fort | Moyen | Cible long terme |
| Découpage par batch | Faible à moyenne | Moyen | Faible à moyen | Bonne transition |
| Découpage par département | Moyenne à élevée | Très fort | Moyen | Architecture durable |
| Index léger + chargement différé | Moyenne | Très fort | Moyen | Meilleure stratégie produit |
| Compression/minification spécifique | Faible à moyenne | Moyen | Faible | Complément utile |

## Recommandation MVP

Conserver l'état actuel pour le MVP immédiat.

Raison : le build passe, le coût gzip reste autour de 306 KiB, et la priorité produit est de valider que les anecdotes enrichissent vraiment l'expérience de résultat. Optimiser maintenant risquerait d'introduire de l'asynchrone dans un flux qui vient juste d'être activé.

Conditions :

- ne pas produire encore plusieurs milliers d'anecdotes supplémentaires sans revoir le chargement ;
- surveiller le temps de chargement mobile ;
- accepter temporairement que les anecdotes `à vérifier` soient présentes dans le bundle, mais non affichées.

## Recommandation long terme

Mettre en place un index léger + chargement différé par département.

Architecture cible :

1. Générer un index public léger contenant seulement les départements, le nombre d'anecdotes validées, les raretés disponibles et éventuellement les thèmes.
2. Générer un fichier public par département ne contenant que les anecdotes `validée`.
3. Charger dynamiquement le fichier du département quand une carte de résultat ou une fiche département est affichée.
4. Garder le fallback `dep.anecdote` pendant le chargement ou en cas d'erreur.
5. Supprimer du dataset public les champs éditoriaux inutiles au runtime : sources internes, dates, statuts non publics.

Cette stratégie règle simultanément :

- le poids du bundle initial ;
- la présence des anecdotes non validées dans le JS public ;
- la scalabilité vers 3000, 5000 ou 10 000 anecdotes ;
- la possibilité de faire évoluer les contenus sans invalider toute l'application.

## Build

`npm.cmd run build` doit rester le contrôle final après cet audit. Le build actuel passe, avec l'avertissement Vite de chunk supérieur à 500 kB.
