const DAILY_RESET_LIMIT = 1;
const STORAGE_PREFIX = "geodoku-france-daily-reset-v1";
const memoryUsage = {};

export function getDailyResetStorageKey(gridId) {
  return gridId ? `${STORAGE_PREFIX}-${gridId}` : STORAGE_PREFIX;
}

function readUsage(gridId) {
  if (!gridId) return 0;
  if (typeof localStorage === "undefined") return memoryUsage[gridId] ?? 0;

  try {
    const saved = localStorage.getItem(getDailyResetStorageKey(gridId));
    if (!saved) return 0;
    const parsed = JSON.parse(saved);
    return Number.isFinite(parsed.usedCount) ? Math.max(0, parsed.usedCount) : 0;
  } catch {
    return 0;
  }
}

function writeUsage(gridId, usedCount) {
  if (!gridId) return;
  memoryUsage[gridId] = usedCount;
  if (typeof localStorage === "undefined") return;

  try {
    localStorage.setItem(getDailyResetStorageKey(gridId), JSON.stringify({
      gridId,
      usedCount,
      updatedAt: new Date().toISOString(),
    }));
  } catch {
    // The reset guard is a local anti-abuse helper; storage errors must not crash the game.
  }
}

export function getDailyResetLimitState(gridId) {
  const usedCount = readUsage(gridId);
  const remaining = Math.max(0, DAILY_RESET_LIMIT - usedCount);

  return {
    gridId: gridId ?? null,
    storageKey: getDailyResetStorageKey(gridId),
    usedCount,
    remaining,
    canReset: remaining > 0,
  };
}

export function consumeDailyReset(gridId) {
  const current = getDailyResetLimitState(gridId);
  if (!gridId || !current.canReset) {
    return {
      ...current,
      consumed: false,
    };
  }

  const usedCount = current.usedCount + 1;
  writeUsage(gridId, usedCount);

  return {
    ...getDailyResetLimitState(gridId),
    consumed: true,
  };
}
