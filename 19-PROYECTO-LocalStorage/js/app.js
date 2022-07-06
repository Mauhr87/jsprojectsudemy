//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
// const eliminarTweets = document.querySelector('.borrar-tweet');
let tweets = [];


//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando usuario agrega tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando documento esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHtml();
    });
}

//Funciones

function agregarTweet(e){
    e.preventDefault();
    // console.log('agregando tweet')

    const tweet = document.querySelector('#tweet').value;
    // console.log(tweet);

    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }

    tweets = [...tweets, tweetObj];
    // console.log(tweets);

    crearHtml();

    formulario.reset();

}

//Mostrar error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

function crearHtml(){
    limpiarHml();
    if (tweets.length > 0) {
        tweets.forEach ( tweet => {

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

function limpiarHml(){
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHtml();
}