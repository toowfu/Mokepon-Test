const sectionReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonPlanta = document.getElementById('boton-planta')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const inputHipongu = document.getElementById('Hipongu') 
const inputCapipepas = document.getElementById('Capipepas')
const inputEripyro = document.getElementById('Eripyro')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')  

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')

let mokepones = []
let ataqueJugador
let ataqueEnemigo 
let opcionDeMokepones
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let Hipongu = new Mokepon('Hipongu', './assets/hipongu.png', 5)

let Capipepas = new Mokepon('Capipepas', './assets/capipepas.png', 5)

let Eripyro = new Mokepon('Eripyro', './assets/eripyro.png', 5)

Hipongu.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌸', id: 'boton-planta'},
    { nombre: '🔥', id: 'boton-fuego'},
)

Capipepas.ataques.push(
    { nombre: '🌸', id: 'boton-planta'},
    { nombre: '🌸', id: 'boton-planta'},
    { nombre: '🌸', id: 'boton-planta'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
)
Eripyro.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌸', id: 'boton-planta'},
    { nombre: '💧', id: 'boton-agua'},
)

mokepones.push(Hipongu, Capipepas, Eripyro)

function iniciarJuego() {
    sectionReiniciar.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
       opcionDeMokepones = `
       <input type="radio" name="mascota" id=${mokepon.nombre}/>      
                    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                        <p>${mokepon.nombre}</p>
                        <img src=${mokepon.foto} alt=${mokepon.nombre}>
                    </label>
       `
        contenedorTarjetas.innerHTML += opcionDeMokepones

    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonPlanta.addEventListener('click', ataquePlanta)
    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', ReiniciarJuego)
}


function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
         sectionSeleccionarAtaque.style.display = 'flex'
        if(inputHipongu.checked) {
            spanMascotaJugador.innerHTML = 'Hipongu '
        } else if (inputCapipepas.checked) {
            spanMascotaJugador.innerHTML = 'Capipepas '
        }else if(inputEripyro.checked) {
            spanMascotaJugador.innerHTML = 'Eripyro '
        }else {
            alert('Selecciona a un Mokepon!')
        }
            seleccionarMascotaEnemigo()
        }
        
        function seleccionarMascotaEnemigo() {
            let mascotaAleatoria = aleatorio(1,3)
            if (mascotaAleatoria == 1) {
                spanMascotaEnemigo.innerHTML = 'Hipongu'
            } else if (mascotaAleatoria == 2) {
                spanMascotaEnemigo.innerHTML = 'Capipepas'
            } else {
                spanMascotaEnemigo.innerHTML = 'Eripyro'
            }
        }

        function ataqueFuego(){
            ataqueJugador = 'FUEGO'
            ataqueAleatorioEnemigo()
        }
        function ataqueAgua(){
            ataqueJugador = 'AGUA'
            ataqueAleatorioEnemigo() 
        }
        function ataquePlanta(){
            ataqueJugador = 'PLANTA'
            ataqueAleatorioEnemigo() 
        }

        function ataqueAleatorioEnemigo() {
            let ataqueAleatorio = aleatorio(1,3)

            if (ataqueAleatorio ==1) {
                ataqueEnemigo = 'FUEGO'
            } else if (ataqueAleatorio == 2) {
                ataqueEnemigo = 'AGUA'
             } else {
                ataqueEnemigo = 'PLANTA'
             }

            combate()

            }
function combate() {
     if (ataqueEnemigo == ataqueJugador) {
        crearMensaje('EMPATE 🤠')
    } else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'PLANTA') {
        crearMensaje('GANASTE 🔥')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje('GANASTE 💦')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'PLANTA' && ataqueEnemigo == 'AGUA') {
        crearMensaje('GANASTE 🌸')  
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje('PERDISTE CONTRA UN WEA 💀')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()

} 

function revisarVidas(){
    if (vidasEnemigo == 0) {
        crearMensajeFinal('GANASTE LA BATALLA MAESTRO 🤠')
    }else if (vidasJugador == 0) {
        crearMensajeFinal('HAS PERDIDO LA BATALLA, PERO NO LA GUERRA 🎃')
    
}

}
function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonPlanta.disabled = true
    sectionReiniciar.style.display = 'block'

}
 
function ReiniciarJuego(){
    location.reload()
}
        

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)