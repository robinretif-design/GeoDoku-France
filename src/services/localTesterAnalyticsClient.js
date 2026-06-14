let localTesterAnalyticsPromise = null;
let pendingInitContext = null;

function loadLocalTesterAnalytics() {
  if (!localTesterAnalyticsPromise) {
    localTesterAnalyticsPromise = import("../debugLocalAnalytics.js");
  }

  return localTesterAnalyticsPromise;
}

function callLocalTesterAnalytics(methodName, ...args) {
  loadLocalTesterAnalytics()
    .then((module) => {
      if (pendingInitContext) {
        module.initLocalTesterAnalytics(pendingInitContext);
        pendingInitContext = null;
      }
      module[methodName]?.(...args);
    })
    .catch(() => {
      // Debug-only analytics must never block the playable experience.
    });
}

export function initLocalTesterAnalytics(context = {}) {
  pendingInitContext = context;
}

export function recordLocalTesterAction(actionName, data = {}) {
  callLocalTesterAnalytics("recordLocalTesterAction", actionName, data);
}

export function recordLocalTesterRulesOpened(data = {}) {
  callLocalTesterAnalytics("recordLocalTesterRulesOpened", data);
}

export function recordLocalTesterGameStarted(data = {}) {
  callLocalTesterAnalytics("recordLocalTesterGameStarted", data);
}

export function recordLocalTesterGameCompleted(data = {}) {
  callLocalTesterAnalytics("recordLocalTesterGameCompleted", data);
}

export function recordLocalTesterGameAbandoned(data = {}) {
  callLocalTesterAnalytics("recordLocalTesterGameAbandoned", data);
}
