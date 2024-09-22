import { AttackType } from '../../../modules/pokemon/enums/attack-type.enum';
import pokemonsJson from '../pokemons.json';
import { TypedObject } from '../types';

export type PokemonsJSON = typeof pokemonsJson;
export type PokemonJSON = PokemonsJSON[0];
export type AttackJson = PokemonJSON['attacks']['fast'][0];
export type AttackByName = TypedObject<AttackJson & { attackType: AttackType }>;

export type Frequency<K extends string = string> = TypedObject<number, K>;
