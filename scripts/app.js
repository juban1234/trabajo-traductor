import { vocabulario as initialVocabulario } from "./vocabulario.js"

//elementos traidos del html
const contenedorP = document.getElementById('contenedorP')
const selectorL = document.getElementById('idiomaR')
const categoria = document.getElementById('categoria')
const resultado = document.getElementById('resultado')
const campo2Container = document.getElementById('campo2')



// Función para crear las tarjetas
const makeCard = (character, idioma) => {
    const campo2 = document.createElement('div')
    campo2.id = 'campo2'

    if (idioma === "es-en") {
        campo2.textContent = ` - ${character.spanish} -> ${character.english} = ${character.example}`
    } else if (idioma === "en-es") {
        campo2.textContent = ` - ${character.english} => ${character.spanish} = ${character.example}`
    }

    campo2Container.appendChild(campo2)
}

// Función para cargar vocabulario desde localStorage
const cargarVocabularioDesdeLocalStorage = () => {
    try {
        const vocabularioGuardado = localStorage.getItem('vocabulario')
        return vocabularioGuardado ? JSON.parse(vocabularioGuardado) : { categorias: {} }
    } catch (error) {
        console.error('Error al cargar vocabulario:', error)
        return { categorias: {} }
    }
}

let vocabulario = cargarVocabularioDesdeLocalStorage()

// Función para renderizar las tarjetas según el idioma
const renderCards = (idioma) => {
    campo2Container.innerHTML = ''  // Limpiar el contenedor antes de renderizar
    if (vocabulario && vocabulario.categorias) {
        Object.values(vocabulario.categorias).forEach(categoria => {
            categoria.forEach(palabra => makeCard(palabra, idioma))
        })
    }
}

// Función para verificar si el vocabulario está en localStorage
const verificarYGuardarVocabulario= ()=> {
    const vocabularioGuardado = localStorage.getItem('vocabulario')
    if (!vocabularioGuardado) {
        // Si no hay vocabulario guardado, guardamos el vocabulario inicial
        localStorage.setItem('vocabulario', JSON.stringify(initialVocabulario))
    }
}


// Inicializamos el vocabulario y lo guardamos si no existe
verificarYGuardarVocabulario()
 

// Función para renderizar las tarjetas de una categoría específica
const renderCardsCategoria = (categoriaSeleccionada, idioma) => {
    campo2Container.innerHTML = ''  // Limpiar el contenedor antes de renderizar
    if (vocabulario && vocabulario.categorias) {
        const categoriaPalabras = vocabulario.categorias[categoriaSeleccionada]
        if (categoriaPalabras) {
            categoriaPalabras.forEach(palabra => makeCard(palabra, idioma))
        }
    }
}

// Función para traducir la palabra ingresada
const traducir = () => {
    const palabra = contenedorP.value.trim().toLowerCase()
    const idiomaSeleccionado = selectorL.value

    if (palabra === "") {
        resultado.textContent = "Por favor, ingresa una palabra."
        return
    }

    const foundWord = Object.values(vocabulario.categorias).flat().find(item => 
        item.english.toLowerCase() === palabra || 
        item.spanish.toLowerCase() === palabra
    )

    if (!foundWord) {
        resultado.textContent = "Palabra no encontrada en el vocabulario."
        return
    }

    let translatedword = ""

    if (idiomaSeleccionado === "en-es") {
        translatedword = foundWord.spanish
        resultado.textContent = `Traducción de "${palabra}" = ${translatedword}`
    } else if (idiomaSeleccionado === "es-en") {
        translatedword = foundWord.english
        resultado.textContent = `Traducción de "${palabra}" = ${translatedword}`
    }
}

const orderAsend = () => {
    const selectorASC = document.getElementById('asendente1').value

    if (selectorASC === "A-Z") {
        renderCardsASC(selectorL.value, true) // Ascendente
    } else if (selectorASC === "Z-A") {
        renderCardsASC(selectorL.value, false) // Descendente
    }
}

const renderCardsASC = (idioma) => {
    campo2Container.innerHTML = '' // Limpiamos el contenedor

    // Obtener la categoría seleccionada
    const categoriaSeleccionada = categoria.value

    // Obtener las palabras de la categoría seleccionada o de todas
    let palabras = []
    if (categoriaSeleccionada === "todos") {
        // Recolectamos todas las palabras de todas las categorías
        Object.values(vocabulario.categorias).forEach(cat => {
            palabras.push(...cat)
        })
    } else {
        // Solo las palabras de la categoría seleccionada
        palabras = vocabulario.categorias[categoriaSeleccionada] || []
    }

    // Ordenamos las palabras
    const filtroASC = palabras.sort((a, b) => {
        if (idioma === "es-en") {
            return a.spanish.localeCompare(b.spanish) 
        } else {
            return a.english.localeCompare(b.english) 
        }
    })

    // Renderizamos las tarjetas ordenadas
    filtroASC.forEach(palabra => makeCard(palabra, idioma))
}



// Función para agregar la nueva palabra al vocabulario
const addWordToVocabulario = (english, spanish, example, category)=> {
    const palabrasExistentes = vocabulario.categorias[category] || []
    const existePalabra = palabrasExistentes.some(
        palabra => palabra.english.toLowerCase() === english.toLowerCase()
    )
    if (existePalabra) {
        alert('Esta palabra ya existe en la categoría.')
        return
    }

    const newWord = {
        id: generateNewId(),
        english,
        spanish,
        example,
    }
    if (vocabulario.categorias[category]) {
        vocabulario.categorias[category].push(newWord)
    } else {
        vocabulario.categorias[category] = [newWord]
    }

    localStorage.setItem('vocabulario', JSON.stringify(vocabulario))
    renderCards(selectorL.value)
    
    
}


// Generar un nuevo ID único para las palabras
const generateNewId = () => {
    return Math.floor(Math.random() * 1000000)
}

// Evento para manejar el formulario de añadir palabra
document.getElementById("addWordForm").addEventListener("submit", function(event) {
    event.preventDefault()

    // Obtenemos los valores del formulario
    const englishWord = document.getElementById("englishWord").value.trim()
    const spanishWord = document.getElementById("spanishWord").value.trim()
    const example = document.getElementById("example").value.trim()
    const category = document.getElementById("categorySelect").value

    // Validamos que los campos no estén vacíos
    if (englishWord && spanishWord && example) {
        // Añadimos la nueva palabra
        addWordToVocabulario(englishWord, spanishWord, example, category)
        
        // Limpiar el formulario después de añadir la palabra
        document.getElementById("addWordForm").reset()
    } else {
        alert("Por favor, completa todos los campos.")
    }
})

// Escuchar el evento de cambio del selector de idioma
selectorL.addEventListener('change', () => {
    const idiomaSeleccionado = selectorL.value
    renderCards(idiomaSeleccionado)
})

// Escuchar el evento de cambio de categoría
categoria.addEventListener('change', () => {
    const categoriaSeleccionada = categoria.value
    if (categoriaSeleccionada === "todos") {
        renderCards(selectorL.value)
    } else {
        renderCardsCategoria(categoriaSeleccionada, selectorL.value)
    }
})

console.log(vocabulario)

// Ejecutar el código cuando el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', () => {
    renderCards(selectorL.value)  // Renderizamos las tarjetas con el vocabulario actual
    document.getElementById('bnt-traducir').addEventListener('click', traducir)
    document.getElementById('asendente1').addEventListener('change', orderAsend)
})
