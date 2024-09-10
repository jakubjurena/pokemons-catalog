import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PokemonType } from '../../modules/pokemon-type/entities/pokemon-type.entity';

// TODO: Read from JSON file
const MOCK_POKEMON_TYPES = [
  'Grass',
  'Poison',
  'Water',
  'Electric',
  'Fighting',
  'Fairy',
  'Fire',
  'Ice',
  'Flying',
  'Psychic',
  'Bug',
  'Steel',
  'Ground',
  'Rock',
  'Normal',
  'Ghost',
  'Dragon',
  'Dark',
];

export default class PokemonTypeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(PokemonType);
    if ((await repository.count()) > 0) {
      console.log('Pokemon types already inserted.');
      return;
    }
    console.log('Inserting Pokemon types...');
    console.log(
      `Pokemon types to insert: ${JSON.stringify(MOCK_POKEMON_TYPES)}`,
    );
    await repository.insert(MOCK_POKEMON_TYPES.map((name) => ({ name })));
    console.log('Pokemon types inserted.');
    console.log(
      `Pokemon types in database: ${JSON.stringify(await repository.find())}`,
    );
  }
}
