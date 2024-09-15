import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Classification } from '../../modules/pokemon/entities/classification.entity';
import { classifications } from './investigation/classification';
import GeneralSeeder from './general.seeder';

export default class ClassificationsSeeder extends GeneralSeeder {
  constructor() {
    super(new Logger(ClassificationsSeeder.name));
  }

  public async run(dataSource: DataSource): Promise<void> {
    const repository = await this.getMainRepository(dataSource, Classification);
    if (repository === null) {
      return;
    }

    this.logger.verbose(
      `Inserting ${Object.keys(classifications).length} classifications...`,
    );
    await repository.insert(classifications.map((name) => ({ name })));
    this.logger.log('Successfully inserted.');
  }
}
