import { attackTypeFrequency, attacksFrequency } from '../attack';
import { logDivider, logFrequencyInfo } from './utils';

logFrequencyInfo('frequencyOfAttacks', attacksFrequency);
logDivider();

logFrequencyInfo('attackTypes', attackTypeFrequency);
logDivider();

// logFrequencyInfo('attacksByType', attacksByType);
