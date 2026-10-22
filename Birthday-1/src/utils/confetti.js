import confetti from 'canvas-confetti';

// Magical color palette (Rose gold, Magenta, Celestial Gold, Lavender, Turquoise)
const COLORS = ['#ff758c', '#ff7eb3', '#f6d365', '#a855f7', '#38bdf8', '#fb7185', '#ffd700'];

/**
 * Standard celebratory side cannons burst
 */
export const launchCelebrationConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: COLORS,
    disableForReducedMotion: true,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};

/**
 * Candle blow celebration radial burst
 */
export const launchCandleBlownConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.55 },
    colors: ['#ffd700', '#ff9a9e', '#fecfef', '#a18cd1', '#fbc2eb'],
    scalar: 1.1,
    shapes: ['circle', 'square'],
  });
};

/**
 * Hearts and stars explosion
 */
export const launchHeartShower = () => {
  const end = Date.now() + 2.5 * 1000;
  const colors = ['#ff4d6d', '#ff758f', '#ff85a1', '#f72585', '#b5179e'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

/**
 * Grand Finale Fireworks simulation
 */
export const launchGrandFinale = () => {
  const duration = 6 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 60 * (timeLeft / duration);

    // left burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: COLORS,
    });

    // right burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: COLORS,
    });
  }, 250);
};
