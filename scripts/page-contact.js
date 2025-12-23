// scripts/page-contact.js

// Construit le formulaire de contact dans #contactRoot
window.renderContactForm = function () {
  const root = document.getElementById("contactRoot");
  if (!root) return;

  root.innerHTML = "";

  const form = document.createElement("form");
  form.id = "contactForm";
  form.action = "https://api.web3forms.com/submit";
  form.method = "POST";
  form.noValidate = true;

  // access_key Web3Forms
  const access = document.createElement("input");
  access.type = "hidden";
  access.name = "access_key";
  access.value = "30a86ac0-b1f9-49eb-8f7c-93392300afa9";
  form.appendChild(access);

  // Champ prénom / pseudo (obligatoire)
  const groupName = document.createElement("div");
  groupName.className = "form-group";

  const labelName = document.createElement("label");
  labelName.htmlFor = "contactName";
  labelName.textContent = "Prénom / Pseudo *";

  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.id = "contactName";
  inputName.name = "name"; // envoyé à Web3Forms
  inputName.required = true;

  const errorName = document.createElement("span");
  errorName.className = "form-error";
  errorName.setAttribute("data-for", "contactName");

  groupName.appendChild(labelName);
  groupName.appendChild(inputName);
  groupName.appendChild(errorName);
  form.appendChild(groupName);

  // Champ email (obligatoire)
  const groupEmail = document.createElement("div");
  groupEmail.className = "form-group";

  const labelEmail = document.createElement("label");
  labelEmail.htmlFor = "contactEmail";
  labelEmail.textContent = "E-mail *";

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.id = "contactEmail";
  inputEmail.name = "email";
  inputEmail.required = true;

  const errorEmail = document.createElement("span");
  errorEmail.className = "form-error";
  errorEmail.setAttribute("data-for", "contactEmail");

  groupEmail.appendChild(labelEmail);
  groupEmail.appendChild(inputEmail);
  groupEmail.appendChild(errorEmail);
  form.appendChild(groupEmail);

  // Champ message (obligatoire)
  const groupMessage = document.createElement("div");
  groupMessage.className = "form-group";

  const labelMessage = document.createElement("label");
  labelMessage.htmlFor = "contactMessage";
  labelMessage.textContent = "Message";

  const textarea = document.createElement("textarea");
  textarea.id = "contactMessage";
  textarea.name = "message";
  textarea.rows = 4;

  const errorMessage = document.createElement("span");
  errorMessage.className = "form-error";
  errorMessage.setAttribute("data-for", "contactMessage");

  groupMessage.appendChild(labelMessage);
  groupMessage.appendChild(textarea);
  groupMessage.appendChild(errorMessage);
  form.appendChild(groupMessage);

  // Groupe "Recevoir les actualités du KDojo" (optionnel)
  const groupOptIn = document.createElement("div");
  groupOptIn.className = "form-group human-check-group";

  const optInWrapper = document.createElement("div");
  optInWrapper.className = "human-check";

  const optInInput = document.createElement("input");
  optInInput.type = "checkbox";
  optInInput.id = "newsletterOptIn";
  optInInput.name = "newsletter_optin";

  const optInLabel = document.createElement("label");
  optInLabel.htmlFor = "newsletterOptIn";

  const optInBox = document.createElement("span");
  optInBox.className = "human-check-box";

  const optInText = document.createElement("span");
  optInText.className = "human-check-label";
  optInText.textContent = "Recevoir les actualités du KDojo";

  optInLabel.appendChild(optInBox);
  optInLabel.appendChild(optInText);

  optInWrapper.appendChild(optInInput);
  optInWrapper.appendChild(optInLabel);

  groupOptIn.appendChild(optInWrapper);
  form.appendChild(groupOptIn);

    // Groupe "Je suis un humain" (obligatoire)
  const groupHuman = document.createElement("div");
  groupHuman.className = "form-group human-check-group";

  const humanWrapper = document.createElement("div");
  humanWrapper.className = "human-check";

  const humanInput = document.createElement("input");
  humanInput.type = "checkbox";
  humanInput.id = "humanCheck";
  humanInput.name = "humanCheck";

  const humanLabel = document.createElement("label");
  humanLabel.htmlFor = "humanCheck";

  const humanBox = document.createElement("span");
  humanBox.className = "human-check-box";

  const humanText = document.createElement("span");
  humanText.className = "human-check-label";
  humanText.textContent = "Je suis un humain";

  humanLabel.appendChild(humanBox);
  humanLabel.appendChild(humanText);

  humanWrapper.appendChild(humanInput);
  humanWrapper.appendChild(humanLabel);

  const errorHuman = document.createElement("span");
  errorHuman.className = "form-error";
  errorHuman.setAttribute("data-for", "humanCheck");

  groupHuman.appendChild(humanWrapper);
  groupHuman.appendChild(errorHuman);
  form.appendChild(groupHuman);

  // Wrapper bas de formulaire : gauche = cases + bouton, droite = logo
  const bottomWrapper = document.createElement("div");
  bottomWrapper.className = "contact-bottom";

  // Colonne gauche : cases + bouton
  const leftCol = document.createElement("div");
  leftCol.className = "contact-bottom-left";

  leftCol.appendChild(groupOptIn);  // déjà créé plus haut
  leftCol.appendChild(groupHuman);

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "btn-accent";
  submitBtn.textContent = "Envoyer";

  leftCol.appendChild(submitBtn);

  // Colonne droite : logo
  const rightCol = document.createElement("div");
  rightCol.className = "contact-bottom-right";

  const logoImg = document.createElement("img");
  logoImg.src = "images/logo.png";
  logoImg.alt = "Logo Kandaku Dojo";
  logoImg.className = "contact-logo";

  rightCol.appendChild(logoImg);

  bottomWrapper.appendChild(leftCol);
  bottomWrapper.appendChild(rightCol);

  form.appendChild(bottomWrapper);

  // Feedback global sous le bloc bas
  const feedback = document.createElement("p");
  feedback.id = "contactFeedback";
  feedback.className = "form-feedback";

  form.appendChild(feedback);

  root.appendChild(form);

  // Initialise la validation
  initContactForm();
};



// Utilitaire pour afficher un message d'erreur sous un champ
function afficherErreurContact(champId, message) {
  const span = document.querySelector(`.form-error[data-for="${champId}"]`);
  if (span) {
    span.textContent = message;
  }
}

// Validation + envoi
window.initContactForm = function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("contactName");
  const email      = document.getElementById("contactEmail");
  const message    = document.getElementById("contactMessage");
  const humanCheck = document.getElementById("humanCheck");
  const feedback   = document.getElementById("contactFeedback");

  form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let ok = true;

  afficherErreurContact("contactName", "");   // ← ajout
  afficherErreurContact("contactEmail", "");
  afficherErreurContact("contactMessage", "");
  afficherErreurContact("humanCheck", "");

  if (feedback) {
    feedback.textContent = "";
    feedback.style.color = "";
  }

  // 1) Prénom / Pseudo obligatoire
  const nameVal =
    (nameInput && nameInput.value ? nameInput.value : "").trim();
  if (!nameVal) {
    ok = false;
    afficherErreurContact(
      "contactName",
      "Veuillez renseigner votre prénom ou pseudo."
    );
  }

  // 2) Email obligatoire
  const emailVal = (email && email.value ? email.value : "").trim();
  if (!emailVal) {
    ok = false;
    afficherErreurContact("contactEmail", "Veuillez renseigner une adresse e-mail.");
  } else if (email && !email.checkValidity()) {
    ok = false;
    afficherErreurContact(
      "contactEmail",
      "Le format de l’adresse e-mail semble incorrect."
    );
  }

  // 3) Case humain obligatoire
  const humanOk = !!(humanCheck && humanCheck.checked === true);
  if (!humanOk) {
    ok = false;
    afficherErreurContact(
      "humanCheck",
      "Merci de confirmer que vous êtes un humain."
    );
  }

  if (!ok) {
    if (feedback) {
      feedback.textContent =
        "Le formulaire contient des erreurs. Merci de corriger les champs indiqués.";
      feedback.style.color = "#ff4d4d";
    }
    return;
  }


    if (feedback) {
      feedback.textContent = "Envoi du message en cours…";
      feedback.style.color = "#cccccc";
    }

    // Envoi AJAX vers Web3Forms (sans redirection)
    const formData = new FormData(form);
    // Ne pas inclure la case "Je suis un humain" dans l'e-mail
formData.delete("humanCheck");

  // Sujet dynamique
  const newsletterOptIn = document.getElementById("newsletterOptIn");
  const isNewsletter = !!(newsletterOptIn && newsletterOptIn.checked);
  const subject = isNewsletter
    ? "KDojo : nouvel abonné"
    : "KDojo : message";

  // On force le sujet envoyé à Web3Forms
  formData.set("subject", subject);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });
    const result = await response.json();

    if (response.ok && result.success) {
      alert("Message envoyé.\nVous allez être redirigé vers la page d'accueil.");
      if (typeof window.activerSection === "function") {
        window.activerSection("accueil");
      }
    } else {
      if (feedback) {
        feedback.textContent =
          "Une erreur est survenue lors de l’envoi. Merci de réessayer plus tard.";
        feedback.style.color = "#ff4d4d";
      }
    }
  } catch (err) {
    if (feedback) {
      feedback.textContent =
        "Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.";
      feedback.style.color = "#ff4d4d";
    }
  }
});
};

