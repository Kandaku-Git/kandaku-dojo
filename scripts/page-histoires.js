// scripts/page-histoires.js

window.HISTORY_MENU = {
  type: "category-history",
  label: "Histoire",
  children: [
    { type: "submenu-button", label: "Origines du karaté", buttonClass: "submenu-link", dataSection: "histoire-origines" },
    { type: "submenu-button", label: "Histoire du dojo", buttonClass: "submenu-link", dataSection: "histoire-dojo" }
  ]
};

// Construit les tuiles d'histoires dans la section principale histoire-origines
window.renderHistoryTiles = function () {
  const container = document.querySelector("#section-histoire-origines .history-tiles");
  if (!container || !window.HISTORY_MENU || !Array.isArray(window.HISTORY_MENU.children)) return;

  container.innerHTML = "";

  window.HISTORY_MENU.children.forEach((child) => {
    const tile = document.createElement("article");
    tile.className = "history-tile";
    tile.setAttribute("data-section", child.dataSection);

    const h3 = document.createElement("h3");
    h3.textContent = child.label;

    tile.appendChild(h3);
    container.appendChild(tile);
  });
};
