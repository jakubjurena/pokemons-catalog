import { AttackType } from '../../../modules/pokemon/enums/attack-type.enum';
import pokemonsJson from '../pokemons.json';
import { TypedObject } from '../types';
import { AttackByName, Frequency, PokemonJSON } from './types';

export const getPokemonAttacksByName = (pokemon: PokemonJSON): AttackByName => {
  return Object.entries(pokemon.attacks).reduce(
    (acc, [attackType, attacks]) => {
      const newAttacks = attacks
        .map((attack) => ({
          attackType,
          ...attack,
        }))
        .reduce((acc, attack) => {
          return { ...acc, [attack.name]: attack };
        }, {});

      return { ...acc, ...newAttacks };
    },
    {},
  );
};

export const attacksFrequency: Frequency = pokemonsJson.reduce(
  (acc, pokemon) => {
    Object.keys(pokemon.attacks).forEach((attackType) => {
      pokemon.attacks[attackType].forEach((attack) => {
        acc[attack.name] = acc[attack.name] ? acc[attack.name] + 1 : 1;
      });
    });
    return acc;
  },
  {},
);
export const attackNames = Object.keys(attacksFrequency);

export const attackTypeFrequency: Frequency<AttackType> = pokemonsJson.reduce(
  (acc, pokemon) => {
    Object.keys(pokemon.attacks).forEach((attackType) => {
      const numberOfAttacks = pokemon.attacks[attackType].length;
      acc[attackType] = acc[attackType]
        ? acc[attackType] + numberOfAttacks
        : numberOfAttacks;
    });
    return acc;
  },
  { fast: 0, special: 0 },
);

export const allAttacks: AttackByName = pokemonsJson.reduce((acc, pokemon) => {
  const pokemonAttacks = getPokemonAttacksByName(pokemon);
  return { ...acc, ...pokemonAttacks };
}, {});

export const attacksByType: TypedObject<AttackByName, AttackType> = Object.keys(
  allAttacks,
).reduce(
  (acc, attackName) => {
    const attack = allAttacks[attackName];
    acc[attack.attackType] = acc[attack.attackType] || {};
    acc[attack.attackType][attackName] = attack;
    return acc;
  },
  { fast: {}, special: {} },
);
