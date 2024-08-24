import pokemonsJson from '../pokemons.json';

export const frequencyOfValues = (keys: string[]) => {
  const frequency = pokemonsJson.reduce((acc, pokemon) => {
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
  return frequency;
};

export const frequencyOfKeys = () => {
  const frequency = pokemonsJson.reduce((acc, pokemon) => {
    Object.keys(pokemon).forEach((key) => {
      if (pokemon[key]) {
        acc[key] = acc[key] ? acc[key] + 1 : 1;
      }
    });
    return acc;
  }, {});
  return frequency;
};

export const frequencyOfAttacks = () => {
  const frequency = pokemonsJson.reduce((acc, pokemon) => {
    Object.keys(pokemon.attacks).forEach((attackType) => {
      pokemon.attacks[attackType].forEach((attack) => {
        acc[attack.name] = acc[attack.name] ? acc[attack.name] + 1 : 1;
      });
    });
    return acc;
  }, {});
  return frequency;
};
