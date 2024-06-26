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
            slider.style.transform = 'translate('+ (section) * -25 +'%)';
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
            section = (section > 0) ? section - 1 : 3;
            seleccionarIncide(section);
            indicadorPadre.children[section].classList.add('seleccionado');
        })

        flechaDer.addEventListener('click', function(){
            section = (section < 3) ? section + 1 : 0;
            seleccionarIncide(section);
            indicadorPadre.children[section].classList.add('seleccionado');
        })

    } else if (url.includes("contacto.html")){ // Si estamos en CONTACTO, ejecutamos codigo del FORMULARIO
        // VALIDACION DEL FORMULARIO

        const contenedorPrincipal = document.querySelector('.contenedor_principal');
        const formulario = document.querySelector('.formulario');

        const inputNombre = document.querySelector('#nombre');
        const inputEmail = document.querySelector('#email');
        const inputMensaje = document.querySelector('#mensaje');
        const inputTelefono = document.querySelector('#telefono');

        let mensajeErrorVisible = false;
        let mensajeCorrectoVisible = false;

        function crearMensajeConfirmadoHTML(){
            // Crear el contenedor del mensaje solo si aún no hay uno visible
            if (!mensajeCorrectoVisible) {
                const divMensaje = document.createElement('div');
                divMensaje.classList.add('mensaje_formulario_correcto');
                divMensaje.style.display = 'block';
                contenedorPrincipal.appendChild(divMensaje);
                mensajeCorrectoVisible = true;

                // Hacer que el mensaje desaparezca después de 5 segundos
                setTimeout(() => {
                    divMensaje.remove();
                    mensajeCorrectoVisible = false;
                    divMensaje.style.display = 'none';
                }, 5000);
            }

            // Crear un nuevo párrafo de mensaje
            const parrafoMensaje = document.createElement('p');
            parrafoMensaje.textContent = '¡Mensaje enviado correctamente!';
            
            // Agregar el párrafo al contenedor del mensaje
            const divMensaje = document.querySelector('.mensaje_formulario_correcto');
            divMensaje.appendChild(parrafoMensaje);
        }

        function crearMensajeErrorHTML(texto) {
            // Crear el contenedor del mensaje solo si aún no hay uno visible
            if (!mensajeErrorVisible) {
                const divMensaje = document.createElement('div');
                divMensaje.classList.add('mensaje_formulario_error');
                divMensaje.style.display = 'block';
                contenedorPrincipal.appendChild(divMensaje);
                mensajeErrorVisible = true;

                // Hacer que el mensaje desaparezca después de 5 segundos
                setTimeout(() => {
                    divMensaje.remove();
                    mensajeErrorVisible = false;
                    divMensaje.style.display = 'none';
                }, 5000);
            }

            // Crear un nuevo párrafo de mensaje
            const parrafoMensaje = document.createElement('p');
            parrafoMensaje.textContent = texto;
            
            // Agregar el párrafo al contenedor del mensaje
            const divMensaje = document.querySelector('.mensaje_formulario_error');
            divMensaje.appendChild(parrafoMensaje);
        }

        function modificarLabelFormulario(label, agregar) {
            // Verificar si ya existe un span con el asterisco
            const span = label.querySelector('span');
            if (agregar) {
                if (!span) {
                    // Crear un elemento span para el asterisco
                    let spanHTML = document.createElement('span');
                    spanHTML.textContent = '*';
                    spanHTML.style.color = 'rgb(224, 24, 24)';
                    spanHTML.style.fontWeight = '600';

                    // Agregar el span al final del label
                    label.appendChild(spanHTML);
                }
            } else {
                // Eliminar el span si ya existe
                if (span) {
                    span.remove();
                }
            }
        }

        function verificarYModificarLabel(inputYlabel) {
            const input = document.getElementById(inputYlabel);
            const label = document.querySelector(`label[for="${inputYlabel}"]`);
            if (input.value === '') {
                modificarLabelFormulario(label, true);
            } else {
                modificarLabelFormulario(label, false);
            }
        }

        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            let formularioValidado = true;

            // Limpiar mensajes de validación ERRONEOS previos
            const mensajesErrorExistentes = document.querySelector('.mensaje_formulario_error');
            if (mensajesErrorExistentes) {
                mensajesErrorExistentes.remove();
                mensajeErrorVisible = false;
            }

            // Limpiar mensajes de validación ERRONEOS previos
            const mensajesCorrectoExistentes = document.querySelector('.mensaje_formulario_correcto');
            if (mensajesCorrectoExistentes) {
                mensajesCorrectoExistentes.remove();
                mensajeCorrectoVisible = false;
            }

            // Verificar y modificar labels para agregar un asterisco según la validez de los inputs
            verificarYModificarLabel('nombre');
            verificarYModificarLabel('email');
            verificarYModificarLabel('mensaje');
            verificarYModificarLabel('telefono');

            // Validación de los campos del formulario
            if (inputNombre.value === '' || inputEmail.value === '' || inputMensaje.value === '' || inputTelefono.value === '') {
                crearMensajeErrorHTML("Todos los campos son obligatorios.");
                formularioValidado = false;
            } else if (inputMensaje.value.length < 10) {
                crearMensajeErrorHTML("El mensaje debe tener más de 10 caracteres.");
                formularioValidado = false;
            }

            if (formularioValidado) {
                // Procesar el formulario si todos los campos están validados
                console.log('Formulario enviado correctamente');
                crearMensajeConfirmadoHTML();

                // Vaciar los datos del formulario
                formulario.reset();
            }
        });

    }
});