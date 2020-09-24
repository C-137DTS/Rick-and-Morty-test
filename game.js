var character_img = document.querySelector('#character_img')
const API = 'https://rickandmortyapi.com/api/character/'
const btn_verificar = document.querySelector('#verificar')
const respuesta = document.querySelector('#respuesta')
const ULTIMO_NIVEL = 5
const LEVEL = document.querySelector('.header__level--actual')

var secuencia = new Array(10).fill(0).map(n => Math.floor((Math.random() * 617) + 1))
var nivel = 1
var subnivel = 0

function fetchData (url_api)  {
   return new Promise((resolve, reject) => {
       const xhttp = new XMLHttpRequest()
       xhttp.open('GET', url_api, true)
       xhttp.onreadystatechange = event => {
           if(xhttp.readyState === 4) {
               (xhttp.status === 200)
                   ? resolve(JSON.parse(xhttp.responseText))
                   : reject(new Error('Error: ', url_api))
           }
       }
       xhttp.send()
   })
}

async function obtenerImagen (personaje) {
  var data = await fetchData(API + secuencia[personaje])
  var img_url = data.image
  return img_url
}

async function obtenerNombrePersonaje(personaje) {
  var data = await fetchData(API + secuencia[personaje])
  var character_name = data.name
  return character_name
}


//
class juego {
     constructor() {
       this.inicializar = this.inicializar.bind(this)
       this.verificar = this.verificar.bind(this)
       this.inicializar()
    }

    inicializar() {
        this.mostrarImagen()
        btn_verificar.addEventListener("click", this.verificar)
        LEVEL.innerHTML = nivel
    }

    async mostrarImagen() {
      try {
        this.img_src = await obtenerImagen(subnivel)
        character_img.src = this.img_src
      } catch (error) {
        console.error(error);
      }
    }

    async verificar() {
      try {
        this.character_name = await obtenerNombrePersonaje(subnivel)

        if (this.character_name === respuesta.value || this.character_name.toLowerCase() === respuesta.value) {
          if (nivel < ULTIMO_NIVEL){
            nivel ++
            subnivel ++
            respuesta.value = ''
            this.nivelCompletado()
            this.inicializar()
          } else {
            this.ganoElJuego()
          }
        } else {
          this.perdiste()
        }
      } catch (error) {
        console.error(error)
      }
    }

    playAgain() {
      location.reload()
    }

    nivelCompletado() {
      swal('Enhorabuena', `Felicitaciones, has completado el nivel ${subnivel}`, 'success')
    }

    ganoElJuego() {
      swal('Haz completado el juego', 'Eres todo un experto de Rick and Morty!', 'success')
        .then(this.playAgain)
    }

    perdiste() {
      swal(':(', `Haz perdido el nombre del personaje es ${this.character_name}`, 'error')
      .then(this.playAgain)
    }
}


function start () {
    window.juego = new juego()
}

function mensaje () {
  alert('Estoy funcionando')
}

window.onload = start
