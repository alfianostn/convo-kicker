import { S, reshuffleDeck } from './state.js';
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

const LANG_MAP = { en: 'english', id: 'indonesian', zh: 'chinese', ja: 'japanese', ko: 'korean' };
const detected = LANG_MAP[navigator.language?.slice(0, 2).toLowerCase()];
if (detected) S.lang = detected;

reshuffleDeck();
render();
playIntro();
Tracker.startCardTimer(S.idx);
