import { departments as gameDepartments } from "../gameData.js";
import { anecdotesBatch001 } from "./anecdotes/batch001.js";
import { anecdotesBatch002 } from "./anecdotes/batch002.js";
import { anecdotesBatch003 } from "./anecdotes/batch003.js";
import { anecdotesBatch004 } from "./anecdotes/batch004.js";
import { anecdotesBatch005 } from "./anecdotes/batch005.js";
import { anecdotesBatch006 } from "./anecdotes/batch006.js";
import { anecdotesBatch007 } from "./anecdotes/batch007.js";
import { anecdotesBatch008 } from "./anecdotes/batch008.js";
import { anecdotesBatch009 } from "./anecdotes/batch009.js";
import { anecdotesBatch010 } from "./anecdotes/batch010.js";
import { anecdotesBatch011 } from "./anecdotes/batch011.js";

export const ANECDOTE_CATEGORIES = [
  "histoire",
  "géographie",
  "gastronomie",
  "culture",
  "patrimoine",
  "nature",
  "cinéma",
  "personnalités",
  "records",
  "insolite",
  "légendes",
  "économie",
  "sport",
  "inventions",
  "expressions_locales",
];

export const ANECDOTE_DIFFICULTIES = {
  1: "très connu",
  2: "connu",
  3: "culture générale",
  4: "difficile",
  5: "expert",
};

export const ANECDOTE_RARITIES = [
  "commune",
  "peu commune",
  "rare",
  "très rare",
  "légendaire",
];

export const ANECDOTE_TONES = [
  "neutre",
  "amusant",
  "surprenant",
  "pédagogique",
  "poétique",
  "piégeux",
];

export const ANECDOTE_CONTEXTS = [
  "bonne_reponse",
  "mauvaise_reponse",
  "découverte",
  "statistique",
  "anecdote_rare",
  "quotidien",
  "défi",
];

export const ANECDOTE_VALIDATION_STATUSES = [
  "brouillon",
  "à vérifier",
  "validée",
  "rejetée",
];

export const VALIDATED_ANECDOTE_STATUS = "validée";

export const ANECDOTE_CSV_HEADER = "code_departement;categorie;titre;contenu;difficulte;rarete;ton;contexte;source;statut_validation;theme";

const DEFAULT_SOURCE = "GeoDoku France V0.3 - données départementales";
const DEFAULT_IMPORT_DATE = "2026-06-04";

const CATEGORY_BY_TAG = [
  ["gastronomie", ["gastronomie", "michelin"]],
  ["cinéma", ["cinema", "culture_pop"]],
  ["patrimoine", ["patrimoine", "architecture", "medieval", "monumental", "religieux", "prehistoire", "brutaliste"]],
  ["nature", ["sauvage", "montagne", "littoral", "maritime", "volcanique", "falaises", "mineral", "forestier"]],
  ["histoire", ["memoire", "guerre", "cathare", "resistance", "frontiere", "royal", "gaulois"]],
  ["économie", ["industriel", "minier", "ouvrier", "portuaire", "naval", "michelin"]],
  ["culture", ["iconique", "culture_celte", "brutaliste", "cinema"]],
  ["géographie", ["rural", "villages", "spectaculaire", "melancolique", "mediterraneen", "fluvial"]],
];

export const legacyAnecdotes = gameDepartments.map((department, index) => normalizeAnecdoteRecord({
  id: createAnecdoteId(department.code, "seed", index + 1),
  code_departement: department.code,
  titre: `Comprendre ${department.name}`,
  contenu: department.anecdote,
  categorie: inferCategory(department),
  difficulte: inferDifficulty(department),
  rarete: inferRarity(department),
  ton: "pédagogique",
  contexte: "découverte",
  source: DEFAULT_SOURCE,
  statut_validation: VALIDATED_ANECDOTE_STATUS,
  date_ajout: DEFAULT_IMPORT_DATE,
  date_modification: DEFAULT_IMPORT_DATE,
}));

export { anecdotesBatch001, anecdotesBatch002, anecdotesBatch003, anecdotesBatch004, anecdotesBatch005, anecdotesBatch006, anecdotesBatch007, anecdotesBatch008, anecdotesBatch009, anecdotesBatch010, anecdotesBatch011 };

export const anecdotes = [
  ...legacyAnecdotes,
  ...anecdotesBatch001,
  ...anecdotesBatch002,
  ...anecdotesBatch003,
  ...anecdotesBatch004,
  ...anecdotesBatch005,
  ...anecdotesBatch006,
  ...anecdotesBatch007,
  ...anecdotesBatch008,
  ...anecdotesBatch009,
  ...anecdotesBatch010,
  ...anecdotesBatch011,
];

export function normalizeAnecdoteRecord(record) {
  const now = new Date().toISOString().slice(0, 10);
  const codeDepartement = String(record.code_departement ?? record.departement ?? "").trim().toUpperCase();
  const titre = String(record.titre ?? "").trim();

  return {
    id: record.id ?? createAnecdoteId(codeDepartement, titre, record.index ?? 1),
    code_departement: codeDepartement,
    titre,
    contenu: String(record.contenu ?? "").trim(),
    categorie: normalizeTaxonomyValue(record.categorie, ANECDOTE_CATEGORIES, "culture"),
    difficulte: normalizeDifficulty(record.difficulte ?? record.niveau_difficulte),
    rarete: normalizeTaxonomyValue(record.rarete, ANECDOTE_RARITIES, "commune"),
    ton: normalizeTaxonomyValue(record.ton, ANECDOTE_TONES, "neutre"),
    contexte: normalizeTaxonomyValue(record.contexte, ANECDOTE_CONTEXTS, "découverte"),
    source: String(record.source ?? "").trim(),
    statut_validation: normalizeTaxonomyValue(
      record.statut_validation ?? (record.validee ? VALIDATED_ANECDOTE_STATUS : null),
      ANECDOTE_VALIDATION_STATUSES,
      "brouillon",
    ),
    theme: normalizeOptionalTheme(record.theme),
    date_ajout: String(record.date_ajout ?? now).trim(),
    date_modification: String(record.date_modification ?? record.date_ajout ?? now).trim(),
  };
}

export function createAnecdoteId(departmentCode, title, index) {
  return `${String(departmentCode).toUpperCase()}-${slugify(title)}-${String(index).padStart(4, "0")}`.toLowerCase();
}

function inferCategory(department) {
  const match = CATEGORY_BY_TAG.find(([, tags]) => tags.some((tag) => department.tags.includes(tag)));
  return match?.[0] ?? "culture";
}

function inferDifficulty(department) {
  if (department.prestige <= 3) return 1;
  if (department.prestige <= 5) return 2;
  if (department.prestige <= 7) return 3;
  if (department.prestige <= 9) return 4;
  return 5;
}

function inferRarity(department) {
  if (department.prestige >= 10) return "légendaire";
  if (department.prestige >= 9) return "très rare";
  if (department.prestige >= 8) return "rare";
  if (department.prestige >= 6) return "peu commune";
  return "commune";
}

function normalizeDifficulty(value) {
  const difficulty = Number.parseInt(value, 10);
  return ANECDOTE_DIFFICULTIES[difficulty] ? difficulty : 3;
}

function normalizeTaxonomyValue(value, allowedValues, fallback) {
  const normalizedValue = normalizeText(value);
  return allowedValues.find((allowedValue) => normalizeText(allowedValue) === normalizedValue) ?? fallback;
}

function slugify(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "anecdote";
}

function normalizeOptionalTheme(value) {
  const theme = String(value ?? "").trim();
  return theme || null;
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
