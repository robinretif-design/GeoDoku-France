import { getGridCalendarState, GRID_CALENDAR_START_DATE, grids } from "../src/gameData.js";

const DAYS_TO_TEST = [1, 2, 30, 180, 365, 366];

function dateForDay(day) {
  const [year, month, startDay] = GRID_CALENDAR_START_DATE.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, startDay));
  date.setUTCDate(date.getUTCDate() + day - 1);
  return date;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function canStartGrid(state, grid) {
  return Boolean(grid && state.unlockedGrids.some((item) => item.id === grid.id));
}

function auditDay(day) {
  const date = dateForDay(day);
  const state = getGridCalendarState(date);
  const expectedToday = day <= grids.length ? String(day).padStart(3, "0") : null;
  const futureGrid = state.futureGrids[0] ?? null;

  return {
    day,
    date: formatDate(date),
    today: state.todayGrid?.id ?? null,
    expectedToday,
    homeVisibleGrids: state.todayGrid ? [state.todayGrid.id] : [],
    archiveVisibleGrids: state.pastGrids.map((grid) => grid.id),
    futureVisibleGrids: [],
    archiveCount: state.pastGrids.length,
    futureCount: state.futureGrids.length,
    exhausted: state.isExhausted,
    canStartToday: canStartGrid(state, state.todayGrid),
    canStartFirstArchive: canStartGrid(state, state.pastGrids[0]),
    canStartFuture: canStartGrid(state, futureGrid),
    canStartMissing: canStartGrid(state, { id: "999" }),
    ok:
      (state.todayGrid?.id ?? null) === expectedToday
      && state.futureGrids.every((grid) => !canStartGrid(state, grid))
      && !canStartGrid(state, { id: "999" }),
  };
}

const scenarios = DAYS_TO_TEST.map(auditDay);

console.log(JSON.stringify({
  totalGrids: grids.length,
  startDate: GRID_CALENDAR_START_DATE,
  scenarios,
  passed: scenarios.every((scenario) => scenario.ok),
}, null, 2));
