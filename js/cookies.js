document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el banner solo si no se ha tomado una decisión
    if (!localStorage.getItem('cookiesDecision')) {
        document.getElementById('cookie-banner').style.display = 'block';
    } else {
        // Cargar o no scripts según la decisión previa
        handleCookieScripts(localStorage.getItem('cookiesDecision'));
    }

    // Al hacer clic en "Aceptar"
    document.getElementById('accept-cookies').addEventListener('click', function() {
        // Guardar el consentimiento en localStorage
        localStorage.setItem('cookiesDecision', 'accepted');
        // Ocultar el banner
        document.getElementById('cookie-banner').style.display = 'none';
        // Activar cookies no esenciales
        handleCookieScripts('accepted');
    });

    // Al hacer clic en "Rechazar"
    document.getElementById('reject-cookies').addEventListener('click', function() {
        // Guardar el rechazo en localStorage
        localStorage.setItem('cookiesDecision', 'rejected');
        // Ocultar el banner
        document.getElementById('cookie-banner').style.display = 'none';
        // Desactivar cookies no esenciales y limpiar las existentes
        handleCookieScripts('rejected');
    });
});

// Función para manejar la carga y limpieza de scripts según la decisión del usuario
function handleCookieScripts(decision) {
    if (decision === 'accepted') {
        // Cargar scripts que utilizan cookies
        loadAnalyticsScript();
        // Puedes añadir otros scripts de cookies no esenciales aquí
    } else if (decision === 'rejected') {
        // No cargar scripts de cookies no esenciales
        // Limpiar cookies existentes
        borrarCookies();
    }
}

// Función para cargar scripts de cookies no esenciales (ejemplo con Google Analytics)
function loadAnalyticsScript() {
    var script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_TRACKING_ID';
    script.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'YOUR_TRACKING_ID');
    };
    document.head.appendChild(script);
}

// Función para borrar cookies existentes
function borrarCookies() {
    // Obtener todas las cookies
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var nombre = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        // Borrar la cookie estableciendo una fecha de expiración en el pasado
        document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
}
