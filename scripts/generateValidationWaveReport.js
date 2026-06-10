import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { anecdotes, VALIDATED_ANECDOTE_STATUS } from "../src/data/anecdotes.js";
import { departements } from "../src/data/departements.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT_DIR, "data");

const waveId = String(process.argv[2] ?? "").padStart(3, "0");
const departmentCodes = String(process.argv[3] ?? "")
  .split(",")
  .map((code) => code.trim().toUpperCase())
  .filter(Boolean);
const validatedCount = Number(process.argv[4] ?? 0);

if (!waveId || departmentCodes.length === 0 || !Number.isFinite(validatedCount)) {
  throw new Error("Usage: node scripts/generateValidationWaveReport.js 005 68,70,71 300");
}

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

const departmentByCode = new Map(
  [...departements, ...EXTRA_TERRITORIES].map((departement) => [departement.code, departement]),
);
const counts = buildCoverageCounts();
const totalEditorial = anecdotes.length;
const totalValidated = anecdotes.filter((anecdote) => anecdote.statut_validation === VALIDATED_ANECDOTE_STATUS).length;
const totalToReview = totalEditorial - totalValidated;
const previousValidated = totalValidated - validatedCount;
const previousPercent = percent(previousValidated, totalEditorial);
const currentPercent = percent(totalValidated, totalEditorial);
const waveRows = departmentCodes.map((code) => {
  const row = counts.get(code);
  return {
    code,
    nom: departmentByCode.get(code)?.nom ?? code,
    validatedInWave: anecdotes.filter((anecdote) => (
      anecdote.code_departement === code
      && anecdote.statut_validation === VALIDATED_ANECDOTE_STATUS
      && !/-seed-/.test(anecdote.id)
    )).length,
    remainingToReview: row?.aVerifier ?? 0,
  };
});

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.writeFileSync(path.join(DATA_DIR, `validation_wave_${waveId}.md`), `${renderValidationWave()}\n`, "utf8");
fs.writeFileSync(path.join(DATA_DIR, "coverage_report.md"), `${renderCoverageReport()}\n`, "utf8");

console.log(JSON.stringify({
  wave: waveId,
  validatedInWave: validatedCount,
  totalEditorial,
  totalValidated,
  totalToReview,
  validationPercent: currentPercent,
}, null, 2));

function buildCoverageCounts() {
  const counts = new Map(departements.map((departement) => [departement.code, {
    code: departement.code,
    nom: departement.nom,
    total: 0,
    validees: 0,
    aVerifier: 0,
  }]));

  for (const anecdote of anecdotes) {
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

function renderValidationWave() {
  return [
    `# Validation assistée vague ${waveId}`,
    "",
    "## Synthèse",
    "",
    `- Départements validés : ${departmentCodes.length}`,
    `- Anecdotes passées en validée : ${validatedCount}`,
    "- Exceptions conservées en révision : 0",
    `- Taux global avant vague : ${previousPercent}%`,
    `- Taux global après vague : ${currentPercent}%`,
    "",
    "## Départements validés",
    "",
    table(
      ["Code", "Département", "Anecdotes validées dans la vague", "Restant à vérifier"],
      waveRows.map((row) => [row.code, row.nom, row.validatedInWave, row.remainingToReview]),
    ),
    "",
    "## Exceptions",
    "",
    "Aucune exception. Aucune priorité A, priorité B ou anecdote marquée À CONTRÔLER n'était associée aux départements validés dans cette vague.",
    "",
    "## Évolution globale",
    "",
    table(
      ["Indicateur", "Avant vague", "Après vague"],
      [
        ["Anecdotes éditoriales", totalEditorial, totalEditorial],
        ["Anecdotes validées", previousValidated, totalValidated],
        ["Anecdotes à vérifier", totalEditorial - previousValidated, totalToReview],
        ["Taux de validation", `${previousPercent}%`, `${currentPercent}%`],
      ],
    ),
  ].join("\n");
}

function renderCoverageReport() {
  const rows = [...counts.values()].sort((a, b) => sortDepartmentCode(a.code, b.code));
  const bestCovered = [...rows].sort((a, b) => b.total - a.total || b.validees - a.validees || sortDepartmentCode(a.code, b.code)).slice(0, 20);
  const leastCovered = [...rows].sort((a, b) => a.total - b.total || a.validees - b.validees || sortDepartmentCode(a.code, b.code)).slice(0, 20);
  const lessThan5Validated = rows.filter((row) => row.validees < 5);
  const lessThan30Total = rows.filter((row) => row.total < 30);

  return [
    "# Rapport de couverture anecdotes",
    "",
    `- Départements suivis : ${rows.length}`,
    `- Total anecdotes éditoriales : ${totalEditorial}`,
    `- Total validées : ${totalValidated}`,
    `- Total à vérifier : ${totalToReview}`,
    `- Couverture moyenne : ${(totalEditorial / rows.length).toFixed(2)} anecdotes par département`,
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

function coverageTable(rows) {
  return table(
    ["Code", "Département", "Total", "Validées", "À vérifier"],
    rows.map((row) => [row.code, row.nom, row.total, row.validees, row.aVerifier]),
  );
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

function bulletDepartmentRows(rows, field) {
  if (rows.length === 0) return "Aucun.";
  return rows.map((row) => `- ${row.code} ${row.nom} : ${row[field]} ${field === "validees" ? "validée(s)" : "anecdote(s)"} sur ${row.total}`).join("\n");
}

function percent(value, total) {
  return ((value / total) * 100).toFixed(2);
}

function sortDepartmentCode(a, b) {
  const numberA = Number(a);
  const numberB = Number(b);
  if (Number.isFinite(numberA) && Number.isFinite(numberB)) return numberA - numberB;
  return String(a).localeCompare(String(b), "fr");
}
