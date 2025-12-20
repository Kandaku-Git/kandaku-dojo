// scripts/menu.js
// Logique et données de navigation pour Kandaku Dojo.

window.MENU_ITEMS = [
  { type: "item", label: "Accueil", buttonClass: "menu-item", dataSection: "accueil" },
  { type: "item", label: "Techniques", buttonClass: "menu-item", dataSection: "techniques-categories"},
  { type: "item", label: "Vidéos", buttonClass: "menu-item", dataSection: "videos" },
  { type: "item", label: "Lexique", buttonClass: "menu-item", dataSection: "lexique" },
  {
    type: "group",
    label: "Histoire",
    buttonClass: "menu-item menu-parent",
    submenuId: "submenu-histoire",
    submenuClass: "submenu",
    children: [
      { type: "submenu-button", label: "Origines du karaté", buttonClass: "submenu-link", dataSection: "histoire-origines" },
      { type: "submenu-button", label: "Histoire du dojo", buttonClass: "submenu-link", dataSection: "histoire-dojo" },
    ],
  },
  { type: "item", label: "Liens", buttonClass: "menu-item", dataSection: "liens" },
  {
    type: "group",
    label: "Interface",
    buttonClass: "menu-item menu-parent",
    submenuId: "submenu-interface",
    submenuClass: "submenu",
    children: [
      { type: "submenu-button", label: "Tutoriel", buttonClass: "submenu-link", dataSection: "interface-tutoriel" },
      { type: "submenu-button", label: "Personnalisation", buttonClass: "submenu-link", dataSection: "interface-personnalisation" },
    ],
  },
  { type: "item", label: "Me contacter", buttonClass: "menu-item", dataSection: "contact" },
];

/* UTILITAIRES */
function $(selector, scope) { return (scope || document).querySelector(selector); }
function $all(selector, scope) { return Array.from((scope || document).querySelectorAll(selector)); }

/* CONSTRUCTION DU MENU */
function construireMenu() {
  const root = document.getElementById("menuRoot");
  if (!root || !Array.isArray(window.MENU_ITEMS)) return;
  root.innerHTML = "";

  window.MENU_ITEMS.forEach((item) => {
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

function activerSection(sectionName) {
  const targetId = "section-" + sectionName;
  const sections = $all(".content-section");
  if (sectionName !== "techniques") {
      const wrapper = $("#mon-conteneur-wrapper");
      if (wrapper) wrapper.classList.remove("is-visible");
  }
  else {
    // Quand on va sur la section techniques, on s'assure que le wrapper est visible
    const wrapper = $("#mon-conteneur-wrapper");
    if (wrapper) wrapper.classList.add("is-visible");
  }

  sections.forEach((sec) => {
    if (sec.id === targetId) sec.classList.add("is-active");
    else sec.classList.remove("is-active");
  });
}

function initMenu() {
  const sideMenu = $("#sideMenu");
  const headerMenuButton = $("#headerMenuButton");

  if (headerMenuButton && sideMenu) {
    headerMenuButton.addEventListener("click", () => {
      const isVisible = sideMenu.classList.toggle("is-visible");
      headerMenuButton.setAttribute("aria-expanded", String(isVisible));
    });
  }

  function setMainButtonActive(targetSection) {
    let targetButton = $all(".menu-item").find((b) =>
      b.getAttribute("data-section") === targetSection ||
      b.closest("li")?.querySelector(`[data-section="${targetSection}"]`)
    );
    if (targetSection.includes('-waza') || targetSection.includes('dachi') || targetSection.includes('kata') || targetSection === "techniques-categories") {
        targetButton = $all(".menu-item").find((b) => b.textContent?.trim().startsWith("Techniques"));
    }
    $all(".menu-item").forEach((b) => b.classList.remove("is-active"));
    if (targetButton) targetButton.classList.add("is-active");
  }

  const mainButtons = $all(".menu-item[data-section]");
  mainButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      activerSection(section);
      setMainButtonActive(section); 
      if (sideMenu) sideMenu.classList.remove("is-visible");
      if (headerMenuButton) headerMenuButton.setAttribute("aria-expanded", "false");
    });
  });

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

  const submenuLinks = $all(".submenu-link[data-section]");
  submenuLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      const videoFilter = btn.getAttribute("data-video-filter");
      if (section) activerSection(section);
      setMainButtonActive(section); 
      if (sideMenu) sideMenu.classList.remove("is-visible");
      if (headerMenuButton) headerMenuButton.setAttribute("aria-expanded", "false");
    });
  });

  const genericSectionTriggers = $all("[data-section]:not(.menu-item):not(.submenu-link)");
  genericSectionTriggers.forEach((el) => {
    el.addEventListener("click", () => {
      const section = el.getAttribute("data-section");
      if (!section) return;
      if (section !== "techniques") {
          const wrapper = $("#mon-conteneur-wrapper");
          if (wrapper) wrapper.classList.remove("is-visible");
      }
      activerSection(section);
      setMainButtonActive(section);
    });
  });
}

function initTechniques() {
  const wrapper = $("#mon-conteneur-wrapper");

  // 1) On détache tous les anciens listeners avant de les recréer
  const oldLinks = $all("[data-technique]");
  oldLinks.forEach((link) => {
    const clone = link.cloneNode(true);
    link.parentNode.replaceChild(clone, link);
  });

  // 2) On récupère de nouveau TOUS les éléments [data-technique] (y compris les tuiles générées dynamiquement)
  const techniqueLinks = $all("[data-technique]");

  techniqueLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const techniqueName = link.getAttribute("data-technique");
      if (!techniqueName) return;

      activerSection("techniques");

      const sideMenu = $("#sideMenu");
      const headerMenuButton = $("#headerMenuButton");

      if (sideMenu) sideMenu.classList.remove("is-visible");
      if (headerMenuButton) headerMenuButton.setAttribute("aria-expanded", "false");

      if (wrapper) wrapper.classList.add("is-visible");

      if (typeof window.afficherTechnique === "function") {
        window.afficherTechnique(techniqueName);
      }
    });
  });
}

function initTechniquesAccordion() {} // Vide

function initVideos() {
  if (window.renderVideosCategories) {
    window.renderVideosCategories();
  }

  const grid = $("#videosGrid");
  if (grid) grid.innerHTML = "";

  const tiles = $all("#section-videos .video-card-tile");

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const filter = tile.getAttribute("data-video-filter") || "";

      // 1. Met à jour l'état visuel des tuiles
      tiles.forEach((t) => t.classList.remove("is-active"));
      tile.classList.add("is-active");

      // 2. Construit la grille la première fois
      if (grid && grid.children.length === 0 && typeof window.construireVideos === "function") {
        window.construireVideos();
      }

      // 3. Filtre les vidéos
      if (typeof window.filtrerVideos === "function") {
        window.filtrerVideos(filter);
      }
    });
  });
}





function construireLexique(liste) {
  const container = document.getElementById("lexiqueListe");
  if (!container) return;

  container.innerHTML = "";

  if (!liste || liste.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Aucun terme ne correspond à votre recherche.";
    container.appendChild(empty);
    return;
  }

  liste.forEach((entry) => {
    // Cas spécial : retour à la ligne
    if (entry.term === "RetourLigne") {
      const br = document.createElement("div");
      br.className = "lexique-line-break";
      container.appendChild(br);
      return;
    }

    const item = document.createElement("article");
    item.className = "lexique-item";

    const h3 = document.createElement("h3");
    h3.className = "lexique-term";
    h3.textContent = entry.term;

    const p = document.createElement("p");
    p.className = "lexique-def";
    p.textContent = entry.def;

    item.appendChild(h3);
    item.appendChild(p);
    container.appendChild(item);
  });
}


function initLexique() {
  const searchInput = $("#lexiqueSearch");

  if (Array.isArray(window.LEXIQUE)) construireLexique(window.LEXIQUE);

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

const Captcha = { a: 0, b: 0, solution: 0 };
function genererCaptcha() {
  Captcha.a = Math.floor(Math.random() * 5) + 2;
  Captcha.b = Math.floor(Math.random() * 5) + 3;
  Captcha.solution = Captcha.a + Captcha.b;
  const label = $("#captchaQuestion");
  if (label) label.textContent = `Question de vérification * (combien font ${Captcha.a} + ${Captcha.b} ?)`;
  const input = $("#contactCaptcha");
  if (input) input.value = "";
}

function afficherErreur(champId, message) {
  const span = document.querySelector(`.form-error[data-for="${champId}"]`);
  if (span) span.textContent = message || "";
}

function initContactForm() {
  const form = $("#contactForm");
  if (!form) return;
  genererCaptcha();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = $("#contactEmail");
    const message = $("#contactMessage");
    const captchaInput = $("#contactCaptcha");
    const feedback = $("#contactFeedback");
    let ok = true;
    afficherErreur("contactEmail", "");
    afficherErreur("contactMessage", "");
    afficherErreur("contactCaptcha", "");
    if (feedback) { feedback.textContent = ""; feedback.style.color = ""; }
    if (!email || !email.value.trim()) { ok = false; afficherErreur("contactEmail", "Veuillez renseigner une adresse e-mail."); } 
    else if (!email.checkValidity()) { ok = false; afficherErreur("contactEmail", "Le format de l’adresse e-mail semble incorrect."); }
    if (!message || !message.value.trim()) { ok = false; afficherErreur("contactMessage", "Veuillez saisir un message."); }
    if (!captchaInput || !captchaInput.value.trim()) { ok = false; afficherErreur("contactCaptcha", "Veuillez répondre à la question de vérification."); } 
    else {
      const val = parseInt(captchaInput.value, 10);
      if (val !== Captcha.solution) { ok = false; afficherErreur("contactCaptcha", "La réponse est incorrecte. Essayez encore."); genererCaptcha(); }
    }
    if (!ok) {
      if (feedback) { feedback.textContent = "Le formulaire contient des erreurs. Merci de corriger les champs indiqués."; feedback.style.color = "#ff8080"; }
      return;
    }
    if (feedback) { feedback.textContent = "Envoi du message en cours…"; feedback.style.color = "#cccccc"; }
    form.submit();
  });
}

function initFooterYear() {
  const spanYear = $("#footerYear");
  if (spanYear) spanYear.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  const contentRoot = $("main.main-content");
  if (window.renderTechniquesSections && contentRoot) {
      window.renderTechniquesSections(contentRoot);
  }
  construireMenu();
  initMenu();
  initTechniques();
  initTechniquesAccordion();
  initVideos();
  initLexique();
  initPersonnalisation();
  initContactForm();
  initFooterYear();
});