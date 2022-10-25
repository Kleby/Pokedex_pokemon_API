const pokeApi = {};

function pokeApiToClasspokemon( pokeDetail){
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  const types = pokeDetail.types.map( typeSlot => typeSlot.type.name);
  const [type] = types; //reveber o primeiro elemento do types
  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default;

  return pokemon;
}

const configs = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
}};


pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then( res => res.json())
    .then( pokeApiToClasspokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url, configs)
    .then(res => res.json())
    .then(data => data.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailRequest => Promise.all(detailRequest))
    .then(pokemonsDetails => pokemonsDetails)
    .catch(error => console.error(error))
}