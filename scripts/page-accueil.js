// scripts/page-accueil.js

// Construit dynamiquement le contenu de la section Accueil
window.renderAccueilSection = function () {
  const section = document.getElementById("section-accueil");
  if (!section) return;

  // On vide tout le contenu existant
  section.innerHTML = "";

  // Titre de bienvenue (respect majuscules/minuscules)
  const h2 = document.createElement("h2");
  h2.textContent = "Bienvenue au KDojo";
  section.appendChild(h2);

  // Saut de ligne après le titre
  const spacer = document.createElement("div");
  spacer.style.height = "0.75rem";
  section.appendChild(spacer);

  // Wrapper pour la mise en page en deux colonnes
  const layout = document.createElement("div");
  layout.className = "accueil-layout";
  section.appendChild(layout);

  // Colonne gauche : image
  const left = document.createElement("div");
  left.className = "accueil-col accueil-col-image";

  const img = document.createElement("img");
  img.src = "images/karateka.png";
  img.alt = "Karatéka en garde";
  img.className = "accueil-image";

  left.appendChild(img);
  layout.appendChild(left);

  // Colonne droite : texte (un seul paragraphe modifiable en HTML)
  const right = document.createElement("div");
  right.className = "accueil-col accueil-col-texte";

const p = document.createElement("p");
p.innerHTML =
  "Bonjour et bienvenue au KDojo&nbsp;!<br><br>Tu as ici accès à mon encyclopédie du karaté Shotokan, présentée sous forme animée.<br>Techniques, lexique et vidéos constituent un véritable mémento portable que tu peux glisser entre ta ceinture et ton karatégi.<br><br>" +
  "Si tu repères une erreur ou un contenu manquant, n’hésite pas à me le signaler. Et pour être au courant des mises à jour, abonne-toi depuis la " +
  "<button type=\"button\" class=\"btn-link accueil-contact-link\" data-section=\"contact\">page de contact</button>.";

  right.appendChild(p);
  layout.appendChild(right);
};
