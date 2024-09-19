import pokemonsJson from '../pokemons.json';

type PokemonsJSON = typeof pokemonsJson;
type PokemonJSON = PokemonsJSON[0];

export const getPokemonAttacksByName = (pokemon: PokemonJSON) => {
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

export const attacksFrequency = pokemonsJson.reduce((acc, pokemon) => {
  Object.keys(pokemon.attacks).forEach((attackType) => {
    pokemon.attacks[attackType].forEach((attack) => {
      acc[attack.name] = acc[attack.name] ? acc[attack.name] + 1 : 1;
    });
  });
  return acc;
}, {});
export const attackNames = Object.keys(attacksFrequency);

export const attackTypeFrequency = pokemonsJson.reduce((acc, pokemon) => {
  Object.keys(pokemon.attacks).forEach((attackType) => {
    const numberOfAttacks = pokemon.attacks[attackType].length;
    acc[attackType] = acc[attackType]
      ? acc[attackType] + numberOfAttacks
      : numberOfAttacks;
  });
  return acc;
}, {});
export const attackTypes = Object.keys(attackTypeFrequency);

export const allAttacks = pokemonsJson.reduce((acc, pokemon) => {
  const pokemonAttacks = getPokemonAttacksByName(pokemon);
  return { ...acc, ...pokemonAttacks };
}, {});

export const attacksByType = Object.keys(allAttacks).reduce(
  (acc, attackName) => {
    const attack = allAttacks[attackName];
    acc[attack.attackType] = acc[attack.attackType] || {};
    acc[attack.attackType][attackName] = attack;
    return acc;
  },
  {},
);
