//Variables
const btnEnviar = document.querySelector('#enviar');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const form = document.querySelector('#enviar-mail');


eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
}

//Funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function validarFormulario(e){

    //console.log(e.target.type);

    if (e.target.value.length > 0) {
        e.target.classList.remove('border', 'border-red-500');
    }else{
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {
        const resultado = e.target.value.indexOf('@');
        if (resultado < 0) {
            mostrarError('El email no es valido');
        }
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'text-center', 'mt-4', 'error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {       
        form.appendChild(mensajeError);
    }

}

function validarEmail(){

}