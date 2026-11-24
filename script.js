/* ====== CONFIGURACIÓN (edítala a tu gusto) ====== */
// Fecha en que empezó la relación: AÑO, MES (1-12), DÍA
// 1 año y 1 mes atrás como ejemplo. Cámbiala por tu fecha real.
const START_DATE = new Date(2025, 9, 23, 0, 0, 0); // 23 de octubre de 2025

// Fotos de la galería (están en la carpeta "fotos/").
const PHOTOS = [
  { src: "fotos/1.jpg", caption: "Contigo 💞" },
  { src: "fotos/2.jpg", caption: "Esa sonrisa 😍" },
  { src: "fotos/3.jpg", caption: "Nuestro momento 🌅" },
  { src: "fotos/4.jpg", caption: "Siempre juntos 🤍" },
  { src: "fotos/5.jpg", caption: "Mi lugar favorito 🏡" },
  { src: "fotos/6.jpg", caption: "Te amo ❤️" }
];

// Tu canción de Spotify (se abre al tocar la nota musical arriba a la derecha)
const SPOTIFY_URL = "https://open.spotify.com/track/1ElT1pcjbqP6EcjQPJlN1w?si=a81b79707e5841e4";

// Razones por las que la amas (emoji al frente, texto detrás)
const REASONS = [
  { emoji: "😊", text: "Por tu sonrisa que ilumina todo" },
  { emoji: "🤗", text: "Por hacerme sentir en casa" },
  { emoji: "💬", text: "Por nuestras pláticas eternas" },
  { emoji: "🌟", text: "Por creer en mí siempre" },
  { emoji: "🍿", text: "Por las noches de película juntos" },
  { emoji: "❤️", text: "Por amarme tal como soy" }
];
/* ================================================ */

/* ---- Contador ---- */
function updateCounter() {
  const now = new Date();
  let diff = Math.floor((now - START_DATE) / 1000);
  const days = Math.floor(diff / 86400); diff -= days * 86400;
  const hours = Math.floor(diff / 3600); diff -= hours * 3600;
  const minutes = Math.floor(diff / 60); diff -= minutes * 60;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = diff;
}
setInterval(updateCounter, 1000);
updateCounter();

const fmt = START_DATE.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
document.getElementById("startDateLabel").textContent = fmt;

/* ---- Galería ---- */
const gallery = document.getElementById("gallery");
PHOTOS.forEach((p, i) => {
  const tilt = (i % 2 === 0 ? -1 : 1) * (2 + (i % 3));
  const fig = document.createElement("figure");
  fig.className = "photo";
  fig.style.setProperty("--tilt", tilt + "deg");
  fig.innerHTML = `<img src="${p.src}" alt="${p.caption}" loading="lazy" />
                   <figcaption class="caption">${p.caption}</figcaption>`;
  gallery.appendChild(fig);
});

/* ---- Razones (flip) ---- */
const reasonsEl = document.getElementById("reasons");
REASONS.forEach((r) => {
  const card = document.createElement("div");
  card.className = "flip";
  card.innerHTML = `<div class="flip-inner">
      <div class="flip-face flip-front">${r.emoji}</div>
      <div class="flip-face flip-back">${r.text}</div>
    </div>`;
  card.addEventListener("click", () => card.classList.toggle("flipped"));
  reasonsEl.appendChild(card);
});

/* ---- Carta ---- */
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  setTimeout(() => letter.classList.add("show"), 400);
});

/* ---- Reveal on scroll ---- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---- Botón de inicio: baja a la siguiente sección ---- */
document.getElementById("startBtn").addEventListener("click", () => {
  document.querySelector(".counter-section").scrollIntoView({ behavior: "smooth" });
  spawnBurst(window.innerWidth / 2, window.innerHeight / 2);
});

/* ---- Música: abre la canción en Spotify ---- */
const musicBtn = document.getElementById("musicToggle");
musicBtn.addEventListener("click", () => {
  musicBtn.classList.add("playing");
  spawnBurst(window.innerWidth - 40, 44);
  window.open(SPOTIFY_URL, "_blank");
});

/* ---- Corazones flotantes de fondo ---- */
const heartsBg = document.getElementById("heartsBg");
const EMOJIS = ["💕", "💗", "💖", "🤍", "💓", "🌸", "✨"];
function spawnFloatHeart() {
  const h = document.createElement("span");
  h.className = "float-heart";
  h.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 16 + Math.random() * 22 + "px";
  h.style.animationDuration = 6 + Math.random() * 7 + "s";
  heartsBg.appendChild(h);
  setTimeout(() => h.remove(), 13000);
}
setInterval(spawnFloatHeart, 650);

/* ---- Burst de corazones al hacer clic ---- */
function spawnBurst(x, y) {
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("span");
    h.className = "burst-heart";
    h.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    h.style.left = x + "px";
    h.style.top = y + "px";
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 120;
    h.style.setProperty("--bx", Math.cos(angle) * dist + "px");
    h.style.setProperty("--by", Math.sin(angle) * dist + "px");
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 900);
  }
}
document.addEventListener("click", (e) => {
  if (e.target.closest("#startBtn, #loveBtn")) return; // ya tienen su burst
  if (Math.random() < 0.5) spawnBurst(e.clientX, e.clientY);
});
/* ---- Botón final: lluvia de corazones + mensaje sorpresa ---- */
let loveClicks = 0;
const loveMessages = [
  "Te amo infinito 💗",
  "Eres mi todo 🤍",
  "Gracias por existir ✨",
  "Mi persona favorita 💞",
  "Por mil aniversarios más 💍",
  "Te elijo a ti, siempre ❤️"
];
document.getElementById("loveBtn").addEventListener("click", (e) => {
  spawnBurst(e.clientX, e.clientY);
  heartRain();
  showLoveMessage(loveMessages[loveClicks % loveMessages.length]);
  loveClicks++;
});

// Lluvia de corazones por toda la pantalla
function heartRain() {
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const h = document.createElement("span");
      h.className = "float-heart";
      h.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      h.style.left = Math.random() * 100 + "vw";
      h.style.bottom = "auto";
      h.style.top = "-40px";
      h.style.fontSize = 18 + Math.random() * 26 + "px";
      h.style.animation = "rainDown " + (2.5 + Math.random() * 2.5) + "s linear forwards";
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 5500);
    }, i * 60);
  }
}

// Mensaje flotante en el centro
function showLoveMessage(text) {
  const existing = document.querySelector(".love-popup");
  if (existing) existing.remove();
  const m = document.createElement("div");
  m.className = "love-popup";
  m.textContent = text;
  document.body.appendChild(m);
  requestAnimationFrame(() => m.classList.add("show"));
  setTimeout(() => { m.classList.remove("show"); setTimeout(() => m.remove(), 500); }, 2200);
}
