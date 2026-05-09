import labels from '../data/labels.js';
import { S, KEY } from './state.js';
import { render } from './cards.js';
import { chipButtons, settingsDialog, elSettingsTitle, elTypeLabel, elMoodLabelS, elLangLabelS, elSaveBtn } from './dom.js';

// Pending state — holds unsaved selections while the modal is open
const pending = { cat: S.cat, lang: S.lang, mood: S.mood };

function syncChipUI() {
  chipButtons.forEach(b => {
    b.classList.toggle("is-active", pending[KEY[b.dataset.setting]] === b.dataset.value);
  });
}

function renderSettingsText(lang) {
  const L = labels[lang];
  elSettingsTitle.textContent = L.settingsTitle;
  elTypeLabel.textContent     = L.typeLabel;
  elMoodLabelS.textContent    = L.moodLabel;
  elLangLabelS.textContent    = L.langLabel;
  elSaveBtn.textContent       = L.save;
  chipButtons.forEach(b => {
    if (b.dataset.setting === "category" || b.dataset.setting === "mood") {
      b.textContent = L[b.dataset.value];
    }
  });
}

document.getElementById("settings-trigger").addEventListener("click", () => {
  // Reset pending to current state each time modal opens
  pending.cat  = S.cat;
  pending.lang = S.lang;
  pending.mood = S.mood;
  syncChipUI();
  renderSettingsText(pending.lang);
  Tracker.settingsOpened();
  settingsDialog.showModal();
});

chipButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    pending[KEY[btn.dataset.setting]] = btn.dataset.value;
    syncChipUI();
    if (btn.dataset.setting === "language") renderSettingsText(pending.lang);
  });
});

document.getElementById("settings-save").addEventListener("click", () => {
  const changed = S.cat !== pending.cat || S.lang !== pending.lang || S.mood !== pending.mood;
  S.cat  = pending.cat;
  S.lang = pending.lang;
  S.mood = pending.mood;
  if (changed) S.idx = 0;
  Tracker.settingsSaved({ category: S.cat, mood: S.mood, language: S.lang, changed });
  if (changed) Tracker.startCardTimer(S.idx);
  render();
  settingsDialog.close();
});
