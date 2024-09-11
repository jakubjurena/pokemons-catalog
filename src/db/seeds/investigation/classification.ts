import { frequencyOfValues } from './utils';
import pokemonsJson from '../pokemons.json';

export const classificationFrequency = frequencyOfValues(pokemonsJson, [
  'classification',
]);
export const classifications = Object.keys(classificationFrequency);
