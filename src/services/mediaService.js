import {
  PILOT_ANECDOTE_MEDIA,
  PILOT_DEPARTMENT_MEDIA,
  PILOT_PLACE_MEDIA,
} from "../data/mediaPilot.js";

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

export function getDepartmentMedia(dep, relatedPlace = null) {
  return pickMediaSource(dep)
    ?? pickMediaSource(dep?.media)
    ?? cleanLocalMediaSource(PILOT_DEPARTMENT_MEDIA[dep?.code])
    ?? pickMediaSource(relatedPlace)
    ?? cleanLocalMediaSource(PILOT_PLACE_MEDIA[relatedPlace?.name]);
}

export function getPlaceMedia(place) {
  return pickMediaSource(place) ?? cleanLocalMediaSource(PILOT_PLACE_MEDIA[place?.name]);
}

export function getAnecdoteMedia(anecdote) {
  return pickMediaSource(anecdote) ?? cleanLocalMediaSource(PILOT_ANECDOTE_MEDIA[anecdote?.id]);
}

export function getMediaAlt(entity, fallback = "") {
  return entity?.imageAlt
    ?? entity?.image_alt
    ?? entity?.alt
    ?? entity?.name
    ?? entity?.titre
    ?? fallback;
}
