const VERIFICAR = document.querySelector('#verificar')
var character_img = document.querySelector('#character_img')
const API = 'https://rickandmortyapi.com/api/character/'

class juego {
    constructor() {
        this.incializar()
        this.generarSecuencia()
    }

     fetchData (url_api)  {
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

    incializar() {
        this.nivel = 1
        this.subnivel = 0
        this.mostrarImagen()
    }

    generarSecuencia() {
        this.secuencia = new Array(10).fill(0).map(n => Math.floor((Math.random() * 617) + 1))
        console.log(this.secuencia)
        this.image_url = new URL(API + this.secuencia[0])
        console.log(this.image_url)  //Esta variable será la encargada de almacenar las url de cada personaje
    }

    async mostrarImagen() {
        try {
          // El problema ocurre cuando le paso this.image_url como parametro a fetchData
            var data = await this.fetchData(y.href)
            var img_src = data.image
            character_img.src = img_src
        } catch (error) {
            console.error(error)
        }
    }
}

var x = new Array(10).fill(0).map(n => Math.floor((Math.random() * 617) + 1))
var y = new URL(API + x[0])

function start () {
    window.juego = new juego()
}

window.onload = start
