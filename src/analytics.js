const analyticsProvider = (import.meta.env.VITE_ANALYTICS_PROVIDER ?? "").trim().toLowerCase();

function envValue(name) {
  return (import.meta.env[name] ?? "").trim();
}

function isAnalyticsDebugMode() {
  if (typeof window === "undefined") return false;
  return window.location.pathname === "/debug" || new URLSearchParams(window.location.search).get("debug") === "true";
}

function analyticsDebugLog(message, data = {}) {
  if (!isAnalyticsDebugMode()) return;
  console.info(`[GévoCroisée analytics] ${message}`, data);
}

function getAnalyticsScript(provider) {
  if (typeof document === "undefined") return null;
  return document.querySelector(`[data-gevocroisee-analytics="${provider}"]`);
}

function appendScript({ provider, scriptUrl, defer = true, async = false, attributes = {} }) {
  if (!scriptUrl) {
    analyticsDebugLog("script URL missing", { provider });
    return null;
  }

  const existingScript = getAnalyticsScript(provider);
  if (existingScript) {
    analyticsDebugLog("script already injected", {
      provider,
      status: existingScript.dataset.gevocroiseeAnalyticsStatus ?? "unknown",
    });
    return existingScript;
  }

  const script = document.createElement("script");
  script.src = scriptUrl;
  script.defer = defer;
  script.async = async;
  script.dataset.gevocroiseeAnalytics = provider;
  script.dataset.gevocroiseeAnalyticsStatus = "loading";

  Object.entries(attributes).forEach(([name, value]) => {
    if (value) script.setAttribute(name, value);
  });

  script.addEventListener("load", () => {
    script.dataset.gevocroiseeAnalyticsStatus = "loaded";
    analyticsDebugLog("script loaded", { provider, scriptUrl });
  });

  script.addEventListener("error", () => {
    script.dataset.gevocroiseeAnalyticsStatus = "error";
    analyticsDebugLog("script failed", { provider, scriptUrl });
  });

  document.head.appendChild(script);
  analyticsDebugLog("script injected", { provider, scriptUrl, attributes });
  return script;
}

function sanitizeEventData(data) {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => (
        typeof value === "string"
        || typeof value === "boolean"
        || (typeof value === "number" && Number.isFinite(value))
      ))
      .map(([key, value]) => [
        key,
        typeof value === "string" ? value.slice(0, 120) : value,
      ])
  );
}

function trackUmamiEvent(eventName, eventData, attempt = 0) {
  if (typeof window.umami?.track === "function") {
    analyticsDebugLog("umami event sent", { eventName, eventData });
    window.umami.track(eventName, eventData);
    return;
  }

  if (attempt < 3) {
    window.setTimeout(() => trackUmamiEvent(eventName, eventData, attempt + 1), 300);
    return;
  }

  analyticsDebugLog("umami event skipped because API is not ready", { eventName, eventData });
}

export function getAnalyticsConfig() {
  if (analyticsProvider === "netlify") {
    return {
      provider: "netlify",
      label: "Netlify Analytics",
      enabled: true,
      mode: "Hébergeur",
      detail: "Aucun script n'est injecté par GévoCroisée : l'analytics est activé côté Netlify.",
    };
  }

  if (analyticsProvider === "ga4") {
    const measurementId = envValue("VITE_GA4_MEASUREMENT_ID");
    return {
      provider: "ga4",
      label: "Google Analytics 4",
      enabled: Boolean(measurementId),
      mode: "Script externe",
      measurementId,
      detail: measurementId
        ? "Le script GA4 sera chargé sans identifiant joueur ni événement personnalisé."
        : "Définir VITE_GA4_MEASUREMENT_ID pour activer GA4.",
    };
  }

  if (analyticsProvider === "plausible") {
    const domain = envValue("VITE_PLAUSIBLE_DOMAIN");
    const scriptUrl = envValue("VITE_PLAUSIBLE_SCRIPT_URL") || "https://plausible.io/js/script.js";
    return {
      provider: "plausible",
      label: "Plausible",
      enabled: Boolean(domain),
      mode: "Script externe",
      domain,
      scriptUrl,
      detail: domain
        ? "Le script Plausible sera chargé avec le domaine configuré."
        : "Définir VITE_PLAUSIBLE_DOMAIN pour activer Plausible.",
    };
  }

  if (analyticsProvider === "umami") {
    const websiteId = envValue("VITE_UMAMI_WEBSITE_ID");
    const scriptUrl = envValue("VITE_UMAMI_SCRIPT_URL");
    return {
      provider: "umami",
      label: "Umami",
      enabled: Boolean(websiteId && scriptUrl),
      mode: "Script externe",
      websiteId,
      scriptUrl,
      detail: websiteId && scriptUrl
        ? "Le script Umami sera chargé avec l'identifiant de site configuré."
        : "Définir VITE_UMAMI_WEBSITE_ID et VITE_UMAMI_SCRIPT_URL pour activer Umami.",
    };
  }

  if (analyticsProvider === "custom" || envValue("VITE_ANALYTICS_SCRIPT_URL")) {
    const scriptUrl = envValue("VITE_ANALYTICS_SCRIPT_URL");
    return {
      provider: "custom",
      label: "Script configurable",
      enabled: Boolean(scriptUrl),
      mode: "Script externe",
      scriptUrl,
      detail: scriptUrl
        ? "Le script configuré sera injecté sans paramètres utilisateur."
        : "Définir VITE_ANALYTICS_SCRIPT_URL pour activer le script configurable.",
    };
  }

  return {
    provider: "none",
    label: "Aucun analytics externe",
    enabled: false,
    mode: "Inactif",
    detail: "Aucun script analytics n'est chargé tant qu'aucune variable Vite n'est définie.",
  };
}

export function initAnalytics() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const config = getAnalyticsConfig();
  analyticsDebugLog("config detected", getAnalyticsDebugState());

  if (!config.enabled) {
    analyticsDebugLog("analytics disabled", { provider: config.provider, detail: config.detail });
    return;
  }

  if (config.provider === "netlify") return;

  if (config.provider === "ga4") {
    appendScript({
      provider: "ga4",
      scriptUrl: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.measurementId)}`,
      defer: false,
      async: true,
    });

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", config.measurementId);
    return;
  }

  if (config.provider === "plausible") {
    appendScript({
      provider: "plausible",
      scriptUrl: config.scriptUrl,
      attributes: { "data-domain": config.domain },
    });
    return;
  }

  if (config.provider === "umami") {
    appendScript({
      provider: "umami",
      scriptUrl: config.scriptUrl,
      attributes: { "data-website-id": config.websiteId },
    });
    return;
  }

  if (config.provider === "custom") {
    appendScript({
      provider: "custom",
      scriptUrl: config.scriptUrl,
    });
  }
}

export function trackGevocroiseeEvent(eventName, eventData = {}) {
  if (typeof window === "undefined") return;

  const config = getAnalyticsConfig();
  if (config.provider !== "umami" || !config.enabled) {
    analyticsDebugLog("event ignored because Umami is not enabled", {
      provider: config.provider,
      eventName,
    });
    return;
  }

  trackUmamiEvent(eventName, sanitizeEventData(eventData));
}

export function getAnalyticsDebugState() {
  const config = getAnalyticsConfig();
  const umamiWebsiteId = envValue("VITE_UMAMI_WEBSITE_ID");
  const umamiScriptUrl = envValue("VITE_UMAMI_SCRIPT_URL");
  const script = config.provider !== "netlify" ? getAnalyticsScript(config.provider) : null;
  const scriptStatus = script?.dataset.gevocroiseeAnalyticsStatus ?? (script ? "loading" : "not_injected");
  const hasUmamiApi = typeof window !== "undefined" && typeof window.umami?.track === "function";

  return {
    provider: config.provider,
    providerDetected: analyticsProvider || "missing",
    label: config.label,
    enabled: config.enabled,
    mode: config.mode,
    detail: config.detail,
    umamiWebsiteIdDetected: Boolean(umamiWebsiteId),
    umamiScriptUrlDetected: Boolean(umamiScriptUrl),
    umamiScriptUrl,
    scriptInjected: Boolean(script),
    scriptLoaded: scriptStatus === "loaded" || (config.provider === "umami" && hasUmamiApi),
    scriptStatus,
    hasUmamiApi,
  };
}
