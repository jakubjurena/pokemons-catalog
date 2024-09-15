import { frequencyOfValues } from './utils';
import pokemonsJson from '../pokemons.json';

export const getClassFromDescription = (description: string) => {
  const groups = /^(This is a )(.*)( Pokémon.)/.exec(description);
  return groups?.[2];
};

export const classesDescriptions = Object.keys(
  frequencyOfValues(pokemonsJson, ['Pokémon Class']),
).reduce(
  (acc, value) => {
    if (value === undefined || value === 'undefined') {
      return acc;
    }
    const className = getClassFromDescription(value);
    acc[className] = value;
    return acc;
  },
  {} as Record<string, string>,
);
export const classes = Object.keys(classesDescriptions);
