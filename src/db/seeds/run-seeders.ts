import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { dataSourceOptions } from '../data-source';

(async () => {
  const dataSource = new DataSource({
    ...dataSourceOptions,
    entities: ['./**/*.entity.ts'],
  });
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: ['./**/*.seeder.ts'],
  });
})();
