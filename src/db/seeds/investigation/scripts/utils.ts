/**
 * General utility functions for the investigation seed script
 * @param name Name of the data
 * @param data Frequency data to log
 */
export const logFrequencyInfo = (name: string, data: object) => {
  console.log(name, data);
  console.log(`types in json - [${Object.keys(data).join(', ')}]`);
  console.log(`number of different "${name}"`, Object.keys(data).length);
};

export const logDivider = () =>
  console.log('-----------------------------------');
