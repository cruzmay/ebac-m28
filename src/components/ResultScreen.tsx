import { useEffect, useState } from "react";
import { Pokemon } from "../interfaces/Pokemon";
import axios from "axios";
import { PokemonSpecies } from "../interfaces/PokemonSpecies";

interface ResultScreenProps {
  pokemon: Pokemon | null;
}

const getSpecies = (url: string): Promise<PokemonSpecies> => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const ResultScreen = ({ pokemon }: ResultScreenProps) => {
  const [specie, setSpecie] = useState<PokemonSpecies | null>(null);

  useEffect(() => {
    if (pokemon?.species.url) {
      getSpecies(pokemon?.species.url).then((data) => setSpecie(data));
    }
  }, [pokemon]);
  const pokemonDescription = specie?.flavor_text_entries?.find(
    (text) => text.language.name === "es"
  )?.flavor_text;
  const errorMessage = "Error getting pokemon description";
  return (
    <section className="result">
      {pokemon ? (
        <article className="card">
          <div className="card-image">
            <img
              src={pokemon.sprites.other?.["official-artwork"].front_default}
              alt={pokemon.name}
            />
            <p>{pokemon.name}</p>
          </div>
          <div>
            <p>{specie ? pokemonDescription : errorMessage}</p>
          </div>
        </article>
      ) : (
        <p className="initial-message">Search a Pokemon...</p>
      )}
    </section>
  );
};
