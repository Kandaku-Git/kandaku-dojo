window.onerror = (msg, src, line, col, err) => {
  console.error("Erreur JS globale:", { msg, src, line, col, err });
};
