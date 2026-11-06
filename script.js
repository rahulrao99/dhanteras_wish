
/* =========================================================
   A LITTLE DIWALI LIGHT — scene flow and interactions
   ========================================================= */
const screens = [...document.querySelectorAll(".screen")];
const sparkles = document.getElementById("sparkles");
const messageText = `On this beautiful Dhanteras, I want to wish you more than gold, gifts or material things.

May you always have good health, a peaceful heart, courage for every new beginning and happiness that stays long after the celebrations end.

Thank you for being someone who makes ordinary moments feel special. Your smile brings its own kind of light into my days, and I hope life gives you a thousand reasons to keep smiling.

May Goddess Lakshmi bless your home with abundance, and may Lord Dhanvantari bless you with health and well-being.

And if I could make one wish tonight, it would be to keep seeing you happy — today, tomorrow and in all the little moments still waiting for us.

Happy Dhanteras, my favourite person. ❤️`;

let typingTimer = null;
let hasTyped = false;
let currentScreen = "welcome";

function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle("screen--active", screen.id === id);
  });
  currentScreen = id;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function makeSparkles(count = 42) {
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("span");
    dot.className = "sparkle";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animationDelay = `${Math.random() * 7}s`;
    dot.style.animationDuration = `${5 + Math.random() * 6}s`;
    sparkles.appendChild(dot);
  }
}

function typeLetter() {
  if (hasTyped) {
    document.getElementById("typedMessage").textContent = messageText;
    document.getElementById("giftNext").classList.remove("is-hidden");
    return;
  }

  const target = document.getElementById("typedMessage");
  const nextButton = document.getElementById("giftNext");
  target.textContent = "";
  let index = 0;
  const tick = () => {
    target.textContent += messageText.charAt(index);
    index += 1;
    if (index < messageText.length) {
      typingTimer = window.setTimeout(tick, 24);
    } else {
      hasTyped = true;
      nextButton.classList.remove("is-hidden");
    }
  };
  tick();
}

function burstHearts(amount = 18) {
  const symbols = ["♡", "♥", "✧", "✦"];
  for (let i = 0; i < amount; i += 1) {
    const heart = document.createElement("span");
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.position = "fixed";
    heart.style.zIndex = "5";
    heart.style.left = `${8 + Math.random() * 84}%`;
    heart.style.bottom = `${-10 + Math.random() * 12}%`;
    heart.style.color = Math.random() > .5 ? "#ffd58d" : "#f2aaa2";
    heart.style.fontSize = `${14 + Math.random() * 24}px`;
    heart.style.pointerEvents = "none";
    heart.style.transition = "transform 3.2s ease-out, opacity 3.2s ease-out";
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      heart.style.transform = `translate(${Math.random() * 90 - 45}px, -${250 + Math.random() * 330}px) rotate(${Math.random() * 80 - 40}deg)`;
      heart.style.opacity = "0";
    });
    window.setTimeout(() => heart.remove(), 3400);
  }
}

/* Generic particle effect: sparkles, amrit drops, gold coins, phuljhadi */
function spawnParticles(x, y, {
  count = 20, symbols = ["✦"], colors = ["#ffd58d"], spreadX = 140,
  dyMin = -220, dyMax = -80, size = [12, 24], duration = 1800, startSpread = 0
} = {}) {
  for (let i = 0; i < count; i += 1) {
    const el = document.createElement("span");
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const s = size[0] + Math.random() * (size[1] - size[0]);
    el.className = "particle";
    if (symbol === "coin") {
      el.classList.add("particle--coin");
      el.style.width = `${s}px`;
      el.style.height = `${s}px`;
    } else {
      el.textContent = symbol;
      el.style.fontSize = `${s}px`;
      el.style.color = colors[Math.floor(Math.random() * colors.length)];
    }
    el.style.left = `${x + (Math.random() - .5) * startSpread}px`;
    el.style.top = `${y}px`;
    el.style.transition = `transform ${duration}ms cubic-bezier(.2,.6,.3,1), opacity ${duration}ms ease-in`;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      const dx = (Math.random() - .5) * spreadX;
      const dy = dyMin + Math.random() * (dyMax - dyMin);
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360 - 180}deg)`;
      el.style.opacity = "0";
    });
    window.setTimeout(() => el.remove(), duration + 200);
  }
}

/* =========================================================
   Welcome and diya lighting
   ========================================================= */
document.getElementById("beginBtn").addEventListener("click", () => showScreen("diya"));

document.getElementById("lightBtn").addEventListener("click", () => {
  const diya = document.getElementById("lightBtn");
  if (diya.classList.contains("is-lit")) return;
  diya.classList.add("is-lit");
  document.getElementById("diyaHint").textContent = "A little light, and a wish sent with love. ✨";
  document.getElementById("wishNext").classList.remove("is-hidden");
  burstHearts(10);
});

document.getElementById("wishNext").addEventListener("click", () => showScreen("blessing"));
document.getElementById("darshanNext").addEventListener("click", () => showScreen("darshan"));

/* =========================================================
   Divine blessings: Maa Lakshmi and Lord Dhanvantari
   ========================================================= */
const blessed = new Set();
const darshanHint = document.getElementById("darshanHint");

function updateDarshanHint() {
  if (blessed.size === 2) {
    darshanHint.textContent = "Both blessings are now with you. 🙏✨";
    document.getElementById("letterNext").classList.remove("is-hidden");
  } else if (blessed.has("lakshmi")) {
    darshanHint.textContent = "Maa Lakshmi's footsteps are walking into your home… now Lord Dhanvantari ✨";
  } else if (blessed.has("dhanvantari")) {
    darshanHint.textContent = "Blessed with good health… now Maa Lakshmi ✨";
  }
}

document.getElementById("lakshmiCard").addEventListener("click", (event) => {
  const card = event.currentTarget;
  if (blessed.has("lakshmi")) return;
  blessed.add("lakshmi");
  card.classList.add("is-blessed");
  const rect = card.getBoundingClientRect();
  /* gold coins shower down over the card */
  spawnParticles(rect.left + rect.width / 2, rect.top - 20, {
    count: 26, symbols: ["coin"], spreadX: 120, startSpread: rect.width,
    dyMin: 220, dyMax: rect.height + 160, size: [12, 20], duration: 2200
  });
  spawnParticles(rect.left + rect.width / 2, rect.top + rect.height * .35, {
    count: 14, symbols: ["✦", "✧", "❀"], colors: ["#ffd58d", "#ffc4cd", "#fff0c0"], spreadX: 220
  });
  document.getElementById("footprints").classList.add("is-walking");
  updateDarshanHint();
});

document.getElementById("dhanvantariCard").addEventListener("click", (event) => {
  const card = event.currentTarget;
  if (blessed.has("dhanvantari")) return;
  blessed.add("dhanvantari");
  card.classList.add("is-blessed");
  const rect = card.getBoundingClientRect();
  /* drops of amrit rise from the kalash */
  spawnParticles(rect.left + rect.width / 2, rect.top + rect.height * .3, {
    count: 26, symbols: ["●", "✦", "✧"], colors: ["#cdf7c4", "#fff0b8", "#a8e6a0"],
    spreadX: 160, startSpread: 50, dyMin: -260, dyMax: -100, size: [6, 16], duration: 2400
  });
  updateDarshanHint();
});

document.getElementById("letterNext").addEventListener("click", () => {
  showScreen("letter");
  typeLetter();
});

/* Letter -> gift screen (this listener was missing) */
document.getElementById("giftNext").addEventListener("click", () => showScreen("gift"));

/* =========================================================
   Gift reveal and finale
   ========================================================= */
document.getElementById("giftBtn").addEventListener("click", () => {
  const gift = document.getElementById("giftBtn");
  if (gift.classList.contains("is-open")) return;
  gift.classList.add("is-open");
  document.getElementById("giftHint").textContent = "A little something from my heart…";
  document.getElementById("giftReveal").classList.remove("is-hidden");
  document.getElementById("finalNext").classList.remove("is-hidden");
  burstHearts(16);
});

document.getElementById("finalNext").addEventListener("click", () => {
  showScreen("finale");
  burstHearts(28);
});

/* Tap anywhere on the finale to light a little phuljhadi */
document.getElementById("finale").addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  spawnParticles(event.clientX, event.clientY, {
    count: 22, symbols: ["✦", "✧", "✶", "·"], colors: ["#ffe7a8", "#ffd58d", "#ffb36b", "#fff"],
    spreadX: 220, dyMin: -150, dyMax: 110, size: [10, 22], duration: 1100
  });
});

/* =========================================================
   Replay
   ========================================================= */
document.getElementById("replayBtn").addEventListener("click", () => {
  if (typingTimer) window.clearTimeout(typingTimer);
  hasTyped = false;
  document.getElementById("typedMessage").textContent = "";
  document.getElementById("lightBtn").classList.remove("is-lit");
  document.getElementById("diyaHint").textContent = "Tap to light it ✨";
  document.getElementById("wishNext").classList.add("is-hidden");
  document.getElementById("giftBtn").classList.remove("is-open");
  document.getElementById("giftHint").textContent = "Tap to unwrap your surprise 🎁";
  document.getElementById("giftReveal").classList.add("is-hidden");
  document.getElementById("finalNext").classList.add("is-hidden");
  document.getElementById("giftNext").classList.add("is-hidden");
  blessed.clear();
  document.getElementById("lakshmiCard").classList.remove("is-blessed");
  document.getElementById("dhanvantariCard").classList.remove("is-blessed");
  document.getElementById("footprints").classList.remove("is-walking");
  darshanHint.textContent = "Tap both to receive their blessings 🙏";
  document.getElementById("letterNext").classList.add("is-hidden");
  showScreen("welcome");
});

/* =========================================================
   Initialize ambient night-sky particles
   ========================================================= */
makeSparkles();
