import { frequencyOfValues } from './utils';

const classificationFrequency = frequencyOfValues(['classification']);
console.log('classifications', classificationFrequency);
console.log(
  `classifications in json - [${Object.keys(classificationFrequency).join(', ')}]`,
);
console.log(
  'number of different classifications',
  Object.keys(classificationFrequency).length,
);
