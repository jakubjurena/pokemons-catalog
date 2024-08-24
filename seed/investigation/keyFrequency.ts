import { frequencyOfKeys } from './utils';

const keyFrequency = frequencyOfKeys();
console.log('keys', keyFrequency);
console.log(`keys in json - [${Object.keys(keyFrequency).join(', ')}]`);
