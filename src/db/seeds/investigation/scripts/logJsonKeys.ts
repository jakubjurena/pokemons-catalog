import { isDefined } from 'class-validator';

import { logFrequencyInfo } from './utils';
import pokemonsJson from '../../pokemons.json';

export const frequencyOfKeys = pokemonsJson.reduce((acc, pokemon) => {
  Object.keys(pokemon).forEach((key) => {
    if (isDefined(pokemon[key])) {
      acc[key] = acc[key] ? acc[key] + 1 : 1;
    }
  });
  return acc;
}, {});

logFrequencyInfo('object keys', frequencyOfKeys);
