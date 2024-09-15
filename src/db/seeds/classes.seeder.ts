import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Class } from '../../modules/pokemon/entities/class.entity';
import { classesDescriptions } from './investigation/class';
import GeneralSeeder from './general.seeder';

export default class ClassesSeeder extends GeneralSeeder {
  constructor() {
    super(new Logger(ClassesSeeder.name));
  }

  public async run(dataSource: DataSource): Promise<void> {
    const repository = await this.getMainRepository(dataSource, Class);
    if (repository === null) {
      return;
    }

    this.logger.verbose(
      `Inserting ${Object.keys(classesDescriptions).length} pokemon classes...`,
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
