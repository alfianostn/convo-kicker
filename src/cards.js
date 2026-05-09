import labels from '../data/labels.js';
import { S, KEY, getDeck, wrapIdx, setTxt, DISSOLVE_MS } from './state.js';
import { elActive, elNear, elFar, elPrev, categoryLabel, languageLabel, moodLabel, chipButtons } from './dom.js';

export function setCounter(el, idx, total) {
  el.querySelector(".card-counter").textContent = `${idx + 1} / ${total}`;
}

export function restoreAllToRest() {
  elActive.style.cssText = "";
  elNear.style.cssText   = "";
  elFar.style.cssText    = "";
  elPrev.style.cssText   = "";

  elActive.className = "question-card active-card";
  elNear.className   = "question-card preview-card preview-card-near";
  elFar.className    = "question-card preview-card preview-card-far";
  elPrev.className   = "question-card return-card";
}

export function render() {
  const d = getDeck();
  setTxt(elActive, d[S.idx]);
  setTxt(elPrev,   d[wrapIdx(S.idx - 1)]);
  setTxt(elNear,   d[wrapIdx(S.idx + 1)]);
  setTxt(elFar,    d[wrapIdx(S.idx + 2)]);

  setCounter(elActive, S.idx, d.length);
  setCounter(elPrev,   wrapIdx(S.idx - 1), d.length);
  setCounter(elNear,   wrapIdx(S.idx + 1), d.length);
  setCounter(elFar,    wrapIdx(S.idx + 2), d.length);

  document.body.dataset.theme = S.cat;
  categoryLabel.textContent   = labels[S.lang][S.cat];
  languageLabel.textContent   = labels[S.lang].language;
  moodLabel.textContent       = labels[S.lang][S.mood];

  chipButtons.forEach(b => {
    b.classList.toggle("is-active", S[KEY[b.dataset.setting]] === b.dataset.value);
  });

  restoreAllToRest();
}

/* ── Intro animation (cards stack in on load) ────────────────── */
/*
  Three-card cascade: far enters first, near follows, active lands on top.
  Uses an overshoot spring so each card bounces slightly into place.
  S.busy is held true for the full duration so no swipes interrupt.
*/
export function playIntro() {
  S.busy = true;

  const SPRING = "cubic-bezier(0.34, 1.4, 0.64, 1)";
  const ease   = (ms) => `transform ${ms}ms ${SPRING}, opacity ${ms}ms ease`;

  // Park all three visible cards below the stack (off-screen bottom)
  elFar.style.cssText    = "transition:none; transform:translate3d(0,80%,0) scale(0.93); opacity:0;";
  elNear.style.cssText   = "transition:none; transform:translate3d(0,80%,0) scale(0.965); opacity:0;";
  elActive.style.cssText = "transition:none; transform:translate3d(0,80%,0); opacity:0;";
  // Force reflow — ensures the browser "sees" the starting positions
  // before any transition is applied (prevents jump-to-end)
  void elActive.offsetHeight;

  // Far card drifts up first (back of the stack)
  setTimeout(() => {
    elFar.style.transition = ease(520);
    elFar.style.transform  = "translate3d(0,34px,0) scale(0.93)";
    elFar.style.opacity    = "1";
  }, 60);

  // Near card follows close behind
  setTimeout(() => {
    elNear.style.transition = ease(540);
    elNear.style.transform  = "translate3d(0,18px,0) scale(0.965)";
    elNear.style.opacity    = "1";
  }, 200);

  // Active card lands on top with the strongest spring
  setTimeout(() => {
    elActive.style.transition = ease(580);
    elActive.style.transform  = "translate3d(0,0,0) rotate(0deg)";
    elActive.style.opacity    = "1";
  }, 340);

  // Hand back control once the active card has finished
  setTimeout(() => {
    restoreAllToRest();
    S.busy = false;
  }, 1020);
}
