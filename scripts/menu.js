// scripts/menu.js
// Logique et données de navigation pour Kandaku Dojo.

/* ========================================================== */
/* A. DONNÉES DE NAVIGATION (Fusion de contenu-menu.js + menu.js) */
/* ========================================================== */

window.MENU_ITEMS = [
  {
    type: "item",
    label: "Accueil",
    buttonClass: "menu-item",
    dataSection: "accueil",
  },

  {
    type: "item", // CHANGÉ: de "group" à "item" pour pointer directement vers la grille
    label: "Techniques",
    buttonClass: "menu-item",
    dataSection: "techniques-categories", // La grille des 6 cartes
    // AJOUT DES DONNÉES TECHNIQUES COMPLÈTES ICI POUR sections.js
    children: [
      /* ZUKI WAZA */
      {
        type: "tech-category",
        label: "Zuki Waza",
        techniques: [
          { label: "Age Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
          { label: "Awase Zuki", dataTechnique: "Awase_Zuki", dataSection: "techniques" },
          { label: "Haishu Uchi", dataTechnique: "Haishu", dataSection: "techniques" },
          { label: "Haito Uchi", dataTechnique: "Haito", dataSection: "techniques" },
          { label: "Kagi Zuki", dataTechnique: "Kagi_Zuki", dataSection: "techniques" },
          { label: "Maite Zuki", dataTechnique: "Maite_Zuki", dataSection: "techniques" },
          { label: "Mawashi Tetsui Uchi", dataTechnique: "Mawashi_Tetsui_Uchi", dataSection: "techniques" },
          { label: "Oi Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
          { label: "Shuto Uchi", dataTechnique: "Shuto", dataSection: "techniques" },
          { label: "Sokumen Gyaku Zuki", dataTechnique: "Kagi_Zuki", dataSection: "techniques" },
          { label: "Tate Nukite", dataTechnique: "Nukite", dataSection: "techniques" },
          { label: "Tate Uraken Uchi", dataTechnique: "Uraken", dataSection: "techniques" },
          { label: "Tate Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
          { label: "Tetsui Uchi", dataTechnique: "Tetsui", dataSection: "techniques" },
          { label: "Ura Nukite", dataTechnique: "Nukite", dataSection: "techniques" },
          { label: "Ura Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
          { label: "Uraken Uchi", dataTechnique: "Uraken", dataSection: "techniques" },
          { label: "Yama Zuki", dataTechnique: "Yama_Zuki", dataSection: "techniques" },
          { label: "Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
        ],
      },

      /* EMPI WAZA */
      {
        type: "tech-category",
        label: "Empi Waza",
        techniques: [
          { label: "Age Empi Uchi", dataTechnique: "Age_Empi_Uchi", dataSection: "techniques" },
          { label: "Mae Empi Uchi", dataTechnique: "Mae_Empi_Uchi", dataSection: "techniques" },
          { label: "Tate Empi Uchi", dataTechnique: "Age_Empi_Uchi", dataSection: "techniques" },
          { label: "Ushiro Empi Uchi", dataTechnique: "Ushiro_Empi_Uchi", dataSection: "techniques" },
        ],
      },

      /* GERI WAZA */
      {
        type: "tech-category",
        label: "Geri Waza",
        techniques: [
          { label: "Fumikomi", dataTechnique: "Fumikomi", dataSection: "techniques" },
          { label: "Mae Geri", dataTechnique: "Mae_Geri", dataSection: "techniques" },
          { label: "Mae Hiza Geri", dataTechnique: "Mae_Hiza_Geri", dataSection: "techniques" },
          { label: "Mae Tobi Geri", dataTechnique: "Mae_Geri", dataSection: "techniques" },
          { label: "Mikazuki Geri", dataTechnique: "Mikazuki_Geri", dataSection: "techniques" },
          { label: "Ushiro Geri", dataTechnique: "Ushiro_Geri", dataSection: "techniques" },
          { label: "Yoko Geri", dataTechnique: "Yoko_Geri", dataSection: "techniques" },
        ],
      },

      /* UKE WAZA */
      {
        type: "tech-category",
        label: "Uke Waza",
        techniques: [
          { label: "Empi Uke", dataTechnique: "Empi_Uke", dataSection: "techniques" },
          { label: "Gedan Barai", dataTechnique: "Gedan_Barai", dataSection: "techniques" },
          { label: "Haishu Uke", dataTechnique: "Haishu", dataSection: "techniques" },
          { label: "Haito Uke", dataTechnique: "Haito", dataSection: "techniques" },
          { label: "Haiwan Sokumen Uke", dataTechnique: "Haiwan_Sokumen_Uke", dataSection: "techniques" },
          { label: "Hasami Uke", dataTechnique: "Soto_Uke", dataSection: "techniques" },
          { label: "Jodan Age Uke", dataTechnique: "Jodan_Age_Uke", dataSection: "techniques" },
          { label: "Juji Uke", dataTechnique: "Juji_Uke", dataSection: "techniques" },
          { label: "Kake Uke", dataTechnique: "Kake_Uke", dataSection: "techniques" },
          { label: "Kakiwake Uke", dataTechnique: "Kakiwake_Uke", dataSection: "techniques" },
          { label: "Kosa Uke", dataTechnique: "Kosa_Uke", dataSection: "techniques" },
          { label: "Manji Uke", dataTechnique: "Manji_Uke", dataSection: "techniques" },
          { label: "Morote Uke", dataTechnique: "Morote_Uke", dataSection: "techniques" },
          { label: "Otoshi Uke", dataTechnique: "Otoshi_Uke", dataSection: "techniques" },
          { label: "Shuto Uke", dataTechnique: "Shuto_Uke", dataSection: "techniques" },
          { label: "Sokumen Awase Uke", dataTechnique: "Sokumen_Awase_Uke", dataSection: "techniques" },
          { label: "Soto Uke", dataTechnique: "Soto_Uke", dataSection: "techniques" },
          { label: "Sukui Uke", dataTechnique: "Sukui_Uke", dataSection: "techniques" },
          { label: "Tate Shuto Uke", dataTechnique: "Tate_Shuto_Uke", dataSection: "techniques" },
          { label: "Te Osae Uke", dataTechnique: "Te_Osae_Uke", dataSection: "techniques" },
          { label: "Teisho Kosa Uke", dataTechnique: "Teisho_Kosa_Uke", dataSection: "techniques" },
          { label: "Teisho Uke", dataTechnique: "Teisho", dataSection: "techniques" },
          { label: "Uchi Komi", dataTechnique: "Soto_Uke", dataSection: "techniques" },
          { label: "Uchi Uke", dataTechnique: "Uchi_Uke", dataSection: "techniques" },
          { label: "Uraken Uke", dataTechnique: "Uraken", dataSection: "techniques" },
        ],
      },

      /* KATA */
      {
        type: "tech-category",
        label: "Kata",
        techniques: [
          { label: "Bassai Dai", dataTechnique: "Bassai_Dai", dataSection: "techniques" },
          { label: "Heian Shodan", dataTechnique: "Heian_Shodan", dataSection: "techniques" },
          { label: "Heian Nidan", dataTechnique: "Heian_Nidan", dataSection: "techniques" },
          { label: "Heian Sandan", dataTechnique: "Heian_Sandan", dataSection: "techniques" },
          { label: "Heian Yondan", dataTechnique: "Heian_Yondan", dataSection: "techniques" },
          { label: "Heian Godan", dataTechnique: "Heian_Godan", dataSection: "techniques" },
        ],
      },

      /* DACHI */
      {
        type: "tech-category",
        label: "Dachi",
        techniques: [
          { label: "Fudo Dachi", dataTechnique: "Fudo_Dachi", dataSection: "techniques" },
          { label: "Hachiji Dachi", dataTechnique: "Hachiji_Dachi", dataSection: "techniques" },
          { label: "Hangetsu Dachi", dataTechnique: "Hangetsu_Dachi", dataSection: "techniques" },
          { label: "Heisoku Dachi", dataTechnique: "Heisoku_Dachi", dataSection: "techniques" },
          { label: "Hiza Gamae", dataTechnique: "Hiza_Gamae", dataSection: "techniques" },
          { label: "Jiai No Gamae", dataTechnique: "Jiai_No_Gamae", dataSection: "techniques" },
          { label: "Kake Dachi", dataTechnique: "Kake_Dachi", dataSection: "techniques" },
          { label: "Kase Kokutsu Dachi", dataTechnique: "Kokutsu_Dachi", dataSection: "techniques" },
          { label: "Kata Hiza Dachi", dataTechnique: "Kata_Hiza_Dachi", dataSection: "techniques" },
          { label: "Kiba Dachi", dataTechnique: "Kiba_Dachi", dataSection: "techniques" },
          { label: "Kokutsu Dachi", dataTechnique: "Kokutsu_Dachi", dataSection: "techniques" },
          { label: "Kosa Dachi", dataTechnique: "Kake_Dachi", dataSection: "techniques" },
          { label: "Koshi Gamae", dataTechnique: "Koshi_Gamae", dataSection: "techniques" },
          { label: "Morote Koko Gamae", dataTechnique: "Morote_Koko_Gamae", dataSection: "techniques" },
          { label: "Moto Dachi", dataTechnique: "Zenkutsu_Dachi", dataSection: "techniques" },
          { label: "Musubi Dachi", dataTechnique: "Musubi_Dachi", dataSection: "techniques" },
          { label: "Neko Ashi Dachi", dataTechnique: "Neko_Ashi_Dachi", dataSection: "techniques" },
          { label: "Renoji Dachi", dataTechnique: "Renoji_Dachi", dataSection: "techniques" },
          { label: "Ryo Goshi Gamae", dataTechnique: "Ryo_Goshi_Gamae", dataSection: "techniques" },
          { label: "Ryoken Koshi Gamae", dataTechnique: "Ryoken_Koshi_Gamae", dataSection: "techniques" },
          { label: "Sanchin Dachi", dataTechnique: "Sanchin_Dachi", dataSection: "techniques" },
          { label: "Sochin Dachi", dataTechnique: "Fudo_Dachi", dataSection: "techniques" },
          { label: "Soete Koshi Gamae", dataTechnique: "Koshi_Gamae", dataSection: "techniques" },
          { label: "Teiji Dachi", dataTechnique: "Teiji_Dachi", dataSection: "techniques" },
          { label: "Tsuru Ashi Dachi", dataTechnique: "Tsuru_Ashi_Dachi", dataSection: "techniques" },
          { label: "Yumi Zuki", dataTechnique: "Yumi_Zuki", dataSection: "techniques" },
          { label: "Zenkutsu Dachi", dataTechnique: "Zenkutsu_Dachi", dataSection: "techniques" },
        ],
      },
    ],
  },

  {
    type: "group",
    label: "Vidéos",
    buttonClass: "menu-item menu-parent",
    submenuId: "submenu-videos",
    submenuClass: "submenu",
    children: [
      {
        type: "submenu-button",
        label: "Toutes les vidéos",
        buttonClass: "submenu-link",
        dataSection: "videos",
        dataVideoFilter: "Tous",
      },
      {
        type: "submenu-button",
        label: "Kata",
        buttonClass: "submenu-link",
        dataSection: "videos",
        dataVideoFilter: "Kata",
      },
      {
        type: "submenu-button",
        label: "Kihon",
        buttonClass: "submenu-link",
        dataSection: "videos",
        dataVideoFilter: "Kihon",
      },
      {
        type: "submenu-button",
        label: "Kumite",
        buttonClass: "submenu-link",
        dataSection: "videos",
        dataVideoFilter: "Kumite",
      },
      {
        type: "submenu-button",
        label: "Autres",
        buttonClass: "submenu-link",
        dataSection: "videos",
        dataVideoFilter: "Autre",
      },
    ],
  },

  {
    type: "item",
    label: "Lexique",
    buttonClass: "menu-item",
    dataSection: "lexique",
  },

  {
    type: "group",
    label: "Histoire",
    buttonClass: "menu-item menu-parent",
    submenuId: "submenu-histoire",
    submenuClass: "submenu",
    children: [
      {
        type: "submenu-button",
        label: "Origines du karaté",
        buttonClass: "submenu-link",
        dataSection: "histoire-origines",
      },
      {
        type: "submenu-button",
        label: "Histoire du dojo",
        buttonClass: "submenu-link",
        dataSection: "histoire-dojo",
      },
    ],
  },
  
  {
    type: "item",
    label: "Liens",
    buttonClass: "menu-item",
    dataSection: "liens",
  },

  {
    type: "group",
    label: "Interface",
    buttonClass: "menu-item menu-parent",
    submenuId: "submenu-interface",
    submenuClass: "submenu",
    children: [
      {
        type: "submenu-button",
        label: "Tutoriel",
        buttonClass: "submenu-link",
        dataSection: "interface-tutoriel",
      },
      {
        type: "submenu-button",
        label: "Personnalisation",
        buttonClass: "submenu-link",
        dataSection: "interface-personnalisation",
      },
    ],
  },

  {
    type: "item",
    label: "Me contacter",
    buttonClass: "menu-item",
    dataSection: "contact",
  },
];


/* ========================================================== */
/* B. OUTILS UTILITAIRES                                      */
/* ========================================================== */

function $(selector, scope) {
  return (scope || document).querySelector(selector);
}

function $all(selector, scope) {
  return Array.from((scope || document).querySelectorAll(selector));
}

/* ========================================================== */
/* C. LOGIQUE DE CONSTRUCTION ET NAVIGATION (Ancien menu.js)  */
/* ========================================================== */

function construireMenu() {
  const root = document.getElementById("menuRoot");
  if (!root || !Array.isArray(window.MENU_ITEMS)) return;

  root.innerHTML = "";

  window.MENU_ITEMS.forEach((item) => {
    const li = document.createElement("li");

    // Élément simple (Accueil, Lexique, Me contacter, Techniques, Liens)
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

    // Groupe avec sous-menu (Vidéos, Histoire, Interface)
    if (item.type === "group") {
      li.classList.add("has-submenu"); // Ajout de la classe utilitaire

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

      li.appendChild(ul);
    }

    root.appendChild(li);
  });
}

function activerSection(sectionName) {
  const targetId = "section-" + sectionName;
  const sections = $all(".content-section");
  
  // Fermer le diaporama si l'on quitte la section "techniques"
  if (sectionName !== "techniques") {
      const wrapper = $("#mon-conteneur-wrapper");
      if (wrapper) wrapper.classList.remove("is-visible");
  }

  sections.forEach((sec) => {
    if (sec.id === targetId) {
      sec.classList.add("is-active");
    } else {
      sec.classList.remove("is-active");
    }
  });
}

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

  // Fonction utilitaire pour gérer l'activation d'un bouton principal
  function setMainButtonActive(targetSection) {
    let targetButton = $all(".menu-item").find((b) =>
      b.getAttribute("data-section") === targetSection ||
      b.closest("li")?.querySelector(`[data-section="${targetSection}"]`)
    );
    
    // Si la section est une sous-page de Techniques (zuki-waza, etc.), on active le bouton "Techniques"
    if (targetSection.includes('-waza') || targetSection.includes('dachi') || targetSection.includes('kata') || targetSection === "techniques-categories") {
        targetButton = $all(".menu-item").find((b) =>
          b.textContent?.trim().startsWith("Techniques")
        );
    }

    $all(".menu-item").forEach((b) => b.classList.remove("is-active"));
    if (targetButton) {
        targetButton.classList.add("is-active");
    }
  }


  // Clic sur les éléments principaux (maintenant inclus "Techniques")
  const mainButtons = $all(".menu-item[data-section]");
  mainButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section");
      activerSection(section);
      setMainButtonActive(section); 

      // Replier le menu après sélection
      if (sideMenu) {
        sideMenu.classList.remove("is-visible");
      }
      if (headerMenuButton) {
        headerMenuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Gestion des parents avec sous-menu (accordéon)
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

      setMainButtonActive(section); 

      // Filtrage vidéos si demandé
      if (section === "videos" && videoFilter) {
        const select = $("#videoCategorie");
        if (select) {
          select.value = videoFilter;
          filtrerVideos(select.value);
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

  // Gère les clics sur les boutons des nouvelles sections Techniques :
  // 1. Bouton "Explorer les techniques" (section=techniques-categories)
  // 2. Cartes de catégories (section=zuki-waza, etc.)
  // 3. Boutons de retour des pages de listes (section=techniques-categories)
  // 4. Boutons de la liste des techniques (data-technique)

  const genericSectionTriggers = $all("[data-section]:not(.menu-item):not(.submenu-link)");
  genericSectionTriggers.forEach((el) => {
    el.addEventListener("click", () => {
      const section = el.getAttribute("data-section");
      if (!section) return;
      
      // Fermer le diaporama si on passe à une autre section (ex: de diaporama à catégorie)
      if (section !== "techniques") {
          const wrapper = $("#mon-conteneur-wrapper");
          if (wrapper) wrapper.classList.remove("is-visible");
      }
      
      activerSection(section);
      setMainButtonActive(section);
    });
  });
}

/* DIAPORAMA : GESTION DES LIENS DE TECHNIQUES */

function initTechniques() {
  const wrapper = $("#mon-conteneur-wrapper");

  // TOUS les boutons/liens avec data-technique
  const techniqueLinks = $all("[data-technique]");
  techniqueLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const techniqueName = link.getAttribute("data-technique");
      if (!techniqueName) return;

      // Afficher la section où le diaporama doit apparaître
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

      // Appeler le hook du diaporama
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

/* ACCORDEON POUR LES CATEGORIES DE TECHNIQUES (Obsolète) */
function initTechniquesAccordion() {
  // Vide
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

/* ========================================================== */
/* D. INITIALISATION GLOBALE                                  */
/* ========================================================== */

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