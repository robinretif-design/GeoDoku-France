import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MEDIA_CATALOG, MEDIA_RIGHTS_POLICY } from "../src/data/mediaCatalog.js";
import { VALIDATED_ANECDOTE_STATUS, anecdotes } from "../src/data/anecdotes.js";
import { departments } from "../src/gameData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const reportPath = path.join(rootDir, "data", "media_catalog_audit.md");

function localPathFromSrc(src) {
  const cleanSrc = String(src ?? "").trim();
  if (!cleanSrc.startsWith("/") || cleanSrc.startsWith("//")) return null;
  return path.join(rootDir, "public", cleanSrc.replace(/^\//, ""));
}

function isAcceptedRecord(record) {
  return MEDIA_RIGHTS_POLICY.acceptedStatuses.includes(record.status)
    && MEDIA_RIGHTS_POLICY.acceptedSourceTypes.includes(record.sourceType);
}

function flattenCatalog() {
  return Object.entries(MEDIA_CATALOG).flatMap(([bucket, records]) => (
    Object.entries(records).map(([key, record]) => ({
      bucket,
      key,
      ...record,
    }))
  ));
}

function buildIssues(records) {
  const issues = [];
  const srcCounts = new Map();

  records.forEach((record) => {
    const filePath = localPathFromSrc(record.src);
    srcCounts.set(record.src, (srcCounts.get(record.src) ?? 0) + 1);

    if (!filePath) {
      issues.push(`[${record.bucket}] ${record.key}: source non locale ou invalide (${record.src})`);
    } else if (!fs.existsSync(filePath)) {
      issues.push(`[${record.bucket}] ${record.key}: fichier manquant (${record.src})`);
    }

    if (!isAcceptedRecord(record)) {
      issues.push(`[${record.bucket}] ${record.key}: droits non approuves (${record.sourceType}/${record.status})`);
    }

    if (!record.alt) {
      issues.push(`[${record.bucket}] ${record.key}: texte alternatif manquant`);
    }

    if (record.requiresAttribution && !record.credit && !record.attribution) {
      issues.push(`[${record.bucket}] ${record.key}: attribution requise mais credit absent`);
    }
  });

  const repeatedSrc = [...srcCounts.entries()].filter(([, count]) => count > 1);
  return { issues, repeatedSrc };
}

function countApproved(records, bucket) {
  return records.filter((record) => record.bucket === bucket && isAcceptedRecord(record)).length;
}

function buildReport() {
  const records = flattenCatalog();
  const { issues, repeatedSrc } = buildIssues(records);
  const coveredDepartmentCodes = new Set(Object.keys(MEDIA_CATALOG.departments));
  const validAnecdoteIds = new Set(anecdotes
    .filter((anecdote) => anecdote.statut_validation === VALIDATED_ANECDOTE_STATUS)
    .map((anecdote) => anecdote.id));
  const coveredValidAnecdotes = Object.keys(MEDIA_CATALOG.anecdotes)
    .filter((id) => validAnecdoteIds.has(id));
  const missingPilotDepartments = departments
    .filter((department) => !coveredDepartmentCodes.has(department.code))
    .map((department) => `${department.code} ${department.name}`);

  const rows = [
    ["Departements", countApproved(records, "departments"), departments.length],
    ["Lieux", countApproved(records, "places"), "progressif"],
    ["Anecdotes validees", coveredValidAnecdotes.length, validAnecdoteIds.size],
  ];

  return `# Audit catalogue media

Date : 2026-06-11

## Resume

| Perimetre | Medias approuves | Total cible |
| --- | ---: | ---: |
${rows.map(([label, approved, total]) => `| ${label} | ${approved} | ${total} |`).join("\n")}

## Regle active

- Sources locales uniquement : ${MEDIA_RIGHTS_POLICY.localOnly ? "oui" : "non"}
- Statuts acceptes : ${MEDIA_RIGHTS_POLICY.acceptedStatuses.join(", ")}
- Types acceptes : ${MEDIA_RIGHTS_POLICY.acceptedSourceTypes.join(", ")}

## Issues

${issues.length ? issues.map((issue) => `- ${issue}`).join("\n") : "- Aucune issue bloquante detectee."}

## Sources reutilisees

${repeatedSrc.length ? repeatedSrc.map(([src, count]) => `- \`${src}\` : ${count} entrees`).join("\n") : "- Aucune source reutilisee."}

## Departements sans media dedie

${missingPilotDepartments.length ? missingPilotDepartments.map((department) => `- ${department}`).join("\n") : "- Tous les departements ont un media dedie."}

## Prochaine passe recommandee

1. Remplacer progressivement les illustrations pilotes par des photos locales approuvees.
2. Remplir \`sourceType\`, \`license\`, \`attribution\`, \`credit\` et \`status\` avant branchement public.
3. Lancer \`npm run audit:media\` avant chaque lot photo.
`;
}

function main() {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  const report = buildReport();
  fs.writeFileSync(reportPath, report, "utf8");
  console.log(JSON.stringify({
    report: path.relative(rootDir, reportPath).replace(/\\/g, "/"),
  }, null, 2));
}

main();
