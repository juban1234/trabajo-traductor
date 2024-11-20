import { vocabulario } from "./vocabulario.js"

const contenedorP = document.getElementById('contenedorP')
const selectorL = document.getElementById('idiomaR')
const resultado = document.getElementById('resultado')
const campo2Container = document.getElementById('campo2')
const asendente1 = document.getElementById('asendente1')


// Función para crear las tarjetas
const makeCard = (character, idioma) => {
    const campo2 = document.createElement('div')
    campo2.id = 'campo2'

    // Crear contenido según el idioma seleccionado
    if (idioma === "es-en") {
        campo2.textContent = ` - ${character.spanish} -> ${character.english} = ${character.example}`
    } else if (idioma === "en-es") {
        campo2.textContent = ` - ${character.english} -> ${character.spanish} = ${character.example}`
    }

    campo2Container.appendChild(campo2)
}

// Función para renderizar las tarjetas según el idioma y filtro
const renderCardsASC = (idioma) => {
    campo2Container.innerHTML = ''
    const filtroASC = [...vocabulario].sort((a,b)=>{
        if (idioma === "es-en") {
            return a.spanish.localeCompare(b.spanish)
        }else{
            return a.english.localeCompare(b.english)
        }
    })

    filtroASC.forEach(palabra => makeCard(palabra, idioma))
}

const renderCards = (idioma) =>{
    campo2Container.innerHTML = ''
    vocabulario.forEach(palabra => makeCard(palabra, idioma))
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
    const foundWord = vocabulario.find(item => 
        item.english.toLowerCase() === palabra.toLowerCase() || 
        item.spanish.toLowerCase() === palabra.toLowerCase()
    )

    if (!foundWord) {
        resultado.textContent = "Palabra no encontrada en el vocabulario."
        return
    }

    let translatedword = ""

    // Realizar la traducción según el idioma seleccionado
    if (idiomaSeleccionado === "en-es") {
        translatedword = foundWord.spanish
        resultado.textContent = `Traducción de "${palabra}" = ${translatedword}`
    } else if (idiomaSeleccionado === "es-en") {
        translatedword = foundWord.english
        resultado.textContent = `Traducción de "${palabra}" = ${translatedword}`
    }
}

const orderAsend = () =>{
    const selectorASC = asendente1.value
    switch (selectorASC) {
        case "A-Z":
            renderCardsASC(selectorL.value);
            break;
        case "no filtrar":
            renderCards(selectorL.value)
            break;
        
        default:
            break;
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
    asendente1.addEventListener('click', orderAsend)
    document.getElementById('bnt-traducir').addEventListener('click', traducir)
})
