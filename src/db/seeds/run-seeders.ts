import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { dataSourceOptions } from '../data-source';
import PokemonTypesSeeder from './pokemon-type.seeder';
import ClasssificationsSeeder from './classifications.seeder';
import AttacksSeeder from './attacks.seeder';
import ClassesSeeder from './classes.seeder';
import PokemonSeeder from './pokemon.seeder';

(async () => {
  const dataSource = new DataSource({
    ...dataSourceOptions,
    entities: ['./**/*.entity.ts'],
  });
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: [
      PokemonTypesSeeder,
      ClasssificationsSeeder,
      ClassesSeeder,
      AttacksSeeder,
      PokemonSeeder,
    ],
  });
})();
