import { PokemonsListItem } from "../interfaces/PokemonsListItem";
import { FilteredList } from "./FilteredList";

interface SearchBoxProps {
  search: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  clickResult: (event: React.SyntheticEvent, url: string) => void;
  results?: PokemonsListItem[];
}

export const SearchBox = ({ search, results, clickResult }: SearchBoxProps) => {
  return (
    <nav className="nav">
      <figure className="nav__logo"><img src="../assets/pokemon.svg" alt="logo" /></figure>
      <form action="" className="nav__search-bar">
        <input type="text" onChange={(event) => search(event)}  placeholder="search by name"/>
        {results && results.length > 0 && (
          <FilteredList results={results} clickResult={(event, url) => clickResult(event, url)} />
        )}
      </form>
    </nav>
  );
};
