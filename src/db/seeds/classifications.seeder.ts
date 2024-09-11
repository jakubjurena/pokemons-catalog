import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Classification } from '../../modules/pokemon/entities/classification.entity';
import { classifications } from './investigation/classification';

export default class ClassificationsSeeder implements Seeder {
  private readonly logger = new Logger(ClassificationsSeeder.name);

  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Classification);
    if ((await repository.count()) > 0) {
      this.logger.log('Already seeded.');
      return;
    }
    this.logger.log('Inserting...');
    this.logger.log(
      `Classifications to insert: ${JSON.stringify(classifications)}`,
    );
    await repository.insert(classifications.map((name) => ({ name })));
    this.logger.log('Successfully inserted.');
  }
}
