export const frequencyOfValues = (object: any, keys: string[]) => {
  const frequency = object.reduce((acc, pokemon) => {
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
