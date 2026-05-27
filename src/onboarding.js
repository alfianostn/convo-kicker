const SEEN_KEY = 'closer_onboarding_seen';

export function initOnboarding(delayMs) {
  if (localStorage.getItem(SEEN_KEY)) return;

  const toast = document.getElementById('onboarding-overlay');
  let autoTimer = null;

  const showTimer = setTimeout(() => {
    toast.hidden = false;
    // Auto-dismiss after 4s, or on first interaction — whichever comes first
    autoTimer = setTimeout(dismiss, 6000);
    document.addEventListener('keydown',    dismiss, { once: true });
    document.addEventListener('touchstart', dismiss, { once: true, passive: true });
    document.addEventListener('pointerdown', dismiss, { once: true });
  }, delayMs);

  function dismiss() {
    clearTimeout(showTimer);
    clearTimeout(autoTimer);
    document.removeEventListener('keydown',    dismiss);
    document.removeEventListener('touchstart', dismiss);
    document.removeEventListener('pointerdown', dismiss);

    toast.classList.add('is-dismissing');
    toast.addEventListener('animationend', () => {
      toast.hidden = true;
    }, { once: true });
    localStorage.setItem(SEEN_KEY, '1');
  }
}
