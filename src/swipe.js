import { S, wrapIdx, SWIPE_MS, SWIPE_NEXT_MS, SNAP_MS, DISSOLVE_MS, makeTr, applyStyle } from './state.js';
import { render, restoreAllToRest } from './cards.js';
import { cardStack, elActive, elNear, elFar, elPrev } from './dom.js';

/* ── Swipe forward (← left) ──────────────────────────────────── */
/*
  Visually:  active flies out left, near rises to full, far rises to near.
  z-order:   active(2) flies away, near(1) becomes visible top card.
  Commit:    setTimeout — reliable unlike transitionend which silently
             misfires on elements with pointer-events:none or opacity:0.
*/
export function goNext() {
  if (S.busy) return;
  S.busy = true;

  const T = makeTr(SWIPE_NEXT_MS);
  applyStyle(elActive, "translate3d(-110vw,0,0) rotate(-18deg)", 0, T);
  applyStyle(elNear,   "translate3d(0,0,0) scale(1)",            1, T);
  applyStyle(elFar,    "translate3d(0,18px,0) scale(0.965)",     1, T);

  const fromIdx = S.idx;
  setTimeout(() => {
    S.idx = wrapIdx(S.idx + 1);
    Tracker.swipeNext({ from: fromIdx, to: S.idx, method: S._lastInput || "keyboard" });
    Tracker.startCardTimer(S.idx);
    render();
    // Dissolve in the brand-new back card (was not visible before this swipe)
    elFar.style.transition = "none";
    elFar.style.opacity    = "0";
    void elFar.offsetHeight;
    elFar.style.transition = `opacity ${DISSOLVE_MS}ms ease`;
    elFar.style.opacity    = "1";
    S.busy = false;
  }, SWIPE_NEXT_MS + 30);
}

/* ── Swipe back (→ right) ────────────────────────────────────── */
/*
  Visually:  prev card returns from the left (where goNext throws it),
             sliding back in ON TOP of the current stack.
  z-order:   elPrev is z:3, always above elActive(z:2).
  This is the exact inverse of goNext — the card "comes back".
*/
export function goPrev(fromDrag) {
  if (S.busy) return;
  S.busy = true;

  if (!fromDrag) {
    // Keyboard — start prev off-screen left (where goNext throws cards)
    elPrev.style.transition = "none";
    elPrev.style.zIndex     = "3";
    elPrev.style.transform  = "translate3d(-110vw,0,0) rotate(-18deg)";
    elPrev.style.opacity    = "1";
    void elPrev.offsetHeight;
  }

  const T = makeTr(SWIPE_MS);

  // Prev slides back in from the left to center
  applyStyle(elPrev, "translate3d(0,0,0) rotate(0deg)", 1, T);

  // Active recedes to near position (pushed back by returning card)
  applyStyle(elActive, "translate3d(0,18px,0) scale(0.965)", 1, T);

  // Near recedes to far position
  applyStyle(elNear, "translate3d(0,34px,0) scale(0.93)", 1, T);
  applyStyle(elFar,  "translate3d(0,34px,0) scale(0.93)", 1, T);

  const fromIdx = S.idx;
  setTimeout(() => {
    S.idx = wrapIdx(S.idx - 1);
    Tracker.swipePrev({ from: fromIdx, to: S.idx, method: S._lastInput || "keyboard" });
    Tracker.startCardTimer(S.idx);
    render();
    S.busy = false;
  }, SWIPE_MS + 30);
}

/* ── Snap back (drag released without enough distance) ───────── */

export function snapBack() {
  const T = makeTr(SNAP_MS);
  applyStyle(elActive, "translate3d(0,0,0) rotate(0deg)",        1, T);
  applyStyle(elNear,   "translate3d(0,18px,0) scale(0.965)",     1, T);
  applyStyle(elFar,    "translate3d(0,34px,0) scale(0.93)",      1, T);
  applyStyle(elPrev,   "translate3d(-110vw,0,0) rotate(-18deg)", 0, T);

  setTimeout(restoreAllToRest, SNAP_MS + 30);
}

/* ── Drag (rAF-batched, no transitions while finger is down) ─── */

function dragFrame() {
  S.rafId = null;
  if (!S.dragging) return;

  const dx = S.nowX - S.startX;
  const p  = Math.min(Math.abs(dx) / 160, 1);
  const rot = (dx / 20).toFixed(2);

  // Active card follows finger exactly — no transition
  elActive.style.transform = `translate3d(${dx}px,0,0) rotate(${rot}deg)`;
  elActive.style.setProperty('--holo-angle', `${200 + (dx / window.innerWidth) * 30}deg`);

  if (dx < 0) {
    // Dragging LEFT → next card rises from behind
    elNear.style.transform = `translate3d(0,${(18 - p * 18).toFixed(1)}px,0) scale(${(0.965 + p * 0.035).toFixed(4)})`;
    elNear.style.opacity   = "1";
    elFar.style.transform  = `translate3d(0,${(34 - p * 16).toFixed(1)}px,0) scale(${(0.93 + p * 0.035).toFixed(4)})`;
    elFar.style.opacity    = "1";
    // Keep prev off-screen left
    elPrev.style.transform = "translate3d(-110vw,0,0) rotate(-18deg)";
    elPrev.style.opacity   = "0";
  } else {
    // Dragging RIGHT → prev card returns from the left (inverse of discard)
    const offscreen = window.innerWidth * 1.1;
    const prevX = (-offscreen + p * offscreen).toFixed(1);
    const prevRot = (-18 + p * 18).toFixed(2);
    elPrev.style.zIndex    = "3";
    elPrev.style.transform = `translate3d(${prevX}px,0,0) rotate(${prevRot}deg)`;
    elPrev.style.opacity   = p.toFixed(3);
    // Near shifts down toward far position
    elNear.style.transform = `translate3d(0,${(18 + p * 16).toFixed(1)}px,0) scale(${(0.965 - p * 0.035).toFixed(4)})`;
    elNear.style.opacity   = "1";
    // Far stays at rest
    elFar.style.transform  = "translate3d(0,34px,0) scale(0.93)";
    elFar.style.opacity    = "1";
  }
}

function scheduleFrame() {
  if (S.rafId === null) S.rafId = requestAnimationFrame(dragFrame);
}

/* Remove any CSS transitions so the card tracks the finger with zero lag */
function killTransitions() {
  elActive.style.transition = "none";
  elNear.style.transition   = "none";
  elFar.style.transition    = "none";
  elPrev.style.transition   = "none";
}

function finishDrag(releaseX) {
  if (!S.dragging) return;
  S.dragging = false;

  if (S.rafId !== null) {
    cancelAnimationFrame(S.rafId);
    S.rafId = null;
  }

  elActive.classList.remove("dragging");

  const dx = releaseX - S.startX;
  if (dx <= -80) {
    Tracker.dragComplete({ direction: "left", distance: Math.abs(dx) });
    goNext();
  } else if (dx >= 80) {
    Tracker.dragComplete({ direction: "right", distance: dx });
    goPrev(true);
  } else {
    Tracker.dragCancel({ distance: Math.abs(dx) });
    snapBack();
  }
}

/* ── Pointer events ──────────────────────────────────────────── */

cardStack.addEventListener("pointerdown", (e) => {
  if (S.busy || S.dragging) return;
  // Only start drag when the touch begins on the active front card
  if (!elActive.contains(e.target) && e.target !== elActive) return;

  S.dragging = true;
  S.startX   = e.clientX;
  S.nowX     = e.clientX;
  S._lastInput = "drag";

  Tracker.dragStart({ cardIdx: S.idx, startX: e.clientX });
  killTransitions();

  // Pre-position prev off-screen left for potential right-drag
  elPrev.style.zIndex    = "3";
  elPrev.style.transform = "translate3d(-110vw,0,0) rotate(-18deg)";
  elPrev.style.opacity   = "0";

  elActive.classList.add("dragging");
  elActive.setPointerCapture(e.pointerId);
}, { passive: true });

cardStack.addEventListener("pointermove", (e) => {
  if (!S.dragging) return;
  S.nowX = e.clientX;
  scheduleFrame();
}, { passive: true });

cardStack.addEventListener("pointerup",     (e) => finishDrag(e.clientX));
cardStack.addEventListener("pointercancel", ()  => finishDrag(S.startX));  // snap back on cancel

/* ── Keyboard (→ next question, ← previous question) ────────── */

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { S._lastInput = "keyboard"; goNext(); }
  if (e.key === "ArrowLeft")  { S._lastInput = "keyboard"; goPrev(); }
});
