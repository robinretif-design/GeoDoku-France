import { scoreCell } from "../scoring.js";

const COMMUNITY_STATS_STORAGE_KEY = "geodoku-france-community-stats-v1";
const COMMUNITY_STATS_SCHEMA_VERSION = 1;
const SUCCESS_SCORE_THRESHOLD = 7;

const emptyCommunityStatsStore = {
  schemaVersion: COMMUNITY_STATS_SCHEMA_VERSION,
  games: [],
  answers: [],
};

export function loadCommunityStatsStore() {
  if (typeof localStorage === "undefined") return emptyStore();

  try {
    const saved = localStorage.getItem(COMMUNITY_STATS_STORAGE_KEY);
    if (!saved) return emptyStore();

    const parsed = JSON.parse(saved);
    return normalizeStore(parsed);
  } catch {
    return emptyStore();
  }
}

export function saveCommunityStatsStore(store) {
  if (typeof localStorage === "undefined") return store;

  const normalizedStore = normalizeStore(store);
  try {
    localStorage.setItem(COMMUNITY_STATS_STORAGE_KEY, JSON.stringify(normalizedStore));
  } catch {
    // The game remains playable if local storage is unavailable or full.
  }
  return normalizedStore;
}

export function recordCommunityGame({ grid, answers, departments, attemptCounts = {}, date = new Date() }) {
  const store = loadCommunityStatsStore();
  const completedAt = toIsoDate(date);
  const gameId = createGameId(grid?.id, completedAt);
  const answerEvents = buildCommunityAnswerEvents({
    gameId,
    grid,
    answers,
    departments,
    attemptCounts,
    completedAt,
  });

  const nextStore = normalizeStore({
    ...store,
    games: [
      ...store.games,
      {
        id: gameId,
        editionId: grid?.id ?? "unknown",
        difficulty: grid?.difficulty ?? "normal",
        completedAt,
        answerCount: answerEvents.length,
      },
    ],
    answers: [
      ...store.answers,
      ...answerEvents,
    ],
  });

  saveCommunityStatsStore(nextStore);

  return {
    store: nextStore,
    recordedAnswers: answerEvents.length,
    summary: getCommunityStatsSummary(nextStore),
  };
}

export function buildCommunityAnswerEvents({
  gameId,
  grid,
  answers,
  departments,
  attemptCounts = {},
  completedAt = new Date().toISOString(),
}) {
  if (!grid || !answers || !Array.isArray(departments)) return [];

  return Object.entries(answers).map(([key, departmentName]) => {
    const [rowId, colId] = key.split("__");
    const row = grid.rows.find((item) => item.id === rowId);
    const col = grid.columns.find((item) => item.id === colId);
    const chosenDepartment = departments.find((department) => department.name === departmentName);
    if (!row || !col || !chosenDepartment) return null;

    const cell = scoreCell(chosenDepartment, row, col);
    const target = findCommunityTargetDepartment(row, col, departments);
    const attemptCount = Number(attemptCounts[key] ?? 1);

    return {
      schemaVersion: COMMUNITY_STATS_SCHEMA_VERSION,
      gameId,
      editionId: grid.id,
      difficulty: grid.difficulty ?? "normal",
      cellKey: key,
      rowId,
      rowLabel: row.label,
      colId,
      colLabel: col.label,
      targetDepartmentCode: target?.department.code ?? chosenDepartment.code,
      targetDepartmentName: target?.department.name ?? chosenDepartment.name,
      chosenDepartmentCode: chosenDepartment.code,
      chosenDepartmentName: chosenDepartment.name,
      success: cell.score >= SUCCESS_SCORE_THRESHOLD,
      firstTry: attemptCount <= 1,
      attemptCount,
      score: cell.score,
      date: completedAt,
      source: "localStorage",
    };
  }).filter(Boolean);
}

export function findCommunityTargetDepartment(row, col, departments) {
  if (!row || !col || !Array.isArray(departments)) return null;

  return departments.reduce((best, department) => {
    const cell = scoreCell(department, row, col);
    const candidate = {
      department,
      score: cell.score,
      prestige: department.prestige ?? 0,
      selectionRate: department.selectionRate ?? 100,
    };

    if (!best) return candidate;
    if (candidate.score !== best.score) return candidate.score > best.score ? candidate : best;
    if (candidate.prestige !== best.prestige) return candidate.prestige > best.prestige ? candidate : best;
    if (candidate.selectionRate !== best.selectionRate) return candidate.selectionRate < best.selectionRate ? candidate : best;
    return String(candidate.department.code).localeCompare(String(best.department.code), "fr") < 0 ? candidate : best;
  }, null);
}

export function getCommunityStatsSummary(store = loadCommunityStatsStore()) {
  const normalizedStore = normalizeStore(store);
  const totalAnswers = normalizedStore.answers.length;
  const successes = normalizedStore.answers.filter((answer) => answer.success).length;
  const firstTryAnswers = normalizedStore.answers.filter((answer) => answer.firstTry);
  const firstTrySuccesses = firstTryAnswers.filter((answer) => answer.success).length;

  return {
    gamesPlayed: normalizedStore.games.length,
    answersRecorded: totalAnswers,
    successes,
    successRate: percentage(successes, totalAnswers),
    firstTrySuccesses,
    firstTrySuccessRate: percentage(firstTrySuccesses, firstTryAnswers.length),
  };
}

export function getDepartmentCommunityStats(departmentCode, store = loadCommunityStatsStore()) {
  const normalizedStore = normalizeStore(store);
  const code = String(departmentCode ?? "").trim().toUpperCase();
  const targetAnswers = normalizedStore.answers.filter((answer) => answer.targetDepartmentCode === code);
  const successes = targetAnswers.filter((answer) => answer.success);
  const firstTryAnswers = targetAnswers.filter((answer) => answer.firstTry);
  const firstTrySuccesses = firstTryAnswers.filter((answer) => answer.success);
  const confusions = targetAnswers.filter((answer) => (
    !answer.success
    && answer.chosenDepartmentCode
    && answer.chosenDepartmentCode !== answer.targetDepartmentCode
  ));

  return {
    departmentCode: code,
    attempts: targetAnswers.length,
    successes: successes.length,
    successRate: percentage(successes.length, targetAnswers.length),
    firstTryAttempts: firstTryAnswers.length,
    firstTrySuccesses: firstTrySuccesses.length,
    firstTrySuccessRate: percentage(firstTrySuccesses.length, firstTryAnswers.length),
    mostConfusedDepartment: getMostFrequentConfusion(confusions),
  };
}

export function getCellCommunityStats(key, store = loadCommunityStatsStore()) {
  const normalizedStore = normalizeStore(store);
  const cellAnswers = normalizedStore.answers.filter((answer) => answer.cellKey === key);
  const successes = cellAnswers.filter((answer) => answer.success);
  const firstTryAnswers = cellAnswers.filter((answer) => answer.firstTry);
  const firstTrySuccesses = firstTryAnswers.filter((answer) => answer.success);

  return {
    cellKey: key,
    attempts: cellAnswers.length,
    successes: successes.length,
    successRate: percentage(successes.length, cellAnswers.length),
    firstTryAttempts: firstTryAnswers.length,
    firstTrySuccesses: firstTrySuccesses.length,
    firstTrySuccessRate: percentage(firstTrySuccesses.length, firstTryAnswers.length),
  };
}

export function getCommunityInsightForPlacement(placement, departments, store = loadCommunityStatsStore()) {
  if (!placement?.row || !placement?.col || !placement?.key) return null;

  const target = findCommunityTargetDepartment(placement.row, placement.col, departments);
  const targetDepartment = target?.department;
  if (!targetDepartment) return null;

  const cellStats = getCellCommunityStats(placement.key, store);
  const departmentStats = getDepartmentCommunityStats(targetDepartment.code, store);

  if (departmentStats.mostConfusedDepartment?.count >= 2) {
    return `Tendance locale : ${departmentStats.mostConfusedDepartment.name} est le plus souvent confondu avec ${targetDepartment.name}.`;
  }

  if (cellStats.attempts >= 2) {
    return `Tendance locale : ${cellStats.successRate}% de reussite sur ce croisement.`;
  }

  if (departmentStats.attempts >= 1) {
    return `Tendance locale : ${departmentStats.successRate}% de reussite pour ${targetDepartment.name}.`;
  }

  return "Tendance locale : premieres donnees en cours de constitution.";
}

export function getCommunityStatsStorageKey() {
  return COMMUNITY_STATS_STORAGE_KEY;
}

function getMostFrequentConfusion(confusions) {
  if (confusions.length === 0) return null;

  const counts = new Map();
  confusions.forEach((answer) => {
    const code = answer.chosenDepartmentCode;
    const current = counts.get(code) ?? {
      code,
      name: answer.chosenDepartmentName,
      count: 0,
    };
    current.count += 1;
    counts.set(code, current);
  });

  return [...counts.values()].sort((a, b) => (
    b.count - a.count
    || a.name.localeCompare(b.name, "fr")
  ))[0] ?? null;
}

function normalizeStore(store) {
  return {
    schemaVersion: COMMUNITY_STATS_SCHEMA_VERSION,
    games: Array.isArray(store?.games) ? store.games : [],
    answers: Array.isArray(store?.answers) ? store.answers : [],
  };
}

function emptyStore() {
  return {
    ...emptyCommunityStatsStore,
    games: [],
    answers: [],
  };
}

function percentage(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

function toIsoDate(date) {
  if (date instanceof Date) return date.toISOString();
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function createGameId(editionId, completedAt) {
  const randomPart = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);
  return `${editionId ?? "unknown"}-${completedAt}-${randomPart}`;
}
