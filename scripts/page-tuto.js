// scripts/page-tuto.js
// Tuto utilisateur final, injecté en HTML statique

window.renderTutoSection = function () {
  const section = document.getElementById("section-tuto");
  if (!section) return;

  section.innerHTML = `
    <div id="tuto-top"></div>
    <h2>Tuto du site</h2>
    <p>
      Ce guide présente comment naviguer dans le site et comment utiliser le visionneur de techniques, le KPlayer.
    </p>

        <!-- Tuiles de navigation interne -->
    <div class="tuto-tiles-grid">
      <article class="technique-card tuto-tile" data-tuto-target="tuto-nav-kdojo">
        <h3 class="card-title">Naviguer dans le KDojo</h3>
      </article>

      <article class="technique-card tuto-tile" data-tuto-target="tuto-techniques">
        <h3 class="card-title">Choisir une technique</h3>
      </article>

      <article class="technique-card tuto-tile" data-tuto-target="tuto-kplayer-lecture">
  <h3 class="card-title">KPlayer</h3>
  <p class="card-description">Navigation</p>
</article>

<article class="technique-card tuto-tile" data-tuto-target="tuto-kplayer-fiche">
  <h3 class="card-title">KPlayer</h3>
  <p class="card-description">Détails techniques</p>
</article>

<article class="technique-card tuto-tile" data-tuto-targer="tuto-kplayer-vocab">
  <h3 class="card-title">KPlayer</h3>
  <p class="card-description">Vocabulaire</p>
</article>

<article class="technique-card tuto-tile" data-tuto-target="tuto-kplayer-liens">
  <h3 class="card-title">KPlayer</h3>
  <p class="card-description">Cibler une technique</p>
</article>

<article class="technique-card tuto-tile" data-tuto-target="tuto-kplayer-home">
  <h3 class="card-title">KPlayer</h3>
  <p class="card-description">Exit</p>
</article>

    </div>


    <div class="tuto-guide-container">

      <!-- A. Naviguer dans le site -->
      <section class="tuto-guide-section" id="tuto-nav-kdojo">
        <div class="tuto-guide-section-header">
          <h3 class="tuto-guide-title">A. Naviguer dans le KDojo</h3>
          <button class="tuto-back-top" type="button" data-tuto-top>
            <img src="images/haut.png" alt="Retour en haut de la page" class="tuto-back-top-icon">
          </button>
        </div>
        <div class="tuto-guide-content tuto-guide-content--image-right">
          <div class="tuto-guide-text">
            <p>Le site est organisé en grandes rubriques accessibles depuis le bouton MENU en haut à droite.</p>
            <ul>
              <li>
                Clique sur le bouton <strong>MENU</strong> pour ouvrir ou fermer la liste des sections
                (Accueil, Tuto, Techniques, Vidéos, Lexique, Histoires, Liens, Me contacter).
              </li>
              <li>
                Choisis une section en cliquant sur son nom : le contenu correspondant s’affiche au centre de l’écran.
              </li>
              <li>
                Dans certaines sections, des <strong>tuiles</strong> (cartes) te permettent d’affiner ta sélection,
                par exemple une catégorie de techniques, un type de vidéo ou une histoire précise.
              </li>
            </ul>
          </div>
          <div class="tuto-guide-image-box tuto-guide-image-box--medium">
            <img
              src="images/tuto/tuto-menu.png"
              alt="Menu du KDojo ouvert avec les cartes de navigation"
              class="tuto-guide-image js-tuto-zoomable"
            >
          </div>
        </div>
      </section>

      <!-- B. Comprendre la page Techniques -->
      <section class="tuto-guide-section" id="tuto-techniques">
        <div class="tuto-guide-section-header">
          <h3 class="tuto-guide-title">B. Choisir une technique</h3>
          <button class="tuto-back-top" type="button" data-tuto-top>
            <img src="images/haut.png" alt="Retour en haut de la page" class="tuto-back-top-icon">
          </button>
        </div>
        <div class="tuto-guide-content tuto-guide-content--image-left">
          <div class="tuto-guide-image-box tuto-guide-image-box--large">
            <img
              src="images/tuto/tuto-techniques.png"
              alt="Grille de catégories et liste de techniques du KDojo"
              class="tuto-guide-image js-tuto-zoomable"
            >
          </div>
          <div class="tuto-guide-text">
            <p>La section Techniques te permet de lancer le visionneur pour une technique donnée.</p>
            <ul>
              <li>Sélectionne d’abord une <strong>catégorie</strong> (postures, déplacements, katas, etc.) via les tuiles.</li>
              <li>Choisis ensuite une technique dans la liste affichée en dessous.</li>
              <li>Le visionneur s’ouvre en plein écran pour te montrer la démonstration étape par étape.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- C1. KPlayer : lecture et navigation -->
      <section class="tuto-guide-section" id="tuto-kplayer-lecture">
        <div class="tuto-guide-section-header">
          <h3 class="tuto-guide-title">C1. KPlayer : contrôler la lecture et la navigation</h3>
          <button class="tuto-back-top" type="button" data-tuto-top>
            <img src="images/haut.png" alt="Retour en haut de la page" class="tuto-back-top-icon">
          </button>
        </div>
        <div class="tuto-guide-content tuto-guide-content--image-right">
          <div class="tuto-guide-text">
            <p>Le visionneur te permet d’analyser chaque mouvement à ton rythme :</p>
            <ul>
              <li><strong>Lecture automatique :</strong> le diaporama avance seul et la jauge verte indique la progression.</li>
              <li><strong>Pause / Lecture :</strong> clique sur le bouton central ou appuie sur la barre d’espace pour figer l’image.</li>
              <li><strong>Navigation rapide :</strong> clique ou glisse sur la <strong>barre de progression</strong> en bas
                  pour avancer ou reculer instantanément dans le mouvement.</li>
            </ul>
          </div>
          <div class="tuto-guide-image-box tuto-guide-image-box--small">
            <img
              src="images/tuto/tuto-nav.png"
              alt="Barre de contrôle du diaporama avec les boutons et la jauge verte"
              class="tuto-guide-image js-tuto-zoomable"
            >
          </div>
        </div>
      </section>

      <!-- C2. KPlayer : Fiche détaillée -->
      <section class="tuto-guide-section" id="tuto-kplayer-fiche">
        <div class="tuto-guide-section-header">
          <h3 class="tuto-guide-title">C2. KPlayer : accéder aux explications détaillées</h3>
          <button class="tuto-back-top" type="button" data-tuto-top>
            <img src="images/haut.png" alt="Retour en haut de la page" class="tuto-back-top-icon">
          </button>
        </div>
        <div class="tuto-guide-content tuto-guide-content--image-left">
          <div class="tuto-guide-image-box tuto-guide-image-box--large">
            <img
              src="images/tuto/tuto-oeil.png"
              alt="Fiche technique de la technique affichée sur fond sombre"
              class="tuto-guide-image js-tuto-zoomable"
            >
          </div>
          <div class="tuto-guide-text">
            <p>Tu peux afficher la fiche descriptive complète d’une technique à tout moment :</p>
            <ul>
              <li>Clique sur l’icône <strong>Œil</strong> dans la barre de contrôle.</li>
              <li>La fiche technique complète s’affiche sur un fond sombre à la place des images.</li>
              <li>Clique à nouveau sur l’Œil pour fermer la fiche et revenir au visuel.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- C3. KPlayer : Vocabulaire -->
      <section class="tuto-guide-section" id="tuto-kplayer-vocab">
        <div class="tuto-guide-section-header">
          <h3 class="tuto-guide-title">C3. KPlayer : comprendre le vocabulaire</h3>
          <button class="tuto-back-top" type="button" data-tuto-top>
            <img src="images/haut.png" alt="Retour en haut de la page" class="tuto-back-top-icon">
          </button>
        </div>
        <div class="tuto-guide-content tuto-guide-content--image-right">
          <div class="tuto-guide-text">
            <p>Les termes japonais restent toujours à portée de main :</p>
            <ul>
              <li>Les mots soulignés en pointillé (ex : <span class="diaporama-vocab">Hidari</span>) sont interactifs.</li>
              <li><strong>Clique simplement sur le mot</strong> pour afficher sa définition immédiate sous forme de petite infobulle.</li>
            </ul>
          </div>
          <div class="tuto-guide-image-box tuto-guide-image-box--small">
            <img
              src="images/tuto/tuto-vocabulaire.png"
              alt="Infobulle de vocabulaire au-dessus d’un mot japonais"
              class="tuto-guide-image js-tuto-zoomable"
            >
          </div>
        </div>
      </section>

      <!-- C4. KPlayer : Cibler une technique  -->
      <section class="tuto-guide-section" id="tuto-kplayer-liens">
        <div class="tuto-guide-section-header">
          <h3 class="tuto-guide-title">C4. KPlayer : cibler une technique</h3>
          <button class="tuto-back-top" type="button" data-tuto-top>
            <img src="images/haut.png" alt="Retour en haut de la page" class="tuto-back-top-icon">
          </button>
        </div>
        <div class="tuto-guide-content tuto-guide-content--image-left">
          <div class="tuto-guide-image-box tuto-guide-image-box--medium">
            <div class="tuto-kplayer-liens-images">
              <img
                src="images/tuto/tuto-lien.png"
                alt="Lien cliquable vers une technique depuis un kata"
                class="tuto-guide-image js-tuto-zoomable"
              >
              <img
                src="images/tuto/tuto-retour.png"
                alt="Bouton Retour du diaporama pour revenir au kata"
                class="tuto-guide-image js-tuto-zoomable tuto-retour-icon"
              >
            </div>
          </div>
          <div class="tuto-guide-text">
            <p>Dans un kata, certains noms de techniques sont cliquables, ce qui permet d’ouvrir un diaporama dédié qui détaille précisément ce mouvement.</p>
            <p>Le bouton avec la flèche courbée permet ensuite de quitter la description de la technique et de revenir au kata dont elle est issue.</p>
          </div>
        </div>
      </section>

      <!-- C5. KPlayer : Bouton Maison -->
      <section class="tuto-guide-section" id="tuto-kplayer-home">
        <div class="tuto-guide-section-header">
          <h3 class="tuto-guide-title">C5. KPlayer : revenir à la liste des techniques</h3>
          <button class="tuto-back-top" type="button" data-tuto-top>
            <img src="images/haut.png" alt="Retour en haut de la page" class="tuto-back-top-icon">
          </button>
        </div>
        <div class="tuto-guide-content tuto-guide-content--image-right">
          <div class="tuto-guide-text">
            <p>L’icône en forme de <strong>maison</strong> dans la barre de contrôle du visionneur permet de sortir du diaporama.</p>
            <ul>
              <li>Clique sur la Maison pour fermer le visionneur de techniques.</li>
              <li>Tu es automatiquement ramené à la section <strong>Techniques</strong>, sur la liste de catégories.</li>
              <li>Depuis là, tu peux choisir une nouvelle catégorie ou revenir sur une autre section via le MENU.</li>
            </ul>
          </div>
          <div class="tuto-guide-image-box tuto-guide-image-box--small">
            <img
              src="images/tuto/tuto-home.png"
              alt="Icône Maison dans la barre de contrôle du visionneur"
              class="tuto-guide-image js-tuto-zoomable"
            >
          </div>
        </div>
      </section>

    </div>
  `;

  // Initialisation du zoom sur les images du tuto
  initTutoImageZoom();
  // Initialisation du scroll sur les tuiles
  initTutoTilesNavigation();
  // Initialisation des icônes "retour en haut"
  initTutoBackToTop();
};

function initTutoImageZoom() {
  const images = document.querySelectorAll(".js-tuto-zoomable");
  if (!images.length) return;

  let overlay = null;

  function closeOverlay() {
    if (overlay) {
      overlay.remove();
      overlay = null;
    }
  }

  images.forEach((img) => {
    img.addEventListener("click", () => {
      if (overlay) {
        closeOverlay();
        return;
      }

      overlay = document.createElement("div");
      overlay.className = "tuto-image-overlay";

      const bigImg = document.createElement("img");
      bigImg.src = img.src;
      bigImg.alt = img.alt || "";

      overlay.appendChild(bigImg);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", closeOverlay);
    });
  });
}

// Navigation interne via les tuiles (sommaire)
function initTutoTilesNavigation() {
  const tiles = document.querySelectorAll(".tuto-tile[data-tuto-target]");
  if (!tiles.length) return;

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const targetId = tile.getAttribute("data-tuto-target");
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// Boutons "retour en haut" dans chaque bloc
function initTutoBackToTop() {
  const buttons = document.querySelectorAll(".tuto-back-top[data-tuto-top]");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const top = document.getElementById("tuto-top");
      if (!top) return;
      top.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}
