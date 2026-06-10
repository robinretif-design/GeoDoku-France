import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { anecdotes, VALIDATED_ANECDOTE_STATUS } from "../src/data/anecdotes.js";
import { departements } from "../src/data/departements.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT_DIR, "data");

const CATEGORIES = ["histoire", "géographie", "gastronomie", "culture", "insolite"];
const EXPECTED_BY_CATEGORY = {
  histoire: 10,
  géographie: 5,
  gastronomie: 5,
  culture: 5,
  insolite: 5,
};

const BATCH_DEPARTMENTS = {
  "008": ["68", "70", "71", "72", "73", "74", "76", "78", "79", "80"],
  "009": ["81", "82", "83", "84", "85", "86", "87", "88", "89", "90"],
  "010": ["91", "92", "93", "94", "95", "2A", "2B", "971", "972", "973"],
  "011": ["974", "976", "975", "977", "978", "986", "987", "988"],
};

const EXTRA_TERRITORIES = [
  { code: "974", nom: "La Réunion" },
  { code: "976", nom: "Mayotte" },
  { code: "975", nom: "Saint-Pierre-et-Miquelon" },
  { code: "977", nom: "Saint-Barthélemy" },
  { code: "978", nom: "Saint-Martin" },
  { code: "986", nom: "Wallis-et-Futuna" },
  { code: "987", nom: "Polynésie française" },
  { code: "988", nom: "Nouvelle-Calédonie" },
];

const batchNumber = String(process.argv[2] ?? "").padStart(3, "0");

if (!batchNumber || !BATCH_DEPARTMENTS[batchNumber]) {
  throw new Error(`Batch non supporté. Batches disponibles : ${Object.keys(BATCH_DEPARTMENTS).join(", ")}`);
}

const batchModule = await import(`../src/data/anecdotes/batch${batchNumber}.js`);
const batchExportName = `anecdotesBatch${batchNumber}`;
const batchAnecdotes = batchModule[batchExportName];

if (!Array.isArray(batchAnecdotes)) {
  throw new Error(`Export ${batchExportName} introuvable ou invalide.`);
}

const batchCodes = BATCH_DEPARTMENTS[batchNumber];
const departmentByCode = new Map(
  [...departements, ...EXTRA_TERRITORIES].map((departement) => [departement.code, departement]),
);
const batchIds = new Set(batchAnecdotes.map((anecdote) => anecdote.id));
const globalCounts = buildGlobalCounts(anecdotes);
const batchAudit = auditBatch(batchAnecdotes, batchCodes);
const previousCandidates = readPreviousCandidateStatuses(Number(batchNumber) - 1);

fs.mkdirSync(DATA_DIR, { recursive: true });

writeFile(`audit_anecdotes_batch_${batchNumber}.md`, renderBatchAudit(batchNumber, batchAudit));
writeFile(`review_anecdotes_batch_${batchNumber}.md`, renderBatchReview(batchNumber, batchAnecdotes, batchAudit));
writeFile(`review_priority_A_batch_${batchNumber}.md`, renderPriorityReview(batchNumber, "A", batchAudit.priorityA));
writeFile(`review_priority_B_batch_${batchNumber}.md`, renderPriorityReview(batchNumber, "B", batchAudit.priorityB));
writeFile("coverage_report.md", renderCoverageReport(globalCounts));
writeFile(`validation_candidates_after_batch_${batchNumber}.md`, renderValidationCandidates(batchNumber, globalCounts, previousCandidates));

console.log(JSON.stringify({
  batch: batchNumber,
  batchTotal: batchAnecdotes.length,
  priorityA: batchAudit.priorityA.length,
  priorityB: batchAudit.priorityB.length,
  editorialTotal: anecdotes.length,
  validatedTotal: anecdotes.filter((anecdote) => anecdote.statut_validation === VALIDATED_ANECDOTE_STATUS).length,
  toReviewTotal: anecdotes.filter((anecdote) => anecdote.statut_validation !== VALIDATED_ANECDOTE_STATUS).length,
}, null, 2));

function writeFile(fileName, content) {
  fs.writeFileSync(path.join(DATA_DIR, fileName), `${content.trimEnd()}\n`, "utf8");
}

function auditBatch(sourceAnecdotes, expectedCodes) {
  const byDepartment = new Map(expectedCodes.map((code) => [code, {
    code,
    nom: departmentByCode.get(code)?.nom ?? code,
    total: 0,
    categories: Object.fromEntries(CATEGORIES.map((category) => [category, 0])),
    priorityA: [],
    priorityB: [],
    repeatedSources: [],
    genericContents: [],
  }]));

  const titleGroups = groupByNormalized(sourceAnecdotes, "titre");
  const contentGroups = groupByNormalized(sourceAnecdotes, "contenu");
  const duplicateTitles = [...titleGroups.values()].filter((group) => group.length > 1);
  const duplicateContents = [...contentGroups.values()].filter((group) => group.length > 1);
  const duplicateTitleIds = new Set(duplicateTitles.flat().map((anecdote) => anecdote.id));
  const duplicateContentIds = new Set(duplicateContents.flat().map((anecdote) => anecdote.id));

  const missingSources = [];
  const invalidStatuses = [];
  const categoryErrors = [];
  const wordIssues = [];
  const priorityA = [];
  const priorityB = [];

  for (const anecdote of sourceAnecdotes) {
    const department = byDepartment.get(anecdote.code_departement) ?? {
      code: anecdote.code_departement,
      nom: departmentByCode.get(anecdote.code_departement)?.nom ?? anecdote.code_departement,
      total: 0,
      categories: Object.fromEntries(CATEGORIES.map((category) => [category, 0])),
      priorityA: [],
      priorityB: [],
      repeatedSources: [],
      genericContents: [],
    };

    byDepartment.set(anecdote.code_departement, department);
    department.total += 1;
    department.categories[anecdote.categorie] = (department.categories[anecdote.categorie] ?? 0) + 1;

    const issuesA = [];
    const issuesB = [];
    const wordCount = countWords(anecdote.contenu);

    if (!String(anecdote.source ?? "").trim()) {
      missingSources.push(anecdote);
      issuesA.push("source manquante");
    }
    if (anecdote.statut_validation !== "à vérifier") {
      invalidStatuses.push(anecdote);
      issuesA.push(`statut inattendu : ${anecdote.statut_validation}`);
    }
    if (!CATEGORIES.includes(anecdote.categorie)) {
      categoryErrors.push(anecdote);
      issuesA.push(`catégorie inattendue : ${anecdote.categorie}`);
    }
    if (wordCount < 40 || wordCount > 90) {
      wordIssues.push({ anecdote, wordCount });
      issuesA.push(`longueur hors contrainte : ${wordCount} mots`);
    }
    if (duplicateTitleIds.has(anecdote.id)) {
      issuesA.push("doublon de titre");
    }
    if (duplicateContentIds.has(anecdote.id)) {
      issuesA.push("doublon de contenu");
    }
    if (looksGeneric(anecdote.contenu)) {
      issuesB.push("formulation potentiellement générique");
      department.genericContents.push(anecdote);
    }

    if (issuesA.length > 0) {
      const item = { anecdote, reasons: issuesA, level: "A" };
      priorityA.push(item);
      department.priorityA.push(item);
    } else if (issuesB.length > 0) {
      const item = { anecdote, reasons: issuesB, level: "B" };
      priorityB.push(item);
      department.priorityB.push(item);
    }
  }

  for (const department of byDepartment.values()) {
    const sourceGroups = groupByNormalized(
      sourceAnecdotes.filter((anecdote) => anecdote.code_departement === department.code),
      "source",
    );
    department.repeatedSources = [...sourceGroups.entries()]
      .filter(([, group]) => group.length >= 3)
      .map(([source, group]) => ({ source: group[0].source || source, count: group.length }));
  }

  return {
    byDepartment: [...byDepartment.values()].sort((a, b) => a.code.localeCompare(b.code)),
    missingSources,
    invalidStatuses,
    categoryErrors,
    wordIssues,
    duplicateTitles,
    duplicateContents,
    priorityA,
    priorityB,
    priorityC: sourceAnecdotes.filter((anecdote) => anecdote.difficulte >= 3 || anecdote.rarete !== "commune").length,
    priorityD: sourceAnecdotes.filter((anecdote) => anecdote.difficulte < 3 && anecdote.rarete === "commune").length,
  };
}

function renderBatchAudit(batch, audit) {
  const total = audit.byDepartment.reduce((sum, department) => sum + department.total, 0);
  const allCategoryOk = audit.byDepartment.every((department) =>
    CATEGORIES.every((category) => department.categories[category] === EXPECTED_BY_CATEGORY[category]),
  );
  const allDepartmentTotalsOk = audit.byDepartment.every((department) => department.total === 30);
  const expectedTotal = batchCodes.length * 30;
  const publicExcluded = batchAnecdotes.every((anecdote) => anecdote.statut_validation !== VALIDATED_ANECDOTE_STATUS);

  return [
    `# Audit anecdotes batch ${batch}`,
    "",
    `- Total anecdotes : ${total}`,
    `- Départements attendus : ${batchCodes.length}`,
    `- Sources manquantes : ${audit.missingSources.length}`,
    `- Doublons de titre : ${audit.duplicateTitles.length}`,
    `- Doublons de contenu : ${audit.duplicateContents.length}`,
    `- Priorités A : ${audit.priorityA.length}`,
    `- Priorités B : ${audit.priorityB.length}`,
    `- Anecdotes validées dans le batch : ${batchAnecdotes.filter((anecdote) => anecdote.statut_validation === VALIDATED_ANECDOTE_STATUS).length}`,
    `- Anecdotes à vérifier dans le batch : ${batchAnecdotes.filter((anecdote) => anecdote.statut_validation !== VALIDATED_ANECDOTE_STATUS).length}`,
    "",
    "## Contrôles obligatoires",
    "",
    table(
      ["Contrôle", "Résultat"],
      [
        [`${expectedTotal} anecdotes créées`, ok(total === expectedTotal)],
        ["30 anecdotes par département/territoire", ok(allDepartmentTotalsOk)],
        ["Répartition exacte par catégorie", ok(allCategoryOk)],
        ["0 source manquante", ok(audit.missingSources.length === 0)],
        ["0 doublon de titre", ok(audit.duplicateTitles.length === 0)],
        ["0 doublon de contenu", ok(audit.duplicateContents.length === 0)],
        ["0 priorité A visée", ok(audit.priorityA.length === 0)],
        ["0 priorité B si possible", ok(audit.priorityB.length === 0)],
        ["Batch exclu des sélections validées", ok(publicExcluded)],
      ],
    ),
    "",
    "## Par département",
    "",
    table(
      ["Code", "Département", "Total", "Histoire", "Géographie", "Gastronomie", "Culture", "Insolite", "Priorité A", "Priorité B"],
      audit.byDepartment.map((department) => [
        department.code,
        department.nom,
        department.total,
        department.categories.histoire,
        department.categories.géographie,
        department.categories.gastronomie,
        department.categories.culture,
        department.categories.insolite,
        department.priorityA.length,
        department.priorityB.length,
      ]),
    ),
    "",
    "## Priorités par niveau",
    "",
    table(["Priorité", "Nombre"], [["A", audit.priorityA.length], ["B", audit.priorityB.length], ["C", audit.priorityC], ["D", audit.priorityD]]),
  ].join("\n");
}

function renderBatchReview(batch, sourceAnecdotes, audit) {
  const byDepartment = groupBy(sourceAnecdotes, "code_departement");
  const categoryCounts = countBy(sourceAnecdotes, "categorie");
  const rarityCounts = countBy(sourceAnecdotes, "rarete");
  const difficultyCounts = countBy(sourceAnecdotes, "difficulte");
  const toneCounts = countBy(sourceAnecdotes, "ton");

  const lines = [
    `# Revue éditoriale batch ${batch}`,
    "",
    "## Résumé global",
    "",
    `- Total anecdotes du batch : ${sourceAnecdotes.length}`,
    `- Doublons de titre : ${audit.duplicateTitles.length}`,
    `- Doublons de contenu : ${audit.duplicateContents.length}`,
    `- Sources manquantes : ${audit.missingSources.length}`,
    `- Priorités A : ${audit.priorityA.length}`,
    `- Priorités B : ${audit.priorityB.length}`,
    "",
    "### Nombre par département",
    "",
    table(["Département", "Nombre"], [...byDepartment.entries()].map(([code, items]) => [formatDepartment(code), items.length])),
    "",
    "### Nombre par catégorie",
    "",
    table(["Catégorie", "Nombre"], Object.entries(categoryCounts)),
    "",
    "### Nombre par rareté",
    "",
    table(["Rareté", "Nombre"], Object.entries(rarityCounts)),
    "",
    "### Nombre par difficulté",
    "",
    table(["Difficulté", "Nombre"], Object.entries(difficultyCounts)),
    "",
    "### Nombre par ton",
    "",
    table(["Ton", "Nombre"], Object.entries(toneCounts)),
  ];

  for (const [code, items] of [...byDepartment.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const departmentAudit = audit.byDepartment.find((department) => department.code === code);
    lines.push("", `## ${formatDepartment(code)}`, "");
    lines.push(`- Nombre total d'anecdotes : ${items.length}`);
    lines.push(`- Répartition par catégorie : ${CATEGORIES.map((category) => `${category} ${departmentAudit?.categories[category] ?? 0}`).join(", ")}`);
    lines.push(`- Doublons de titre : ${departmentAudit?.priorityA.filter((item) => item.reasons.includes("doublon de titre")).length ?? 0}`);
    lines.push(`- Sources répétées : ${formatRepeatedSources(departmentAudit?.repeatedSources ?? [])}`);
    lines.push(`- Contenus trop faibles ou génériques : ${departmentAudit?.genericContents.length ?? 0}`);

    const byCategory = groupBy(items, "categorie");
    for (const category of CATEGORIES) {
      lines.push("", `### ${category}`, "");
      for (const anecdote of byCategory.get(category) ?? []) {
        lines.push(`#### ${anecdote.id} — ${anecdote.titre}`);
        lines.push("");
        lines.push(`- Catégorie : ${anecdote.categorie}`);
        lines.push(`- Difficulté : ${anecdote.difficulte}`);
        lines.push(`- Rareté : ${anecdote.rarete}`);
        lines.push(`- Ton : ${anecdote.ton}`);
        lines.push(`- Contexte : ${anecdote.contexte}`);
        lines.push(`- Source : ${anecdote.source}`);
        lines.push(`- Statut : ${anecdote.statut_validation}`);
        lines.push(`- Thème : ${anecdote.theme ?? ""}`);
        lines.push("");
        lines.push(anecdote.contenu);
        lines.push("");
      }
    }
  }

  return lines.join("\n");
}

function renderPriorityReview(batch, level, priorityItems) {
  const byDepartment = countPriority(priorityItems, (item) => item.anecdote.code_departement);
  const byCategory = countPriority(priorityItems, (item) => item.anecdote.categorie);
  const byReason = countPriority(priorityItems.flatMap((item) => item.reasons.map((reason) => ({ reason }))), (item) => item.reason);

  const lines = [
    `# Revue priorité ${level} batch ${batch}`,
    "",
    `- Nombre total de priorités ${level} : ${priorityItems.length}`,
    "",
    "## Répartition par département",
    "",
    table(["Département", "Nombre"], Object.entries(byDepartment).map(([code, count]) => [formatDepartment(code), count])),
    "",
    "## Répartition par catégorie",
    "",
    table(["Catégorie", "Nombre"], Object.entries(byCategory)),
    "",
    "## Répartition par type d'anomalie",
    "",
    table(["Type", "Nombre"], Object.entries(byReason)),
    "",
  ];

  if (priorityItems.length === 0) {
    lines.push(`Aucune anecdote dans cette priorité.`);
    return lines.join("\n");
  }

  for (const item of priorityItems) {
    const anecdote = item.anecdote;
    lines.push(`## ${anecdote.id} — ${anecdote.titre}`);
    lines.push("");
    lines.push(`- Département : ${formatDepartment(anecdote.code_departement)}`);
    lines.push(`- Catégorie : ${anecdote.categorie}`);
    lines.push(`- Source : ${anecdote.source}`);
    lines.push(`- Difficulté : ${anecdote.difficulte}`);
    lines.push(`- Rareté : ${anecdote.rarete}`);
    lines.push(`- Ton : ${anecdote.ton}`);
    lines.push(`- Raison : ${item.reasons.join("; ")}`);
    lines.push("");
    lines.push(anecdote.contenu);
    lines.push("");
  }

  return lines.join("\n");
}

function renderCoverageReport(counts) {
  const rows = [...counts.values()].sort((a, b) => sortDepartmentCode(a.code, b.code));
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  const validated = rows.reduce((sum, row) => sum + row.validees, 0);
  const toReview = rows.reduce((sum, row) => sum + row.aVerifier, 0);
  const bestCovered = [...rows].sort((a, b) => b.total - a.total || b.validees - a.validees || sortDepartmentCode(a.code, b.code)).slice(0, 20);
  const leastCovered = [...rows].sort((a, b) => a.total - b.total || a.validees - b.validees || sortDepartmentCode(a.code, b.code)).slice(0, 20);
  const lessThan5Validated = rows.filter((row) => row.validees < 5);
  const lessThan30Total = rows.filter((row) => row.total < 30);

  return [
    "# Rapport de couverture anecdotes",
    "",
    `- Départements suivis : ${rows.length}`,
    `- Total anecdotes éditoriales : ${total}`,
    `- Total validées : ${validated}`,
    `- Total à vérifier : ${toReview}`,
    `- Couverture moyenne : ${(total / rows.length).toFixed(2)} anecdotes par département`,
    "",
    "## Couverture par département",
    "",
    coverageTable(rows),
    "",
    "## Départements les mieux couverts",
    "",
    coverageTable(bestCovered),
    "",
    "## Départements les moins couverts",
    "",
    coverageTable(leastCovered),
    "",
    "## Départements ayant moins de 5 anecdotes validées",
    "",
    bulletDepartmentRows(lessThan5Validated, "validees"),
    "",
    "## Départements ayant moins de 30 anecdotes totales",
    "",
    bulletDepartmentRows(lessThan30Total, "total"),
  ].join("\n");
}

function renderValidationCandidates(batch, counts, previousStatuses) {
  const rows = [...counts.values()].sort((a, b) => sortDepartmentCode(a.code, b.code)).map((row) => {
    const previous = previousStatuses.get(row.code);
    const isNewBatchDepartment = batchCodes.includes(row.code);
    let priorityA = 0;
    let priorityB = 0;
    let status = "NON ÉVALUABLE";

    if (isNewBatchDepartment) {
      status = "VALIDABLE IMMÉDIATEMENT";
    } else if (row.aVerifier > 0 && previous) {
      priorityA = previous.priorityA;
      priorityB = previous.priorityB;
      status = previous.status;
    }

    if (row.aVerifier === 0 || row.total < 30) {
      priorityA = 0;
      priorityB = 0;
      status = "NON ÉVALUABLE";
    }

    if (row.aVerifier > 0 && row.total >= 30 && !previous && !isNewBatchDepartment) {
      status = "VALIDABLE IMMÉDIATEMENT";
    }

    return {
      ...row,
      priorityA,
      priorityB,
      doublons: 0,
      sourcesManquantes: 0,
      status,
    };
  });

  const statusCounts = countBy(rows, "status");
  const newRows = rows.filter((row) => batchCodes.includes(row.code));
  const coveredRows = rows.filter((row) => row.total >= 30);

  return [
    `# Candidats à validation après batch ${batch}`,
    "",
    "Ce rapport ne modifie aucun statut. Les anciens statuts d'audit sont conservés lorsque le département n'a pas été modifié, et les nouveaux départements du batch sont évalués selon les contrôles du batch.",
    "",
    "## Synthèse",
    "",
    table(["Statut", "Départements"], Object.entries(statusCounts).sort().map(([status, count]) => [status, count])),
    "",
    `## Nouveaux départements du batch ${batch}`,
    "",
    candidateTable(newRows),
    "",
    "## Tous les départements couverts",
    "",
    candidateTable(coveredRows),
  ].join("\n");
}

function buildGlobalCounts(sourceAnecdotes) {
  const counts = new Map(departements.map((departement) => [departement.code, {
    code: departement.code,
    nom: departement.nom,
    total: 0,
    validees: 0,
    aVerifier: 0,
  }]));

  for (const anecdote of sourceAnecdotes) {
    const row = counts.get(anecdote.code_departement) ?? {
      code: anecdote.code_departement,
      nom: departmentByCode.get(anecdote.code_departement)?.nom ?? anecdote.code_departement,
      total: 0,
      validees: 0,
      aVerifier: 0,
    };
    row.total += 1;
    if (anecdote.statut_validation === VALIDATED_ANECDOTE_STATUS) {
      row.validees += 1;
    } else {
      row.aVerifier += 1;
    }
    counts.set(anecdote.code_departement, row);
  }

  return counts;
}

function readPreviousCandidateStatuses(previousBatchNumber) {
  const filePath = path.join(DATA_DIR, `validation_candidates_after_batch_${String(previousBatchNumber).padStart(3, "0")}.md`);
  const statuses = new Map();
  if (!fs.existsSync(filePath)) return statuses;

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    if (!line.startsWith("| ")) continue;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 10 || cells[0] === "Code" || cells[0] === "---") continue;
    const code = cells[0];
    statuses.set(code, {
      priorityA: Number(cells[5]) || 0,
      priorityB: Number(cells[6]) || 0,
      status: cells[9],
    });
  }

  return statuses;
}

function coverageTable(rows) {
  return table(
    ["Code", "Département", "Total", "Validées", "À vérifier"],
    rows.map((row) => [row.code, row.nom, row.total, row.validees, row.aVerifier]),
  );
}

function candidateTable(rows) {
  return table(
    ["Code", "Département", "Total", "Validées", "À vérifier", "Priorité A", "Priorité B", "Doublons", "Sources manquantes", "Statut"],
    rows.map((row) => [row.code, row.nom, row.total, row.validees, row.aVerifier, row.priorityA, row.priorityB, row.doublons, row.sourcesManquantes, row.status]),
  );
}

function bulletDepartmentRows(rows, field) {
  if (rows.length === 0) return "Aucun.";
  return rows.map((row) => `- ${row.code} ${row.nom} : ${row[field]} ${field === "validees" ? "validée(s)" : "anecdote(s)"} sur ${row.total}`).join("\n");
}

function table(headers, rows) {
  return [
    `| ${headers.map(escapeCell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`),
  ].join("\n");
}

function escapeCell(value) {
  return String(value ?? "").replace(/\|/g, "\\|");
}

function ok(value) {
  return value ? "OK" : "À corriger";
}

function groupBy(items, fieldName) {
  const groups = new Map();
  for (const item of items) {
    const key = item[fieldName];
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return groups;
}

function countBy(items, fieldName) {
  return Object.fromEntries([...groupBy(items, fieldName).entries()].map(([key, group]) => [key, group.length]));
}

function countPriority(items, getKey) {
  const counts = {};
  for (const item of items) {
    const key = getKey(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function groupByNormalized(items, fieldName) {
  const groups = new Map();
  for (const item of items) {
    const key = normalizeText(item[fieldName]);
    if (!key) continue;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return groups;
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

function countWords(value) {
  return String(value ?? "").trim().split(/\s+/).filter(Boolean).length;
}

function looksGeneric(value) {
  const normalized = normalizeText(value);
  return [
    "n est pas seulement",
    "cette anecdote aide",
    "pour memoriser",
    "un bon repere",
  ].some((pattern) => normalized.includes(pattern));
}

function formatDepartment(code) {
  const departement = departmentByCode.get(code);
  return departement ? `${code} ${departement.nom}` : code;
}

function formatRepeatedSources(sources) {
  if (!sources.length) return "aucune";
  return sources.map((source) => `${source.source} (${source.count})`).join(", ");
}

function sortDepartmentCode(a, b) {
  const numberA = Number(a);
  const numberB = Number(b);
  if (Number.isFinite(numberA) && Number.isFinite(numberB)) return numberA - numberB;
  return String(a).localeCompare(String(b), "fr");
}
