import en from '../data/decks-en.js';
import id from '../data/decks-id.js';
import zh from '../data/decks-zh.js';
import ja from '../data/decks-ja.js';
import ko from '../data/decks-ko.js';

export const decks = { english: en, indonesian: id, chinese: zh, japanese: ja, korean: ko };

export const S = {
  lang:  "english",
  cat:   "lovers",
  mood:  "playful",
  idx:   0,
  busy:  false,   // true while a swipe animation is in progress
  // drag tracking
  dragging: false,
  startX:   0,
  nowX:     0,
  rafId:    null,
};

export const KEY = { category: "cat", language: "lang", mood: "mood" };

export function getDeck() { return decks[S.lang][S.cat][S.mood]; }
export function wrapIdx(i) { const d = getDeck(); return (i + d.length) % d.length; }
export function setTxt(el, text) { el.querySelector(".card-text").textContent = text; }

/* Animation constants — slower, smooth ease-out */
export const EASING        = "cubic-bezier(0.25, 1, 0.5, 1)";
export const SWIPE_MS      = 420;   // goPrev / snap-back
export const SWIPE_NEXT_MS = 700;   // goNext — longer so exit feels as deliberate as entry
export const SNAP_MS       = 300;   // snap-back animation
export const DISSOLVE_MS   = 260;   // back-card fade in / fade out

export function makeTr(ms) {
  return `transform ${ms}ms ${EASING}, opacity ${ms}ms ${EASING}`;
}

/* Apply styles in one shot. Pass null for transition to keep existing. */
export function applyStyle(el, transform, opacity, transition) {
  if (transition !== null) el.style.transition = transition;
  el.style.transform = transform;
  el.style.opacity   = String(opacity);
}
