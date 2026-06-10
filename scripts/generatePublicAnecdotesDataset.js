import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import { anecdotes } from "../src/data/anecdotes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "public", "data");
const outputPath = path.join(outputDir, "anecdotes-valides.json");
const reportPath = path.join(rootDir, "data", "public_anecdotes_dataset_report.md");

const PUBLIC_FIELDS = ["id", "titre", "contenu", "categorie", "rarete", "ton", "contexte", "theme"];
const EXCLUDED_FIELDS = [
  "code_departement",
  "source",
  "statut_validation",
  "date_ajout",
  "date_modification",
  "difficulte",
  "validee",
];

function isValidated(anecdote) {
  return anecdote?.statut_validation === "validée";
}

function toPublicAnecdote(anecdote) {
  return {
    id: anecdote.id,
    titre: anecdote.titre,
    contenu: anecdote.contenu,
    categorie: anecdote.categorie,
    rarete: anecdote.rarete,
    ton: anecdote.ton,
    contexte: anecdote.contexte,
    theme: anecdote.theme ?? null,
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

function buildReport({ dataset, validated, outputSize, outputGzipSize, distJsStats, batchStats }) {
  const departmentCodes = Object.keys(dataset).sort((a, b) => a.localeCompare(b, "fr"));
  const excludedCounts = {
    "à vérifier": anecdotes.filter((anecdote) => anecdote.statut_validation === "à vérifier").length,
    brouillon: anecdotes.filter((anecdote) => anecdote.statut_validation === "brouillon").length,
    rejetée: anecdotes.filter((anecdote) => anecdote.statut_validation === "rejetée").length,
  };

  const rows = departmentCodes.map((code) => `| ${code} | ${dataset[code].length} |`);
  const distLines = distJsStats
    ? [
      `| Bundle JS actuel | ${formatBytes(distJsStats.size)} | ${formatBytes(distJsStats.gzip)} |`,
      `| Batchs éditoriaux source | ${formatBytes(batchStats.rawSize)} | ${formatBytes(batchStats.gzip)} |`,
      `| Dataset public validé | ${formatBytes(outputSize)} | ${formatBytes(outputGzipSize)} |`,
    ]
    : [
      `| Batchs éditoriaux source | ${formatBytes(batchStats.rawSize)} | ${formatBytes(batchStats.gzip)} |`,
      `| Dataset public validé | ${formatBytes(outputSize)} | ${formatBytes(outputGzipSize)} |`,
    ];

  return `# Rapport dataset public anecdotes validées

Date : 2026-06-04

## Résumé

Un dataset public allégé a été généré dans \`public/data/anecdotes-valides.json\`.

Ce fichier prépare une future bascule vers un chargement différé, sans modifier le comportement actuel de l'application. \`main.jsx\` continue d'utiliser l'import existant pour le MVP.

## Résultat de génération

| Indicateur | Valeur |
| --- | ---: |
| Anecdotes exportées | ${validated.length} |
| Départements couverts | ${departmentCodes.length} |
| Anecdotes exclues \`à vérifier\` | ${excludedCounts["à vérifier"]} |
| Brouillons exclus | ${excludedCounts.brouillon} |
| Rejetées exclues | ${excludedCounts.rejetée} |
| Poids JSON brut | ${formatBytes(outputSize)} |
| Poids gzip estimé | ${formatBytes(outputGzipSize)} |

## Champs conservés

${PUBLIC_FIELDS.map((field) => `- \`${field}\``).join("\n")}

## Champs exclus

${EXCLUDED_FIELDS.map((field) => `- \`${field}\``).join("\n")}

Les sources ne sont pas incluses parce qu'elles ne sont pas nécessaires à l'affichage public actuel. Les statuts ne sont pas inclus parce que ce dataset public ne contient déjà que des anecdotes validées.

## Structure du JSON

\`\`\`json
{
  "45": [
    {
      "id": "...",
      "titre": "...",
      "contenu": "...",
      "categorie": "...",
      "rarete": "...",
      "ton": "...",
      "contexte": "...",
      "theme": "..."
    }
  ]
}
\`\`\`

## Couverture par département

| Département | Anecdotes exportées |
| --- | ---: |
${rows.join("\n")}

## Comparaison avec l'état bundle actuel

| Élément | Brut | Gzip estimé |
| --- | ---: | ---: |
${distLines.join("\n")}

Lecture : le dataset public validé est plus léger que les batchs source complets car il exclut les anecdotes non validées et les champs internes. Il ne réduit toutefois pas encore le bundle tant que \`main.jsx\` importe le moteur actuel, qui agrège les batchs JS.

## Recommandation future

Stratégie recommandée pour une bascule ultérieure :

1. Conserver \`public/data/anecdotes-valides.json\` comme artefact public généré.
2. Remplacer progressivement l'import statique par un chargement différé depuis ce JSON.
3. Ajouter un petit index par département si le fichier global devient trop gros.
4. Garder le fallback \`dep.anecdote\` pendant le chargement ou en cas d'erreur réseau.
5. À terme, générer soit un JSON global validé, soit un fichier par département selon la taille atteinte.

Pour le MVP, aucune bascule n'est effectuée : ce dataset prépare l'optimisation sans modifier le gameplay.
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
  const distJsStats = getDistJsStats();
  const batchStats = getBatchStats();

  fs.writeFileSync(reportPath, buildReport({
    dataset,
    validated,
    outputSize,
    outputGzipSize,
    distJsStats,
    batchStats,
  }), "utf8");

  console.log(JSON.stringify({
    output: path.relative(rootDir, outputPath).replace(/\\/g, "/"),
    report: path.relative(rootDir, reportPath).replace(/\\/g, "/"),
    exported: validated.length,
    departments: Object.keys(dataset).length,
    bytes: outputSize,
    gzipBytes: outputGzipSize,
  }, null, 2));
}

main();
