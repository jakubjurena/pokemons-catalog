import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Class } from '../../modules/pokemon/entities/class.entity';
import { classesDescriptions } from './investigation/class';

export default class ClassesSeeder implements Seeder {
  private readonly logger = new Logger(ClassesSeeder.name);

  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Class);
    if ((await repository.count()) > 0) {
      this.logger.log('Already seeded.');
      return;
    }
    this.logger.log('Inserting...');
    this.logger.log(
      `Clasees to insert: ${JSON.stringify(classesDescriptions)}`,
    );
    await repository.insert(
      Object.entries(classesDescriptions).map(([name, description]) => ({
        name,
        description: description || '',
      })),
    );
    this.logger.log('Successfully inserted.');
  }
}
