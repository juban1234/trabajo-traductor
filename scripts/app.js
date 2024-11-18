import { vocabulario } from "./vocabulario.js";


//targetas
const  makeCard=(character)=>{

    const campo2 = document.createElement('div')
    campo2.id = 'campo2'
    campo2.textContent = ` - ${character.english} = ${character.spanish} `
    
    document.getElementById('campo2').appendChild(campo2)
}

// iniciar script
const render = () =>{
    vocabulario.forEach(palabras => makeCard(palabras))
}

// buscar palabras
const traducir = ()=>{
    const contenedorP = document.getElementById('contenedorP').value.trim()
    const selectorL = document.getElementById('idiomaR').value
    const resultado = document.getElementById('resultado')

    if (contenedorP === "") {
        resultado.textContent = "Por favor, ingresa una palabra.";
        return;
    }

    let translatedword = ""

    const foundWord = vocabulario.find(item => item.english.toLowerCase() === contenedorP.toLowerCase() || item.spanish.toLowerCase() === contenedorP.toLowerCase())


    if (!foundWord) {
        resultado.textContent = "Palabra no encontrada en el vocabulario."
        return
}

if (selectorL === "en-es") {
    selectorL = foundWord.spanish;
    resultado.textContent = `Traducción de "${contenedorP}" (Inglés a Español): ${translatedword}`;
  } else if (selectorL === "es-en") {
    translatedword = foundWord.english;
    resultado.textContent = `Traducción de "${contenedorP}" (Español a Inglés): ${translatedword}`;
  }
}



// crea todo el escript
window.addEventListener('DOMContentLoaded',async () =>{
    render()
    document.getElementById('bnt-traducir').addEventListener('click', traducir);
} )