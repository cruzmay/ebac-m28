import React from "react";
import { PokemonsListItem } from "../interfaces/PokemonsListItem";

interface FilteredListProps {
  results: PokemonsListItem[];
  handlePokemonClick: (event: React.SyntheticEvent, url: string) => void;
}

export const FilteredList = ({ results, handlePokemonClick }: FilteredListProps) => {
  return (
    <div className="filters">
      <ul className="list">
        {results.map((item) => (
          <li key={item.name} className="list-item">
            <button onClick={(event) => handlePokemonClick(event, item.url)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
