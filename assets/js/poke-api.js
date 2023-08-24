const pokeApi = {};

function pokeApiToClasspokemon( pokeDetail){
  const pokemon = new Pokemon();
  pokemon.id = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  const types = pokeDetail.types.map( typeSlot => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default;
  pokemon.weight = pokeDetail.weight;
  pokemon.height = pokeDetail.height;
  pokemon.abilities = pokeDetail.abilities.map( abilitySlot => abilitySlot.ability.name)

  return pokemon;
}

const configs = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
}};


pokeApi.getPokemon = async pokemon => {
  return await fetch(pokemon.url)
    .then( res => res.json())
    .then( pokeApiToClasspokemon)
}

pokeApi.getPokemons = async (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return await fetch(url, configs)
    .then(res => res.json())
    .then(data => data.results)
    .then(pokemons => pokemons.map(pokemon => pokeApi.getPokemon(pokemon)) )
    .then(detailRequest => Promise.all(detailRequest))
    .then(pokemonsDetails => pokemonsDetails)
    .catch(error => console.error(error))
}

pokeApi.getPokemonDetail = async id => {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, configs)
      .then( res => res.json())
      .then( res => pokeApiToClasspokemon(res))
      .catch( e => console.error(`Erro ao fazer a requisição\n ${e}`));
}