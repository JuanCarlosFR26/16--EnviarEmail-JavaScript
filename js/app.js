// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// er = expresión regular
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListener();
function eventListener() {
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarformulario);
    asunto.addEventListener('blur', validarformulario);
    mensaje.addEventListener('blur', validarformulario);

    // Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);


    // Enviar email
    formulario.addEventListener('submit', enviarEmail);
}


// Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarformulario(e) {
    
    if(e.target.value.length > 0) {

        // Elimina los errores
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }
        

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {

        if(er.test(e.target.value)) {
        // Elimina los errores
        const error = document.querySelector('p.error');
        if(error) {
            error.remove();
        }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }

    }


    if( er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');

    } 
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    } 

    
}


// Envia el email
function enviarEmail(e) {
    e.preventDefault();

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    // Después de 3 segundos ocultar spinner y mostrar mensaje
    setTimeout( ()=> {
        spinner.style.display = 'none';

        const mensajeEnviado = document.createElement('p');
        mensajeEnviado.textContent = 'Mensaje enviado correctamente';
        mensajeEnviado.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'font-bold', 'uppercase', 'my-10');
        formulario.insertBefore(mensajeEnviado, spinner);


        // Eliminar mensaje de éxito
        setTimeout( () => {
            mensajeEnviado.remove();

            resetearFormulario();
        }, 5000);
    }, 3000);
}


// Vaciar formulario

function resetearFormulario(e) {
    e.preventDefault();
    formulario.reset();

    iniciarApp();
}
