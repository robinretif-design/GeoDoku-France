import { anecdotes as defaultAnecdotes, VALIDATED_ANECDOTE_STATUS } from "../data/anecdotes.js";
import { departements as defaultDepartements, normalizeText } from "../data/departements.js";

export function auditAnecdotes(options = {}) {
  const {
    sourceAnecdotes = defaultAnecdotes,
    sourceDepartements = defaultDepartements,
    minimumParDepartement = 30,
  } = options;

  const countsByDepartment = countAnecdotesByDepartment(sourceAnecdotes, sourceDepartements);

  return {
    totalDepartements: sourceDepartements.length,
    totalAnecdotes: sourceAnecdotes.length,
    minimumParDepartement,
    departementsSansAnecdote: sourceDepartements
      .filter((departement) => countsByDepartment[departement.code].total === 0)
      .map((departement) => formatDepartmentIssue(departement, countsByDepartment)),
    departementsAvecMoinsDe30Anecdotes: sourceDepartements
      .filter((departement) => countsByDepartment[departement.code].total < minimumParDepartement)
      .map((departement) => formatDepartmentIssue(departement, countsByDepartment)),
    anecdotesSansSource: sourceAnecdotes.filter((anecdote) => !String(anecdote.source ?? "").trim()),
    anecdotesNonValidees: sourceAnecdotes.filter((anecdote) => anecdote.statut_validation !== VALIDATED_ANECDOTE_STATUS),
    doublonsTitre: findDuplicateGroups(sourceAnecdotes, "titre"),
    doublonsContenu: findDuplicateGroups(sourceAnecdotes, "contenu"),
  };
}

export function formatAnecdoteAuditReport(report) {
  return [
    `Départements audités : ${report.totalDepartements}`,
    `Anecdotes auditées : ${report.totalAnecdotes}`,
    `Départements sans anecdote : ${report.departementsSansAnecdote.length}`,
    `Départements avec moins de ${report.minimumParDepartement} anecdotes : ${report.departementsAvecMoinsDe30Anecdotes.length}`,
    `Anecdotes sans source : ${report.anecdotesSansSource.length}`,
    `Anecdotes non validées : ${report.anecdotesNonValidees.length}`,
    `Doublons de titre : ${report.doublonsTitre.length}`,
    `Doublons de contenu : ${report.doublonsContenu.length}`,
  ].join("\n");
}

function countAnecdotesByDepartment(sourceAnecdotes, sourceDepartements) {
  const counts = Object.fromEntries(sourceDepartements.map((departement) => [
    departement.code,
    { total: 0, validees: 0 },
  ]));

  sourceAnecdotes.forEach((anecdote) => {
    if (!counts[anecdote.code_departement]) {
      counts[anecdote.code_departement] = { total: 0, validees: 0 };
    }
    counts[anecdote.code_departement].total += 1;
    if (anecdote.statut_validation === VALIDATED_ANECDOTE_STATUS) {
      counts[anecdote.code_departement].validees += 1;
    }
  });

  return counts;
}

function formatDepartmentIssue(departement, countsByDepartment) {
  return {
    code: departement.code,
    nom: departement.nom,
    total: countsByDepartment[departement.code].total,
    validees: countsByDepartment[departement.code].validees,
  };
}

function findDuplicateGroups(sourceAnecdotes, fieldName) {
  const byValue = new Map();

  sourceAnecdotes.forEach((anecdote) => {
    const normalizedValue = normalizeText(anecdote[fieldName]);
    if (!normalizedValue) return;

    const existing = byValue.get(normalizedValue) ?? {
      valeur: anecdote[fieldName],
      ids: [],
    };
    existing.ids.push(anecdote.id);
    byValue.set(normalizedValue, existing);
  });

  return [...byValue.values()]
    .filter((group) => group.ids.length > 1)
    .map((group) => ({
      ...group,
      count: group.ids.length,
    }));
}
