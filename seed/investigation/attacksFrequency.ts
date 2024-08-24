import { frequencyOfAttacks } from './utils';

const attacksFrequency = frequencyOfAttacks();
console.log('frequencyOfAttacks', attacksFrequency);
console.log(`attacks in json - [${Object.keys(attacksFrequency).join(', ')}]`);
