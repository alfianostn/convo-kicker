import { S, wrapIdx, getDeck, setTxt, SWIPE_MS, SWIPE_NEXT_MS, SNAP_MS, DISSOLVE_MS, EASING, makeTr, applyStyle } from './state.js';
import { render, restoreAllToRest, setCounter } from './cards.js';
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

  // Load card 4 into elPrev (unused during goNext) and start it sliding simultaneously.
  // elPrev has z-index:3 from CSS but we override to 0 so it sits behind card 3 (elFar).
  // DOM order: elPrev comes before elFar, so at the same z-index elFar paints on top. ✓
  const deck = getDeck();
  const card4Idx = wrapIdx(S.idx + 3);
  setTxt(elPrev, deck[card4Idx]);
  setCounter(elPrev, card4Idx, deck.length);
  elPrev.style.transition = "none";
  elPrev.style.zIndex     = "0";
  elPrev.style.opacity    = "1";
  elPrev.style.transform  = "translate3d(0,18px,0) scale(0.965) rotate(-5deg)";
  // Commit the start position BEFORE applyStyle so the main animations still
  // use their rest positions as the "before" value for their transitions.
  void elPrev.offsetHeight;
  elPrev.style.transition = `transform ${SWIPE_NEXT_MS}ms ${EASING}`;
  elPrev.style.transform  = "translate3d(0,34px,0) scale(0.93) rotate(-5deg)";

  const T = makeTr(SWIPE_NEXT_MS);
  applyStyle(elActive, "translate3d(-110vw,0,0) rotate(-18deg)",           0, T);
  applyStyle(elNear,   "translate3d(0,0,0) scale(1) rotate(0deg)",         1, T);
  applyStyle(elFar,    "translate3d(0,18px,0) scale(0.965) rotate(5deg)",  1, T);
  // Shadow grows on elNear as it rises — by commit it already equals --shadow,
  // so elActive appearing with the same shadow causes no sudden darkening.
  elNear.style.transition = T + `, box-shadow ${SWIPE_NEXT_MS}ms ease`;
  elNear.style.boxShadow  = "0 40px 100px rgba(0, 0, 0, 0.44)";

  const fromIdx = S.idx;
  setTimeout(() => {
    S.idx = wrapIdx(S.idx + 1);
    Tracker.swipeNext({ from: fromIdx, to: S.idx, method: S._lastInput || "keyboard" });
    Tracker.startCardTimer(S.idx);
    render();  // restoreAllToRest clears inline box-shadow on all cards
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
  applyStyle(elPrev, "translate3d(0,0,0) rotate(0deg)",                      1, T);

  // Active recedes to near position — animates to near tilt
  applyStyle(elActive, "translate3d(0,18px,0) scale(0.965) rotate(5deg)",    1, T);

  // Near recedes to far position — animates to far tilt
  applyStyle(elNear, "translate3d(0,34px,0) scale(0.93) rotate(-5deg)",      1, T);
  applyStyle(elFar,  "translate3d(0,34px,0) scale(0.93) rotate(-5deg)",      1, T);

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
  applyStyle(elActive, "translate3d(0,0,0) rotate(0deg)",                    1, T);
  applyStyle(elNear,   "translate3d(0,18px,0) scale(0.965) rotate(5deg)",    1, T);
  applyStyle(elFar,    "translate3d(0,34px,0) scale(0.93) rotate(-5deg)",    1, T);
  applyStyle(elPrev,   "translate3d(-110vw,0,0) rotate(-18deg)",             0, T);

  setTimeout(restoreAllToRest, SNAP_MS + 30);
}

/* ── Drag (rAF-batched, no transitions while finger is down) ─── */

function dragFrame() {
  S.rafId = null;
  if (!S.dragging) return;

  const dx = S.nowX - S.startX;
  const p  = Math.min(Math.abs(dx) / 160, 1);
  const dragRot = (dx / 20).toFixed(2);

  // Active card follows finger exactly — no transition
  elActive.style.transform = `translate3d(${dx}px,0,0) rotate(${dragRot}deg)`;
  elActive.style.setProperty('--holo-angle', `${200 + (dx / window.innerWidth) * 30}deg`);

  if (dx < 0) {
    // Dragging LEFT → near: +5→0, far: -5→+5
    const nearRot = (5  - p * 5).toFixed(2);
    const farRot  = (-5 + p * 10).toFixed(2);
    elNear.style.transform = `translate3d(0,${(18 - p * 18).toFixed(1)}px,0) scale(${(0.965 + p * 0.035).toFixed(4)}) rotate(${nearRot}deg)`;
    elNear.style.opacity   = "1";
    elFar.style.transform  = `translate3d(0,${(34 - p * 16).toFixed(1)}px,0) scale(${(0.93 + p * 0.035).toFixed(4)}) rotate(${farRot}deg)`;
    elFar.style.opacity    = "1";
    elPrev.style.transform = "translate3d(-110vw,0,0) rotate(-18deg)";
    elPrev.style.opacity   = "0";
  } else {
    // Dragging RIGHT → active: 0→+5, near: +5→-5
    const offscreen  = window.innerWidth * 1.1;
    const prevX      = (-offscreen + p * offscreen).toFixed(1);
    const prevRot    = (-18 + p * 18).toFixed(2);
    const activeRot  = (p * 5).toFixed(2);
    const nearRot    = (5 - p * 10).toFixed(2);
    elPrev.style.zIndex    = "3";
    elPrev.style.transform = `translate3d(${prevX}px,0,0) rotate(${prevRot}deg)`;
    elPrev.style.opacity   = p.toFixed(3);
    elNear.style.transform = `translate3d(0,${(18 + p * 16).toFixed(1)}px,0) scale(${(0.965 - p * 0.035).toFixed(4)}) rotate(${nearRot}deg)`;
    elNear.style.opacity   = "1";
    elFar.style.transform  = "translate3d(0,34px,0) scale(0.93) rotate(-5deg)";
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
