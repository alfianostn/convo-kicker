import labels from '../data/labels.js';
import { S, KEY, getDeck, wrapIdx, setTxt, DISSOLVE_MS } from './state.js';
import { elActive, elNear, elFar, elPrev, categoryLabel, languageLabel, moodLabel, chipButtons } from './dom.js';

export function setCounter(el, idx, total) {
  el.querySelector(".card-counter").textContent = `${idx + 1} / ${total}`;
}

export function restoreAllToRest() {
  // Set transition:none before transforms so no animation fires on reset
  elActive.style.transition = "none";
  elNear.style.transition   = "none";
  elFar.style.transition    = "none";
  elPrev.style.transition   = "none";

  elActive.style.transform  = "translate3d(0,0,0) rotate(0deg)";
  elNear.style.transform    = "translate3d(0,18px,0) scale(0.965) rotate(5deg)";
  elFar.style.transform     = "translate3d(0,34px,0) scale(0.93) rotate(-5deg)";
  elPrev.style.transform    = "translate3d(-110vw,0,0) rotate(-18deg)";

  elActive.style.opacity    = "1";
  elNear.style.opacity      = "1";
  elFar.style.opacity       = "1";
  elPrev.style.opacity      = "0";
  elPrev.style.zIndex       = "";

  elActive.style.boxShadow  = "";
  elNear.style.boxShadow    = "";
  elFar.style.boxShadow     = "";
  elPrev.style.boxShadow    = "";

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

  const SPRING = "cubic-bezier(0.34, 1.08, 0.64, 1)";
  const ease   = (ms) => `transform ${ms}ms ${SPRING}, opacity 120ms linear`;

  // Park all three visible cards below the stack (off-screen bottom)
  elFar.style.cssText    = "transition:none; transform:translate3d(0,80%,0) scale(0.93); opacity:0;";
  elNear.style.cssText   = "transition:none; transform:translate3d(0,80%,0) scale(0.965); opacity:0;";
  elActive.style.cssText = "transition:none; transform:translate3d(0,80%,0); opacity:0;";
  // Force reflow — ensures the browser "sees" the starting positions
  // before any transition is applied (prevents jump-to-end)
  void elActive.offsetHeight;

  setTimeout(() => {
    elFar.style.transition = ease(640);
    elFar.style.transform  = "translate3d(0,34px,0) scale(0.93) rotate(-5deg)";
    elFar.style.opacity    = "1";
  }, 80);

  setTimeout(() => {
    elNear.style.transition = ease(660);
    elNear.style.transform  = "translate3d(0,18px,0) scale(0.965) rotate(5deg)";
    elNear.style.opacity    = "1";
  }, 260);

  setTimeout(() => {
    elActive.style.transition = ease(720);
    elActive.style.transform  = "translate3d(0,0,0) rotate(0deg)";
    elActive.style.opacity    = "1";
  }, 450);

  setTimeout(() => {
    restoreAllToRest();
    S.busy = false;
  }, 1300);
}
