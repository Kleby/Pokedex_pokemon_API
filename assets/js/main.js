const pokemonsList = document.querySelector('#pokemons');
const btnLoadMore = document.querySelector("#btnLoadMore");

const limit = 10;
let offset = 0;
const maxRecords= 151;

const loadPokemonItems = (offset, limit) => {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(pokemon =>
        `
          <li class="pokemon ${pokemon.type}">
            <span class="number">#${("0000" + (pokemon.number)).slice(-4)}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                ${pokemon.types.map(type => `<li class="type ${type}">
                ${type}</li>`).join('')}
              </ol>
              <img src="${pokemon.photo}"
              alt="${pokemon.name} imagem">
            </div>
          </li>
          `
      ).join('');
    pokemonsList.innerHTML += newHtml;
  });
};

loadPokemonItems(offset, limit)

btnLoadMore.addEventListener('click', () => {
  offset += limit;
  const qttRecordsWithNextPage = offset + limit;

  if(qttRecordsWithNextPage >= maxRecords){
    const newLimit = maxRecords - offset
    loadPokemonItems(offset, newLimit);

    btnLoadMore.parentElement.removeChild(btnLoadMore);
  }
  else{
    loadPokemonItems(offset, limit);
  }
})