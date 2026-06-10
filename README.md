# GeoDoku France V0.3

## Correctifs V0.3

- Logo cliquable : retour à l’accueil.
- Texte de landing page réécrit avec un ton plus naturel.
- Grille élargie sur desktop.
- Labels conservés dans leur précision, mais avec plus d’espace.
- Suppression des césures agressives.
- Layout mobile en scroll horizontal propre plutôt qu’en compression excessive.

## Lancer

```bash
npm install
npm run dev
```

## Analytics

GeoDoku ne charge aucun analytics par défaut. Le code n'ajoute pas d'identifiant joueur, ne lit pas les réponses pour l'analytics et n'envoie aucune donnée personnelle depuis l'application.

La configuration se fait avec des variables d'environnement Vite, par exemple dans `.env.local` en développement ou dans les variables de build de l'hébergeur.

### Netlify Analytics

Si le site est hébergé sur Netlify, activer Netlify Analytics dans le tableau de bord Netlify. Aucun script n'est nécessaire dans le code.

Variable optionnelle pour afficher l'état dans `/debug` :

```env
VITE_ANALYTICS_PROVIDER=netlify
```

### Google Analytics 4

```env
VITE_ANALYTICS_PROVIDER=ga4
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

Le code charge uniquement le script GA4 standard et ne transmet pas d'événement personnalisé.

### Plausible

```env
VITE_ANALYTICS_PROVIDER=plausible
VITE_PLAUSIBLE_DOMAIN=geodoku.fr
```

Optionnel si le script Plausible est auto-hébergé :

```env
VITE_PLAUSIBLE_SCRIPT_URL=https://analytics.example.com/js/script.js
```

### Umami

```env
VITE_ANALYTICS_PROVIDER=umami
VITE_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
VITE_UMAMI_SCRIPT_URL=https://analytics.example.com/script.js
```

Événements personnalisés Umami déclenchés par GeoDoku :

- `game_started`
- `game_completed`
- `game_shared`
- `department_opened`
- `rules_opened`

Propriétés envoyées :

- `game_started` : `editionId`, `difficulty`, `source`
- `game_completed` : `editionId`, `difficulty`, `scoreTotal`, `scoreCells`, `underdogBonus`, `diversityBonus`, `completionBonus`
- `game_shared` : `editionId`, `scoreTotal`
- `department_opened` : `departmentCode`, `departmentName`, `editionId`, `context`
- `rules_opened` : `screen`

Ces propriétés restent limitées au contexte de jeu et ne contiennent aucun compte utilisateur ni donnée personnelle.

### Script configurable

Pour une balise analytics compatible web non listée ci-dessus :

```env
VITE_ANALYTICS_PROVIDER=custom
VITE_ANALYTICS_SCRIPT_URL=https://analytics.example.com/script.js
```

Après modification des variables, relancer le build :

```bash
npm run build
```

## Anecdotes départementales

Le système d'anecdotes est découpé pour pouvoir accueillir progressivement plusieurs milliers de contenus sans rendre le fichier principal illisible.

Structure :

- `src/data/departements.js` : référentiel éditorial des départements.
- `src/data/anecdotes.js` : taxonomies, statuts, format CSV, anecdotes legacy et agrégat éditorial.
- `src/data/anecdotes/batch001.js` : premier lot importé de 300 anecdotes au statut `à vérifier`.
- `src/services/anecdotesService.js` : sélection, anecdotes jamais vues et statistiques locales.
- `src/utils/importAnecdotesCsv.js` : import, export et fusion CSV.
- `src/utils/auditAnecdotes.js` : contrôle qualité éditorial.
- `src/anecdotes.js` : façade de compatibilité qui réexporte les modules.

Exports principaux :

- `departements` : référentiel des 101 départements avec `code`, `nom`, `region`, `population`, `superficie`.
- `legacyAnecdotes` : premières anecdotes validées, une par département, dérivées des contenus existants.
- `anecdotesBatch001` : lot CSV importé, conservé à part et non validé.
- `anecdotes` : agrégat éditorial complet.
- `getRandomValidatedAnecdoteForDepartment(code)` : anecdote aléatoire validée.
- `getNeverSeenAnecdoteForDepartment(code)` : sélection qui privilégie les anecdotes non vues par le joueur.
- `getContextualAnecdote(code, contexte)` : sélection adaptée au contexte éditorial.
- `getRareAnecdote(code)` : anecdote rare validée.
- `getAllAnecdotesForDepartment(code)` : toutes les anecdotes d'un département.
- `getAvailableAnecdoteCountsByDepartment()` : nombre d'anecdotes validées par département.
- `recordAnecdoteDisplay(id)`, `recordAnecdoteRead(id)`, `recordAnecdoteFeedback(id, appreciation)` : statistiques locales.
- `parseAnecdotesCsv(csvText)`, `anecdotesToCsv(anecdotes)`, `mergeAnecdotes(existing, imported)` : import/export CSV.
- `auditAnecdotes()` : signale les départements insuffisamment couverts, les sources manquantes, les anecdotes non validées et les doublons.

Les services de sélection ne retournent pas les anecdotes non validées par défaut. Les statuts possibles sont `brouillon`, `à vérifier`, `validée`, `rejetée`.

### Sélection en jeu

Dans l'expérience de résultat et dans la fiche "À propos du département", GeoDoku utilise le moteur éditorial quand une anecdote validée est disponible.

Logique appliquée :

- seules les anecdotes avec le statut `validée` sont exposées au joueur ;
- les statuts `à vérifier`, `brouillon` et `rejetée` sont exclus par le service ;
- la sélection privilégie une anecdote contextuelle jamais vue localement quand c'est possible ;
- le coup de maître peut privilégier une anecdote rare non vue si le département en possède une ;
- l'historique local est stocké dans `localStorage` pour réduire les répétitions ;
- si aucune anecdote validée n'est disponible, l'application affiche l'ancien texte `dep.anecdote` issu de `gameData.js`.

Ce fallback garantit que l'interface reste complète même si un département n'a pas encore de contenu éditorial validé.

Format CSV attendu :

```csv
code_departement;categorie;titre;contenu;difficulte;rarete;ton;contexte;source;statut_validation
23;géographie;Plateau de Millevaches;Le nom évoquerait plutôt les sources que les animaux.;3;peu commune;pédagogique;découverte;Source à compléter;à vérifier
```

L'import accepte aussi les anciens lots `departement;categorie;titre;contenu;difficulte;rarete;source;consigne` en appliquant les valeurs par défaut éditoriales.

Les statistiques d'anecdotes restent dans le navigateur du joueur via `localStorage`.
