document.addEventListener('DOMContentLoaded', function() { 

    var url = window.location.pathname; // Obtener URL de la pagina actual donde estemos situados

    if (url.includes("index.html")){ // Si estamos en INDEX, ejecutamos codigo del CARROUSEL
        // CARROUSEL

        const slider = document.querySelector('.slider');
        const flechaIzq = document.querySelector('.izq');
        const flechaDer = document.querySelector('.der');
        const indicadorPadre = document.querySelector('.controles ul');
        let section = 0;

        // funcion que me permite retroceder y avanzar con los section (mover el carrousel) y saca el seleccionado 
        function seleccionarIncide(){
            // a los controles con la clase seleccionado les quita la clase
            document.querySelector('.controles .seleccionado').classList.remove('seleccionado');
            //permite movimiento
            slider.style.transform = 'translate('+ (section) * -20 +'%)';
        }

        document.querySelectorAll('.controles li').forEach(seleccionar);

        // funcion que agrega un evento al hacer click y crea una funcion que llama a la funcion seleccionarIndice y agrega la clase selecionado
        function seleccionar (indicador, ind){
            indicador.addEventListener('click', function (){
                section = ind;
                seleccionarIncide(section);
                indicador.classList.add('seleccionado');
            });
        }

        //evento que agrega funcion al hacer click en los puntitos tmb
        flechaIzq.addEventListener('click', function(){
            //operador ternario para ver en q posicion se encuentra los section y moverlo depeniendo de esta
            section = (section > 0) ? section - 1 : 4;
            seleccionarIncide(section);
            indicadorPadre.children[section].classList.add('seleccionado');
        })

        flechaDer.addEventListener('click', function(){
            section = (section < 4) ? section + 1 : 0;
            seleccionarIncide(section);
            indicadorPadre.children[section].classList.add('seleccionado');
        })

    } else if (url.includes("contacto.html")){ // Si estamos en CONTACTO, ejecutamos codigo del FORMULARIO
        // VALIDACION DEL FORMULARIO

        const contenedorPrincipal = document.querySelector('.contenedor_principal');
        const formulario = document.querySelector('.formulario');

        const nombre = document.querySelector('#nombre');
        const email = document.querySelector('#email');
        const mensaje = document.querySelector('#mensaje');
        const telefono = document.querySelector('#telefono');

        let mensajeVisible = false;

        function crearMensajeHTML(texto) {
            // Crear el contenedor del mensaje solo si aún no hay uno visible
            if (!mensajeVisible) {
                const divMensaje = document.createElement('div');
                divMensaje.classList.add('mensaje_formulario');
                contenedorPrincipal.appendChild(divMensaje);
                mensajeVisible = true;

                // Hacer que el mensaje desaparezca después de 5 segundos
                setTimeout(() => {
                    divMensaje.remove();
                    mensajeVisible = false;
                }, 5000);
            }

            // Crear un nuevo párrafo de mensaje
            const parrafoMensaje = document.createElement('p');
            parrafoMensaje.textContent = texto;
            
            // Agregar el párrafo al contenedor del mensaje
            const divMensaje = document.querySelector('.mensaje_formulario');
            divMensaje.appendChild(parrafoMensaje);
        }

        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            let formularioValidado = true;

            // Limpiar mensajes de validación previos
            const mensajesExistentes = document.querySelector('.mensaje_formulario');
            if (mensajesExistentes) {
                mensajesExistentes.remove();
                mensajeVisible = false;
            }

            if (nombre.value === '') {
                crearMensajeHTML("El nombre en el formulario es obligatorio.");
                formularioValidado = false;
            } else if (nombre.value.length < 3) {
                crearMensajeHTML("El nombre debe tener más de 3 caracteres.");
                formularioValidado = false;
            }
            
            if (email.value === '') {
                crearMensajeHTML("El email en el formulario es obligatorio.");
                formularioValidado = false;
            }

            if (mensaje.value.length < 10){
                crearMensajeHTML("El mensaje debe tener más de 10 caracteres.");
            }

            if (formularioValidado) {
                // Procesar el formulario si todos los campos están validados
                console.log('Formulario enviado exitosamente');
            }
        });

    }
});

/* 
document.getElementById('myForm').addEventListener('submit', function(event) {
    // Prevent form submission
    event.preventDefault();

    // Clear previous errors
    clearErrors();

    // Perform validation
    let isValid = true;

    // Username validation
    const username = document.getElementById('username').value;
    if (username === '') {
        showError('username', 'El nombre de usuario es obligatorio.');
        isValid = false;
    } else if (username.length < 3 || username.length > 15) {
        showError('username', 'El nombre de usuario debe tener entre 3 y 15 caracteres.');
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value;
    if (email === '') {
        showError('email', 'El correo electrónico es obligatorio.');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Por favor, introduce un correo electrónico válido.');
        isValid = false;
    }

    // Age validation
    const age = document.getElementById('age').value;
    if (age === '') {
        showError('age', 'La edad es obligatoria.');
        isValid = false;
    } else if (isNaN(age) || age < 18 || age > 99) {
        showError('age', 'La edad debe ser un número entre 18 y 99.');
        isValid = false;
    }

    // If the form is valid, submit it
    if (isValid) {
        alert('Formulario enviado con éxito!');
        // Aquí puedes enviar el formulario usando AJAX o simplemente descomentar la línea siguiente para el envío normal
        // this.submit();
    }
});

function showError(field, message) {
    const errorElement = document.getElementById(field + 'Error');
    errorElement.textContent = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => element.textContent = '');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

*/
