import { vocabulario } from "./vocabulario.js"

const contenedorP = document.getElementById('contenedorP')
const selectorL = document.getElementById('idiomaR') 
const resultado = document.getElementById('resultado')
const campo2Container = document.getElementById('campo2')

// Función para crear las tarjetas
const makeCard = (character, idioma) => {
    const campo2 = document.createElement('div')
    campo2.classList.add

    if (idioma === "es-en") {
        campo2.textContent = ` - ${character.spanish} -> ${character.english} = ${character.example}`
    } else if (idioma === "en-es") {
        campo2.textContent = ` - ${character.english} -> ${character.spanish} = ${character.example}`
    }

    campo2Container.appendChild(campo2)
}

// Función para renderizar las tarjetas según el idioma
const renderCards = (idioma) => {
    campo2Container.innerHTML = '';
    const vocabularioIndex = vocabulario.forEach(palabra => makeCard(palabra, idioma))
    

}

// Función para traducir la palabra ingresada
const traducir = () => {
    const palabra = contenedorP.value.trim()  
    const idiomaSeleccionado = selectorL.value  

    if (palabra === "") {
        resultado.textContent = "Por favor, ingresa una palabra."
        return
    }

    // Buscar la palabra en el vocabulario
    const foundWord = vocabulario.find(item => item.english.toLowerCase() === palabra.toLowerCase() || item.spanish.toLowerCase() === palabra.toLowerCase())

    if (!foundWord) {
        resultado.textContent = "Palabra no encontrada en el vocabulario."
        return
    }

    let translatedword = ""  

    // Realizar la traducción según el idioma seleccionado
    if (idiomaSeleccionado === "en-es") {
        translatedword = foundWord.spanish  // Traducir de inglés a español
        resultado.textContent = `Traducción de "${palabra}" = ${translatedword}`
    } else if (idiomaSeleccionado === "es-en") {
        translatedword = foundWord.english  // Traducir de español a inglés
        resultado.textContent = `Traducción de "${palabra}" = ${translatedword}`
    }
}


// Escuchar el evento de cambio del selector de idioma
selectorL.addEventListener('change', () => {
    const idiomaSeleccionado = selectorL.value  
    renderCards(idiomaSeleccionado)  
})

// Ejecutar el código cuando el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', () => {
    renderCards(selectorL.value)
    document.getElementById('bnt-traducir').addEventListener('click', traducir)  
})
