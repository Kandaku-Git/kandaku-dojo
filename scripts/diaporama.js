/**
 * DIAPORAMA V1
 * Le diaporama est construit à partir de toutes les images (extension commune et prédéfinie) ET d'un fichier .js contenus dans techniques/<DOSSIER>
 * où <DOSSIER> est passé en paramètre
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
    constructor(containerId, config) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        Object.assign(this.container.style, {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            overflow: "hidden",
            margin: "0",
            padding: "0",
            width: "100%",
            height: "100%" 
        });

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

        this.config = Object.assign({}, this.defaults, config);

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


        this.init();
    }

    async init() {
        this.state.isSecondary = false;

        if (this.config.technique) {
            await this.loadFolderData(this.config.technique);
        }

        if (this.config.donneesTexte) {
            await this.loadVocabulary();
            this.parseDataText(this.config.donneesTexte);
        }

        this.generateImagesFromTechnique();

        if (!Array.isArray(this.config.images)) this.config.images = [this.config.images];
        if (this.config.images.length > 1) {
            this.config.images.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        }

        this.renderDOM();
        this.cacheDOM();
        this.bindEvents();

        if (!document.fullscreenElement) {
            try {
                if (this.container.requestFullscreen) {
                    this.container.requestFullscreen().catch(() => {});
                } else if (this.container.webkitRequestFullscreen) {
                    this.container.webkitRequestFullscreen();
                }
            } catch (e) {}
        }

        this.showSlide(0);
        if (this.state.isPlaying) this.startAutoSlide();
    }

    // --- DONNÉES ---

    loadFolderData(techniqueName) {
        return new Promise((resolve) => {
            const oldScript = document.getElementById('diaporama-data-script');
            if (oldScript) oldScript.remove();

            ['COUNT', 'DESCRIPTION', 'DONNEES', 'EXTENSION', 'SLIDE_DURATION', 'BACKGROUND'].forEach(v => delete window[v]);
            
            const legacyName = techniqueName.toUpperCase();
            delete window['DONNEES_' + legacyName];
            delete window['DESCRIPTION_' + legacyName];

            const script = document.createElement('script');
            script.id = 'diaporama-data-script';
            script.src = `techniques/${techniqueName}/${techniqueName}.js?t=${new Date().getTime()}`;
            
            script.onload = () => {
                if (window.COUNT !== undefined) this.config.nombrePhotos = parseInt(window.COUNT);
                
                this.config.description = window.DESCRIPTION || window['DESCRIPTION_' + legacyName] || this.defaults.description;
                this.config.donneesTexte = window.DONNEES || window['DONNEES_' + legacyName] || "";
                
                if (window.EXTENSION) this.config.extension = window.EXTENSION;
                if (window.SLIDE_DURATION) this.config.slideDuration = parseInt(window.SLIDE_DURATION);
                if (window.BACKGROUND !== undefined) this.config.background = window.BACKGROUND;

                resolve(true);
            };
            script.onerror = () => { resolve(false); };
            document.body.appendChild(script);
        });
    }

    loadVocabulary() {
        return new Promise((resolve) => {
            if (window.VOCABULAIRE_TECHNIQUE) {
                this.parseVocabulary(window.VOCABULAIRE_TECHNIQUE);
                resolve(); return;
            }
            const script = document.createElement('script');
            script.src = "scripts/vocabulaire.js";
            script.onload = () => {
                if (window.VOCABULAIRE_TECHNIQUE) this.parseVocabulary(window.VOCABULAIRE_TECHNIQUE);
                resolve();
            };
            script.onerror = () => resolve();
            document.body.appendChild(script);
        });
    }

    parseVocabulary(text) {
        const lines = text.split('\n');
        lines.forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 2) {
                const term = parts[0].trim();
                const def = parts.slice(1).join(':').trim();
                if (term && def) this.state.vocabulary[term] = def;
            }
        });
    }

    parseDataText(textContent) {
        this.state.slideData = {}; 
        this.state.fixedData = { l1: "", l2: "" }; 
        const lines = textContent.split('\n');
        
        lines.forEach(line => {
            line = line.trim();
            if (!line) return;
            
            const match = line.match(/^([a-zA-Z0-9_\-]+)(.*)$/);
            if (!match) return;

            const key = match[1];
            let content = match[2] ? match[2].trim() : "";

            if (key === "FIXE_L1") { this.state.fixedData.l1 = content; return; }
            if (key === "FIXE_L2") { this.state.fixedData.l2 = content; return; }

            const lastUnderscore = key.lastIndexOf('_');
            if (lastUnderscore === -1) return;

            const type = key.substring(lastUnderscore + 1); 
            const imageName = key.substring(0, lastUnderscore); 

            if (!this.state.slideData[imageName]) {
                this.state.slideData[imageName] = { l1: null, l2: null, time: null };
            }

            if (type === "L1") this.state.slideData[imageName].l1 = content;
            if (type === "L2") this.state.slideData[imageName].l2 = content;
            if (type === "TIME") this.state.slideData[imageName].time = parseInt(content); 
        });
    }

    // --- TRAITEMENT DU TEXTE (Ordre Inversé) ---

    /**
     * Enrichit le texte avec le vocabulaire.
     * PROTEGE (ignore) le contenu entre < > et entre " ".
     */
    enrichTextWithVocabulary(htmlText) {
        if (!htmlText) return "";
        let enriched = htmlText;
        Object.keys(this.state.vocabulary).forEach(term => {
            // Regex : 
            // Groupe 1 : (<[^>]+>|"[^"]+") -> Capture ce qui est entre <...> ou "..."
            // Groupe 2 : (\b${term}\b) -> Capture le mot du vocabulaire
            const regex = new RegExp(`(<[^>]+>|"[^"]+")|(\\b${term}\\b)`, 'gi');
            
            enriched = enriched.replace(regex, (match, protectedPart, foundTerm) => {
                // Si ça matche le groupe 1 (protection), on renvoie tel quel
                if (protectedPart) return protectedPart;
                
                // Sinon c'est le terme, on l'enrichit
                const def = this.state.vocabulary[term].replace(/"/g, '&quot;');
                return `<span class="diaporama-vocab" data-def="${def}">${foundTerm}</span>`;
            });
        });
        return enriched;
    }

    /**
     * Transforme les balises <Lien> en HTML.
     * Appelé APRÈS l'enrichissement.
     */
    parseLinks(htmlText) {
        if (!htmlText) return "";
        let processed = htmlText.replace(/<<([^>]+)>><([^>]+)>/g, (match, label, target) => {
            const labelClean = label.trim();
            const targetClean = target.trim().replace(/\s+/g, '_');
            return `<span class="diaporama-link" data-target="${targetClean}">${label.trim()}</span>`;
        });

        processed = processed.replace(/<([^>]+)>/g, (match, inner) => {
            // Ignore les balises HTML déjà créées par l'enrichissement (span)
            if (inner.startsWith('span') || inner.startsWith('/span')) return match;
            const target = inner.trim().replace(/\s+/g, '_');
            return `<span class="diaporama-link" data-target="${target}">${inner.trim()}</span>`;
        });
        return processed;
    }

    generateImagesFromTechnique() {
        const { technique, nombrePhotos, extension } = this.config;
        this.config.images = [];
        for (let i = 1; i <= nombrePhotos; i++) {
            this.config.images.push(`techniques/${technique}/${technique}_${i}${extension}`);
        }
    }

    // --- NAVIGATION ---

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
        this.dom.btns.back.classList.remove('diaporama-hidden');
        
        this.state.isPlaying = true;
        this.updatePlayPauseIcon();
        this.showSlide(0);
        this.startAutoSlide();
    }

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
            this.dom.btns.back.classList.add('diaporama-hidden');
        } else {
            this.dom.btns.back.classList.remove('diaporama-hidden');
        }

        this.state.isPlaying = false;
        this.updatePlayPauseIcon();
        
        this.showSlide(previousState.index);
    }

    showToast(message) {
        const toast = document.getElementById('diaporama-toast');
        if (!toast) return;
        if (toast.classList.contains('visible') && toast.textContent === message) {
            this.hideToast();
            return;
        }
        toast.textContent = message;
        toast.classList.add('visible');
        if (this.toastTimeout) clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => { this.hideToast(); }, 4000);
    }

    hideToast() {
        const toast = document.getElementById('diaporama-toast');
        if (toast) toast.classList.remove('visible');
        if (this.toastTimeout) clearTimeout(this.toastTimeout);
    }

    showVocabularyTooltip(targetEl, text) {
        // Fermer une éventuelle infobulle précédente
        this.hideVocabularyTooltip();

        const tooltip = document.createElement("div");
        tooltip.className = "diaporama-tooltip";
        tooltip.textContent = text;

        // On attache dans le titre (zone L1/L2) pour rester dans le contexte
        this.dom.titleZone.appendChild(tooltip);

        // Calcul de position par rapport au mot cliqué
        const rectTarget = targetEl.getBoundingClientRect();
        const rectZone = this.dom.titleZone.getBoundingClientRect();

        const centerX = rectTarget.left + rectTarget.width / 2;
        const relX = centerX - rectZone.left;

        tooltip.style.left = `${relX}px`;
        tooltip.style.bottom = `${rectZone.height - (rectTarget.top - rectZone.top) + 8}px`;

        this.state.tooltipElement = tooltip;
        this.state.tooltipTarget = targetEl;
    }

    hideVocabularyTooltip() {
    if (this.state.tooltipElement && this.state.tooltipElement.parentNode) {
        this.state.tooltipElement.parentNode.removeChild(this.state.tooltipElement);
    }
    this.state.tooltipElement = null;
    this.state.tooltipTarget = null;
    }

    updatePlayPauseIcon() {
        this.dom.icons.play.classList.toggle('diaporama-hidden', this.state.isPlaying);
        this.dom.icons.pause.classList.toggle('diaporama-hidden', !this.state.isPlaying);
    }

    // --- RENDU ---

    renderDOM() {
        let bgStyle = "";
        const bg = this.config.background;
        if (bg === 1) bgStyle = "background-color: #FFF;";
        else if (bg === 0) bgStyle = "background-color: #000;";
        else if (bg === "transparent") bgStyle = "background-color: transparent;";
        else if (typeof bg === 'string') {
            if (bg.startsWith('#') || bg.startsWith('rgb')) bgStyle = `background-color: ${bg};`;
            else bgStyle = `background-image: url('${bg}'); background-size: cover; background-position: center;`;
        }

        const mainTitle = (this.config.title || this.config.technique || "").replace(/_/g, " ");

        const slidesHTML = this.config.images.map((url, index) => `
            <div class="diaporama-slide" data-index="${index}">
                <div class="diaporama-slide-bg" style="background-image: url('${url}');">
                    <img src="${url}" style="display:none;" onerror="this.parentElement.style.backgroundImage = 'url(images/travaux.gif)'; this.closest('.diaporama-slide').classList.add('is-error');">
                </div>
                <div class="diaporama-details">
                    <div class="diaporama-description-content">
                        ${this.config.description || "Pas de description détaillée."}
                    </div>
                </div>
            </div>
        `).join('');

        const backBtnClass = this.state.history.length > 0 ? '' : 'diaporama-hidden';

        this.container.innerHTML = `
            <div class="diaporama-wrapper" id="diaporama-root" style="${bgStyle}">
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
                            <button class="diaporama-btn" id="diaporama-prev" title="Précédent"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></button>
                            <button class="diaporama-btn" id="diaporama-play" title="Lecture/Pause">
                                <svg id="icon-play" class="${this.state.isPlaying ? 'diaporama-hidden' : ''}" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                <svg id="icon-pause" class="${this.state.isPlaying ? '' : 'diaporama-hidden'}" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                            </button>
                            <button class="diaporama-btn" id="diaporama-next" title="Suivant"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button>
                        </div>

                        <div class="diaporama-btn-group">
                            <button class="diaporama-btn ${backBtnClass}" id="diaporama-back" title="Retour au menu précédent">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
                            </button>
                            <button class="diaporama-btn" id="diaporama-info" title="Afficher la description">
                                <span class="diaporama-icon-text">D</span>
                            </button>
                            <button class="diaporama-btn" id="diaporama-eye" title="Masquer/Afficher les titres"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></button>
                            <a href="index.html" class="diaporama-btn" id="diaporama-home" title="Accueil"
                                style="text-decoration:none;display:flex;align-items:center;justify-content:center;">
                                <svg class="diaporama-icon" viewBox="0 0 24 24">
                                <!-- Corps de la maison : contour rouge clair, rempli blanc -->
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                                fill="#FFFFFF"
                                stroke="#ff6666"
                                stroke-width="1.5"
                                stroke-linejoin="round"></path>
                                <!-- Porte : petit rectangle rouge plein -->
                                <rect x="10.5" y="15" width="3" height="5"
                                fill="#d7263d"
                                stroke="none"></rect>
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
            </div>
        `;
    }

    cacheDOM() {
        const $ = (id) => document.getElementById(id);
        const $$ = (sel) => document.querySelectorAll(sel);
        this.dom = {
            root: $('diaporama-root'),
            slider: $('diaporama-slider'),
            slides: $$('.diaporama-slide'),
            gaugeContainer: $('diaporama-gauge-container'),
            gaugeFill: $('diaporama-gauge-fill'),
            titleZone: $('diaporama-title-zone'),
            mainTitle: document.querySelector('.diaporama-main-title'),
            txtL1: $('diaporama-text-l1'),
            txtL2: $('diaporama-text-l2'),
            icons: { play: $('icon-play'), pause: $('icon-pause') },
            btns: {
                prev: $('diaporama-prev'), next: $('diaporama-next'), play: $('diaporama-play'),
                back: $('diaporama-back'), info: $('diaporama-info'), eye: $('diaporama-eye')
            }
        };
    }

    bindEvents() {
        const b = this.dom.btns;
        b.next.onclick = () => this.manualNav(1);
        b.prev.onclick = () => this.manualNav(-1);
        b.play.onclick = () => { if (!this.state.isSecondary) this.togglePlay(); };
        b.info.onclick = () => this.toggleDetails();
        b.eye.onclick = () => this.toggleTitle();
        b.back.onclick = () => this.restoreParentDiaporama();

        this.dom.titleZone.addEventListener('click', (e) => {
            // Ferme l’infobulle si on clique ailleurs dans la zone titre
            if (!e.target.classList.contains("diaporama-vocab") && this.state.tooltipElement) {
                this.hideVocabularyTooltip();
            }
            if (e.target.classList.contains('diaporama-link')) {
                const target = e.target.getAttribute('data-target');
                if (target) this.loadSubDiaporama(target);
            }
            if (e.target.classList.contains("diaporama-vocab")) {
                const def = e.target.getAttribute("data-def");
                if (!def) return;

                // Si on clique à nouveau sur le même mot, on ferme
                if (this.state.tooltipTarget === e.target) {
                    this.hideVocabularyTooltip();
                    return;
                }
                this.showVocabularyTooltip(e.target, def);
                }

            }
        );


        this.dom.slides.forEach(slide => {
            const details = slide.querySelector('.diaporama-details');
            if (details) {
                details.addEventListener('pointerdown', (e) => {
                    e.stopPropagation();
                });
                
                details.addEventListener('pointerup', (e) => {
                    if (e.target.tagName === 'A' || e.target.classList.contains('diaporama-link')) return;
                    e.stopPropagation();
                    
                    if (this.state.isDetailsOpen) {
                        this.toggleDetails();
                    }
                });
            }
        });

        let startX = 0;
        let isDrag = false;
        
        const handleScrubbing = (clientX, targetElement) => {
            const rect = targetElement.getBoundingClientRect();
            let x = clientX - rect.left;
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            
            const percent = x / rect.width;
            const total = this.config.images.length;
            let targetIndex = Math.floor(percent * total);
            if (targetIndex >= total) targetIndex = total - 1;

            if (targetIndex !== this.state.currentIndex) {
                this.showSlide(targetIndex);
            }
        };

        this.dom.gaugeContainer.addEventListener('pointerdown', (e) => {
            if (this.state.isSecondary) return;
            this.state.isScrubbing = true;
            this.stopAutoSlide();
            this.dom.gaugeContainer.setPointerCapture(e.pointerId);
            handleScrubbing(e.clientX, this.dom.gaugeContainer);
        });

        this.dom.gaugeContainer.addEventListener('pointermove', (e) => {
            if (!this.state.isScrubbing) return;
            handleScrubbing(e.clientX, this.dom.gaugeContainer);
        });

        this.dom.gaugeContainer.addEventListener('pointerup', (e) => {
            if (this.state.isScrubbing) {
                this.state.isScrubbing = false;
                this.dom.gaugeContainer.releasePointerCapture(e.pointerId);
                if (this.state.isPlaying) this.startAutoSlide();
            }
        });

        this.dom.slider.addEventListener('pointerdown', (e) => {
            if (e.target.closest('.diaporama-toast')) return;
            if (e.target.closest('.diaporama-details') && this.state.isDetailsOpen) return;
            if (this.state.isSecondary) return;

            e.preventDefault(); 
            this.state.isScrubbing = true; 
            startX = e.clientX;
            isDrag = false;
            this.stopAutoSlide(); 
            this.dom.slider.setPointerCapture(e.pointerId);
        });

        this.dom.slider.addEventListener('pointermove', (e) => {
            if (!this.state.isScrubbing) return;
            if (Math.abs(e.clientX - startX) > 10) {
                isDrag = true;
                handleScrubbing(e.clientX, this.dom.slider);
            }
        });

        this.dom.slider.addEventListener('pointerup', (e) => {
            if (!this.state.isScrubbing) return;

            this.state.isScrubbing = false;
            this.dom.slider.releasePointerCapture(e.pointerId);

            if (!isDrag) {
                if (!this.state.isDetailsOpen) {
                    this.togglePlay();
                }
            } else {
                if (this.state.isPlaying) this.startAutoSlide();
            }
        });
    }

    showSlide(index) {
        if(this.state.isDetailsOpen) this.toggleDetails();
        this.hideToast();
        this.hideVocabularyTooltip();
        const max = this.config.images.length;
        if (max === 0) return;
        this.state.currentIndex = (index + max) % max;
        
        this.dom.slides.forEach((s, i) => s.classList.toggle('active', i === this.state.currentIndex));
        
        if (this.dom.gaugeFill) {
            const percent = ((this.state.currentIndex + 1) / max) * 100;
            this.dom.gaugeFill.style.width = `${percent}%`;
        }
        
        this.updateDataText();
        
        if (this.state.isPlaying && !this.state.isScrubbing) {
            this.startAutoSlide();
        } else {
            this.resetProgress();
        }
    }

    // --- MODIFICATION ICI : Ordre Vocabulaire / Liens inversé ---
    updateDataText() {
        const fullPath = this.config.images[this.state.currentIndex]; 
        const filename = fullPath.split('/').pop().split('.')[0];
        
        let l1Text = this.config.title;
        let l2Text = this.config.subtitle;

        if (this.state.fixedData.l1) l1Text = this.state.fixedData.l1;
        if (this.state.fixedData.l2) l2Text = this.state.fixedData.l2;

        if (this.config.donneesTexte && this.state.slideData[filename]) {
            if (this.state.slideData[filename].l1) l1Text = this.state.slideData[filename].l1;
            if (this.state.slideData[filename].l2) l2Text = this.state.slideData[filename].l2;
        }

        // 1. Enrichissement Vocabulaire (avec protection <...> et "...")
        l1Text = this.enrichTextWithVocabulary(l1Text);
        l2Text = this.enrichTextWithVocabulary(l2Text);

        // 2. Création des Liens (par dessus)
        l1Text = this.parseLinks(l1Text);
        l2Text = this.parseLinks(l2Text);

        this.dom.txtL1.innerHTML = l1Text;
        this.dom.txtL2.innerHTML = l2Text;
    }

    manualNav(dir) {
        this.stopAutoSlide();
        this.showSlide(this.state.currentIndex + dir);
    }

    togglePlay() {
        if (this.state.isSecondary) return;
        this.state.isPlaying = !this.state.isPlaying;
        this.updatePlayPauseIcon();
        this.state.isPlaying ? this.startAutoSlide() : this.stopAutoSlide();
    }

    startAutoSlide() {
        if (this.state.timerId) clearTimeout(this.state.timerId);
        if (this.state.progressIntervalId) clearInterval(this.state.progressIntervalId);

        if (this.state.isDetailsOpen || this.state.isScrubbing) return;

        const fullPath = this.config.images[this.state.currentIndex];
        const filename = fullPath ? fullPath.split('/').pop().split('.')[0] : "";
        let duration = this.config.slideDuration; 

        if (this.state.slideData[filename] && this.state.slideData[filename].time) {
            duration = this.state.slideData[filename].time;
        }

        this.state.timerId = setTimeout(() => {
            this.showSlide(this.state.currentIndex + 1);
        }, duration);

        let w = 0;
        const intervalStep = 50;
        this.state.progressIntervalId = setInterval(() => {
            w += (100 / (duration / intervalStep));
            if(w>100) w=100;
            this.dom.gaugeFill.style.width = w + '0%';
        }, intervalStep);
    }

    stopAutoSlide() {
        if (this.state.timerId) clearTimeout(this.state.timerId);
        if (this.state.progressIntervalId) clearInterval(this.state.progressIntervalId);
    }

    resetProgress() {
        this.dom.gaugeFill.style.width = '0%';
    }

    toggleDetails() {
        this.state.isDetailsOpen = !this.state.isDetailsOpen;
        const slide = this.dom.slides[this.state.currentIndex];
        
        if (this.state.isDetailsOpen) {
            const contentDiv = slide.querySelector('.diaporama-description-content');
            if (slide.classList.contains('is-error')) {
                contentDiv.innerHTML = '<div style="text-align:center; margin-top:20px; font-weight:bold; color:#fbbf24; font-size:1.2rem;">Désolé, ce contenu sera bientôt disponible.</div>';
            } else {
                contentDiv.innerHTML = this.config.description || "Pas de description détaillée.";
            }

            slide.classList.add('diaporama-details-active');
            this.dom.btns.info.classList.add('active');
            
            this.state.wasPlayingBeforeDetails = this.state.isPlaying;
            this.state.isPlaying = false;
            this.updatePlayPauseIcon();
            this.stopAutoSlide();

        } else {
            slide.classList.remove('diaporama-details-active');
            this.dom.btns.info.classList.remove('active');
            
            if(!this.state.isSecondary && this.state.wasPlayingBeforeDetails) {
                this.togglePlay(); 
            }
        }
    }

    toggleTitle() {
        this.state.isTitleVisible = !this.state.isTitleVisible;
        this.dom.titleZone.classList.toggle('hidden', !this.state.isTitleVisible);
        this.dom.mainTitle.classList.toggle('hidden', !this.state.isTitleVisible); 
        this.dom.btns.eye.classList.toggle('active', !this.state.isTitleVisible);
    }
}

// Hook global appelé par le menu
window.afficherTechnique = function (nomTechnique) {
  // Détruit une instance précédente si tu veux éviter les fuites
  if (window._diaporamaInstance && typeof window._diaporamaInstance.destroy === "function") {
    window._diaporamaInstance.destroy();
  }

  window._diaporamaInstance = new Diaporama("mon-conteneur", {
    technique: nomTechnique,
    title: nomTechnique,
  });
};
