/* ── Closer Analytics Tracker ───────────────────────────────── */
/*
  Lightweight client-side analytics for understanding user behaviour.
  All data is stored in localStorage. No external services are called.

  Tracked events:
  ┌──────────────────────┬──────────────────────────────────────────┐
  │ Category             │ Events                                   │
  ├──────────────────────┼──────────────────────────────────────────┤
  │ Session              │ start, duration, device info, mode       │
  │ Card interactions    │ swipe next/prev, time per card           │
  │ Drag behaviour       │ drag start, complete vs cancelled, dist  │
  │ Settings             │ modal open, changes saved, selections    │
  │ Engagement           │ total cards viewed, return visits        │
  └──────────────────────┴──────────────────────────────────────────┘

  Test vs Live mode:
    Activate test mode:  ?mode=test in URL  |  Ctrl+Shift+T  |  Tracker.setMode("test")
    Deactivate:          ?mode=live in URL  |  Ctrl+Shift+T  |  Tracker.setMode("live")

  Usage:
    Tracker.event("swipe_next", { from: 0, to: 1 })
    Tracker.getSession()              → current session object
    Tracker.getAllSessions()          → all sessions
    Tracker.getAllSessions("live")    → only real user sessions
    Tracker.export("live")            → export only live data
    Tracker.clear("test")             → wipe only test data
    Tracker.getMode()                 → "test" or "live"
    Tracker.debug()                   → console summary
*/

const Tracker = (() => {
  const STORAGE_KEY   = "closer_analytics";
  const SESSION_KEY   = "closer_session";
  const TEST_FLAG_KEY = "closer_test_mode";

  /* ── Helpers ──────────────────────────────────────────────── */

  function now() { return Date.now(); }

  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; }
    catch { return null; }
  }

  function save(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); }
    catch { /* storage full — silently fail */ }
  }

  function getHistory() { return load(STORAGE_KEY) || { sessions: [] }; }

  function saveHistory(h) { save(STORAGE_KEY, h); }

  /* ── Mode detection ───────────────────────────────────────── */

  function detectMode() {
    // 1. URL parameter takes priority
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    if (urlMode === "test" || urlMode === "live") {
      localStorage.setItem(TEST_FLAG_KEY, urlMode);
      // Clean the URL so it's not shared accidentally
      params.delete("mode");
      const clean = params.toString();
      const newUrl = window.location.pathname + (clean ? `?${clean}` : "") + window.location.hash;
      history.replaceState(null, "", newUrl);
      return urlMode;
    }

    // 2. Fall back to localStorage flag
    const stored = localStorage.getItem(TEST_FLAG_KEY);
    if (stored === "test") return "test";

    // 3. Default to live
    return "live";
  }

  const currentMode = detectMode();

  /* ── Device info ──────────────────────────────────────────── */

  function getDevice() {
    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      pixelRatio: window.devicePixelRatio || 1,
      touchCapable: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      userAgent: navigator.userAgent,
      language: navigator.language,
    };
  }

  /* ── Session management ───────────────────────────────────── */

  const session = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${now()}-${Math.random().toString(36).slice(2)}`,
    mode: currentMode,
    startedAt: new Date().toISOString(),
    startTs: now(),
    device: getDevice(),
    events: [],

    // Aggregate counters (quick summary without parsing events)
    counters: {
      swipeNext: 0,
      swipePrev: 0,
      dragStarted: 0,
      dragCompleted: 0,
      dragCancelled: 0,
      settingsOpened: 0,
      settingsSaved: 0,
      cardsViewed: new Set(),    // unique card indices seen
      totalInteractions: 0,
    },

    // Card dwell tracking
    cardTimer: { idx: null, startTs: null },
    cardDwells: [],  // { idx, durationMs }
  };

  /* Restore visit count */
  const hist = getHistory();
  session.visitNumber = hist.sessions.length + 1;

  /* ── Core event logging ───────────────────────────────────── */

  function event(name, data = {}) {
    const entry = {
      t: now() - session.startTs,   // ms since session start
      name,
      ...data,
    };
    session.events.push(entry);
    session.counters.totalInteractions++;

    // Persist session periodically (every 5 events)
    if (session.events.length % 5 === 0) persistSession();
  }

  /* ── Card dwell time ──────────────────────────────────────── */

  function startCardTimer(idx) {
    // End previous card timer
    if (session.cardTimer.idx !== null) {
      const dur = now() - session.cardTimer.startTs;
      session.cardDwells.push({
        idx: session.cardTimer.idx,
        durationMs: dur,
      });
    }
    session.cardTimer = { idx, startTs: now() };
    session.counters.cardsViewed.add(idx);
  }

  /* ── Persist & export ─────────────────────────────────────── */

  function getSessionSummary() {
    const elapsed = now() - session.startTs;
    return {
      id: session.id,
      mode: session.mode,
      visitNumber: session.visitNumber,
      startedAt: session.startedAt,
      durationMs: elapsed,
      durationFormatted: formatDuration(elapsed),
      device: session.device,
      counters: {
        ...session.counters,
        cardsViewed: [...session.counters.cardsViewed],
        uniqueCardsViewed: session.counters.cardsViewed.size,
      },
      cardDwells: session.cardDwells,
      events: session.events,
    };
  }

  function persistSession() {
    save(SESSION_KEY, getSessionSummary());
  }

  function finalizeSession() {
    // Close last card timer
    startCardTimer(null);

    const summary = getSessionSummary();
    const h = getHistory();
    h.sessions.push(summary);
    saveHistory(h);
    localStorage.removeItem(SESSION_KEY);
  }

  function formatDuration(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
  }

  /* ── Session filtering helper ─────────────────────────────── */

  function filterSessions(sessions, mode) {
    if (!mode) return sessions;
    // Old sessions without a mode field are treated as "live"
    if (mode === "live") return sessions.filter(s => !s.mode || s.mode === "live");
    return sessions.filter(s => s.mode === mode);
  }

  /* ── Lifecycle hooks ──────────────────────────────────────── */

  // Save session on page hide (works better than beforeunload on mobile)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") finalizeSession();
  });

  window.addEventListener("beforeunload", finalizeSession);

  // Log initial session start
  event("session_start", {
    mode: currentMode,
    visitNumber: session.visitNumber,
    referrer: document.referrer || "(direct)",
  });

  /* ── Scroll / idle tracking ───────────────────────────────── */

  let lastInteractionTs = now();

  function trackActivity() {
    lastInteractionTs = now();
  }

  // Track general page engagement
  document.addEventListener("pointerdown", trackActivity, { passive: true });
  document.addEventListener("keydown", trackActivity, { passive: true });

  // Log idle periods (if user was idle > 30s then comes back)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      const idle = now() - lastInteractionTs;
      if (idle > 30000) {
        event("returned_from_idle", { idleMs: idle });
      }
    }
  });

  /* ── Public API ───────────────────────────────────────────── */

  return {
    event,
    startCardTimer,

    // Convenience methods for common events
    swipeNext(data)       { session.counters.swipeNext++;      event("swipe_next", data); },
    swipePrev(data)       { session.counters.swipePrev++;      event("swipe_prev", data); },
    dragStart(data)       { session.counters.dragStarted++;    event("drag_start", data); },
    dragComplete(data)    { session.counters.dragCompleted++;   event("drag_complete", data); },
    dragCancel(data)      { session.counters.dragCancelled++;   event("drag_cancel", data); },
    settingsOpened()      { session.counters.settingsOpened++;  event("settings_opened"); },
    settingsSaved(data)   { session.counters.settingsSaved++;   event("settings_saved", data); },

    // Mode
    getMode() { return currentMode; },
    setMode(m) {
      if (m !== "test" && m !== "live") return;
      localStorage.setItem(TEST_FLAG_KEY, m);
    },

    // Retrieval (with optional mode filter)
    getSession: getSessionSummary,
    getAllSessions(mode) { return filterSessions(getHistory().sessions, mode); },

    // Full export (with optional mode filter)
    export(mode) {
      return {
        exportedAt: new Date().toISOString(),
        currentMode,
        filterApplied: mode || "none",
        currentSession: getSessionSummary(),
        pastSessions: filterSessions(getHistory().sessions, mode),
      };
    },

    // Clear stored analytics (optionally only a specific mode)
    clear(mode) {
      if (!mode) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(SESSION_KEY);
      } else {
        const h = getHistory();
        h.sessions = h.sessions.filter(s => {
          const sMode = s.mode || "live";
          return sMode !== mode;
        });
        saveHistory(h);
      }
    },

    // Print a quick summary to console
    debug() {
      const s = getSessionSummary();
      const all = getHistory().sessions;
      const testCount = all.filter(s => s.mode === "test").length;
      const liveCount = all.filter(s => !s.mode || s.mode === "live").length;

      console.group("%c📊 Closer Analytics", "font-weight:bold; font-size:14px");
      console.log(`Mode: %c${currentMode.toUpperCase()}`, currentMode === "test" ? "color:#d4a017;font-weight:bold" : "color:#4caf50;font-weight:bold");
      console.log(`Session #${s.visitNumber} — ${s.durationFormatted}`);
      console.log(`Swipes: ${s.counters.swipeNext} next, ${s.counters.swipePrev} prev`);
      console.log(`Drags: ${s.counters.dragStarted} started, ${s.counters.dragCompleted} completed, ${s.counters.dragCancelled} cancelled`);
      console.log(`Cards seen: ${s.counters.uniqueCardsViewed} unique`);
      console.log(`Settings: opened ${s.counters.settingsOpened}x, saved ${s.counters.settingsSaved}x`);
      console.log(`History: ${liveCount} live sessions, ${testCount} test sessions`);
      console.table(s.cardDwells);
      console.log("Full data:", s);
      console.groupEnd();
    },
  };
})();
