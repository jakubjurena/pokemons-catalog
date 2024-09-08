import {
  attackTypes,
  fastVsSpecialConflicts,
  frequencyOfAttacks,
} from './utils';

const attacksFrequency = frequencyOfAttacks();
console.log('frequencyOfAttacks', attacksFrequency);
console.log(`attacks in json - [${Object.keys(attacksFrequency).join(', ')}]`);
console.log('--------------------------------');

const attacks = attackTypes();
console.log('attackTypes', attacks);
console.log(`attackTypes in json - [${Object.keys(attacks).join(', ')}]`);
console.log('--------------------------------');

const conflicts = fastVsSpecialConflicts();
console.log('fastVsSpecialConflicts', conflicts);
console.log(`fastVsSpecialConflicts in json - [${conflicts.join(', ')}]`);
console.log('--------------------------------');
