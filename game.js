var character_img = document.querySelector('#character_img')
const API = 'https://rickandmortyapi.com/api/character/'
const btn_verificar = document.querySelector('#verificar')
const respuesta = document.querySelector('#respuesta')

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
        console.log(this)

        if (this.character_name === respuesta.value || this.character_name.toLowerCase() === respuesta.value) {
          console.log(`Felicidades haz completado el nivel ${nivel}`);
          nivel ++
          subnivel ++
          respuesta.value = ''
          this.inicializar()
        } else {
          console.log(`Lo siento Haz perdido. El nombre del personaje es ${this.character_name}`)
        }
      } catch (error) {
        console.error(error);
      }
    }
}


function start () {
    window.juego = new juego()
}

function mensaje () {
  alert('Estoy funcionando')
}

window.onload = start
