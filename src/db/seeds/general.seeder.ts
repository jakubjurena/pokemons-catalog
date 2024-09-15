import { Logger } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default abstract class GeneralSeeder implements Seeder {
  constructor(protected readonly logger: Logger) {}

  abstract run(dataSource: DataSource): Promise<void>;

  protected async getMainRepository<Entity extends ObjectLiteral>(
    dataSource: DataSource,
    target: EntityTarget<Entity>,
  ): Promise<Repository<Entity>> {
    const targetRepository = dataSource.getRepository(target);
    if ((await targetRepository.count()) > 0) {
      this.logger.log('Already seeded.');
      return null;
    }
    return targetRepository;
  }

  protected async getDependencyRepository<Entity extends ObjectLiteral>(
    dataSource: DataSource,
    target: EntityTarget<Entity>,
  ): Promise<Repository<Entity>> {
    const targetRepository = dataSource.getRepository(target);
    if ((await targetRepository.count()) === 0) {
      this.logger.warn(`${(target as any).name} not seeded.`);
      return null;
    }
    return targetRepository;
  }
}
