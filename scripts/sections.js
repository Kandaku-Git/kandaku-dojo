// scripts/sections.js

function getTechniquesData() {
    const techniquesGroup = window.MENU_ITEMS.find(item => item.label === "Techniques");
    return techniquesGroup ? techniquesGroup.children.filter(child => child.type === "tech-category") : [];
}

function getCategoryIcon(categoryLabel) {
    const icons = {
        "Zuki Waza": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14"/><path d="M12 12v5"/><path d="M12 17h5"/></svg>',
        "Empi Waza": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8l-4 4l-4-4l4-4zM8 16l4 4l4-4l-4-4z"/></svg>',
        "Geri Waza": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7"/><path d="M17 7l5 5l-5 5"/><path d="M22 12H13"/></svg>',
        "Uke Waza": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M10 8h4v8h-4z"/></svg>',
        "Kata": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5L12 2z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
        "Dachi": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-3.3 0-6 2.7-6 6v8c0 3.3 2.7 6 6 6s6-2.7 6-6V8c0-3.3-2.7-6-6-6z"/><path d="M10 8h4"/><path d="M12 14v4"/></svg>',
    };
    return icons[categoryLabel] || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>'; 
}

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
        const sectionId = title.toLowerCase().replace(/\s/g, '-');
        
        let description = '';
        if (title === "Zuki Waza") description = "Tsuki, uchi : direct, crochet, revers...";
        if (title === "Empi Waza") description = "Age, Mae, Tate, Ushiro, Yoko : coups de coude...";
        if (title === "Geri Waza") description = "Geri : frontal, latéral, circulaire...";
        if (title === "Uke Waza") description = "Uke : haut, bas, extérieur, intérieur...";
        if (title === "Kata") description = "Séquences de combat codifiées et incontournables.";
        if (title === "Dachi") description = "Zenkutsu, Kokutsu, Kiba, Fudo, Neko Ashi...";

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

function renderTechniquesSections(contentRoot) {
    if (!contentRoot) return;
    const categories = getTechniquesData();

    let techniquesContainer = document.getElementById('section-techniques');
    if (!techniquesContainer) {
        techniquesContainer = document.createElement('section');
        techniquesContainer.id = 'section-techniques';
        techniquesContainer.className = 'content-section';
        contentRoot.appendChild(techniquesContainer);
    }
    
    const categoryGridSection = document.createElement('section');
    categoryGridSection.id = 'section-techniques-categories';
    categoryGridSection.className = 'content-section';
    categoryGridSection.innerHTML = buildTechniquesCategoryPage(categories);
    contentRoot.insertBefore(categoryGridSection, techniquesContainer);

    categories.forEach(category => {
        const sectionId = category.label.toLowerCase().replace(/\s/g, '-');
        const categorySection = document.createElement('section');
        categorySection.id = `section-${sectionId}`;
        categorySection.className = 'content-section';
        categorySection.innerHTML = buildCategoryPage(category);
        contentRoot.appendChild(categorySection);
    });
}

window.renderTechniquesSections = renderTechniquesSections;