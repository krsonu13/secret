import confetti from 'canvas-confetti';

export const triggerConfetti = () => {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Dual cannons from both sides
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.7, x: 0.1 },
    colors: ['#ff3377', '#ffd166', '#7928ca', '#ff75a0', '#00f2fe']
  });

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.7, x: 0.9 },
    colors: ['#ff3377', '#ffd166', '#7928ca', '#ff75a0', '#00f2fe']
  });
};

export const triggerFireworks = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#ff3377', '#ffd166']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#ff75a0', '#ffffff']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#ffd166', '#7928ca']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  });
};
