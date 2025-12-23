// --- CONFIG AFFICHAGE TECHNIQUES ---

// TUILES : Icônes par famille de techniques
const imageMap = {
  "Zuki Waza": "images/zuki-waza.png",
  "Empi Waza": "images/empi-waza.png",
  "Geri Waza": "images/geri-waza.png",
  "Uke Waza": "images/uke-waza.png",
  "Kata": "images/kata.png",
  "Dachi": "images/dachi.png",
};

// TUILES : Texte court affiché dans les tuiles de la grille
const descriptionMap = {
  "Zuki Waza": "Techniques d’attaque avec la main",
  "Empi Waza": "Percussions du coude",
  "Geri Waza": "Techniques de coups de pied",
  "Uke Waza": "Techniques de blocages",
  "Kata": "Enchaînements techniques codifiés",
  "Dachi": "Positions et postures de karaté",
};

// Texte d’intro en haut de la page de chaque catégorie
const subtitleMap = {
  "Zuki Waza": "Liste des coups de poing et attaques de main (Zuki, Shuto...)",
  "Empi Waza": "Liste des techniques de coude",
  "Geri Waza": "Liste des coups de pied",
  "Uke Waza": "Liste des techniques de blocage",
  "Kata": "Liste de Katas",
  "Dachi": "Liste des principales positions et postures",
};

window.TECHNIQUES_CATEGORIES = [
  {
    type: "category-techniques",
    label: "Zuki Waza",
    techniques: [
      { label: "Age Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
      { label: "Awase Zuki", dataTechnique: "Awase_Zuki", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Haishu Uchi", dataTechnique: "Haishu", dataSection: "techniques" },
      { label: "Haito Uchi", dataTechnique: "Haito", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Kagi Zuki", dataTechnique: "Kagi_Zuki", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Maite Zuki", dataTechnique: "Maite_Zuki", dataSection: "techniques" },
      { label: "Mawashi Tetsui Uchi", dataTechnique: "Mawashi_Tetsui_Uchi", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Oi Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Shuto Uchi", dataTechnique: "Shuto", dataSection: "techniques" },
      { label: "Sokumen Gyaku Zuki", dataTechnique: "Kagi_Zuki", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Tate Nukite", dataTechnique: "Nukite", dataSection: "techniques" },
      { label: "Tate Uraken Uchi", dataTechnique: "Uraken", dataSection: "techniques" },
      { label: "Tate Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
      { label: "Tetsui Uchi", dataTechnique: "Tetsui", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Ura Nukite", dataTechnique: "Nukite", dataSection: "techniques" },
      { label: "Ura Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
      { label: "Uraken Uchi", dataTechnique: "Uraken", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Yama Zuki", dataTechnique: "Yama_Zuki", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Zuki", dataTechnique: "Zuki", dataSection: "techniques" }
    ]
  },
  {
    type: "category-techniques",
    label: "Empi Waza",
    techniques: [
      { label: "Age Empi Uchi", dataTechnique: "Age_Empi_Uchi", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Mae Empi Uchi", dataTechnique: "Mae_Empi_Uchi", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Tate Empi Uchi", dataTechnique: "Age_Empi_Uchi", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Ushiro Empi Uchi", dataTechnique: "Ushiro_Empi_Uchi", dataSection: "techniques" }
    ]
  },
  {
    type: "category-techniques",
    label: "Geri Waza",
    techniques: [
      { label: "Fumikomi", dataTechnique: "Fumikomi", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Mae Geri", dataTechnique: "Mae_Geri", dataSection: "techniques" },
      { label: "Mae Hiza Geri", dataTechnique: "Mae_Hiza_Geri", dataSection: "techniques" },
      { label: "Mae Tobi Geri", dataTechnique: "Mae_Geri", dataSection: "techniques" },
      { label: "Mikazuki Geri", dataTechnique: "Mikazuki_Geri", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Ushiro Geri", dataTechnique: "Ushiro_Geri", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Yoko Geri", dataTechnique: "Yoko_Geri", dataSection: "techniques" }
    ]
  },
  {
    type: "category-techniques",
    label: "Uke Waza",
    techniques: [
      { label: "Empi Uke", dataTechnique: "Empi_Uke", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Gedan Barai", dataTechnique: "Gedan_Barai", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Haishu Uke", dataTechnique: "Haishu", dataSection: "techniques" },
      { label: "Haito Uke", dataTechnique: "Haito", dataSection: "techniques" },
      { label: "Haiwan Sokumen Uke", dataTechnique: "Haiwan_Sokumen_Uke", dataSection: "techniques" },
      { label: "Hasami Uke", dataTechnique: "Soto_Uke", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Jodan Age Uke", dataTechnique: "Jodan_Age_Uke", dataSection: "techniques" },
      { label: "Juji Uke", dataTechnique: "Juji_Uke", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Kake Uke", dataTechnique: "Kake_Uke", dataSection: "techniques" },
      { label: "Kakiwake Uke", dataTechnique: "Kakiwake_Uke", dataSection: "techniques" },
      { label: "Kosa Uke", dataTechnique: "Kosa_Uke", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Manji Uke", dataTechnique: "Manji_Uke", dataSection: "techniques" },
      { label: "Morote Uke", dataTechnique: "Morote_Uke", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Otoshi Uke", dataTechnique: "Otoshi_Uke", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Shuto Uke", dataTechnique: "Shuto_Uke", dataSection: "techniques" },
      { label: "Sokumen Awase Uke", dataTechnique: "Sokumen_Awase_Uke", dataSection: "techniques" },
      { label: "Soto Uke", dataTechnique: "Soto_Uke", dataSection: "techniques" },
      { label: "Sukui Uke", dataTechnique: "Sukui_Uke", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Tate Shuto Uke", dataTechnique: "Tate_Shuto_Uke", dataSection: "techniques" },
      { label: "Te Osae Uke", dataTechnique: "Te_Osae_Uke", dataSection: "techniques" },
      { label: "Teisho Kosa Uke", dataTechnique: "Teisho_Kosa_Uke", dataSection: "techniques" },
      { label: "Teisho Uke", dataTechnique: "Teisho", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Uchi Komi", dataTechnique: "Soto_Uke", dataSection: "techniques" },
      { label: "Uchi Uke", dataTechnique: "Uchi_Uke", dataSection: "techniques" },
      { label: "Uraken Uke", dataTechnique: "Uraken", dataSection: "techniques" }
    ]
  },
  {
    type: "category-techniques",
    label: "Kata",
    techniques: [
      { label: "Bassai Dai", dataTechnique: "Bassai_Dai", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Heian Shodan", dataTechnique: "Heian_Shodan", dataSection: "techniques" },
      { label: "Heian Nidan", dataTechnique: "Heian_Nidan", dataSection: "techniques" },
      { label: "Heian Sandan", dataTechnique: "Heian_Sandan", dataSection: "techniques" },
      { label: "Heian Yondan", dataTechnique: "Heian_Yondan", dataSection: "techniques" },
      { label: "Heian Godan", dataTechnique: "Heian_Godan", dataSection: "techniques" }
    ]
  },
  {
    type: "category-techniques",
    label: "Dachi",
    techniques: [
      { label: "Fudo Dachi", dataTechnique: "Fudo_Dachi", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Hachiji Dachi", dataTechnique: "Hachiji_Dachi", dataSection: "techniques" },
      { label: "Hangetsu Dachi", dataTechnique: "Hangetsu_Dachi", dataSection: "techniques" },
      { label: "Heisoku Dachi", dataTechnique: "Heisoku_Dachi", dataSection: "techniques" },
      { label: "Hiza Gamae", dataTechnique: "Hiza_Gamae", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Jiai No Gamae", dataTechnique: "Jiai_No_Gamae", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Kake Dachi", dataTechnique: "Kake_Dachi", dataSection: "techniques" },
      { label: "Kase Kokutsu Dachi", dataTechnique: "Kokutsu_Dachi", dataSection: "techniques" },
      { label: "Kata Hiza Dachi", dataTechnique: "Kata_Hiza_Dachi", dataSection: "techniques" },
      { label: "Kiba Dachi", dataTechnique: "Kiba_Dachi", dataSection: "techniques" },
      { label: "Kokutsu Dachi", dataTechnique: "Kokutsu_Dachi", dataSection: "techniques" },
      { label: "Kosa Dachi", dataTechnique: "Kake_Dachi", dataSection: "techniques" },
      { label: "Koshi Gamae", dataTechnique: "Koshi_Gamae", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Morote Koko Gamae", dataTechnique: "Morote_Koko_Gamae", dataSection: "techniques" },
      { label: "Moto Dachi", dataTechnique: "Zenkutsu_Dachi", dataSection: "techniques" },
      { label: "Musubi Dachi", dataTechnique: "Musubi_Dachi", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Neko Ashi Dachi", dataTechnique: "Neko_Ashi_Dachi", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Renoji Dachi", dataTechnique: "Renoji_Dachi", dataSection: "techniques" },
      { label: "Ryo Goshi Gamae", dataTechnique: "Ryo_Goshi_Gamae", dataSection: "techniques" },
      { label: "Ryoken Koshi Gamae", dataTechnique: "Ryoken_Koshi_Gamae", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Sanchin Dachi", dataTechnique: "Sanchin_Dachi", dataSection: "techniques" },
      { label: "Sochin Dachi", dataTechnique: "Fudo_Dachi", dataSection: "techniques" },
      { label: "Soete Koshi Gamae", dataTechnique: "Koshi_Gamae", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Teiji Dachi", dataTechnique: "Teiji_Dachi", dataSection: "techniques" },
      { label: "Tsuru Ashi Dachi", dataTechnique: "Tsuru_Ashi_Dachi", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Yumi Zuki", dataTechnique: "Yumi_Zuki", dataSection: "techniques" },
            { label: "", dataTechnique: "RetourLigne", dataSection: "techniques" },
      { label: "Zenkutsu Dachi", dataTechnique: "Zenkutsu_Dachi", dataSection: "techniques" }
    ]
  }
];

// --- FONCTIONS D’AFFICHAGE ---

function getTechniquesData() {
  return Array.isArray(window.TECHNIQUES_CATEGORIES)
    ? window.TECHNIQUES_CATEGORIES
    : [];
}

// TUILE de catégorie : icône
function getCategoryIcon(categoryLabel) {
  const src = imageMap[categoryLabel] || "images/default-technique.png";
  return src;
}

/**
 * Construit les tuiles de catégories dans la section "techniques-categories"
 */
function renderTechniquesCategories(container) {
  const data = getTechniquesData();
  if (!container || !Array.isArray(data)) {
    if (container) container.innerHTML = "";
    return;
  }

  const items = data.map((category) => {
    const label = category.label;
    return {
      label,
      iconSrc: getCategoryIcon(label),
      description: descriptionMap[label],
      dataAttrs: { "tech-category": label }
    };
  });

  window.renderCategoryTiles(container, items, {
    baseClass: "technique-card",
    tileClass: "tech-category-tile",
    onClick: (item, button) => {
      const label = item.label;

      // Visuel actif
      const tiles = container.querySelectorAll(".tech-category-tile");
      tiles.forEach((t) => t.classList.remove("is-active"));
      button.classList.add("is-active");

      // Reconstruction des items techniques
      const itemsContainer = document.getElementById("techniquesItemsContainer");
      if (itemsContainer) {
        renderTechniquesItems(itemsContainer, label);
      }
    }
  });
}



/**
 * Construit les lignes de techniques pour une catégorie donnée
 */
function renderTechniquesItems(container, categoryLabel) {
  if (!container) return;
  container.innerHTML = "";

  const allCategories = getTechniquesData();
  const category = allCategories.find(c => c.label === categoryLabel);
  if (!category || !Array.isArray(category.techniques)) return;

  const subtitle = subtitleMap[categoryLabel];
  if (subtitle) {
    const intro = document.createElement("p");
    intro.className = "techniques-intro";
    intro.textContent = subtitle;
    container.appendChild(intro);
  }

  const items = category.techniques.map((tech) => {
    if (tech.dataTechnique === "RetourLigne") {
      return { isSeparator: true };
    }

    return {
      label: tech.label,
      data: {
        technique: tech.dataTechnique || "",
        section: tech.dataSection || "techniques"
      },
      onClick: () => {
        const techniqueName = tech.dataTechnique;
        const categoryName = categoryLabel;
        if (!techniqueName) return;

        window.lastTechniqueFromGrid = { technique: techniqueName, category: categoryName };

        if (typeof window.activerSection === "function") {
          window.activerSection("techniques");
        }

        const wrapper = document.getElementById("mon-conteneur-wrapper");
        if (wrapper) {
          wrapper.classList.add("is-visible");
        }

        if (typeof window.afficherTechnique === "function") {
          window.afficherTechnique(techniqueName, categoryName);
        }
      }
    };
  });

  window.renderMetalLinesList(container, items, {
    listClass: "techniques-list-lines",
    lineClass: "technique-line"
  });

  if (typeof window.initTechniques === "function") {
    window.initTechniques();
  }
}





/**
 * Fonction appelée depuis menu.js pour construire la section Techniques
 * dans <main>. Elle crée deux zones :
 * - une grille de catégories (tuiles)
 * - une zone pour les tuiles de techniques de la catégorie sélectionnée
 */
window.renderTechniquesSections = function (root) {
  if (!root) return;

  // Crée la section "techniques-categories" si besoin
  let section = document.getElementById("section-techniques-categories");
  if (!section) {
    section = document.createElement("section");
    section.id = "section-techniques-categories";
    section.className = "content-section";
    section.setAttribute("aria-label", "Techniques");

    const h2 = document.createElement("h2");
    h2.textContent = "Techniques fondamentales";

    const intro = document.createElement("p");
    intro.textContent =
      "Cliquez sur une catégorie pour afficher les techniques correspondantes.";

    const categoriesContainer = document.createElement("div");
    categoriesContainer.className = "techniques-categories-grid";

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "techniques-items-container";
    itemsContainer.id = "techniquesItemsContainer";

    section.appendChild(h2);
    section.appendChild(intro);
    section.appendChild(categoriesContainer);
    section.appendChild(itemsContainer);

    root.insertBefore(section, root.firstChild);
  }

  const categoriesContainer = section.querySelector(
    ".techniques-categories-grid"
  );
  const itemsContainer = section.querySelector("#techniquesItemsContainer");

  // 1) Construire les tuiles de catégories
  renderTechniquesCategories(categoriesContainer);

  const tiles = section.querySelectorAll(".tech-category-tile");

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const label = tile.getAttribute("data-tech-category") || "";

      // état visuel : tuile active en gris
      tiles.forEach((t) => t.classList.remove("is-active"));
      tile.classList.add("is-active");

      // 2) À chaque clic, on reconstruit SEULEMENT les tuiles techniques
      renderTechniquesItems(itemsContainer, label);
    });
  });
};
