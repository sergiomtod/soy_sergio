document.addEventListener("DOMContentLoaded", function () {
    const cielo = document.querySelector(".cielo");
    const astro = document.querySelector("#astro");
    const nubes = document.querySelectorAll(".nube, .nubefondo");
    const contenedorDeEstrellas = document.querySelector(".estrellas");
    const cartelSergio = document.querySelector('.img_fija img');
    const options = { timeZone: 'Europe/Madrid', hour: '2-digit', hour12: false };
    const horaLocal = parseInt(new Intl.DateTimeFormat('es-ES', options).format(new Date()), 10);
    let posicionTop;
    let posicionLeft;
    let inicioGradiente;
    let finGradiente;

    function calcularPosicion(hora, startTop, startLeft, endTop, endLeft, startHour, endHour) {
        const progress = (hora - startHour) / (endHour - startHour);
        const top = startTop + progress * (endTop - startTop);
        const left = startLeft + progress * (endLeft - startLeft);
        return { top, left };
    }

    function crearEstrellas() {
        contenedorDeEstrellas.innerHTML = '';
        const numeroDeEstrellas = 100;

        for (let i = 0; i < numeroDeEstrellas; i++) {
            const estrella = document.createElement('div');
            estrella.className = 'estrella';
            estrella.style.top = Math.random() * 100 + '%';
            estrella.style.left = Math.random() * 100 + '%';
            
            const duracion = Math.random() * 3 + 2;
            const retraso = Math.random() * 2;
            estrella.style.animation = `parpadeo ${duracion}s infinite`;
            estrella.style.animationDelay = `${retraso}s`;

            contenedorDeEstrellas.appendChild(estrella);
        }
    }

    function adjustFontSize() {
        const cabeceraH2 = document.querySelector('#cabecera h2');
        const imgFijaImg = document.querySelector('.img_fija img');
        const imgFijaH1 = document.querySelector('.img_fija h1');
        const imgFijaH3 = document.querySelector('.img_fija h3');
        const imgFija = document.querySelector('.img_fija');

        const alturaImg = imgFijaImg.offsetHeight;
        const alturaImgFija = imgFija.offsetHeight;

        const fontSize = alturaImg * 0.068;
        imgFijaH1.style.fontSize = `${fontSize}px`;

        const fontSize2 = alturaImg * 0.035;
        imgFijaH3.style.fontSize = `${fontSize2}px`;

        const fontSize3 = alturaImg * 0.06;
        cabeceraH2.style.fontSize = `${fontSize3}px`;

        const offset = (alturaImgFija - alturaImg);
        const topPosition = offset + alturaImg * 0.5;
        imgFijaH1.style.top = `${topPosition}px`;

        const offset2 = (alturaImgFija - alturaImg);
        const topPosition2 = offset2 + alturaImg * 0.712;
        imgFijaH3.style.top = `${topPosition2}px`;
    }

    // Ajusta el cálculo de la posición del astro y el gradiente del cielo basado en la hora actual
    switch (true) {
        case (horaLocal >= 6 && horaLocal < 12):
            ({ top: posicionTop, left: posicionLeft } = calcularPosicion(horaLocal, 100, 1, 25, 50, 6, 12));
            inicioGradiente = "#1a395c";
            finGradiente = "#137fd8";
            cielo.style.background = `linear-gradient(${inicioGradiente}, ${finGradiente})`;
            astro.classList.remove("luna");
            astro.classList.add("sol");
            nubes.forEach(nube => nube.classList.remove("nubes-noche", "nubefondo-noche"));
            contenedorDeEstrellas.style.display = 'none';
            cartelSergio.src = 'img/cielo/cartel_sergio.png'; // Cambiar a imagen de día
            break;
        case (horaLocal >= 12 && horaLocal < 22):
            ({ top: posicionTop, left: posicionLeft } = calcularPosicion(horaLocal, 25, 50, 100, 100, 12, 22));
            inicioGradiente = "#137fd8";
            finGradiente = "#1a395c";
            cielo.style.background = `linear-gradient(${inicioGradiente}, ${finGradiente})`;
            astro.classList.remove("luna");
            astro.classList.add("sol");
            nubes.forEach(nube => nube.classList.remove("nubes-noche", "nubefondo-noche"));
            contenedorDeEstrellas.style.display = 'none';
            cartelSergio.src = 'img/cielo/cartel_sergio.png'; // Cambiar a imagen de día
            break;
        case (horaLocal >= 22 || horaLocal < 6):
            if (horaLocal >= 22 || horaLocal < 2) {
                if (horaLocal >= 22) {
                    ({ top: posicionTop, left: posicionLeft } = calcularPosicion(horaLocal, 100, 1, 25, 50, 22, 24));
                } else {
                    ({ top: posicionTop, left: posicionLeft } = calcularPosicion(horaLocal + 24, 100, 1, 25, 50, 22, 26));
                }
            } else {
                ({ top: posicionTop, left: posicionLeft } = calcularPosicion(horaLocal, 25, 50, 100, 100, 2, 6));
            }
            inicioGradiente = "#000009";
            finGradiente = "#0b0b0b";
            $('.nube').css('z-index', '2');
            $('.nubefondo').css('z-index', '2');
            cielo.style.background = `linear-gradient(${inicioGradiente}, ${finGradiente})`;
            astro.classList.remove("sol");
            astro.classList.add("luna");
            nubes.forEach(nube => nube.classList.add("nubes-noche", "nubefondo-noche"));
            contenedorDeEstrellas.style.display = 'block';
            crearEstrellas();
            cartelSergio.src = 'img/cielo/cartel_noche.png'; // Cambiar a imagen de noche
            break;
    }

    astro.style.top = `${posicionTop}%`;
    astro.style.left = `${posicionLeft}%`;

    window.addEventListener('load', adjustFontSize);
    window.addEventListener('resize', adjustFontSize);
});
