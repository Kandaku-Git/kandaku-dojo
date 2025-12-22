// fonctions.js

/**
 * Construit une liste de lignes métalliques.
 * @param {HTMLElement} container - conteneur dans lequel injecter la liste
 * @param {Array} items - tableau d'objets { label, data, onClick, isSeparator }
 * @param {Object} [options] - classes supplémentaires
 *   options.listClass : classe(s) à ajouter au conteneur
 *   options.lineClass : classe(s) à ajouter à chaque ligne
 */


window.renderMetalLinesList = function (container, items, options = {}) {
  if (!container) return;
  container.innerHTML = "";

  const list = document.createElement("div");
  list.className = "line-list" + (options.listClass ? " " + options.listClass : "");

  items.forEach((item) => {
    if (item.isSeparator) {
      const br = document.createElement("div");
      br.className = "tech-line-break";
      list.appendChild(br);
      return;
    }

    const line = document.createElement("button");
    line.type = "button";
    line.className = "line-metal" + (options.lineClass ? " " + options.lineClass : "");

    if (item.data) {
      Object.entries(item.data).forEach(([key, value]) => {
        line.setAttribute("data-" + key, value);
      });
    }

    const title = document.createElement("span");
    title.className = "line-metal-title";
    title.textContent = item.label || "";
    line.appendChild(title);

    if (typeof item.onClick === "function") {
      line.addEventListener("click", () => item.onClick(line, item));
    }

    list.appendChild(line);
  });

  container.appendChild(list);
};

