import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import { anecdotes } from "../src/data/anecdotes.js";
import { getCollectionForAnecdote } from "../src/data/collections.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "public", "data");
const departmentOutputDir = path.join(outputDir, "anecdotes");
const outputPath = path.join(outputDir, "anecdotes-valides.json");
const collectionSummaryPath = path.join(outputDir, "anecdotes-collections-summary.json");
const reportPath = path.join(rootDir, "data", "public_anecdotes_dataset_report.md");

const VALIDATED_STATUS = "validée";
const PUBLIC_FIELDS = [
  "id",
  "code_departement",
  "titre",
  "contenu",
  "categorie",
  "difficulte",
  "rarete",
  "ton",
  "contexte",
  "theme",
  "statut_validation",
];
const EXCLUDED_FIELDS = ["source", "date_ajout", "date_modification", "validee"];

function isValidated(anecdote) {
  return anecdote?.statut_validation === VALIDATED_STATUS;
}

function toPublicAnecdote(anecdote) {
  return {
    id: anecdote.id,
    code_departement: anecdote.code_departement,
    titre: anecdote.titre,
    contenu: anecdote.contenu,
    categorie: anecdote.categorie,
    difficulte: anecdote.difficulte,
    rarete: anecdote.rarete,
    ton: anecdote.ton,
    contexte: anecdote.contexte,
    theme: anecdote.theme ?? null,
    statut_validation: anecdote.statut_validation,
  };
}

function byteSize(filePath) {
  return fs.existsSync(filePath) ? fs.statSync(filePath).size : 0;
}

function gzipSize(input) {
  const source = Buffer.isBuffer(input) ? input : fs.readFileSync(input);
  return zlib.gzipSync(source).length;
}

function formatBytes(bytes) {
  return `${bytes.toLocaleString("fr-FR")} o (${(bytes / 1024).toFixed(2)} KiB)`;
}

function getDistJsStats() {
  const assetsDir = path.join(rootDir, "dist", "assets");
  if (!fs.existsSync(assetsDir)) return null;

  const jsFiles = fs.readdirSync(assetsDir)
    .filter((file) => file.endsWith(".js"))
    .map((file) => ({
      file,
      fullPath: path.join(assetsDir, file),
      size: byteSize(path.join(assetsDir, file)),
    }))
    .sort((a, b) => b.size - a.size);

  const mainJs = jsFiles[0];
  if (!mainJs) return null;

  return {
    file: mainJs.file,
    size: mainJs.size,
    gzip: gzipSize(mainJs.fullPath),
  };
}

function getBatchStats() {
  const batchesDir = path.join(rootDir, "src", "data", "anecdotes");
  const batchFiles = fs.readdirSync(batchesDir)
    .filter((file) => file.endsWith(".js"))
    .map((file) => path.join(batchesDir, file));

  const rawSize = batchFiles.reduce((total, file) => total + byteSize(file), 0);
  const concatenated = Buffer.concat(batchFiles.map((file) => fs.readFileSync(file)));

  return {
    rawSize,
    gzip: zlib.gzipSync(concatenated).length,
  };
}

function buildDataset() {
  const dataset = {};
  const validated = anecdotes
    .filter(isValidated)
    .sort((a, b) => (
      String(a.code_departement).localeCompare(String(b.code_departement), "fr")
      || String(a.id).localeCompare(String(b.id), "fr")
    ));

  validated.forEach((anecdote) => {
    const code = String(anecdote.code_departement);
    if (!dataset[code]) dataset[code] = [];
    dataset[code].push(toPublicAnecdote(anecdote));
  });

  return { dataset, validated };
}

function buildCollectionSummary(validated) {
  const collections = {};

  validated.forEach((anecdote) => {
    const collection = getCollectionForAnecdote(anecdote);
    if (!collection?.key) return;

    const current = collections[collection.key] ?? {
      totalAvailable: 0,
    };

    current.totalAvailable += 1;
    collections[collection.key] = current;
  });

  return {
    generatedAt: new Date().toISOString(),
    source: "anecdotes validees",
    totalValidatedAnecdotes: validated.length,
    totalAvailableCollections: Object.keys(collections).length,
    collections,
  };
}

function writeDepartmentFiles(dataset) {
  fs.rmSync(departmentOutputDir, { recursive: true, force: true });
  fs.mkdirSync(departmentOutputDir, { recursive: true });

  return Object.entries(dataset)
    .sort(([a], [b]) => a.localeCompare(b, "fr"))
    .map(([code, anecdotesForDepartment]) => {
      const json = `${JSON.stringify(anecdotesForDepartment, null, 2)}\n`;
      const fileName = `${code}.json`;
      const filePath = path.join(departmentOutputDir, fileName);
      fs.writeFileSync(filePath, json, "utf8");

      const buffer = Buffer.from(json, "utf8");
      return {
        code,
        file: `data/anecdotes/${fileName}`,
        count: anecdotesForDepartment.length,
        size: buffer.length,
        gzip: gzipSize(buffer),
      };
    });
}

function buildReport({
  dataset,
  validated,
  outputSize,
  outputGzipSize,
  distJsStats,
  batchStats,
  departmentFiles,
  collectionSummarySize,
  collectionSummaryGzipSize,
}) {
  const departmentCodes = Object.keys(dataset).sort((a, b) => a.localeCompare(b, "fr"));
  const excludedCounts = {
    "à vérifier": anecdotes.filter((anecdote) => anecdote.statut_validation === "à vérifier").length,
    brouillon: anecdotes.filter((anecdote) => anecdote.statut_validation === "brouillon").length,
    rejetée: anecdotes.filter((anecdote) => anecdote.statut_validation === "rejetée").length,
  };
  const totalDepartmentFilesSize = departmentFiles.reduce((total, entry) => total + entry.size, 0);
  const totalDepartmentFilesGzipSize = departmentFiles.reduce((total, entry) => total + entry.gzip, 0);
  const rows = departmentCodes.map((code) => `| ${code} | ${dataset[code].length} |`);
  const largestDepartmentFiles = [...departmentFiles]
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)
    .map((entry) => `| ${entry.code} | ${entry.count} | ${formatBytes(entry.size)} | ${formatBytes(entry.gzip)} |`);
  const distLines = distJsStats
    ? [
      `| Bundle JS actuel | ${formatBytes(distJsStats.size)} | ${formatBytes(distJsStats.gzip)} |`,
      `| Batchs editoriaux source | ${formatBytes(batchStats.rawSize)} | ${formatBytes(batchStats.gzip)} |`,
      `| Dataset public valide global | ${formatBytes(outputSize)} | ${formatBytes(outputGzipSize)} |`,
      `| Fichiers publics par departement | ${formatBytes(totalDepartmentFilesSize)} | ${formatBytes(totalDepartmentFilesGzipSize)} |`,
      `| Resume collections public | ${formatBytes(collectionSummarySize)} | ${formatBytes(collectionSummaryGzipSize)} |`,
    ]
    : [
      `| Batchs editoriaux source | ${formatBytes(batchStats.rawSize)} | ${formatBytes(batchStats.gzip)} |`,
      `| Dataset public valide global | ${formatBytes(outputSize)} | ${formatBytes(outputGzipSize)} |`,
      `| Fichiers publics par departement | ${formatBytes(totalDepartmentFilesSize)} | ${formatBytes(totalDepartmentFilesGzipSize)} |`,
      `| Resume collections public | ${formatBytes(collectionSummarySize)} | ${formatBytes(collectionSummaryGzipSize)} |`,
    ];

  return `# Rapport dataset public anecdotes validees

Date : ${new Date().toISOString().slice(0, 10)}

## Resume

Un dataset public global reste genere dans \`public/data/anecdotes-valides.json\`.

Des fichiers par departement sont aussi generes dans \`public/data/anecdotes/{code}.json\` pour permettre un chargement differe au strict besoin des resultats et fiches.

## Resultat de generation

| Indicateur | Valeur |
| --- | ---: |
| Anecdotes exportees | ${validated.length} |
| Departements couverts | ${departmentCodes.length} |
| Anecdotes exclues \`a verifier\` | ${excludedCounts["à vérifier"]} |
| Brouillons exclus | ${excludedCounts.brouillon} |
| Rejetees exclues | ${excludedCounts.rejetée} |
| Poids JSON global brut | ${formatBytes(outputSize)} |
| Poids JSON global gzip estime | ${formatBytes(outputGzipSize)} |
| Fichiers par departement | ${departmentFiles.length} |
| Poids total fichiers departement | ${formatBytes(totalDepartmentFilesSize)} |
| Poids gzip cumule fichiers departement | ${formatBytes(totalDepartmentFilesGzipSize)} |
| Poids resume collections | ${formatBytes(collectionSummarySize)} |
| Poids gzip resume collections | ${formatBytes(collectionSummaryGzipSize)} |

## Champs conserves

${PUBLIC_FIELDS.map((field) => `- \`${field}\``).join("\n")}

## Champs exclus

${EXCLUDED_FIELDS.map((field) => `- \`${field}\``).join("\n")}

## Couverture par departement

| Departement | Anecdotes exportees |
| --- | ---: |
${rows.join("\n")}

## Comparaison avec l'etat bundle actuel

| Element | Brut | Gzip estime |
| --- | ---: | ---: |
${distLines.join("\n")}

## Plus gros fichiers par departement

| Departement | Anecdotes | Brut | Gzip estime |
| --- | ---: | ---: | ---: |
${largestDepartmentFiles.join("\n")}

## Strategie recommandee

1. Charger \`public/data/anecdotes/{code}.json\` uniquement pour les departements affiches en resultat ou fiche.
2. Garder \`public/data/anecdotes-valides.json\` comme artefact global de controle et d'audit.
3. Utiliser \`public/data/anecdotes-collections-summary.json\` pour les totaux de collections sans charger tous les contenus.
4. Garder le fallback \`dep.anecdote\` pendant le chargement ou en cas d'erreur reseau.
5. Si un departement devient trop lourd, fractionner ensuite par contexte ou rarete.
`;
}

function main() {
  const { dataset, validated } = buildDataset();
  fs.mkdirSync(outputDir, { recursive: true });

  const json = `${JSON.stringify(dataset, null, 2)}\n`;
  fs.writeFileSync(outputPath, json, "utf8");

  const outputBuffer = Buffer.from(json, "utf8");
  const outputSize = outputBuffer.length;
  const outputGzipSize = gzipSize(outputBuffer);
  const departmentFiles = writeDepartmentFiles(dataset);
  const collectionSummaryJson = `${JSON.stringify(buildCollectionSummary(validated), null, 2)}\n`;
  fs.writeFileSync(collectionSummaryPath, collectionSummaryJson, "utf8");
  const collectionSummaryBuffer = Buffer.from(collectionSummaryJson, "utf8");
  const collectionSummarySize = collectionSummaryBuffer.length;
  const collectionSummaryGzipSize = gzipSize(collectionSummaryBuffer);
  const distJsStats = getDistJsStats();
  const batchStats = getBatchStats();

  fs.writeFileSync(reportPath, buildReport({
    dataset,
    validated,
    outputSize,
    outputGzipSize,
    distJsStats,
    batchStats,
    departmentFiles,
    collectionSummarySize,
    collectionSummaryGzipSize,
  }), "utf8");

  console.log(JSON.stringify({
    output: path.relative(rootDir, outputPath).replace(/\\/g, "/"),
    departmentOutput: path.relative(rootDir, departmentOutputDir).replace(/\\/g, "/"),
    collectionSummary: path.relative(rootDir, collectionSummaryPath).replace(/\\/g, "/"),
    report: path.relative(rootDir, reportPath).replace(/\\/g, "/"),
    exported: validated.length,
    departments: Object.keys(dataset).length,
    departmentFiles: departmentFiles.length,
    bytes: outputSize,
    gzipBytes: outputGzipSize,
    collectionSummaryBytes: collectionSummarySize,
    collectionSummaryGzipBytes: collectionSummaryGzipSize,
  }, null, 2));
}

main();
