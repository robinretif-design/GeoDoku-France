
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Archive, BarChart3, HelpCircle, Home, Info, Map, RotateCcw, Share2, X } from "lucide-react";
import { getAnalyticsDebugState, initAnalytics, trackGeoDokuEvent } from "./analytics.js";
import { departments, getTodayGrid, grids } from "./gameData";
import { cellKey, findMasterMove, rank, scoreCell, scoreGrid } from "./scoring";
import "./styles.css";

const STATS_STORAGE_KEY = "geodoku-france-player-stats";
const DAILY_RESULTS_STORAGE_KEY = "geodoku-france-daily-results";

const emptyStats = {
  bestScore: 0,
  gamesPlayed: 0,
  masterMoves: 0,
  totalScore: 0,
  departmentCounts: {},
};

function loadPlayerStats() {
  try {
    const saved = localStorage.getItem(STATS_STORAGE_KEY);
    return saved ? { ...emptyStats, ...JSON.parse(saved) } : emptyStats;
  } catch {
    return emptyStats;
  }
}

function savePlayerStats(stats) {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Les statistiques restent visibles pour la session si le stockage local est indisponible.
  }
}

function loadDailyResults() {
  try {
    const saved = localStorage.getItem(DAILY_RESULTS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveDailyResults(results) {
  try {
    localStorage.setItem(DAILY_RESULTS_STORAGE_KEY, JSON.stringify(results));
  } catch {
    // Le verrou reste actif pour la session si le stockage local est indisponible.
  }
}

function getAverageScore(stats) {
  return stats.gamesPlayed > 0 ? Math.round(stats.totalScore / stats.gamesPlayed) : 0;
}

function getFavoriteDepartment(stats) {
  const entries = Object.entries(stats.departmentCounts);
  if (entries.length === 0) return "Aucun";
  return entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0];
}

function recordGameStats(stats, score, bestMove, usedDepartments) {
  const departmentCounts = { ...stats.departmentCounts };
  usedDepartments.forEach((name) => {
    departmentCounts[name] = (departmentCounts[name] ?? 0) + 1;
  });

  return {
    ...stats,
    bestScore: Math.max(stats.bestScore, score),
    gamesPlayed: stats.gamesPlayed + 1,
    masterMoves: stats.masterMoves + (bestMove ? 1 : 0),
    totalScore: stats.totalScore + score,
    departmentCounts,
  };
}

function getResultComment(score) {
  if (score >= 90) {
    return {
      title: "Une grille maîtrisée de bout en bout.",
      paragraph: "Vos placements combinent précision, audace et rareté. Les départements forts sont utilisés au bon moment, sans perdre la cohérence des croisements.",
    };
  }

  if (score >= 75) {
    return {
      title: "Une très belle lecture du territoire.",
      paragraph: "Votre grille tient bien ensemble et plusieurs choix montrent une vraie stratégie. Pour viser plus haut, il reste surtout à transformer les réponses correctes en placements plus rares.",
    };
  }

  if (score >= 55) {
    return {
      title: "Un score solide, mais encore optimisable.",
      paragraph: "Vos choix montrent une bonne cohérence d’ensemble. Pour grimper plus haut, il faudra surtout chercher des départements moins attendus, sans sacrifier la pertinence des croisements.",
    };
  }

  if (score >= 35) {
    return {
      title: "Une grille lisible, avec quelques paris fragiles.",
      paragraph: "Plusieurs réponses tiennent la route, mais certaines cases manquent encore de précision. Les meilleurs gains viendront de croisements mieux ciblés et de départements moins évidents.",
    };
  }

  return {
    title: "Une exploration encore prudente.",
    paragraph: "La grille pose déjà quelques repères, mais beaucoup de points restent à aller chercher. Repartir des tags les plus évidents peut aider à sécuriser les cases avant de tenter des choix plus rares.",
  };
}

const difficultyLabels = {
  easy: "Facile",
  normal: "Normal",
  expert: "Expert",
};

function getEditionEventData(grid, todayGrid) {
  return {
    editionId: grid.id,
    difficulty: grid.difficulty ?? "normal",
    source: grid.id === todayGrid.id ? "today" : "archive",
  };
}

function DifficultyBadge({ difficulty = "normal" }) {
  const key = difficultyLabels[difficulty] ? difficulty : "normal";
  return (
    <span className={`difficulty-badge difficulty-${key}`}>
      {difficultyLabels[key]}
    </span>
  );
}

function formatTag(tag) {
  return tag.replace(/_/g, " ");
}

function getMatchingTags(dep, criterion) {
  return criterion.tags.filter((tag) => dep.tags.includes(tag));
}

function getFeaturedPlace(dep, seed = "") {
  if (!dep.places?.length) return null;
  const value = `${dep.code}-${seed}`.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return dep.places[value % dep.places.length];
}

function PlaceSpotlight({ place, code, compact = false }) {
  if (!place) return null;

  return (
    <section className={`place-spotlight ${compact ? "compact" : ""}`}>
      <div className="place-visual">
        {place.image ? (
          <img src={place.image} alt="" />
        ) : (
          <span>{code}</span>
        )}
      </div>
      <div>
        <p className="place-type">{place.type}</p>
        <h3>{place.name}</h3>
        <p>{place.fact}</p>
      </div>
    </section>
  );
}

function DepartmentAbout({ placement, onClose }) {
  if (!placement) return null;

  const { dep, row, col, cell } = placement;
  const featuredPlace = getFeaturedPlace(dep, `${row.id}-${col.id}`);
  const rowTags = getMatchingTags(dep, row);
  const colTags = getMatchingTags(dep, col);
  const baseScore = Math.min(4, cell.rowMatches * 2)
    + Math.min(4, cell.colMatches * 2)
    + (cell.rowMatches > 0 && cell.colMatches > 0 ? 1 : 0);
  const rareBoost = dep.prestige >= 8 ? Math.min(9, baseScore + 1) - baseScore : 0;
  const rareSentence = rareBoost
    ? ", avec +1 de rareté lié à son prestige."
    : dep.prestige >= 8
      ? ", son prestige rare est reconnu mais le score reste plafonné à 9."
      : ".";
  const activatedTags = [...new Set([...rowTags, ...colTags])];
  const scoreBonusLabel = rareBoost
    ? `Bonus rareté +${rareBoost}`
    : dep.prestige >= 8
      ? "Bonus rareté plafonné"
      : null;

  return (
    <div className="overlay" onClick={onClose}>
      <section className="modal department-about" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}><X size={22} /></button>

        {featuredPlace && (
          <section className="place-hero">
            <div className="place-hero-visual">
              {featuredPlace.image ? (
                <img src={featuredPlace.image} alt="" />
              ) : (
                <span>{dep.code}</span>
              )}
            </div>
            <div className="place-hero-copy">
              <p className="place-type">{featuredPlace.type}</p>
              <h2>{featuredPlace.name}</h2>
              <p>{featuredPlace.fact}</p>
            </div>
          </section>
        )}

        <section className="department-anchor">
          <div>
            <span>Département</span>
            <strong>{dep.name}</strong>
          </div>
          <div>
            <span>Code</span>
            <strong>{dep.code}</strong>
          </div>
          <div>
            <span>Région</span>
            <strong>{dep.region}</strong>
          </div>
        </section>

        <section className="score-block">
          <div className="score-main">
            <strong>{cell.score}/9</strong>
            <span>{cell.status}</span>
          </div>
          {scoreBonusLabel && <p>{scoreBonusLabel}</p>}
        </section>

        <section className="about-section">
          <p className="result-kicker">Pourquoi il marque</p>
          <p className="crossing-line">{row.label} × {col.label}</p>
          <div className="score-reasons">
            <div>
              <span>Tags ligne activés</span>
              <strong>{rowTags.length ? rowTags.map(formatTag).join(", ") : "aucun tag direct"}</strong>
            </div>
            <div>
              <span>Tags colonne activés</span>
              <strong>{colTags.length ? colTags.map(formatTag).join(", ") : "aucun tag direct"}</strong>
            </div>
            <div>
              <span>Tags activés</span>
              <strong>{activatedTags.length ? activatedTags.map(formatTag).join(", ") : "aucun tag direct"}</strong>
            </div>
            {dep.prestige >= 8 && (
              <div>
                <span>Rareté</span>
                <strong>{rareSentence.replace(/^, /, "").replace(/\.$/, "")}</strong>
              </div>
            )}
          </div>
        </section>

        <section className="about-section">
          <p className="result-kicker">Anecdote départementale</p>
          <p>{dep.anecdote}</p>
        </section>

        <section className="about-section muted-section">
          <p className="result-kicker">Tags du département</p>
          <div className="tag-list subtle">
            {dep.tags.map((tag) => (
              <span className="tag-pill" key={tag}>{formatTag(tag)}</span>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

function App() {
  const todayGrid = useMemo(() => getTodayGrid(), []);
  const [grid, setGrid] = useState(todayGrid);
  const [screen, setScreen] = useState("home");
  const [selectedCell, setSelectedCell] = useState(null);
  const [answers, setAnswers] = useState({});
  const [playerStats, setPlayerStats] = useState(loadPlayerStats);
  const [dailyResults, setDailyResults] = useState(loadDailyResults);
  const [showRules, setShowRules] = useState(false);
  const [aboutPlacement, setAboutPlacement] = useState(null);

  const editionLabel = `GeoDoku France #${grid.id}`;
  const todayResult = dailyResults[todayGrid.id];
  const isCurrentDailyEdition = grid.id === todayGrid.id;
  const currentDailyResult = isCurrentDailyEdition ? dailyResults[grid.id] : null;
  const hasPlayedCurrentDailyEdition = Boolean(currentDailyResult);
  const placedDepartments = useMemo(() => (
    Object.entries(answers).map(([key, depName]) => {
      const [rowId, colId] = key.split("__");
      const dep = departments.find((d) => d.name === depName);
      const row = grid.rows.find((item) => item.id === rowId);
      const col = grid.columns.find((item) => item.id === colId);
      if (!dep || !row || !col) return null;

      return {
        key,
        dep,
        row,
        col,
        cell: scoreCell(dep, row, col),
      };
    }).filter(Boolean)
  ), [answers, grid]);
  const usedDepartments = placedDepartments.map((placement) => placement.dep.name);
  const computed = useMemo(() => scoreGrid(answers, departments, grid.rows, grid.columns), [answers, grid]);
  const bestMove = useMemo(() => findMasterMove(answers, departments, grid.rows, grid.columns), [answers, grid]);
  const rankLabel = rank(computed.total);
  const resultComment = getResultComment(computed.total);
  const isDebugPage = window.location.pathname === "/debug" || new URLSearchParams(window.location.search).get("debug") === "true";
  const [analyticsDebugState, setAnalyticsDebugState] = useState(() => getAnalyticsDebugState());

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (!isDebugPage) return undefined;

    const updateDebugState = () => setAnalyticsDebugState(getAnalyticsDebugState());
    updateDebugState();

    const intervalId = window.setInterval(updateDebugState, 500);
    return () => window.clearInterval(intervalId);
  }, [isDebugPage]);

  function openRules() {
    setShowRules(true);
    trackGeoDokuEvent("rules_opened", { screen });
  }

  function openDepartmentAbout(placement, context = "unknown") {
    if (!placement?.dep) return;

    setAboutPlacement(placement);
    trackGeoDokuEvent("department_opened", {
      departmentCode: placement.dep.code,
      departmentName: placement.dep.name,
      editionId: grid?.id,
      context,
    });
  }

  function goHome() {
    setGrid(todayGrid);
    setScreen("home");
    setSelectedCell(null);
    setAboutPlacement(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showArchives() {
    setScreen("archives");
    setSelectedCell(null);
    setAboutPlacement(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showStats() {
    setScreen("stats");
    setSelectedCell(null);
    setAboutPlacement(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showCompletedDailyResult(nextGrid = todayGrid) {
    const completed = dailyResults[nextGrid.id];
    if (!completed) return;

    setGrid(nextGrid);
    setAnswers(completed.answers ?? {});
    setSelectedCell(null);
    setAboutPlacement(null);
    setScreen("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startGrid(nextGrid) {
    const completed = nextGrid.id === todayGrid.id ? dailyResults[nextGrid.id] : null;
    if (completed) {
      showCompletedDailyResult(nextGrid);
      return;
    }

    setGrid(nextGrid);
    setAnswers({});
    setSelectedCell(null);
    setAboutPlacement(null);
    trackGeoDokuEvent("game_started", getEditionEventData(nextGrid, todayGrid));
    setScreen("game");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseDepartment(name) {
    if (!selectedCell) return;
    setAnswers((prev) => ({ ...prev, [selectedCell]: name }));
    setSelectedCell(null);
    setAboutPlacement(null);
  }

  function reset() {
    setAnswers({});
    setSelectedCell(null);
    setAboutPlacement(null);
    setScreen("game");
  }

  function replayCurrentGrid() {
    setAnswers({});
    setSelectedCell(null);
    setAboutPlacement(null);
    setScreen("game");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validateGrid() {
    if (hasPlayedCurrentDailyEdition) {
      showCompletedDailyResult(grid);
      return;
    }

    trackGeoDokuEvent("game_completed", {
      editionId: grid.id,
      difficulty: grid.difficulty ?? "normal",
      scoreTotal: computed.total,
      scoreCells: computed.cells,
      underdogBonus: computed.underdogBonus,
      diversityBonus: computed.diversityBonus,
      completionBonus: computed.completionBonus,
    });

    const nextStats = recordGameStats(playerStats, computed.total, bestMove, usedDepartments);
    setPlayerStats(nextStats);
    savePlayerStats(nextStats);

    if (isCurrentDailyEdition) {
      const nextDailyResults = {
        ...dailyResults,
        [grid.id]: {
          id: grid.id,
          completedAt: new Date().toISOString(),
          answers,
        },
      };
      setDailyResults(nextDailyResults);
      saveDailyResults(nextDailyResults);
    }

    setAboutPlacement(null);
    setScreen("result");
  }

  async function share() {
    trackGeoDokuEvent("game_shared", {
      editionId: grid.id,
      scoreTotal: computed.total,
    });

    const shareGrid = grid.rows.map((row) => (
      grid.columns.map((col) => {
        const depName = answers[cellKey(row.id, col.id)];
        const dep = departments.find((d) => d.name === depName);
        if (!dep) return "🟦";

        const cell = scoreCell(dep, row, col);
        if (cell.score >= 7) return "🟩";
        if (cell.score >= 5) return "🟨";
        return "🟦";
      }).join("")
    )).join("\n");

    const text = [
      editionLabel,
      `${computed.total}/101`,
      "",
      shareGrid,
      "",
      "https://geodoku.fr",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      alert("Score copié !");
    } catch {
      alert(text);
    }
  }

  if (isDebugPage) {
    return (
      <main className="app">
        <section className="debug-page">
          <p className="edition">Debug analytics</p>
          <h1>Configuration analytics</h1>
          <p className="debug-note">
            GeoDoku ne collecte aucune donnée personnelle dans son code. Le trafic global est mesuré uniquement si un fournisseur externe est configuré au build.
          </p>

          <div className="debug-grid">
            <article className="result-card debug-stat">
              <span>Provider détecté</span>
              <strong>{analyticsDebugState.providerDetected}</strong>
              <small>{analyticsDebugState.label}</small>
            </article>
            <article className="result-card debug-stat">
              <span>Website ID Umami</span>
              <strong>{analyticsDebugState.umamiWebsiteIdDetected ? "Détecté" : "Manquant"}</strong>
            </article>
            <article className="result-card debug-stat">
              <span>Script URL Umami</span>
              <strong>{analyticsDebugState.umamiScriptUrlDetected ? "Détectée" : "Manquante"}</strong>
              {analyticsDebugState.umamiScriptUrlDetected && <small>{analyticsDebugState.umamiScriptUrl}</small>}
            </article>
            <article className="result-card debug-stat">
              <span>Script injecté</span>
              <strong>{analyticsDebugState.scriptInjected ? "Oui" : "Non"}</strong>
              <small>{analyticsDebugState.scriptStatus}</small>
            </article>
            <article className="result-card debug-stat">
              <span>Script chargé</span>
              <strong>{analyticsDebugState.scriptLoaded ? "Oui" : "Non"}</strong>
              <small>API Umami : {analyticsDebugState.hasUmamiApi ? "disponible" : "indisponible"}</small>
            </article>
          </div>

          <section className="result-card debug-table-card">
            <p className="result-kicker">Détail</p>
            <p>{analyticsDebugState.detail}</p>
            <p className="debug-note">Logs console actifs uniquement sur cette page debug.</p>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="topbar">
        <button className="brand brand-button" onClick={goHome} title="Retour à l’accueil">
          <div className="logo"><Map size={19} /></div>
          <div>
            <strong>GeoDoku</strong>
            <span>France</span>
          </div>
        </button>
        <div className="topbar-actions">
          <button className="ghost" onClick={showArchives}>
            <Archive size={16} /> Éditions précédentes
          </button>
          <button className="ghost" onClick={showStats}>
            <BarChart3 size={16} /> Statistiques
          </button>
          <button className="ghost" onClick={openRules}>
            <HelpCircle size={16} /> Règles
          </button>
        </div>
      </header>

      {showRules && (
        <div className="overlay" onClick={() => setShowRules(false)}>
          <section className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setShowRules(false)}><X size={22} /></button>
            <h2>Comment jouer</h2>
            <p>Chaque jour, une grille 3×3 croise plusieurs thèmes liés au territoire français.</p>
            <p>Votre objectif n’est pas seulement de trouver une réponse correcte.</p>
            <p>Vous devez placer les départements les plus pertinents, sans jamais utiliser deux fois le même.</p>
            <p>Certaines réponses seront évidentes. D’autres seront plus rares, plus élégantes ou plus inattendues.</p>
            <p>Le score, sur 101, récompense la cohérence, l’originalité, la rareté et votre capacité à optimiser toute la grille.</p>
            <p><strong>Attention :</strong> utiliser trop tôt un département très polyvalent peut vous coûter cher.</p>
          </section>
        </div>
      )}

      <DepartmentAbout placement={aboutPlacement} onClose={() => setAboutPlacement(null)} />

      {screen === "home" && (
        <section className="hero">
          <div className="edition-row">
            <p className="edition">GeoDoku France #{todayGrid.id}</p>
            <DifficultyBadge difficulty={todayGrid.difficulty} />
          </div>
          <h1>La France en puzzle.</h1>
          <p>
            Une grille, neuf cases, et des départements à placer avec justesse.
            Le plus difficile n’est pas toujours de trouver une bonne réponse,
            mais de savoir laquelle mérite vraiment sa place.
          </p>
          {todayResult && <p className="played-notice">Vous avez déjà joué cette édition.</p>}
          <button
            className="primary"
            onClick={() => todayResult ? showCompletedDailyResult(todayGrid) : startGrid(todayGrid)}
          >
            {todayResult ? "Voir mon résultat" : "Jouer la grille du jour"}
          </button>
        </section>
      )}

      {screen === "archives" && (
        <section className="archives">
          <p className="edition">Archives</p>
          <h1>Éditions précédentes</h1>
          <div className="archive-grid">
            {grids.map((archiveGrid) => {
              const isToday = archiveGrid.id === todayGrid.id;
              const isLockedToday = isToday && Boolean(dailyResults[archiveGrid.id]);
              return (
                <article className="result-card archive-card" key={archiveGrid.id}>
                  <div className="archive-heading">
                    <p className="result-kicker">
                      GeoDoku France #{archiveGrid.id}{isToday ? " · aujourd’hui" : ""}
                    </p>
                    <DifficultyBadge difficulty={archiveGrid.difficulty} />
                  </div>
                  <h2>{archiveGrid.title}</h2>
                  <p>{archiveGrid.dateLabel}</p>
                  {isLockedToday && <p className="played-notice compact">Vous avez déjà joué cette édition.</p>}
                  <button className="secondary" onClick={() => startGrid(archiveGrid)}>
                    {isLockedToday ? "Voir le résultat" : "Rejouer"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {screen === "stats" && (
        <section className="stats">
          <p className="edition">Statistiques du joueur</p>
          <h1>Votre progression</h1>
          <div className="stats-grid">
            <div className="result-card stat-card">
              <strong>{playerStats.bestScore}</strong>
              <span>Meilleur score</span>
            </div>
            <div className="result-card stat-card">
              <strong>{playerStats.gamesPlayed}</strong>
              <span>Parties jouées</span>
            </div>
            <div className="result-card stat-card">
              <strong>{getAverageScore(playerStats)}</strong>
              <span>Moyenne</span>
            </div>
            <div className="result-card stat-card">
              <strong>{playerStats.masterMoves}</strong>
              <span>Coups de maître</span>
            </div>
          </div>
          <section className="result-card favorite-card">
            <p className="result-kicker">Département favori</p>
            <h2>{getFavoriteDepartment(playerStats)}</h2>
          </section>
        </section>
      )}

      {screen === "game" && (
        <>
          <section className="intro">
            <p className="edition">{grid.title}</p>
            <h1>À vous de jouer</h1>
            <p>Touchez une case, puis choisissez un département.</p>
          </section>

          <section className="grid-card">
            <div className="puzzle-grid">
              <div className="corner"></div>
              {grid.columns.map((col) => <div className="col-label" key={col.id}>{col.label}</div>)}

              {grid.rows.map((row) => (
                <React.Fragment key={row.id}>
                  <div className="row-label">{row.label}</div>
                  {grid.columns.map((col) => {
                    const key = cellKey(row.id, col.id);
                    const depName = answers[key];
                    const dep = departments.find((d) => d.name === depName);
                    const cell = dep ? scoreCell(dep, row, col) : null;

                    return (
                      <button
                        key={key}
                        className={`cell ${selectedCell === key ? "selected" : ""} ${depName ? "filled" : ""}`}
                        onClick={() => {
                          setSelectedCell(key);
                          if (dep && cell) openDepartmentAbout({ key, dep, row, col, cell }, "grid");
                        }}
                      >
                        {dep ? (
                          <>
                            <strong>{dep.name}</strong>
                            <small>{cell.score}/9 · {cell.status}</small>
                          </>
                        ) : (
                          <span>+</span>
                        )}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </section>

          <section className="actions">
            {hasPlayedCurrentDailyEdition ? (
              <p className="played-notice">Vous avez déjà joué cette édition.</p>
            ) : (
              <>
                <button className="primary" onClick={validateGrid}>Valider ma grille</button>
                <button className="secondary" onClick={reset}><RotateCcw size={16}/> Réinitialiser</button>
              </>
            )}
          </section>

          <section className="departments">
            <h2>Départements disponibles ({usedDepartments.length}/9)</h2>
            <div className="chips">
              {departments.map((dep) => {
                const used = usedDepartments.includes(dep.name);
                return (
                  <button
                    key={dep.name}
                    disabled={used || !selectedCell}
                    className={`chip ${used ? "used" : ""}`}
                    onClick={() => chooseDepartment(dep.name)}
                    title={`${dep.code} · ${dep.region} · prestige ${dep.prestige}/10`}
                  >
                    <span>{dep.name}</span>
                    <small>{dep.code}</small>
                  </button>
                );
              })}
            </div>
            {!selectedCell && <p className="hint">Sélectionnez d’abord une case dans la grille.</p>}
          </section>
        </>
      )}

      {screen === "result" && (
        <section className="results">
          <p className="edition">{editionLabel}</p>
          <h1>{computed.total}/101</h1>
          {bestMove && (
            <section className="master-move">
              <p className="result-kicker">Votre coup de maître</p>
              <div className="master-content">
                <div className="master-code">{bestMove.dep.code}</div>
                <div>
                  <h2>{bestMove.dep.name}</h2>
                  <p className="master-meta">Département n°{bestMove.dep.code}</p>
                  <p className="master-crossing">{bestMove.crossing}</p>
                  <strong>{bestMove.raritySentence}</strong>
                  <button
                    className="text-button"
                    onClick={() => openDepartmentAbout({
                      dep: bestMove.dep,
                      row: bestMove.row,
                      col: bestMove.col,
                      cell: bestMove.cell,
                    }, "master_move")}
                  >
                    <Info size={15} /> À propos du département
                  </button>
                </div>
              </div>
            </section>
          )}
          <p className="rank">{rankLabel}</p>
          <div className="result-grid">
            <div className="result-card"><strong>{computed.cells}</strong><span>Points de cases</span></div>
            <div className="result-card"><strong>+{computed.underdogBonus}</strong><span>Bonus underdog</span></div>
            <div className="result-card"><strong>+{computed.diversityBonus}</strong><span>Diversité</span></div>
            <div className="result-card"><strong>+{computed.completionBonus}</strong><span>Grille complétée</span></div>
          </div>

          <section className="result-card long">
            <p className="result-kicker">Votre lecture de la grille</p>
            <h2>{resultComment.title}</h2>
            <p>{resultComment.paragraph}</p>
          </section>

          <section className="stories">
            {placedDepartments.slice(0, 4).map((placement) => {
              const { dep, row, col, cell, key } = placement;
              const pct = dep.selectionRate ?? Math.max(1, 14 - dep.prestige);
              const featuredPlace = getFeaturedPlace(dep, `${grid.id}-${key}`);
              return (
                <article className="story" key={key}>
                  <div className="story-image">{dep.code}</div>
                  <div>
                    <h3>{dep.name}</h3>
                    <p className="story-crossing">{row.label} × {col.label} · {cell.score}/9</p>
                    <PlaceSpotlight place={featuredPlace} code={dep.code} compact />
                    <p className="stat">{pct}% des joueurs auraient probablement tenté ce département ici.</p>
                    <p>{dep.anecdote}</p>
                    <button className="text-button" onClick={() => openDepartmentAbout(placement, "result")}>
                      <Info size={15} /> À propos du département
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="actions">
            <button className="primary" onClick={share}><Share2 size={16}/> Partager</button>
            {hasPlayedCurrentDailyEdition ? (
              <p className="played-notice">Vous avez déjà joué cette édition.</p>
            ) : (
              <button className="secondary" onClick={replayCurrentGrid}><RotateCcw size={16}/> Rejouer</button>
            )}
            <button className="secondary" onClick={goHome}><Home size={16}/> Accueil</button>
          </section>
        </section>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
