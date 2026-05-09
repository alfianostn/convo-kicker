export const cardStack    = document.getElementById("card-stack");
export const elActive     = document.getElementById("card-one");    // current      z-index: 2
export const elNear       = document.getElementById("card-two");    // next +1       z-index: 1
export const elFar        = document.getElementById("card-three");  // next +2       z-index: 0
export const elPrev       = document.getElementById("card-prev");   // previous -1   z-index: 3 (always on top)

export const categoryLabel  = document.getElementById("category-label");
export const languageLabel  = document.getElementById("language-label");
export const moodLabel      = document.getElementById("mood-label");
export const settingsDialog = document.getElementById("settings-dialog");
export const chipButtons    = Array.from(document.querySelectorAll(".chip"));

export const elSettingsTitle = document.querySelector(".settings-title");
export const elTypeLabel     = document.getElementById("type-label");
export const elMoodLabelS    = document.getElementById("mood-label-settings");
export const elLangLabelS    = document.getElementById("language-label-settings");
export const elSaveBtn       = document.getElementById("settings-save");
