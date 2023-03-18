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

const sectionVerMap = document.getElementById("ver-mapa")
const mapa = document.getElementById("map")

let jugadorId = null
let enemigoId = null
let boxeadores = []
let boxeadoresEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeBoxeadores 
let inputIppo
let inputTakamura
let inputMiyata
let boxeadorJugador
let boxeadorJugadorObjeto
let ataquesboxeadores
let ataquesBoxeadorEnemigo
let botonJab 
let botonUppercut 
let botonContraataque
let botones = [] 
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0 
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = "./photos/imagenFondo.jpg"
let alturaApropiada
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 800

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}
alturaApropiada = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaApropiada


class Boxeadores{
    constructor(nombre, foto, vidas, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
        this.ataques = []
        this.ancho = 75
        this.alto = 75
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarBoxeador(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let ippo = new Boxeadores("Ippo", "./photos/ippo.webp", 5, "./photos/ippo.webp")
let takamura = new Boxeadores("Takamura", "./photos/takamura.webp", 5, "./photos/takamura.webp")
let miyata = new Boxeadores("Miyata", "./photos/miyata.webp", 5, "./photos/miyata.webp")

const IPPO_ATAQUES = [
    {nombre: "Uppercut", id: "boton-uppercut"},  
    {nombre: "Uppercut", id: "boton-uppercut"},
    {nombre: "Uppercut", id: "boton-uppercut"},  
    {nombre: "Contraataque", id: "boton-contraataque"},
    {nombre: "Jab", id: "boton-jab"},  
]
ippo.ataques.push(...IPPO_ATAQUES)


const TAKAMURA_ATAQUES = [
    {nombre: "Contraataque", id: "boton-contraataque"},  
    {nombre: "Contraataque", id: "boton-contraataque"},
    {nombre: "Contraataque", id: "boton-contraataque"},  
    {nombre: "Uppercut", id: "boton-uppercut"},
    {nombre: "Jab", id: "boton-jab"},   
]
takamura.ataques.push(...TAKAMURA_ATAQUES)


const MIYATA_ATAQUES = [
    {nombre: "Jab", id: "boton-jab"},  
    {nombre: "Jab", id: "boton-jab"},
    {nombre: "Jab", id: "boton-jab"},  
    {nombre: "Uppercut", id: "boton-uppercut"},
    {nombre: "Contraataque", id: "boton-contraataque"},
]
miyata.ataques.push(...MIYATA_ATAQUES)

boxeadores.push(ippo, takamura, miyata)

function iniciarjuego(){

    sectionVerMap.style.display = "none"

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
    
    unirseJuego()
}

function unirseJuego() {
    fetch("http://192.168.0.19:8080/unirse")
        .then(function (res) {
            if(res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionar(){
    

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
        return
    }
    sectiontitle.style.display = "none"
    sectionelige.style.display = "none"
    sectionseleccion.style.display = "none"
    sectionMascota.style.display = "none"

    elegirBoxeador(boxeadorJugador)
    extraerAtaques(boxeadorJugador)
    sectionVerMap.style.display = "flex"
    iniciarMapa()
    
}

function elegirBoxeador(boxeadorJugador){
    fetch(`http://192.168.0.19:8080/mokepon/${jugadorId}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            boxeador : boxeadorJugador
        })
    })
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
                boton.disabled = true    
            } else if(e.target.textContent === "Contraataque"){
                ataqueJugador.push("Contraataque")
                console.log(ataqueJugador)
                boton.style.background = "#112f58" 
                boton.disabled = true  
            } else{
                ataqueJugador.push("Jab")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"  
                boton.disabled = true 
            }
            if(ataqueJugador.length === 5){
                enviarAtaques()    
            }
        })
    })
}

function enviarAtaques(){
    fetch(`http://192.168.0.19:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.0.19:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res){
            if(res.ok){
                res.json()
                    .then(function( {ataques} ){
                        if(ataques.length === 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })    
            }
        })
}

function seleccionarEnemigo(){
    let numrandom = aleatorio(0,boxeadores.length-1)

    spanMascotaEnemigo.innerHTML = boxeadores[numrandom].nombre
    ataquesBoxeadorEnemigo = boxeadores[numrandom].ataques
    secuenciaAtaque()
}

function ataqueRandomDelEnemigo(){
    console.log("Ataques del enemigo ", ataquesBoxeadorEnemigo);
    let ataqueAleatorio = aleatorio(0,ataquesBoxeadorEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
       ataqueEnemigo.push("Uppercut")
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("Contraataque")
    } else {
        ataqueEnemigo.push("Jab")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate()
    }    
}

function indexAmbosEnemigos(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosEnemigos(index, index)
            crearMensaje("EMPATE")
        } else if(ataqueJugador[index] === "Uppercut" && ataqueEnemigo[index] == "Contraataque" || 
            ataqueJugador[index] === "Contraataque" && ataqueEnemigo[index] === "Jab" || 
            ataqueJugador[index] === "Jab" && ataqueEnemigo[index] === "Uppercut"){
            indexAmbosEnemigos(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else{
            indexAmbosEnemigos(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }   
    }  
    revisarvictorias()
}

function revisarvictorias(){
    if(victoriasJugador === victoriasEnemigo){
       crearMensajeFinal("Tremendo Empate xde")
    } else if(victoriasJugador > victoriasEnemigo){
       crearMensajeFinal("Ganamosss :)") 
    } else {
        crearMensajeFinal("Perdiste :C ")
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador=document.createElement("h3")
    let nuevoAtaqueDelEnemigo=document.createElement("h3")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    botonReiniciar.style.display = "block"
}

function reiniciarGame(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max - min + 1)+ min)
}

function pintarCanvas(){
    boxeadorJugadorObjeto.x = boxeadorJugadorObjeto.x + boxeadorJugadorObjeto.velocidadX
    boxeadorJugadorObjeto.y = boxeadorJugadorObjeto.y + boxeadorJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    boxeadorJugadorObjeto.pintarBoxeador()
    
    enviarPosicion(boxeadorJugadorObjeto.x, boxeadorJugadorObjeto.y)

    boxeadoresEnemigos.forEach(function (boxeador) {
        if(boxeador != undefined){
            boxeador.pintarBoxeador()
            revisarColision(boxeador)  
        }
          
    })    
}

function enviarPosicion(x, y){
    fetch(`http://192.168.0.19:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({ enemigos }){
                    console.log(enemigos)
                    boxeadoresEnemigos = enemigos.map(function (enemigo){
                        if(enemigo.boxeador != undefined){
                            let boxeadorEnemigo = null
                            const boxeadorNombre = enemigo.boxeador.nombre || ""
                            if(boxeadorNombre === "Ippo"){
                                boxeadorEnemigo = new Boxeadores("Ippo", "./photos/ippo.webp", 5, "./photos/ippo.webp", enemigo.id)
                            }else if(boxeadorNombre === "Takamura"){
                                boxeadorEnemigo = new Boxeadores("Takamura", "./photos/takamura.webp", 5, "./photos/takamura.webp", enemigo.id)
                            }else if(boxeadorNombre === "Miyata"){
                                boxeadorEnemigo = new Boxeadores("Miyata", "./photos/miyata.webp", 5, "./photos/miyata.webp", enemigo.id)
                            }
                            boxeadorEnemigo.x = enemigo.x
                            boxeadorEnemigo.y = enemigo.y
                            return boxeadorEnemigo
                        }
                    })
                })
        }
    })
}

function moverDerecha(){
    boxeadorJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    boxeadorJugadorObjeto.velocidadX = -5
}

function moverArriba(){
    boxeadorJugadorObjeto.velocidadY = -5
}

function moverAbajo(){
    boxeadorJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){
    boxeadorJugadorObjeto.velocidadX = 0
    boxeadorJugadorObjeto.velocidadY = 0
    botonArriba.style.background = "white"
    botonAbajo.style.background = "white"
    botonIzquierda.style.background = "white"
    botonDerecha.style.background = "white"  
    
}

function sePresionoTecla(event){
    switch (event.key) {
        case"ArrowUp":
        case"w":
            moverArriba()
            botonArriba.style.background = "#FCE22A"            
            break
        case"ArrowDown":
        case"s":
            moverAbajo()
            botonAbajo.style.background = "#FCE22A"             
            break            
        case"ArrowLeft":
        case"a":
            moverIzquierda()
            botonIzquierda.style.background = "#FCE22A"             
            break 
        case"ArrowRight":
        case"d":
            moverDerecha()
            botonDerecha.style.background = "#FCE22A"            
            break        
        default:
            break;
    }
}

function iniciarMapa() {
    
    boxeadorJugadorObjeto = obtenerObjetoBoxeador(boxeadorJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoTecla)
    window.addEventListener("keyup", detenerMovimiento)
    
}

function obtenerObjetoBoxeador(){
    for (let i = 0; i < boxeadores.length; i++) {
        if (boxeadorJugador === boxeadores[i].nombre) {
            return boxeadores[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaBoxeador = boxeadorJugadorObjeto.y
    const abajoBoxeador = boxeadorJugadorObjeto.y + boxeadorJugadorObjeto.alto
    const derechaBoxeador = boxeadorJugadorObjeto.x + boxeadorJugadorObjeto.ancho
    const izquierdaBoxeador = boxeadorJugadorObjeto.x 

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 
    if(
        abajoBoxeador < arribaEnemigo ||
        arribaBoxeador > abajoEnemigo ||
        derechaBoxeador < izquierdaEnemigo ||
        izquierdaBoxeador > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("se detecto una colision");

    enemigoId = enemigo.id
    sectionAtaque.style.display = "flex"
    sectionVerMap.style.display = "none"
    seleccionarEnemigo(enemigo)
       
}

window.addEventListener("load", iniciarjuego)