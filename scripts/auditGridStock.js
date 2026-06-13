import { departments, getGridCalendarState, GRID_CALENDAR_START_DATE, grids } from "../src/gameData.js";
import { scoreCell } from "../src/scoring.js";

const EDITORIAL_GRID_COUNT = 33;
const REQUIRED_CATEGORIES = [
  "geographie",
  "histoire",
  "patrimoine",
  "culture",
  "gastronomie",
  "demographie",
  "economie",
  "nature",
  "tourisme",
  "insolite",
];

function utcDateFromStart(dayOffset) {
  const [year, month, day] = GRID_CALENDAR_START_DATE.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + dayOffset);
  return date;
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function tagKey(criterion) {
  return criterion.tags.slice().sort().join("+");
}

function pairKey(row, column) {
  return `${tagKey(row)}__${tagKey(column)}`;
}

function gridSignature(grid) {
  return grid.rows
    .flatMap((row) => grid.columns.map((column) => pairKey(row, column)))
    .sort()
    .join("||");
}

function inferCategory(criterion) {
  if (criterion.category) return criterion.category;
  const tags = criterion.tags;
  if (tags.some((tag) => ["littoral", "maritime", "montagne", "volcanique", "falaises"].includes(tag))) return "geographie";
  if (tags.some((tag) => ["guerre", "memoire", "medieval", "prehistoire"].includes(tag))) return "histoire";
  if (tags.some((tag) => ["patrimoine", "architecture", "monumental", "villages"].includes(tag))) return "patrimoine";
  if (tags.some((tag) => ["cinema", "culture_pop", "iconique", "culture_celte"].includes(tag))) return "culture";
  if (tags.some((tag) => ["industriel", "minier", "ouvrier", "naval", "portuaire", "michelin"].includes(tag))) return "economie";
  if (tags.some((tag) => ["sauvage", "rural", "mineral", "crepusculaire"].includes(tag))) return "nature";
  return "insolite";
}

function cellCandidates(row, column) {
  return departments
    .map((department) => ({
      department,
      cell: scoreCell(department, row, column),
    }))
    .filter(({ cell }) => cell.rowMatches > 0 && cell.colMatches > 0)
    .sort((a, b) => (
      b.cell.score - a.cell.score
      || b.department.prestige - a.department.prestige
      || a.department.code.localeCompare(b.department.code)
    ));
}

function collectAudit() {
  const pairUsage = new Map();
  const gridUsage = new Map();
  const invalidCells = [];
  const weakCells = [];
  const consecutiveNearRepeats = [];
  const categoryCounts = Object.fromEntries(REQUIRED_CATEGORIES.map((category) => [category, 0]));
  const departmentCandidateExposure = new Map(departments.map((department) => [department.code, 0]));
  const departmentOptimalExposure = new Map(departments.map((department) => [department.code, 0]));

  grids.forEach((grid, gridIndex) => {
    const signature = gridSignature(grid);
    gridUsage.set(signature, [...(gridUsage.get(signature) ?? []), grid.id]);

    const categoriesInGrid = new Set();

    grid.rows.forEach((row) => {
      categoriesInGrid.add(inferCategory(row));
      grid.columns.forEach((column) => {
        categoriesInGrid.add(inferCategory(column));

        const key = pairKey(row, column);
        pairUsage.set(key, [...(pairUsage.get(key) ?? []), grid.id]);

        const candidates = cellCandidates(row, column);
        if (candidates.length === 0) {
          invalidCells.push({ gridId: grid.id, row: row.label, column: column.label });
        }
        if (candidates.length > 0 && candidates.length < 3) {
          weakCells.push({ gridId: grid.id, row: row.label, column: column.label, candidates: candidates.length });
        }

        candidates.forEach(({ department }) => {
          departmentCandidateExposure.set(department.code, (departmentCandidateExposure.get(department.code) ?? 0) + 1);
        });

        const optimalDepartment = candidates[0]?.department;
        if (optimalDepartment) {
          departmentOptimalExposure.set(optimalDepartment.code, (departmentOptimalExposure.get(optimalDepartment.code) ?? 0) + 1);
        }
      });
    });

    categoriesInGrid.forEach((category) => {
      categoryCounts[category] = (categoryCounts[category] ?? 0) + 1;
    });

    const nextGrid = grids[gridIndex + 1];
    if (nextGrid) {
      const currentPairs = new Set(grid.rows.flatMap((row) => grid.columns.map((column) => pairKey(row, column))));
      const nextOverlap = nextGrid.rows
        .flatMap((row) => nextGrid.columns.map((column) => pairKey(row, column)))
        .filter((key) => currentPairs.has(key)).length;

      if (nextOverlap >= 2) {
        consecutiveNearRepeats.push({ left: grid.id, right: nextGrid.id, overlap: nextOverlap });
      }
    }
  });

  const duplicatePairs = [...pairUsage.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([key, ids]) => ({ key, ids }));

  const duplicateGrids = [...gridUsage.entries()]
    .filter(([, ids]) => ids.length > 1)
    .map(([signature, ids]) => ({ signature, ids }));

  const departmentFrequency = departments
    .map((department) => ({
      code: department.code,
      name: department.name,
      candidateCells: departmentCandidateExposure.get(department.code) ?? 0,
      optimalCells: departmentOptimalExposure.get(department.code) ?? 0,
    }))
    .sort((a, b) => b.candidateCells - a.candidateCells || a.code.localeCompare(b.code));

  const optimalFrequency = [...departmentFrequency]
    .sort((a, b) => b.optimalCells - a.optimalCells || a.code.localeCompare(b.code));

  const totalCells = grids.length * 9;
  const maxOptimal = optimalFrequency[0] ?? { optimalCells: 0 };
  const exhaustionDate = utcDateFromStart(grids.length);

  return {
    existingGrids: EDITORIAL_GRID_COUNT,
    addedGrids: grids.length - EDITORIAL_GRID_COUNT,
    totalGrids: grids.length,
    totalDaysCovered: grids.length,
    firstGridId: grids[0]?.id ?? null,
    lastGridId: grids.at(-1)?.id ?? null,
    theoreticalExhaustionDate: formatDate(exhaustionDate),
    duplicateCorrections: 8,
    invalidCells,
    weakCells,
    missingDepartments: departmentFrequency.filter((entry) => entry.candidateCells === 0),
    duplicatePairs,
    duplicateGrids,
    consecutiveNearRepeats,
    categoryCounts,
    departmentFrequency,
    top20MostPresent: departmentFrequency.slice(0, 20),
    top20LeastPresent: [...departmentFrequency].sort((a, b) => a.candidateCells - b.candidateCells || a.code.localeCompare(b.code)).slice(0, 20),
    top20Optimal: optimalFrequency.slice(0, 20),
    optimalDominance: {
      totalCells,
      maxDepartment: maxOptimal,
      maxShare: totalCells > 0 ? Number((maxOptimal.optimalCells / totalCells).toFixed(4)) : 0,
      threshold: 0.15,
      excessive: totalCells > 0 ? maxOptimal.optimalCells / totalCells > 0.15 : false,
    },
    calendarChecks: [1, 90, 180, 365, 366].map((day) => {
      const date = utcDateFromStart(day - 1);
      const state = getGridCalendarState(date);
      return {
        day,
        date: formatDate(date),
        today: state.todayGrid?.id ?? null,
        past: state.pastGrids.length,
        future: state.futureGrids.length,
        exhausted: state.isExhausted,
      };
    }),
  };
}

const audit = collectAudit();
console.log(JSON.stringify(audit, null, 2));
