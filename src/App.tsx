import { useEffect, useState } from "react";
import { SearchBox } from "./components/SearchBox";
import axios from "axios";
import { PokemonsListItem } from "./interfaces/PokemonsListItem";
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
  const [pokemonsList, setPokemonsList] = useState<PokemonsListItem[]|null>(null);
  const [pokemonsSearchResults, setPokemonsSearchResults] =
    useState<PokemonsListItem[]| null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon|null>(null);
  // get all pokemons
  useEffect(() => {
    getAllPokemons().then((data) => setPokemonsList(data));
  }, []);
  // search pokemon function
  const handlePokemonSearch = (
    event: React.SyntheticEvent<HTMLInputElement>
  ): void => {
    let results: PokemonsListItem[] = [];
    const search = event.currentTarget.value;
    if (search.length > 2) {
      pokemonsList?.forEach((pokemon) => {
        if (pokemon.name.toLowerCase().includes(search.toLowerCase())) {
          results.push(pokemon);
        }
      });
      setPokemonsSearchResults(results);
    } else {
      setPokemonsSearchResults(null)
    }
  };
    // will call PokemonApi with tthe selected pokemon
  const handlePokemonClick = (_event: React.SyntheticEvent, url: string): void => {
    getPokemon(url)
      .then((data) => setSelectedPokemon(data))
      .then(() => setPokemonsSearchResults(null));
  };
  return (
    <>
    {
      pokemonsList ? (
      <>
      <SearchBox
        handlePokemonSearch={handlePokemonSearch}
        results={pokemonsSearchResults}
        handlePokemonClick={handlePokemonClick}
      />
      <ResultScreen pokemon={selectedPokemon} />
      </>
      ) : <p>Error loading pokemons</p>
    }
    </>
  );
}

export default App;
