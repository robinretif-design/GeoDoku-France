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
