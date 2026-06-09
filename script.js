/* =========================================================
   JOEKER PORTFOLIO — SCRIPT PRINCIPAL
   ========================================================= */


/* ---------------------------------------------------------
   1. SÉLECTION DES ÉLÉMENTS GLOBAUX
--------------------------------------------------------- */

// Récupère la balise <html>
// Elle sert notamment à activer/désactiver la classe "dark"
const root = document.documentElement;

// Bouton de changement de thème
const toggle = document.getElementById("themeToggle");

// Icônes du switch clair/sombre
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

// Élément où l’année du footer est affichée
const year = document.getElementById("year");

// Affiche automatiquement l’année actuelle dans le footer
year.textContent = new Date().getFullYear();


/* ---------------------------------------------------------
   2. GESTION DU MODE CLAIR / SOMBRE
--------------------------------------------------------- */

/**
 * Synchronise l'affichage des icônes du toggle
 * selon le thème actuellement actif.
 */
function syncThemeIcons() {
  const isDark = root.classList.contains("dark");

  if (isDark) {
    // En mode sombre, on affiche le soleil
    // pour indiquer qu'on peut revenir au mode clair
    sunIcon.classList.remove("opacity-0");
    moonIcon.classList.add("opacity-0");
  } else {
    // En mode clair, on affiche la lune
    // pour indiquer qu'on peut passer au mode sombre
    sunIcon.classList.add("opacity-0");
    moonIcon.classList.remove("opacity-0");
  }
}

// Récupère le thème sauvegardé dans le navigateur
const savedTheme = localStorage.getItem("joeker-theme");

// Applique le thème sauvegardé si disponible
if (savedTheme === "light") root.classList.remove("dark");
if (savedTheme === "dark") root.classList.add("dark");

// Met à jour les icônes au chargement
syncThemeIcons();

/**
 * Au clic sur le bouton :
 * - bascule la classe "dark"
 * - sauvegarde le choix dans localStorage
 * - met à jour les icônes
 */
toggle.addEventListener("click", () => {
  root.classList.toggle("dark");

  localStorage.setItem(
    "joeker-theme",
    root.classList.contains("dark") ? "dark" : "light",
  );

  syncThemeIcons();
});


/* ---------------------------------------------------------
   3. ANIMATION MATRIX / TYPEWRITER DU HERO
--------------------------------------------------------- */

// Liste des mots affichés dans le terminal du hero
const words = [
  "INITIALIZING PROFILE...",
  "Jonathan",
  "Think Different",
  "Build Solutions",
  "Break Limits",
  "Joeker Labs",
];

// Élément où le texte animé est injecté
const el = document.getElementById("matrixTypewriter");

// Texte "ACCESS GRANTED"
const access = document.getElementById("accessGranted");

// Index du mot actuellement affiché
let wordIndex = 0;

// Index de la lettre actuellement affichée
let letterIndex = 0;

// Indique si l'animation est en phase d'écriture ou d'effacement
let isDeleting = false;

// Caractères utilisés pour l'effet "chaos / matrix"
const chaosChars = `&é"#'{([-|è\`_\\ç^à@)]°=}+£$¤%µ*!§~<>?./;:,`;

/**
 * Renvoie un caractère aléatoire depuis chaosChars.
 */
function getRandomChar() {
  return chaosChars[Math.floor(Math.random() * chaosChars.length)];
}

/**
 * Anime le texte du terminal :
 * - écrit progressivement un mot
 * - ajoute des caractères parasites pendant l'écriture
 * - efface le mot
 * - passe au suivant
 */
function animateMatrixText() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    // Partie visible du mot en cours
    const partial = currentWord.substring(0, letterIndex);

    let display = partial;

    // Tant que le mot n'est pas complet,
    // on ajoute quelques caractères "parasites"
    if (letterIndex < currentWord.length) {
      for (let i = 0; i < 3; i++) {
        display += `<span class="opacity-30">${getRandomChar()}</span>`;
      }
    }

    // Injecte le texte dans le HTML
    el.innerHTML = display;

    // Passe à la lettre suivante
    letterIndex++;

    // Continue l'écriture
    if (letterIndex <= currentWord.length) {
      setTimeout(animateMatrixText, 95);
    } else {
      // Si on est sur le dernier mot, affiche ACCESS GRANTED
      if (wordIndex === words.length - 1) {
        access.classList.remove("hidden");

        setTimeout(() => {
          isDeleting = true;
          animateMatrixText();
        }, 1700);
      } else {
        // Sinon pause plus courte avant effacement
        setTimeout(() => {
          isDeleting = true;
          animateMatrixText();
        }, 950);
      }
    }
  } else {
    // Phase d'effacement
    letterIndex--;

    el.textContent = currentWord.substring(0, letterIndex);

    if (letterIndex > 0) {
      setTimeout(animateMatrixText, 35);
    } else {
      // Mot effacé : on passe au suivant
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;

      // Quand on revient au premier mot,
      // on masque ACCESS GRANTED
      if (wordIndex === 0) {
        access.classList.add("hidden");
      }

      setTimeout(animateMatrixText, 350);
    }
  }
}

// Lance l'animation au chargement
animateMatrixText();


/* ---------------------------------------------------------
   4. ANIMATION AU SCROLL — REVEAL DES CARTES
--------------------------------------------------------- */

/**
 * IntersectionObserver permet de détecter quand un élément
 * entre dans la zone visible de l'écran.
 *
 * Quand une card devient visible :
 * on lui ajoute la classe "is-visible".
 */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.14,
  },
);

// Sélectionne les éléments à animer au scroll
document
  .querySelectorAll(
    ".info-card, .skill-card, .project-file, .timeline-item, .chart-card",
  )
  .forEach((el) => {
    // Ajoute la classe de base invisible
    el.classList.add("reveal");

    // Lance l'observation
    observer.observe(el);
  });


/* ---------------------------------------------------------
   5. CONFIGURATION COMMUNE DES RADARS CHART.JS
--------------------------------------------------------- */

/**
 * Options communes à tous les graphiques radar.
 * Cela évite de répéter la même configuration partout.
 */
const radarCommonOptions = {
  responsive: true,
  maintainAspectRatio: true,

  scales: {
    r: {
      suggestedMin: 0,
      suggestedMax: 10,

      pointLabels: {
        color: root.classList.contains("dark") ? "#f8fafc" : "#0f172a",
        font: {
          size: 13,
          weight: "bold",
        },
      },

      ticks: {
        color: "#94a3b8",
        backdropColor: "transparent",
      },

      angleLines: {
        color: "rgba(57,255,20,.45)",
      },

      grid: {
        color: "rgba(124,28,255,.35)",
      },
    },
  },

  plugins: {
    legend: {
      labels: {
        color: root.classList.contains("dark") ? "#f8fafc" : "#0f172a",
        font: {
          weight: "bold",
        },
      },
    },
  },
};


/* ---------------------------------------------------------
   6. SÉLECTION DES CANVAS RADAR
--------------------------------------------------------- */

// Radar architecture / socle technique
const techCtx = document.getElementById("techRadar");

// Radar résolution de problèmes
const humanCtx = document.getElementById("humanRadar");

// Radar savoir-être / fonctionnement personnel
const humanSkillCtx = document.getElementById("humanSkillRadar");

// Radar CTF / cybersécurité pratique
const ctfCtx = document.getElementById("ctfRadar");


/* ---------------------------------------------------------
   7. RADAR — ARCHITECTURE IT
--------------------------------------------------------- */

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


/* ---------------------------------------------------------
   8. RADAR — PROBLEM SOLVING
--------------------------------------------------------- */

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


/* ---------------------------------------------------------
   9. RADAR — HUMAN SKILLS
--------------------------------------------------------- */

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


/* ---------------------------------------------------------
   10. RADAR — CTF SKILLS
--------------------------------------------------------- */

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


/* ---------------------------------------------------------
   11. MODALE — CODE PRIVÉ SUR DEMANDE
--------------------------------------------------------- */

/**
 * Ouvre la modale "code sur demande".
 * Utilisée pour les projets personnels dont le code est privé.
 *
 * @param {string} projectName - Nom du projet sélectionné
 */
function openAccessModal(projectName) {
  const modal = document.getElementById("accessModal");
  const title = document.getElementById("modalProject");
  const mailBtn = document.getElementById("requestAccessBtn");

  // Affiche le nom du projet dans la modale
  title.textContent = projectName;

  // Prépare un mail automatique avec sujet + corps
  mailBtn.href =
    `mailto:martel.jonathan64@gmail.com` +
    `?subject=Demande accès code source - ${projectName}` +
    `&body=Bonjour Jonathan,%0D%0A%0D%0A` +
    `Je souhaite obtenir un accès au code source du projet ${projectName}.%0D%0A%0D%0A` +
    `Merci.`;

  modal.classList.remove("hidden");
}

/**
 * Ferme la modale "code sur demande".
 */
function closeAccessModal() {
  document.getElementById("accessModal").classList.add("hidden");
}


/* ---------------------------------------------------------
   12. MODALE — PROJET CLIENT CONFIDENTIEL
--------------------------------------------------------- */

/**
 * Ouvre la modale "code confidentiel".
 * Utilisée pour les projets clients dont le code ne peut pas être diffusé.
 *
 * @param {string} projectName - Nom du projet sélectionné
 */
function openConfidentialModal(projectName) {
  const modal = document.getElementById("confidentialModal");
  const title = document.getElementById("confidentialProject");

  // Affiche le nom du projet dans la modale
  title.textContent = projectName;

  modal.classList.remove("hidden");
}

/**
 * Ferme la modale "code confidentiel".
 */
function closeConfidentialModal() {
  document.getElementById("confidentialModal").classList.add("hidden");
}