const SEEN_KEY = 'closer_onboarding_seen';

export function initOnboarding(delayMs) {
  if (localStorage.getItem(SEEN_KEY)) return;

  const overlay = document.getElementById('onboarding-overlay');

  const timer = setTimeout(() => {
    overlay.hidden = false;
    overlay.addEventListener('click', dismiss);
    document.addEventListener('keydown', dismiss);
    document.addEventListener('touchstart', dismiss, { passive: true });
  }, delayMs);

  function dismiss() {
    clearTimeout(timer);
    overlay.classList.add('is-dismissing');
    overlay.addEventListener('animationend', () => {
      overlay.hidden = true;
    }, { once: true });
    localStorage.setItem(SEEN_KEY, '1');
    overlay.removeEventListener('click', dismiss);
    document.removeEventListener('keydown', dismiss);
    document.removeEventListener('touchstart', dismiss);
  }
}
