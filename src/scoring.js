
export function cellKey(rowId, colId) {
  return `${rowId}__${colId}`;
}

function countMatches(depTags, criterionTags) {
  return criterionTags.filter((tag) => depTags.includes(tag)).length;
}

export function scoreCell(dep, row, col) {
  const rowMatches = countMatches(dep.tags, row.tags);
  const colMatches = countMatches(dep.tags, col.tags);

  let score = 0;
  score += Math.min(4, rowMatches * 2);
  score += Math.min(4, colMatches * 2);

  if (rowMatches > 0 && colMatches > 0) score += 1;

  const rareBoost = dep.prestige >= 8 ? 1 : 0;
  const final = Math.min(9, score + rareBoost);

  return {
    score: final,
    rowMatches,
    colMatches,
    status:
      final >= 9 ? "Coup de génie" :
      final >= 7 ? "Très pertinent" :
      final >= 5 ? "Valide" :
      final >= 3 ? "Fragile" : "Très discutable",
  };
}

export function scoreGrid(answers, departments, rows, columns) {
  let cells = 0;
  let underdogBonus = 0;
  let diversityBonus = 0;
  let riskBonus = 0;
  const used = [];

  Object.entries(answers).forEach(([key, depName]) => {
    const [rowId, colId] = key.split("__");
    const dep = departments.find((d) => d.name === depName);
    const row = rows.find((r) => r.id === rowId);
    const col = columns.find((c) => c.id === colId);
    if (!dep || !row || !col) return;

    const cell = scoreCell(dep, row, col);
    cells += cell.score;
    used.push(dep);

    if (dep.prestige >= 8 && cell.score >= 5) underdogBonus += 2;
    if (dep.prestige >= 9 && cell.score >= 7) riskBonus += 1;
  });

  const regions = new Set(used.map((d) => d.region));
  const tiers = new Set(used.map((d) => d.tier));

  diversityBonus += Math.min(5, Math.max(0, regions.size - 2));
  diversityBonus += Math.min(4, Math.max(0, tiers.size - 2));

  const completionBonus = used.length === 9 ? 8 : used.length >= 6 ? 3 : 0;

  const total = Math.min(101, cells + underdogBonus + diversityBonus + riskBonus + completionBonus);

  return { cells, underdogBonus, diversityBonus, riskBonus, completionBonus, total };
}

export function findMasterMove(answers, departments, rows, columns) {
  let best = null;

  Object.entries(answers).forEach(([key, depName]) => {
    const [rowId, colId] = key.split("__");
    const dep = departments.find((d) => d.name === depName);
    const row = rows.find((r) => r.id === rowId);
    const col = columns.find((c) => c.id === colId);
    if (!dep || !row || !col) return;

    const cell = scoreCell(dep, row, col);
    const prestige = dep.prestige ?? 0;
    const masterScore = cell.score * 2 + prestige;
    const rarity = dep.selectionRate ?? Math.max(1, Math.min(18, 20 - prestige - cell.score));

    if (
      !best ||
      masterScore > best.masterScore ||
      (masterScore === best.masterScore && cell.score > best.cell.score)
    ) {
      best = {
        dep,
        row,
        col,
        cell,
        crossing: `${row.label} × ${col.label}`,
        rarity,
        raritySentence: `Seulement ${rarity}% des joueurs auraient probablement tenté ce choix.`,
        masterScore,
      };
    }
  });

  return best;
}

export function rank(score) {
  if (score >= 96) return "Cartographe mythique";
  if (score >= 85) return "Stratège territorial";
  if (score >= 70) return "Explorateur affûté";
  if (score >= 50) return "Voyageur curieux";
  return "Promeneur prudent";
}
