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

  grid.innerHTML = "";

  window.VIDEOS.forEach((video) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "technique-card video-card-item";
    card.dataset.category = video.categorie || "Autre";

    // clic = ouverture YouTube
    card.addEventListener("click", () => {
      if (video.url) {
        window.open(video.url, "_blank", "noopener,noreferrer");
      }
    });

    // Bloc texte (titre + sous-titre)
    const textDiv = document.createElement("div");

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = video.titre || "Vidéo de karaté";

    textDiv.appendChild(title);

    if (video.sousTitre) {
      const sub = document.createElement("p");
      sub.className = "card-description";
      sub.textContent = video.sousTitre;
      textDiv.appendChild(sub);
    }

    card.appendChild(textDiv);
    grid.appendChild(card);
  });
}



// Filtrage des cartes vidéo par catégorie
function filtrerVideos(categorie) {
  const cards = document.querySelectorAll(".video-card-item");
  cards.forEach((card) => {
    const cardCat = card.dataset.category || "Autre";
    if (!categorie) {
      card.style.display = "";
    } else {
      card.style.display = cardCat === categorie ? "" : "none";
    }
  });
}



// Construit les tuiles de catégories vidéo dans la section vidéos
window.renderVideosCategories = function () {
  const container = document.querySelector("#section-videos .video-tiles");
  if (!container || !window.VIDEOS_MENU || !Array.isArray(window.VIDEOS_MENU.children)) return;

  container.innerHTML = "";

  window.VIDEOS_MENU.children.forEach((child) => {
    const label = child.label;                 // "Kata", "Kihon", ...
    const filter = child.dataVideoFilter || ""; // "Kata", "Kihon", "Kumite", "Autre"

    const iconSrc = VIDEO_ICONS[filter] || "images/video-default.png";
    const description = VIDEO_DESCRIPTIONS[filter] || "";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "technique-card video-card-tile";
    button.setAttribute("data-video-filter", filter);

    // Bloc icône
    const iconDiv = document.createElement("div");
    iconDiv.className = "card-icon";

    const img = document.createElement("img");
    img.src = iconSrc;
    img.alt = label;
    img.loading = "lazy";
    img.className = "card-icon-image";

    iconDiv.appendChild(img);

    // Bloc texte
    const textDiv = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.className = "card-title";
    h3.textContent = label.toUpperCase();

    const p = document.createElement("p");
    p.className = "card-description";
    p.textContent = description;

    textDiv.appendChild(h3);
    textDiv.appendChild(p);

    // Assemblage
    button.appendChild(iconDiv);
    button.appendChild(textDiv);
    container.appendChild(button);
  });
};


// Initialisation locale des vidéos (appelée depuis menu.js)
window.initVideosModule = function () {
  construireVideos();

  if (window.renderVideosCategories) {
    window.renderVideosCategories();
  }

  const tiles = document.querySelectorAll("#section-videos .video-card-tile");
  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const filter = tile.getAttribute("data-video-filter") || "";
      filtrerVideos(filter);
    });
  });

  // Optionnel : afficher tout par défaut
  filtrerVideos(""); 
};

function afficherSeulementCategories() {
  const grid = $("#videosGrid");
  if (grid) grid.innerHTML = "";
}
