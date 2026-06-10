import {
  ANECDOTE_CATEGORIES,
  ANECDOTE_CONTEXTS,
  ANECDOTE_CSV_HEADER,
  ANECDOTE_DIFFICULTIES,
  ANECDOTE_RARITIES,
  ANECDOTE_TONES,
  ANECDOTE_VALIDATION_STATUSES,
  createAnecdoteId,
  normalizeAnecdoteRecord,
} from "../data/anecdotes.js";
import { normalizeDepartementCode, normalizeText } from "../data/departements.js";

const EXPORT_CSV_HEADERS = ANECDOTE_CSV_HEADER.split(";");
const REQUIRED_CSV_HEADERS = ["categorie", "titre", "contenu", "difficulte", "rarete"];

export function parseAnecdotesCsv(csvText, options = {}) {
  const rows = parseCsvRows(csvText, options.separator ?? ";");
  const [headerRow, ...dataRows] = rows;
  const errors = [];

  if (!headerRow?.length) {
    return { anecdotes: [], errors: ["CSV vide ou en-tête manquant."] };
  }

  const headers = headerRow.map(normalizeCsvHeader);
  const missingHeaders = getMissingRequiredHeaders(headers);
  if (missingHeaders.length > 0) {
    return {
      anecdotes: [],
      errors: [`Colonnes manquantes : ${missingHeaders.join(", ")}.`],
    };
  }

  const importedAnecdotes = dataRows
    .filter((row) => row.some((value) => value.trim()))
    .map((row, rowIndex) => {
      const rowObject = Object.fromEntries(headers.map((header, index) => [header, row[index]?.trim() ?? ""]));
      const result = buildAnecdoteFromCsvRow(rowObject, rowIndex, options);
      if (result.error) errors.push(`Ligne ${rowIndex + 2} : ${result.error}`);
      return result.anecdote;
    })
    .filter(Boolean);

  return { anecdotes: importedAnecdotes, errors };
}

export function anecdotesToCsv(sourceAnecdotes, options = {}) {
  const separator = options.separator ?? ";";
  const header = EXPORT_CSV_HEADERS.join(separator);
  const rows = sourceAnecdotes.map((anecdote) => EXPORT_CSV_HEADERS
    .map((headerName) => escapeCsvCell(anecdote[headerName] ?? "", separator))
    .join(separator));

  return [header, ...rows].join("\n");
}

export function mergeAnecdotes(existingAnecdotes, importedAnecdotes) {
  const byId = new Map(existingAnecdotes.map((anecdote) => [anecdote.id, anecdote]));
  importedAnecdotes.forEach((anecdote) => {
    byId.set(anecdote.id, anecdote);
  });
  return [...byId.values()];
}

export function buildAnecdoteFromCsvRow(row, rowIndex = 0, options = {}) {
  const departmentCode = normalizeDepartementCode(row.code_departement ?? row.departement);
  if (!departmentCode) return { error: `département inconnu "${row.code_departement ?? row.departement}".` };

  const categorie = normalizeAllowedValue(row.categorie, ANECDOTE_CATEGORIES);
  if (!categorie) return { error: `catégorie invalide "${row.categorie}".` };

  const difficulte = Number.parseInt(row.difficulte, 10);
  if (!ANECDOTE_DIFFICULTIES[difficulte]) {
    return { error: `difficulté invalide "${row.difficulte}".` };
  }

  const rarete = normalizeAllowedValue(row.rarete, ANECDOTE_RARITIES);
  if (!rarete) return { error: `rareté invalide "${row.rarete}".` };

  const ton = normalizeAllowedValue(row.ton, ANECDOTE_TONES)
    ?? normalizeAllowedValue(options.defaultTon, ANECDOTE_TONES)
    ?? inferDefaultTone(row);
  if (!ton) return { error: `ton invalide "${row.ton}".` };

  const contexte = normalizeAllowedValue(row.contexte, ANECDOTE_CONTEXTS)
    ?? normalizeAllowedValue(options.defaultContexte, ANECDOTE_CONTEXTS)
    ?? "découverte";
  if (!contexte) return { error: `contexte invalide "${row.contexte}".` };

  const statutValidation = normalizeAllowedValue(row.statut_validation, ANECDOTE_VALIDATION_STATUSES)
    ?? normalizeAllowedValue(options.defaultStatutValidation, ANECDOTE_VALIDATION_STATUSES)
    ?? "à vérifier";
  if (!statutValidation) return { error: `statut de validation invalide "${row.statut_validation}".` };

  if (!row.titre || !row.contenu) {
    return { error: "titre et contenu obligatoires." };
  }

  const date = options.date ?? new Date().toISOString().slice(0, 10);

  return {
    anecdote: normalizeAnecdoteRecord({
      id: options.idFactory?.(row, rowIndex) ?? createAnecdoteId(departmentCode, row.titre, rowIndex + 1),
      code_departement: departmentCode,
      titre: row.titre,
      contenu: row.contenu,
      categorie,
      difficulte,
      rarete,
      ton,
      contexte,
      source: row.source ?? options.defaultSource ?? "",
      statut_validation: statutValidation,
      theme: row.theme ?? "",
      date_ajout: options.dateAjout ?? date,
      date_modification: options.dateModification ?? date,
    }),
  };
}

function getMissingRequiredHeaders(headers) {
  const missingHeaders = [];
  if (!headers.includes("code_departement") && !headers.includes("departement")) {
    missingHeaders.push("code_departement");
  }
  return [
    ...missingHeaders,
    ...REQUIRED_CSV_HEADERS.filter((requiredHeader) => !headers.includes(requiredHeader)),
  ];
}

function normalizeAllowedValue(value, allowedValues) {
  const normalizedValue = normalizeText(value);
  return allowedValues.find((allowedValue) => normalizeText(allowedValue) === normalizedValue) ?? null;
}

function normalizeCsvHeader(value) {
  return normalizeText(value).replace(/\s+/g, "_");
}

function inferDefaultTone(row) {
  const normalizedCategory = normalizeText(row.categorie);
  const normalizedText = normalizeText(`${row.titre ?? ""} ${row.contenu ?? ""}`);

  if (normalizedText.includes("piege") || normalizedText.includes("contrairement") || normalizedText.includes("ne signifie pas")) {
    return "piégeux";
  }
  if (normalizedText.includes("amusant") || normalizedText.includes("drole") || normalizedText.includes("clin d oeil")) {
    return "amusant";
  }
  if (normalizedCategory === "insolite" || normalizedText.includes("surprend") || normalizedText.includes("etonne")) {
    return "surprenant";
  }
  if (normalizedCategory === "geographie") {
    return "pédagogique";
  }

  return "neutre";
}

function escapeCsvCell(value, separator) {
  const cell = String(value ?? "");
  if (!cell.includes(separator) && !cell.includes("\"") && !cell.includes("\n") && !cell.includes("\r")) {
    return cell;
  }
  return `"${cell.replace(/"/g, "\"\"")}"`;
}

function parseCsvRows(csvText, separator = ";") {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === "\"" && inQuotes && nextChar === "\"") {
      cell += "\"";
      index += 1;
    } else if (char === "\"") {
      inQuotes = !inQuotes;
    } else if (char === separator && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}
