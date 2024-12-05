import { useEffect, useState } from "react";
import { Pokemon } from "../interfaces/Pokemon";
import axios from "axios";
import { PokemonSpecies } from "../interfaces/PokemonSpecies";

interface ResultScreenProps {
  pokemon?: Pokemon;
}

const getSpecies = (url: string): Promise<PokemonSpecies> => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const ResultScreen = ({ pokemon }: ResultScreenProps) => {
  const [specie, setSpecie] = useState<PokemonSpecies>();

  useEffect(() => {
    if (pokemon?.species.url) {
      getSpecies(pokemon?.species.url).then((data) => setSpecie(data));
    }
  }, [pokemon]);
  return (
    <section className="result">
      {pokemon ? (
        <article className="result__card">
          <div className="result__card__image">
            <figure>
              <img
                src={pokemon.sprites.other?.["official-artwork"].front_default}
                alt={pokemon.name}
              />
            </figure>
            <p>{pokemon.name}</p>
          </div>
          <div>
            <p>
              {
                specie?.flavor_text_entries?.find(
                  (text) => text.language.name === "es"
                )?.flavor_text
              }
            </p>
          </div>
        </article>
      ) : (
        <div>Search a Pokemon</div>
      )}
    </section>
  );
};
