import {
  COLLECTION_FALLBACK_KEY,
  FALLBACK_COLLECTION,
  getCollectionByKey,
  getCollectionForAnecdote,
  getCollectionForTheme,
  isLaunchVisibleCollection,
  normalizeTheme,
} from "../data/collections.js";

const VALIDATED_ANECDOTE_STATUS = "validée";
const ANECDOTE_SEEN_STORAGE_KEY = "geodoku-france-anecdotes-seen";
const ANECDOTE_STATS_STORAGE_KEY = "geodoku-france-anecdotes-stats";
const ANECDOTE_RECENT_THEMES_STORAGE_KEY = "geodoku-france-anecdotes-recent-themes";
const COLLECTIONS_STORAGE_KEY = "geodoku-france-collections-v1";
const COLLECTIONS_SCHEMA_VERSION = 2;
const RECENT_THEME_LIMIT = 10;
const RECENT_THEME_AVOID_COUNT = 3;
const RARE_RARITIES = new Set(["rare", "très rare", "légendaire"]);
const RARITY_ORDER = ["commune", "peu commune", "rare", "très rare", "légendaire"];
const RARITY_SCORE = new Map(RARITY_ORDER.map((rarity, index) => [normalizeText(rarity), index + 1]));

const departmentAnecdotesCache = new Map();
let collectionsSummaryPromise = null;

const emptyCollectionsStore = {
  schemaVersion: COLLECTIONS_SCHEMA_VERSION,
  discoveries: [],
};

const emptyCollectionsSummary = {
  totalValidatedAnecdotes: 0,
  totalAvailableCollections: 0,
  collections: {},
};

function publicUrl(path) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function normalizeDepartmentCode(codeOrName) {
  return String(codeOrName ?? "").trim().toUpperCase();
}

async function loadDepartmentAnecdotes(codeOrName) {
  const code = normalizeDepartmentCode(codeOrName);
  if (!code) return [];

  if (!departmentAnecdotesCache.has(code)) {
    departmentAnecdotesCache.set(code, fetch(publicUrl(`data/anecdotes/${encodeURIComponent(code)}.json`))
      .then((response) => (response.ok ? response.json() : []))
      .then((items) => Array.isArray(items) ? items : [])
      .catch(() => []));
  }

  return departmentAnecdotesCache.get(code);
}

async function loadCollectionsSummary() {
  if (!collectionsSummaryPromise) {
    collectionsSummaryPromise = fetch(publicUrl("data/anecdotes-collections-summary.json"))
      .then((response) => (response.ok ? response.json() : emptyCollectionsSummary))
      .then((summary) => ({
        ...emptyCollectionsSummary,
        ...summary,
        collections: summary?.collections ?? {},
      }))
      .catch(() => emptyCollectionsSummary);
  }

  return collectionsSummaryPromise;
}

export async function selectDepartmentAnecdoteRecord(codeOrName, { context, displayContext = "result" } = {}) {
  const sourceAnecdotes = await loadDepartmentAnecdotes(codeOrName);
  const seenIds = getSeenAnecdoteIds();
  let selected = null;

  if (displayContext === "master_move") {
    const rare = getRareAnecdote(sourceAnecdotes, { recordDisplay: false });
    if (rare && !seenIds.includes(rare.id)) selected = rare;
  }

  if (!selected) {
    selected = getContextualAnecdote(sourceAnecdotes, context, { recordDisplay: false });
  }

  if (!selected) {
    selected = getNeverSeenAnecdote(sourceAnecdotes, { recordDisplay: false });
  }

  return selected;
}

export function isAnecdoteValidated(anecdote) {
  return anecdote?.statut_validation === VALIDATED_ANECDOTE_STATUS || anecdote?.validee === true;
}

function getAnecdotesForDepartment(sourceAnecdotes, options = {}) {
  const {
    validOnly = true,
    category,
    categorie,
    context,
    contexte,
    tone,
    ton,
    rarity,
    rarete,
    minDifficulty = 1,
    maxDifficulty = 5,
    excludeSeen = false,
    seenIds = getSeenAnecdoteIds(),
  } = options;

  const expectedCategory = normalizeText(categorie ?? category);
  const expectedContext = normalizeContext(contexte ?? context);
  const expectedTone = normalizeText(ton ?? tone);
  const expectedRarity = normalizeText(rarete ?? rarity);

  return sourceAnecdotes.filter((anecdote) => {
    const difficulty = Number(anecdote.difficulte ?? anecdote.niveau_difficulte ?? 3);

    return (!validOnly || isAnecdoteValidated(anecdote))
      && (!expectedCategory || normalizeText(anecdote.categorie) === expectedCategory)
      && (!expectedContext || normalizeText(anecdote.contexte) === normalizeText(expectedContext))
      && (!expectedTone || normalizeText(anecdote.ton) === expectedTone)
      && (!expectedRarity || normalizeText(anecdote.rarete) === expectedRarity)
      && difficulty >= minDifficulty
      && difficulty <= maxDifficulty
      && (!excludeSeen || !seenIds.includes(anecdote.id));
  });
}

function getContextualAnecdote(sourceAnecdotes, contexte, options = {}) {
  const normalizedContext = normalizeContext(contexte);
  let candidates = getAnecdotesForDepartment(sourceAnecdotes, {
    ...options,
    validOnly: true,
    contexte: normalizedContext,
    excludeSeen: options.excludeSeen ?? true,
  });

  if (candidates.length === 0) {
    candidates = getAnecdotesForDepartment(sourceAnecdotes, {
      ...options,
      validOnly: true,
      excludeSeen: options.excludeSeen ?? true,
    });
  }

  if (candidates.length === 0 && options.allowSeenWhenExhausted !== false) {
    candidates = getAnecdotesForDepartment(sourceAnecdotes, {
      ...options,
      validOnly: true,
      excludeSeen: false,
    });
  }

  return randomThemeDiverseItem(candidates, options);
}

function getNeverSeenAnecdote(sourceAnecdotes, options = {}) {
  const seenIds = options.seenIds ?? getSeenAnecdoteIds();
  let candidates = getAnecdotesForDepartment(sourceAnecdotes, {
    ...options,
    validOnly: true,
    excludeSeen: true,
    seenIds,
  });

  if (candidates.length === 0 && options.allowSeenWhenExhausted !== false) {
    candidates = getAnecdotesForDepartment(sourceAnecdotes, {
      ...options,
      validOnly: true,
      excludeSeen: false,
    });
  }

  return randomThemeDiverseItem(candidates, options);
}

function getRareAnecdote(sourceAnecdotes, options = {}) {
  const candidates = getAnecdotesForDepartment(sourceAnecdotes, {
    ...options,
    validOnly: true,
  }).filter((anecdote) => RARE_RARITIES.has(anecdote.rarete));

  const sortedCandidates = candidates.sort((a, b) => (
    rarityScore(b) - rarityScore(a)
    || Number(b.difficulte ?? 3) - Number(a.difficulte ?? 3)
    || a.id.localeCompare(b.id)
  ));

  return themeDiverseCandidates(sortedCandidates, options)[0] ?? null;
}

export function getSeenAnecdoteIds() {
  return readLocalJson(ANECDOTE_SEEN_STORAGE_KEY, []);
}

export function markAnecdoteSeen(id) {
  const seenIds = new Set(getSeenAnecdoteIds());
  seenIds.add(id);
  writeLocalJson(ANECDOTE_SEEN_STORAGE_KEY, [...seenIds]);
}

export function recordAnecdoteTheme(theme) {
  const normalizedTheme = normalizeTheme(theme);
  if (!normalizedTheme) return getRecentAnecdoteThemes();

  const nextThemes = [
    normalizedTheme,
    ...getRecentAnecdoteThemes().filter((recentTheme) => recentTheme !== normalizedTheme),
  ].slice(0, RECENT_THEME_LIMIT);

  writeLocalJson(ANECDOTE_RECENT_THEMES_STORAGE_KEY, nextThemes);
  return nextThemes;
}

export function getRecentAnecdoteThemes() {
  return readLocalJson(ANECDOTE_RECENT_THEMES_STORAGE_KEY, [])
    .map(normalizeTheme)
    .filter(Boolean)
    .slice(0, RECENT_THEME_LIMIT);
}

export function recordAnecdoteDisplay(id, anecdote = null) {
  markAnecdoteSeen(id);
  recordAnecdoteTheme(anecdote?.theme);
  updateAnecdoteStats(id, (stats) => ({
    ...stats,
    affichages: stats.affichages + 1,
  }));
}

export async function recordCollectionDiscovery(anecdote, metadata = {}) {
  const theme = normalizeTheme(anecdote?.theme);
  const collection = getCollectionForAnecdote(anecdote);

  if (!anecdote?.id || !theme || !collection || !isAnecdoteValidated(anecdote)) {
    const store = loadCollectionsStore();
    return {
      store,
      recorded: false,
      collection: null,
    };
  }

  const store = loadCollectionsStore();
  const alreadyDiscovered = store.discoveries.some((discovery) => discovery.anecdoteId === anecdote.id);

  if (alreadyDiscovered) {
    return {
      store,
      recorded: false,
      collection: await getCollectionProgress(collection.key, store),
    };
  }

  const hadCollection = store.discoveries.some((discovery) => discovery.collection === collection.key);
  const discovery = {
    theme,
    themeLabel: formatLabel(theme),
    collection: collection.key,
    collectionLabel: collection.label,
    anecdoteId: anecdote.id,
    codeDepartement: metadata.departmentCode ?? anecdote.code_departement ?? null,
    rarete: anecdote.rarete ?? anecdote.rarity ?? null,
    discoveredAt: new Date().toISOString(),
  };

  const nextStore = saveCollectionsStore({
    ...store,
    discoveries: [...store.discoveries, discovery],
  });

  return {
    store: nextStore,
    recorded: true,
    discovery,
    collection: {
      ...await getCollectionProgress(collection.key, nextStore),
      isNewAnecdote: true,
      isNewCollection: !hadCollection,
    },
  };
}

export async function getCollectionsStats(store = loadCollectionsStore()) {
  const normalizedStore = normalizeStore(store);
  const summary = await loadCollectionsSummary();
  const discoveredKeys = [...new Set(normalizedStore.discoveries.map((discovery) => discovery.collection))]
    .filter(Boolean);

  const byCollection = await Promise.all(discoveredKeys.map((collectionKey) => (
    getCollectionProgress(collectionKey, normalizedStore, summary)
  )));

  const visibleCollections = Object.entries(summary.collections)
    .map(([collectionKey, entry]) => ({
      collection: getCollectionByKey(collectionKey) ?? FALLBACK_COLLECTION,
      totalAvailable: entry.totalAvailable ?? 0,
    }))
    .filter((entry) => (
      entry.totalAvailable > 0
      && (
        isLaunchVisibleCollection(entry.collection)
        || discoveredKeys.includes(entry.collection.key)
      )
      && (
        entry.collection.key !== COLLECTION_FALLBACK_KEY
        || discoveredKeys.includes(entry.collection.key)
      )
    ))
    .map((entry) => getCollectionProgress(entry.collection.key, normalizedStore, summary));

  const resolvedVisibleCollections = await Promise.all(visibleCollections);
  const sortedByCollection = byCollection
    .filter((collection) => collection.collection)
    .sort(sortCollectionProgress);
  const sortedVisibleCollections = resolvedVisibleCollections.sort(sortCollectionProgress);

  const lastDiscovery = [...normalizedStore.discoveries]
    .sort((a, b) => new Date(b.discoveredAt).getTime() - new Date(a.discoveredAt).getTime())[0] ?? null;
  const lastCollection = lastDiscovery
    ? getCollectionByKey(lastDiscovery.collection) ?? FALLBACK_COLLECTION
    : null;

  return {
    totalCollectionsDiscovered: sortedByCollection.length,
    totalCollectionAnecdotesDiscovered: normalizedStore.discoveries.length,
    totalAvailableCollections: summary.totalAvailableCollections ?? sortedVisibleCollections.length,
    visibleCollections: sortedVisibleCollections,
    byCollection: sortedByCollection,
    topCollections: sortedByCollection.slice(0, 3),
    lastCollectionDiscovered: lastDiscovery && lastCollection
      ? {
          collection: lastCollection.key,
          collectionLabel: lastCollection.label,
          discoveredAt: lastDiscovery.discoveredAt,
        }
      : null,
    totalThemesDiscovered: sortedByCollection.length,
    totalThemedAnecdotesDiscovered: normalizedStore.discoveries.length,
    totalAvailableThemes: summary.totalAvailableCollections ?? sortedVisibleCollections.length,
    byTheme: sortedByCollection,
    topThemes: sortedByCollection.slice(0, 3),
    lastThemeDiscovered: lastDiscovery && lastCollection
      ? {
          theme: lastCollection.key,
          themeLabel: lastCollection.label,
          discoveredAt: lastDiscovery.discoveredAt,
        }
      : null,
  };
}

export async function getCollectionDetails(collectionKey, store = loadCollectionsStore()) {
  const normalizedStore = normalizeStore(store);
  const summary = await loadCollectionsSummary();
  const progress = await getCollectionProgress(collectionKey, normalizedStore, summary);
  const discoveries = normalizedStore.discoveries
    .filter((discovery) => discovery.collection === progress.collection);
  const uniqueDiscoveries = [...new Map(discoveries.map((discovery) => [
    discovery.anecdoteId,
    discovery,
  ])).values()]
    .sort((a, b) => new Date(b.discoveredAt).getTime() - new Date(a.discoveredAt).getTime());
  const unlockedAnecdotes = await Promise.all(uniqueDiscoveries.map(resolveDiscoveryAnecdote));

  return {
    ...progress,
    unlockedAnecdotes,
    lockedCount: Math.max(0, progress.totalAvailable - unlockedAnecdotes.length),
  };
}

export async function getAnecdoteLibrary(store = loadCollectionsStore()) {
  const normalizedStore = normalizeStore(store);
  const uniqueDiscoveries = [...new Map(normalizedStore.discoveries.map((discovery) => [
    discovery.anecdoteId,
    discovery,
  ])).values()]
    .sort((a, b) => new Date(b.discoveredAt).getTime() - new Date(a.discoveredAt).getTime());

  return resolveAnecdoteDiscoveryItems(uniqueDiscoveries);
}

export async function resolveAnecdoteDiscoveryItems(discoveries = []) {
  const normalizedDiscoveries = discoveries
    .map(normalizeExternalDiscovery)
    .filter((discovery) => discovery.anecdoteId);

  return Promise.all(normalizedDiscoveries.map(resolveDiscoveryAnecdote));
}

async function getCollectionProgress(collectionKey, store = loadCollectionsStore(), summaryOverride = null) {
  const collection = getCollectionByKey(collectionKey) ?? FALLBACK_COLLECTION;
  const normalizedStore = normalizeStore(store);
  const discoveries = normalizedStore.discoveries.filter((discovery) => discovery.collection === collection.key);
  const uniqueAnecdotes = new Set(discoveries.map((discovery) => discovery.anecdoteId));
  const summary = summaryOverride ?? await loadCollectionsSummary();
  const totalAvailable = summary.collections?.[collection.key]?.totalAvailable ?? 0;

  return {
    collection: collection.key,
    collectionLabel: collection.label,
    collectionDescription: collection.description,
    family: collection.family,
    launchVisible: collection.launchVisible,
    discoveredCount: uniqueAnecdotes.size,
    totalAvailable,
    progressPercent: percentage(uniqueAnecdotes.size, totalAvailable),
    isNewAnecdote: false,
    isNewCollection: false,
  };
}

function normalizeExternalDiscovery(discovery) {
  const anecdoteId = String(discovery?.anecdoteId ?? discovery?.id ?? "");
  return {
    theme: normalizeTheme(discovery?.theme),
    themeLabel: discovery?.themeLabel ?? formatLabel(discovery?.theme),
    collection: discovery?.collection ?? null,
    collectionLabel: discovery?.collectionLabel ?? "",
    anecdoteId,
    codeDepartement: discovery?.codeDepartement ?? discovery?.code_departement ?? discovery?.departmentCode ?? null,
    rarete: discovery?.rarete ?? discovery?.rarity ?? null,
    discoveredAt: discovery?.discoveredAt ?? discovery?.dateDecouverte ?? new Date().toISOString(),
  };
}

async function resolveDiscoveryAnecdote(discovery) {
  const code = normalizeDepartmentCode(discovery.codeDepartement)
    || inferDepartmentCodeFromAnecdoteId(discovery.anecdoteId);
  const departmentAnecdotes = code ? await loadDepartmentAnecdotes(code) : [];
  const anecdote = departmentAnecdotes.find((item) => item.id === discovery.anecdoteId) ?? null;

  return {
    ...discovery,
    codeDepartement: code || discovery.codeDepartement,
    anecdote,
  };
}

function inferDepartmentCodeFromAnecdoteId(anecdoteId) {
  const match = String(anecdoteId ?? "").match(/^([0-9]{2,3}|2A|2B)-/i);
  return match ? match[1].toUpperCase() : "";
}

function loadCollectionsStore() {
  if (typeof localStorage === "undefined") return emptyStore();

  try {
    const saved = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
    if (!saved) return emptyStore();
    return normalizeStore(JSON.parse(saved));
  } catch {
    return emptyStore();
  }
}

function saveCollectionsStore(store) {
  if (typeof localStorage === "undefined") return normalizeStore(store);

  const normalizedStore = normalizeStore(store);
  try {
    localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(normalizedStore));
  } catch {
    // Collections are optional; the game remains playable if storage is full.
  }
  return normalizedStore;
}

function normalizeStore(store) {
  return {
    schemaVersion: COLLECTIONS_SCHEMA_VERSION,
    discoveries: Array.isArray(store?.discoveries)
      ? store.discoveries
          .map(normalizeDiscovery)
          .filter((discovery) => discovery.theme && discovery.collection && discovery.anecdoteId)
      : [],
  };
}

function normalizeDiscovery(discovery) {
  const theme = normalizeTheme(discovery?.theme);
  const inferredCollection = getCollectionByKey(discovery?.collection)
    ?? getCollectionForTheme(theme)
    ?? FALLBACK_COLLECTION;

  return {
    theme,
    themeLabel: discovery?.themeLabel ?? formatLabel(theme),
    collection: inferredCollection.key,
    collectionLabel: discovery?.collectionLabel ?? inferredCollection.label,
    anecdoteId: String(discovery?.anecdoteId ?? discovery?.id ?? ""),
    codeDepartement: discovery?.codeDepartement ?? discovery?.code_departement ?? null,
    rarete: discovery?.rarete ?? null,
    discoveredAt: discovery?.discoveredAt ?? discovery?.dateDecouverte ?? new Date().toISOString(),
  };
}

function emptyStore() {
  return {
    ...emptyCollectionsStore,
    discoveries: [],
  };
}

function getAnecdoteStats() {
  return readLocalJson(ANECDOTE_STATS_STORAGE_KEY, {});
}

function updateAnecdoteStats(id, updater) {
  const allStats = getAnecdoteStats();
  const currentStats = {
    affichages: 0,
    lectures: 0,
    appreciation: {
      positive: 0,
      neutre: 0,
      negative: 0,
    },
    ...(allStats[id] ?? {}),
  };

  writeLocalJson(ANECDOTE_STATS_STORAGE_KEY, {
    ...allStats,
    [id]: updater(currentStats),
  });
}

function normalizeContext(value) {
  const normalizedValue = normalizeText(value);
  if (!normalizedValue) return null;
  if (["positive", "bonne", "good", "success", "bonne_reponse"].includes(normalizedValue)) return "bonne_reponse";
  if (["negative", "mauvaise", "bad", "pedagogique", "mauvaise_reponse"].includes(normalizedValue)) return "mauvaise_reponse";
  if (["rare", "anecdote_rare"].includes(normalizedValue)) return "anecdote_rare";
  if (["decouverte"].includes(normalizedValue)) return "découverte";
  return value;
}

function rarityScore(anecdote) {
  return RARITY_SCORE.get(normalizeText(anecdote.rarete)) ?? 0;
}

function randomThemeDiverseItem(items, options = {}) {
  return randomItem(themeDiverseCandidates(items, options), options.random);
}

function themeDiverseCandidates(items, options = {}) {
  if (items.length === 0 || options.avoidRecentThemes === false) return items;

  const recentThemes = new Set(getRecentAnecdoteThemes().slice(0, RECENT_THEME_AVOID_COUNT));
  if (recentThemes.size === 0) return items;

  const alternatives = items.filter((item) => {
    const theme = normalizeTheme(item.theme);
    return !theme || !recentThemes.has(theme);
  });

  return alternatives.length > 0 ? alternatives : items;
}

function randomItem(items, random = Math.random) {
  if (items.length === 0) return null;
  return items[Math.floor(random() * items.length)];
}

function sortCollectionProgress(a, b) {
  return (
    b.discoveredCount - a.discoveredCount
    || b.progressPercent - a.progressPercent
    || a.collectionLabel.localeCompare(b.collectionLabel, "fr")
  );
}

function formatLabel(value) {
  return String(value ?? "")
    .trim()
    .split(/[-_]+/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function percentage(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function readLocalJson(key, fallback) {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocalJson(key, value) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Optional persistence must never block play.
  }
}

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/\s+/g, " ");
}
