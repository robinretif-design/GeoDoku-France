const STORAGE_KEY = "geodoku-france-debug-tester-analytics-v1";
const SESSION_KEY = "geodoku-france-debug-tester-session-v1";
const MAX_EVENTS = 500;

function now() {
  return Date.now();
}

function createSessionId() {
  return `${now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function emptyStore() {
  return {
    version: 1,
    sessions: [],
    events: [],
  };
}

function readStore() {
  if (typeof localStorage === "undefined") return emptyStore();

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return emptyStore();
    const parsed = JSON.parse(saved);
    return {
      version: 1,
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
    };
  } catch {
    return emptyStore();
  }
}

function writeStore(store) {
  if (typeof localStorage === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      sessions: store.sessions.slice(-100),
      events: store.events.slice(-MAX_EVENTS),
    }));
  } catch {
    // Debug-only analytics must never affect the playable experience.
  }
}

function getSessionId() {
  if (typeof sessionStorage === "undefined") return createSessionId();

  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const sessionId = createSessionId();
    sessionStorage.setItem(SESSION_KEY, sessionId);
    return sessionId;
  } catch {
    return createSessionId();
  }
}

function getOrCreateSession(store, context = {}) {
  const sessionId = getSessionId();
  const existing = store.sessions.find((session) => session.id === sessionId);
  if (existing) return existing;

  const startedAt = now();
  const session = {
    id: sessionId,
    startedAt,
    startedAtIso: new Date(startedAt).toISOString(),
    firstActionAt: null,
    firstActionDelayMs: null,
    rulesOpened: 0,
    gamesStarted: 0,
    gamesCompleted: 0,
    gamesCompletedFull: 0,
    gamesCompletedPartial: 0,
    gamesAbandoned: 0,
    currentGame: null,
    entryScreen: context.screen ?? "unknown",
    todayGridId: context.todayGridId ?? null,
  };

  store.sessions.push(session);
  store.events.push({
    sessionId,
    name: "session_started",
    at: startedAt,
    atIso: new Date(startedAt).toISOString(),
    data: {
      screen: session.entryScreen,
      todayGridId: session.todayGridId,
    },
  });

  return session;
}

function sanitizeData(data = {}) {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => (
        value === null
        || typeof value === "string"
        || typeof value === "boolean"
        || (typeof value === "number" && Number.isFinite(value))
      ))
      .map(([key, value]) => [
        key,
        typeof value === "string" ? value.slice(0, 120) : value,
      ])
  );
}

function recordEvent(name, data = {}, options = {}) {
  if (typeof window === "undefined") return null;

  const store = readStore();
  const session = getOrCreateSession(store, data);
  const at = now();

  if (options.firstAction && !session.firstActionAt) {
    session.firstActionAt = at;
    session.firstActionDelayMs = at - session.startedAt;
  }

  const cleanData = sanitizeData(data);
  store.events.push({
    sessionId: session.id,
    name,
    at,
    atIso: new Date(at).toISOString(),
    data: cleanData,
  });

  writeStore(store);
  return { session, eventName: name, data: cleanData };
}

export function initLocalTesterAnalytics(context = {}) {
  if (typeof window === "undefined") return;

  const store = readStore();
  getOrCreateSession(store, context);
  writeStore(store);
}

export function recordLocalTesterAction(actionName, data = {}) {
  return recordEvent(actionName, data, { firstAction: true });
}

export function recordLocalTesterRulesOpened(data = {}) {
  const result = recordEvent("rules_opened", data, { firstAction: true });
  if (!result) return;

  const store = readStore();
  const session = store.sessions.find((item) => item.id === result.session.id);
  if (session) {
    session.rulesOpened += 1;
    writeStore(store);
  }
}

export function recordLocalTesterGameStarted(data = {}) {
  const result = recordEvent("game_started", data, { firstAction: true });
  if (!result) return;

  const store = readStore();
  const session = store.sessions.find((item) => item.id === result.session.id);
  if (session) {
    session.gamesStarted += 1;
    session.currentGame = {
      gridId: data.gridId ?? data.editionId ?? data.edition ?? null,
      startedAt: now(),
      completed: false,
      abandoned: false,
      source: data.source ?? "unknown",
    };
    writeStore(store);
  }
}

export function recordLocalTesterGameCompleted(data = {}) {
  const filledCells = Number.isFinite(data.filledCells) ? data.filledCells : 0;
  const isFullGrid = Boolean(data.isFullGrid ?? filledCells === 9);
  const result = recordEvent("game_completed", {
    ...data,
    filledCells,
    isFullGrid,
  }, { firstAction: true });
  if (!result) return;

  const store = readStore();
  const session = store.sessions.find((item) => item.id === result.session.id);
  if (session) {
    session.gamesCompleted += 1;
    if (isFullGrid) session.gamesCompletedFull += 1;
    else session.gamesCompletedPartial += 1;

    if (session.currentGame) {
      session.currentGame.completed = true;
      session.currentGame.completedAt = now();
      session.currentGame.filledCells = filledCells;
      session.currentGame.score = data.scoreTotal ?? data.score ?? null;
    }
    writeStore(store);
  }
}

export function recordLocalTesterGameAbandoned(data = {}) {
  const store = readStore();
  const session = getOrCreateSession(store, data);
  const activeGame = session.currentGame;
  if (!activeGame || activeGame.completed || activeGame.abandoned) {
    writeStore(store);
    return;
  }

  const gridId = data.gridId ?? data.editionId ?? data.edition ?? activeGame.gridId;
  if (activeGame.gridId && gridId && activeGame.gridId !== gridId) {
    writeStore(store);
    return;
  }

  const at = now();
  activeGame.abandoned = true;
  activeGame.abandonedAt = at;
  activeGame.filledCells = Number.isFinite(data.filledCells) ? data.filledCells : null;
  activeGame.reason = data.reason ?? "unknown";
  session.gamesAbandoned += 1;

  store.events.push({
    sessionId: session.id,
    name: "game_abandoned",
    at,
    atIso: new Date(at).toISOString(),
    data: sanitizeData({
      gridId,
      filledCells: activeGame.filledCells,
      reason: activeGame.reason,
      screen: data.screen ?? "unknown",
    }),
  });

  writeStore(store);
}

function formatSeconds(ms) {
  if (!Number.isFinite(ms)) return null;
  return Math.round(ms / 100) / 10;
}

export function getLocalTesterAnalyticsDebugState() {
  const store = readStore();
  const sessions = store.sessions;
  const events = store.events;
  const sessionsWithFirstAction = sessions.filter((session) => Number.isFinite(session.firstActionDelayMs));
  const firstActionTotal = sessionsWithFirstAction.reduce((sum, session) => sum + session.firstActionDelayMs, 0);
  const gamesStarted = sessions.reduce((sum, session) => sum + session.gamesStarted, 0);
  const gamesCompleted = sessions.reduce((sum, session) => sum + session.gamesCompleted, 0);
  const gamesCompletedFull = sessions.reduce((sum, session) => sum + session.gamesCompletedFull, 0);
  const gamesCompletedPartial = sessions.reduce((sum, session) => sum + session.gamesCompletedPartial, 0);
  const gamesAbandoned = sessions.reduce((sum, session) => sum + session.gamesAbandoned, 0);
  const rulesOpened = sessions.reduce((sum, session) => sum + session.rulesOpened, 0);

  return {
    storageKey: STORAGE_KEY,
    sessions: sessions.length,
    events: events.length,
    sessionsWithFirstAction: sessionsWithFirstAction.length,
    averageFirstActionSeconds: sessionsWithFirstAction.length
      ? formatSeconds(firstActionTotal / sessionsWithFirstAction.length)
      : null,
    rulesOpened,
    gamesStarted,
    gamesCompleted,
    gamesCompletedFull,
    gamesCompletedPartial,
    gamesAbandoned,
    completionRate: gamesStarted ? Math.round((gamesCompleted / gamesStarted) * 100) : 0,
    abandonmentRate: gamesStarted ? Math.round((gamesAbandoned / gamesStarted) * 100) : 0,
    recentEvents: events.slice(-12).reverse().map((event) => ({
      name: event.name,
      atIso: event.atIso,
      data: event.data,
    })),
  };
}
