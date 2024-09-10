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

export const attackTypes = () => {
  const attackTypes = pokemonsJson.reduce((acc, pokemon) => {
    Object.keys(pokemon.attacks).forEach((attackType) => {
      acc[attackType] = acc[attackType] ? acc[attackType] + 1 : 1;
    });
    return acc;
  }, {});
  return attackTypes;
};

export const fastVsSpecialConflicts = () => {
  const fast = pokemonsJson.reduce((acc, pokemon) => {
    pokemon.attacks.fast.forEach((attack) => {
      acc[attack.name] = acc[attack.name] ? acc[attack.name] + 1 : 1;
    });
    return acc;
  }, {});

  const sepecial = pokemonsJson.reduce((acc, pokemon) => {
    pokemon.attacks.special.forEach((attack) => {
      acc[attack.name] = acc[attack.name] ? acc[attack.name] + 1 : 1;
    });
    return acc;
  }, {});

  const conflicts = Object.keys(fast).filter((key) => sepecial[key]);

  return conflicts;
};
