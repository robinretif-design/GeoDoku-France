import { MEDIA_CATALOG } from "../data/mediaCatalog.js";

const EXTERNAL_MEDIA_PATTERN = /^https?:\/\//i;

export const MEDIA_FALLBACKS = {
  department: "/images/fallbacks/department-fallback.svg",
  anecdote: "/images/fallbacks/anecdote-fallback.svg",
  place: "/images/fallbacks/place-fallback.svg",
};

function cleanLocalMediaSource(source) {
  if (typeof source !== "string") return null;

  const value = source.trim();
  if (!value || EXTERNAL_MEDIA_PATTERN.test(value) || value.startsWith("//")) {
    return null;
  }

  if (value.startsWith("/")) return value;
  return `/${value.replace(/^\.?\//, "")}`;
}

function pickMediaSource(entity) {
  if (!entity) return null;

  return cleanLocalMediaSource(entity.image)
    ?? cleanLocalMediaSource(entity.imageUrl)
    ?? cleanLocalMediaSource(entity.image_url)
    ?? cleanLocalMediaSource(entity.thumbnail)
    ?? cleanLocalMediaSource(entity.thumbnailUrl)
    ?? cleanLocalMediaSource(entity.coverImage)
    ?? cleanLocalMediaSource(entity.media?.image)
    ?? cleanLocalMediaSource(entity.media?.src)
    ?? cleanLocalMediaSource(entity.media?.url);
}

function normalizeMediaRecord(record) {
  if (!record) return null;

  const src = cleanLocalMediaSource(typeof record === "string" ? record : record.src);
  if (!src) return null;

  return {
    src,
    alt: typeof record === "object" ? record.alt ?? "" : "",
    title: typeof record === "object" ? record.title ?? "" : "",
    credit: typeof record === "object" ? record.credit ?? "" : "",
    attribution: typeof record === "object" ? record.attribution ?? "" : "",
    license: typeof record === "object" ? record.license ?? "" : "",
    source: typeof record === "object" ? record.source ?? "" : "",
    sourceType: typeof record === "object" ? record.sourceType ?? "" : "",
    requiresAttribution: Boolean(typeof record === "object" ? record.requiresAttribution : false),
    status: typeof record === "object" ? record.status ?? "" : "",
  };
}

function buildMediaDetails(entity, catalogRecord, fallback = "") {
  const entitySource = pickMediaSource(entity);
  if (entitySource) {
    return {
      src: entitySource,
      alt: getMediaAlt(entity, fallback),
      credit: entity?.imageCredit ?? entity?.credit ?? "",
      attribution: entity?.imageAttribution ?? entity?.attribution ?? "",
      license: entity?.imageLicense ?? entity?.license ?? "",
      source: entity?.imageSource ?? entity?.source ?? "",
      sourceType: entity?.imageSourceType ?? "",
      requiresAttribution: Boolean(entity?.imageCredit ?? entity?.imageAttribution),
      status: entity?.imageStatus ?? "",
    };
  }

  const catalogMedia = normalizeMediaRecord(catalogRecord);
  if (!catalogMedia) return null;

  return {
    ...catalogMedia,
    alt: catalogMedia.alt || getMediaAlt(entity, fallback),
  };
}

export function getDepartmentMediaDetails(dep, relatedPlace = null) {
  return buildMediaDetails(dep, MEDIA_CATALOG.departments[dep?.code], dep?.name)
    ?? buildMediaDetails(dep?.media, null, dep?.name)
    ?? buildMediaDetails(relatedPlace, null, relatedPlace?.name)
    ?? buildMediaDetails(null, MEDIA_CATALOG.places[relatedPlace?.name], relatedPlace?.name);
}

export function getDepartmentMedia(dep, relatedPlace = null) {
  return getDepartmentMediaDetails(dep, relatedPlace)?.src;
}

export function getPlaceMediaDetails(place) {
  return buildMediaDetails(place, MEDIA_CATALOG.places[place?.name], place?.name);
}

export function getPlaceMedia(place) {
  return getPlaceMediaDetails(place)?.src;
}

export function getAnecdoteMediaDetails(anecdote) {
  return buildMediaDetails(anecdote, MEDIA_CATALOG.anecdotes[anecdote?.id], anecdote?.titre);
}

export function getAnecdoteMedia(anecdote) {
  return getAnecdoteMediaDetails(anecdote)?.src;
}

export function getMediaAlt(entity, fallback = "") {
  return entity?.imageAlt
    ?? entity?.image_alt
    ?? entity?.alt
    ?? entity?.name
    ?? entity?.titre
    ?? fallback;
}
