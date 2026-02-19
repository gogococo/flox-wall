let lastCount = 0;

const FIREWORK_COLORS = ['#ff00cc', '#00ffff', '#fef3a0', '#f5c518', '#ffffff', '#38bdf8'];

const CHALK_FONTS = ["'Caveat', cursive", "'Kalam', cursive", "'Patrick Hand', cursive"];
const PAINT_FONTS = ["'Permanent Marker', cursive", "'Pacifico', cursive"];

const CHALK_VARIANTS = [
  { color: '#fef3a0', glow: '#f5c518',  soft: 'rgba(245,197,24,0.25)'   }, // butter yellow
  { color: '#c7eeff', glow: '#38bdf8',  soft: 'rgba(56,189,248,0.25)'   }, // sky blue
  { color: '#eac7ff', glow: '#a855f7',  soft: 'rgba(168,85,247,0.25)'   }, // soft purple
];

const PAINT_GRADIENTS = [
  'linear-gradient(45deg,  #ff00cc, #00ffff)',   // magenta → cyan
  'linear-gradient(45deg,  #ff0040, #ff8c00)',   // red → orange  (fire)
  'linear-gradient(45deg,  #00ff7f, #ffff00)',   // green → yellow (toxic)
  'linear-gradient(135deg, #8b00ff, #ff00cc)',   // deep purple → magenta (UV)
  'linear-gradient(45deg,  #ffd700, #ff6b00)',   // gold → orange
  'linear-gradient(45deg,  #00ffff, #0080ff)',   // cyan → blue (electric)
];

const messageStyles = new Map();

function getStyle(entry) {
  const key = entry.handle + '|' + entry.message;
  if (!messageStyles.has(key)) {
    const isChalk = Math.random() > 0.45;
    const fonts   = isChalk ? CHALK_FONTS : PAINT_FONTS;
    const chalk  = CHALK_VARIANTS[Math.floor(Math.random() * CHALK_VARIANTS.length)];
    const gradient = PAINT_GRADIENTS[Math.floor(Math.random() * PAINT_GRADIENTS.length)];
    messageStyles.set(key, {
      isChalk,
      font:         fonts[Math.floor(Math.random() * fonts.length)],
      rotation:     Math.floor(Math.random() * 26 - 13),
      fontSize:     (1.05 + Math.random() * 0.55).toFixed(2) + 'em',
      marginTop:    Math.floor(Math.random() * 35) + 'px',
      swayDur:      (5 + Math.random() * 3).toFixed(1) + 's',
      swayDelay:    (Math.random() * 2).toFixed(1) + 's',
      chalkColor:   chalk.color,
      chalkGlow:    chalk.glow,
      chalkSoft:    chalk.soft,
      paintGradient: gradient,
    });
  }
  return messageStyles.get(key);
}

function renderEntry(entry, wall) {
  const s   = getStyle(entry);
  const div = document.createElement("div");
  div.className = "message " + (s.isChalk ? "chalk" : "paint");

  div.style.fontFamily        = s.font;
  div.style.fontSize          = s.fontSize;
  div.style.marginTop         = s.marginTop;
  div.style.animationDuration = s.swayDur;
  div.style.animationDelay    = s.swayDelay;
  div.style.setProperty('--rot',             s.rotation + 'deg');
  div.style.setProperty('--chalk-color',     s.chalkColor);
  div.style.setProperty('--chalk-glow',      s.chalkGlow);
  div.style.setProperty('--chalk-glow-soft', s.chalkSoft);
  div.style.setProperty('--paint-gradient',  s.paintGradient);

  div.innerHTML = `<strong>${entry.handle}</strong><br/>${entry.message}`;
  wall.appendChild(div);
}

async function loadMessages() {
  const response = await fetch("messages.json?t=" + Date.now());
  const data = await response.json();

  if (data.length <= lastCount) return;

  const wall = document.getElementById("wall");
  const newEntries = data.slice(lastCount);
  newEntries.forEach(entry => renderEntry(entry, wall));

  const newCount = data.length - lastCount;
  for (let i = 0; i < Math.min(newCount, 3); i++) {
    setTimeout(() => triggerFireworks(), i * 350);
  }

  lastCount = data.length;
}

function triggerFireworks() {
  const x = window.innerWidth  * (0.15 + Math.random() * 0.7);
  const y = window.innerHeight * (0.1  + Math.random() * 0.5);

  const burst = document.createElement('div');
  burst.className = 'firework';
  burst.style.left = x + 'px';
  burst.style.top  = y + 'px';
  document.body.appendChild(burst);

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.setProperty('--angle', (360 / 18 * i) + 'deg');
    p.style.setProperty('--distance', (70 + Math.random() * 60) + 'px');
    p.style.background = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    burst.appendChild(p);
  }

  for (let i = 0; i < 12; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.setProperty('--angle', (360 / 12 * i + 15) + 'deg');
    p.style.setProperty('--distance', (30 + Math.random() * 25) + 'px');
    p.style.background = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
    burst.appendChild(p);
  }

  setTimeout(() => burst.remove(), 1100);
}

function triggerShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star shoot';
  star.style.left = (Math.random() * window.innerWidth  * 0.65) + 'px';
  star.style.top  = (Math.random() * window.innerHeight * 0.55) + 'px';
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 800);
}

function scheduleShootingStar() {
  setTimeout(() => {
    triggerShootingStar();
    scheduleShootingStar();
  }, 1500 + Math.random() * 3500);
}

// Keyboard shortcuts for testing (s = shooting star, f = fireworks)
document.addEventListener('keydown', e => {
  if (e.key === 's') triggerShootingStar();
  if (e.key === 'f') triggerFireworks();
});

setInterval(loadMessages, 4000);
loadMessages();
scheduleShootingStar();
