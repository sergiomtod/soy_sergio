$(document).ready(function(){
    var alturaInicio = $('#inicio').height();
    //aqui fijamos el menu en funcion de si esta o no en el inicio
    $(window).on('scroll', function(){
        if ($(window).scrollTop() >= alturaInicio ) {
            $('.navbar-custom').addClass('menu-fijo');
        } else {
            $('.navbar-custom').removeClass('menu-fijo');
        }
    });

    $(window).on('resize', function(){
        alturaInicio = $('#inicio').height();
    });
    // función para manejar los ajustes a diferentes pantallas
    function actualizarEstilosNavbar() {
        var esInicio = $(window).scrollTop() < $('#inicio').height();
        var esPantallaPequenia = window.innerWidth < 576 || window.innerHeight < 599;
        
        if (esInicio && esPantallaPequenia) {
            $('.navbar-custom').css('background-color', 'transparent');
            $('.navbar-custom .navbar-collapse.show').css('background-color', 'rgba(0, 0, 0, 0.6)');
            $('.navbar-custom .navbar-brand img').css('filter', 'invert(73%) sepia(51%) saturate(305%) hue-rotate(288deg) brightness(252%) contrast(101%)');
            $('.navbar-toggler').css('border-color', '#F9b9f2');
            $('.navbar-toggler').css('color', '#F9b9f2');
            $('.navbar-toggler-icon').css('background-image', 'url("data:image/svg+xml;charset=utf8,%3Csvg viewBox=\'0 0 32 32\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath stroke=\'rgba(249,185,242)\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-miterlimit=\'10\' d=\'M4 8h24M4 16h24M4 24h24\'/%3E%3C/svg%3E")');
        } else {
            $('.navbar-custom').css('background-color', 'rgba(0, 0, 0, 0.6)');
            $('.navbar-custom .navbar-brand img').css('filter', 'none');
            $('.navbar-toggler').css('border-color', 'white');
            $('.navbar-toggler').css('color', 'white');
            $('.navbar-toggler-icon').css('background-image', 'url("data:image/svg+xml;charset=utf8,%3Csvg viewBox=\'0 0 32 32\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath stroke=\'rgba(255,255,255,1)\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-miterlimit=\'10\' d=\'M4 8h24M4 16h24M4 24h24\'/%3E%3C/svg%3E")');
        }
    }
    // Ejecuta la función al cargar la página y al hacer scroll y resize
    actualizarEstilosNavbar();
    $(window).on('scroll', actualizarEstilosNavbar);
    $(window).on('resize', actualizarEstilosNavbar);
    $('.navbar-toggler').on('click', function() {
        setTimeout(actualizarEstilosNavbar, 300);
    });
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Scroll suave al destino
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Aplicar rebote después del scroll suave
        setTimeout(() => {
            targetElement.classList.add('bounce');
        }, 500); // Ajusta este valor según la duración del scroll

        // Eliminar la clase de rebote después de la animación
        targetElement.addEventListener('animationend', () => {
            targetElement.classList.remove('bounce');
        });
    });
});

