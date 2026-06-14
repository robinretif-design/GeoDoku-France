
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Archive, BarChart3, BookOpen, ChevronLeft, HelpCircle, Home, Info, Lock, RotateCcw, Share2, X } from "lucide-react";
import { initAnalytics, trackGevocroiseeEvent } from "./analytics.js";
import {
  initLocalTesterAnalytics,
  recordLocalTesterAction,
  recordLocalTesterGameAbandoned,
  recordLocalTesterGameCompleted,
  recordLocalTesterGameStarted,
  recordLocalTesterRulesOpened,
} from "./services/localTesterAnalyticsClient.js";
import { consumeDailyReset, getDailyResetLimitState } from "./dailyResetLimit.js";
import { departments, getGridCalendarState } from "./gameData";
import { cellKey, findMasterMove, rank, scoreCell, scoreGrid } from "./scoring";
import {
  getCommunityInsightForPlacement,
  loadCommunityStatsStore,
  recordCommunityGame,
} from "./services/communityStatsService.js";
import {
  getDiscoveryStats,
  getRarityMetadata,
  recordDiscovery,
} from "./services/discoveryService.js";
import {
  getAnecdoteMediaDetails,
  getAnecdoteMedia,
  getDepartmentMediaDetails,
  getDepartmentMedia,
  getMediaAlt,
  getPlaceMediaDetails,
  getPlaceMedia,
  MEDIA_FALLBACKS,
} from "./services/mediaService.js";
import "./styles.css";

const DebugPage = React.lazy(() => import("./components/DebugPage.jsx"));

const STATS_STORAGE_KEY = "geodoku-france-player-stats";
const DAILY_RESULTS_STORAGE_KEY = "geodoku-france-daily-results";

const emptyCollectionStats = {
  totalCollectionsDiscovered: 0,
  totalCollectionAnecdotesDiscovered: 0,
  totalAvailableCollections: 0,
  visibleCollections: [],
  byCollection: [],
  topCollections: [],
  lastCollectionDiscovered: null,
  totalThemesDiscovered: 0,
  totalThemedAnecdotesDiscovered: 0,
  totalAvailableThemes: 0,
  byTheme: [],
  topThemes: [],
  lastThemeDiscovered: null,
};

let anecdoteServicesPromise = null;

function loadAnecdoteServices() {
  if (!anecdoteServicesPromise) {
    anecdoteServicesPromise = import("./services/publicAnecdotesService.js");
  }

  return anecdoteServicesPromise;
}

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
    edition: grid.id,
    editionId: grid.id,
    difficulty: grid.difficulty ?? "normal",
    source: grid.id === todayGrid?.id ? "today" : "archive",
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

function AppLoading({ label = "Chargement..." }) {
  return (
    <main className="app">
      <section className="loading-shell" role="status" aria-live="polite">
        <div className="loading-mark" aria-hidden="true">
          <img src="/brand/gevocroisee-mark.svg" alt="" />
        </div>
        <p>{label}</p>
      </section>
    </main>
  );
}

function formatTag(tag) {
  if (tag === "underdog") return "choix rare";
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

function getAnecdoteCacheKey(gridId, placement, context = "result") {
  return `${gridId ?? "grid"}__${placement?.key ?? `${placement?.row?.id}-${placement?.col?.id}-${placement?.dep?.code}`}__${context}`;
}

function getAnecdoteContext(placement, displayContext = "result") {
  if (displayContext === "master_move") return "anecdote_rare";
  if (placement?.cell?.score >= 7) return "bonne_reponse";
  if (placement?.cell?.score <= 4) return "mauvaise_reponse";
  return "découverte";
}

function getFallbackAnecdote(dep) {
  return {
    id: `legacy-${dep.code}`,
    title: "Anecdote départementale",
    content: dep.anecdote,
    category: "legacy",
    rarity: "commune",
    context: "fallback",
    tone: "neutre",
    theme: null,
    collection: null,
    image: null,
    imageAlt: "",
    isFallback: true,
  };
}

function toDisplayAnecdote(anecdote, collection = null) {
  const media = getAnecdoteMediaDetails(anecdote);

  return {
    id: anecdote.id,
    title: anecdote.titre,
    content: anecdote.contenu,
    category: anecdote.categorie,
    rarity: anecdote.rarete,
    context: anecdote.contexte,
    tone: anecdote.ton,
    theme: anecdote.theme ?? null,
    collection,
    image: media?.src ?? getAnecdoteMedia(anecdote),
    imageAlt: media?.alt ?? getMediaAlt(anecdote, anecdote.titre),
    imageCredit: media?.requiresAttribution ? media.credit || media.attribution : "",
    isFallback: false,
  };
}

function getRarityDiscoverySignal(rarity) {
  const metadata = getRarityMetadata(rarity);
  if (!metadata.indicator) return null;

  if (metadata.level >= 4) {
    return {
      variant: "legendary",
      label: "Anecdote légendaire découverte",
      detail: "Exceptionnelle",
    };
  }

  if (metadata.level === 3) {
    return {
      variant: "very-rare",
      label: "Anecdote très rare découverte",
      detail: "Très peu commune",
    };
  }

  return {
    variant: "rare",
    label: "Anecdote rare découverte",
    detail: "Rare",
  };
}

function getCollectionDiscoverySignal(collection) {
  if (!collection?.collection) return null;

  const progressLabel = collection.totalAvailable > 0
    ? `${collection.discoveredCount}/${collection.totalAvailable}`
    : `${collection.discoveredCount}`;
  const label = collection.isNewCollection
    ? "Nouvelle collection découverte"
    : collection.isNewAnecdote && collection.discoveredCount > 1
      ? "Collection enrichie"
      : "Collection";

  return {
    variant: collection.isNewCollection ? "collection-new" : "collection",
    label,
    detail: `${collection.collectionLabel} ${progressLabel}`,
  };
}

function getCommunityDiscoverySignal(communityInsight) {
  if (!communityInsight) return null;

  return {
    variant: "trend",
    label: "Tendance locale",
    detail: communityInsight.replace(/^Tendance locale\s*:\s*/i, ""),
  };
}

function DiscoveryBadge({ signal }) {
  if (!signal) return null;

  return (
    <span className={`discovery-badge discovery-badge-${signal.variant}`}>
      <span className="discovery-badge-label">{signal.label}</span>
      {signal.detail && <span className="discovery-badge-detail">{signal.detail}</span>}
    </span>
  );
}

function DiscoverySignals({ displayAnecdote, communityInsight }) {
  const signals = [];

  if (!displayAnecdote?.isFallback) {
    signals.push(getRarityDiscoverySignal(displayAnecdote.rarity));
    signals.push(getCollectionDiscoverySignal(displayAnecdote.collection));
  }

  signals.push(getCommunityDiscoverySignal(communityInsight));

  const visibleSignals = signals.filter(Boolean);
  if (visibleSignals.length === 0) return null;

  return (
    <div className="discovery-signals" aria-label="Decouvertes">
      {visibleSignals.map((signal) => (
        <DiscoveryBadge
          key={`${signal.variant}-${signal.label}-${signal.detail ?? ""}`}
          signal={signal}
        />
      ))}
    </div>
  );
}

function MediaFrame({ className = "", src, fallbackSrc, code, label, ariaLabel, alt = "", credit = "" }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const primaryFailed = Boolean(src) && failedSrc === src;
  const imageSrc = src && !primaryFailed ? src : fallbackSrc;
  const hasUsableImage = Boolean(imageSrc) && failedSrc !== imageSrc;
  const visibleCredit = imageSrc === src ? credit : "";

  useEffect(() => {
    setFailedSrc(null);
  }, [src, fallbackSrc]);

  return (
    <div className={`media-frame ${className}`} role="img" aria-label={ariaLabel || label || code || "Visuel GévoCroisée"}>
      {hasUsableImage && (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          onError={() => setFailedSrc(imageSrc)}
        />
      )}
      <span className="media-shade" aria-hidden="true" />
      {label && <span className="media-label">{label}</span>}
      {visibleCredit && <span className="media-credit">{visibleCredit}</span>}
      {code && <span className="media-code">{code}</span>}
    </div>
  );
}

function DepartmentThumbnail({ dep, place = null, className = "story-image" }) {
  const media = getDepartmentMediaDetails(dep, place);

  return (
    <MediaFrame
      className={className}
      src={media?.src ?? getDepartmentMedia(dep, place)}
      fallbackSrc={MEDIA_FALLBACKS.department}
      code={dep.code}
      ariaLabel={dep.name}
      alt={media?.alt ?? getMediaAlt(dep, dep.name)}
      credit={media?.requiresAttribution ? media.credit || media.attribution : ""}
    />
  );
}

function AnecdoteMedia({ displayAnecdote, dep }) {
  return (
    <MediaFrame
      className="anecdote-media"
      src={displayAnecdote.image}
      fallbackSrc={MEDIA_FALLBACKS.anecdote}
      code={dep.code}
      label={displayAnecdote.isFallback ? "Anecdote" : displayAnecdote.category}
      alt={displayAnecdote.imageAlt}
      credit={displayAnecdote.imageCredit}
    />
  );
}

function logAnecdoteSelection(dep, selection, reason) {
  if (!import.meta.env.DEV) return;

  console.info("[GévoCroisée anecdotes]", {
    departmentCode: dep.code,
    departmentName: dep.name,
    source: selection.isFallback ? "fallback" : "validated",
    anecdoteId: selection.id,
    reason,
  });
}

async function loadCollectionStats() {
  const { getCollectionsStats } = await loadAnecdoteServices();
  return getCollectionsStats();
}

async function loadCollectionDetails(collectionKey) {
  const { getCollectionDetails } = await loadAnecdoteServices();
  return getCollectionDetails(collectionKey);
}

async function selectDepartmentAnecdote(placement, displayContext = "result") {
  const dep = placement?.dep;
  if (!dep) return null;

  try {
    const {
      isAnecdoteValidated,
      recordAnecdoteDisplay,
      recordCollectionDiscovery,
      selectDepartmentAnecdoteRecord,
    } = await loadAnecdoteServices();
    const editorialContext = getAnecdoteContext(placement, displayContext);
    const selected = await selectDepartmentAnecdoteRecord(dep.code, {
      context: editorialContext,
      displayContext,
    });

    if (selected && isAnecdoteValidated(selected)) {
      recordAnecdoteDisplay(selected.id, selected);
      recordDiscovery(selected, {
        departmentCode: dep.code,
        departmentName: dep.name,
        context: displayContext,
      });
      const collectionResult = await recordCollectionDiscovery(selected, {
        departmentCode: dep.code,
        departmentName: dep.name,
        context: displayContext,
      });
      const display = toDisplayAnecdote(selected, collectionResult.collection);
      logAnecdoteSelection(dep, display, "validated_anecdote_found");
      return display;
    }

    if (selected && !isAnecdoteValidated(selected) && import.meta.env.DEV) {
      console.warn("[GévoCroisée anecdotes] Anecdote non validée rejetée avant affichage", {
        departmentCode: dep.code,
        anecdoteId: selected.id,
        status: selected.statut_validation,
      });
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("[GévoCroisée anecdotes] Chargement différé indisponible", error);
    }
  }

  const fallback = getFallbackAnecdote(dep);
  logAnecdoteSelection(dep, fallback, "fallback_used");
  return fallback;
}

function PlaceSpotlight({ place, code, compact = false }) {
  if (!place) return null;
  const media = getPlaceMediaDetails(place);

  return (
    <section className={`place-spotlight ${compact ? "compact" : ""}`}>
      <MediaFrame
        className="place-visual"
        src={media?.src ?? getPlaceMedia(place)}
        fallbackSrc={MEDIA_FALLBACKS.place}
        code={code}
        ariaLabel={place.name}
        alt={media?.alt ?? getMediaAlt(place, place.name)}
        credit={media?.requiresAttribution ? media.credit || media.attribution : ""}
      />
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
  const displayAnecdote = placement.displayAnecdote ?? getFallbackAnecdote(dep);
  const featuredPlace = getFeaturedPlace(dep, `${row.id}-${col.id}`);
  const rowTags = getMatchingTags(dep, row);
  const colTags = getMatchingTags(dep, col);
  const baseScore = Math.min(4, cell.rowMatches * 2)
    + Math.min(4, cell.colMatches * 2)
    + (cell.rowMatches > 0 && cell.colMatches > 0 ? 1 : 0);
  const rareBoost = dep.prestige >= 8 ? Math.min(9, baseScore + 1) - baseScore : 0;
  const rareSentence = rareBoost
    ? ", avec +1 de choix rare lié à son prestige."
    : dep.prestige >= 8
      ? ", son profil rare est reconnu mais le score reste plafonné à 9."
      : ".";
  const activatedTags = [...new Set([...rowTags, ...colTags])];
  const scoreBonusLabel = rareBoost
    ? `Bonus choix rare +${rareBoost}`
    : dep.prestige >= 8
      ? "Bonus choix rare plafonné"
      : null;
  const featuredPlaceMedia = getPlaceMediaDetails(featuredPlace);
  const departmentMedia = getDepartmentMediaDetails(dep);

  return (
    <div className="overlay" onClick={onClose}>
      <section className="modal department-about" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Fermer la fiche">
          <X size={22} />
        </button>

        {featuredPlace && (
          <section className="place-hero">
            <MediaFrame
              className="place-hero-visual"
              src={featuredPlaceMedia?.src ?? departmentMedia?.src ?? getPlaceMedia(featuredPlace) ?? getDepartmentMedia(dep)}
              fallbackSrc={MEDIA_FALLBACKS.place}
              code={dep.code}
              label={featuredPlace.type}
              ariaLabel={featuredPlace.name}
              alt={featuredPlaceMedia?.alt ?? departmentMedia?.alt ?? getMediaAlt(featuredPlace, featuredPlace.name)}
              credit={featuredPlaceMedia?.requiresAttribution ? featuredPlaceMedia.credit || featuredPlaceMedia.attribution : ""}
            />
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

        <section className="about-section anecdote-highlight">
          <p className="result-kicker">À retenir</p>
          <AnecdoteMedia displayAnecdote={displayAnecdote} dep={dep} />
          <DiscoverySignals displayAnecdote={displayAnecdote} />
          {!displayAnecdote.isFallback && <h3>{displayAnecdote.title}</h3>}
          {placement.anecdoteLoading && <p className="loading-note">Chargement de l'anecdote...</p>}
          <p>{displayAnecdote.content}</p>
        </section>

        <section className="about-section">
          <p className="result-kicker">Pourquoi ça fonctionne</p>
          <p className="crossing-line">{row.label} × {col.label}</p>
          <div className="score-reasons">
            <div>
              <span>Côté ligne</span>
              <strong>{rowTags.length ? rowTags.map(formatTag).join(", ") : "aucun tag direct"}</strong>
            </div>
            <div>
              <span>Côté colonne</span>
              <strong>{colTags.length ? colTags.map(formatTag).join(", ") : "aucun tag direct"}</strong>
            </div>
            <div>
              <span>Ce qui rapproche les deux indices</span>
              <strong>{activatedTags.length ? activatedTags.map(formatTag).join(", ") : "aucun tag direct"}</strong>
            </div>
            {dep.prestige >= 8 && (
              <div>
                <span>Choix rare</span>
                <strong>{rareSentence.replace(/^, /, "").replace(/\.$/, "")}</strong>
              </div>
            )}
          </div>
        </section>

        <section className="about-section muted-section tags-section">
          <p className="result-kicker">Repères du département</p>
          <div className="tag-list subtle">
            {dep.tags.map((tag) => (
              <span className="tag-pill" key={tag}>{formatTag(tag)}</span>
            ))}
          </div>
        </section>
        <footer className="modal-actions">
          <button className="secondary" onClick={onClose}>Fermer</button>
        </footer>
      </section>
    </div>
  );
}

function getDepartmentByCode(code) {
  const normalizedCode = String(code ?? "").trim().toUpperCase();
  return departments.find((department) => department.code === normalizedCode) ?? null;
}

function formatDiscoveryDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getUnlockedAnecdoteTitle(item) {
  return item?.anecdote?.titre ?? item?.themeLabel ?? "Anecdote débloquée";
}

function getUnlockedAnecdoteMeta(item) {
  const department = getDepartmentByCode(item?.codeDepartement);
  const date = formatDiscoveryDate(item?.discoveredAt);

  return [
    department?.name ?? item?.codeDepartement,
    item?.anecdote?.rarete ?? item?.rarete,
    date,
  ].filter(Boolean).join(" · ");
}

function CollectionDetailView({ detail, loading, onBack, onOpenAnecdote }) {
  if (loading && !detail) {
    return (
      <section className="collection-detail-view" aria-live="polite">
        <p className="loading-note">Chargement de la collection...</p>
      </section>
    );
  }

  if (!detail) return null;

  const unlockedAnecdotes = detail.unlockedAnecdotes ?? [];
  const totalAvailable = detail.totalAvailable || detail.discoveredCount;
  const lockedCount = Math.max(0, detail.lockedCount ?? totalAvailable - unlockedAnecdotes.length);

  return (
    <section className="collection-detail-view" aria-live="polite">
      <button className="text-button collection-back-button" onClick={onBack}>
        <ChevronLeft size={16} /> Collections
      </button>
      <div className="collection-detail-heading">
        <div>
          <p className="result-kicker">Collection</p>
          <h2>{detail.collectionLabel}</h2>
          {detail.collectionDescription && <p>{detail.collectionDescription}</p>}
        </div>
        <div className="collection-detail-progress">
          <strong>{detail.discoveredCount}/{totalAvailable}</strong>
          <span>progression</span>
        </div>
      </div>

      {unlockedAnecdotes.length > 0 ? (
        <div className="collection-anecdote-list">
          {unlockedAnecdotes.map((item) => {
            const isReadable = Boolean(item.anecdote);
            return (
              <button
                className="collection-anecdote-item"
                key={item.anecdoteId}
                onClick={() => isReadable && onOpenAnecdote(item)}
                disabled={!isReadable}
              >
                <BookOpen size={17} />
                <span>
                  <strong>{getUnlockedAnecdoteTitle(item)}</strong>
                  <small>{getUnlockedAnecdoteMeta(item)}</small>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="collection-empty-state">
          <Lock size={20} />
          <strong>Aucune anecdote débloquée</strong>
          <p>Cette collection est prête, mais aucune anecdote n'a encore été révélée.</p>
        </div>
      )}

      {lockedCount > 0 && (
        <div className="collection-locked-summary">
          <Lock size={16} />
          <span>{lockedCount} anecdotes encore verrouillées</span>
        </div>
      )}
    </section>
  );
}

function ReadableAnecdoteModal({ anecdote, onClose }) {
  if (!anecdote) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <section
        className="modal readable-anecdote-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="readable-anecdote-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close" onClick={onClose} aria-label="Fermer l'anecdote">
          <X size={22} />
        </button>
        <p className="result-kicker">Anecdote débloquée</p>
        <h2 id="readable-anecdote-title">{anecdote.title}</h2>
        <MediaFrame
          className="readable-anecdote-media"
          src={anecdote.image}
          fallbackSrc={MEDIA_FALLBACKS.anecdote}
          code={anecdote.departmentCode}
          label={anecdote.category}
          ariaLabel={anecdote.title}
          alt={anecdote.imageAlt}
          credit={anecdote.imageCredit}
        />
        <div className="readable-anecdote-meta">
          {anecdote.departmentName && <span>{anecdote.departmentName}</span>}
          {anecdote.collectionLabel && <span>{anecdote.collectionLabel}</span>}
          {anecdote.rarity && <span>{anecdote.rarity}</span>}
        </div>
        <DiscoverySignals displayAnecdote={anecdote} />
        <p className="readable-anecdote-content">{anecdote.content}</p>
        <footer className="modal-actions">
          <button className="secondary" onClick={onClose}>Fermer</button>
        </footer>
      </section>
    </div>
  );
}

function App() {
  const calendarState = useMemo(() => getGridCalendarState(), []);
  const { todayGrid, pastGrids, unlockedGrids, isExhausted, startDate } = calendarState;
  const [grid, setGrid] = useState(todayGrid);
  const [screen, setScreen] = useState("home");
  const [selectedCell, setSelectedCell] = useState(null);
  const [answers, setAnswers] = useState({});
  const [playerStats, setPlayerStats] = useState(loadPlayerStats);
  const [dailyResults, setDailyResults] = useState(loadDailyResults);
  const [showRules, setShowRules] = useState(false);
  const [aboutPlacement, setAboutPlacement] = useState(null);
  const [resultAnecdotes, setResultAnecdotes] = useState({});
  const [resultAnecdotesLoading, setResultAnecdotesLoading] = useState(false);
  const [cellAttemptCounts, setCellAttemptCounts] = useState({});
  const [communityStatsStore, setCommunityStatsStore] = useState(loadCommunityStatsStore);
  const [discoveryStats, setDiscoveryStats] = useState(getDiscoveryStats);
  const [collectionStats, setCollectionStats] = useState(emptyCollectionStats);
  const [collectionStatsLoading, setCollectionStatsLoading] = useState(false);
  const [selectedCollectionKey, setSelectedCollectionKey] = useState(null);
  const [collectionDetail, setCollectionDetail] = useState(null);
  const [collectionDetailLoading, setCollectionDetailLoading] = useState(false);
  const [collectionAnecdote, setCollectionAnecdote] = useState(null);
  const modalHistoryActiveRef = useRef(false);
  const ignoreNextPopstateRef = useRef(false);

  const editionLabel = grid ? `GévoCroisée #${grid.id}` : "GévoCroisée";
  const todayResult = todayGrid ? dailyResults[todayGrid.id] : null;
  const isCurrentDailyEdition = Boolean(todayGrid && grid?.id === todayGrid.id);
  const currentDailyResult = isCurrentDailyEdition ? dailyResults[grid.id] : null;
  const hasPlayedCurrentDailyEdition = Boolean(currentDailyResult);
  const isDailyResetLimited = Boolean(isCurrentDailyEdition && !hasPlayedCurrentDailyEdition);
  const placedDepartments = useMemo(() => (
    Object.entries(answers).map(([key, depName]) => {
      const [rowId, colId] = key.split("__");
      const dep = departments.find((d) => d.name === depName);
      const row = grid?.rows.find((item) => item.id === rowId);
      const col = grid?.columns.find((item) => item.id === colId);
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
  const computed = useMemo(() => (
    grid ? scoreGrid(answers, departments, grid.rows, grid.columns) : { total: 0, cells: 0, underdogBonus: 0, diversityBonus: 0, completionBonus: 0 }
  ), [answers, grid]);
  const bestMove = useMemo(() => (
    grid ? findMasterMove(answers, departments, grid.rows, grid.columns) : null
  ), [answers, grid]);
  const rankLabel = rank(computed.total);
  const resultComment = getResultComment(computed.total);
  const isDebugPage = window.location.pathname === "/debug" || new URLSearchParams(window.location.search).get("debug") === "true";
  const [dailyResetLimitState, setDailyResetLimitState] = useState(() => getDailyResetLimitState(todayGrid?.id));
  const dailyResetDisabled = Boolean(isDailyResetLimited && !dailyResetLimitState.canReset);
  const dailyResetCopy = isDailyResetLimited
    ? dailyResetLimitState.canReset
      ? "1 réinitialisation disponible pour protéger le défi quotidien."
      : "Dernière chance : la grille du jour ne peut être réinitialisée qu’une fois."
    : null;
  const isModalOpen = Boolean(showRules || aboutPlacement || collectionAnecdote);

  const closeModalHistory = useCallback(() => {
    if (!modalHistoryActiveRef.current) return;

    modalHistoryActiveRef.current = false;
    ignoreNextPopstateRef.current = true;
    window.history.back();
  }, []);

  const closeRules = useCallback(() => {
    setShowRules(false);
    closeModalHistory();
  }, [closeModalHistory]);

  const closeDepartmentAbout = useCallback(() => {
    setAboutPlacement(null);
    closeModalHistory();
  }, [closeModalHistory]);

  const closeCollectionAnecdote = useCallback(() => {
    setCollectionAnecdote(null);
    closeModalHistory();
  }, [closeModalHistory]);

  const closeTopModal = useCallback((fromHistory = false) => {
    if (collectionAnecdote) {
      setCollectionAnecdote(null);
    } else if (aboutPlacement) {
      setAboutPlacement(null);
    } else if (showRules) {
      setShowRules(false);
    } else {
      return;
    }

    if (fromHistory) {
      modalHistoryActiveRef.current = false;
    } else {
      closeModalHistory();
    }
  }, [aboutPlacement, closeModalHistory, collectionAnecdote, showRules]);

  useEffect(() => {
    initAnalytics();
    initLocalTesterAnalytics({
      screen: "home",
      todayGridId: todayGrid?.id ?? null,
    });
  }, [todayGrid?.id]);

  useEffect(() => {
    setDailyResetLimitState(getDailyResetLimitState(todayGrid?.id));
  }, [todayGrid?.id]);

  useEffect(() => {
    if (!isModalOpen || modalHistoryActiveRef.current) return;

    window.history.pushState({
      ...(window.history.state ?? {}),
      geodokuModal: true,
    }, "", window.location.href);
    modalHistoryActiveRef.current = true;
  }, [isModalOpen]);

  useEffect(() => {
    const handlePopState = () => {
      if (ignoreNextPopstateRef.current) {
        ignoreNextPopstateRef.current = false;
        return;
      }

      if (!modalHistoryActiveRef.current) return;
      closeTopModal(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeTopModal]);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeTopModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeTopModal, isModalOpen]);

  useEffect(() => {
    if (screen !== "stats" || !selectedCollectionKey) {
      setCollectionDetail(null);
      setCollectionDetailLoading(false);
      return undefined;
    }

    let cancelled = false;
    setCollectionDetailLoading(true);

    loadCollectionDetails(selectedCollectionKey)
      .then((detail) => {
        if (!cancelled) setCollectionDetail(detail);
      })
      .catch(() => {
        if (!cancelled) setCollectionDetail(null);
      })
      .finally(() => {
        if (!cancelled) setCollectionDetailLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [collectionStats.totalCollectionAnecdotesDiscovered, screen, selectedCollectionKey]);

  useEffect(() => {
    const recordExitDuringGame = () => {
      if (screen !== "game" || !grid) return;
      recordLocalTesterGameAbandoned({
        gridId: grid.id,
        filledCells: Object.keys(answers).length,
        reason: "page_exit",
        screen,
      });
    };

    window.addEventListener("pagehide", recordExitDuringGame);
    window.addEventListener("beforeunload", recordExitDuringGame);

    return () => {
      window.removeEventListener("pagehide", recordExitDuringGame);
      window.removeEventListener("beforeunload", recordExitDuringGame);
    };
  }, [answers, grid, screen]);

  useEffect(() => {
    if (screen !== "result" || !grid) return;

    const visiblePlacements = placedDepartments.slice(0, 4);
    const missingPlacements = visiblePlacements
      .map((placement) => ({
        placement,
        key: getAnecdoteCacheKey(grid.id, placement, "result"),
      }))
      .filter(({ key }) => !resultAnecdotes[key]);

    if (missingPlacements.length === 0) return undefined;

    let cancelled = false;
    setResultAnecdotesLoading(true);

    Promise.all(missingPlacements.map(async ({ placement, key }) => [
      key,
      await selectDepartmentAnecdote(placement, "result"),
    ]))
      .then((entries) => {
        if (cancelled) return;
        const additions = Object.fromEntries(entries.filter(([, anecdote]) => anecdote));
        if (Object.keys(additions).length > 0) {
          setResultAnecdotes((prev) => ({ ...prev, ...additions }));
        }
      })
      .finally(() => {
        if (!cancelled) setResultAnecdotesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [screen, grid?.id, placedDepartments, resultAnecdotes]);

  function openRules() {
    setShowRules(true);
    recordLocalTesterRulesOpened({ screen });
    trackGevocroiseeEvent("rules_opened", { screen });
  }

  function openDepartmentAbout(placement, context = "unknown") {
    if (!placement?.dep) return;

    const cacheKey = getAnecdoteCacheKey(grid?.id, placement, context === "result" ? "result" : context);
    const resultCacheKey = getAnecdoteCacheKey(grid?.id, placement, "result");
    const cachedAnecdote = context === "result"
      ? resultAnecdotes[resultCacheKey]
      : null;
    const fallbackAnecdote = getFallbackAnecdote(placement.dep);

    setAboutPlacement({
      ...placement,
      anecdoteCacheKey: cacheKey,
      displayAnecdote: cachedAnecdote ?? fallbackAnecdote,
      anecdoteLoading: !cachedAnecdote,
    });

    if (!cachedAnecdote) {
      selectDepartmentAnecdote(placement, context)
        .then((displayAnecdote) => {
          const nextDisplayAnecdote = displayAnecdote ?? fallbackAnecdote;
          setAboutPlacement((current) => {
            if (!current || current.anecdoteCacheKey !== cacheKey) return current;
            return {
              ...current,
              displayAnecdote: nextDisplayAnecdote,
              anecdoteLoading: false,
            };
          });

          if (context === "result") {
            setResultAnecdotes((prev) => ({ ...prev, [resultCacheKey]: nextDisplayAnecdote }));
          }
        })
        .catch(() => {
          setAboutPlacement((current) => {
            if (!current || current.anecdoteCacheKey !== cacheKey) return current;
            return { ...current, anecdoteLoading: false };
          });
        });
    }

    trackGevocroiseeEvent("department_opened", {
      department: placement.dep.name,
      departmentCode: placement.dep.code,
      departmentName: placement.dep.name,
      editionId: grid?.id,
      context,
    });
  }

  function openCollectionDetail(collectionKey) {
    setSelectedCollectionKey(collectionKey);
    setCollectionDetail(null);
    setCollectionAnecdote(null);
  }

  function closeCollectionDetail() {
    setSelectedCollectionKey(null);
    setCollectionDetail(null);
    setCollectionAnecdote(null);
  }

  function openCollectionAnecdote(item) {
    if (!item?.anecdote || !collectionDetail) return;

    const department = getDepartmentByCode(item.codeDepartement ?? item.anecdote.code_departement);
    const displayAnecdote = toDisplayAnecdote(item.anecdote, collectionDetail);
    setCollectionAnecdote({
      ...displayAnecdote,
      departmentCode: item.codeDepartement ?? item.anecdote.code_departement,
      departmentName: department?.name ?? "",
      collectionLabel: collectionDetail.collectionLabel,
      discoveredAt: item.discoveredAt,
      themeLabel: item.themeLabel,
    });
  }

  function goHome() {
    if (screen === "game" && grid) {
      recordLocalTesterGameAbandoned({
        gridId: grid.id,
        filledCells: Object.keys(answers).length,
        reason: "left_game_home",
        screen,
      });
    } else {
      recordLocalTesterAction("home_opened", { screen });
    }

    setGrid(todayGrid);
    setScreen("home");
    setSelectedCell(null);
    setAboutPlacement(null);
    setResultAnecdotes({});
    setCellAttemptCounts({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showArchives() {
    if (screen === "game" && grid) {
      recordLocalTesterGameAbandoned({
        gridId: grid.id,
        filledCells: Object.keys(answers).length,
        reason: "left_game_archives",
        screen,
      });
    }
    recordLocalTesterAction("archives_opened", { screen });

    setScreen("archives");
    setSelectedCell(null);
    setAboutPlacement(null);
    setResultAnecdotes({});
    setCellAttemptCounts({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showStats() {
    if (screen === "game" && grid) {
      recordLocalTesterGameAbandoned({
        gridId: grid.id,
        filledCells: Object.keys(answers).length,
        reason: "left_game_stats",
        screen,
      });
    }
    recordLocalTesterAction("stats_opened", { screen });

    setScreen("stats");
    setSelectedCell(null);
    setAboutPlacement(null);
    setResultAnecdotes({});
    setCellAttemptCounts({});
    setDiscoveryStats(getDiscoveryStats());
    setSelectedCollectionKey(null);
    setCollectionDetail(null);
    setCollectionAnecdote(null);
    setCollectionStatsLoading(true);
    loadCollectionStats()
      .then(setCollectionStats)
      .catch(() => setCollectionStats(emptyCollectionStats))
      .finally(() => setCollectionStatsLoading(false));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showCompletedDailyResult(nextGrid = todayGrid) {
    if (!nextGrid) return;

    const completed = dailyResults[nextGrid.id];
    if (!completed) return;

    setGrid(nextGrid);
    setAnswers(completed.answers ?? {});
    setSelectedCell(null);
    setAboutPlacement(null);
    setResultAnecdotes({});
    setCellAttemptCounts({});
    setScreen("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startGrid(nextGrid) {
    if (!nextGrid || !unlockedGrids.some((item) => item.id === nextGrid.id)) {
      goHome();
      return;
    }

    const completed = nextGrid.id === todayGrid?.id ? dailyResults[nextGrid.id] : null;
    if (completed) {
      showCompletedDailyResult(nextGrid);
      return;
    }

    setGrid(nextGrid);
    setAnswers({});
    setSelectedCell(null);
    setAboutPlacement(null);
    setResultAnecdotes({});
    setCellAttemptCounts({});
    trackGevocroiseeEvent("game_started", getEditionEventData(nextGrid, todayGrid));
    recordLocalTesterGameStarted({
      gridId: nextGrid.id,
      editionId: nextGrid.id,
      difficulty: nextGrid.difficulty ?? "normal",
      source: nextGrid.id === todayGrid?.id ? "today" : "archive",
    });
    setScreen("game");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chooseDepartment(name) {
    if (!selectedCell) return;
    const key = selectedCell;
    recordLocalTesterAction("department_selected", {
      gridId: grid?.id ?? null,
      filledCells: Object.keys(answers).length + 1,
    });
    setAnswers((prev) => ({ ...prev, [key]: name }));
    setCellAttemptCounts((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
    setSelectedCell(null);
    setAboutPlacement(null);
    setResultAnecdotes({});
  }

  function reset() {
    if (isCurrentDailyEdition) {
      const nextResetState = consumeDailyReset(grid?.id);
      setDailyResetLimitState(nextResetState);
      if (!nextResetState.consumed) return;
    }

    setAnswers({});
    setSelectedCell(null);
    setAboutPlacement(null);
    setResultAnecdotes({});
    setCellAttemptCounts({});
    setScreen("game");
  }

  function replayCurrentGrid() {
    if (grid) {
      recordLocalTesterGameStarted({
        gridId: grid.id,
        editionId: grid.id,
        difficulty: grid.difficulty ?? "normal",
        source: "replay",
      });
    }

    setAnswers({});
    setSelectedCell(null);
    setAboutPlacement(null);
    setResultAnecdotes({});
    setCellAttemptCounts({});
    setScreen("game");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validateGrid() {
    if (!grid) return;

    if (hasPlayedCurrentDailyEdition) {
      showCompletedDailyResult(grid);
      return;
    }

    const filledCells = Object.keys(answers).length;
    recordLocalTesterGameCompleted({
      gridId: grid.id,
      editionId: grid.id,
      difficulty: grid.difficulty ?? "normal",
      filledCells,
      isFullGrid: filledCells === 9,
      score: computed.total,
      scoreTotal: computed.total,
    });

    trackGevocroiseeEvent("game_completed", {
      edition: grid.id,
      editionId: grid.id,
      difficulty: grid.difficulty ?? "normal",
      score: computed.total,
      scoreTotal: computed.total,
      scoreCells: computed.cells,
      underdogBonus: computed.underdogBonus,
      diversityBonus: computed.diversityBonus,
      completionBonus: computed.completionBonus,
    });

    const nextStats = recordGameStats(playerStats, computed.total, bestMove, usedDepartments);
    setPlayerStats(nextStats);
    savePlayerStats(nextStats);

    const communityResult = recordCommunityGame({
      grid,
      answers,
      departments,
      attemptCounts: cellAttemptCounts,
    });
    setCommunityStatsStore(communityResult.store);

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
    if (!grid) return;

    trackGevocroiseeEvent("game_shared", {
      edition: grid.id,
      editionId: grid.id,
      score: computed.total,
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
      "https://gevocroisee.fr",
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
      <Suspense fallback={<AppLoading label="Chargement du debug..." />}>
        <DebugPage />
      </Suspense>
    );
  }

  return (
    <main className="app">
      <header className="topbar">
        <button className="brand brand-button" onClick={goHome} title="Retour à l’accueil">
          <div className="logo" aria-hidden="true">
            <img src="/brand/gevocroisee-mark.svg" alt="" />
          </div>
          <div>
            <strong>GévoCroisée</strong>
            <span>Chaque jour, une grille autour des départements français.</span>
          </div>
        </button>
        <div className="topbar-actions">
          {pastGrids.length > 0 && (
            <button className="ghost" onClick={showArchives}>
              <Archive size={16} /> Éditions précédentes
            </button>
          )}
          <button className="ghost" onClick={showStats}>
            <BarChart3 size={16} /> Statistiques
          </button>
          <button className="ghost" onClick={openRules}>
            <HelpCircle size={16} /> Règles
          </button>
        </div>
      </header>

      {showRules && (
        <div className="overlay" onClick={closeRules}>
          <section className="modal rules-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={closeRules} aria-label="Fermer les règles"><X size={22} /></button>
            <h2>Comment jouer</h2>
            <p>Chaque jour, une grille 3×3 croise plusieurs thèmes liés aux territoires français.</p>
            <p>Touchez une case, choisissez un département, puis remplissez les 9 cases sans utiliser deux fois le même.</p>
            <p>Plusieurs réponses peuvent fonctionner : cherchez celles qui sont justes, originales ou rares.</p>
            <p>Le score, sur 101, récompense une grille cohérente et des choix bien placés.</p>
            <p><strong>Petit piège :</strong> un département très évident n’est pas toujours le meilleur choix.</p>
            <p className="rules-transition">Le nom du jeu raconte aussi cette manière de jouer.</p>
            <section className="name-explanation" aria-labelledby="name-explanation-title">
              <p className="result-kicker">Nom du jeu</p>
              <h3 id="name-explanation-title">Pourquoi GévoCroisée ?</h3>
              <p>Le nom du jeu réunit trois idées qui en constituent le cœur.</p>
              <p><strong>Gé</strong>, pour la géographie et les territoires français.</p>
              <p>
                <strong>Évo</strong>, pour l’évocation. Car lorsqu’un joueur découvre deux critères,
                il ne cherche pas seulement une réponse exacte. Il mobilise aussi ses souvenirs,
                sa culture générale, ses intuitions et les associations d’idées que ces indices lui inspirent.
              </p>
              <p>
                <strong>Croisée</strong>, enfin, parce que tout le jeu repose sur des croisements.
                Chaque case naît de la rencontre entre deux critères. Chaque réponse se trouve
                à l’intersection de plusieurs connaissances. Et chaque département révèle des liens
                inattendus entre l’histoire, la culture, le patrimoine, les paysages ou les traditions.
              </p>
              <p>
                GévoCroisée est donc un jeu où la géographie rencontre l’évocation,
                à travers une multitude de croisements.
              </p>
              <p className="name-explanation-closing">
                Car la France se découvre rarement par une seule réponse.
                Elle se révèle là où les idées se croisent.
              </p>
            </section>
          </section>
        </div>
      )}

      <DepartmentAbout placement={aboutPlacement} onClose={closeDepartmentAbout} />
      <ReadableAnecdoteModal anecdote={collectionAnecdote} onClose={closeCollectionAnecdote} />

      {screen === "home" && (
        <section className="hero">
          {todayGrid && (
            <div className="edition-row">
              <p className="edition">Grille du jour · GévoCroisée #{todayGrid.id}</p>
              <DifficultyBadge difficulty={todayGrid.difficulty} />
            </div>
          )}
          {!todayGrid && <p className="edition">Calendrier quotidien</p>}
          <h1>La grille du jour.</h1>
          {todayGrid ? (
            <>
              <p className="hero-subtitle">Une nouvelle grille chaque jour, les anciennes à rejouer plus tard.</p>
              <p>
                Croisez les indices, choisissez les départements qui collent le mieux,
                puis essayez de composer la grille la plus juste possible.
              </p>
              {todayResult && <p className="played-notice">Vous avez déjà joué cette édition.</p>}
              <button
                className="primary"
                onClick={() => todayResult ? showCompletedDailyResult(todayGrid) : startGrid(todayGrid)}
              >
                {todayResult ? "Voir mon résultat" : "Jouer la grille du jour"}
              </button>
            </>
          ) : (
            <>
              <p className="hero-subtitle">
                {isExhausted
                  ? "La série préparée est terminée. Les anciennes grilles restent disponibles."
                  : `La première grille sera disponible à partir du ${startDate}.`}
              </p>
              {pastGrids.length > 0 && (
                <button className="primary" onClick={showArchives}>
                  Voir les archives disponibles
                </button>
              )}
            </>
          )}
        </section>
      )}

      {screen === "archives" && (
        <section className="archives">
          <p className="edition">Archives</p>
          <h1>Grilles débloquées</h1>
          <div className="archive-grid">
            {pastGrids.map((archiveGrid) => {
              const isToday = archiveGrid.id === todayGrid?.id;
              const isLockedToday = isToday && Boolean(dailyResults[archiveGrid.id]);
              return (
                <article className="result-card archive-card" key={archiveGrid.id}>
                  <div className="archive-heading">
                    <p className="result-kicker">
                      GévoCroisée #{archiveGrid.id}{isToday ? " · aujourd’hui" : ""}
                    </p>
                    <DifficultyBadge difficulty={archiveGrid.difficulty} />
                  </div>
                  <h2>{archiveGrid.title}</h2>
                  <p>{archiveGrid.dateLabel}</p>
                  {isLockedToday && <p className="played-notice compact">Vous avez déjà joué cette édition.</p>}
                  <button className="secondary" onClick={() => startGrid(archiveGrid)}>
                    {isLockedToday ? "Voir mon résultat" : "Jouer cette grille"}
                  </button>
                </article>
              );
            })}
          </div>
          {pastGrids.length === 0 && (
            <p>Les grilles déjà débloquées apparaîtront ici à partir de demain.</p>
          )}
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
              <strong>{discoveryStats.rareOrBetterDiscoveries}</strong>
              <span>Anecdotes rares</span>
            </div>
            <div className="result-card stat-card">
              <strong>{discoveryStats.legendaryDiscoveries}</strong>
              <span>Légendaires</span>
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
          <section className="result-card collections-card">
            <p className="result-kicker">Collections</p>
            {collectionStatsLoading && <p className="loading-note">Chargement des collections...</p>}
            <div className="collections-summary">
              <div>
                <strong>{collectionStats.totalCollectionsDiscovered}</strong>
                <span>collections découvertes</span>
              </div>
              <div>
                <strong>{collectionStats.totalCollectionAnecdotesDiscovered}</strong>
                <span>anecdotes classées</span>
              </div>
              <div>
                <strong>{collectionStats.lastCollectionDiscovered?.collectionLabel ?? "Aucune"}</strong>
                <span>dernière collection</span>
              </div>
            </div>
            {collectionStats.visibleCollections.length > 0 && (
              <div className="collection-progress-list">
                {collectionStats.visibleCollections.map((collection) => (
                  <button
                    className={`collection-progress-item ${selectedCollectionKey === collection.collection ? "selected" : ""}`}
                    key={collection.collection}
                    onClick={() => openCollectionDetail(collection.collection)}
                  >
                    <span>{collection.collectionLabel}</span>
                    <strong>{collection.discoveredCount}/{collection.totalAvailable || collection.discoveredCount}</strong>
                  </button>
                ))}
              </div>
            )}
            <CollectionDetailView
              detail={collectionDetail}
              loading={collectionDetailLoading}
              onBack={closeCollectionDetail}
              onOpenAnecdote={openCollectionAnecdote}
            />
          </section>
        </section>
      )}

      {screen === "game" && (
        <>
          <section className="intro">
            <p className="edition">{grid.title}</p>
            <h1>À vous de jouer</h1>
            <p>Touchez une case, puis choisissez un département dans la liste.</p>
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
                <button className="primary" onClick={validateGrid}>Voir mon score</button>
                <button className="secondary" onClick={reset} disabled={dailyResetDisabled}>
                  <RotateCcw size={16}/> Réinitialiser
                </button>
                {dailyResetCopy && <p className="reset-limit-note">{dailyResetCopy}</p>}
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
            {!selectedCell && <p className="hint">Touchez une case de la grille pour choisir un département.</p>}
          </section>
        </>
      )}

      {screen === "result" && (
        <section className="results">
          <p className="edition">{editionLabel}</p>
          <h1>{computed.total}/101</h1>
          {bestMove && (
            <section className="master-move">
              <p className="result-kicker">Votre meilleur choix</p>
              <div className="master-content">
                <DepartmentThumbnail dep={bestMove.dep} className="master-code" />
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
                    <Info size={15} /> Voir la fiche
                  </button>
                </div>
              </div>
            </section>
          )}
          <p className="rank">{rankLabel}</p>
          <div className="result-grid">
            <div className="result-card"><strong>{computed.cells}</strong><span>Points de cases</span></div>
            <div className="result-card"><strong>+{computed.underdogBonus}</strong><span>Bonus choix rare</span></div>
            <div className="result-card"><strong>+{computed.diversityBonus}</strong><span>Diversité</span></div>
            <div className="result-card"><strong>+{computed.completionBonus}</strong><span>Grille complétée</span></div>
          </div>

          <section className="result-card long">
            <p className="result-kicker">Bilan de votre grille</p>
            <h2>{resultComment.title}</h2>
            <p>{resultComment.paragraph}</p>
          </section>

          <section className="stories">
            {placedDepartments.slice(0, 4).map((placement) => {
              const { dep, row, col, cell, key } = placement;
              const pct = dep.selectionRate ?? Math.max(1, 14 - dep.prestige);
              const featuredPlace = getFeaturedPlace(dep, `${grid.id}-${key}`);
              const anecdoteCacheKey = getAnecdoteCacheKey(grid.id, placement, "result");
              const displayAnecdote = resultAnecdotes[anecdoteCacheKey]
                ?? getFallbackAnecdote(dep);
              const anecdoteLoading = resultAnecdotesLoading && !resultAnecdotes[anecdoteCacheKey];
              const communityInsight = getCommunityInsightForPlacement(placement, departments, communityStatsStore);
              return (
                <article className="story" key={key}>
                  <DepartmentThumbnail dep={dep} place={featuredPlace} className="story-image" />
                  <div>
                    <h3>{dep.name}</h3>
                    <p className="story-crossing">{row.label} × {col.label} · {cell.score}/9</p>
                    <PlaceSpotlight place={featuredPlace} code={dep.code} compact />
                    <p className="stat">{pct}% des joueurs pourraient tenter ce choix ici.</p>
                    <DiscoverySignals
                      displayAnecdote={displayAnecdote}
                      communityInsight={communityInsight}
                    />
                    {!displayAnecdote.isFallback && <p><strong>{displayAnecdote.title}</strong></p>}
                    {anecdoteLoading && <p className="loading-note">Chargement de l'anecdote...</p>}
                    <p>{displayAnecdote.content}</p>
                    <button className="text-button" onClick={() => openDepartmentAbout(placement, "result")}>
                      <Info size={15} /> Voir la fiche
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
