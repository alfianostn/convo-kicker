import { S } from './state.js';
import { render, playIntro } from './cards.js';
import './swipe.js';
import './settings.js';

/* ── Test mode indicator + toggle shortcut ───────────────────── */

if (Tracker.getMode() === "test") {
  document.getElementById("test-badge").hidden = false;
}

document.addEventListener("keydown", (e) => {
  // Ctrl+Shift+T (or Cmd+Shift+T on Mac) toggles test/live mode
  if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key === "T") {
    e.preventDefault();
    const next = Tracker.getMode() === "test" ? "live" : "test";
    Tracker.setMode(next);
    location.reload();
  }
});

/* ── Init ────────────────────────────────────────────────────── */

render();
playIntro();
Tracker.startCardTimer(S.idx);
