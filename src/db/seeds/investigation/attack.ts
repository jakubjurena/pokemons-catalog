import pokemonsJson from '../pokemons.json';

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
    acc[attackType] = acc[attackType] ? acc[attackType] + 1 : 1;
  });
  return acc;
}, {});
export const attackTypes = Object.keys(attackTypeFrequency);

export const attacksByType = pokemonsJson.reduce((acc, pokemon) => {
  Object.keys(pokemon.attacks).forEach((attackType) => {
    acc[attackType] = acc[attackType] || {};
    pokemon.attacks[attackType].forEach((attack) => {
      if (
        acc[attackType][attack.name] &&
        (acc[attackType][attack.name].type !== attack.type ||
          acc[attackType][attack.name].damage !== attack.damage)
      ) {
        throw new Error(
          `Attack missmatch: Attack1 ${JSON.stringify(acc[attackType][attack.name])} Attack2 ${JSON.stringify(attack)}`,
        );
      }
      acc[attackType][attack.name] = attack;
    });
  });
  return acc;
}, {});
