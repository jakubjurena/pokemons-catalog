import { frequencyOfValues } from './utils';
import pokemonsJson from '../pokemons.json';

export const classesDescriptions = Object.keys(
  frequencyOfValues(pokemonsJson, ['Pokémon Class']),
).reduce(
  (acc, value) => {
    if (value === undefined || value === 'undefined') {
      return acc;
    }
    const groups = /^(This is a )(.*)( Pokémon.)/.exec(value);
    acc[groups?.[2]] = value;
    return acc;
  },
  {} as Record<string, string>,
);
export const classes = Object.keys(classesDescriptions);
