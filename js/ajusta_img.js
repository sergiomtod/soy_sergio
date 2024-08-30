document.addEventListener("DOMContentLoaded", function() {
    function adjustImageHeight() {
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            const cartelSeccion = section.querySelector(".cartel_seccion");
            const fotoDp = section.querySelector(".foto_dp");
            if (cartelSeccion && fotoDp) {
                const cartelHeight = cartelSeccion.offsetHeight;
                const windowHeight = window.innerHeight;
                const newHeight = windowHeight - cartelHeight - 115; // Ajusta según tu padding-top
                fotoDp.style.height = newHeight + "px";
            }
        });
    }

    // Adjust on load
    adjustImageHeight();

    // Adjust on window resize
    window.addEventListener("resize", adjustImageHeight);
});
