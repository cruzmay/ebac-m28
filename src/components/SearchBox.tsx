import { PokemonsListItem } from "../interfaces/PokemonsListItem";
import { FilteredList } from "./FilteredList";

interface SearchBoxProps {
  handlePokemonSearch: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  handlePokemonClick: (event: React.SyntheticEvent, url: string) => void;
  results: PokemonsListItem[]| null;
}

export const SearchBox = ({ handlePokemonSearch, results, handlePokemonClick }: SearchBoxProps) => {
  return (
    <nav className="nav">
      <div className="logo"><img src="../assets/pokemon.svg" alt="logo" /></div>
      <div className="search">
        <input type="text" onChange={(event) => handlePokemonSearch(event)}  placeholder="search by name"/>
        {results && results.length > 0 && (
          <FilteredList results={results} handlePokemonClick={(event, url) => handlePokemonClick(event, url)} />
        )}
      </div>
    </nav>
  );
};
