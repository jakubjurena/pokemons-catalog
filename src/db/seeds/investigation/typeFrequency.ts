import { frequencyOfValues } from './utils';

const typeFrequency = frequencyOfValues(['types', 'resistant', 'weaknesses']);
console.log('types ', typeFrequency);
console.log(`types in json - [${Object.keys(typeFrequency).join(', ')}]`);
