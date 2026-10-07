/* ==========================================================
   VAISHNAVI'S BIRTHDAY EXTRAVAGANZA - JAVASCRIPT ENGINE
   ========================================================== */

// --- 1. WEB AUDIO API SYNTHESIZER (MUSIC & SOUND FX) ---
class SoundController {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimeout = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration, type = 'sine', volume = 0.15) {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio error:', e);
    }
  }

  // Sound FX: Party Popper
  playPop() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);

    setTimeout(() => {
      this.playTone(523.25, 0.2, 'sine', 0.2);
      setTimeout(() => this.playTone(659.25, 0.2, 'sine', 0.2), 60);
      setTimeout(() => this.playTone(783.99, 0.3, 'sine', 0.2), 120);
    }, 40);
  }

  // Sound FX: Candle Blow Out
  playBlow() {
    this.init();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  // Sound FX: Cheer Chime
  playCheer() {
    this.init();
    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.4, 'triangle', 0.25);
      }, idx * 75);
    });
  }

  // Sound FX: Sparkle / Unbox Chime
  playSparkle() {
    this.init();
    const notes = [783.99, 880, 987.77, 1174.66, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.25, 'sine', 0.15);
      }, idx * 60);
    });
  }

  // SOUNDBOARD: Dramatic Bollywood Zoom (Dhoom Tana Suspense Clash)
  playDramaticDhoom() {
    this.init();
    if (!this.ctx) return;
    // Dissonant dramatic hit: Low C + sharp C# + ominous vibrato
    const freqs = [130.81, 138.59, 261.63, 277.18];
    freqs.forEach(f => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    });
  }

  // SOUNDBOARD: MLG Airhorn Blast
  playAirhorn() {
    this.init();
    if (!this.ctx) return;
    const hornPitches = [466.16, 466.16, 466.16, 622.25]; // Bb4, Bb4, Bb4, Eb5
    const delays = [0, 0.14, 0.28, 0.42];

    delays.forEach((delay, idx) => {
      setTimeout(() => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(hornPitches[idx], this.ctx.currentTime);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
      }, delay * 1000);
    });
  }

  // SOUNDBOARD: Cartoon Boing
  playBoing() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  // SOUNDBOARD: Emotional Damage Sub-Drop
  playEmotionalDamage() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.8);
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }

  // Happy Birthday Chiptune / Music Box Melody
  startBirthdayMusic() {
    this.init();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    const melody = [
      { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.2 }, { f: 293.66, d: 0.5 },
      { f: 261.63, d: 0.5 }, { f: 349.23, d: 0.5 }, { f: 329.63, d: 0.8 },
      { f: 0, d: 0.2 },
      { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.2 }, { f: 293.66, d: 0.5 },
      { f: 261.63, d: 0.5 }, { f: 392.00, d: 0.5 }, { f: 349.23, d: 0.8 },
      { f: 0, d: 0.2 },
      { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.2 }, { f: 523.25, d: 0.5 },
      { f: 440.00, d: 0.5 }, { f: 349.23, d: 0.5 }, { f: 329.63, d: 0.5 },
      { f: 293.66, d: 0.8 }, { f: 0, d: 0.2 },
      { f: 466.16, d: 0.3 }, { f: 466.16, d: 0.2 }, { f: 440.00, d: 0.5 },
      { f: 349.23, d: 0.5 }, { f: 392.00, d: 0.5 }, { f: 349.23, d: 1.0 },
      { f: 0, d: 0.8 }
    ];

    let noteIndex = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;

      const note = melody[noteIndex];
      if (note.f > 0) {
        this.playTone(note.f, note.d * 0.9, 'triangle', 0.12);
        this.playTone(note.f * 1.5, note.d * 0.8, 'sine', 0.04);
      }

      noteIndex = (noteIndex + 1) % melody.length;
      this.musicTimeout = setTimeout(playNext, note.d * 1000);
    };

    playNext();
  }

  stopBirthdayMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopBirthdayMusic();
      return false;
    } else {
      this.startBirthdayMusic();
      return true;
    }
  }
}

const sounds = new SoundController();

// --- 2. HIGH PERFORMANCE CONFETTI ENGINE (HTML5 CANVAS) ---
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  shoot(opts = {}) {
    const count = opts.count || 80;
    const originX = opts.x !== undefined ? opts.x : window.innerWidth / 2;
    const originY = opts.y !== undefined ? opts.y : window.innerHeight / 2;
    const colors = ['#ff0077', '#ff758c', '#ffd166', '#06d6a0', '#118ab2', '#7928ca', '#ff9f1c'];

    for (let i = 0; i < count; i++) {
      const angle = (opts.spread !== undefined)
        ? opts.angle + (Math.random() - 0.5) * opts.spread
        : Math.random() * Math.PI * 2;
      const speed = opts.speed ? opts.speed * (0.6 + Math.random() * 0.8) : 5 + Math.random() * 12;

      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 7 + Math.random() * 8,
        tilt: Math.random() * 10,
        tiltAngle: Math.random() * Math.PI * 2,
        tiltSpeed: 0.08 + Math.random() * 0.08,
        alpha: 1,
        gravity: 0.22,
        drag: 0.96
      });
    }

    if (!this.animationId) {
      this.render();
    }
  }

  blastCannons() {
    this.shoot({
      x: 0,
      y: window.innerHeight * 0.7,
      angle: -Math.PI / 4,
      spread: Math.PI / 3,
      speed: 16,
      count: 90
    });
    this.shoot({
      x: window.innerWidth,
      y: window.innerHeight * 0.7,
      angle: -Math.PI * 0.75,
      spread: Math.PI / 3,
      speed: 16,
      count: 90
    });
    this.shoot({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.5,
      count: 70,
      speed: 12
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.tiltAngle += p.tiltSpeed;
      p.tilt = Math.sin(p.tiltAngle) * 12;
      p.alpha -= 0.007;

      if (p.alpha <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.tiltAngle);
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * (Math.abs(p.tilt) / 12));
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.render());
    } else {
      this.animationId = null;
    }
  }
}

const confetti = new ConfettiEngine('confettiCanvas');

// --- 3. PHOTO MANAGER & MULTI-LAYER INJECTION ---
class PhotoManager {
  constructor() {
    this.photos = [];
    this.primaryPhoto = null;
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      this.photos = JSON.parse(localStorage.getItem('vaishnavi_user_photos') || '[]');
      this.primaryPhoto = localStorage.getItem('vaishnavi_hero_photo') || (this.photos[0] || null);
    } catch (e) {
      console.log('Storage read error', e);
    }
  }

  addPhotos(newPhotosList) {
    if (!newPhotosList || newPhotosList.length === 0) return;
    this.photos = [...newPhotosList, ...this.photos];
    if (!this.primaryPhoto) {
      this.primaryPhoto = newPhotosList[0];
    }
    try {
      localStorage.setItem('vaishnavi_user_photos', JSON.stringify(this.photos.slice(0, 15)));
      localStorage.setItem('vaishnavi_hero_photo', this.primaryPhoto);
    } catch (e) {
      console.log('Storage limit reached');
    }
    this.applyPhotosToAllLayers();
  }

  setPrimaryPhoto(src) {
    this.primaryPhoto = src;
    localStorage.setItem('vaishnavi_hero_photo', src);
    this.applyPhotosToAllLayers();
  }

  applyPhotosToAllLayers() {
    const photo = this.primaryPhoto;
    if (!photo) return;

    // 1. Hero Avatar
    const heroImg = document.getElementById('heroAvatarImg');
    const heroPlaceholder = document.getElementById('heroAvatarPlaceholder');
    if (heroImg && heroPlaceholder) {
      heroImg.src = photo;
      heroImg.classList.remove('hidden');
      heroPlaceholder.classList.add('hidden');
    }

    // 2. Gate Avatar
    const gateAvatar = document.getElementById('gateAvatarBox');
    if (gateAvatar) {
      gateAvatar.style.backgroundImage = `url('${photo}')`;
      gateAvatar.style.backgroundSize = 'cover';
      gateAvatar.style.backgroundPosition = 'center';
      const gateEmoji = document.getElementById('gateAvatarEmoji');
      if (gateEmoji) gateEmoji.style.display = 'none';
    }

    // 3. Sibling Meme Studio (Inject into all meme cards)
    const memeFaces = document.querySelectorAll('.meme-custom-face');
    const memePlaceholders = document.querySelectorAll('.placeholder-face');
    memeFaces.forEach(img => {
      img.src = photo;
      img.classList.remove('hidden');
    });
    memePlaceholders.forEach(pl => {
      pl.classList.add('hidden');
    });

    // 4. 3D Rotating Carousel Slots
    const slots = document.querySelectorAll('.gallery-slot');
    const placeholders = document.querySelectorAll('.panel-placeholder');
    slots.forEach((slot, index) => {
      const currentPhoto = this.photos[index % this.photos.length] || photo;
      slot.src = currentPhoto;
      slot.classList.remove('hidden');
      if (placeholders[index]) placeholders[index].classList.add('hidden');
    });

    // 5. Sticker Booth Background
    const boothImg = document.getElementById('boothBgImg');
    const boothPl = document.getElementById('boothPlaceholder');
    if (boothImg && boothPl) {
      boothImg.src = photo;
      boothImg.classList.remove('hidden');
      boothPl.classList.add('hidden');
    }
  }

  initUploadHandlers() {
    const readAndAddFiles = (fileList) => {
      const files = Array.from(fileList);
      let count = 0;
      const results = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          results.push(e.target.result);
          count++;
          if (count === files.length) {
            this.addPhotos(results);
            sounds.playCheer();
            confetti.blastCannons();
            alert("🎉 Awesome! Vaishnavi's photos are now loaded across all memes, 3D gallery, and sticker booth!");
          }
        };
        reader.readAsDataURL(file);
      });
    };

    // Master upload bar
    const masterUpload = document.getElementById('masterPhotoUpload');
    if (masterUpload) {
      masterUpload.addEventListener('change', (e) => readAndAddFiles(e.target.files));
    }

    // Hero single upload
    const heroUpload = document.getElementById('singleHeroUpload');
    if (heroUpload) {
      heroUpload.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (ev) => this.setPrimaryPhoto(ev.target.result);
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }

    // Meme studio upload
    const memeUpload = document.getElementById('memePhotoUpload');
    if (memeUpload) {
      memeUpload.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            this.setPrimaryPhoto(ev.target.result);
            sounds.playPop();
            confetti.shoot({ x: window.innerWidth / 2, y: window.innerHeight / 2, count: 50 });
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }

    // Booth photo input
    const boothUpload = document.getElementById('boothPhotoInput');
    if (boothUpload) {
      boothUpload.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const boothImg = document.getElementById('boothBgImg');
            const boothPl = document.getElementById('boothPlaceholder');
            boothImg.src = ev.target.result;
            boothImg.classList.remove('hidden');
            boothPl.classList.add('hidden');
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });
    }

    // Check if default files exist in images/ directory
    const checkImageFolder = (url, callback) => {
      const img = new Image();
      img.onload = () => callback(true);
      img.onerror = () => callback(false);
      img.src = url;
    };

    checkImageFolder('images/hero.jpg', (exists) => {
      if (exists && !this.primaryPhoto) {
        this.setPrimaryPhoto('images/hero.jpg');
      }
    });
  }
}

const photoManager = new PhotoManager();

// --- 4. 3D ROTATING PHOTO CYLINDER / CAROUSEL ---
class Carousel3DController {
  constructor() {
    this.stage = document.getElementById('carousel3dStage');
    this.prevBtn = document.getElementById('cNavPrev');
    this.nextBtn = document.getElementById('cNavNext');
    this.autoBtn = document.getElementById('cNavAuto');
    this.currentAngle = 0;
    this.isAutoSpinning = true;
    this.autoInterval = null;
  }

  init() {
    if (!this.stage) return;

    this.prevBtn.addEventListener('click', () => {
      this.rotate(60);
      sounds.playTone(587.33, 0.1, 'sine', 0.15);
    });

    this.nextBtn.addEventListener('click', () => {
      this.rotate(-60);
      sounds.playTone(659.25, 0.1, 'sine', 0.15);
    });

    this.autoBtn.addEventListener('click', () => {
      this.isAutoSpinning = !this.isAutoSpinning;
      this.autoBtn.textContent = this.isAutoSpinning ? '⏸️ Pause Spin' : '▶️ Resume Spin';
      if (this.isAutoSpinning) this.startAutoSpin();
      else clearInterval(this.autoInterval);
    });

    // Mouse / Touch Drag support
    let startX = 0;
    let isDragging = false;
    const wrapper = document.querySelector('.carousel-3d-wrapper');

    wrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });
    wrapper.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const delta = e.clientX - startX;
      if (Math.abs(delta) > 40) {
        this.rotate(delta > 0 ? 60 : -60);
        startX = e.clientX;
      }
    });

    this.startAutoSpin();
  }

  rotate(delta) {
    this.currentAngle += delta;
    this.stage.style.transform = `rotateY(${this.currentAngle}deg)`;
  }

  startAutoSpin() {
    clearInterval(this.autoInterval);
    this.autoInterval = setInterval(() => {
      if (this.isAutoSpinning) {
        this.rotate(-60);
      }
    }, 3500);
  }
}

// --- 5. "DECORATE VAISHNAVI" STICKER PHOTO BOOTH ---
function initStickerBooth() {
  const stage = document.getElementById('boothStage');
  const stickerTools = document.querySelectorAll('.sticker-tool');
  const clearBtn = document.getElementById('clearStickersBtn');

  stickerTools.forEach(tool => {
    tool.addEventListener('click', () => {
      const stickerChar = tool.getAttribute('data-sticker');
      addStickerToStage(stickerChar);
      sounds.playSparkle();
    });
  });

  function addStickerToStage(char) {
    const el = document.createElement('div');
    el.className = 'drag-sticker';
    el.textContent = char;
    el.style.left = `${40 + Math.random() * 20}%`;
    el.style.top = `${30 + Math.random() * 20}%`;

    // Drag logic
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const onDown = (clientX, clientY) => {
      isDragging = true;
      startX = clientX;
      startY = clientY;
      initialLeft = el.offsetLeft;
      initialTop = el.offsetTop;
    };

    const onMove = (clientX, clientY) => {
      if (!isDragging) return;
      const dx = clientX - startX;
      const dy = clientY - startY;
      el.style.left = `${initialLeft + dx}px`;
      el.style.top = `${initialTop + dy}px`;
    };

    const onUp = () => { isDragging = false; };

    el.addEventListener('mousedown', (e) => {
      onDown(e.clientX, e.clientY);
      e.stopPropagation();
    });
    window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onUp);

    // Touch support
    el.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      onDown(touch.clientX, touch.clientY);
      e.stopPropagation();
    });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      onMove(touch.clientX, touch.clientY);
    });
    window.addEventListener('touchend', onUp);

    stage.appendChild(el);
  }

  clearBtn.addEventListener('click', () => {
    const stickers = stage.querySelectorAll('.drag-sticker');
    stickers.forEach(s => s.remove());
    sounds.playTone(400, 0.1, 'sine', 0.1);
  });
}

// --- 6. DRAMA SOUNDBOARD ---
function initSoundboard() {
  document.getElementById('sbDhoom')?.addEventListener('click', () => sounds.playDramaticDhoom());
  document.getElementById('sbAirhorn')?.addEventListener('click', () => sounds.playAirhorn());
  document.getElementById('sbBoing')?.addEventListener('click', () => sounds.playBoing());
  document.getElementById('sbDamage')?.addEventListener('click', () => sounds.playEmotionalDamage());
}

// --- 7. AMBIENT FLOATING EMOJIS ---
function initAmbientEmojis() {
  const container = document.getElementById('floatingEmojis');
  const emojis = ['🎈', '✨', '🎂', '💖', '🎁', '🌸', '👑', '🥳', '🧁', '⭐'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'floating-item';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = `${Math.random() * 95}%`;
    el.style.animationDuration = `${10 + Math.random() * 10}s`;
    el.style.animationDelay = `${Math.random() * 10}s`;
    el.style.fontSize = `${1.4 + Math.random() * 1.5}rem`;
    container.appendChild(el);
  }
}

// --- 8. LAYER 0: IDENTITY VERIFICATION GATE ---
function initGateModal() {
  const gateOverlay = document.getElementById('gateOverlay');
  const passYesBtn = document.getElementById('passYesBtn');
  const passNoBtn = document.getElementById('passNoBtn');
  const visualizer = document.getElementById('musicVisualizer');

  const enterCelebration = (isYes) => {
    gateOverlay.classList.add('hidden');
    sounds.playPop();
    confetti.blastCannons();
    sounds.startBirthdayMusic();
    visualizer.classList.add('playing');

    if (!isYes) {
      alert("Verification Overridden! Brotherly AI confirms: You are indeed the Drama Queen! Welcome Vaishnavi! 🎉");
    }
  };

  passYesBtn.addEventListener('click', () => enterCelebration(true));
  passNoBtn.addEventListener('click', () => enterCelebration(false));
}

// --- 9. AUDIO PILL CONTROLS ---
function initAudioControls() {
  const toggleMusicBtn = document.getElementById('toggleMusicBtn');
  const confettiCannonBtn = document.getElementById('confettiCannonBtn');
  const visualizer = document.getElementById('musicVisualizer');

  toggleMusicBtn.addEventListener('click', () => {
    const isPlaying = sounds.toggleMusic();
    if (isPlaying) {
      visualizer.classList.add('playing');
    } else {
      visualizer.classList.remove('playing');
    }
  });

  confettiCannonBtn.addEventListener('click', () => {
    sounds.playPop();
    confetti.blastCannons();
  });

  const finalBlastBtn = document.getElementById('finalBlastBtn');
  if (finalBlastBtn) {
    finalBlastBtn.addEventListener('click', () => {
      sounds.playPop();
      confetti.blastCannons();
      sounds.playCheer();
    });
  }
}

// --- 10. LAYER 1: INTERACTIVE BIRTHDAY CAKE ---
function initCakeInteraction() {
  const cake = document.getElementById('birthdayCake');
  const blowBtn = document.getElementById('blowCandlesBtn');
  const blowText = document.getElementById('blowBtnText');
  const flames = [
    document.getElementById('flame1'),
    document.getElementById('flame2'),
    document.getElementById('flame3')
  ];
  const smokes = [
    document.getElementById('smoke1'),
    document.getElementById('smoke2'),
    document.getElementById('smoke3')
  ];
  const wishMessage = document.getElementById('wishMessageReveal');

  let areCandlesBlown = false;

  const blowOutCandles = () => {
    if (!areCandlesBlown) {
      flames.forEach(f => f.classList.add('extinguished'));
      smokes.forEach(s => {
        s.classList.remove('active');
        void s.offsetWidth;
        s.classList.add('active');
      });

      sounds.playBlow();
      setTimeout(() => {
        sounds.playCheer();
        confetti.blastCannons();
      }, 300);

      wishMessage.classList.remove('hidden');
      blowText.textContent = "Re-light Candles 🕯️";
      areCandlesBlown = true;
    } else {
      flames.forEach(f => f.classList.remove('extinguished'));
      wishMessage.classList.add('hidden');
      blowText.textContent = "Tap to Blow Candles!";
      sounds.playSparkle();
      areCandlesBlown = false;
    }
  };

  cake.addEventListener('click', blowOutCandles);
  blowBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    blowOutCandles();
  });
}

// --- 11. LAYER 2: MEME FILTER & REACTIONS ---
function initMemeSection() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const memeCards = document.querySelectorAll('.meme-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      memeCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      sounds.playTone(600, 0.08, 'sine', 0.1);
    });
  });

  const reactionChips = document.querySelectorAll('.reaction-chip');
  reactionChips.forEach(chip => {
    chip.addEventListener('click', function() {
      const countSpan = this.querySelector('span');
      let current = parseInt(this.getAttribute('data-count') || countSpan.textContent);
      if (!this.classList.contains('voted')) {
        current += 1;
        this.classList.add('voted');
        this.setAttribute('data-count', current);
        countSpan.textContent = current;
        sounds.playTone(880, 0.15, 'triangle', 0.2);
        confetti.shoot({
          x: this.getBoundingClientRect().left + 20,
          y: this.getBoundingClientRect().top,
          count: 15,
          speed: 6
        });
      }
    });
  });
}

// --- 12. LAYER 3: AWARDS & TROPHIES ---
function initAwards() {
  const claimBtns = document.querySelectorAll('.claim-badge-btn');
  claimBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.add('claimed');
      this.textContent = "Claimed! 🌟";
      sounds.playSparkle();
      const rect = this.getBoundingClientRect();
      confetti.shoot({
        x: rect.left + rect.width / 2,
        y: rect.top,
        count: 25,
        speed: 8
      });
    });
  });
}

// --- 13. LAYER 4: POLAROID SCRAPBOOK ---
function initScrapbook() {
  const uploadInput = document.getElementById('photoUploadInput');
  const board = document.getElementById('polaroidBoard');

  uploadInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoSrc = event.target.result;
        addPolaroidCard(photoSrc, "Cutest Birthday Sister! 📸", true);
      };
      reader.readAsDataURL(file);
    });
  });

  function addPolaroidCard(imgSrc, captionText, save = true) {
    const pin = document.createElement('div');
    const tilts = ['tilt-left', 'tilt-right', 'tilt-straight', 'tilt-left-subtle'];
    const randomTilt = tilts[Math.floor(Math.random() * tilts.length)];
    pin.className = `polaroid-pin ${randomTilt}`;

    pin.innerHTML = `
      <div class="tape-strip"></div>
      <div class="polaroid-frame">
        <div class="polaroid-photo" style="background-image: url('${imgSrc}');"></div>
        <div class="polaroid-caption">"${captionText}"</div>
      </div>
    `;

    board.prepend(pin);
    sounds.playTone(659.25, 0.15, 'sine', 0.2);
  }
}

// --- 14. LAYER 5: SIBLING QUIZ MINI-GAME ---
function initQuiz() {
  const quizData = [
    {
      q: "What is Vaishnavi's official #1 daily superpower?",
      options: [
        { text: "Stealing Bhaiya's food with zero regrets", correct: true, meme: "🍕😋", reaction: "BULLSEYE! Literally takes 90% of all treats!" },
        { text: "Arriving on time whenever someone is waiting", correct: false, meme: "⏰😂", reaction: "Hahaha false! 5 minutes = 1 hour in Vaishnavi time!" },
        { text: "Never complaining or showing drama", correct: false, meme: "🎭🤣", reaction: "Zero drama? Who are you kidding?!" }
      ]
    },
    {
      q: "When Vaishnavi says 'I will return it in 2 minutes', what really happens?",
      options: [
        { text: "It is returned immediately with gratitude", correct: false, meme: "🧐❌", reaction: "In a parallel universe, maybe!" },
        { text: "It has officially been absorbed into her wardrobe forever", correct: true, meme: "👕🔒", reaction: "Correct! That hoodie is gone forever!" },
        { text: "She sells it on eBay", correct: false, meme: "📦😂", reaction: "Not quite, but close enough!" }
      ]
    },
    {
      q: "Why is Vaishnavi undisputed best sister in the world?",
      options: [
        { text: "She brings boundless smiles, laughs, and pure joy into our family", correct: true, meme: "💖🌟", reaction: "1000% FACTS! The family is incomplete without you!" },
        { text: "Because she bribed Bhaiya to make this site", correct: false, meme: "💸😜", reaction: "Bribed? She's the one demanding presents!" },
        { text: "All of the above combined with maximum cuteness", correct: true, meme: "👑🥰", reaction: "YES! Truly the greatest little sister ever!" }
      ]
    }
  ];

  let currentQ = 0;
  let score = 0;

  const qCard = document.getElementById('questionCard');
  const qTitle = document.getElementById('qTitle');
  const qOptions = document.getElementById('qOptions');
  const qCountText = document.getElementById('qCountText');
  const qBarFill = document.getElementById('qBarFill');
  const qFeedback = document.getElementById('qFeedback');
  const feedbackMeme = document.getElementById('feedbackMeme');
  const feedbackText = document.getElementById('feedbackText');
  const nextBtn = document.getElementById('nextQuestionBtn');
  const resultCard = document.getElementById('quizResultCard');
  const restartBtn = document.getElementById('restartQuizBtn');
  const quizScoreText = document.getElementById('quizScoreText');

  function renderQuestion(idx) {
    const data = quizData[idx];
    qCountText.textContent = `Question ${idx + 1} of ${quizData.length}`;
    qBarFill.style.width = `${((idx + 1) / quizData.length) * 100}%`;
    qTitle.textContent = data.q;
    qOptions.innerHTML = '';
    qFeedback.classList.add('hidden');

    data.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'q-opt-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => handleOptionClick(opt, btn));
      qOptions.appendChild(btn);
    });
  }

  function handleOptionClick(opt, chosenBtn) {
    const allBtns = qOptions.querySelectorAll('.q-opt-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (opt.correct) {
      chosenBtn.classList.add('correct');
      score++;
      sounds.playCheer();
    } else {
      chosenBtn.classList.add('wrong');
      sounds.playTone(200, 0.2, 'sawtooth', 0.2);
    }

    feedbackMeme.textContent = opt.meme;
    feedbackText.textContent = opt.reaction;
    qFeedback.classList.remove('hidden');
  }

  nextBtn.addEventListener('click', () => {
    currentQ++;
    if (currentQ < quizData.length) {
      renderQuestion(currentQ);
    } else {
      qCard.classList.add('hidden');
      resultCard.classList.remove('hidden');
      quizScoreText.textContent = `Score: ${score}/${quizData.length} Sibling Bond Master!`;
      sounds.playCheer();
      confetti.blastCannons();
    }
  });

  restartBtn.addEventListener('click', () => {
    currentQ = 0;
    score = 0;
    qCard.classList.remove('hidden');
    resultCard.classList.add('hidden');
    renderQuestion(0);
  });

  renderQuestion(0);
}

// --- 15. LAYER 6: VIRTUAL GIFT BOX & VOUCHERS ---
function initGiftBox() {
  const giftWrapper = document.getElementById('giftBoxWrapper');
  const giftInstruction = document.getElementById('giftInstruction');
  const vouchersContainer = document.getElementById('vouchersContainer');
  let isOpened = false;

  giftWrapper.addEventListener('click', () => {
    if (!isOpened) {
      giftWrapper.classList.add('opened');
      sounds.playSparkle();
      confetti.blastCannons();
      giftInstruction.textContent = "🎉 Gift Unwrapped! Check your official vouchers below:";
      vouchersContainer.classList.remove('hidden');
      isOpened = true;
    }
  });
}

// --- 16. LAYER 7: WAX-SEALED LETTER ---
function initWaxLetter() {
  const envelopeOuter = document.getElementById('envelopeOuter');
  const waxSeal = document.getElementById('waxSeal');
  const letterPaper = document.getElementById('letterPaper');

  const openLetter = () => {
    envelopeOuter.classList.add('opened');
    sounds.playSparkle();
    confetti.shoot({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.6,
      count: 40
    });
    setTimeout(() => {
      letterPaper.classList.remove('hidden');
    }, 400);
  };

  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    openLetter();
  });
  envelopeOuter.addEventListener('click', openLetter);
}

// --- INITIALIZE EVERYTHING ON DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  initAmbientEmojis();
  initGateModal();
  initAudioControls();
  photoManager.initUploadHandlers();
  photoManager.applyPhotosToAllLayers();
  
  const carousel3D = new Carousel3DController();
  carousel3D.init();

  initStickerBooth();
  initSoundboard();
  initCakeInteraction();
  initMemeSection();
  initAwards();
  initScrapbook();
  initQuiz();
  initGiftBox();
  initWaxLetter();
});
