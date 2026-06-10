import { departments as gameDepartments } from "../gameData.js";

export const departements = gameDepartments.map((department) => ({
  code: department.code,
  nom: department.name,
  region: department.region,
  population: null,
  superficie: null,
}));

export function getDepartementByCode(code) {
  const normalizedCode = String(code ?? "").trim().toUpperCase();
  return departements.find((departement) => departement.code.toUpperCase() === normalizedCode) ?? null;
}

export function normalizeDepartementCode(value) {
  const codePrefix = String(value ?? "").trim().match(/^([0-9]{2,3}|2A|2B)\b/i)?.[1]?.toUpperCase();
  if (codePrefix) {
    const prefixMatch = departements.find((departement) => departement.code.toUpperCase() === codePrefix);
    if (prefixMatch) return prefixMatch.code;
  }

  const normalizedValue = normalizeText(value);
  if (!normalizedValue) return null;

  const directCodeMatch = departements.find((departement) => normalizeText(departement.code) === normalizedValue);
  if (directCodeMatch) return directCodeMatch.code;

  const nameMatch = departements.find((departement) => normalizeText(departement.nom) === normalizedValue);
  return nameMatch?.code ?? null;
}

export function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/\s+/g, " ");
}
