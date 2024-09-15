import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PokemonType } from '../../modules/pokemon-type/entities/pokemon-type.entity';
import { pokemonTypes } from './investigation/pokemonType';
import GeneralSeeder from './general.seeder';

export default class PokemonTypesSeeder extends GeneralSeeder {
  constructor() {
    super(new Logger(PokemonTypesSeeder.name));
  }

  public async run(dataSource: DataSource): Promise<void> {
    const repository = await this.getMainRepository(dataSource, PokemonType);
    if (repository === null) {
      return;
    }

    this.logger.verbose(
      `Inserting ${Object.keys(pokemonTypes).length} pokemon types...`,
    );

    await repository.insert(pokemonTypes.map((name) => ({ name })));

    this.logger.log('Successfully inserted.');
  }
}
