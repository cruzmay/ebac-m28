import { useEffect, useState } from "react";
import { SearchBox } from "./components/SearchBox";
import axios from "axios";
import { PokemonsListItem } from "./interfaces/PokemonsListItem";
import { serialize } from "v8";
import { Pokemon } from "./interfaces/Pokemon";
import { ResultScreen } from "./components/ResultScreen";

const getAllPokemons = (): Promise<PokemonsListItem[]> => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1000`)
    .then((response) => response.data.results)
    .catch((error) => console.log(error));
};
const getPokemon = (url: string): Promise<Pokemon> => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

function App(): React.ReactElement {
  const [pokemonsList, setPokemonsList] = useState<PokemonsListItem[]>();
  const [pokemonsSearchResults, setPokemonsSearchResults] =
    useState<PokemonsListItem[]>();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  // get all pokemons
  useEffect(() => {
    getAllPokemons().then((data) => setPokemonsList(data));
  }, []);
  // search pokemon function
  const searchPokemon = (
    event: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    let results: PokemonsListItem[] = [];
    event.preventDefault();
    event.stopPropagation();
    const search = event.currentTarget.value;
    if (search.length > 2) {
      pokemonsList?.forEach((pokemon) => {
        if (pokemon.name.toLowerCase().includes(search.toLowerCase())) {
          results.push(pokemon);
        }
      });
      setPokemonsSearchResults(results);
    }
  };
    // will call PokemonApi with tthe selected pokemon
  const selectPokemon = (event: React.SyntheticEvent, url: string): void => {
    event.preventDefault();
    event.stopPropagation();
    getPokemon(url)
      .then((data) => setSelectedPokemon(data))
      .then(() => setPokemonsSearchResults([]));
  };
  return (
    <>
    <SearchBox
      search={searchPokemon}
      results={pokemonsSearchResults}
      clickResult={selectPokemon}
    />
    <ResultScreen pokemon={selectedPokemon} />
    </>
  );
}

export default App;
