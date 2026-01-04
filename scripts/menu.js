// scripts/menu.js

// Logique et données de navigation pour Kandaku Dojo.

// Définition des entrées du menu
window.MENUITEMS = [
  { type: "item", label: "Accueil",       buttonClass: "menu-item", dataSection: "accueil" },
  { type: "item", label: "Techniques",    buttonClass: "menu-item", dataSection: "techniques-categories" },
  { type: "item", label: "Vidéos",        buttonClass: "menu-item", dataSection: "videos" },
  { type: "item", label: "Lexique",       buttonClass: "menu-item", dataSection: "lexique" },
  { type: "item", label: "Histoires",     buttonClass: "menu-item", dataSection: "histoires" },
  { type: "item", label: "Liens",         buttonClass: "menu-item", dataSection: "liens" },
  { type: "item", label: "Tuto du site",  buttonClass: "menu-item", dataSection: "tuto" },
  { type: "item", label: "Me contacter",  buttonClass: "menu-item", dataSection: "contact" }
];

/* UTILITAIRES */

function $(selector, scope) {
  return (scope || document).querySelector(selector);
}

function $all(selector, scope) {
  return Array.from((scope || document).querySelectorAll(selector));
}

/* CONSTRUCTION DU MENU */

function construireMenu() {
  const root = document.getElementById("menuRoot");
  if (!root || !Array.isArray(window.MENUITEMS)) return;

  root.innerHTML = "";

  window.MENUITEMS.forEach((item) => {
    const li = document.createElement("li");

    if (item.type === "item") {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = item.buttonClass || "menu-item";
      if (item.dataSection) btn.setAttribute("data-section", item.dataSection);
      btn.textContent = item.label;
      li.appendChild(btn);
    }

    if (item.type === "group") {
      li.classList.add("has-submenu");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = item.buttonClass || "menu-item menu-parent";
      btn.setAttribute("aria-expanded", "false");
      if (item.submenuId) btn.setAttribute("aria-controls", item.submenuId);
      btn.textContent = item.label;
      li.appendChild(btn);

      const ul = document.createElement("ul");
      ul.id = item.submenuId || "";
      ul.className = item.submenuClass || "submenu";

      (item.children || []).forEach((child) => {
        const liChild = document.createElement("li");

        if (child.type === "submenu-button") {
          const b = document.createElement("button");
          b.type = "button";
          b.className = child.buttonClass || "submenu-link";
          if (child.dataSection) b.setAttribute("data-section", child.dataSection);
          b.textContent = child.label;
          liChild.appendChild(b);
        }

        ul.appendChild(liChild);
      });

      li.appendChild(ul);
    }

    root.appendChild(li);
  });
}

/* Activation d'une section principale */

function activerSection(sectionName) {
  const targetId = "section-" + sectionName;
  const sections = $all(".content-section");

  // Gestion spécifique du wrapper diaporama techniques
  if (sectionName !== "techniques") {
    const wrapper = $("#mon-conteneur-wrapper");
    if (wrapper) wrapper.classList.remove("is-visible");
  } else {
    const wrapper = $("#mon-conteneur-wrapper");
    if (wrapper) wrapper.classList.add("is-visible");
  }

  sections.forEach((sec) => {
    if (sec.id === targetId) sec.classList.add("is-active");
    else sec.classList.remove("is-active");
  });
}

/* Reset des états internes (tuiles + contenus) pour une section */

function resetSectionState(sectionName) {
  // Techniques : catégories + liste
  if (sectionName === "techniques-categories") {
    const techTiles = document.querySelectorAll(".tech-category-tile.is-active");
    techTiles.forEach((t) => t.classList.remove("is-active"));

    const itemsContainer = document.getElementById("techniquesItemsContainer");
    if (itemsContainer) itemsContainer.innerHTML = "";
  }

  // Vidéos : catégories + grille
  if (sectionName === "videos") {
    const videoTiles = document.querySelectorAll("#section-videos .video-card-tile.is-active");
    videoTiles.forEach((t) => t.classList.remove("is-active"));

    const grid = document.getElementById("videosGrid");
    if (grid) grid.innerHTML = "";
  }

  // Histoires : tuiles + contenu
  if (sectionName === "histoires") {
    const historyTiles = document.querySelectorAll("#section-histoires .history-tile.is-active");
    historyTiles.forEach((t) => t.classList.remove("is-active"));

    const historyContent = document.getElementById("historyContent");
    if (historyContent) {
      historyContent.innerHTML = "";
      historyContent.hidden = true;
    }
  }

  // Contact : recréer un formulaire vierge
  if (sectionName === "contact") {
    const root = document.getElementById("contactRoot");
    if (root) root.innerHTML = "";
    if (typeof window.renderContactForm === "function") {
      window.renderContactForm();
    }
  }
}

/* INITIALISATION DU MENU */

function initMenu() {
  const sideMenu = document.getElementById("sideMenu");
  const headerMenuButton = document.getElementById("headerMenuButton");

  // Bouton MENU : ouverture/fermeture
  if (headerMenuButton && sideMenu) {
    headerMenuButton.addEventListener("click", () => {
      const isVisible = sideMenu.classList.toggle("is-visible");
      headerMenuButton.setAttribute("aria-expanded", String(isVisible));
    });
  }

  /* Gestion de l’état actif du bouton principal */

  function setMainButtonActive(targetSection) {
    let targetButton = $all(".menu-item").find(
      (b) => b.getAttribute("data-section") === targetSection
    );

    // Cas particuliers : sous-sections techniques -> bouton "Techniques"
    if (
      targetSection.includes("-waza") ||
      targetSection.includes("dachi") ||
      targetSection.includes("kata")
    ) {
      targetSection = "techniques-categories";
      targetButton = $all(".menu-item").find((b) =>
        b.textContent?.trim().startsWith("Techniques")
      );
    }

    $all(".menu-item").forEach((b) => b.classList.remove("is-active"));
    if (targetButton) targetButton.classList.add("is-active");
  }

  // Clic sur un bouton principal du menu
  const mainButtons = $all(".menu-item[data-section]");
  mainButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      if (!section) return;

      // Reset uniquement quand la navigation vient du menu
      resetSectionState(section);
      activerSection(section);
      setMainButtonActive(section);

      if (sideMenu) sideMenu.classList.remove("is-visible");
      if (headerMenuButton) headerMenuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Gestion d’éventuels groupes (submenus) – conservé pour compatibilité
  const parents = $all(".menu-parent");
  parents.forEach((parentBtn) => {
    const controlsId = parentBtn.getAttribute("aria-controls");
    const submenu = controlsId ? document.getElementById(controlsId) : null;

    parentBtn.addEventListener("click", () => {
      if (!submenu) return;

      const isCurrentlyOpen = submenu.classList.contains("is-open");

      parents.forEach((otherBtn) => {
        const otherId = otherBtn.getAttribute("aria-controls");
        const otherSub = otherId ? document.getElementById(otherId) : null;
        if (otherSub) {
          otherSub.classList.remove("is-open");
          otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      if (!isCurrentlyOpen) {
        submenu.classList.add("is-open");
        parentBtn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Liens de sous-menu si présents
  const submenuLinks = $all(".submenu-link[data-section]");
  submenuLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      if (!section) return;

      resetSectionState(section);
      activerSection(section);
      setMainButtonActive(section);

      if (sideMenu) sideMenu.classList.remove("is-visible");
      if (headerMenuButton) headerMenuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Déclencheurs génériques dans le contenu (boutons avec data-section)
  const genericSectionTriggers = $all("[data-section]:not(.menu-item):not(.submenu-link)");
  genericSectionTriggers.forEach((el) => {
    el.addEventListener("click", () => {
      const section = el.getAttribute("data-section");
      if (!section) return;

      // Si on clique depuis le contenu vers une autre section que le diaporama plein écran
      if (section !== "techniques") {
        const wrapper = $("#mon-conteneur-wrapper");
        if (wrapper) wrapper.classList.remove("is-visible");
      }

      // Ici on ne fait PAS de resetSectionState pour conserver l’état interne
      activerSection(section);
      setMainButtonActive(section);
    });
  });
}

/* TECHNIQUES : ouverture diaporama depuis une ligne/tuile */

function initTechniques() {
  const wrapper = document.getElementById("mon-conteneur-wrapper");

  // 1. On détache tous les anciens listeners
  const oldLinks = $all("[data-technique]");
  oldLinks.forEach((link) => {
    const clone = link.cloneNode(true);
    link.parentNode.replaceChild(clone, link);
  });

  // 2. On récupère de nouveau TOUS les éléments data-technique
  const techniqueLinks = $all("[data-technique]");
  techniqueLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const techniqueName = link.getAttribute("data-technique");
      if (!techniqueName) return;

      activerSection("techniques");

      const sideMenu = document.getElementById("sideMenu");
      const headerMenuButton = document.getElementById("headerMenuButton");

      if (sideMenu) sideMenu.classList.remove("is-visible");
      if (headerMenuButton) headerMenuButton.setAttribute("aria-expanded", "false");

      if (wrapper) wrapper.classList.add("is-visible");

      if (typeof window.afficherTechnique === "function") {
        window.afficherTechnique(techniqueName);
      }
    });
  });
}

// Placeholder pour une éventuelle version accordéon
function initTechniquesAccordion() {
  // Pour évolution future si besoin
}

/* VÍDEOS : catégories + filtre */

function initVideos() {
  if (window.renderVideosCategories) {
    window.renderVideosCategories();
  }

  const grid = document.getElementById("videosGrid");
  if (grid) grid.innerHTML = "";

  const tiles = $all("#section-videos .video-card-tile");
  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const filter = tile.getAttribute("data-video-filter");

      // état visuel des tuiles
      tiles.forEach((t) => t.classList.remove("is-active"));
      tile.classList.add("is-active");

      // construction de la grille si besoin
      if (grid && grid.children.length === 0 && typeof window.construireVideos === "function") {
        window.construireVideos(filter);
      } else if (typeof window.filtrerVideos === "function") {
        window.filtrerVideos(filter);
      }
    });
  });
}

/* LEXIQUE */

function construireLexique(liste) {
  const container = document.getElementById("lexiqueListe");
  if (!container) return;

  if (!liste || liste.length === 0) {
    container.innerHTML = "";
    const empty = document.createElement("p");
    empty.textContent = "Aucun terme ne correspond à votre recherche.";
    container.appendChild(empty);
    return;
  }

  if (typeof window.renderLexiqueList === "function") {
    window.renderLexiqueList(container, liste);
  }
}

function initLexique() {
  const searchInput = document.getElementById("lexiqueSearch");

  if (Array.isArray(window.LEXIQUE)) {
    construireLexique(window.LEXIQUE);
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      if (!Array.isArray(window.LEXIQUE)) return;

      const filtered = window.LEXIQUE.filter((entry) => {
        const term = (entry.term || "").toLowerCase();
        const def = (entry.def || "").toLowerCase();
        return term.includes(query) || def.includes(query);
      });

      construireLexique(filtered);
    });
  }
}

/* Clic sur le logo ou le titre : retour à l’accueil */

function initLogoAccueil() {
  const logoShotokan = document.querySelector(".logo-shotokan");
  const titleBlock = document.querySelector(".title-block");

  [logoShotokan, titleBlock].forEach((el) => {
    if (!el) return;
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      activerSection("accueil");

      const accueilBtn = Array.from(document.querySelectorAll(".menu-item")).find(
        (b) => b.getAttribute("data-section") === "accueil"
      );

      document.querySelectorAll(".menu-item").forEach((b) =>
        b.classList.remove("is-active")
      );
      if (accueilBtn) accueilBtn.classList.add("is-active");
    });
  });
}

/* PERSONNALISATION (optionnel) */

function initPersonnalisation() {
  const colorInputs = $all("[data-css-var]");
  colorInputs.forEach((input) => {
    const cssVar = input.getAttribute("data-css-var");
    if (!cssVar) return;
    input.addEventListener("input", () => {
      document.documentElement.style.setProperty(cssVar, input.value);
    });
  });
}

/* LANCEMENT GLOBAL */

document.addEventListener("DOMContentLoaded", () => {
  const contentRoot = document.querySelector("main.main-content");

  // 1. Remplir la section Accueil si la fonction existe
  if (typeof window.renderAccueilSection === "function") {
    window.renderAccueilSection();
  }

  // 1b. Remplir la section Tuto si la fonction existe
  if (typeof window.renderTutoSection === "function") {
    window.renderTutoSection();
  }

  // 2. Rendre les autres sections
  if (typeof window.renderTechniquesSections === "function") {
    window.renderTechniquesSections(contentRoot);
  }

  construireMenu();
  initMenu();
  initTechniques();
  initTechniquesAccordion();
  initVideos();
  initLexique();
  initLogoAccueil();
  initPersonnalisation();

  if (typeof window.renderHistoryTiles === "function") {
    window.renderHistoryTiles();
  }
  if (typeof window.renderLiensUtiles === "function") {
    window.renderLiensUtiles();
  }
  if (typeof window.renderContactForm === "function") {
    window.renderContactForm();
  }

  // 3. Afficher l’accueil
  activerSection("accueil");
});
