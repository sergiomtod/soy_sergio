document.addEventListener("DOMContentLoaded", function() {
    function checkAvailability() {
        const availableHours = [
            { start: 7, end: 13, h6Message: "" },
            { start: 13, end: 14, h6Message: "Lo siento, estoy almorzando, intentalo más tarde." },
            { start: 14, end: 18, h6Message: "" },
            { start: 18, end: 20, h6Message: "Lo siento estoy en el gym, intentalo más tarde." },
            { start: 20, end: 21, h6Message: "" },
            { start: 21, end: 22, h6Message: "Lo siento, estoy cenando, Enviame un mail y te responderé mañana." },
            { start: 22, end: 24, h6Message: "Lo siento pero estoy durmiendo. Enviame un mail y te responderé mañana." },
            { start: 0, end: 7, h6Message: "Lo siento pero estoy durmiendo. Enviame un mail y te responderé mañana." }
        ];

        const weekendMessage = "¡Es fin de semana! Envíame un mail y me pondré en contacto contigo el lunes. ¡Disfruta!";

        // Obtener la hora y día actual en España
        const now = new Date();
        const options = { timeZone: 'Europe/Madrid', hour: '2-digit', hour12: false };
        const currentHour = parseInt(new Intl.DateTimeFormat('es-ES', options).format(now), 10);
        const currentDay = now.getDay(); // 0 = Domingo, 6 = Sábado

        // Obtener los elementos
        const statusElement = document.getElementById('availability-status');
        const statusElementWhatsapp = document.getElementById('availability-status-whatsapp');
        const phoneButton = document.getElementById('phone-button');
        const whatsappButton = document.getElementById('whatsapp-button');
        const phoneLink = document.getElementById('phone-link');
        const whatsappLink = document.getElementById('whatsapp-link');

        // Crear o seleccionar h6 para mostrar el mensaje
        let phoneInfo = document.getElementById('phone-info-h6');
        let whatsappInfo = document.getElementById('whatsapp-info-h6');

        if (!phoneInfo) {
            phoneInfo = document.createElement('h6');
            phoneInfo.id = 'phone-info-h6';
            statusElement.parentNode.insertBefore(phoneInfo, statusElement.nextSibling);
        }

        if (!whatsappInfo) {
            whatsappInfo = document.createElement('h6');
            whatsappInfo.id = 'whatsapp-info-h6';
            statusElementWhatsapp.parentNode.insertBefore(whatsappInfo, statusElementWhatsapp.nextSibling);
        }

        // Lógica de disponibilidad
        let available = false;
        let message = "";

        if (currentDay === 0 || currentDay === 6) {  // Sábado y Domingo
            available = false;
            message = weekendMessage;
        } else {
            availableHours.forEach(period => {
                if (currentHour >= period.start && currentHour < period.end) {
                    available = period.h6Message === "";
                    message = period.h6Message;
                }
            });
        }

        if (available) {
            statusElement.innerHTML = '<span class="disponible">Disponible</span>';
            statusElementWhatsapp.innerHTML = '<span class="disponible">Disponible</span>';
            phoneButton.classList.remove('button-disabled');
            whatsappButton.classList.remove('button-disabled');
            phoneLink.href = 'tel:+34641880575';
            whatsappLink.href = 'https://wa.me/34641880575';
            phoneInfo.style.display = 'none';
            whatsappInfo.style.display = 'none';
        } else {
            statusElement.innerHTML = '<span class="no-disponible">No disponible</span>';
            statusElementWhatsapp.innerHTML = '<span class="no-disponible">No disponible</span>';
            phoneButton.classList.add('button-disabled');
            whatsappButton.classList.add('button-disabled');
            phoneLink.removeAttribute('href');
            whatsappLink.removeAttribute('href');
            phoneInfo.textContent = message;
            whatsappInfo.textContent = message;
            phoneInfo.style.display = 'block';
            whatsappInfo.style.display = 'block';
        }
    }

    checkAvailability();
});
