/**
 * DIAPORAMA v15.0
 * - Inversion du pipeline de rendu : Vocabulaire AVANT Liens
 * - Protection stricte des contenus entre <...> et "..." lors de la recherche de vocabulaire
 * - Maintient toutes les fonctionnalités précédentes (Tactile, Fullscreen, etc.)
 */

class Diaporama {
    /**
     * Constructeur : Initialise le conteneur, la configuration et l'état initial.
     * @param {string} containerId - L'ID de la div conteneur dans le HTML.
     * @param {Object} config - Les options de configuration (technique, extension, etc.).
     */
    constructor(containerId, config) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        // Configuration CSS du conteneur pour garantir l'affichage
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

        // Paramètres par défaut
        this.defaults = {
            images: [],
            title: "",
            subtitle: "",
            description: "",
            slideDuration: 700, // Vitesse par défaut
            autoPlay: true,
            background: 1, 
            technique: null,
            nombrePhotos: 1,     
            extension: ".gif",   
            donneesTexte: "" 
        };

        this.config = Object.assign({}, this.defaults, config);

        // État interne du diaporama
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
            lastTapTime: 0,
            tapTimeout: null,
            wasPlayingBeforeDetails: false
        };

        this.init();
    }

    /**
     * Méthode principale d'initialisation.
     */
    async init() {
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

        this.showSlide(0);
        if (this.state.isPlaying) this.startAutoSlide();
    }

    // ==========================================
    // SECTION : CHARGEMENT DES DONNÉES
    // ==========================================

    /**
     * Charge dynamiquement le fichier .js associé à la technique.
     */
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

    /**
     * Charge le fichier de vocabulaire.
     */
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

    /**
     * Analyse le texte du vocabulaire.
     */
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

    /**
     * Analyse le texte de configuration (DONNEES).
     */
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

    // --- TRAITEMENT DU TEXTE (Correctif Protection) ---

    /**
     * Ajoute les infobulles de vocabulaire.
     * PROTEGE le contenu entre < > et entre " " pour ne pas le modifier.
     */
    enrichTextWithVocabulary(htmlText) {
        if (!htmlText) return "";
        let enriched = htmlText;
        
        Object.keys(this.state.vocabulary).forEach(term => {
            // Regex complexe :
            // Groupe 1 (Ignoré) : <[^>]+> (Balises/Liens) OU "[^"]+" (Attributs/Quotes)
            // Groupe 2 (Ciblé) : Le mot recherché (\bterm\b)
            const regex = new RegExp(`(<[^>]+>|"[^"]+")|(\\b${term}\\b)`, 'gi');
            
            enriched = enriched.replace(regex, (match, protectedPart, foundTerm) => {
                // Si ça matche le groupe 1 (protection), on renvoie tel quel
                if (protectedPart) return protectedPart;
                
                // Sinon (groupe 2), on enrichit
                const def = this.state.vocabulary[term].replace(/"/g, '&quot;');
                return `<span class="diaporama-vocab" data-def="${def}">${foundTerm}</span>`;
            });
        });
        return enriched;
    }

    /**
     * Transforme les balises <Lien> en HTML.
     * Doit être exécuté APRÈS l'enrichissement pour ne pas casser le HTML généré.
     */
    parseLinks(htmlText) {
        if (!htmlText) return "";
        // Format <<Label>><Target>
        let processed = htmlText.replace(/<<([^>]+)>><([^>]+)>/g, (match, label, target) => {
            const labelClean = label.trim();
            const targetClean = target.trim().replace(/\s+/g, '_');
            return `<span class="diaporama-link" data-target="${targetClean}">${label.trim()}</span>`;
        });
        // Format simple <Target>
        processed = processed.replace(/<([^>]+)>/g, (match, inner) => {
            // On ignore les balises HTML déjà présentes (ex: celles du vocabulaire)
            if (inner.startsWith('span') || inner.startsWith('/span')) return match;
            const target = inner.trim().replace(/\s+/g, '_');
            return `<span class="diaporama-link" data-target="${target}">${inner.trim()}</span>`;
        });
        return processed;
    }

    /**
     * Génère le tableau des chemins d'images.
     */
    generateImagesFromTechnique() {
        const { technique, nombrePhotos, extension } = this.config;
        this.config.images = [];
        for (let i = 1; i <= nombrePhotos; i++) {
            this.config.images.push(`techniques/${technique}/${technique}_${i}${extension}`);
        }
    }

    // ==========================================
    // SECTION : NAVIGATION & ACTIONS
    // ==========================================

    /**
     * Charge un nouveau diaporama (via un lien).
     */
    async loadSubDiaporama(targetTechnique) {
        this.state.history.push({
            config: { ...this.config }, 
            index: this.state.currentIndex,
            slideData: { ...this.state.slideData },
            fixedData: { ...this.state.fixedData } 
        });

        this.stopAutoSlide();

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
        this.showSlide(0);
        this.startAutoSlide();
    }

    /**
     * Restaure le diaporama précédent.
     */
    restoreParentDiaporama() {
        if (this.state.history.length === 0) return;
        const previousState = this.state.history.pop();
        
        this.stopAutoSlide();
        this.config = previousState.config;
        this.state.slideData = previousState.slideData;
        this.state.fixedData = previousState.fixedData;
        
        this.renderDOM(); 
        this.cacheDOM();
        this.bindEvents();
        
        this.dom.btns.back.classList.toggle('diaporama-hidden', this.state.history.length === 0);
        this.showSlide(previousState.index);
        this.startAutoSlide();
    }

    /**
     * Affiche un message "Toast".
     */
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

    /**
     * Masque le message Toast.
     */
    hideToast() {
        const toast = document.getElementById('diaporama-toast');
        if (toast) toast.classList.remove('visible');
        if (this.toastTimeout) clearTimeout(this.toastTimeout);
    }

    // ==========================================
    // SECTION : RENDU ET ÉVÉNEMENTS
    // ==========================================

    /**
     * Génère le HTML complet du diaporama.
     */
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
                    <div class="diaporama-progress-bg"><div id="diaporama-progress" class="diaporama-progress-bar"></div></div>
                    <div class="diaporama-toolbar">
                        <div class="diaporama-btn-group">
                            <button class="diaporama-btn" id="diaporama-prev" title="Image Précédente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></button>
                            <button class="diaporama-btn" id="diaporama-play" title="Lecture / Pause">
                                <svg id="icon-play" class="${this.state.isPlaying ? 'diaporama-hidden' : ''}" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                <svg id="icon-pause" class="${this.state.isPlaying ? '' : 'diaporama-hidden'}" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                            </button>
                            <button class="diaporama-btn" id="diaporama-next" title="Image Suivante"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button>
                        </div>
                        
                        <div id="diaporama-gauge-container" class="diaporama-gauge-container" title="Faire glisser pour défiler">
                            <div id="diaporama-gauge-fill" class="diaporama-gauge-fill"></div>
                        </div>

                        <div class="diaporama-btn-group">
                            <button class="diaporama-btn ${backBtnClass}" id="diaporama-back" title="Retour au menu précédent">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
                            </button>
                            <!-- BOUTON D -->
                            <button class="diaporama-btn" id="diaporama-info" title="Afficher la description">
                                <span class="diaporama-icon-text">D</span>
                            </button>
                            <button class="diaporama-btn" id="diaporama-eye" title="Masquer/Afficher les titres"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></button>
                            <button class="diaporama-btn" id="diaporama-fs" title="Plein Écran"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Met en cache les éléments du DOM pour un accès rapide.
     */
    cacheDOM() {
        const $ = (id) => document.getElementById(id);
        const $$ = (sel) => document.querySelectorAll(sel);
        this.dom = {
            root: $('diaporama-root'),
            slider: $('diaporama-slider'),
            slides: $$('.diaporama-slide'),
            gaugeContainer: $('diaporama-gauge-container'),
            gaugeFill: $('diaporama-gauge-fill'),
            progress: $('diaporama-progress'),
            titleZone: $('diaporama-title-zone'),
            mainTitle: document.querySelector('.diaporama-main-title'),
            txtL1: $('diaporama-text-l1'),
            txtL2: $('diaporama-text-l2'),
            icons: { play: $('icon-play'), pause: $('icon-pause') },
            btns: {
                prev: $('diaporama-prev'), next: $('diaporama-next'), play: $('diaporama-play'),
                back: $('diaporama-back'), info: $('diaporama-info'), eye: $('diaporama-eye'), fs: $('diaporama-fs')
            }
        };
    }

    /**
     * Attache tous les événements (Souris, Tactile, Clics).
     */
    bindEvents() {
        const b = this.dom.btns;
        b.next.onclick = () => this.manualNav(1);
        b.prev.onclick = () => this.manualNav(-1);
        b.play.onclick = () => this.togglePlay();
        b.info.onclick = () => this.toggleDetails();
        b.eye.onclick = () => this.toggleTitle();
        b.fs.onclick = () => this.toggleFullscreen();
        b.back.onclick = () => this.restoreParentDiaporama();

        this.dom.titleZone.addEventListener('click', (e) => {
            if (e.target.classList.contains('diaporama-link')) {
                const target = e.target.getAttribute('data-target');
                if (target) this.loadSubDiaporama(target);
            }
            if (e.target.classList.contains('diaporama-vocab')) {
                const def = e.target.getAttribute('data-def');
                if (def) this.showToast(`${e.target.innerText} : ${def}`);
            }
        });

        // Gestion de l'état actif du bouton plein écran
        document.addEventListener('fullscreenchange', () => {
            const isFs = document.fullscreenElement !== null;
            this.dom.btns.fs.classList.toggle('active', isFs);
        });

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

        // 1. Interaction JAUGE
        this.dom.gaugeContainer.addEventListener('pointerdown', (e) => {
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
            this.state.isScrubbing = false;
            this.dom.gaugeContainer.releasePointerCapture(e.pointerId);
            if (this.state.isPlaying) this.startAutoSlide();
        });

        // 2. Interaction IMAGE (Slide)
        this.dom.slider.addEventListener('pointerdown', (e) => {
            if (e.target.closest('.diaporama-toast')) return;
            if (e.target.closest('.diaporama-details') && this.state.isDetailsOpen) return;

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
            this.state.isScrubbing = false;
            this.dom.slider.releasePointerCapture(e.pointerId);

            if (!isDrag) {
                const now = new Date().getTime();
                const timeDiff = now - this.state.lastTapTime;
                
                if (timeDiff < 250 && timeDiff > 0) {
                    // --- DOUBLE CLIC ---
                    if (this.state.tapTimeout) clearTimeout(this.state.tapTimeout);
                    
                    this.state.isPlaying = false;
                    this.dom.icons.play.classList.remove('diaporama-hidden');
                    this.dom.icons.pause.classList.add('diaporama-hidden');
                    this.stopAutoSlide();

                    if (!this.state.isDetailsOpen) {
                        this.toggleDetails(); 
                    }
                    this.state.lastTapTime = 0;
                } else {
                    // --- CLIC SIMPLE ---
                    this.state.lastTapTime = now;
                    this.state.tapTimeout = setTimeout(() => {
                        if (!this.state.isDetailsOpen) {
                            if (this.state.isPlaying) {
                                this.togglePlay();
                            } else {
                                this.showSlide(this.state.currentIndex + 1);
                                this.state.isPlaying = true;
                                this.dom.icons.play.classList.add('diaporama-hidden');
                                this.dom.icons.pause.classList.remove('diaporama-hidden');
                                this.startAutoSlide();
                            }
                        }
                    }, 250); 
                }
            } else {
                if (this.state.isPlaying) this.startAutoSlide();
            }
        });
    }

    /**
     * Affiche une diapositive spécifique.
     */
    showSlide(index) {
        if(this.state.isDetailsOpen) this.toggleDetails();
        this.hideToast();
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

    /**
     * Met à jour les textes L1/L2.
     * Applique l'enrichissement de texte (vocabulaire) PUIS la création des liens.
     */
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

        // 1. Enrichissement du vocabulaire (sur le texte brut)
        l1Text = this.enrichTextWithVocabulary(l1Text);
        l2Text = this.enrichTextWithVocabulary(l2Text);

        // 2. Création des liens (ajoute des balises par dessus)
        this.dom.txtL1.innerHTML = this.parseLinks(l1Text);
        this.dom.txtL2.innerHTML = this.parseLinks(l2Text);
    }

    manualNav(dir) {
        this.stopAutoSlide();
        this.showSlide(this.state.currentIndex + dir);
    }

    togglePlay() {
        this.state.isPlaying = !this.state.isPlaying;
        this.dom.icons.play.classList.toggle('diaporama-hidden', this.state.isPlaying);
        this.dom.icons.pause.classList.toggle('diaporama-hidden', !this.state.isPlaying);
        this.state.isPlaying ? this.startAutoSlide() : this.stopAutoSlide();
    }

    /**
     * Lance le minuteur pour la diapositive suivante.
     */
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
            this.dom.progress.style.width = w + '%';
        }, intervalStep);
    }

    stopAutoSlide() {
        if (this.state.timerId) clearTimeout(this.state.timerId);
        if (this.state.progressIntervalId) clearInterval(this.state.progressIntervalId);
    }

    resetProgress() {
        this.dom.progress.style.width = '0%';
    }

    /**
     * Ouvre ou ferme la description détaillée.
     */
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
            this.dom.icons.play.classList.remove('diaporama-hidden');
            this.dom.icons.pause.classList.add('diaporama-hidden');
            this.stopAutoSlide();

        } else {
            slide.classList.remove('diaporama-details-active');
            this.dom.btns.info.classList.remove('active');
            
            if(this.state.wasPlayingBeforeDetails) {
                this.togglePlay(); 
            }
        }
    }

    /**
     * Masque ou affiche les titres.
     */
    toggleTitle() {
        this.state.isTitleVisible = !this.state.isTitleVisible;
        this.dom.titleZone.classList.toggle('hidden', !this.state.isTitleVisible);
        this.dom.mainTitle.classList.toggle('hidden', !this.state.isTitleVisible); 
        this.dom.btns.eye.classList.toggle('active', !this.state.isTitleVisible);
    }

    /**
     * Bascule en mode Plein Écran.
     */
    async toggleFullscreen() {
        try {
            if (!document.fullscreenElement) {
                if (this.dom.root.requestFullscreen) await this.dom.root.requestFullscreen();
                else if (this.dom.root.webkitRequestFullscreen) await this.dom.root.webkitRequestFullscreen();
            } else {
                if (document.exitFullscreen) await document.exitFullscreen();
                else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
            }
        } catch(e) {}
    }
}