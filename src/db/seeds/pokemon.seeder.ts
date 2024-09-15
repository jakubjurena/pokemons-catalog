import { Logger } from '@nestjs/common';
import { DataSource, In } from 'typeorm';

import { Attack } from '../../modules/pokemon/entities/attack.entity';
import { Class } from '../../modules/pokemon/entities/class.entity';
import { Classification } from '../../modules/pokemon/entities/classification.entity';
import { Pokemon } from '../../modules/pokemon/entities/pokemon.entity';
import { PokemonType } from '../../modules/pokemon-type/entities/pokemon-type.entity';

import pokemonsJson from './pokemons.json';
import GeneralSeeder from './general.seeder';
import { getPokemonAttacksByName } from './investigation/attack';
import { getClassFromDescription } from './investigation/class';

export default class PokemonSeeder extends GeneralSeeder {
  constructor() {
    super(new Logger(PokemonSeeder.name));
  }

  public async run(dataSource: DataSource): Promise<void> {
    dataSource.transaction(async (transactionalEntityManager) => {
      const pokemonRepository = await this.getMainRepository(
        transactionalEntityManager,
        Pokemon,
      );
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

      // TODO: Insert pokemons
      const attacks = await attacksRepository.find();
      const classes = await classesRepository.find();
      const classifications = await classificationsRepository.find();
      const pokemonTypes = await pokemonTypesRepository.find();

      const attacksByName = attacks.reduce((acc, attack) => {
        acc[attack.name] = attack;
        return acc;
      }, {});
      const classesByName = classes.reduce((acc, classObject) => {
        acc[classObject.name] = classObject;
        return acc;
      }, {});
      const classificationsByName = classifications.reduce(
        (acc, classification) => {
          acc[classification.name] = classification;
          return acc;
        },
        {},
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pokemonTypesByName = pokemonTypes.reduce((acc, type) => {
        acc[type.name] = type;
        return acc;
      }, {});

      // await pokemonRepository.insert(
      const pokemons = pokemonsJson.map((pokemon) => {
        const attacks = Object.values(getPokemonAttacksByName(pokemon)).map(
          (attack: any) => attacksByName[attack.name],
        );
        const classification = classificationsByName[pokemon.classification];
        const classObject =
          classesByName[getClassFromDescription(pokemon['Pokémon Class'])];
        return {
          // ...pokemon,
          pokemonId: parseInt(pokemon.id),
          name: pokemon.name,
          classification,
          class: classObject,
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
          attacks,
          // previousEvolutions: [],
          // nextEvolutions: [],
          evolutionRequirementAmount: pokemon.evolutionRequirements?.amount,
          evolutionRequirementCandy: pokemon.evolutionRequirements?.name,
        };
      });

      pokemonRepository.manager.transaction(async (manager) => {
        await manager.getRepository(Pokemon).save(pokemons);
      });

      const insertedPokemons = await pokemonRepository.insert(pokemons);

      for (const pokemon of pokemonsJson) {
        if (pokemon['Previous evolution(s)']?.length > 0) {
          const previousEvolutions = await pokemonRepository.find({
            where: {
              pokemonId: In(pokemon['Previous evolution(s)']?.map((p) => p.id)),
            },
          });
          if (previousEvolutions.length > 0) {
            this.logger.verbose(
              `Pokemon ${pokemon.name} has ${previousEvolutions.length} previous evolutions.`,
            );
            const insertedPokemon = insertedPokemons.identifiers.find(
              (p) => p.pokemonId === parseInt(pokemon.id),
            );
            await pokemonRepository.save({
              ...insertedPokemon,
              previousEvolutions,
            });
          } else {
            this.logger.error(
              `Can't find ${pokemon.name} previous evolutions.`,
            );
          }
        }
        if (pokemon.evolutions?.length > 0) {
          const nextEvolutions = await pokemonRepository.find({
            where: {
              pokemonId: In(pokemon.evolutions.map((p) => p.id)),
            },
          });
          if (nextEvolutions.length > 0) {
            this.logger.verbose(
              `Pokemon ${pokemon.name} has ${nextEvolutions.length} evolutions.`,
            );
            const insertedPokemon = insertedPokemons.identifiers.find(
              (p) => p.pokemonId === parseInt(pokemon.id),
            );
            await pokemonRepository.save({
              ...insertedPokemon,
              nextEvolutions,
            });
          } else {
            this.logger.error(`Can't find ${pokemon.name} evolutions.`);
          }
        }
      }

      this.logger.log('Successfully inserted.');
    });
  }
}
