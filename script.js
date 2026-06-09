const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function syncThemeIcons() {
  const isDark = root.classList.contains("dark");
  if (isDark) {
    sunIcon.classList.remove("opacity-0");
    moonIcon.classList.add("opacity-0");
  } else {
    sunIcon.classList.add("opacity-0");
    moonIcon.classList.remove("opacity-0");
  }
}

const savedTheme = localStorage.getItem("joeker-theme");
if (savedTheme === "light") root.classList.remove("dark");
if (savedTheme === "dark") root.classList.add("dark");
syncThemeIcons();

toggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem(
    "joeker-theme",
    root.classList.contains("dark") ? "dark" : "light",
  );
  syncThemeIcons();
});

const words = [
  "INITIALIZING PROFILE...",
  "Jonathan",
  "Think Different",
  "Build Solutions",
  "Break Limits",
  "Joeker Labs",
];

const el = document.getElementById("matrixTypewriter");
const access = document.getElementById("accessGranted");
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const chaosChars = `&é"#'{([-|è\`_\\ç^à@)]°=}+£$¤%µ*!§~<>?./;:,`;

function getRandomChar() {
  return chaosChars[Math.floor(Math.random() * chaosChars.length)];
}

function animateMatrixText() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    const partial = currentWord.substring(0, letterIndex);
    let display = partial;

    if (letterIndex < currentWord.length) {
      for (let i = 0; i < 3; i++) {
        display += `<span class="opacity-30">${getRandomChar()}</span>`;
      }
    }

    el.innerHTML = display;
    letterIndex++;

    if (letterIndex <= currentWord.length) {
      setTimeout(animateMatrixText, 95);
    } else {
      if (wordIndex === words.length - 1) {
        access.classList.remove("hidden");
        setTimeout(() => {
          isDeleting = true;
          animateMatrixText();
        }, 1700);
      } else {
        setTimeout(() => {
          isDeleting = true;
          animateMatrixText();
        }, 950);
      }
    }
  } else {
    letterIndex--;
    el.textContent = currentWord.substring(0, letterIndex);

    if (letterIndex > 0) {
      setTimeout(animateMatrixText, 35);
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      if (wordIndex === 0) access.classList.add("hidden");
      setTimeout(animateMatrixText, 350);
    }
  }
}

animateMatrixText();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.14 },
);

document
  .querySelectorAll(
    ".info-card, .skill-card, .project-file, .timeline-item, .chart-card",
  )
  .forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });

const radarCommonOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      suggestedMin: 0,
      suggestedMax: 10,
      pointLabels: {
        color: root.classList.contains("dark") ? "#f8fafc" : "#0f172a",
        font: { size: 13, weight: "bold" },
      },
      ticks: {
        color: "#94a3b8",
        backdropColor: "transparent",
      },
      angleLines: { color: "rgba(57,255,20,.45)" },
      grid: { color: "rgba(124,28,255,.35)" },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: root.classList.contains("dark") ? "#f8fafc" : "#0f172a",
        font: { weight: "bold" },
      },
    },
  },
};

const techCtx = document.getElementById("techRadar");
const humanCtx = document.getElementById("humanRadar");
const humanSkillCtx = document.getElementById("humanSkillRadar");
const ctfCtx = document.getElementById("ctfRadar");

if (techCtx) {
  new Chart(techCtx, {
    type: "radar",
    data: {
      labels: [
        "Systèmes",
        "Réseaux",
        "Développement",
        "Bases de données",
        "Cybersécurité",
        "Automatisation",
        "Architecture",
      ],
      datasets: [
        {
          label: "Socle technique",
          data: [7, 7, 7, 7, 5, 5, 7],
          backgroundColor: "rgba(57,255,20,.14)",
          borderColor: "rgba(57,255,20,1)",
          pointBackgroundColor: "#39ff14",
          pointBorderColor: "#ffffff",
        },
      ],
    },
    options: radarCommonOptions,
  });
}

if (humanCtx) {
  new Chart(humanCtx, {
    type: "radar",
    data: {
      labels: [
        "Diagnostic",
        "Analyse",
        "Autonomie",
        "Adaptation",
        "Relation utilisateur",
        "Gestion incident",
        "Apprentissage",
      ],
      datasets: [
        {
          label: "Problem solving",
          data: [8, 7, 9, 9, 8, 8, 9],
          backgroundColor: "rgba(124,28,255,.18)",
          borderColor: "rgba(124,28,255,1)",
          pointBackgroundColor: "#7c1cff",
          pointBorderColor: "#ffffff",
        },
      ],
    },
    options: radarCommonOptions,
  });
}
if (humanSkillCtx) {
  new Chart(humanSkillCtx, {
    type: "radar",
    data: {
      labels: [
        "Curiosité",
        "Résilience",
        "Créativité",
        "Esprit critique",
        "Persévérance",
        "Transmission",
        "Authenticité",
      ],
      datasets: [
        {
          label: "Human Skills",
          data: [9, 9, 8, 8, 9, 8, 9],
          backgroundColor: "rgba(124,28,255,.18)",
          borderColor: "rgba(124,28,255,1)",
          pointBackgroundColor: "#7c1cff",
          pointBorderColor: "#ffffff",
        },
      ],
    },
    options: radarCommonOptions,
  });
}

if (ctfCtx) {
  new Chart(ctfCtx, {
    type: "radar",
    data: {
      labels: [
        "Web",
        "Cryptographie",
        "Stéganographie",
        "Reverse Engineering",
        "Réseau",
        "OSINT",
        "Programmation",
      ],
      datasets: [
        {
          label: "CTF Skills",
          data: [6, 6, 5, 5, 6, 5, 6],
          backgroundColor: "rgba(57,255,20,.12)",
          borderColor: "rgba(57,255,20,1)",
          pointBackgroundColor: "#39ff14",
          pointBorderColor: "#ffffff",
        },
      ],
    },
    options: radarCommonOptions,
  });
}

function openAccessModal(projectName) {
  const modal = document.getElementById("accessModal");

  const title = document.getElementById("modalProject");

  const mailBtn = document.getElementById("requestAccessBtn");

  title.textContent = projectName;

  mailBtn.href =
    `mailto:martel.jonathan64@gmail.com` +
    `?subject=Demande accès code source - ${projectName}` +
    `&body=Bonjour Jonathan,%0D%0A%0D%0A` +
    `Je souhaite obtenir un accès au code source du projet ${projectName}.%0D%0A%0D%0A` +
    `Merci.`;

  modal.classList.remove("hidden");
}

function closeAccessModal() {
  document.getElementById("accessModal").classList.add("hidden");
}

function openConfidentialModal(projectName) {
  const modal = document.getElementById("confidentialModal");

  const title = document.getElementById("confidentialProject");

  title.textContent = projectName;

  modal.classList.remove("hidden");
}

function closeConfidentialModal() {
  document.getElementById("confidentialModal").classList.add("hidden");
}
