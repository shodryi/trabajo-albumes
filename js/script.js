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