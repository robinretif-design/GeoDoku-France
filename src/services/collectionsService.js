import {
  VALIDATED_ANECDOTE_STATUS,
  anecdotes as defaultAnecdotes,
} from "../data/anecdotes.js";
import {
  COLLECTION_FALLBACK_KEY,
  FALLBACK_COLLECTION,
  getCollectionByKey,
  getCollectionForAnecdote,
  getCollectionForTheme,
  isLaunchVisibleCollection,
  normalizeTheme,
} from "../data/collections.js";

const COLLECTIONS_STORAGE_KEY = "geodoku-france-collections-v1";
const COLLECTIONS_SCHEMA_VERSION = 2;

const emptyCollectionsStore = {
  schemaVersion: COLLECTIONS_SCHEMA_VERSION,
  discoveries: [],
};

export function loadCollectionsStore() {
  if (typeof localStorage === "undefined") return emptyStore();

  try {
    const saved = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
    if (!saved) return emptyStore();
    return normalizeStore(JSON.parse(saved));
  } catch {
    return emptyStore();
  }
}

export function saveCollectionsStore(store) {
  if (typeof localStorage === "undefined") return normalizeStore(store);

  const normalizedStore = normalizeStore(store);
  try {
    localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(normalizedStore));
  } catch {
    // Collections are optional; the game remains playable if storage is full.
  }
  return normalizedStore;
}

export function recordCollectionDiscovery(anecdote, metadata = {}) {
  const theme = normalizeTheme(anecdote?.theme);
  const collection = getCollectionForAnecdote(anecdote);

  if (!anecdote?.id || !theme || !collection || !isValidatedAnecdote(anecdote)) {
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
      collection: getCollectionProgress(collection.key, store),
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
      ...getCollectionProgress(collection.key, nextStore),
      isNewAnecdote: true,
      isNewCollection: !hadCollection,
    },
  };
}

export function getCollectionsStats(store = loadCollectionsStore(), sourceAnecdotes = defaultAnecdotes) {
  const normalizedStore = normalizeStore(store);
  const catalog = getCollectionCatalog(sourceAnecdotes);
  const discoveredKeys = [...new Set(normalizedStore.discoveries.map((discovery) => discovery.collection))]
    .filter(Boolean);

  const byCollection = discoveredKeys
    .map((collectionKey) => getCollectionProgress(collectionKey, normalizedStore, catalog))
    .filter((collection) => collection.collection)
    .sort(sortCollectionProgress);

  const visibleCollections = [...catalog.values()]
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
    .map((entry) => getCollectionProgress(entry.collection.key, normalizedStore, catalog))
    .sort(sortCollectionProgress);

  const lastDiscovery = [...normalizedStore.discoveries]
    .sort((a, b) => new Date(b.discoveredAt).getTime() - new Date(a.discoveredAt).getTime())[0] ?? null;

  const lastCollection = lastDiscovery
    ? getCollectionByKey(lastDiscovery.collection) ?? FALLBACK_COLLECTION
    : null;

  return {
    totalCollectionsDiscovered: byCollection.length,
    totalCollectionAnecdotesDiscovered: normalizedStore.discoveries.length,
    totalAvailableCollections: [...catalog.values()].filter((entry) => entry.totalAvailable > 0).length,
    visibleCollections,
    byCollection,
    topCollections: byCollection.slice(0, 3),
    lastCollectionDiscovered: lastDiscovery && lastCollection
      ? {
          collection: lastCollection.key,
          collectionLabel: lastCollection.label,
          discoveredAt: lastDiscovery.discoveredAt,
        }
      : null,

    // Backward-compatible aliases for Phase 06 UI/reporting.
    totalThemesDiscovered: byCollection.length,
    totalThemedAnecdotesDiscovered: normalizedStore.discoveries.length,
    totalAvailableThemes: [...catalog.values()].filter((entry) => entry.totalAvailable > 0).length,
    byTheme: byCollection,
    topThemes: byCollection.slice(0, 3),
    lastThemeDiscovered: lastDiscovery && lastCollection
      ? {
          theme: lastCollection.key,
          themeLabel: lastCollection.label,
          discoveredAt: lastDiscovery.discoveredAt,
        }
      : null,
  };
}

export function getCollectionProgress(collectionKey, store = loadCollectionsStore(), catalog = getCollectionCatalog()) {
  const collection = getCollectionByKey(collectionKey) ?? FALLBACK_COLLECTION;
  const normalizedStore = normalizeStore(store);
  const discoveries = normalizedStore.discoveries.filter((discovery) => discovery.collection === collection.key);
  const uniqueAnecdotes = new Set(discoveries.map((discovery) => discovery.anecdoteId));
  const totalAvailable = catalog instanceof Map
    ? catalog.get(collection.key)?.totalAvailable ?? 0
    : getCollectionCatalog().get(collection.key)?.totalAvailable ?? 0;

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

export function getThemeProgress(theme, store = loadCollectionsStore(), catalog = getCollectionCatalog()) {
  const collection = getCollectionForTheme(theme);
  if (!collection) {
    return {
      theme: normalizeTheme(theme),
      themeLabel: formatLabel(theme),
      collection: null,
      collectionLabel: "",
      discoveredCount: 0,
      totalAvailable: 0,
      progressPercent: 0,
      isNewAnecdote: false,
      isNewCollection: false,
    };
  }

  return {
    theme: normalizeTheme(theme),
    themeLabel: formatLabel(theme),
    ...getCollectionProgress(collection.key, store, catalog),
  };
}

export function getCollectionsStorageKey() {
  return COLLECTIONS_STORAGE_KEY;
}

export function formatCollectionThemeLabel(theme) {
  return formatLabel(theme);
}

function getCollectionCatalog(sourceAnecdotes = defaultAnecdotes) {
  return sourceAnecdotes
    .filter(isValidatedAnecdote)
    .reduce((catalog, anecdote) => {
      const collection = getCollectionForAnecdote(anecdote);
      if (!collection) return catalog;

      const current = catalog.get(collection.key) ?? {
        collection,
        totalAvailable: 0,
        themes: new Set(),
        codes: new Set(),
      };

      current.totalAvailable += 1;
      if (anecdote.theme) current.themes.add(normalizeTheme(anecdote.theme));
      if (anecdote.code_departement) current.codes.add(anecdote.code_departement);
      catalog.set(collection.key, current);
      return catalog;
    }, new Map());
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

function isValidatedAnecdote(anecdote) {
  return anecdote?.statut_validation === VALIDATED_ANECDOTE_STATUS || anecdote?.validee === true;
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
