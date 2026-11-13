const KEY = 'pulse:state';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return { count: 0, paused: false };
    const s = JSON.parse(raw);
    if (
      s !== null &&
      typeof s === 'object' &&
      Number.isSafeInteger(s.count) &&
      s.count >= 0 &&
      typeof s.paused === 'boolean'
    ) {
      return { count: s.count, paused: s.paused };
    }
  } catch {
    return { count: 0, paused: false };
  }
  return { count: 0, paused: false };
}

const saved = load();
let baseCount = saved.count;
let paused = saved.paused;
let startedAt = Date.now();

const countEl = document.getElementById('count');
const toggleEl = document.getElementById('toggle');
const resetEl = document.getElementById('reset');

function current() {
  return paused
    ? baseCount
    : baseCount + Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify({ count: current(), paused }));
  } catch {
    // Storage unavailable: keep counting in memory only.
  }
}

let shown = null;
function render() {
  const value = current();
  document.title = paused ? `Paused · ${value} · Pulse` : `${value} · Pulse`;
  if (value !== shown) {
    shown = value;
    countEl.textContent = String(value);
    persist();
    if (!paused) {
      // Restart the beat animation on each new second.
      countEl.classList.remove('pulsing');
      void countEl.offsetWidth;
      countEl.classList.add('pulsing');
    }
  }
}

function toggle() {
  if (paused) {
    startedAt = Date.now();
    paused = false;
    countEl.classList.add('pulsing');
  } else {
    baseCount = current();
    paused = true;
    countEl.classList.remove('pulsing');
  }
  toggleEl.textContent = paused ? 'Resume' : 'Pause';
  persist();
  render();
}

function reset() {
  baseCount = 0;
  startedAt = Date.now();
  // Clear the cache so render() updates the text and persists even when 0 is shown.
  shown = null;
  render();
}

toggleEl.addEventListener('click', toggle);
resetEl.addEventListener('click', reset);
window.addEventListener('pagehide', persist);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') persist();
});

toggleEl.textContent = paused ? 'Resume' : 'Pause';
render();
if (!paused) countEl.classList.add('pulsing');
setInterval(render, 250);
