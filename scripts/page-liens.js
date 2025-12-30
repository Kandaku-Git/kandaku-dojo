// scripts/page-liens.js

// Données des liens utiles
window.LIENS_UTILES = [
  {
    label: "Kandaku's World",
    url: "http://kandaku.free.fr/index.html",
    comment:
      "C'est la version legacy du site actuel.",
  },
    {
    label: "Association Karaté Serémange",
    url: "https://karate-seremange.fr/",
    comment:
      "En plus de la présentation du club, la base technique de ce site est très impressionnante, ce qui en fait le complément idéal aux descriptions visuelles présentes dans le KDojo.",
  },
  {
    label: "karatedo.free.fr",
    url: "http://www.karatedo.free.fr/main.php3",
    comment:
      "Ce site web a été créé afin de regrouper un maximum d'informations et de médias utiles aux pratiquants du Karaté Shotokan. Il pourra sans doute intéresser également des artistes martiaux venant d'autres horizons.",
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

    // Commentaire sous le titre (même police que définitions du lexique via une classe CSS)
    if (lien.comment) {
      const p = document.createElement("p");
      p.className = "lexique-definition"; // adapte si ta classe est différente
      p.textContent = lien.comment;
      card.appendChild(p);
    }

    const a = document.createElement("a");
    a.href = lien.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "btn-link";
    a.textContent = "Visiter";

    card.appendChild(a);

    // Saut de ligne supplémentaire après le bouton
    const br = document.createElement("br");
    card.appendChild(br);

    container.appendChild(card);
  });
};
