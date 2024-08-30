function adjustTextSize() {
    const img = document.querySelector('.img_fija img');
    const h1 = document.querySelector('.img_fija h1');

    // Verificar que ambos elementos existan
    if (!img || !h1) return;

    // Establecer el ancho de h1 como el 80% del ancho de la imagen
    const imgWidth = img.clientWidth;
    const h1Width = imgWidth * 0.70;
    h1.style.width = `${h1Width}px`;

    // Calcular el tamaño de la fuente para que ocupe el ancho del h1 sin hacer overflow
    let fontSize = 1; // Iniciar con un tamaño de fuente pequeño
    h1.style.fontSize = `${fontSize}px`;
    const maxFontSize = 100; // Tamaño máximo de fuente permitido

    while (h1.scrollWidth <= h1.clientWidth && fontSize <= maxFontSize) {
        fontSize++;
        h1.style.fontSize = `${fontSize}px`;
    }

    // Disminuir el tamaño de la fuente si se pasa del ancho del h1
    while (h1.scrollWidth > h1.clientWidth && fontSize > 0) {
        fontSize--;
        h1.style.fontSize = `${fontSize}px`;
    }
}

// Ajustar el tamaño del texto cuando se carga la página y al redimensionar la ventana
window.addEventListener('load', adjustTextSize);
window.addEventListener('resize', adjustTextSize);
