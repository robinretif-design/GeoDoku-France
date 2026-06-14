import { useEffect, useState } from "react";
import { getAnalyticsDebugState } from "../analytics.js";
import { getLocalTesterAnalyticsDebugState } from "../debugLocalAnalytics.js";

export default function DebugPage() {
  const [analyticsDebugState, setAnalyticsDebugState] = useState(() => getAnalyticsDebugState());
  const [localTesterDebugState, setLocalTesterDebugState] = useState(() => getLocalTesterAnalyticsDebugState());

  useEffect(() => {
    const updateDebugState = () => {
      setAnalyticsDebugState(getAnalyticsDebugState());
      setLocalTesterDebugState(getLocalTesterAnalyticsDebugState());
    };
    updateDebugState();

    const intervalId = window.setInterval(updateDebugState, 500);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main className="app">
      <section className="debug-page">
        <p className="edition">Debug analytics</p>
        <h1>Configuration analytics</h1>
        <p className="debug-note">
          GevoCroisee ne collecte aucune donnee personnelle dans son code. Le trafic global est mesure uniquement si un fournisseur externe est configure au build.
        </p>

        <div className="debug-grid">
          <article className="result-card debug-stat">
            <span>Provider detecte</span>
            <strong>{analyticsDebugState.providerDetected}</strong>
            <small>{analyticsDebugState.label}</small>
          </article>
          <article className="result-card debug-stat">
            <span>Website ID Umami</span>
            <strong>{analyticsDebugState.umamiWebsiteIdDetected ? "Detecte" : "Manquant"}</strong>
          </article>
          <article className="result-card debug-stat">
            <span>Script URL Umami</span>
            <strong>{analyticsDebugState.umamiScriptUrlDetected ? "Detectee" : "Manquante"}</strong>
            {analyticsDebugState.umamiScriptUrlDetected && <small>{analyticsDebugState.umamiScriptUrl}</small>}
          </article>
          <article className="result-card debug-stat">
            <span>Script injecte</span>
            <strong>{analyticsDebugState.scriptInjected ? "Oui" : "Non"}</strong>
            <small>{analyticsDebugState.scriptStatus}</small>
          </article>
          <article className="result-card debug-stat">
            <span>Script charge</span>
            <strong>{analyticsDebugState.scriptLoaded ? "Oui" : "Non"}</strong>
            <small>API Umami : {analyticsDebugState.hasUmamiApi ? "disponible" : "indisponible"}</small>
          </article>
        </div>

        <section className="result-card debug-table-card">
          <p className="result-kicker">Detail</p>
          <p>{analyticsDebugState.detail}</p>
          <p className="debug-note">Logs console actifs uniquement sur cette page debug.</p>
        </section>

        <section className="result-card debug-table-card">
          <p className="result-kicker">Analytics local testeurs</p>
          <h2>Comportements observes en local</h2>
          <p className="debug-note">
            Ces mesures restent dans le navigateur de test via localStorage. Aucun envoi externe, aucun identifiant personnel.
          </p>
          <div className="debug-grid compact">
            <article className="debug-stat">
              <span>Sessions</span>
              <strong>{localTesterDebugState.sessions}</strong>
            </article>
            <article className="debug-stat">
              <span>Premiere action moyenne</span>
              <strong>{localTesterDebugState.averageFirstActionSeconds ?? "n/a"}s</strong>
            </article>
            <article className="debug-stat">
              <span>Regles ouvertes</span>
              <strong>{localTesterDebugState.rulesOpened}</strong>
            </article>
            <article className="debug-stat">
              <span>Parties lancees</span>
              <strong>{localTesterDebugState.gamesStarted}</strong>
            </article>
            <article className="debug-stat">
              <span>Validations</span>
              <strong>{localTesterDebugState.gamesCompleted}</strong>
              <small>{localTesterDebugState.completionRate}% des lancements</small>
            </article>
            <article className="debug-stat">
              <span>Grilles completes</span>
              <strong>{localTesterDebugState.gamesCompletedFull}</strong>
              <small>{localTesterDebugState.gamesCompletedPartial} partielles</small>
            </article>
            <article className="debug-stat">
              <span>Abandons</span>
              <strong>{localTesterDebugState.gamesAbandoned}</strong>
              <small>{localTesterDebugState.abandonmentRate}% des lancements</small>
            </article>
            <article className="debug-stat">
              <span>Evenements</span>
              <strong>{localTesterDebugState.events}</strong>
              <small>{localTesterDebugState.storageKey}</small>
            </article>
          </div>

          <div className="debug-event-list">
            <p className="result-kicker">Derniers evenements locaux</p>
            {localTesterDebugState.recentEvents.length === 0 ? (
              <p className="debug-note">Aucun evenement local enregistre pour l'instant.</p>
            ) : (
              localTesterDebugState.recentEvents.map((event, index) => (
                <article className="debug-event" key={`${event.name}-${event.atIso}-${index}`}>
                  <strong>{event.name}</strong>
                  <span>{new Date(event.atIso).toLocaleString("fr-FR")}</span>
                  <code>{JSON.stringify(event.data)}</code>
                </article>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
