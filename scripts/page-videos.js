// scripts/page-videos.js
// --- DONNÉES VIDÉOS & CATÉGORIES ---
// Logos par catégorie vidéo
const VIDEO_ICONS = {
  Kata:  "images/kata.png",
  Kumite: "images/kumite.png",
  KarateContact: "images/karate-contact.png",
};

// Texte court affiché sur les tuiles
const VIDEO_DESCRIPTIONS = {
  Kata:  "",
  Kumite: "",
  KarateContact: "",
  MMA: "",
};

// Liste des vidéos
window.VIDEOS = [
  { url: "https://www.youtube.com/watch?v=yL9N3-Ig2Pc", categorie: "Kata", titre: "Empi", sousTitre: "Jérôme"},
  { url: "https://www.youtube.com/watch?v=2YOFAJ4orbc", categorie: "Kata", titre: "Gojushiho Sho", sousTitre: "Ronan"},
  { url: "https://www.youtube.com/watch?v=RsNdC9XJh7o", categorie: "Kata", titre: "Kanku Sho", sousTitre: "Romain"},
  { url: "https://www.youtube.com/watch?v=wm1XKTn0uc8", categorie: "Kata", titre: "Soshin", sousTitre: "Simon"},
  { url: "https://www.youtube.com/watch?v=0qH9ZYbMDXw", categorie: "Kata", titre: "Unsu", sousTitre: "Christophe"},

  { url: "https://www.youtube.com/watch?v=1kTu-mJ6q44", categorie: "Kumite", titre: "Thomas", sousTitre: "Ceinture rouge - SKDN"},
  { url: "https://www.youtube.com/watch?v=byQYgqzrdWQ", categorie: "Kumite", titre: "David", sousTitre: "Ceinture rouge - Herbignac, le 21/10//2007"},
  { url: "https://www.youtube.com/watch?v=597YU164d0I", categorie: "Kumite", titre: "Jérôme", sousTitre: "Ceinture rouge"},
  
  { url: "https://www.youtube.com/watch?v=XVOwTNezP2k", categorie: "KarateContact", titre: "Eve", sousTitre: "Ceinture rouge - Championnat de France de Karaté Contact 2006"},
  { url: "https://www.youtube.com/watch?v=gBUicdh1Dko", categorie: "KarateContact", titre: "Jérôme", sousTitre: "Ceinture rouge"},
  { url: "https://www.youtube.com/watch?v=IJkQGE-CEC4", categorie: "KarateContact", titre: "Jérôme", sousTitre: "Ceinture rouge"},
];

// Catégories de tuiles (plus de "Toutes les vidéos")
window.VIDEOS_MENU = {
  type: "category-videos",
  label: "Vidéos",
  children: [
    { label: "Kata",   dataVideoFilter: "Kata" },
    { label: "Kumite",  dataVideoFilter: "Kumite" },
    { label: "Karate Contact", dataVideoFilter: "KarateContact" },
  ],
};

// --- FONCTIONS D'AFFICHAGE VIDÉOS ---

// Construit la grille de vidéos dans #videosGrid
function construireVideos() {
  const grid = document.querySelector("#videosGrid");
  if (!grid || !Array.isArray(window.VIDEOS)) return;

  const items = window.VIDEOS.map((video) => ({
    label: video.titre || "Vidéo de karaté",
    description: video.sousTitre || "",          // ← sous-titre sur la même ligne
    data: {
      category: video.categorie || "Autre",
      url: video.url || ""
    },
    onClick: (line, item) => {
      const url = item.data.url;
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }
  }));

  window.renderMetalLinesList(grid, items, {
    listClass: "techniques-list-lines",
    lineClass: "technique-line video-line"
  });
}

// Filtrage des cartes vidéo par catégorie
function filtrerVideos(categorie) {
  const lines = document.querySelectorAll("#videosGrid .line-metal");
  lines.forEach((line) => {
    const cardCat = line.getAttribute("data-category") || "Autre";
    line.style.display = !categorie || cardCat === categorie ? "" : "none";
  });
}



// Construit les tuiles de catégories vidéo dans la section vidéos
window.renderVideosCategories = function () {
  const container = document.querySelector("#section-videos .video-tiles");
  if (!container || !window.VIDEOS_MENU || !Array.isArray(window.VIDEOS_MENU.children)) return;

  const items = window.VIDEOS_MENU.children.map((child) => {
    const label = child.label;                // "Kata", "Kumite", ...
    const filter = child.dataVideoFilter || ""; // "Kata", "Kumite", ...
    const iconSrc = VIDEO_ICONS[filter] || "images/video-default.png";
    const description = VIDEO_DESCRIPTIONS[filter] || "";

    return {
      label: label.toUpperCase(),
      iconSrc,
      description,
      dataAttrs: { "video-filter": filter }
    };
  });

  window.renderCategoryTiles(container, items, {
    baseClass: "technique-card",
    tileClass: "video-card-tile",
    onClick: (item, button) => {
      const filter = item.dataAttrs["video-filter"] || "";

      // état visuel actif si tu veux
      const tiles = container.querySelectorAll(".video-card-tile");
      tiles.forEach((t) => t.classList.remove("is-active"));
      button.classList.add("is-active");

      filtrerVideos(filter);
    }
  });
};



// Initialisation locale des vidéos (appelée depuis menu.js)
window.initVideosModule = function () {
  construireVideos();

  if (window.renderVideosCategories) {
    window.renderVideosCategories();
    // filtrage déjà géré dans onClick de renderCategoryTiles
    filtrerVideos(""); // tout afficher par défaut
  }
};


function afficherSeulementCategories() {
  const grid = $("#videosGrid");
  if (grid) grid.innerHTML = "";
}
