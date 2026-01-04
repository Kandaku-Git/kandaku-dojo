// scripts/page-accueil.js

// Construit dynamiquement le contenu de la section Accueil
window.renderAccueilSection = function () {
  const section = document.getElementById("section-accueil");
  if (!section) return;

  // On vide tout le contenu existant
  section.innerHTML = "";

  // Titre de bienvenue (respect majuscules/minuscules)
  const h2 = document.createElement("h2");
  h2.textContent = "BIENVENUE AU KDojo";
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
  "Découvre ici une encyclopédie vivante du karaté Shotokan&nbsp;: techniques animées, lexique et vidéos à emporter partout." +
  "<br><br>" +
  "Le KPlayer <button type=\"button\" class=\"btn-link accueil-contact-link\" data-section=\"tuto\">(tuto)</button> te servira de mémento&nbsp;: il t'aide à naviguer entre les techniques et à approfondir tes connaissances." +
  "<br><br>" +
  "Depuis la <button type=\"button\" class=\"btn-link accueil-contact-link\" data-section=\"contact\">page de contact</button>, tu peux me contacter et t'abonner aux mises à jour." +
  "<br><br>Garde ton smartphone bien calé entre la ceinture et le kimono… et bon entraînement au KDojo&nbsp;!";

  right.appendChild(p);
  layout.appendChild(right);
};