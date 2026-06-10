const DISCOVERY_STORAGE_KEY = "geodoku-france-discoveries-v1";
const DISCOVERY_SCHEMA_VERSION = 1;

const RARITY_LEVELS = {
  commune: {
    level: 0,
    label: "Commune",
    indicator: null,
    className: "rarity-common",
  },
  "peu commune": {
    level: 1,
    label: "Peu commune",
    indicator: null,
    className: "rarity-uncommon",
  },
  rare: {
    level: 2,
    label: "Anecdote rare",
    indicator: "⭐ Anecdote rare",
    className: "rarity-rare",
  },
  "très rare": {
    level: 3,
    label: "Anecdote très rare",
    indicator: "⭐⭐ Anecdote très rare",
    className: "rarity-very-rare",
  },
  légendaire: {
    level: 4,
    label: "Anecdote légendaire",
    indicator: "⭐⭐⭐ Anecdote légendaire",
    className: "rarity-legendary",
  },
};

const emptyDiscoveryStore = {
  schemaVersion: DISCOVERY_SCHEMA_VERSION,
  discoveries: [],
};

export function getRarityMetadata(rarity) {
  const normalizedRarity = normalizeRarity(rarity);
  return RARITY_LEVELS[normalizedRarity] ?? RARITY_LEVELS.commune;
}

export function isDiscoveryRarity(rarity) {
  return getRarityMetadata(rarity).level >= RARITY_LEVELS.rare.level;
}

export function loadDiscoveryStore() {
  if (typeof localStorage === "undefined") return emptyStore();

  try {
    const saved = localStorage.getItem(DISCOVERY_STORAGE_KEY);
    if (!saved) return emptyStore();
    return normalizeStore(JSON.parse(saved));
  } catch {
    return emptyStore();
  }
}

export function saveDiscoveryStore(store) {
  if (typeof localStorage === "undefined") return normalizeStore(store);

  const normalizedStore = normalizeStore(store);
  try {
    localStorage.setItem(DISCOVERY_STORAGE_KEY, JSON.stringify(normalizedStore));
  } catch {
    // Discoveries are a bonus layer; the game remains usable without persistence.
  }
  return normalizedStore;
}

export function recordDiscovery(anecdote, metadata = {}) {
  if (!anecdote?.id || !isDiscoveryRarity(anecdote.rarete ?? anecdote.rarity)) {
    return {
      store: loadDiscoveryStore(),
      recorded: false,
    };
  }

  const store = loadDiscoveryStore();
  if (store.discoveries.some((discovery) => discovery.id === anecdote.id)) {
    return { store, recorded: false };
  }

  const rarity = normalizeRarity(anecdote.rarete ?? anecdote.rarity);
  const discovery = {
    id: anecdote.id,
    title: anecdote.titre ?? anecdote.title ?? "Anecdote",
    rarity,
    departmentCode: metadata.departmentCode ?? anecdote.code_departement ?? null,
    departmentName: metadata.departmentName ?? null,
    context: metadata.context ?? anecdote.contexte ?? anecdote.context ?? null,
    theme: anecdote.theme ?? null,
    discoveredAt: new Date().toISOString(),
  };

  const nextStore = saveDiscoveryStore({
    ...store,
    discoveries: [...store.discoveries, discovery],
  });

  return {
    store: nextStore,
    recorded: true,
    discovery,
  };
}

export function getDiscoveryStats(store = loadDiscoveryStore()) {
  const normalizedStore = normalizeStore(store);
  const rareDiscoveries = normalizedStore.discoveries.filter((discovery) => discovery.rarity === "rare");
  const veryRareDiscoveries = normalizedStore.discoveries.filter((discovery) => discovery.rarity === "très rare");
  const legendaryDiscoveries = normalizedStore.discoveries.filter((discovery) => discovery.rarity === "légendaire");

  return {
    totalDiscoveries: normalizedStore.discoveries.length,
    rareDiscoveries: rareDiscoveries.length,
    veryRareDiscoveries: veryRareDiscoveries.length,
    legendaryDiscoveries: legendaryDiscoveries.length,
    rareOrBetterDiscoveries: rareDiscoveries.length + veryRareDiscoveries.length + legendaryDiscoveries.length,
  };
}

export function getDiscoveryStorageKey() {
  return DISCOVERY_STORAGE_KEY;
}

function normalizeStore(store) {
  return {
    schemaVersion: DISCOVERY_SCHEMA_VERSION,
    discoveries: Array.isArray(store?.discoveries) ? store.discoveries : [],
  };
}

function emptyStore() {
  return {
    ...emptyDiscoveryStore,
    discoveries: [],
  };
}

function normalizeRarity(rarity) {
  const value = String(rarity ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");

  if (value === "tres rare") return "très rare";
  if (value === "legendaire") return "légendaire";
  if (value === "peu commune") return "peu commune";
  if (value === "rare") return "rare";
  return "commune";
}
