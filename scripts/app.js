import { vocabulario } from "./vocabulario.js"

const contenedorP = document.getElementById('contenedorP').value.trim()  // Obtener la palabra escrita
const selectorL = document.getElementById('idiomaR').value  // Obtener el idioma seleccionado
const resultado = document.getElementById('resultado') 


// Función para crear las tarjetas
const makeCard = (character) => {
    const campo2 = document.createElement('div')
    campo2.id = 'campo2'  // Agregamos una clase para estilizar las tarjetas
    if (selectorL == "en-es") {
        campo2.textContent = ` - ${character.english} -> ${character.spanish} = ${character.example} `
    } else if (selectorL == "es-en") {
        campo2.textContent = ` - ${character.spanish} -> ${character.english} = ${character.example} `
    }else{
        alert("no existe ")
    }

    document.getElementById('campo2').appendChild(campo2)
}

// Función para renderizar las tarjetas al cargar la página
const render = () => {
    vocabulario.forEach(palabras => makeCard(palabras))
}

// Función para traducir la palabra ingresada
const traducir = () => {


    if (contenedorP === "") {
        resultado.textContent = "Por favor, ingresa una palabra."
        return
    }

    // Buscar la palabra en el vocabulario (puede estar en inglés o español)
    const foundWord = vocabulario.find(item => item.english.toLowerCase() === contenedorP.toLowerCase() || item.spanish.toLowerCase() === contenedorP.toLowerCase())

    if (!foundWord) {
        resultado.textContent = "Palabra no encontrada en el vocabulario."
        return
    }

    let translatedword = ""  // Variable para almacenar la traducción

        // Realizar la traducción según el idioma seleccionado
        if (selectorL === "en-es") {
            translatedword = foundWord.spanish  // Traducir de inglés a español
            resultado.textContent = `Traducción de "${contenedorP}" = ${translatedword}`
        } else if (selectorL === "es-en") {
            translatedword = foundWord.english  // Traducir de español a inglés
            resultado.textContent = `Traducción de "${contenedorP}" =  ${translatedword}`
        }

}

// Ejecutar el código cuando el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', render() , document.getElementById('bnt-traducir').addEventListener('click', traducir) )
