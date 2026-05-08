# Convo Kicker

Conversation card web app. Vanilla HTML/CSS/JS, deployed on Netlify.

## Design principles

- **One thing on screen at a time.** The card is the hero; chrome is invisible.
- **Animations feel physical, not snappy.** Spring easing always; never linear.
- **Zero friction.** No sign-in, no setup, no walls between user and question.
- **Card text is the content.** No icons, badges, or decoration competing with it.
- **Mobile-first.** Thumb is the primary input.

## Don't

- Don't introduce React, Vue, or a build step. Stay vanilla.
- Don't add features behind sign-in or accounts.
- Don't modify `tracker.js` without asking first.
- Don't break the "20 questions per combination" invariant.
- Don't ship a new string without all 5 language translations.
- Don't add emoji to the UI.

## Content guidelines

- Open-ended only, never yes/no.
- Playful = light and curious. Deep = vulnerable and reflective.
- Avoid culture-specific references that translate poorly.
- Each question stands alone — no setup or context needed.

## File map

| File | Role |
|------|------|
| `index.html` | Shell and DOM structure only; no logic |
| `script.js` | All app logic: deck data, state, animation, events, settings |
| `styles.css` | All styling; theming via CSS custom properties |
| `tracker.js` | Client-side analytics (localStorage only, no external calls) |

`tracker.js` must load before `script.js` — `script.js` calls `Tracker.*` directly.

## Data model

`decks[language][category][mood]` → array of 20 questions.

- **Languages:** `english`, `indonesian`, `chinese`, `japanese`, `korean`
- **Categories:** `lovers`, `friends`
- **Moods:** `playful`, `deep`

Every combination must have exactly 20 questions. When adding or editing questions, all 5 languages must be updated together.

`labels[language]` holds all UI strings for that language — settings panel headings, chip labels, footer text. Add a key here whenever adding a translatable string.

## App state

The `S` object in `script.js` is the single source of truth:

| Field | Purpose |
|-------|---------|
| `lang`, `cat`, `mood` | Current language / category / mood selection |
| `idx` | Index into the current deck |
| `busy` | `true` during any animation; gates all swipe input |
| `dragging`, `startX`, `nowX`, `rafId` | rAF-batched drag tracking |

Settings changes are staged in a `pending` object and only committed to `S` when the user taps Save. Changing category or mood resets `idx` to `0`.

## Card DOM and z-index layers

Four `<article>` elements form the stack at all times:

| Element | Class | z-index | Role |
|---------|-------|---------|------|
| `card-prev` | `return-card` | 3 | Previous card, parked off-screen left; used by `goPrev` |
| `card-one` | `active-card` | 2 | Front card — the one the user reads and drags |
| `card-two` | `preview-card-near` | 1 | Next card (near peek) |
| `card-three` | `preview-card-far` | 0 | Card after next (far peek) |

`restoreAllToRest()` strips all inline styles and returns every card to its CSS-class-driven resting position. Call it after any animation settles.

## Animation conventions

- **`goNext`** — active flies left, near/far rise. Commit is via `setTimeout`, not `transitionend`. `transitionend` silently misfires on `pointer-events:none` / `opacity:0` elements; don't switch back to it.
- **`goPrev`** — prev card slides back in from the left; active and near recede.
- **`snapBack`** — used when drag distance < 80 px threshold.
- **Intro on load** — three-card cascade using overshoot spring `cubic-bezier(0.34, 1.4, 0.64, 1)`. `S.busy` is held `true` for the full duration so no swipes interrupt.
- Spring easing for entrances/exits: `cubic-bezier(0.34, 1.4, 0.64, 1)`. Smooth ease-out for in-progress drag completion: `cubic-bezier(0.25, 1, 0.5, 1)`. Never use `linear` or `ease`.

## Theming

The theme is driven by `body[data-theme]`, set in `render()` whenever `S.cat` changes.

- `lovers` — rose/pink gradient (`#c73c71` → `#842d54`)
- `friends` — blue gradient (`#3a77d9` → `#214783`)

Both share the same dark background. All color tokens are CSS custom properties in `:root`; the `friends` override block only redefines the tokens that differ.

## Analytics

`tracker.js` is a self-contained IIFE that exposes a `Tracker` global. All data stays in `localStorage` — no external requests are ever made.

| localStorage key | Contents |
|-----------------|----------|
| `closer_analytics` | All finalized past sessions |
| `closer_session` | Current in-progress session (written every 5 events) |
| `closer_test_mode` | `"test"` or `"live"` |

**Test mode** — activate via `?mode=test` URL param, `Ctrl+Shift+T` toggle, or `Tracker.setMode("test")` in the console. A yellow `TEST` badge appears in the corner. Test sessions can be filtered out of exports with `Tracker.export("live")`.

Sessions finalize on `visibilitychange` (hidden) — more reliable than `beforeunload` on mobile.

Useful console commands:
```js
Tracker.debug()            // print summary
Tracker.export("live")     // export only real-user sessions
Tracker.clear("test")      // wipe test data
Tracker.getAllSessions()   // all sessions as an array
```

## Deployment

No build step. Edit files and push; Netlify deploys automatically.

**Cache-busting is manual.** Bump `?v=N` on the relevant `<link>` or `<script>` tag in `index.html` whenever deploying a CSS or JS change.
