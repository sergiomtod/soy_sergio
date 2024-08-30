document.addEventListener("DOMContentLoaded", function() {
    function ajustaAltoImg() {
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            const cartelSeccion = section.querySelector(".cartel_seccion");
            const fotoDp = section.querySelector(".foto_dp");
            if (cartelSeccion && fotoDp) {
                const altoCartel = cartelSeccion.offsetHeight;
                const altoVentana = window.innerHeight;
                const nuevoAlto = altoVentana - altoCartel - 115; // Ajusta según tu padding-top
                fotoDp.style.height = nuevoAlto + "px";
            }
        });
    }

    // Adjust on load
    ajustaAltoImg();

    // Adjust on window resize
    window.addEventListener("resize", ajustaAltoImg);
});