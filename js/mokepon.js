const sectionAtaque = document.getElementById("seleccionar-ataque")
const sectionVolver = document.getElementById("reiniciar")
const botonSeleccionar = document.getElementById("boton-seleccionar") 
const botonJab = document.getElementById("boton-jab")
const botonUppercut = document.getElementById("boton-uppercut")
const botonContraataque = document.getElementById("boton-contraataque")

const spanMascotaJugador = document.getElementById("boxeador-jugador")
const sectiontitle = document.getElementById("titlePrincipal")
const sectionelige = document.getElementById("eligePeleador")
const sectionMascota = document.getElementById("seleccionar-boxeador")
const sectionseleccion = document.getElementById("boton-seleccionar")

const spanMascotaEnemigo = document.getElementById("boxeador-enemigo")

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")

const sectionMensajes = document.getElementById("resultado")
const botonReiniciar = document.getElementById("reiniciar")

let boxeadores = []
let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

class Boxeadores{
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let ippo = new Boxeadores("Ippo", "./photos/ippo.webp", 5 )
let takamura = new Boxeadores("Takamura", "./photos/takamura.webp", 5 )
let miyata = new Boxeadores("Miyata", "./photos/miyata.webp", 5 )

ippo.ataques.push(
    {nombre: "Uppercut", id: "boton-uppercut"},  
    {nombre: "Uppercut", id: "boton-uppercut"},
    {nombre: "Uppercut", id: "boton-uppercut"},  
    {nombre: "Contraataque", id: "boton-contraataque"},
    {nombre: "Jab", id: "boton-jab"},      
)

takamura.ataques.push(
    {nombre: "Uppercut", id: "boton-uppercut"},  
    {nombre: "Uppercut", id: "boton-uppercut"},
    {nombre: "Uppercut", id: "boton-uppercut"},  
    {nombre: "Contraataque", id: "boton-contraataque"},
    {nombre: "Jab", id: "boton-jab"},      
)

miyata.ataques.push(
    {nombre: "Jab", id: "boton-jab"},  
    {nombre: "Jab", id: "boton-jab"},
    {nombre: "Jab", id: "boton-jab"},  
    {nombre: "Uppercut", id: "boton-uppercut"},
    {nombre: "Contraataque", id: "boton-contraataque"},      
)

function iniciarjuego(){
    sectionAtaque.style.display = "none"
    sectionVolver.style.display = "none"
    botonSeleccionar.addEventListener("click",seleccionar)
    botonUppercut.addEventListener("click", ataqueUppercut)
    botonContraataque.addEventListener("click", ataqueContraataque)
    botonJab.addEventListener("click", ataqueJab)
    botonReiniciar.addEventListener("click", reiniciarGame) 
}

function seleccionar(){
    sectiontitle.style.display = "none"
    sectionelige.style.display = "none"
    sectionMascota.style.display = "none"
    sectionseleccion.style.display = "none"
    sectionAtaque.style.display = "flex"

    if (document.getElementById("Ippo").checked){
        spanMascotaJugador.innerHTML = "Ippo"
    }
    else if (document.getElementById("Takamura").checked){      
        spanMascotaJugador.innerHTML = "Takamura"
    }
    else if (document.getElementById("Miyata").checked){        
        spanMascotaJugador.innerHTML = "Miyata"    

    }else{
        alert("No has seleccionado aun")
        reiniciarGame()
    }
    seleccionarEnemigo()
}

function seleccionarEnemigo(){
    let numrandom = aleatorio(1,3)

    if (numrandom == 1) {
        spanMascotaEnemigo.innerHTML = "Ippo"
    } else if(numrandom == 2) {
        spanMascotaEnemigo.innerHTML = "Takamura"
    } else {
        spanMascotaEnemigo.innerHTML = "Miyata"
    }   
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max - min + 1)+ min)
}

function ataqueUppercut(){
    ataqueJugador = "Uppercut"
    ataqueRandomDelEnemigo()
}

function ataqueContraataque(){
    ataqueJugador = "Contraataque"
    ataqueRandomDelEnemigo()
}    

function ataqueJab(){
    ataqueJugador = "Jab"
    ataqueRandomDelEnemigo()
}

function ataqueRandomDelEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)
    
    if (ataqueAleatorio == 1) {
       ataqueEnemigo= "Uppercut"
    } else if(ataqueAleatorio == 2) {
        ataqueEnemigo= "Contraataque"
    } else {
        ataqueEnemigo= "Jab"
    }
    combate()
}

function combate(){
    if(ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE")
    }else if((ataqueJugador=="Uppercut" && ataqueEnemigo == "Contraataque")||(ataqueJugador=="Contraataque" && ataqueEnemigo =="Jab")||(ataqueJugador=="Jab" && ataqueEnemigo=="Uppercut")){
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else{
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador 
    }     
    revisarvidas()
}

function revisarvidas(){
    if(vidasEnemigo == 0){
       crearMensajeFinal("Ganaste, que bendicion ve")
    } else if(vidasJugador == 0){
       crearMensajeFinal("Perdiste, :C") 
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador=document.createElement("h3")
    let nuevoAtaqueDelEnemigo=document.createElement("h3")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    
    botonUppercut.disabled = true
    botonContraataque.disabled = true
    botonJab.disabled = true

    botonReiniciar.style.display = "block"
}

function reiniciarGame(){
    location.reload()
}

window.addEventListener("load", iniciarjuego)