import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Attack } from '../../modules/pokemon/entities/attack.entity';
import { Class } from '../../modules/pokemon/entities/class.entity';
import { Classification } from '../../modules/pokemon/entities/classification.entity';
import { Pokemon } from '../../modules/pokemon/entities/pokemon.entity';
import { PokemonType } from '../../modules/pokemon-type/entities/pokemon-type.entity';

import pokemonsJson from './pokemons.json';
import GeneralSeeder from './general.seeder';
import { getPokemonAttacksByName } from './investigation/attack';
import { getClassFromDescription } from './investigation/class';
import { TypedObject } from './types';

type PokemonJSON = (typeof pokemonsJson)[0];

const mapPokemonJsonToPokemon = (pokemon: PokemonJSON) => {
  return {
    pokemonId: parseInt(pokemon.id),
    name: pokemon.name,
    classification: null,
    class: null,
    types: [],
    resistant: [],
    weaknesses: [],
    minWeight: parseFloat(pokemon.weight.minimum.replace('kg', '')),
    maxWeight: parseFloat(pokemon.weight.maximum.replace('kg', '')),
    minHeight: parseFloat(pokemon.height.minimum.replace('m', '')),
    maxHeight: parseFloat(pokemon.height.maximum.replace('m', '')),
    fleeRate: pokemon.fleeRate,
    maxCP: pokemon.maxCP,
    maxHP: pokemon.maxHP,
    attacks: [],
    evolutionRequirementAmount: pokemon.evolutionRequirements?.amount,
    evolutionRequirementCandy: pokemon.evolutionRequirements?.name,
  };
};
export default class PokemonSeeder extends GeneralSeeder {
  constructor() {
    super(new Logger(PokemonSeeder.name));
  }

  public async run(dataSource: DataSource): Promise<void> {
    const pokemonRepository = await this.getMainRepository(dataSource, Pokemon);
    if (pokemonRepository === null) {
      return;
    }

    const [
      pokemonTypesRepository,
      attacksRepository,
      classesRepository,
      classificationsRepository,
    ] = await Promise.all([
      this.getDependencyRepository(dataSource, PokemonType),
      this.getDependencyRepository(dataSource, Attack),
      this.getDependencyRepository(dataSource, Class),
      this.getDependencyRepository(dataSource, Classification),
    ]);

    if (
      pokemonTypesRepository === null ||
      attacksRepository === null ||
      classesRepository === null ||
      classificationsRepository === null
    ) {
      this.logger.error('Dependencies not seeded.');
      return;
    }

    this.logger.verbose(`Inserting ${pokemonsJson.length} pokemons...`);

    const attacks = await attacksRepository.find();
    const classes = await classesRepository.find();
    const classifications = await classificationsRepository.find();
    const pokemonTypes = await pokemonTypesRepository.find();

    // Create a dictionary for faster lookup
    const attacksByName: TypedObject<Attack> = attacks.reduce((acc, attack) => {
      acc[attack.name] = attack;
      return acc;
    }, {});
    const classesByName: TypedObject<Class> = classes.reduce(
      (acc, classObject) => {
        acc[classObject.name] = classObject;
        return acc;
      },
      {},
    );
    const classificationsByName: TypedObject<Classification> =
      classifications.reduce((acc, classification) => {
        acc[classification.name] = classification;
        return acc;
      }, {});
    const pokemonTypesByName: TypedObject<PokemonType> = pokemonTypes.reduce(
      (acc, type) => {
        acc[type.name] = type;
        return acc;
      },
      {},
    );

    // Map the pokemons to the database schema and add relations
    const pokemons = pokemonsJson.map((pokemon) => {
      const attacks = Object.values(getPokemonAttacksByName(pokemon)).map(
        (attack) => attacksByName[attack.name],
      );
      const types = Object.values(pokemon['types']).map(
        (type) => pokemonTypesByName[type],
      );
      const resistant = Object.values(pokemon.resistant).map(
        (type) => pokemonTypesByName[type],
      );
      const weaknesses = Object.values(pokemon.weaknesses).map(
        (type) => pokemonTypesByName[type],
      );
      const classification = classificationsByName[pokemon.classification];
      const classObject =
        classesByName[getClassFromDescription(pokemon['Pokémon Class'])];

      const nextEvolutions = pokemon.evolutions?.map((evolution) => ({
        pokemonId: evolution.id,
      }));
      const previousEvolutions = pokemon['Previous evolution(s)']?.map(
        (evolution) => ({
          pokemonId: evolution.id,
        }),
      );
      if (previousEvolutions?.length > 0) {
        this.logger.verbose(
          `Pokemon ${pokemon.name} has ${previousEvolutions.length} previous evolutions.`,
        );
      }
      if (nextEvolutions?.length > 0) {
        this.logger.verbose(
          `Pokemon ${pokemon.name} has ${nextEvolutions.length} evolutions.`,
        );
      }
      return {
        ...mapPokemonJsonToPokemon(pokemon),
        classification,
        class: classObject,
        types,
        resistant,
        weaknesses,
        attacks,
        nextEvolutions,
        previousEvolutions,
      };
    });

    // Save to the database with relations
    await pokemonRepository.save(pokemons);

    this.logger.log('Successfully inserted.');
  }
}
