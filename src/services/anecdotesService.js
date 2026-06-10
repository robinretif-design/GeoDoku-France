import {
  ANECDOTE_CONTEXTS,
  ANECDOTE_RARITIES,
  VALIDATED_ANECDOTE_STATUS,
  anecdotes as defaultAnecdotes,
} from "../data/anecdotes.js";
import { departements, normalizeDepartementCode, normalizeText } from "../data/departements.js";

const ANECDOTE_SEEN_STORAGE_KEY = "geodoku-france-anecdotes-seen";
const ANECDOTE_STATS_STORAGE_KEY = "geodoku-france-anecdotes-stats";
const ANECDOTE_RECENT_THEMES_STORAGE_KEY = "geodoku-france-anecdotes-recent-themes";
const RECENT_THEME_LIMIT = 10;
const RECENT_THEME_AVOID_COUNT = 3;
const RARE_RARITIES = new Set(["rare", "très rare", "légendaire"]);
const RARITY_SCORE = new Map(ANECDOTE_RARITIES.map((rarity, index) => [rarity, index + 1]));

export function isAnecdoteValidated(anecdote) {
  return anecdote?.statut_validation === VALIDATED_ANECDOTE_STATUS || anecdote?.validee === true;
}

export function getValidatedAnecdotes(sourceAnecdotes = defaultAnecdotes) {
  return sourceAnecdotes.filter(isAnecdoteValidated);
}

export function getAnecdotesForDepartment(codeOrName, options = {}) {
  const {
    sourceAnecdotes = defaultAnecdotes,
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

  const inputCode = String(codeOrName ?? "").trim().toUpperCase();
  const departmentCode = normalizeDepartementCode(codeOrName)
    ?? (sourceAnecdotes.some((anecdote) => anecdote.code_departement === inputCode) ? inputCode : null);
  if (!departmentCode) return [];

  const expectedCategory = normalizeText(categorie ?? category);
  const expectedContext = normalizeContext(contexte ?? context);
  const expectedTone = normalizeText(ton ?? tone);
  const expectedRarity = normalizeText(rarete ?? rarity);

  return sourceAnecdotes.filter((anecdote) => {
    const difficulty = Number(anecdote.difficulte ?? anecdote.niveau_difficulte ?? 3);

    return anecdote.code_departement === departmentCode
      && (!validOnly || isAnecdoteValidated(anecdote))
      && (!expectedCategory || normalizeText(anecdote.categorie) === expectedCategory)
      && (!expectedContext || normalizeText(anecdote.contexte) === normalizeText(expectedContext))
      && (!expectedTone || normalizeText(anecdote.ton) === expectedTone)
      && (!expectedRarity || normalizeText(anecdote.rarete) === expectedRarity)
      && difficulty >= minDifficulty
      && difficulty <= maxDifficulty
      && (!excludeSeen || !seenIds.includes(anecdote.id));
  });
}

export function getAllAnecdotesForDepartment(codeOrName, options = {}) {
  return getAnecdotesForDepartment(codeOrName, {
    ...options,
    validOnly: options.validOnly ?? false,
  });
}

export function getRandomValidatedAnecdoteForDepartment(codeOrName, options = {}) {
  const candidates = getAnecdotesForDepartment(codeOrName, {
    ...options,
    validOnly: true,
  });
  const selected = randomThemeDiverseItem(candidates, options);

  if (selected && options.recordDisplay) {
    recordAnecdoteDisplay(selected.id, selected);
  }

  return selected;
}

export function getNeverSeenAnecdoteForDepartment(codeOrName, options = {}) {
  const seenIds = options.seenIds ?? getSeenAnecdoteIds();
  let candidates = getAnecdotesForDepartment(codeOrName, {
    ...options,
    validOnly: true,
    excludeSeen: true,
    seenIds,
  });

  if (candidates.length === 0 && options.allowSeenWhenExhausted !== false) {
    candidates = getAnecdotesForDepartment(codeOrName, {
      ...options,
      validOnly: true,
      excludeSeen: false,
    });
  }

  const selected = randomThemeDiverseItem(candidates, options);
  if (selected && options.recordDisplay !== false) {
    recordAnecdoteDisplay(selected.id, selected);
  }

  return selected;
}

export function getContextualAnecdote(codeOrName, contexte, options = {}) {
  const normalizedContext = normalizeContext(contexte);
  let candidates = getAnecdotesForDepartment(codeOrName, {
    ...options,
    validOnly: true,
    contexte: normalizedContext,
    excludeSeen: options.excludeSeen ?? true,
  });

  if (candidates.length === 0) {
    candidates = getAnecdotesForDepartment(codeOrName, {
      ...options,
      validOnly: true,
      excludeSeen: options.excludeSeen ?? true,
    });
  }

  if (candidates.length === 0 && options.allowSeenWhenExhausted !== false) {
    candidates = getAnecdotesForDepartment(codeOrName, {
      ...options,
      validOnly: true,
      excludeSeen: false,
    });
  }

  const selected = randomThemeDiverseItem(candidates, options);
  if (selected && options.recordDisplay !== false) {
    recordAnecdoteDisplay(selected.id, selected);
  }

  return selected;
}

export function getRareAnecdote(codeOrName, options = {}) {
  const candidates = getAnecdotesForDepartment(codeOrName, {
    ...options,
    validOnly: true,
  }).filter((anecdote) => RARE_RARITIES.has(anecdote.rarete));

  const sortedCandidates = candidates.sort((a, b) => (
    rarityScore(b) - rarityScore(a)
    || Number(b.difficulte ?? 3) - Number(a.difficulte ?? 3)
    || a.id.localeCompare(b.id)
  ));

  const selected = themeDiverseCandidates(sortedCandidates, options)[0] ?? null;
  if (selected && options.recordDisplay !== false) {
    recordAnecdoteDisplay(selected.id, selected);
  }

  return selected;
}

export function getAvailableAnecdoteCountsByDepartment(sourceAnecdotes = defaultAnecdotes, options = {}) {
  const validOnly = options.validOnly ?? true;
  return Object.fromEntries(departements.map((departement) => [
    departement.code,
    getAnecdotesForDepartment(departement.code, { sourceAnecdotes, validOnly }).length,
  ]));
}

export function getSeenAnecdoteIds() {
  return readLocalJson(ANECDOTE_SEEN_STORAGE_KEY, []);
}

export function markAnecdoteSeen(id) {
  const seenIds = new Set(getSeenAnecdoteIds());
  seenIds.add(id);
  writeLocalJson(ANECDOTE_SEEN_STORAGE_KEY, [...seenIds]);
}

export function resetSeenAnecdotes() {
  writeLocalJson(ANECDOTE_SEEN_STORAGE_KEY, []);
}

export function getAnecdoteStats() {
  return readLocalJson(ANECDOTE_STATS_STORAGE_KEY, {});
}

export function getRecentAnecdoteThemes() {
  return readLocalJson(ANECDOTE_RECENT_THEMES_STORAGE_KEY, [])
    .map(normalizeTheme)
    .filter(Boolean)
    .slice(0, RECENT_THEME_LIMIT);
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

export function resetRecentAnecdoteThemes() {
  writeLocalJson(ANECDOTE_RECENT_THEMES_STORAGE_KEY, []);
}

export function recordAnecdoteDisplay(id, anecdote = null) {
  const displayedAnecdote = anecdote ?? findAnecdoteById(id);
  markAnecdoteSeen(id);
  recordAnecdoteTheme(displayedAnecdote?.theme);
  updateAnecdoteStats(id, (stats) => ({
    ...stats,
    affichages: stats.affichages + 1,
  }));
}

export function recordAnecdoteRead(id) {
  updateAnecdoteStats(id, (stats) => ({
    ...stats,
    lectures: stats.lectures + 1,
  }));
}

export function recordAnecdoteFeedback(id, appreciation) {
  const key = normalizeAppreciation(appreciation);
  updateAnecdoteStats(id, (stats) => ({
    ...stats,
    appreciation: {
      ...stats.appreciation,
      [key]: stats.appreciation[key] + 1,
    },
  }));
}

export const selectRandomAnecdote = getRandomValidatedAnecdoteForDepartment;
export const selectSmartAnecdote = getNeverSeenAnecdoteForDepartment;
export const selectContextualAnecdote = getContextualAnecdote;

function normalizeContext(value) {
  const normalizedValue = normalizeText(value);
  if (!normalizedValue) return null;
  if (["positive", "bonne", "good", "success", "bonne_reponse"].includes(normalizedValue)) return "bonne_reponse";
  if (["negative", "mauvaise", "bad", "pedagogique", "mauvaise_reponse"].includes(normalizedValue)) return "mauvaise_reponse";
  if (["rare", "anecdote_rare"].includes(normalizedValue)) return "anecdote_rare";
  return ANECDOTE_CONTEXTS.find((context) => normalizeText(context) === normalizedValue) ?? null;
}

function rarityScore(anecdote) {
  return RARITY_SCORE.get(anecdote.rarete) ?? 0;
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

function findAnecdoteById(id) {
  return defaultAnecdotes.find((anecdote) => anecdote.id === id) ?? null;
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

function normalizeAppreciation(value) {
  if (["positive", "neutre", "negative"].includes(value)) return value;
  if (typeof value === "number" && value > 0) return "positive";
  if (typeof value === "number" && value < 0) return "negative";
  return "neutre";
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
    // Le service reste utilisable sans persistance si le stockage local est indisponible.
  }
}

function normalizeTheme(theme) {
  return normalizeText(theme);
}
