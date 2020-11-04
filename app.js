const retrievePokemon = async () => {
    const name = document.getElementById('pokemon-name').value.toLowerCase().trim('');
    console.time('callPokemon');
    let rawData = {};

    if (name) {
        try {
            rawData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            console.log(rawData.data);
            displayImage(rawData.data.sprites.front_default);
        } catch (error) {
            console.error(error)
            showError()
            console.error(error)
        }
    }

}
const showError = () => {
    let imgElement = document.getElementById("img")
    imgElement.style.display="none";
    document.getElementById("msj").innerText = "Este pokemon no existe o no esta registrado en la pokedex"
    setTimeout(() => {
       document.getElementById("msj").innerText = " " 
    }, 4000);
}

const displayImage = url => {
    // crear nodo tipo img
    const imgElement = document.createElement('img');
    // agregar atributos
    imgElement.setAttribute('src', url);
    imgElement.setAttribute('width', '200');
    imgElement.setAttribute('height', '200');
    // obtener elemento del DOM
    const divImg= document.getElementById('img-pokemon');
    // agregar el nodo imagen a el div
    divImg.appendChild(imgElement);
}

window.onload = () => {
    document.getElementById('get-pokemons').addEventListener('click', retrievePokemon);
    document.getElementById('pokemon-name').addEventListener('keyup', e=>{
        if (e.keyCode === 13){
            retrievePokemon()
        }
    });
}
