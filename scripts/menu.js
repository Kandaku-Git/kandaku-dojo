// scripts/menu.js
// Construction du menu depuis window.MENU_ITEMS + gestion du menu off-canvas,
// des sections, du diaporama, du lexique, des vidéos, de la personnalisation et du formulaire.

/* UTILITAIRES */

function $(selector, scope) {
  return (scope || document).querySelector(selector);
}

function $all(selector, scope) {
  return Array.from((scope || document).querySelectorAll(selector));
}

/* CONSTRUCTION DU MENU DEPUIS contenu-menu.js */

function construireMenu() {
  const root = document.getElementById("menuRoot");
  if (!root || !Array.isArray(window.MENU_ITEMS)) return;

  root.innerHTML = "";

  window.MENU_ITEMS.forEach((item) => {
    const li = document.createElement("li");

    // Élément simple (Accueil, Lexique, Liens, Me contacter)
    if (item.type === "item") {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = item.buttonClass || "menu-item";
      if (item.dataSection) {
        btn.setAttribute("data-section", item.dataSection);
      }
      btn.textContent = item.label;
      li.appendChild(btn);
    }

    // Groupe avec sous-menu (Techniques, Vidéos, Histoire, Interface)
    if (item.type === "group") {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = item.buttonClass || "menu-item menu-parent";
      btn.setAttribute("aria-expanded", "false");
      if (item.submenuId) {
        btn.setAttribute("aria-controls", item.submenuId);
      }
      btn.textContent = item.label;
      li.appendChild(btn);

      const ul = document.createElement("ul");
      ul.id = item.submenuId || "";
      ul.className = item.submenuClass || "submenu";

      // Cas particulier Techniques : catégories + techniques
      if (item.submenuId === "submenu-techniques") {
        (item.children || []).forEach((cat) => {
          if (cat.type === "tech-category") {
            const liGroup = document.createElement("li");
            liGroup.className = "tech-group";

            const toggle = document.createElement("button");
            toggle.type = "button";
            toggle.className = "tech-toggle";
            toggle.textContent = cat.label;
            liGroup.appendChild(toggle);

            const ulTech = document.createElement("ul");
            ulTech.className = "tech-list";

            (cat.techniques || []).forEach((t) => {
              const liTech = document.createElement("li");
              const a = document.createElement("a");
              a.href = "#";
              a.textContent = t.label;
              if (t.dataTechnique) {
                a.setAttribute("data-technique", t.dataTechnique);
              }
              if (t.dataSection) {
                a.setAttribute("data-section", t.dataSection);
              }
              liTech.appendChild(a);
              ulTech.appendChild(liTech);
            });

            liGroup.appendChild(ulTech);
            ul.appendChild(liGroup);
          }
        });
      } else {
        // Autres sous-menus (Vidéos, Histoire, Interface)
        (item.children || []).forEach((child) => {
          const liChild = document.createElement("li");

          if (child.type === "submenu-button") {
            const b = document.createElement("button");
            b.type = "button";
            b.className = child.buttonClass || "submenu-link";
            if (child.dataSection) {
              b.setAttribute("data-section", child.dataSection);
            }
            if (child.dataVideoFilter) {
              b.setAttribute("data-video-filter", child.dataVideoFilter);
            }
            b.textContent = child.label;
            liChild.appendChild(b);
          }

          ul.appendChild(liChild);
        });
      }

      li.appendChild(ul);
    }

    root.appendChild(li);
  });
}

/* ROUTAGE SIMPLE DES SECTIONS */

function activerSection(sectionName) {
  const targetId = "section-" + sectionName;
  const sections = $all(".content-section");
  sections.forEach((sec) => {
    if (sec.id === targetId) {
      sec.classList.add("is-active");
    } else {
      sec.classList.remove("is-active");
    }
  });
}

/* MENU OFF-CANVAS ET SOUS-MENUS */

function initMenu() {
  const sideMenu = $("#sideMenu");
  const headerMenuButton = $("#headerMenuButton");

  // Bouton MENU dans le header : ouvrir / fermer le panneau
  if (headerMenuButton && sideMenu) {
    headerMenuButton.addEventListener("click", () => {
      const isVisible = sideMenu.classList.toggle("is-visible");
      headerMenuButton.setAttribute("aria-expanded", String(isVisible));
    });
  }

  // Clic sur les éléments principaux (sans sous-menu ou liens simples)
  const mainButtons = $all(".menu-item[data-section]");
  mainButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      activerSection(section);

      // Visuel "actif"
      $all(".menu-item").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      // Replier le menu après sélection
      if (sideMenu) {
        sideMenu.classList.remove("is-visible");
      }
      if (headerMenuButton) {
        headerMenuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Gestion des parents avec sous-menu (accordéon : une seule catégorie ouverte)
  const parents = $all(".menu-parent");
  parents.forEach((parentBtn) => {
    const controlsId = parentBtn.getAttribute("aria-controls");
    const submenu = controlsId ? document.getElementById(controlsId) : null;

    parentBtn.addEventListener("click", () => {
      if (!submenu) return;

      const isCurrentlyOpen = submenu.classList.contains("is-open");

      // Fermer tous les sous-menus de catégories
      parents.forEach((otherBtn) => {
        const otherId = otherBtn.getAttribute("aria-controls");
        const otherSub = otherId ? document.getElementById(otherId) : null;
        if (otherSub) {
          otherSub.classList.remove("is-open");
          otherBtn.setAttribute("aria-expanded", "false");

          // Si c'est le sous-menu Techniques, on replie aussi ses sous-catégories
          if (otherSub.id === "submenu-techniques") {
            const techGroups = otherSub.querySelectorAll(".tech-group");
            techGroups.forEach((g) => g.classList.remove("is-open"));
          }
        }
      });

      // Si celui-ci n’était pas ouvert, on l’ouvre
      if (!isCurrentlyOpen) {
        submenu.classList.add("is-open");
        parentBtn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Sous-items de type bouton avec data-section (histoire, interface, vidéos)
  const submenuLinks = $all(".submenu-link[data-section]");
  submenuLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      const videoFilter = btn.getAttribute("data-video-filter");

      if (section) {
        activerSection(section);
      }

      // Activation visuelle sur l’item parent principal correspondant
      const parentLi = btn.closest(".has-submenu");
      const parentMainBtn = parentLi ? parentLi.querySelector(".menu-parent") : null;
      if (parentMainBtn) {
        $all(".menu-item").forEach((b) => b.classList.remove("is-active"));
        parentMainBtn.classList.add("is-active");
      }

      // Filtrage vidéos si demandé
      if (section === "videos" && videoFilter) {
        const select = $("#videoCategorie");
        if (select) {
          select.value = videoFilter;
          filtrerVideos(videoFilter);
        }
      }

      // Replier le menu après sélection
      if (sideMenu) {
        sideMenu.classList.remove("is-visible");
      }
      if (headerMenuButton) {
        headerMenuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Boutons qui déclenchent une section (ex. bouton "Explorer les techniques")
  const genericSectionTriggers = $all("[data-section]:not(.menu-item):not(.submenu-link)");
  genericSectionTriggers.forEach((el) => {
    el.addEventListener("click", () => {
      const section = el.getAttribute("data-section");
      if (!section) return;
      activerSection(section);

      if (section === "techniques") {
        const techniquesBtn = $all(".menu-item").find((b) =>
          b.textContent?.trim().startsWith("Techniques")
        );
        if (techniquesBtn) {
          $all(".menu-item").forEach((b) => b.classList.remove("is-active"));
          techniquesBtn.classList.add("is-active");
        }
      }
    });
  });
}

/* DIAPORAMA : GESTION DES LIENS DE TECHNIQUES */

function initTechniques() {
  const wrapper = $("#mon-conteneur-wrapper");

  // Tous les liens avec data-technique
  const techniqueLinks = $all("[data-technique]");
  techniqueLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const techniqueName = link.getAttribute("data-technique");
      if (!techniqueName) return;

      // Afficher la section "Techniques"
      activerSection("techniques");

      // Replier le menu après sélection
      const sideMenu = $("#sideMenu");
      const headerMenuButton = $("#headerMenuButton");
      if (sideMenu) {
        sideMenu.classList.remove("is-visible");
      }
      if (headerMenuButton) {
        headerMenuButton.setAttribute("aria-expanded", "false");
      }

      // Afficher le wrapper du diaporama
      if (wrapper) {
        wrapper.classList.add("is-visible");
      }

      // Appeler le hook du diaporama, qui sera implémenté dans diaporama.js
      if (typeof window.afficherTechnique === "function") {
        window.afficherTechnique(techniqueName);
      } else if (window.Diaporama && typeof window.Diaporama.afficherTechnique === "function") {
        window.Diaporama.afficherTechnique(techniqueName);
      } else {
        console.warn("Hook de diaporama non trouvé pour la technique :", techniqueName);
      }
    });
  });
}

/* ACCORDEON POUR LES CATEGORIES DE TECHNIQUES */

function initTechniquesAccordion() {
  const groups = $all(".submenu-techniques .tech-group");
  if (!groups.length) return;

  groups.forEach((group) => {
    const toggle = group.querySelector(".tech-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const isOpen = group.classList.contains("is-open");

      // Fermer tous les groupes
      groups.forEach((g) => g.classList.remove("is-open"));

      // Si celui-ci n'était pas ouvert, on l’ouvre
      if (!isOpen) {
        group.classList.add("is-open");
      }
    });
  });
}

/* VIDEOS : CONSTRUCTION + FILTRAGE (liens externes) */

function construireVideos() {
  const grid = $("#videosGrid");
  if (!grid || !Array.isArray(window.VIDEOS)) return;

  grid.innerHTML = "";

  window.VIDEOS.forEach((video, index) => {
    const card = document.createElement("article");
    card.className = "video-card";
    card.dataset.category = video.categorie || "Autre";

    const link = document.createElement("a");
    link.className = "video-link";
    link.href = video.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("data-video", String(index));

    const thumb = document.createElement("div");
    thumb.className = "video-thumb";

    const meta = document.createElement("div");
    meta.className = "video-meta";

    const title = document.createElement("div");
    title.className = "video-title";
    title.textContent = video.titre || "Vidéo de karaté";

    const cat = document.createElement("div");
    cat.className = "video-category";
    cat.textContent = video.categorie || "Autre";

    meta.appendChild(title);
    meta.appendChild(cat);

    link.appendChild(thumb);
    link.appendChild(meta);
    card.appendChild(link);

    grid.appendChild(card);
  });
}

function filtrerVideos(categorie) {
  const cards = $all(".video-card");
  cards.forEach((card) => {
    const cardCat = card.dataset.category || "Autre";
    if (!categorie || categorie === "Tous" || categorie === "Toutes") {
      card.style.display = "";
    } else {
      card.style.display = cardCat === categorie ? "" : "none";
    }
  });
}

function initVideos() {
  construireVideos();

  const select = $("#videoCategorie");
  if (select) {
    select.addEventListener("change", () => {
      filtrerVideos(select.value);
    });
    filtrerVideos(select.value);
  }
}

/* LEXIQUE */

function construireLexique(liste) {
  const container = $("#lexiqueListe");
  if (!container) return;
  container.innerHTML = "";

  if (!liste || liste.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Aucun terme ne correspond à votre recherche.";
    container.appendChild(empty);
    return;
  }

  const sorted = [...liste].sort((a, b) => a.term.localeCompare(b.term, "fr"));

  sorted.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "lexique-item";

    const term = document.createElement("div");
    term.className = "lexique-item-term";
    term.textContent = entry.term;

    const def = document.createElement("div");
    def.className = "lexique-item-def";
    def.textContent = entry.def;

    item.appendChild(term);
    item.appendChild(def);
    container.appendChild(item);
  });
}

function initLexique() {
  const searchInput = $("#lexiqueSearch");

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

/* PERSONNALISATION (CSS custom properties) */

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

/* FORMULAIRE DE CONTACT + CAPTCHA */

const Captcha = {
  a: 0,
  b: 0,
  solution: 0,
};

function genererCaptcha() {
  Captcha.a = Math.floor(Math.random() * 5) + 2; // 2 à 6
  Captcha.b = Math.floor(Math.random() * 5) + 3; // 3 à 7
  Captcha.solution = Captcha.a + Captcha.b;

  const label = $("#captchaQuestion");
  if (label) {
    label.textContent = `Question de vérification * (combien font ${Captcha.a} + ${Captcha.b} ?)`;
  }

  const input = $("#contactCaptcha");
  if (input) {
    input.value = "";
  }
}

function afficherErreur(champId, message) {
  const span = document.querySelector(`.form-error[data-for="${champId}"]`);
  if (span) {
    span.textContent = message || "";
  }
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

    // Réinitialiser les messages
    afficherErreur("contactEmail", "");
    afficherErreur("contactMessage", "");
    afficherErreur("contactCaptcha", "");
    if (feedback) {
      feedback.textContent = "";
      feedback.style.color = "";
    }

    // Validation email
    if (!email || !email.value.trim()) {
      ok = false;
      afficherErreur("contactEmail", "Veuillez renseigner une adresse e-mail.");
    } else if (!email.checkValidity()) {
      ok = false;
      afficherErreur("contactEmail", "Le format de l’adresse e-mail semble incorrect.");
    }

    // Validation message
    if (!message || !message.value.trim()) {
      ok = false;
      afficherErreur("contactMessage", "Veuillez saisir un message.");
    }

    // Validation captcha
    if (!captchaInput || !captchaInput.value.trim()) {
      ok = false;
      afficherErreur("contactCaptcha", "Veuillez répondre à la question de vérification.");
    } else {
      const val = parseInt(captchaInput.value, 10);
      if (val !== Captcha.solution) {
        ok = false;
        afficherErreur("contactCaptcha", "La réponse est incorrecte. Essayez encore.");
        genererCaptcha();
      }
    }

    if (!ok) {
      if (feedback) {
        feedback.textContent =
          "Le formulaire contient des erreurs. Merci de corriger les champs indiqués.";
        feedback.style.color = "#ff8080";
      }
      return;
    }

    // À partir d'ici, tout est valide : on envoie réellement le formulaire à Web3Forms
    if (feedback) {
      feedback.textContent = "Envoi du message en cours…";
      feedback.style.color = "#cccccc";
    }

    form.submit(); // laisse le navigateur POSTer vers https://api.web3forms.com/submit
  });
}


/* FOOTER */

function initFooterYear() {
  const spanYear = $("#footerYear");
  if (spanYear) {
    spanYear.textContent = String(new Date().getFullYear());
  }
}

/* INITIALISATION GLOBALE */

document.addEventListener("DOMContentLoaded", () => {
  construireMenu();           // construit le menu depuis contenu-menu.js
  initMenu();
  initTechniques();
  initTechniquesAccordion();
  initVideos();
  initLexique();
  initPersonnalisation();
  initContactForm();
  initFooterYear();
});
