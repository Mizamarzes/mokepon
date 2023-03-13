const sectionAtaque = document.getElementById("seleccionar-ataque")
const sectionVolver = document.getElementById("reiniciar")
const botonSeleccionar = document.getElementById("boton-seleccionar") 

const spanMascotaJugador = document.getElementById("boxeador-jugador")
const sectiontitle = document.getElementById("titlePrincipal")
const sectionelige = document.getElementById("eligePeleador")
const sectionMascota = document.getElementById("seleccionarBoxeador")
const sectionseleccion = document.getElementById("boton-seleccionar")

const spanMascotaEnemigo = document.getElementById("boxeador-enemigo")

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")

const sectionMensajes = document.getElementById("resultado")
const botonReiniciar = document.getElementById("reiniciar")

const contenedorTarjetas = document.getElementById("seleccionarBoxeador")
const contenedorAtaques = document.getElementById("contenedorAtaques")

let boxeadores = []
let ataqueJugador = []
let ataqueEnemigo
let opcionDeBoxeadores 
let inputIppo
let inputTakamura
let inputMiyata
let boxeadorJugador
let ataquesboxeadores
let botonJab 
let botonUppercut 
let botonContraataque
let botones = [] 
let vidasJugador = 3
let vidasEnemigo = 3

class Boxeadores{
    constructor(nombre, foto, vidas){
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
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
    {nombre: "Contraataque", id: "boton-contraataque"},  
    {nombre: "Contraataque", id: "boton-contraataque"},
    {nombre: "Contraataque", id: "boton-contraataque"},  
    {nombre: "Uppercut", id: "boton-uppercut"},
    {nombre: "Jab", id: "boton-jab"},      
)

miyata.ataques.push(
    {nombre: "Jab", id: "boton-jab"},  
    {nombre: "Jab", id: "boton-jab"},
    {nombre: "Jab", id: "boton-jab"},  
    {nombre: "Uppercut", id: "boton-uppercut"},
    {nombre: "Contraataque", id: "boton-contraataque"},      
)

boxeadores.push(ippo,takamura,miyata)

function iniciarjuego(){

    boxeadores.forEach((boxeador) =>{
       opcionDeBoxeadores = `
       <div>  
       <img src =${boxeador.foto} alt =${boxeador.nombre} width="320">       
       <input type="radio" name="boxeador" id=${boxeador.nombre} />
       <label class= "item" for=${boxeador.nombre}>${boxeador.nombre}</label>
       </div>
       `
    seleccionarBoxeador.innerHTML += opcionDeBoxeadores

        inputIppo = document.getElementById("Ippo")
        inputTakamura = document.getElementById("Takamura")
        inputMiyata = document.getElementById("Miyata")
   

    })

    sectionAtaque.style.display = "none"
    sectionVolver.style.display = "none"
    botonSeleccionar.addEventListener("click",seleccionar)
    botonReiniciar.addEventListener("click", reiniciarGame) 
    
}

function seleccionar(){
    sectiontitle.style.display = "none"
    sectionelige.style.display = "none"
    sectionMascota.style.display = "none"
    sectionseleccion.style.display = "none"
    sectionAtaque.style.display = "flex"

    if (inputIppo.checked){
        spanMascotaJugador.innerHTML = inputIppo.id
        boxeadorJugador = inputIppo.id
    }
    else if (inputTakamura.checked){      
        spanMascotaJugador.innerHTML = inputTakamura.id
        boxeadorJugador = inputTakamura.id
    }
    else if (inputMiyata.checked){        
        spanMascotaJugador.innerHTML = inputMiyata.id   
        boxeadorJugador = inputMiyata.id 

    }else{
        alert("No has seleccionado aun")
        reiniciarGame()
    }
    extraerAtaques(boxeadorJugador)
    seleccionarEnemigo()
}

function extraerAtaques(boxeadorJugador){
    let ataques
    for (let i = 0; i < boxeadores.length; i++) {
        if (boxeadorJugador === boxeadores[i].nombre) {
            ataques = boxeadores[i].ataques
        }
       
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        ataquesboxeadores = `
        <button id= ${ataque.id} class = "botonAtaqueDiseño BAtaque" >${ataque.nombre}</button>    
        `
        contenedorAtaques.innerHTML += ataquesboxeadores 
    })
    botonUppercut = document.getElementById("boton-uppercut")
    botonContraataque = document.getElementById("boton-contraataque")
    botonJab = document.getElementById("boton-jab")
    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque(){
    botones.forEach((boton) =>{
        boton.addEventListener("click", (e) =>{
            if (e.target.textContent === "Uppercut") {
                ataqueJugador.push("Uppercut")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"    
            } else if(e.target.textContent === "Contraataque"){
                ataqueJugador.push("Contraataque")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"  
            } else{
                ataqueJugador.push("Jab")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"  
            }
        })
    })
}

function seleccionarEnemigo(){
    let numrandom = aleatorio(0,boxeadores.length-1)

    spanMascotaEnemigo.innerHTML = boxeadores[numrandom].nombre
    secuenciaAtaque()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max - min + 1)+ min)
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