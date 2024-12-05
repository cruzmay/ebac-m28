import React from "react";
import { PokemonsListItem } from "../interfaces/PokemonsListItem";

interface FilteredListProps {
  results: PokemonsListItem[];
  clickResult: (event: React.SyntheticEvent, url: string) => void;
}

export const FilteredList = ({ results, clickResult }: FilteredListProps) => {
  return (
    <div className="nav__filtered-list__container">
      <ul className="nav__filtered-list__list">
        {results.map((item) => (
          <li key={item.name} className="nav__filtered-list__list__item">
            <button onClick={(event) => clickResult(event, item.url)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
