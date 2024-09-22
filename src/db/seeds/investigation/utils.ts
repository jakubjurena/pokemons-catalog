import { Frequency, PokemonsJSON } from './types';

export const frequencyOfValues = (
  pokemons: PokemonsJSON,
  keys: string[],
): Frequency => {
  return pokemons.reduce((acc, pokemon) => {
    keys.forEach((key) => {
      const keyValue = pokemon[key];
      if (keyValue instanceof Array) {
        keyValue.forEach((value) => {
          acc[value] = acc[value] ? acc[value] + 1 : 1;
        });
      } else {
        acc[keyValue] = acc[keyValue] ? acc[keyValue] + 1 : 1;
      }
    });
    return acc;
  }, {});
};
