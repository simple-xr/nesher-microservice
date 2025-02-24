// public/js/script.js
window.addEventListener('load', function () {
    const openARButton = document.getElementById('open-ar-button');
    const arButton = document.getElementById('ar-button');
  
    // Adiciona um listener ao botão "Seguir para RA"
    openARButton.addEventListener('click', function () {
      // Verifica se o botão AR está disponível
      if (arButton) {
        arButton.click(); // Simula o clique no botão AR
      } else {
        console.error('Botão AR não encontrado.');
      }
    });
  });