import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PokemonType } from '../../modules/pokemon-type/entities/pokemon-type.entity';
import { pokemonTypes } from './investigation/pokemonType';

export default class PokemonTypeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(PokemonType);
    if ((await repository.count()) > 0) {
      console.log('Pokemon types already inserted.');
      return;
    }
    console.log('Inserting Pokemon types...');
    console.log(`Pokemon types to insert: ${JSON.stringify(pokemonTypes)}`);
    await repository.insert(pokemonTypes.map((name) => ({ name })));
    console.log('Pokemon types inserted.');
    console.log(
      `Pokemon types in database: ${JSON.stringify(await repository.find())}`,
    );
  }
}
