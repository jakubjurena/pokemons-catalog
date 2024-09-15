import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Attack } from '../../modules/pokemon/entities/attack.entity';
import { Class } from '../../modules/pokemon/entities/class.entity';
import { Classification } from '../../modules/pokemon/entities/classification.entity';
import { Pokemon } from '../../modules/pokemon/entities/pokemon.entity';
import { PokemonType } from '../../modules/pokemon-type/entities/pokemon-type.entity';

import pokemonsJson from './pokemons.json';
import GeneralSeeder from './general.seeder';

export default class PokemonSeeder extends GeneralSeeder {
  constructor() {
    super(new Logger(PokemonSeeder.name));
  }

  public async run(dataSource: DataSource): Promise<void> {
    const pokemonRepository = this.getMainRepository(dataSource, Pokemon);
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

    this.logger.log('Successfully inserted.');
  }
}
