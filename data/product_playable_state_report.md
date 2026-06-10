# Rapport d'etat jouable - GeoDoku France

Date : 2026-06-09

Objectif : documenter l'etat produit jouable apres les phases 03, 04 et 05, avant d'ajouter de nouvelles fonctionnalites.

Ce rapport ne modifie aucun code, aucun contenu editorial, aucun statut et aucune regle de gameplay.

## 1. Contenu disponible

| Indicateur | Valeur |
| --- | ---: |
| Anecdotes editoriales totales | 3311 |
| Anecdotes validees | 2840 |
| Anecdotes encore a verifier | 471 |
| Anecdotes dans le JSON public | 2840 |
| Codes departement / territoire couverts | 107 |
| Codes couverts dans le JSON public | 107 |
| Anecdotes non validees dans le JSON public | 0 |
| Taille du JSON public | 1557809 octets |

Lecture : le produit jouable dispose maintenant d'une profondeur editoriale exploitable. La dette restante existe encore, mais elle n'est pas exposee dans le JSON public et n'est pas affichable par le service de selection validee.

Dette editoriale restante :

- 471 anecdotes encore a verifier ;
- dette concentree sur les anciens lots non encore totalement valides ;
- aucune source manquante detectee dans la derniere synthese ;
- aucun doublon de contenu signale ;
- une partie importante des anciennes priorites A correspond a des textes courts mais acceptables en lecture mobile.

## 2. Experience anecdote

### Selection dynamique

L'affichage des anecdotes ne repose plus uniquement sur `dep.anecdote`.

Le flux actuel privilegie :

1. une anecdote validee issue du moteur editorial ;
2. une anecdote contextuelle selon le score de case quand possible ;
3. une anecdote jamais vue localement quand possible ;
4. une anecdote rare pour le coup de maitre quand possible ;
5. le fallback `dep.anecdote` si aucune anecdote validee n'est disponible.

### Fallback `dep.anecdote`

Le fallback reste actif et garde le jeu robuste :

- si aucun contenu valide n'existe ;
- si le moteur retourne `null` ;
- si une anomalie empeche la selection dynamique.

Ce fallback preserve l'experience et evite toute case vide.

### Anti-repetition par ID

Le service conserve l'historique local des anecdotes vues avec :

```text
geodoku-france-anecdotes-seen
```

Objectif : eviter d'afficher deux fois la meme anecdote quand une alternative validee existe.

Si toutes les anecdotes d'un departement ont deja ete vues, le moteur autorise de nouveau une anecdote vue afin de ne jamais bloquer l'affichage.

### Anti-redondance par theme

Depuis la phase 05, le moteur utilise aussi :

```text
geodoku-france-anecdotes-recent-themes
```

Regles :

- maximum 10 themes recents conserves ;
- les 3 derniers themes sont evites si une alternative validee existe ;
- les anecdotes sans theme restent eligibles ;
- si aucune alternative n'existe, l'anecdote reste affichable.

### Rarete affichee

Depuis la phase 04, les anecdotes rares ou superieures affichent un indicateur discret :

| Rareté | Affichage |
| --- | --- |
| rare | Etoile - Anecdote rare |
| tres rare | Deux etoiles - Anecdote tres rare |
| legendaire | Trois etoiles - Anecdote legendaire |

Les niveaux `commune` et `peu commune` sont reconnus par le service mais ne sont pas mis en avant dans le MVP pour ne pas surcharger l'interface.

### Decouvertes rares et legendaires

Les decouvertes sont enregistrees localement via :

```text
geodoku-france-discoveries-v1
```

Le systeme stocke :

- anecdotes rares decouvertes ;
- anecdotes tres rares decouvertes ;
- anecdotes legendaires decouvertes ;
- departement et contexte d'affichage ;
- theme si disponible ;
- date de decouverte.

L'enregistrement est idempotent : une meme anecdote rare revue plus tard ne compte pas deux fois.

## 3. Statistiques locales

### Evenements enregistres

Depuis la phase 03, chaque validation de grille ajoute des evenements locaux dans :

```text
geodoku-france-community-stats-v1
```

Pour chaque reponse validee :

- edition ;
- difficulty ;
- cellKey ;
- rowId / colId ;
- departement cible statistique ;
- departement choisi ;
- score de case ;
- succes ou echec ;
- premier essai ou non ;
- date.

### Statistiques calculees

Le service calcule actuellement :

- nombre de parties jouees ;
- nombre de reponses enregistrees ;
- nombre de reussites ;
- taux de reussite global ;
- taux de reussite au premier essai ;
- taux de reussite par departement cible ;
- departement le plus souvent confondu avec une cible ;
- taux de reussite par croisement.

### Affichage actuel cote UI

Dans les cartes de resultat, l'interface peut afficher une phrase discrete :

- `Tendance locale : 67% de reussite sur ce croisement.`
- `Tendance locale : 58% de reussite pour la Lozere.`
- `Tendance locale : Indre-et-Loire est le plus souvent confondu avec Loiret.`

La formulation dit volontairement `locale`, car aucun backend communautaire n'est encore branche.

### Limites du localStorage

- Les statistiques restent propres au navigateur.
- Elles ne representent pas encore la communaute globale.
- Elles peuvent etre effacees par l'utilisateur ou le navigateur.
- Elles ne synchronisent pas plusieurs appareils.
- Les archives rejouees peuvent enrichir plusieurs fois l'historique local.

### Compatibilite backend future

Les evenements locaux sont deja structures comme des payloads anonymes.

Un backend futur pourrait agreger les memes champs sans changer le modele conceptuel :

- edition ;
- croisement ;
- departement cible ;
- departement choisi ;
- score ;
- succes ;
- premier essai ;
- date.

## 4. Services actifs

| Service / outil | Role actuel |
| --- | --- |
| `src/services/anecdotesService.js` | Selection dynamique validee, fallback indirect, anti-repetition par ID, anti-redondance par theme, stats d'affichage anecdote. |
| `src/services/communityStatsService.js` | Enregistrement local des reponses validees, calculs de reussite, premier essai et confusions. |
| `src/services/discoveryService.js` | Metadonnees de rarete, affichage des badges rares, historique local des decouvertes. |
| `scripts/generatePublicAnecdotesDataset.js` | Generation du JSON public allegé contenant uniquement les anecdotes validees. |
| `public/data/anecdotes-valides.json` | Dataset public valide, pret pour une future bascule vers chargement differe. |

## 5. Donnees locales

| Cle localStorage | Role | Garantie |
| --- | --- | --- |
| `geodoku-france-player-stats` | Statistiques joueur : meilleur score, parties jouees, moyenne, coups de maitre, departement favori. | Cle historique conservee. |
| `geodoku-france-daily-results` | Edition quotidienne terminee et consultation du resultat. | Cle historique conservee. |
| `geodoku-france-anecdotes-seen` | IDs des anecdotes deja vues pour anti-repetition. | Ajout progressif, pas d'ecrasement des autres donnees. |
| `geodoku-france-anecdotes-stats` | Affichages, lectures et appreciations d'anecdotes. | Cle separee du gameplay. |
| `geodoku-france-anecdotes-recent-themes` | 10 derniers themes vus, dont 3 evites si possible. | Nouvelle cle Phase 05, n'ecrase aucune ancienne cle. |
| `geodoku-france-community-stats-v1` | Evenements locaux de parties et reponses validees. | Nouvelle cle Phase 03, schema versionne. |
| `geodoku-france-discoveries-v1` | Anecdotes rares, tres rares et legendaires decouvertes. | Nouvelle cle Phase 04, schema versionne. |

Garantie globale : chaque chantier produit utilise une cle dediee ou une extension additive. Aucune ancienne donnee locale n'est remplacee par une nouvelle structure incompatible.

## 6. Tests et garanties

| Verification | Etat |
| --- | --- |
| `npm.cmd run build` | OK |
| Filtre du service public valide uniquement | OK : 2840 validees, 0 non validee retournee. |
| JSON public valide uniquement | OK : 2840 entrees, 0 non validee exposee. |
| Anti-repetition par ID | OK |
| Anti-redondance par theme | OK |
| Fallback theme si aucune alternative | OK |
| Decouvertes et rarete | OK |
| Statistiques locales | OK |
| Scoring | Inchange. |
| Regles de jeu | Inchangees. |
| Contenus editoriaux | Inchanges. |
| Statuts editoriaux | Inchanges. |

Note technique : le build signale toujours un gros chunk JavaScript. C'est attendu et lie au volume editorial encore importe statiquement. Le build reste valide.

## 7. Prochaines priorites recommandees

### Quick wins

- Afficher les dernieres decouvertes rares dans l'ecran Statistiques.
- Afficher les themes recemment vus.
- Ajouter un petit compteur de themes decouverts.
- Clarifier certains textes UI : `tendance locale` vs future statistique communautaire.
- Creer un mini panneau debug local des statistiques produit.

### Moyen terme

- Ajouter des collections par theme.
- Ajouter une premiere page de progression culturelle : departements vus, themes vus, raretes vues.
- Reclasser les 471 anecdotes a verifier avec la grille Phase 01.
- Produire quelques anecdotes contextuelles `bonne_reponse`, `mauvaise_reponse`, `anecdote_rare`.
- Ajouter un fichier de statistiques communautaires statiques ou simulees pour l'effet social avant backend.

### Long terme

- Brancher un backend anonyme d'agregation communautaire.
- Migrer la selection d'anecdotes vers le JSON public valide.
- Decouper le chargement par departement ou via index leger.
- Construire des series thematiques jouables.
- Exploiter les confusions reelles pour ameliorer les grilles et creer des commentaires pedagogiques.

## Conclusion

GeoDoku France est maintenant jouable comme experience produit, pas seulement comme grille de score.

L'etat actuel combine :

- un moteur de jeu stable ;
- une base editoriale validee et filtrée ;
- des anecdotes dynamiques ;
- une mecanique locale de statistiques ;
- une mecanique de rarete et decouverte ;
- une anti-redondance thematique douce ;
- une architecture compatible avec un futur backend et un futur chargement differe.

La prochaine valeur produit viendra moins de nouveaux contenus que d'une meilleure mise en scene de ce qui existe deja.

