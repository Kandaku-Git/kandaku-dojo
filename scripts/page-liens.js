// scripts/page-liens.js

// Données des liens utiles
window.LIENS_UTILES = [
  {
    label: "Fédération internationale Shotokan",
    url: "https://iskf.com",
  },
  {
    label: "Shotokan Karate-Do International",
    url: "https://www.skifworld.com",
  },
  {
    label: "France Shotokan",
    url: "https://franceshotokan.com",
  },
];

// Construit les cartes de liens dans #linksGrid
window.renderLiensUtiles = function () {
  const container = document.getElementById("linksGrid");
  if (!container) return;

  container.innerHTML = "";

  (window.LIENS_UTILES || []).forEach((lien) => {
    const card = document.createElement("article");
    card.className = "link-card";

    const h3 = document.createElement("h3");
    h3.textContent = lien.label;
    card.appendChild(h3);

    const a = document.createElement("a");
    a.href = lien.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "btn-link";
    a.textContent = "Visiter";

    card.appendChild(a);
    container.appendChild(card);
  });
};
