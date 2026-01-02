/**
 * DIAPORAMA V1
 * Le diaporama est construit à partir d'images et d'un fichier .js dans techniques/<DOSSIER>
 * où <DOSSIER> est passé en paramètre.
 */

// 🔍 DEBUG GLOBAL — À LAISSER EN DEV, À RETIRER EN PROD
window.onerror = (msg, src, line, col, err) => {
  console.error(
    "❌ Erreur JS globale :",
    "\nMessage :", msg,
    "\nFichier :", src,
    "\nLigne :", line,
    "\nColonne :", col,
    "\nErreur :", err
  );
};

class Diaporama {
  /**
   * Constructeur principal du diaporama.
   * - Récupère le container.
   * - Initialise la config, l'état interne.
   * - Lance init().
   */
  constructor(containerId, config) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Laisser le CSS gérer l'apparence globale
    Object.assign(this.container.style, {
      display: "block",
      overflow: "hidden"
    });

    // Configuration par défaut
    this.defaults = {
      images: [],
      title: "",
      subtitle: "",
      description: "",
      slideDuration: 700,
      autoPlay: true,
      background: 1,
      technique: null,
      nombrePhotos: 1,
      extension: ".gif",
      donneesTexte: ""
    };

    // Config fusionnée (par défaut + config passée)
    this.config = Object.assign({}, this.defaults, config);

    // État interne
    this.state = {
      currentIndex: 0,
      isPlaying: this.config.autoPlay,
      isDetailsOpen: false,
      isTitleVisible: true,
      timerId: null,
      progressIntervalId: null,
      progressValue: 0,
      slideData: {},
      fixedData: { l1: "", l2: "" },
      vocabulary: {},
      history: [],
      isScrubbing: false,
      wasPlayingBeforeDetails: false,
      isSecondary: false,
      tooltipElement: null,
      tooltipTarget: null
    };

    this.isClosing = false; // Drapeau de fermeture

    this.init();
  }

  /**
   * Initialisation asynchrone :
   * - charge les données de la technique
   * - charge le vocabulaire si présent
   * - génère les images
   * - construit le DOM, bind les événements
   * - tente le plein écran
   * - démarre le diaporama
   */
  async init() {
    this.state.isSecondary = false;

    if (!this.config.technique) {
      return;
    }

    // 1. Charger les données du dossier
    await this.loadFolderData(this.config.technique);

    // 2. Charger le vocabulaire et parser les données texte si présentes
    if (this.config.donneesTexte) {
      await this.loadVocabulary();
      this.parseDataText(this.config.donneesTexte);
    }

    // 3. Générer la liste d'images
    this.generateImagesFromTechnique();
    if (!Array.isArray(this.config.images)) {
      this.config.images = [this.config.images];
    }
    if (this.config.images.length > 1) {
      this.config.images.sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
      );
    }

    // 4. Construire le DOM, mettre en cache et binder
    this.renderDOM();
    this.cacheDOM();
    this.bindEvents();

    // 5. Passer en plein écran si possible (sur le root unique)
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const root = this.dom?.root || this.container;
      if (root) {
        try {
          if (root.requestFullscreen) {
            await root.requestFullscreen();
          } else if (root.webkitRequestFullscreen) {
            root.webkitRequestFullscreen();
          }
        } catch (e) {
          // On ignore les erreurs de fullscreen (refus utilisateur, etc.)
        }
      }
    }

    // 6. Afficher la première slide et démarrer l'auto‑play
    this.showSlide(0);
    if (this.state.isPlaying) {
      this.startAutoSlide();
    }
  }

  /**
   * Reprise après une mise en veille / retour d'onglet:
   * - Si le plein écran est perdu, tente de le réactiver, sinon montre le bouton PE.
   * - Rafraîchit la slide et l'autoplay.
   */
  resumeFromSleep() {
    const wasFs =
      !!document.fullscreenElement ||
      !!document.webkitFullscreenElement;

    // 1) Si pas en plein écran → tentative de fullscreen
    if (!wasFs) {
      const root = this.dom?.root || this.container;

      if (root) {
        (async () => {
          try {
            if (root.requestFullscreen) {
              await root.requestFullscreen();
            } else if (root.webkitRequestFullscreen) {
              await root.webkitRequestFullscreen();
            }
          } catch (e) {
            // Refus utilisateur / navigateur → on ne fait rien ici
          }

          // Après tentative, on re-teste
          const stillNotFs =
            !document.fullscreenElement &&
            !document.webkitFullscreenElement;

          // Si toujours pas en plein écran → afficher le bouton PE
          const fsBtn = this.dom?.btns?.fs;
          if (stillNotFs && fsBtn) {
            fsBtn.classList.remove("diaporama-hidden");
            fsBtn.classList.add("diapo-fs-blink");
          }
        })();
      }

      // Rafraîchir la slide courante
      if (typeof this.showSlide === "function") {
        this.showSlide(this.state.currentIndex);
      }

      return;
    }

    // 2) Fullscreen encore actif → reprise normale
    if (typeof this.showSlide === "function") {
      this.showSlide(this.state.currentIndex);
    }

    if (this.state.isPlaying && typeof this.startAutoSlide === "function") {
      this.startAutoSlide();
    }
  }

  /* =======================
   *      CHARGEMENT DATA
   * ======================= */

  /**
   * Charge les données de la technique (COUNT, DESCRIPTION, DONNEES, etc.).
   */
  loadFolderData(techniqueName) {
    return new Promise((resolve) => {
      const oldScript = document.getElementById("diaporama-data-script");
      if (oldScript) oldScript.remove();

      ["COUNT", "DESCRIPTION", "DONNEES", "EXTENSION", "SLIDE_DURATION", "BACKGROUND"].forEach(v => delete window[v]);

      const legacyName = techniqueName.toUpperCase();
      delete window["DONNEES_" + legacyName];
      delete window["DESCRIPTION_" + legacyName];

      const script = document.createElement("script");
      script.id = "diaporama-data-script";
      script.src = `techniques/${techniqueName}/${techniqueName}.js?t=${new Date().getTime()}`;

      script.onload = () => {
        if (window.COUNT !== undefined) this.config.nombrePhotos = parseInt(window.COUNT);

        this.config.description = window.DESCRIPTION || window["DESCRIPTION_" + legacyName] || this.defaults.description;
        this.config.donneesTexte = window.DONNEES || window["DONNEES_" + legacyName] || "";

        if (window.EXTENSION) this.config.extension = window.EXTENSION;
        if (window.SLIDE_DURATION) this.config.slideDuration = parseInt(window.SLIDE_DURATION);
        if (window.BACKGROUND !== undefined) this.config.background = window.BACKGROUND;

        resolve(true);
      };
      script.onerror = () => { resolve(false); };
      document.body.appendChild(script);
    });
  }

  /**
   * Charge le vocabulaire global (scripts/vocabulaire.js) si nécessaire
   * et le parse vers this.state.vocabulary.
   */
  loadVocabulary() {
    return new Promise((resolve) => {
      if (window.VOCABULAIRE_TECHNIQUE) {
        this.parseVocabulary(window.VOCABULAIRE_TECHNIQUE);
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "scripts/vocabulaire.js";
      script.onload = () => {
        if (window.VOCABULAIRE_TECHNIQUE) {
          this.parseVocabulary(window.VOCABULAIRE_TECHNIQUE);
        }
        resolve();
      };
      script.onerror = () => resolve();
      document.body.appendChild(script);
    });
  }

  /**
   * Parse le texte du vocabulaire en tableau clé → définition.
   */
  parseVocabulary(text) {
    const lines = text.split("\n");
    lines.forEach((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const term = parts[0].trim();
        const def = parts.slice(1).join(":").trim();
        if (term && def) {
          this.state.vocabulary[term] = def;
        }
      }
    });
  }

  /**
   * Parse le contenu DONNEES (lignes FIXE_L1, FIXE_L2, <image>_L1, <image>_L2, <image>_TIME).
   */
  parseDataText(textContent) {
    this.state.slideData = {};
    this.state.fixedData = { l1: "", l2: "" };

    const lines = textContent.split("\n");
    lines.forEach((line) => {
      line = line.trim();
      if (!line) return;
      const match = line.match(/^([a-zA-Z0-9_\-]+)(.*)$/);
      if (!match) return;

      const key = match[1];
      let content = match[2] ? match[2].trim() : "";

      if (key === "FIXE_L1") {
        this.state.fixedData.l1 = content;
        return;
      }
      if (key === "FIXE_L2") {
        this.state.fixedData.l2 = content;
        return;
      }

      const lastUnderscore = key.lastIndexOf("_");
      if (lastUnderscore === -1) return;

      const type = key.substring(lastUnderscore + 1);
      const imageName = key.substring(0, lastUnderscore);

      if (!this.state.slideData[imageName]) {
        this.state.slideData[imageName] = { l1: null, l2: null, time: null };
      }

      if (type === "L1") this.state.slideData[imageName].l1 = content;
      if (type === "L2") this.state.slideData[imageName].l2 = content;
      if (type === "TIME") this.state.slideData[imageName].time = parseInt(content, 10);
    });
  }

  /**
   * Génère la liste d'URLs d'images à partir de la technique / nombrePhotos / extension.
   */
  generateImagesFromTechnique() {
    const { technique, nombrePhotos, extension } = this.config;
    this.config.images = [];
    for (let i = 1; i <= nombrePhotos; i++) {
      this.config.images.push(`techniques/${technique}/${technique}_${i}${extension}`);
    }
  }

  /* =======================
   *   TRAITEMENT DU TEXTE
   * ======================= */

  /**
   * Enrichit un texte HTML avec les spans de vocabulaire.
   * Protège le contenu entre <...> et "..." pour éviter les faux positifs.
   */
  enrichTextWithVocabulary(htmlText) {
    if (!htmlText) return "";
    let enriched = htmlText;
    Object.keys(this.state.vocabulary).forEach(term => {
      const regex = new RegExp(`(<[^>]+>|\"[^\"]+\")|(\\b${term}\\b)`, "gi");

      enriched = enriched.replace(regex, (match, protectedPart, foundTerm) => {
        if (protectedPart) return protectedPart;

        const def = this.state.vocabulary[term].replace(/"/g, "&quot;");
        return `<span class="diaporama-vocab" data-def="${def}">${foundTerm}</span>`;
      });
    });
    return enriched;
  }

  /**
   * Transforme les balises de lien personnalisées en spans cliquables.
   * - <<label>><target>> → span.diaporama-link avec data-target
   * - <Lien> → span.diaporama-link
   */
  parseLinks(htmlText) {
    if (!htmlText) return "";

    // Liens <<label>><target>>
    let processed = htmlText.replace(/<<([^>]+)>><([^>]+)>/g, (match, label, target) => {
      const targetClean = target.trim().replace(/\s+/g, "_");
      return `<span class="diaporama-link" data-target="${targetClean}">${label.trim()}</span>`;
    });

    // Liens <...> en ignorant <span ...> et </span>
    processed = processed.replace(/<([^>]+)>/g, (match, inner) => {
      const trimmed = inner.trim();
      if (trimmed.startsWith("span") || trimmed.startsWith("/span")) return match;
      const target = trimmed.replace(/\s+/g, "_");
      return `<span class="diaporama-link" data-target="${target}">${trimmed}</span>`;
    });

    return processed;
  }

  /**
   * Met à jour les textes L1 / L2 de la slide courante
   * avec les données fixes / par image + vocabulaire + liens.
   */
  updateDataText() {
    const fullPath = this.config.images[this.state.currentIndex];
    const filename = fullPath.split("/").pop().split(".")[0];

    let l1Text = this.config.title;
    let l2Text = this.config.subtitle;

    if (this.state.fixedData.l1) l1Text = this.state.fixedData.l1;
    if (this.state.fixedData.l2) l2Text = this.state.fixedData.l2;

    if (this.config.donneesTexte && this.state.slideData[filename]) {
      if (this.state.slideData[filename].l1) l1Text = this.state.slideData[filename].l1;
      if (this.state.slideData[filename].l2) l2Text = this.state.slideData[filename].l2;
    }

    // 1. Enrichissement vocabulaire
    l1Text = this.enrichTextWithVocabulary(l1Text);
    l2Text = this.enrichTextWithVocabulary(l2Text);

    // 2. Création des liens
    l1Text = this.parseLinks(l1Text);
    l2Text = this.parseLinks(l2Text);

    this.dom.txtL1.innerHTML = l1Text;
    this.dom.txtL2.innerHTML = l2Text;
  }

  /* =======================
   *      NAVIGATION
   * ======================= */

  /**
   * Charge un diaporama secondaire (clic sur lien L1/L2) :
   * - empile l'état courant dans history
   * - recharge les données pour la nouvelle technique
   * - reconstruit le DOM
   */
  async loadSubDiaporama(targetTechnique) {
    this.state.history.push({
      config: { ...this.config },
      index: this.state.currentIndex,
      slideData: { ...this.state.slideData },
      fixedData: { ...this.state.fixedData },
      isSecondary: this.state.isSecondary
    });

    this.stopAutoSlide();
    this.state.isPlaying = false;
    this.updatePlayPauseIcon();
    this.state.isSecondary = true;

    this.config.technique = targetTechnique;
    this.config.nombrePhotos = this.defaults.nombrePhotos;
    this.config.extension = this.defaults.extension;
    this.config.description = this.defaults.description;
    this.config.donneesTexte = "";
    this.config.title = "";
    this.config.background = this.defaults.background;
    this.config.slideDuration = this.defaults.slideDuration;

    await this.loadFolderData(targetTechnique);

    if (this.config.donneesTexte) {
      this.parseDataText(this.config.donneesTexte);
    }

    this.generateImagesFromTechnique();
    this.renderDOM();
    this.cacheDOM();
    this.bindEvents();
    this.dom.btns.back.classList.remove("diaporama-hidden");

    this.state.isPlaying = true;
    this.updatePlayPauseIcon();
    this.showSlide(0);
    this.startAutoSlide();
  }

  /**
   * Restaure le diaporama parent à partir de la pile history.
   */
  restoreParentDiaporama() {
    if (this.state.history.length === 0) return;
    const previousState = this.state.history.pop();

    this.stopAutoSlide();
    this.config = previousState.config;
    this.state.slideData = previousState.slideData;
    this.state.fixedData = previousState.fixedData;
    this.state.isSecondary = previousState.isSecondary;

    if (this.state.history.length === 0) this.state.isSecondary = false;

    this.renderDOM();
    this.cacheDOM();
    this.bindEvents();

    if (this.state.history.length === 0) {
      this.dom.btns.back.classList.add("diaporama-hidden");
    } else {
      this.dom.btns.back.classList.remove("diaporama-hidden");
    }

    this.state.isPlaying = false;
    this.updatePlayPauseIcon();

    this.showSlide(previousState.index);
  }

  /**
   * Navigation manuelle suivante / précédente.
   */
  manualNav(dir) {
    this.stopAutoSlide();
    this.showSlide(this.state.currentIndex + dir);
  }

  /**
   * Toggle lecture/pause.
   */
  togglePlay() {
    // Lecture/pause valable pour principal ET secondaire
    this.state.isPlaying = !this.state.isPlaying;
    this.updatePlayPauseIcon();
    this.state.isPlaying ? this.startAutoSlide() : this.stopAutoSlide();
  }

  /**
   * Démarre l'autoplay + la progression de la jauge.
   */
  startAutoSlide() {
    if (this.state.timerId) clearTimeout(this.state.timerId);
    if (this.state.progressIntervalId) clearInterval(this.state.progressIntervalId);

    if (this.state.isDetailsOpen || this.state.isScrubbing) return;

    const totalSlides = this.config.images.length || 1;

    // Cas particulier : une seule diapo → barre toujours pleine, pas d'autoplay
    if (totalSlides === 1) {
      if (this.dom.gaugeFill) {
        this.dom.gaugeFill.style.width = "100%";
      }
      return;
    }

    const fullPath = this.config.images[this.state.currentIndex];
    const filename = fullPath ? fullPath.split("/").pop().split(".")[0] : "";
    let duration = this.config.slideDuration;

    if (this.state.slideData[filename] && this.state.slideData[filename].time) {
      duration = this.state.slideData[filename].time;
    }

    this.state.timerId = setTimeout(() => {
      this.showSlide(this.state.currentIndex + 1);
    }, duration);

    const basePercent = (this.state.currentIndex / totalSlides) * 100;
    const targetPercent = ((this.state.currentIndex + 1) / totalSlides) * 100;

    let w = basePercent;
    const intervalStep = 50;
    const step = (targetPercent - basePercent) / (duration / intervalStep);

    this.state.progressIntervalId = setInterval(() => {
      w += step;
      if (w >= targetPercent) {
        w = targetPercent;
        clearInterval(this.state.progressIntervalId);
        this.state.progressIntervalId = null;
      }
      if (this.dom.gaugeFill) {
        this.dom.gaugeFill.style.width = w + "%";
      }
    }, intervalStep);
  }

  /**
   * Arrête l'autoplay et la progression.
   */
  stopAutoSlide() {
    if (this.state.timerId) clearTimeout(this.state.timerId);
    if (this.state.progressIntervalId) clearInterval(this.state.progressIntervalId);
  }

  /**
   * Réinitialise la jauge de progression.
   */
  resetProgress() {
    const totalSlides = this.config.images.length || 1;
    if (!this.dom.gaugeFill) return;

    if (totalSlides === 1) {
      this.dom.gaugeFill.style.width = "100%";
    } else {
      this.dom.gaugeFill.style.width = "0%";
    }
  }

  /**
   * Gestion du bouton "œil" :
   * - bascule entre mode diaporama et mode description.
   */
  handleEyeClick() {
    const slide = this.dom.slides[this.state.currentIndex];

    if (!this.state.isDetailsOpen) {
      // Passage DIAPORAMA → DESCRIPTION
      if (this.state.isTitleVisible) {
        this.toggleTitle();
      }
      this.toggleDetails();
    } else {
      // Passage DESCRIPTION → DIAPORAMA
      this.toggleDetails();

      if (!this.state.isTitleVisible) {
        this.toggleTitle();
      }

      this.showSlide(this.state.currentIndex);
    }
  }

  /**
   * Ouvre / ferme la zone de description détaillée.
   */
  toggleDetails() {
    this.state.isDetailsOpen = !this.state.isDetailsOpen;
    const slide = this.dom.slides[this.state.currentIndex];

    if (this.state.isDetailsOpen) {
      const contentDiv = slide.querySelector(".diaporama-description-content");
      if (slide.classList.contains("is-error")) {
        contentDiv.innerHTML =
          '<div style="text-align:center; margin-top:20px; font-weight:bold; color:#fbbf24; font-size:1.2rem;">Désolé, ce contenu sera bientôt disponible.</div>';
      } else {
        contentDiv.innerHTML = this.config.description || "Pas de description détaillée.";
      }

      slide.classList.add("diaporama-details-active");
      this.dom.btns.eye.classList.add("active");

      // Mémoriser l'état de lecture avant description
      this.state.wasPlayingBeforeDetails = this.state.isPlaying;

      // Mettre en pause pendant la description
      this.state.isPlaying = false;
      this.updatePlayPauseIcon();
      this.stopAutoSlide();
    } else {
      slide.classList.remove("diaporama-details-active");
      this.dom.btns.eye.classList.remove("active");

      // Sortie de description
      if (this.state.isSecondary) {
        // Diaporama secondaire : reprend l'état précédent
        if (this.state.wasPlayingBeforeDetails) {
          this.state.isPlaying = true;
          this.updatePlayPauseIcon();
          this.startAutoSlide();
        } else {
          this.state.isPlaying = false;
          this.updatePlayPauseIcon();
          this.stopAutoSlide();
        }
      } else {
        // Diaporama principal : reste en pause
        this.state.isPlaying = false;
        this.updatePlayPauseIcon();
        this.stopAutoSlide();
      }
    }
  }

  /**
   * Affiche / masque les titres L1/L2 + titre principal.
   */
  toggleTitle() {
    this.state.isTitleVisible = !this.state.isTitleVisible;
    this.dom.titleZone.classList.toggle("hidden", !this.state.isTitleVisible);
    this.dom.mainTitle.classList.toggle("hidden", !this.state.isTitleVisible);
    this.dom.btns.eye.classList.toggle("active", !this.state.isTitleVisible);
  }

  /* =======================
   *      RENDU / DOM
   * ======================= */

  /**
   * Met à jour l'icône lecture/pause.
   */
  updatePlayPauseIcon() {
    this.dom.icons.play.classList.toggle("diaporama-hidden", this.state.isPlaying);
    this.dom.icons.pause.classList.toggle("diaporama-hidden", !this.state.isPlaying);
  }

  /**
   * Construit (ou met à jour) le root unique #diaporama-root
   * et tout le contenu du diaporama.
   */
  renderDOM() {
    // Si on est en train de fermer le diaporama, ne redessine rien
    if (this.isClosing) return;

    let bgStyle = "";
    const bg = this.config.background;
    if (bg === 1) bgStyle = "background-color: #FFF;";
    else if (bg === 0) bgStyle = "background-color: #000;";
    else if (bg === "transparent") bgStyle = "background-color: transparent;";
    else if (typeof bg === "string") {
      if (bg.startsWith("#") || bg.startsWith("rgb")) {
        bgStyle = `background-color: ${bg};`;
      } else {
        bgStyle = `background-image: url('${bg}'); background-size: cover; background-position: center;`;
      }
    }

    const mainTitle = (this.config.title || this.config.technique || "").replace(/_/g, " ");

    const slidesHTML = this.config.images
      .map(
        (url, index) => `
        <div class="diaporama-slide" data-index="${index}">
          <div class="diaporama-slide-bg" style="background-image: url('${url}');">
            <img src="${url}" style="display:none;" onerror="this.parentElement.style.backgroundImage = 'url(images/travaux.png)'; this.closest('.diaporama-slide').classList.add('is-error');">
          </div>
          <div class="diaporama-details">
            <div class="diaporama-description-content">
              ${this.config.description || "Pas de description détaillée."}
            </div>
          </div>
        </div>
      `
      )
      .join("");

    const backBtnClass = this.state.history.length > 0 ? "" : "diaporama-hidden";

    // 1) Assurer l'existence d'un root unique
    let root = document.getElementById("diaporama-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "diaporama-root";
      root.className = "diaporama-wrapper";
      this.container.innerHTML = "";
      this.container.appendChild(root);
    }

    // 2) Mettre à jour le style du root et son contenu interne
    root.setAttribute("style", bgStyle);

    root.innerHTML = `
    <h1 class="diaporama-main-title">${mainTitle}</h1>
    <div id="diaporama-slider" class="diaporama-slider-container">
      ${slidesHTML}
      <div class="diaporama-tap-zone diaporama-tap-left" id="diaporama-tap-left"></div>
      <div class="diaporama-tap-zone diaporama-tap-right" id="diaporama-tap-right"></div>
      <div id="diaporama-toast" class="diaporama-toast"></div>
    </div>
    <div id="diaporama-title-zone" class="diaporama-title-zone">
      <h2 id="diaporama-text-l1" class="diaporama-text-l1">...</h2>
      <p id="diaporama-text-l2" class="diaporama-text-l2"></p>
    </div>
    <div class="diaporama-controls">
      <div class="diaporama-controls-top">
        <div class="diaporama-btn-group">
          <button class="diaporama-btn" id="diaporama-prev" title="Précédent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <button class="diaporama-btn" id="diaporama-play" title="Lecture/Pause">
            <svg id="icon-play" class="${this.state.isPlaying ? "diaporama-hidden" : ""}" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <svg id="icon-pause" class="${this.state.isPlaying ? "" : "diaporama-hidden"}" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          </button>
          <button class="diaporama-btn" id="diaporama-next" title="Suivant">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        <div class="diaporama-btn-group">
          <button class="diaporama-btn ${backBtnClass}" id="diaporama-back" title="Retour au menu précédent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 14 4 9l5-5"/>
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/>
            </svg>
          </button>

          <!-- 👁 = titres -->
          <button class="diaporama-btn" id="diaporama-eye" title="Afficher/Masquer les titres">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>

          <button class="diaporama-btn diapo-fs-blink ${
            document.fullscreenElement || document.webkitFullscreenElement ? "diaporama-hidden" : ""
          }" id="diaporama-fs" title="Plein écran">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </button>

          <a href="index.html" class="diaporama-btn" id="diaporama-home" title="Accueil"
             style="text-decoration:none;display:flex;align-items:center;justify-content:center;">
            <svg class="diaporama-icon" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#ff0000ff" stroke-width="1.5" stroke-linejoin="round"></path>
              <rect x="10.5" y="16" width="3" height="5" fill="#f50626ff" stroke="none"></rect>
            </svg>
          </a>
        </div>
      </div>

      <div class="diaporama-controls-bottom">
        <div id="diaporama-gauge-container" class="diaporama-gauge-container" title="Faire glisser pour défiler">
          <div id="diaporama-gauge-fill" class="diaporama-gauge-fill"></div>
        </div>
      </div>
    </div>
  `;
  }

  /**
   * Met en cache les principaux éléments DOM pour accès rapide.
   */
  cacheDOM() {
    const id = (id) => document.getElementById(id);
    const sel = (sel) => document.querySelectorAll(sel);

    this.dom = {
      root: id("diaporama-root"),
      slider: id("diaporama-slider"),
      slides: sel(".diaporama-slide"),
      gaugeContainer: id("diaporama-gauge-container"),
      gaugeFill: id("diaporama-gauge-fill"),
      titleZone: id("diaporama-title-zone"),
      mainTitle: document.querySelector(".diaporama-main-title"),
      txtL1: id("diaporama-text-l1"),
      txtL2: id("diaporama-text-l2"),
      icons: {
        play: id("icon-play"),
        pause: id("icon-pause")
      },
      btns: {
        prev: id("diaporama-prev"),
        next: id("diaporama-next"),
        play: id("diaporama-play"),
        back: id("diaporama-back"),
        eye: id("diaporama-eye"),
        home: id("diaporama-home"),
        fs: id("diaporama-fs")
      }
    };
  }

  /**
   * Attache tous les écouteurs d'événements :
   * - boutons
   * - vocabulaire / liens
   * - scrubbing
   * - toast
   * - fullscreen
   * - sortie de veille
   */
  bindEvents() {
    const b = this.dom.btns;

    // Bouton plein écran : entrée uniquement (pas de sortie)
    if (b.fs) {
      b.fs.onclick = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const root = this.dom.root || this.container;
        if (!root) return;

        // Si on est déjà en plein écran, on ne fait rien
        if (document.fullscreenElement || document.webkitFullscreenElement) {
          return;
        }

        try {
          if (root.requestFullscreen) {
            await root.requestFullscreen();
          } else if (root.webkitRequestFullscreen) {
            await root.webkitRequestFullscreen();
          }
        } catch (e) {
          // refus navigateur / utilisateur : on ignore
        }
      };
    }

    // Met à jour l’apparence du bouton en fonction du fullscreen
    document.addEventListener("fullscreenchange", () => {
      const isFs =
        !!document.fullscreenElement ||
        !!document.webkitFullscreenElement;

      if (!this.dom?.btns?.fs) return;

      if (isFs) {
        this.dom.btns.fs.classList.add("diaporama-hidden");
        this.dom.btns.fs.classList.remove("diapo-fs-blink");
      } else {
        this.dom.btns.fs.classList.remove("diaporama-hidden");
        this.dom.btns.fs.classList.add("diapo-fs-blink");
      }
    });

    // Boutons principaux
    b.next.onclick = () => this.manualNav(1);
    b.prev.onclick = () => this.manualNav(-1);
    b.play.onclick = () => this.togglePlay();
    b.eye.onclick = () => this.handleEyeClick();
    b.back.onclick = () => this.restoreParentDiaporama();

    // 🏠 Bouton maison : fermer le diaporama et retourner au menu
    if (b.home) {
      b.home.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.isClosing = true;

        const wrapper = document.getElementById("mon-conteneur-wrapper");
        if (wrapper) {
          wrapper.classList.remove("is-visible");
        }

        if (document.fullscreenElement || document.webkitFullscreenElement) {
          (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
        }

        const container = this.container || document.getElementById("mon-conteneur");
        if (container) {
          container.innerHTML = "";
        }

        this.stopAutoSlide();

        if (window.diaporamaInstance && typeof window.diaporamaInstance.destroy === "function") {
          try { window.diaporamaInstance.destroy(); } catch (e) {}
          window.diaporamaInstance = null;
        }

        if (typeof window.activerSection === "function") {
          window.activerSection("techniques-categories");
        }

        return false;
      };
    }

    // Clics dans la zone de titre (vocabulaire & liens)
    this.dom.titleZone.addEventListener("click", (e) => {
      // 1. Vocabulaire
      const vocabEl = e.target.closest(".diaporama-vocab");
      if (vocabEl && this.dom.titleZone.contains(vocabEl)) {
        const def = vocabEl.getAttribute("data-def");
        if (def) {
          if (this.state.tooltipTarget === vocabEl) {
            this.hideVocabularyTooltip();
          } else {
            this.showVocabularyTooltip(vocabEl, def);
          }
        }
        return;
      }

      // 2. Liens
      const linkEl = e.target.closest(".diaporama-link");
      if (linkEl && this.dom.titleZone.contains(linkEl)) {
        const target = linkEl.getAttribute("data-target");
        if (target) this.loadSubDiaporama(target);
        return;
      }
    });

    // Empêcher les clics dans la zone détails de fermer / déclencher autre chose
    this.dom.slides.forEach((slide) => {
      const details = slide.querySelector(".diaporama-details");
      if (details) {
        details.addEventListener("pointerdown", (e) => {
          e.stopPropagation();
        });
        details.addEventListener("pointerup", (e) => {
          if (
            e.target.tagName === "A" ||
            e.target.classList.contains("diaporama-link")
          ) {
            return;
          }
          e.stopPropagation();
          if (this.state.isDetailsOpen) {
            this.toggleDetails();
          }
        });
      }
    });

    // Scrubbing sur la jauge
    let startX = 0;
    let isDrag = false;

    const handleScrubbing = (clientX, targetElement) => {
      const rect = targetElement.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;

      const percent = x / rect.width;
      const total = this.config.images.length || 1;

      let targetIndex = Math.floor(percent * total);
      if (targetIndex >= total) targetIndex = total - 1;

      if (this.dom.gaugeFill) {
        const globalPercent = ((targetIndex + 1) / total) * 100;
        this.dom.gaugeFill.style.width = `${globalPercent}%`;
      }

      if (targetIndex !== this.state.currentIndex) {
        this.showSlide(targetIndex);
      }
    };

    this.dom.gaugeContainer.addEventListener("pointerdown", (e) => {
      if (this.state.isSecondary) return;

      this.state.isScrubbing = true;
      this.stopAutoSlide();
      this.dom.gaugeContainer.setPointerCapture(e.pointerId);

      handleScrubbing(e.clientX, this.dom.gaugeContainer);
    });

    this.dom.gaugeContainer.addEventListener("pointermove", (e) => {
      if (!this.state.isScrubbing) return;
      handleScrubbing(e.clientX, this.dom.gaugeContainer);
    });

    this.dom.gaugeContainer.addEventListener("pointerup", (e) => {
      if (this.state.isScrubbing) {
        this.state.isScrubbing = false;
        this.dom.gaugeContainer.releasePointerCapture(e.pointerId);
        if (this.state.isPlaying) {
          this.startAutoSlide();
        }
      }
    });

    // Scrubbing / clic sur toute la zone slider
    this.dom.slider.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".diaporama-toast")) return;
      if (e.target.closest(".diaporama-details") && this.state.isDetailsOpen) return;
      if (e.target.closest(".diaporama-title-zone")) return;
      if (this.state.isSecondary) return;

      e.preventDefault();
      this.state.isScrubbing = true;
      startX = e.clientX;
      isDrag = false;
      this.stopAutoSlide();
      this.dom.slider.setPointerCapture(e.pointerId);
    });

    this.dom.slider.addEventListener("pointermove", (e) => {
      if (!this.state.isScrubbing) return;

      if (!isDrag && Math.abs(e.clientX - startX) > 10) {
        isDrag = true;
      }

      if (isDrag) {
        handleScrubbing(e.clientX, this.dom.slider);
      }
    });

    this.dom.slider.addEventListener("pointerup", (e) => {
      if (!this.state.isScrubbing) return;
      this.state.isScrubbing = false;
      this.dom.slider.releasePointerCapture(e.pointerId);

      if (!isDrag) {
        // Clic simple : play/pause ou fermer la description
        if (!this.state.isDetailsOpen) {
          this.togglePlay();
        } else if (this.state.isPlaying) {
          this.startAutoSlide();
        }
      } else if (this.state.isPlaying) {
        this.startAutoSlide();
      }
    });

    // Clique sur le toast : tentative de retour plein écran
    const toast = document.getElementById("diaporama-toast");
    if (toast) {
      toast.style.cursor = "pointer";
      toast.onclick = async () => {
        this.hideToast();
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          const root = this.dom.root;
          if (!root) return;
          try {
            if (root.requestFullscreen) {
              await root.requestFullscreen();
            } else if (root.webkitRequestFullscreen) {
              root.webkitRequestFullscreen();
            }
          } catch (e) {
            // ignore
          }
        }
      };
    }

    // Gestion de la sortie de veille
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && !this.isClosing) {
        this.resumeFromSleep?.();
      }
    });
  }

  /**
   * Affiche une slide par index :
   * - gère la classe active
   * - patch mobile pour recharger le background
   * - met à jour les textes et l'autoplay
   */
  showSlide(index) {
    if (this.state.isDetailsOpen) this.toggleDetails();
    this.hideToast();
    this.hideVocabularyTooltip();

    const max = this.config.images.length;
    if (max === 0) return;

    this.state.currentIndex = (index + max) % max;

    // Appliquer la classe active
    this.dom.slides.forEach((s, i) => {
      s.classList.toggle("active", i === this.state.currentIndex);
    });

    // Patch mobile : forcer le browser à recharger le background
    const activeSlide = this.dom.slides[this.state.currentIndex];
    if (activeSlide) {
      const bg = activeSlide.querySelector(".diaporama-slide-bg");
      if (bg && this.config.images[this.state.currentIndex]) {
        const url = this.config.images[this.state.currentIndex];
        bg.style.backgroundImage = "none";
        setTimeout(() => {
          bg.style.backgroundImage = `url("${url}")`;
        }, 0);
      }
    }

    if (!this.state.isTitleVisible) this.toggleTitle();
    this.updateDataText();

    if (this.state.isPlaying && !this.state.isScrubbing) {
      this.startAutoSlide();
    } else {
      this.resetProgress();
    }
  }

  /* =======================
   *      TOAST & TOOLTIP
   * ======================= */

  /**
   * Affiche un message toast temporaire.
   */
  showToast(message) {
    const toast = document.getElementById("diaporama-toast");
    if (!toast) return;
    if (toast.classList.contains("visible") && toast.textContent === message) {
      this.hideToast();
      return;
    }
    toast.textContent = message;
    toast.classList.add("visible");
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => { this.hideToast(); }, 4000);
  }

  /**
   * Masque le toast.
   */
  hideToast() {
    const toast = document.getElementById("diaporama-toast");
    if (toast) toast.classList.remove("visible");
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }

  /**
   * Affiche l'infobulle de vocabulaire au-dessus du mot cliqué.
   */
  showVocabularyTooltip(targetEl, text) {
    // Fermer une éventuelle infobulle précédente
    this.hideVocabularyTooltip();

    const tooltip = document.createElement("div");
    tooltip.className = "diaporama-tooltip";
    tooltip.textContent = text;

    // On attache dans le titre (zone L1/L2)
    this.dom.titleZone.appendChild(tooltip);

    // Position par rapport au mot cliqué
    const rectTarget = targetEl.getBoundingClientRect();
    const rectZone = this.dom.titleZone.getBoundingClientRect();

    const centerX = rectTarget.left + rectTarget.width / 2;
    const relX = centerX - rectZone.left;

    tooltip.style.left = `${relX}px`;
    tooltip.style.bottom = `${rectZone.height - (rectTarget.top - rectZone.top) - 2}px`;

    this.state.tooltipElement = tooltip;
    this.state.tooltipTarget = targetEl;
  }

  /**
   * Masque l'infobulle de vocabulaire.
   */
  hideVocabularyTooltip() {
    if (this.state.tooltipElement && this.state.tooltipElement.parentNode) {
      this.state.tooltipElement.parentNode.removeChild(this.state.tooltipElement);
    }
    this.state.tooltipElement = null;
    this.state.tooltipTarget = null;
  }
}
