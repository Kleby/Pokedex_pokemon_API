const pokemonsList = document.querySelector('#pokemons');
const btnLoadMore = document.querySelector("#btnLoadMore");
const pokedexList = document.querySelector("#pokedex");
const viewDetail = document.querySelector("#pokeDetail");

const limit = 10;
let offset = 0;
const maxRecords= 151;

//Visualização html do pokemon
const pokeView = (pokemon) => (
  `
  <li class="pokemon ${pokemon.type}-bg" onClick="viewPokeDetail(${pokemon.id})" >
    <span class="number">#${("0000" + (pokemon.id)).slice(-4)}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">
        ${pokemon.types.map(type => `<li class="type ${type}-bg">
        ${type}</li>`).join('')}
      </ol>
      <img src="${pokemon.photo}"
      alt="${pokemon.name} imagem">
    </div>
  </li>
  `)
// _______________ fim da visualização ___________



const loadPokemonItems = (offset, limit) => {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(pokemon => pokeView(pokemon) ).join('');
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
});

// Altera uma classe para visibilidade
onToggleView = async() =>{
  pokedexList.classList.toggle('disabled');
  viewDetail.classList.toggle('disabled');
}

//Adicionando a view do pokemon ao clicar
const viewPokeDetail = async (id) =>{

  onToggleView();

  pokemon = await pokeApi.getPokemonDetail(id);
  return viewDetail.innerHTML = `
    <div class="poke-detail__container">
      <div class="poke-detail__infor" >
        <h2 class="infor__title ${pokemon.type}-color">${pokemon.name}</h2>
        <h2 class="infor__number ${pokemon.type}-color"> Nº ${("0000" + (pokemon.id)).slice(-4)}</h2>
      </div>
      <div class="poke-detail__content">
        <div class="content__sprite" >
          <img src="${pokemon.photo}" alt=${pokemon.name} title=${pokemon.name} />
        </div>
        <div class="content__attributes">
          <div class="${pokemon.type}-bg poke-detail__card">
            <div class="card__poke-body">
              <p class="poke-body__item">
              Height 
              <spam class="${pokemon.type}-color">${pokemon.weight.toFixed(2)}</spam>
              </p>
              <p class="poke-body__item">
                Weight 
                <spam class="${pokemon.type}-color">${(pokemon.height/10).toFixed(2)}</spam>
              </p>
            </div>
            <div class="abilities__content ${pokemon.type}-bg">
              <h3>Abilities</h3>
              <ul class="poke-body__abilities">
              ${pokemon.abilities.map( ability => `<li class="ability ${pokemon.type}-color" > ${ability}</li>`).join('')}
            </ul>
            </div>
          </div>
          <div class="poke-detail__type">
            <h3>Type</h3>
            <ul class="types">
            ${pokemon.types.map(type => `<li class="type ${type}-bg">${type}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
      <button class="btn" onClick="onToggleView()">Closer</button>
    </div>
  `
}

