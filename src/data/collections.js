import { normalizeText } from "./departements.js";

export const COLLECTIONS = [
  {
    key: "histoire-locale",
    label: "Histoire locale",
    family: "histoire_memoire",
    description: "Episodes historiques lies a des villes, pays et territoires.",
    launchVisible: true,
  },
  {
    key: "resistance-maquis",
    label: "Resistance et maquis",
    family: "histoire_memoire",
    description: "Maquis, liberation, France libre et lieux de resistance.",
    launchVisible: true,
  },
  {
    key: "guerres-memoire",
    label: "Guerres et memoire",
    family: "histoire_memoire",
    description: "Batailles, sieges, lieux de memoire et traces de guerre.",
    launchVisible: true,
  },
  {
    key: "jeanne-arc",
    label: "Jeanne d'Arc",
    family: "histoire_memoire",
    description: "Lieux et episodes lies a Jeanne d'Arc.",
    launchVisible: false,
  },
  {
    key: "chateaux-fortifications",
    label: "Chateaux et fortifications",
    family: "patrimoine",
    description: "Chateaux, citadelles, remparts, forts et places fortes.",
    launchVisible: true,
  },
  {
    key: "cathedrales-abbayes",
    label: "Cathedrales et abbayes",
    family: "patrimoine",
    description: "Edifices religieux, vitraux, abbayes et pelerinages.",
    launchVisible: true,
  },
  {
    key: "antiquite-archeologie",
    label: "Antiquite et archeologie",
    family: "patrimoine",
    description: "Vestiges, sites gallo-romains, prehistoire et archeologie.",
    launchVisible: false,
  },
  {
    key: "fleuves-canaux",
    label: "Fleuves et canaux",
    family: "geographie",
    description: "Fleuves, sources, estuaires, canaux et navigation interieure.",
    launchVisible: true,
  },
  {
    key: "littoraux-iles-ports",
    label: "Littoraux, iles et ports",
    family: "geographie",
    description: "Iles, ports, baies, rades et cultures littorales.",
    launchVisible: true,
  },
  {
    key: "phares-caps-cotes",
    label: "Phares, caps et cotes",
    family: "geographie",
    description: "Caps, pointes, phares et paysages de bord de mer.",
    launchVisible: false,
  },
  {
    key: "montagnes-volcans",
    label: "Montagnes et volcans",
    family: "geographie",
    description: "Massifs, volcans, hauts plateaux et cultures de montagne.",
    launchVisible: true,
  },
  {
    key: "forets-marais-campagnes",
    label: "Forets, marais et campagnes",
    family: "geographie",
    description: "Sologne, Brenne, marais, landes, forets et campagnes fortes.",
    launchVisible: false,
  },
  {
    key: "vallees-gorges-plateaux",
    label: "Vallees, gorges et plateaux",
    family: "geographie",
    description: "Vallees, gorges, causses, plateaux et paysages encaisses.",
    launchVisible: false,
  },
  {
    key: "outre-mer",
    label: "Outre-mer",
    family: "territoires_singuliers",
    description: "Territoires ultramarins, lagons, cultures creoles et oceaniennes.",
    launchVisible: true,
  },
  {
    key: "frontieres",
    label: "Frontieres",
    family: "territoires_singuliers",
    description: "Espaces frontaliers et cultures transfrontalieres.",
    launchVisible: true,
  },
  {
    key: "fromages-terroirs",
    label: "Fromages et terroirs",
    family: "gastronomie",
    description: "Fromages, elevage, terroirs de montagne ou de campagne.",
    launchVisible: false,
  },
  {
    key: "vins-cidres-alcools",
    label: "Vins, cidres et alcools",
    family: "gastronomie",
    description: "Vins, cognac, armagnac, cidre, rhum et boissons locales.",
    launchVisible: false,
  },
  {
    key: "cuisine-locale",
    label: "Cuisine locale",
    family: "gastronomie",
    description: "Plats, produits sales, recettes regionales et tables populaires.",
    launchVisible: true,
  },
  {
    key: "douceurs-patisseries",
    label: "Douceurs et patisseries",
    family: "gastronomie",
    description: "Gateaux, biscuits, confiseries et douceurs regionales.",
    launchVisible: false,
  },
  {
    key: "industrie-mines",
    label: "Industrie et mines",
    family: "economie_savoir_faire",
    description: "Mines, usines, bassins industriels et paysages productifs.",
    launchVisible: true,
  },
  {
    key: "savoir-faire-artisanat",
    label: "Savoir-faire et artisanat",
    family: "economie_savoir_faire",
    description: "Tapisserie, cuir, faience, dentelle, horlogerie et metiers.",
    launchVisible: true,
  },
  {
    key: "trains-routes-ponts",
    label: "Trains, routes et ponts",
    family: "economie_savoir_faire",
    description: "Infrastructures, viaducs, trains, routes et grands ouvrages.",
    launchVisible: false,
  },
  {
    key: "monde-maritime",
    label: "Monde maritime",
    family: "economie_savoir_faire",
    description: "Peche, arsenaux, morue, ports militaires et memoires maritimes.",
    launchVisible: false,
  },
  {
    key: "cinema-bd",
    label: "Cinema et BD",
    family: "culture",
    description: "Bandes dessinees, tournages, festivals et culture visuelle.",
    launchVisible: true,
  },
  {
    key: "musees-arts",
    label: "Musees et arts",
    family: "culture",
    description: "Musees, peintres, art moderne, lieux artistiques et collections.",
    launchVisible: true,
  },
  {
    key: "musiques-festivals",
    label: "Musiques et festivals",
    family: "culture",
    description: "Musique, theatre, jazz, festivals et scenes locales.",
    launchVisible: false,
  },
  {
    key: "litterature-ecrivains",
    label: "Litterature et ecrivains",
    family: "culture",
    description: "Ecrivains, maisons d'auteurs et imaginaires litteraires.",
    launchVisible: false,
  },
  {
    key: "villes-iconiques",
    label: "Villes iconiques",
    family: "territoires_singuliers",
    description: "Villes, quartiers et lieux immediatement identifiables.",
    launchVisible: true,
  },
  {
    key: "villes-nouvelles-modernite",
    label: "Villes nouvelles et modernite",
    family: "territoires_singuliers",
    description: "Villes nouvelles, grands ensembles et urbanisme contemporain.",
    launchVisible: false,
  },
  {
    key: "architecture-moderne",
    label: "Architecture moderne",
    family: "patrimoine",
    description: "Beton, modernisme, architectures singulieres et brutalistes.",
    launchVisible: false,
  },
  {
    key: "jardins-paysages",
    label: "Jardins et paysages composes",
    family: "geographie",
    description: "Jardins, parcs, paysages dessines et sites amenages.",
    launchVisible: false,
  },
  {
    key: "insolite-records",
    label: "Insolite et records",
    family: "insolite",
    description: "Noms surprenants, faits etranges, records et curiosites.",
    launchVisible: true,
  },
  {
    key: "langues-cultures-regionales",
    label: "Langues et cultures regionales",
    family: "territoires_singuliers",
    description: "Langues, cultures locales et identites regionales.",
    launchVisible: true,
  },
  {
    key: "sports-aventures",
    label: "Sports et aventures",
    family: "culture",
    description: "Courses, montagnes sportives, stades et grands defis.",
    launchVisible: false,
  },
  {
    key: "unesco-sites-classes",
    label: "UNESCO et sites classes",
    family: "patrimoine",
    description: "Sites classes, labels patrimoniaux et paysages reconnus.",
    launchVisible: false,
  },
  {
    key: "animaux-biodiversite",
    label: "Animaux et biodiversite",
    family: "geographie",
    description: "Faune, reserves, especes locales et biodiversite.",
    launchVisible: false,
  },
  {
    key: "thermalisme-eaux",
    label: "Thermalisme et eaux",
    family: "geographie",
    description: "Eaux, sources, thermalisme, bains et stations de cure.",
    launchVisible: false,
  },
  {
    key: "fetes-marches-traditions",
    label: "Fetes, marches et traditions",
    family: "culture",
    description: "Fetes populaires, marches, foires et rituels locaux.",
    launchVisible: false,
  },
  {
    key: "personnalites-locales",
    label: "Personnalites locales",
    family: "culture",
    description: "Figures politiques, artistes, savants et personnages territoriaux.",
    launchVisible: false,
  },
  {
    key: "sciences-inventions",
    label: "Sciences et inventions",
    family: "culture",
    description: "Sciences, techniques, inventions, explorations et savoirs.",
    launchVisible: false,
  },
];

export const COLLECTION_FALLBACK_KEY = "autres-decouvertes";

export const FALLBACK_COLLECTION = {
  key: COLLECTION_FALLBACK_KEY,
  label: "Autres decouvertes",
  family: "meta",
  description: "Sujets editoriaux encore non regroupes dans une collection principale.",
  launchVisible: false,
};

export const THEME_COLLECTION_OVERRIDES = {
  aubrac: "montagnes-volcans",
  "bd-angouleme": "cinema-bd",
  "climats-bourgogne": "unesco-sites-classes",
  cognac: "vins-cidres-alcools",
  millevaches: "vallees-gorges-plateaux",
  salers: "fromages-terroirs",
  sancerre: "vins-cidres-alcools",
  "alpes-mancelles": "montagnes-volcans",
  "bayeux-tapisserie": "savoir-faire-artisanat",
  "charente-fleuve": "fleuves-canaux",
  "pate-pommes-terre": "cuisine-locale",
  "agneau-pre-sale": "cuisine-locale",
  angouleme: "cinema-bd",
  "ardoise-travassac": "savoir-faire-artisanat",
  arromanches: "guerres-memoire",
  aubazine: "cathedrales-abbayes",
  aubeterre: "cathedrales-abbayes",
  "baie-saint-brieuc": "littoraux-iles-ports",
  "boucles-seine": "fleuves-canaux",
  "bourges-cathedrale": "cathedrales-abbayes",
  brehat: "littoraux-iles-ports",
  brive: "villes-iconiques",
  brouage: "chateaux-fortifications",
  burons: "montagnes-volcans",
  cagouilles: "cuisine-locale",
  "calvados-eau-de-vie": "vins-cidres-alcools",
  camembert: "fromages-terroirs",
  "canal-berry": "fleuves-canaux",
  "canal-garonne": "fleuves-canaux",
  "canal-nivernais": "fleuves-canaux",
  cancoillotte: "fromages-terroirs",
  "cap-frehel": "phares-caps-cotes",
  "champagne-berrichonne": "forets-marais-campagnes",
  collonges: "villes-iconiques",
  croustade: "douceurs-patisseries",
  debarquement: "guerres-memoire",
  "dijon-ducs": "histoire-locale",
  dinan: "villes-iconiques",
  "estuaire-seine": "fleuves-canaux",
  "ficelle-picarde": "cuisine-locale",
  flammekueche: "cuisine-locale",
  forestines: "douceurs-patisseries",
  "fort-boyard": "chateaux-fortifications",
  "gateau-broche": "douceurs-patisseries",
  "gorges-tarn": "vallees-gorges-plateaux",
  "granit-rose": "phares-caps-cotes",
  guerledan: "fleuves-canaux",
  "hospices-beaune": "histoire-locale",
  "jacques-coeur": "personnalites-locales",
  kougelhopf: "douceurs-patisseries",
  "la-rochelle": "littoraux-iles-ports",
  lioran: "montagnes-volcans",
  lomagne: "cuisine-locale",
  "mitterrand-jarnac": "personnalites-locales",
  "moutarde-dijon": "cuisine-locale",
  muma: "musees-arts",
  najac: "chateaux-fortifications",
  noirlac: "cathedrales-abbayes",
  "noix-perigord": "cuisine-locale",
  "paimpol-islande": "monde-maritime",
  pineau: "vins-cidres-alcools",
  "resistance-ain": "resistance-maquis",
  "rhin-frontiere": "frontieres",
  "rochefort-arsenal": "monde-maritime",
  roquefort: "fromages-terroirs",
  "saint-flour": "villes-iconiques",
  "seuil-poitou": "vallees-gorges-plateaux",
  sologne: "forets-marais-campagnes",
  "statues-menhirs": "antiquite-archeologie",
  teurgoule: "douceurs-patisseries",
  troglodytes: "villes-iconiques",
  truffade: "cuisine-locale",
  turenne: "chateaux-fortifications",
  "vallee-lot": "vallees-gorges-plateaux",
  "vallee-oise": "vallees-gorges-plateaux",
  ventadour: "chateaux-fortifications",
  vercors: "montagnes-volcans",
  "vercors-resistance": "resistance-maquis",
  vezere: "fleuves-canaux",
  "viaduc-millau": "trains-routes-ponts",
  vierzon: "industrie-mines",
  vix: "antiquite-archeologie",
  "volaille-bresse": "cuisine-locale",
  "volcan-cantal": "montagnes-volcans",
};

export const CATEGORY_COLLECTION_FALLBACKS = {
  histoire: "histoire-locale",
  geographie: "forets-marais-campagnes",
  géographie: "forets-marais-campagnes",
  gastronomie: "cuisine-locale",
  culture: "musees-arts",
  insolite: "insolite-records",
};

const COLLECTION_RULES = [
  ["resistance-maquis", ["resistance", "maquis", "france-libre", "liberation-corse"]],
  ["guerres-memoire", ["guerre", "bataille", "debarquement", "verdun", "douaumont", "ossuaire", "1940", "1941", "1944", "memoire", "occupation", "otages"]],
  ["jeanne-arc", ["jeanne", "orleans"]],
  ["unesco-sites-classes", ["unesco", "climats", "episcopale"]],
  ["outre-mer", ["guadeloupe", "martinique", "guyane", "reunion", "mayotte", "stbarth", "stmartin", "spm", "polynesie", "caledonie", "wallis", "futuna", "tahiti", "kanak", "lagon"]],
  ["frontieres", ["frontiere", "rhin", "alsace", "basque", "suisse", "espagne", "italie", "allemagne", "belgique", "luxembourg"]],
  ["cathedrales-abbayes", ["cathedrale", "abbaye", "basilique", "chapelle", "eglise", "vitrail", "notre-dame", "pelerinage"]],
  ["chateaux-fortifications", ["chateau", "chateaux", "forteresse", "donjon", "citadelle", "remparts"]],
  ["antiquite-archeologie", ["romaine", "antique", "alesia", "archeologie", "gallo", "menhir", "dolmen", "vix"]],
  ["phares-caps-cotes", ["phare", "phares", "cap-", "pointe", "cote-", "granit-rose", "eckmuhl"]],
  ["littoraux-iles-ports", ["ile", "iles", "baie", "port", "rade", "abers", "ouessant", "sein", "littoral", "mer"]],
  ["fleuves-canaux", ["loire", "seine", "garonne", "rhone", "saone", "marne", "meuse", "dordogne", "charente", "canal", "fleuve", "riviere", "source", "estuaire"]],
  ["montagnes-volcans", ["montagne", "mont-", "alpes", "pyrenees", "jura", "vosges", "aubrac", "cevennes", "sancy", "puy", "volcan", "cantal", "lozere", "ballon"]],
  ["forets-marais-campagnes", ["foret", "marais", "sologne", "brenne", "camargue", "garrigue", "lande", "mangrove", "campagne"]],
  ["vallees-gorges-plateaux", ["vallee", "gorges", "plateau", "causse", "causses", "cirque", "millevaches"]],
  ["fromages-terroirs", ["fromage", "camembert", "roquefort", "salers", "cantal", "comte", "cancoillotte", "abondance", "reblochon", "truffade", "aligot"]],
  ["vins-cidres-alcools", ["vin", "vins", "cognac", "armagnac", "cidre", "rhum", "sancerre", "champagne", "pineau", "absinthe", "calvados"]],
  ["douceurs-patisseries", ["gateau", "macaron", "kougelhopf", "teurgoule", "forestines", "croustade", "patisserie", "bonbon"]],
  ["cuisine-locale", ["cagouilles", "ficelle", "volaille", "pate", "pain", "jambon", "saucisse", "cassoulet", "truffe", "foie", "gras", "accras", "colombo", "moutarde", "noix"]],
  ["monde-maritime", ["arsenal", "morue", "maritime", "peche", "sardine", "islande"]],
  ["industrie-mines", ["industrie", "industriel", "mine", "mines", "minier", "textile", "acier", "alstom", "renault", "airbus"]],
  ["savoir-faire-artisanat", ["cuir", "dentelle", "porcelaine", "tapisserie", "chaussure", "ceramique", "poterie", "horlogerie", "faience", "ardoise"]],
  ["trains-routes-ponts", ["pont", "viaduc", "route", "train", "chemin-fer", "tram", "gare", "velo"]],
  ["cinema-bd", ["cinema", "bd", "angouleme", "film", "deauville"]],
  ["musees-arts", ["musee", "art", "peintres", "monet", "courbet", "picassiette", "ceret", "muma"]],
  ["musiques-festivals", ["jazz", "musique", "festival", "theatre", "nougaro", "berlioz", "avignon"]],
  ["litterature-ecrivains", ["proust", "colette", "jules-verne", "litterature", "ecrivain", "ronsard", "balzac"]],
  ["villes-nouvelles-modernite", ["ville-nouvelle", "cergy", "evry", "creteil", "defense", "abraxas"]],
  ["architecture-moderne", ["brutaliste", "architecture", "moderne", "beton", "maison-totale"]],
  ["jardins-paysages", ["jardin", "jardins", "parc", "bambouseraie", "versailles", "chaumont"]],
  ["insolite-records", ["insolite", "record", "nom", "mystere", "curiosite", "secret", "etrange"]],
  ["langues-cultures-regionales", ["langue", "creole", "breton", "occitan", "alsacien", "corse", "kanak", "maohi", "plurilingue"]],
  ["sports-aventures", ["sport", "24-heures", "rugby", "foot", "stade", "ski", "alpe-huez", "vendee-globe"]],
  ["animaux-biodiversite", ["ours", "loup", "phoques", "oiseaux", "crocodile", "makis", "papillon", "animaux", "poisson"]],
  ["thermalisme-eaux", ["thermal", "thermale", "eaux", "bains", "spa", "vichy"]],
  ["fetes-marches-traditions", ["fete", "feria", "foire", "marches", "carnaval", "traditions"]],
  ["personnalites-locales", ["mitterrand", "jacques-coeur", "denis-papin", "cesaire", "paoli"]],
  ["sciences-inventions", ["science", "invention", "aeropostale", "cite-espace", "veterinaire", "papin"]],
  ["villes-iconiques", ["ville", "cite", "quartier", "place", "palais", "dijon", "amiens", "grenoble", "chartres", "strasbourg", "toulouse", "dinan", "collonges", "brive"]],
  ["histoire-locale", ["histoire", "ducs", "capitouls", "parlement", "foire", "hospices", "medieval", "royal"]],
];

export function getCollectionByKey(key) {
  const normalizedKey = normalizeCollectionKey(key);
  return COLLECTIONS.find((collection) => collection.key === normalizedKey)
    ?? (normalizedKey === COLLECTION_FALLBACK_KEY ? FALLBACK_COLLECTION : null);
}

export function getCollectionForTheme(theme) {
  const normalizedTheme = normalizeTheme(theme);
  if (!normalizedTheme) return null;

  const override = THEME_COLLECTION_OVERRIDES[normalizedTheme];
  if (override) return getCollectionByKey(override) ?? FALLBACK_COLLECTION;

  const matchedRule = COLLECTION_RULES.find(([, keywords]) => (
    keywords.some((keyword) => normalizedTheme.includes(normalizeTheme(keyword)))
  ));

  if (!matchedRule) return FALLBACK_COLLECTION;
  return getCollectionByKey(matchedRule[0]) ?? FALLBACK_COLLECTION;
}

export function getCollectionForAnecdote(anecdote) {
  const themeCollection = getCollectionForTheme(anecdote?.theme);
  if (themeCollection && themeCollection.key !== COLLECTION_FALLBACK_KEY) return themeCollection;

  const categoryFallback = CATEGORY_COLLECTION_FALLBACKS[String(anecdote?.categorie ?? "")
    .trim()
    .toLowerCase()];
  if (categoryFallback) return getCollectionByKey(categoryFallback) ?? themeCollection;

  return themeCollection;
}

export function isLaunchVisibleCollection(collectionOrKey) {
  const collection = typeof collectionOrKey === "string"
    ? getCollectionByKey(collectionOrKey)
    : collectionOrKey;
  return Boolean(collection?.launchVisible);
}

export function normalizeTheme(theme) {
  return normalizeText(theme).replace(/[\s_]+/g, "-");
}

export function normalizeCollectionKey(key) {
  return String(key ?? "").trim().toLowerCase();
}
