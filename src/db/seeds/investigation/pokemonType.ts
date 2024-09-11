import { frequencyOfValues } from './utils';
import pokemonsJson from '../pokemons.json';

export const pokemonTypesFrequency = frequencyOfValues(pokemonsJson, [
  'types',
  'resistant',
  'weaknesses',
]);

export const pokemonTypes = Object.keys(pokemonTypesFrequency);
