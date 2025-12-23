// fonctions.js

/**
 * Construit une liste de lignes métalliques.
 * @param {HTMLElement} container - conteneur dans lequel injecter la liste
 * @param {Array} items - tableau d'objets
 *   {
 *     label: "Terme",
 *     description: "Définition",   // optionnel, pour le lexique
 *     data: { key: value },        // optionnel, data-*
 *     onClick: (line, item) => {}, // optionnel
 *     isSeparator: true            // optionnel, pour RetourLigne
 *   }
 * @param {Object} [options]
 *   options.listClass : classe(s) à ajouter au conteneur
 *   options.lineClass : classe(s) à ajouter à chaque ligne
 */
window.renderMetalLinesList = function (container, items, options = {}) {
  if (!container) return;

  container.innerHTML = "";

  const list = document.createElement("div");
  list.className = "line-list" + (options.listClass ? " " + options.listClass : "");

  items.forEach((item) => {
    // Séparateur de type "RetourLigne"
    if (item.isSeparator) {
      const br = document.createElement("div");
      br.className = "tech-line-break";
      list.appendChild(br);
      return;
    }

    const line = document.createElement("button");
    line.type = "button";
    line.className = "line-metal" + (options.lineClass ? " " + options.lineClass : "");

    // Data-* génériques
    if (item.data) {
      Object.entries(item.data).forEach(([key, value]) => {
        line.setAttribute("data-" + key, value);
      });
    }

    // Bloc texte : terme + définition sur la même ligne
    const title = document.createElement("span");
    title.className = "line-metal-title";
    title.textContent = item.label || "";
    line.appendChild(title);

    if (item.description) {
      const defSpan = document.createElement("span");
      defSpan.className = "line-metal-def";
      defSpan.textContent = item.description; // tiret inclus
      line.appendChild(defSpan);
    }


    if (typeof item.onClick === "function") {
      line.addEventListener("click", () => item.onClick(line, item));
    }

    list.appendChild(line);
  });

  container.appendChild(list);
};


/**
 * Construit une grille de tuiles de catégories réutilisable.
 *
 * @param {HTMLElement} container - Élément racine où injecter les tuiles.
 * @param {Array} items - Tableau d’objets de la forme :
 *   {
 *     label: "Zuki Waza",
 *     iconSrc: "images/zuki-waza.png",    // optionnel
 *     description: "Texte court",         // optionnel
 *     dataAttrs: { "cat": "Zuki Waza" }   // optionnel, => data-cat="Zuki Waza"
 *   }
 * @param {Object} options - Options d’affichage :
 *   {
 *     tileClass: "tech-category-tile",    // classe spécifique aux tuiles
 *     baseClass: "technique-card",        // classe commune (style carte)
 *     onClick: (item, button) => {}       // callback au clic
 *   }
 */
window.renderCategoryTiles = function (container, items, options = {}) {
  if (!container || !Array.isArray(items)) {
    if (container) container.innerHTML = "";
    return;
  }

  const {
    tileClass = "",
    baseClass = "technique-card",
    onClick = null
  } = options;

  container.innerHTML = "";

  items.forEach((item) => {
    const { label, iconSrc, description, dataAttrs = {} } = item || {};
    if (!label) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = `${baseClass}${tileClass ? " " + tileClass : ""}`;

    // Data-* génériques
    Object.keys(dataAttrs).forEach((key) => {
      button.setAttribute("data-" + key, dataAttrs[key]);
    });

    // Bloc icône
    if (iconSrc) {
      const iconDiv = document.createElement("div");
      iconDiv.className = "card-icon";

      const img = document.createElement("img");
      img.src = iconSrc;
      img.alt = label;
      img.loading = "lazy";
      img.className = "card-icon-image";

      iconDiv.appendChild(img);
      button.appendChild(iconDiv);
    }

    // Bloc texte
    const textDiv = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.className = "card-title";
    h3.textContent = label;
    textDiv.appendChild(h3);

    if (description) {
      const p = document.createElement("p");
      p.className = "card-description";
      p.textContent = description;
      textDiv.appendChild(p);
    }

    button.appendChild(textDiv);

    // Callback au clic
    if (typeof onClick === "function") {
      button.addEventListener("click", () => onClick(item, button));
    }

    container.appendChild(button);
  });
};
