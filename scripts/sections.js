// scripts/sections.js

/**
 * Récupère les données des catégories de techniques depuis MENU_ITEMS.
 * @returns {Array<Object>} Les données des catégories de techniques.
 */
function getTechniquesData() {
    // La structure de vos données place les catégories de techniques sous l'élément 'Techniques'
    const techniquesGroup = window.MENU_ITEMS.find(item => item.label === "Techniques");
    return techniquesGroup ? techniquesGroup.children.filter(child => child.type === "tech-category") : [];
}

/**
 * Construit l'icône SVG pour une catégorie donnée.
 * (Utilisation de SVG génériques pour l'exemple)
 * @param {string} categoryLabel Le libellé de la catégorie.
 * @returns {string} L'icône SVG correspondante.
 */
function getCategoryIcon(categoryLabel) {
    const icons = {
        "Zuki Waza": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14"/><path d="M12 12v5"/><path d="M12 17h5"/></svg>', // Poing
        "Empi Waza": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8l-4 4l-4-4l4-4zM8 16l4 4l4-4l-4-4z"/></svg>', // Coude/Impact
        "Geri Waza": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7"/><path d="M17 7l5 5l-5 5"/><path d="M22 12H13"/></svg>', // Pied
        "Uke Waza": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M10 8h4v8h-4z"/></svg>', // Blocage
        "Kata": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5L12 2z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>', // Mouvement (Toit/Forme)
        "Dachi": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-3.3 0-6 2.7-6 6v8c0 3.3 2.7 6 6 6s6-2.7 6-6V8c0-3.3-2.7-6-6-6z"/><path d="M10 8h4"/><path d="M12 14v4"/></svg>', // Posture
    };
    return icons[categoryLabel] || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>'; 
}

/**
 * Construit la page de la catégorie spécifique (ex: Zuki Waza).
 * @param {Object} categoryData Les données de la catégorie (label, techniques).
 * @returns {string} Le HTML de la section.
 */
function buildCategoryPage(categoryData) {
    const title = categoryData.label;
    const subtitleMap = {
        "Zuki Waza": "Liste complète des coups de poing et attaques de main (Tsuki, Uchi...).",
        "Empi Waza": "Liste complète des techniques de coude.",
        "Geri Waza": "Liste complète des coups de pied.",
        "Uke Waza": "Liste complète des techniques de blocage.",
        "Kata": "Liste des Kata disponibles pour l'étude.",
        "Dachi": "Liste des principales positions et postures.",
    };

    let html = `
        <header class="section-header">
            <button type="button" class="back-button btn-link" data-section="techniques-categories">&lt; Retour aux catégories</button>
            <h2 class="section-title">${title}</h2>
            <p class="section-subtitle">${subtitleMap[title] || "Liste des techniques de cette catégorie."}</p>
        </header>
        <div class="category-list-container">
            <ul class="techniques-list">
    `;

    categoryData.techniques.forEach(tech => {
        // Attention : on utilise un bouton pour déclencher l'affichage du diaporama
        html += `
            <li>
                <button 
                    type="button" 
                    class="tech-list-item"
                    data-technique="${tech.dataTechnique}" 
                    data-section="${tech.dataSection}"
                >
                    ${tech.label}
                </button>
            </li>
        `;
    });

    html += `
            </ul>
        </div>
    `;
    return html;
}

/**
 * Construit la page principale des catégories de techniques (les 6 cartes).
 * @param {Array<Object>} categories Les données des catégories.
 * @returns {string} Le HTML de la section.
 */
function buildTechniquesCategoryPage(categories) {
    let html = `
        <header class="section-header">
            <h2 class="section-title">TECHNIQUES</h2>
            <p class="section-subtitle">Explorez les fondamentaux du karaté Shotokan.</p>
        </header>
        <div class="techniques-grid">
    `;

    categories.forEach(category => {
        const title = category.label;
        const sectionId = title.toLowerCase().replace(/\s/g, '-'); // zuki-waza
        
        let description = '';
        if (title === "Zuki Waza") description = "Tsuki, uchi : direct, crochet, revers...";
        if (title === "Empi Waza") description = "Age, Mae, Tate, Ushiro, Yoko : coups de coude...";
        if (title === "Geri Waza") description = "Geri : frontal, latéral, circulaire...";
        if (title === "Uke Waza") description = "Uke : haut, bas, extérieur, intérieur...";
        if (title === "Kata") description = "Séquences de combat codifiées et incontournables.";
        if (title === "Dachi") description = "Zenkutsu, Kokutsu, Kiba, Fudo, Neko Ashi...";

        // data-section pour le routage vers la page de catégorie
        html += `
            <button 
                type="button" 
                class="technique-card" 
                data-section="${sectionId}"
            >
                <div class="card-icon">
                    ${getCategoryIcon(title)}
                </div>
                <h3 class="card-title">${title.replace(' Waza', '').toUpperCase()}</h3>
                <p class="card-description">${description}</p>
            </button>
        `;
    });

    html += `
        </div>
    `;
    return html;
}

/**
 * Construit toutes les sections de techniques et les injecte dans le DOM.
 * La page principale des techniques est créée AVANT le wrapper du diaporama.
 * @param {HTMLElement} contentRoot L'élément racine où insérer les sections.
 */
function renderTechniquesSections(contentRoot) {
    if (!contentRoot) return;

    const categories = getTechniquesData();

    // --- 1. Insertion du Diaporama (si ce n'est pas déjà fait) ---
    // On trouve la section-techniques existante dans index.html
    let techniquesContainer = document.getElementById('section-techniques');
    if (!techniquesContainer) {
        techniquesContainer = document.createElement('section');
        techniquesContainer.id = 'section-techniques';
        techniquesContainer.className = 'content-section';
        contentRoot.appendChild(techniquesContainer);
    }
    
    // Le diaporama (mon-conteneur-wrapper) va maintenant contenir la grille des 6 cartes
    // et sera déplacé du DOM. On utilise un nouvel ID/Wrapper si l'ancien est pour le diaporama.
    // D'après votre index.html: la section-techniques actuelle contient le wrapper diaporama.
    // Nous allons MODIFIER cette section-techniques pour qu'elle contienne la grille de cartes.
    
    // Pour ne pas interférer avec le diaporama, nous allons créer une NOUVELLE section
    // pour la grille des cartes, et laisser 'section-techniques' comme point d'entrée pour le diaporama.

    // A. Section pour la grille (Nouvelle section: 'techniques-categories')
    const categoryGridSection = document.createElement('section');
    categoryGridSection.id = 'section-techniques-categories';
    categoryGridSection.className = 'content-section';
    categoryGridSection.innerHTML = buildTechniquesCategoryPage(categories);
    
    // On l'insère juste AVANT la section-techniques actuelle (qui contient le diaporama)
    contentRoot.insertBefore(categoryGridSection, techniquesContainer);


    // B. Sections de Catégories (Zuki Waza, Empi Waza, etc.)
    categories.forEach(category => {
        const sectionId = category.label.toLowerCase().replace(/\s/g, '-');
        const categorySection = document.createElement('section');
        categorySection.id = `section-${sectionId}`;
        categorySection.className = 'content-section';
        categorySection.innerHTML = buildCategoryPage(category);
        contentRoot.appendChild(categorySection);
    });
}

// Pour l'initialisation dans menu.js
window.renderTechniquesSections = renderTechniquesSections;