const INTERNAL_PHASE_15_SOURCE = "Creation locale originale Phase 15";
const INTERNAL_PHASE_15_LICENSE = "Asset interne GeoDoku France";

export const MEDIA_RIGHTS_POLICY = {
  acceptedStatuses: ["approved"],
  acceptedSourceTypes: [
    "internal_svg",
    "internal_photo",
    "public_domain",
    "creative_commons",
    "official_open_license",
  ],
  localOnly: true,
};

export const MEDIA_CATALOG = {
  departments: {
    "13": internalPilotMedia({
      src: "/images/departments/13-marseille-calanques.svg",
      alt: "Illustration stylisee des calanques et du port de Marseille",
      title: "Bouches-du-Rhone, calanques et port mediterraneen stylises",
    }),
    "14": internalPilotMedia({
      src: "/images/departments/14-omaha-beach.svg",
      alt: "Illustration stylisee d'Omaha Beach et du littoral memorial",
      title: "Calvados, plages du Debarquement stylisees",
    }),
    "17": internalPilotMedia({
      src: "/images/departments/17-fort-boyard.svg",
      alt: "Illustration stylisee de Fort Boyard en mer",
      title: "Charente-Maritime, Fort Boyard stylise",
    }),
    "44": internalPilotMedia({
      src: "/images/departments/44-saint-nazaire.svg",
      alt: "Illustration stylisee des chantiers navals de Saint-Nazaire",
      title: "Loire-Atlantique, chantiers navals stylises",
    }),
    "75": internalPilotMedia({
      src: "/images/departments/75-paris-urbain.svg",
      alt: "Illustration stylisee d'un paysage urbain parisien",
      title: "Paris, paysage urbain stylise",
    }),
  },
  places: {
    "Calanques de Marseille": internalPilotMedia({
      src: "/images/departments/13-marseille-calanques.svg",
      alt: "Illustration stylisee des calanques de Marseille",
      title: "Calanques de Marseille",
    }),
    "Omaha Beach": internalPilotMedia({
      src: "/images/departments/14-omaha-beach.svg",
      alt: "Illustration stylisee d'Omaha Beach",
      title: "Omaha Beach",
    }),
    "Fort Boyard": internalPilotMedia({
      src: "/images/departments/17-fort-boyard.svg",
      alt: "Illustration stylisee de Fort Boyard",
      title: "Fort Boyard",
    }),
    "Chantiers de l'Atlantique": internalPilotMedia({
      src: "/images/departments/44-saint-nazaire.svg",
      alt: "Illustration stylisee des Chantiers de l'Atlantique",
      title: "Chantiers de l'Atlantique",
    }),
    ["Chantiers de l'Atlantique".replace("'", "’")]: internalPilotMedia({
      src: "/images/departments/44-saint-nazaire.svg",
      alt: "Illustration stylisee des Chantiers de l'Atlantique",
      title: "Chantiers de l'Atlantique",
    }),
    "Canal Saint-Martin": internalPilotMedia({
      src: "/images/departments/75-paris-urbain.svg",
      alt: "Illustration stylisee du Canal Saint-Martin",
      title: "Canal Saint-Martin",
    }),
  },
  anecdotes: {
    "13-histoire-006": internalPilotMedia({
      src: "/images/anecdotes/13-histoire-006-berre-industriel.svg",
      alt: "Illustration stylisee de l'etang de Berre industriel",
      title: "Etang de Berre industriel stylise",
      linkedAnecdoteId: "13-histoire-006",
    }),
    "14-histoire-003": internalPilotMedia({
      src: "/images/anecdotes/14-histoire-003-debarquement.svg",
      alt: "Illustration stylisee du Debarquement sur le littoral normand",
      title: "Debarquement et littoral memorial stylises",
      linkedAnecdoteId: "14-histoire-003",
    }),
    "17-histoire-005": internalPilotMedia({
      src: "/images/anecdotes/17-histoire-005-fort-boyard.svg",
      alt: "Illustration stylisee de Fort Boyard comme ouvrage militaire",
      title: "Fort Boyard militaire stylise",
      linkedAnecdoteId: "17-histoire-005",
    }),
    "44-seed-0015": internalPilotMedia({
      src: "/images/anecdotes/44-seed-0015-saint-nazaire.svg",
      alt: "Illustration stylisee de Saint-Nazaire industriel et naval",
      title: "Saint-Nazaire industriel et naval stylise",
      linkedAnecdoteId: "44-seed-0015",
    }),
    "75-seed-0011": internalPilotMedia({
      src: "/images/anecdotes/75-seed-0011-paris.svg",
      alt: "Illustration stylisee de Paris urbain",
      title: "Paris urbain stylise",
      linkedAnecdoteId: "75-seed-0011",
    }),
  },
};

function internalPilotMedia(record) {
  return {
    ...record,
    kind: "illustration",
    sourceType: "internal_svg",
    source: INTERNAL_PHASE_15_SOURCE,
    license: INTERNAL_PHASE_15_LICENSE,
    attribution: "",
    credit: "",
    requiresAttribution: false,
    status: "approved",
    createdAt: "2026-06-10",
  };
}
