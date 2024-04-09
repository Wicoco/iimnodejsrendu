fetch("https://pokeapi.co/api/v2/pokemon/mewtwo")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

function fetchPokemon(pokemon) {
  return fetch("https://pokeapi.co/api/v2/pokemon/mewtwo" + pokemon).then(
    (response) => response.json()
  );
}

async function displayPokemon(pokemon) {
  const data = await fetchPokemon(pokemon);
  document.getElementById("pokemon").innerHTML = `
   <h1>${data.name}</h1>

   <img src="${data.sprites.front_default}" alt="${data.name}" />`;
}
