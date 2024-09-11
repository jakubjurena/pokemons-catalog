import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { PokemonType } from '../../modules/pokemon-type/entities/pokemon-type.entity';
import { pokemonTypes } from './investigation/pokemonType';

export default class PokemonTypesSeeder implements Seeder {
  private readonly logger = new Logger(PokemonTypesSeeder.name);

  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(PokemonType);
    if ((await repository.count()) > 0) {
      this.logger.log('Already seeded.');
      return;
    }
    this.logger.log('Inserting...');
    this.logger.log(`Pokemon types to insert: ${JSON.stringify(pokemonTypes)}`);
    await repository.insert(pokemonTypes.map((name) => ({ name })));
    this.logger.log('Successfully inserted.');
  }
}
